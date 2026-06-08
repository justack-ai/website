/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/casekeeper/supabase/server";
import { writeAuditEntry } from "@/lib/casekeeper/audit";
import type { NodeDecisionState } from "@/lib/casekeeper/types";

const VALID_DECISIONS: NodeDecisionState[] = [
  "yes",
  "no",
  "pending",
  "partial",
  "unknown",
  "delegated",
];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; nodeId: string }> }
) {
  const { id: matterId, nodeId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { decision: NodeDecisionState; note?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.decision || !VALID_DECISIONS.includes(body.decision)) {
    return NextResponse.json(
      { error: `decision must be one of: ${VALID_DECISIONS.join(", ")}` },
      { status: 400 }
    );
  }

  // Upsert: create or update the node state
  const { data, error } = await supabase
    .from("workflow_node_states")
    .upsert(
      {
        matter_id: matterId,
        owner_id: user.id,
        node_id: nodeId,
        decision: body.decision,
        note: body.note ?? null,
        decided_at: new Date().toISOString(),
        decided_by: user.email ?? user.id,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "matter_id,node_id" }
    )
    .select()
    .single();

  if (error || !data) {
    console.error("[CaseKeeper] node decision upsert error:", error);
    return NextResponse.json(
      { error: "Failed to update node decision" },
      { status: 500 }
    );
  }

  await writeAuditEntry({
    supabase,
    matter_id: matterId,
    owner_id: user.id,
    event_type: "node.decided",
    entity_type: "workflow_node_state",
    entity_id: data.id,
    payload: {
      node_id: nodeId,
      decision: body.decision,
      note: body.note ?? null,
    },
    actor: user.email ?? user.id,
    actor_id: user.id,
  });

  return NextResponse.json({ node_state: data });
}
