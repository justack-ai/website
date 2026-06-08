/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import { useState, useCallback, useEffect } from "react";
import type { JordanInput, JordanOutput, SubscriptionTier } from "@/lib/jordan/types";
import { JordanInputForm } from "./JordanInputForm";
import JordanResultsDisplay from "./JordanResultsDisplay";
import SubscriptionStatus from "./SubscriptionStatus";
import PricingGate from "./PricingGate";
import AuthModal from "./AuthModal";
import { createBrowserClient } from "@/lib/jordan/supabase";

export function JordanCalculator() {
  const [output, setOutput] = useState<JordanOutput | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  // Subscription state
  const [userId, setUserId] = useState<string | undefined>();
  const [subTier, setSubTier] = useState<SubscriptionTier>("free");
  const [subStatus, setSubStatus] = useState<"active" | "past_due" | "canceled" | "trialing">("active");
  const [calcsUsed, setCalcsUsed] = useState(0);
  const [maxCalcs, setMaxCalcs] = useState(3);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check auth and subscription on mount
  useEffect(() => {
    const supabase = createBrowserClient();

    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        setIsLoggedIn(true);

        const { data: sub } = await supabase
          .from("jordan_subscriptions")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (sub) {
          setSubTier(sub.tier as SubscriptionTier);
          setSubStatus(sub.status);
          setCalcsUsed(sub.calculations_used);
          setMaxCalcs(sub.max_calculations);
        }
      }
    }

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setUserId(session.user.id);
          setIsLoggedIn(true);
          setShowAuthModal(false);
        } else {
          setUserId(undefined);
          setIsLoggedIn(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleCalculate = useCallback(async (input: JordanInput) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }

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
        setShowAuthModal(true);
        return;
      }

      if (response.status === 403) {
        setShowPaywall(true);
        return;
      }

      if (!response.ok) {
        const data = await response.json();
        setError(data.error ?? "Calculation failed. Please check your inputs.");
        return;
      }

      const data = await response.json();
      setOutput(data.output);
      setCalcsUsed((prev) => prev + 1);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsCalculating(false);
    }
  }, [isLoggedIn]);

  const handleSubscribe = useCallback(async (tier: "solo" | "firm") => {
    const response = await fetch("/api/jordan/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tier }),
    });

    if (response.ok) {
      const { url } = await response.json();
      if (url) window.location.href = url;
    }
  }, []);

  const handleReset = useCallback(() => {
    setOutput(null);
    setError(null);
    setShowPaywall(false);
  }, []);

  if (showPaywall) {
    return (
      <div className="space-y-8">
        <PricingGate
          onSubscribe={handleSubscribe}
          onContinueFree={handleReset}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {isLoggedIn && (
        <SubscriptionStatus
          tier={subTier}
          status={subStatus}
          calculationsUsed={calcsUsed}
          maxCalculations={maxCalcs}
        />
      )}

      {!isLoggedIn && (
        <div className="glass p-4 text-center text-sm text-white/60">
          <button
            onClick={() => setShowAuthModal(true)}
            className="text-violet-400 hover:text-violet-300 font-medium"
          >
            Sign in
          </button>{" "}
          to save your calculations. First 3 calculations are free.
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-300 text-sm">
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
          <JordanResultsDisplay output={output} userId={userId} />
        </div>
      )}

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
}
