// Seeds the Grade 12 Agricultural Sciences question bank (6 topics x 8
// questions). CAPS-aligned, objectively-checkable only (definitions,
// classifications, genetics ratios, animal-science facts, management terms).
// No interpretive questions. Correct-answer positions are spread evenly A-D
// per topic because the quiz engine shuffles question order, not option order.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade12-agriculturalsciences.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Agricultural Sciences";
const GRADE = "Grade 12";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Animal Nutrition": [
    [
      "Which nutrient is the main source of body-building material needed for growth and repair of tissue?",
      ["Protein", "Carbohydrates", "Water", "Vitamins"],
      0,
      "Proteins supply the amino acids used to build and repair body tissue, which makes them essential for growth.",
    ],
    [
      "A ruminant animal such as a cow has a stomach made up of how many compartments?",
      ["one", "four", "two", "three"],
      1,
      "Ruminants such as cattle have a four-compartment stomach: the rumen, reticulum, omasum and abomasum.",
    ],
    [
      "Which of the following is classified as a roughage (high-fibre feed)?",
      ["maize meal", "fish meal", "lucerne hay", "molasses"],
      2,
      "Lucerne hay is a roughage because it is high in crude fibre. Maize meal and molasses are energy concentrates and fish meal is a protein concentrate.",
    ],
    [
      "In which compartment of the ruminant stomach does most microbial fermentation of fibre take place?",
      ["the abomasum", "the omasum", "the reticulum", "the rumen"],
      3,
      "The rumen houses micro-organisms that ferment and break down fibrous, cellulose-rich feed.",
    ],
    [
      "Which mineral is the most important component of bones and teeth and is needed in large amounts by dairy cows?",
      ["calcium", "iron", "iodine", "sodium"],
      0,
      "Calcium (together with phosphorus) is the main mineral in bones and teeth and is essential for milk production in dairy cows.",
    ],
    [
      "A 'balanced ration' is a feed that:",
      [
        "contains only protein",
        "supplies all the nutrients an animal needs in the correct proportions",
        "is fed to the animal only once a day",
        "contains no water at all",
      ],
      1,
      "A balanced ration provides all the necessary nutrients — energy, protein, minerals and vitamins — in the correct proportions for the animal's needs.",
    ],
    [
      "The abomasum is called the 'true stomach' of a ruminant because it:",
      [
        "stores water",
        "ferments fibre using micro-organisms",
        "secretes digestive enzymes and acid like a monogastric stomach",
        "absorbs all the nutrients",
      ],
      2,
      "The abomasum secretes acid and digestive enzymes, working like the single (true) stomach of a monogastric animal.",
    ],
    [
      "Which of the following animals is a monogastric (single-stomached) animal?",
      ["a sheep", "a cow", "a goat", "a pig"],
      3,
      "A pig is monogastric — it has a single, simple stomach. Sheep, cattle and goats are ruminants.",
    ],
  ],
  "Animal Reproduction": [
    [
      "The female sex cell (gamete) produced by the ovary is called the:",
      ["ovum (egg)", "sperm", "zygote", "embryo"],
      0,
      "The ovum (egg cell) is the female gamete, produced and released by the ovary.",
    ],
    [
      "Fertilisation in mammals normally takes place in the:",
      ["uterus", "oviduct (Fallopian tube)", "vagina", "ovary"],
      1,
      "Fertilisation usually occurs in the oviduct (Fallopian tube), where the sperm meets the ovum.",
    ],
    [
      "The period of pregnancy from fertilisation until birth is called the:",
      ["oestrus", "lactation", "gestation period", "ovulation"],
      2,
      "The gestation period is the length of pregnancy — the time the foetus develops in the uterus until it is born.",
    ],
    [
      "'Oestrus' (being on heat) is the period during which the female:",
      [
        "is pregnant",
        "is producing milk",
        "has just given birth",
        "is sexually receptive and will accept the male for mating",
      ],
      3,
      "Oestrus (heat) is the phase of the reproductive cycle when the female is fertile and will accept the male for mating.",
    ],
    [
      "Artificial insemination (AI) is best described as:",
      [
        "placing semen into the female's reproductive tract by artificial means",
        "the surgical removal of the ovaries",
        "feeding hormones to increase milk yield",
        "natural mating of animals in a camp",
      ],
      0,
      "Artificial insemination is the introduction of collected semen into the female's reproductive tract using instruments, rather than by natural mating.",
    ],
    [
      "The approximate gestation period of a cow is:",
      ["about 3 months", "about 9 months (roughly 280 days)", "about 5 months", "about 12 months"],
      1,
      "A cow's gestation period is about nine months (approximately 280 days), similar in length to a human pregnancy.",
    ],
    [
      "The hormone mainly responsible for the development of male sexual characteristics and sperm production is:",
      ["oestrogen", "progesterone", "testosterone", "oxytocin"],
      2,
      "Testosterone, produced by the testes, controls the development of male sexual characteristics and the production of sperm.",
    ],
    [
      "A major ADVANTAGE of artificial insemination (AI) over natural mating is that it:",
      [
        "requires no record keeping at all",
        "is always cheaper than keeping any bull",
        "removes the need to detect oestrus",
        "lets one superior male breed with many females and reduces the spread of disease",
      ],
      3,
      "AI allows the semen of one genetically superior male to serve many females and lowers the risk of transmitting venereal diseases that natural mating can spread.",
    ],
  ],
  "Genetics": [
    [
      "The basic unit of heredity that carries the code for a characteristic is the:",
      ["gene", "ribosome", "vacuole", "enzyme"],
      0,
      "A gene is a section of DNA that carries the code for a specific inherited characteristic.",
    ],
    [
      "An organism that has two identical alleles for a trait (for example TT or tt) is said to be:",
      ["heterozygous", "homozygous", "recessive", "a hybrid"],
      1,
      "Homozygous means the two alleles for the trait are identical (TT or tt). When they differ (Tt) the organism is heterozygous.",
    ],
    [
      "In a monohybrid cross between two heterozygous parents (Tt × Tt), the expected PHENOTYPIC ratio of the offspring is:",
      ["1:1", "9:3:3:1", "3:1", "1:2:1"],
      2,
      "A Tt × Tt cross gives a 3:1 phenotypic ratio (3 showing the dominant trait : 1 showing the recessive). The 1:2:1 ratio is the genotypic ratio.",
    ],
    [
      "The observable physical characteristics of an organism are known as its:",
      ["genotype", "allele", "genome", "phenotype"],
      3,
      "The phenotype is the set of observable characteristics, produced by the interaction of the genotype with the environment.",
    ],
    [
      "An allele that is expressed in the phenotype even when only one copy is present is described as:",
      ["dominant", "recessive", "homozygous", "mutant"],
      0,
      "A dominant allele shows up in the phenotype whenever it is present, masking the effect of a recessive allele.",
    ],
    [
      "A recessive trait will appear in the phenotype only when the genotype is:",
      ["heterozygous", "homozygous recessive", "homozygous dominant", "always, in every case"],
      1,
      "A recessive trait shows only when both alleles are recessive (homozygous recessive, e.g. tt), because any dominant allele present would mask it.",
    ],
    [
      "In a dihybrid cross between two organisms heterozygous for both traits (e.g. RrYy × RrYy), the expected phenotypic ratio is:",
      ["3:1", "1:1", "9:3:3:1", "1:2:1"],
      2,
      "A dihybrid cross between two double-heterozygotes produces the classic 9:3:3:1 phenotypic ratio.",
    ],
    [
      "The cross used to find out whether an organism showing the dominant phenotype is homozygous or heterozygous is the:",
      ["dihybrid cross", "monohybrid cross", "self-cross", "test cross (with a homozygous recessive individual)"],
      3,
      "A test cross mates the unknown individual with a homozygous recessive partner; the offspring then reveal whether the unknown was homozygous or heterozygous.",
    ],
  ],
  "Selection & Breeding Systems": [
    [
      "Selecting breeding animals based on the recorded performance of their ancestors and relatives is called:",
      ["pedigree (family) selection", "mass selection", "natural selection", "random selection"],
      0,
      "Pedigree selection chooses animals according to the recorded performance of their ancestors and relatives.",
    ],
    [
      "The mating of animals that are more closely related than the average of the population is called:",
      ["crossbreeding", "inbreeding", "outcrossing", "upgrading"],
      1,
      "Inbreeding is the mating of closely related animals, such as brother with sister or parent with offspring.",
    ],
    [
      "The improved vigour, growth and performance often seen in the offspring of two different breeds is called:",
      ["inbreeding depression", "natural selection", "heterosis (hybrid vigour)", "the selection differential"],
      2,
      "Heterosis (hybrid vigour) is the superior performance of crossbred offspring compared with the average of their two parent breeds.",
    ],
    [
      "A possible DISADVANTAGE of continued inbreeding is:",
      [
        "increased hybrid vigour",
        "greater genetic variation in the herd",
        "faster growth in all offspring",
        "inbreeding depression — reduced fertility and vigour",
      ],
      3,
      "Continued inbreeding increases the chance that harmful recessive genes pair up, leading to inbreeding depression: lower fertility and weaker offspring.",
    ],
    [
      "Selection in which the farmer keeps the best animals judged on their OWN appearance or performance records is called:",
      ["mass (individual) selection", "pedigree selection", "progeny testing", "crossbreeding"],
      0,
      "Mass selection (individual selection) chooses animals according to their own phenotype or performance records.",
    ],
    [
      "Mating animals of two different breeds in order to combine their desirable traits is called:",
      ["inbreeding", "crossbreeding", "line breeding", "self-pollination"],
      1,
      "Crossbreeding mates animals of different breeds to combine the good qualities of each and to gain hybrid vigour.",
    ],
    [
      "Evaluating the breeding value of an animal by studying the performance of its offspring is called:",
      ["mass selection", "pedigree selection", "progeny testing", "inbreeding"],
      2,
      "Progeny testing judges a parent's breeding value by measuring its offspring's performance — useful for traits the animal cannot show itself, such as milk yield in a bull.",
    ],
    [
      "The main aim of selection in animal breeding is to:",
      [
        "increase the number of harmful recessive genes",
        "reduce the herd down to a single animal",
        "keep every animal regardless of its quality",
        "increase the frequency of desirable genes in the herd",
      ],
      3,
      "Selection allows animals with desirable traits to reproduce, which increases the frequency of those favourable genes in the next generation.",
    ],
  ],
  "Animal Health & Diseases": [
    [
      "A disease caused by a pathogen that can spread from one animal to another is described as:",
      ["infectious (contagious)", "hereditary", "nutritional", "metabolic"],
      0,
      "An infectious/contagious disease is caused by a pathogen (such as a bacterium or virus) and can be spread between animals.",
    ],
    [
      "Which of the following animal diseases is caused by a virus?",
      ["heartwater", "foot-and-mouth disease", "internal roundworms", "liver fluke"],
      1,
      "Foot-and-mouth disease is a highly contagious viral disease of cloven-hoofed animals. Heartwater is caused by a tick-borne micro-organism, while worms and fluke are parasites.",
    ],
    [
      "Ticks, lice and fleas that live on the OUTSIDE of an animal's body are called:",
      ["endoparasites", "pathogens", "ectoparasites", "vectors"],
      2,
      "Ectoparasites live on the outside of the host, on the skin or coat. Endoparasites, such as roundworms, live inside the body.",
    ],
    [
      "Giving an animal a vaccine so that it becomes immune to a specific disease is called:",
      ["dosing", "dipping", "drenching", "vaccination (immunisation)"],
      3,
      "Vaccination introduces a weakened or inactivated pathogen so the animal develops immunity against that disease.",
    ],
    [
      "Dipping or spraying cattle with an acaricide is done mainly to control:",
      ["ticks and other external parasites", "internal worms", "viral diseases", "mineral deficiencies"],
      0,
      "Dipping or spraying with an acaricide kills ticks and other ectoparasites on the animal's body, which also reduces tick-borne diseases.",
    ],
    [
      "Roundworms and tapeworms living in an animal's digestive tract are examples of:",
      ["ectoparasites", "internal parasites (endoparasites)", "viruses", "bacteria"],
      1,
      "Roundworms and tapeworms live inside the host's gut, so they are classified as internal parasites (endoparasites).",
    ],
    [
      "Placing a newly bought or sick animal in 'quarantine' means:",
      [
        "slaughtering it immediately",
        "mixing it with the herd straight away",
        "keeping it isolated from the herd for a period to prevent disease spreading",
        "selling it as quickly as possible",
      ],
      2,
      "Quarantine isolates new or sick animals for a period so that any disease they may carry is not spread to the rest of the herd.",
    ],
    [
      "Which of the following is a sign of a HEALTHY animal?",
      [
        "dull, sunken eyes",
        "loss of appetite",
        "standing apart, isolated from the herd",
        "a smooth, shiny coat and a good appetite",
      ],
      3,
      "Healthy animals have a shiny coat, bright eyes and a good appetite and move freely with the herd. Dullness, poor appetite and isolation are signs of illness.",
    ],
  ],
  "Agricultural Management & Marketing": [
    [
      "The four factors of production (resources) in farming are land, labour, capital and:",
      ["management (entrepreneurship)", "the weather", "fertiliser", "water"],
      0,
      "The four factors of production are land, labour, capital and management (entrepreneurship).",
    ],
    [
      "The machinery, buildings, equipment and money invested to run the farm business are referred to as:",
      ["labour", "capital", "land", "rent"],
      1,
      "Capital is the man-made resources and money invested in the farm — machinery, equipment, buildings and breeding stock.",
    ],
    [
      "'Fixed costs' on a farm are costs that:",
      [
        "change directly with the amount produced",
        "are paid only once, ever",
        "stay the same regardless of the level of production, e.g. rent and licences",
        "include feed and seed bought for the season",
      ],
      2,
      "Fixed (overhead) costs stay the same whether production is high or low — for example rent, insurance and licence fees. Feed and seed are variable costs.",
    ],
    [
      "The gross income of a farm enterprise minus its total costs is equal to the:",
      ["total assets", "fixed cost", "turnover", "net profit (or loss)"],
      3,
      "Net profit = gross income − total costs. If the total costs are greater than the income, the result is a net loss.",
    ],
    [
      "A written financial plan that estimates a farm's expected income and expenditure for a future period is a:",
      ["budget", "stock register", "title deed", "balance sheet"],
      0,
      "A budget is a financial plan that forecasts expected income and expenses, helping the farmer to plan and control the business.",
    ],
    [
      "Selling farm produce straight to the public, for example from a farm stall, is an example of:",
      ["an auction", "direct marketing", "futures trading", "importing"],
      1,
      "Direct marketing is when the farmer sells produce directly to the consumer, such as at a farm stall, without a middleman.",
    ],
    [
      "According to the law of supply and demand, if the supply of a product is high but demand is low, the price will usually:",
      ["rise sharply", "stay exactly the same", "fall (drop)", "double"],
      2,
      "When supply is greater than demand there is a surplus, which normally pushes the price down.",
    ],
    [
      "Keeping accurate financial and production records on a farm is important mainly because it:",
      [
        "is required in order to enter agricultural shows",
        "simply wastes the farmer's time",
        "is only needed when the farm is sold",
        "helps the farmer make informed management decisions and plan ahead",
      ],
      3,
      "Good records show how each enterprise is performing, helping the farmer make sound management decisions, control costs and plan for the future.",
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
