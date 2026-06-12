# Question Bank Tracker

Pipeline per bank: **drafted → linted → seeded → blind-verified → LIVE-OK**

Blind verification = in a fresh session, solve every question cold (prompt +
options only, no answer key) and diff against the stored `correct_index`.
Any mismatch: fix or discard. A bank is not announced/marketed until LIVE-OK.

| Subject | Grade | Topics | Questions | Status |
|---|---|---|---|---|
| Mathematics | 12 | 6 | 48 | **LIVE-OK** ✓ (verified 2026-06-12, 48/48 computational re-solve) |
| Physical Sciences | 12 | 6 | 48 | **LIVE-OK** ✓ (verified 2026-06-12, 48/48) |
| Life Sciences | 12 | 6 | 48 | **LIVE-OK** ✓ (verified 2026-06-12, 48/48 blind re-solve) |
| Mathematical Literacy | 12 | 6 | 48 | **LIVE-OK** ✓ (verified 2026-06-12, 48/48 fresh-context subagent solve) |
| Accounting | 12 | 6 | 48 | **LIVE-OK** ✓ (verified 2026-06-12, 48/48 fresh-context subagent solve) |
| Mathematics | 11 | 6 | 48 | **LIVE-OK** ✓ (verified 2026-06-12, 48/48 fresh-context subagent solve) |
| Geography | 12 | 6 | 48 | **LIVE-OK** ✓ (verified 2026-06-12, 48/48 fresh-context subagent solve) |
| Business Studies | 12 | 6 | 48 | **LIVE-OK** ✓ (verified 2026-06-12, 48/48 fresh-context subagent solve) |
| Economics | 12 | 6 | 48 | **LIVE-OK** ✓ (verified 2026-06-12, 48/48 fresh-context subagent solve) |
| Tourism | 12 | 6 | 48 | **LIVE-OK** ✓ (verified 2026-06-12, 48/48 fresh-context subagent solve) |
| Physical Sciences | 11 | 6 | 48 | **LIVE-OK** ✓ (verified 2026-06-12, 48/48 fresh-context subagent solve) |
| Life Sciences | 11 | 6 | 48 | **LIVE-OK** ✓ (verified 2026-06-12, 48/48 fresh-context subagent solve) |

## Report-a-question safety net (built 2026-06-12)
`supabase-reports-setup.sql` adds `questions.flagged` + `question_reports` table.
`getQuizQuestions` filters `flagged=false`; learners flag via results-page button
→ `POST /api/practice/report` hides the question instantly until reviewed.
**To review reports:** query `question_reports where resolved=false`, fix the
question via its seed script, then set `flagged=false` + `resolved=true`.

## Session rhythm
1. Start of session: blind-verify the previous session's bank (script:
   `scripts/blind-verify.mjs` exports prompts+options only; answers compared after).
2. Draft the next subject's bank anchored to CAPS guidelines + past papers
   (see /past-papers — memos are the marking truth).
3. Lint (`scripts/lint-bank.mjs`): one correct option, no dupes, explanation
   names the keyed answer.
4. Seed + verify live, update this table, commit.

## Rules
- Only objectively-checkable questions (calculations, CAPS definitions,
  formula application). No ambiguous/interpretive questions.
- Numeric answers double-checked by computation during drafting.
- Free tier: question banks cost nothing to serve (no AI at quiz time).
- Public announcement gate: every seeded bank must be LIVE-OK first.
- Blind filenames are slugged by subject **and** grade (fixed 2026-06-12), so
  same-subject banks across grades (e.g. Maths Gr11 vs Gr12) don't overwrite
  each other's exports.
