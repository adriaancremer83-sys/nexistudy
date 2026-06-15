// Seeds the Grade 10 Life Sciences question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only (definitions, classifications,
// processes). Grade 10 level. Topics are fully DISTINCT from the Gr11 bank
// (Gr11 = Classification, Photosynthesis, Respiration, Gaseous Exchange,
// Digestion, Population Ecology; Gr10 here = chemistry of life, cells, mitosis,
// tissues, plant transport, circulatory system).
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but NOT option order).
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade10-lifesci.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Life Sciences";
const GRADE = "Grade 10";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "The Chemistry of Life": [
    [
      "Compounds that contain carbon and are found in living organisms, such as carbohydrates and proteins, are called:",
      ["organic compounds", "inorganic compounds", "minerals", "pure elements"],
      0,
      "Organic compounds contain carbon (and usually hydrogen) and are associated with living things — for example carbohydrates, proteins and lipids.",
    ],
    [
      "The building blocks (monomers) of proteins are:",
      ["glucose molecules", "amino acids", "fatty acids", "nucleotides"],
      1,
      "Proteins are made of long chains of amino acids joined together.",
    ],
    [
      "Carbohydrates are made up of the elements carbon, hydrogen and:",
      ["nitrogen", "sulphur", "oxygen", "phosphorus"],
      2,
      "Carbohydrates contain carbon, hydrogen and oxygen (for example glucose, C₆H₁₂O₆).",
    ],
    [
      "The most abundant inorganic compound in living cells, making up most of their mass, is:",
      ["glucose", "protein", "fat", "water"],
      3,
      "Water is the most abundant compound in cells and acts as a solvent and a medium for reactions.",
    ],
    [
      "Biological catalysts that speed up reactions in cells, and which are made of protein, are:",
      ["enzymes", "vitamins", "lipids", "minerals"],
      0,
      "Enzymes are protein catalysts that speed up biochemical reactions without being used up.",
    ],
    [
      "Which of the following is a lipid (fat)?",
      ["starch", "cooking oil", "an amino acid", "table salt"],
      1,
      "Cooking oil is a lipid. Lipids include oils, fats and waxes and are made of fatty acids and glycerol.",
    ],
    [
      "A food test using iodine solution, which turns blue-black, tests for the presence of:",
      ["protein", "fat", "starch", "glucose"],
      2,
      "Iodine solution turns blue-black in the presence of starch — a standard test for starch.",
    ],
    [
      "The element found in proteins but NOT in carbohydrates or lipids is:",
      ["carbon", "hydrogen", "oxygen", "nitrogen"],
      3,
      "Proteins contain nitrogen (in their amino acids) in addition to carbon, hydrogen and oxygen, unlike carbohydrates and lipids.",
    ],
  ],
  "Cell Structure & Organelles": [
    [
      "The structure that controls the activities of the cell and contains the DNA is the:",
      ["nucleus", "cell membrane", "vacuole", "ribosome"],
      0,
      "The nucleus controls the cell's activities and contains the genetic material (DNA).",
    ],
    [
      "The organelle known as the 'powerhouse' of the cell, where respiration releases energy, is the:",
      ["nucleus", "mitochondrion", "chloroplast", "cell wall"],
      1,
      "The mitochondrion is the site of cellular respiration, releasing energy (ATP), so it is called the powerhouse of the cell.",
    ],
    [
      "The thin layer that surrounds the cell and controls what enters and leaves it is the:",
      ["cell wall", "nucleus", "cell membrane", "cytoplasm"],
      2,
      "The cell (plasma) membrane surrounds the cell and controls the movement of substances into and out of it.",
    ],
    [
      "Photosynthesis takes place in the organelle called the:",
      ["mitochondrion", "nucleus", "ribosome", "chloroplast"],
      3,
      "Chloroplasts contain chlorophyll and are the site of photosynthesis in plant cells.",
    ],
    [
      "Which structure is found in PLANT cells but NOT in animal cells?",
      ["a rigid cell wall", "a nucleus", "a cell membrane", "mitochondria"],
      0,
      "Plant cells have a rigid cellulose cell wall outside the membrane; animal cells do not.",
    ],
    [
      "The jelly-like fluid inside the cell, in which the organelles are suspended, is the:",
      ["nucleus", "cytoplasm", "cell wall", "membrane"],
      1,
      "The cytoplasm is the jelly-like fluid that fills the cell and holds the organelles.",
    ],
    [
      "The large fluid-filled space that stores cell sap and helps support a plant cell is the:",
      ["nucleus", "mitochondrion", "vacuole", "ribosome"],
      2,
      "Plant cells have a large central vacuole that stores cell sap and helps keep the cell firm (turgid).",
    ],
    [
      "The idea that all living things are made of cells, and that all cells come from existing cells, is known as:",
      ["the theory of evolution", "natural selection", "binomial nomenclature", "cell theory"],
      3,
      "Cell theory states that all living organisms are made of cells and that all cells arise from pre-existing cells.",
    ],
  ],
  "Cell Division (Mitosis)": [
    [
      "The thread-like structures in the nucleus that carry the genetic information (DNA) are called:",
      ["chromosomes", "ribosomes", "vacuoles", "membranes"],
      0,
      "Chromosomes are structures in the nucleus, made of DNA, that carry the genetic information.",
    ],
    [
      "The type of cell division that produces two identical daughter cells for growth and repair is:",
      ["meiosis", "mitosis", "fertilisation", "digestion"],
      1,
      "Mitosis produces two genetically identical daughter cells and is used for growth and the repair of tissues.",
    ],
    [
      "The two cells produced by mitosis are:",
      [
        "genetically different from each other",
        "always larger than the parent",
        "genetically identical to the parent cell",
        "missing a nucleus",
      ],
      2,
      "Mitosis produces two daughter cells that are genetically identical to the parent cell and to each other.",
    ],
    [
      "One important role of mitosis in a multicellular organism is:",
      [
        "producing gametes (sex cells)",
        "digesting food",
        "making hormones",
        "growth and the repair of damaged tissue",
      ],
      3,
      "Mitosis allows an organism to grow and to repair or replace damaged or worn-out cells.",
    ],
    [
      "Before a cell divides, its DNA must first be:",
      ["copied (replicated)", "destroyed", "turned into protein", "removed from the cell"],
      0,
      "DNA is replicated (copied) before division so that each daughter cell receives a complete, identical set.",
    ],
    [
      "The period of growth and DNA replication between cell divisions is called:",
      ["mitosis", "interphase", "fertilisation", "cytokinesis"],
      1,
      "Interphase is the stage between divisions during which the cell grows and copies its DNA.",
    ],
    [
      "If a parent cell has 46 chromosomes, each daughter cell produced by mitosis will have:",
      ["23 chromosomes", "92 chromosomes", "46 chromosomes", "0 chromosomes"],
      2,
      "Mitosis keeps the chromosome number the same, so each daughter cell also has 46 chromosomes.",
    ],
    [
      "Uncontrolled cell division can lead to the formation of a:",
      ["gamete", "tissue fluid", "hormone", "tumour (cancer)"],
      3,
      "When cell division is no longer controlled, cells divide uncontrollably and can form a tumour (cancer).",
    ],
  ],
  "Plant & Animal Tissues": [
    [
      "A group of similar cells that work together to perform a particular function is called a:",
      ["tissue", "organ", "organ system", "organism"],
      0,
      "A tissue is a group of similar cells that work together to carry out a specific function.",
    ],
    [
      "The animal tissue that covers and lines body surfaces and organs is ___ tissue.",
      ["muscle", "epithelial", "nervous", "bone"],
      1,
      "Epithelial tissue covers the outer body surface and lines the cavities and organs inside the body.",
    ],
    [
      "The animal tissue specialised to contract and bring about movement is ___ tissue.",
      ["epithelial", "nervous", "muscle", "connective"],
      2,
      "Muscle tissue is specialised to contract, producing movement of the body or its parts.",
    ],
    [
      "The animal tissue that carries electrical messages (impulses) around the body is ___ tissue.",
      ["muscle", "epithelial", "bone", "nervous"],
      3,
      "Nervous tissue carries electrical impulses, allowing communication between parts of the body.",
    ],
    [
      "The plant tissue that transports water and dissolved minerals upward from the roots is:",
      ["xylem", "phloem", "epidermis", "cambium"],
      0,
      "Xylem tissue transports water and dissolved mineral salts upward from the roots to the rest of the plant.",
    ],
    [
      "The plant tissue that transports manufactured food (sugars) around the plant is:",
      ["xylem", "phloem", "epidermis", "cortex"],
      1,
      "Phloem tissue transports the sugars made in photosynthesis from the leaves to the rest of the plant.",
    ],
    [
      "The protective outer layer of cells covering a leaf or young stem is the:",
      ["xylem", "phloem", "epidermis", "pith"],
      2,
      "The epidermis is the protective outer layer of cells that covers leaves and young stems.",
    ],
    [
      "Several different tissues working together to perform a function form a(n):",
      ["cell", "single tissue", "atom", "organ"],
      3,
      "An organ is made of several different tissues working together (for example the heart or a leaf) — a level above tissue.",
    ],
  ],
  "Transport Systems in Plants": [
    [
      "Water enters a plant mainly through its:",
      ["roots (root hairs)", "leaves", "flowers", "stem tip only"],
      0,
      "Water is absorbed from the soil mainly through the root hairs, which provide a large surface area for absorption.",
    ],
    [
      "The loss of water vapour from the leaves of a plant, mostly through the stomata, is called:",
      ["respiration", "transpiration", "photosynthesis", "germination"],
      1,
      "Transpiration is the evaporation and loss of water vapour from the leaves, mainly through the stomata.",
    ],
    [
      "Water and dissolved minerals are transported in the:",
      ["phloem", "epidermis", "xylem", "cuticle"],
      2,
      "The xylem transports water and dissolved minerals upward from the roots.",
    ],
    [
      "Which conditions would INCREASE the rate of transpiration?",
      ["cold and still air", "high humidity", "darkness", "hot, dry and windy weather"],
      3,
      "Hot, dry and windy conditions speed up evaporation from the leaves, increasing the rate of transpiration.",
    ],
    [
      "The sugars made during photosynthesis are transported around the plant by the:",
      ["phloem", "xylem", "root hairs", "cuticle"],
      0,
      "The phloem carries dissolved sugars (food) from the leaves to other parts of the plant.",
    ],
    [
      "The tiny pores in a leaf through which water vapour and gases pass are the:",
      ["root hairs", "stomata", "veins", "petals"],
      1,
      "Stomata are tiny pores, mostly on the underside of the leaf, through which gases and water vapour pass.",
    ],
    [
      "The main function of a plant's roots, besides absorbing water, is to:",
      ["make food", "carry out photosynthesis", "anchor the plant in the soil", "produce flowers"],
      2,
      "Roots anchor the plant firmly in the soil, as well as absorbing water and mineral salts.",
    ],
    [
      "The waxy layer on the surface of a leaf that reduces water loss is the:",
      ["xylem", "phloem", "stoma", "cuticle"],
      3,
      "The cuticle is a waxy, waterproof layer on the leaf surface that reduces water loss by evaporation.",
    ],
  ],
  "The Human Heart & Circulatory System": [
    [
      "The muscular organ that pumps blood around the body is the:",
      ["heart", "lung", "liver", "kidney"],
      0,
      "The heart is a muscular organ that pumps blood through the blood vessels around the body.",
    ],
    [
      "Blood vessels that carry blood AWAY from the heart are called:",
      ["veins", "arteries", "capillaries", "nerves"],
      1,
      "Arteries carry blood away from the heart (usually at high pressure); veins carry blood back to the heart.",
    ],
    [
      "The blood vessels that carry blood back TO the heart are called:",
      ["arteries", "capillaries", "veins", "tendons"],
      2,
      "Veins carry blood back towards the heart, usually at lower pressure, and often contain valves.",
    ],
    [
      "The tiny, thin-walled blood vessels where materials are exchanged between the blood and the body cells are the:",
      ["arteries", "veins", "valves", "capillaries"],
      3,
      "Capillaries are tiny, thin-walled vessels where oxygen, nutrients and wastes are exchanged between the blood and the body cells.",
    ],
    [
      "The component of blood that carries oxygen is the:",
      ["red blood cells", "white blood cells", "platelets", "plasma only"],
      0,
      "Red blood cells contain haemoglobin, which binds and carries oxygen around the body.",
    ],
    [
      "The main role of white blood cells is to:",
      ["carry oxygen", "fight infection and disease", "help the blood to clot", "transport carbon dioxide"],
      1,
      "White blood cells are part of the immune system and defend the body against infection and disease.",
    ],
    [
      "The cell fragments that help the blood to clot are the:",
      ["red blood cells", "white blood cells", "platelets", "nerve cells"],
      2,
      "Platelets are cell fragments that help the blood to clot, sealing wounds and preventing blood loss.",
    ],
    [
      "The liquid part of the blood, which carries dissolved substances such as nutrients and wastes, is the:",
      ["haemoglobin", "platelets", "red blood cells", "plasma"],
      3,
      "Plasma is the pale-yellow liquid part of blood that carries dissolved nutrients, wastes, hormones and the blood cells.",
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
