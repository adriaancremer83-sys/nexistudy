// Seeds the Grade 10 Hospitality Studies question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only (industry terms, equipment uses,
// hygiene & safety facts, prep/cooking basics, table-setting conventions).
// Grade 10 introductory level. Topics + questions are DISTINCT from BOTH the
// Gr11 bank (sectors/careers, kitchen hygiene, nutrition, food commodities,
// cooking methods & heat transfer, menu planning & food costing) and the Gr12
// bank (the industry, hygiene/safety/security, nutrition & menu planning, food
// commodities, food prep & cooking, food & beverage service). Gr10 here leans
// into intro/industry, kitchen equipment, PHYSICAL safety, mise en place, basic
// cooking-method identification, and table setting — deliberately avoiding the
// nutrition/food-costing areas already covered at Gr11/Gr12.
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but NOT option order).
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade10-hospitalitystudies.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Hospitality Studies";
const GRADE = "Grade 10";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Introduction to the Hospitality Industry": [
    [
      "The word 'hospitality' refers to:",
      [
        "the friendly and welcoming treatment of guests and visitors",
        "the building of roads and bridges",
        "the mining of gold and minerals",
        "the growing of crops on a farm",
      ],
      0,
      "Hospitality means the friendly, welcoming and generous treatment of guests, customers and visitors.",
    ],
    [
      "In the hospitality industry, a person who pays to stay at or eat at an establishment is called a:",
      ["chef", "guest (customer)", "supplier", "cleaner"],
      1,
      "A guest (customer) is the person who receives and pays for the hospitality services such as food, drink or a room.",
    ],
    [
      "Which of the following is an example of a hospitality establishment?",
      ["a gold mine", "a car factory", "a restaurant", "a clothing shop"],
      2,
      "A restaurant provides food and service to guests, so it is a hospitality establishment; mines, factories and clothing shops are not.",
    ],
    [
      "Good customer service is important in hospitality mainly because it:",
      [
        "chases guests away",
        "makes the food unsafe",
        "has no effect on the business",
        "makes guests feel welcome so they return and recommend the place",
      ],
      3,
      "Good service keeps guests happy so they come back and recommend the establishment, which keeps the business successful.",
    ],
    [
      "An establishment that provides people with a place to sleep, such as a hotel or B&B, is part of the ___ sector.",
      ["accommodation", "farming", "clothing", "transport"],
      0,
      "Hotels, guesthouses and B&Bs provide lodging, so they belong to the accommodation sector of hospitality.",
    ],
    [
      "The main aim of a hospitality business is to:",
      [
        "make its guests unhappy",
        "provide food, drink or accommodation and satisfy its guests",
        "manufacture motor cars",
        "avoid having any customers",
      ],
      1,
      "A hospitality business exists to provide food, drink and/or accommodation and to satisfy its guests.",
    ],
    [
      "Which of the following shows a well-presented, professional hospitality worker?",
      [
        "a dirty, untidy uniform",
        "being rude to the guests",
        "a clean, neat uniform and a friendly attitude",
        "ignoring guests' requests",
      ],
      2,
      "A clean, neat appearance and a friendly, helpful attitude create a good impression and professional image.",
    ],
    [
      "When a guest makes a complaint, a good hospitality worker should:",
      [
        "shout at the guest",
        "ignore the guest completely",
        "walk away and say nothing",
        "listen politely and try to solve the problem",
      ],
      3,
      "Complaints should be handled by listening politely and trying to solve the problem, so the guest leaves satisfied.",
    ],
  ],
  "Kitchen Equipment & Utensils": [
    [
      "A 'colander' is a kitchen utensil used mainly to:",
      [
        "beat eggs until fluffy",
        "drain water from cooked pasta or washed vegetables",
        "measure the temperature of food",
        "slice a loaf of bread",
      ],
      1,
      "A colander is a bowl with holes used to drain liquid away from food such as pasta or washed vegetables.",
    ],
    [
      "A 'whisk' is used to:",
      [
        "peel potatoes",
        "weigh out flour",
        "beat or mix ingredients such as eggs or cream, adding air",
        "drain cooked pasta",
      ],
      2,
      "A whisk is used to beat or blend ingredients and to add air, for example when whisking eggs or whipping cream.",
    ],
    [
      "A 'vegetable peeler' is used to:",
      [
        "boil water quickly",
        "grate a block of cheese",
        "stir a pot of soup",
        "remove the skin from vegetables and fruit",
      ],
      3,
      "A vegetable peeler removes the thin outer skin from vegetables and fruit such as potatoes, carrots and apples.",
    ],
    [
      "A 'grater' is used to:",
      [
        "shred or grate food such as cheese or carrots into small pieces",
        "measure liquids accurately",
        "fry eggs in a pan",
        "set the table for guests",
      ],
      0,
      "A grater shreds food such as cheese, carrots or lemon zest into small pieces by rubbing it against the sharp holes.",
    ],
    [
      "A 'sieve' (strainer) is used to:",
      [
        "chop onions finely",
        "separate lumps from dry ingredients like flour, or to strain liquids",
        "bake a cake in the oven",
        "weigh a piece of meat",
      ],
      1,
      "A sieve is a fine mesh used to sift lumps out of dry ingredients such as flour, or to strain solids from liquids.",
    ],
    [
      "A 'chef's knife' is mainly used for:",
      [
        "stirring sauces",
        "measuring sugar",
        "cutting, slicing and chopping food",
        "draining vegetables",
      ],
      2,
      "A chef's knife is an all-purpose knife used for cutting, slicing and chopping a wide range of foods.",
    ],
    [
      "A 'measuring jug' is used to:",
      [
        "grate cheese",
        "fry chips",
        "peel apples",
        "measure the volume of liquids accurately",
      ],
      3,
      "A measuring jug has marked lines used to measure the volume of liquids such as water, milk or oil.",
    ],
    [
      "A 'rolling pin' is used to:",
      [
        "flatten and roll out dough or pastry",
        "measure the temperature of an oven",
        "drain cooked pasta",
        "beat eggs",
      ],
      0,
      "A rolling pin is used to flatten and roll out dough or pastry to an even thickness.",
    ],
  ],
  "Personal Hygiene & Kitchen Safety": [
    [
      "A food handler should wash their hands:",
      [
        "only once at the start of the day",
        "never, in order to save water",
        "before handling food, after using the toilet, and after touching raw meat",
        "only at the very end of the shift",
      ],
      2,
      "Hands must be washed before handling food, after using the toilet and after touching raw meat, to stop the spread of bacteria.",
    ],
    [
      "Why should kitchen staff wear a hairnet or cap?",
      [
        "to look stylish and modern",
        "to keep their head warm",
        "to be able to hear better",
        "to stop hair from falling into the food",
      ],
      3,
      "A hairnet or cap keeps hair from falling into the food, which is both a hygiene and a safety requirement.",
    ],
    [
      "To carry a sharp kitchen knife safely, you should:",
      [
        "hold it pointing down at your side, with the blade facing away from you",
        "wave it around in the air while walking",
        "run across the kitchen holding it up high",
        "point the blade towards other people",
      ],
      0,
      "A knife should be carried pointing down at your side with the blade facing back, so that no one is injured.",
    ],
    [
      "To prevent burns when removing a hot pot from the stove, you should:",
      [
        "use your bare hands",
        "use a dry oven cloth or oven gloves",
        "use a soaking-wet cloth",
        "use a thin paper towel",
      ],
      1,
      "Dry oven cloths or gloves protect the hands; a wet cloth conducts heat quickly and can cause a steam burn.",
    ],
    [
      "If a small oil fire starts in a pan on the stove, you should NEVER:",
      ["turn off the heat", "cover the pan with a lid", "throw water onto it", "call for help"],
      2,
      "Never throw water on an oil or fat fire — it makes the flames flare up violently. Smother it by covering the pan and turning off the heat.",
    ],
    [
      "A clean uniform and apron are worn in the kitchen mainly to:",
      [
        "look fashionable",
        "keep the worker warm",
        "win a prize",
        "keep dirt and bacteria away from the food and protect the worker's clothes",
      ],
      3,
      "A clean uniform and apron stop dirt and bacteria from getting onto the food and protect the worker's own clothing.",
    ],
    [
      "To prevent someone from slipping in the kitchen, a spill on the floor should be:",
      [
        "wiped up immediately",
        "left until the end of the day",
        "ignored completely",
        "covered with a cloth and left there",
      ],
      0,
      "Spills should be wiped up at once, because a wet or greasy floor is a major cause of slips and falls in a kitchen.",
    ],
    [
      "Long loose hair, dangling jewellery and loose clothing are dangerous in a kitchen because they:",
      [
        "make you work faster",
        "can catch fire or get caught in equipment",
        "improve food hygiene",
        "keep the food warm",
      ],
      1,
      "Loose hair, jewellery and clothing can catch fire on the stove or get caught in machinery, causing serious injury.",
    ],
  ],
  "Mise en Place & Basic Food Preparation": [
    [
      "The French term 'mise en place' means:",
      [
        "wash all the dishes",
        "serve the guests their food",
        "sweep and clean the floor",
        "everything in its place — having all ingredients and equipment ready before cooking",
      ],
      3,
      "'Mise en place' means 'everything in its place': preparing and laying out all the ingredients and equipment before you start cooking.",
    ],
    [
      "'Mise en place' is important because it helps the cook to:",
      [
        "work in an organised, efficient way and avoid mistakes",
        "waste much more time",
        "forget important ingredients",
        "make the kitchen untidy",
      ],
      0,
      "Having everything prepared in advance lets the cook work calmly, efficiently and accurately, with fewer mistakes.",
    ],
    [
      "To 'dice' a vegetable means to:",
      [
        "boil it whole in water",
        "cut it into small, even, cube-shaped pieces",
        "mash it into a smooth paste",
        "fry it in deep oil",
      ],
      1,
      "To dice food is to cut it into small, even cube shapes, which helps it cook evenly and look neat.",
    ],
    [
      "To 'grate' a carrot means to:",
      [
        "cut it into long thin strips with a knife",
        "boil it until it is soft",
        "rub it against a grater to make small shreds",
        "roast it whole in the oven",
      ],
      2,
      "Grating means rubbing food against a grater to produce small shreds, for example grated carrot or cheese.",
    ],
    [
      "When measuring flour for a recipe, the most accurate method is to:",
      [
        "use a rough handful",
        "simply guess the amount",
        "fill any glass to the top",
        "weigh it on a scale or use levelled measuring cups",
      ],
      3,
      "Accurate measuring with a scale or levelled measuring cups makes recipes turn out correctly, especially in baking.",
    ],
    [
      "'Sifting' flour before baking is done to:",
      [
        "remove lumps and add air so the mixture is light",
        "make the flour heavier",
        "add water to the flour",
        "cook the flour",
      ],
      0,
      "Sifting removes lumps and mixes air into the flour, helping baked goods to be light and even.",
    ],
    [
      "To 'peel' a vegetable means to:",
      [
        "cut it neatly in half",
        "remove its outer skin",
        "boil it in salted water",
        "add salt to it",
      ],
      1,
      "Peeling means removing the outer skin of a vegetable or fruit, for example peeling a potato before cooking.",
    ],
    [
      "Reading the whole recipe before you start cooking is a good habit because it:",
      [
        "wastes a lot of time",
        "is never necessary",
        "helps you gather all the ingredients and understand the steps first",
        "makes the food taste worse",
      ],
      2,
      "Reading the recipe first lets you collect all the ingredients and equipment and understand each step before you begin.",
    ],
  ],
  "Basic Cooking Methods": [
    [
      "Cooking food in hot water at about 100 °C, with large bubbles rising, is called:",
      ["boiling", "baking", "grilling", "frying"],
      0,
      "Boiling cooks food in water that has reached about 100 °C, where large bubbles rise rapidly.",
    ],
    [
      "A 'moist-heat' cooking method, which uses water or steam, is:",
      [
        "grilling over hot coals",
        "boiling or steaming",
        "baking in a dry oven",
        "deep-frying in oil",
      ],
      1,
      "Moist-heat methods cook food using water or steam — for example boiling, steaming and poaching.",
    ],
    [
      "A 'dry-heat' method that cooks food in a hot oven using hot air is called:",
      ["boiling", "steaming", "baking", "stewing"],
      2,
      "Baking is a dry-heat method that cooks food with the hot air of an oven, used for bread, cakes and pastries.",
    ],
    [
      "Cooking food quickly in a little hot oil in a pan is called:",
      ["boiling", "steaming", "poaching", "frying"],
      3,
      "Frying cooks food in hot oil or fat; shallow frying uses a little oil in a pan.",
    ],
    [
      "Cooking food over the steam of boiling water, without the food touching the water, is called:",
      ["steaming", "frying", "grilling", "roasting"],
      0,
      "Steaming cooks food in the steam rising from boiling water, keeping many nutrients in the food.",
    ],
    [
      "One important reason for cooking food is to:",
      [
        "make it more dangerous to eat",
        "make it safer to eat and easier to digest",
        "remove all of its flavour",
        "make it look worse",
      ],
      1,
      "Cooking destroys many harmful micro-organisms, making food safer to eat, and also improves its flavour, texture and digestibility.",
    ],
    [
      "'Grilling' cooks food using:",
      [
        "cold running water",
        "a large amount of oil",
        "direct, strong heat from above or below (such as from a grill element or hot coals)",
        "steam only",
      ],
      2,
      "Grilling uses direct, strong (radiant) heat from above or below to cook the surface of the food quickly.",
    ],
    [
      "Which cooking method is generally the healthiest because it uses no added fat?",
      ["deep-frying", "shallow-frying", "roasting in oil", "steaming"],
      3,
      "Steaming adds no fat and keeps most of the nutrients, making it one of the healthiest cooking methods.",
    ],
  ],
  "Table Setting & Food Service Basics": [
    [
      "A basic place setting laid out for one guest at a table is called a:",
      ["menu", "cover", "garnish", "course"],
      1,
      "A 'cover' is the place setting (cutlery, crockery and glassware) laid out for one guest.",
    ],
    [
      "When setting a table, the fork is usually placed:",
      ["on top of the plate", "above the plate", "to the left of the plate", "inside the glass"],
      2,
      "In a standard place setting the fork is placed to the left of the plate.",
    ],
    [
      "When setting a table, the dinner knife is usually placed:",
      [
        "to the left of the plate",
        "above the plate",
        "inside the cup",
        "to the right of the plate, with the blade facing the plate",
      ],
      3,
      "The knife is placed to the right of the plate with the cutting edge (blade) facing towards the plate.",
    ],
    [
      "The water glass is usually placed:",
      [
        "above the knife, on the right-hand side of the place setting",
        "on the floor next to the chair",
        "underneath the plate",
        "to the far left of the fork",
      ],
      0,
      "The water glass is set just above the tip of the knife, on the right-hand side of the cover.",
    ],
    [
      "A serviette (napkin) at a place setting is used by the guest to:",
      [
        "clean the floor",
        "wipe their mouth and protect their clothes",
        "cover the food on the plate",
        "dry the washed dishes",
      ],
      1,
      "A serviette (napkin) is used by the guest to wipe their mouth and to protect their clothing during the meal.",
    ],
    [
      "A waiter (server) in a restaurant is mainly responsible for:",
      [
        "cooking all of the food",
        "washing the dishes only",
        "taking orders and serving food and drink to guests",
        "managing the whole hotel",
      ],
      2,
      "A waiter takes guests' orders and serves their food and drinks, providing friendly and efficient service.",
    ],
    [
      "Neat table settings and good table manners are important because they:",
      [
        "make the meal unpleasant",
        "are never noticed by guests",
        "make the food unsafe",
        "create a pleasant dining experience for the guest",
      ],
      3,
      "A neat, correct table setting and good manners create a pleasant, professional dining experience for the guest.",
    ],
    [
      "Clearing a guest's plate should only be done:",
      [
        "once the guest has finished eating",
        "while the guest is still eating",
        "before the food is even served",
        "never at all",
      ],
      0,
      "A guest's plate should only be cleared once they have finished eating, so as not to rush or disturb them.",
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
