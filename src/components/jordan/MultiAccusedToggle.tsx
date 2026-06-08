/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

interface MultiAccusedToggleProps {
  enabled: boolean;
  coAccusedCount?: number;
  onToggle: (enabled: boolean) => void;
  onCountChange: (count: number | undefined) => void;
  error?: string;
}

export default function MultiAccusedToggle({ enabled, coAccusedCount, onToggle, onCountChange, error }: MultiAccusedToggleProps) {
  return (
    <div>
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => { onToggle(e.target.checked); if (!e.target.checked) onCountChange(undefined); }}
          className="h-4 w-4 rounded accent-violet"
        />
        <span className="text-sm font-medium text-white/80">Multi-accused case</span>
      </label>

      {enabled && (
        <div className="mt-3 space-y-3">
          <div>
            <label className="text-xs text-white/50 mb-1 block">Number of co-accused</label>
            <input
              type="number"
              min={1}
              value={coAccusedCount ?? ""}
              onChange={(e) => onCountChange(e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-32 rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white focus:border-violet focus:outline-none"
            />
          </div>
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
            <strong>Warning:</strong> Multi-accused cases involve complex cross-attribution of delay.
            This tool computes delay for one accused only. Cross-attribution between co-accused is not
            supported and requires counsel assessment.
          </div>
        </div>
      )}
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
}
