// Seeds the Grade 11 Economics question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only (definitions, classifications, SA
// institutions/facts). DISTINCT from the Gr12 Economics bank: Gr11-level
// framing and examples across circular flow, demand/supply, business cycles,
// money & banking, the public sector, and growth/development indicators.
// Correct-answer positions are spread evenly A-D per topic because the quiz
// engine shuffles question order, not option order. Safe to re-run.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade11-economics.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Economics";
const GRADE = "Grade 11";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Circular Flow & Economic Participants": [
    [
      "In the circular flow model, the participants that own the factors of production and supply labour are the:",
      ["households", "foreign sector", "government", "banks"],
      0,
      "Households own the factors of production (land, labour, capital and entrepreneurship) and supply them — especially labour — to firms in exchange for income.",
    ],
    [
      "Firms (businesses) in the circular flow are the participants that:",
      ["only save money", "produce goods and services using the factors of production", "collect taxes", "import all goods"],
      1,
      "Firms combine the factors of production to produce goods and services, which they sell in the goods market.",
    ],
    [
      "Which participant in the circular flow collects taxes and provides public goods and services?",
      ["households", "the foreign sector", "the government (public sector)", "commercial banks"],
      2,
      "The government (public sector) collects taxes and uses the revenue to provide public goods and services such as roads, schools and healthcare.",
    ],
    [
      "The participant that represents trade (imports and exports) with other countries is the:",
      ["households", "firms", "government", "foreign sector"],
      3,
      "The foreign sector represents economic transactions — imports and exports — between a country and the rest of the world.",
    ],
    [
      "In the circular flow, the payments made by households to firms in exchange for goods and services are called:",
      ["consumption expenditure", "wages", "taxes", "exports"],
      0,
      "Consumption expenditure (C) is the spending by households on the goods and services they buy from firms.",
    ],
    [
      "The income households earn by supplying their labour to firms is called:",
      ["profit", "wages (salaries)", "rent", "interest"],
      1,
      "Wages or salaries are the income households earn in return for supplying their labour to firms.",
    ],
    [
      "'Leakages' (withdrawals) from the circular flow include:",
      ["consumption spending", "exports", "savings, taxes and imports", "household income"],
      2,
      "Leakages are money that leaves the circular flow: savings, taxes and imports. Injections (investment, government spending and exports) add money back.",
    ],
    [
      "Money that flows back into the circular flow, such as investment, government spending and exports, is called:",
      ["leakages", "savings", "taxes", "injections"],
      3,
      "Injections add money into the circular flow: investment (I), government spending (G) and exports (X).",
    ],
  ],
  "Demand, Supply & Price Determination": [
    [
      "The law of demand states that, all else being equal, as the price of a good rises, the quantity demanded:",
      ["falls (decreases)", "rises", "stays the same", "doubles"],
      0,
      "The law of demand states that, ceteris paribus, as price increases the quantity demanded decreases (and vice versa) — an inverse relationship.",
    ],
    [
      "The law of supply states that, all else being equal, as the price of a good rises, the quantity supplied:",
      ["falls", "rises (increases)", "stays the same", "becomes zero"],
      1,
      "The law of supply states that, ceteris paribus, as price increases the quantity supplied increases, because higher prices make production more profitable.",
    ],
    [
      "The price at which the quantity demanded equals the quantity supplied is called the:",
      ["maximum price", "minimum price", "equilibrium price", "cost price"],
      2,
      "At the equilibrium price the quantity demanded equals the quantity supplied, so there is neither a surplus nor a shortage.",
    ],
    [
      "If the price of a product is set ABOVE the equilibrium price, the result will be a:",
      ["shortage", "rise in demand", "exact equilibrium", "surplus (excess supply)"],
      3,
      "A price above equilibrium means the quantity supplied exceeds the quantity demanded, creating a surplus (excess supply).",
    ],
    [
      "On a graph, the demand curve normally slopes:",
      ["downward from left to right", "upward from left to right", "horizontally", "vertically"],
      0,
      "The demand curve slopes downward from left to right, showing that more is demanded at lower prices — the inverse price–quantity relationship.",
    ],
    [
      "The supply curve normally slopes:",
      ["downward from left to right", "upward from left to right", "horizontally", "in a circle"],
      1,
      "The supply curve slopes upward from left to right, showing that more is supplied at higher prices.",
    ],
    [
      "If a product becomes very fashionable and popular, its demand curve will:",
      ["shift to the left", "disappear", "shift to the right (demand increases)", "become vertical"],
      2,
      "An increase in demand — for example from a product becoming fashionable — shifts the entire demand curve to the right.",
    ],
    [
      "A price set BELOW the equilibrium price will cause a:",
      ["surplus", "rise in supply", "no change at all", "shortage (excess demand)"],
      3,
      "A price below equilibrium means the quantity demanded exceeds the quantity supplied, creating a shortage (excess demand).",
    ],
  ],
  "Business Cycles": [
    [
      "A business cycle refers to:",
      [
        "the wavelike ups and downs in overall economic activity over time",
        "the daily opening and closing of shops",
        "the life cycle of a single product",
        "the working hours of one factory",
      ],
      0,
      "A business cycle is the recurring pattern of upswings and downswings (expansion and contraction) in overall economic activity over a period of time.",
    ],
    [
      "The phase of the business cycle in which economic activity is at its highest point is called the:",
      ["trough", "peak (boom)", "recession", "recovery"],
      1,
      "The peak (boom) is the highest point of the business cycle, where economic activity, output and employment are at their maximum.",
    ],
    [
      "A period of declining economic activity, often defined as two consecutive quarters of negative economic growth, is a:",
      ["boom", "peak", "recession", "recovery"],
      2,
      "A recession is a period of falling economic activity, commonly defined as two consecutive quarters of negative growth in real GDP.",
    ],
    [
      "The lowest point of a business cycle, where economic activity is at its weakest, is the:",
      ["peak", "boom", "expansion", "trough"],
      3,
      "The trough is the lowest point of the business cycle, where economic activity, output and employment are at their lowest.",
    ],
    [
      "During an upswing (recovery) phase of the business cycle, you would generally expect:",
      [
        "rising production and falling unemployment",
        "rising unemployment and falling production",
        "no change at all",
        "factories closing down everywhere",
      ],
      0,
      "During a recovery/upswing, production, investment and consumer spending rise and unemployment tends to fall.",
    ],
    [
      "Economic indicators that change BEFORE the overall economy and help to predict future activity are called:",
      ["lagging indicators", "leading indicators", "coincident indicators", "price indicators"],
      1,
      "Leading indicators (for example share prices and building plans passed) change before the overall economy, helping to forecast the next phase.",
    ],
    [
      "Economic indicators that change at roughly the same time as the overall economy are called:",
      ["leading indicators", "lagging indicators", "coincident indicators", "random indicators"],
      2,
      "Coincident indicators (for example GDP and employment) move at about the same time as the overall economy, showing its current state.",
    ],
    [
      "Government policies used to smooth out the business cycle and stabilise the economy include monetary policy and:",
      ["the business cycle itself", "the weather", "consumer fashion", "fiscal policy"],
      3,
      "Fiscal policy (government taxation and spending) and monetary policy (interest rates and the money supply) are used to moderate the business cycle and stabilise the economy.",
    ],
  ],
  "Money & Banking": [
    [
      "Which of the following is a function of money?",
      ["it serves as a medium of exchange", "it causes inflation", "it removes the need for production", "it guarantees a profit"],
      0,
      "Money functions as a medium of exchange (as well as a store of value, a unit of account and a standard of deferred payment).",
    ],
    [
      "The central bank of South Africa, which issues banknotes and controls monetary policy, is the:",
      ["Standard Bank", "South African Reserve Bank (SARB)", "Capitec Bank", "the JSE"],
      1,
      "The South African Reserve Bank (SARB) is the country's central bank; it issues currency and is responsible for monetary policy.",
    ],
    [
      "The interest rate at which the SARB lends money to commercial banks is called the:",
      ["prime rate", "exchange rate", "repo rate", "inflation rate"],
      2,
      "The repo (repurchase) rate is the rate at which the Reserve Bank lends to commercial banks; changing it influences interest rates throughout the economy.",
    ],
    [
      "The main aim of the South African Reserve Bank's monetary policy is to:",
      [
        "maximise its own profit",
        "set school fees",
        "build roads and bridges",
        "protect the value of the currency by keeping inflation low and stable",
      ],
      3,
      "The SARB's primary mandate is to protect the value of the rand by keeping inflation low and stable, using an inflation-targeting framework.",
    ],
    [
      "'Barter' is a system of trade in which:",
      [
        "goods and services are exchanged directly for other goods and services, without money",
        "only coins may be used",
        "only banks are allowed to trade",
        "prices are never allowed to change",
      ],
      0,
      "Barter is the direct exchange of goods and services for other goods and services, without using money as a medium of exchange.",
    ],
    [
      "When commercial banks accept deposits and grant loans, they are acting as:",
      ["a central bank", "financial intermediaries", "the government", "the foreign sector"],
      1,
      "Commercial banks act as financial intermediaries — they channel funds from savers (depositors) to borrowers.",
    ],
    [
      "If the SARB increases the repo rate, the cost of borrowing for consumers will generally:",
      ["fall", "stay exactly the same", "increase", "become zero"],
      2,
      "A higher repo rate raises banks' cost of funds, so they charge higher interest on loans, which tends to reduce borrowing and spending.",
    ],
    [
      "Which of the following is a non-cash (electronic) means of payment?",
      ["a R100 banknote", "a R5 coin", "a R20 note", "a debit card or electronic transfer"],
      3,
      "A debit card or electronic transfer is a non-cash, electronic means of payment, whereas banknotes and coins are physical cash.",
    ],
  ],
  "The Public Sector": [
    [
      "The public sector of the economy refers to:",
      ["the government and state-owned enterprises", "private companies only", "foreign businesses only", "households only"],
      0,
      "The public sector consists of the government and state-owned enterprises (such as Eskom and Transnet) that provide goods and services.",
    ],
    [
      "A tax charged directly on the income of individuals and companies (for example PAYE) is a:",
      ["value-added tax", "direct tax", "customs duty", "excise duty"],
      1,
      "A direct tax is levied directly on income or profits — for example personal income tax (PAYE) and company tax.",
    ],
    [
      "VAT (Value-Added Tax) is an example of:",
      ["a direct tax on income", "a tax on company profits", "an indirect tax on goods and services", "a tax on property only"],
      2,
      "VAT is an indirect tax — it is charged on the sale of goods and services and is paid by the consumer through the price.",
    ],
    [
      "The annual statement in which the Minister of Finance sets out government's expected income and spending is the:",
      ["circular flow", "business cycle", "supply curve", "national budget"],
      3,
      "The national budget is government's annual plan of expected revenue (mainly taxes) and planned expenditure, presented by the Minister of Finance.",
    ],
    [
      "A 'public good', such as street lighting or national defence, is best described as something that is:",
      [
        "provided by government and available to everyone, where one person's use does not reduce another's",
        "only able to be bought by the rich",
        "sold in shops for profit",
        "owned privately by one person",
      ],
      0,
      "A public good (for example street lighting or defence) is non-excludable and non-rivalrous — provided by government and available to all, where one person's use does not reduce its availability to others.",
    ],
    [
      "When government spends more money than it collects in revenue, the result is a:",
      ["budget surplus", "budget deficit", "trade surplus", "profit"],
      1,
      "A budget deficit occurs when government expenditure exceeds its revenue; the shortfall is usually covered by borrowing.",
    ],
    [
      "The main source of revenue (income) for the South African government is:",
      ["donations from other countries", "lottery winnings", "taxes collected by SARS", "selling its head office"],
      2,
      "Taxes collected by the South African Revenue Service (SARS) are the government's main source of revenue.",
    ],
    [
      "One important reason governments levy taxes is to:",
      [
        "increase company profits",
        "make money disappear",
        "reduce the number of citizens",
        "fund public services such as healthcare, education and infrastructure",
      ],
      3,
      "Governments use tax revenue to pay for public services and infrastructure such as healthcare, education, roads and security.",
    ],
  ],
  "Economic Growth, Development & Indicators": [
    [
      "The total value of all final goods and services produced WITHIN a country's borders in a year is the:",
      ["Gross Domestic Product (GDP)", "inflation rate", "repo rate", "exchange rate"],
      0,
      "Gross Domestic Product (GDP) measures the total value of all final goods and services produced within a country's borders in a given year.",
    ],
    [
      "'Economic growth' is best defined as:",
      [
        "a fall in total production",
        "an increase in a country's total production of goods and services (real GDP)",
        "a rise in prices only",
        "an increase in the population only",
      ],
      1,
      "Economic growth is an increase in the real value of goods and services produced by an economy over time, usually measured as the rate of increase in real GDP.",
    ],
    [
      "'Economic development' differs from economic growth because development also includes:",
      [
        "only an increase in GDP",
        "only a rise in prices",
        "improvements in living standards, health, education and quality of life",
        "only a larger population",
      ],
      2,
      "Economic development is broader than growth: it includes improvements in living standards, health, education, income distribution and overall quality of life.",
    ],
    [
      "A sustained general increase in the prices of goods and services over time is called:",
      ["economic growth", "deflation", "a surplus", "inflation"],
      3,
      "Inflation is a sustained rise in the general price level over time, which reduces the buying power of money.",
    ],
    [
      "Which of the following is a SOCIAL indicator of development rather than a purely economic one?",
      ["the literacy rate or life expectancy", "the repo rate", "the exchange rate", "GDP"],
      0,
      "Social indicators such as the literacy rate and life expectancy measure quality of life and wellbeing, unlike purely economic indicators like GDP or the exchange rate.",
    ],
    [
      "The percentage of people who are able and willing to work but cannot find jobs is the:",
      ["inflation rate", "unemployment rate", "interest rate", "growth rate"],
      1,
      "The unemployment rate is the percentage of the labour force that is able and willing to work but unable to find employment.",
    ],
    [
      "GDP per capita is calculated by:",
      [
        "adding GDP and the population together",
        "subtracting taxes from GDP",
        "dividing GDP by the total population",
        "multiplying GDP by the inflation rate",
      ],
      2,
      "GDP per capita = GDP ÷ total population. It gives an average measure of output (or income) per person and is often used to compare living standards.",
    ],
    [
      "Which of the following would most likely PROMOTE economic growth in a country?",
      [
        "closing all the factories",
        "discouraging investment",
        "stopping all education",
        "investment in infrastructure, education and skills",
      ],
      3,
      "Investment in infrastructure, education and skills raises an economy's productive capacity and productivity, which promotes economic growth.",
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
