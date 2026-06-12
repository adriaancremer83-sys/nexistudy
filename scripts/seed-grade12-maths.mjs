// Seeds the Grade 12 Mathematics question bank (6 topics x 8 questions).
// Safe to re-run: topics are upserted, questions are replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade12-maths.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Mathematics";
const GRADE = "Grade 12";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Sequences & Series": [
    [
      "The arithmetic sequence 3; 7; 11; ... continues. What is the 20th term?",
      ["76", "79", "83", "80"],
      1,
      "Use Tn = a + (n−1)d with a = 3 and d = 4. T20 = 3 + 19 × 4 = 3 + 76 = 79.",
    ],
    [
      "In a geometric sequence the 2nd term is 6 and the 5th term is 48. What is the first term?",
      ["2", "3", "6", "1.5"],
      1,
      "T5 ÷ T2 = r³ = 48 ÷ 6 = 8, so r = 2. Then a = T2 ÷ r = 6 ÷ 2 = 3.",
    ],
    [
      "Calculate the sum of the arithmetic series 5 + 8 + 11 + ... + 62.",
      ["640", "685", "670", "700"],
      2,
      "Find n first: 62 = 5 + (n−1)(3) gives n = 20. Then Sn = n/2 × (first + last) = 20/2 × (5 + 62) = 10 × 67 = 670.",
    ],
    [
      "Find the sum to infinity of the series 16 + 8 + 4 + 2 + ...",
      ["32", "28", "36", "24"],
      0,
      "This is geometric with a = 16 and r = ½. S∞ = a/(1−r) = 16 ÷ ½ = 32.",
    ],
    [
      "For which values of r does the sum to infinity of a geometric series exist?",
      ["r > 1", "r < −1", "−1 < r < 1, r ≠ 0", "r = 1"],
      2,
      "S∞ only converges when the terms shrink, which needs −1 < r < 1 (and r ≠ 0). Outside that range the terms grow and the sum runs away to infinity.",
    ],
    [
      "The quadratic sequence 2; 6; 12; 20; ... continues. What is the next term?",
      ["26", "28", "30", "32"],
      2,
      "First differences are 4; 6; 8 — they increase by 2 each time, so the next difference is 10. Next term = 20 + 10 = 30.",
    ],
    [
      "Evaluate: Σ (2k + 1) for k = 1 to 10.",
      ["121", "120", "110", "130"],
      1,
      "Σ2k = 2(1+2+...+10) = 2 × 55 = 110, and Σ1 = 10. Total = 110 + 10 = 120.",
    ],
    [
      "In an arithmetic sequence T3 = 10 and T7 = 26. What is the first term?",
      ["2", "4", "6", "3"],
      0,
      "T7 − T3 = 4d = 16, so d = 4. Then a = T3 − 2d = 10 − 8 = 2.",
    ],
  ],
  "Functions & Graphs": [
    [
      "If f(x) = 3x − 6, what is f⁻¹(x)?",
      ["(x − 6)/3", "(x + 6)/3", "3x + 6", "1/(3x − 6)"],
      1,
      "Swap x and y, then solve for y: x = 3y − 6 gives y = (x + 6)/3. Check: f((x+6)/3) = x. ✓",
    ],
    [
      "Why must the domain of f(x) = x² be restricted (e.g. to x ≥ 0) before finding its inverse?",
      [
        "So that the inverse is also a function",
        "Because x² is undefined for negative x",
        "To make the graph pass through the origin",
        "Because the inverse must have a positive gradient",
      ],
      0,
      "f(x) = x² is many-to-one (both 2 and −2 map to 4). Its full reflection in y = x would be one-to-many — not a function. Restricting to x ≥ 0 makes f one-to-one, so the inverse √x is a function.",
    ],
    [
      "What are the asymptotes of y = 2/(x − 3) + 1?",
      ["x = −3 and y = 1", "x = 3 and y = 1", "x = 3 and y = 2", "x = 1 and y = 3"],
      1,
      "The vertical asymptote is where the denominator is zero: x = 3. The horizontal asymptote is the vertical shift: y = 1.",
    ],
    [
      "What is the inverse of y = 2ˣ?",
      ["y = x²", "y = 2⁻ˣ", "y = log₂ x", "y = x/2"],
      2,
      "The inverse of an exponential function is the logarithm with the same base: swap x and y in y = 2ˣ to get x = 2ʸ, so y = log₂ x.",
    ],
    [
      "What is the range of f(x) = −x² + 4?",
      ["y ≥ 4", "y ≤ 4", "y ≥ −4", "all real numbers"],
      1,
      "The parabola opens downwards (negative coefficient) with maximum value 4 at x = 0, so y can be anything up to and including 4: y ≤ 4.",
    ],
    [
      "If f(x) = log₃ x, what is f(27)?",
      ["9", "81", "3", "1/3"],
      2,
      "log₃ 27 asks: 3 to what power gives 27? Since 3³ = 27, the answer is 3.",
    ],
    [
      "The graph of y = a/(x + p) + q has asymptotes x = −2 and y = 3. What are p and q?",
      ["p = −2, q = 3", "p = 2, q = 3", "p = 3, q = −2", "p = −3, q = 2"],
      1,
      "The vertical asymptote is x = −p, so −p = −2 gives p = 2. The horizontal asymptote is y = q, so q = 3.",
    ],
    [
      "What is the turning point of f(x) = x² − 4x + 1?",
      ["(2; −3)", "(−2; 13)", "(2; 1)", "(4; 1)"],
      0,
      "x = −b/(2a) = 4/2 = 2, and f(2) = 4 − 8 + 1 = −3. Turning point: (2; −3).",
    ],
  ],
  "Finance, Growth & Decay": [
    [
      "R5 000 is invested at 8% p.a. compounded annually. How much is it worth after 3 years?",
      ["R6 200.00", "R6 298.56", "R6 480.00", "R5 400.00"],
      1,
      "A = P(1 + i)ⁿ = 5000 × (1.08)³ = 5000 × 1.259712 = R6 298.56. (R6 200 is the simple-interest trap.)",
    ],
    [
      "A car worth R200 000 depreciates at 15% p.a. on the reducing balance. Its value after 4 years is:",
      ["R80 000.00", "R140 000.00", "R104 401.25", "R110 000.00"],
      2,
      "A = P(1 − i)ⁿ = 200 000 × (0.85)⁴ = 200 000 × 0.52200625 = R104 401.25. (R80 000 would be straight-line depreciation.)",
    ],
    [
      "What is the effective annual rate of 12% p.a. compounded monthly? (to 2 decimals)",
      ["12.00%", "13.00%", "12.55%", "12.68%"],
      3,
      "Effective rate = (1 + 0.12/12)¹² − 1 = (1.01)¹² − 1 = 0.126825... ≈ 12.68%. Monthly compounding earns interest on interest within the year.",
    ],
    [
      "Equipment worth R150 000 depreciates on the straight-line method at 10% p.a. Its value after 5 years is:",
      ["R75 000", "R88 573.50", "R90 000", "R97 500"],
      0,
      "Straight line: A = P(1 − i×n) = 150 000 × (1 − 0.10 × 5) = 150 000 × 0.5 = R75 000. (R88 573.50 would be reducing balance.)",
    ],
    [
      "R10 000 grows to R13 310 at 10% p.a. compounded annually. For how many years was it invested?",
      ["2", "4", "3", "5"],
      2,
      "13 310 / 10 000 = 1.331 = (1.1)ⁿ. Since 1.1³ = 1.331, n = 3 years.",
    ],
    [
      "Which formula gives the future value of equal monthly deposits of x at interest i per month for n months?",
      [
        "F = x[(1 + i)ⁿ − 1] / i",
        "F = P(1 + i)ⁿ",
        "F = x[1 − (1 + i)⁻ⁿ] / i",
        "F = P(1 + i·n)",
      ],
      0,
      "Regular deposits form an annuity: F = x[(1+i)ⁿ − 1]/i. The third option is the present-value annuity formula (used for loan repayments), a common mix-up.",
    ],
    [
      "An interest rate of 10% p.a. compounded quarterly is used for a 5-year investment. What are i (per period) and n?",
      ["i = 0.10, n = 5", "i = 0.025, n = 20", "i = 0.025, n = 5", "i = 0.10, n = 20"],
      1,
      "Quarterly means 4 periods per year: i = 0.10/4 = 0.025 and n = 5 × 4 = 20 periods.",
    ],
    [
      "If interest is compounded more frequently (monthly instead of annually) at the same nominal rate, the effective annual rate:",
      ["stays the same", "decreases", "increases", "becomes zero"],
      2,
      "More frequent compounding means interest starts earning interest sooner within the year, so the effective annual rate rises above the nominal rate.",
    ],
  ],
  "Differential Calculus": [
    [
      "If f(x) = 3x², then f′(x) = ?",
      ["3x", "6x", "6x²", "x³"],
      1,
      "Power rule: bring the exponent down and reduce it by one. f′(x) = 2 × 3x¹ = 6x.",
    ],
    [
      "If f(x) = 2x³ − 3x² + 5, then f′(x) = ?",
      ["6x² − 6x", "2x² − 3x", "6x² − 6x + 5", "6x³ − 6x²"],
      0,
      "Differentiate term by term: 6x² − 6x + 0. The constant 5 disappears — its gradient is zero.",
    ],
    [
      "Using first principles on f(x) = x², the limit of [(x+h)² − x²]/h as h → 0 equals:",
      ["x", "2x + h", "x²", "2x"],
      3,
      "(x+h)² − x² = 2xh + h². Divide by h: 2x + h. As h → 0 this becomes 2x.",
    ],
    [
      "The turning points of f(x) = x³ − 3x are at:",
      ["x = 1 and x = −1", "x = 0 only", "x = 3 and x = −3", "x = √3 only"],
      0,
      "f′(x) = 3x² − 3 = 0 gives x² = 1, so x = 1 or x = −1.",
    ],
    [
      "What is the gradient of the tangent to f(x) = x² + 3x at the point where x = 2?",
      ["10", "7", "5", "4"],
      1,
      "f′(x) = 2x + 3. At x = 2: f′(2) = 4 + 3 = 7.",
    ],
    [
      "If f(x) = 4/x, then f′(x) = ?",
      ["−4/x²", "4/x²", "−4x", "4 ln x"],
      0,
      "Rewrite as f(x) = 4x⁻¹. Power rule: f′(x) = −4x⁻² = −4/x².",
    ],
    [
      "f(x) = x³ − 6x² + 9x has a local maximum at which x-value?",
      ["x = 3", "x = 0", "x = 1", "x = 2"],
      2,
      "f′(x) = 3x² − 12x + 9 = 3(x − 1)(x − 3) = 0 at x = 1 and x = 3. The gradient changes from + to − at x = 1, so that's the local maximum (x = 3 is the minimum).",
    ],
    [
      "Two positive numbers add up to 10. What is the maximum possible value of their product?",
      ["24", "30", "21", "25"],
      3,
      "Let the numbers be x and 10 − x. P = 10x − x², P′ = 10 − 2x = 0 gives x = 5. Maximum product = 5 × 5 = 25.",
    ],
  ],
  "Trigonometry": [
    [
      "Simplify: sin²x + cos²x",
      ["0", "1", "sin 2x", "cos²x − sin²x"],
      1,
      "This is the fundamental Pythagorean identity: sin²x + cos²x = 1 for every value of x.",
    ],
    [
      "If sin θ = 3/5 and 90° < θ < 180°, what is cos θ?",
      ["4/5", "−3/4", "−4/5", "3/4"],
      2,
      "From sin²θ + cos²θ = 1: cos²θ = 1 − 9/25 = 16/25, so cos θ = ±4/5. In the second quadrant cosine is negative: −4/5.",
    ],
    [
      "sin(180° − x) is equal to:",
      ["sin x", "−sin x", "cos x", "−cos x"],
      0,
      "Reduction formula: in the second quadrant sine stays positive, so sin(180° − x) = sin x.",
    ],
    [
      "cos(A − B) expands to:",
      [
        "cos A cos B − sin A sin B",
        "cos A cos B + sin A sin B",
        "sin A cos B + cos A sin B",
        "sin A sin B − cos A cos B",
      ],
      1,
      "Compound angle formula: cos(A − B) = cos A cos B + sin A sin B. Watch the sign — cos(A + B) is the one with the minus.",
    ],
    [
      "sin 2x is identically equal to:",
      ["2 sin x cos x", "sin²x − cos²x", "2 sin x", "sin x cos x"],
      0,
      "Double angle formula: sin 2x = 2 sin x cos x (it comes from sin(A + B) with A = B = x).",
    ],
    [
      "The general solution of sin x = ½ is:",
      [
        "x = 30° + k·360° or x = 150° + k·360°, k ∈ ℤ",
        "x = 30° + k·360° only, k ∈ ℤ",
        "x = 60° + k·360° or x = 120° + k·360°, k ∈ ℤ",
        "x = 30° + k·180°, k ∈ ℤ",
      ],
      0,
      "Sine is positive in quadrants I and II: reference angle 30° gives x = 30° and x = 180° − 30° = 150°, each repeating every 360°.",
    ],
    [
      "A triangle has sides a = 8, b = 5 and included angle C = 30°. Its area is:",
      ["20", "10", "17.32", "40"],
      1,
      "Area = ½ab sin C = ½ × 8 × 5 × sin 30° = 20 × 0.5 = 10 square units. (17.32 is the trap if you use cos 30°.)",
    ],
    [
      "cos 2x written in terms of cos x only is:",
      ["1 − 2cos²x", "2cos²x − 1", "cos²x + sin²x", "2sin²x − 1"],
      1,
      "cos 2x = cos²x − sin²x; replace sin²x with 1 − cos²x to get 2cos²x − 1.",
    ],
  ],
  "Probability & Counting": [
    [
      "P(A) = 0.4, P(B) = 0.5 and P(A and B) = 0.2. What is P(A or B)?",
      ["0.9", "0.7", "0.2", "1.1"],
      1,
      "Addition rule: P(A or B) = P(A) + P(B) − P(A and B) = 0.4 + 0.5 − 0.2 = 0.7. Subtracting the overlap stops it being counted twice.",
    ],
    [
      "Events A and B are mutually exclusive. This means:",
      ["P(A and B) = 0", "P(A) = P(B)", "P(A and B) = P(A) × P(B)", "P(A or B) = 0"],
      0,
      "Mutually exclusive events cannot happen together, so the probability of both occurring is zero.",
    ],
    [
      "A and B are independent with P(A) = 0.3 and P(B) = 0.6. What is P(A and B)?",
      ["0.9", "0.3", "0.18", "0.48"],
      2,
      "For independent events P(A and B) = P(A) × P(B) = 0.3 × 0.6 = 0.18.",
    ],
    [
      "If P(A) = 0.35, what is P(not A)?",
      ["0.35", "0.65", "0.5", "0.7"],
      1,
      "Complementary rule: P(not A) = 1 − P(A) = 1 − 0.35 = 0.65.",
    ],
    [
      "How many 4-digit codes can be made from the digits 0–9 if no digit may repeat?",
      ["10 000", "6 561", "5 040", "715"],
      2,
      "10 choices for the first digit, then 9, 8 and 7: 10 × 9 × 8 × 7 = 5 040. (10 000 allows repeats.)",
    ],
    [
      "In how many different ways can the letters of the word MATHS be arranged?",
      ["25", "60", "720", "120"],
      3,
      "All 5 letters are different, so the arrangements are 5! = 5 × 4 × 3 × 2 × 1 = 120.",
    ],
    [
      "Two fair dice are rolled. What is the probability that the total is 7?",
      ["1/6", "1/12", "7/36", "1/7"],
      0,
      "Six of the 36 equally likely outcomes give 7: (1;6),(2;5),(3;4),(4;3),(5;2),(6;1). So 6/36 = 1/6.",
    ],
    [
      "A bag holds 3 red and 2 blue balls. Two are drawn without replacement. P(both red) = ?",
      ["9/25", "3/10", "2/5", "3/5"],
      1,
      "P(first red) = 3/5, then P(second red) = 2/4 because one red is gone. 3/5 × 2/4 = 6/20 = 3/10. (9/25 is the trap if you replace the ball.)",
    ],
  ],
};

// 1. Upsert topics in display order
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

// 2. Replace questions per topic (keeps re-runs clean; attempts/mastery untouched)
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
