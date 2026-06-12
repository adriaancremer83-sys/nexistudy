// Seeds the Grade 12 Economics question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only (definitions, classifications, calculations).
// Correct-answer positions spread evenly A-D per topic (engine shuffles question
// order but not option order, so clustering would leak the answer).
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade12-economics.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Economics";
const GRADE = "Grade 12";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Circular Flow & National Accounts": [
    [
      "The four factors of production are land, labour, capital and:",
      ["entrepreneurship", "money", "goods", "profit"],
      0,
      "The four factors of production are land, labour, capital and entrepreneurship.",
    ],
    [
      "In the circular flow, the payment (reward) for the use of labour is:",
      ["rent", "wages", "interest", "profit"],
      1,
      "Labour earns wages. (Land earns rent, capital earns interest and entrepreneurship earns profit.)",
    ],
    [
      "Which of the following is an injection into the circular flow of income?",
      ["savings", "taxes", "investment", "imports"],
      2,
      "Injections add money to the flow: investment, government spending and exports. Savings, taxes and imports are leakages.",
    ],
    [
      "Which of the following is a leakage (withdrawal) from the circular flow?",
      ["exports", "government spending", "investment", "imports"],
      3,
      "Imports are a leakage because money flows out to other countries. Exports, government spending and investment are injections.",
    ],
    [
      "GDP stands for Gross Domestic:",
      ["Product", "Profit", "Price", "Provision"],
      0,
      "GDP stands for Gross Domestic Product — the total value of all final goods and services produced within a country's borders.",
    ],
    [
      "Which method measures national income by adding consumption, investment, government spending and net exports?",
      ["the income method", "the expenditure method", "the production method", "the multiplier method"],
      1,
      "The expenditure method adds C + I + G + (X − M) — spending by households, firms, government and the foreign sector.",
    ],
    [
      "If the marginal propensity to consume (MPC) is 0.8, the multiplier is:",
      ["2", "4", "5", "8"],
      2,
      "Multiplier = 1 ÷ (1 − MPC) = 1 ÷ (1 − 0.8) = 1 ÷ 0.2 = 5.",
    ],
    [
      "GDP measured at the prices actually paid, without removing the effect of inflation, is called ___ GDP.",
      ["real", "potential", "per capita", "nominal"],
      3,
      "Nominal GDP is measured at current prices. Real GDP adjusts for inflation so that only changes in actual output are shown.",
    ],
  ],
  "Business Cycles": [
    [
      "A business cycle describes the ___ in economic activity over time.",
      [
        "upward and downward movements (fluctuations)",
        "constant unchanging level",
        "permanent decline",
        "fixed rate of growth",
      ],
      0,
      "A business cycle is the recurring upward and downward movements (fluctuations) in economic activity over time.",
    ],
    [
      "The phase of the business cycle where economic activity reaches its highest point is the:",
      ["trough", "peak (boom)", "recession", "recovery"],
      1,
      "The peak (boom) is the highest point of the cycle, just before activity begins to decline.",
    ],
    [
      "The lowest point of a business cycle is called the:",
      ["peak", "expansion", "trough", "boom"],
      2,
      "The trough is the lowest point of the business cycle, just before recovery begins.",
    ],
    [
      "A period of declining activity, often defined as two consecutive quarters of negative GDP growth, is a:",
      ["boom", "expansion", "peak", "recession"],
      3,
      "A recession is a period of falling economic activity, commonly defined as two successive quarters of negative GDP growth.",
    ],
    [
      "Economic indicators that change BEFORE the economy as a whole and help predict turning points are called:",
      ["leading indicators", "lagging indicators", "coincident indicators", "random indicators"],
      0,
      "Leading indicators (such as building plans passed) change ahead of the economy and help forecast its direction.",
    ],
    [
      "Indicators that change AFTER the overall economy has already changed are called:",
      ["leading indicators", "lagging indicators", "coincident indicators", "early indicators"],
      1,
      "Lagging indicators (such as the unemployment rate) change after the economy has already turned.",
    ],
    [
      "The time from one peak to the next peak is known as the ___ of the business cycle.",
      ["amplitude", "trend", "length (period)", "extrapolation"],
      2,
      "The length (period) of a cycle is the time between two successive peaks (or two successive troughs).",
    ],
    [
      "The general long-term direction of the business cycle is shown by the:",
      ["peak", "trough", "amplitude", "trend line"],
      3,
      "The trend line shows the general long-term direction (upward, downward or horizontal) around which the cycle fluctuates.",
    ],
  ],
  "Public Sector & Fiscal Policy": [
    [
      "Fiscal policy, which uses government spending and taxation, is controlled by the:",
      [
        "government (Minister of Finance / Treasury)",
        "South African Reserve Bank",
        "commercial banks",
        "Johannesburg Stock Exchange",
      ],
      0,
      "Fiscal policy is set by the government through the Minister of Finance and National Treasury, using spending and taxation.",
    ],
    [
      "The document in which the government sets out its planned spending and revenue for the year is the:",
      ["balance of payments", "national Budget", "business cycle", "exchange rate"],
      1,
      "The national Budget sets out the government's planned revenue (mainly taxes) and expenditure for the year.",
    ],
    [
      "A tax whose rate increases as income increases, so higher earners pay a higher percentage, is a ___ tax.",
      ["regressive", "proportional", "progressive", "indirect"],
      2,
      "A progressive tax takes a higher percentage from higher incomes — South Africa's personal income tax works this way.",
    ],
    [
      "VAT (Value-Added Tax) is an example of a(n) ___ tax.",
      ["direct", "progressive", "wealth", "indirect"],
      3,
      "VAT is an indirect tax — it is levied on spending and collected via sellers, not charged directly on a person's income.",
    ],
    [
      "When the government spends more than it collects in revenue, the result is a budget:",
      ["deficit", "surplus", "balance", "multiplier"],
      0,
      "A budget deficit occurs when government expenditure exceeds its revenue for the period.",
    ],
    [
      "The main source of government revenue is:",
      ["loans only", "taxes", "donations", "printing money"],
      1,
      "Taxes (income tax, VAT, company tax and others) are the government's main source of revenue.",
    ],
    [
      "Personal income tax, paid directly by individuals on their earnings, is an example of a ___ tax.",
      ["indirect", "value-added", "direct", "customs"],
      2,
      "Personal income tax is a direct tax because it is levied directly on a person's income.",
    ],
    [
      "Expansionary fiscal policy, used to stimulate the economy, typically involves:",
      [
        "raising taxes and cutting spending",
        "doing nothing at all",
        "reducing all government services",
        "increasing government spending and/or cutting taxes",
      ],
      3,
      "Expansionary fiscal policy boosts demand by increasing government spending and/or cutting taxes.",
    ],
  ],
  "Money, Banking & Inflation": [
    [
      "The central bank of South Africa, responsible for monetary policy, is the:",
      [
        "South African Reserve Bank (SARB)",
        "Standard Bank",
        "Johannesburg Stock Exchange",
        "National Treasury",
      ],
      0,
      "The South African Reserve Bank (SARB) is the central bank and is responsible for monetary policy.",
    ],
    [
      "The interest rate at which the Reserve Bank lends to commercial banks is the:",
      ["exchange rate", "repo rate", "inflation rate", "tax rate"],
      1,
      "The repo (repurchase) rate is the rate at which the Reserve Bank lends to commercial banks; it is the main tool of monetary policy.",
    ],
    [
      "A sustained general increase in the price level over time is called:",
      ["deflation", "depreciation", "inflation", "devaluation"],
      2,
      "Inflation is a sustained general rise in the price level, which reduces the purchasing power of money.",
    ],
    [
      "Inflation caused by rising production costs, such as higher wages or oil prices, is called ___ inflation.",
      ["demand-pull", "hyper", "creeping", "cost-push"],
      3,
      "Cost-push inflation occurs when higher production costs (wages, raw materials, fuel) push prices up.",
    ],
    [
      "Inflation caused by total demand in the economy exceeding total supply is ___ inflation.",
      ["demand-pull", "cost-push", "imported", "structural"],
      0,
      "Demand-pull inflation happens when aggregate demand grows faster than aggregate supply, pulling prices up.",
    ],
    [
      "The measure most commonly used to calculate inflation, based on a basket of consumer goods, is the:",
      ["JSE All Share Index", "Consumer Price Index (CPI)", "exchange rate", "prime rate"],
      1,
      "The Consumer Price Index (CPI) tracks the price of a representative basket of consumer goods and services and is used to measure inflation.",
    ],
    [
      "To bring down high inflation, the Reserve Bank would typically:",
      ["lower interest rates", "keep rates unchanged", "raise (increase) interest rates", "abolish interest rates"],
      2,
      "Raising interest rates makes borrowing more expensive, reduces spending and helps bring inflation down.",
    ],
    [
      "Which of the following is a function of money?",
      ["a cause of inflation", "a type of tax", "a factor of production", "a medium of exchange"],
      3,
      "Money serves as a medium of exchange (as well as a store of value and a unit of account).",
    ],
  ],
  "International Trade & Exchange Rates": [
    [
      "A record of all transactions between one country and the rest of the world is the:",
      ["balance of payments", "national budget", "business cycle", "circular flow"],
      0,
      "The balance of payments records all economic transactions between a country and the rest of the world over a period.",
    ],
    [
      "Under a floating system, when the value of the rand falls relative to other currencies, the rand has:",
      ["appreciated", "depreciated", "been revalued", "been fixed"],
      1,
      "A fall in a currency's value under floating exchange rates is called depreciation.",
    ],
    [
      "Taxes placed on imported goods to make them dearer and protect local industries are called:",
      ["subsidies", "exports", "tariffs (customs duties)", "quotas"],
      2,
      "Tariffs (customs duties) are taxes on imports that raise their price and protect local producers.",
    ],
    [
      "A physical limit on the quantity of a good that may be imported is a:",
      ["tariff", "subsidy", "free-trade zone", "quota"],
      3,
      "A quota sets a maximum quantity of a good that may be imported, restricting supply to protect local industry.",
    ],
    [
      "The policy of protecting local industries from foreign competition is called:",
      ["protectionism", "free trade", "globalisation", "privatisation"],
      0,
      "Protectionism uses tools such as tariffs, quotas and subsidies to shield local industries from foreign competition.",
    ],
    [
      "If South Africa exports more goods than it imports, its trade balance shows a:",
      ["deficit", "surplus", "depreciation", "tariff"],
      1,
      "A trade surplus occurs when the value of exports exceeds the value of imports.",
    ],
    [
      "A weaker (depreciated) rand generally makes South African exports:",
      [
        "more expensive for foreigners",
        "illegal to sell",
        "cheaper and more competitive for foreigners",
        "unavailable abroad",
      ],
      2,
      "When the rand weakens, South African goods become cheaper in foreign currency, making exports more competitive.",
    ],
    [
      "An advantage of international (free) trade is that countries can:",
      [
        "produce everything themselves",
        "avoid all competition",
        "stop specialising",
        "specialise and benefit from comparative advantage",
      ],
      3,
      "Free trade lets countries specialise in what they produce most efficiently (comparative advantage) and trade for the rest.",
    ],
  ],
  "Market Structures (Microeconomics)": [
    [
      "A market with many small sellers, an identical (homogeneous) product and free entry is:",
      ["perfect competition", "monopoly", "oligopoly", "monopolistic competition"],
      0,
      "Perfect competition has many small sellers, a homogeneous product, free entry and exit, and perfect information.",
    ],
    [
      "A market with only ONE seller and no close substitutes is a:",
      ["perfect market", "monopoly", "oligopoly", "duopoly"],
      1,
      "A monopoly has a single seller of a product with no close substitutes and high barriers to entry.",
    ],
    [
      "A market dominated by a FEW large sellers is a(n):",
      ["perfect competition", "monopolistic competition", "oligopoly", "monopoly"],
      2,
      "An oligopoly is dominated by a few large firms whose decisions strongly affect one another.",
    ],
    [
      "In perfect competition, an individual firm is a ___ because it cannot influence the market price.",
      ["price maker", "monopolist", "central bank", "price taker"],
      3,
      "In perfect competition the firm is a price taker: it must accept the market price because it is too small to influence it.",
    ],
    [
      "Eskom, as effectively the sole supplier of electricity, is an example of a:",
      ["monopoly", "perfect market", "oligopoly", "free market"],
      0,
      "A single dominant supplier with no close substitute, such as Eskom for electricity, is a monopoly.",
    ],
    [
      "A situation where the market fails to allocate resources efficiently, such as pollution or public goods, is called:",
      ["perfect competition", "market failure", "free trade", "a budget surplus"],
      1,
      "Market failure is when the free market does not allocate resources efficiently, for example because of externalities like pollution.",
    ],
    [
      "A firm maximises profit at the level of output where marginal cost equals:",
      ["total cost", "fixed cost", "marginal revenue", "average cost"],
      2,
      "Profit is maximised where marginal cost (MC) equals marginal revenue (MR).",
    ],
    [
      "A market with many sellers offering slightly DIFFERENTIATED products, such as restaurants or hairdressers, is:",
      ["perfect competition", "monopoly", "oligopoly", "monopolistic competition"],
      3,
      "Monopolistic competition has many sellers offering similar but differentiated products, giving each a little control over price.",
    ],
  ],
};

// Upsert topics in display order
const topicNames = Object.keys(bank);
const { data: topics, error: topicError } = await supabase
  .from("topics")
  .upsert(
    topicNames.map((name, i) => ({ subject: SUBJECT, grade: GRADE, name, sort_order: i })),
    { onConflict: "subject,grade,name" }
  )
  .select();

if (topicError) {
  console.error("FAIL upserting topics:", topicError.message);
  process.exit(1);
}
console.log(`topics ready: ${topics.length}`);

const idByName = new Map(topics.map((t) => [t.name, t.id]));
let inserted = 0;
for (const [name, questions] of Object.entries(bank)) {
  const topicId = idByName.get(name);
  await supabase.from("questions").delete().eq("topic_id", topicId);
  const rows = questions.map(([prompt, options, correctIndex, explanation]) => ({
    topic_id: topicId,
    prompt,
    options,
    correct_index: correctIndex,
    explanation,
  }));
  const { error } = await supabase.from("questions").insert(rows);
  if (error) {
    console.error(`FAIL inserting "${name}":`, error.message);
    process.exit(1);
  }
  inserted += rows.length;
  console.log(`  ${name}: ${rows.length} questions`);
}
console.log(`done: ${inserted} questions in the bank`);
