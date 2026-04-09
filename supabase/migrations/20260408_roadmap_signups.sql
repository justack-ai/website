-- Roadmap per-tool email signups
-- Separate from general subscribe flow for clean demand signal queries

create table if not exists roadmap_signups (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  tool_interest text not null,
  source text not null default '/roadmap',
  created_at timestamptz default now() not null,
  unique (email, tool_interest)
);

-- Index for querying demand by tool
create index if not exists idx_roadmap_signups_tool on roadmap_signups (tool_interest);

-- RLS: allow inserts from anon, restrict reads to service role
alter table roadmap_signups enable row level security;

create policy "Allow anonymous inserts" on roadmap_signups
  for insert to anon with check (true);

create policy "Service role reads all" on roadmap_signups
  for select to service_role using (true);
