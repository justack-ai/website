/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import type { ScenarioResult } from "@/lib/jordan/types";
import StatusIndicator from "./StatusIndicator";
import TierBadge from "./TierBadge";

interface ScenarioBlockProps {
  scenarios: ScenarioResult[];
}

function formatMonths(months: number): string {
  return `${months.toFixed(1)} mo`;
}

function formatDays(days: number): string {
  return `${days} days`;
}

export default function ScenarioBlock({ scenarios }: ScenarioBlockProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold text-white">
          Net Delay Scenarios
        </h3>
        <TierBadge tier={3} />
      </div>
      <p className="text-xs text-white/50">
        Three scenarios reflect contested attribution ranges. No single number
        is presented — each scenario must be evaluated.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {scenarios.map((s) => (
          <div
            key={s.label}
            className={`rounded-lg border p-4 ${
              s.status === "Green"
                ? "border-emerald-500/30 bg-emerald-500/5"
                : s.status === "Yellow"
                  ? "border-amber-500/30 bg-amber-500/5"
                  : "border-red-500/30 bg-red-500/5"
            }`}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
                {s.label} Scenario
              </span>
              <StatusIndicator status={s.status} className="!px-2 !py-1 !text-xs" />
            </div>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-white/50">Defence delay</dt>
                <dd className="font-mono text-white">
                  {formatMonths(s.defenceDelayMonths)}{" "}
                  <span className="text-white/40">({formatDays(s.defenceDelayDays)})</span>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-white/50">EC deduction</dt>
                <dd className="font-mono text-white">
                  {formatMonths(s.ecDeductionMonths)}{" "}
                  <span className="text-white/40">({formatDays(s.ecDeductionDays)})</span>
                </dd>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2">
                <dt className="text-white/50">Net delay</dt>
                <dd className="font-mono font-semibold text-white">
                  {formatMonths(s.netDelayMonths)}{" "}
                  <span className="text-white/40">({formatDays(s.netDelayDays)})</span>
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-white/50">Buffer</dt>
                <dd
                  className={`font-mono font-semibold ${
                    s.status === "Green"
                      ? "text-emerald-300"
                      : s.status === "Yellow"
                        ? "text-amber-300"
                        : "text-red-300"
                  }`}
                >
                  {s.bufferMonths > 0 ? "+" : ""}
                  {formatMonths(s.bufferMonths)}{" "}
                  <span className="opacity-60">({s.bufferDays > 0 ? "+" : ""}{formatDays(s.bufferDays)})</span>
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
