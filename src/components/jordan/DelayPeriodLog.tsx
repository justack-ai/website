/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import type { DelayPeriod, AttributionParty, DefenceSubType, ExceptionalCircumstanceSubType, Jurisdiction } from "@/lib/jordan/types";
import { DEFENCE_SUB_TYPE_LABELS, EC_SUB_TYPE_LABELS } from "@/lib/jordan/types";

interface DelayPeriodLogProps {
  periods: DelayPeriod[];
  onChange: (periods: DelayPeriod[]) => void;
  errors?: Record<string, string>;
}

const PARTIES: AttributionParty[] = ["Crown", "Defence", "Institutional", "Joint"];
const JURISDICTIONS: { value: Jurisdiction; label: string }[] = [
  { value: "ON", label: "Ontario" },
  { value: "AB", label: "Alberta" },
  { value: "SK", label: "Saskatchewan" },
  { value: "BC", label: "British Columbia" },
  { value: "FED", label: "Federal" },
  { value: "OTHER", label: "Other" },
];

export default function DelayPeriodLog({ periods, onChange, errors }: DelayPeriodLogProps) {
  const addPeriod = () => {
    onChange([...periods, { id: crypto.randomUUID(), startDate: "", endDate: "", party: "Crown" }]);
  };

  const removePeriod = (id: string) => {
    onChange(periods.filter((p) => p.id !== id));
  };

  const updatePeriod = (id: string, updates: Partial<DelayPeriod>) => {
    onChange(periods.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const isCovid = (subType?: ExceptionalCircumstanceSubType) =>
    subType === "covid_ontario" || subType === "covid_alberta" || subType === "covid_other";

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium text-white/80">Delay Periods</label>
        <button type="button" onClick={addPeriod} className="rounded bg-violet/20 px-3 py-1 text-xs text-violet-300 hover:bg-violet/30 transition-colors">
          + Add Period
        </button>
      </div>

      {periods.length === 0 && (
        <p className="text-xs text-white/40">Add delay periods with start/end dates and attribution party.</p>
      )}

      <div className="space-y-4">
        {periods.map((period) => (
          <div key={period.id} className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-3">
            {/* Dates and party */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
              <div>
                <label className="text-xs text-white/50 mb-1 block">Start Date</label>
                <input type="date" value={period.startDate} onChange={(e) => updatePeriod(period.id, { startDate: e.target.value })}
                  className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white focus:border-violet focus:outline-none" />
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1 block">End Date</label>
                <input type="date" value={period.endDate} onChange={(e) => updatePeriod(period.id, { endDate: e.target.value })}
                  className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white focus:border-violet focus:outline-none" />
              </div>
              <div>
                <label className="text-xs text-white/50 mb-1 block">Attribution</label>
                <select value={period.party} onChange={(e) => updatePeriod(period.id, { party: e.target.value as AttributionParty, defenceSubType: undefined, ecSubType: undefined })}
                  className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white focus:border-violet focus:outline-none">
                  {PARTIES.map((p) => <option key={p} value={p} className="bg-gray-900">{p}</option>)}
                </select>
              </div>
              <div className="flex items-end">
                <button type="button" onClick={() => removePeriod(period.id)} className="text-red-400/60 hover:text-red-400 text-sm pb-2">Remove</button>
              </div>
            </div>

            {/* Defence sub-type */}
            {period.party === "Defence" && (
              <div>
                <label className="text-xs text-white/50 mb-1 block">Defence Delay Sub-type</label>
                <select value={period.defenceSubType ?? ""} onChange={(e) => updatePeriod(period.id, { defenceSubType: e.target.value as DefenceSubType })}
                  className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white focus:border-violet focus:outline-none">
                  <option value="" className="bg-gray-900">Select sub-type</option>
                  {Object.entries(DEFENCE_SUB_TYPE_LABELS).map(([k, v]) => (
                    <option key={k} value={k} className="bg-gray-900">{v}</option>
                  ))}
                </select>
              </div>
            )}

            {/* EC sub-type */}
            {(period.party === "Crown" || period.party === "Institutional") && (
              <div>
                <label className="text-xs text-white/50 mb-1 block">Exceptional Circumstance (optional)</label>
                <select value={period.ecSubType ?? ""} onChange={(e) => updatePeriod(period.id, { ecSubType: (e.target.value || undefined) as ExceptionalCircumstanceSubType | undefined })}
                  className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white focus:border-violet focus:outline-none">
                  <option value="" className="bg-gray-900">None</option>
                  {Object.entries(EC_SUB_TYPE_LABELS).map(([k, v]) => (
                    <option key={k} value={k} className="bg-gray-900">{v}</option>
                  ))}
                </select>
              </div>
            )}

            {/* COVID fields */}
            {isCovid(period.ecSubType) && (
              <div className="space-y-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                <p className="text-xs text-amber-300 font-medium">COVID-19 requires articulable link and jurisdiction confirmation</p>
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Articulable link to COVID-19</label>
                  <textarea value={period.covidArticulableLink ?? ""} onChange={(e) => updatePeriod(period.id, { covidArticulableLink: e.target.value })}
                    placeholder="Describe the specific link between this delay period and the pandemic..."
                    rows={2}
                    className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white placeholder-white/30 focus:border-violet focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs text-white/50 mb-1 block">Jurisdiction</label>
                  <select value={period.covidJurisdiction ?? ""} onChange={(e) => updatePeriod(period.id, { covidJurisdiction: (e.target.value || undefined) as Jurisdiction | undefined })}
                    className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white focus:border-violet focus:outline-none">
                    <option value="" className="bg-gray-900">Select jurisdiction</option>
                    {JURISDICTIONS.map((j) => <option key={j.value} value={j.value} className="bg-gray-900">{j.label}</option>)}
                  </select>
                </div>
              </div>
            )}

            {errors?.[period.id] && <p className="text-xs text-red-400">{errors[period.id]}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
