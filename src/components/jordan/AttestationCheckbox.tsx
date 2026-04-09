/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import { useCallback } from "react";

interface AttestationCheckboxProps {
  confirmed: boolean;
  timestamp?: string;
  onChange: (confirmed: boolean, timestamp?: string) => void;
  error?: string;
}

export default function AttestationCheckbox({
  confirmed,
  timestamp,
  onChange,
  error,
}: AttestationCheckboxProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      onChange(checked, checked ? new Date().toISOString() : undefined);
    },
    [onChange],
  );

  return (
    <div className="space-y-2">
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={handleChange}
          className="mt-1 h-4 w-4 shrink-0 accent-violet rounded"
        />
        <span className="text-sm text-white">
          I confirm that the inputs entered above reflect the court record to the
          best of my knowledge.
        </span>
      </label>
      {confirmed && timestamp && (
        <p className="text-xs text-white/40 pl-7">
          Attested at {new Date(timestamp).toLocaleString()}
        </p>
      )}
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
