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
  workflow_config_id: string;
  jordan_ceiling_days: number | null;
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
  workflow_config_id?: string;
}

export interface CreateInstructionInput {
  instruction_type: InstructionType;
  content: string;
  note?: string;
  author: string;
  ai_generated?: boolean;
  workflow_node_id?: string;
}

// --- Phase 1 types ---

export type NodeDecisionState =
  | "yes"
  | "no"
  | "pending"
  | "partial"
  | "unknown"
  | "delegated";

export type NodeType = "action" | "decision" | "deadline" | "info";

export type UrgencyLevel = "normal" | "urgent" | "overdue";

export type DelayCategory =
  | "defence"
  | "crown"
  | "institutional"
  | "exceptional"
  | "waived";

export interface DeadlineRule {
  label: string;
  days_from_reference: number;
  reference:
    | "charge_date"
    | "bail_hearing_date"
    | "trial_date"
    | "application_date"
    | "separation_date"
    | "custom";
  is_jordan: boolean;
}

export interface WorkflowEdge {
  condition: NodeDecisionState | "default";
  next_node_id: string;
  label?: string;
}

export interface WorkflowNode {
  id: string;
  type: NodeType;
  label: string;
  description: string;
  guidance?: string;
  available_decisions: NodeDecisionState[];
  edges: WorkflowEdge[];
  deadline_rule?: DeadlineRule;
  jordan_clock_start?: boolean;
  llm_nudge_eligible?: boolean;
}

export interface WorkflowConfig {
  id: string;
  label: string;
  matter_type: MatterType;
  version: string;
  entry_node_id: string;
  nodes: Record<string, WorkflowNode>;
}

export interface WorkflowNodeStateRow {
  id: string;
  matter_id: string;
  owner_id: string;
  node_id: string;
  decision: NodeDecisionState;
  note: string | null;
  decided_at: string | null;
  decided_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface DeadlineRow {
  id: string;
  matter_id: string;
  owner_id: string;
  node_id: string | null;
  label: string;
  due_date: string;
  days_remaining: number;
  urgency: UrgencyLevel;
  is_jordan: boolean;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DelayPeriodRow {
  id: string;
  matter_id: string;
  owner_id: string;
  start_date: string;
  end_date: string;
  days: number;
  category: DelayCategory;
  description: string;
  source: string | null;
  recorded_at: string;
}

export interface NudgeContext {
  node: WorkflowNode;
  current_decision: NodeDecisionState;
  matter_type: MatterType;
  jurisdiction: MatterJurisdiction;
  recent_instructions: InstructionRow[];
}

export interface NudgeResponse {
  questions: string[];
  model: string;
  tokens_used: number;
}
