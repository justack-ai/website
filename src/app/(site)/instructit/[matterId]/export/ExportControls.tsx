/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import { useState } from "react";

interface Props {
  matterId: string;
}

export default function ExportControls({ matterId }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function triggerExport(format: "pdf" | "json") {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`/api/instructit/matters/${matterId}/export`, {
        method: "POST",
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Export failed.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      const stem = data.filename_stem as string;

      if (format === "pdf") {
        const bytes = Uint8Array.from(atob(data.pdf_base64), (c) => c.charCodeAt(0));
        const blob = new Blob([bytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${stem}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      } else {
        const json = JSON.stringify(data.json_export, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${stem}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-3">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900 text-sm">PDF Production Copy</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Law Society of Ontario format. Includes cover, instruction table, and page footers.
            </p>
          </div>
          <button
            onClick={() => triggerExport("pdf")}
            disabled={loading}
            className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0 ml-4"
          >
            {loading ? "Generating…" : "Download PDF"}
          </button>
        </div>

        <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900 text-sm">JSON Export</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Machine-readable export of all matter and instruction data.
            </p>
          </div>
          <button
            onClick={() => triggerExport("json")}
            disabled={loading}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0 ml-4"
          >
            {loading ? "Generating…" : "Download JSON"}
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center">
        Both formats are generated from the same API call. The export event is recorded in the audit log.
      </p>
    </div>
  );
}
