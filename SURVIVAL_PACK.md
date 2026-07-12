# SURVIVAL_PACK.md — Claude Code Project Memory
> Place this file at `/docs/SURVIVAL_PACK.md` in the NexiStudy repo.
> Add this line to the root `CLAUDE.md`: "Before any Survival Pack work, read /docs/SURVIVAL_PACK.md in full."

---

## WHAT THIS FEATURE IS

The **Matric Prelim Survival Pack** — a R199 once-off digital product sold on nexistudy.co.za.
A bilingual (EN + AF) bundle of branded PDFs for Grade 12 learners + parents preparing
for prelims starting **29 August 2026**.

Grade 10 and Grade 11 versions follow after launch using the same pipeline.

**Contents of the pack:**
1. 7-Week Countdown Planner (13 July → 29 Aug) — the hero document
2. 10 Subject Strategy Sheets: Maths, Maths Lit, Physical Sciences, Life Sciences,
   Accounting, Business Studies, Geography, History, English (EN only), Afrikaans (AF only)
3. APS Target Worksheet
4. Parents' Guide (5–6 pages)
5. Bonus: Sunday parent check-in WhatsApp scripts

All documents exist in English AND Afrikaans, EXCEPT: English subject sheet (EN only),
Afrikaans subject sheet (AF only).

---

## BUSINESS RULES (do not deviate)

- Price: **R199.00** once-off. Single product. No per-subject sales.
- Nexi Tutor (Premium) subscribers get the pack **included free** — their pack access
  is granted via their subscription status, not a purchase row.
- Guest checkout allowed: parents buy with just an email. No forced signup.
  If a logged-in user buys, also link purchase to their user_id.
- Delivery: private Supabase Storage bucket + signed URLs behind a purchase token.
  NEVER public URLs. NEVER email attachments.
- Thank-you page upsells Nexi Tutor subscription.
- Brand: this is a NexiStudy product. Nexi meerkat mascot (round glasses, hoodie)
  appears on covers. Grades 8–12 brand framing stays consistent with the site.

---

## STACK & EXISTING SYSTEM (respect what exists)

- Next.js (App Router) + TypeScript + Tailwind, deployed on Vercel
- Supabase: auth (Google OAuth live), database, storage
- PayFast: LIVE integration already working (R5 test passed) for Nexi Tutor.
  REUSE existing PayFast utilities/signature helpers — do not build a second
  PayFast implementation. Find the existing integration first and extend it.
- DO NOT modify existing Nexi Tutor code paths, auth flows, or the prelim
  countdown widget except where this spec explicitly requires a link.

---

## DATABASE SCHEMA (Supabase migration)

```sql
-- One row per sellable pack (matric now; grade 10/11 later)
create table pack_products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,            -- 'matric-prelim-2026'
  name text not null,
  price_cents integer not null,          -- 19900
  active boolean not null default true,
  created_at timestamptz default now()
);

-- One row per purchase attempt
create table pack_purchases (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references pack_products(id),
  email text not null,
  user_id uuid references auth.users(id),          -- nullable, guest checkout
  payfast_payment_id text,
  amount_cents integer not null,
  status text not null default 'pending'
    check (status in ('pending','paid','failed','refunded')),
  download_token uuid not null default gen_random_uuid(),
  download_count integer not null default 0,
  created_at timestamptz default now(),
  paid_at timestamptz
);
create index on pack_purchases (download_token);
create index on pack_purchases (email);

-- Files that belong to a product
create table pack_files (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references pack_products(id),
  storage_path text not null,            -- 'packs/matric-2026/en/maths-lit.pdf'
  title text not null,
  language text not null check (language in ('en','af')),
  sort_order integer not null default 0
);
```

RLS: enable on all three tables. No anon/public policies. All reads/writes go
through server-side API routes using the service role key. The download page
never queries Supabase from the client.

Storage: private bucket `pack-files`. Signed URLs generated server-side,
expiry 1 hour, only after token validation against a `paid` purchase.

---

## PAYFAST FLOW

1. `/pack` landing page → "Get the Pack — R199" → POST to `/api/pack/checkout`
2. Checkout route: create `pack_purchases` row (status `pending`), build PayFast
   form fields (m_payment_id = purchase id, amount = 199.00, item_name =
   'NexiStudy Matric Prelim Survival Pack', email_address, return_url =
   `/pack/success?token={download_token}`, cancel_url = `/pack?cancelled=1`,
   notify_url = `/api/pack/payfast-itn`), sign with existing signature helper,
   redirect to PayFast.
