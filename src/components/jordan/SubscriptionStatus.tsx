/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import type { SubscriptionTier } from "@/lib/jordan/types";

interface SubscriptionStatusProps {
  tier: SubscriptionTier;
  status: "active" | "past_due" | "canceled" | "trialing";
  calculationsUsed: number;
  maxCalculations: number;
}

export default function SubscriptionStatus({
  tier,
  status,
  calculationsUsed,
  maxCalculations,
}: SubscriptionStatusProps) {
  if (status === "past_due") {
    return (
      <div className="inline-flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-sm text-amber-400">
        <span className="h-2 w-2 rounded-full bg-amber-400" />
        Payment issue — please update billing
      </div>
    );
  }

  if (tier === "free") {
    return (
      <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/60">
        <span className="h-2 w-2 rounded-full bg-white/40" />
        Free tier — {calculationsUsed} of {maxCalculations} calculations used
      </div>
    );
  }

  const tierLabel = tier === "solo" ? "Solo" : "Firm";

  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-teal-500/30 bg-teal-500/10 px-3 py-1.5 text-sm text-teal-400">
      <span className="h-2 w-2 rounded-full bg-teal-400" />
      {tierLabel} plan — Active
    </div>
  );
}
