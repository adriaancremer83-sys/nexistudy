// Seeds the Grade 9 History HALF of the Social Sciences bank (6 topics x 8).
// Subject string "Social Sciences (History & Geography)" + Grade 9 — the SAME
// subject as the already-live Geography half (seed-grade9-socialsciences.mjs).
// This ADDS 6 History topics (sort_order 6-11, after the 6 Geography topics);
// it only deletes/replaces questions for the History topic_ids, so the live
// Geography questions are untouched. Result: Social Sciences Gr9 = 12 topics.
// History is normally interpretive (source analysis / essays), so this bank is
// RESTRICTED to objectively-checkable FACTUAL RECALL only — dates, events,
// people, places. No "explain/evaluate/interpret" questions.
// Correct-answer positions spread evenly A-D per topic (engine shuffles question
// order, not option order). Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade9-history.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Social Sciences (History & Geography)";
const GRADE = "Grade 9";
const SORT_OFFSET = 6; // History topics sort after the 6 Geography topics

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "World War II": [
    [
      "World War II began in 1939 and ended in:",
      ["1945", "1918", "1960", "1939"],
      0,
      "World War II lasted from 1939 to 1945.",
    ],
    [
      "The leader of Nazi Germany during World War II was:",
      ["Winston Churchill", "Adolf Hitler", "Joseph Stalin", "Franklin Roosevelt"],
      1,
      "Adolf Hitler was the dictator who led Nazi Germany during World War II.",
    ],
    [
      "World War II in Europe began when Germany invaded which country in 1939?",
      ["France", "Britain", "Poland", "Russia"],
      2,
      "Germany's invasion of Poland in September 1939 started World War II in Europe.",
    ],
    [
      "The group of countries led by Germany, Italy and Japan in World War II were called the:",
      ["Allies", "Union", "League", "Axis powers"],
      3,
      "Germany, Italy and Japan formed the Axis powers.",
    ],
    [
      "Britain, the USA and the Soviet Union fought on which side in World War II?",
      ["the Allies", "the Axis", "the Nazis", "the neutral nations"],
      0,
      "Britain, the USA and the Soviet Union were the main Allied powers.",
    ],
    [
      "The British Prime Minister who led Britain through most of World War II was:",
      ["Neville Chamberlain", "Winston Churchill", "Tony Blair", "Margaret Thatcher"],
      1,
      "Winston Churchill led Britain through most of World War II.",
    ],
    [
      "World War II in the Pacific ended after the USA dropped atomic bombs on which country?",
      ["Germany", "Italy", "Japan", "China"],
      2,
      "The USA dropped atomic bombs on Japan in 1945, leading to Japan's surrender.",
    ],
    [
      "The two Japanese cities destroyed by atomic bombs in 1945 were Hiroshima and:",
      ["Tokyo", "Kyoto", "Osaka", "Nagasaki"],
      3,
      "Atomic bombs were dropped on Hiroshima and Nagasaki in August 1945.",
    ],
  ],
  "The Holocaust & the Nuremberg Trials": [
    [
      "The Holocaust was the mass murder by Nazi Germany of about six million:",
      ["Jewish people", "soldiers", "Americans", "farmers"],
      0,
      "The Holocaust was the Nazi genocide of about six million Jewish people, along with other groups.",
    ],
    [
      "Nazi racism was based on a false belief in their own racial:",
      ["equality", "superiority", "weakness", "kindness"],
      1,
      "Nazi ideology was based on a false belief in the racial superiority of their own group.",
    ],
    [
      "Jewish people and others were imprisoned and killed in Nazi camps known as ___ camps:",
      ["holiday", "training", "concentration", "refugee"],
      2,
      "The Nazis imprisoned and murdered people in concentration (and death) camps.",
    ],
    [
      "After the war, surviving Nazi leaders were put on trial in the German city of:",
      ["Berlin", "Munich", "Hamburg", "Nuremberg"],
      3,
      "The Nuremberg Trials (1945–46) were held in the German city of Nuremberg.",
    ],
    [
      "The Nuremberg Trials were held mainly to punish Nazi leaders for their:",
      ["war crimes", "victory in the war", "help to refugees", "building of roads"],
      0,
      "The Nuremberg Trials prosecuted Nazi leaders for war crimes and crimes against humanity.",
    ],
    [
      "The young Jewish girl whose famous diary describes hiding from the Nazis was:",
      ["Rosa Parks", "Anne Frank", "Florence Nightingale", "Marie Curie"],
      1,
      "Anne Frank's diary records her family's time hiding from the Nazis in Amsterdam.",
    ],
    [
      "The Nazi party that carried out the Holocaust was led by:",
      ["Joseph Stalin", "Benito Mussolini", "Adolf Hitler", "Winston Churchill"],
      2,
      "Adolf Hitler led the Nazi party that carried out the Holocaust.",
    ],
    [
      "The Nuremberg Trials helped establish the idea that people can be held responsible for ___ against humanity:",
      ["holidays", "sports", "festivals", "crimes"],
      3,
      "The trials helped establish the principle of accountability for 'crimes against humanity'.",
    ],
  ],
  "The Cold War & the Nuclear Age": [
    [
      "The Cold War was a period of tension after 1945 between the United States and the:",
      ["Soviet Union (USSR)", "United Kingdom", "France", "Japan"],
      0,
      "The Cold War was the rivalry between the USA and the Soviet Union (USSR).",
    ],
    [
      "The Cold War was called 'cold' because the two superpowers:",
      [
        "lived in very cold countries",
        "never fought each other directly in a full war",
        "used weapons made of ice",
        "stopped all forms of trade",
      ],
      1,
      "It was 'cold' because the USA and USSR never fought each other directly in an all-out (hot) war.",
    ],
    [
      "The USA followed capitalism, while the Soviet Union followed which economic system?",
      ["capitalism", "tourism", "communism", "feudalism"],
      2,
      "The Soviet Union followed communism, opposed to the USA's capitalism.",
    ],
    [
      "The competition between the USA and USSR to build more powerful nuclear weapons was called the arms:",
      ["trade", "sale", "show", "race"],
      3,
      "The build-up of nuclear weapons by both sides was called the arms race.",
    ],
    [
      "The city in Germany that was divided by a famous wall during the Cold War was:",
      ["Berlin", "Paris", "London", "Rome"],
      0,
      "Berlin was divided by the Berlin Wall during the Cold War.",
    ],
    [
      "The competition between the USA and USSR to explore space, including reaching the Moon, was called the ___ race:",
      ["arms", "space", "car", "horse"],
      1,
      "The space race was the Cold War competition to achieve firsts in space exploration.",
    ],
    [
      "The Cold War carried a constant threat of war using which type of powerful weapons?",
      ["bows and arrows", "swords", "nuclear weapons", "water cannons"],
      2,
      "The Cold War was dominated by the threat of nuclear weapons.",
    ],
    [
      "The Berlin Wall, a symbol of the Cold War, fell (was opened) in:",
      ["1945", "1960", "1976", "1989"],
      3,
      "The Berlin Wall fell in 1989, near the end of the Cold War.",
    ],
  ],
  "Apartheid in South Africa": [
    [
      "Apartheid became the official government policy in South Africa in:",
      ["1948", "1994", "1910", "1976"],
      0,
      "Apartheid became official government policy in 1948.",
    ],
    [
      "The political party that introduced apartheid in 1948 was the:",
      ["African National Congress", "National Party", "Democratic Party", "Communist Party"],
      1,
      "The National Party introduced apartheid after winning the 1948 election.",
    ],
    [
      "The Afrikaans word 'apartheid' means:",
      ["freedom", "unity", "apartness / separateness", "equality"],
      2,
      "'Apartheid' is Afrikaans for 'apartness' or 'separateness'.",
    ],
    [
      "Under apartheid, the law that forced people of different races to live in separate areas was the Group ___ Act:",
      ["Holiday", "Money", "Sports", "Areas"],
      3,
      "The Group Areas Act forced different race groups to live in separate areas.",
    ],
    [
      "Under apartheid, black South Africans were forced to carry an identity document called a:",
      ["passbook (dompas)", "passport", "diary", "driver's licence"],
      0,
      "The pass laws forced black South Africans to carry a passbook, known as the 'dompas'.",
    ],
    [
      "Apartheid laws classified people into groups based on their:",
      ["height", "race", "age", "weight"],
      1,
      "Apartheid classified people by race (the Population Registration Act).",
    ],
    [
      "The law that created separate and inferior schooling for black children was the Bantu ___ Act:",
      ["Health", "Sports", "Education", "Travel"],
      2,
      "The Bantu Education Act created separate, deliberately inferior schooling for black children.",
    ],
    [
      "Apartheid denied the majority of South Africans the right to:",
      ["breathe", "sleep", "eat", "vote"],
      3,
      "Apartheid denied the black majority the right to vote, among many other rights.",
    ],
  ],
  "Resistance to Apartheid": [
    [
      "The main organisation that led the struggle against apartheid was the African National Congress, also known as the:",
      ["ANC", "NP", "USA", "UN"],
      0,
      "The African National Congress (ANC) led the struggle against apartheid.",
    ],
    [
      "On 21 March 1960, police killed 69 anti-pass-law protesters in the township of:",
      ["Soweto", "Sharpeville", "Langa", "Alexandra"],
      1,
      "The Sharpeville massacre took place on 21 March 1960, when police killed 69 protesters.",
    ],
    [
      "The 1976 uprising in which students protested against being taught in Afrikaans took place in:",
      ["Sharpeville", "Langa", "Soweto", "Cape Town"],
      2,
      "The Soweto Uprising of 16 June 1976 was led by students protesting Afrikaans as a medium of instruction.",
    ],
    [
      "The leader who was imprisoned for 27 years and later became South Africa's first democratic president was:",
      ["Desmond Tutu", "FW de Klerk", "Steve Biko", "Nelson Mandela"],
      3,
      "Nelson Mandela spent 27 years in prison and became South Africa's first democratic president.",
    ],
    [
      "Nelson Mandela was a leader of which organisation?",
      ["the ANC", "the National Party", "the police", "the army"],
      0,
      "Nelson Mandela was a leader of the African National Congress (ANC).",
    ],
    [
      "The Black Consciousness Movement leader who died in police custody in 1977 was:",
      ["Nelson Mandela", "Steve Biko", "Walter Sisulu", "Oliver Tambo"],
      1,
      "Steve Biko, leader of the Black Consciousness Movement, died in police custody in 1977.",
    ],
    [
      "The Soweto Uprising began on 16 June, which South Africa now commemorates as ___ Day:",
      ["Workers'", "Freedom", "Youth", "Heritage"],
      2,
      "16 June is commemorated as Youth Day in honour of the 1976 Soweto students.",
    ],
    [
      "Mandela and other leaders were sentenced to life imprisonment in 1964 at the ___ Trial:",
      ["Nuremberg", "Sharpeville", "Soweto", "Rivonia"],
      3,
      "The Rivonia Trial (1963–64) sentenced Mandela and others to life imprisonment.",
    ],
  ],
  "The End of Apartheid & Democracy": [
    [
      "Nelson Mandela was released from prison in:",
      ["1990", "1976", "1948", "1960"],
      0,
      "Nelson Mandela was released from prison on 11 February 1990.",
    ],
    [
      "The South African president who began negotiations to end apartheid and freed Mandela was:",
      ["PW Botha", "FW de Klerk", "Jacob Zuma", "Thabo Mbeki"],
      1,
      "FW de Klerk unbanned the ANC, freed Mandela and began negotiations to end apartheid.",
    ],
    [
      "South Africa's first democratic election, in which all races could vote, was held in:",
      ["1990", "1992", "1994", "1996"],
      2,
      "South Africa's first democratic election was held in 1994.",
    ],
    [
      "South Africa's first democratically elected president, in 1994, was:",
      ["FW de Klerk", "Thabo Mbeki", "Jacob Zuma", "Nelson Mandela"],
      3,
      "Nelson Mandela became South Africa's first democratically elected president in 1994.",
    ],
    [
      "The commission led by Archbishop Desmond Tutu, where people confessed apartheid-era crimes, was the Truth and ___ Commission:",
      ["Reconciliation", "Money", "Sports", "Building"],
      0,
      "The Truth and Reconciliation Commission (TRC), led by Desmond Tutu, dealt with apartheid-era crimes.",
    ],
    [
      "Nelson Mandela and FW de Klerk jointly won which prize in 1993?",
      ["the World Cup", "the Nobel Peace Prize", "an Oscar", "an Olympic gold medal"],
      1,
      "Mandela and de Klerk jointly won the 1993 Nobel Peace Prize.",
    ],
    [
      "South Africa's admired new democratic Constitution was adopted in:",
      ["1990", "1994", "1996", "2000"],
      2,
      "South Africa's new democratic Constitution was adopted in 1996.",
    ],
    [
      "Freedom Day in South Africa, marking the 1994 election, is commemorated on:",
      ["16 June", "21 March", "25 December", "27 April"],
      3,
      "Freedom Day is on 27 April, the date of the first democratic election in 1994.",
    ],
  ],
};

// Upsert topics with a sort_order offset so they follow the Geography topics
const topicNames = Object.keys(bank);
const { data: topics, error: topicError } = await supabase
  .from("topics")
  .upsert(
    topicNames.map((name, i) => ({ subject: SUBJECT, grade: GRADE, name, sort_order: i + SORT_OFFSET })),
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
console.log(`done: ${inserted} History questions added to the Social Sciences Gr9 bank`);