3. ITN webhook `/api/pack/payfast-itn`:
   - Validate signature + source per existing PayFast utility
   - Server-to-server validation call to PayFast
   - Verify amount_gross matches product price
   - Idempotent: if already `paid`, return 200 and stop
   - Mark purchase `paid`, set paid_at, store pf_payment_id
   - Trigger delivery email (link to `/pack/success?token=...`)
4. `/pack/success?token=...`: server component validates token → purchase is
   `paid` → renders download list with fresh signed URLs per file, EN and AF
   tabs. Also shows Nexi Tutor upsell block.
   Pending purchases show "payment processing — refresh in a minute."

Premium access: `/pack/premium` (or a "Your Survival Pack" card in the logged-in
dashboard) checks active Nexi Tutor subscription server-side and renders the
same download list. No purchase row needed.

---

## PDF RENDER PIPELINE

Source of truth for all documents: markdown files in the repo:

```
/content/pack/matric-2026/en/*.md
/content/pack/matric-2026/af/*.md
```

Build a script: `npm run pack:render`
- Renders each markdown file through ONE branded HTML template
  (NexiStudy colours, Nexi mascot on cover block, footer with
  nexistudy.co.za + "Prelims: 29 August"), then prints to A4 PDF
  via Puppeteer (or @react-pdf/renderer if Puppeteer is unavailable).
- Output to `/pack-dist/{lang}/{slug}.pdf`
- A second script `npm run pack:upload` pushes pack-dist to the
  `pack-files` bucket and upserts `pack_files` rows.
- Template must handle: tables, callout blocks (> quotes render as
  branded callouts), page breaks between H2 sections where marked
  with `<!-- pagebreak -->`.

Design bar is HIGH. The PDFs must look like a R500 product:
generous whitespace, strong typographic hierarchy, brand colour accents,
no default-Times-New-Roman energy. Build one sample first (maths-lit EN),
render it, STOP for Adriaan's visual sign-off before rendering the rest.

---

## CONTENT TEMPLATE (all 10 subject sheets follow this, no exceptions)

1. **The Paper at a Glance** — papers, duration, marks, sections (table)
2. **Where the Marks Live** — topic weighting table + "the play" paragraph
3. **The Easy Marks** — 4–5 giveaway categories
4. **The Killers** — top 3–5 marker-punished mistakes, blunt voice
5. **Your 7-Week Focus** — week-by-week, syncs with Countdown Planner,
   always includes a "Starting late?" line
6. **The Final 48 Hours** — DO / DON'T lists

Voice: punchy, direct-to-learner, second person. Sign-off line on every doc:
"Prelims: 29 August. Every mark is a decision." (AF: "Rekord: 29 Augustus.
Elke punt is 'n besluit." — Adriaan to confirm AF tagline.)

Every sheet carries ⚠ VERIFY flags on factual claims (paper structure,
weightings) until Adriaan confirms against DBE past papers/guidelines.
Flags are removed only by Adriaan, never by Claude Code.

Afrikaans versions are TRANSLATIONS of approved English masters — never
drafted independently. Adriaan does a native-speaker pass on all AF output.

---

## PAGES TO BUILD

- `/pack` — sales landing page. Hero: countdown to 29 Aug (reuse existing
  countdown widget component), pack contents visual, price anchor vs. one
  hour of tutoring (R250–R400), what's inside (10 sheets → show 3–4 spread
  mockups), parent-focused copy, single CTA. Bilingual toggle EN/AF.
- `/pack/success` — token-gated download page + Tutor upsell
- `/api/pack/checkout` — creates purchase, redirects to PayFast
- `/api/pack/payfast-itn` — ITN webhook
- `/api/pack/download` — signed URL generation (token-validated)
- Dashboard card for Premium users: "Your Survival Pack — included with Premium"
- Add pack link to site nav + a banner/strip on the homepage

---

## BUILD PHASES (one Claude Code session each; commit after each phase)

