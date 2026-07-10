-- NexiStudy: Matric Prelim Survival Pack — commerce core (Phase 1)
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
--
-- Creates the pack product/purchase/file tables, the private storage bucket,
-- and seeds the matric product. See /SURVIVAL_PACK.md for the full spec.

-- 1) One row per sellable pack (matric now; grade 10/11 later).
create table if not exists public.pack_products (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,          -- 'matric-prelim-2026'
  name        text not null,
  price_cents integer not null,              -- 19900
  active      boolean not null default true,
  created_at  timestamptz default now()
);

-- 2) One row per purchase attempt. Guest checkout means user_id is nullable;
-- when a logged-in user buys we also link their account. NOTE: this app uses
-- next-auth with public.users (not Supabase Auth), so the FK targets that.
create table if not exists public.pack_purchases (
  id                 uuid primary key default gen_random_uuid(),
  product_id         uuid not null references public.pack_products(id),
  email              text not null,
  user_id            uuid references public.users(id) on delete set null,
  payfast_payment_id text,
  amount_cents       integer not null,
  status             text not null default 'pending'
    check (status in ('pending', 'paid', 'failed', 'refunded')),
  download_token     uuid not null default gen_random_uuid(),
  download_count     integer not null default 0,
  created_at         timestamptz default now(),
  paid_at            timestamptz
);

create index if not exists pack_purchases_download_token_idx
  on public.pack_purchases (download_token);
create index if not exists pack_purchases_email_idx
  on public.pack_purchases (email);

-- 3) Files that belong to a product.
create table if not exists public.pack_files (
  id           uuid primary key default gen_random_uuid(),
  product_id   uuid not null references public.pack_products(id),
  storage_path text not null,                -- 'packs/matric-2026/en/maths-lit.pdf'
  title        text not null,
  language     text not null check (language in ('en', 'af')),
  sort_order   integer not null default 0
);

create index if not exists pack_files_product_id_idx
  on public.pack_files (product_id);

-- Lock all three down: RLS on, NO anon/public policies. Every read/write goes
-- through server-side API routes using the service-role key (bypasses RLS).
alter table public.pack_products  enable row level security;
alter table public.pack_purchases enable row level security;
alter table public.pack_files     enable row level security;

-- 4) Private storage bucket for the PDFs. NEVER public — files are served via
-- server-generated signed URLs (1 hour expiry) after download-token validation.
insert into storage.buckets (id, name, public)
values ('pack-files', 'pack-files', false)
on conflict (id) do nothing;

-- No storage policies on purpose: with RLS enforced and no policies, only the
-- service-role key can read/write objects in this bucket.

-- 5) Seed the matric product.
insert into public.pack_products (slug, name, price_cents)
values ('matric-prelim-2026', 'NexiStudy Matric Prelim Survival Pack', 19900)
on conflict (slug) do nothing;
