-- NexiStudy: Nexi Tutor daily usage counter
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
--
-- Tracks how many AI tutor messages each learner has sent per day, so the daily
-- limit is enforced server-side (the client counter can be bypassed).

create table if not exists public.tutor_usage (
  user_id uuid not null references public.users(id) on delete cascade,
  day     date not null default (now() at time zone 'utc')::date,
  count   integer not null default 0,
  primary key (user_id, day)
);

alter table public.tutor_usage enable row level security;
-- No anon/authenticated policies: the app touches this only via the service-role
-- key on the server, same as the users table.
