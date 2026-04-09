/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export type MatterType =
  | "criminal"
  | "civil"
  | "family"
  | "administrative"
  | "other";

export type MatterJurisdiction =
  | "ontario_superior"
  | "ontario_ontario_court"
  | "ontario_divisional"
  | "ontario_court_of_appeal"
  | "federal_court"
  | "supreme_court_canada";

export type InstructionType =
  | "fact"
  | "decision"
  | "authorization"
  | "constraint"
  | "delegation";

export interface MatterRow {
  id: string;
  owner_id: string;
  matter_type: MatterType;
  jurisdiction: MatterJurisdiction;
  client_name: string;
  opposing_party: string | null;
  counsel_name: string | null;
  charge_date: string | null;
  court_level: string | null;
  current_posture: string | null;
  created_at: string;
  updated_at: string;
  archived_at: string | null;
}

export interface InstructionRow {
  id: string;
  matter_id: string;
  owner_id: string;
  instruction_type: InstructionType;
  content: string;
  note: string | null;
  author: string;
  ai_generated: boolean;
  recorded_at: string;
  workflow_node_id: string | null;
}

export interface AuditLogRow {
  id: string;
  matter_id: string;
  owner_id: string;
  event_type: string;
  entity_type: string;
  entity_id: string | null;
  payload: Record<string, unknown>;
  actor: string;
  actor_id: string;
  recorded_at: string;
}

export interface CreateMatterInput {
  matter_type: MatterType;
  jurisdiction: MatterJurisdiction;
  client_name: string;
  opposing_party?: string;
  counsel_name?: string;
  charge_date?: string;
  court_level?: string;
  current_posture?: string;
}

export interface CreateInstructionInput {
  instruction_type: InstructionType;
  content: string;
  note?: string;
  author: string;
  ai_generated?: boolean;
  workflow_node_id?: string;
}
