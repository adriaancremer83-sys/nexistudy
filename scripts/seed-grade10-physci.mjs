// Seeds the Grade 10 Physical Sciences question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only (definitions, classifications,
// calculations). Grade 10 level. Topics are fully DISTINCT from the Gr11 bank
// (Gr11 = Newton's Laws, Circuits, Electrostatics, Refraction, Bonding,
// Stoichiometry; Gr10 here = matter, atomic structure, change, kinematics,
// waves, energy). Every numeric answer double-checked by computation.
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but NOT option order).
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade10-physci.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Physical Sciences";
const GRADE = "Grade 10";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Classification of Matter": [
    [
      "A pure substance made up of only ONE type of atom is called a(n):",
      ["element", "compound", "mixture", "solution"],
      0,
      "An element is a pure substance made of only one type of atom (for example oxygen or gold).",
    ],
    [
      "A pure substance formed when two or more elements are chemically bonded in a fixed ratio is a(n):",
      ["element", "compound", "mixture", "alloy"],
      1,
      "A compound is a pure substance made of two or more elements chemically combined in a fixed ratio (for example water, H₂O).",
    ],
    [
      "Which of the following is a MIXTURE?",
      ["pure water", "oxygen gas", "sand and salt stirred together", "carbon dioxide"],
      2,
      "A mixture contains two or more substances that are physically combined and not chemically bonded — sand and salt stirred together is a mixture.",
    ],
    [
      "A mixture that looks the same throughout, such as salt dissolved in water, is called a:",
      ["heterogeneous mixture", "suspension", "compound", "homogeneous mixture"],
      3,
      "A homogeneous mixture has a uniform composition throughout (for example a salt solution); the separate parts cannot be seen.",
    ],
    [
      "The method used to recover dissolved salt from salt water, by removing the water, is:",
      ["evaporation", "filtration", "magnetism", "chromatography"],
      0,
      "Evaporation removes the water (which evaporates), leaving the dissolved salt behind.",
    ],
    [
      "The method used to separate sand from water is:",
      ["distillation", "filtration", "evaporation", "chromatography"],
      1,
      "Filtration separates an insoluble solid (sand) from a liquid (water) by passing the mixture through filter paper.",
    ],
    [
      "A mixture in which the different parts can clearly be seen, such as a salad or granite, is called a:",
      ["homogeneous mixture", "pure substance", "heterogeneous mixture", "compound"],
      2,
      "A heterogeneous mixture has a non-uniform composition — the separate parts are visible (for example a salad or granite).",
    ],
    [
      "Which separation method uses a magnet to remove iron filings from a mixture?",
      ["filtration", "distillation", "evaporation", "magnetic separation"],
      3,
      "Magnetic separation uses a magnet to attract and remove magnetic materials such as iron filings from a mixture.",
    ],
  ],
  "Atomic Structure & the Periodic Table": [
    [
      "The three subatomic particles that make up an atom are:",
      [
        "protons, neutrons and electrons",
        "ions, atoms and molecules",
        "solids, liquids and gases",
        "acids, bases and salts",
      ],
      0,
      "An atom is made of protons and neutrons (in the nucleus) and electrons (orbiting the nucleus).",
    ],
    [
      "The particle in the atom that carries a NEGATIVE charge is the:",
      ["proton", "electron", "neutron", "nucleus"],
      1,
      "The electron carries a negative charge; the proton is positive and the neutron is neutral.",
    ],
    [
      "The number of protons in an atom is called its:",
      ["mass number", "neutron number", "atomic number", "valency"],
      2,
      "The atomic number (Z) is the number of protons in an atom; it determines which element the atom is.",
    ],
    [
      "The particle found in the nucleus that has NO electric charge is the:",
      ["proton", "electron", "ion", "neutron"],
      3,
      "The neutron is found in the nucleus and carries no charge (it is neutral).",
    ],
    [
      "An atom has 11 protons and 12 neutrons. Its mass number is:",
      ["23", "11", "12", "1"],
      0,
      "Mass number = number of protons + number of neutrons = 11 + 12 = 23.",
    ],
    [
      "In the Periodic Table, the vertical columns are called:",
      ["periods", "groups", "diagonals", "shells"],
      1,
      "The vertical columns of the Periodic Table are called groups; elements in the same group have similar chemical properties.",
    ],
    [
      "An atom that has lost or gained electrons and now carries an electric charge is called a(n):",
      ["isotope", "molecule", "ion", "compound"],
      2,
      "An ion is a charged particle formed when an atom loses electrons (becoming positive) or gains electrons (becoming negative).",
    ],
    [
      "The horizontal rows of the Periodic Table are called:",
      ["groups", "families", "columns", "periods"],
      3,
      "The horizontal rows of the Periodic Table are called periods.",
    ],
  ],
  "Physical & Chemical Change": [
    [
      "Melting ice into liquid water is an example of a:",
      ["physical change", "chemical change", "nuclear reaction", "combustion reaction"],
      0,
      "Melting is a physical change — only the state changes; the substance is still water (H₂O) and the change can be reversed.",
    ],
    [
      "The burning of wood is an example of a:",
      ["physical change", "chemical change", "change of state only", "dissolving"],
      1,
      "Burning is a chemical change — new substances (ash, carbon dioxide, water vapour) form and it cannot easily be reversed.",
    ],
    [
      "During a chemical reaction, the substances you start with are called the:",
      ["products", "catalysts", "reactants", "solvents"],
      2,
      "Reactants are the starting substances in a chemical reaction; they are changed into the products.",
    ],
    [
      "The Law of Conservation of Mass states that in a chemical reaction the total mass of the products is ___ the total mass of the reactants.",
      ["always greater than", "always less than", "unrelated to", "equal to"],
      3,
      "Mass is conserved in a chemical reaction: the total mass of the products equals the total mass of the reactants.",
    ],
    [
      "In the equation 2H₂ + O₂ → 2H₂O, the substance on the RIGHT of the arrow (H₂O) is the:",
      ["product", "reactant", "catalyst", "element"],
      0,
      "The substance on the right of the arrow is the product — what is formed by the reaction.",
    ],
    [
      "Which of the following is a sign that a CHEMICAL change has taken place?",
      ["ice melting", "a colour change and a new gas forming", "water boiling", "sugar dissolving"],
      1,
      "A colour change, a new gas, light/heat, or a precipitate forming are signs of a chemical change (a new substance is made). The others are physical changes.",
    ],
    [
      "How many oxygen atoms are shown on the LEFT-hand side of the equation 2H₂ + O₂ → 2H₂O?",
      ["1", "3", "2", "4"],
      2,
      "O₂ means one molecule of two oxygen atoms, so there are 2 oxygen atoms on the left-hand side.",
    ],
    [
      "Dissolving salt in water is regarded as a physical change mainly because:",
      [
        "a new substance is formed",
        "it gives off light",
        "it can never be reversed",
        "no new substance forms and the salt can be recovered by evaporation",
      ],
      3,
      "Dissolving is a physical change: no new substance forms and the salt can be recovered by evaporating the water.",
    ],
  ],
  "Motion in One Dimension": [
    [
      "Speed is calculated using the formula:",
      [
        "speed = distance ÷ time",
        "speed = distance × time",
        "speed = time ÷ distance",
        "speed = mass × distance",
      ],
      0,
      "Speed = distance ÷ time; it tells you how fast an object moves.",
    ],
    [
      "A car travels 100 m in 5 s. Its average speed is:",
      ["500 m/s", "20 m/s", "0.05 m/s", "105 m/s"],
      1,
      "Speed = distance ÷ time = 100 ÷ 5 = 20 m/s.",
    ],
    [
      "The SI unit of speed is:",
      ["metres (m)", "seconds (s)", "metres per second (m/s)", "newtons (N)"],
      2,
      "Speed is measured in metres per second (m/s) in the SI system.",
    ],
    [
      "A quantity that has both magnitude AND direction, such as velocity, is a:",
      ["scalar", "speed", "distance", "vector"],
      3,
      "A vector has both magnitude and direction (for example velocity or displacement). A scalar has magnitude only.",
    ],
    [
      "The rate at which an object's velocity changes is called its:",
      ["acceleration", "distance", "mass", "weight"],
      0,
      "Acceleration is the rate of change of velocity (how quickly the velocity increases or decreases).",
    ],
    [
      "A runner covers 400 m in 50 s. The average speed is:",
      ["0.125 m/s", "8 m/s", "20 000 m/s", "450 m/s"],
      1,
      "Speed = distance ÷ time = 400 ÷ 50 = 8 m/s.",
    ],
    [
      "Which of the following is a SCALAR quantity (magnitude only)?",
      ["velocity", "displacement", "distance", "acceleration"],
      2,
      "Distance is a scalar — it has size but no direction. Velocity, displacement and acceleration are vectors.",
    ],
    [
      "A cyclist travels at 6 m/s for 10 s. The distance covered is:",
      ["0.6 m", "16 m", "1.67 m", "60 m"],
      3,
      "Distance = speed × time = 6 × 10 = 60 m.",
    ],
  ],
  "Waves, Sound & Light": [
    [
      "A wave in which the particles vibrate at right angles (perpendicular) to the direction the wave travels is a:",
      ["transverse wave", "longitudinal wave", "sound wave", "shock wave"],
      0,
      "In a transverse wave the particles move perpendicular to the direction the wave travels (for example light or water waves).",
    ],
    [
      "A wave in which the particles vibrate parallel to the direction the wave travels, such as sound, is a:",
      ["transverse wave", "longitudinal wave", "light wave", "radio wave"],
      1,
      "In a longitudinal wave the particles vibrate parallel to the direction of travel — sound is a longitudinal wave.",
    ],
    [
      "The number of complete waves passing a point per second is called the:",
      ["wavelength", "amplitude", "frequency", "period"],
      2,
      "Frequency is the number of complete waves (cycles) passing a point each second, measured in hertz (Hz).",
    ],
    [
      "The wave equation relating speed (v), frequency (f) and wavelength (λ) is:",
      ["v = f ÷ λ", "v = λ ÷ f", "v = f − λ", "v = f × λ"],
      3,
      "The wave speed equals frequency times wavelength: v = f × λ.",
    ],
    [
      "A wave has a frequency of 5 Hz and a wavelength of 2 m. Its speed is:",
      ["10 m/s", "2.5 m/s", "7 m/s", "3 m/s"],
      0,
      "v = f × λ = 5 × 2 = 10 m/s.",
    ],
    [
      "The distance from one crest of a wave to the next crest is the:",
      ["amplitude", "wavelength", "frequency", "period"],
      1,
      "The wavelength is the distance between two successive identical points on a wave, such as from crest to crest.",
    ],
    [
      "Visible light is part of the ___ spectrum, which also includes radio waves, X-rays and microwaves.",
      ["sound", "longitudinal", "electromagnetic", "seismic"],
      2,
      "Visible light is part of the electromagnetic spectrum, along with radio waves, microwaves, infrared, ultraviolet, X-rays and gamma rays.",
    ],
    [
      "The maximum distance a wave moves from its rest position, which is related to its energy, is the:",
      ["wavelength", "frequency", "period", "amplitude"],
      3,
      "The amplitude is the maximum displacement of a wave from its rest position; a bigger amplitude means more energy.",
    ],
  ],
  "Energy (Mechanical Energy)": [
    [
      "Energy that an object has because of its motion is called:",
      ["kinetic energy", "potential energy", "chemical energy", "nuclear energy"],
      0,
      "Kinetic energy is the energy an object has due to its motion; the faster it moves, the more kinetic energy it has.",
    ],
    [
      "Energy that an object has because of its position or height above the ground is called gravitational ___ energy.",
      ["kinetic", "potential", "sound", "electrical"],
      1,
      "Gravitational potential energy is the energy an object has due to its height (position) above a reference point.",
    ],
    [
      "Gravitational potential energy is calculated using the formula:",
      ["EP = ½mv²", "EP = m ÷ g", "EP = mgh", "EP = Fd"],
      2,
      "Gravitational potential energy EP = mgh, where m is the mass, g is the gravitational acceleration and h is the height.",
    ],
    [
      "Kinetic energy is calculated using the formula:",
      ["EK = mgh", "EK = mg", "EK = Fd", "EK = ½mv²"],
      3,
      "Kinetic energy EK = ½mv², where m is the mass and v is the speed.",
    ],
    [
      "The SI unit of energy is the:",
      ["joule (J)", "newton (N)", "watt (W)", "metre (m)"],
      0,
      "Energy is measured in joules (J) in the SI system.",
    ],
    [
      "An object of mass 2 kg is held 5 m above the ground (g = 10 m/s²). Its gravitational potential energy is:",
      ["10 J", "100 J", "25 J", "1 J"],
      1,
      "EP = mgh = 2 × 10 × 5 = 100 J.",
    ],
    [
      "The total mechanical energy of an object is the sum of its:",
      ["mass and weight", "speed and height", "kinetic and potential energy", "force and distance"],
      2,
      "Mechanical energy = kinetic energy + (gravitational) potential energy.",
    ],
    [
      "A 2 kg object moves at 3 m/s. Its kinetic energy is:",
      ["6 J", "18 J", "3 J", "9 J"],
      3,
      "EK = ½mv² = ½ × 2 × 3² = ½ × 2 × 9 = 9 J.",
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
