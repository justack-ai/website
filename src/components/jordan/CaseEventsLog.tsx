/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import type { CaseEvent, CaseEventType, CourtLevel } from "@/lib/jordan/types";

interface CaseEventsLogProps {
  events: CaseEvent[];
  onChange: (events: CaseEvent[]) => void;
  errors?: Record<string, string>;
}

const EVENT_TYPES: { value: CaseEventType; label: string }[] = [
  { value: "re_election", label: "Re-election" },
  { value: "direct_indictment", label: "Direct indictment" },
  { value: "preliminary_inquiry_scheduled", label: "Preliminary inquiry — scheduled" },
  { value: "preliminary_inquiry_completed", label: "Preliminary inquiry — completed" },
  { value: "mistrial", label: "Mistrial" },
  { value: "retrial", label: "Retrial" },
];

const COURTS: CourtLevel[] = ["OCJ", "OSCJ"];

export default function CaseEventsLog({ events, onChange, errors }: CaseEventsLogProps) {
  const addEvent = () => {
    onChange([...events, { id: crypto.randomUUID(), type: "re_election", date: "" }]);
  };

  const removeEvent = (id: string) => {
    onChange(events.filter((e) => e.id !== id));
  };

  const updateEvent = (id: string, updates: Partial<CaseEvent>) => {
    onChange(events.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium text-white/80">Case Events</label>
        <button type="button" onClick={addEvent} className="rounded bg-violet/20 px-3 py-1 text-xs text-violet-300 hover:bg-violet/30 transition-colors">
          + Add Event
        </button>
      </div>

      {events.length === 0 && (
        <p className="text-xs text-white/40">No case events. Add re-election, direct indictment, retrial, etc. if applicable.</p>
      )}

      <div className="space-y-3">
        {events.map((evt) => (
          <div key={evt.id} className="rounded-lg border border-white/10 bg-white/5 p-4 space-y-3">
            <div className="flex items-center gap-3">
              <select
                value={evt.type}
                onChange={(e) => updateEvent(evt.id, { type: e.target.value as CaseEventType })}
                className="flex-1 rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white focus:border-violet focus:outline-none"
              >
                {EVENT_TYPES.map((t) => (
                  <option key={t.value} value={t.value} className="bg-gray-900">{t.label}</option>
                ))}
              </select>
              <input
                type="date"
                value={evt.date}
                onChange={(e) => updateEvent(evt.id, { date: e.target.value })}
                className="rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white focus:border-violet focus:outline-none"
              />
              <button type="button" onClick={() => removeEvent(evt.id)} className="text-red-400/60 hover:text-red-400 text-sm">
                Remove
              </button>
            </div>

            {evt.type === "re_election" && (
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs text-white/50 mb-1 block">From Court</label>
                  <select
                    value={evt.fromCourt ?? ""}
                    onChange={(e) => updateEvent(evt.id, { fromCourt: e.target.value as CourtLevel })}
                    className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white focus:border-violet focus:outline-none"
                  >
                    <option value="" className="bg-gray-900">Select</option>
                    {COURTS.map((c) => <option key={c} value={c} className="bg-gray-900">{c}</option>)}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-xs text-white/50 mb-1 block">To Court</label>
                  <select
                    value={evt.toCourt ?? ""}
                    onChange={(e) => updateEvent(evt.id, { toCourt: e.target.value as CourtLevel })}
                    className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white focus:border-violet focus:outline-none"
                  >
                    <option value="" className="bg-gray-900">Select</option>
                    {COURTS.map((c) => <option key={c} value={c} className="bg-gray-900">{c}</option>)}
                  </select>
                </div>
              </div>
            )}

            {errors?.[evt.id] && <p className="text-xs text-red-400">{errors[evt.id]}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
