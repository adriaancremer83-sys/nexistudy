// Seeds the Grade 10 Accounting question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only (calculations, definitions,
// classification). Grade 10 level. Topics are fully DISTINCT from the Gr11
// Accounting bank (Gr11 = Bank Reconciliation, Fixed Assets & Depreciation,
// Partnerships, Clubs, Cost Accounting, Cash Budgets & VAT). Gr10 here covers
// the foundational cycle: the accounting equation, source documents & journals,
// general ledger & trial balance, sole-trader financial statements, debtors &
// creditors, and salaries/wages/ethics.
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but NOT option order).
// Every numeric answer was double-checked by computation during drafting.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade10-accounting.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Accounting";
const GRADE = "Grade 10";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "The Accounting Equation": [
    [
      "The basic accounting equation is:",
      [
        "Assets = Owner's Equity + Liabilities",
        "Assets = Owner's Equity − Liabilities",
        "Assets + Owner's Equity = Liabilities",
        "Liabilities = Assets + Owner's Equity",
      ],
      0,
      "The accounting equation states that Assets = Owner's Equity + Liabilities — everything the business owns is financed either by the owner or by outsiders.",
    ],
    [
      "The owner deposits R50 000 of her own money into the business bank account as capital. The effect on the accounting equation is:",
      [
        "assets decrease and liabilities increase",
        "assets increase and owner's equity increases",
        "owner's equity decreases and liabilities increase",
        "assets stay the same and liabilities decrease",
      ],
      1,
      "Capital contributed increases the bank (an asset) and increases owner's equity (capital) by the same amount.",
    ],
    [
      "A business buys equipment for R10 000 and pays by EFT. The effect on the accounting equation is that:",
      [
        "total assets increase by R10 000",
        "liabilities increase by R10 000",
        "one asset (equipment) increases and another asset (bank) decreases, so total assets stay the same",
        "owner's equity increases by R10 000",
      ],
      2,
      "Paying cash for equipment swaps one asset for another: equipment goes up and bank goes down by the same amount, so total assets are unchanged.",
    ],
    [
      "A business buys a vehicle on credit for R80 000. The effect on the accounting equation is that:",
      [
        "assets decrease and owner's equity decreases",
        "owner's equity increases and liabilities decrease",
        "total assets stay the same",
        "assets increase and liabilities increase",
      ],
      3,
      "Buying on credit increases the vehicles asset and increases the creditors (a liability) by the same amount.",
    ],
    [
      "A business has assets of R150 000 and liabilities of R40 000. The owner's equity is:",
      ["R110 000", "R190 000", "R40 000", "R150 000"],
      0,
      "Owner's equity = assets − liabilities = R150 000 − R40 000 = R110 000.",
    ],
    [
      "A business has owner's equity of R200 000 and liabilities of R60 000. Its total assets are:",
      ["R140 000", "R260 000", "R200 000", "R60 000"],
      1,
      "Assets = owner's equity + liabilities = R200 000 + R60 000 = R260 000.",
    ],
    [
      "The owner takes R2 000 cash out of the business for personal use (drawings). The effect on the accounting equation is that:",
      [
        "assets increase and owner's equity increases",
        "liabilities decrease and assets increase",
        "assets decrease and owner's equity decreases",
        "there is no effect on the accounting equation",
      ],
      2,
      "Drawings reduce the bank (an asset) and reduce owner's equity, because the owner is taking value out of the business.",
    ],
    [
      "A business pays a creditor R5 000 by EFT. The effect on the accounting equation is that:",
      [
        "assets increase and liabilities increase",
        "owner's equity decreases and assets increase",
        "liabilities increase and owner's equity decreases",
        "assets (bank) decrease and liabilities (creditors) decrease",
      ],
      3,
      "Paying a creditor reduces the bank (an asset) and reduces creditors (a liability) by the same amount.",
    ],
  ],
  "Source Documents & Subsidiary Journals": [
    [
      "A source document is:",
      [
        "a journal used to record sales",
        "the owner's personal bank card",
        "written proof that a transaction took place",
        "a summary of all the accounts in the ledger",
      ],
      2,
      "A source document (such as an invoice or receipt) is the written evidence that a transaction actually happened; it is the starting point of the accounting cycle.",
    ],
    [
      "The source document a business issues when it sells goods on credit is a(n):",
      ["invoice", "receipt", "cheque counterfoil", "deposit slip"],
      0,
      "When goods are sold on credit, the seller issues an invoice as proof of the credit sale.",
    ],
    [
      "Cash sales of goods are recorded in the:",
      ["Creditors Journal", "Debtors Journal", "General Journal", "Cash Receipts Journal"],
      3,
      "Money received from cash sales is recorded in the Cash Receipts Journal (CRJ).",
    ],
    [
      "Goods bought on credit from a supplier are recorded in the:",
      ["Cash Payments Journal", "Creditors Journal", "Debtors Journal", "Cash Receipts Journal"],
      1,
      "Credit purchases of trading stock from suppliers are recorded in the Creditors Journal (CJ).",
    ],
    [
      "A receipt is a source document that serves as proof of:",
      ["goods sold on credit", "goods returned by a customer", "cash received", "a credit purchase"],
      2,
      "A receipt is issued as proof that cash (money) has been received by the business.",
    ],
    [
      "When a debtor returns goods previously bought on credit, the business issues a:",
      ["credit note", "debit note", "receipt", "cheque"],
      0,
      "A credit note is issued to a debtor for goods returned, reducing the amount the debtor owes.",
    ],
    [
      "Goods sold on credit are recorded in the:",
      ["Cash Receipts Journal", "Creditors Journal", "Cash Payments Journal", "Debtors Journal"],
      3,
      "Credit sales to customers are recorded in the Debtors Journal (DJ).",
    ],
    [
      "The monthly rent paid by EFT is recorded in the:",
      ["Cash Receipts Journal", "Cash Payments Journal", "Debtors Journal", "General Journal"],
      1,
      "Money paid out of the bank account, such as rent, is recorded in the Cash Payments Journal (CPJ).",
    ],
  ],
  "General Ledger & Trial Balance": [
    [
      "In the General Ledger, asset and expense accounts are increased on the:",
      ["debit side", "credit side", "income side", "balance side"],
      0,
      "Assets and expenses increase on the debit side of their accounts.",
    ],
    [
      "Owner's equity, income and liability accounts increase on the:",
      ["debit side", "asset side", "expense side", "credit side"],
      3,
      "Owner's equity, income and liabilities all increase on the credit side of their accounts.",
    ],
    [
      "A Trial Balance is prepared mainly to:",
      [
        "calculate the net profit",
        "check that total debits equal total credits",
        "list the business's customers",
        "show the cash budget for next month",
      ],
      1,
      "The Trial Balance lists all the ledger balances to check that total debits equal total credits, confirming the books balance.",
    ],
    [
      "An account has a debit total of R8 000 and a credit total of R3 000. Its closing balance is:",
      ["R11 000 credit", "R3 000 debit", "R5 000 debit", "R5 000 credit"],
      2,
      "Debit total − credit total = R8 000 − R3 000 = R5 000, and the larger side (debit) determines the balance: R5 000 debit.",
    ],
    [
      "The Capital account normally has a:",
      ["credit balance", "debit balance", "nil balance", "stock balance"],
      0,
      "Capital is part of owner's equity, which increases on the credit side, so the Capital account normally has a credit balance.",
    ],
    [
      "Which of the following accounts would have a debit balance?",
      ["Capital", "Loan from bank", "Sales", "Equipment"],
      3,
      "Equipment is an asset, and assets have debit balances. Capital, a loan and sales all have credit balances.",
    ],
    [
      "If the totals of a Trial Balance do not agree, it means that:",
      [
        "the business made a loss",
        "there is an error in the recording or posting",
        "the business is bankrupt",
        "no transactions took place",
      ],
      1,
      "When the debit and credit totals of a Trial Balance differ, an error has been made somewhere in the recording, posting or balancing.",
    ],
    [
      "The Vehicles account would appear in the Trial Balance as a:",
      [
        "credit, because it is income",
        "credit, because it is a liability",
        "debit, because it is an asset",
        "debit, because it is income",
      ],
      2,
      "Vehicles is a fixed asset; assets have debit balances, so it appears on the debit side of the Trial Balance.",
    ],
  ],
  "Financial Statements of a Sole Trader": [
    [
      "Gross profit is calculated as:",
      [
        "sales − operating expenses",
        "sales − cost of sales",
        "net profit + drawings",
        "assets − liabilities",
      ],
      1,
      "Gross profit = sales − cost of sales — the profit made on trading before operating expenses are deducted.",
    ],
    [
      "Sales were R200 000 and the cost of sales was R120 000. The gross profit is:",
      ["R80 000", "R320 000", "R120 000", "R200 000"],
      0,
      "Gross profit = sales − cost of sales = R200 000 − R120 000 = R80 000.",
    ],
    [
      "Gross profit is R80 000 and total operating expenses are R50 000 (with no other income). The net profit is:",
      ["R130 000", "R50 000", "R30 000", "R80 000"],
      2,
      "Net profit = gross profit − operating expenses = R80 000 − R50 000 = R30 000.",
    ],
    [
      "The financial statement that shows a business's assets, owner's equity and liabilities on a specific date is the:",
      [
        "Trading account",
        "Cash budget",
        "Statement of Comprehensive Income (Income Statement)",
        "Statement of Financial Position (Balance Sheet)",
      ],
      3,
      "The Statement of Financial Position (Balance Sheet) shows the assets, owner's equity and liabilities of the business at a particular date.",
    ],
    [
      "Which of the following is a current asset?",
      ["land and buildings", "trading stock (inventory)", "a long-term loan", "equipment"],
      1,
      "Trading stock is a current asset because it is expected to be sold (turned into cash) within one year.",
    ],
    [
      "Which of the following is a non-current (fixed) asset?",
      ["vehicles", "bank", "debtors", "trading stock"],
      0,
      "Vehicles are a non-current (fixed) asset — used in the business over many years. Bank, debtors and trading stock are current assets.",
    ],
    [
      "The Statement of Comprehensive Income (Income Statement) is prepared to determine the:",
      [
        "amount of cash in the bank",
        "list of debtors",
        "profit or loss for the year",
        "value of the fixed assets only",
      ],
      2,
      "The Statement of Comprehensive Income matches income against expenses to determine the profit or loss for the financial period.",
    ],
    [
      "The cost of sales was R120 000 and the goods were sold for R180 000. The profit (mark-up) expressed as a percentage of cost of sales is:",
      ["33,3%", "60%", "120%", "50%"],
      3,
      "Gross profit = R180 000 − R120 000 = R60 000. Mark-up % on cost = R60 000 ÷ R120 000 × 100 = 50%.",
    ],
  ],
  "Debtors & Creditors": [
    [
      "A 'debtor' is a person or business that:",
      [
        "the business owes money to",
        "pays cash immediately",
        "supplies goods on credit to the business",
        "owes money to the business",
      ],
      3,
      "A debtor owes money to the business — usually a customer who bought goods on credit.",
    ],
    [
      "A 'creditor' is a person or business that:",
      [
        "owes money to the business",
        "the business owes money to",
        "buys goods for cash only",
        "is a customer paying cash",
      ],
      1,
      "A creditor is someone the business owes money to — usually a supplier from whom goods were bought on credit.",
    ],
    [
      "A debtor settles an account of R1 000 and is allowed a 5% discount for paying early. The amount of cash received by the business is:",
      ["R950", "R1 050", "R50", "R1 000"],
      0,
      "Discount = 5% × R1 000 = R50, so cash received = R1 000 − R50 = R950.",
    ],
    [
      "The Debtors Control account in the General Ledger normally has a:",
      ["credit balance", "nil balance", "debit balance", "loan balance"],
      2,
      "Debtors Control represents money owed to the business (an asset), so it normally has a debit balance.",
    ],
    [
      "A business buys trading stock and pays for it immediately by EFT. This is recorded in the:",
      ["Debtors Journal", "Creditors Journal", "General Journal", "Cash Payments Journal"],
      3,
      "Paying immediately for stock is a cash payment, so it is recorded in the Cash Payments Journal (CPJ).",
    ],
    [
      "At the start of the month a debtor owed R800. During the month the debtor bought a further R500 on credit and paid R300. At month-end the debtor owes:",
      ["R600", "R1 000", "R1 300", "R800"],
      1,
      "Amount owing = R800 + R500 − R300 = R1 000.",
    ],
    [
      "Offering customers a cash (settlement) discount is mainly intended to encourage them to:",
      ["pay their accounts early", "never pay at all", "buy on credit only", "return their goods"],
      0,
      "A cash/settlement discount rewards debtors for paying their accounts early, which improves the business's cash flow.",
    ],
    [
      "The Creditors Control account in the General Ledger normally has a:",
      ["debit balance", "nil balance", "credit balance", "asset balance"],
      2,
      "Creditors Control represents money the business owes (a liability), so it normally has a credit balance.",
    ],
  ],
  "Salaries, Wages & Accounting Ethics": [
    [
      "'Gross pay' (gross salary) is:",
      [
        "the amount paid after deductions",
        "only the annual bonus",
        "the total amount earned before any deductions",
        "the tax paid over to SARS",
      ],
      2,
      "Gross pay is the full amount an employee earns before any deductions (such as tax and UIF) are taken off.",
    ],
    [
      "Net pay is calculated as:",
      [
        "gross pay + total deductions",
        "total deductions − gross pay",
        "gross pay × the tax rate",
        "gross pay − total deductions",
      ],
      3,
      "Net pay (take-home pay) = gross pay − total deductions.",
    ],
    [
      "Which of the following is a compulsory deduction from an employee's salary?",
      ["PAYE (income tax)", "a loan to a friend", "a personal grocery bill", "a cellphone contract"],
      0,
      "PAYE (Pay As You Earn) income tax is a compulsory deduction that the employer withholds and pays over to SARS.",
    ],
    [
      "'UIF' stands for:",
      [
        "United Income Fund",
        "Unemployment Insurance Fund",
        "Universal Investment Finance",
        "Union Industrial Fee",
      ],
      1,
      "UIF is the Unemployment Insurance Fund, which provides short-term relief to workers who become unemployed.",
    ],
    [
      "An employee earns a gross salary of R15 000. Deductions are PAYE R2 000 and UIF R150. The net pay is:",
      ["R17 150", "R13 000", "R12 850", "R15 000"],
      2,
      "Net pay = gross pay − deductions = R15 000 − R2 000 − R150 = R12 850.",
    ],
    [
      "An employee's UIF contribution is 1% of gross salary. On a gross salary of R20 000, the employee's UIF contribution is:",
      ["R2 000", "R20", "R2", "R200"],
      3,
      "UIF = 1% × R20 000 = R200.",
    ],
    [
      "A 'wage' usually differs from a 'salary' in that a wage is:",
      [
        "usually paid weekly and often based on hours worked or output",
        "always paid once a year",
        "paid only to senior managers",
        "never recorded in the books",
      ],
      0,
      "A wage is normally paid weekly and is often based on hours worked or output, while a salary is a fixed amount usually paid monthly.",
    ],
    [
      "The requirement that financial information must be truthful, accurate and free from error reflects the accounting principle of:",
      [
        "making the maximum possible profit",
        "honesty and reliability in financial reporting",
        "hiding losses from the owner",
        "paying as little tax as possible",
      ],
      1,
      "Reliability means financial information must be honest, accurate and free from error so that users can depend on it — a core ethical principle in accounting.",
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
