/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { WorkflowConfig } from "../types";

/**
 * Ontario Civil — Application for Judicial Review (AJR)
 * Judicial Review Procedure Act, R.S.O. 1990, c. J.1
 * Rules of Civil Procedure, Rules 38, 68
 *
 * This workflow covers the standard JR process for challenging
 * administrative tribunal decisions in Ontario Divisional Court.
 */
export const civilAjrV1: WorkflowConfig = {
  id: "civil_ajr_v1",
  label: "Ontario Civil — Judicial Review",
  matter_type: "civil",
  version: "1.0.0",
  entry_node_id: "triggering_decision_identified",

  nodes: {
    triggering_decision_identified: {
      id: "triggering_decision_identified",
      type: "action",
      label: "Triggering Decision Identified",
      description:
        "Has the administrative decision or order being challenged been identified and documented?",
      guidance:
        "Record the decision-maker, date, and substance of the decision. Obtain the written reasons if available.",
      available_decisions: ["yes", "pending", "unknown"],
      llm_nudge_eligible: true,
      edges: [
        { condition: "yes", next_node_id: "standing_assessed" },
        { condition: "default", next_node_id: "standing_assessed" },
      ],
    },

    standing_assessed: {
      id: "standing_assessed",
      type: "decision",
      label: "Standing Assessed",
      description:
        "Does the applicant have standing to bring the judicial review?",
      guidance:
        "Standing requires the applicant to be directly affected by the decision. Consider public interest standing if the applicant is not directly affected.",
      available_decisions: ["yes", "no", "partial", "pending", "unknown"],
      llm_nudge_eligible: true,
      edges: [
        { condition: "yes", next_node_id: "limitation_period_checked" },
        { condition: "no", next_node_id: "limitation_period_checked" },
        { condition: "default", next_node_id: "limitation_period_checked" },
      ],
    },

    limitation_period_checked: {
      id: "limitation_period_checked",
      type: "deadline",
      label: "Limitation Period Checked",
      description:
        "Has the applicable limitation period been identified and is the application within time?",
      guidance:
        "JRPA s.5: application must be made within 30 days of the decision, unless the court grants an extension. Some enabling statutes have different periods. Check the specific statute.",
      available_decisions: ["yes", "no", "pending", "unknown"],
      llm_nudge_eligible: true,
      deadline_rule: {
        label: "JR Application Filing (JRPA s.5)",
        days_from_reference: 30,
        reference: "application_date",
        is_jordan: false,
      },
      edges: [
        { condition: "yes", next_node_id: "notice_of_application_filed" },
        { condition: "default", next_node_id: "notice_of_application_filed" },
      ],
    },

    notice_of_application_filed: {
      id: "notice_of_application_filed",
      type: "action",
      label: "Notice of Application Filed",
      description:
        "Has the Notice of Application for Judicial Review been issued and filed?",
      guidance:
        "File in Divisional Court (or Superior Court if single-judge JR). Serve on all parties and the tribunal. Form 68A.",
      available_decisions: ["yes", "no", "pending", "delegated"],
      llm_nudge_eligible: true,
      edges: [
        { condition: "default", next_node_id: "tribunal_record_requested" },
      ],
    },

    tribunal_record_requested: {
      id: "tribunal_record_requested",
      type: "action",
      label: "Tribunal Record Requested",
      description:
        "Has the certified tribunal record been requested from the decision-maker?",
      guidance:
        "JRPA s.10: the tribunal must file the record. Request promptly — delays in the record can affect perfection deadlines.",
      available_decisions: ["yes", "no", "pending", "delegated"],
      llm_nudge_eligible: true,
      edges: [
        { condition: "default", next_node_id: "tribunal_record_received" },
      ],
    },

    tribunal_record_received: {
      id: "tribunal_record_received",
      type: "decision",
      label: "Tribunal Record Received",
      description:
        "Has the certified tribunal record been received and reviewed?",
      available_decisions: ["yes", "no", "partial", "pending"],
      llm_nudge_eligible: true,
      edges: [
        { condition: "yes", next_node_id: "application_perfected" },
        { condition: "partial", next_node_id: "application_perfected" },
        { condition: "default", next_node_id: "application_perfected" },
      ],
    },

    application_perfected: {
      id: "application_perfected",
      type: "action",
      label: "Application Perfected",
      description:
        "Has the application record been filed and served to perfect the application?",
      guidance:
        "Application record must include: Notice of Application, supporting affidavits, memorandum of argument, tribunal record, relevant statutes. Rule 68.04.",
      available_decisions: ["yes", "no", "partial", "pending", "delegated"],
      llm_nudge_eligible: true,
      edges: [
        { condition: "default", next_node_id: "respondent_materials_received" },
      ],
    },

    respondent_materials_received: {
      id: "respondent_materials_received",
      type: "decision",
      label: "Respondent Materials Received",
      description:
        "Has the respondent filed responding materials?",
      available_decisions: ["yes", "no", "pending"],
      llm_nudge_eligible: false,
      edges: [
        { condition: "default", next_node_id: "stay_considered" },
      ],
    },

    stay_considered: {
      id: "stay_considered",
      type: "decision",
      label: "Stay of Decision Considered",
      description:
        "Is a stay of the underlying decision pending judicial review needed?",
      guidance:
        "RJR-MacDonald test: serious issue, irreparable harm, balance of convenience. File motion for interim stay if needed.",
      available_decisions: ["yes", "no", "pending", "unknown"],
      llm_nudge_eligible: true,
      edges: [
        { condition: "default", next_node_id: "hearing_date_set" },
      ],
    },

    hearing_date_set: {
      id: "hearing_date_set",
      type: "deadline",
      label: "Hearing Date Set",
      description:
        "Has a hearing date been assigned by the Divisional Court?",
      available_decisions: ["yes", "no", "pending"],
      llm_nudge_eligible: false,
      deadline_rule: {
        label: "JR Hearing",
        days_from_reference: 180,
        reference: "application_date",
        is_jordan: false,
      },
      edges: [
        { condition: "default", next_node_id: "hearing_preparation" },
      ],
    },

    hearing_preparation: {
      id: "hearing_preparation",
      type: "action",
      label: "Hearing Preparation",
      description:
        "Has hearing preparation been completed (factum, book of authorities, oral argument outline)?",
      available_decisions: ["yes", "no", "partial", "pending", "delegated"],
      llm_nudge_eligible: true,
      edges: [
        { condition: "default", next_node_id: "ajr_complete" },
      ],
    },

    ajr_complete: {
      id: "ajr_complete",
      type: "info",
      label: "Judicial Review Phase Complete",
      description:
        "Application is heard or resolved. Record the outcome.",
      available_decisions: ["yes"],
      llm_nudge_eligible: false,
      edges: [],
    },
  },
};
