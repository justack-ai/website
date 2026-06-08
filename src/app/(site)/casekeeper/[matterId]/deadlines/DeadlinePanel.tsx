/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { DeadlineRow, UrgencyLevel } from "@/lib/casekeeper/types";

const URGENCY_BADGE: Record<UrgencyLevel, string> = {
  normal: "bg-gray-100 text-gray-700",
  urgent: "bg-yellow-100 text-yellow-800",
  overdue: "bg-red-100 text-red-800",
};

interface Props {
  matterId: string;
  deadlines: DeadlineRow[];
}

export default function DeadlinePanel({ matterId, deadlines }: Props) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData(e.currentTarget);

    const res = await fetch(`/api/casekeeper/matters/${matterId}/deadlines`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        label: fd.get("label"),
        due_date: fd.get("due_date"),
        is_jordan: fd.get("is_jordan") === "on",
      }),
    });

    if (res.ok) {
      setShowForm(false);
      router.refresh();
    }
    setSaving(false);
  }

  const active = deadlines.filter((d) => !d.resolved_at);
  const resolved = deadlines.filter((d) => d.resolved_at);

  return (
    <div className="space-y-6">
      {/* Active deadlines */}
      {active.length === 0 && !showForm ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-sm text-gray-400">
          No active deadlines.
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
          {active.map((d) => (
            <div key={d.id} className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {d.is_jordan && (
                  <span className="text-xs font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                    JORDAN
                  </span>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">{d.label}</p>
                  <p className="text-xs text-gray-500">
                    Due: {new Date(d.due_date).toLocaleDateString("en-CA")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-gray-500">
                  {d.days_remaining}d
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${URGENCY_BADGE[d.urgency]}`}
                >
                  {d.urgency.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add deadline form */}
      {showForm ? (
        <form
          onSubmit={handleCreate}
          className="bg-white border border-gray-200 rounded-lg p-5 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Label
            </label>
            <input
              type="text"
              name="label"
              required
              placeholder="e.g. Crown disclosure due"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                name="due_date"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" name="is_jordan" className="rounded" />
                Jordan-relevant
              </label>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="bg-gray-900 text-white text-sm px-4 py-2 rounded-md hover:bg-gray-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Add Deadline"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50"
        >
          + Add Deadline
        </button>
      )}

      {/* Resolved deadlines */}
      {resolved.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
            Resolved
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100 opacity-60">
            {resolved.map((d) => (
              <div key={d.id} className="px-5 py-3 flex items-center justify-between">
                <p className="text-sm text-gray-500 line-through">{d.label}</p>
                <span className="text-xs text-gray-400">
                  {new Date(d.due_date).toLocaleDateString("en-CA")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
