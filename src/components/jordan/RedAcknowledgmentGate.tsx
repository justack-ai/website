/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import { useCallback, useMemo, useState } from "react";
import type { RedAcknowledgment } from "@/lib/jordan/types";

interface RedAcknowledgmentGateProps {
  userId?: string;
  onAcknowledged: (ack: RedAcknowledgment) => void;
  children: React.ReactNode;
}

const CHECKBOX_ITEMS = [
  {
    key: "inputsReflectCourtRecord" as const,
    label: "I confirm the inputs entered reflect the court record",
  },
  {
    key: "toolIsNotSoleBasis" as const,
    label:
      "I understand this tool is not a substitute for independent legal judgment",
  },
  {
    key: "uncertaintyUnderstood" as const,
    label:
      "I understand the uncertainty disclosed in the confidence tiers",
  },
  {
    key: "counselVerificationRequired" as const,
    label:
      "I will verify this analysis with counsel before relying on it",
  },
] as const;

export default function RedAcknowledgmentGate({
  userId,
  onAcknowledged,
  children,
}: RedAcknowledgmentGateProps) {
  const [checks, setChecks] = useState<Record<string, boolean>>({
    inputsReflectCourtRecord: false,
    toolIsNotSoleBasis: false,
    uncertaintyUnderstood: false,
    counselVerificationRequired: false,
  });
  const [acknowledged, setAcknowledged] = useState(false);

  const allChecked = useMemo(
    () => CHECKBOX_ITEMS.every((item) => checks[item.key]),
    [checks],
  );

  const handleToggle = useCallback(
    (key: string) => {
      setChecks((prev) => {
        const next = { ...prev, [key]: !prev[key] };

        // Check if all are now true
        const nowAllChecked = CHECKBOX_ITEMS.every((item) => next[item.key]);
        if (nowAllChecked && !acknowledged) {
          const ack: RedAcknowledgment = {
            inputsReflectCourtRecord: true,
            toolIsNotSoleBasis: true,
            uncertaintyUnderstood: true,
            counselVerificationRequired: true,
            timestamp: new Date().toISOString(),
            userId,
          };
          console.log(
            "[JordanFrameworkCalc] Red acknowledgment gate cleared",
            {
              timestamp: ack.timestamp,
              userId: ack.userId,
            },
          );
          setAcknowledged(true);
          onAcknowledged(ack);
        }

        return next;
      });
    },
    [acknowledged, onAcknowledged, userId],
  );

  if (acknowledged) {
    return <>{children}</>;
  }

  return (
    <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-6">
      <h3 className="mb-1 text-base font-semibold text-red-200">
        Acknowledgment Required
      </h3>
      <p className="mb-4 text-sm text-red-200/70">
        The dominant status of this analysis is{" "}
        <strong className="text-red-300">At or Past Ceiling</strong>. You must
        confirm the following before viewing the full result.
      </p>
      <div className="space-y-3">
        {CHECKBOX_ITEMS.map((item) => (
          <label
            key={item.key}
            className="flex cursor-pointer items-start gap-3 text-sm text-white/80 hover:text-white"
          >
            <input
              type="checkbox"
              checked={checks[item.key] ?? false}
              onChange={() => handleToggle(item.key)}
              className="mt-0.5 h-4 w-4 rounded border-white/30 bg-white/10 text-red-500 accent-red-500"
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>
      {allChecked && (
        <p className="mt-4 text-xs text-white/40">
          Acknowledgment recorded. Loading results...
        </p>
      )}
    </div>
  );
}
