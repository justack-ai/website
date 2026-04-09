/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { differenceInCalendarDays, parseISO, isAfter, isBefore } from "date-fns";
import type {
  JordanInput,
  JordanOutput,
  JordanWarning,
  ScenarioResult,
  ScenarioLabel,
  StatusColor,
  ConfidenceTier,
  CourtLevel,
  DelayPeriod,
  DefenceSubType,
  ExceptionalCircumstanceSubType,
  PendingAuthorityFlag,
} from "./types";
import { CEILING_MONTHS } from "./types";
import {
  getCorpusVersion,
  getCorpusDate,
  resolveIssueTier,
  getPendingAuthoritiesForIssues,
  getPrimaryCitation,
} from "./corpus";

// ── Hanan Scenario Percentages ────────────────────────────────────
// Defence-favourable (Low): 25% of ambiguous periods attributed to defence
// Midpoint (Mid): 50%
// Crown-favourable (High): 75%
const HANAN_SCENARIOS: { label: ScenarioLabel; defenceFraction: number }[] = [
  { label: "Low", defenceFraction: 0.25 },
  { label: "Mid", defenceFraction: 0.5 },
  { label: "High", defenceFraction: 0.75 },
];

// ── Helpers ───────────────────────────────────────────────────────

function daysBetween(start: string, end: string): number {
  return differenceInCalendarDays(parseISO(end), parseISO(start));
}

function daysToMonths(days: number): number {
  return Math.round((days / 30.44) * 10) / 10; // average days per month, 1 decimal
}

function maxTier(...tiers: ConfidenceTier[]): ConfidenceTier {
  return Math.max(...tiers) as ConfidenceTier;
}

// ── Validation ────────────────────────────────────────────────────

export function validateInput(input: JordanInput): JordanWarning[] {
  const warnings: JordanWarning[] = [];
  const chargeDate = parseISO(input.chargeDate);

  // Pre-2016 check
  if (isBefore(chargeDate, parseISO("2016-07-08"))) {
    warnings.push({
      type: "pre_2016",
      message:
        "This charge predates R v Jordan (2016 SCC 27). The Jordan framework's presumptive ceilings apply to cases where the charge was laid after July 8, 2016. Pre-2016 cases use the Morin framework and are out of scope for this tool.",
      severity: "critical",
    });
  }

  // Future charge date
  if (isAfter(chargeDate, new Date())) {
    warnings.push({
      type: "pre_2016",
      message: "Charge date cannot be in the future.",
      severity: "critical",
    });
  }

  // Trial end before charge date
  if (isBefore(parseISO(input.trialEndDate), chargeDate)) {
    warnings.push({
      type: "pre_2016",
      message: "Anticipated trial end date must be after the charge date.",
      severity: "critical",
    });
  }

  // Multi-accused warning
  if (input.multiAccused) {
    warnings.push({
      type: "multi_accused",
      message:
        "Multi-accused cases involve complex cross-attribution of delay. This tool computes delay for one accused only. Cross-attribution between co-accused is not supported and requires counsel assessment.",
      severity: "warning",
    });
  }

  // Re-election + retrial intersection
  const hasReElection = input.caseEvents.some((e) => e.type === "re_election");
  const hasRetrial = input.caseEvents.some((e) => e.type === "retrial");
  if (hasReElection && hasRetrial) {
    warnings.push({
      type: "retrial_re_election_intersection",
      message:
        "Re-election followed by retrial creates an unresolved ceiling question. The applicable ceiling at retrial after re-election is not settled. This requires counsel judgment (Tier 5).",
      severity: "critical",
    });
  }

  // COVID post-2021 warning for Ontario
  for (const period of input.delayPeriods) {
    if (
      period.ecSubType === "covid_ontario" &&
      period.endDate &&
      isAfter(parseISO(period.endDate), parseISO("2021-12-31"))
    ) {
      warnings.push({
        type: "covid_post_2021",
        message:
          "Post-2021 COVID delay in Ontario faces heightened evidentiary burden (Qureshi, 2026 ONCA 20). Courts scrutinize post-2021 COVID claims more closely as the acute closure period has passed.",
        severity: "warning",
      });
      break; // only one warning needed
    }
  }

  // Direct indictment ceiling note
  if (input.caseEvents.some((e) => e.type === "direct_indictment")) {
    warnings.push({
      type: "direct_indictment_ceiling",
      message:
        "Direct indictment bypasses the preliminary inquiry but does not reset the clock. The matter proceeds to Superior Court; the 30-month ceiling applies from the original charge date.",
      severity: "info",
    });
  }

  return warnings;
}

