/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import { useCallback, useState } from "react";
import type {
  ConfidenceTier,
  DEFENCE_SUB_TYPE_LABELS,
  DefenceSubType,
  EC_SUB_TYPE_LABELS,
  ExceptionalCircumstanceSubType,
  JordanOutput,
  RedAcknowledgment,
} from "@/lib/jordan/types";
import {
  DEFENCE_SUB_TYPE_LABELS as defLabels,
  EC_SUB_TYPE_LABELS as ecLabels,
} from "@/lib/jordan/types";
import DisclaimerBanner from "./DisclaimerBanner";
import TierBadge from "./TierBadge";
import ScenarioBlock from "./ScenarioBlock";
import StatusIndicator from "./StatusIndicator";
import LibertyInterestBanner from "./LibertyInterestBanner";
import MeaningfulStepsGatePanel from "./MeaningfulStepsGatePanel";
import RedAcknowledgmentGate from "./RedAcknowledgmentGate";
import PendingAuthorityPanel from "./PendingAuthorityPanel";

interface JordanResultsDisplayProps {
  output: JordanOutput;
  userId?: string;
}

const REMEDY_LABELS: Record<JordanOutput["remedyCategory"], string> = {
  below_ceiling: "Below ceiling — no presumptive breach",
  at_or_above_ceiling: "At or above ceiling — presumptive breach, Crown must rebut",
  alternative_remedy_placeholder: "Alternative remedy (third category — not yet implemented)",
};

const WARNING_SEVERITY_STYLES: Record<string, string> = {
  info: "border-blue-500/30 bg-blue-500/5 text-blue-200",
  warning: "border-amber-500/30 bg-amber-500/5 text-amber-200",
  critical: "border-red-500/30 bg-red-500/5 text-red-200",
};

