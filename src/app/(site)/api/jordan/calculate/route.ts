/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/jordan/supabase-server";
import { calculate, validateInput, getCorpusVersion } from "@/lib/jordan";
import type { JordanInput } from "@/lib/jordan";

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  const { data: subscription } = await supabase
    .from("jordan_subscriptions").select("*").eq("user_id", user.id).single();

  const tier = subscription?.tier ?? "free";
  const calculationsUsed = subscription?.calculations_used ?? 0;
  const maxCalculations = subscription?.max_calculations ?? 3;

  if (tier === "free" && calculationsUsed >= maxCalculations) {
    return NextResponse.json({
      error: "Free tier limit reached",
      message: "You have used all 3 free calculations. Subscribe for unlimited access.",
      code: "PAYWALL",
    }, { status: 403 });
  }

  let input: JordanInput;
  try { input = await request.json(); }
  catch { return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 }); }

  const warnings = validateInput(input);
  const critical = warnings.filter((w) => w.severity === "critical");
  if (critical.length > 0) {
    return NextResponse.json({ error: "Validation failed", warnings: critical }, { status: 422 });
  }

  const output = calculate(input);

  // Parallelize independent DB writes
  const saveCalc = supabase.from("jordan_calculations").insert({
    user_id: user.id, input, output,
    corpus_version: getCorpusVersion(),
    attestation_timestamp: input.attestation.timestamp ?? null,
  });

  const updateSub = subscription
    ? supabase.from("jordan_subscriptions").update({
        calculations_used: calculationsUsed + 1, updated_at: new Date().toISOString(),
      }).eq("user_id", user.id)
    : supabase.from("jordan_subscriptions").insert({
        user_id: user.id, tier: "free", status: "active", calculations_used: 1, max_calculations: 3,
      });

  await Promise.all([saveCalc, updateSub]);

  return NextResponse.json({ output });
}
