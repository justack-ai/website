/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { WorkflowConfig } from "../types";

/**
 * Criminal pre-trial conference and Jordan milestone workflow.
 * Ontario Criminal Proceedings Rules, Criminal Code s.625.1.
 * Key Jordan milestones tracked for delay attribution.
 */
export const criminalPretrialV1: WorkflowConfig = {
  id: "criminal_pretrial_v1",
  label: "Ontario Criminal — Pre-Trial",
  matter_type: "criminal",
  version: "1.0.0",
  entry_node_id: "pretrial_date_set",

  nodes: {
    pretrial_date_set: {
      id: "pretrial_date_set",
      type: "deadline",
      label: "Pre-Trial Conference Date Set",
      description:
        "Has a judicial pre-trial conference been scheduled?",
      guidance:
        "s.625.1 CCC: court may order pre-trial conference. Track this date for Jordan clock.",
      available_decisions: ["yes", "no", "pending"],
      llm_nudge_eligible: true,
      deadline_rule: {
        label: "Pre-Trial Conference",
        days_from_reference: 90,
        reference: "charge_date",
        is_jordan: true,
      },
      edges: [
        { condition: "yes", next_node_id: "pretrial_brief_prepared" },
        { condition: "default", next_node_id: "pretrial_brief_prepared" },
      ],
    },

    pretrial_brief_prepared: {
      id: "pretrial_brief_prepared",
      type: "action",
      label: "Pre-Trial Brief Prepared",
      description:
        "Has the defence pre-trial brief been prepared and filed?",
      guidance:
        "Brief should address: plea position, outstanding issues, witness lists, estimated trial time, Charter applications.",
      available_decisions: ["yes", "no", "partial", "pending", "delegated"],
      llm_nudge_eligible: true,
      edges: [
        { condition: "default", next_node_id: "resolution_discussed" },
      ],
    },

    resolution_discussed: {
      id: "resolution_discussed",
      type: "decision",
      label: "Resolution Discussions",
      description:
        "Have resolution discussions (plea negotiations) taken place with Crown?",
      available_decisions: ["yes", "no", "pending", "unknown"],
      llm_nudge_eligible: true,
      edges: [
        {
          condition: "yes",
          next_node_id: "resolution_instructions",
          label: "Resolution discussed",
        },
        {
          condition: "no",
          next_node_id: "trial_date_set",
          label: "Proceeding to trial",
        },
        { condition: "default", next_node_id: "trial_date_set" },
      ],
    },

    resolution_instructions: {
      id: "resolution_instructions",
      type: "decision",
      label: "Client Instructions on Resolution",
      description:
        "Has the client provided instructions on the proposed resolution?",
      guidance:
        "Client must understand the offer and give informed consent. Record instructions verbatim.",
      available_decisions: ["yes", "no", "pending"],
      llm_nudge_eligible: false,
      edges: [
        {
          condition: "yes",
          next_node_id: "resolution_outcome",
        },
        { condition: "default", next_node_id: "resolution_outcome" },
      ],
    },

    resolution_outcome: {
      id: "resolution_outcome",
      type: "decision",
      label: "Resolution Outcome",
      description:
        "Was a resolution reached? (Yes = resolved, No = proceeding to trial)",
      available_decisions: ["yes", "no", "pending"],
      llm_nudge_eligible: false,
      edges: [
        {
          condition: "yes",
          next_node_id: "pretrial_complete",
          label: "Matter resolved",
        },
        {
          condition: "no",
          next_node_id: "trial_date_set",
          label: "To trial",
        },
        { condition: "default", next_node_id: "trial_date_set" },
      ],
    },

    trial_date_set: {
      id: "trial_date_set",
      type: "deadline",
      label: "Trial Date Set",
      description: "Has a trial date been scheduled?",
      guidance:
        "Critical Jordan milestone. Record the earliest available date offered by the court — institutional delay starts here.",
      available_decisions: ["yes", "no", "pending"],
      llm_nudge_eligible: true,
      deadline_rule: {
        label: "Trial Date (Jordan milestone)",
        days_from_reference: 365,
        reference: "charge_date",
        is_jordan: true,
      },
      edges: [
        { condition: "yes", next_node_id: "charter_applications_considered" },
        {
          condition: "default",
          next_node_id: "charter_applications_considered",
        },
      ],
    },

    charter_applications_considered: {
      id: "charter_applications_considered",
      type: "decision",
      label: "Charter Applications Considered",
      description:
        "Are any Charter applications being brought (s.11(b) delay, s.8 search, s.10(b) counsel)?",
      guidance:
        "Consider: s.11(b) unreasonable delay, s.8 search/seizure, s.10(b) right to counsel, s.7 disclosure, s.24(2) exclusion.",
      available_decisions: ["yes", "no", "pending", "unknown"],
      llm_nudge_eligible: true,
      edges: [
        { condition: "default", next_node_id: "trial_preparation" },
      ],
    },

    trial_preparation: {
      id: "trial_preparation",
      type: "action",
      label: "Trial Preparation",
      description:
        "Has trial preparation been completed (witness prep, exhibits, legal research)?",
      available_decisions: ["yes", "no", "partial", "pending", "delegated"],
      llm_nudge_eligible: true,
      edges: [
        { condition: "default", next_node_id: "pretrial_complete" },
      ],
    },

    pretrial_complete: {
      id: "pretrial_complete",
      type: "info",
      label: "Pre-Trial Phase Complete",
      description:
        "Matter is either resolved or ready for trial.",
      available_decisions: ["yes"],
      llm_nudge_eligible: false,
      edges: [],
    },
  },
};
