/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const { email, tool_interest } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    if (!tool_interest || typeof tool_interest !== "string") {
      return NextResponse.json({ error: "Tool interest required" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Supabase not configured for roadmap signups");
      return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase.from("roadmap_signups").upsert(
      {
        email: email.toLowerCase().trim(),
        tool_interest,
        source: "/roadmap",
      },
      { onConflict: "email,tool_interest" }
    );

    if (error) {
      console.error("Roadmap signup error:", error);
      return NextResponse.json({ error: "Failed to save signup" }, { status: 500 });
    }

    return NextResponse.json({ message: "Signup recorded" }, { status: 200 });
  } catch (error) {
    console.error("Roadmap signup error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
