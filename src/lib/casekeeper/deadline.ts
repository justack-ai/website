/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { WorkflowConfig, DeadlineRule } from "./types";

export interface ComputedDeadline {
  node_id: string;
  label: string;
  due_date: string;
  is_jordan: boolean;
}

/**
 * Compute deadlines from a workflow config's deadline rules,
 * given reference dates from the matter.
 */
export function computeDeadlines(
  config: WorkflowConfig,
  referenceDates: Record<string, string>
): ComputedDeadline[] {
  const deadlines: ComputedDeadline[] = [];

  for (const [nodeId, node] of Object.entries(config.nodes)) {
    if (!node.deadline_rule) continue;

    const rule: DeadlineRule = node.deadline_rule;
    const refDate = referenceDates[rule.reference];
    if (!refDate) continue;

    const base = new Date(refDate);
    base.setDate(base.getDate() + rule.days_from_reference);

    deadlines.push({
      node_id: nodeId,
      label: rule.label,
      due_date: base.toISOString().split("T")[0],
      is_jordan: rule.is_jordan,
    });
  }

  return deadlines.sort(
    (a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
  );
}
