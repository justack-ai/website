/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

interface TrialEndDateInputProps {
  value: string;
  chargeDate: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function TrialEndDateInput({ value, chargeDate, onChange, error }: TrialEndDateInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/80 mb-2">
        Anticipated Trial End Date
      </label>
      <input
        type="date"
        value={value}
        min={chargeDate || undefined}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2 text-white focus:border-violet focus:outline-none"
      />
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
      <p className="mt-1 text-xs text-white/40">
        Per <em>R v KGK</em>, 2020 SCC 7: the ceiling applies to the anticipated end of trial, not end of proceedings.
      </p>
    </div>
  );
}
