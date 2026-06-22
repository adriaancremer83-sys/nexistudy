// Seeds the Grade 9 Mathematics question bank (6 topics x 8 questions).
// CAPS Senior Phase, objectively-checkable only (calculations, definitions).
// Grade 9 level — foundational; questions/numbers DISTINCT from the Gr10 bank.
// Includes Geometry + Measurement (not in the Gr10 bank) and deliberately omits
// Trigonometry / Finance & Growth (which are Gr10+) for clear distinctness.
// Every numeric answer double-checked by computation during drafting.
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but NOT option order).
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade9-maths.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Mathematics";
const GRADE = "Grade 9";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Integers & Exponents": [
    [
      "Calculate: −8 + 5.",
      ["−3", "−13", "3", "13"],
      0,
      "Adding a positive to a negative moves towards zero: −8 + 5 = −3.",
    ],
    [
      "Calculate: −6 × −4.",
      ["−24", "24", "−10", "10"],
      1,
      "A negative multiplied by a negative gives a positive: −6 × −4 = 24.",
    ],
    [
      "Calculate: −15 ÷ 3.",
      ["5", "−45", "−5", "45"],
      2,
      "A negative divided by a positive is negative: −15 ÷ 3 = −5.",
    ],
    [
      "Calculate: −7 − (−10).",
      ["−17", "−3", "17", "3"],
      3,
      "Subtracting a negative is the same as adding: −7 − (−10) = −7 + 10 = 3.",
    ],
    [
      "Write 2⁵ as an ordinary number.",
      ["32", "10", "25", "16"],
      0,
      "2⁵ means 2 × 2 × 2 × 2 × 2 = 32.",
    ],
    [
      "Simplify: 3² + 4².",
      ["49", "25", "14", "7"],
      1,
      "Work out each power first: 3² = 9 and 4² = 16, so 9 + 16 = 25.",
    ],
    [
      "Simplify and leave in exponent form: 2³ × 2².",
      ["2⁶", "4⁵", "2⁵", "2¹"],
      2,
      "When multiplying powers with the same base, add the exponents: 2³ × 2² = 2^(3+2) = 2⁵.",
    ],
    [
      "What is the value of 10³?",
      ["30", "100", "300", "1000"],
      3,
      "10³ = 10 × 10 × 10 = 1000.",
    ],
  ],
  "Algebraic Expressions & Equations": [
    [
      "Simplify: 7a + 2a − 4a.",
      ["5a", "13a", "9a", "3a"],
      0,
      "Combine the like terms: (7 + 2 − 4)a = 5a.",
    ],
    [
      "Expand: 3(x + 5).",
      ["3x + 5", "3x + 15", "x + 15", "8x"],
      1,
      "Multiply each term inside the bracket by 3: 3·x + 3·5 = 3x + 15.",
    ],
    [
      "Simplify: 4x + 3y + 2x − y.",
      ["8xy", "6x + 4y", "6x + 2y", "4x + 2y"],
      2,
      "Add like terms separately: (4x + 2x) + (3y − y) = 6x + 2y.",
    ],
    [
      "Solve for x: x − 6 = 10.",
      ["x = 4", "x = −16", "x = 60", "x = 16"],
      3,
      "Add 6 to both sides: x = 10 + 6 = 16.",
    ],
    [
      "Solve for x: 5x = 35.",
      ["x = 7", "x = 30", "x = 40", "x = 175"],
      0,
      "Divide both sides by 5: x = 35 ÷ 5 = 7.",
    ],
    [
      "Solve for x: 2x + 3 = 11.",
      ["x = 7", "x = 4", "x = 5.5", "x = 14"],
      1,
      "Subtract 3 from both sides: 2x = 8. Then divide by 2: x = 4.",
    ],
    [
      "Factorise: 8x + 12.",
      ["8(x + 12)", "x(8 + 12)", "4(2x + 3)", "2(4x + 12)"],
      2,
      "The highest common factor of 8x and 12 is 4: 8x + 12 = 4(2x + 3).",
    ],
    [
      "If x = 3, what is the value of 2x²?",
      ["12", "36", "6", "18"],
      3,
      "Substitute x = 3: 2 × 3² = 2 × 9 = 18.",
    ],
  ],
  "Number Patterns & Relationships": [
    [
      "Find the next term: 3, 7, 11, 15, …",
      ["19", "20", "18", "23"],
      0,
      "The pattern adds 4 each time: 15 + 4 = 19.",
    ],
    [
      "Find the next term: 2, 4, 8, 16, …",
      ["24", "32", "20", "64"],
      1,
      "Each term is multiplied by 2: 16 × 2 = 32.",
    ],
    [
      "A pattern follows the rule “multiply the position number by 3”. The 5th term is:",
      ["8", "35", "15", "12"],
      2,
      "Term = position × 3, so the 5th term = 5 × 3 = 15.",
    ],
    [
      "Find the missing term: 5, 10, __, 20, 25.",
      ["12", "11", "30", "15"],
      3,
      "The pattern increases by 5 each time, so the missing term is 10 + 5 = 15.",
    ],
    [
      "What is the constant difference in the sequence 6, 10, 14, 18, …?",
      ["4", "6", "2", "8"],
      0,
      "Each term increases by the same amount: 10 − 6 = 4.",
    ],
    [
      "Find the next term: 1, 4, 9, 16, …",
      ["20", "25", "24", "36"],
      1,
      "These are square numbers (1², 2², 3², 4²), so the next term is 5² = 25.",
    ],
    [
      "A pattern follows the rule “term = 2n + 1”, where n is the position. The 4th term is:",
      ["7", "8", "9", "11"],
      2,
      "Substitute n = 4: 2 × 4 + 1 = 9.",
    ],
    [
      "Find the next term: 100, 90, 80, 70, …",
      ["50", "65", "75", "60"],
      3,
      "The pattern decreases by 10 each time: 70 − 10 = 60.",
    ],
  ],
  "Geometry: Lines, Angles & Triangles": [
    [
      "Two angles that add up to 90° are called:",
      [
        "complementary angles",
        "supplementary angles",
        "vertically opposite angles",
        "co-interior angles",
      ],
      0,
      "Angles that add up to 90° are complementary; angles that add up to 180° are supplementary.",
    ],
    [
      "Angles on a straight line add up to:",
      ["90°", "180°", "360°", "270°"],
      1,
      "Angles on a straight line are supplementary — they add up to 180°.",
    ],
    [
      "The interior angles of a triangle add up to:",
      ["90°", "270°", "180°", "360°"],
      2,
      "The three interior angles of any triangle always sum to 180°.",
    ],
    [
      "A triangle with all three sides equal is called:",
      ["scalene", "isosceles", "right-angled", "equilateral"],
      3,
      "An equilateral triangle has all three sides (and all three angles) equal.",
    ],
    [
      "In a right-angled triangle, one of the angles is exactly:",
      ["90°", "45°", "60°", "180°"],
      0,
      "A right-angled triangle contains one right angle, which measures 90°.",
    ],
    [
      "Two angles that add up to 180° are called:",
      [
        "complementary angles",
        "supplementary angles",
        "acute angles",
        "reflex angles",
      ],
      1,
      "Angles that add up to 180° are supplementary.",
    ],
    [
      "An angle measuring more than 90° but less than 180° is called:",
      ["acute", "right", "obtuse", "reflex"],
      2,
      "An obtuse angle is greater than 90° but less than 180°.",
    ],
    [
      "Two angles in a triangle are 50° and 60°. The third angle is:",
      ["40°", "80°", "110°", "70°"],
      3,
      "Angles in a triangle sum to 180°, so the third angle = 180° − 50° − 60° = 70°.",
    ],
  ],
  "Measurement: Perimeter, Area & Volume": [
    [
      "The perimeter of a square with side 6 cm is:",
      ["24 cm", "36 cm", "12 cm", "30 cm"],
      0,
      "Perimeter of a square = 4 × side = 4 × 6 = 24 cm.",
    ],
    [
      "The area of a rectangle 8 cm long and 5 cm wide is:",
      ["26 cm²", "40 cm²", "13 cm²", "80 cm²"],
      1,
      "Area of a rectangle = length × width = 8 × 5 = 40 cm².",
    ],
    [
      "The area of a square with side 7 cm is:",
      ["28 cm²", "14 cm²", "49 cm²", "21 cm²"],
      2,
      "Area of a square = side² = 7² = 49 cm².",
    ],
    [
      "The volume of a cube with side 3 cm is:",
      ["9 cm³", "18 cm³", "12 cm³", "27 cm³"],
      3,
      "Volume of a cube = side³ = 3³ = 27 cm³.",
    ],
    [
      "The perimeter of a rectangle 10 cm by 4 cm is:",
      ["28 cm", "40 cm", "14 cm", "24 cm"],
      0,
      "Perimeter of a rectangle = 2 × (length + width) = 2 × (10 + 4) = 28 cm.",
    ],
    [
      "The area of a triangle with base 10 cm and height 6 cm is:",
      ["60 cm²", "30 cm²", "16 cm²", "32 cm²"],
      1,
      "Area of a triangle = ½ × base × height = ½ × 10 × 6 = 30 cm².",
    ],
    [
      "The volume of a rectangular box 5 cm × 2 cm × 3 cm is:",
      ["10 cm³", "25 cm³", "30 cm³", "60 cm³"],
      2,
      "Volume of a box = length × width × height = 5 × 2 × 3 = 30 cm³.",
    ],
    [
      "How many centimetres are there in 1 metre?",
      ["10", "1000", "10 000", "100"],
      3,
      "There are 100 centimetres in 1 metre.",
    ],
  ],
  "Data Handling & Probability": [
    [
      "The mean (average) of 2, 4, 6 is:",
      ["4", "6", "12", "3"],
      0,
      "Mean = (2 + 4 + 6) ÷ 3 = 12 ÷ 3 = 4.",
    ],
    [
      "The mode of the data set 5, 7, 7, 9, 10 is:",
      ["5", "7", "9", "10"],
      1,
      "The mode is the value that appears most often; 7 appears twice, so the mode is 7.",
    ],
    [
      "The median of the data set 2, 4, 6, 8, 10 is:",
      ["4", "8", "6", "5"],
      2,
      "The median is the middle value when the data is in order; the middle of 2, 4, 6, 8, 10 is 6.",
    ],
    [
      "The range of the data set 4, 9, 2, 15, 6 is:",
      ["9", "15", "11", "13"],
      3,
      "Range = highest value − lowest value = 15 − 2 = 13.",
    ],
    [
      "When rolling a normal six-sided die once, the probability of rolling an even number is:",
      ["1/2", "1/6", "1/3", "2/3"],
      0,
      "Even numbers are 2, 4 and 6 — that is 3 of the 6 outcomes, so P = 3/6 = 1/2.",
    ],
    [
      "A bag holds 3 red and 2 blue balls. The probability of drawing a red ball is:",
      ["2/5", "3/5", "1/2", "3/2"],
      1,
      "There are 5 balls in total and 3 are red, so P(red) = 3/5.",
    ],
    [
      "The probability of an impossible event is:",
      ["1", "½", "0", "100"],
      2,
      "An impossible event can never happen, so its probability is 0.",
    ],
    [
      "The mean (average) of 10, 12, 14, 16 is:",
      ["14", "12", "15", "13"],
      3,
      "Mean = (10 + 12 + 14 + 16) ÷ 4 = 52 ÷ 4 = 13.",
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
