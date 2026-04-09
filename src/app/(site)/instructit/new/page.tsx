/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { createClient } from "@/lib/instructit/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import NewMatterForm from "./NewMatterForm";

export default async function NewMatterPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-6">
          <Link
            href="/instructit"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Matters
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">New Matter</h1>
        <NewMatterForm />
      </div>
    </div>
  );
}
