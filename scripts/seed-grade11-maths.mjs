// Seeds the Grade 11 Mathematics question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only (calculations, definitions, formula use).
// Grade 11 level — no calculus. Every numeric answer double-checked by computation.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade11-maths.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Mathematics";
const GRADE = "Grade 11";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Algebra & Equations": [
    [
      "Solve for x: 2x + 5 = 13.",
      ["x = 2", "x = 4", "x = 6", "x = 9"],
      1,
      "Subtract 5: 2x = 8. Divide by 2: x = 4.",
    ],
    [
      "Factorise fully: x² − 9.",
      ["(x − 3)(x + 3)", "(x − 9)(x + 1)", "(x − 3)²", "(x + 9)(x − 1)"],
      0,
      "This is a difference of two squares: x² − 9 = x² − 3² = (x − 3)(x + 3).",
    ],
    [
      "Solve for x: x² − 5x + 6 = 0.",
      ["x = 2 or x = 3", "x = −2 or x = −3", "x = 1 or x = 6", "x = 5 or x = 6"],
      0,
      "Factorise: (x − 2)(x − 3) = 0, so x = 2 or x = 3 (the factors of +6 that add to −5 are −2 and −3).",
    ],
    [
      "Simplify: 3x² · 2x³.",
      ["6x⁵", "6x⁶", "5x⁵", "6x⁹"],
      0,
      "Multiply the coefficients (3 × 2 = 6) and add the exponents (x² · x³ = x⁵), giving 6x⁵.",
    ],
    [
      "Simplify: (2x³)².",
      ["2x⁶", "4x⁵", "4x⁶", "2x⁵"],
      2,
      "Square both factors: 2² = 4 and (x³)² = x⁶, giving 4x⁶.",
    ],
    [
      "Evaluate: 3⁰ + 5⁰.",
      ["0", "1", "2", "8"],
      2,
      "Any non-zero number to the power 0 equals 1, so 3⁰ + 5⁰ = 1 + 1 = 2.",
    ],
    [
      "Write √50 in its simplest surd form.",
      ["5√2", "2√5", "25√2", "10√5"],
      0,
      "√50 = √(25 × 2) = √25 × √2 = 5√2.",
    ],
    [
      "Solve the simultaneous equations: x + y = 10 and x − y = 2.",
      ["x = 6, y = 4", "x = 4, y = 6", "x = 5, y = 5", "x = 8, y = 2"],
      0,
      "Adding the two equations: 2x = 12, so x = 6. Then y = 10 − 6 = 4.",
    ],
  ],
  "Number Patterns": [
    [
      "Find the next term in the sequence: 2, 5, 8, 11, ...",
      ["13", "14", "15", "16"],
      1,
      "The common difference is 3 (each term adds 3), so the next term is 11 + 3 = 14.",
    ],
    [
      "The general term (Tₙ) of the sequence 3, 7, 11, 15, ... is:",
      ["4n − 1", "4n + 1", "3n", "n + 4"],
      0,
      "First term 3, common difference 4: Tₙ = 3 + (n − 1)(4) = 4n − 1. Check: n = 1 gives 3, n = 2 gives 7.",
    ],
    [
      "Find the 10th term of the sequence with Tₙ = 2n + 3.",
      ["13", "20", "23", "25"],
      2,
      "Substitute n = 10: T₁₀ = 2(10) + 3 = 20 + 3 = 23.",
    ],
    [
      "In a quadratic sequence, which difference is constant?",
      ["The first difference", "The second difference", "The third difference", "The common ratio"],
      1,
      "A quadratic sequence has a constant second difference (the difference between the first differences).",
    ],
    [
      "Find the next term in the quadratic sequence: 3, 6, 11, 18, ...",
      ["25", "26", "27", "29"],
      2,
      "First differences are 3, 5, 7 (second difference 2). The next first difference is 9, so the next term is 18 + 9 = 27.",
    ],
    [
      "The sequence 5, 10, 20, 40, ... is:",
      ["arithmetic with d = 5", "geometric with r = 2", "a quadratic sequence", "a constant sequence"],
      1,
      "Each term is multiplied by 2 to get the next, so it is a geometric sequence with common ratio r = 2.",
    ],
    [
      "Find the common difference of the arithmetic sequence: 12, 9, 6, 3, ...",
      ["3", "−3", "−6", "−9"],
      1,
      "Each term is 3 less than the previous one, so the common difference is −3.",
    ],
    [
      "The first differences of the quadratic sequence 2, 5, 10, 17, ... are 3, 5, 7. The second difference is:",
      ["1", "2", "3", "5"],
      1,
      "The second difference is the difference between consecutive first differences: 5 − 3 = 2 and 7 − 5 = 2, so it is 2.",
    ],
  ],
  "Functions & Graphs": [
    [
      "The graph of y = x² is called a:",
      ["straight line", "parabola", "hyperbola", "exponential curve"],
      1,
      "y = x² is a quadratic function, and its graph is a parabola.",
    ],
    [
      "For the parabola y = x² − 4, the y-intercept is:",
      ["−4", "0", "2", "4"],
      0,
      "The y-intercept is found by setting x = 0: y = 0² − 4 = −4.",
    ],
    [
      "The turning point of y = x² is at:",
      ["(0, 0)", "(1, 1)", "(0, 1)", "(−1, 0)"],
      0,
      "The basic parabola y = x² has its minimum turning point at the origin, (0, 0).",
    ],
    [
      "The parabola y = −x² + 3:",
      [
        "opens upwards with a minimum",
        "opens downwards with a maximum",
        "is a straight line",
        "is a hyperbola",
      ],
      1,
      "Because the coefficient of x² is negative, the parabola opens downwards and has a maximum turning point.",
    ],
    [
      "The axis of symmetry of y = x² is the line:",
      ["x = 0", "y = 0", "x = 1", "y = x"],
      0,
      "The parabola y = x² is symmetrical about the vertical line through its turning point, which is x = 0 (the y-axis).",
    ],
    [
      "For the straight line y = 2x + 1, the gradient is:",
      ["1", "2", "−1", "½"],
      1,
      "In the form y = mx + c, the gradient is m. Here m = 2.",
    ],
    [
      "The x-intercepts of y = x² − 9 are:",
      ["x = 3 only", "x = ±3", "x = ±9", "x = 0"],
      1,
      "Set y = 0: x² − 9 = 0, so x² = 9 and x = ±3 (both +3 and −3).",
    ],
    [
      "The function y = 2ˣ is an example of a(n):",
      ["linear function", "quadratic function", "exponential function", "hyperbolic function"],
      2,
      "When the variable is in the exponent, as in y = 2ˣ, the function is exponential.",
    ],
  ],
  "Trigonometry": [
    [
      "In a right-angled triangle, sin θ is defined as:",
      [
        "opposite ÷ hypotenuse",
        "adjacent ÷ hypotenuse",
        "opposite ÷ adjacent",
        "hypotenuse ÷ opposite",
      ],
      0,
      "sin θ = opposite ÷ hypotenuse (remembered by SOH in SOH-CAH-TOA).",
    ],
    [
      "The value of sin 30° is:",
      ["½", "√3/2", "1", "√2/2"],
      0,
      "sin 30° = ½ — one of the standard special-angle values.",
    ],
    [
      "The value of cos 60° is:",
      ["0", "½", "√3/2", "1"],
      1,
      "cos 60° = ½ — a standard special-angle value (equal to sin 30°).",
    ],
    [
      "The value of tan 45° is:",
      ["0", "½", "1", "√3"],
      2,
      "tan 45° = 1, because at 45° the opposite and adjacent sides are equal.",
    ],
    [
      "Which trigonometric identity is correct?",
      [
        "sin²θ + cos²θ = 1",
        "sin²θ − cos²θ = 1",
        "sin θ + cos θ = 1",
        "tan θ = cos θ ÷ sin θ",
      ],
      0,
      "The fundamental identity is sin²θ + cos²θ = 1.",
    ],
    [
      "tan θ is equal to:",
      ["sin θ ÷ cos θ", "cos θ ÷ sin θ", "sin θ × cos θ", "1 ÷ sin θ"],
      0,
      "By definition, tan θ = sin θ ÷ cos θ.",
    ],
    [
      "In a right-angled triangle, the side opposite the right angle is the:",
      ["hypotenuse", "adjacent side", "opposite side", "base"],
      0,
      "The hypotenuse is the longest side, lying opposite the 90° angle.",
    ],
    [
      "If, for an angle θ, the opposite side is 3 and the hypotenuse is 5, then sin θ =",
      ["0.6", "0.8", "1.67", "0.75"],
      0,
      "sin θ = opposite ÷ hypotenuse = 3 ÷ 5 = 0.6.",
    ],
  ],
  "Analytical Geometry": [
    [
      "The distance between the points A(0, 0) and B(3, 4) is:",
      ["5", "7", "12", "25"],
      0,
      "Distance = √[(3 − 0)² + (4 − 0)²] = √(9 + 16) = √25 = 5.",
    ],
    [
      "The midpoint of the line segment joining A(2, 4) and B(6, 8) is:",
      ["(4, 6)", "(8, 12)", "(2, 2)", "(3, 4)"],
      0,
      "Midpoint = ((2 + 6)/2, (4 + 8)/2) = (4, 6).",
    ],
    [
      "The gradient of the line joining A(1, 2) and B(4, 8) is:",
      ["1", "2", "3", "½"],
      1,
      "Gradient = (y₂ − y₁)/(x₂ − x₁) = (8 − 2)/(4 − 1) = 6/3 = 2.",
    ],
    [
      "Two lines are parallel if their gradients are:",
      ["equal", "negative reciprocals", "both zero", "opposite in sign"],
      0,
      "Parallel lines have the same gradient.",
    ],
    [
      "Two lines are perpendicular if the product of their gradients is:",
      ["1", "0", "−1", "2"],
      2,
      "For perpendicular lines, m₁ × m₂ = −1 (their gradients are negative reciprocals).",
    ],
    [
      "The gradient of a horizontal line is:",
      ["0", "1", "undefined", "−1"],
      0,
      "A horizontal line has no rise, so its gradient is 0. (A vertical line has an undefined gradient.)",
    ],
    [
      "The distance between points (x₁, y₁) and (x₂, y₂) is given by:",
      [
        "√[(x₂ − x₁)² + (y₂ − y₁)²]",
        "(x₂ − x₁) + (y₂ − y₁)",
        "√[(x₂ + x₁)² + (y₂ + y₁)²]",
        "(x₂ − x₁)(y₂ − y₁)",
      ],
      0,
      "The distance formula is √[(x₂ − x₁)² + (y₂ − y₁)²], from the theorem of Pythagoras.",
    ],
    [
      "The midpoint of A(−2, 3) and B(4, 7) is:",
      ["(1, 5)", "(2, 10)", "(3, 2)", "(6, 4)"],
      0,
      "Midpoint = ((−2 + 4)/2, (3 + 7)/2) = (2/2, 10/2) = (1, 5).",
    ],
  ],
  "Finance, Growth & Decay": [
    [
      "Simple interest is calculated using the formula:",
      ["A = P(1 + ni)", "A = P(1 + i)ⁿ", "A = P(1 − i)ⁿ", "A = P + n"],
      0,
      "The simple-interest accumulated amount is A = P(1 + ni), where interest is a fixed amount each period.",
    ],
    [
      "Compound interest is calculated using the formula:",
      ["A = P(1 + ni)", "A = P(1 + i)ⁿ", "A = Pni", "A = P + n"],
      1,
      "Compound interest uses A = P(1 + i)ⁿ, because interest is earned on interest each period.",
    ],
    [
      "R2 000 is invested at 10% simple interest per year for 3 years. The interest earned is:",
      ["R200", "R600", "R660", "R2 600"],
      1,
      "Simple interest = P × i × n = 2 000 × 0.10 × 3 = R600.",
    ],
    [
      "R1 000 is invested at 10% per year compound interest for 2 years. The accumulated amount is:",
      ["R1 100", "R1 200", "R1 210", "R1 020"],
      2,
      "A = P(1 + i)ⁿ = 1 000 × (1.10)² = 1 000 × 1.21 = R1 210.",
    ],
    [
      "Depreciation refers to the:",
      [
        "increase in value of an asset over time",
        "decrease in value of an asset over time",
        "interest earned on savings",
        "total original cost of an asset",
      ],
      1,
      "Depreciation is the loss in value of an asset over time (for example a vehicle or machinery).",
    ],
    [
      "A car loses value over time. This is an example of:",
      ["growth", "decay", "inflation", "appreciation"],
      1,
      "A decrease in value over time is called decay (depreciation), the opposite of growth/appreciation.",
    ],
    [
      "If R5 000 grows to R6 000, the amount of interest earned is:",
      ["R500", "R1 000", "R1 100", "R6 000"],
      1,
      "Interest = final amount − original amount = R6 000 − R5 000 = R1 000.",
    ],
    [
      "R4 000 is invested at 5% simple interest per year. The interest after 1 year is:",
      ["R20", "R200", "R400", "R2 000"],
      1,
      "Simple interest for 1 year = 4 000 × 0.05 × 1 = R200.",
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
