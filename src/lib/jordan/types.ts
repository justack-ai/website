/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// ── Confidence Tiers ──────────────────────────────────────────────

export type ConfidenceTier = 1 | 2 | 3 | 4 | 5;

export const TIER_LABELS: Record<ConfidenceTier, string> = {
  1: "Arithmetic certainty",
  2: "Settled law",
  3: "Contested / jurisdiction-dependent",
  4: "Unsettled / pending authority",
  5: "Counsel judgment required",
};

// ── Court Levels ──────────────────────────────────────────────────

export type CourtLevel = "OCJ" | "OSCJ";

export const CEILING_MONTHS: Record<CourtLevel, number> = {
  OCJ: 18,
  OSCJ: 30,
};

// ── Jurisdictions ─────────────────────────────────────────────────

export type Jurisdiction = "ON" | "AB" | "SK" | "BC" | "FED" | "OTHER";

// ── Case Events ───────────────────────────────────────────────────

export type CaseEventType =
  | "re_election"
  | "direct_indictment"
  | "preliminary_inquiry_scheduled"
  | "preliminary_inquiry_completed"
  | "mistrial"
  | "retrial";

export interface CaseEvent {
  id: string;
  type: CaseEventType;
  date: string; // ISO date
  fromCourt?: CourtLevel; // for re-election
  toCourt?: CourtLevel; // for re-election
  notes?: string;
}

// ── Delay Attribution ─────────────────────────────────────────────

export type AttributionParty = "Crown" | "Defence" | "Institutional" | "Joint";

export type DefenceSubType =
  | "voluntary_adjournment"
  | "waiver"
  | "coc_voluntary"
  | "coc_involuntary"
  | "coc_legal_aid"
  | "plea_negotiation"
  | "disclosure_diligence_failure"
  | "cody_illegitimate_conduct";

export const DEFENCE_SUB_TYPE_LABELS: Record<DefenceSubType, string> = {
  voluntary_adjournment: "Voluntary adjournment",
  waiver: "Waiver (explicit on-record)",
  coc_voluntary: "Change of counsel — voluntary",
  coc_involuntary: "Change of counsel — involuntary",
  coc_legal_aid: "Change of counsel — Legal Aid failure",
  plea_negotiation: "Plea negotiation",
  disclosure_diligence_failure: "Disclosure diligence failure",
  cody_illegitimate_conduct: "Illegitimate forensic purpose (Cody)",
};

export type ExceptionalCircumstanceSubType =
  | "discrete"
  | "complexity"
  | "covid_ontario"
  | "covid_alberta"
  | "covid_other";

export const EC_SUB_TYPE_LABELS: Record<ExceptionalCircumstanceSubType, string> = {
  discrete: "Discrete exceptional circumstance",
  complexity: "Particularly complex case",
  covid_ontario: "COVID-19 — Ontario (articulable link)",
  covid_alberta: "COVID-19 — Alberta (broad standard)",
  covid_other: "COVID-19 — Other jurisdiction",
};

// ── Delay Periods ─────────────────────────────────────────────────

export interface DelayPeriod {
  id: string;
  startDate: string; // ISO date
  endDate: string; // ISO date
  party: AttributionParty;
  defenceSubType?: DefenceSubType;
  ecSubType?: ExceptionalCircumstanceSubType;
  covidArticulableLink?: string; // required when covid sub-type
  covidJurisdiction?: Jurisdiction; // required when covid sub-type
  notes?: string;
}

// ── Meaningful Steps ──────────────────────────────────────────────

export type MeaningfulStepType =
  | "requested_early_dates"
  | "cooperated_scheduling"
  | "raised_delay_concerns"
  | "opposed_adjournments";

export const MEANINGFUL_STEP_LABELS: Record<MeaningfulStepType, string> = {
  requested_early_dates: "Requested early trial dates",
  cooperated_scheduling: "Cooperated with Crown scheduling",
  raised_delay_concerns: "Raised delay concerns on the record",
  opposed_adjournments: "Opposed unnecessary adjournments",
};

export interface MeaningfulStep {
  id: string;
  type: MeaningfulStepType;
  date: string; // ISO date
  description: string;
}

// ── Calculator Input ──────────────────────────────────────────────

export interface JordanInput {
  chargeDate: string; // ISO date
  courtLevel: CourtLevel;
  trialEndDate: string; // ISO date (anticipated)
  jurisdiction: Jurisdiction;
  caseEvents: CaseEvent[];
  delayPeriods: DelayPeriod[];
  meaningfulSteps: MeaningfulStep[];
  multiAccused: boolean;
  coAccusedCount?: number;
  attestation: {
    confirmed: boolean;
    timestamp?: string;
    userId?: string;
  };
}

// ── Scenario Output ───────────────────────────────────────────────

export type ScenarioLabel = "Low" | "Mid" | "High";

export type StatusColor = "Green" | "Yellow" | "Red";

export interface ScenarioResult {
  label: ScenarioLabel;
  defenceDelayDays: number;
  defenceDelayMonths: number;
  ecDeductionDays: number;
  ecDeductionMonths: number;
  netDelayDays: number;
  netDelayMonths: number;
  bufferDays: number;
  bufferMonths: number;
  status: StatusColor;
}

