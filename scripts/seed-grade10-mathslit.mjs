// Seeds the Grade 10 Mathematical Literacy question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only. Same 6 topics as the Maths Lit
// Gr11/Gr12 banks (the standard Maths Lit application areas) but with DISTINCT,
// simpler Gr10-level questions and different numbers from the Gr11 bank.
// Every numeric answer double-checked by computation during drafting.
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but NOT option order).
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade10-mathslit.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Mathematical Literacy";
const GRADE = "Grade 10";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Numbers, Ratio & Proportion": [
    [
      "Simplify the ratio 8 : 12 to its simplest form.",
      ["2 : 3", "3 : 2", "4 : 6", "2 : 4"],
      0,
      "Divide both parts by their highest common factor, 4: 8 ÷ 4 = 2 and 12 ÷ 4 = 3, giving 2 : 3.",
    ],
    [
      "What is 20% of 150?",
      ["20", "30", "50", "15"],
      1,
      "20% = 0.2, so 0.2 × 150 = 30.",
    ],
    [
      "R160 is shared between two people in the ratio 1 : 3. How much is the larger share?",
      ["R40", "R80", "R120", "R60"],
      2,
      "The ratio has 1 + 3 = 4 parts, so each part is R160 ÷ 4 = R40. The larger share is 3 × R40 = R120.",
    ],
    [
      "Convert the fraction 3/4 to a percentage.",
      ["25%", "34%", "50%", "75%"],
      3,
      "3 ÷ 4 = 0.75, and 0.75 × 100 = 75%.",
    ],
    [
      "A car travels 240 km on 20 litres of petrol. At the same rate, how far can it travel on 5 litres?",
      ["60 km", "48 km", "120 km", "12 km"],
      0,
      "Distance per litre = 240 ÷ 20 = 12 km, so on 5 litres: 5 × 12 = 60 km.",
    ],
    [
      "Write 0.25 as a fraction in its simplest form.",
      ["1/2", "1/4", "2/5", "25/10"],
      1,
      "0.25 = 25/100, which simplifies to 1/4 (dividing top and bottom by 25).",
    ],
    [
      "Decrease R300 by 10%.",
      ["R310", "R330", "R270", "R290"],
      2,
      "10% of R300 = R30, so R300 − R30 = R270.",
    ],
    [
      "A worker earns R50 per hour. How much is earned for a 6-hour shift?",
      ["R56", "R250", "R350", "R300"],
      3,
      "Pay = rate × hours = R50 × 6 = R300.",
    ],
  ],
  "Finance": [
    [
      "A learner's pocket money is R250 and they spend R180. How much is left over (saved)?",
      ["R70", "R430", "R180", "R250"],
      0,
      "Amount saved = income − spending = R250 − R180 = R70.",
    ],
    [
      "The VAT (at 15%) on an item costing R100 (excluding VAT) is:",
      ["R10", "R15", "R20", "R115"],
      1,
      "VAT = 15% of R100 = 0.15 × 100 = R15.",
    ],
    [
      "A shirt marked R250 is offered at 20% off. The discount is:",
      ["R20", "R200", "R50", "R230"],
      2,
      "Discount = 20% of R250 = 0.20 × 250 = R50.",
    ],
    [
      "R2 000 is invested at 5% simple interest per year. The interest earned after 1 year is:",
      ["R10", "R1 000", "R200", "R100"],
      3,
      "Simple interest = P × r × t = 2 000 × 0.05 × 1 = R100.",
    ],
    [
      "A T-shirt costs R120 cash. On a lay-by you pay a R30 deposit. How much is still owed?",
      ["R90", "R150", "R30", "R120"],
      0,
      "Amount still owed = price − deposit = R120 − R30 = R90.",
    ],
    [
      "If the exchange rate is US$1 = R20, how many US dollars can you buy with R200?",
      ["$5", "$10", "$20", "$40"],
      1,
      "Divide the rands by the rate: R200 ÷ 20 = $10.",
    ],
    [
      "A R600 item is bought with a 25% deposit. The deposit is:",
      ["R60", "R450", "R150", "R300"],
      2,
      "Deposit = 25% of R600 = 0.25 × 600 = R150.",
    ],
    [
      "A budget shows an income of R5 000 and expenses of R5 800. This is a:",
      ["surplus of R800", "balanced budget", "surplus of R10 800", "deficit of R800"],
      3,
      "Expenses (R5 800) exceed income (R5 000) by R800, so the budget shows a deficit of R800.",
    ],
  ],
  "Measurement & Conversions": [
    [
      "Convert 5 metres to centimetres.",
      ["500 cm", "50 cm", "5 000 cm", "0.05 cm"],
      0,
      "1 m = 100 cm, so 5 × 100 = 500 cm.",
    ],
    [
      "Convert 3 000 millilitres to litres.",
      ["30 L", "3 L", "300 L", "0.3 L"],
      1,
      "1 litre = 1 000 ml, so 3 000 ÷ 1 000 = 3 litres.",
    ],
    [
      "The area of a rectangle 8 m long and 5 m wide is:",
      ["13 m²", "26 m²", "40 m²", "80 m²"],
      2,
      "Area = length × width = 8 × 5 = 40 m².",
    ],
    [
      "The perimeter of a rectangle 7 m long and 3 m wide is:",
      ["21 m", "10 m", "28 m", "20 m"],
      3,
      "Perimeter = 2 × (length + width) = 2 × (7 + 3) = 2 × 10 = 20 m.",
    ],
    [
      "Convert 4 kilograms to grams.",
      ["4 000 g", "400 g", "40 g", "40 000 g"],
      0,
      "1 kg = 1 000 g, so 4 × 1 000 = 4 000 g.",
    ],
    [
      "How many minutes are there in 2½ hours?",
      ["120", "150", "125", "180"],
      1,
      "1 hour = 60 minutes, so 2.5 × 60 = 150 minutes.",
    ],
    [
      "The volume of a box measuring 3 m × 2 m × 2 m is:",
      ["7 m³", "10 m³", "12 m³", "14 m³"],
      2,
      "Volume = length × width × height = 3 × 2 × 2 = 12 m³.",
    ],
    [
      "Convert 2 kilometres to metres.",
      ["20 m", "200 m", "20 000 m", "2 000 m"],
      3,
      "1 km = 1 000 m, so 2 × 1 000 = 2 000 m.",
    ],
  ],
  "Maps, Plans & Scale": [
    [
      "On most maps, if North is at the top, the direction at the bottom of the page is:",
      ["South", "North", "East", "West"],
      0,
      "If North is at the top of a map, then South is at the bottom.",
    ],
    [
      "On a plan with a scale of 1 : 100, a length of 2 cm represents an actual distance of:",
      ["20 cm", "2 m", "20 m", "200 m"],
      1,
      "1 cm represents 100 cm, so 2 cm × 100 = 200 cm = 2 m.",
    ],
    [
      "On a compass, the direction directly opposite North is:",
      ["East", "West", "South", "North-West"],
      2,
      "North and South are opposite each other on a compass.",
    ],
    [
      "A scale of 1 : 50 is used. A real object 100 cm long is drawn as:",
      ["50 cm", "5 cm", "1 cm", "2 cm"],
      3,
      "Divide the real length by 50: 100 cm ÷ 50 = 2 cm on the plan.",
    ],
    [
      "On a plan with a scale of 1 : 100, a wall drawn 4 cm long is actually:",
      ["4 m", "40 cm", "40 m", "400 m"],
      0,
      "4 cm × 100 = 400 cm = 4 m.",
    ],
    [
      "If you face North and turn 90° clockwise (to the right), you will face:",
      ["West", "East", "South", "North-East"],
      1,
      "Turning clockwise from North (N → E), a 90° turn brings you to face East.",
    ],
    [
      "A scale of 1 : 500 means that 1 cm on the plan represents ___ in reality.",
      ["50 cm", "5 cm", "500 cm", "5 000 cm"],
      2,
      "In a number scale the units match, so 1 cm represents 500 cm (which is 5 m) in reality.",
    ],
    [
      "On a map with a scale of 1 : 50 000, two towns are 6 cm apart. The actual distance is:",
      ["30 m", "300 m", "30 km", "3 km"],
      3,
      "6 cm × 50 000 = 300 000 cm = 3 km (since 1 km = 100 000 cm).",
    ],
  ],
  "Data Handling": [
    [
      "Find the mean of: 3, 5, 7, 9.",
      ["6", "7", "5", "24"],
      0,
      "Mean = (3 + 5 + 7 + 9) ÷ 4 = 24 ÷ 4 = 6.",
    ],
    [
      "Find the median of: 2, 4, 6, 8, 10.",
      ["4", "6", "8", "30"],
      1,
      "The values are in order; the median is the middle value of the five, which is 6.",
    ],
    [
      "Find the range of: 9, 3, 15, 6.",
      ["3", "9", "12", "15"],
      2,
      "Range = highest − lowest = 15 − 3 = 12.",
    ],
    [
      "Find the mode of: 5, 8, 5, 2, 5, 9.",
      ["8", "2", "9", "5"],
      3,
      "The mode is the value that appears most often. The number 5 appears three times.",
    ],
    [
      "The value that appears most often in a data set is called the:",
      ["mode", "mean", "median", "range"],
      0,
      "The mode is the value that occurs most frequently in a data set.",
    ],
    [
      "In a group of 20 learners, 50% play sport. How many learners play sport?",
      ["5", "10", "15", "20"],
      1,
      "50% of 20 = 0.5 × 20 = 10 learners.",
    ],
    [
      "The mean of 5 numbers is 8. Their total is:",
      ["13", "3", "40", "85"],
      2,
      "Total = mean × number of values = 8 × 5 = 40.",
    ],
    [
      "Find the median of the data set 7, 1, 5, 3 (arrange in order first).",
      ["3", "5", "6", "4"],
      3,
      "In order: 1, 3, 5, 7. With four values the median is the mean of the middle two: (3 + 5) ÷ 2 = 4.",
    ],
  ],
  "Probability": [
    [
      "The probability of an event that is certain to happen is:",
      ["1", "0", "1/2", "10"],
      0,
      "A certain event has a probability of 1, the maximum on the probability scale.",
    ],
    [
      "The probability of getting heads when tossing one fair coin is:",
      ["1", "1/2", "1/4", "0"],
      1,
      "A coin has two equally likely outcomes, so P(heads) = 1 out of 2 = 1/2.",
    ],
    [
      "The probability of rolling a 5 on an ordinary six-sided die is:",
      ["1/2", "1/3", "1/6", "5/6"],
      2,
      "There is one '5' on the six faces, so the probability is 1/6.",
    ],
    [
      "A bag contains 3 green and 2 yellow sweets. The probability of drawing a yellow sweet is:",
      ["3/5", "1/2", "2/3", "2/5"],
      3,
      "There are 2 yellow sweets out of 5 in total, so P(yellow) = 2/5.",
    ],
    [
      "The probability of an impossible event is:",
      ["0", "1/2", "1", "100"],
      0,
      "An impossible event has a probability of 0 — it cannot happen.",
    ],
    [
      "A bag contains 3 green and 2 yellow sweets. The probability of drawing a green sweet is:",
      ["2/5", "3/5", "1/3", "3/2"],
      1,
      "There are 3 green sweets out of 5 in total, so P(green) = 3/5.",
    ],
    [
      "The probability of rolling an even number on an ordinary six-sided die is:",
      ["1/6", "1/3", "1/2", "2/3"],
      2,
      "The even numbers are 2, 4 and 6 — that is 3 of the 6 faces, so 3/6 = 1/2.",
    ],
    [
      "A spinner has 4 equal sections coloured red, blue, green and yellow. The probability of landing on blue is:",
      ["1/2", "3/4", "4/1", "1/4"],
      3,
      "There is 1 blue section out of 4 equal sections, so P(blue) = 1/4.",
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