// ── Overlapping Period Check ──────────────────────────────────────

export function findOverlappingPeriods(
  periods: DelayPeriod[]
): [string, string][] {
  const overlaps: [string, string][] = [];
  for (let i = 0; i < periods.length; i++) {
    for (let j = i + 1; j < periods.length; j++) {
      const a = periods[i];
      const b = periods[j];
      if (a.startDate < b.endDate && b.startDate < a.endDate) {
        overlaps.push([a.id, b.id]);
      }
    }
  }
  return overlaps;
}

// ── Main Calculation ──────────────────────────────────────────────

export function calculate(input: JordanInput): JordanOutput {
  const warnings = validateInput(input);
  const issueIds: string[] = [];

  // ── Effective court level & ceiling ──────────────────────────

  let effectiveCourtLevel: CourtLevel = input.courtLevel;

  // Apply re-election: last re-election determines effective court level
  const reElections = input.caseEvents
    .filter((e) => e.type === "re_election")
    .sort((a, b) => a.date.localeCompare(b.date));
  if (reElections.length > 0) {
    const lastReElection = reElections[reElections.length - 1];
    if (lastReElection.toCourt) {
      effectiveCourtLevel = lastReElection.toCourt;
    }
    issueIds.push("re_election_ceiling");
  }

  // Direct indictment forces OSCJ
  if (input.caseEvents.some((e) => e.type === "direct_indictment")) {
    effectiveCourtLevel = "OSCJ";
    issueIds.push("direct_indictment_clock");
  }

  const ceilingMonths = CEILING_MONTHS[effectiveCourtLevel];
  const ceilingCitation = getPrimaryCitation(
    effectiveCourtLevel === "OCJ" ? "ceiling_ocj" : "ceiling_oscj"
  );
  const ceilingTier: ConfidenceTier = 2;
  issueIds.push(effectiveCourtLevel === "OCJ" ? "ceiling_ocj" : "ceiling_oscj");

  // ── Clock start (charge date or retrial reset) ──────────────

  let clockStart = input.chargeDate;
  let clockResetApplied = false;
  let clockResetDate: string | undefined;

  const retrials = input.caseEvents
    .filter((e) => e.type === "retrial")
    .sort((a, b) => a.date.localeCompare(b.date));
  if (retrials.length > 0) {
    const lastRetrial = retrials[retrials.length - 1];
    clockStart = lastRetrial.date;
    clockResetApplied = true;
    clockResetDate = lastRetrial.date;
    issueIds.push("retrial_clock");
  }

  // ── Total elapsed time (Tier 1) ─────────────────────────────

  const totalElapsedDays = daysBetween(clockStart, input.trialEndDate);
  const totalElapsedMonths = daysToMonths(totalElapsedDays);
  const totalElapsedTier: ConfidenceTier = 1;

  // ── Defence delay periods ───────────────────────────────────

  const defencePeriods = input.delayPeriods.filter(
    (p) => p.party === "Defence"
  );
  const jointPeriods = input.delayPeriods.filter((p) => p.party === "Joint");

  // Fixed defence delay: periods with clear attribution
  const fixedDefenceBySubType: Record<DefenceSubType, number> = {
    voluntary_adjournment: 0,
    waiver: 0,
    coc_voluntary: 0,
    coc_involuntary: 0,
    coc_legal_aid: 0,
    plea_negotiation: 0,
    disclosure_diligence_failure: 0,
    cody_illegitimate_conduct: 0,
  };

  let fixedDefenceDays = 0;
  let codyFlaggedDays = 0;
  const hasCody = defencePeriods.some(
    (p) => p.defenceSubType === "cody_illegitimate_conduct"
  );

  for (const period of defencePeriods) {
    const days = daysBetween(period.startDate, period.endDate);
    if (period.defenceSubType) {
      fixedDefenceBySubType[period.defenceSubType] += days;
      if (period.defenceSubType === "cody_illegitimate_conduct") {
        codyFlaggedDays += days;
      }
    }
    fixedDefenceDays += days;
  }

  if (hasCody) {
    issueIds.push("defence_delay_attribution");
  }

  // Joint periods are the ambiguous ones subject to Hanan contextual analysis
  let jointDays = 0;
  for (const period of jointPeriods) {
    jointDays += daysBetween(period.startDate, period.endDate);
  }

  if (jointDays > 0 || defencePeriods.length > 0) {
    issueIds.push("defence_delay_attribution");
  }

  // ── Exceptional circumstances deductions ────────────────────

  const ecPeriods = input.delayPeriods.filter(
    (p) =>
      (p.party === "Crown" || p.party === "Institutional") && p.ecSubType
  );

  let ecTotalDays = 0;
  let ecMaxTier: ConfidenceTier = 1;
  const ecBreakdown: JordanOutput["ecBreakdown"] = [];

  for (const period of ecPeriods) {
    const days = daysBetween(period.startDate, period.endDate);
    const subType = period.ecSubType!;

    let tier: ConfidenceTier = 3;
    let issueId = "exceptional_circumstances_discrete";

    if (subType === "complexity") {
      tier = resolveIssueTier("complexity_exception", input.jurisdiction);
      issueId = "complexity_exception";
    } else if (subType === "covid_ontario") {
      tier = resolveIssueTier("covid_deductibility_ontario", "ON");
      issueId = "covid_deductibility_ontario";
    } else if (subType === "covid_alberta") {
      tier = resolveIssueTier("covid_deductibility_alberta", "AB");
      issueId = "covid_deductibility_alberta";
    } else if (subType === "covid_other") {
      // Default to Ontario articulable-link standard
      tier = resolveIssueTier("covid_deductibility_ontario", input.jurisdiction);
      issueId = "covid_deductibility_ontario";
    }

    issueIds.push(issueId);
    ecMaxTier = maxTier(ecMaxTier, tier);
    ecTotalDays += days;
    ecBreakdown.push({
      subType,
      days,
      tier,
      covidArticulableLink: period.covidArticulableLink,
    });
  }

  // ── Three scenarios (Hanan) ─────────────────────────────────

  const scenarios: ScenarioResult[] = HANAN_SCENARIOS.map(
    ({ label, defenceFraction }) => {
      // Defence delay = fixed defence + (joint × fraction)
      const scenarioDefenceDays =
        fixedDefenceDays + Math.round(jointDays * defenceFraction);
      const scenarioDefenceMonths = daysToMonths(scenarioDefenceDays);

      // EC deductions are not scenario-dependent (they're factual)
      const scenarioEcDays = ecTotalDays;
      const scenarioEcMonths = daysToMonths(scenarioEcDays);

      // Net delay = total elapsed - defence delay - EC deductions
      const netDelayDays = Math.max(
        0,
        totalElapsedDays - scenarioDefenceDays - scenarioEcDays
      );
      const netDelayMonths = daysToMonths(netDelayDays);

      // Buffer = ceiling (in days) - net delay
      const ceilingDays = Math.round(ceilingMonths * 30.44);
      const bufferDays = ceilingDays - netDelayDays;
      const bufferMonths = daysToMonths(bufferDays);

      // Status
      let status: StatusColor;
      if (bufferMonths > 3) {
        status = "Green";
      } else if (bufferMonths >= 1) {
        status = "Yellow";
      } else {
        status = "Red";
      }

      return {
        label,
        defenceDelayDays: scenarioDefenceDays,
        defenceDelayMonths: scenarioDefenceMonths,
        ecDeductionDays: scenarioEcDays,
        ecDeductionMonths: scenarioEcMonths,
        netDelayDays,
        netDelayMonths,
        bufferDays,
        bufferMonths,
        status,
      };
    }
  );

  // ── Confidence tier propagation ─────────────────────────────

  const defenceTier: ConfidenceTier =
    jointDays > 0 || defencePeriods.length > 0 ? 3 : 1;

  // Re-election + retrial intersection = Tier 5
  const hasReElectionRetrialIntersection =
    reElections.length > 0 && retrials.length > 0;
  const intersectionTier: ConfidenceTier = hasReElectionRetrialIntersection
    ? 5
    : 1;

  const netDelayTier = maxTier(
    totalElapsedTier,
    ceilingTier,
    defenceTier,
    ecMaxTier,
    intersectionTier
  );

  // ── Dominant status (worst-case) ────────────────────────────

  const statusOrder: StatusColor[] = ["Green", "Yellow", "Red"];
  const dominantStatus = scenarios.reduce<StatusColor>((worst, s) => {
    return statusOrder.indexOf(s.status) > statusOrder.indexOf(worst)
      ? s.status
      : worst;
  }, "Green");

  // ── Liberty interest escalation ─────────────────────────────

  const libertyInterestEscalation = scenarios.some((s) => s.bufferMonths < 6);

  // ── Meaningful steps gate ───────────────────────────────────

  const hasMeaningfulSteps = input.meaningfulSteps.length > 0;
  const meaningfulStepsGateTriggered =
    !hasMeaningfulSteps && dominantStatus === "Red";

  const meaningfulStepsChecklist = meaningfulStepsGateTriggered
    ? [
        "Has the defence requested early trial dates?",
        "Has the defence cooperated with Crown scheduling proposals?",
        "Has defence counsel raised delay concerns on the record?",
        "Has the defence opposed unnecessary adjournments?",
        "Review Jordan para 48 and consult counsel before proceeding.",
      ]
    : undefined;

  if (hasMeaningfulSteps || meaningfulStepsGateTriggered) {
    issueIds.push("meaningful_steps");
  }

  // ── Pending authority flags ─────────────────────────────────

  // Always include remedy framework
  issueIds.push("remedy_framework");

  const uniqueIssueIds = [...new Set(issueIds)];
  const corpusPendingAuthorities =
    getPendingAuthoritiesForIssues(uniqueIssueIds);

  const pendingAuthorityFlags: PendingAuthorityFlag[] =
    corpusPendingAuthorities.map((pa) => ({
      caseName: pa.case_name,
      sccFile: pa.scc_file,
      issue: pa.issue,
      status: pa.status,
      affectsIssues: (pa as unknown as { affects_issues?: string[] })
        .affects_issues ?? [],
      impactDirection: pa.impact_direction,
    }));

  // ── Defence delay breakdown ─────────────────────────────────

  const defenceDelayBreakdown = (
    Object.entries(fixedDefenceBySubType) as [DefenceSubType, number][]
  )
    .filter(([, days]) => days > 0)
    .map(([subType, days]) => ({
      subType,
      days,
      isCodyFlagged: subType === "cody_illegitimate_conduct",
    }));

  // ── Remedy category ─────────────────────────────────────────

  const worstNetDelay = Math.max(...scenarios.map((s) => s.netDelayMonths));
  let remedyCategory: JordanOutput["remedyCategory"];
  if (worstNetDelay < ceilingMonths) {
    remedyCategory = "below_ceiling";
  } else {
    remedyCategory = "at_or_above_ceiling";
  }
  const remedyTier = resolveIssueTier("remedy_framework", input.jurisdiction);

  return {
    totalElapsedDays,
    totalElapsedMonths,
    totalElapsedTier,
    ceilingMonths,
    ceilingTier,
    ceilingCitation,
    effectiveCourtLevel,
    clockResetApplied,
    clockResetDate,
    defenceDelayBreakdown,
    ecBreakdown,
    scenarios,
    netDelayTier,
    dominantStatus: meaningfulStepsGateTriggered ? "Yellow" : dominantStatus,
    libertyInterestEscalation,
    meaningfulStepsGateTriggered,
    meaningfulStepsChecklist,
    pendingAuthorityFlags,
    warnings,
    corpusVersion: getCorpusVersion(),
    corpusDate: getCorpusDate(),
    remedyCategory,
    remedyTier,
  };
}
