/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/jordan/supabase-server";
import { createCheckoutSession } from "@/lib/jordan/stripe";

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const { tier } = await request.json();
  if (tier !== "solo" && tier !== "firm") {
    return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
  }

  const origin = request.headers.get("origin") ?? "https://justack.ai";
  const session = await createCheckoutSession(user.id, tier, origin);

  return NextResponse.json({ url: session.url });
}