**Phase 1 — Commerce core:** migration SQL, storage bucket, checkout route,
ITN webhook (reusing existing PayFast utils), success page with token
validation + signed URLs, delivery email. Seed `pack_products` with the
matric product. Test with PayFast sandbox/R5 flow before anything else.

**Phase 2 — Render pipeline:** the HTML→PDF template + pack:render +
pack:upload scripts. Render maths-lit EN sample. STOP for design sign-off.

**Phase 3 — Sales page:** `/pack` landing page + homepage strip + nav link +
Premium dashboard card. Reuse countdown widget.

**Phase 4 — Content load:** all approved markdown files in, full render,
upload, pack_files rows, end-to-end purchase test on live PayFast (R5
override price for one test, then restore R199).

Never combine phases in one session. Never start Phase 4 before Adriaan
has approved all content and removed the ⚠ VERIFY flags.

---

## RULES FOR EVERY SESSION

1. Read this file fully before writing code.
2. Find and reuse existing patterns (PayFast utils, Supabase clients, UI
   components, countdown widget) before creating new ones.
3. Never expose service role key client-side. Never make the storage
   bucket public. Never skip ITN signature validation.
4. TypeScript strict. Tailwind for styling. Match existing code style.
5. At the end of each session, append a short "## BUILD LOG" entry to the
   bottom of this file: date, phase, what was done, what's next.

## BUILD LOG
(sessions append here)

### 2026-07-10 — Phase 1: Commerce core
**Done:**
- `supabase-pack-setup.sql` — pack_products / pack_purchases / pack_files tables
  (RLS on, no public policies), private `pack-files` storage bucket, matric
  product seeded at R199. NOTE: this app uses next-auth with `public.users`,
  so `pack_purchases.user_id` references `public.users(id)`, not `auth.users`.
- Extended `lib/payfast.ts` with `buildPackCheckout()` (once-off, no
  subscription block) + `itnAmountMatchesCents()` — existing Nexi Tutor
  signature/ITN helpers reused untouched.
- `lib/pack.ts` — server-only data layer (product lookup, pending purchase,
  token lookup, idempotent mark-paid, 1-hour signed URLs).
- `/api/pack/checkout` — guest checkout (email only; links user_id when logged
  in), price always read from the product row, returns `{processUrl, fields}`
  same as the Tutor checkout so Phase 3 can reuse the SubscribeButton pattern.
- `/api/pack/payfast-itn` — full validation pipeline copied from the proven
  notify route (IP → signature → purchase lookup → amount vs. row →
  server-confirm → idempotency), marks paid + triggers delivery email.
- `lib/packEmail.ts` — delivery email via Resend HTTP API (link to token page,
  never attachments). No-ops with a logged link until RESEND_API_KEY is set.
- `/pack/success` — token-gated server component: pending/failed/paid states,
  EN/AF tabbed downloads with fresh signed URLs, Tutor upsell block.
- `npx tsc --noEmit` clean; `npm run build` passes, all 3 new routes registered.

**Next (before Phase 2):**
1. Run `supabase-pack-setup.sql` in the Supabase dashboard SQL editor.
2. Add `RESEND_API_KEY` + `PACK_EMAIL_FROM` env vars (Vercel + .env.local).
3. Sandbox/R5 end-to-end test of the checkout → ITN → success-page flow.
4. Then Phase 2: PDF render pipeline, maths-lit EN sample, STOP for sign-off.

### 2026-07-11 — Phase 2: PDF render pipeline
**Done:**
- Verified the Phase-1 SQL ran: all 3 tables live, matric product seeded at
  R199, `pack-files` bucket private. (Adriaan ran it 2026-07-10/11.)
- `content/pack/matric-2026/en/maths-lit.md` — first sample sheet, follows
  the 6-section template, ⚠ VERIFY flags on all factual claims (paper
  structure, weightings, CA marks, formula sheet), sign-off line included.
- `scripts/pack-template.mjs` — the ONE branded template: full-bleed navy
  cover (mascot in cyan glow ring, gold kicker chip, Nunito 900 title) +
  white content pages (numbered section kickers, navy-header tables, gold
  badge ordered lists, warm callouts from blockquotes, navy sign-off banner,
  loud yellow ⚠ VERIFY badges). Per-page footer: brand • nexistudy.co.za •
  "Prelims: 29 August" • page numbers. AF strings staged in LANG map — AF
  tagline still needs Adriaan's confirmation.
