// Seeds the Grade 10 English question bank (6 topics x 8 questions).
// LANGUAGE CONVENTIONS ONLY — spelling & plurals, articles & determiners,
// prepositions, conjunctions, capitals & abbreviations, sentence types. No
// literature/essay/interpretive questions (not objectively checkable). Topics +
// questions are DISTINCT from BOTH the Gr11 bank (sentence structure, homophones,
// synonyms/antonyms, affixes, idioms, degrees of comparison) and the Gr12 bank
// (parts of speech, figures of speech, punctuation, direct/indirect speech,
// active/passive voice, concord & tenses).
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but NOT option order). NOTE: the lint dedupe check is
// case-insensitive, so options must not differ only by capitalisation.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade10-english.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "English";
const GRADE = "Grade 10";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Spelling & Plurals": [
    [
      "The correct plural of \"box\" is:",
      ["boxes", "boxs", "boxies", "boxen"],
      0,
      "Nouns ending in -x form the plural by adding -es: box → boxes.",
    ],
    [
      "The correct plural of \"baby\" is:",
      ["babys", "babies", "babyes", "babi"],
      1,
      "Nouns ending in a consonant + y change the y to i and add -es: baby → babies.",
    ],
    [
      "The correct plural of \"child\" is:",
      ["childs", "childes", "children", "childrens"],
      2,
      "\"Child\" has an irregular plural: child → children.",
    ],
    [
      "The correct plural of \"knife\" is:",
      ["knifes", "knifs", "knifves", "knives"],
      3,
      "Many nouns ending in -f or -fe change to -ves in the plural: knife → knives.",
    ],
    [
      "Which word is spelled correctly?",
      ["necessary", "neccessary", "necesary", "neccesary"],
      0,
      "\"Necessary\" is spelled with one c and two s's.",
    ],
    [
      "The correct plural of \"tomato\" is:",
      ["tomatos", "tomatoes", "tomatto", "tomatoies"],
      1,
      "Many nouns ending in a consonant + o add -es: tomato → tomatoes (also potato → potatoes).",
    ],
    [
      "Following the rule \"i before e except after c\", which spelling is correct?",
      ["recieve", "receeve", "receive", "receve"],
      2,
      "After the letter c, e comes before i: rec-e-i-ve. So \"receive\" is correct.",
    ],
    [
      "The correct plural of \"man\" is:",
      ["mans", "manes", "mens", "men"],
      3,
      "\"Man\" has an irregular plural formed by a vowel change: man → men.",
    ],
  ],
  "Articles & Determiners": [
    [
      "Choose the correct article: \"She ate ___ apple.\"",
      ["a", "an", "this kind of", "no word"],
      1,
      "Use \"an\" before a word beginning with a vowel sound: an apple.",
    ],
    [
      "Choose the correct article: \"He is ___ honest man.\"",
      ["a", "the most", "an", "those"],
      2,
      "The h in \"honest\" is silent, so the word begins with a vowel sound and takes \"an\".",
    ],
    [
      "Choose the correct article: \"Please pass me ___ salt on the table.\"",
      ["an", "a", "those", "the"],
      3,
      "\"The\" is the definite article, used for a specific item that is already known — the salt on the table.",
    ],
    [
      "Choose the correct word: \"There are too ___ people in this room.\"",
      ["many", "much", "little", "amount of"],
      0,
      "Use \"many\" with countable nouns such as people; \"much\" is used with uncountable nouns.",
    ],
    [
      "Choose the correct word: \"I don't have ___ money left.\"",
      ["many", "much", "few", "number of"],
      1,
      "Use \"much\" with uncountable nouns such as money; \"many\" is used with countable nouns.",
    ],
    [
      "Choose the correct determiner for something near you: \"___ book in my hand is mine.\"",
      ["These", "Those", "This", "Them"],
      2,
      "\"This\" points to a single thing that is near. \"These\" is plural and near; \"that/those\" point to things far away.",
    ],
    [
      "Choose the correct determiner: \"___ shoes over there are dirty.\"",
      ["This", "That", "Them", "Those"],
      3,
      "\"Those\" points to plural things that are far away; \"this/these\" are used for things that are near.",
    ],
    [
      "Choose the correct word when offering a drink: \"Would you like ___ tea?\"",
      ["some", "many", "an", "few"],
      0,
      "\"Some\" is used with uncountable nouns such as tea, especially in offers and requests.",
    ],
  ],
  "Prepositions": [
    [
      "Choose the correct preposition: \"The cat is hiding ___ the bed.\" (beneath it)",
      ["on", "in", "under", "between"],
      2,
      "\"Under\" shows that something is below or beneath another thing.",
    ],
    [
      "Choose the correct preposition of time: \"The meeting starts ___ 9 o'clock.\"",
      ["in", "on", "since", "at"],
      3,
      "Use \"at\" with clock times: at 9 o'clock, at noon, at midnight.",
    ],
    [
      "Choose the correct preposition of time: \"My birthday is ___ June.\"",
      ["in", "at", "on", "since"],
      0,
      "Use \"in\" with months, seasons and years: in June, in winter, in 2026.",
    ],
    [
      "Choose the correct preposition of time: \"We are meeting ___ Monday.\"",
      ["in", "on", "at", "since"],
      1,
      "Use \"on\" with days and dates: on Monday, on 16 June.",
    ],
    [
      "Choose the correct preposition: \"She walked ___ the room and sat down.\" (entered it)",
      ["on", "at", "into", "between"],
      2,
      "\"Into\" shows movement from outside to the inside of something.",
    ],
    [
      "Choose the correct preposition: \"The picture is hanging ___ the wall.\"",
      ["in", "at", "under", "on"],
      3,
      "We say a picture hangs \"on\" the wall, because it rests against its surface.",
    ],
    [
      "Choose the correct preposition: \"He sat ___ his two friends, with one on each side.\"",
      ["between", "among", "in", "onto"],
      0,
      "Use \"between\" for two people or things; \"among\" is used for three or more.",
    ],
    [
      "Choose the correct preposition: \"We have been waiting ___ two hours.\" (a length of time)",
      ["since", "for", "at", "onto"],
      1,
      "Use \"for\" with a length of time (for two hours); use \"since\" with a starting point (since 9 o'clock).",
    ],
  ],
  "Conjunctions & Connectors": [
    [
      "Choose the correct conjunction: \"I was tired, ___ I went to bed early.\" (result)",
      ["but", "or", "although", "so"],
      3,
      "\"So\" introduces a result or consequence: being tired was the reason, going to bed early was the result.",
    ],
    [
      "Choose the correct conjunction: \"She is clever ___ hard-working.\" (adding a similar idea)",
      ["and", "but", "or", "because"],
      0,
      "\"And\" joins two similar ideas together.",
    ],
    [
      "Choose the correct conjunction: \"He wanted to play, ___ it was raining.\" (contrast)",
      ["and", "but", "so", "because"],
      1,
      "\"But\" introduces a contrast or an opposite idea.",
    ],
    [
      "Choose the correct conjunction: \"Would you like tea ___ coffee?\" (a choice)",
      ["and", "but", "or", "so"],
      2,
      "\"Or\" is used to offer a choice between two options.",
    ],
    [
      "Choose the correct conjunction: \"I stayed at home ___ I was sick.\" (reason)",
      ["but", "or", "so", "because"],
      3,
      "\"Because\" introduces the reason or cause for something.",
    ],
    [
      "Choose the correct connector: \"___ it was late, we decided to continue.\" (concession)",
      ["Although", "Because", "So that", "And then"],
      0,
      "\"Although\" introduces a contrast or concession — something happens in spite of another fact.",
    ],
    [
      "A conjunction is a word that:",
      [
        "describes a noun",
        "joins words, phrases or clauses together",
        "shows who owns something",
        "replaces a noun",
      ],
      1,
      "A conjunction (such as and, but, or, because) is a joining word that links words, phrases or clauses.",
    ],
    [
      "Choose the correct connector: \"Study hard ___ you will pass the exam.\"",
      ["because", "although", "and", "or else not"],
      2,
      "\"And\" links the two clauses to show that passing follows from studying hard.",
    ],
  ],
  "Capital Letters & Abbreviations": [
    [
      "In the sentence \"my friend lives in durban\", which words need capital letters?",
      ["\"My\" and \"Durban\"", "only \"friend\"", "only \"lives\"", "none of the words"],
      0,
      "The first word of a sentence (\"My\") and a proper noun, the name of a place (\"Durban\"), both need capital letters.",
    ],
    [
      "The first word of every sentence and the pronoun \"I\" should always be:",
      ["written in lowercase", "written with a capital letter", "left out", "underlined"],
      1,
      "A sentence always begins with a capital letter, and the pronoun \"I\" is always written as a capital.",
    ],
    [
      "Which of the following must begin with a capital letter?",
      ["a common noun such as \"dog\"", "a verb such as \"run\"", "a person's name such as \"Thabo\"", "an adjective such as \"happy\""],
      2,
      "Proper nouns — the names of specific people, places or things, such as \"Thabo\" — always begin with a capital letter.",
    ],
    [
      "The abbreviation \"Dr.\" stands for:",
      ["Drive", "Dear", "Drama", "Doctor"],
      3,
      "\"Dr.\" is the abbreviation for \"Doctor\", a title used before a person's name.",
    ],
    [
      "The abbreviation \"etc.\" stands for the Latin phrase meaning:",
      ["and so on (et cetera)", "for example", "that is", "the very end"],
      0,
      "\"etc.\" stands for \"et cetera\", which means \"and so on\" or \"and the rest\".",
    ],
    [
      "An 'acronym' is a word formed from:",
      [
        "the last letters of a long sentence",
        "the first letters of a series of words, such as NASA",
        "two whole words joined together",
        "a word that has been misspelled",
      ],
      1,
      "An acronym is made from the first letters of several words and is read as a word, for example NASA or SABC.",
    ],
    [
      "Which is the correct way to write the abbreviation for \"South Africa\"?",
      ["s.a.", "s-a", "SA", "s/a"],
      2,
      "The standard abbreviation for South Africa is \"SA\", written in capital letters.",
    ],
    [
      "The names of days and months, such as \"Monday\" and \"April\":",
      [
        "never take a capital letter",
        "only take a capital letter at the end of a sentence",
        "are always written in full capitals",
        "always begin with a capital letter",
      ],
      3,
      "Days of the week and months of the year are proper nouns, so they always begin with a capital letter.",
    ],
  ],
  "Sentence Types": [
    [
      "A sentence that makes a statement and ends with a full stop is called a:",
      [
        "question (interrogative) sentence",
        "statement (declarative) sentence",
        "command (imperative) sentence",
        "exclamation",
      ],
      1,
      "A declarative sentence makes a statement and ends with a full stop, for example \"The sun is shining.\"",
    ],
    [
      "A sentence that asks something and ends with a question mark is called a(n):",
      ["statement", "command", "question (interrogative) sentence", "exclamation"],
      2,
      "An interrogative sentence asks a question and ends with a question mark.",
    ],
    [
      "\"Close the door, please.\" This sentence is a:",
      ["question", "statement", "exclamation", "command (imperative) sentence"],
      3,
      "An imperative sentence gives a command, instruction or request, for example \"Close the door.\"",
    ],
    [
      "\"What a beautiful day it is!\" This sentence is an:",
      [
        "exclamation (exclamatory sentence)",
        "ordinary question",
        "plain statement",
        "imperative command",
      ],
      0,
      "An exclamatory sentence expresses strong feeling and ends with an exclamation mark.",
    ],
    [
      "Which punctuation mark should end the sentence \"Where are you going\"?",
      ["a full stop", "a question mark", "a comma", "no punctuation at all"],
      1,
      "\"Where are you going\" is a question, so it must end with a question mark.",
    ],
    [
      "Which of the following sentences is a command (imperative)?",
      [
        "The sun is shining brightly today.",
        "Is the sun shining today?",
        "Sit down and open your books.",
        "What a lovely garden this is!",
      ],
      2,
      "\"Sit down and open your books\" gives an instruction, so it is an imperative (command) sentence.",
    ],
    [
      "An exclamatory sentence usually ends with:",
      ["a full stop", "a question mark", "a comma", "an exclamation mark"],
      3,
      "An exclamatory sentence expresses strong emotion and ends with an exclamation mark.",
    ],
    [
      "\"The learners wrote their exams in November.\" This sentence is a:",
      ["statement (declarative sentence)", "question", "command", "exclamation"],
      0,
      "This sentence simply states a fact and ends with a full stop, so it is a declarative (statement) sentence.",
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
