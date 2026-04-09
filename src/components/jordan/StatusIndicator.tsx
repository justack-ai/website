/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import type { StatusColor } from "@/lib/jordan/types";

interface StatusIndicatorProps {
  status: StatusColor;
  className?: string;
}

const STATUS_CONFIG: Record<StatusColor, { bg: string; text: string; label: string }> = {
  Green: {
    bg: "bg-emerald-500/20 border-emerald-500/40",
    text: "text-emerald-200",
    label: "Within Ceiling",
  },
  Yellow: {
    bg: "bg-amber-500/20 border-amber-500/40",
    text: "text-amber-200",
    label: "Approaching Ceiling",
  },
  Red: {
    bg: "bg-red-500/20 border-red-500/40",
    text: "text-red-200",
    label: "At or Past Ceiling",
  },
};

export default function StatusIndicator({ status, className = "" }: StatusIndicatorProps) {
  const config = STATUS_CONFIG[status];

  return (
    <div
      className={`inline-flex items-center rounded-lg border px-4 py-2 text-sm font-medium ${config.bg} ${config.text} ${className}`}
    >
      <span
        className={`mr-2 h-2.5 w-2.5 rounded-full ${
          status === "Green"
            ? "bg-emerald-400"
            : status === "Yellow"
              ? "bg-amber-400"
              : "bg-red-400"
        }`}
      />
      {config.label}
    </div>
  );
}
