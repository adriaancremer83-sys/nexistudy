// Seeds the Grade 10 Agricultural Sciences question bank (6 topics x 8
// questions). CAPS-aligned, objectively-checkable only (definitions,
// classifications, basic agri facts, simple sums). Grade 10 introductory level.
// Topics + questions are DISTINCT from BOTH the Gr11 bank (soil formation, soil
// fertility, plant structure/photosynthesis, plant propagation, agro-ecology,
// farm management economics) and the Gr12 bank (animal nutrition, reproduction,
// genetics, breeding, animal health, agri management & marketing). Gr10 here
// introduces the subject: branches of agriculture, climate & weather, basic
// classification of farm animals and crops, water & irrigation, and basic
// agri-economics/record-keeping (with numbers DISTINCT from the Gr11 sums).
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but NOT option order). Numeric answers double-checked.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade10-agriculturalsciences.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Agricultural Sciences";
const GRADE = "Grade 10";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Introduction to Agriculture & Its Branches": [
    [
      "'Agriculture' is best defined as:",
      [
        "the science and practice of cultivating crops and raising animals for food and other products",
        "the buying and selling of cars",
        "the study of the weather only",
        "the building of houses in cities",
      ],
      0,
      "Agriculture is the science and practice of growing crops and raising animals to produce food, fibre and other useful products.",
    ],
    [
      "A farmer who grows maize, wheat and vegetables practises:",
      ["animal husbandry", "crop production (agronomy)", "mining", "deep-sea fishing"],
      1,
      "Growing crops such as grains and vegetables is crop production (agronomy), one of the main branches of agriculture.",
    ],
    [
      "A farmer who keeps cattle, sheep and goats for meat, milk or wool practises:",
      ["crop farming", "flower growing", "animal production (livestock farming)", "forestry"],
      2,
      "Raising animals such as cattle, sheep and goats for their products is animal production (livestock farming).",
    ],
    [
      "'Subsistence farming' is best described as farming that:",
      [
        "produces huge surpluses mainly for export",
        "uses only the latest expensive machines",
        "is done only inside large cities",
        "produces mainly enough food for the farmer's own family, with little left to sell",
      ],
      3,
      "Subsistence farming produces mostly enough food for the farmer's own household, with little or no surplus to sell.",
    ],
    [
      "'Commercial farming' is farming that:",
      [
        "produces crops and animals mainly to sell for a profit",
        "produces food only for the farmer's own family",
        "never sells any of its produce",
        "does not use any land at all",
      ],
      0,
      "Commercial farming produces crops and livestock on a large scale mainly to sell for profit.",
    ],
    [
      "'Horticulture' is the branch of agriculture that deals with the growing of:",
      ["cattle and sheep", "fruit, vegetables and flowers", "fish in dams", "trees for timber only"],
      1,
      "Horticulture is the cultivation of fruit, vegetables and ornamental plants such as flowers.",
    ],
    [
      "A farm that produces BOTH crops and livestock together is called a:",
      ["subsistence-only farm", "fish farm", "mixed farming enterprise", "single-crop plantation"],
      2,
      "Mixed farming combines crop production and livestock on the same farm, which spreads risk.",
    ],
    [
      "One important reason agriculture is important to South Africa is that it:",
      [
        "uses up all the country's water for no reason",
        "produces no jobs at all",
        "has nothing to do with the economy",
        "provides food, creates jobs and earns export income",
      ],
      3,
      "Agriculture supplies the nation's food, creates employment and earns valuable foreign income through exports.",
    ],
  ],
  "Climate & Weather in Agriculture": [
    [
      "The difference between 'weather' and 'climate' is that climate is:",
      [
        "the weather at this exact moment",
        "the average weather conditions of an area over many years",
        "only the temperature recorded today",
        "the same as a single thunderstorm",
      ],
      1,
      "Weather is the day-to-day state of the atmosphere; climate is the average weather of an area measured over many years.",
    ],
    [
      "The instrument used to measure the amount of rainfall is a:",
      ["thermometer", "barometer", "rain gauge", "wind vane"],
      2,
      "A rain gauge collects and measures the amount of rain that falls, usually in millimetres.",
    ],
    [
      "The instrument used to measure temperature is a:",
      ["rain gauge", "wind vane", "barometer", "thermometer"],
      3,
      "A thermometer measures temperature, an important weather element for plant and animal growth.",
    ],
    [
      "'Frost' can damage crops because it:",
      [
        "freezes the water inside plant cells, killing the plant tissue",
        "adds extra nutrients to the leaves",
        "helps seeds to germinate faster",
        "raises the temperature of the soil",
      ],
      0,
      "Frost freezes the water in plant cells, which bursts and kills the tissue, damaging or killing sensitive crops.",
    ],
    [
      "A long period with little or no rain, which can cause crops to fail, is called a:",
      ["flood", "drought", "frost", "hailstorm"],
      1,
      "A drought is an extended period of unusually low rainfall that can cause crops to fail and water shortages.",
    ],
    [
      "The instrument that shows the DIRECTION from which the wind is blowing is a:",
      ["thermometer", "rain gauge", "wind vane", "barometer"],
      2,
      "A wind vane points into the wind and shows the direction from which the wind is blowing.",
    ],
    [
      "Rainfall is very important to a crop farmer because water is needed for:",
      [
        "nothing in particular",
        "making the soil colder only",
        "blowing the seeds away",
        "plant growth, germination and the uptake of nutrients",
      ],
      3,
      "Plants need water for germination, growth and to absorb dissolved nutrients from the soil, so rainfall is vital.",
    ],
    [
      "Climate is an important factor when deciding which crops to plant because:",
      [
        "different crops grow best in different temperature and rainfall conditions",
        "climate has no effect on plants at all",
        "all crops grow equally well everywhere",
        "crops do not need any water or warmth",
      ],
      0,
      "Each crop suits particular temperature and rainfall conditions, so the local climate determines which crops will do well.",
    ],
  ],
  "Classification of Farm Animals": [
    [
      "Animals such as cattle, sheep and goats that have a stomach with four compartments and chew the cud are called:",
      ["non-ruminants", "poultry", "ruminants", "carnivores"],
      2,
      "Ruminants (cattle, sheep, goats) have a four-chambered stomach and re-chew their food (chew the cud).",
    ],
    [
      "Animals such as pigs and poultry that have a simple, single-chambered stomach are called:",
      ["ruminants", "cud-chewers", "grass-eaters only", "non-ruminants (monogastric animals)"],
      3,
      "Non-ruminant (monogastric) animals, such as pigs and chickens, have a single, simple stomach.",
    ],
    [
      "An adult female of cattle that has had a calf is called a:",
      ["cow", "bull", "ewe", "sow"],
      0,
      "A cow is an adult female bovine that has produced a calf; an adult male is a bull.",
    ],
    [
      "An adult male sheep is called a:",
      ["bull", "ram", "boar", "rooster"],
      1,
      "A ram is an adult male sheep; an adult female sheep is a ewe.",
    ],
    [
      "The young of a pig is called a:",
      ["calf", "lamb", "piglet", "chick"],
      2,
      "A young pig is a piglet; a young sheep is a lamb and a young cow is a calf.",
    ],
    [
      "Chickens, ducks and turkeys kept on a farm are together known as:",
      ["ruminants", "cattle", "swine", "poultry"],
      3,
      "Poultry is the collective term for domestic birds such as chickens, ducks and turkeys kept for eggs and meat.",
    ],
    [
      "An adult female pig is called a:",
      ["sow", "cow", "ewe", "hen"],
      0,
      "A sow is an adult female pig; an adult male pig is a boar.",
    ],
    [
      "A 'herbivore' is an animal that eats mainly:",
      ["other animals (meat)", "plants", "soil", "metal"],
      1,
      "A herbivore eats mainly plant material; cattle, sheep and goats are herbivores.",
    ],
  ],
  "Crop Types & Basic Plant Classification": [
    [
      "Maize, wheat, sorghum and rice are examples of:",
      ["fruit trees", "leafy vegetables", "garden flowers", "cereal (grain) crops"],
      3,
      "Cereals (grain crops) such as maize, wheat, sorghum and rice are grown for their edible seeds (grain).",
    ],
    [
      "Beans, peas, lucerne and groundnuts belong to the group of plants called:",
      ["legumes", "cereals", "root vegetables", "grasses"],
      0,
      "Legumes (beans, peas, lucerne, groundnuts) bear seeds in pods, and many fix nitrogen in the soil.",
    ],
    [
      "A 'perennial' crop is one that:",
      [
        "lives for only one season and then dies",
        "lives and produces for several years",
        "never produces any harvest",
        "grows only during winter nights",
      ],
      1,
      "A perennial crop lives and produces for several years, unlike an annual that lasts one season.",
    ],
    [
      "An 'annual' crop, such as maize, is one that:",
      [
        "lives for many years",
        "is grown only for its flowers",
        "completes its life cycle (grows, produces seed and dies) within one season or year",
        "is actually a kind of tree",
      ],
      2,
      "An annual crop completes its whole life cycle within one growing season or year.",
    ],
    [
      "Carrots, potatoes and beetroot are crops grown mainly for their:",
      ["flowers", "leaves only", "wood", "edible roots or tubers"],
      3,
      "These crops are grown for the edible parts that grow underground — roots or tubers.",
    ],
    [
      "A 'fodder' (forage) crop, such as lucerne or oats, is grown mainly to:",
      [
        "provide feed for farm animals",
        "be sold as fresh-cut flowers",
        "be used to build houses",
        "be made into clothing",
      ],
      0,
      "Fodder (forage) crops such as lucerne and oats are grown to feed livestock.",
    ],
    [
      "Plants are divided into monocotyledons and dicotyledons according to the number of:",
      ["roots they have", "seed leaves (cotyledons) in the seed", "flowers they produce", "years they live"],
      1,
      "Plants are classified as monocots or dicots by whether their seed has one or two seed leaves (cotyledons).",
    ],
    [
      "Maize is an example of a monocotyledon because its seed has:",
      ["two seed leaves", "no seed leaves at all", "one seed leaf (cotyledon)", "three seed leaves"],
      2,
      "A monocotyledon such as maize has a single seed leaf (cotyledon); a dicotyledon such as a bean has two.",
    ],
  ],
  "Water & Irrigation in Agriculture": [
    [
      "The artificial supply of water to crops when rainfall is not enough is called:",
      ["irrigation", "leaching", "erosion", "germination"],
      0,
      "Irrigation is the artificial application of water to crops to supplement rainfall.",
    ],
    [
      "An irrigation method in which water drips slowly onto the soil near the plant roots through small holes in pipes is called:",
      ["flood irrigation", "drip irrigation", "sprinkler irrigation", "natural rainfall"],
      1,
      "Drip irrigation delivers water slowly through small holes directly to the root zone, wasting very little water.",
    ],
    [
      "An irrigation method that sprays water over the crop like artificial rain is called:",
      ["drip irrigation", "flood irrigation", "sprinkler irrigation", "furrow flooding"],
      2,
      "Sprinkler irrigation sprays water over the crop in droplets, similar to rainfall.",
    ],
    [
      "Which irrigation method generally WASTES the most water through evaporation and run-off?",
      ["drip irrigation", "micro-irrigation", "a sealed underground pipe", "flood irrigation"],
      3,
      "Flood irrigation covers the land with water and loses a lot through evaporation and run-off, making it the least water-efficient.",
    ],
    [
      "An important reason to use water carefully in farming in South Africa is that:",
      [
        "South Africa is a water-scarce country and fresh water is limited",
        "there is unlimited fresh water everywhere",
        "plants do not actually need any water",
        "water is free and can never run out",
      ],
      0,
      "South Africa is a water-scarce country, so water must be used sparingly and wisely in agriculture.",
    ],
    [
      "'Drip irrigation' is considered water-wise because it:",
      [
        "sprays water high into the air",
        "delivers water directly to the roots with little evaporation or waste",
        "floods the whole field at once",
        "uses no pipes at all",
      ],
      1,
      "Drip irrigation places water right at the roots, so very little is lost to evaporation or run-off.",
    ],
    [
      "Besides being needed by plants, water on a farm is also essential for:",
      [
        "nothing else on the farm",
        "making the soil permanently infertile",
        "providing drinking water for farm animals",
        "stopping all plant growth",
      ],
      2,
      "Farm animals need a constant supply of clean drinking water to stay healthy and productive.",
    ],
    [
      "Collecting and storing rainwater in dams or tanks for use during dry periods is an example of:",
      ["wasting water", "soil erosion", "overgrazing", "water conservation (harvesting)"],
      3,
      "Storing rainwater for later use is a form of water conservation (rainwater harvesting), important in a dry country.",
    ],
  ],
  "Basic Agricultural Economics & Record-Keeping": [
    [
      "Keeping written records of a farm's income, expenses and production helps a farmer to:",
      [
        "use up more fuel",
        "make better decisions and see whether the farm is making a profit",
        "lose track of the money",
        "avoid all planning",
      ],
      1,
      "Good records let a farmer track income, costs and output, so they can plan and see whether the farm is profitable.",
    ],
    [
      "A 'financial record' on a farm keeps track of:",
      [
        "the weather each day",
        "the names of the workers' children",
        "the money the farm earns and spends",
        "the colour of the tractor",
      ],
      2,
      "A financial record keeps track of the money coming in (income) and going out (expenses) on the farm.",
    ],
    [
      "'Capital' in farming refers to:",
      [
        "the daily weather",
        "the farm's pet animals",
        "the weeds in the field",
        "the money and assets (such as machinery and buildings) used to run the farm",
      ],
      3,
      "Capital is the money and assets — like land, machinery and buildings — that a farmer uses to run the farm.",
    ],
    [
      "A farmer sells 150 bags of potatoes at R80 per bag. The total income from the potatoes is:",
      ["R12 000", "R230", "R1 200", "R120 000"],
      0,
      "Total income = quantity × price = 150 × R80 = R12 000.",
    ],
    [
      "'Profit' is the money a farmer has left after:",
      [
        "adding all the income together only",
        "subtracting the total costs from the total income",
        "borrowing money from the bank",
        "buying new machinery",
      ],
      1,
      "Profit = total income − total costs; it is what remains once all expenses have been paid.",
    ],
    [
      "A farm's income for a month is R20 000 and its total costs are R14 000. The profit is:",
      ["R34 000", "R14 000", "R6 000", "R20 000"],
      2,
      "Profit = income − costs = R20 000 − R14 000 = R6 000.",
    ],
    [
      "A 'budget' for a farm is:",
      [
        "a record of yesterday's weather",
        "a type of tractor",
        "a list of all the farm animals' names",
        "a plan of the expected income and expenses for a period",
      ],
      3,
      "A budget is a financial plan that sets out the income a farm expects to earn and the expenses it expects to pay.",
    ],
    [
      "The place where a farmer sells produce, such as a fresh-produce market or to a cooperative, is called the:",
      ["market", "weather station", "classroom", "river"],
      0,
      "The market is where farm produce is bought and sold; farmers sell their crops and animals there to earn an income.",
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