- `scripts/pack-render.mjs` (`npm run pack:render [slug] [--lang en|af]`) —
  markdown → A4 PDF via puppeteer-core + SYSTEM Chrome (no browser
  download; falls back to Edge; CHROME_PATH overrides). Handles tables,
  `>` callouts, `<!-- pagebreak -->`. Cover and body rendered separately
  (full-bleed vs. footered) and merged with pdf-lib. Nunito embedded as
  data URIs from the `.next/dev` font cache — fully offline render (Google
  Fonts fetch hangs on this machine's TLS interception). NOTE: run render
  via Git Bash — Chrome won't launch from the sandboxed PowerShell here.
- `scripts/pack-upload.mjs` (`npm run pack:upload`) — pushes pack-dist to
  `pack-files` at `packs/matric-2026/{lang}/{slug}.pdf` + manual upsert of
  `pack_files` rows (title from front-matter `title — subtitle`, sort from
  `sort`). Built but NOT run — nothing uploads before sign-off.
- Rendered `pack-dist/en/maths-lit.pdf` (7 pages: cover + 6 sections,
  ~1.9 MB). pack-dist/ is gitignored. New dev deps: marked, puppeteer-core,
  pdf-lib.

**STOPPED for Adriaan's visual sign-off on the maths-lit sample, per spec.**

### 2026-07-11 (same day) — Sourced verification pass on maths-lit EN
Adriaan can't verify DBE facts from memory, so Claude Code researched every
⚠ VERIFY flag against primary sources (DBE Exam Guidelines 2021, EC Sept 2023
prelim paper, NSC marking guidelines). Full click-and-compare report:
`content/pack/matric-2026/VERIFICATION-maths-lit-en.md`. One real error found
and fixed: papers are split by TOPIC (P1 Finance 60%+Data 35%; P2 Measurement
55%+Maps 40%), NOT by difficulty — taxonomy is identical in both papers. Added
the Q1 ±30-mark Level-1 warm-up fact, the CA "stops at second error" limit,
softened the formula claim (know perimeter/area/volume cold). Flags stay in
the sheet until Adriaan checks the report's sources and removes them. This
verification-report pattern is the template for the other 9 sheets.

### 2026-07-11 (same day) — Phase 3: Sales page + entry points
**Done:**
- `components/PackBuyButton.tsx` — guest checkout (email only, no login;
  prefills from session), POSTs to `/api/pack/checkout`, hidden-form PayFast
  redirect (SubscribeButton pattern).
- `components/PackLanding.tsx` + `/pack` page — full bilingual sales page
  with client EN/AF toggle: countdown hero (ExamCountdown reused, given
  optional `labels` prop for localisation — defaults unchanged), what's-inside
  cards (planner = hero card), R199 vs R250–R400 tutoring-hour price anchor,
  parents block with Nexi, how-it-works, FAQ (incl. "prelims are provincial
  but follow the national format"), single CTA → #buy form.
  `?cancelled=1` shows a gentle notice. ⚠ AF copy is a first draft —
  Adriaan native-speaker pass needed before launch.
- `/pack/premium` — server-side subscription check (getSubscription), premium
  → same PackDownloads list via signed URLs, no purchase row; free → redirect
  to /pack.
- Dashboard: Survival Pack card under the countdown (premium → /pack/premium
  "included"; free → /pack). Navbar: "Survival Pack" link before Pricing.
  Homepage: gold strip between hero and stats → /pack.
- `tsc --noEmit` clean; `npm run build` passes (/pack, /pack/premium
  registered); smoke-tested against `next start` — desktop + mobile
  (390px, no horizontal overflow), routes 200.

**Next (Phase 4 prerequisites, all Adriaan):** sign off maths-lit design +
verification report; RESEND_API_KEY + PACK_EMAIL_FROM; push master (now
several commits ahead) → deploy; R5 end-to-end PayFast test on the live
site; confirm AF tagline + AF page copy. Then Phase 4: remaining content,
full render, pack:upload, live purchase test.

**Next:**
1. Adriaan reviews `pack-dist/en/maths-lit.pdf` (design + content + VERIFY
   flags against DBE docs).
2. Still outstanding from Phase 1: RESEND_API_KEY + PACK_EMAIL_FROM env
   vars; push commit 9194c9b (+ this one) so the R5 live test can run.
3. After sign-off: Phase 3 — /pack sales page, homepage strip, nav link,
   Premium dashboard card.

### 2026-07-11 — Maths Lit EN SIGNED OFF
Adriaan reviewed the PDF + verification report and supplied the verified
final wording (`matric-2026/maths-lit-strategy-sheet-EN-FINAL.md`, kept as
the approved source). Merged into `en/maths-lit.md` preserving the pipeline
format (front-matter, pagebreaks, callouts) — **all ⚠ VERIFY flags removed**.
Sign-off note added to the verification report. PDF re-rendered clean
(7pp, zero VERIFY badges). This sheet is now the approved English master
and the template for the other 9 sheets.

**Next:** the remaining Phase-4 gates are operational, not content:
RESEND_API_KEY + PACK_EMAIL_FROM; push master → deploy → R5 live PayFast
test; AF tagline + native-speaker pass. Content-wise Phase 4 (remaining
13 docs, one verification report each) is unblocked.

### 2026-07-11 (same day) — Maths Lit AF in + AF tagline CONFIRMED
Adriaan supplied the verified Afrikaans sheet
(`matric-2026/maths-lit-strategy-sheet-AF-FINAL.md`, kept as approved
source alongside the EN one). Merged into `af/maths-lit.md` in pipeline
format. His copy uses the tagline **"Rekord: 29 Augustus. Elke punt is
'n besluit."** verbatim — the AF tagline is hereby CONFIRMED (LANG map
already matched; stale "awaiting confirmation" comment removed).
Template localisation gap fixed while at it: section kickers
("Afdeling 01") and footer page numbers ("Bladsy X van Y") now come from
the LANG map instead of hard-coded English. Both languages re-rendered:
`pack-dist/en/maths-lit.pdf` + `pack-dist/af/maths-lit.pdf`.
Maths Lit is now DONE in both languages — first of the 10 subject sheets
complete end-to-end (draft → verify → sign-off → EN + AF render).

**Still outstanding:** AF native-speaker pass on the /pack SALES PAGE copy
(PackLanding.tsx) — the sheet pass doesn't cover it; Resend envs; push
master → deploy → R5 live PayFast test. Then Phase 4: remaining 12 docs.

### 2026-07-11 (same day) — R5 live test: staged, verified to PayFast, parked
Master pushed (deploy live), both maths-lit PDFs uploaded via pack:upload
(first real upload — success page has real downloads), price dropped to R5
via new `scripts/pack-set-price.mjs` (500 ↔ 19900). Full chain verified
from this machine: /pack 200 on both domains, checkout API signs correctly,
POST to PayFast accepted 3/3 (302 → payment.payfast.io engine).
**Two findings:** (1) Adriaan's browser on this machine can't POST to the
legacy www.payfast.co.za/eng/process endpoint (server error / hang) — the
machine's TLS interception is the prime suspect; a direct
payment.payfast.io session link worked fine. Real-buyer risk considered
low, but the retest should be done FROM A PHONE to confirm. (2) Vercel's
NEXT_PUBLIC_SITE_URL points at nexistudy.vercel.app, so PayFast returns
buyers to the vercel.app domain — works, but should be changed to
https://nexistudy.co.za before launch.
**Test parked (Adriaan's bank app offline — couldn't complete payment);
price RESTORED to R199.** To resume: `node scripts/pack-set-price.mjs 500`,
buy from phone, verify purchase row paid + downloads, restore 19900.

### 2026-07-11 (same day) — Phase 4 begins: Countdown Planner EN (the hero doc)
Adriaan supplied the planner content (`matric-2026/countdown-planner-EN.md`,
kept as approved source). Merged into `en/countdown-planner.md`: sort 1
(leads the pack, maths-lit is 2), one page per week via pagebreaks, weekly
mottos as callouts, H3s for the daily-rhythm/Sunday-ritual/tools blocks,
Gap Log + Master Gap Map combined under one "The Print Tools" section
(keeps the doc at 9 H2s — the template's numbered kicker renders "Section
0" + counter, so a 10th section would show "Section 010"; fix that before
any doc with 10+ sections). Print tables padded to usable row counts
(12-row Gap Log, 7-row Gap Map). No DBE factual claims in this doc → no
verification report needed (strategy/product voice, Adriaan-authored).
Rendered `pack-dist/en/countdown-planner.pdf`. NOT yet uploaded — awaiting
Adriaan's page-through of the PDF (empty print-table pages are new
territory for the template), then pack:upload + AF translation for his pass.

