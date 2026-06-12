// Seeds the Grade 12 Physical Sciences question bank (6 topics x 8 questions).
// CAPS-aligned; g = 9.8 m/s² as per the official exam data sheet.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade12-physci.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Physical Sciences";
const GRADE = "Grade 12";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Momentum & Impulse": [
    [
      "A 1 200 kg car travels at 20 m/s. What is the magnitude of its momentum?",
      ["60 kg·m/s", "24 000 kg·m/s", "2 400 kg·m/s", "12 000 kg·m/s"],
      1,
      "Momentum p = mv = 1 200 × 20 = 24 000 kg·m/s.",
    ],
    [
      "The SI unit of momentum is:",
      ["kg·m/s²", "N/s", "kg·m/s", "J"],
      2,
      "p = mv, so the unit is kilogram × metre per second = kg·m/s. (It is equivalent to N·s, the unit of impulse.)",
    ],
    [
      "A net force of 50 N acts on an object for 0.2 s. The impulse delivered is:",
      ["250 N·s", "10 N·s", "50.2 N·s", "2.5 N·s"],
      1,
      "Impulse = F(net) × Δt = 50 × 0.2 = 10 N·s.",
    ],
    [
      "A 0.5 kg ball hits a wall at 10 m/s and rebounds at 8 m/s along the same line. The magnitude of its change in momentum is:",
      ["1 kg·m/s", "4 kg·m/s", "5 kg·m/s", "9 kg·m/s"],
      3,
      "Take towards the wall as positive: Δp = m(vf − vi) = 0.5(−8 − 10) = −9. The magnitude is 9 kg·m/s. (1 kg·m/s is the trap if you forget the rebound direction.)",
    ],
    [
      "A 2 kg trolley moving at 6 m/s collides with a stationary 4 kg trolley and they stick together. Their common velocity after the collision is:",
      ["2 m/s", "3 m/s", "6 m/s", "1 m/s"],
      0,
      "Conservation of momentum: (2)(6) + (4)(0) = (2 + 4)v, so 12 = 6v and v = 2 m/s.",
    ],
    [
      "Newton's second law expressed in terms of momentum states that the net force equals:",
      ["mΔv", "the rate of change of momentum", "the change in kinetic energy", "mass × distance"],
      1,
      "F(net) = Δp/Δt — the net force on an object equals the rate of change of its momentum. This is the form used in the CAPS exam.",
    ],
    [
      "An airbag reduces injury in a crash because it:",
      [
        "decreases the change in momentum",
        "increases the time over which momentum changes, reducing the force",
        "increases the impulse on the passenger",
        "stops the passenger instantly",
      ],
      1,
      "The change in momentum is fixed by the crash, so impulse FΔt is fixed. The airbag makes Δt longer, so the force F on the passenger is smaller.",
    ],
    [
      "A collision is perfectly elastic when:",
      [
        "both momentum and kinetic energy are conserved",
        "only momentum is conserved",
        "the objects stick together",
        "kinetic energy is converted to heat",
      ],
      0,
      "Momentum is conserved in all isolated collisions; what makes a collision elastic is that kinetic energy is also conserved.",
    ],
  ],
  "Vertical Projectile Motion": [
    [
      "A ball is thrown straight up at 19.6 m/s. How long does it take to reach its highest point? (g = 9.8 m/s²)",
      ["1 s", "4 s", "2 s", "9.8 s"],
      2,
      "At the top the velocity is 0: t = v/g = 19.6 ÷ 9.8 = 2 s.",
    ],
    [
      "A ball is thrown straight up at 19.6 m/s. Its maximum height is: (g = 9.8 m/s²)",
      ["19.6 m", "39.2 m", "9.8 m", "29.4 m"],
      0,
      "v² = u² − 2gh with v = 0: h = u²/(2g) = (19.6)²/(2 × 9.8) = 384.16/19.6 = 19.6 m.",
    ],
    [
      "At the highest point of its flight, a ball thrown vertically upward has:",
      [
        "zero velocity and zero acceleration",
        "zero velocity and acceleration 9.8 m/s² downward",
        "zero acceleration and maximum velocity",
        "velocity and acceleration both upward",
      ],
      1,
      "The ball momentarily stops (v = 0) but gravity never switches off — the acceleration stays 9.8 m/s² downward throughout the flight.",
    ],
    [
      "An object is dropped from rest. Its speed after falling for 2 s is: (g = 9.8 m/s², ignore air resistance)",
      ["4.9 m/s", "9.8 m/s", "39.2 m/s", "19.6 m/s"],
      3,
      "v = u + gt = 0 + 9.8 × 2 = 19.6 m/s.",
    ],
    [
      "A ball is launched vertically upward from the ground at 14.7 m/s. The total time of flight before it lands is: (g = 9.8 m/s²)",
      ["1.5 s", "3 s", "4.5 s", "2 s"],
      1,
      "Time up = 14.7/9.8 = 1.5 s; the motion is symmetrical, so total time = 2 × 1.5 = 3 s.",
    ],
    [
      "For a ball in free fall (air resistance ignored), the gradient of its velocity-time graph is:",
      ["zero", "constantly changing", "constant at 9.8 m/s² (magnitude)", "equal to the ball's speed"],
      2,
      "The gradient of a v-t graph is acceleration. In free fall the acceleration is constant at 9.8 m/s², so the graph is a straight line.",
    ],
    [
      "An object is dropped from rest and falls 10 m. Its speed at that point is: (g = 9.8 m/s²)",
      ["14 m/s", "98 m/s", "10 m/s", "19.6 m/s"],
      0,
      "v² = u² + 2gh = 0 + 2 × 9.8 × 10 = 196, so v = √196 = 14 m/s.",
    ],
    [
      "A ball thrown vertically upward returns to its launch height. Ignoring air resistance, its speed there is:",
      [
        "less than the launch speed",
        "greater than the launch speed",
        "zero",
        "equal to the launch speed, directed downward",
      ],
      3,
      "Free-fall motion is symmetrical: the ball passes its launch height with the same speed it left with, but moving downward.",
    ],
  ],
  "Work, Energy & Power": [
    [
      "A horizontal force of 100 N pushes a crate 5 m across a floor in the direction of the force. The work done by the force is:",
      ["20 J", "500 J", "105 J", "250 J"],
      1,
      "W = FΔx cosθ with θ = 0°: W = 100 × 5 × 1 = 500 J.",
    ],
    [
      "The kinetic energy of a 2 kg object moving at 4 m/s is:",
      ["8 J", "4 J", "16 J", "32 J"],
      2,
      "Ek = ½mv² = ½ × 2 × 4² = 16 J.",
    ],
    [
      "The gravitational potential energy of a 5 kg object held 10 m above the ground is: (g = 9.8 m/s²)",
      ["490 J", "50 J", "98 J", "4 900 J"],
      0,
      "Ep = mgh = 5 × 9.8 × 10 = 490 J.",
    ],
    [
      "A car engine applies a forward force of 200 N while the car travels at a constant 15 m/s. The power delivered is:",
      ["13.3 W", "215 W", "1 500 W", "3 000 W"],
      3,
      "P = Fv = 200 × 15 = 3 000 W.",
    ],
    [
      "The work-energy theorem states that the net work done on an object equals:",
      [
        "its change in kinetic energy",
        "its change in potential energy",
        "its total mechanical energy",
        "the force applied to it",
      ],
      0,
      "W(net) = ΔEk — net work changes an object's kinetic energy. This theorem works even when forces like friction act.",
    ],
    [
      "A kinetic frictional force of 20 N acts on a sliding crate over 3 m. The energy dissipated as heat is:",
      ["6.7 J", "60 J", "23 J", "0 J"],
      1,
      "Energy dissipated = fΔx = 20 × 3 = 60 J. Friction transfers this mechanical energy to internal (heat) energy.",
    ],
    [
      "An object slides from rest down a frictionless slope of vertical height 4.9 m. Its speed at the bottom is: (g = 9.8 m/s²)",
      ["4.9 m/s", "48 m/s", "9.8 m/s", "96 m/s"],
      2,
      "Mechanical energy is conserved: mgh = ½mv², so v = √(2gh) = √(2 × 9.8 × 4.9) = √96.04 = 9.8 m/s.",
    ],
    [
      "Which of the following is a conservative force?",
      ["kinetic friction", "air resistance", "the gravitational force", "the applied force of a person pushing"],
      2,
      "A conservative force does work that depends only on start and end positions, not the path. Gravity qualifies; friction and air resistance dissipate energy along the path.",
    ],
  ],
  "Electric Circuits": [
    [
      "A resistor has 12 V across it and 3 A through it. Its resistance is:",
      ["36 Ω", "4 Ω", "0.25 Ω", "15 Ω"],
      1,
      "Ohm's law: R = V/I = 12 ÷ 3 = 4 Ω.",
    ],
    [
      "A 4 Ω and a 6 Ω resistor are connected in series. The total resistance is:",
      ["2.4 Ω", "1.5 Ω", "10 Ω", "24 Ω"],
      2,
      "In series, resistances simply add: 4 + 6 = 10 Ω.",
    ],
    [
      "A 4 Ω and a 6 Ω resistor are connected in parallel. The total resistance is:",
      ["10 Ω", "2.4 Ω", "5 Ω", "0.42 Ω"],
      1,
      "1/R = 1/4 + 1/6 = 5/12, so R = 12/5 = 2.4 Ω — always smaller than the smallest branch.",
    ],
    [
      "A device draws 2 A from a 12 V supply. The power it dissipates is:",
      ["6 W", "14 W", "24 W", "48 W"],
      2,
      "P = VI = 12 × 2 = 24 W.",
    ],
    [
      "A battery has an emf of 12 V and internal resistance 0.5 Ω, connected to a 5.5 Ω resistor. The current in the circuit is:",
      ["2 A", "2.18 A", "24 A", "1.09 A"],
      0,
      "emf = I(R + r): 12 = I(5.5 + 0.5) = 6I, so I = 2 A. (2.18 A is the trap if you ignore internal resistance.)",
    ],
    [
      "In a series circuit, the current:",
      [
        "is largest at the battery",
        "is the same at every point in the circuit",
        "decreases through each resistor",
        "splits between the resistors",
      ],
      1,
      "Charge isn't used up — in a single loop the same current flows through every component. Voltage, not current, is divided across series resistors.",
    ],
    [
      "Adding another resistor in parallel to an existing circuit:",
      [
        "decreases the total resistance and increases the total current",
        "increases the total resistance and decreases the total current",
        "leaves the total resistance unchanged",
        "decreases both total resistance and total current",
      ],
      0,
      "A parallel branch adds another path for current, so total resistance drops and the battery delivers more total current.",
    ],
    [
      "A kettle element draws 5 A from a 220 V supply for 60 s. The electrical energy transferred is:",
      ["1 100 J", "66 000 J", "18.3 J", "13 200 J"],
      1,
      "W = VIt = 220 × 5 × 60 = 66 000 J.",
    ],
  ],
  "Organic Chemistry": [
    [
      "The functional group of the alcohols is the:",
      ["carbonyl group (C=O)", "carboxyl group (−COOH)", "hydroxyl group (−OH)", "formyl group (−CHO)"],
      2,
      "Alcohols are characterised by the hydroxyl (−OH) group bonded to a saturated carbon, e.g. ethanol CH₃CH₂OH.",
    ],
    [
      "The general formula of the alkanes is:",
      ["CnH2n", "CnH2n+2", "CnH2n−2", "CnH2nO"],
      1,
      "Alkanes are saturated hydrocarbons with formula CnH2n+2 (methane CH₄, ethane C₂H₆, ...). CnH2n is the alkenes.",
    ],
    [
      "The IUPAC name of CH₃CH₂CH₂CH₃ is:",
      ["propane", "pentane", "methylpropane", "butane"],
      3,
      "An unbranched chain of four carbon atoms with only single bonds: butane.",
    ],
    [
      "CH₃COOH belongs to which homologous series?",
      ["carboxylic acids", "esters", "aldehydes", "alcohols"],
      0,
      "It contains the carboxyl group (−COOH): ethanoic acid, a carboxylic acid.",
    ],
    [
      "Structural isomers are compounds with:",
      [
        "the same structural formula but different molecular formulae",
        "the same molecular formula but different structural formulae",
        "identical physical properties",
        "the same functional group only",
      ],
      1,
      "Isomers share a molecular formula (e.g. C₄H₁₀) but the atoms are arranged differently (butane vs 2-methylpropane).",
    ],
    [
      "Bromine water is added to two test tubes, one with an alkane and one with an alkene. The alkene is identified because it:",
      [
        "turns the bromine water darker",
        "produces a gas",
        "decolourises the bromine water rapidly without UV light",
        "has no effect",
      ],
      2,
      "The C=C double bond reacts by addition, rapidly removing the bromine colour — no light needed. Alkanes react only slowly via substitution in UV light.",
    ],
    [
      "As the chain length of straight-chain alkanes increases, their boiling points:",
      [
        "increase, because the London (dispersion) forces become stronger",
        "decrease, because the molecules become heavier",
        "stay the same, because the functional group is unchanged",
        "decrease, because the surface area increases",
      ],
      0,
      "Longer chains have larger surface areas and more electrons, strengthening the intermolecular London forces — so more energy is needed to boil them.",
    ],
    [
      "An ester is formed by the reaction between:",
      [
        "two alcohols",
        "an alkane and an alkene",
        "a carboxylic acid and an alcohol",
        "an aldehyde and a ketone",
      ],
      2,
      "Esterification: carboxylic acid + alcohol ⇌ ester + water, usually with concentrated H₂SO₄ as catalyst.",
    ],
  ],
  "Acids & Bases": [
    [
      "According to the Lowry-Brønsted definition, an acid is:",
      ["a proton donor", "a proton acceptor", "an electron donor", "a substance containing OH⁻"],
      0,
      "Lowry-Brønsted: acids donate protons (H⁺); bases accept them. This is the definition used in the CAPS exam.",
    ],
    [
      "The pH of a 0.01 mol/dm³ solution of the strong acid HCl is:",
      ["1", "12", "2", "0.01"],
      2,
      "HCl ionises completely, so [H₃O⁺] = 0.01 = 10⁻² mol/dm³ and pH = −log(10⁻²) = 2.",
    ],
    [
      "In an aqueous solution at 25 °C, [H₃O⁺] = 1 × 10⁻⁵ mol/dm³. The hydroxide concentration [OH⁻] is:",
      ["1 × 10⁻⁵ mol/dm³", "1 × 10⁻⁹ mol/dm³", "1 × 10⁻¹⁴ mol/dm³", "1 × 10⁻⁷ mol/dm³"],
      1,
      "Kw = [H₃O⁺][OH⁻] = 1 × 10⁻¹⁴, so [OH⁻] = 10⁻¹⁴/10⁻⁵ = 1 × 10⁻⁹ mol/dm³.",
    ],
    [
      "The conjugate base of HSO₄⁻ is:",
      ["H₂SO₄", "SO₄²⁻", "H₃O⁺", "OH⁻"],
      1,
      "A conjugate base is the species left after the acid donates one proton: HSO₄⁻ → SO₄²⁻ + H⁺. (H₂SO₄ is its conjugate acid.)",
    ],
    [
      "The difference between a strong acid and a weak acid is that a strong acid:",
      [
        "is more concentrated",
        "has a higher pH",
        "ionises completely in water",
        "always reacts faster with all metals",
      ],
      2,
      "Strength is about the degree of ionisation, not concentration: strong acids (HCl, HNO₃, H₂SO₄) ionise virtually completely; weak acids (e.g. ethanoic acid) ionise only partially.",
    ],
    [
      "25 cm³ of 0.1 mol/dm³ NaOH exactly neutralises a sample of 0.05 mol/dm³ HCl. The volume of the HCl sample is:",
      ["12.5 cm³", "25 cm³", "100 cm³", "50 cm³"],
      3,
      "n(NaOH) = 0.1 × 0.025 = 0.0025 mol. HCl reacts 1:1, so V = n/c = 0.0025/0.05 = 0.05 dm³ = 50 cm³.",
    ],
    [
      "Water is described as amphiprotic (an ampholyte) because it:",
      [
        "can both donate and accept protons",
        "is neutral at pH 7",
        "ionises completely",
        "contains both hydrogen and oxygen",
      ],
      0,
      "Water can act as an acid (donating H⁺ to form OH⁻) or as a base (accepting H⁺ to form H₃O⁺), depending on what it reacts with.",
    ],
    [
      "A solution of ammonium chloride (NH₄Cl) in water is:",
      ["neutral", "basic, with pH above 7", "acidic, with pH below 7", "impossible to predict"],
      2,
      "NH₄⁺ is the conjugate acid of the weak base NH₃; it hydrolyses by donating protons to water, making the solution slightly acidic.",
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
