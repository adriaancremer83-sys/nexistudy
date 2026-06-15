// Seeds the Grade 11 Agricultural Sciences question bank (6 topics x 8
// questions). CAPS-aligned, objectively-checkable only (definitions,
// classifications, soil/plant science facts, simple agri-economics sums).
// Topics + questions are DISTINCT from the Grade 12 Agricultural Sciences bank
// (Gr12 is animal-focused; Gr11 here leans into soil, plant and ecology).
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but NOT option order). Every numeric answer was
// double-checked by computation during drafting.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade11-agriculturalsciences.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Agricultural Sciences";
const GRADE = "Grade 11";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Soil Formation & Properties": [
    [
      "The breaking down of rock into smaller particles to form soil is called:",
      ["weathering", "leaching", "erosion", "evaporation"],
      0,
      "Weathering is the physical and chemical breakdown of parent rock into smaller particles — the first step in soil formation.",
    ],
    [
      "Which soil mineral particle (separate) is the LARGEST?",
      ["clay", "sand", "silt", "humus"],
      1,
      "Of the mineral particles, sand is the largest, followed by silt and then clay, which is the smallest.",
    ],
    [
      "A soil that contains a balanced mixture of sand, silt and clay and is ideal for most crops is called a:",
      ["pure clay soil", "pure sandy soil", "loam soil", "gravel bed"],
      2,
      "Loam is a balanced mixture of sand, silt and clay; it holds water and nutrients well while still draining, which suits most crops.",
    ],
    [
      "The dark, decomposed organic matter in soil that improves fertility and water-holding capacity is called:",
      ["clay", "sand", "gravel", "humus"],
      3,
      "Humus is decomposed plant and animal material; it improves soil fertility, structure and water-holding capacity.",
    ],
    [
      "The different horizontal layers seen in a vertical cut through the soil are together called the soil:",
      ["profile", "texture", "structure", "pH"],
      0,
      "A soil profile is the sequence of horizons (layers) seen in a vertical section from the surface down to the parent material.",
    ],
    [
      "The topsoil (A horizon) is usually the most important layer for plant growth because it:",
      [
        "is made of solid rock",
        "contains the most humus, nutrients and plant roots",
        "has no living organisms in it",
        "is always made of pure clay",
      ],
      1,
      "The A horizon (topsoil) is richest in humus, nutrients and soil organisms and contains most of the plant roots.",
    ],
    [
      "Compared with a sandy soil, a clay soil generally:",
      [
        "drains very quickly and holds little water",
        "contains the largest particles",
        "holds more water but drains slowly",
        "has no nutrients at all",
      ],
      2,
      "Clay has tiny particles and small pore spaces, so it holds a lot of water and nutrients but drains slowly and can become waterlogged.",
    ],
    [
      "Soil texture refers to:",
      [
        "the colour of the soil",
        "the way crumbs of soil stick together",
        "the amount of water in the soil",
        "the proportion of sand, silt and clay particles in the soil",
      ],
      3,
      "Soil texture is set by the relative proportions of sand, silt and clay; how the particles clump together is called soil structure.",
    ],
  ],
  "Soil Fertility & Fertilisers": [
    [
      "Which three elements are the main macronutrients supplied by most fertilisers?",
      [
        "nitrogen, phosphorus and potassium (N, P, K)",
        "iron, zinc and copper",
        "sodium, chlorine and iodine",
        "carbon, hydrogen and oxygen",
      ],
      0,
      "N, P and K are the three primary macronutrients plants need in the largest amounts; the fertiliser bag shows their ratio.",
    ],
    [
      "The plant nutrient mainly responsible for healthy leaf and stem growth and a deep green colour is:",
      ["phosphorus", "nitrogen", "potassium", "calcium"],
      1,
      "Nitrogen promotes vegetative (leaf and stem) growth and gives leaves their green colour; a shortage causes yellowing (chlorosis).",
    ],
    [
      "On a fertiliser bag the figures 2:3:2 (22) mainly refer to the:",
      [
        "mass of the bag in kilograms",
        "price of the fertiliser",
        "ratio of nitrogen, phosphorus and potassium it contains",
        "number of bags needed per hectare",
      ],
      2,
      "The ratio shows the relative parts of N:P:K, and the number in brackets is the percentage of those nutrients in the mixture.",
    ],
    [
      "Phosphorus (P) is especially important in plants for:",
      [
        "leaf colour only",
        "making the soil acidic",
        "increasing the soil water content",
        "strong root development, flowering and seed formation",
      ],
      3,
      "Phosphorus promotes good root growth, flowering, and the formation of seeds and fruit.",
    ],
    [
      "A fertiliser made from natural materials such as kraal manure or compost is called:",
      ["an organic fertiliser", "an inorganic fertiliser", "a chemical fertiliser", "agricultural lime"],
      0,
      "Organic fertilisers (manure, compost) come from plant or animal material; inorganic (chemical) fertilisers are manufactured.",
    ],
    [
      "Adding agricultural lime to soil is done mainly to:",
      [
        "make the soil more acidic",
        "raise the pH of acidic soil (make it less acidic)",
        "add nitrogen to the soil",
        "kill all the organisms in the soil",
      ],
      1,
      "Lime neutralises soil acidity, raising the pH so that nutrients become more available to plants.",
    ],
    [
      "A bag of fertiliser contains 22% of its mass as N, P and K nutrients. How many kilograms of these nutrients are in a 50 kg bag?",
      ["22 kg", "5 kg", "11 kg", "44 kg"],
      2,
      "22% of 50 kg = 0.22 × 50 = 11 kg of actual N, P and K nutrients.",
    ],
    [
      "The loss of soluble nutrients when they are washed down out of the topsoil by water is called:",
      ["weathering", "evaporation", "photosynthesis", "leaching"],
      3,
      "Leaching is the washing of dissolved nutrients (such as nitrates) downward through the soil, out of reach of plant roots.",
    ],
  ],
  "Plant Structure & Photosynthesis": [
    [
      "The process by which green plants use sunlight to make food (glucose) is called:",
      ["photosynthesis", "respiration", "transpiration", "germination"],
      0,
      "Photosynthesis uses light energy, carbon dioxide and water to produce glucose and oxygen in the green parts of the plant.",
    ],
    [
      "The green pigment in leaves that absorbs light energy for photosynthesis is:",
      ["glucose", "chlorophyll", "starch", "cellulose"],
      1,
      "Chlorophyll, found in the chloroplasts, absorbs the light energy used to drive photosynthesis and gives leaves their green colour.",
    ],
    [
      "During photosynthesis, the gas taken IN by the plant and the gas released are, respectively:",
      [
        "oxygen in, nitrogen out",
        "nitrogen in, oxygen out",
        "carbon dioxide in, oxygen out",
        "oxygen in, carbon dioxide out",
      ],
      2,
      "Plants take in carbon dioxide and release oxygen during photosynthesis.",
    ],
    [
      "The part of the plant that anchors it in the soil and absorbs water and mineral nutrients is the:",
      ["leaf", "flower", "stem", "root"],
      3,
      "Roots anchor the plant in the soil and absorb water and dissolved minerals.",
    ],
    [
      "Water and dissolved minerals are transported upward from the roots to the leaves through the:",
      ["xylem", "phloem", "stomata", "cuticle"],
      0,
      "Xylem vessels carry water and dissolved minerals upward from the roots; phloem carries manufactured food (sugars).",
    ],
    [
      "The loss of water vapour from the leaves of a plant, mainly through the stomata, is called:",
      ["photosynthesis", "transpiration", "respiration", "translocation"],
      1,
      "Transpiration is the evaporation of water from the leaf surface (mostly through the stomata), which helps draw water up the plant.",
    ],
    [
      "The small pores, mostly on the underside of a leaf, that allow gas exchange are the:",
      ["roots", "veins", "stomata", "petals"],
      2,
      "Stomata are tiny openings (mainly on the lower leaf surface) through which carbon dioxide, oxygen and water vapour pass.",
    ],
    [
      "The food made during photosynthesis is stored in many plants in the form of:",
      ["protein", "fat", "chlorophyll", "starch"],
      3,
      "Plants convert the glucose made in photosynthesis into starch for storage, which is why a starch test is used to show photosynthesis has occurred.",
    ],
  ],
  "Plant Production & Propagation": [
    [
      "Growing a new plant from a seed is an example of:",
      ["sexual propagation", "asexual (vegetative) propagation", "grafting", "layering"],
      0,
      "Seeds form through the fusion of male and female gametes, so growing plants from seed is sexual propagation.",
    ],
    [
      "Growing a new plant from a cutting, runner or tuber is an example of:",
      ["sexual propagation", "asexual (vegetative) propagation", "pollination", "fertilisation"],
      1,
      "Vegetative (asexual) propagation grows a new plant from a part of the parent (cutting, runner, tuber); the offspring is genetically identical to the parent.",
    ],
    [
      "An ADVANTAGE of propagating plants asexually (e.g. from cuttings) is that the new plants:",
      [
        "always show more genetic variation",
        "take much longer to mature than seedlings",
        "are genetically identical to the parent, keeping its desirable traits",
        "never need any water",
      ],
      2,
      "Asexual propagation produces clones of the parent, so a desirable variety is reproduced exactly and the plants often mature faster than seedlings.",
    ],
    [
      "The beginning of growth of a seed into a young seedling is called:",
      ["pollination", "transpiration", "photosynthesis", "germination"],
      3,
      "Germination is the process in which a seed begins to grow, using its stored food until the seedling can photosynthesise.",
    ],
    [
      "Which of the following conditions is essential for MOST seeds to germinate?",
      [
        "water, warmth and oxygen",
        "bright light only",
        "fertiliser only",
        "complete darkness and frost",
      ],
      0,
      "Most seeds need moisture (water), a suitable temperature (warmth) and oxygen to germinate; many do not need light at this stage.",
    ],
    [
      "Unwanted plants that compete with crops for water, light and nutrients are called:",
      ["legumes", "weeds", "cover crops", "seedlings"],
      1,
      "Weeds are unwanted plants that compete with crops for water, nutrients, light and space, reducing the yield.",
    ],
    [
      "Planting different crops on the same land in a planned sequence over the seasons, instead of the same crop every time, is called:",
      ["monoculture", "irrigation", "crop rotation", "grafting"],
      2,
      "Crop rotation alternates crops on the same land to maintain soil fertility, reduce pests and diseases, and prevent nutrient depletion.",
    ],
    [
      "Leguminous crops such as beans and lucerne improve soil fertility because they:",
      [
        "use up all the nitrogen in the soil",
        "make the soil very acidic",
        "remove humus from the soil",
        "fix nitrogen from the air into the soil through bacteria in their roots",
      ],
      3,
      "Legumes carry nitrogen-fixing bacteria (Rhizobium) in their root nodules that turn atmospheric nitrogen into a form plants can use, enriching the soil.",
    ],
  ],
  "Agro-ecology & Sustainable Resource Use": [
    [
      "In a food chain, green plants that make their own food are called:",
      ["producers", "consumers", "decomposers", "predators"],
      0,
      "Producers (green plants) make their own food by photosynthesis and form the base of every food chain.",
    ],
    [
      "Animals that cannot make their own food and must eat plants or other animals are called:",
      ["producers", "consumers", "decomposers", "minerals"],
      1,
      "Consumers cannot make their own food and must eat other organisms; plant-eating animals are primary consumers.",
    ],
    [
      "Bacteria and fungi that break down dead plants and animals, returning nutrients to the soil, are called:",
      ["producers", "predators", "decomposers", "parasites"],
      2,
      "Decomposers break down dead organic matter and waste, recycling nutrients back into the soil for plants to reuse.",
    ],
    [
      "The original source of energy for almost all ecosystems is the:",
      ["soil", "wind", "rain", "sun"],
      3,
      "The sun is the primary energy source; producers capture solar energy through photosynthesis and pass it along the food chain.",
    ],
    [
      "The wearing away and removal of fertile topsoil by wind or water is called:",
      ["soil erosion", "leaching", "germination", "transpiration"],
      0,
      "Soil erosion is the removal of fertile topsoil by water or wind, often made worse by overgrazing and poor farming practices.",
    ],
    [
      "Allowing too many animals to graze a piece of veld until the plant cover is destroyed is called:",
      ["crop rotation", "overgrazing", "contour ploughing", "mulching"],
      1,
      "Overgrazing strips the protective plant cover, exposing the soil to erosion and reducing the carrying capacity of the veld.",
    ],
    [
      "Ploughing across a slope, along its contours, is a conservation practice that helps to:",
      [
        "increase soil erosion",
        "remove all the topsoil",
        "slow run-off water and reduce soil erosion",
        "stop plants from growing",
      ],
      2,
      "Contour ploughing makes ridges across the slope that slow water run-off, giving it time to soak in and reducing soil erosion.",
    ],
    [
      "Sustainable farming means using natural resources in a way that:",
      [
        "uses up the soil as fast as possible",
        "ignores future production",
        "removes all the vegetation",
        "conserves the soil and water so the land stays productive for future generations",
      ],
      3,
      "Sustainable farming protects soil, water and biodiversity so that the land remains productive for present and future generations.",
    ],
  ],
  "Farm Management & Production Economics": [
    [
      "The things a farmer puts into the production process, such as seed, fertiliser, feed and fuel, are called:",
      ["inputs", "outputs", "profits", "assets"],
      0,
      "Inputs are the resources used up in production (seed, fertiliser, feed, fuel, labour); outputs are the products produced (crops, milk, meat).",
    ],
    [
      "A farmer who produces several different products (e.g. maize, cattle and vegetables) instead of only one is practising:",
      ["monoculture", "diversification", "specialisation", "leaching"],
      1,
      "Diversification means producing a variety of products, which spreads risk so a poor result in one enterprise can be offset by the others.",
    ],
    [
      "A farmer sells 200 bags of maize at R250 per bag. The gross income from the maize is:",
      ["R450", "R5 000", "R50 000", "R500"],
      2,
      "Gross income = quantity × price = 200 × R250 = R50 000.",
    ],
    [
      "If a farm enterprise has a gross income of R80 000 and total costs of R55 000, the net profit is:",
      ["R135 000", "R55 000", "R80 000", "R25 000"],
      3,
      "Net profit = gross income − total costs = R80 000 − R55 000 = R25 000.",
    ],
    [
      "Processing raw farm produce into a product worth more — for example turning milk into cheese — is known as:",
      ["value-adding", "leaching", "soil erosion", "germination"],
      0,
      "Value-adding processes raw produce into a higher-value product (milk into cheese, grapes into wine), increasing the income the farmer can earn.",
    ],
    [
      "An organisation formed when farmers join together to buy inputs and market their produce more cheaply and effectively is a:",
      ["bank", "cooperative", "auction", "monopoly"],
      1,
      "In a cooperative, farmers pool resources to buy inputs in bulk, share equipment and market their produce together for better prices.",
    ],
    [
      "Keeping a record of all the animals on a farm, including their births, deaths and sales, is an example of a:",
      ["weather record", "soil record", "production (livestock) record", "title deed"],
      2,
      "Production records, such as a livestock register, track births, deaths, purchases and sales, helping the farmer manage the herd and make decisions.",
    ],
    [
      "The market principle that, as the price of a product rises, producers are usually willing to supply more of it, describes the law of:",
      ["demand only", "diminishing returns", "gravity", "supply"],
      3,
      "The law of supply states that, all else being equal, a higher price encourages producers to supply a greater quantity of the product.",
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
