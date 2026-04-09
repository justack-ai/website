/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { createClient } from "@/lib/instructit/supabase/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import type { MatterRow, AuditLogRow } from "@/lib/instructit/types";

const EVENT_BADGES: Record<string, string> = {
  "matter.created": "bg-blue-100 text-blue-800",
  "instruction.recorded": "bg-green-100 text-green-800",
  "matter.exported": "bg-purple-100 text-purple-800",
};

export default async function AuditLogPage({
  params,
}: {
  params: Promise<{ matterId: string }>;
}) {
  const { matterId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: matter, error: matterError } = await supabase
    .from("matters")
    .select("*")
    .eq("id", matterId)
    .single();

  if (matterError || !matter) {
    notFound();
  }

  const { data: auditLog } = await supabase
    .from("audit_log")
    .select("*")
    .eq("matter_id", matterId)
    .order("recorded_at", { ascending: true });

  const m = matter as MatterRow;
  const entries = (auditLog ?? []) as AuditLogRow[];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-6 text-sm text-gray-500">
          <Link href="/instructit" className="hover:text-gray-700">Matters</Link>
          {" / "}
          <Link href={`/instructit/${matterId}`} className="hover:text-gray-700">{m.client_name}</Link>
          {" / "}
          <span className="text-gray-700">Audit Log</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-gray-900">Audit Log</h1>
          <span className="text-sm text-gray-500">{entries.length} entries</span>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-md px-4 py-3 mb-6 text-sm text-amber-800">
          This log is append-only and immutable. No entries may be modified or deleted.
        </div>

        {entries.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-sm text-gray-400">
            No audit entries yet.
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
            {entries.map((entry) => (
              <div key={entry.id} className="px-5 py-4">
                <div className="flex items-start gap-3">
                  <span
                    className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full mt-0.5 ${EVENT_BADGES[entry.event_type] ?? "bg-gray-100 text-gray-700"}`}
                  >
                    {entry.event_type}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="font-medium text-gray-700">{entry.actor}</span>
                      <span>·</span>
                      <span>{new Date(entry.recorded_at).toLocaleString("en-CA")}</span>
                      <span>·</span>
                      <span className="text-gray-400">{entry.entity_type}</span>
                    </div>
                    {entry.entity_id && (
                      <p className="text-xs text-gray-300 font-mono mt-0.5">
                        entity: {entry.entity_id}
                      </p>
                    )}
                    <details className="mt-2">
                      <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">
                        View payload
                      </summary>
                      <pre className="mt-2 text-xs bg-gray-50 border border-gray-200 rounded p-3 overflow-x-auto text-gray-700 whitespace-pre-wrap">
                        {JSON.stringify(entry.payload, null, 2)}
                      </pre>
                    </details>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
