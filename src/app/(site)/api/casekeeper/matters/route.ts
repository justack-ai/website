/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/casekeeper/supabase/server";
import { writeAuditEntry } from "@/lib/casekeeper/audit";
import { computeJordanCeiling } from "@/lib/casekeeper/jordan";
import { getDefaultWorkflowConfigId } from "@/lib/casekeeper/configs";
import type { CreateMatterInput, MatterType } from "@/lib/casekeeper/types";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("matters")
    .select("*")
    .is("archived_at", null)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[CaseKeeper] matters GET error:", error);
    return NextResponse.json({ error: "Failed to fetch matters" }, { status: 500 });
  }

  return NextResponse.json({ matters: data });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: CreateMatterInput;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { matter_type, jurisdiction, client_name } = body;
  if (!matter_type || !jurisdiction || !client_name) {
    return NextResponse.json(
      { error: "matter_type, jurisdiction, and client_name are required" },
      { status: 400 }
    );
  }

  // Auto-compute Jordan ceiling when court_level is set
  const jordanCeiling =
    body.court_level && body.matter_type === "criminal"
      ? computeJordanCeiling(body.court_level)
      : null;

  const workflowConfigId =
    body.workflow_config_id ||
    getDefaultWorkflowConfigId(body.matter_type as MatterType);

  const { data, error } = await supabase
    .from("matters")
    .insert({
      owner_id: user.id,
      matter_type: body.matter_type,
      jurisdiction: body.jurisdiction,
      client_name: body.client_name,
      opposing_party: body.opposing_party ?? null,
      counsel_name: body.counsel_name ?? null,
      charge_date: body.charge_date ?? null,
      court_level: body.court_level ?? null,
      jordan_ceiling_days: jordanCeiling,
      workflow_config_id: workflowConfigId,
      current_posture: body.current_posture ?? null,
    })
    .select()
    .single();

  if (error || !data) {
    console.error("[CaseKeeper] matter insert error:", error);
    return NextResponse.json({ error: "Failed to create matter" }, { status: 500 });
  }

  await writeAuditEntry({
    supabase,
    matter_id: data.id,
    owner_id: user.id,
    event_type: "matter.created",
    entity_type: "matter",
    entity_id: data.id,
    payload: { matter: data },
    actor: user.email ?? user.id,
    actor_id: user.id,
  });

  return NextResponse.json({ matter: data }, { status: 201 });
}
