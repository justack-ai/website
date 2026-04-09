/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import { useCallback } from "react";

interface MultiAccusedToggleProps {
  enabled: boolean;
  coAccusedCount?: number;
  onToggle: (enabled: boolean) => void;
  onCountChange: (count: number | undefined) => void;
  error?: string;
}

export default function MultiAccusedToggle({
  enabled,
  coAccusedCount,
  onToggle,
  onCountChange,
  error,
}: MultiAccusedToggleProps) {
  const handleToggle = useCallback(() => {
    const next = !enabled;
    onToggle(next);
    if (!next) onCountChange(undefined);
  }, [enabled, onToggle, onCountChange]);

  const handleCount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      onCountChange(val ? Math.max(1, parseInt(val, 10) || 1) : undefined);
    },
    [onCountChange],
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={handleToggle}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
            enabled ? "bg-violet" : "bg-white/20"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transition-transform ${
              enabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        <label className="text-sm font-medium text-white cursor-pointer" onClick={handleToggle}>
          Multi-accused case
        </label>
      </div>

      {enabled && (
        <div className="space-y-3 pl-14">
          <div>
            <label
              htmlFor="co-accused-count"
              className="block text-xs text-white/60 mb-1"
            >
              Number of co-accused
            </label>
            <input
              id="co-accused-count"
              type="number"
              min={1}
              value={coAccusedCount ?? ""}
              onChange={handleCount}
              placeholder="e.g. 3"
              className="w-32 rounded-lg bg-white/10 border border-white/20 px-4 py-2 text-white placeholder-white/40 focus:border-violet focus:outline-none"
            />
          </div>
          <div className="rounded-lg bg-amber-500/20 border border-amber-500/40 px-4 py-3 text-sm text-amber-200">
            <strong>Note:</strong> Multi-accused cases involve additional
            scheduling complexity that may affect delay attribution. Courts may
            apply a more flexible standard when assessing institutional delay in
            multi-accused proceedings.
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
