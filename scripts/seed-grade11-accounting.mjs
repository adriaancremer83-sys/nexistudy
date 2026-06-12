// Seeds the Grade 11 Accounting question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only (calculations, definitions, classification).
// Grade 11 scope: reconciliations, fixed assets, partnerships, clubs, cost accounting, budgets & VAT.
// Every numeric answer was double-checked by computation during drafting.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade11-accounting.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Accounting";
const GRADE = "Grade 11";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Bank Reconciliation": [
    [
      "On a bank statement, a debit balance indicates:",
      [
        "a favourable balance",
        "interest earned on the account",
        "an overdraft (the account holder owes the bank)",
        "a deposit not yet credited",
      ],
      2,
      "The bank statement is drawn up from the bank's records, so a debit balance means the account holder owes the bank — an overdraft.",
    ],
    [
      "An outstanding cheque is a cheque that has been:",
      [
        "recorded in the Cash Payments Journal but not yet presented to the bank for payment",
        "cancelled by the business",
        "paid twice by the bank in error",
        "deposited but not yet credited by the bank",
      ],
      0,
      "An outstanding cheque has been entered in the Cash Payments Journal but has not yet been presented to the bank, so it does not appear on the bank statement yet.",
    ],
    [
      "Bank charges that appear on the bank statement but not yet in the business's books are recorded in the:",
      ["Cash Receipts Journal", "Cash Payments Journal", "Debtors Journal", "Creditors Journal"],
      1,
      "Bank charges are money taken out of the bank account, so the business records them in the Cash Payments Journal before reconciling.",
    ],
    [
      "A direct deposit by a debtor that appears only on the bank statement must be entered in the:",
      ["Creditors Journal", "Cash Payments Journal", "General Journal", "Cash Receipts Journal"],
      3,
      "A direct deposit is money received into the bank account, so it is recorded in the Cash Receipts Journal of the business.",
    ],
    [
      "The bank statement shows a favourable balance of R5 000. Deposits of R2 000 are outstanding and cheques of R3 000 have not yet been presented. The bank account balance in the business's books should be:",
      ["R10 000", "R4 000", "R6 000", "R5 000"],
      1,
      "Books balance = statement balance + outstanding deposits − outstanding cheques = R5 000 + R2 000 − R3 000 = R4 000.",
    ],
    [
      "A debtor's cheque is returned by the bank marked R/D (refer to drawer). The business must:",
      [
        "record it in the Cash Payments Journal and add the amount back to the debtor's account",
        "record it in the Cash Receipts Journal as extra income",
        "ignore it until the debtor is contacted",
        "deduct the amount from a creditor's account",
      ],
      0,
      "An R/D cheque means the receipt was dishonoured: the business cancels it through the Cash Payments Journal and restores the amount owing on the debtor's account.",
    ],
    [
      "In the Bank Reconciliation Statement, a deposit not yet credited by the bank is:",
      [
        "subtracted from the favourable bank statement balance",
        "left out of the reconciliation",
        "recorded in the Cash Payments Journal",
        "added to the favourable bank statement balance",
      ],
      3,
      "An outstanding deposit will increase the bank statement balance once processed, so it is added to the favourable bank statement balance in the reconciliation.",
    ],
    [
      "Interest earned on a favourable bank balance, shown on the bank statement, is entered in the:",
      ["Cash Payments Journal", "General Journal", "Cash Receipts Journal", "Creditors Journal"],
      2,
      "Interest on a favourable balance is income received into the bank account, so it is recorded in the Cash Receipts Journal.",
    ],
  ],
  "Fixed Assets & Depreciation": [
    [
      "Depreciation is best described as:",
      [
        "cash set aside to replace an asset",
        "the allocation of a fixed asset's cost over its useful life",
        "the loss of cash when an asset is sold",
        "the increase in an asset's market value",
      ],
      1,
      "Depreciation spreads (allocates) the cost of a fixed asset over the years in which it is used — it is a non-cash expense.",
    ],
    [
      "Equipment cost R40 000. Depreciation is calculated at 10% p.a. on cost. The annual depreciation is:",
      ["R400", "R36 000", "R44 000", "R4 000"],
      3,
      "Depreciation on cost (straight line) = R40 000 × 10% = R4 000 per year.",
    ],
    [
      "A vehicle cost R100 000 and has accumulated depreciation of R20 000. Depreciation at 20% p.a. on the diminishing balance for the year is:",
      ["R16 000", "R20 000", "R4 000", "R24 000"],
      0,
      "Diminishing balance = (R100 000 − R20 000) × 20% = R80 000 × 20% = R16 000.",
    ],
    [
      "A machine costing R120 000 was bought on 1 July. The financial year ends on 31 December. Depreciation at 15% p.a. on cost for this financial year is:",
      ["R18 000", "R4 500", "R9 000", "R13 500"],
      2,
      "The machine was used for 6 months: R120 000 × 15% × 6/12 = R9 000.",
    ],
    [
      "An asset cost R60 000 and has accumulated depreciation of R25 000. Its carrying (book) value is:",
      ["R35 000", "R60 000", "R85 000", "R25 000"],
      0,
      "Carrying value = cost − accumulated depreciation = R60 000 − R25 000 = R35 000.",
    ],
    [
      "In the Statement of Financial Position, accumulated depreciation is:",
      [
        "shown as a current liability",
        "shown as an operating expense",
        "added to the cost of the asset",
        "deducted from the cost of the asset",
      ],
      3,
      "Accumulated depreciation is deducted from the cost of the asset to show its carrying value in the Statement of Financial Position.",
    ],
    [
      "An asset with a carrying value of R8 000 is sold for R10 000 cash. The result is:",
      ["a loss on sale of R2 000", "a profit on sale of R2 000", "a profit on sale of R10 000", "no profit or loss"],
      1,
      "Profit on sale = selling price − carrying value = R10 000 − R8 000 = R2 000 profit.",
    ],
    [
      "When a fixed asset is sold, its cost price and accumulated depreciation are transferred to the:",
      ["Trading account", "Capital account", "Asset Disposal account", "Drawings account"],
      2,
      "The Asset Disposal account collects the cost, accumulated depreciation and selling price so the profit or loss on the sale can be calculated.",
    ],
  ],
  "Partnerships": [
    [
      "Profits in a partnership are divided according to:",
      [
        "the number of hours each partner works",
        "SARS regulations",
        "equal shares in all cases",
        "the partnership agreement",
      ],
      3,
      "The partnership agreement sets out how profits are shared — for example salaries, interest on capital and the profit-sharing ratio.",
    ],
    [
      "A partner's salary, interest on capital, share of the remaining profit and drawings are all recorded in the partner's:",
      ["Capital account", "Drawings account", "Current account", "Loan account"],
      2,
      "Each partner's Current account records earnings (salary, interest on capital, profit share) and drawings; the Capital account stays fixed at the contributed amount.",
    ],
    [
      "Partner A's capital balance is R200 000 and interest on capital is 10% p.a. The interest on capital for the year is:",
      ["R2 000", "R20 000", "R200 000", "R10 000"],
      1,
      "Interest on capital = R200 000 × 10% = R20 000 for the year.",
    ],
    [
      "Net profit is R300 000. Partners' salaries total R100 000 and interest on capital totals R50 000. The remaining profit is shared equally between the two partners. Each partner's share of the remaining profit is:",
      ["R75 000", "R150 000", "R100 000", "R125 000"],
      0,
      "Remaining profit = R300 000 − R100 000 − R50 000 = R150 000, shared equally: R150 000 ÷ 2 = R75 000 each.",
    ],
    [
      "The division of a partnership's net profit between the partners is shown in the:",
      ["Trading account", "Bank account", "Appropriation account", "Asset Disposal account"],
      2,
      "The Appropriation account divides the net profit into salaries, interest on capital and shares of the remaining profit.",
    ],
    [
      "A partner's drawings are closed off at the end of the year to the:",
      [
        "credit side of the Appropriation account",
        "debit side of the partner's Current account",
        "credit side of the Bank account",
        "debit side of the Trading account",
      ],
      1,
      "Drawings are closed off to the debit side of that partner's Current account, reducing the amount owed to the partner.",
    ],
    [
      "Unlimited liability in a partnership means that:",
      [
        "partners may not be sued for business debts",
        "the partnership pays no income tax",
        "partners' losses are limited to their capital contributions",
        "partners can be held personally liable for the debts of the partnership",
      ],
      3,
      "With unlimited liability, partners' personal possessions can be used to pay the partnership's debts if the business cannot.",
    ],
    [
      "A profit of R120 000 is shared between two partners in the ratio 3 : 2. The bigger share is:",
      ["R72 000", "R48 000", "R60 000", "R80 000"],
      0,
      "Total parts = 3 + 2 = 5. The bigger share = 3/5 × R120 000 = R72 000.",
    ],
  ],
  "Clubs (Non-profit Organisations)": [
    [
      "The main aim of a non-profit organisation such as a sports club is to:",
      [
        "make the highest possible profit for its owners",
        "provide services to its members",
        "pay dividends to shareholders",
        "trade in goods for profit",
      ],
      1,
      "A non-profit organisation exists to provide services to its members, not to make a profit for owners or shareholders.",
    ],
    [
      "The club equivalent of a business's Capital account is the:",
      ["Accumulated Fund", "Capital Fund Reserve", "Trading account", "Appropriation account"],
      0,
      "A club's Accumulated Fund plays the same role as the Capital account of a business — it represents the club's net worth.",
    ],
    [
      "A club calculates its surplus or deficit in the:",
      [
        "Receipts and Payments account",
        "Bank account",
        "Trading account",
        "Statement of Income and Expenditure",
      ],
      3,
      "The Statement of Income and Expenditure matches the year's income against expenditure to show a surplus or a deficit.",
    ],
    [
      "Membership fees received in advance for next year are shown at the year-end as:",
      ["income for the current year", "a fixed asset", "a current liability", "a current asset"],
      2,
      "Fees received in advance are deferred income — the club still owes the members next year's membership, so it is a current liability.",
    ],
    [
      "Membership fees still owed by members at the year-end (accrued income) are shown as:",
      ["a current asset", "a current liability", "an expense", "a deficit"],
      0,
      "Accrued income (fees earned but not yet received) is an amount owing to the club, so it is shown as a current asset.",
    ],
    [
      "A club received R18 000 in membership fees during the year. Of this, R1 500 was for next year, and members still owe R2 000 for the current year. The membership fee income for the current year is:",
      ["R18 000", "R21 500", "R18 500", "R14 500"],
      2,
      "Income = R18 000 received − R1 500 for next year + R2 000 still owed for this year = R18 500.",
    ],
    [
      "The Receipts and Payments account of a club is best described as:",
      [
        "a statement of profit for the year",
        "a summary of all cash received and paid during the year",
        "a list of the club's members",
        "a statement of assets and liabilities",
      ],
      1,
      "The Receipts and Payments account is simply a summary of the cash (bank) transactions of the club for the year.",
    ],
    [
      "When a club's expenditure for the year is more than its income, the difference is called a:",
      ["surplus", "net profit", "drawing", "deficit"],
      3,
      "Expenditure greater than income gives a deficit; the opposite (income greater than expenditure) is a surplus.",
    ],
  ],
  "Cost Accounting (Manufacturing)": [
    [
      "Direct material cost plus direct labour cost is known as:",
      ["prime cost", "overhead cost", "period cost", "total cost of production"],
      0,
      "Prime cost = direct material cost + direct labour cost — the costs traced directly to the product.",
    ],
    [
      "Factory rent and the wages of factory cleaners are examples of:",
      ["direct labour costs", "direct material costs", "factory overhead costs", "selling and distribution costs"],
      2,
      "Costs needed to run the factory that cannot be traced to a specific product — like factory rent and cleaners' wages — are factory overhead costs.",
    ],
    [
      "Direct materials cost R50 000 and direct labour cost R30 000. The prime cost is:",
      ["R20 000", "R80 000", "R50 000", "R30 000"],
      1,
      "Prime cost = direct materials + direct labour = R50 000 + R30 000 = R80 000.",
    ],
    [
      "Prime cost is R80 000 and factory overhead costs are R25 000. The total cost of production is:",
      ["R55 000", "R80 000", "R25 000", "R105 000"],
      3,
      "Total cost of production = prime cost + factory overheads = R80 000 + R25 000 = R105 000.",
    ],
    [
      "The salary of the factory foreman who supervises all production workers is classified as:",
      ["direct labour", "direct materials", "indirect labour (factory overheads)", "administration cost"],
      2,
      "The foreman does not work on one specific product, so his salary is indirect labour, which forms part of factory overheads.",
    ],
    [
      "Advertising the finished product is classified as a:",
      ["selling and distribution cost", "direct material cost", "factory overhead cost", "prime cost"],
      0,
      "Advertising happens after production and relates to selling the product, so it is a selling and distribution cost — not a manufacturing cost.",
    ],
    [
      "The total cost of production is R150 000 for 5 000 units produced. The unit cost of production is:",
      ["R3", "R300", "R50", "R30"],
      3,
      "Unit cost = total cost ÷ units produced = R150 000 ÷ 5 000 = R30 per unit.",
    ],
    [
      "A fixed cost is a cost that:",
      [
        "increases in total as production increases",
        "remains the same in total regardless of the level of production",
        "is the same per unit at all production levels",
        "only applies to direct materials",
      ],
      1,
      "A fixed cost (such as factory rent) stays the same in total whether production rises or falls; its cost per unit changes as output changes.",
    ],
  ],
  "Cash Budgets & VAT": [
    [
      "A cash budget shows:",
      [
        "the profit for the past year",
        "the assets and liabilities of a business",
        "the expected cash receipts and payments for a future period",
        "actual income and expenses already recorded",
      ],
      2,
      "A cash budget is a plan of the expected cash receipts and cash payments for a future period.",
    ],
    [
      "Which item is never included in a cash budget?",
      ["wages paid", "depreciation", "cash sales", "rent paid"],
      1,
      "Depreciation is a non-cash item — no money flows in or out — so it never appears in a cash budget.",
    ],
    [
      "The opening bank balance is R5 000, expected receipts are R80 000 and expected payments are R65 000. The expected closing bank balance is:",
      ["R15 000", "R150 000", "R10 000", "R20 000"],
      3,
      "Closing balance = opening balance + receipts − payments = R5 000 + R80 000 − R65 000 = R20 000.",
    ],
    [
      "Total sales for March are R60 000: 40% for cash and 60% on credit, collected one month after the sale. The cash expected from March credit sales during April is:",
      ["R36 000", "R24 000", "R60 000", "R30 000"],
      0,
      "Credit sales for March = 60% × R60 000 = R36 000, and these are collected one month later, in April.",
    ],
    [
      "The standard rate of VAT in South Africa is:",
      ["14%", "15%", "20%", "10%"],
      1,
      "The standard VAT rate in South Africa is 15% (it was increased from 14% in 2018).",
    ],
    [
      "Which item is zero-rated for VAT?",
      ["brown bread", "restaurant meals", "cooldrinks", "cellphones"],
      0,
      "Basic foodstuffs such as brown bread are zero-rated (VAT charged at 0%) to keep essentials affordable.",
    ],
    [
      "An item is priced at R400 excluding VAT. The selling price including 15% VAT is:",
      ["R415", "R400", "R340", "R460"],
      3,
      "Price including VAT = R400 × 1,15 = R460 (the VAT is R400 × 15% = R60).",
    ],
    [
      "An item sells for R1 150 including 15% VAT. The VAT included in the price is:",
      ["R172,50", "R115", "R150", "R1 000"],
      2,
      "VAT = R1 150 × 15/115 = R150 (the price excluding VAT is R1 000, and R1 000 × 15% = R150).",
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
