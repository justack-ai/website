-- Copyright 2026 Humilitas Group Limited
-- This Source Code Form is subject to the terms of the Mozilla Public
-- License, v. 2.0. If a copy of the MPL was not distributed with this
-- file, You can obtain one at https://mozilla.org/MPL/2.0/.

-- ── jordan_calculations ──────────────────────────────────────────

create table if not exists jordan_calculations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  input jsonb not null,
  output jsonb not null,
  corpus_version text not null,
  attestation_timestamp timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_jordan_calculations_user_id on jordan_calculations(user_id);

alter table jordan_calculations enable row level security;

create policy "Users can read own calculations"
  on jordan_calculations for select
  using (auth.uid() = user_id);

create policy "Users can insert own calculations"
  on jordan_calculations for insert
  with check (auth.uid() = user_id);

create policy "Users can update own calculations"
  on jordan_calculations for update
  using (auth.uid() = user_id);

-- ── jordan_subscriptions ─────────────────────────────────────────

create table if not exists jordan_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  tier text not null default 'free' check (tier in ('free', 'solo', 'firm')),
  stripe_customer_id text,
  stripe_subscription_id text,
  status text not null default 'active' check (status in ('active', 'past_due', 'canceled', 'trialing')),
  calculations_used int not null default 0,
  max_calculations int not null default 3,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_jordan_subscriptions_user_id on jordan_subscriptions(user_id);

alter table jordan_subscriptions enable row level security;

create policy "Users can read own subscription"
  on jordan_subscriptions for select
  using (auth.uid() = user_id);

-- Service role bypasses RLS, so no explicit policy needed for webhook updates.
-- But we add one for completeness if service_role is used with RLS enabled:
create policy "Service role can manage subscriptions"
  on jordan_subscriptions for all
  using (auth.jwt() ->> 'role' = 'service_role');
