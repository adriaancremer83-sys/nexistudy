// Seeds the Grade 11 Life Sciences question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only (definitions, classifications, processes).
// Grade 11 level. Correct-answer positions spread evenly A-D per topic.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade11-lifesci.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Life Sciences";
const GRADE = "Grade 11";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Classification & Biodiversity": [
    [
      "The science of classifying and naming organisms is called:",
      ["taxonomy", "ecology", "genetics", "anatomy"],
      0,
      "Taxonomy is the branch of science that classifies and names living organisms.",
    ],
    [
      "Which sequence shows the taxonomic hierarchy from the largest to the smallest grouping?",
      [
        "Species, Genus, Family, Order",
        "Kingdom, Phylum, Class, Order, Family, Genus, Species",
        "Genus, Species, Kingdom, Phylum",
        "Class, Kingdom, Phylum, Order",
      ],
      1,
      "The hierarchy from largest to smallest is Kingdom, Phylum, Class, Order, Family, Genus, Species.",
    ],
    [
      "The system of giving each organism a two-part scientific name (genus and species) is called:",
      ["common naming", "the metric system", "binomial nomenclature", "a dichotomous key"],
      2,
      "Binomial nomenclature gives each organism a two-part Latin name made up of its genus and species.",
    ],
    [
      "In the scientific name Panthera leo, the word 'Panthera' is the:",
      ["species", "kingdom", "family", "genus"],
      3,
      "In a binomial name the first word is the genus (Panthera) and the second is the species (leo).",
    ],
    [
      "Organisms that make their own food through photosynthesis are called:",
      ["autotrophs", "heterotrophs", "decomposers", "parasites"],
      0,
      "Autotrophs (such as green plants) make their own organic food, usually by photosynthesis.",
    ],
    [
      "Bacteria are classified in the kingdom:",
      ["Animalia", "Monera (Prokaryotae)", "Plantae", "Fungi"],
      1,
      "Bacteria are prokaryotes and are placed in the kingdom Monera (Prokaryotae).",
    ],
    [
      "A key feature that makes viruses different from living cells is that viruses:",
      [
        "are made of many cells",
        "make their own food",
        "can only reproduce inside a host cell",
        "have a true nucleus",
      ],
      2,
      "Viruses are not cells and cannot reproduce on their own — they can only multiply inside a living host cell.",
    ],
    [
      "The variety of all the different living organisms in an area is called:",
      ["a population", "a niche", "a food chain", "biodiversity"],
      3,
      "Biodiversity is the variety of all living organisms (and ecosystems) in a particular area.",
    ],
  ],
  "Photosynthesis": [
    [
      "Photosynthesis takes place mainly in the ___ of plant cells.",
      ["mitochondria", "chloroplasts", "nucleus", "ribosomes"],
      1,
      "Photosynthesis occurs in the chloroplasts, which contain the green pigment chlorophyll.",
    ],
    [
      "The green pigment that absorbs light energy for photosynthesis is:",
      ["chlorophyll", "haemoglobin", "melanin", "carotene"],
      0,
      "Chlorophyll is the green pigment in chloroplasts that absorbs light energy for photosynthesis.",
    ],
    [
      "The two raw materials (reactants) needed for photosynthesis are:",
      [
        "oxygen and glucose",
        "water and oxygen",
        "carbon dioxide and water",
        "glucose and water",
      ],
      2,
      "Photosynthesis uses carbon dioxide and water as its raw materials, in the presence of light.",
    ],
    [
      "The products of photosynthesis are:",
      [
        "carbon dioxide and water",
        "water and nitrogen",
        "carbon dioxide and oxygen",
        "glucose and oxygen",
      ],
      3,
      "Photosynthesis produces glucose (food) and oxygen (released as a by-product).",
    ],
    [
      "The gas taken IN by a plant during photosynthesis is:",
      ["oxygen", "carbon dioxide", "nitrogen", "hydrogen"],
      1,
      "During photosynthesis plants take in carbon dioxide from the air.",
    ],
    [
      "The gas RELEASED during photosynthesis is:",
      ["oxygen", "carbon dioxide", "nitrogen", "methane"],
      0,
      "Oxygen is released as a by-product of photosynthesis.",
    ],
    [
      "Besides carbon dioxide and water, photosynthesis also requires:",
      ["darkness", "soil only", "light energy", "extra oxygen"],
      2,
      "Photosynthesis needs light energy, which is captured by chlorophyll to drive the reaction.",
    ],
    [
      "The main source of energy for photosynthesis is:",
      ["heat from the soil", "chemical fertiliser", "wind", "sunlight"],
      3,
      "Sunlight provides the light energy used in photosynthesis.",
    ],
  ],
  "Cellular Respiration & Energy": [
    [
      "Cellular respiration takes place mainly in the ___ of the cell.",
      ["nucleus", "mitochondria", "chloroplast", "cell wall"],
      1,
      "Most cellular respiration (the aerobic stages) takes place in the mitochondria, the cell's 'powerhouses'.",
    ],
    [
      "The energy-carrying molecule produced by cellular respiration is:",
      ["ATP", "DNA", "glucose", "chlorophyll"],
      0,
      "Cellular respiration releases energy by producing ATP (adenosine triphosphate), the cell's energy currency.",
    ],
    [
      "Aerobic respiration requires:",
      ["nitrogen", "carbon dioxide", "oxygen", "light"],
      2,
      "Aerobic respiration uses oxygen to break down glucose and release energy.",
    ],
    [
      "The aerobic respiration of glucose produces carbon dioxide, water and:",
      ["oxygen", "more glucose", "nitrogen", "energy (ATP)"],
      3,
      "Aerobic respiration releases energy (ATP), along with carbon dioxide and water as waste products.",
    ],
    [
      "Respiration that takes place WITHOUT oxygen is called:",
      ["photosynthesis", "anaerobic respiration", "transpiration", "digestion"],
      1,
      "Anaerobic respiration releases energy from glucose without using oxygen.",
    ],
    [
      "Anaerobic respiration in yeast produces carbon dioxide and:",
      ["alcohol (ethanol)", "oxygen", "only water", "glucose"],
      0,
      "In yeast, anaerobic respiration (fermentation) produces ethanol (alcohol) and carbon dioxide.",
    ],
    [
      "Anaerobic respiration in human muscle cells produces:",
      ["alcohol", "oxygen", "lactic acid", "glucose"],
      2,
      "In human muscles, anaerobic respiration produces lactic acid, which can cause muscle fatigue.",
    ],
    [
      "Compared with anaerobic respiration, aerobic respiration releases:",
      ["less energy", "no energy", "exactly the same energy", "much more energy"],
      3,
      "Aerobic respiration releases much more energy per glucose molecule than anaerobic respiration, because glucose is fully broken down.",
    ],
  ],
  "Gaseous Exchange": [
    [
      "Efficient gaseous exchange surfaces are typically:",
      [
        "thick and dry",
        "thin and moist with a large surface area",
        "small and hard",
        "covered in a layer of wax",
      ],
      1,
      "Good gaseous exchange surfaces are thin, moist and have a large surface area, allowing gases to diffuse quickly.",
    ],
    [
      "In humans, gaseous exchange takes place in the tiny air sacs of the lungs called:",
      ["alveoli", "bronchi", "nephrons", "villi"],
      0,
      "The alveoli are the tiny air sacs in the lungs where oxygen and carbon dioxide are exchanged with the blood.",
    ],
    [
      "During gaseous exchange in the lungs, oxygen moves from the alveoli into the:",
      ["stomach", "bones", "blood (capillaries)", "nerves"],
      2,
      "Oxygen diffuses from the alveoli into the surrounding blood capillaries to be carried around the body.",
    ],
    [
      "Insects carry out gaseous exchange through a system of tubes called:",
      ["alveoli", "gills", "stomata", "tracheae (with spiracles)"],
      3,
      "Insects use a network of tracheae, opening to the outside through spiracles, for gaseous exchange.",
    ],
    [
      "Fish carry out gaseous exchange using their:",
      ["lungs", "gills", "skin only", "spiracles"],
      1,
      "Fish use gills, which have a large, thin surface area for exchanging gases with the water.",
    ],
    [
      "The process by which gases move across a respiratory surface, from high to low concentration, is:",
      ["diffusion", "active transport", "osmosis", "respiration"],
      0,
      "Gases cross respiratory surfaces by diffusion, moving from a higher to a lower concentration.",
    ],
    [
      "In plants, gaseous exchange occurs mainly through small pores in the leaf called:",
      ["alveoli", "veins", "stomata", "roots"],
      2,
      "Stomata are tiny pores, mainly on the underside of leaves, through which plants exchange gases.",
    ],
    [
      "A good gaseous exchange surface has a rich blood supply in order to:",
      [
        "store food",
        "produce bone",
        "make hormones",
        "transport gases to and from the cells quickly",
      ],
      3,
      "A rich blood supply keeps a steep concentration gradient and quickly carries gases to and from the cells.",
    ],
  ],
  "Animal Nutrition & Digestion": [
    [
      "Biological catalysts that speed up the breakdown of food during digestion are:",
      ["enzymes", "hormones", "vitamins", "minerals"],
      0,
      "Enzymes are biological catalysts that speed up the chemical breakdown of food during digestion.",
    ],
    [
      "The enzyme in saliva that begins the digestion of starch is:",
      ["pepsin", "amylase", "lipase", "trypsin"],
      1,
      "Salivary amylase begins breaking starch down into smaller sugars in the mouth.",
    ],
    [
      "Proteins are digested (broken down) into:",
      ["glucose", "fatty acids", "amino acids", "starch"],
      2,
      "Proteins are broken down into their building blocks, amino acids.",
    ],
    [
      "Carbohydrates such as starch are eventually digested into simple sugars such as:",
      ["amino acids", "fatty acids", "glycerol", "glucose"],
      3,
      "Starch and other carbohydrates are digested into simple sugars, mainly glucose.",
    ],
    [
      "The absorption of digested food into the bloodstream takes place mainly in the:",
      ["small intestine", "mouth", "oesophagus", "large intestine"],
      0,
      "Most absorption of digested nutrients into the blood happens in the small intestine.",
    ],
    [
      "The finger-like projections that increase the surface area for absorption in the small intestine are the:",
      ["alveoli", "villi", "nephrons", "stomata"],
      1,
      "Villi are finger-like projections that greatly increase the surface area of the small intestine for absorption.",
    ],
    [
      "The muscular, wave-like movement that pushes food along the digestive tract is called:",
      ["digestion", "diffusion", "peristalsis", "absorption"],
      2,
      "Peristalsis is the wave-like contraction of muscles that moves food along the digestive tract.",
    ],
    [
      "Fats (lipids) are digested into fatty acids and:",
      ["glucose", "amino acids", "starch", "glycerol"],
      3,
      "Lipids are broken down into fatty acids and glycerol.",
    ],
  ],
  "Population Ecology": [
    [
      "A group of organisms of the SAME species living in the same area at the same time is a:",
      ["population", "community", "ecosystem", "biome"],
      0,
      "A population is all the organisms of the same species living in the same area at the same time.",
    ],
    [
      "All the different populations living and interacting in the same area form a:",
      ["single population", "community", "single species", "niche"],
      1,
      "A community is made up of all the interacting populations of different species in an area.",
    ],
    [
      "The number of individuals of a species per unit area is called population:",
      ["growth", "migration", "density", "succession"],
      2,
      "Population density is the number of individuals of a species per unit area (or volume).",
    ],
    [
      "When individuals move INTO a population from elsewhere, it is called:",
      ["emigration", "mortality", "natality", "immigration"],
      3,
      "Immigration is the movement of individuals into a population, increasing its size.",
    ],
    [
      "The movement of individuals OUT of a population is called:",
      ["emigration", "immigration", "natality", "density"],
      0,
      "Emigration is the movement of individuals out of a population, decreasing its size.",
    ],
    [
      "The birth rate of a population is also known as:",
      ["mortality", "natality", "emigration", "density"],
      1,
      "Natality is the birth rate — the number of new individuals added by reproduction.",
    ],
    [
      "Factors such as competition, predation and disease, whose effect depends on population size, are called ___ factors.",
      ["density-independent", "abiotic", "density-dependent", "climatic"],
      2,
      "Density-dependent factors (like competition, predation and disease) have a greater effect as population density increases.",
    ],
    [
      "A population growth graph that rises and then levels off at the carrying capacity has a(n) ___ shape.",
      ["straight-line", "exponential J", "completely random", "S-shaped (sigmoid)"],
      3,
      "Logistic growth produces an S-shaped (sigmoid) curve that levels off at the carrying capacity of the environment.",
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
