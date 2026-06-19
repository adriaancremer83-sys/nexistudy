-- NexiStudy: Grade 9 Subject Choice Advisor daily usage counter
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
--
-- Tracks how many subject-choice advice reports each learner generates per day,
-- so the daily limit is enforced server-side. Mirrors tutor_usage.

create table if not exists public.subject_advisor_usage (
  user_id uuid not null references public.users(id) on delete cascade,
  day     date not null default (now() at time zone 'utc')::date,
  count   integer not null default 0,
  primary key (user_id, day)
);

alter table public.subject_advisor_usage enable row level security;
-- No anon/authenticated policies: server-only via the service-role key.
