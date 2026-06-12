-- NexiStudy: users table
-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password_hash text not null,
  plan text not null default 'free' check (plan in ('free', 'premium')),
  aps_score integer not null default 0,
  grade text not null default '',
  curriculum text not null default 'CAPS',
  role text not null default 'learner' check (role in ('learner', 'teacher')),
  school text not null default '',
  created_at timestamptz not null default now()
);

-- Lock the table down: no anon/authenticated access. The app talks to this
-- table exclusively through the service-role key on the server.
alter table public.users enable row level security;

-- Demo accounts (same credentials as the old in-memory store: password123)
insert into public.users (name, email, password_hash, plan, aps_score, grade, curriculum, role, school)
values
  ('Thandi Dlamini', 'demo@nexistudy.co.za', '$2b$10$deRlI4Qk1jLBfPMWC693weEK1A5MZbSjka3XuwhiBVOye2vhY3zV.', 'free', 28, 'Grade 12', 'CAPS', 'learner', ''),
  ('Mr. Naidoo', 'teacher@nexistudy.co.za', '$2b$10$g0phDten.yqr3mYM5HBOGuXB0KePLnnvx9fsHIUnimgAAhPMhwWQK', 'free', 0, '', 'CAPS', 'teacher', 'Northview High')
on conflict (email) do nothing;
