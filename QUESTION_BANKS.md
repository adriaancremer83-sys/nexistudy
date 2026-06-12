# Question Bank Tracker

Pipeline per bank: **drafted → linted → seeded → blind-verified → LIVE-OK**

Blind verification = in a fresh session, solve every question cold (prompt +
options only, no answer key) and diff against the stored `correct_index`.
Any mismatch: fix or discard. A bank is not announced/marketed until LIVE-OK.

| Subject | Grade | Topics | Questions | Status |
|---|---|---|---|---|
| Mathematics | 12 | 6 | 48 | seeded — needs blind-verify |
| Physical Sciences | 12 | — | — | next up |
| Life Sciences | 12 | — | — | queued |
| Mathematical Literacy | 12 | — | — | queued |
| Accounting | 12 | — | — | queued |
| Mathematics | 11 | — | — | queued (widens funnel) |

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
