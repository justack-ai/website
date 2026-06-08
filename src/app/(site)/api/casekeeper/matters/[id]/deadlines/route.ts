/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/casekeeper/supabase/server";
import { writeAuditEntry } from "@/lib/casekeeper/audit";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: matterId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("deadlines_computed")
    .select("*")
    .eq("matter_id", matterId)
    .is("resolved_at", null)
    .order("due_date", { ascending: true });

  if (error) {
    console.error("[CaseKeeper] deadlines GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch deadlines" },
      { status: 500 }
    );
  }

  return NextResponse.json({ deadlines: data });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: matterId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    label: string;
    due_date: string;
    node_id?: string;
    is_jordan?: boolean;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.label || !body.due_date) {
    return NextResponse.json(
      { error: "label and due_date are required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("deadlines")
    .insert({
      matter_id: matterId,
      owner_id: user.id,
      node_id: body.node_id ?? null,
      label: body.label,
      due_date: body.due_date,
      is_jordan: body.is_jordan ?? false,
    })
    .select()
    .single();

  if (error || !data) {
    console.error("[CaseKeeper] deadline insert error:", error);
    return NextResponse.json(
      { error: "Failed to create deadline" },
      { status: 500 }
    );
  }

  await writeAuditEntry({
    supabase,
    matter_id: matterId,
    owner_id: user.id,
    event_type: "deadline.set",
    entity_type: "deadline",
    entity_id: data.id,
    payload: {
      label: body.label,
      due_date: body.due_date,
      is_jordan: body.is_jordan ?? false,
    },
    actor: user.email ?? user.id,
    actor_id: user.id,
  });

  return NextResponse.json({ deadline: data }, { status: 201 });
}
