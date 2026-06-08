/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/casekeeper/supabase/server";
import {
  buildNudgePrompt,
  parseNudgeResponse,
  NUDGE_MODEL,
  NUDGE_MAX_TOKENS,
} from "@/lib/casekeeper/nudge";
import { getWorkflowConfig } from "@/lib/casekeeper/configs";
import type {
  NudgeContext,
  NudgeResponse,
  InstructionRow,
} from "@/lib/casekeeper/types";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    matter_id: string;
    node_id: string;
    current_decision: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.matter_id || !body.node_id || !body.current_decision) {
    return NextResponse.json(
      { error: "matter_id, node_id, and current_decision are required" },
      { status: 400 }
    );
  }

  // Fetch matter
  const { data: matter } = await supabase
    .from("matters")
    .select("*")
    .eq("id", body.matter_id)
    .single();

  if (!matter) {
    return NextResponse.json({ error: "Matter not found" }, { status: 404 });
  }

  const config = getWorkflowConfig(matter.workflow_config_id ?? "criminal_bail_v1");
  if (!config) {
    return NextResponse.json(
      { error: "Workflow config not found" },
      { status: 404 }
    );
  }

  const node = config.nodes[body.node_id];
  if (!node || !node.llm_nudge_eligible) {
    return NextResponse.json(
      { error: "Node not eligible for nudge" },
      { status: 400 }
    );
  }

  // Fetch recent instructions
  const { data: instructions } = await supabase
    .from("instructions")
    .select("*")
    .eq("matter_id", body.matter_id)
    .order("recorded_at", { ascending: false })
    .limit(5);

  const ctx: NudgeContext = {
    node,
    current_decision: body.current_decision as NudgeContext["current_decision"],
    matter_type: matter.matter_type,
    jurisdiction: matter.jurisdiction,
    recent_instructions: (instructions ?? []) as InstructionRow[],
  };

  const prompt = buildNudgePrompt(ctx);

  try {
    const response = await anthropic.messages.create({
      model: NUDGE_MODEL,
      max_tokens: NUDGE_MAX_TOKENS,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    const questions = parseNudgeResponse(text);

    const result: NudgeResponse = {
      questions,
      model: NUDGE_MODEL,
      tokens_used: response.usage.output_tokens,
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("[CaseKeeper] nudge API error:", err);
    return NextResponse.json(
      { error: "Nudge generation failed" },
      { status: 500 }
    );
  }
}
