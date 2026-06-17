-- NexiStudy: PayFast subscription support
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
--
-- Adds the columns the ITN webhook writes to, plus an audit/idempotency table
-- for every PayFast Instant Transaction Notification we accept.

-- 1) Subscription state on the user record.
alter table public.users
  add column if not exists subscription_started_at timestamptz,
  add column if not exists subscription_status     text not null default 'none'
    check (subscription_status in ('none', 'active', 'cancelled')),
  -- The PayFast subscription token (returned on the first recurring ITN).
  -- Needed to cancel/manage the subscription via PayFast's API.
  add column if not exists payfast_token           text,
  -- The unique m_payment_id of the most recent successful payment, for tracing.
  add column if not exists payfast_m_payment_id     text;

-- 2) Every ITN we accept, stored for audit + idempotency.
-- pf_payment_id is PayFast's own unique id for the transaction; we de-dupe on it
-- so a retried ITN can't double-apply.
create table if not exists public.payfast_transactions (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references public.users(id) on delete set null,
  m_payment_id    text,
  pf_payment_id   text unique,
  token           text,
  payment_status  text,
  amount_gross    numeric(12, 2),
  item_name       text,
  raw             jsonb,
  created_at      timestamptz not null default now()
);

create index if not exists payfast_transactions_user_id_idx
  on public.payfast_transactions (user_id);

-- Lock both down: the app touches them only via the service-role key on the
-- server, same as the users table.
alter table public.payfast_transactions enable row level security;
