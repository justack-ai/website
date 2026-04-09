/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import type { PendingAuthorityFlag } from "@/lib/jordan/types";

interface PendingAuthorityPanelProps {
  flags: PendingAuthorityFlag[];
}

export default function PendingAuthorityPanel({ flags }: PendingAuthorityPanelProps) {
  if (flags.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-white">
        Pending Authorities
      </h3>
      <div className="space-y-2">
        {flags.map((flag, idx) => (
          <div
            key={`${flag.caseName}-${idx}`}
            className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4"
          >
            <div className="mb-2 flex flex-wrap items-baseline gap-2">
              <span className="text-sm font-semibold text-amber-200">
                <span className="mr-1">&#9888;</span>
                Law May Change
              </span>
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="flex flex-wrap gap-x-4">
                <span className="font-medium text-white">
                  <em>{flag.caseName}</em>
                </span>
                {flag.sccFile && (
                  <span className="text-white/50">{flag.sccFile}</span>
                )}
              </div>
              <p className="text-white/70">{flag.issue}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50">
                <span>
                  Status: <span className="text-amber-300/80">{flag.status}</span>
                </span>
                <span>
                  Impact: <span className="text-amber-300/80">{flag.impactDirection}</span>
                </span>
              </div>
              {flag.affectsIssues.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {flag.affectsIssues.map((issue) => (
                    <span
                      key={issue}
                      className="rounded bg-amber-500/10 px-2 py-0.5 text-xs text-amber-300/70"
                    >
                      {issue}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
