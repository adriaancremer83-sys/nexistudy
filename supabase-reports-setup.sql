-- NexiStudy: question reporting (learner-flagged questions drop out of rotation)
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.

-- A flagged question is hidden from quizzes until a human clears it.
alter table public.questions
  add column if not exists flagged boolean not null default false;

create table if not exists public.question_reports (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  user_id uuid references public.users(id) on delete set null,
  reason text not null default '',
  resolved boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists question_reports_open_idx
  on public.question_reports(resolved, created_at);

-- Same security model as the rest of the app: server-only via service-role key.
alter table public.question_reports enable row level security;
