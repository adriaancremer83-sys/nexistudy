-- NexiStudy: practice engine (topics, question bank, learner mastery)
-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.

-- CAPS topic taxonomy: subject -> grade -> topic
create table if not exists public.topics (
  id uuid primary key default gen_random_uuid(),
  subject text not null,
  grade text not null,
  name text not null,
  sort_order integer not null default 0,
  unique (subject, grade, name)
);

-- Pre-generated, vetted question bank (no AI calls at quiz time)
create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  topic_id uuid not null references public.topics(id) on delete cascade,
  prompt text not null,
  options jsonb not null, -- array of 4 answer strings
  correct_index integer not null check (correct_index between 0 and 3),
  explanation text not null,
  created_at timestamptz not null default now()
);
create index if not exists questions_topic_idx on public.questions(topic_id);

-- One row per finished quiz (powers the free-tier daily limit + history)
create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  total integer not null,
  correct integer not null,
  created_at timestamptz not null default now()
);
create index if not exists quiz_attempts_user_idx on public.quiz_attempts(user_id, created_at);

-- The "Nexi remembers you" layer: per-learner, per-topic mastery.
-- class_id is null for now; teacher class heatmaps will use it later.
create table if not exists public.learner_topics (
  user_id uuid not null references public.users(id) on delete cascade,
  topic_id uuid not null references public.topics(id) on delete cascade,
  class_id uuid,
  attempts integer not null default 0,
  questions_answered integer not null default 0,
  questions_correct integer not null default 0,
  mastery integer not null default 0 check (mastery between 0 and 100),
  last_practised timestamptz not null default now(),
  primary key (user_id, topic_id)
);

-- Same security model as users: locked down, server-only via service-role key.
alter table public.topics enable row level security;
alter table public.questions enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.learner_topics enable row level security;
