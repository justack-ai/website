/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { WorkflowConfig } from "../types";

/**
 * Ontario Family — Separation and Divorce
 * Family Law Act, R.S.O. 1990, c. F.3
 * Divorce Act, R.S.C. 1985, c. 3 (2nd Supp.)
 * Family Law Rules, O. Reg. 114/99
 *
 * Covers the standard separation/divorce process including
 * parenting, support, and property division.
 */
export const familySeparationV1: WorkflowConfig = {
  id: "family_separation_v1",
  label: "Ontario Family — Separation",
  matter_type: "family",
  version: "1.0.0",
  entry_node_id: "separation_date_confirmed",

  nodes: {
    separation_date_confirmed: {
      id: "separation_date_confirmed",
      type: "action",
      label: "Separation Date Confirmed",
      description:
        "Has the date of separation been established and documented?",
      guidance:
        "The date of separation triggers limitation periods for property claims (FLA s.7(3): 6 years from separation or 2 years from divorce). Document how the date was determined.",
      available_decisions: ["yes", "pending", "unknown"],
      llm_nudge_eligible: true,
      edges: [
        { condition: "yes", next_node_id: "children_involved" },
        { condition: "default", next_node_id: "children_involved" },
      ],
    },

    children_involved: {
      id: "children_involved",
      type: "decision",
      label: "Children of the Relationship",
      description:
        "Are there children of the relationship requiring parenting or support arrangements?",
      available_decisions: ["yes", "no", "pending", "unknown"],
      llm_nudge_eligible: false,
      edges: [
        {
          condition: "yes",
          next_node_id: "parenting_arrangement",
          label: "Children — parenting needed",
        },
        {
          condition: "no",
          next_node_id: "spousal_support_considered",
          label: "No children",
        },
        { condition: "default", next_node_id: "parenting_arrangement" },
      ],
    },

    parenting_arrangement: {
      id: "parenting_arrangement",
      type: "decision",
      label: "Parenting Arrangement",
      description:
        "Has a parenting arrangement (decision-making, parenting time) been proposed or agreed?",
      guidance:
        "Divorce Act s.16.1: best interests of the child. Consider decision-making responsibility and parenting time schedules. Document the client's proposed arrangement.",
      available_decisions: ["yes", "no", "partial", "pending", "delegated"],
      llm_nudge_eligible: true,
      edges: [
        { condition: "default", next_node_id: "child_support_calculated" },
      ],
    },

    child_support_calculated: {
      id: "child_support_calculated",
      type: "action",
      label: "Child Support Calculated",
      description:
        "Has child support been calculated using the Federal Child Support Guidelines?",
      guidance:
        "Federal Child Support Guidelines, SOR/97-175. Obtain income disclosure (3 years tax returns, NOAs, recent pay stubs). Table amount + s.7 extraordinary expenses.",
      available_decisions: ["yes", "no", "partial", "pending", "delegated"],
      llm_nudge_eligible: true,
      edges: [
        { condition: "default", next_node_id: "spousal_support_considered" },
      ],
    },

    spousal_support_considered: {
      id: "spousal_support_considered",
      type: "decision",
      label: "Spousal Support Considered",
      description:
        "Has entitlement to and quantum of spousal support been assessed?",
      guidance:
        "Divorce Act s.15.2; FLA s.33. Consider: length of relationship, roles during relationship, economic disadvantage from relationship, Spousal Support Advisory Guidelines (SSAG) ranges.",
      available_decisions: ["yes", "no", "pending", "unknown"],
      llm_nudge_eligible: true,
      edges: [
        { condition: "default", next_node_id: "financial_disclosure_exchanged" },
      ],
    },

    financial_disclosure_exchanged: {
      id: "financial_disclosure_exchanged",
      type: "action",
      label: "Financial Disclosure Exchanged",
      description:
        "Has full financial disclosure been exchanged between the parties?",
      guidance:
        "Family Law Rules, Rule 13. Both parties must serve and file a Financial Statement (Form 13 or 13.1). Income documents, property valuations, and debt statements required.",
      available_decisions: ["yes", "no", "partial", "pending", "delegated"],
      llm_nudge_eligible: true,
      edges: [
        { condition: "default", next_node_id: "net_family_property_calculated" },
      ],
    },

    net_family_property_calculated: {
      id: "net_family_property_calculated",
      type: "action",
      label: "Net Family Property Calculated",
      description:
        "Has the Net Family Property (NFP) equalization calculation been prepared?",
      guidance:
        "FLA Part I: each spouse's NFP = value of all property on date of separation minus value on date of marriage minus excluded property (FLA s.4(2)). Equalization = half the difference.",
      available_decisions: ["yes", "no", "partial", "pending", "delegated"],
      llm_nudge_eligible: true,
      deadline_rule: {
        label: "Property Claim Limitation (FLA s.7(3))",
        days_from_reference: 730,
        reference: "separation_date",
        is_jordan: false,
      },
      edges: [
        { condition: "default", next_node_id: "matrimonial_home_addressed" },
      ],
    },

    matrimonial_home_addressed: {
      id: "matrimonial_home_addressed",
      type: "decision",
      label: "Matrimonial Home Addressed",
      description:
        "Has the disposition of the matrimonial home been addressed?",
      guidance:
        "FLA Part II: both spouses have equal right of possession regardless of ownership. Consider: exclusive possession order, sale, buyout. Must address before final order.",
      available_decisions: ["yes", "no", "pending", "unknown"],
      llm_nudge_eligible: true,
      edges: [
        { condition: "default", next_node_id: "resolution_attempted" },
      ],
    },

    resolution_attempted: {
      id: "resolution_attempted",
      type: "decision",
      label: "Resolution Attempted",
      description:
        "Have settlement negotiations or alternative dispute resolution been attempted?",
      guidance:
        "Consider: four-way meeting, mediation, collaborative process, arbitration. Family Law Rules r.17 case conference is mandatory before motions.",
      available_decisions: ["yes", "no", "partial", "pending"],
      llm_nudge_eligible: true,
      edges: [
        {
          condition: "yes",
          next_node_id: "agreement_or_order",
          label: "Resolution attempted",
        },
        {
          condition: "no",
          next_node_id: "application_commenced",
          label: "To litigation",
        },
        { condition: "default", next_node_id: "agreement_or_order" },
      ],
    },

    application_commenced: {
      id: "application_commenced",
      type: "action",
      label: "Application Commenced",
      description:
        "Has a Family Law Application (Form 8) been issued and served?",
      guidance:
        "Family Law Rules, Form 8. Service requirements under Rule 6. Answer due within 30 days.",
      available_decisions: ["yes", "no", "pending", "delegated"],
      llm_nudge_eligible: false,
      edges: [
        { condition: "default", next_node_id: "agreement_or_order" },
      ],
    },

    agreement_or_order: {
      id: "agreement_or_order",
      type: "decision",
      label: "Agreement or Order",
      description:
        "Has a separation agreement been signed or a court order been obtained?",
      available_decisions: ["yes", "no", "partial", "pending"],
      llm_nudge_eligible: false,
      edges: [
        { condition: "yes", next_node_id: "divorce_considered" },
        { condition: "default", next_node_id: "divorce_considered" },
      ],
    },

    divorce_considered: {
      id: "divorce_considered",
      type: "decision",
      label: "Divorce Considered",
      description:
        "Is a divorce judgment being sought? (Requires 1 year of separation under Divorce Act s.8(2)(a))",
      available_decisions: ["yes", "no", "pending"],
      llm_nudge_eligible: false,
      deadline_rule: {
        label: "Divorce Eligibility (1 year separation)",
        days_from_reference: 365,
        reference: "separation_date",
        is_jordan: false,
      },
      edges: [
        { condition: "default", next_node_id: "family_complete" },
      ],
    },

    family_complete: {
      id: "family_complete",
      type: "info",
      label: "Family Law Phase Complete",
      description:
        "All family law issues have been addressed or the file is resolved.",
      available_decisions: ["yes"],
      llm_nudge_eligible: false,
      edges: [],
    },
  },
};
