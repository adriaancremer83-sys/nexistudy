// Seeds the Grade 9 Natural Sciences question bank (6 topics x 8 questions).
// CAPS Senior Phase, objectively-checkable only (definitions, facts, simple sums).
// Covers all four CAPS NS strands (Life & Living, Matter & Materials, Energy &
// Change, Planet Earth & Beyond), split into 6 topics for the 6x8 format.
// Pitched at Grade 9 level — basic facts, DISTINCT from the Gr10 Physical
// Sciences and Gr10 Life Sciences banks (Natural Sciences feeds both in Gr10).
// Every numeric answer double-checked by computation during drafting.
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but NOT option order).
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade9-naturalsciences.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Natural Sciences";
const GRADE = "Grade 9";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Cells & the Human Body": [
    [
      "The basic structural and functional unit of all living things is the:",
      ["cell", "organ", "tissue", "molecule"],
      0,
      "The cell is the basic structural and functional unit of all living organisms.",
    ],
    [
      "The part of the cell that controls its activities and contains genetic material is the:",
      ["cell wall", "nucleus", "cytoplasm", "ribosome"],
      1,
      "The nucleus controls the cell's activities and holds its DNA (genetic material).",
    ],
    [
      "Which structure is found in plant cells but NOT in animal cells?",
      ["nucleus", "cell membrane", "cell wall", "cytoplasm"],
      2,
      "A rigid cell wall (and chloroplasts) are found in plant cells but not in animal cells.",
    ],
    [
      "The human body system responsible for transporting blood around the body is the:",
      ["digestive system", "respiratory system", "nervous system", "circulatory system"],
      3,
      "The circulatory system transports blood, carrying oxygen and nutrients around the body.",
    ],
    [
      "The body system that breaks down food so the body can absorb nutrients is the:",
      ["digestive system", "skeletal system", "respiratory system", "excretory system"],
      0,
      "The digestive system breaks food down into nutrients the body can absorb.",
    ],
    [
      "The gas we breathe in and that the body needs for respiration is:",
      ["carbon dioxide", "oxygen", "nitrogen", "hydrogen"],
      1,
      "We breathe in oxygen, which cells use during respiration to release energy.",
    ],
    [
      "Which organ pumps blood around the body?",
      ["lungs", "liver", "heart", "kidneys"],
      2,
      "The heart is the muscular organ that pumps blood around the body.",
    ],
    [
      "A group of similar cells working together to perform a function is called a:",
      ["organ", "system", "organism", "tissue"],
      3,
      "A tissue is a group of similar cells that work together to do a particular job.",
    ],
  ],
  "Atoms, Elements & Compounds": [
    [
      "The smallest particle of an element that still has the properties of that element is an:",
      ["atom", "organ", "cell", "mixture"],
      0,
      "An atom is the smallest particle of an element that retains the element's properties.",
    ],
    [
      "The central part of an atom, containing protons and neutrons, is the:",
      ["electron", "nucleus", "shell", "ion"],
      1,
      "The nucleus is the atom's centre and contains protons and neutrons.",
    ],
    [
      "Which particle in an atom carries a negative charge?",
      ["proton", "neutron", "electron", "nucleus"],
      2,
      "Electrons carry a negative charge; protons are positive and neutrons are neutral.",
    ],
    [
      "A pure substance made of two or more elements chemically bonded together is a:",
      ["mixture", "atom", "element", "compound"],
      3,
      "A compound is two or more elements chemically combined, e.g. water (H₂O).",
    ],
    [
      "Water has the chemical formula:",
      ["H₂O", "CO₂", "O₂", "NaCl"],
      0,
      "Water is made of two hydrogen atoms and one oxygen atom: H₂O.",
    ],
    [
      "The chemical symbol for oxygen is:",
      ["Os", "O", "Ox", "On"],
      1,
      "The chemical symbol for the element oxygen is O.",
    ],
    [
      "The table that organises all the known elements in rows and columns is the:",
      ["food chain", "data table", "Periodic Table", "circuit diagram"],
      2,
      "The Periodic Table organises all known elements according to their properties.",
    ],
    [
      "Which of the following is a mixture, not a pure substance?",
      ["oxygen gas", "pure gold", "distilled water", "sand mixed with salt"],
      3,
      "Sand mixed with salt is a mixture — the substances are combined but not chemically bonded, so they can be separated physically.",
    ],
  ],
  "Chemical Reactions, Acids & Bases": [
    [
      "In a chemical reaction, the starting substances are called the:",
      ["reactants", "products", "mixtures", "elements"],
      0,
      "Reactants are the starting substances that react together; products are what form.",
    ],
    [
      "The new substances formed during a chemical reaction are called the:",
      ["reactants", "products", "atoms", "solvents"],
      1,
      "Products are the new substances formed during a chemical reaction.",
    ],
    [
      "On the pH scale, a substance with a pH of 2 is:",
      ["neutral", "a base", "an acid", "a salt"],
      2,
      "A pH below 7 is acidic; a pH of 2 means a strong acid.",
    ],
    [
      "Pure water is neutral, with a pH of:",
      ["1", "4", "10", "7"],
      3,
      "Pure water is neutral, with a pH of 7 (the middle of the 0–14 scale).",
    ],
    [
      "Blue litmus paper turns which colour when placed in an acid?",
      ["red", "blue", "green", "yellow"],
      0,
      "Blue litmus paper turns red in an acid; red litmus paper turns blue in a base.",
    ],
    [
      "A substance with a pH of 12 is:",
      ["an acid", "a base", "neutral", "a gas"],
      1,
      "A pH above 7 is basic (alkaline); a pH of 12 means a strong base.",
    ],
    [
      "When an acid reacts with a base, the reaction is called:",
      ["combustion", "evaporation", "neutralisation", "condensation"],
      2,
      "An acid reacting with a base is a neutralisation reaction, producing a salt and water.",
    ],
    [
      "Which of these is a sign that a chemical reaction has taken place?",
      [
        "the substance is cut into smaller pieces",
        "the substance is poured into a new container",
        "the substance melts and can be refrozen",
        "a new gas is given off",
      ],
      3,
      "Producing a new gas signals a chemical reaction; cutting, pouring and melting/refreezing are physical changes.",
    ],
  ],
  "Forces & Motion": [
    [
      "A push or a pull acting on an object is called a:",
      ["force", "mass", "speed", "volume"],
      0,
      "A force is a push or a pull that can change an object's motion or shape.",
    ],
    [
      "The force that pulls objects towards the centre of the Earth is:",
      ["friction", "gravity", "magnetism", "tension"],
      1,
      "Gravity is the force that pulls all objects towards the centre of the Earth.",
    ],
    [
      "The force that opposes motion between two surfaces in contact is:",
      ["gravity", "upthrust", "friction", "weight"],
      2,
      "Friction is the force that resists movement between two touching surfaces.",
    ],
    [
      "The SI unit used to measure force is the:",
      ["kilogram", "metre", "second", "newton"],
      3,
      "Force is measured in newtons (N).",
    ],
    [
      "A car travels 100 km in 2 hours. Its average speed is:",
      ["50 km/h", "200 km/h", "102 km/h", "98 km/h"],
      0,
      "Speed = distance ÷ time = 100 km ÷ 2 h = 50 km/h.",
    ],
    [
      "The amount of matter in an object is its:",
      ["weight", "mass", "force", "speed"],
      1,
      "Mass is the amount of matter in an object, measured in kilograms.",
    ],
    [
      "An object moving at a steady speed in a straight line has forces that are:",
      ["only gravity", "unbalanced", "balanced", "absent"],
      2,
      "When the forces on an object are balanced, it stays still or keeps moving at a constant speed in a straight line.",
    ],
    [
      "A runner covers 60 metres in 10 seconds. The average speed is:",
      ["600 m/s", "10 m/s", "50 m/s", "6 m/s"],
      3,
      "Speed = distance ÷ time = 60 m ÷ 10 s = 6 m/s.",
    ],
  ],
  "Electricity & Energy": [
    [
      "A complete path that allows electric current to flow is called an electric:",
      ["circuit", "force", "field", "charge"],
      0,
      "An electric circuit is a complete (closed) path that allows current to flow.",
    ],
    [
      "Electric current is measured using an instrument called an:",
      ["thermometer", "ammeter", "barometer", "ruler"],
      1,
      "Current is measured in amperes using an ammeter.",
    ],
    [
      "Which of these materials is a good conductor of electricity?",
      ["plastic", "rubber", "copper", "wood"],
      2,
      "Copper is a metal and a good conductor; plastic, rubber and wood are insulators.",
    ],
    [
      "A material that does NOT allow electricity to flow through it easily is called an:",
      ["conductor", "ammeter", "battery", "insulator"],
      3,
      "An insulator (e.g. plastic or rubber) does not allow electric current to flow through it easily.",
    ],
    [
      "The energy stored in a battery is a form of:",
      ["chemical potential energy", "sound energy", "light energy", "wind energy"],
      0,
      "A battery stores chemical potential energy, which is converted to electrical energy.",
    ],
    [
      "A device that opens or closes a circuit to turn it on or off is a:",
      ["resistor", "switch", "wire", "cell"],
      1,
      "A switch opens or closes a circuit, turning the current off or on.",
    ],
    [
      "Energy that comes from the Sun is known as:",
      ["nuclear energy", "kinetic energy", "solar energy", "elastic energy"],
      2,
      "Solar energy is the energy that comes from the Sun.",
    ],
    [
      "According to the law of conservation of energy, energy cannot be:",
      ["transferred", "stored", "used", "created or destroyed"],
      3,
      "Energy cannot be created or destroyed, only transferred or changed from one form to another.",
    ],
  ],
  "Planet Earth & Beyond": [
    [
      "The star at the centre of our Solar System is the:",
      ["Sun", "Moon", "Earth", "Mars"],
      0,
      "The Sun is the star at the centre of our Solar System.",
    ],
    [
      "The natural satellite that orbits the Earth is the:",
      ["Sun", "Mars", "Moon", "Venus"],
      2,
      "The Moon is Earth's natural satellite, orbiting the Earth.",
    ],
    [
      "How many planets are there in our Solar System?",
      ["5", "6", "7", "8"],
      3,
      "There are 8 planets in our Solar System (Pluto is now classified as a dwarf planet).",
    ],
    [
      "The solid, rocky outer layer of the Earth is called the:",
      ["crust", "core", "mantle", "atmosphere"],
      0,
      "The crust is the thin, solid, rocky outermost layer of the Earth.",
    ],
    [
      "The very hot centre of the Earth is called the:",
      ["crust", "core", "mantle", "lithosphere"],
      1,
      "The core is the extremely hot centre of the Earth, made mostly of iron and nickel.",
    ],
    [
      "The layer of gases surrounding the Earth is called the:",
      ["lithosphere", "hydrosphere", "atmosphere", "biosphere"],
      2,
      "The atmosphere is the layer of gases (air) that surrounds the Earth.",
    ],
    [
      "Earth takes approximately how long to make one full orbit around the Sun?",
      ["one day", "one week", "one month", "one year"],
      3,
      "The Earth takes about one year (365¼ days) to complete one orbit around the Sun.",
    ],
    [
      "The spinning of the Earth on its axis, which causes day and night, is called:",
      ["revolution", "rotation", "orbit", "gravity"],
      1,
      "Rotation is the spinning of the Earth on its own axis, which causes day and night.",
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
