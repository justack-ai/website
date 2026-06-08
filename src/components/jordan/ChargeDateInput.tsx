/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

interface ChargeDateInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function ChargeDateInput({ value, onChange, error }: ChargeDateInputProps) {
  const isPre2016 = value && value < "2016-07-08";
  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <label className="block text-sm font-medium text-white/80 mb-2">
        Date Charge Laid
      </label>
      <input
        type="date"
        value={value}
        max={today}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2 text-white focus:border-violet focus:outline-none"
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
      {isPre2016 && (
        <div className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          <strong>Out of Scope:</strong> This charge predates <em>R v Jordan</em> (2016 SCC 27). The Jordan
          framework&apos;s presumptive ceilings apply to cases where the charge was laid after July 8, 2016.
          Pre-2016 cases use the <em>Morin</em> framework and are out of scope for this tool.
        </div>
      )}
    </div>
  );
}
