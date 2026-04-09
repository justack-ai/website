/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import { useCallback } from "react";
import type { CourtLevel } from "@/lib/jordan/types";

interface CourtLevelSelectorProps {
  value: CourtLevel | "";
  onChange: (level: CourtLevel) => void;
  error?: string;
}

const OPTIONS: { value: CourtLevel; label: string }[] = [
  { value: "OCJ", label: "OCJ — Ontario Court of Justice (Provincial)" },
  { value: "OSCJ", label: "OSCJ — Ontario Superior Court of Justice" },
];

export default function CourtLevelSelector({
  value,
  onChange,
  error,
}: CourtLevelSelectorProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value as CourtLevel);
    },
    [onChange],
  );

  return (
    <div className="space-y-3">
      <fieldset>
        <legend className="block text-sm font-medium text-white mb-2">
          Court Level
        </legend>
        <div className="space-y-2">
          {OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-3 cursor-pointer rounded-lg bg-white/5 border border-white/10 px-4 py-3 transition-colors hover:bg-white/10 has-[:checked]:border-violet has-[:checked]:bg-violet/10"
            >
              <input
                type="radio"
                name="court-level"
                value={opt.value}
                checked={value === opt.value}
                onChange={handleChange}
                className="h-4 w-4 accent-violet"
              />
              <span className="text-sm text-white">{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
