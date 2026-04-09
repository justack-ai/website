/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import { useCallback } from "react";
import type { CaseEvent, CaseEventType, CourtLevel } from "@/lib/jordan/types";

interface CaseEventsLogProps {
  events: CaseEvent[];
  onChange: (events: CaseEvent[]) => void;
  errors?: Record<string, string>;
}

const EVENT_TYPE_LABELS: Record<CaseEventType, string> = {
  re_election: "Re-election",
  direct_indictment: "Direct indictment",
  preliminary_inquiry_scheduled: "Preliminary inquiry scheduled",
  preliminary_inquiry_completed: "Preliminary inquiry completed",
  mistrial: "Mistrial",
  retrial: "Retrial",
};

const COURT_OPTIONS: { value: CourtLevel; label: string }[] = [
  { value: "OCJ", label: "OCJ" },
  { value: "OSCJ", label: "OSCJ" },
];

function generateId() {
  return `evt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function CaseEventsLog({
  events,
  onChange,
  errors,
}: CaseEventsLogProps) {
  const addEvent = useCallback(() => {
    const newEvent: CaseEvent = {
      id: generateId(),
      type: "re_election",
      date: "",
    };
    onChange([...events, newEvent]);
  }, [events, onChange]);

  const removeEvent = useCallback(
    (id: string) => {
      onChange(events.filter((e) => e.id !== id));
    },
    [events, onChange],
  );

  const updateEvent = useCallback(
    (id: string, patch: Partial<CaseEvent>) => {
      onChange(
        events.map((e) => (e.id === id ? { ...e, ...patch } : e)),
      );
    },
    [events, onChange],
  );

  const inputClass =
    "w-full rounded-lg bg-white/10 border border-white/20 px-4 py-2 text-white placeholder-white/40 focus:border-violet focus:outline-none";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-white">Case Events</h3>
        <button
          type="button"
          onClick={addEvent}
          className="rounded-lg bg-teal px-4 py-2 text-sm text-white font-medium hover:bg-teal/80 transition-colors"
        >
          + Add Event
        </button>
      </div>

      {events.length === 0 && (
        <p className="text-sm text-white/40">
          No case events added. Add events such as re-elections, mistrials, or
          direct indictments if applicable.
        </p>
      )}

      {events.map((event, index) => (
        <div
          key={event.id}
          className="rounded-lg bg-white/5 border border-white/10 p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/50">Event {index + 1}</span>
            <button
              type="button"
              onClick={() => removeEvent(event.id)}
              className="text-xs text-red-400 hover:text-red-300 transition-colors"
            >
              Remove
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-white/60 mb-1">
                Event Type
              </label>
              <select
                value={event.type}
                onChange={(e) =>
                  updateEvent(event.id, {
                    type: e.target.value as CaseEventType,
                    fromCourt: undefined,
                    toCourt: undefined,
                  })
                }
                className={inputClass}
              >
                {Object.entries(EVENT_TYPE_LABELS).map(([val, label]) => (
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
                value={event.date}
                onChange={(e) =>
                  updateEvent(event.id, { date: e.target.value })
                }
                className={inputClass}
              />
            </div>
          </div>

          {event.type === "re_election" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-white/60 mb-1">
                  From Court
                </label>
                <select
                  value={event.fromCourt || ""}
                  onChange={(e) =>
                    updateEvent(event.id, {
                      fromCourt: e.target.value as CourtLevel,
                    })
                  }
                  className={inputClass}
                >
                  <option value="" className="bg-neutral-900">
                    Select...
                  </option>
                  {COURT_OPTIONS.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      className="bg-neutral-900"
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-white/60 mb-1">
                  To Court
                </label>
                <select
                  value={event.toCourt || ""}
                  onChange={(e) =>
                    updateEvent(event.id, {
                      toCourt: e.target.value as CourtLevel,
                    })
                  }
                  className={inputClass}
                >
                  <option value="" className="bg-neutral-900">
                    Select...
                  </option>
                  {COURT_OPTIONS.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      className="bg-neutral-900"
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs text-white/60 mb-1">
              Notes (optional)
            </label>
            <input
              type="text"
              value={event.notes || ""}
              onChange={(e) =>
                updateEvent(event.id, { notes: e.target.value || undefined })
              }
              placeholder="Brief note about this event..."
              className={inputClass}
            />
          </div>

          {errors?.[event.id] && (
            <p className="text-sm text-red-400">{errors[event.id]}</p>
          )}
        </div>
      ))}
    </div>
  );
}
