-- NexiStudy: lightweight self-hosted page-view analytics (admin dashboard)
-- Run this once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
--
-- One row per page view. `visitor` is an anonymous random id from the browser
-- (no IP, no personal data — POPIA-friendly) so we can estimate unique visitors.

create table if not exists public.page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  visitor text not null default '',
  created_at timestamptz not null default now()
);
create index if not exists page_views_created_idx on public.page_views(created_at desc);

-- Server-only via the service-role key, like the rest of NexiStudy.
alter table public.page_views enable row level security;
