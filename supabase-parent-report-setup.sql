-- NexiStudy: Termly Parent Report daily usage counter
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
--
-- Tracks how many parent reports each learner generates per day, so the daily
-- limit is enforced server-side. Mirrors subject_advisor_usage.

create table if not exists public.parent_report_usage (
  user_id uuid not null references public.users(id) on delete cascade,
  day     date not null default (now() at time zone 'utc')::date,
  count   integer not null default 0,
  primary key (user_id, day)
);

alter table public.parent_report_usage enable row level security;
-- No anon/authenticated policies: server-only via the service-role key.
