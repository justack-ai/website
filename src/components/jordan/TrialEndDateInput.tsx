/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import { useCallback, useMemo } from "react";

interface TrialEndDateInputProps {
  value: string;
  chargeDate: string;
  onChange: (date: string) => void;
  error?: string;
}

export default function TrialEndDateInput({
  value,
  chargeDate,
  onChange,
  error,
}: TrialEndDateInputProps) {
  const validationError = useMemo(() => {
    if (!value || !chargeDate) return undefined;
    if (value <= chargeDate)
      return "Trial end date must be after the charge date.";
    return undefined;
  }, [value, chargeDate]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  const displayError = error || validationError;

  return (
    <div className="space-y-2">
      <label
        htmlFor="trial-end-date"
        className="block text-sm font-medium text-white"
      >
        Anticipated Trial End Date
      </label>
      <input
        id="trial-end-date"
        type="date"
        value={value}
        min={chargeDate || undefined}
        onChange={handleChange}
        className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2 text-white placeholder-white/40 focus:border-violet focus:outline-none"
      />
      {displayError && (
        <p className="text-sm text-red-400">{displayError}</p>
      )}
    </div>
  );
}
