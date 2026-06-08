/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { WorkflowConfig } from "../types";

/**
 * Criminal disclosure obligations workflow.
 * Based on R v Stinchcombe, [1991] 3 SCR 326 and Criminal Code provisions.
 * Crown must disclose all relevant evidence (inculpatory and exculpatory).
 */
export const criminalDisclosureV1: WorkflowConfig = {
  id: "criminal_disclosure_v1",
  label: "Ontario Criminal — Disclosure",
  matter_type: "criminal",
  version: "1.0.0",
  entry_node_id: "initial_disclosure_requested",

  nodes: {
    initial_disclosure_requested: {
      id: "initial_disclosure_requested",
      type: "action",
      label: "Initial Disclosure Requested",
      description:
        "Has a formal disclosure request been made to the Crown?",
      guidance:
        "R v Stinchcombe: Crown has constitutional obligation to disclose. Request in writing with date stamp.",
      available_decisions: ["yes", "no", "pending"],
      llm_nudge_eligible: true,
      edges: [
        { condition: "yes", next_node_id: "disclosure_received" },
        { condition: "default", next_node_id: "disclosure_received" },
      ],
    },

    disclosure_received: {
      id: "disclosure_received",
      type: "decision",
      label: "Disclosure Package Received",
      description:
        "Has the initial disclosure package been received from Crown?",
      available_decisions: ["yes", "no", "partial", "pending"],
      llm_nudge_eligible: true,
      deadline_rule: {
        label: "Initial Disclosure (Stinchcombe)",
        days_from_reference: 30,
        reference: "charge_date",
        is_jordan: true,
      },
      edges: [
        { condition: "yes", next_node_id: "disclosure_reviewed" },
        {
          condition: "partial",
          next_node_id: "outstanding_disclosure_identified",
          label: "Incomplete — identify gaps",
        },
        { condition: "no", next_node_id: "disclosure_delay_letter" },
        { condition: "default", next_node_id: "disclosure_reviewed" },
      ],
    },

    disclosure_delay_letter: {
      id: "disclosure_delay_letter",
      type: "action",
      label: "Disclosure Delay Letter Sent",
      description:
        "Has a letter been sent to Crown documenting the disclosure delay?",
      guidance:
        "Document the delay in writing. This creates the Jordan record if Crown is the cause.",
      available_decisions: ["yes", "no", "pending"],
      llm_nudge_eligible: true,
      edges: [
        { condition: "default", next_node_id: "disclosure_received" },
      ],
    },

    disclosure_reviewed: {
      id: "disclosure_reviewed",
      type: "action",
      label: "Disclosure Reviewed by Counsel",
      description:
        "Has counsel reviewed the full disclosure package?",
      available_decisions: ["yes", "no", "partial", "pending", "delegated"],
      llm_nudge_eligible: true,
      edges: [
        {
          condition: "yes",
          next_node_id: "outstanding_disclosure_identified",
        },
        {
          condition: "default",
          next_node_id: "outstanding_disclosure_identified",
        },
      ],
    },

    outstanding_disclosure_identified: {
      id: "outstanding_disclosure_identified",
      type: "decision",
      label: "Outstanding Disclosure Identified",
      description:
        "Are there items missing from the disclosure package?",
      guidance:
        "Check: witness statements, forensic reports, surveillance, expert opinions, CPIC, synopses.",
      available_decisions: ["yes", "no", "unknown", "pending"],
      llm_nudge_eligible: true,
      edges: [
        {
          condition: "yes",
          next_node_id: "supplementary_disclosure_requested",
          label: "Missing items found",
        },
        {
          condition: "no",
          next_node_id: "third_party_records_considered",
          label: "Disclosure complete",
        },
        {
          condition: "default",
          next_node_id: "third_party_records_considered",
        },
      ],
    },

    supplementary_disclosure_requested: {
      id: "supplementary_disclosure_requested",
      type: "action",
      label: "Supplementary Disclosure Requested",
      description:
        "Has a specific, written request for outstanding items been made?",
      available_decisions: ["yes", "no", "pending"],
      llm_nudge_eligible: true,
      edges: [
        {
          condition: "default",
          next_node_id: "third_party_records_considered",
        },
      ],
    },

    third_party_records_considered: {
      id: "third_party_records_considered",
      type: "decision",
      label: "Third-Party Records Considered",
      description:
        "Are O'Connor / Mills applications for third-party records needed?",
      guidance:
        "R v O'Connor, [1995] 4 SCR 411: production of records in possession of third parties. R v Mills, [1999] 3 SCR 668: sexual offence complainant records.",
      available_decisions: ["yes", "no", "pending", "unknown"],
      llm_nudge_eligible: true,
      edges: [
        { condition: "default", next_node_id: "disclosure_complete" },
      ],
    },

    disclosure_complete: {
      id: "disclosure_complete",
      type: "info",
      label: "Disclosure Phase Complete",
      description:
        "Continue to pre-trial conference or trial preparation workflow.",
      available_decisions: ["yes"],
      llm_nudge_eligible: false,
      edges: [],
    },
  },
};
