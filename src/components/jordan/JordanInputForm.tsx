/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import { useCallback, useState } from "react";
import type { JordanInput, CourtLevel, CaseEvent, DelayPeriod, MeaningfulStep } from "@/lib/jordan/types";
import ChargeDateInput from "./ChargeDateInput";
import CourtLevelSelector from "./CourtLevelSelector";
import TrialEndDateInput from "./TrialEndDateInput";
import CaseEventsLog from "./CaseEventsLog";
import MultiAccusedToggle from "./MultiAccusedToggle";
import DelayPeriodLog from "./DelayPeriodLog";
import MeaningfulStepsLog from "./MeaningfulStepsLog";
import AttestationCheckbox from "./AttestationCheckbox";

interface JordanInputFormProps {
  onSubmit: (input: JordanInput) => void;
  isCalculating?: boolean;
}

interface FormErrors {
  chargeDate?: string;
  courtLevel?: string;
  trialEndDate?: string;
  attestation?: string;
  caseEvents?: Record<string, string>;
  delayPeriods?: Record<string, string>;
  meaningfulSteps?: Record<string, string>;
  multiAccused?: string;
}

const INITIAL_STATE: JordanInput = {
  chargeDate: "",
  courtLevel: "OCJ",
  trialEndDate: "",
  jurisdiction: "ON",
  caseEvents: [],
  delayPeriods: [],
  meaningfulSteps: [],
  multiAccused: false,
  attestation: {
    confirmed: false,
  },
};

export function JordanInputForm({ onSubmit, isCalculating }: JordanInputFormProps) {
  const [input, setInput] = useState<JordanInput>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});

  const update = useCallback(
    <K extends keyof JordanInput>(key: K, value: JordanInput[K]) => {
      setInput((prev) => ({ ...prev, [key]: value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
    [],
  );

  const validate = useCallback((): FormErrors => {
    const errs: FormErrors = {};
    const today = new Date().toISOString().split("T")[0];

    // Charge date
    if (!input.chargeDate) {
      errs.chargeDate = "Charge date is required.";
    } else if (input.chargeDate > today) {
      errs.chargeDate = "Charge date cannot be in the future.";
    }

    // Court level
    if (!input.courtLevel) {
      errs.courtLevel = "Court level is required.";
    }

    // Trial end date
    if (!input.trialEndDate) {
      errs.trialEndDate = "Trial end date is required.";
    } else if (input.chargeDate && input.trialEndDate <= input.chargeDate) {
      errs.trialEndDate = "Trial end date must be after the charge date.";
    }

    // Case events
    const eventErrors: Record<string, string> = {};
    for (const evt of input.caseEvents) {
      if (!evt.date) {
        eventErrors[evt.id] = "Event date is required.";
      }
      if (evt.type === "re_election" && (!evt.fromCourt || !evt.toCourt)) {
        eventErrors[evt.id] =
          "Re-election requires both From Court and To Court.";
      }
    }
    if (Object.keys(eventErrors).length > 0) errs.caseEvents = eventErrors;

    // Delay periods
    const periodErrors: Record<string, string> = {};
    for (const dp of input.delayPeriods) {
      if (!dp.startDate || !dp.endDate) {
        periodErrors[dp.id] = "Both start and end dates are required.";
      } else if (dp.endDate <= dp.startDate) {
        periodErrors[dp.id] = "End date must be after start date.";
      }
      if (dp.party === "Defence" && !dp.defenceSubType) {
        periodErrors[dp.id] = "Defence delay sub-type is required.";
      }
      if (
        dp.ecSubType &&
        (dp.ecSubType === "covid_ontario" ||
          dp.ecSubType === "covid_alberta" ||
          dp.ecSubType === "covid_other")
      ) {
        if (!dp.covidArticulableLink) {
          periodErrors[dp.id] =
            "Articulable link to COVID-19 is required for COVID delay.";
        }
        if (!dp.covidJurisdiction) {
          periodErrors[dp.id] =
            periodErrors[dp.id] ||
            "COVID jurisdiction confirmation is required.";
        }
      }
    }
    if (Object.keys(periodErrors).length > 0) errs.delayPeriods = periodErrors;

    // Meaningful steps
    const stepErrors: Record<string, string> = {};
    for (const ms of input.meaningfulSteps) {
      if (!ms.date) {
        stepErrors[ms.id] = "Step date is required.";
      }
      if (!ms.description.trim()) {
        stepErrors[ms.id] = "Step description is required.";
      }
    }
    if (Object.keys(stepErrors).length > 0) errs.meaningfulSteps = stepErrors;

    // Multi-accused
    if (input.multiAccused && (!input.coAccusedCount || input.coAccusedCount < 1)) {
      errs.multiAccused = "Co-accused count is required when multi-accused is enabled.";
    }

    // Attestation
    if (!input.attestation.confirmed) {
      errs.attestation = "Attestation is required before calculation.";
    }

    return errs;
  }, [input]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const errs = validate();
      setErrors(errs);

      const hasErrors =
        Object.values(errs).some((v) =>
          typeof v === "object" ? Object.keys(v).length > 0 : !!v,
        );

      if (!hasErrors) {
        onSubmit(input);
      }
    },
    [validate, onSubmit, input],
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Charge Date */}
      <div className="glass p-6">
        <ChargeDateInput
          value={input.chargeDate}
          onChange={(v) => update("chargeDate", v)}
          error={errors.chargeDate}
        />
      </div>

      {/* Court Level */}
      <div className="glass p-6">
        <CourtLevelSelector
          value={input.courtLevel}
          onChange={(v) => update("courtLevel", v)}
          error={errors.courtLevel}
        />
      </div>

      {/* Trial End Date */}
      <div className="glass p-6">
        <TrialEndDateInput
          value={input.trialEndDate}
          chargeDate={input.chargeDate}
          onChange={(v) => update("trialEndDate", v)}
          error={errors.trialEndDate}
        />
      </div>

      {/* Case Events */}
      <div className="glass p-6">
        <CaseEventsLog
          events={input.caseEvents}
          onChange={(v) => update("caseEvents", v)}
          errors={errors.caseEvents}
        />
      </div>

      {/* Multi-Accused */}
      <div className="glass p-6">
        <MultiAccusedToggle
          enabled={input.multiAccused}
          coAccusedCount={input.coAccusedCount}
          onToggle={(v) => update("multiAccused", v)}
          onCountChange={(v) => update("coAccusedCount", v)}
          error={errors.multiAccused}
        />
      </div>

      {/* Delay Periods */}
      <div className="glass p-6">
        <DelayPeriodLog
          periods={input.delayPeriods}
          onChange={(v) => update("delayPeriods", v)}
          errors={errors.delayPeriods}
        />
      </div>

      {/* Meaningful Steps */}
      <div className="glass p-6">
        <MeaningfulStepsLog
          steps={input.meaningfulSteps}
          onChange={(v) => update("meaningfulSteps", v)}
          errors={errors.meaningfulSteps}
        />
      </div>

      {/* Attestation */}
      <div className="glass p-6">
        <AttestationCheckbox
          confirmed={input.attestation.confirmed}
          timestamp={input.attestation.timestamp}
          onChange={(confirmed, timestamp) =>
            update("attestation", { confirmed, timestamp })
          }
          error={errors.attestation}
        />
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isCalculating}
          className="rounded-lg bg-violet px-6 py-3 text-white font-medium hover:bg-violet/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCalculating ? "Calculating..." : "Calculate"}
        </button>
      </div>
    </form>
  );
}
