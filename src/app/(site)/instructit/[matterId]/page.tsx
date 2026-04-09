/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { createClient } from "@/lib/instructit/supabase/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import type { MatterRow, InstructionRow } from "@/lib/instructit/types";
import InstructionCaptureForm from "./InstructionCaptureForm";

const JURISDICTION_LABELS: Record<string, string> = {
  ontario_superior: "Ontario Superior Court of Justice",
  ontario_ontario_court: "Ontario Court of Justice",
  ontario_divisional: "Ontario Divisional Court",
  ontario_court_of_appeal: "Ontario Court of Appeal",
  federal_court: "Federal Court of Canada",
  supreme_court_canada: "Supreme Court of Canada",
};

const TYPE_BADGES: Record<string, string> = {
  fact: "bg-blue-100 text-blue-800",
  decision: "bg-purple-100 text-purple-800",
  authorization: "bg-green-100 text-green-800",
  constraint: "bg-orange-100 text-orange-800",
  delegation: "bg-gray-100 text-gray-700",
};

export default async function MatterPage({
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

  const { data: instructions } = await supabase
    .from("instructions")
    .select("*")
    .eq("matter_id", matterId)
    .order("recorded_at", { ascending: false });

  const m = matter as MatterRow;
  const instrs = (instructions ?? []) as InstructionRow[];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-500">
          <Link href="/instructit" className="hover:text-gray-700">Matters</Link>
          {" / "}
          <span className="text-gray-700">{m.client_name}</span>
        </div>

        {/* Matter header */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">{m.client_name}</h1>
              <p className="text-sm text-gray-500 mt-1">
                {m.matter_type.charAt(0).toUpperCase() + m.matter_type.slice(1)}
                {" · "}
                {JURISDICTION_LABELS[m.jurisdiction] ?? m.jurisdiction}
              </p>
              {m.current_posture && (
                <p className="text-sm text-gray-600 mt-1">{m.current_posture}</p>
              )}
            </div>
            <div className="flex gap-2 shrink-0 ml-4">
              <Link
                href={`/instructit/${matterId}/audit`}
                className="text-sm border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors"
              >
                Audit Log
              </Link>
              <Link
                href={`/instructit/${matterId}/export`}
                className="text-sm border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors"
              >
                Export
              </Link>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
            {m.opposing_party && (
              <div>
                <span className="text-gray-400 text-xs uppercase tracking-wide">Opposing</span>
                <p className="text-gray-800">{m.opposing_party}</p>
              </div>
            )}
            {m.counsel_name && (
              <div>
                <span className="text-gray-400 text-xs uppercase tracking-wide">Counsel</span>
                <p className="text-gray-800">{m.counsel_name}</p>
              </div>
            )}
            {m.charge_date && (
              <div>
                <span className="text-gray-400 text-xs uppercase tracking-wide">Charge Date</span>
                <p className="text-gray-800">{m.charge_date}</p>
              </div>
            )}
          </div>

          <p className="mt-4 text-xs text-gray-300 font-mono">ID: {m.id}</p>
        </div>

        {/* Instruction capture */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
            Record Instruction
          </h2>
          <InstructionCaptureForm matterId={matterId} defaultAuthor={user.email ?? ""} />
        </div>

        {/* Instruction list */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
            Instruction Record ({instrs.length})
          </h2>

          {instrs.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-sm text-gray-400">
              No instructions recorded yet.
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
              {instrs.map((instr) => (
                <div key={instr.id} className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    <span
                      className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full mt-0.5 ${TYPE_BADGES[instr.instruction_type] ?? "bg-gray-100 text-gray-700"}`}
                    >
                      {instr.instruction_type.toUpperCase()}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 whitespace-pre-wrap">{instr.content}</p>
                      {instr.note && (
                        <p className="text-xs text-gray-500 mt-1">Note: {instr.note}</p>
                      )}
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                        <span>{instr.author}</span>
                        <span>·</span>
                        <span>{new Date(instr.recorded_at).toLocaleString("en-CA")}</span>
                        {instr.ai_generated && (
                          <>
                            <span>·</span>
                            <span className="text-amber-600 font-medium">AI-generated</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
