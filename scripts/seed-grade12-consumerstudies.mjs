// Seeds the Grade 12 Consumer Studies question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only (definitions, classifications,
// SA consumer law facts, costing calculations). No interpretive questions.
// Every numeric answer was double-checked by computation during drafting.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade12-consumerstudies.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Consumer Studies";
const GRADE = "Grade 12";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Consumer Rights & Protection": [
    [
      "Which body would a consumer approach to resolve a complaint about a supplier under the Consumer Protection Act?",
      ["SARS", "the National Consumer Commission", "the Reserve Bank", "Stats SA"],
      1,
      "The National Consumer Commission enforces the Consumer Protection Act and investigates consumer complaints against suppliers.",
    ],
    [
      "Under the Consumer Protection Act, goods bought through direct marketing may be cancelled within a cooling-off period of:",
      ["30 days", "6 months", "24 hours", "5 business days"],
      3,
      "The CPA gives consumers a cooling-off period of 5 business days to cancel agreements that resulted from direct marketing.",
    ],
    [
      "A consumer's right to return unsafe or defective goods within 6 months of purchase falls under the right to:",
      ["fair value, good quality and safety", "privacy", "choose", "disclosure of information"],
      0,
      "The CPA's right to fair value, good quality and safety includes an implied warranty: defective goods may be returned within 6 months.",
    ],
    [
      "Which of the following is a consumer RESPONSIBILITY rather than a consumer right?",
      [
        "the right to redress",
        "the right to safety",
        "comparing prices and products before buying",
        "the right to choose",
      ],
      2,
      "Comparing prices and products before buying is something the consumer must do — a responsibility. The other three are consumer rights.",
    ],
    [
      "A contract is legally binding when:",
      [
        "only a written document exists",
        "one party knows about the terms",
        "it is signed by a lawyer",
        "both parties agree and all legal requirements are met",
      ],
      3,
      "A contract is binding when there is agreement (offer and acceptance) between parties who are legally able to contract — it does not need a lawyer, and verbal contracts can also be binding.",
    ],
    [
      "Buying on credit means:",
      [
        "paying the full amount in cash immediately",
        "receiving goods now and paying later, usually with interest",
        "exchanging goods for other goods",
        "paying with a debit card",
      ],
      1,
      "Credit means the consumer receives the goods now and pays the amount off later, normally with interest added.",
    ],
    [
      "The National Credit Act protects consumers against:",
      ["high food prices", "load-shedding", "reckless lending by credit providers", "poor workmanship by builders"],
      2,
      "The National Credit Act regulates credit providers and protects consumers against reckless lending and unfair credit practices.",
    ],
    [
      "Buying on lay-by means:",
      [
        "the shop keeps the goods while the consumer pays in instalments, and the consumer receives the goods once fully paid",
        "the consumer takes the goods home immediately and pays later",
        "the goods are rented for a fixed period",
        "the goods are exchanged for vouchers",
      ],
      0,
      "With lay-by the shop holds the goods while the consumer pays them off in instalments; the goods are only handed over after the final payment.",
    ],
  ],
  "Income, Taxes & Inflation": [
    [
      "Gross salary minus deductions (such as income tax and UIF) equals:",
      ["gross profit", "taxable profit", "net income (take-home pay)", "capital income"],
      2,
      "Net income (take-home pay) is what remains of the gross salary after all deductions have been subtracted.",
    ],
    [
      "VAT is an example of:",
      ["an indirect tax", "a direct tax", "a progressive income tax", "a municipal rate"],
      0,
      "VAT is an indirect tax — it is included in the price of goods and services and collected by the seller, not paid directly to SARS by the consumer.",
    ],
    [
      "Personal income tax in South Africa is collected by:",
      ["the Reserve Bank", "Stats SA", "the National Consumer Commission", "SARS"],
      3,
      "The South African Revenue Service (SARS) collects income tax and other taxes on behalf of the government.",
    ],
    [
      "Inflation is best described as:",
      [
        "a decrease in the price of goods",
        "a sustained increase in the general price level, which reduces buying power",
        "an increase in the value of the rand",
        "a tax on luxury goods",
      ],
      1,
      "Inflation is the sustained rise in the general level of prices, which means the same money buys less over time.",
    ],
    [
      "Inflation in South Africa is measured by means of the:",
      ["Consumer Price Index (CPI)", "Gross Domestic Product (GDP)", "exchange rate", "repo rate"],
      0,
      "The Consumer Price Index (CPI) tracks the prices of a basket of goods and services and is used to measure inflation.",
    ],
    [
      "The UIF contribution deducted from an employee's salary provides:",
      [
        "a pension at retirement",
        "medical aid cover",
        "a housing subsidy",
        "short-term financial relief when a worker becomes unemployed",
      ],
      3,
      "The Unemployment Insurance Fund (UIF) pays short-term benefits to workers who become unemployed or cannot work (e.g. maternity).",
    ],
    [
      "Income tax in South Africa is a progressive tax, which means:",
      [
        "everyone pays the same percentage",
        "the higher your income, the higher the percentage of tax you pay",
        "only businesses pay it",
        "it is included in the price of goods",
      ],
      1,
      "A progressive tax taxes higher incomes at higher rates — people who earn more pay a larger percentage of their income.",
    ],
    [
      "An employee earns R12 000 per month and R1 800 is deducted in total. The take-home (net) pay is:",
      ["R13 800", "R12 000", "R10 200", "R1 800"],
      2,
      "Net pay = gross salary − deductions = R12 000 − R1 800 = R10 200.",
    ],
  ],
  "Nutrition & Deficiency Diseases": [
    [
      "Kwashiorkor is caused by a serious shortage of:",
      ["vitamin C", "iron", "iodine", "protein"],
      3,
      "Kwashiorkor is a malnutrition disease caused by a severe protein deficiency, often seen in young children.",
    ],
    [
      "Scurvy is caused by a deficiency of:",
      ["vitamin D", "vitamin C", "calcium", "vitamin A"],
      1,
      "Scurvy (bleeding gums, poor wound healing) is caused by a lack of vitamin C in the diet.",
    ],
    [
      "A shortage of iron in the diet causes:",
      ["anaemia", "rickets", "goitre", "scurvy"],
      0,
      "Iron is needed to make haemoglobin; too little iron causes anaemia, which leads to tiredness and paleness.",
    ],
    [
      "Goitre (an enlarged thyroid gland) is caused by a shortage of:",
      ["calcium", "vitamin B", "iodine", "protein"],
      2,
      "The thyroid gland needs iodine to make its hormones; an iodine deficiency causes the gland to enlarge — goitre.",
    ],
    [
      "Rickets in children is caused by a deficiency of:",
      ["vitamin C and zinc", "vitamin D and calcium", "protein and fat", "iron and iodine"],
      1,
      "Rickets (soft, deformed bones in children) is caused by a lack of vitamin D and calcium, which are needed for strong bones.",
    ],
    [
      "Which nutrient is the body's main source of energy?",
      ["vitamins", "minerals", "water", "carbohydrates"],
      3,
      "Carbohydrates are the body's main and most readily available source of energy.",
    ],
    [
      "Type 2 diabetes is most strongly associated with:",
      [
        "a shortage of vitamin A",
        "eating too much fibre",
        "obesity and a diet high in sugar",
        "drinking too much water",
      ],
      2,
      "Type 2 diabetes is a lifestyle disease strongly linked to obesity and diets high in sugar and refined carbohydrates.",
    ],
    [
      "Dietary fibre (roughage) helps to:",
      [
        "prevent constipation by keeping the digestive system healthy",
        "build muscles",
        "strengthen bones",
        "carry oxygen in the blood",
      ],
      0,
      "Fibre adds bulk and keeps food moving through the digestive system, which prevents constipation.",
    ],
  ],
  "Food Safety": [
    [
      "The temperature danger zone, in which bacteria in food multiply fastest, is between:",
      ["5 °C and 60 °C", "0 °C and 5 °C", "60 °C and 100 °C", "−18 °C and 0 °C"],
      0,
      "Bacteria multiply fastest between 5 °C and 60 °C — food should be kept colder or hotter than this danger zone.",
    ],
    [
      "The 2017–2018 listeriosis outbreak in South Africa was mainly linked to:",
      ["fresh vegetables", "tinned fish", "processed cold meats such as polony", "fruit juice"],
      2,
      "South Africa's listeriosis outbreak was traced to ready-to-eat processed meats, especially polony.",
    ],
    [
      "Salmonella food poisoning is most commonly linked to:",
      ["boiled water", "fresh bread", "tinned vegetables", "raw or undercooked eggs and poultry"],
      3,
      "Salmonella bacteria are commonly found in raw or undercooked eggs and poultry — thorough cooking kills them.",
    ],
    [
      "Cholera is spread mainly through:",
      ["coughing and sneezing", "contaminated water and food", "mosquito bites", "skin contact"],
      1,
      "Cholera is a waterborne disease spread through water and food contaminated with the cholera bacterium.",
    ],
    [
      "Frozen food should be stored at a temperature of about:",
      ["10 °C", "0 °C", "−18 °C", "5 °C"],
      2,
      "A freezer should run at about −18 °C to keep frozen food safe for long-term storage.",
    ],
    [
      "Cross-contamination in the kitchen is best prevented by:",
      [
        "using separate cutting boards for raw meat and ready-to-eat food",
        "cooking all food in the same pot",
        "washing hands only after cooking",
        "storing raw meat above cooked food in the fridge",
      ],
      0,
      "Separate cutting boards (and utensils) for raw meat and ready-to-eat food stop bacteria from transferring between them.",
    ],
    [
      "Botulism is a dangerous form of food poisoning associated with:",
      ["fresh fruit", "damaged or bulging tinned (canned) food", "dry biscuits", "pasteurised milk"],
      1,
      "Botulism is linked to incorrectly processed canned food — a bulging or damaged tin is a warning sign and the contents must not be eaten.",
    ],
    [
      "Leftover cooked food should be:",
      [
        "left on the counter overnight",
        "reheated only once a week",
        "kept warm at 30 °C",
        "cooled quickly and refrigerated within two hours",
      ],
      3,
      "Leftovers must be cooled quickly and refrigerated within two hours so they spend as little time as possible in the danger zone.",
    ],
  ],
  "Housing & Financing": [
    [
      "A home loan from a bank, with the property serving as security, is called a:",
      ["lease", "bond (mortgage)", "levy", "title deed"],
      1,
      "A bond (mortgage loan) is a home loan where the property itself serves as security for the bank.",
    ],
    [
      "The legal document that proves ownership of a property is the:",
      ["lease agreement", "bond statement", "municipal account", "title deed"],
      3,
      "The title deed is the legal document registered at the Deeds Office that proves who owns a property.",
    ],
    [
      "Owners of units in a sectional-title complex pay a monthly amount for the upkeep of common property. This is called a:",
      ["bond", "deposit", "levy", "rates rebate"],
      2,
      "Sectional-title owners pay a monthly levy to the body corporate for maintaining the common property (gardens, security, building exterior).",
    ],
    [
      "A tenant is a person who:",
      ["rents a property from the owner", "owns the property", "sells properties", "values properties for banks"],
      0,
      "A tenant rents a property from the owner (the landlord) in exchange for rent.",
    ],
    [
      "Which is an advantage of renting rather than buying a home?",
      [
        "the tenant builds up ownership of the property",
        "rent never increases",
        "the tenant pays transfer duty",
        "the tenant is not responsible for major maintenance costs",
      ],
      3,
      "Major maintenance of a rented property is the landlord's responsibility — an advantage of renting. Tenants build no ownership and pay no transfer duty.",
    ],
    [
      "Transfer duty is:",
      [
        "a monthly municipal service fee",
        "a tax paid to SARS when fixed property above a threshold is bought",
        "interest on a home loan",
        "the deposit on a rented flat",
      ],
      1,
      "Transfer duty is a tax paid to SARS by the buyer when property above the threshold value is transferred into their name.",
    ],
    [
      "If the interest rate on a home loan increases, the monthly bond repayment will:",
      ["increase", "decrease", "stay the same", "fall away"],
      0,
      "Bond repayments are linked to the interest rate — when the rate rises, the monthly repayment increases.",
    ],
    [
      "A written agreement between a landlord and a tenant is called a:",
      ["title deed", "bond", "lease (rental agreement)", "levy statement"],
      2,
      "A lease (rental agreement) sets out the terms under which the tenant rents the property from the landlord.",
    ],
  ],
  "Entrepreneurship & Costing": [
    [
      "Direct materials for one item cost R30, direct labour R20 and overheads R10. The production cost per item is:",
      ["R50", "R30", "R60", "R600"],
      2,
      "Production cost per item = materials + labour + overheads = R30 + R20 + R10 = R60.",
    ],
    [
      "An item costs R80 to make and is sold with a 50% markup on cost. The selling price is:",
      ["R120", "R130", "R40", "R160"],
      0,
      "Selling price = cost + 50% of cost = R80 + R40 = R120.",
    ],
    [
      "Profit is calculated as:",
      [
        "selling price plus cost price",
        "cost price minus selling price",
        "selling price multiplied by cost price",
        "total income minus total costs",
      ],
      3,
      "Profit = total income − total costs. If costs are bigger than income, the business makes a loss.",
    ],
    [
      "Fixed costs are R10 000 per month. Each item sells for R50 and has variable costs of R30. The break-even point is:",
      ["200 items", "500 items", "333 items", "1 000 items"],
      1,
      "Break-even = fixed costs ÷ (selling price − variable cost) = R10 000 ÷ (R50 − R30) = R10 000 ÷ R20 = 500 items.",
    ],
    [
      "Which of the following is a fixed cost for a small bakery?",
      ["flour", "sugar", "packaging", "monthly rent of the premises"],
      3,
      "Rent stays the same regardless of how much is baked — a fixed cost. Flour, sugar and packaging vary with production.",
    ],
    [
      "A baker makes 200 muffins at a total cost of R600. The cost per muffin is:",
      ["R30", "R3", "R6", "R12"],
      1,
      "Cost per muffin = total cost ÷ number of muffins = R600 ÷ 200 = R3.",
    ],
    [
      "An entrepreneur is a person who:",
      [
        "starts and runs a business, taking the risk in order to make a profit",
        "works for a salary at a company",
        "collects taxes for the government",
        "only invests in shares",
      ],
      0,
      "An entrepreneur identifies an opportunity and starts and runs a business at their own risk to make a profit.",
    ],
    [
      "If an item's selling price is R150 and its production cost is R100, the markup on cost is:",
      ["33%", "25%", "50%", "150%"],
      2,
      "Markup on cost = (R150 − R100) ÷ R100 × 100 = 50%. (33% would be the margin calculated on the selling price.)",
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
