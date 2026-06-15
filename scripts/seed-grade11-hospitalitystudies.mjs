// Seeds the Grade 11 Hospitality Studies question bank (6 topics x 8
// questions). CAPS-aligned, objectively-checkable only (industry/career terms,
// hygiene facts, nutrition, commodity science, cooking/heat-transfer methods,
// menu planning + food-costing calculations). Topics + questions are DISTINCT
// from the Grade 12 Hospitality bank (different angle on each content area).
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but NOT option order). Every numeric answer was
// double-checked by computation during drafting.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade11-hospitalitystudies.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Hospitality Studies";
const GRADE = "Grade 11";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Sectors & Careers in Hospitality": [
    [
      "A bed-and-breakfast (B&B) is an example of which sector of the hospitality industry?",
      ["accommodation", "transport", "manufacturing", "mining"],
      0,
      "A B&B provides lodging and breakfast, so it falls under the accommodation sector of the hospitality industry.",
    ],
    [
      "In the classic kitchen brigade, the head of the entire kitchen, in charge of all the staff and the menu, is the:",
      ["commis chef", "executive chef (chef de cuisine)", "dishwasher", "waiter"],
      1,
      "The executive chef (chef de cuisine) heads the kitchen and is responsible for the menu, the kitchen staff and overall food production.",
    ],
    [
      "A 'chef de partie' in the kitchen brigade is a:",
      [
        "trainee who has only just started",
        "person who washes the dishes",
        "station chef in charge of a particular section, such as sauces or pastry",
        "waiter who serves the food",
      ],
      2,
      "A chef de partie (station chef) is in charge of a particular section of the kitchen, such as the sauce, pastry or vegetable station.",
    ],
    [
      "Which of the following is an example of the FOOD-AND-BEVERAGE sector rather than the accommodation sector?",
      ["a guesthouse", "a city hotel", "a game lodge", "a restaurant"],
      3,
      "A restaurant provides food and beverages, so it belongs to the food-and-beverage sector; guesthouses, hotels and lodges provide accommodation.",
    ],
    [
      "The star-grading system used for South African accommodation establishments mainly indicates the:",
      [
        "level of quality and the range of facilities offered",
        "number of rooms only",
        "price of the cheapest meal",
        "age of the building",
      ],
      0,
      "Star grading (one to five stars) reflects the quality standard and the range of facilities and services an establishment offers to guests.",
    ],
    [
      "A 'commis chef' is best described as a:",
      [
        "head of the whole kitchen",
        "junior chef who assists a chef de partie and is still learning",
        "restaurant manager",
        "wine waiter",
      ],
      1,
      "A commis chef is a junior cook who works under and assists a chef de partie while gaining experience and training.",
    ],
    [
      "Providing food services to a separate organisation, such as a school, hospital or company canteen, is known as:",
      ["fine dining", "self-catering", "contract catering", "room service"],
      2,
      "Contract catering is when a catering company provides food services at another organisation's site, such as a hospital, school or company canteen.",
    ],
    [
      "Which personal quality is MOST important for someone working in hospitality and dealing with guests?",
      [
        "being rude to guests",
        "ignoring complaints",
        "arriving late for shifts",
        "good communication and a friendly, helpful attitude",
      ],
      3,
      "Hospitality depends on satisfying guests so they return, which makes good communication and a friendly, helpful attitude essential.",
    ],
  ],
  "Kitchen & Restaurant Hygiene": [
    [
      "The difference between cleaning and sanitising is that sanitising:",
      [
        "reduces bacteria to a safe level, while cleaning only removes visible dirt",
        "is exactly the same thing as cleaning",
        "only removes visible dirt",
        "makes surfaces dirty again",
      ],
      0,
      "Cleaning removes visible dirt and food residue; sanitising goes further by reducing micro-organisms (bacteria) to a safe level.",
    ],
    [
      "Colour-coded chopping boards are used in professional kitchens mainly to:",
      [
        "make the kitchen look colourful",
        "prevent cross-contamination between different food types",
        "show which board is the newest",
        "match the staff uniforms",
      ],
      1,
      "Colour-coded boards (e.g. red for raw meat, green for vegetables) keep food types separate and prevent cross-contamination.",
    ],
    [
      "Salmonella food poisoning is most commonly linked to:",
      ["fresh bread", "boiled water", "raw or undercooked chicken and eggs", "tinned vegetables"],
      2,
      "Salmonella bacteria are commonly found in raw or undercooked poultry and eggs; thorough cooking destroys them.",
    ],
    [
      "A refrigerator used to store fresh food should be kept at a temperature of about:",
      ["25 °C", "15 °C", "−18 °C", "below 5 °C"],
      3,
      "A fridge should run at below 5 °C to keep food out of the bacterial danger zone; a freezer runs at about −18 °C.",
    ],
    [
      "Why should kitchen staff wear a clean apron and hair covering and remove jewellery before working with food?",
      [
        "to prevent dirt, hair and bacteria from contaminating the food",
        "to look fashionable",
        "to keep warm in the kitchen",
        "because it makes cooking faster",
      ],
      0,
      "Protective clothing and removing jewellery prevent hair, dirt and bacteria from getting into the food.",
    ],
    [
      "The main reason for controlling pests such as flies, cockroaches and rodents in a kitchen is that they:",
      [
        "eat too much food",
        "carry and spread harmful bacteria and disease",
        "make a noise",
        "use up electricity",
      ],
      1,
      "Pests carry and spread harmful bacteria and disease onto food and surfaces, so effective pest control is essential for food safety.",
    ],
    [
      "Kitchen waste and rubbish bins should be:",
      [
        "left open next to the food",
        "emptied only once a week",
        "covered with a lid and emptied regularly",
        "stored on the food-preparation table",
      ],
      2,
      "Waste bins should be kept covered and emptied regularly to avoid attracting pests and spreading bacteria and odours.",
    ],
    [
      "After handling raw meat, and before touching ready-to-eat food, a food handler must FIRST:",
      [
        "carry on without washing",
        "wipe their hands on the apron",
        "rinse their hands in cold water only",
        "wash their hands thoroughly with soap and warm water",
      ],
      3,
      "Hands must be washed thoroughly with soap and warm water after handling raw meat to stop bacteria transferring to ready-to-eat food.",
    ],
  ],
  "Nutrition & Healthy Eating": [
    [
      "Which vitamin is made by the body when the skin is exposed to sunlight and helps the body absorb calcium for strong bones?",
      ["vitamin D", "vitamin C", "vitamin A", "vitamin B12"],
      0,
      "Vitamin D is made in the skin in sunlight and helps the body absorb calcium, which is needed for strong bones and teeth.",
    ],
    [
      "A deficiency of vitamin C in the diet causes:",
      ["night blindness", "scurvy (bleeding gums and poor wound healing)", "rickets", "goitre"],
      1,
      "Vitamin C (found in citrus fruit and vegetables) prevents scurvy; a deficiency causes bleeding gums and poor wound healing.",
    ],
    [
      "Which mineral is needed to make haemoglobin, so that a shortage of it leads to anaemia?",
      ["calcium", "iodine", "iron", "sodium"],
      2,
      "Iron is needed to make haemoglobin in red blood cells; too little iron causes anaemia, with tiredness and paleness.",
    ],
    [
      "Dietary fibre (roughage) is important in the diet because it:",
      [
        "provides most of the body's energy",
        "builds muscle tissue",
        "is digested and absorbed for growth",
        "adds bulk and helps prevent constipation",
      ],
      3,
      "Fibre is not digested; it adds bulk and keeps food moving through the digestive system, helping to prevent constipation.",
    ],
    [
      "Which of the following is a source of unsaturated ('healthier') fat?",
      ["olive oil and avocado", "fatty red meat", "butter", "lard"],
      0,
      "Unsaturated fats — found in foods such as olive oil, avocado and oily fish — are generally healthier than the saturated fats in butter, lard and fatty meat.",
    ],
    [
      "Roughly what proportion of the human body is made up of water?",
      ["about 10%", "about two-thirds (around 60–70%)", "about 5%", "almost 100%"],
      1,
      "Water makes up roughly two-thirds of the body and is essential for digestion, temperature control and transporting nutrients.",
    ],
    [
      "The main function of carbohydrates in the diet is to:",
      ["build and repair body tissue", "absorb vitamins", "supply the body with energy", "make bones strong"],
      2,
      "Carbohydrates are the body's main source of energy; proteins build and repair tissue, while calcium strengthens bones.",
    ],
    [
      "A balanced diet is best described as one that:",
      [
        "contains only protein",
        "is made up entirely of carbohydrates",
        "avoids all fats completely",
        "provides all the nutrients the body needs in the correct proportions",
      ],
      3,
      "A balanced diet supplies all the nutrients — carbohydrates, proteins, fats, vitamins, minerals, fibre and water — in the correct proportions for good health.",
    ],
  ],
  "Food Commodities: Fruit, Vegetables & Cereals": [
    [
      "Overcooking green vegetables in a lot of water for a long time mainly causes the loss of:",
      ["vitamin C and the bright green colour", "all their fibre", "their water content only", "their fat content"],
      0,
      "Vitamin C is destroyed by heat and dissolves into the cooking water, and prolonged boiling also dulls the bright green colour, so vegetables should be cooked quickly in little water.",
    ],
    [
      "To prevent a peeled apple or potato from going brown before cooking, you can:",
      [
        "leave it in direct sunlight",
        "place it in water (or water with a little lemon juice)",
        "sprinkle it with sugar",
        "store it next to raw meat",
      ],
      1,
      "Keeping the cut surface in water (especially with a little lemon juice) keeps oxygen away and the acid slows the enzymes, preventing enzymic browning.",
    ],
    [
      "Rice, maize, wheat and oats are all examples of:",
      ["dairy products", "fruits", "cereals (grain staples)", "legumes"],
      2,
      "Rice, maize, wheat and oats are cereals — grain staples that are a major source of carbohydrates (starch).",
    ],
    [
      "When starch (such as maize flour) is heated with liquid and swells to thicken a sauce, the process is called:",
      ["caramelisation", "fermentation", "coagulation", "gelatinisation"],
      3,
      "Gelatinisation is when starch grains absorb liquid, swell and burst on heating, thickening the mixture — the basis of thickening sauces and gravies.",
    ],
    [
      "Which of the following is classified as a legume?",
      ["lentils", "spinach", "an apple", "rice"],
      0,
      "Legumes are the seeds of pod-bearing plants, such as lentils, beans and peas; they are a good plant source of protein and fibre.",
    ],
    [
      "Fresh fruit and vegetables are best stored:",
      [
        "in a warm, sunny spot",
        "in a cool place, many of them in the refrigerator",
        "sealed in plastic at room temperature for weeks",
        "right next to the hot stove",
      ],
      1,
      "Most fresh fruit and vegetables keep best in a cool place, often the refrigerator's crisper drawer, which slows spoilage and keeps them fresh longer.",
    ],
    [
      "Steaming vegetables rather than boiling them is recommended because it:",
      [
        "adds more fat to them",
        "makes them lose all their colour",
        "retains more of their vitamins and nutrients",
        "always takes much longer",
      ],
      2,
      "Steaming keeps vegetables out of the cooking water, so fewer water-soluble vitamins (such as vitamin C) are lost than when boiling.",
    ],
    [
      "Which of the following is a good plant source of vitamin A (as beta-carotene)?",
      ["white bread", "white rice", "plain sugar", "carrots and orange sweet potato"],
      3,
      "Orange and deep-yellow vegetables such as carrots and orange sweet potato are rich in beta-carotene, which the body converts to vitamin A.",
    ],
  ],
  "Cooking Methods & Heat Transfer": [
    [
      "Heat passing directly through a metal pot from the stove plate into the food touching it is an example of heat transfer by:",
      ["conduction", "convection", "radiation", "evaporation"],
      0,
      "Conduction is the transfer of heat through direct contact, such as from a hot stove plate through a metal pot to the food.",
    ],
    [
      "In an oven, hot air rises and circulates to cook the food. This method of heat transfer is called:",
      ["conduction", "convection", "radiation", "condensation"],
      1,
      "Convection is the transfer of heat by the movement of hot air or liquid; in an oven, currents of hot air circulate and cook the food.",
    ],
    [
      "Cooking food under a hot grill, where heat travels directly from the element to the food as infrared waves, is an example of:",
      ["conduction", "convection", "radiation", "fermentation"],
      2,
      "Radiation transfers heat as waves without a medium; a grill cooks the food's surface using radiant (infrared) heat from the element.",
    ],
    [
      "Stewing and braising are slow, moist cooking methods that are especially suitable for:",
      [
        "very tender, expensive steak",
        "delicate fish fillets",
        "fresh salad leaves",
        "tough, cheaper cuts of meat",
      ],
      3,
      "Long, slow, moist cooking such as stewing and braising softens the connective tissue in tough, cheaper cuts of meat, making them tender.",
    ],
    [
      "The main difference between shallow frying and deep frying is that in deep frying the food is:",
      [
        "completely covered (submerged) in hot oil",
        "cooked in a dry pan with no oil",
        "cooked in boiling water",
        "baked in the oven",
      ],
      0,
      "In deep frying the food is fully submerged in hot oil, whereas in shallow frying only a small amount of oil covers the base of the pan.",
    ],
    [
      "One important reason we cook food is to:",
      [
        "reduce its flavour",
        "make it safe to eat by destroying harmful micro-organisms",
        "remove all of its nutrients",
        "make it harder to digest",
      ],
      1,
      "Cooking destroys many harmful micro-organisms, making food safer to eat, and it also improves flavour, texture and digestibility.",
    ],
    [
      "When following a recipe, dry ingredients such as flour should be measured:",
      [
        "by guessing the amount",
        "in a measuring jug meant for liquids",
        "accurately, using a scale or measuring cups levelled off",
        "in rough handfuls",
      ],
      2,
      "Accurate measuring with a scale or measuring cups (levelled off) makes recipes turn out consistently, which is especially important in baking.",
    ],
    [
      "A garnish is mainly added to a dish to:",
      [
        "increase the cooking time",
        "make the food unsafe",
        "replace the main ingredient",
        "improve its appearance and appeal",
      ],
      3,
      "A garnish is a decorative, edible addition that improves the appearance and appeal of a dish, making it more attractive to the guest.",
    ],
  ],
  "Menu Planning & Food Costing": [
    [
      "A recipe costs R60 in total ingredients and makes 4 portions. The ingredient cost per portion is:",
      ["R15", "R64", "R240", "R56"],
      0,
      "Cost per portion = total ingredient cost ÷ number of portions = R60 ÷ 4 = R15.",
    ],
    [
      "A dish costs R20 in ingredients and the restaurant adds a 150% mark-up. The selling price is:",
      ["R23", "R50", "R30", "R170"],
      1,
      "Mark-up = 150% of R20 = R30, so the selling price = R20 + R30 = R50.",
    ],
    [
      "'Portion control' in a kitchen means:",
      [
        "serving as much as possible to every guest",
        "letting each chef decide the size",
        "serving a standard, measured amount of food for each dish",
        "never weighing any food",
      ],
      2,
      "Portion control means serving a standardised, measured amount for each dish, so servings are consistent and food costs are controlled.",
    ],
    [
      "Which menu offers the SAME planned set of dishes repeated on a fixed cycle, for example over a two-week period in a hospital or hostel?",
      ["an à la carte menu", "a wedding menu", "a banquet menu", "a cyclical menu"],
      3,
      "A cyclical menu repeats the same planned set of dishes on a fixed cycle (e.g. every two weeks), often used in institutions such as hospitals and hostels.",
    ],
    [
      "When planning a menu, an important factor to consider is:",
      [
        "the guests' needs, the budget, and the season/availability of ingredients",
        "only the chef's favourite foods",
        "always using the most expensive ingredients",
        "ignoring how much the guests can pay",
      ],
      0,
      "A good menu is planned around the guests' needs and preferences, the available budget, and the season and availability of ingredients.",
    ],
    [
      "If a starter, a main course and a dessert are served, the menu has:",
      ["one course", "three courses", "five courses", "no courses"],
      1,
      "Each separate part of a meal is a course, so a starter, a main course and a dessert make up a three-course meal.",
    ],
    [
      "Ingredients for a recipe cost R80, and the food-cost percentage is set at 40% of the selling price. The selling price should be:",
      ["R32", "R120", "R200", "R48"],
      2,
      "Selling price = ingredient cost ÷ food-cost percentage = R80 ÷ 0.40 = R200.",
    ],
    [
      "A breakfast menu in a hotel would typically include:",
      [
        "a three-course dinner with wine",
        "only desserts",
        "a formal banquet",
        "items such as cereal, eggs, toast and coffee",
      ],
      3,
      "A breakfast menu offers breakfast items such as cereals, eggs, toast, fruit and hot beverages like coffee and tea.",
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
