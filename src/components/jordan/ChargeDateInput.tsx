/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import { useCallback, useMemo } from "react";

interface ChargeDateInputProps {
  value: string;
  onChange: (date: string) => void;
  error?: string;
}

const JORDAN_DATE = "2016-07-08";

export default function ChargeDateInput({
  value,
  onChange,
  error,
}: ChargeDateInputProps) {
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const validationError = useMemo(() => {
    if (!value) return undefined;
    if (value > today) return "Charge date cannot be in the future.";
    return undefined;
  }, [value, today]);

  const isPreJordan = useMemo(() => {
    if (!value) return false;
    return value < JORDAN_DATE;
  }, [value]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  const displayError = error || validationError;

  return (
    <div className="space-y-2">
      <label htmlFor="charge-date" className="block text-sm font-medium text-white">
        Charge Date (Information Sworn)
      </label>
      <input
        id="charge-date"
        type="date"
        value={value}
        max={today}
        onChange={handleChange}
        className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2 text-white placeholder-white/40 focus:border-violet focus:outline-none"
      />
      {displayError && (
        <p className="text-sm text-red-400">{displayError}</p>
      )}
      {isPreJordan && !displayError && (
        <div className="rounded-lg bg-amber-500/20 border border-amber-500/40 px-4 py-3 text-sm text-amber-200">
          <strong>Warning:</strong> This charge predates{" "}
          <em>R v Jordan</em> (2016 SCC 27). Pre-2016 cases use the Morin
          framework and are out of scope for this tool.
        </div>
      )}
    </div>
  );
}
