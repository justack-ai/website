/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import { useCallback } from "react";
import type { MeaningfulStep, MeaningfulStepType } from "@/lib/jordan/types";
import { MEANINGFUL_STEP_LABELS } from "@/lib/jordan/types";

interface MeaningfulStepsLogProps {
  steps: MeaningfulStep[];
  onChange: (steps: MeaningfulStep[]) => void;
  errors?: Record<string, string>;
}

function generateId() {
  return `ms-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function MeaningfulStepsLog({
  steps,
  onChange,
  errors,
}: MeaningfulStepsLogProps) {
  const addStep = useCallback(() => {
    const newStep: MeaningfulStep = {
      id: generateId(),
      type: "requested_early_dates",
      date: "",
      description: "",
    };
    onChange([...steps, newStep]);
  }, [steps, onChange]);

  const removeStep = useCallback(
    (id: string) => {
      onChange(steps.filter((s) => s.id !== id));
    },
    [steps, onChange],
  );

  const updateStep = useCallback(
    (id: string, patch: Partial<MeaningfulStep>) => {
      onChange(
        steps.map((s) => (s.id === id ? { ...s, ...patch } : s)),
      );
    },
    [steps, onChange],
  );

  const inputClass =
    "w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2 text-white placeholder-white/40 focus:border-violet focus:outline-none";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-white">
          Defence Meaningful Steps
        </h3>
        <button
          type="button"
          onClick={addStep}
          className="rounded-lg bg-teal px-4 py-2 text-sm text-white font-medium hover:bg-teal/80 transition-colors"
        >
          + Add Step
        </button>
      </div>

      {steps.length === 0 && (
        <p className="text-sm text-white/40">
          No meaningful steps recorded. If the defence took steps to move the
          case forward, add them here. This affects the meaningful steps gate
          analysis.
        </p>
      )}

      {steps.map((step, index) => (
        <div
          key={step.id}
          className="rounded-lg bg-white/5 border border-white/10 p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/50">Step {index + 1}</span>
            <button
              type="button"
              onClick={() => removeStep(step.id)}
              className="text-xs text-red-400 hover:text-red-300 transition-colors"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-white/60 mb-1">
                Step Type
              </label>
              <select
                value={step.type}
                onChange={(e) =>
                  updateStep(step.id, {
                    type: e.target.value as MeaningfulStepType,
                  })
                }
                className={inputClass}
              >
                {Object.entries(MEANINGFUL_STEP_LABELS).map(([val, label]) => (
                  <option key={val} value={val} className="bg-neutral-900">
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-white/60 mb-1">Date</label>
              <input
                type="date"
                value={step.date}
                onChange={(e) =>
                  updateStep(step.id, { date: e.target.value })
                }
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-white/60 mb-1">
              Description
            </label>
            <textarea
              value={step.description}
              onChange={(e) =>
                updateStep(step.id, { description: e.target.value })
              }
              placeholder="Describe the step taken by the defence..."
              rows={2}
              className={`${inputClass} resize-y`}
            />
          </div>

          {errors?.[step.id] && (
            <p className="text-sm text-red-400">{errors[step.id]}</p>
          )}
        </div>
      ))}
    </div>
  );
}
