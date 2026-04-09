/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { InstructionType } from "@/lib/instructit/types";

const INSTRUCTION_TYPES: { value: InstructionType; label: string; description: string }[] = [
  { value: "fact", label: "Fact", description: "Client-provided fact for the record" },
  { value: "decision", label: "Decision", description: "Client decision on a matter in issue" },
  { value: "authorization", label: "Authorization", description: "Client authorization for counsel to act" },
  { value: "constraint", label: "Constraint", description: "Client-imposed constraint or limit" },
  { value: "delegation", label: "Delegation", description: "Delegation of authority from client to counsel" },
];

interface Props {
  matterId: string;
  defaultAuthor: string;
}

export default function InstructionCaptureForm({ matterId, defaultAuthor }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const body = {
      instruction_type: fd.get("instruction_type") as InstructionType,
      content: (fd.get("content") as string).trim(),
      note: (fd.get("note") as string).trim() || undefined,
      author: (fd.get("author") as string).trim(),
      ai_generated: fd.get("ai_generated") === "on",
    };

    if (!body.instruction_type || !body.content || !body.author) {
      setError("Type, content, and author are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/instructit/matters/${matterId}/instructions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Failed to record instruction.");
        setLoading(false);
        return;
      }

      form.reset();
      setSuccess(true);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-5 space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-md">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-md">
          Instruction recorded.
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type <span className="text-red-500">*</span>
          </label>
          <select
            name="instruction_type"
            required
            defaultValue=""
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="" disabled>Select type</option>
            {INSTRUCTION_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label} — {t.description}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="author"
            required
            defaultValue={defaultAuthor}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Instruction Content <span className="text-red-500">*</span>
        </label>
        <textarea
          name="content"
          required
          rows={3}
          placeholder="Record the instruction exactly as given by the client or as observed."
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-y"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Note (optional)
        </label>
        <input
          type="text"
          name="note"
          placeholder="Contextual note — not part of the instruction itself"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
          <input
            type="checkbox"
            name="ai_generated"
            className="rounded border-gray-300"
          />
          AI-generated content
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-gray-900 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Recording…" : "Record Instruction"}
        </button>
      </div>
    </form>
  );
}
