/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

-- Phase 1: Workflow engine, deadlines, Jordan delay tracking

CREATE TYPE node_decision_state AS ENUM (
  'yes', 'no', 'pending', 'partial', 'unknown', 'delegated'
);

CREATE TYPE urgency_level AS ENUM ('normal', 'urgent', 'overdue');

CREATE TYPE delay_category AS ENUM (
  'defence', 'crown', 'institutional', 'exceptional', 'waived'
);

-- WORKFLOW NODE STATES

CREATE TABLE workflow_node_states (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matter_id   UUID NOT NULL REFERENCES matters(id) ON DELETE CASCADE,
  owner_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  node_id     TEXT NOT NULL,
  decision    node_decision_state NOT NULL DEFAULT 'pending',
  note        TEXT,
  decided_at  TIMESTAMPTZ,
  decided_by  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(matter_id, node_id)
);

ALTER TABLE workflow_node_states ENABLE ROW LEVEL SECURITY;
CREATE POLICY "node_states_owner_all" ON workflow_node_states
  FOR ALL USING (auth.uid() = owner_id);

-- DEADLINES

CREATE TABLE deadlines (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matter_id      UUID NOT NULL REFERENCES matters(id) ON DELETE CASCADE,
  owner_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  node_id        TEXT,
  label          TEXT NOT NULL,
  due_date       DATE NOT NULL,
  is_jordan      BOOLEAN NOT NULL DEFAULT false,
  resolved_at    TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- days_remaining and urgency computed at query time via view
CREATE OR REPLACE VIEW deadlines_computed AS
SELECT *,
  (due_date - CURRENT_DATE)::INTEGER AS days_remaining,
  CASE
    WHEN (due_date - CURRENT_DATE) < 0 THEN 'overdue'::urgency_level
    WHEN (due_date - CURRENT_DATE) <= 7 THEN 'urgent'::urgency_level
    ELSE 'normal'::urgency_level
  END AS urgency
FROM deadlines;

ALTER TABLE deadlines ENABLE ROW LEVEL SECURITY;
CREATE POLICY "deadlines_owner_all" ON deadlines FOR ALL USING (auth.uid() = owner_id);

-- JORDAN DELAY PERIODS (append-only — recategorize by adding new entry)

CREATE TABLE delay_periods (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matter_id     UUID NOT NULL REFERENCES matters(id) ON DELETE CASCADE,
  owner_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  start_date    DATE NOT NULL,
  end_date      DATE NOT NULL,
  days          INTEGER GENERATED ALWAYS AS ((end_date - start_date)) STORED,
  category      delay_category NOT NULL,
  description   TEXT NOT NULL,
  source        TEXT,
  recorded_at   TIMESTAMPTZ NOT NULL DEFAULT now()
  -- NO updated_at -- recategorization creates new entry; original preserved
);

ALTER TABLE delay_periods ENABLE ROW LEVEL SECURITY;
CREATE POLICY "delay_periods_owner_select" ON delay_periods
  FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "delay_periods_owner_insert" ON delay_periods
  FOR INSERT WITH CHECK (auth.uid() = owner_id);
-- NO UPDATE OR DELETE -- recategorize by appending new entry

-- Add missing columns to matters table (from spec)
ALTER TABLE matters ADD COLUMN IF NOT EXISTS jordan_ceiling_days INTEGER;
ALTER TABLE matters ADD COLUMN IF NOT EXISTS workflow_config_id TEXT NOT NULL DEFAULT 'criminal_bail_v1';
