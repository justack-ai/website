/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Stripe from "stripe";

// Lazily instantiated so the module can be imported at build time (when
// STRIPE_SECRET_KEY is not present) without throwing. The client is created on
// first actual use, at request time, when the env var is available.
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-03-25.dahlia",
      typescript: true,
    });
  }
  return _stripe;
}

const PRICE_IDS: Record<"solo" | "firm", string> = {
  solo: process.env.STRIPE_SOLO_PRICE_ID!,
  firm: process.env.STRIPE_FIRM_PRICE_ID!,
};

export async function createCheckoutSession(
  userId: string,
  tier: "solo" | "firm",
  origin: string
) {
  return getStripe().checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: PRICE_IDS[tier], quantity: 1 }],
    success_url: `${origin}/jordan/billing?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/jordan`,
    metadata: { userId, tier },
  });
}
