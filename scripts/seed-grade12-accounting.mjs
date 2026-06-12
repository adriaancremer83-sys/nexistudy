// Seeds the Grade 12 Accounting question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only (calculations, definitions, classification).
// Every numeric answer was double-checked by computation during drafting.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade12-accounting.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Accounting";
const GRADE = "Grade 12";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Accounting Equation & Concepts": [
    [
      "The basic accounting equation is:",
      [
        "Assets = Owner's Equity − Liabilities",
        "Assets = Owner's Equity + Liabilities",
        "Assets + Liabilities = Owner's Equity",
        "Assets + Owner's Equity = Liabilities",
      ],
      1,
      "The accounting equation is Assets = Owner's Equity + Liabilities (A = OE + L). What the business owns is funded by the owner plus outside parties.",
    ],
    [
      "A business owns R50 000 in assets and owes R20 000 in liabilities. The owner's equity is:",
      ["R20 000", "R30 000", "R50 000", "R70 000"],
      1,
      "From A = OE + L, owner's equity = assets − liabilities = R50 000 − R20 000 = R30 000.",
    ],
    [
      "According to which GAAP concept is the business treated as separate from its owner?",
      ["The business entity concept", "Historical cost", "Prudence", "Going concern"],
      0,
      "The business entity concept treats the business as a separate unit from its owner, so the owner's personal affairs are kept out of the business records.",
    ],
    [
      "In the ledger, an asset account increases on the:",
      ["credit side", "debit side", "both sides equally", "income side"],
      1,
      "Assets increase on the debit side and decrease on the credit side, following the rules of double-entry.",
    ],
    [
      "The owner takes R2 000 cash out of the business for personal use. This is recorded as:",
      ["Drawings", "Capital", "Salary", "Loan"],
      0,
      "Money or goods taken by the owner for personal use is recorded as Drawings, which reduces owner's equity.",
    ],
    [
      "Which of the following is a non-current (fixed) asset?",
      ["Trading stock", "Debtors", "Equipment", "Bank"],
      2,
      "Equipment is a fixed (non-current) asset used over the long term. Trading stock, debtors and bank are current assets.",
    ],
    [
      "The GAAP principle requiring income and the expenses incurred to earn it to be recorded in the same period is the:",
      ["matching (accrual) principle", "prudence principle", "going concern principle", "materiality principle"],
      0,
      "The matching (accrual) principle records income and its related expenses in the same accounting period, regardless of when cash changes hands.",
    ],
    [
      "A liability is best described as:",
      [
        "something the business owns",
        "an amount the business owes to others",
        "the owner's investment in the business",
        "an expense paid in cash",
      ],
      1,
      "A liability is an amount the business owes to outside parties, such as a loan or creditors.",
    ],
  ],
  "Financial Statements": [
    [
      "The financial statement that shows a business's profit or loss over a period is the:",
      [
        "Statement of Financial Position",
        "Income Statement (Statement of Comprehensive Income)",
        "Cash Flow Statement",
        "Statement of Changes in Equity",
      ],
      1,
      "The Income Statement (Statement of Comprehensive Income) reports income and expenses to show the profit or loss for the period.",
    ],
    [
      "The Statement of Financial Position (Balance Sheet) shows the:",
      [
        "income and expenses for the year",
        "assets, equity and liabilities at a point in time",
        "cash inflows and outflows",
        "profit earned over a year",
      ],
      1,
      "The Statement of Financial Position lists the assets, owner's equity and liabilities of a business at a specific date.",
    ],
    [
      "Gross profit is calculated as:",
      [
        "Sales − Cost of sales",
        "Sales − Operating expenses",
        "Net profit + Income tax",
        "Sales + Cost of sales",
      ],
      0,
      "Gross profit = Sales − Cost of sales. It is the profit on trading before operating expenses are deducted.",
    ],
    [
      "If sales are R100 000 and cost of sales is R60 000, the gross profit is:",
      ["R40 000", "R60 000", "R100 000", "R160 000"],
      0,
      "Gross profit = Sales − Cost of sales = R100 000 − R60 000 = R40 000.",
    ],
    [
      "Net profit is calculated as:",
      [
        "Gross profit + other income − operating expenses",
        "Sales − cost of sales",
        "Cost of sales − sales",
        "Operating expenses − gross profit",
      ],
      0,
      "Net profit = gross profit, plus other operating income, minus operating expenses. (Sales − cost of sales gives only the gross profit.)",
    ],
    [
      "Which of these items appears in the Income Statement?",
      ["Land and buildings", "Trading stock", "Rent income", "Mortgage loan"],
      2,
      "Rent income is income and belongs in the Income Statement. Land and buildings, trading stock and a mortgage loan all appear in the Statement of Financial Position.",
    ],
    [
      "Trading stock (inventory) appears in the Statement of Financial Position as a:",
      ["non-current asset", "current asset", "current liability", "expense"],
      1,
      "Trading stock is a current asset because it is expected to be sold (converted to cash) within one year.",
    ],
    [
      "The amount the owner has invested in the business, shown in the Statement of Financial Position, is the:",
      ["capital (owner's equity)", "net profit", "current liabilities", "cost of sales"],
      0,
      "Capital represents the owner's investment in the business and forms part of owner's equity in the Statement of Financial Position.",
    ],
  ],
  "Companies & Share Capital": [
    [
      "The owners of a company are called:",
      ["partners", "shareholders", "creditors", "directors"],
      1,
      "Shareholders own a company through the shares they hold. Directors manage it, and creditors are owed money by it.",
    ],
    [
      "A portion of a company's profit paid out to its shareholders is called a:",
      ["dividend", "salary", "commission", "loan"],
      0,
      "A dividend is the share of profit distributed to shareholders, usually expressed as cents per share.",
    ],
    [
      "A company issues 10 000 shares at R5 each. The total share capital raised is:",
      ["R2 000", "R15 000", "R50 000", "R5 000"],
      2,
      "Share capital = number of shares × issue price = 10 000 × R5 = R50 000.",
    ],
    [
      "A company declares a dividend of 50 cents per share on 20 000 shares. The total dividend is:",
      ["R1 000", "R10 000", "R40 000", "R100 000"],
      1,
      "Total dividend = 20 000 shares × R0.50 = R10 000.",
    ],
    [
      "The people elected by shareholders to manage a company are the:",
      ["board of directors", "creditors", "auditors", "debtors"],
      0,
      "Shareholders elect a board of directors to run the company on their behalf.",
    ],
    [
      "The independent person appointed to check that a company's financial statements are fair is the:",
      ["auditor", "shareholder", "director", "debtor"],
      0,
      "An external auditor independently examines the financial statements and gives an opinion on their fairness.",
    ],
    [
      "A key feature of a company is that:",
      [
        "the owners have unlimited liability",
        "it has a separate legal identity from its owners",
        "it cannot have more than two owners",
        "profits must by law be shared equally",
      ],
      1,
      "A company is a separate legal person from its shareholders, so it can own assets, owe debts and be sued in its own name.",
    ],
    [
      "Company income tax is calculated on the:",
      ["net profit before tax", "total sales", "gross profit only", "dividends paid"],
      0,
      "Company income tax is based on the net profit before tax for the financial year.",
    ],
  ],
  "Cash Flow Statement": [
    [
      "The Cash Flow Statement classifies cash flows into three types of activities:",
      [
        "operating, investing and financing",
        "current, non-current and fixed",
        "sales, purchases and returns",
        "debit, credit and balance",
      ],
      0,
      "Cash flows are grouped into operating, investing and financing activities.",
    ],
    [
      "The purchase of new equipment (a fixed asset) is shown under which activity?",
      ["operating activities", "investing activities", "financing activities", "trading activities"],
      1,
      "Buying or selling fixed assets is an investing activity in the Cash Flow Statement.",
    ],
    [
      "Cash received from issuing new shares is classified under:",
      ["operating activities", "investing activities", "financing activities", "drawings"],
      2,
      "Raising money from shareholders (issuing shares) is a financing activity.",
    ],
    [
      "Cash received from customers for goods sold forms part of:",
      ["operating activities", "investing activities", "financing activities", "share capital"],
      0,
      "Cash from day-to-day trading, such as receipts from customers, is part of operating activities.",
    ],
    [
      "Dividends paid to shareholders are shown under which activity?",
      ["operating activities", "investing activities", "financing activities", "cost of sales"],
      2,
      "In CAPS, dividends paid to shareholders are classified as a financing activity.",
    ],
    [
      "A positive net cash flow for the period means that:",
      [
        "cash decreased over the period",
        "cash increased over the period",
        "the business definitely made a profit",
        "the business has no debt",
      ],
      1,
      "A positive net cash flow means more cash came in than went out, so the cash balance increased. (Profit and cash are not the same thing.)",
    ],
    [
      "The Cash Flow Statement is mainly concerned with the:",
      [
        "profit for the year",
        "movement of cash into and out of the business",
        "total value of the assets",
        "owner's drawings",
      ],
      1,
      "The Cash Flow Statement tracks the actual movement of cash in and out of the business during the period.",
    ],
    [
      "Repayment of a loan is recorded under which activity in the Cash Flow Statement?",
      ["operating activities", "investing activities", "financing activities", "trading stock"],
      2,
      "Borrowing and repaying loans are financing activities, because they involve the long-term funding of the business.",
    ],
  ],
  "Financial Indicators (Ratios)": [
    [
      "The current ratio is calculated as:",
      [
        "current assets : current liabilities",
        "current liabilities : current assets",
        "current assets : fixed assets",
        "sales : cost of sales",
      ],
      0,
      "The current ratio = current assets : current liabilities, and measures the ability to pay short-term debts.",
    ],
    [
      "A business has current assets of R80 000 and current liabilities of R40 000. The current ratio is:",
      ["1 : 2", "2 : 1", "1 : 1", "4 : 1"],
      1,
      "Current ratio = 80 000 : 40 000, which simplifies to 2 : 1.",
    ],
    [
      "The acid-test (quick) ratio differs from the current ratio in that it:",
      [
        "excludes inventory from current assets",
        "includes fixed assets",
        "uses sales instead of assets",
        "ignores liabilities entirely",
      ],
      0,
      "The acid-test ratio leaves out inventory (trading stock), because stock is the current asset least quickly turned into cash.",
    ],
    [
      "A business has a gross profit of R30 000 on sales of R120 000. Its gross profit on sales (margin) is:",
      ["20%", "25%", "30%", "40%"],
      1,
      "Gross profit margin = (gross profit ÷ sales) × 100 = (30 000 ÷ 120 000) × 100 = 25%.",
    ],
    [
      "A high debt-to-equity ratio indicates that a business:",
      [
        "relies heavily on borrowed funds",
        "has no liabilities at all",
        "is extremely liquid",
        "is holding too much cash",
      ],
      0,
      "A high debt-to-equity ratio means the business is funded largely by borrowed money rather than the owner's equity, which raises financial risk.",
    ],
    [
      "The percentage mark-up on cost is calculated as:",
      [
        "(gross profit ÷ cost of sales) × 100",
        "(gross profit ÷ sales) × 100",
        "(sales ÷ cost of sales) × 100",
        "(cost of sales ÷ sales) × 100",
      ],
      0,
      "Mark-up % on cost = (gross profit ÷ cost of sales) × 100. (Dividing by sales instead gives the profit margin, not the mark-up.)",
    ],
    [
      "If cost of sales is R50 000 and the business uses a mark-up of 40% on cost, the gross profit is:",
      ["R12 500", "R20 000", "R25 000", "R70 000"],
      1,
      "Gross profit = mark-up % × cost of sales = 40% × R50 000 = R20 000.",
    ],
    [
      "Liquidity ratios are used mainly to measure a business's ability to:",
      [
        "pay its short-term debts",
        "make a long-term profit",
        "increase its share capital",
        "calculate depreciation",
      ],
      0,
      "Liquidity ratios (such as the current and acid-test ratios) measure whether a business can pay its short-term debts as they fall due.",
    ],
  ],
  "Inventory Valuation": [
    [
      "Under the FIFO (first-in-first-out) method, it is assumed that:",
      [
        "the oldest stock is sold first",
        "the newest stock is sold first",
        "stock is sold in random order",
        "stock is never sold",
      ],
      0,
      "FIFO assumes the first (oldest) units bought are the first ones sold, so closing stock is valued at the most recent prices.",
    ],
    [
      "In a perpetual inventory system, the cost of sales is:",
      [
        "recorded continuously at the time of each sale",
        "calculated only at the end of the year",
        "never recorded",
        "always equal to gross profit",
      ],
      0,
      "A perpetual system updates trading stock and records cost of sales every time a sale takes place.",
    ],
    [
      "In a periodic inventory system, the value of stock on hand is determined by:",
      [
        "a physical stock count at the end of the period",
        "recording every sale as it happens",
        "reading the bank statement",
        "counting the cash float",
      ],
      0,
      "A periodic system relies on a physical stock count at the end of the period to determine closing stock and cost of sales.",
    ],
    [
      "A business buys 100 units at R10 each and later 100 units at R14 each. Using the weighted-average method, the cost per unit is:",
      ["R10", "R12", "R14", "R24"],
      1,
      "Weighted average = total cost ÷ total units = (100×10 + 100×14) ÷ 200 = 2 400 ÷ 200 = R12.",
    ],
    [
      "Using FIFO, a business buys 50 units at R8 then 50 units at R12, and sells 60 units. The cost of the 60 units sold is:",
      ["R480", "R520", "R600", "R720"],
      1,
      "FIFO sells the oldest first: 50 × R8 = R400, plus 10 × R12 = R120, giving R520.",
    ],
    [
      "The 'trading stock deficit' account records:",
      [
        "stock missing compared with the records (a shortfall)",
        "extra stock found over the records",
        "the profit made on sales",
        "a shortage of cash in the till",
      ],
      0,
      "A trading stock deficit is the shortfall when the physical stock count is less than the figure in the records — treated as a loss.",
    ],
    [
      "Which inventory system best suits a business selling a small number of high-value items (such as cars)?",
      ["the perpetual (continuous) system", "the periodic system", "no system is needed", "the weighted-average system only"],
      0,
      "High-value, low-volume items are best tracked with a perpetual system, which records each item continuously.",
    ],
    [
      "During a period of rising prices, the FIFO method generally gives a closing stock value that is:",
      [
        "higher, because it is based on the most recent, higher prices",
        "lower, because it is based on the oldest prices",
        "zero",
        "negative",
      ],
      0,
      "Under FIFO the oldest (cheaper) stock is sold first, so closing stock is valued at the most recent, higher prices — giving a higher closing stock value when prices rise.",
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
