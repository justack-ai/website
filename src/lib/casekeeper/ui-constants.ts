/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { NodeDecisionState } from "./types";

export const DECISION_LABELS: Record<NodeDecisionState, string> = {
  yes: "Yes",
  no: "No",
  pending: "Pending",
  partial: "Partial",
  unknown: "Unknown",
  delegated: "Delegated",
};

export const DECISION_TAILWIND_COLORS: Record<NodeDecisionState, string> = {
  yes: "bg-green-600 hover:bg-green-700",
  no: "bg-red-600 hover:bg-red-700",
  pending: "bg-yellow-500 hover:bg-yellow-600",
  partial: "bg-blue-500 hover:bg-blue-600",
  unknown: "bg-gray-500 hover:bg-gray-600",
  delegated: "bg-purple-500 hover:bg-purple-600",
};

export const DECISION_HEX_COLORS: Record<NodeDecisionState, string> = {
  yes: "#16a34a",
  no: "#dc2626",
  pending: "#d97706",
  partial: "#2563eb",
  unknown: "#6b7280",
  delegated: "#7c3aed",
};
