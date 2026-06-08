/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/jordan/stripe";
import { createServiceRoleClient } from "@/lib/jordan/supabase-server";
import type Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createServiceRoleClient();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const tier = session.metadata?.tier as "solo" | "firm" | undefined;

        if (!userId || !tier) {
          console.error("Missing metadata on checkout session:", session.id);
          break;
        }

        await supabase.from("jordan_subscriptions").upsert(
          {
            user_id: userId,
            tier,
            stripe_customer_id:
              typeof session.customer === "string"
                ? session.customer
                : session.customer?.id ?? null,
            stripe_subscription_id:
              typeof session.subscription === "string"
                ? session.subscription
                : (session.subscription as Stripe.Subscription)?.id ?? null,
            status: "active",
            max_calculations: 999999999, // effectively unlimited
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        );

        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const status = subscription.status;

        // Map Stripe status to our status enum
        let mappedStatus: "active" | "past_due" | "canceled" = "active";
        if (status === "past_due") mappedStatus = "past_due";
        else if (status === "canceled" || status === "unpaid")
          mappedStatus = "canceled";

        await supabase
          .from("jordan_subscriptions")
          .update({
            status: mappedStatus,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", subscription.id);

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        await supabase
          .from("jordan_subscriptions")
          .update({
            tier: "free",
            status: "canceled",
            max_calculations: 3,
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", subscription.id);

        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        // Stripe dahlia API: subscription lives under parent.subscription_details
        const sub = invoice.parent?.subscription_details?.subscription;
        const subscriptionId =
          typeof sub === "string" ? sub : sub?.id ?? null;

        if (subscriptionId) {
          await supabase
            .from("jordan_subscriptions")
            .update({
              status: "past_due",
              updated_at: new Date().toISOString(),
            })
            .eq("stripe_subscription_id", subscriptionId);
        }

        break;
      }
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
