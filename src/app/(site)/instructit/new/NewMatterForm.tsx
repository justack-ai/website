/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { MatterType, MatterJurisdiction } from "@/lib/instructit/types";

const MATTER_TYPES: { value: MatterType; label: string }[] = [
  { value: "criminal", label: "Criminal" },
  { value: "civil", label: "Civil" },
  { value: "family", label: "Family" },
  { value: "administrative", label: "Administrative" },
  { value: "other", label: "Other" },
];

const JURISDICTIONS: { value: MatterJurisdiction; label: string }[] = [
  { value: "ontario_superior", label: "Ontario Superior Court of Justice" },
  { value: "ontario_ontario_court", label: "Ontario Court of Justice" },
  { value: "ontario_divisional", label: "Ontario Divisional Court" },
  { value: "ontario_court_of_appeal", label: "Ontario Court of Appeal" },
  { value: "federal_court", label: "Federal Court of Canada" },
  { value: "supreme_court_canada", label: "Supreme Court of Canada" },
];

export default function NewMatterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const body = {
      matter_type: fd.get("matter_type") as MatterType,
      jurisdiction: fd.get("jurisdiction") as MatterJurisdiction,
      client_name: (fd.get("client_name") as string).trim(),
      opposing_party: (fd.get("opposing_party") as string).trim() || undefined,
      counsel_name: (fd.get("counsel_name") as string).trim() || undefined,
      charge_date: (fd.get("charge_date") as string) || undefined,
      court_level: (fd.get("court_level") as string).trim() || undefined,
      current_posture: (fd.get("current_posture") as string).trim() || undefined,
    };

    if (!body.matter_type || !body.jurisdiction || !body.client_name) {
      setError("Matter type, jurisdiction, and client name are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/instructit/matters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Failed to create matter.");
        setLoading(false);
        return;
      }

      router.push(`/instructit/${data.matter.id}`);
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Matter Type <span className="text-red-500">*</span>
          </label>
          <select
            name="matter_type"
            required
            defaultValue=""
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="" disabled>Select type</option>
            {MATTER_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Jurisdiction <span className="text-red-500">*</span>
          </label>
          <select
            name="jurisdiction"
            required
            defaultValue=""
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="" disabled>Select jurisdiction</option>
            {JURISDICTIONS.map((j) => (
              <option key={j.value} value={j.value}>{j.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Client Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="client_name"
          required
          placeholder="Full legal name"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Opposing Party
          </label>
          <input
            type="text"
            name="opposing_party"
            placeholder="Optional"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Counsel Name
          </label>
          <input
            type="text"
            name="counsel_name"
            placeholder="Lawyer on record"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Charge / Filing Date
          </label>
          <input
            type="date"
            name="charge_date"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Court Level / Division
          </label>
          <input
            type="text"
            name="court_level"
            placeholder="e.g. General Division"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Current Posture
        </label>
        <input
          type="text"
          name="current_posture"
          placeholder="e.g. Pre-trial, Disclosure, Sentencing"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Creating matter…" : "Create Matter"}
        </button>
      </div>
    </form>
  );
}
