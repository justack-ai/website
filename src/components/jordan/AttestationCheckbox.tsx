/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

interface AttestationCheckboxProps {
  confirmed: boolean;
  timestamp?: string;
  onChange: (confirmed: boolean, timestamp?: string) => void;
  error?: string;
}

export default function AttestationCheckbox({ confirmed, timestamp, onChange, error }: AttestationCheckboxProps) {
  return (
    <div>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => {
            const checked = e.target.checked;
            onChange(checked, checked ? new Date().toISOString() : undefined);
          }}
          className="mt-0.5 h-4 w-4 rounded accent-violet"
        />
        <div>
          <span className="text-sm font-medium text-white/80">
            I confirm that the inputs entered above reflect the court record to the best of my knowledge.
          </span>
          {timestamp && (
            <p className="text-xs text-white/40 mt-1">
              Attested at {new Date(timestamp).toLocaleString()}
            </p>
          )}
        </div>
      </label>
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}
