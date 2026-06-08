/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import type { ConfidenceTier } from "@/lib/jordan/types";

interface TierBadgeProps {
  tier: ConfidenceTier;
  citation?: string;
  pendingCaseName?: string;
}

export default function TierBadge({ tier, citation, pendingCaseName }: TierBadgeProps) {
  if (tier === 1) return null;

  if (tier === 2) {
    return (
      <span className="ml-2 inline-flex items-center rounded px-2 py-0.5 text-xs text-white/60 bg-white/5 border border-white/10">
        {citation ?? "Settled law"}
      </span>
    );
  }

  if (tier === 3) {
    return (
      <span className="ml-2 inline-flex items-center rounded px-2 py-0.5 text-xs font-medium text-amber-300 bg-amber-500/15 border border-amber-500/30">
        Tier 3 — Contested
      </span>
    );
  }

  if (tier === 4) {
    return (
      <div className="mt-1 rounded-lg bg-amber-500/15 border border-amber-500/30 px-3 py-2 text-sm text-amber-200">
        <span className="mr-1">&#9888;</span>
        Law May Change
        {pendingCaseName && (
          <span className="ml-1 text-amber-300/80">— {pendingCaseName}</span>
        )}
      </div>
    );
  }

  // Tier 5
  return (
    <span className="ml-2 inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold text-red-300 bg-red-500/15 border border-red-500/30">
      Counsel Judgment Required
    </span>
  );
}
