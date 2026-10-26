-- NexiStudy: Premium paid-through date
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
--
-- Fixes cancelled / unpaid subscriptions keeping Premium forever. Each verified
-- PayFast payment now sets premium_until = payment + 33 days (one month + a
-- few days' grace for the renewal to land). Once it passes, the app drops the
-- learner to Free on their next request — no ITN needed.

alter table public.users
  add column if not exists premium_until timestamptz;

-- Backfill current Premium learners from their latest successful payment, so
-- the fix also covers people who already cancelled (or stopped paying) and
-- are still on Premium.
update public.users u
set premium_until = last_paid.paid_at + interval '33 days'
from (
  select user_id, max(created_at) as paid_at
  from public.payfast_transactions
  where payment_status = 'COMPLETE' and user_id is not null
  group by user_id
) last_paid
where u.id = last_paid.user_id
  and u.plan = 'premium';

-- Premium learners with NO payment on record (e.g. upgraded by hand) are left
-- with premium_until = null, which the app treats as "no expiry". Check them:
--   select id, email, subscription_status from public.users
--   where plan = 'premium' and premium_until is null;
