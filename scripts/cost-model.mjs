// NexiStudy cost & break-even model.
// Plug in your assumptions and see monthly API + infra cost and break-even.
// Run: node scripts/cost-model.mjs
// Edit the SCENARIO block, or pass overrides:
//   node scripts/cost-model.mjs users=10000 activePct=20 chatsPerActiveDay=2 model=haiku cached=true
//
// Claude API prices per million tokens (June 2026, claude-api skill):
//   model        input  output  cacheWrite(5min)  cacheRead
//   haiku  4.5     1       5         1.25            0.10
//   sonnet 4.6     3      15         3.75            0.30
//   opus   4.8     5      25         6.25            0.50

const PRICES = {
  haiku:  { in: 1, out: 5,  cw: 1.25, cr: 0.10 },
  sonnet: { in: 3, out: 15, cw: 3.75, cr: 0.30 },
  opus:   { in: 5, out: 25, cw: 6.25, cr: 0.50 },
};

const USD_TO_ZAR = 18.7; // approximate June 2026 rate — edit if it moves

// ── SCENARIO (edit these, or override on the command line) ──
const SCENARIO = {
  users: 10000,             // total registered users
  activePct: 20,            // % who actually use the tutor on a given day
  chatsPerActiveDay: 2,     // tutor "chats" (multi-turn sessions) per active user/day
  model: "haiku",           // haiku | sonnet | opus — which model serves chats
  cached: true,             // prompt caching on the re-sent history?

  // Shape of one multi-turn chat session (a chat = several back-and-forth turns).
  turnsPerChat: 6,          // back-and-forth turns in one chat
  systemTokens: 1500,       // system prompt + instructions (cacheable)
  historyGrowthPerTurn: 350,// tokens of conversation added per turn
  outputTokensPerTurn: 220, // model reply length per turn

  premiumSubscribers: 100,  // paying users
  premiumPriceZar: 199,     // R/month

  vercelZar: 370,           // Vercel Pro ~$20 — needed for commercial use at scale
  supabaseZar: 460,         // Supabase Pro ~$25 — needed past free-tier limits
};

// Apply command-line overrides (key=value)
for (const arg of process.argv.slice(2)) {
  const [k, v] = arg.split("=");
  if (k in SCENARIO) SCENARIO[k] = v === "true" ? true : v === "false" ? false : isNaN(+v) ? v : +v;
}

const s = SCENARIO;
const p = PRICES[s.model];
if (!p) { console.error(`unknown model "${s.model}" — use haiku|sonnet|opus`); process.exit(1); }

// ── Cost of a single chat session ──
// Each turn re-sends system + accumulated history (input), produces a reply (output).
// With caching, the stable prefix (system + prior history) is read at 0.1x after
// being written once; only the newest user text is full-price input.
let inFull = 0, inCacheWrite = 0, inCacheRead = 0, out = 0;
let history = 0;
for (let turn = 0; turn < s.turnsPerChat; turn++) {
  const prefix = s.systemTokens + history; // re-sent each turn
  const newInput = s.historyGrowthPerTurn; // this turn's fresh user text
  if (s.cached) {
    if (turn === 0) inCacheWrite += s.systemTokens; // write system once
    else inCacheRead += prefix;                      // read the cached prefix
    inFull += newInput;
  } else {
    inFull += prefix + newInput;
  }
  out += s.outputTokensPerTurn;
  history += s.historyGrowthPerTurn + s.outputTokensPerTurn;
}
const costPerChatUsd =
  (inFull * p.in + inCacheWrite * p.cw + inCacheRead * p.cr + out * p.out) / 1_000_000;
const costPerChatZar = costPerChatUsd * USD_TO_ZAR;

// ── Monthly totals ──
const activeUsers = s.users * (s.activePct / 100);
const chatsPerMonth = activeUsers * s.chatsPerActiveDay * 30;
const apiZar = chatsPerMonth * costPerChatZar;
const infraZar = s.vercelZar + s.supabaseZar;
const totalCostZar = apiZar + infraZar;

const revenueZar = s.premiumSubscribers * s.premiumPriceZar;
const netZar = revenueZar - totalCostZar;
const breakEvenSubs = Math.ceil(totalCostZar / s.premiumPriceZar);

const r = (n) => "R" + n.toLocaleString("en-ZA", { maximumFractionDigits: 0 });
console.log(`
NexiStudy cost model — ${s.users.toLocaleString()} users, ${s.model} ${s.cached ? "(cached)" : "(no cache)"}
${"─".repeat(58)}
Cost per tutor chat:        R${costPerChatZar.toFixed(3)}   (${(costPerChatUsd * 100).toFixed(3)}c USD)
Active users/day:           ${activeUsers.toLocaleString()}  (${s.activePct}% of ${s.users.toLocaleString()})
Tutor chats/month:          ${chatsPerMonth.toLocaleString()}
${"─".repeat(58)}
API cost / month:           ${r(apiZar)}
Infra (Vercel+Supabase):    ${r(infraZar)}
TOTAL COST / month:         ${r(totalCostZar)}
${"─".repeat(58)}
Revenue (${s.premiumSubscribers} × R${s.premiumPriceZar}):       ${r(revenueZar)}
NET / month:                ${netZar >= 0 ? "+" : ""}${r(netZar)}
Break-even premium subs:    ${breakEvenSubs}  (${(breakEvenSubs / s.users * 100).toFixed(1)}% of users)
${"─".repeat(58)}
Note: quizzes + past papers cost R0 (no API). Only tutor chats cost money.
Lever check: re-run with cached=false to see the caching saving.
`);
