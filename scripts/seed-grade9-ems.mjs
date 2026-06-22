// Seeds the Grade 9 Economic & Management Sciences (EMS) question bank
// (6 topics x 8 questions). CAPS Senior Phase, objectively-checkable only
// (definitions, concepts, simple money sums). EMS in Gr10 splits into
// Accounting, Business Studies and Economics, so questions are pitched at basic
// Gr9 level and kept DISTINCT from the Gr10 Accounting/Economics/Business banks.
// Every numeric answer double-checked by computation during drafting.
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but NOT option order).
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade9-ems.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Economic & Management Sciences (EMS)";
const GRADE = "Grade 9";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "The Economy & Circular Flow": [
    [
      "In the circular flow, households supply factors of production to businesses in exchange for:",
      ["income", "goods only", "taxes", "imports"],
      0,
      "Households provide factors of production (such as labour) and receive income (wages, rent, interest, profit) in return.",
    ],
    [
      "The two main participants in the simple circular flow are households and:",
      ["foreigners", "businesses", "banks", "trade unions"],
      1,
      "The simple two-sector circular flow shows money and goods flowing between households and businesses (firms).",
    ],
    [
      "Money that the government collects from people and businesses to pay for public services is called:",
      ["profit", "wages", "tax", "interest"],
      2,
      "Tax is money collected by the government to pay for public services like schools, roads and hospitals.",
    ],
    [
      "Which of the following is a public service usually provided by the government?",
      ["a private spaza shop", "a private bank", "a clothing factory", "public hospitals"],
      3,
      "Government provides public services such as public hospitals, schools, roads and the police.",
    ],
    [
      "In the circular flow, businesses use the factors of production to produce:",
      ["goods and services", "taxes", "savings", "wages"],
      0,
      "Businesses combine the factors of production to produce goods and services for households.",
    ],
    [
      "The price paid for using a person's labour is called:",
      ["rent", "wages", "interest", "profit"],
      1,
      "Wages (or salaries) are the payment earned for labour.",
    ],
    [
      "Money flows from households to businesses when households:",
      ["pay taxes", "earn wages", "buy goods and services", "save money"],
      2,
      "When households buy goods and services from businesses, money flows from households to businesses.",
    ],
    [
      "The third participant added to the simple circular flow to make it more realistic is the:",
      ["spaza shop", "household", "business", "government"],
      3,
      "The simple flow has households and businesses; adding the government (which taxes and spends) as a third participant makes it more realistic.",
    ],
  ],
  "Needs, Wants & Factors of Production": [
    [
      "Something a person must have to survive, such as food and water, is called a:",
      ["need", "want", "luxury", "service"],
      0,
      "A need is something essential for survival, such as food, water and shelter.",
    ],
    [
      "Something a person would like to have but can live without, such as a games console, is a:",
      ["need", "want", "necessity", "right"],
      1,
      "A want is something we desire but do not need in order to survive.",
    ],
    [
      "The factor of production that refers to natural resources like land, water and minerals is called:",
      ["labour", "capital", "natural resources", "entrepreneurship"],
      2,
      "Natural resources (land) are the gifts of nature used in production, e.g. land, water and minerals.",
    ],
    [
      "The human effort, both physical and mental, used in production is the factor called:",
      ["capital", "natural resources", "entrepreneurship", "labour"],
      3,
      "Labour is the human effort (physical and mental) used to produce goods and services.",
    ],
    [
      "Machines, tools, equipment and money used to produce goods are the factor of production called:",
      ["capital", "labour", "land", "entrepreneurship"],
      0,
      "Capital refers to the man-made resources — machines, tools, equipment and money — used in production.",
    ],
    [
      "The person who combines the other factors of production and takes the risk of starting a business is the:",
      ["labourer", "entrepreneur", "consumer", "landlord"],
      1,
      "The entrepreneur combines land, labour and capital and takes the risk of running the business.",
    ],
    [
      "Because our needs and wants are unlimited but resources are limited, we face the basic economic problem of:",
      ["inflation", "profit", "scarcity", "interest"],
      2,
      "Scarcity is the basic economic problem: limited resources cannot satisfy unlimited needs and wants.",
    ],
    [
      "When you choose one thing, the next best thing you give up is called the:",
      ["fixed cost", "selling price", "profit margin", "opportunity cost"],
      3,
      "Opportunity cost is the value of the next best alternative you give up when making a choice.",
    ],
  ],
  "Markets, Trade & the Government": [
    [
      "A place or system where buyers and sellers meet to trade goods and services is a:",
      ["market", "factory", "warehouse", "bank"],
      0,
      "A market is where buyers and sellers come together to trade goods and services.",
    ],
    [
      "When a country sells goods to other countries, this is called:",
      ["importing", "exporting", "saving", "budgeting"],
      1,
      "Exporting means selling goods and services to other countries.",
    ],
    [
      "When a country buys goods from other countries, this is called:",
      ["exporting", "lending", "importing", "taxing"],
      2,
      "Importing means buying goods and services from other countries.",
    ],
    [
      "An organisation that represents workers and negotiates for better wages and working conditions is a:",
      ["bank", "spaza shop", "stock exchange", "trade union"],
      3,
      "A trade union represents workers and negotiates with employers for better wages and conditions.",
    ],
    [
      "A general rise in the prices of goods and services over time is called:",
      ["inflation", "profit", "a discount", "a surplus"],
      0,
      "Inflation is a general, ongoing increase in the prices of goods and services.",
    ],
    [
      "South Africa's tax on most goods and services, currently 15%, is called:",
      ["income tax", "VAT (Value-Added Tax)", "customs duty", "interest"],
      1,
      "Value-Added Tax (VAT) is charged on most goods and services in South Africa, currently at 15%.",
    ],
    [
      "The unequal distribution of income and wealth in a society is known as economic:",
      ["growth", "savings", "inequality", "trade"],
      2,
      "Economic inequality refers to the unequal distribution of income and wealth among people.",
    ],
    [
      "When many people who are able and willing to work cannot find jobs, the economy has a high level of:",
      ["inflation", "profit", "exports", "unemployment"],
      3,
      "Unemployment is when people who are able and willing to work cannot find jobs.",
    ],
  ],
  "Financial Literacy & Budgets": [
    [
      "A plan that shows expected income and planned spending over a period is called a:",
      ["budget", "receipt", "profit", "loan"],
      0,
      "A budget is a financial plan that compares expected income with planned expenses.",
    ],
    [
      "If income is greater than expenses in a budget, the result is a:",
      ["deficit", "surplus", "loss", "loan"],
      1,
      "When income is more than expenses, there is a surplus (money left over).",
    ],
    [
      "If expenses are greater than income in a budget, the result is a:",
      ["surplus", "profit", "deficit", "saving"],
      2,
      "When expenses are more than income, there is a deficit (a shortfall).",
    ],
    [
      "Thandi earns R500 and spends R350. How much does she save?",
      ["R850", "R350", "R500", "R150"],
      3,
      "Savings = income − spending = R500 − R350 = R150.",
    ],
    [
      "Money set aside now to use in the future, instead of spending it, is called:",
      ["savings", "income", "tax", "debt"],
      0,
      "Savings is money kept aside for future use rather than being spent now.",
    ],
    [
      "Sipho's monthly income is R2 000 and his expenses are R2 300. His budget shows a deficit of:",
      ["R200", "R300", "R4 300", "R300 surplus"],
      1,
      "Deficit = expenses − income = R2 300 − R2 000 = R300.",
    ],
    [
      "Money that is borrowed and must be paid back, often with interest, is called:",
      ["savings", "income", "debt", "profit"],
      2,
      "Debt is money that has been borrowed and must be repaid, usually with interest.",
    ],
    [
      "A budget surplus of R450 means income exceeded expenses by:",
      ["R0", "R900", "R45", "R450"],
      3,
      "A surplus of R450 means income was R450 more than expenses.",
    ],
  ],
  "Basic Accounting Concepts": [
    [
      "In a business, the money earned from selling goods or services is called:",
      ["income", "expenses", "debt", "tax"],
      0,
      "Income (revenue) is the money a business earns from selling its goods or services.",
    ],
    [
      "The costs a business pays to operate, such as rent and wages, are called:",
      ["income", "expenses", "profit", "assets"],
      1,
      "Expenses are the costs a business pays to run, such as rent, wages and electricity.",
    ],
    [
      "A business earns R8 000 income and has R5 000 in expenses. Its profit is:",
      ["R13 000", "R5 000", "R3 000", "R8 000"],
      2,
      "Profit = income − expenses = R8 000 − R5 000 = R3 000.",
    ],
    [
      "A document given to a customer as proof of payment received is a:",
      ["budget", "cheque", "price tag", "receipt"],
      3,
      "A receipt is a source document given as proof that payment has been received.",
    ],
    [
      "If a business's expenses are greater than its income, it makes a:",
      ["loss", "profit", "surplus", "deposit"],
      0,
      "When expenses exceed income, the business makes a loss.",
    ],
    [
      "Items of value that a business owns, such as equipment and vehicles, are called:",
      ["expenses", "assets", "incomes", "debts"],
      1,
      "Assets are the items of value that a business owns, e.g. equipment, vehicles and cash.",
    ],
    [
      "A business earns R12 000 and spends R12 000. Its profit is:",
      ["R24 000", "R12 000", "R0", "R6 000"],
      2,
      "Profit = income − expenses = R12 000 − R12 000 = R0, so the business breaks even.",
    ],
    [
      "A written document that records the details of a transaction as proof is called a:",
      ["budget", "logo", "slogan", "source document"],
      3,
      "A source document (such as a receipt, invoice or cheque) records the details of a transaction as proof.",
    ],
  ],
  "Entrepreneurship & Forms of Business": [
    [
      "A person who starts and runs their own business, taking the risks, is called an:",
      ["entrepreneur", "employee", "accountant", "inspector"],
      0,
      "An entrepreneur starts and runs their own business and takes the financial risks involved.",
    ],
    [
      "A business owned and run by one person is called a:",
      ["partnership", "sole trader (sole proprietor)", "company", "close corporation"],
      1,
      "A sole trader (sole proprietor) is a business owned and run by one person.",
    ],
    [
      "A business owned by two or more people who share the profits and responsibilities is a:",
      ["sole trader", "company", "partnership", "spaza shop"],
      2,
      "A partnership is owned by two or more people who share the profits, losses and responsibilities.",
    ],
    [
      "The money an entrepreneur uses to start a business is called start-up:",
      ["profit", "income", "wages", "capital"],
      3,
      "Start-up capital is the money needed to start a business — for stock, equipment and other costs.",
    ],
    [
      "A new and original idea, or a better way of doing something, is called:",
      ["innovation", "inflation", "a deficit", "a receipt"],
      0,
      "Innovation means creating something new or finding an original, better way of doing something.",
    ],
    [
      "A spaza shop that sells goods directly to the public is an example of which business sector?",
      ["primary sector", "tertiary (services) sector", "secondary sector", "mining sector"],
      1,
      "A spaza shop sells goods and services to consumers, which is part of the tertiary (services) sector.",
    ],
    [
      "Farming, fishing and mining, which extract raw materials from nature, belong to the:",
      ["tertiary sector", "services sector", "primary sector", "retail sector"],
      2,
      "The primary sector extracts raw materials from nature, e.g. farming, fishing and mining.",
    ],
    [
      "A factory that turns raw materials into finished products belongs to the:",
      ["primary sector", "tertiary sector", "services sector", "secondary sector"],
      3,
      "The secondary sector manufactures and processes raw materials into finished goods, e.g. factories.",
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
