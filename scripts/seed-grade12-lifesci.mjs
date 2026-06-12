// Seeds the Grade 12 Life Sciences question bank (6 topics x 8 questions).
// CAPS-aligned, conceptual recall/application. Answers anchored to the
// official CAPS Life Sciences content.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade12-lifesci.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Life Sciences";
const GRADE = "Grade 12";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "DNA & Protein Synthesis": [
    [
      "Which nitrogenous base is found in RNA but not in DNA?",
      ["Thymine", "Uracil", "Cytosine", "Guanine"],
      1,
      "RNA uses uracil in place of the thymine found in DNA. Adenine, cytosine and guanine occur in both.",
    ],
    [
      "In DNA, adenine always pairs with:",
      ["Guanine", "Cytosine", "Thymine", "Uracil"],
      2,
      "Complementary base pairing in DNA: adenine–thymine and cytosine–guanine. (Adenine pairs with uracil only in RNA.)",
    ],
    [
      "The process by which a messenger RNA molecule is made from a DNA template is called:",
      ["Translation", "Transcription", "Replication", "Translocation"],
      1,
      "Transcription copies a gene's DNA sequence into mRNA in the nucleus. Translation is the later step where the mRNA codons are read to build a protein.",
    ],
    [
      "Translation — the assembly of a protein from the mRNA code — takes place at the:",
      ["Nucleus", "Mitochondria", "Ribosomes", "Golgi apparatus"],
      2,
      "Ribosomes read the mRNA codons and join the matching amino acids into a polypeptide chain.",
    ],
    [
      "A sequence of three bases on an mRNA molecule that codes for one amino acid is called a:",
      ["Gene", "Codon", "Chromosome", "Nucleotide"],
      1,
      "Each three-base unit on mRNA is a codon, specifying one amino acid. The matching triplet on tRNA is the anticodon.",
    ],
    [
      "During DNA replication, the two strands of the original molecule are held together before unwinding by bonds between the bases. These bonds are:",
      ["Peptide bonds", "Hydrogen bonds", "Ionic bonds", "Covalent bonds"],
      1,
      "Weak hydrogen bonds between complementary bases hold the two strands together; they break easily so the strands can separate for replication.",
    ],
    [
      "DNA replication is described as semi-conservative because each new DNA molecule consists of:",
      [
        "two completely new strands",
        "one original strand and one new strand",
        "two original strands",
        "fragments of several molecules",
      ],
      1,
      "Each strand of the original molecule acts as a template, so every daughter molecule keeps one old strand and gains one newly built strand.",
    ],
    [
      "Which molecule carries amino acids to the ribosome during protein synthesis?",
      ["mRNA", "tRNA", "rRNA", "DNA"],
      1,
      "Transfer RNA (tRNA) carries specific amino acids to the ribosome, matching its anticodon to the mRNA codon.",
    ],
  ],
  "Meiosis": [
    [
      "Meiosis produces cells that are:",
      [
        "diploid and genetically identical",
        "haploid and genetically different",
        "diploid and genetically different",
        "haploid and genetically identical",
      ],
      1,
      "Meiosis halves the chromosome number (haploid gametes) and, through crossing over and random arrangement, makes each gamete genetically unique.",
    ],
    [
      "How many daughter cells are produced from one parent cell at the end of meiosis?",
      ["Two", "Four", "Eight", "One"],
      1,
      "Meiosis involves two divisions (meiosis I and II), producing four haploid cells from one diploid parent cell.",
    ],
    [
      "Crossing over, which increases genetic variation, occurs during:",
      ["Prophase I", "Metaphase II", "Anaphase II", "Telophase I"],
      0,
      "During prophase I, homologous chromosomes pair up and exchange segments (crossing over) at chiasmata, recombining alleles.",
    ],
    [
      "The exchange of genetic material between homologous chromosomes during meiosis is called:",
      ["Non-disjunction", "Crossing over", "Replication", "Fertilisation"],
      1,
      "Crossing over is the swapping of corresponding segments between homologous chromosomes, a major source of genetic variation.",
    ],
    [
      "The failure of chromosomes to separate correctly during meiosis is called:",
      ["Crossing over", "Non-disjunction", "Synapsis", "Translation"],
      1,
      "Non-disjunction is when homologous chromosomes (meiosis I) or chromatids (meiosis II) fail to separate, giving gametes with the wrong chromosome number.",
    ],
    [
      "Down syndrome is most often caused by non-disjunction resulting in an extra copy of:",
      ["Chromosome 21", "Chromosome 23", "The X chromosome", "Chromosome 18"],
      0,
      "Trisomy 21 — three copies of chromosome 21 instead of two — is the usual cause of Down syndrome.",
    ],
    [
      "In which phase of meiosis do homologous chromosomes separate and move to opposite poles?",
      ["Anaphase I", "Anaphase II", "Metaphase I", "Prophase II"],
      0,
      "Homologous chromosomes separate in anaphase I (reducing the number to haploid). Sister chromatids separate later, in anaphase II.",
    ],
    [
      "Why is meiosis important for sexually reproducing organisms?",
      [
        "It keeps the chromosome number constant from one generation to the next",
        "It produces genetically identical body cells",
        "It repairs damaged tissue",
        "It increases the chromosome number in gametes",
      ],
      0,
      "By halving the chromosome number in gametes, meiosis ensures that fertilisation restores the normal diploid number, keeping it constant across generations.",
    ],
  ],
  "Genetics & Inheritance": [
    [
      "An organism with two identical alleles for a trait (e.g. TT or tt) is described as:",
      ["Heterozygous", "Homozygous", "Hybrid", "Recessive"],
      1,
      "Homozygous means both alleles are the same. Heterozygous (e.g. Tt) means the two alleles differ.",
    ],
    [
      "The physical, observable characteristics of an organism make up its:",
      ["Genotype", "Phenotype", "Genome", "Karyotype"],
      1,
      "Phenotype is the observable expression of a trait; genotype is the underlying allele combination.",
    ],
    [
      "A cross between two heterozygous parents (Tt × Tt) gives an expected phenotypic ratio of:",
      ["1 : 1", "3 : 1", "1 : 2 : 1", "9 : 3 : 3 : 1"],
      1,
      "Tt × Tt gives genotypes 1 TT : 2 Tt : 1 tt — that is 3 showing the dominant phenotype to 1 showing the recessive, a 3 : 1 ratio.",
    ],
    [
      "In humans, the sex chromosome combination of a normal male is:",
      ["XX", "XY", "YY", "XO"],
      1,
      "Females are XX and males are XY. The Y chromosome from the father determines a male offspring.",
    ],
    [
      "Haemophilia is a sex-linked recessive condition. The allele for it is carried on the:",
      ["Y chromosome", "X chromosome", "Chromosome 21", "Both X and Y chromosomes"],
      1,
      "The haemophilia allele lies on the X chromosome. Males (XY) need only one copy to be affected, which is why the condition is more common in males.",
    ],
    [
      "When both alleles in a heterozygote are fully and equally expressed (as in the AB blood group), the alleles show:",
      ["Complete dominance", "Codominance", "Recessiveness", "Sex linkage"],
      1,
      "Codominance is when both alleles are expressed simultaneously and fully, as in blood group AB where both the A and B antigens appear.",
    ],
    [
      "A change in the base sequence of DNA that can introduce new alleles into a population is called a:",
      ["Mutation", "Mitosis", "Translation", "Vaccination"],
      0,
      "A mutation alters the DNA base sequence; it is the original source of new alleles and therefore of genetic variation.",
    ],
    [
      "A test cross is used to determine the unknown genotype of an organism showing the dominant phenotype. It is done by crossing the organism with one that is:",
      ["Heterozygous", "Homozygous dominant", "Homozygous recessive", "A different species"],
      2,
      "Crossing with a homozygous recessive individual reveals the unknown genotype: any recessive offspring show that the tested parent carried a recessive allele.",
    ],
  ],
  "Nervous System": [
    [
      "The basic structural and functional unit of the nervous system is the:",
      ["Nephron", "Neuron", "Alveolus", "Axon"],
      1,
      "The neuron (nerve cell) is the basic unit that conducts impulses. The axon is only one part of a neuron.",
    ],
    [
      "The central nervous system consists of the:",
      ["Brain and spinal cord", "Brain and nerves", "Spinal cord and receptors", "Nerves and effectors"],
      0,
      "The central nervous system (CNS) is the brain and spinal cord. Nerves outside these form the peripheral nervous system.",
    ],
    [
      "The part of the brain that controls balance and coordinates muscular activity is the:",
      ["Cerebrum", "Cerebellum", "Medulla oblongata", "Hypothalamus"],
      1,
      "The cerebellum coordinates muscle movement and maintains balance and posture.",
    ],
    [
      "The part of the brain that controls involuntary actions such as heartbeat and breathing is the:",
      ["Cerebrum", "Cerebellum", "Medulla oblongata", "Corpus callosum"],
      2,
      "The medulla oblongata controls involuntary functions like heart rate, breathing and blood pressure.",
    ],
    [
      "In a reflex arc, the impulse travels in the following correct order:",
      [
        "receptor → sensory neuron → interneuron → motor neuron → effector",
        "effector → motor neuron → interneuron → sensory neuron → receptor",
        "receptor → motor neuron → interneuron → sensory neuron → effector",
        "sensory neuron → receptor → interneuron → effector → motor neuron",
      ],
      0,
      "A reflex arc runs: receptor detects the stimulus → sensory neuron → interneuron in the spinal cord → motor neuron → effector (muscle or gland) responds.",
    ],
    [
      "The small gap between two neurons across which an impulse is transmitted is called the:",
      ["Synapse", "Node", "Dendrite", "Myelin sheath"],
      0,
      "The synapse is the junction between neurons; the impulse crosses it via chemical neurotransmitters.",
    ],
    [
      "A reflex action (such as the knee-jerk) is best described as a response that is:",
      ["Slow and voluntary", "Rapid and involuntary", "Learned over time", "Controlled by the cerebrum"],
      1,
      "A reflex is a rapid, automatic, involuntary response to a stimulus, protecting the body before the brain is consciously involved.",
    ],
    [
      "The myelin sheath around an axon functions to:",
      [
        "speed up the transmission of nerve impulses",
        "produce neurotransmitters",
        "slow down impulses",
        "connect the neuron to bone",
      ],
      0,
      "The fatty myelin sheath insulates the axon and speeds up impulse conduction along the neuron.",
    ],
  ],
  "Homeostasis": [
    [
      "Homeostasis refers to the maintenance of:",
      [
        "a constant external environment",
        "a constant internal environment within narrow limits",
        "continuous growth of the organism",
        "a fixed body size",
      ],
      1,
      "Homeostasis is keeping the body's internal environment (temperature, water, glucose, pH) stable within narrow limits despite external change.",
    ],
    [
      "Which hormone lowers blood glucose levels by promoting its uptake and storage as glycogen?",
      ["Glucagon", "Insulin", "Adrenalin", "Thyroxin"],
      1,
      "Insulin, from the pancreas, lowers blood glucose by stimulating cells to take it up and the liver to store it as glycogen. Glucagon does the opposite.",
    ],
    [
      "Both insulin and glucagon, which regulate blood sugar, are secreted by the:",
      ["Liver", "Pancreas", "Adrenal glands", "Thyroid gland"],
      1,
      "The pancreas secretes insulin and glucagon from the islets of Langerhans to keep blood glucose balanced.",
    ],
    [
      "ADH (antidiuretic hormone) helps regulate the water balance of the blood. When released, it causes the kidneys to:",
      [
        "reabsorb more water, producing a smaller volume of more concentrated urine",
        "reabsorb less water, producing more dilute urine",
        "stop reabsorbing water completely",
        "excrete more salt without affecting water",
      ],
      0,
      "Antidiuretic hormone (ADH) increases water reabsorption in the kidney tubules, so less water is lost and the urine is more concentrated.",
    ],
    [
      "Which gland secretes thyroxin, the hormone that controls the body's metabolic rate?",
      ["Pituitary gland", "Thyroid gland", "Pancreas", "Adrenal gland"],
      1,
      "The thyroid gland secretes thyroxin, which regulates the rate of metabolism. It requires iodine to be produced.",
    ],
    [
      "Negative feedback in homeostasis works by:",
      [
        "amplifying a change away from the norm",
        "reversing a change to return a factor towards the norm",
        "ignoring changes in the internal environment",
        "permanently raising the set point",
      ],
      1,
      "In negative feedback, a deviation from the set point triggers a response that counteracts it, returning the factor to normal.",
    ],
    [
      "When body temperature rises above normal, a homeostatic response is:",
      ["Shivering", "Vasodilation and sweating", "Vasoconstriction", "Raising of body hair"],
      1,
      "To cool down, skin blood vessels dilate (vasodilation) and sweat glands release sweat, increasing heat loss. Shivering and vasoconstriction are responses to cold.",
    ],
    [
      "The 'fight-or-flight' hormone released in response to stress or danger is:",
      ["Insulin", "Adrenalin", "Oestrogen", "ADH"],
      1,
      "Adrenalin (epinephrine), from the adrenal glands, prepares the body for action — raising heart rate, breathing rate and blood glucose.",
    ],
  ],
  "Evolution": [
    [
      "The theory of evolution by natural selection was proposed by:",
      ["Lamarck", "Charles Darwin", "Gregor Mendel", "Louis Pasteur"],
      1,
      "Charles Darwin proposed natural selection (jointly with Alfred Wallace). Lamarck had an earlier, different theory based on inheritance of acquired characteristics.",
    ],
    [
      "In natural selection, 'survival of the fittest' means survival of the individuals that are:",
      [
        "physically the strongest",
        "best adapted to their environment",
        "the largest in size",
        "the fastest moving",
      ],
      1,
      "'Fittest' means best suited to the environment — those individuals are more likely to survive and reproduce, passing on their favourable alleles.",
    ],
    [
      "The main source of the genetic variation on which natural selection acts is:",
      ["Mutations and meiosis", "Photosynthesis", "Homeostasis", "Digestion"],
      0,
      "Mutations create new alleles, and meiosis (crossing over and random assortment) plus fertilisation shuffle them — together producing the variation natural selection acts on.",
    ],
    [
      "Structures with a common evolutionary origin but different functions (e.g. a human arm and a whale flipper) are described as:",
      ["Analogous structures", "Homologous structures", "Vestigial structures", "Vector structures"],
      1,
      "Homologous structures share a common ancestry and basic plan but may serve different functions — evidence of divergent evolution.",
    ],
    [
      "Which of the following is a direct source of evidence for evolution?",
      ["The fossil record", "Homeostasis", "The water cycle", "Cellular respiration"],
      0,
      "Fossils provide a physical record of organisms over time, showing change and transitional forms — direct evidence for evolution.",
    ],
    [
      "Speciation is best defined as the:",
      [
        "death of a species",
        "formation of new species",
        "movement of a species to a new area",
        "growth of an individual organism",
      ],
      1,
      "Speciation is the evolutionary process by which new species arise, often after populations become reproductively isolated.",
    ],
    [
      "The development of antibiotic resistance in bacteria is a real-world example of:",
      ["Natural selection", "Photosynthesis", "Genetic engineering", "Homeostasis"],
      0,
      "Antibiotics kill non-resistant bacteria; resistant individuals survive and reproduce, so resistance spreads — natural selection in action.",
    ],
    [
      "According to Darwin, organisms generally produce more offspring than can survive. This leads to:",
      [
        "a struggle for existence (competition)",
        "the inheritance of acquired characteristics",
        "guaranteed survival of all offspring",
        "a decrease in genetic variation",
      ],
      0,
      "Overproduction of offspring with limited resources causes a struggle for existence; those best adapted are more likely to survive and reproduce.",
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
