/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { NudgeContext, NudgeResponse } from "./types";

export function buildNudgePrompt(ctx: NudgeContext): string {
  return `You are assisting an Ontario lawyer with a ${ctx.matter_type} matter.

The lawyer just recorded a decision on:
STEP: ${ctx.node.label}
DESCRIPTION: ${ctx.node.description}
DECISION: ${ctx.current_decision}

Recent instructions:
${ctx.recent_instructions.map((i) => `[${i.instruction_type.toUpperCase()}] ${i.content}`).join("\n")}

Generate 1-2 concise follow-up questions a supervising lawyer might ask to ensure nothing important has been missed. Questions only — no advice. Output one question per line. If no follow-up needed, output: NONE`;
}

export function parseNudgeResponse(text: string): string[] {
  const trimmed = text.trim();
  if (trimmed === "NONE") return [];
  return trimmed
    .split("\n")
    .map((q) => q.trim())
    .filter((q) => q.length > 0);
}

export const NUDGE_MODEL = "claude-sonnet-4-20250514";
export const NUDGE_MAX_TOKENS = 150;
