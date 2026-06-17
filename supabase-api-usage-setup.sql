-- NexiStudy: Anthropic API usage + cost logging
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
--
-- One row per Claude API call. Lets the admin overview page sum today's spend
-- without calling Anthropic's billing API. Cost is computed at write time from
-- the model's per-token rates (see lib/apiUsage.ts).

create table if not exists public.api_usage (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid references public.users(id) on delete set null,
  feature        text not null default 'tutor',     -- which surface made the call
  model          text not null,
  input_tokens   integer not null default 0,
  output_tokens  integer not null default 0,
  -- cache token counts, kept for accurate cost reconstruction
  cache_read_tokens   integer not null default 0,
  cache_write_tokens  integer not null default 0,
  cost_usd       numeric(12, 6) not null default 0,  -- computed USD cost of this call
  created_at     timestamptz not null default now()
);

create index if not exists api_usage_created_at_idx on public.api_usage (created_at);

-- Service-role only, same as the rest of the app's server tables.
alter table public.api_usage enable row level security;
