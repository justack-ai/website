/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import { useState, useCallback } from "react";
import type { JordanInput, JordanOutput } from "@/lib/jordan/types";
import { JordanInputForm } from "./JordanInputForm";
import { JordanResultsDisplay } from "./JordanResultsDisplay";
import { SubscriptionStatus } from "./SubscriptionStatus";

export function JordanCalculator() {
  const [output, setOutput] = useState<JordanOutput | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = useCallback(async (input: JordanInput) => {
    setIsCalculating(true);
    setError(null);
    setOutput(null);

    try {
      const response = await fetch("/api/jordan/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (response.status === 401) {
        setError("Please sign in to use the Charter Delay Calculator.");
        return;
      }

      if (response.status === 403) {
        const data = await response.json();
        setError(data.message ?? "Free tier limit reached.");
        return;
      }

      if (!response.ok) {
        setError("Calculation failed. Please check your inputs and try again.");
        return;
      }

      const data = await response.json();
      setOutput(data.output);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsCalculating(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setOutput(null);
    setError(null);
  }, []);

  return (
    <div className="space-y-8">
      <SubscriptionStatus />

      {error && (
        <div className="glass border-red-500/30 p-4 text-red-300 text-sm">
          {error}
        </div>
      )}

      {!output ? (
        <JordanInputForm
          onSubmit={handleCalculate}
          isCalculating={isCalculating}
        />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Results</h2>
            <button
              onClick={handleReset}
              className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white/60 hover:bg-white/5 transition-colors"
            >
              New Calculation
            </button>
          </div>
          <JordanResultsDisplay output={output} />
        </div>
      )}
    </div>
  );
}