// ── Pending Authority ─────────────────────────────────────────────

export interface PendingAuthorityFlag {
  caseName: string;
  sccFile: string | null;
  issue: string;
  status: string;
  affectsIssues: string[];
  impactDirection: string;
}

// ── Calculator Output ─────────────────────────────────────────────

export interface JordanOutput {
  // Tier 1
  totalElapsedDays: number;
  totalElapsedMonths: number;
  totalElapsedTier: ConfidenceTier;

  // Tier 2
  ceilingMonths: number;
  ceilingTier: ConfidenceTier;
  ceilingCitation: string;

  // Effective court level (may change on re-election)
  effectiveCourtLevel: CourtLevel;

  // Retrial
  clockResetApplied: boolean;
  clockResetDate?: string;

  // Defence delay breakdown by sub-type
  defenceDelayBreakdown: {
    subType: DefenceSubType;
    days: number;
    isCodyFlagged: boolean;
  }[];

  // EC breakdown
  ecBreakdown: {
    subType: ExceptionalCircumstanceSubType;
    days: number;
    tier: ConfidenceTier;
    covidArticulableLink?: string;
  }[];

  // Three scenarios (Tier 3)
  scenarios: ScenarioResult[];
  netDelayTier: ConfidenceTier;

  // Status
  dominantStatus: StatusColor;
  libertyInterestEscalation: boolean;

  // Gates
  meaningfulStepsGateTriggered: boolean; // no steps + Red = suppress Red
  meaningfulStepsChecklist?: string[];

  // Pending authorities
  pendingAuthorityFlags: PendingAuthorityFlag[];

  // Warnings
  warnings: JordanWarning[];

  // Corpus version
  corpusVersion: string;
  corpusDate: string;

  // Remedy
  remedyCategory: "below_ceiling" | "at_or_above_ceiling" | "alternative_remedy_placeholder";
  remedyTier: ConfidenceTier;
}

export interface JordanWarning {
  type:
    | "pre_2016"
    | "multi_accused"
    | "appellate_scope"
    | "retrial_re_election_intersection"
    | "tier_5_referral"
    | "covid_post_2021"
    | "direct_indictment_ceiling";
  message: string;
  severity: "info" | "warning" | "critical";
}

// ── Red Status Acknowledgment Gate ────────────────────────────────

export interface RedAcknowledgment {
  inputsReflectCourtRecord: boolean;
  toolIsNotSoleBasis: boolean;
  uncertaintyUnderstood: boolean;
  counselVerificationRequired: boolean;
  timestamp?: string;
  userId?: string;
}

// ── Saved Calculation ─────────────────────────────────────────────

export interface SavedCalculation {
  id: string;
  userId: string;
  input: JordanInput;
  output: JordanOutput;
  corpusVersion: string;
  createdAt: string;
  updatedAt: string;
}

// ── Corpus Types ──────────────────────────────────────────────────

export interface CorpusAuthority {
  citation: string;
  court: string;
  jurisdiction: string;
  year: number;
  paragraph_refs: string[];
  principle: string;
  effective_date: string;
  superseded_by: string | null;
}

export interface CorpusJurisdictionVariant {
  jurisdiction: string;
  variance_description: string;
  controlling_authority: CorpusAuthority[];
  confidence_tier: ConfidenceTier;
  stability_score: number;
  notes: string;
}

export interface CorpusPendingAuthority {
  case_name: string;
  scc_file: string | null;
  legislation_id?: string;
  issue: string;
  hearing_date: string | null;
  status: string;
  potential_impact: string;
  impact_direction: string;
  added_date: string;
  last_checked: string;
  resolved_date: string | null;
  resolution_note: string | null;
  verified: boolean;
}

export interface CorpusIssue {
  issue_id: string;
  issue_label: string;
  issue_category: string;
  default_jurisdiction: string;
  default_authority: CorpusAuthority[];
  default_confidence_tier: ConfidenceTier;
  jurisdiction_variants: CorpusJurisdictionVariant[];
  pending_authority: CorpusPendingAuthority[];
  computed_stability_score: number;
  last_reviewed_date: string;
  reviewed_by: string;
  created_date: string;
  version: number;
  requires_counsel_review: boolean;
  liberty_interest_sensitive: boolean;
  notes?: string;
}

export interface CorpusIndex {
  version: string;
  effective_date: string;
  issues: {
    issue_id: string;
    file: string;
    label: string;
    tier: ConfidenceTier;
  }[];
  global_pending_watch: CorpusPendingAuthority[];
  last_full_review_date: string;
  last_full_review_by: string;
  next_scheduled_review: string;
}

// ── Subscription ──────────────────────────────────────────────────

export type SubscriptionTier = "free" | "solo" | "firm";

export interface UserSubscription {
  userId: string;
  tier: SubscriptionTier;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  status: "active" | "past_due" | "canceled" | "trialing";
  calculationsUsed: number;
  maxCalculations: number; // 3 for free, Infinity for paid
}
