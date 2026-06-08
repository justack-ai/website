/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import type { MeaningfulStep, MeaningfulStepType } from "@/lib/jordan/types";
import { MEANINGFUL_STEP_LABELS } from "@/lib/jordan/types";

interface MeaningfulStepsLogProps {
  steps: MeaningfulStep[];
  onChange: (steps: MeaningfulStep[]) => void;
  errors?: Record<string, string>;
}

export default function MeaningfulStepsLog({ steps, onChange, errors }: MeaningfulStepsLogProps) {
  const addStep = () => {
    onChange([...steps, { id: crypto.randomUUID(), type: "requested_early_dates", date: "", description: "" }]);
  };

  const removeStep = (id: string) => onChange(steps.filter((s) => s.id !== id));

  const updateStep = (id: string, updates: Partial<MeaningfulStep>) => {
    onChange(steps.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <label className="text-sm font-medium text-white/80">Meaningful Steps</label>
          <p className="text-xs text-white/40 mt-0.5">Jordan para 48 — steps taken by defence to address delay</p>
        </div>
        <button type="button" onClick={addStep} className="rounded bg-violet/20 px-3 py-1 text-xs text-violet-300 hover:bg-violet/30 transition-colors">
          + Add Step
        </button>
      </div>

      {steps.length === 0 && (
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-xs text-amber-200">
          No meaningful steps recorded. If the dominant status is Red, this will trigger a Tier 5 checklist
          panel instead of showing the Red result.
        </div>
      )}

      <div className="space-y-3">
        {steps.map((step) => (
          <div key={step.id} className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <select value={step.type} onChange={(e) => updateStep(step.id, { type: e.target.value as MeaningfulStepType })}
                className="rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white focus:border-violet focus:outline-none">
                {Object.entries(MEANINGFUL_STEP_LABELS).map(([k, v]) => (
                  <option key={k} value={k} className="bg-gray-900">{v}</option>
                ))}
              </select>
              <input type="date" value={step.date} onChange={(e) => updateStep(step.id, { date: e.target.value })}
                className="rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white focus:border-violet focus:outline-none" />
              <button type="button" onClick={() => removeStep(step.id)} className="text-red-400/60 hover:text-red-400 text-sm text-left sm:text-right">Remove</button>
            </div>
            <textarea value={step.description} onChange={(e) => updateStep(step.id, { description: e.target.value })}
              placeholder="Describe the step taken..."
              rows={2}
              className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white placeholder-white/30 focus:border-violet focus:outline-none" />
            {errors?.[step.id] && <p className="text-xs text-red-400">{errors[step.id]}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
