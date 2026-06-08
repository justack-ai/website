/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// Browser-safe Supabase client. Must NOT import "next/headers" or any
// server-only module — this file is bundled into client components.
// Server-only clients live in supabase-server.ts.

import { createBrowserClient as createBrowser } from "@supabase/ssr";

export function createBrowserClient() {
  return createBrowser(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
