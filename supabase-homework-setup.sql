-- NexiStudy: teacher homework (a fixed, verified question set assigned to a class)
-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
--
-- Unlike practice assignments (which only name a topic and read completion back
-- from generic quiz_attempts), homework pins an EXACT set of already-verified
-- question ids at creation time. That fixed set is what learners answer in-app,
-- what gets auto-marked, what the "most-missed" report aggregates over, and what
-- the printable worksheet renders. No questions are ever generated here — the
-- teacher only selects/sequences questions that already exist in the bank.

create table if not exists public.class_homework (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  title text not null,
  -- The pinned set of verified question ids, in presentation order.
  question_ids uuid[] not null,
  due_date date,
  created_at timestamptz not null default now()
);
create index if not exists class_homework_class_idx on public.class_homework(class_id);

-- One row per learner per homework: their answers ({questionId: chosenIndex})
-- plus the auto-marked score. Unique so a learner can't submit twice.
create table if not exists public.homework_submissions (
  id uuid primary key default gen_random_uuid(),
  homework_id uuid not null references public.class_homework(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  answers jsonb not null default '{}'::jsonb,
  total integer not null default 0,
  correct integer not null default 0,
  created_at timestamptz not null default now(),
  unique (homework_id, user_id)
);
create index if not exists homework_submissions_homework_idx on public.homework_submissions(homework_id);

-- Same security model as the rest of NexiStudy: locked down, server-only via the
-- service-role key. No anon/authenticated access.
alter table public.class_homework enable row level security;
alter table public.homework_submissions enable row level security;
