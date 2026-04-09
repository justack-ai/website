/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
  typescript: true,
});

const PRICE_IDS: Record<"solo" | "firm", string> = {
  solo: process.env.STRIPE_SOLO_PRICE_ID!,
  firm: process.env.STRIPE_FIRM_PRICE_ID!,
};

/**
 * Create a Stripe Checkout session for a Jordan subscription upgrade.
 */
export async function createCheckoutSession(
  userId: string,
  tier: "solo" | "firm",
  origin: string
) {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: PRICE_IDS[tier],
        quantity: 1,
      },
    ],
    metadata: {
      userId,
      tier,
    },
    success_url: `${origin}/jordan/billing?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/jordan`,
  });

  return session;
}
