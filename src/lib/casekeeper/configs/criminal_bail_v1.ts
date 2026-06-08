/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { WorkflowConfig } from "../types";

export const criminalBailV1: WorkflowConfig = {
  id: "criminal_bail_v1",
  label: "Ontario Criminal — Bail",
  matter_type: "criminal",
  version: "1.0.0",
  entry_node_id: "charge_date_confirmed",

  nodes: {
    charge_date_confirmed: {
      id: "charge_date_confirmed",
      type: "action",
      label: "Confirm Charge Date",
      description:
        "Record date of first appearance — starts the Jordan clock.",
      guidance:
        "Confirm from the Information. Jordan ceiling runs from date charges were laid.",
      available_decisions: ["yes", "pending", "unknown"],
      jordan_clock_start: true,
      llm_nudge_eligible: false,
      edges: [
        { condition: "yes", next_node_id: "bail_required" },
        { condition: "pending", next_node_id: "bail_required" },
        { condition: "unknown", next_node_id: "bail_required" },
      ],
    },

    bail_required: {
      id: "bail_required",
      type: "decision",
      label: "Is Bail Required?",
      description:
        "Is client in custody and seeking release, or released on undertaking?",
      available_decisions: ["yes", "no", "pending", "unknown"],
      llm_nudge_eligible: true,
      edges: [
        {
          condition: "yes",
          next_node_id: "bail_hearing_scheduled",
          label: "Bail hearing required",
        },
        {
          condition: "no",
          next_node_id: "conditions_reviewed",
          label: "Released — review conditions",
        },
        { condition: "pending", next_node_id: "bail_hearing_scheduled" },
        { condition: "unknown", next_node_id: "bail_hearing_scheduled" },
      ],
    },

    bail_hearing_scheduled: {
      id: "bail_hearing_scheduled",
      type: "deadline",
      label: "Bail Hearing Scheduled",
      description: "Has a bail hearing date been set?",
      guidance:
        "Section 503 CCC: hearing within 24h of arrest. Record the hearing date.",
      available_decisions: ["yes", "no", "pending"],
      llm_nudge_eligible: true,
      deadline_rule: {
        label: "Bail Hearing (s.503 CCC)",
        days_from_reference: 1,
        reference: "charge_date",
        is_jordan: true,
      },
      edges: [{ condition: "default", next_node_id: "bail_plan_prepared" }],
    },

    bail_plan_prepared: {
      id: "bail_plan_prepared",
      type: "action",
      label: "Bail Plan Prepared",
      description:
        "Has the bail plan (surety, address, conditions) been prepared and reviewed with client?",
      guidance:
        "Strong plan addresses: suitable surety, stable residence, supervision, Crown concerns.",
      available_decisions: ["yes", "no", "partial", "pending", "delegated"],
      llm_nudge_eligible: true,
      edges: [{ condition: "default", next_node_id: "surety_confirmed" }],
    },

    surety_confirmed: {
      id: "surety_confirmed",
      type: "decision",
      label: "Surety Confirmed",
      description:
        "Is a surety identified, willing, and able to attend?",
      available_decisions: ["yes", "no", "partial", "pending", "unknown"],
      llm_nudge_eligible: true,
      edges: [
        { condition: "yes", next_node_id: "bail_hearing_outcome" },
        { condition: "no", next_node_id: "consent_release_considered" },
        { condition: "default", next_node_id: "bail_hearing_outcome" },
      ],
    },

    consent_release_considered: {
      id: "consent_release_considered",
      type: "decision",
      label: "Consent Release Considered",
      description:
        "Has Crown consent release without surety been explored?",
      available_decisions: ["yes", "no", "pending", "unknown"],
      llm_nudge_eligible: true,
      edges: [
        { condition: "default", next_node_id: "bail_hearing_outcome" },
      ],
    },

    bail_hearing_outcome: {
      id: "bail_hearing_outcome",
      type: "decision",
      label: "Bail Hearing Outcome",
      description:
        "What was the outcome? (Yes = released, No = detained)",
      available_decisions: ["yes", "no", "pending", "delegated"],
      llm_nudge_eligible: false,
      edges: [
        {
          condition: "yes",
          next_node_id: "conditions_reviewed",
          label: "Released",
        },
        {
          condition: "no",
          next_node_id: "detention_review_considered",
          label: "Detained",
        },
        { condition: "default", next_node_id: "conditions_reviewed" },
      ],
    },

    detention_review_considered: {
      id: "detention_review_considered",
      type: "decision",
      label: "Detention Review Considered",
      description:
        "Has a s.520 CCC detention review been considered?",
      guidance:
        "Review to Superior Court available if new evidence or changed circumstances.",
      available_decisions: ["yes", "no", "pending", "unknown"],
      llm_nudge_eligible: true,
      deadline_rule: {
        label: "Detention Review Window",
        days_from_reference: 30,
        reference: "bail_hearing_date",
        is_jordan: false,
      },
      edges: [
        { condition: "default", next_node_id: "conditions_reviewed" },
      ],
    },

    conditions_reviewed: {
      id: "conditions_reviewed",
      type: "action",
      label: "Release Conditions Reviewed with Client",
      description:
        "Have all release conditions been reviewed and understood by the client?",
      available_decisions: ["yes", "no", "partial", "pending", "delegated"],
      llm_nudge_eligible: false,
      edges: [{ condition: "default", next_node_id: "bail_complete" }],
    },

    bail_complete: {
      id: "bail_complete",
      type: "info",
      label: "Bail Phase Complete",
      description:
        "Continue to disclosure, pre-trial, or trial workflow.",
      available_decisions: ["yes"],
      llm_nudge_eligible: false,
      edges: [],
    },
  },
};
