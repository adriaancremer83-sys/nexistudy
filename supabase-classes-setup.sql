-- NexiStudy: teacher classes (class codes -> real class weak-spots heatmap)
-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
--
-- A teacher creates a class (subject + grade) and gets a short join code.
-- Learners join with the code; their per-topic mastery (learner_topics) then
-- rolls up into the class heatmap so the teacher sees what the class is stuck on.

-- One class per teacher subject/grade group, identified by a short human code.
create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.users(id) on delete cascade,
  name text not null,
  subject text not null,
  grade text not null,
  join_code text not null unique,
  created_at timestamptz not null default now()
);
create index if not exists classes_teacher_idx on public.classes(teacher_id);

-- Learner <-> class membership. A learner can be in several classes (e.g. Maths
-- and Physical Sciences), so the key is the pair, not the learner alone.
create table if not exists public.class_members (
  class_id uuid not null references public.classes(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (class_id, user_id)
);
create index if not exists class_members_user_idx on public.class_members(user_id);

-- Same security model as the rest of NexiStudy: locked down, server-only via the
-- service-role key. No anon/authenticated access.
alter table public.classes enable row level security;
alter table public.class_members enable row level security;
