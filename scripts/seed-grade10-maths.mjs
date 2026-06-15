// Seeds the Grade 10 Mathematics question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only (calculations, definitions, formula use).
// Grade 10 level — foundational; questions/numbers DISTINCT from the Gr11 bank.
// Includes Statistics & Probability (not in the Gr11 bank) for clear distinctness.
// Every numeric answer double-checked by computation during drafting.
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but NOT option order).
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade10-maths.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Mathematics";
const GRADE = "Grade 10";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Algebraic Expressions & Exponents": [
    [
      "Simplify: 3x + 5x − 2x.",
      ["6x", "10x", "8x", "x"],
      0,
      "Add and subtract the like terms: (3 + 5 − 2)x = 6x.",
    ],
    [
      "Expand: 2(x + 4).",
      ["2x + 4", "2x + 8", "x + 8", "2x + 6"],
      1,
      "Multiply each term inside the bracket by 2: 2·x + 2·4 = 2x + 8.",
    ],
    [
      "Simplify: x⁵ ÷ x².",
      ["x⁷", "x²", "x³", "x¹⁰"],
      2,
      "When dividing powers with the same base, subtract the exponents: x⁵ ÷ x² = x^(5−2) = x³.",
    ],
    [
      "Factorise: 6x + 9.",
      ["6(x + 9)", "3(2x + 9)", "x(6 + 9)", "3(2x + 3)"],
      3,
      "The highest common factor of 6x and 9 is 3: 6x + 9 = 3(2x + 3).",
    ],
    [
      "Simplify: (x³)⁴.",
      ["x¹²", "x⁷", "x⁸¹", "x⁶⁴"],
      0,
      "Raise a power to a power by multiplying the exponents: (x³)⁴ = x^(3×4) = x¹².",
    ],
    [
      "Simplify: 2a × 3a².",
      ["5a³", "6a³", "6a²", "5a²"],
      1,
      "Multiply the coefficients (2 × 3 = 6) and add the exponents (a¹ · a² = a³): 6a³.",
    ],
    [
      "Evaluate: 2⁴.",
      ["6", "8", "16", "32"],
      2,
      "2⁴ = 2 × 2 × 2 × 2 = 16.",
    ],
    [
      "Simplify: 5x²y · 2xy³.",
      ["7x³y⁴", "10x²y³", "10x³y³", "10x³y⁴"],
      3,
      "Multiply the coefficients (5 × 2 = 10) and add the exponents per variable (x²·x = x³, y·y³ = y⁴): 10x³y⁴.",
    ],
  ],
  "Equations & Inequalities": [
    [
      "Solve for x: x + 7 = 12.",
      ["x = 5", "x = 19", "x = 7", "x = 84"],
      0,
      "Subtract 7 from both sides: x = 12 − 7 = 5.",
    ],
    [
      "Solve for x: 3x = 21.",
      ["x = 18", "x = 7", "x = 24", "x = 63"],
      1,
      "Divide both sides by 3: x = 21 ÷ 3 = 7.",
    ],
    [
      "Solve for x: 4x − 3 = 9.",
      ["x = 1.5", "x = 4", "x = 3", "x = 12"],
      2,
      "Add 3 to both sides: 4x = 12. Divide by 4: x = 3.",
    ],
    [
      "Solve for x: x/2 = 6.",
      ["x = 3", "x = 6", "x = 8", "x = 12"],
      3,
      "Multiply both sides by 2: x = 6 × 2 = 12.",
    ],
    [
      "Solve for x: x² = 49.",
      ["x = ±7", "x = 7 only", "x = 24.5", "x = ±24.5"],
      0,
      "Take the square root of both sides: x = ±7 (both +7 and −7 satisfy x² = 49).",
    ],
    [
      "Solve the inequality: x + 3 > 8.",
      ["x > 11", "x > 5", "x < 5", "x > 24"],
      1,
      "Subtract 3 from both sides: x > 5.",
    ],
    [
      "Solve the inequality: 2x ≤ 10.",
      ["x ≥ 5", "x ≤ 20", "x ≤ 5", "x ≥ 20"],
      2,
      "Divide both sides by 2 (a positive number, so the inequality sign stays the same): x ≤ 5.",
    ],
    [
      "Solve the simultaneous equations: x + y = 7 and x − y = 3.",
      ["x = 2, y = 5", "x = 7, y = 3", "x = 4, y = 4", "x = 5, y = 2"],
      3,
      "Add the two equations: 2x = 10, so x = 5. Then y = 7 − 5 = 2.",
    ],
  ],
  "Functions & Graphs": [
    [
      "For the straight line y = 3x − 2, the gradient is:",
      ["3", "−2", "2", "1"],
      0,
      "In the form y = mx + c, the gradient is m, so here the gradient is 3.",
    ],
    [
      "For the straight line y = 3x − 2, the y-intercept is:",
      ["3", "−2", "2", "0"],
      1,
      "In the form y = mx + c, the y-intercept is c. Setting x = 0 gives y = −2.",
    ],
    [
      "The parabola y = x² + 1 has its turning point at:",
      ["(1, 1)", "(1, 0)", "(0, 1)", "(0, 0)"],
      2,
      "y = x² + 1 is the basic parabola shifted up by 1, so its turning point is at (0, 1).",
    ],
    [
      "The graph of a function of the form y = a/x is called a:",
      ["parabola", "straight line", "exponential curve", "hyperbola"],
      3,
      "A function of the form y = a/x is a hyperbola.",
    ],
    [
      "Where does the line y = x + 4 cross the y-axis?",
      ["(0, 4)", "(4, 0)", "(0, −4)", "(1, 4)"],
      0,
      "The y-intercept occurs where x = 0: y = 0 + 4 = 4, i.e. the point (0, 4).",
    ],
    [
      "The parabola y = x² − 16 cuts the x-axis at:",
      ["x = ±16", "x = ±4", "x = 4 only", "x = ±8"],
      1,
      "Set y = 0: x² − 16 = 0, so x² = 16 and x = ±4.",
    ],
    [
      "A straight-line graph that slopes downwards from left to right has a gradient that is:",
      ["zero", "positive", "negative", "undefined"],
      2,
      "A line that falls from left to right has a negative gradient.",
    ],
    [
      "The point where a graph crosses the x-axis is called the:",
      ["y-intercept", "turning point", "gradient", "x-intercept"],
      3,
      "The x-intercept is the point where the graph cuts the x-axis (where y = 0).",
    ],
  ],
  "Trigonometry": [
    [
      "In a right-angled triangle, cos θ is defined as:",
      [
        "adjacent ÷ hypotenuse",
        "opposite ÷ hypotenuse",
        "opposite ÷ adjacent",
        "hypotenuse ÷ adjacent",
      ],
      0,
      "cos θ = adjacent ÷ hypotenuse (the \"CAH\" in SOH-CAH-TOA).",
    ],
    [
      "In a right-angled triangle, tan θ is defined as:",
      [
        "adjacent ÷ opposite",
        "opposite ÷ adjacent",
        "opposite ÷ hypotenuse",
        "adjacent ÷ hypotenuse",
      ],
      1,
      "tan θ = opposite ÷ adjacent (the \"TOA\" in SOH-CAH-TOA).",
    ],
    [
      "The value of sin 90° is:",
      ["0", "½", "1", "√3/2"],
      2,
      "sin 90° = 1, a standard special-angle value.",
    ],
    [
      "The value of cos 0° is:",
      ["0", "½", "√3/2", "1"],
      3,
      "cos 0° = 1, a standard special-angle value.",
    ],
    [
      "If the adjacent side is 4 and the hypotenuse is 5, then cos θ =",
      ["0.8", "0.6", "1.25", "0.75"],
      0,
      "cos θ = adjacent ÷ hypotenuse = 4 ÷ 5 = 0.8.",
    ],
    [
      "The value of tan 0° is:",
      ["1", "0", "undefined", "√3"],
      1,
      "tan 0° = 0, because the opposite side is 0 at an angle of 0°.",
    ],
    [
      "The value of sin 0° is:",
      ["1", "½", "0", "√3/2"],
      2,
      "sin 0° = 0, a standard special-angle value.",
    ],
    [
      "If the opposite side is 6 and the adjacent side is 8, then tan θ =",
      ["8/6", "6/10", "8/10", "6/8"],
      3,
      "tan θ = opposite ÷ adjacent = 6 ÷ 8 = 6/8 (= 0.75).",
    ],
  ],
  "Finance & Growth": [
    [
      "VAT (Value-Added Tax) in South Africa is currently charged at a rate of:",
      ["15%", "10%", "14%", "20%"],
      0,
      "VAT in South Africa is 15% (raised from 14% in 2018).",
    ],
    [
      "The VAT on an item costing R200 (excluding VAT), at 15%, is:",
      ["R15", "R30", "R23", "R215"],
      1,
      "VAT = 15% of R200 = 0.15 × 200 = R30.",
    ],
    [
      "R3 000 is invested at 8% simple interest per year for 2 years. The interest earned is:",
      ["R240", "R3 480", "R480", "R600"],
      2,
      "Simple interest = P × i × n = 3 000 × 0.08 × 2 = R480.",
    ],
    [
      "If 1 US dollar costs R18, then R90 can buy:",
      ["R18", "$18", "$90", "$5"],
      3,
      "Number of dollars = R90 ÷ R18 per dollar = $5.",
    ],
    [
      "An item is marked R500 excluding VAT. The total price including 15% VAT is:",
      ["R575", "R515", "R530", "R750"],
      0,
      "VAT = 0.15 × 500 = R75, so the total = 500 + 75 = R575.",
    ],
    [
      "R2 000 is invested at 10% per year compound interest for 2 years. The accumulated amount is:",
      ["R2 200", "R2 420", "R2 400", "R2 020"],
      1,
      "A = P(1 + i)ⁿ = 2 000 × (1.10)² = 2 000 × 1.21 = R2 420.",
    ],
    [
      "The price of a loaf of bread rises from R15 to R18. The increase as a percentage of the original price is:",
      ["3%", "15%", "20%", "30%"],
      2,
      "Increase = R3; percentage increase = (3 ÷ 15) × 100 = 20%.",
    ],
    [
      "Buying goods now and paying them off in instalments with interest added is known as:",
      ["a cash sale", "a discount", "a deposit", "hire purchase"],
      3,
      "Hire purchase means paying for goods in instalments over time, usually with interest added to the cash price.",
    ],
  ],
  "Statistics & Probability": [
    [
      "The mean (average) of the data set 4, 6, 8, 10 is:",
      ["7", "8", "6", "28"],
      0,
      "Mean = (4 + 6 + 8 + 10) ÷ 4 = 28 ÷ 4 = 7.",
    ],
    [
      "The median of the data set 3, 5, 7, 9, 11 is:",
      ["5", "7", "9", "35"],
      1,
      "The median is the middle value when the data is arranged in order; for 3, 5, 7, 9, 11 the middle value is 7.",
    ],
    [
      "The mode of the data set 2, 3, 3, 5, 7 is:",
      ["2", "5", "3", "7"],
      2,
      "The mode is the value that appears most often; here 3 appears twice, so the mode is 3.",
    ],
    [
      "The range of the data set 12, 5, 8, 20, 3 is:",
      ["5", "12", "20", "17"],
      3,
      "Range = highest value − lowest value = 20 − 3 = 17.",
    ],
    [
      "When tossing a fair coin once, the probability of getting heads is:",
      ["½", "1", "0", "2"],
      0,
      "There are 2 equally likely outcomes (heads or tails), so P(heads) = 1 out of 2 = ½.",
    ],
    [
      "When rolling a normal six-sided die once, the probability of rolling a 4 is:",
      ["1/4", "1/6", "4/6", "1/2"],
      1,
      "There are 6 equally likely outcomes, and only one is a 4, so P(4) = 1/6.",
    ],
    [
      "A probability value can never be:",
      ["equal to 0", "equal to 1", "greater than 1", "equal to ½"],
      2,
      "A probability is always between 0 and 1 (inclusive), so it can never be greater than 1.",
    ],
    [
      "The mean of the data set 10, 20, 30 is:",
      ["10", "30", "60", "20"],
      3,
      "Mean = (10 + 20 + 30) ÷ 3 = 60 ÷ 3 = 20.",
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
