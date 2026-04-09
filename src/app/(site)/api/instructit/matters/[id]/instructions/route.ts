/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/instructit/supabase/server";
import { writeAuditEntry } from "@/lib/instructit/audit";
import type { CreateInstructionInput } from "@/lib/instructit/types";

// Instructions are APPEND-ONLY. PUT, PATCH, DELETE are not permitted.

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: matter_id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verify matter exists and belongs to user
  const { data: matter, error: matterError } = await supabase
    .from("matters")
    .select("id")
    .eq("id", matter_id)
    .single();

  if (matterError || !matter) {
    return NextResponse.json({ error: "Matter not found" }, { status: 404 });
  }

  let body: CreateInstructionInput;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { instruction_type, content, author } = body;
  if (!instruction_type || !content || !author) {
    return NextResponse.json(
      { error: "instruction_type, content, and author are required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("instructions")
    .insert({
      matter_id,
      owner_id: user.id,
      instruction_type: body.instruction_type,
      content: body.content,
      note: body.note ?? null,
      author: body.author,
      ai_generated: body.ai_generated ?? false,
      workflow_node_id: body.workflow_node_id ?? null,
    })
    .select()
    .single();

  if (error || !data) {
    console.error("[InstructIT] instruction insert error:", error);
    return NextResponse.json({ error: "Failed to record instruction" }, { status: 500 });
  }

  await writeAuditEntry({
    supabase,
    matter_id,
    owner_id: user.id,
    event_type: "instruction.recorded",
    entity_type: "instruction",
    entity_id: data.id,
    payload: { instruction: data },
    actor: user.email ?? user.id,
    actor_id: user.id,
  });

  return NextResponse.json({ instruction: data }, { status: 201 });
}

export async function PUT() {
  return NextResponse.json(
    { error: "Instructions are append-only. PUT is not permitted." },
    { status: 405 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { error: "Instructions are append-only. PATCH is not permitted." },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: "Instructions are append-only. DELETE is not permitted." },
    { status: 405 }
  );
}
