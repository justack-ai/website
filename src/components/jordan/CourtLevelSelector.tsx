/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import type { CourtLevel } from "@/lib/jordan/types";

interface CourtLevelSelectorProps {
  value: CourtLevel;
  onChange: (value: CourtLevel) => void;
  error?: string;
}

const OPTIONS: { value: CourtLevel; label: string; desc: string }[] = [
  { value: "OCJ", label: "OCJ", desc: "Ontario Court of Justice (Provincial) — 18 month ceiling" },
  { value: "OSCJ", label: "OSCJ", desc: "Ontario Superior Court of Justice — 30 month ceiling" },
];

export default function CourtLevelSelector({ value, onChange, error }: CourtLevelSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/80 mb-3">Court Level</label>
      <div className="space-y-2">
        {OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 transition-colors ${
              value === opt.value
                ? "border-violet bg-violet/10"
                : "border-white/20 bg-white/5 hover:border-white/30"
            }`}
          >
            <input
              type="radio"
              name="courtLevel"
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="mt-0.5 accent-violet"
            />
            <div>
              <span className="font-medium text-white">{opt.label}</span>
              <p className="text-xs text-white/50 mt-0.5">{opt.desc}</p>
            </div>
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
}
