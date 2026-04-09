/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import TierBadge from "./TierBadge";

interface MeaningfulStepsGatePanelProps {
  checklist: string[];
}

export default function MeaningfulStepsGatePanel({
  checklist,
}: MeaningfulStepsGatePanelProps) {
  return (
    <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-6">
      <div className="mb-1 flex items-center gap-2">
        <h3 className="text-base font-semibold text-red-200">
          Meaningful Steps Required — <em>Jordan</em> para 48
        </h3>
        <TierBadge tier={5} />
      </div>
      <p className="mb-4 text-sm text-red-200/70">
        Before a s. 11(b) application may proceed, the defence must demonstrate
        meaningful steps to address delay.
      </p>
      <ul className="space-y-2">
        {checklist.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-white/80">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-white/20 bg-white/5 text-xs text-white/40">
              {idx + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
