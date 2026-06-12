// Seeds the Grade 11 Mathematical Literacy question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only. Distinct questions from the Gr12 bank.
// Every numeric answer double-checked. Correct positions spread evenly A-D per topic.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade11-mathslit.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Mathematical Literacy";
const GRADE = "Grade 11";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Numbers, Ratio & Proportion": [
    [
      "Simplify the ratio 15 : 20 to its simplest form.",
      ["3 : 4", "4 : 3", "5 : 4", "15 : 20"],
      0,
      "Divide both parts by their highest common factor, 5: 15 ÷ 5 = 3 and 20 ÷ 5 = 4, giving 3 : 4.",
    ],
    [
      "R120 is shared between two people in the ratio 1 : 3. How much is the larger share?",
      ["R30", "R40", "R90", "R60"],
      2,
      "The ratio has 1 + 3 = 4 parts, so each part is R120 ÷ 4 = R30. The larger share is 3 × R30 = R90.",
    ],
    [
      "What is 15% of 200?",
      ["15", "30", "45", "20"],
      1,
      "15% = 0.15, so 0.15 × 200 = 30.",
    ],
    [
      "A recipe for 2 people uses 4 eggs. How many eggs are needed for 5 people?",
      ["8", "9", "12", "10"],
      3,
      "Eggs per person = 4 ÷ 2 = 2, so for 5 people: 5 × 2 = 10 eggs.",
    ],
    [
      "Convert the fraction 1/5 to a percentage.",
      ["20%", "15%", "25%", "50%"],
      0,
      "1 ÷ 5 = 0.2, and 0.2 × 100 = 20%.",
    ],
    [
      "A worker earns R45 per hour. How much is earned for an 8-hour shift?",
      ["R350", "R360", "R400", "R450"],
      1,
      "Pay = rate × hours = R45 × 8 = R360.",
    ],
    [
      "Increase R200 by 10%.",
      ["R210", "R190", "R220", "R240"],
      2,
      "10% of R200 = R20, so R200 + R20 = R220.",
    ],
    [
      "Write 0.75 as a fraction in its simplest form.",
      ["7/5", "1/2", "1/4", "3/4"],
      3,
      "0.75 = 75/100, which simplifies to 3/4 (dividing top and bottom by 25).",
    ],
  ],
  "Finance": [
    [
      "VAT in South Africa is charged at a rate of:",
      ["10%", "14%", "15%", "20%"],
      2,
      "The standard VAT rate in South Africa is 15%.",
    ],
    [
      "An item costs R80 excluding VAT. How much VAT (at 15%) is added?",
      ["R8", "R12", "R15", "R20"],
      1,
      "VAT = 15% of R80 = 0.15 × 80 = R12.",
    ],
    [
      "A worker's monthly income is R12 000 and total expenses are R9 500. The monthly balance is:",
      [
        "a surplus of R2 500",
        "a deficit of R2 500",
        "a surplus of R21 500",
        "a balanced budget",
      ],
      0,
      "Balance = income − expenses = R12 000 − R9 500 = R2 500. Income is more than expenses, so it is a surplus.",
    ],
    [
      "R3 000 is invested at 6% simple interest per year. How much interest is earned after 1 year?",
      ["R18", "R60", "R600", "R180"],
      3,
      "Simple interest = P × r × t = 3 000 × 0.06 × 1 = R180.",
    ],
    [
      "A jacket marked R400 is offered at 25% off. How much is the discount?",
      ["R100", "R75", "R300", "R125"],
      0,
      "Discount = 25% of R400 = 0.25 × 400 = R100.",
    ],
    [
      "The same jacket is marked R400 with 25% off. What is the sale price?",
      ["R375", "R300", "R325", "R350"],
      1,
      "Sale price = R400 − R100 discount = R300.",
    ],
    [
      "If the exchange rate is US$1 = R18, how many US dollars can you buy with R540?",
      ["$20", "$25", "$30", "$40"],
      2,
      "Divide rands by the rate: R540 ÷ 18 = $30.",
    ],
    [
      "Inflation causes the general level of prices to:",
      ["stay the same", "fall steadily", "double instantly", "rise over time"],
      3,
      "Inflation is a general rise in prices over time, which reduces the buying power of money.",
    ],
  ],
  "Measurement & Conversions": [
    [
      "Convert 3 metres to centimetres.",
      ["30 cm", "300 cm", "3 000 cm", "0.03 cm"],
      1,
      "1 m = 100 cm, so 3 × 100 = 300 cm.",
    ],
    [
      "Convert 2 000 grams to kilograms.",
      ["0.2 kg", "20 kg", "200 kg", "2 kg"],
      3,
      "1 kg = 1 000 g, so 2 000 ÷ 1 000 = 2 kg.",
    ],
    [
      "What is the area of a rectangle 6 m long and 4 m wide?",
      ["24 m²", "10 m²", "20 m²", "48 m²"],
      0,
      "Area = length × width = 6 × 4 = 24 m².",
    ],
    [
      "What is the perimeter of a square with sides of 5 m?",
      ["10 m", "25 m", "20 m", "15 m"],
      2,
      "Perimeter of a square = 4 × side = 4 × 5 = 20 m.",
    ],
    [
      "Convert 2.5 litres to millilitres.",
      ["250 ml", "2 500 ml", "25 ml", "25 000 ml"],
      1,
      "1 litre = 1 000 ml, so 2.5 × 1 000 = 2 500 ml.",
    ],
    [
      "How many minutes are there in 3 hours?",
      ["120", "150", "90", "180"],
      3,
      "1 hour = 60 minutes, so 3 × 60 = 180 minutes.",
    ],
    [
      "What is the volume of a box measuring 2 m × 2 m × 3 m?",
      ["12 m³", "7 m³", "10 m³", "24 m³"],
      0,
      "Volume = length × width × height = 2 × 2 × 3 = 12 m³.",
    ],
    [
      "Convert 1.5 kilometres to metres.",
      ["15 m", "150 m", "1 500 m", "15 000 m"],
      2,
      "1 km = 1 000 m, so 1.5 × 1 000 = 1 500 m.",
    ],
  ],
  "Maps, Plans & Scale": [
    [
      "On a plan with a scale of 1 : 100, a length of 3 cm represents an actual distance of:",
      ["30 cm", "3 m", "30 m", "300 m"],
      1,
      "1 cm represents 100 cm, so 3 cm × 100 = 300 cm = 3 m.",
    ],
    [
      "A scale of 1 : 1 000 means that 1 cm on the plan represents ___ in reality.",
      ["10 cm", "100 cm", "1 m", "1 000 cm"],
      3,
      "In a number scale the units match, so 1 cm represents 1 000 cm (which is 10 m) in reality.",
    ],
    [
      "On a compass, the direction directly opposite East is:",
      ["West", "North", "South", "North-East"],
      0,
      "East and West are opposite each other on a compass.",
    ],
    [
      "A scale of 1 : 50 is used. A real object 2 m (200 cm) long is drawn as:",
      ["2 cm", "8 cm", "4 cm", "40 cm"],
      2,
      "Divide the real length by 50: 200 cm ÷ 50 = 4 cm on the plan.",
    ],
    [
      "On most maps, the direction at the top of the page is:",
      ["South", "North", "East", "West"],
      1,
      "By convention, North is at the top of a map unless a compass shows otherwise.",
    ],
    [
      "If you face South and turn 90° clockwise (to the right), you will face:",
      ["East", "North", "South-West", "West"],
      3,
      "Turning clockwise from South (N → E → S → W), a 90° turn brings you to face West.",
    ],
    [
      "On a plan with a scale of 1 : 200, a wall drawn 5 cm long is actually:",
      ["10 m", "5 m", "20 m", "100 m"],
      0,
      "5 cm × 200 = 1 000 cm = 10 m.",
    ],
    [
      "On a map with a scale of 1 : 100 000, two towns are 4 cm apart. The actual distance is:",
      ["40 m", "400 m", "4 km", "40 km"],
      2,
      "4 cm × 100 000 = 400 000 cm = 4 km (since 1 km = 100 000 cm).",
    ],
  ],
  "Data Handling": [
    [
      "Find the mean of: 2, 4, 6, 8.",
      ["4", "5", "6", "20"],
      1,
      "Mean = (2 + 4 + 6 + 8) ÷ 4 = 20 ÷ 4 = 5.",
    ],
    [
      "Find the median of: 5, 8, 10, 12, 15.",
      ["8", "12", "15", "10"],
      3,
      "The values are in order; the median is the middle value of the five, which is 10.",
    ],
    [
      "Find the mode of: 3, 7, 3, 9, 3, 5.",
      ["3", "5", "7", "9"],
      0,
      "The mode is the value that appears most often. The number 3 appears three times.",
    ],
    [
      "Find the range of: 10, 4, 16, 8.",
      ["4", "8", "12", "16"],
      2,
      "Range = highest − lowest = 16 − 4 = 12.",
    ],
    [
      "The mean of a data set is the:",
      [
        "middle value when ordered",
        "average of all the values",
        "most common value",
        "largest value",
      ],
      1,
      "The mean is the average — the sum of all values divided by how many there are.",
    ],
    [
      "In a class of 40 learners, 25% wear glasses. How many learners wear glasses?",
      ["5", "8", "20", "10"],
      3,
      "25% of 40 = 0.25 × 40 = 10 learners.",
    ],
    [
      "The mean of 4 numbers is 12. What is their total?",
      ["48", "16", "3", "24"],
      0,
      "Total = mean × number of values = 12 × 4 = 48.",
    ],
    [
      "Find the median of the data set 6, 2, 9, 4 (arrange in order first).",
      ["4", "6", "5", "7"],
      2,
      "In order: 2, 4, 6, 9. With four values the median is the mean of the middle two: (4 + 6) ÷ 2 = 5.",
    ],
  ],
  "Probability": [
    [
      "The probability of an impossible event is:",
      ["0", "0.5", "1", "100"],
      0,
      "An impossible event has a probability of 0 — it cannot happen.",
    ],
    [
      "The probability of getting tails when tossing one fair coin is:",
      ["1", "1/4", "1/2", "0"],
      2,
      "A coin has two equally likely outcomes, so P(tails) = 1 out of 2 = 1/2.",
    ],
    [
      "The probability of rolling a 2 on an ordinary six-sided die is:",
      ["1/2", "1/6", "1/3", "5/6"],
      1,
      "There is one '2' on the six faces, so the probability is 1/6.",
    ],
    [
      "The probability of rolling an odd number on an ordinary six-sided die is:",
      ["1/6", "1/3", "2/3", "1/2"],
      3,
      "The odd numbers are 1, 3 and 5 — that is 3 of the 6 faces, so 3/6 = 1/2.",
    ],
    [
      "The probability of an event that is certain to happen is:",
      ["1", "0", "0.5", "2"],
      0,
      "A certain event has a probability of 1, the maximum on the probability scale.",
    ],
    [
      "A bag contains 4 red and 1 blue ball. The probability of drawing the blue ball is:",
      ["4/5", "2/5", "1/5", "1/4"],
      2,
      "There is 1 blue ball out of 5 balls in total, so P(blue) = 1/5.",
    ],
    [
      "A bag contains 4 red and 1 blue ball. The probability of drawing a red ball is:",
      ["1/5", "4/5", "1/4", "5/4"],
      1,
      "There are 4 red balls out of 5 in total, so P(red) = 4/5.",
    ],
    [
      "A spinner has 5 equal sections numbered 1 to 5. The probability of landing on an even number is:",
      ["1/5", "3/5", "1/2", "2/5"],
      3,
      "The even numbers are 2 and 4 — that is 2 of the 5 sections, so the probability is 2/5.",
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
