// Seeds the Grade 12 Hospitality Studies question bank (6 topics x 8
// questions). CAPS-aligned, objectively-checkable only (industry terms,
// food-safety facts, nutrition, commodity science, cooking methods, service
// conventions). No interpretive questions. Correct-answer positions are
// spread evenly A-D per topic because the quiz engine shuffles question
// order, not option order. Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade12-hospitalitystudies.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Hospitality Studies";
const GRADE = "Grade 12";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "The Hospitality Industry": [
    [
      "The hospitality industry mainly provides:",
      [
        "accommodation, food and beverage services to guests",
        "medical treatment to patients",
        "legal advice to clients",
        "banking and insurance services",
      ],
      0,
      "The hospitality industry centres on providing accommodation, food and beverages, and related services to guests and travellers.",
    ],
    [
      "The document that lists the dishes available, and usually their prices, in a restaurant is called the:",
      ["invoice", "menu", "receipt", "duty roster"],
      1,
      "A menu lists the dishes offered (and usually their prices) so that guests can make their choices.",
    ],
    [
      "'Mise en place' is a French term that means:",
      [
        "serving the guests their food",
        "washing the dirty dishes",
        "everything in its place — all preparation done before service begins",
        "presenting the final bill",
      ],
      2,
      "Mise en place means having all ingredients and equipment prepared and 'in place' before cooking or service starts.",
    ],
    [
      "Which of the following is a front-of-house (service) position rather than a kitchen position?",
      ["chef de partie", "pastry chef", "sous chef", "waiter"],
      3,
      "A waiter works front-of-house, serving guests. The chef de partie, pastry chef and sous chef all work in the kitchen (back-of-house).",
    ],
    [
      "A professional appearance for someone working in the hospitality industry includes:",
      [
        "a clean, neat uniform and good personal hygiene",
        "long, loose hair hanging over the food",
        "wearing strong perfume close to the food",
        "chewing gum while serving guests",
      ],
      0,
      "A professional hospitality worker wears a clean, neat uniform and keeps good personal hygiene; loose hair, strong perfume and gum are unhygienic and unprofessional.",
    ],
    [
      "The 'back-of-house' area of a restaurant refers to the:",
      [
        "dining room where guests sit",
        "kitchen and food-preparation areas",
        "entrance and reception desk",
        "outdoor parking area",
      ],
      1,
      "Back-of-house is the part guests do not normally see — mainly the kitchen and food-preparation areas. Front-of-house is the dining and guest area.",
    ],
    [
      "Good customer service in a restaurant is shown by:",
      [
        "ignoring the guests' requests",
        "arguing with a guest who complains",
        "being friendly and attentive and dealing politely with complaints",
        "serving the food as slowly as possible",
      ],
      2,
      "Good customer service means being friendly and attentive and handling complaints politely and promptly, so guests have a positive experience and return.",
    ],
    [
      "Which of the following is a sector of the hospitality industry?",
      [
        "motor-vehicle manufacturing",
        "gold mining",
        "maize farming",
        "accommodation, such as hotels and guesthouses",
      ],
      3,
      "Accommodation — hotels, guesthouses and lodges — is a core sector of the hospitality industry. Mining, manufacturing and farming are separate industries.",
    ],
  ],
  "Hygiene, Safety & Security": [
    [
      "An important personal-hygiene practice in the kitchen is:",
      [
        "washing your hands thoroughly and regularly",
        "tasting food with the cooking spoon and returning it to the pot",
        "wearing a dirty apron throughout the shift",
        "coughing over open food",
      ],
      0,
      "Washing hands thoroughly and often is a key personal-hygiene practice that prevents bacteria spreading to food.",
    ],
    [
      "The temperature 'danger zone', in which bacteria in food multiply most rapidly, is between:",
      ["−18 °C and 0 °C", "5 °C and 60 °C", "60 °C and 100 °C", "100 °C and 150 °C"],
      1,
      "Bacteria multiply fastest between 5 °C and 60 °C; food should be kept colder or hotter than this danger zone.",
    ],
    [
      "In food safety, the abbreviation HACCP stands for:",
      [
        "Hotel And Catering Control Plan",
        "Hygiene And Cleaning Code of Practice",
        "Hazard Analysis and Critical Control Points",
        "Health And Customer Care Programme",
      ],
      2,
      "HACCP stands for Hazard Analysis and Critical Control Points — a system that identifies and controls food-safety hazards at critical stages of preparation.",
    ],
    [
      "Cross-contamination in the kitchen is best prevented by:",
      [
        "using one cutting board for everything",
        "storing raw chicken above ready-to-eat foods",
        "wiping all surfaces with the same dirty cloth",
        "using separate cutting boards and utensils for raw and cooked foods",
      ],
      3,
      "Keeping raw and ready-to-eat foods apart — separate boards, utensils and storage — stops harmful bacteria transferring from raw foods to cooked ones.",
    ],
    [
      "The correct first step when treating a minor burn in the kitchen is to:",
      [
        "cool the burn under cool running water",
        "rub butter or oil onto the burn",
        "burst any blisters that form",
        "ignore it and carry on working",
      ],
      0,
      "A minor burn should first be cooled under cool running water for several minutes; butter or oil and bursting blisters make the injury worse and risk infection.",
    ],
    [
      "Raw meat and poultry should be stored in the refrigerator:",
      [
        "on the top shelf above the salads",
        "on the bottom shelf, below ready-to-eat foods",
        "at room temperature on the counter",
        "next to cooked food on the same plate",
      ],
      1,
      "Raw meat and poultry are stored on the bottom shelf so that their juices cannot drip onto and contaminate ready-to-eat foods below.",
    ],
    [
      "An oil or fat fire on the stove must NEVER be put out with:",
      [
        "a fire blanket",
        "a suitable fire extinguisher",
        "water",
        "turning off the heat and smothering it",
      ],
      2,
      "Water must never be thrown onto a burning oil or fat fire — it makes the flames erupt violently. Smother it with a fire blanket or use a suitable extinguisher.",
    ],
    [
      "Stock rotation using the FIFO principle means:",
      [
        "using the newest stock first",
        "throwing away all stock every week",
        "never checking expiry dates",
        "First In, First Out — using the oldest stock first",
      ],
      3,
      "FIFO (First In, First Out) means the oldest stock is used first, so food is used before its expiry date and waste is reduced.",
    ],
  ],
  "Nutrition & Menu Planning": [
    [
      "Which nutrient is the body's main and most readily available source of energy?",
      ["carbohydrates", "vitamins", "minerals", "water"],
      0,
      "Carbohydrates are the body's main and most readily available source of energy.",
    ],
    [
      "Proteins are especially important in the diet because they:",
      [
        "provide most of the body's water",
        "are needed for growth and the repair of body tissue",
        "lubricate the joints",
        "are the main source of dietary fibre",
      ],
      1,
      "Proteins supply the amino acids needed for the growth and repair of body tissue.",
    ],
    [
      "A vegetarian who eats no meat, poultry or fish can obtain protein from:",
      [
        "only from red meat",
        "only from chicken",
        "legumes such as beans, lentils and soya",
        "only from fish",
      ],
      2,
      "Plant proteins such as legumes (beans, lentils and soya) supply protein for a vegetarian who avoids meat, poultry and fish.",
    ],
    [
      "In a classic three-course meal, the dessert is served:",
      [
        "before the starter",
        "instead of the main course",
        "at the same time as the starter",
        "last, after the main course",
      ],
      3,
      "A three-course meal follows the order starter → main course → dessert, so the dessert is served last, after the main course.",
    ],
    [
      "An 'à la carte' menu is one where:",
      [
        "each dish is individually listed and priced and chosen separately",
        "there is no choice at all",
        "a fixed set meal is offered at one price",
        "only beverages are available",
      ],
      0,
      "On an à la carte menu each dish is listed and priced separately, and the guest chooses individual items to make up their own meal.",
    ],
    [
      "A 'table d'hôte' menu offers:",
      [
        "only beverages",
        "a set selection of courses at a fixed price",
        "every dish priced separately",
        "no food, only snacks",
      ],
      1,
      "A table d'hôte menu offers a set selection of courses for a fixed total price, usually with limited choice within each course.",
    ],
    [
      "When planning a balanced and appealing menu, a good practice is to:",
      [
        "repeat the same colour and texture in every dish",
        "use only deep-fried foods",
        "include a variety of colours, textures and cooking methods",
        "serve three creamy dishes one after another",
      ],
      2,
      "A well-planned menu offers variety in colour, texture, flavour and cooking method so that the meal is balanced and appealing rather than repetitive.",
    ],
    [
      "A person with diabetes should be offered a menu that is:",
      [
        "very high in sugar",
        "based mainly on sweets and cakes",
        "high in added sugar and refined carbohydrates",
        "controlled (limited) in sugar and refined carbohydrates",
      ],
      3,
      "A diabetic diet should limit sugar and refined carbohydrates to help keep blood-glucose levels stable.",
    ],
  ],
  "Food Commodities": [
    [
      "In baking, the main functions of eggs are to:",
      [
        "bind, enrich and help to aerate mixtures",
        "make the food taste sour",
        "add dietary fibre",
        "preserve the food for years",
      ],
      0,
      "In baking, eggs bind ingredients together, enrich the mixture (adding nutrients and colour) and help to aerate it when beaten.",
    ],
    [
      "Which of the following is a chemical raising agent used in baking?",
      ["yeast", "baking powder", "salt", "vinegar"],
      1,
      "Baking powder is a chemical raising agent that releases carbon dioxide to make baked goods rise. Yeast, by contrast, is a biological raising agent.",
    ],
    [
      "Yeast makes bread dough rise by:",
      [
        "simply melting in the heat",
        "absorbing water from the dough",
        "fermenting sugars and producing carbon dioxide gas",
        "turning entirely into steam",
      ],
      2,
      "Yeast is a living organism that ferments the sugars in dough and produces carbon dioxide gas, which makes the bread rise.",
    ],
    [
      "Gluten, the protein that gives bread its structure and elasticity, is found in:",
      ["sugar", "butter", "eggs", "wheat flour"],
      3,
      "Gluten is a protein that forms from wheat flour when it is mixed with water; it gives bread dough its elasticity and structure.",
    ],
    [
      "Heating milk to a high temperature for a short time to kill harmful bacteria is called:",
      ["pasteurisation", "fermentation", "caramelisation", "evaporation"],
      0,
      "Pasteurisation heats milk to a high temperature for a short time to destroy harmful bacteria while keeping the milk safe to drink.",
    ],
    [
      "When sugar is heated until it melts and turns a golden-brown colour, the process is called:",
      ["pasteurisation", "caramelisation", "coagulation", "fermentation"],
      1,
      "Caramelisation is the browning that takes place when sugar is heated until it melts and changes colour and flavour.",
    ],
    [
      "When an egg is cooked, the clear egg white sets and turns firm and white. This setting of the egg protein is called:",
      ["caramelisation", "evaporation", "coagulation", "fermentation"],
      2,
      "Coagulation is the setting (solidifying) of protein when it is heated — for example egg white turning firm and opaque as it cooks.",
    ],
    [
      "Which cooking fat has a high smoke point, making it the most suitable for deep-frying?",
      ["butter", "soft tub margarine", "fresh cream", "vegetable (cooking) oil"],
      3,
      "Vegetable cooking oils have a high smoke point and are suitable for deep-frying. Butter, margarine and cream burn at much lower temperatures.",
    ],
  ],
  "Food Preparation & Cooking Methods": [
    [
      "Boiling, steaming and poaching are all examples of:",
      [
        "moist-heat (wet) cooking methods",
        "dry-heat cooking methods",
        "deep-frying methods",
        "raw (no-cook) preparation",
      ],
      0,
      "Boiling, steaming and poaching all cook food using water or water vapour, so they are moist-heat (wet) cooking methods.",
    ],
    [
      "Which of the following is a dry-heat cooking method?",
      ["poaching", "baking (roasting)", "steaming", "boiling"],
      1,
      "Baking/roasting cooks food using dry heat in an oven. Poaching, steaming and boiling all use water (moist heat).",
    ],
    [
      "To 'blanch' a vegetable means to:",
      [
        "fry it until crisp",
        "freeze it while still raw",
        "briefly boil it and then plunge it into iced water",
        "bake it slowly for an hour",
      ],
      2,
      "Blanching means briefly boiling food and then plunging it into iced water to stop the cooking; it sets the colour and helps prepare vegetables for freezing.",
    ],
    [
      "To 'sauté' food means to:",
      [
        "boil it in plenty of water",
        "steam it over boiling water",
        "bake it slowly in the oven",
        "fry it quickly in a little hot fat while tossing it",
      ],
      3,
      "To sauté is to fry food quickly in a small amount of hot fat, tossing or stirring it, in a pan over fairly high heat.",
    ],
    [
      "Cutting vegetables into small, even cube shapes is known as a:",
      ["dice", "julienne", "chiffonade", "fillet"],
      0,
      "To dice is to cut food into small, even cube shapes. A julienne cuts into thin strips and a chiffonade shreds leafy herbs.",
    ],
    [
      "Cutting vegetables such as carrots into thin matchstick strips is called:",
      ["dicing", "julienne", "grating", "mincing"],
      1,
      "A julienne cut produces thin, even matchstick strips, often used for vegetables such as carrots.",
    ],
    [
      "To 'marinate' meat means to:",
      [
        "cook it in a hot oven",
        "freeze it until solid",
        "soak it in a seasoned liquid to add flavour and help tenderise it",
        "coat it in dry breadcrumbs",
      ],
      2,
      "Marinating soaks food in a seasoned (often slightly acidic) liquid before cooking, to add flavour and help tenderise it.",
    ],
    [
      "Grilling and roasting brown the surface of food and develop rich flavour mainly because of:",
      [
        "pasteurisation",
        "fermentation",
        "coagulation",
        "browning reactions caused by dry heat",
      ],
      3,
      "Dry-heat methods such as grilling and roasting cause browning reactions on the surface of food, which develop colour and a richer flavour.",
    ],
  ],
  "Food & Beverage Service": [
    [
      "In a basic place setting (cover), the dinner fork is placed:",
      [
        "to the left of the dinner plate",
        "to the right of the dinner plate",
        "directly above the plate",
        "on top of the plate",
      ],
      0,
      "In a standard cover the fork is placed to the left of the plate, with the knife and spoon to the right.",
    ],
    [
      "In a standard place setting, the dinner knife is placed:",
      [
        "to the left of the plate",
        "to the right of the plate with the blade facing the plate",
        "directly above the plate",
        "inside the water glass",
      ],
      1,
      "The dinner knife is placed to the right of the plate, with its cutting edge (blade) facing towards the plate.",
    ],
    [
      "'Silver service' (English service) is a style of service in which the:",
      [
        "guest serves themselves at a buffet",
        "food is plated in the kitchen and simply carried out",
        "waiter serves food onto the guest's plate at the table using a spoon and fork",
        "guest collects the food from a self-service counter",
      ],
      2,
      "In silver service the waiter serves the food from a platter onto the guest's plate at the table, using a serving spoon and fork.",
    ],
    [
      "In 'plate service' (American service), the food is:",
      [
        "served from a large platter at the table",
        "collected by guests from a buffet",
        "cooked at the table in front of the guest",
        "fully plated and portioned in the kitchen, then carried to the guest",
      ],
      3,
      "In plate (American) service the food is dished up and arranged on the plate in the kitchen and then carried out and placed in front of the guest.",
    ],
    [
      "A common convention for serving and clearing at a table is to:",
      [
        "serve food from the guest's left and clear used plates from the right",
        "serve and clear everything from directly above",
        "place the plates down anywhere on the table",
        "serve only from behind the guest's head",
      ],
      0,
      "A common convention is to serve food from the guest's left and to clear the used plates from the right.",
    ],
    [
      "In restaurant service, a 'cover' refers to:",
      [
        "the lid of a serving dish",
        "the complete place setting laid out for one guest",
        "the tablecloth only",
        "the printed menu card",
      ],
      1,
      "A cover is the complete place setting — cutlery, crockery, glassware and space — laid at the table for one guest.",
    ],
    [
      "Which of the following is a non-alcoholic beverage?",
      ["red wine", "brandy", "fresh fruit juice", "beer"],
      2,
      "Fresh fruit juice is a non-alcoholic beverage. Wine, brandy and beer all contain alcohol.",
    ],
    [
      "A serviette (napkin) at a place setting is mainly used to:",
      [
        "wipe down the table",
        "cover the food on the plate",
        "polish the cutlery",
        "protect the guest's clothing and wipe the mouth and hands",
      ],
      3,
      "A serviette (napkin) is provided so that guests can protect their clothing and wipe their mouth and hands during the meal.",
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
