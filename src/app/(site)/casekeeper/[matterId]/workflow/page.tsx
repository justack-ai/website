/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { createClient } from "@/lib/casekeeper/supabase/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getWorkflowConfig } from "@/lib/casekeeper/configs";
import type { MatterRow, WorkflowNodeStateRow } from "@/lib/casekeeper/types";
import WorkflowWizard from "./WorkflowWizard";

export default async function WorkflowPage({
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
  const config = getWorkflowConfig(m.workflow_config_id);

  if (!config) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">No workflow configuration found for this matter.</p>
      </div>
    );
  }

  const { data: nodeStates } = await supabase
    .from("workflow_node_states")
    .select("*")
    .eq("matter_id", matterId);

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
          <span className="text-gray-700">Workflow</span>
        </div>

        <h1 className="text-xl font-bold text-gray-900 mb-2">
          {config.label}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Step through each node and record your decisions.
        </p>

        <WorkflowWizard
          matterId={matterId}
          config={config}
          nodeStates={(nodeStates ?? []) as WorkflowNodeStateRow[]}
        />
      </div>
    </div>
  );
}
