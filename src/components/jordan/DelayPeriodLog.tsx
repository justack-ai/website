/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import { useCallback, useMemo } from "react";
import type {
  DelayPeriod,
  AttributionParty,
  DefenceSubType,
  ExceptionalCircumstanceSubType,
  Jurisdiction,
} from "@/lib/jordan/types";
import {
  DEFENCE_SUB_TYPE_LABELS,
  EC_SUB_TYPE_LABELS,
} from "@/lib/jordan/types";

interface DelayPeriodLogProps {
  periods: DelayPeriod[];
  onChange: (periods: DelayPeriod[]) => void;
  errors?: Record<string, string>;
}

const PARTIES: { value: AttributionParty; label: string }[] = [
  { value: "Crown", label: "Crown" },
  { value: "Defence", label: "Defence" },
  { value: "Institutional", label: "Institutional" },
  { value: "Joint", label: "Joint" },
];

const JURISDICTIONS: { value: Jurisdiction; label: string }[] = [
  { value: "ON", label: "Ontario" },
  { value: "AB", label: "Alberta" },
  { value: "SK", label: "Saskatchewan" },
  { value: "BC", label: "British Columbia" },
  { value: "FED", label: "Federal" },
  { value: "OTHER", label: "Other" },
];

function generateId() {
  return `dp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function periodsOverlap(a: DelayPeriod, b: DelayPeriod): boolean {
  if (!a.startDate || !a.endDate || !b.startDate || !b.endDate) return false;
  return a.startDate < b.endDate && b.startDate < a.endDate;
}

function isCovidSubType(subType?: ExceptionalCircumstanceSubType): boolean {
  return (
    subType === "covid_ontario" ||
    subType === "covid_alberta" ||
    subType === "covid_other"
  );
}

export default function DelayPeriodLog({
  periods,
  onChange,
  errors,
}: DelayPeriodLogProps) {
  const overlappingIds = useMemo(() => {
    const ids = new Set<string>();
    for (let i = 0; i < periods.length; i++) {
      for (let j = i + 1; j < periods.length; j++) {
        if (periodsOverlap(periods[i], periods[j])) {
          ids.add(periods[i].id);
          ids.add(periods[j].id);
        }
      }
    }
    return ids;
  }, [periods]);

  const addPeriod = useCallback(() => {
    const newPeriod: DelayPeriod = {
      id: generateId(),
      startDate: "",
      endDate: "",
      party: "Crown",
    };
    onChange([...periods, newPeriod]);
  }, [periods, onChange]);

  const removePeriod = useCallback(
    (id: string) => {
      onChange(periods.filter((p) => p.id !== id));
    },
    [periods, onChange],
  );

  const updatePeriod = useCallback(
    (id: string, patch: Partial<DelayPeriod>) => {
      onChange(
        periods.map((p) => (p.id === id ? { ...p, ...patch } : p)),
      );
    },
    [periods, onChange],
  );

  const inputClass =
    "w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2 text-white placeholder-white/40 focus:border-violet focus:outline-none";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-white">Delay Periods</h3>
        <button
          type="button"
          onClick={addPeriod}
          className="rounded-lg bg-teal px-4 py-2 text-sm text-white font-medium hover:bg-teal/80 transition-colors"
        >
          + Add Period
        </button>
      </div>

      {periods.length === 0 && (
        <p className="text-sm text-white/40">
          No delay periods added. Add periods to attribute delay to Crown,
          Defence, Institutional, or Joint causes.
        </p>
      )}

      {periods.map((period, index) => {
        const isOverlapping = overlappingIds.has(period.id);
        const showDefenceSub = period.party === "Defence";
        const showEcSub =
          period.party === "Crown" || period.party === "Institutional";
        const showCovid = isCovidSubType(period.ecSubType);

        return (
          <div
            key={period.id}
            className={`rounded-lg p-4 space-y-3 ${
              isOverlapping
                ? "bg-red-500/10 border-2 border-red-500/40"
                : "bg-white/5 border border-white/10"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/50">
                  Period {index + 1}
                </span>
                {isOverlapping && (
                  <span className="text-xs text-red-400 font-medium">
                    Overlapping
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => removePeriod(period.id)}
                className="text-xs text-red-400 hover:text-red-300 transition-colors"
              >
                Remove
              </button>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-white/60 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={period.startDate}
                  onChange={(e) =>
                    updatePeriod(period.id, { startDate: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs text-white/60 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={period.endDate}
                  onChange={(e) =>
                    updatePeriod(period.id, { endDate: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
            </div>

            {/* Attribution Party */}
            <div>
              <label className="block text-xs text-white/60 mb-1">
                Attribution Party
              </label>
              <select
                value={period.party}
                onChange={(e) =>
                  updatePeriod(period.id, {
                    party: e.target.value as AttributionParty,
                    defenceSubType: undefined,
                    ecSubType: undefined,
                    covidArticulableLink: undefined,
                    covidJurisdiction: undefined,
                  })
                }
                className={inputClass}
              >
                {PARTIES.map((p) => (
                  <option key={p.value} value={p.value} className="bg-neutral-900">
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Defence Sub-Type */}
            {showDefenceSub && (
              <div>
                <label className="block text-xs text-white/60 mb-1">
                  Defence Delay Sub-Type
                </label>
                <select
                  value={period.defenceSubType || ""}
                  onChange={(e) =>
                    updatePeriod(period.id, {
                      defenceSubType:
                        (e.target.value as DefenceSubType) || undefined,
                    })
                  }
                  className={inputClass}
                >
                  <option value="" className="bg-neutral-900">
                    Select sub-type...
                  </option>
                  {Object.entries(DEFENCE_SUB_TYPE_LABELS).map(
                    ([val, label]) => (
                      <option key={val} value={val} className="bg-neutral-900">
                        {label}
                      </option>
                    ),
                  )}
                </select>
              </div>
            )}

            {/* EC Sub-Type */}
            {showEcSub && (
              <div>
                <label className="block text-xs text-white/60 mb-1">
                  Exceptional Circumstance (optional)
                </label>
                <select
                  value={period.ecSubType || ""}
                  onChange={(e) =>
                    updatePeriod(period.id, {
                      ecSubType:
                        (e.target.value as ExceptionalCircumstanceSubType) ||
                        undefined,
                      covidArticulableLink: undefined,
                      covidJurisdiction: undefined,
                    })
                  }
                  className={inputClass}
                >
                  <option value="" className="bg-neutral-900">
                    None
                  </option>
                  {Object.entries(EC_SUB_TYPE_LABELS).map(([val, label]) => (
                    <option key={val} value={val} className="bg-neutral-900">
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* COVID fields */}
            {showCovid && (
              <div className="space-y-3 rounded-lg bg-amber-500/10 border border-amber-500/30 p-3">
                <p className="text-xs text-amber-200 font-medium">
                  COVID-19 delay requires an articulable link and jurisdiction
                  confirmation.
                </p>
                <div>
                  <label className="block text-xs text-white/60 mb-1">
                    Articulable Link to COVID-19
                    <span className="text-red-400"> *</span>
                  </label>
                  <textarea
                    value={period.covidArticulableLink || ""}
                    onChange={(e) =>
                      updatePeriod(period.id, {
                        covidArticulableLink: e.target.value || undefined,
                      })
                    }
                    placeholder="Describe the specific, articulable link between the delay and COVID-19..."
                    rows={3}
                    className={`${inputClass} resize-y`}
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-1">
                    COVID Jurisdiction
                    <span className="text-red-400"> *</span>
                  </label>
                  <select
                    value={period.covidJurisdiction || ""}
                    onChange={(e) =>
                      updatePeriod(period.id, {
                        covidJurisdiction:
                          (e.target.value as Jurisdiction) || undefined,
                      })
                    }
                    className={inputClass}
                  >
                    <option value="" className="bg-neutral-900">
                      Select jurisdiction...
                    </option>
                    {JURISDICTIONS.map((j) => (
                      <option
                        key={j.value}
                        value={j.value}
                        className="bg-neutral-900"
                      >
                        {j.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="block text-xs text-white/60 mb-1">
                Notes (optional)
              </label>
              <input
                type="text"
                value={period.notes || ""}
                onChange={(e) =>
                  updatePeriod(period.id, {
                    notes: e.target.value || undefined,
                  })
                }
                placeholder="Brief note about this delay period..."
                className={inputClass}
              />
            </div>

            {errors?.[period.id] && (
              <p className="text-sm text-red-400">{errors[period.id]}</p>
            )}
          </div>
        );
      })}

      {overlappingIds.size > 0 && (
        <div className="rounded-lg bg-red-500/20 border border-red-500/40 px-4 py-3 text-sm text-red-200">
          <strong>Warning:</strong> Overlapping delay periods detected. Review
          highlighted periods to ensure dates do not conflict.
        </div>
      )}
    </div>
  );
}
