/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/**
 * R v Jordan, 2016 SCC 27 — presumptive ceiling calculator
 * R v Cody, 2017 SCC 31 — defence delay attribution
 *
 * Ontario Court of Justice: 18 months (548 days)
 * Superior Court of Justice: 30 months (913 days)
 */

export function computeJordanCeiling(court_level: string): number {
  return court_level === "superior_court" ? 913 : 548;
}

export interface JordanStatus {
  elapsed: number;
  ceiling: number;
  remaining: number;
  is_exceeded: boolean;
  percentage: number;
}

export function computeJordanDaysRemaining(
  charge_date: string,
  court_level: string,
  deductible_days: number = 0
): JordanStatus {
  const ceiling = computeJordanCeiling(court_level);
  const elapsed = Math.max(
    0,
    Math.floor(
      (Date.now() - new Date(charge_date).getTime()) / 86_400_000
    ) - deductible_days
  );
  const remaining = ceiling - elapsed;
  return {
    elapsed,
    ceiling,
    remaining,
    is_exceeded: elapsed > ceiling,
    percentage: Math.min(100, Math.round((elapsed / ceiling) * 100)),
  };
}

import type { DelayCategory } from "./types";

export function computeDeductibleDays(
  delays: Array<{
    category: DelayCategory;
    days: number;
  }>
): number {
  return delays
    .filter((d) => d.category === "defence" || d.category === "waived")
    .reduce((sum, d) => sum + d.days, 0);
}
