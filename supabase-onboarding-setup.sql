-- NexiStudy: learner onboarding fields
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
--
-- Adds the language / subjects / onboarded fields a learner picks on the
-- one-time setup screen after their first login.

alter table public.users
  add column if not exists language  text    not null default 'English',
  add column if not exists subjects  jsonb   not null default '[]'::jsonb,
  add column if not exists onboarded boolean not null default false;

-- Existing accounts have already been using the app, so don't trap them in the
-- onboarding flow — mark everyone done...
update public.users set onboarded = true;

-- ...except Joshua, who should walk through the new setup screen.
update public.users set onboarded = false where email = 'joshua@nexistudy.co.za';
