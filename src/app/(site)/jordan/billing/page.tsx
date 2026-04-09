/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function BillingContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  if (sessionId) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="glass p-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Subscription Activated
          </h1>
          <p className="text-white/60 mb-6">
            Thank you for subscribing to the Charter Delay Calculator. Your
            account has been upgraded and you now have unlimited calculations.
          </p>
          <a
            href="/jordan"
            className="inline-block rounded-lg bg-violet px-6 py-3 text-white font-medium hover:bg-violet/80 transition-colors"
          >
            Start Calculating
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-24 text-center">
      <div className="glass p-8">
        <h1 className="text-3xl font-bold text-white mb-4">Billing</h1>
        <p className="text-white/60">
          Manage your Charter Delay Calculator subscription.
        </p>
      </div>
    </main>
  );
}

export default function BillingPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-2xl px-4 py-24 text-center">
          <div className="glass p-8">
            <p className="text-white/60">Loading...</p>
          </div>
        </main>
      }
    >
      <BillingContent />
    </Suspense>
  );
}
