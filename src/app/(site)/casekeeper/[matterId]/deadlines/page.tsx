/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { createClient } from "@/lib/casekeeper/supabase/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import type { MatterRow, DeadlineRow } from "@/lib/casekeeper/types";
import DeadlinePanel from "./DeadlinePanel";

export default async function DeadlinesPage({
  params,
}: {
  params: Promise<{ matterId: string }>;
}) {
  const { matterId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: matter } = await supabase
    .from("matters")
    .select("*")
    .eq("id", matterId)
    .single();

  if (!matter) notFound();

  const m = matter as MatterRow;

  const { data: deadlines } = await supabase
    .from("deadlines")
    .select("*")
    .eq("matter_id", matterId)
    .order("due_date", { ascending: true });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-6 text-sm text-gray-500">
          <Link href="/casekeeper" className="hover:text-gray-700">
            Matters
          </Link>
          {" / "}
          <Link
            href={`/casekeeper/${matterId}`}
            className="hover:text-gray-700"
          >
            {m.client_name}
          </Link>
          {" / "}
          <span className="text-gray-700">Deadlines</span>
        </div>

        <h1 className="text-xl font-bold text-gray-900 mb-6">Deadlines</h1>

        <DeadlinePanel
          matterId={matterId}
          deadlines={(deadlines ?? []) as DeadlineRow[]}
        />
      </div>
    </div>
  );
}
