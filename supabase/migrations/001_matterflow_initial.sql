/*
 * Copyright 2026 Humilitas Group Limited
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE matter_type AS ENUM ('criminal', 'civil', 'family', 'administrative', 'other');
CREATE TYPE matter_jurisdiction AS ENUM (
  'ontario_superior', 'ontario_ontario_court', 'ontario_divisional',
  'ontario_court_of_appeal', 'federal_court', 'supreme_court_canada'
);
CREATE TYPE instruction_type AS ENUM ('fact', 'decision', 'authorization', 'constraint', 'delegation');

CREATE TABLE matters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  matter_type matter_type NOT NULL,
  jurisdiction matter_jurisdiction NOT NULL,
  client_name TEXT NOT NULL,
  opposing_party TEXT,
  counsel_name TEXT,
  charge_date DATE,
  court_level TEXT,
  jordan_ceiling_days INTEGER,
  current_posture TEXT,
  workflow_config_id TEXT NOT NULL DEFAULT 'criminal_bail_v1',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at TIMESTAMPTZ
);

ALTER TABLE matters ENABLE ROW LEVEL SECURITY;
CREATE POLICY "matters_owner_select" ON matters FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "matters_owner_insert" ON matters FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "matters_owner_update" ON matters FOR UPDATE USING (auth.uid() = owner_id);
-- NO DELETE POLICY

CREATE TABLE instructions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matter_id UUID NOT NULL REFERENCES matters(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  instruction_type instruction_type NOT NULL,
  content TEXT NOT NULL,
  note TEXT,
  author TEXT NOT NULL,
  ai_generated BOOLEAN NOT NULL DEFAULT false,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  workflow_node_id TEXT
);

ALTER TABLE instructions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "instructions_owner_select" ON instructions FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "instructions_owner_insert" ON instructions FOR INSERT WITH CHECK (auth.uid() = owner_id);
-- EXPLICITLY NO UPDATE OR DELETE POLICIES

CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  matter_id UUID NOT NULL REFERENCES matters(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  payload JSONB NOT NULL,
  actor TEXT NOT NULL,
  actor_id UUID NOT NULL,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "audit_log_owner_select" ON audit_log FOR SELECT USING (auth.uid() = owner_id);
CREATE POLICY "audit_log_owner_insert" ON audit_log FOR INSERT WITH CHECK (auth.uid() = owner_id);
-- EXPLICITLY NO UPDATE OR DELETE POLICIES
