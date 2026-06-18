-- NexiStudy: student reviews (homepage social proof, moderated)
-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
--
-- Logged-in learners leave a star rating + comment on /contact. Everything lands
-- as 'pending' and only shows on the homepage once an admin approves it.

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  -- One review per account; resubmitting updates the existing row (back to pending).
  user_id uuid not null references public.users(id) on delete cascade unique,
  name text not null,
  grade text not null default '',
  rating integer not null check (rating between 1 and 5),
  comment text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'hidden')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists reviews_status_idx on public.reviews(status, created_at desc);

-- Same security model as the rest of NexiStudy: locked down, server-only via the
-- service-role key. No anon/authenticated access.
alter table public.reviews enable row level security;