export default function JordanResultsDisplay({
  output,
  userId,
}: JordanResultsDisplayProps) {
  const [redAck, setRedAck] = useState<RedAcknowledgment | null>(null);

  const handleRedAck = useCallback((ack: RedAcknowledgment) => {
    setRedAck(ack);
  }, []);

  const multiAccusedWarning = output.warnings.find(
    (w) => w.type === "multi_accused",
  );

  const isRedGated =
    output.dominantStatus === "Red" &&
    !output.meaningfulStepsGateTriggered &&
    !redAck;

  return (
    <div className="space-y-6">
      {/* 1. Disclaimer */}
      <DisclaimerBanner />

      {/* 2. Verify with counsel */}
      <p className="text-center text-xs text-white/40">
        Always verify with qualified counsel before relying on these results.
      </p>

      {/* 3. Corpus version */}
      <div className="flex items-center justify-between text-xs text-white/40">
        <span>Corpus: {output.corpusVersion}</span>
        <span>As of {output.corpusDate}</span>
      </div>

      {/* 4. Total elapsed time — Tier 1 */}
      <Section title="Total Elapsed Time">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-mono font-semibold text-white">
            {output.totalElapsedMonths.toFixed(1)} months
          </span>
          <span className="text-sm text-white/40">
            ({output.totalElapsedDays} days)
          </span>
        </div>
        {output.clockResetApplied && output.clockResetDate && (
          <p className="mt-1 text-xs text-amber-300/70">
            Clock reset applied from {output.clockResetDate} (retrial)
          </p>
        )}
      </Section>

      {/* 5. Ceiling — Tier 2 */}
      <Section title="Presumptive Ceiling">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-mono font-semibold text-white">
            {output.ceilingMonths} months
          </span>
          <span className="text-sm text-white/40">
            ({output.effectiveCourtLevel})
          </span>
          <TierBadge tier={output.ceilingTier} citation={output.ceilingCitation} />
        </div>
      </Section>

      {/* 6. Scenario block — Tier 3 */}
      <Section>
        <ScenarioBlock scenarios={output.scenarios} />
      </Section>

      {/* 7. Defence delay breakdown */}
      {output.defenceDelayBreakdown.length > 0 && (
        <Section title="Defence Delay Breakdown">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/50">
                  <th className="pb-2 pr-4 font-medium">Sub-type</th>
                  <th className="pb-2 pr-4 font-medium text-right">Days</th>
                  <th className="pb-2 font-medium">Flag</th>
                </tr>
              </thead>
              <tbody>
                {output.defenceDelayBreakdown.map((row) => (
                  <tr
                    key={row.subType}
                    className="border-b border-white/5"
                  >
                    <td className="py-2 pr-4 text-white/80">
                      {defLabels[row.subType]}
                    </td>
                    <td className="py-2 pr-4 text-right font-mono text-white">
                      {row.days}
                    </td>
                    <td className="py-2">
                      {row.isCodyFlagged && (
                        <span className="rounded bg-red-500/15 px-2 py-0.5 text-xs font-medium text-red-300 border border-red-500/30">
                          Cody
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {/* 8. EC breakdown */}
      {output.ecBreakdown.length > 0 && (
        <Section title="Exceptional Circumstances">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/50">
                  <th className="pb-2 pr-4 font-medium">Sub-type</th>
                  <th className="pb-2 pr-4 font-medium text-right">Days</th>
                  <th className="pb-2 font-medium">Tier</th>
                </tr>
              </thead>
              <tbody>
                {output.ecBreakdown.map((row) => (
                  <tr
                    key={row.subType}
                    className="border-b border-white/5"
                  >
                    <td className="py-2 pr-4 text-white/80">
                      {ecLabels[row.subType]}
                      {row.covidArticulableLink && (
                        <span className="ml-2 text-xs text-white/40">
                          ({row.covidArticulableLink})
                        </span>
                      )}
                    </td>
                    <td className="py-2 pr-4 text-right font-mono text-white">
                      {row.days}
                    </td>
                    <td className="py-2">
                      <TierBadge tier={row.tier} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {/* 9. Status summary */}
      <Section title="Dominant Status">
        <StatusIndicator status={output.dominantStatus} />
      </Section>

      {/* 10. Liberty interest banner */}
      {output.libertyInterestEscalation && <LibertyInterestBanner />}

      {/* 11. Meaningful steps gate */}
      {output.meaningfulStepsGateTriggered &&
        output.meaningfulStepsChecklist && (
          <MeaningfulStepsGatePanel
            checklist={output.meaningfulStepsChecklist}
          />
        )}

      {/* 12. Red acknowledgment gate */}
      {output.dominantStatus === "Red" &&
        !output.meaningfulStepsGateTriggered && (
          <RedAcknowledgmentGate userId={userId} onAcknowledged={handleRedAck}>
            <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-200">
              <strong>Result:</strong> Net delay in at least one scenario is at
              or past the presumptive ceiling. A s. 11(b) application has
              arguable merit subject to the contested attributions identified.
            </div>
          </RedAcknowledgmentGate>
        )}

      {/* 13. Pending authority flags */}
      <PendingAuthorityPanel flags={output.pendingAuthorityFlags} />

      {/* 14. Remedy category */}
      <Section title="Remedy">
        <div className="flex items-baseline gap-2">
          <span className="text-sm text-white/80">
            {REMEDY_LABELS[output.remedyCategory]}
          </span>
          <TierBadge tier={output.remedyTier} />
        </div>
        {output.remedyCategory === "alternative_remedy_placeholder" && (
          <p className="mt-1 text-xs text-white/40">
            Third-category alternative remedies are not yet modelled. Consult
            counsel.
          </p>
        )}
      </Section>

      {/* 15. Warnings */}
      {output.warnings.length > 0 && (
        <Section title="Warnings">
          <div className="space-y-2">
            {output.warnings.map((w, idx) => (
              <div
                key={`${w.type}-${idx}`}
                className={`rounded-lg border px-4 py-3 text-sm ${WARNING_SEVERITY_STYLES[w.severity]}`}
              >
                {w.message}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* 16. Multi-accused warning */}
      {multiAccusedWarning && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm text-amber-200">
          <strong>Multi-Accused:</strong> {multiAccusedWarning.message}
        </div>
      )}
    </div>
  );
}

/* ── Section helper ───────────────────────────────────────────────── */

function Section({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-5">
      {title && (
        <h3 className="mb-3 text-sm font-semibold text-white">{title}</h3>
      )}
      {children}
    </div>
  );
}
