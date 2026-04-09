/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { createClient } from "@/lib/instructit/supabase/server";
import Link from "next/link";
import type { MatterRow } from "@/lib/instructit/types";

const JURISDICTION_LABELS: Record<string, string> = {
  ontario_superior: "Ontario Superior Court",
  ontario_ontario_court: "Ontario Court of Justice",
  ontario_divisional: "Ontario Divisional Court",
  ontario_court_of_appeal: "Ontario Court of Appeal",
  federal_court: "Federal Court",
  supreme_court_canada: "Supreme Court of Canada",
};

export default async function InstructITDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">InstructIT</h1>
          <p className="text-gray-600 mb-6">Sign in to access your matters.</p>
          <Link
            href="/auth/login"
            className="inline-block bg-gray-900 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const { data: matters } = await supabase
    .from("matters")
    .select("*")
    .is("archived_at", null)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">InstructIT</h1>
            <p className="text-sm text-gray-500 mt-1">An auditable and compliant tool for lawyers to get instructions from their clients.</p>
          </div>
          <Link
            href="/instructit/new"
            className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
          >
            New Matter
          </Link>
        </div>

        {/* Matter list */}
        {!matters || matters.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <p className="text-gray-500 text-sm mb-4">No matters yet.</p>
            <Link
              href="/instructit/new"
              className="inline-block bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              Create your first matter
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
            {(matters as MatterRow[]).map((matter) => (
              <Link
                key={matter.id}
                href={`/instructit/${matter.id}`}
                className="block px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{matter.client_name}</p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {matter.matter_type.charAt(0).toUpperCase() + matter.matter_type.slice(1)}
                      {" · "}
                      {JURISDICTION_LABELS[matter.jurisdiction] ?? matter.jurisdiction}
                    </p>
                    {matter.current_posture && (
                      <p className="text-sm text-gray-400 mt-0.5">{matter.current_posture}</p>
                    )}
                  </div>
                  <div className="text-right ml-4 shrink-0">
                    <p className="text-xs text-gray-400">
                      {new Date(matter.created_at).toLocaleDateString("en-CA")}
                    </p>
                    <p className="text-xs text-gray-300 mt-0.5 font-mono">
                      {matter.id.slice(0, 8)}…
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
