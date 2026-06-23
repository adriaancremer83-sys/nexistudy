// Seeds the Grade 9 Social Sciences question bank (6 topics x 8 questions).
// CAPS Senior Phase. GEOGRAPHY PORTION ONLY — the History half of Social
// Sciences is interpretive (source analysis / essays) and not suitable for the
// objectively-checkable MCQ pipeline, so it is deliberately excluded.
// Subject string is exactly "Social Sciences (History & Geography)" to match the
// Senior Phase subject list in app/nexi-tutor/page.tsx.
// Six Geography topics drawn from Senior Phase / Gr9 CAPS (map skills & GIS,
// climate & weather, development, surface forces, population & settlement,
// resource use & sustainability). Pitched at Grade 9 level and DISTINCT from the
// Gr10 Geography bank (which uses different numbers/examples and leans into
// plate tectonics, folding/faulting, the water cycle, etc.).
// Every numeric answer double-checked by computation during drafting.
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but NOT option order).
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade9-socialsciences.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Social Sciences (History & Geography)";
const GRADE = "Grade 9";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Map Skills & GIS": [
    [
      "The ratio that shows how distance on a map relates to the real distance on the ground is the map's:",
      ["scale", "key", "compass", "title"],
      0,
      "The scale tells you how a distance on the map compares to the actual distance on the ground.",
    ],
    [
      "On a standard map, which direction is found at the top?",
      ["south", "north", "east", "west"],
      1,
      "By convention, north is at the top of a standard map.",
    ],
    [
      "The set of symbols that explains what the features on a map represent is the map's:",
      ["scale", "grid", "key (legend)", "border"],
      2,
      "The key, or legend, explains what each symbol and colour on the map stands for.",
    ],
    [
      "In geography, the letters GIS stand for:",
      [
        "Global Internet System",
        "Geographic Imaging Software",
        "Ground Information Survey",
        "Geographic Information System",
      ],
      3,
      "GIS stands for Geographic Information System — computer technology used to capture, store and display spatial (map) data.",
    ],
    [
      "Lines on a map that join places of equal height above sea level are called:",
      ["contour lines", "lines of latitude", "grid lines", "scale lines"],
      0,
      "Contour lines join points of equal height above sea level and show the shape of the land.",
    ],
    [
      "On a compass, the direction exactly between north and east is:",
      ["north-west", "north-east", "south-east", "south-west"],
      1,
      "The direction halfway between north and east is north-east (NE).",
    ],
    [
      "A map drawn to a scale of 1 : 50 000 means that 1 cm on the map represents how much on the ground?",
      ["50 metres", "5 kilometres", "500 metres", "5 metres"],
      2,
      "1 : 50 000 means 1 cm on the map = 50 000 cm on the ground = 500 m.",
    ],
    [
      "The imaginary line of latitude numbered 0°, which divides the Earth into the Northern and Southern Hemispheres, is the:",
      ["Prime Meridian", "Tropic of Cancer", "Greenwich line", "Equator"],
      3,
      "The Equator is the 0° line of latitude that splits the Earth into the Northern and Southern Hemispheres.",
    ],
  ],
  "Climate & Weather": [
    [
      "The day-to-day condition of the atmosphere in a place (sunny, rainy, windy) is called the:",
      ["weather", "climate", "season", "altitude"],
      0,
      "Weather is the short-term, day-to-day state of the atmosphere in a place.",
    ],
    [
      "The average weather conditions of a place measured over many years is called its:",
      ["weather", "climate", "forecast", "temperature"],
      1,
      "Climate is the average pattern of weather of a place measured over a long period (about 30 years).",
    ],
    [
      "Which instrument is used to measure temperature?",
      ["barometer", "anemometer", "thermometer", "rain gauge"],
      2,
      "A thermometer measures temperature.",
    ],
    [
      "Which instrument is used to measure how much rain has fallen?",
      ["thermometer", "anemometer", "barometer", "rain gauge"],
      3,
      "A rain gauge collects and measures the amount of rainfall.",
    ],
    [
      "As you climb higher up a mountain (as altitude increases), the temperature usually:",
      ["decreases", "increases", "stays exactly the same", "doubles"],
      0,
      "Temperature generally decreases as altitude increases — higher places are colder.",
    ],
    [
      "The line of latitude that passes through the northern part of South Africa (Limpopo) is the:",
      ["Equator", "Tropic of Capricorn", "Tropic of Cancer", "Arctic Circle"],
      1,
      "The Tropic of Capricorn (about 23.5° South) passes through the northern part of South Africa.",
    ],
    [
      "Which instrument is used to measure wind speed?",
      ["thermometer", "rain gauge", "anemometer", "barometer"],
      2,
      "An anemometer measures wind speed.",
    ],
    [
      "Which of the following does NOT affect the climate of a place?",
      ["distance from the sea", "altitude", "latitude", "the day of the week"],
      3,
      "Distance from the sea, altitude and latitude all affect climate; the day of the week does not.",
    ],
  ],
  "Development: Rich & Poor Countries": [
    [
      "A country with a high income, advanced industry and good services is described as a:",
      ["developed country", "developing country", "rural country", "small country"],
      0,
      "A developed country has a high income, well-developed industry, and good services like healthcare and education.",
    ],
    [
      "A country that is still building up its industry and services and has a lower average income is called a:",
      ["developed country", "developing country", "wealthy country", "first-world country"],
      1,
      "A developing country is still growing its economy and services and has a lower average income.",
    ],
    [
      "The letters GDP stand for:",
      [
        "Gross Domestic Population",
        "General Development Plan",
        "Gross Domestic Product",
        "Global Development Programme",
      ],
      2,
      "GDP stands for Gross Domestic Product — the total value of all goods and services a country produces in a year.",
    ],
    [
      "Which of the following is an indicator used to measure a country's level of development?",
      ["its favourite sport", "the colour of its flag", "the name of its capital city", "life expectancy"],
      3,
      "Life expectancy (the average age people live to) is a common indicator of a country's development.",
    ],
    [
      "The number of babies who die before their first birthday, per 1 000 live births, is the:",
      ["infant mortality rate", "birth rate", "literacy rate", "growth rate"],
      0,
      "The infant mortality rate measures how many babies die before age one per 1 000 live births; it is lower in developed countries.",
    ],
    [
      "The percentage of adults in a country who can read and write is called the:",
      ["employment rate", "literacy rate", "mortality rate", "exchange rate"],
      1,
      "The literacy rate is the percentage of adults who can read and write.",
    ],
    [
      "Most of the world's developed countries are found in which part of the world, often called the global ___?",
      ["global South", "global East", "global North", "global West"],
      2,
      "Most developed countries lie in the 'global North'; most developing countries lie in the 'global South'.",
    ],
    [
      "Compared with a developed country, a developing country usually has a:",
      ["higher average income", "greater number of doctors per person", "lower population growth rate", "lower average income"],
      3,
      "Developing countries generally have a lower average income than developed countries.",
    ],
  ],
  "Surface Forces Shaping the Earth": [
    [
      "The breaking down of rocks into smaller pieces where they lie, without being moved away, is called:",
      ["weathering", "erosion", "deposition", "transportation"],
      0,
      "Weathering is the breaking down of rock in place, without the broken material being carried away.",
    ],
    [
      "The wearing away and carrying off of soil and rock by water, wind or ice is called:",
      ["weathering", "erosion", "deposition", "condensation"],
      1,
      "Erosion is the wearing away of the land and the carrying away of the loosened material by water, wind or ice.",
    ],
    [
      "The dropping of sand, soil and stones that a river or the wind has been carrying, in a new place, is called:",
      ["weathering", "erosion", "deposition", "evaporation"],
      2,
      "Deposition happens when a river or wind loses energy and drops the material it was carrying.",
    ],
    [
      "The place high up where a river begins is called its:",
      ["mouth", "delta", "channel", "source"],
      3,
      "The source is the starting point of a river, usually in high ground such as mountains or hills.",
    ],
    [
      "The place where a river finally flows into the sea is called its:",
      ["mouth", "source", "bank", "bed"],
      0,
      "The mouth is the end of a river, where it flows into the sea or a lake.",
    ],
    [
      "When tree roots grow into cracks in a rock and slowly break it apart, this is an example of ___ weathering:",
      ["chemical", "biological", "frost", "wind"],
      1,
      "Biological weathering is caused by living things, such as plant roots prising rocks apart.",
    ],
    [
      "The flat, often fan-shaped area of deposited sediment formed where a river enters the sea is called a:",
      ["meander", "waterfall", "delta", "gorge"],
      2,
      "A delta is a build-up of deposited sediment where a river meets the sea and slows down.",
    ],
    [
      "A large bend or loop in the course of a river is called a:",
      ["delta", "source", "tributary", "meander"],
      3,
      "A meander is a curve or loop that a river forms as it winds across flatter land.",
    ],
  ],
  "Population & Settlement": [
    [
      "The total number of people living in a particular area is called its:",
      ["population", "density", "migration", "fertility"],
      0,
      "Population is the total number of people living in a place.",
    ],
    [
      "The number of people living in each square kilometre of land is called population:",
      ["growth", "density", "total", "decline"],
      1,
      "Population density measures how many people live in each square kilometre.",
    ],
    [
      "The movement of people from one place to another in order to live there is called:",
      ["tourism", "commuting", "migration", "harvesting"],
      2,
      "Migration is the movement of people from one place to another to settle and live.",
    ],
    [
      "The movement of people from rural areas (the countryside) into towns and cities is called:",
      ["migration", "emigration", "immigration", "urbanisation"],
      3,
      "Urbanisation is the growth of towns and cities as people move from rural areas into them.",
    ],
    [
      "A small settlement in the countryside, often based on farming, is best described as a:",
      ["rural settlement", "metropolis", "city centre", "industrial zone"],
      0,
      "A rural settlement is a small countryside settlement, usually linked to farming.",
    ],
    [
      "Reasons that attract people TO a city, such as jobs and better schools, are called:",
      ["push factors", "pull factors", "birth factors", "death factors"],
      1,
      "Pull factors are the attractions that draw people towards a place, such as jobs and services.",
    ],
    [
      "Reasons that drive people AWAY from an area, such as drought or a lack of jobs, are called:",
      ["pull factors", "growth factors", "push factors", "trade factors"],
      2,
      "Push factors are the negative conditions that drive people away from a place.",
    ],
    [
      "A diagram that shows the age and sex (male/female) structure of a population is called a population:",
      ["circle", "map", "table", "pyramid"],
      3,
      "A population pyramid is a bar diagram showing the numbers of males and females in each age group.",
    ],
  ],
  "Resource Use & Sustainability": [
    [
      "A resource that is replaced naturally within a short time, such as sunlight or wind, is called a:",
      ["renewable resource", "non-renewable resource", "fossil resource", "mineral resource"],
      0,
      "Renewable resources, like sunlight and wind, are naturally replaced and will not run out if used wisely.",
    ],
    [
      "A resource that takes millions of years to form and can run out, such as coal or oil, is called a:",
      ["renewable resource", "non-renewable resource", "recyclable resource", "endless resource"],
      1,
      "Non-renewable resources such as coal and oil take millions of years to form and can be used up.",
    ],
    [
      "Using resources carefully now so that they are still available for future generations is called ___ development:",
      ["rapid", "industrial", "sustainable", "unequal"],
      2,
      "Sustainable development means meeting today's needs without using up resources that future generations will need.",
    ],
    [
      "Which of the following is a renewable source of energy?",
      ["coal", "oil", "natural gas", "solar power"],
      3,
      "Solar power (energy from the Sun) is renewable; coal, oil and natural gas are non-renewable fossil fuels.",
    ],
    [
      "Coal, oil and natural gas are together known as:",
      ["fossil fuels", "renewable fuels", "biofuels", "nuclear fuels"],
      0,
      "Coal, oil and natural gas are fossil fuels, formed from the remains of plants and animals over millions of years.",
    ],
    [
      "Reusing items and recycling materials such as paper and glass helps to:",
      ["use up resources faster", "reduce waste and save resources", "increase pollution", "waste more water"],
      1,
      "Reusing and recycling reduces the amount of waste and saves natural resources.",
    ],
    [
      "South Africa often faces shortages of which essential resource, especially during droughts?",
      ["sunlight", "sand", "water", "air"],
      2,
      "South Africa is a water-scarce country and often faces water shortages, especially during droughts.",
    ],
    [
      "The cutting down of large areas of forest, which damages the environment, is called:",
      ["afforestation", "irrigation", "urbanisation", "deforestation"],
      3,
      "Deforestation is the clearing or cutting down of large areas of forest.",
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
