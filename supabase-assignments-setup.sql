-- NexiStudy: practice assignments (teacher sets a topic + question count for a class)
-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
--
-- A teacher picks a topic from the class's question bank, a number of questions,
-- and an optional due date, then assigns it to the class. Completion is read back
-- from the learners' real quiz_attempts on that topic (created on/after the
-- assignment), so no extra "completed" tracking table is needed.

create table if not exists public.class_assignments (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  num_questions integer not null default 8,
  due_date date,
  created_at timestamptz not null default now()
);
create index if not exists class_assignments_class_idx on public.class_assignments(class_id);

-- Same security model as the rest of NexiStudy: locked down, server-only via the
-- service-role key. No anon/authenticated access.
alter table public.class_assignments enable row level security;