### 2026-07-11 (same day) — Countdown Planner APPROVED EN + AF in & uploaded
Adriaan approved the EN planner PDF ("perfect") and supplied his own AF
version (`matric-2026/countdown-planner-AF.md`, kept as approved source).
Merged to `af/countdown-planner.md`, same structure as EN (page-per-week,
motto callouts, print tools padded). AF terminology worth reusing across
the pack: Puntelog (Gap Log), Meester-Puntekaart (Master Gap Map),
Oudit-week, Afskaalweek (taper), ouer-inklok (parent check-in),
spookvakke (scariest subjects). Both languages rendered and UPLOADED via
pack:upload — the success page now serves 4 files (planner + maths-lit,
EN/AF). Note: planner pack_files title includes the full subtitle ("… ·
The one that goes on the fridge") — long but descriptive; trim subtitle
if it wraps badly in the download list.
**Phase 4 progress: 2 of 14 docs done both languages.** Next: subject
sheets (Maths, Physical Sciences, Life Sciences, Accounting, Business
Studies, Geography, History, English EN-only, Afrikaans AF-only) — each
needs draft → verification report → Adriaan sign-off → EN+AF; then APS
worksheet, Parents' Guide, WhatsApp scripts.

### 2026-07-11 (same day) — Parents' Guide EN in & uploaded
Adriaan supplied it (`matric-2026/parents-guide-EN.md`, kept as approved
source). Merged to `en/parents-guide.md`, sort 13 (pack order: planner 1,
subject sheets 2–11, APS 12, parents' guide 13, WhatsApp scripts 14).
7 sections, page each; callouts: the "stop asking have-you-studied" shift
+ "be the calm, not the extra storm"; H3s for the Sunday check-in shape
and what-NOT-to-say. No DBE claims → no verification report. Rendered +
UPLOADED (success page now 5 files). AF version awaited from Adriaan —
his own AF, not a translation draft. Cross-refs to WhatsApp Scripts bonus
("Sunday WhatsApp Scripts") — keep that doc's title consistent when built.

### 2026-07-11 (same day) — Parents' Guide AF in & uploaded
Adriaan supplied it (`matric-2026/parents-guide-AF.md`, approved source).
Merged to `af/parents-guide.md` mirroring the EN structure. Rendered +
uploaded — success page now 6 files (planner, maths-lit, parents' guide,
all EN+AF). Bonus doc's AF name per his copy: **"Sondag-WhatsApp-woorde"**
(EN: "Sunday WhatsApp Scripts") — use these titles when building it.
**Phase 4: 3 of 14 docs done in both languages.** Remaining: 9 subject
sheets (verify + sign-off each), APS worksheet, WhatsApp scripts.

### 2026-07-11 (same day) — WhatsApp Scripts EN + AF in & uploaded
Adriaan supplied both (`matric-2026/whatsapp-scripts-{EN,AF}.md`; his EN
was named `…EN_1.md` in en/ and AF was duplicated in af/ + root — sources
normalised to root, duplicate removed). Canonical files sort 14, structure:
3 H2 sections (How to Use / The Seven Sundays / Spare Scripts — "The Seven
Sundays" heading added; his doc had messages straight after the intro),
each message as a blockquote → renders as a gold callout box (the "copy
this" visual). Messages contain emoji — Chrome falls back to Segoe UI
Emoji in the PDF; check they aren't tofu in review. Rendered + UPLOADED.
**Phase 4: 4 of 14 docs done both languages — success page serves 8 files.
Both parents' guide cross-references now resolve to real docs.** Remaining:
9 subject sheets (verify + sign-off each) + APS worksheet.

### 2026-07-12 — R5 LIVE PAYFAST TEST PASSED ✅
Full loop verified on live PayFast: checkout → payment (pf 314088041) →
ITN signature/amount validation → purchase marked paid → token success
page → signed download URLs generated. Two failed attempts first: (1) an
earlier R5 paid against a purchase row that had been manually deleted in
Supabase mid-test (money at PayFast, refundable); (2) the /pack buy form
hangs at the browser POST to www.payfast.co.za/eng/process on Adriaan's
desktop AND phone-on-mobile-data, while scripted POSTs 302 instantly and
direct payment.payfast.io session links work every time — OPEN ISSUE,
debug next with headful Chrome watching the network tab. Delivery email
still unsent: RESEND_API_KEY was never set on Vercel (local only). Price
restored to R199. Also done today: account-page mailto → nexi@forgesystems
behind displayed support@nexistudy.co.za; Adriaan opened a NEW Resend
account — plan is to verify nexistudy.co.za on it (do NOT add
forgesystems.co.za there: DNS collision would break the old account that
BosworthQuote sends through).

### 2026-07-12 (same day) — Resend LIVE: delivery email verified
Adriaan's NEW Resend account has **nexistudy.co.za VERIFIED** (he did the
DNS himself) — account owner email nexi@forgesystems.co.za (mailbox exists,
so the account-page support mailto works). Sender:
**NexiStudy <pack@nexistudy.co.za>**. Real delivery email sent successfully
(Resend id 4e0f981f) with the paid purchase's token link. Local .env.local
updated (new key + PACK_EMAIL_FROM). No Resend hosted templates needed —
the branded HTML lives in lib/packEmail.ts. STILL REQUIRED on Vercel
(dashboard, Adriaan): RESEND_API_KEY (new key), PACK_EMAIL_FROM=
"NexiStudy <pack@nexistudy.co.za>", NEXT_PUBLIC_SITE_URL=
https://www.nexistudy.co.za → Redeploy. Until then production buyers get
no email (webhook logs the link instead).

### 2026-07-12 (same day) — Production email verified + delivery template restyled
Second R5 (pf paid 12:27) proved the FULL production pipeline hands-free:
payment → ITN → paid → Vercel-sent delivery email (envs live; return/notify
URLs now www.nexistudy.co.za). Email landed in SPAM with the old template →
rebuilt lib/packEmail.ts per Adriaan's spec, approved from rendered preview:
table-based inline-CSS-only layout, #f6f7fb page, navy header band with the
hosted logo (siteUrl()/images/nexi-logo-new.png, white-text alt fallback), gold #e8a13a rounded CTA "Download your pack", components listed
BY NAME (no counts), "link is yours" line kept, footer "Prelims: 29 August.
Every mark is a decision." + nexistudy.co.za. New exported renderPackEmail()
returns {subject, html, text} — plain-TEXT PART now sent alongside HTML
(major spam-score fix). EN-only: purchases don't record the AF toggle
(would need a language column + checkout change if ever wanted).
Deliverability TODO for Adriaan: add DMARC TXT record `_dmarc` =
"v=DMARC1; p=none;" on nexistudy.co.za DNS (none exists); mark first mail
"Not spam". Test send of new template: Resend id 6699b2f7. Price at R199.
STILL OPEN: /pack buy-form browser POST to PayFast hangs (direct session
links work) — headful-Chrome debug is the last payment-flow item.

### 2026-07-12 (same day) — Maths (pure) EN + AF in & uploaded
Adriaan supplied both as FINAL (`matric-2026/maths-strategy-sheet-
{EN,AF}-FINAL.md`, approved sources = his sign-off). DBE facts sanity-
checked against the Mathematics Exam Guidelines before merge — ALL match:
P1/P2 3h/150; P1 weights Functions 35, Calculus 35, Algebra 25, Patterns
25, Finance 15, Probability 15; P2 Trig 50, Analytical 40, Euclidean 40,
Stats 20; info sheet provided; 2-decimal rounding; prescribed theorem
proofs per guideline. Canonical `{en,af}/maths.md` at **sort 2** — subject
sheets now ordered Maths 2, Maths Lit 3 (maths-lit front-matter bumped
+ pack_files re-registered; PDFs unchanged). Consistency call: his AF
"Die Moordenaars" heading aligned to the pack-standard **"Die
Puntevreters"** (flagged to Adriaan). Both rendered + UPLOADED.
**Phase 4: 6 of 14 docs done — 12 files live. Remaining: 8 subject
sheets** (Physical Sciences, Life Sciences, Accounting, Business Studies,
Geography, History, English EN-only, Afrikaans AF-only).

### 2026-07-12 (same day) — Physical Sciences EN + AF in & uploaded
Adriaan supplied both as FINAL (`matric-2026/physical-sciences-{EN,AF}-
FINAL.md`). DBE facts sanity-checked against the Physical Sciences Exam
Guidelines — all match: P1 Physics/P2 Chemistry 3h/150 each; Q1 = 10 MCQ
20 marks both papers; P1 Mechanics 65 + E&M 55 + Waves 15 + Matter 15;
P2 Chemical change 92 + Matter & materials (organic/IMF) 58; info sheets
+ periodic table provided; no negative MCQ marking (guess > blank).
Canonical `{en,af}/physical-sciences.md` sort 4; AF "Die Moordenaars"
again aligned to pack-standard "Die Puntevreters". Rendered + UPLOADED.
**Phase 4: 7 of 14 docs done — 14 files live. Remaining: 7 sheets**
(Life Sciences, Accounting, Business Studies, Geography, History,
English EN-only, Afrikaans AF-only).

### 2026-07-12 (same day) — Accounting EN + AF in & uploaded
Adriaan supplied both as FINAL (`matric-2026/accounting-{EN,AF}-FINAL.md`).
Sanity check vs DBE Accounting Exam Guidelines: two-paper P1 Financial
Reporting / P2 Managerial 2h/150 each ✓, 30/40/30 easy-moderate-difficult
build ✓, compulsory questions + special answer book ✓. TWO FLAGS raised
to Adriaan (kept his wording pending his confirmation): (1) "Since 2021"
two-paper split — first two-paper NSC was likely 2020; (2) inventory
valuation listed under P1 territory — several guideline summaries put
inventory systems/valuation under P2. Canonical `{en,af}/accounting.md`
sort 6 (sort 5 reserved for Life Sciences); AF Moordenaars→Puntevreters
per pack standard. Rendered + UPLOADED.
**Phase 4: 8 of 14 docs done — 16 files live. Remaining: 6 sheets**
(Life Sciences, Business Studies, Geography, History, English EN-only,
Afrikaans AF-only).

### 2026-07-12 (same day) — Business Studies EN + AF in & uploaded
Adriaan supplied both as FINAL (`matric-2026/business-studies-{EN,AF}-
FINAL.md`). Sanity check vs DBE BusStud Exam Guidelines — all match: two
papers 2h/150 (P1 Environments+Operations, P2 Ventures+Roles), section
structure A 30 compulsory / B 2-of-3 ×40 / C 1-of-2 essay ×40, cognitive
split 30/50/20, the 8 Acts list standard. ONE FIX applied + flagged:
"two strong essays per paper" → "a strong essay in each paper" (Section C
is 1 essay per paper; his own "over a quarter" maths confirms the
intended meaning) — same fix in Killers #4 ("Two 40-mark essays" → "A
40-mark essay") and in AF. Canonical `{en,af}/business-studies.md` sort 7;
AF Moordenaars→Puntevreters. Rendered + UPLOADED.
**Phase 4: 9 of 14 docs done — 18 files live. Remaining: 5 sheets**
(Life Sciences [sort 5], Geography, History, English EN-only, Afrikaans
AF-only).

### 2026-07-12 — APS Target Worksheet EN + AF in & uploaded
Adriaan supplied both (`matric-2026/aps-worksheet-{EN,AF}.md`, approved
sources). Content sanity-checked before merge: 7-level table = standard
NSC achievement scale ✓; worked example arithmetic ✓ (best-6 excl LO = 31,
three boundary subjects close the 3-point gap to 34); university-variable
rules (LO counting, subject minimums) properly hedged in-copy → no
verification report needed. Canonical files sort 12. Formatting fix: his
consecutive `> **Field:** ___` fill-in lines would merge into one line
(marked gfm, breaks off) — separated with `>` blank lines so each renders
as its own paragraph inside the callout write-in box. References the free
APS Calculator at nexistudy.co.za/matric (live feature ✓). Rendered +
UPLOADED. **Phase 4: 5 of 14 docs done both languages — 10 files live.
All that remains: the 9 subject sheets** (verification report + sign-off
each; English sheet EN-only, Afrikaans sheet AF-only → 8 PDFs ×2 + 2 = 16
files to come, 26 total when complete).
