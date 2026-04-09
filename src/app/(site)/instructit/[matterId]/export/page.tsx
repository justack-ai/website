/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { createClient } from "@/lib/instructit/supabase/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import type { MatterRow } from "@/lib/instructit/types";
import ExportControls from "./ExportControls";

export default async function ExportPage({
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

  const { count } = await supabase
    .from("instructions")
    .select("*", { count: "exact", head: true })
    .eq("matter_id", matterId);

  const m = matter as MatterRow;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-6 text-sm text-gray-500">
          <Link href="/instructit" className="hover:text-gray-700">Matters</Link>
          {" / "}
          <Link href={`/instructit/${matterId}`} className="hover:text-gray-700">{m.client_name}</Link>
          {" / "}
          <span className="text-gray-700">Export</span>
        </div>

        <h1 className="text-xl font-bold text-gray-900 mb-6">Export Matter Record</h1>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
          <h2 className="font-semibold text-gray-800 mb-3">Matter Summary</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex gap-2">
              <dt className="text-gray-500 w-32 shrink-0">Client</dt>
              <dd className="text-gray-800">{m.client_name}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-gray-500 w-32 shrink-0">Matter ID</dt>
              <dd className="text-gray-800 font-mono text-xs">{m.id}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-gray-500 w-32 shrink-0">Instructions</dt>
              <dd className="text-gray-800">{count ?? 0}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-gray-500 w-32 shrink-0">Created</dt>
              <dd className="text-gray-800">{new Date(m.created_at).toLocaleString("en-CA")}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-md px-4 py-3 mb-6 text-sm text-amber-800">
          Exports are logged in the audit trail. The PDF is marked as a Law Society of Ontario
          production copy. Do not falsify or alter this document.
        </div>

        <ExportControls matterId={matterId} />
      </div>
    </div>
  );
}
