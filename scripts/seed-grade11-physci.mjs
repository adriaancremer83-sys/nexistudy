// Seeds the Grade 11 Physical Sciences question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only (laws, definitions, calculations).
// Grade 11 level. Every numeric answer double-checked by computation.
// Correct-answer positions spread evenly A-D per topic.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade11-physci.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Physical Sciences";
const GRADE = "Grade 11";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Newton's Laws & Forces": [
    [
      "Newton's First Law states that an object stays at rest or moves at constant velocity unless acted on by a:",
      ["balanced force", "net (resultant) force", "gravitational field", "normal force"],
      1,
      "An object's motion changes only when a non-zero net (resultant) force acts on it — this is Newton's First Law (inertia).",
    ],
    [
      "Newton's Second Law is expressed by the equation:",
      ["F = ma", "F = mg", "V = IR", "E = mc²"],
      0,
      "Newton's Second Law states that net force equals mass times acceleration: F = ma.",
    ],
    [
      "A net force of 20 N acts on a 4 kg object. Its acceleration is:",
      ["2 m/s²", "16 m/s²", "5 m/s²", "80 m/s²"],
      2,
      "From F = ma, a = F ÷ m = 20 ÷ 4 = 5 m/s².",
    ],
    [
      "The weight of a 10 kg object on Earth (g = 9.8 m/s²) is approximately:",
      ["1.02 N", "9.8 N", "19.6 N", "98 N"],
      3,
      "Weight = mg = 10 × 9.8 = 98 N.",
    ],
    [
      "Newton's Third Law states that for every action there is an equal and opposite:",
      ["acceleration", "reaction", "velocity", "mass"],
      1,
      "Newton's Third Law: for every action force there is an equal and opposite reaction force.",
    ],
    [
      "The mass of an object is a measure of:",
      ["the amount of matter it contains", "the force of gravity on it", "its speed", "its volume"],
      0,
      "Mass is the amount of matter in an object (measured in kilograms). The gravitational force on it is its weight.",
    ],
    [
      "The 'newton' (N) is the SI unit of:",
      ["mass", "energy", "force", "power"],
      2,
      "The newton (N) is the SI unit of force. One newton is the force that gives a 1 kg mass an acceleration of 1 m/s².",
    ],
    [
      "If the net force on an object is zero, the object will:",
      [
        "accelerate uniformly",
        "speed up",
        "always fall downwards",
        "stay at rest or move at constant velocity",
      ],
      3,
      "With zero net force, there is no acceleration, so the object stays at rest or continues at constant velocity (Newton's First Law).",
    ],
  ],
  "Electric Circuits": [
    [
      "Ohm's Law is expressed as:",
      ["V = IR", "F = ma", "P = mgh", "V = m / Q"],
      0,
      "Ohm's Law states that potential difference equals current times resistance: V = IR.",
    ],
    [
      "In a series circuit, the current is:",
      [
        "zero everywhere",
        "the same at all points",
        "different at every point",
        "always increasing",
      ],
      1,
      "In a series circuit there is only one path, so the current is the same at every point.",
    ],
    [
      "A potential difference of 12 V is applied across a 4 Ω resistor. The current is:",
      ["0.33 A", "48 A", "3 A", "16 A"],
      2,
      "From V = IR, I = V ÷ R = 12 ÷ 4 = 3 A.",
    ],
    [
      "The SI unit of electrical resistance is the:",
      ["volt", "ampere", "watt", "ohm"],
      3,
      "Resistance is measured in ohms (Ω). The volt measures potential difference and the ampere measures current.",
    ],
    [
      "Two resistors of 3 Ω and 6 Ω are connected in series. The total resistance is:",
      ["9 Ω", "2 Ω", "18 Ω", "0.5 Ω"],
      0,
      "Resistors in series simply add: 3 Ω + 6 Ω = 9 Ω.",
    ],
    [
      "In a parallel circuit, the potential difference (voltage) across each branch is:",
      [
        "different in each branch",
        "the same across each branch",
        "always zero",
        "always 12 V",
      ],
      1,
      "Each branch of a parallel circuit is connected across the same two points, so the voltage across each branch is the same.",
    ],
    [
      "The rate at which electrical energy is converted (used) is called:",
      ["charge", "resistance", "power", "potential difference"],
      2,
      "Power is the rate at which energy is converted, measured in watts.",
    ],
    [
      "A device that measures electric current, connected in series in a circuit, is a(n):",
      ["voltmeter", "barometer", "thermometer", "ammeter"],
      3,
      "An ammeter measures current and is connected in series. (A voltmeter measures potential difference and is connected in parallel.)",
    ],
  ],
  "Electrostatics": [
    [
      "Two objects with LIKE charges will:",
      ["attract each other", "repel each other", "have no effect on each other", "always combine"],
      1,
      "Like charges repel each other; only unlike (opposite) charges attract.",
    ],
    [
      "Two objects with UNLIKE (opposite) charges will:",
      ["attract each other", "repel each other", "cancel each other's mass", "do nothing"],
      0,
      "Unlike (opposite) charges attract each other.",
    ],
    [
      "The SI unit of electric charge is the:",
      ["volt", "ampere", "coulomb", "ohm"],
      2,
      "Electric charge is measured in coulombs (C).",
    ],
    [
      "Coulomb's Law states that the electrostatic force between two point charges is:",
      [
        "independent of the distance between them",
        "inversely proportional to the charges",
        "equal to mass times acceleration",
        "directly proportional to the product of the charges and inversely proportional to the square of the distance between them",
      ],
      3,
      "Coulomb's Law: the force is directly proportional to the product of the charges and inversely proportional to the square of the distance between them.",
    ],
    [
      "An initially neutral object that GAINS electrons becomes:",
      ["positively charged", "negatively charged", "neutral still", "heavier in mass only"],
      1,
      "Electrons carry negative charge, so an object that gains electrons becomes negatively charged.",
    ],
    [
      "An initially neutral object that LOSES electrons becomes:",
      ["positively charged", "negatively charged", "neutral still", "magnetic"],
      0,
      "Losing negative electrons leaves an excess of positive charge, so the object becomes positively charged.",
    ],
    [
      "The charge on a single proton is:",
      ["negative", "zero", "positive", "constantly changing"],
      2,
      "A proton carries a positive charge (equal in size to the electron's negative charge).",
    ],
    [
      "Charging a neutral conductor by bringing a charged object near it, without touching, is called charging by:",
      ["friction", "conduction", "contact", "induction"],
      3,
      "Charging by induction redistributes charge in a conductor using a nearby charged object, without direct contact.",
    ],
  ],
  "Geometrical Optics (Refraction)": [
    [
      "Refraction is the ___ of light as it passes from one medium into another.",
      ["bending (change in direction)", "reflection", "absorption", "scattering"],
      0,
      "Refraction is the bending (change in direction) of light as it moves between media of different optical densities.",
    ],
    [
      "Light refracts because its ___ changes as it moves between media of different optical densities.",
      ["colour", "speed", "frequency", "charge"],
      1,
      "The speed of light changes between media, which causes it to bend. Its frequency stays the same.",
    ],
    [
      "The ratio that describes how much a medium slows light, used in Snell's Law, is the:",
      ["focal length", "magnification", "refractive index", "wavelength"],
      2,
      "The refractive index (n) describes how much a medium slows down and bends light relative to a vacuum.",
    ],
    [
      "Snell's Law is written as:",
      ["V = IR", "F = ma", "n = m / M", "n₁ sin θ₁ = n₂ sin θ₂"],
      3,
      "Snell's Law of refraction is n₁ sin θ₁ = n₂ sin θ₂.",
    ],
    [
      "When light passes from a less dense to a more dense medium (e.g. air into glass), it bends:",
      ["towards the normal", "away from the normal", "straight back", "along the surface"],
      0,
      "Going into a more optically dense medium, light slows down and bends towards the normal.",
    ],
    [
      "The refractive index of a vacuum (and approximately of air) is:",
      ["0", "1", "1.5", "2"],
      1,
      "By definition the refractive index of a vacuum is exactly 1, and air is very close to 1.",
    ],
    [
      "The bending of light is greatest when it enters a medium with a ___ refractive index.",
      ["lower", "negative", "higher", "zero"],
      2,
      "A higher refractive index means the medium slows light more, so the light bends more.",
    ],
    [
      "The speed of light is fastest in:",
      ["glass", "water", "diamond", "a vacuum"],
      3,
      "Light travels fastest in a vacuum and slows down in denser media such as water, glass and diamond.",
    ],
  ],
  "Chemical Bonding & Intermolecular Forces": [
    [
      "A chemical bond formed by the TRANSFER of electrons from a metal to a non-metal is a(n) ___ bond.",
      ["covalent", "ionic", "metallic", "hydrogen"],
      1,
      "An ionic bond forms when a metal transfers electrons to a non-metal, producing oppositely charged ions that attract.",
    ],
    [
      "A chemical bond formed by the SHARING of electrons between two non-metals is a(n) ___ bond.",
      ["covalent", "ionic", "metallic", "hydrogen"],
      0,
      "A covalent bond forms when two non-metal atoms share pairs of electrons.",
    ],
    [
      "The bonding in metals, described as positive ions in a 'sea' of delocalised electrons, is ___ bonding.",
      ["ionic", "covalent", "metallic", "dative"],
      2,
      "Metallic bonding consists of a lattice of positive metal ions surrounded by a sea of freely moving (delocalised) electrons.",
    ],
    [
      "Water (H₂O) molecules are held to one another by a relatively strong intermolecular force called:",
      ["London forces", "dipole-dipole only", "ion-dipole forces", "hydrogen bonding"],
      3,
      "Water molecules form hydrogen bonds — a strong intermolecular force between H and the highly electronegative O.",
    ],
    [
      "A molecule with an uneven charge distribution, having a positive and a negative pole, is described as:",
      ["non-polar", "polar", "metallic", "a neutral atom"],
      1,
      "A polar molecule has an uneven charge distribution, creating partial positive and negative poles.",
    ],
    [
      "Intermolecular forces are ___ than the bonds within a molecule (intramolecular bonds).",
      ["weaker", "stronger", "equal", "always ionic"],
      0,
      "Intermolecular forces (between molecules) are weaker than the intramolecular bonds (within a molecule), which is why molecular substances melt easily.",
    ],
    [
      "The weakest intermolecular forces, present between all molecules and the only forces between non-polar molecules, are:",
      ["hydrogen bonds", "ionic bonds", "London (dispersion) forces", "covalent bonds"],
      2,
      "London (dispersion) forces are the weakest intermolecular forces and act between all molecules, including non-polar ones.",
    ],
    [
      "A covalent bond in which ONE atom provides both of the shared electrons is called a ___ bond.",
      ["ionic", "metallic", "double", "dative (coordinate covalent)"],
      3,
      "A dative (coordinate covalent) bond is a covalent bond in which both shared electrons come from the same atom.",
    ],
  ],
  "Stoichiometry & Quantitative Chemistry": [
    [
      "The number of particles in one mole of a substance (Avogadro's number) is approximately:",
      ["6.02 × 10²³", "9.8", "1.5", "3.14"],
      0,
      "One mole contains Avogadro's number of particles, approximately 6.02 × 10²³.",
    ],
    [
      "The relationship between number of moles (n), mass (m) and molar mass (M) is:",
      [
        "n = mass × molar mass",
        "n = mass ÷ molar mass",
        "n = molar mass ÷ mass",
        "n = mass + molar mass",
      ],
      1,
      "Number of moles = mass ÷ molar mass, i.e. n = m / M.",
    ],
    [
      "How many moles are in 36 g of water (H₂O, M = 18 g/mol)?",
      ["0.5 mol", "1 mol", "2 mol", "18 mol"],
      2,
      "n = m ÷ M = 36 ÷ 18 = 2 mol.",
    ],
    [
      "The molar mass of CO₂ (C = 12, O = 16) is:",
      ["28 g/mol", "32 g/mol", "40 g/mol", "44 g/mol"],
      3,
      "M(CO₂) = 12 + 2 × 16 = 12 + 32 = 44 g/mol.",
    ],
    [
      "The concentration of a solution (in mol/dm³) is calculated as:",
      [
        "c = n / V (moles ÷ volume)",
        "c = n × V",
        "c = V / n",
        "c = m × V",
      ],
      0,
      "Concentration = number of moles ÷ volume in dm³, i.e. c = n / V.",
    ],
    [
      "How many moles are present in 2 dm³ of a solution with a concentration of 0.5 mol/dm³?",
      ["0.25 mol", "1 mol", "2.5 mol", "4 mol"],
      1,
      "n = c × V = 0.5 × 2 = 1 mol.",
    ],
    [
      "At STP, one mole of any gas occupies a molar volume of approximately:",
      ["1 dm³", "11.2 dm³", "22.4 dm³", "44.8 dm³"],
      2,
      "At standard temperature and pressure (STP), one mole of any gas occupies about 22.4 dm³.",
    ],
    [
      "In the reaction 2H₂ + O₂ → 2H₂O, the mole ratio of hydrogen gas to water is:",
      ["1 : 2", "2 : 1", "1 : 3", "1 : 1"],
      3,
      "The coefficients give 2 mol H₂ to 2 mol H₂O, which simplifies to a 1 : 1 ratio.",
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
