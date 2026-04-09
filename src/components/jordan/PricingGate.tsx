/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import { useState } from "react";

interface PricingGateProps {
  onSubscribe: (tier: "solo" | "firm") => Promise<void>;
  onContinueFree?: () => void;
}

const PLANS = [
  {
    tier: "solo" as const,
    name: "Solo",
    price: "$9",
    period: "/month",
    features: [
      "Unlimited calculations",
      "Save calculation history",
      "PDF export",
    ],
  },
  {
    tier: "firm" as const,
    name: "Firm",
    price: "$19",
    period: "/month",
    features: [
      "All Solo features",
      "Multiple lawyers (Phase 2)",
      "Priority support",
    ],
  },
];

export default function PricingGate({
  onSubscribe,
  onContinueFree,
}: PricingGateProps) {
  const [loading, setLoading] = useState<"solo" | "firm" | null>(null);

  const handleSubscribe = async (tier: "solo" | "firm") => {
    setLoading(tier);
    try {
      await onSubscribe(tier);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm text-amber-400">
          Free tier limit reached
        </div>
        <h2 className="text-2xl font-bold text-white">
          You&apos;ve used all 3 free calculations
        </h2>
        <p className="mt-2 text-white/50">
          Subscribe to continue with unlimited access to the Jordan Framework
          Calculator.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {PLANS.map((plan) => (
          <div
            key={plan.tier}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left transition-colors hover:border-violet-500/30"
          >
            <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-white">
                {plan.price}
              </span>
              <span className="text-white/40">{plan.period}</span>
            </div>

            <ul className="mt-4 space-y-2">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-white/70"
                >
                  <span className="text-teal-400">&#10003;</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(plan.tier)}
              disabled={loading !== null}
              className="mt-6 w-full rounded-lg bg-violet-600 py-2.5 text-sm font-medium text-white hover:bg-violet-500 disabled:opacity-50 transition-colors"
            >
              {loading === plan.tier ? "Redirecting..." : "Subscribe"}
            </button>
          </div>
        ))}
      </div>

      {onContinueFree && (
        <button
          onClick={onContinueFree}
          className="mt-6 text-sm text-white/40 hover:text-white/60 transition-colors"
        >
          Continue with free tier (view past calculations)
        </button>
      )}
    </div>
  );
}
