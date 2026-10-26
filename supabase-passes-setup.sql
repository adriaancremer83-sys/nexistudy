-- NexiStudy: Premium passes (once-off) + parent pay links
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Needs supabase-premium-until-setup.sql to have run first (users.premium_until).
--
-- Premium is sold as once-off passes (30 days / 3 months / 12 months) instead
-- of a card-only monthly subscription, so parents can pay by instant EFT. Each
-- learner gets a private pay link (/gift/<pay_code>) a parent can pay through
-- without logging in.

-- 1) The learner's private parent-pay code.
alter table public.users
  add column if not exists pay_code text unique;

-- 2) One row per pass purchase attempt. The payer may be the learner or a
-- parent (guest) — payer_email is wherever the receipt goes.
create table if not exists public.premium_passes (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null references public.users(id) on delete cascade,
  pass_slug          text not null,          -- 'pass-30' | 'pass-90' | 'pass-365'
  days               integer not null,
  amount_cents       integer not null,
  payer_email        text not null,
  paid_by_parent     boolean not null default false,
  status             text not null default 'pending'
    check (status in ('pending', 'paid', 'failed')),
  payfast_payment_id text,
  premium_until      timestamptz,             -- paid-through date this pass produced
  created_at         timestamptz default now(),
  paid_at            timestamptz
);

create index if not exists premium_passes_user_id_idx on public.premium_passes (user_id);

-- RLS on, no public policies — server routes use the service-role key.
alter table public.premium_passes enable row level security;
