/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type {
  CorpusIndex,
  CorpusIssue,
  ConfidenceTier,
  CorpusPendingAuthority,
} from "./types";

// Static imports — works in Vercel serverless (no fs.readFileSync)
import corpusIndex from "../../../apps/jordan-calc/corpus/index.json";
import ceilingOcj from "../../../apps/jordan-calc/corpus/issues/ceiling_ocj.json";
import ceilingOscj from "../../../apps/jordan-calc/corpus/issues/ceiling_oscj.json";
import reElectionCeiling from "../../../apps/jordan-calc/corpus/issues/re_election_ceiling.json";
import retrialClock from "../../../apps/jordan-calc/corpus/issues/retrial_clock.json";
import directIndictmentClock from "../../../apps/jordan-calc/corpus/issues/direct_indictment_clock.json";
import defenceDelayAttribution from "../../../apps/jordan-calc/corpus/issues/defence_delay_attribution.json";
import changeOfCounsel from "../../../apps/jordan-calc/corpus/issues/change_of_counsel.json";
import exceptionalCircumstancesDiscrete from "../../../apps/jordan-calc/corpus/issues/exceptional_circumstances_discrete.json";
import complexityException from "../../../apps/jordan-calc/corpus/issues/complexity_exception.json";
import covidDeductibilityOntario from "../../../apps/jordan-calc/corpus/issues/covid_deductibility_ontario.json";
import covidDeductibilityAlberta from "../../../apps/jordan-calc/corpus/issues/covid_deductibility_alberta.json";
import remedyFramework from "../../../apps/jordan-calc/corpus/issues/remedy_framework.json";
import meaningfulSteps from "../../../apps/jordan-calc/corpus/issues/meaningful_steps.json";
import disclosureDelay from "../../../apps/jordan-calc/corpus/issues/disclosure_delay.json";

const ISSUES_MAP: Record<string, CorpusIssue> = {
  ceiling_ocj: ceilingOcj as unknown as CorpusIssue,
  ceiling_oscj: ceilingOscj as unknown as CorpusIssue,
  re_election_ceiling: reElectionCeiling as unknown as CorpusIssue,
  retrial_clock: retrialClock as unknown as CorpusIssue,
  direct_indictment_clock: directIndictmentClock as unknown as CorpusIssue,
  defence_delay_attribution: defenceDelayAttribution as unknown as CorpusIssue,
  change_of_counsel: changeOfCounsel as unknown as CorpusIssue,
  exceptional_circumstances_discrete: exceptionalCircumstancesDiscrete as unknown as CorpusIssue,
  complexity_exception: complexityException as unknown as CorpusIssue,
  covid_deductibility_ontario: covidDeductibilityOntario as unknown as CorpusIssue,
  covid_deductibility_alberta: covidDeductibilityAlberta as unknown as CorpusIssue,
  remedy_framework: remedyFramework as unknown as CorpusIssue,
  meaningful_steps: meaningfulSteps as unknown as CorpusIssue,
  disclosure_delay: disclosureDelay as unknown as CorpusIssue,
};

export function getCorpusIndex(): CorpusIndex {
  return corpusIndex as unknown as CorpusIndex;
}

export function getCorpusIssue(issueId: string): CorpusIssue | null {
  return ISSUES_MAP[issueId] ?? null;
}

export function getAllCorpusIssues(): CorpusIssue[] {
  return Object.values(ISSUES_MAP);
}

export function getCorpusVersion(): string {
  return (corpusIndex as unknown as CorpusIndex).version;
}

export function getCorpusDate(): string {
  return (corpusIndex as unknown as CorpusIndex).effective_date;
}

/**
 * Resolve an issue's confidence tier for a given jurisdiction.
 * If a jurisdiction variant exists, use its tier; otherwise use default.
 */
export function resolveIssueTier(
  issueId: string,
  jurisdiction: string
): ConfidenceTier {
  const issue = getCorpusIssue(issueId);
  if (!issue) return 5; // unknown issue = counsel judgment required

  const variant = issue.jurisdiction_variants.find(
    (v) => v.jurisdiction === jurisdiction
  );
  if (variant) return variant.confidence_tier;
  return issue.default_confidence_tier;
}

/**
 * Get all pending authorities that affect a given set of issue IDs.
 */
export function getPendingAuthoritiesForIssues(
  issueIds: string[]
): CorpusPendingAuthority[] {
  const index = getCorpusIndex();
  const seen = new Set<string>();
  const results: CorpusPendingAuthority[] = [];

  // Global pending watch
  for (const pa of index.global_pending_watch) {
    const affects = (pa as CorpusPendingAuthority & { affects_issues?: string[] })
      .affects_issues;
    if (affects?.some((id) => issueIds.includes(id))) {
      const key = pa.case_name + (pa.scc_file ?? "");
      if (!seen.has(key)) {
        seen.add(key);
        results.push(pa);
      }
    }
  }

  // Per-issue pending authorities
  for (const issueId of issueIds) {
    const issue = getCorpusIssue(issueId);
    if (!issue) continue;
    for (const pa of issue.pending_authority) {
      if (!pa.resolved_date) {
        const key = pa.case_name + (pa.scc_file ?? "");
        if (!seen.has(key)) {
          seen.add(key);
          results.push(pa);
        }
      }
    }
  }

  return results;
}

/**
 * Get the primary citation for an issue.
 */
export function getPrimaryCitation(issueId: string): string {
  const issue = getCorpusIssue(issueId);
  if (!issue || issue.default_authority.length === 0) return "";
  return issue.default_authority[0].citation;
}
