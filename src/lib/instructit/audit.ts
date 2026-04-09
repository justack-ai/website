/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { SupabaseClient } from "@supabase/supabase-js";

export interface WriteAuditEntryParams {
  supabase: SupabaseClient;
  matter_id: string;
  owner_id: string;
  event_type: string;
  entity_type: string;
  entity_id?: string;
  payload: Record<string, unknown>;
  actor: string;
  actor_id: string;
}

export async function writeAuditEntry({
  supabase,
  matter_id,
  owner_id,
  event_type,
  entity_type,
  entity_id,
  payload,
  actor,
  actor_id,
}: WriteAuditEntryParams): Promise<void> {
  const { error } = await supabase.from("audit_log").insert({
    matter_id,
    owner_id,
    event_type,
    entity_type,
    entity_id: entity_id ?? null,
    payload,
    actor,
    actor_id,
  });

  if (error) {
    console.error("[InstructIT] audit write failed:", error);
    // Do not throw — audit failure must not interrupt the primary operation.
    // Callers should monitor audit_log for gaps separately.
  }
}
