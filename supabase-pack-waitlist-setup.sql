-- NexiStudy: Survival Pack 2027 waitlist
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
--
-- Collected on /pack while the pack is off sale between seasons. One row per
-- email; re-joining just refreshes the language. Email the list once when the
-- 2027 pack opens.

create table if not exists public.pack_waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  language   text not null default 'en' check (language in ('en', 'af')),
  created_at timestamptz default now()
);

-- RLS on, NO public policies — writes go through /api/pack/waitlist using the
-- service-role key, same as the other pack tables.
alter table public.pack_waitlist enable row level security;
