/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/instructit/supabase/server";

// Audit log is read-only via API. POST/PUT/PATCH/DELETE are not permitted.

export async function GET(
  _request: NextRequest,
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

  const { data, error } = await supabase
    .from("audit_log")
    .select("*")
    .eq("matter_id", matter_id)
    .order("recorded_at", { ascending: true });

  if (error) {
    console.error("[InstructIT] audit_log GET error:", error);
    return NextResponse.json({ error: "Failed to fetch audit log" }, { status: 500 });
  }

  return NextResponse.json({ audit_log: data });
}

export async function POST() {
  return NextResponse.json(
    { error: "Audit log is read-only via API. POST is not permitted." },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: "Audit log is read-only via API. PUT is not permitted." },
    { status: 405 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { error: "Audit log is read-only via API. PATCH is not permitted." },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: "Audit log is read-only via API. DELETE is not permitted." },
    { status: 405 }
  );
}
