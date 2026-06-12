// Seeds the Grade 12 Mathematical Literacy question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only (calculations, definitions, conversions).
// Every numeric answer was double-checked by computation during drafting.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade12-mathslit.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Mathematical Literacy";
const GRADE = "Grade 12";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Numbers, Ratio & Proportion": [
    [
      "Simplify the ratio 8 : 12 to its simplest form.",
      ["2 : 3", "3 : 2", "4 : 6", "1 : 2"],
      0,
      "Divide both parts by their highest common factor, 4: 8 ÷ 4 = 2 and 12 ÷ 4 = 3, giving 2 : 3.",
    ],
    [
      "R100 is shared between two people in the ratio 2 : 3. How much does the person with the larger share receive?",
      ["R40", "R50", "R60", "R66"],
      2,
      "The ratio has 2 + 3 = 5 parts, so each part is R100 ÷ 5 = R20. The larger share is 3 × R20 = R60.",
    ],
    [
      "A car travels 240 km in 3 hours. What is its average speed?",
      ["60 km/h", "70 km/h", "80 km/h", "720 km/h"],
      2,
      "Average speed = distance ÷ time = 240 km ÷ 3 h = 80 km/h.",
    ],
    [
      "If 4 pens cost R20, how much will 7 pens cost at the same rate?",
      ["R28", "R35", "R40", "R140"],
      1,
      "One pen costs R20 ÷ 4 = R5, so 7 pens cost 7 × R5 = R35.",
    ],
    [
      "What is 25% of 80?",
      ["16", "20", "25", "32"],
      1,
      "25% = 0.25, so 0.25 × 80 = 20. (25% is a quarter, and a quarter of 80 is 20.)",
    ],
    [
      "Express the fraction 3/4 as a percentage.",
      ["34%", "43%", "75%", "80%"],
      2,
      "3 ÷ 4 = 0.75, and 0.75 × 100 = 75%.",
    ],
    [
      "A recipe for 4 people needs 200 g of flour. How much flour is needed for 6 people?",
      ["250 g", "300 g", "350 g", "400 g"],
      1,
      "Flour per person = 200 g ÷ 4 = 50 g. For 6 people: 6 × 50 g = 300 g (direct proportion).",
    ],
    [
      "Round 3 467 to the nearest hundred.",
      ["3 400", "3 460", "3 470", "3 500"],
      3,
      "The tens digit is 6, which is 5 or more, so round up: 3 467 rounds to 3 500.",
    ],
  ],
  "Finance": [
    [
      "An item costs R200 before VAT. VAT in South Africa is 15%. How much VAT is added?",
      ["R15", "R30", "R45", "R230"],
      1,
      "VAT = 15% of R200 = 0.15 × 200 = R30.",
    ],
    [
      "A till slip shows a total of R115, which includes 15% VAT. The price excluding VAT is:",
      ["R100", "R97.75", "R98.05", "R115"],
      0,
      "The R115 represents 115% of the original price, so price excl. VAT = R115 ÷ 1.15 = R100.",
    ],
    [
      "R5 000 is invested at 8% simple interest per year. How much interest is earned after 3 years?",
      ["R400", "R1 200", "R1 344", "R5 000"],
      1,
      "Simple interest = P × r × t = 5 000 × 0.08 × 3 = R1 200.",
    ],
    [
      "R1 000 is invested at 10% per year compound interest. What is the value of the investment after 2 years?",
      ["R1 100", "R1 200", "R1 210", "R1 020"],
      2,
      "Compound: 1 000 × (1.10)² = 1 000 × 1.21 = R1 210. (Year 1: R1 100; year 2 adds 10% of R1 100 = R110.)",
    ],
    [
      "If the exchange rate is US$1 = R18, how many US dollars can you buy with R900?",
      ["$40", "$50", "$60", "$16 200"],
      1,
      "Divide rands by the rate: R900 ÷ 18 = $50.",
    ],
    [
      "A jacket marked R450 is on sale at 20% off. What is the sale price?",
      ["R90", "R360", "R430", "R540"],
      1,
      "Discount = 20% of R450 = R90, so the sale price = R450 − R90 = R360.",
    ],
    [
      "A household has a monthly income of R8 000 and total expenses of R6 500. The monthly balance is:",
      ["A deficit of R1 500", "A surplus of R1 500", "A surplus of R14 500", "A balanced budget"],
      1,
      "Balance = income − expenses = R8 000 − R6 500 = R1 500. Income exceeds expenses, so it is a surplus.",
    ],
    [
      "Inflation is best described as:",
      [
        "a general increase in prices over time",
        "an increase in your salary",
        "a decrease in prices over time",
        "the interest a bank pays you",
      ],
      0,
      "Inflation is the general rise in the prices of goods and services over time, which reduces the buying power of money.",
    ],
  ],
  "Measurement & Conversions": [
    [
      "Convert 2.5 metres to centimetres.",
      ["25 cm", "250 cm", "2 500 cm", "0.025 cm"],
      1,
      "1 m = 100 cm, so 2.5 × 100 = 250 cm.",
    ],
    [
      "How many metres are there in 3.2 kilometres?",
      ["320 m", "3 200 m", "32 000 m", "0.0032 m"],
      1,
      "1 km = 1 000 m, so 3.2 × 1 000 = 3 200 m.",
    ],
    [
      "A rectangular room is 8 m long and 5 m wide. What is its floor area?",
      ["13 m²", "26 m²", "40 m²", "80 m²"],
      2,
      "Area of a rectangle = length × width = 8 × 5 = 40 m².",
    ],
    [
      "What is the perimeter of a rectangle that is 8 m long and 5 m wide?",
      ["13 m", "26 m", "40 m", "80 m"],
      1,
      "Perimeter = 2 × (length + width) = 2 × (8 + 5) = 2 × 13 = 26 m.",
    ],
    [
      "How many millilitres are there in 1.5 litres?",
      ["15 ml", "150 ml", "1 500 ml", "15 000 ml"],
      2,
      "1 litre = 1 000 ml, so 1.5 × 1 000 = 1 500 ml.",
    ],
    [
      "A storage container measures 2 m × 3 m × 4 m. What is its volume?",
      ["9 m³", "24 m³", "26 m³", "48 m³"],
      1,
      "Volume of a rectangular box = length × width × height = 2 × 3 × 4 = 24 m³.",
    ],
    [
      "How many minutes are there in 2.5 hours?",
      ["125 min", "150 min", "200 min", "250 min"],
      1,
      "1 hour = 60 minutes, so 2.5 × 60 = 150 minutes.",
    ],
    [
      "Convert 0.75 kilograms to grams.",
      ["75 g", "750 g", "7 500 g", "0.00075 g"],
      1,
      "1 kg = 1 000 g, so 0.75 × 1 000 = 750 g.",
    ],
  ],
  "Maps, Plans & Scale": [
    [
      "On a plan with a scale of 1 : 100, a wall is drawn 5 cm long. What is the real length of the wall?",
      ["50 cm", "5 m", "50 m", "500 m"],
      1,
      "A scale of 1 : 100 means 1 cm represents 100 cm. So 5 cm × 100 = 500 cm = 5 m.",
    ],
    [
      "A map scale of 1 : 50 000 means that 1 cm on the map represents:",
      [
        "50 000 cm in reality",
        "50 000 m in reality",
        "50 000 km in reality",
        "5 000 cm in reality",
      ],
      0,
      "In a number scale, the units are the same on both sides: 1 cm on the map represents 50 000 cm in reality.",
    ],
    [
      "On a compass, the direction directly opposite North is:",
      ["East", "South", "West", "North-East"],
      1,
      "North and South are opposite each other on a compass; East and West are the other opposite pair.",
    ],
    [
      "A scale of 1 : 200 is used. A real wall 8 m long will be drawn on the plan as:",
      ["2 cm", "4 cm", "8 cm", "40 cm"],
      1,
      "8 m = 800 cm. Divide the real length by 200: 800 ÷ 200 = 4 cm on the plan.",
    ],
    [
      "If you are facing North and turn 90° clockwise, you will be facing:",
      ["East", "South", "West", "North-West"],
      0,
      "A 90° clockwise turn from North points you East (the next compass point going clockwise).",
    ],
    [
      "On a map with a scale of 1 : 100 000, two towns are 3 cm apart. The actual distance between them is:",
      ["3 m", "300 m", "3 km", "30 km"],
      2,
      "3 cm × 100 000 = 300 000 cm. Convert: 300 000 cm ÷ 100 000 = 3 km (since 1 km = 100 000 cm).",
    ],
    [
      "On most maps, which direction is at the top?",
      ["North", "South", "East", "West"],
      0,
      "By convention, maps are drawn with North at the top unless a compass indicator shows otherwise.",
    ],
    [
      "Compared with a scale of 1 : 500, a drawing made at a scale of 1 : 50 shows the object:",
      ["larger and in more detail", "smaller", "the same size", "upside down"],
      0,
      "The smaller the second number, the larger the representation. At 1 : 50 each real cm is shrunk less than at 1 : 500, so the object appears larger and in more detail.",
    ],
  ],
  "Data Handling": [
    [
      "Find the mean of: 4, 6, 8, 10, 12.",
      ["8", "9", "10", "40"],
      0,
      "Mean = sum ÷ number of values = (4 + 6 + 8 + 10 + 12) ÷ 5 = 40 ÷ 5 = 8.",
    ],
    [
      "Find the median of: 3, 7, 9, 12, 15.",
      ["7", "9", "12", "15"],
      1,
      "The values are already in order; the median is the middle value of the five, which is 9.",
    ],
    [
      "Find the mode of: 5, 3, 5, 8, 5, 2.",
      ["2", "3", "5", "8"],
      2,
      "The mode is the value that appears most often. The number 5 occurs three times, more than any other.",
    ],
    [
      "Find the range of: 12, 5, 20, 8, 15.",
      ["8", "12", "15", "20"],
      2,
      "Range = highest value − lowest value = 20 − 5 = 15.",
    ],
    [
      "Find the median of: 4, 8, 10, 14.",
      ["8", "9", "10", "12"],
      1,
      "With an even number of values, the median is the mean of the two middle values: (8 + 10) ÷ 2 = 9.",
    ],
    [
      "The mode of a data set is:",
      [
        "the value that occurs most often",
        "the middle value when ordered",
        "the average of all the values",
        "the difference between highest and lowest",
      ],
      0,
      "The mode is the value that appears most frequently. The middle value is the median, the average is the mean, and the spread is the range.",
    ],
    [
      "In a class of 30 learners, 40% walk to school. How many learners walk to school?",
      ["12", "15", "18", "40"],
      0,
      "40% of 30 = 0.40 × 30 = 12 learners.",
    ],
    [
      "The mean of 5 test scores is 60. What is the total of all 5 scores?",
      ["12", "65", "300", "600"],
      2,
      "Total = mean × number of values = 60 × 5 = 300.",
    ],
  ],
  "Probability": [
    [
      "What is the probability of getting heads when tossing one fair coin?",
      ["0", "0.25", "0.5", "1"],
      2,
      "A coin has two equally likely outcomes, heads and tails, so P(heads) = 1 out of 2 = 0.5.",
    ],
    [
      "What is the probability of rolling a 4 on an ordinary six-sided die?",
      ["1/6", "1/4", "1/2", "4/6"],
      0,
      "There is one '4' among six equally likely faces, so the probability is 1/6.",
    ],
    [
      "What is the probability of rolling an even number on an ordinary six-sided die?",
      ["1/6", "1/3", "1/2", "2/3"],
      2,
      "The even numbers are 2, 4 and 6 — that is 3 of the 6 faces, so 3/6 = 1/2.",
    ],
    [
      "A probability of 0 means an event is:",
      ["certain to happen", "impossible", "likely", "a 50-50 chance"],
      1,
      "Probabilities run from 0 (impossible) to 1 (certain). A probability of 0 means the event cannot happen.",
    ],
    [
      "A bag contains 3 red and 2 blue marbles. What is the probability of drawing a red marble?",
      ["2/5", "3/5", "1/2", "3/2"],
      1,
      "There are 3 red marbles out of 5 marbles in total, so P(red) = 3/5.",
    ],
    [
      "A bag contains 3 red and 2 blue marbles. What is the probability of NOT drawing a red marble?",
      ["3/5", "2/5", "1/5", "1"],
      1,
      "Not red means blue: there are 2 blue out of 5 marbles, so P(not red) = 2/5. (It also equals 1 − 3/5.)",
    ],
    [
      "The probability of an event that is certain to happen is:",
      ["0", "0.5", "1", "100"],
      2,
      "On the probability scale, a certain event has a probability of 1 (the maximum possible value).",
    ],
    [
      "A spinner is divided into 4 equal sections numbered 1 to 4. What is the probability of landing on 3?",
      ["1/4", "1/3", "3/4", "1/2"],
      0,
      "There is one section labelled '3' out of 4 equal sections, so the probability is 1/4.",
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
