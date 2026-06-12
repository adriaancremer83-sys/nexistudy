// Seeds the Grade 12 English question bank (6 topics x 8 questions).
// LANGUAGE CONVENTIONS ONLY — grammar, figures of speech, punctuation, reported
// speech, voice, concord. No literature/essay/interpretive questions (those are
// not objectively checkable). CAPS-aligned for HL and FAL language papers.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade12-english.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "English";
const GRADE = "Grade 12";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Parts of Speech": [
    [
      "In the sentence \"The dog barked loudly\", the word \"loudly\" is:",
      ["a noun", "an adverb", "an adjective", "a verb"],
      1,
      "\"Loudly\" tells us how the dog barked — it modifies the verb, so it is an adverb (most adverbs of manner end in -ly).",
    ],
    [
      "In the sentence \"She bought a beautiful dress\", the word \"beautiful\" is:",
      ["a verb", "an adverb", "a pronoun", "an adjective"],
      3,
      "\"Beautiful\" describes the noun \"dress\", so it is an adjective.",
    ],
    [
      "In the sentence \"They arrived at the station\", the word \"at\" is:",
      ["a preposition", "a conjunction", "an article", "an interjection"],
      0,
      "\"At\" shows the relationship (position) between the verb and \"the station\", so it is a preposition.",
    ],
    [
      "In the sentence \"Thabo and Sipho play soccer\", the word \"and\" is:",
      ["a preposition", "an adverb", "a conjunction", "a pronoun"],
      2,
      "\"And\" joins the two nouns \"Thabo\" and \"Sipho\", so it is a (coordinating) conjunction.",
    ],
    [
      "Which word in this sentence is a pronoun: \"She gave the book to the teacher\"?",
      ["book", "gave", "teacher", "She"],
      3,
      "\"She\" stands in the place of a noun (the person's name), so it is a pronoun. \"Book\" and \"teacher\" are nouns and \"gave\" is a verb.",
    ],
    [
      "In the sentence \"Wow! That was an amazing goal\", the word \"Wow\" is:",
      ["a verb", "an interjection", "a noun", "an adjective"],
      1,
      "\"Wow\" expresses sudden emotion and stands apart from the sentence structure, so it is an interjection.",
    ],
    [
      "The word \"happiness\" is:",
      ["an abstract noun", "a concrete noun", "a proper noun", "a collective noun"],
      0,
      "\"Happiness\" names a feeling that cannot be seen or touched, so it is an abstract noun.",
    ],
    [
      "In the phrase \"a flock of sheep\", the word \"flock\" is:",
      ["a proper noun", "an abstract noun", "a collective noun", "a pronoun"],
      2,
      "A collective noun names a group of things or animals — a \"flock\" is the collective noun for a group of sheep.",
    ],
  ],
  "Figures of Speech": [
    [
      "\"Her smile is like sunshine\" is an example of:",
      ["a metaphor", "personification", "a simile", "hyperbole"],
      2,
      "A simile compares two things using \"like\" or \"as\" — here the smile is compared to sunshine using \"like\".",
    ],
    [
      "\"He is a lion in battle\" is an example of:",
      ["a metaphor", "a simile", "onomatopoeia", "a euphemism"],
      0,
      "A metaphor compares directly, without \"like\" or \"as\" — he is called a lion to suggest his bravery.",
    ],
    [
      "\"The wind whispered through the trees\" is an example of:",
      ["hyperbole", "a simile", "irony", "personification"],
      3,
      "Personification gives human qualities to something non-human — the wind is described as whispering, a human action.",
    ],
    [
      "\"I've told you a million times!\" is an example of:",
      ["understatement", "hyperbole", "a simile", "a metaphor"],
      1,
      "Hyperbole is deliberate exaggeration for effect — no one literally repeats something a million times.",
    ],
    [
      "In \"The bees buzzed in the garden\", the word \"buzzed\" is an example of:",
      ["onomatopoeia", "a metaphor", "an oxymoron", "alliteration"],
      0,
      "Onomatopoeia is a word that imitates the sound it describes — \"buzzed\" sounds like the noise bees make.",
    ],
    [
      "\"Peter Piper picked a peck of pickled peppers\" is an example of:",
      ["hyperbole", "personification", "irony", "alliteration"],
      3,
      "Alliteration is the repetition of the same consonant sound at the beginning of words — here the repeated \"p\" sound.",
    ],
    [
      "Saying someone \"passed away\" instead of \"died\" is an example of:",
      ["sarcasm", "a euphemism", "a paradox", "an idiom"],
      1,
      "A euphemism is a milder, more polite way of expressing something harsh or unpleasant — \"passed away\" softens \"died\".",
    ],
    [
      "\"Deafening silence\" is an example of:",
      ["a simile", "a euphemism", "an oxymoron", "onomatopoeia"],
      2,
      "An oxymoron places two contradictory words next to each other — silence cannot literally be deafening.",
    ],
  ],
  "Punctuation": [
    [
      "An ellipsis ( ... ) is used to show:",
      [
        "that a question follows",
        "strong emotion",
        "possession",
        "that words have been left out or a thought trails off",
      ],
      3,
      "An ellipsis (three dots) shows that words have been omitted from a quotation or that a thought trails off unfinished.",
    ],
    [
      "The apostrophe in \"the boy's bag\" shows:",
      [
        "that there is more than one boy",
        "that the bag belongs to the boy",
        "that words have been left out",
        "that the sentence is a question",
      ],
      1,
      "An apostrophe + s after a singular noun shows possession — the bag belongs to the boy.",
    ],
    [
      "The contraction \"don't\" stands for:",
      ["do not", "did not", "does not", "will not"],
      0,
      "\"Don't\" is the contraction of \"do not\" — the apostrophe replaces the missing letter \"o\".",
    ],
    [
      "Which punctuation mark is used at the end of a direct question?",
      ["a full stop", "an exclamation mark", "a question mark", "a comma"],
      2,
      "A direct question always ends with a question mark (?).",
    ],
    [
      "Which sentence uses the apostrophe correctly?",
      ["Its a sunny day.", "It's a sunny day.", "Its' a sunny day.", "It is' a sunny day."],
      1,
      "\"It's\" with an apostrophe is the contraction of \"it is\". (\"Its\" without an apostrophe is the possessive form.)",
    ],
    [
      "A colon ( : ) is commonly used to:",
      ["end a sentence", "join two unrelated paragraphs", "show possession", "introduce a list"],
      3,
      "A colon introduces what follows — most commonly a list, an explanation or a quotation.",
    ],
    [
      "In direct speech, the words actually spoken are placed:",
      ["in brackets", "after a full stop only", "inside quotation (inverted) commas", "in italics only"],
      2,
      "The exact words spoken are enclosed in quotation marks (inverted commas) in direct speech.",
    ],
    [
      "Which sentence is punctuated correctly?",
      [
        "\"I am tired,\" said Lerato.",
        "\"I am tired\" said, Lerato.",
        "I am tired, \"said Lerato.\"",
        "\"I am tired said Lerato.\"",
      ],
      0,
      "The spoken words go inside the quotation marks with a comma before the closing inverted commas: \"I am tired,\" said Lerato.",
    ],
  ],
  "Direct & Indirect Speech": [
    [
      "Sipho said, \"I am hungry.\" In indirect (reported) speech this becomes:",
      [
        "Sipho said that he was hungry.",
        "Sipho said that I am hungry.",
        "Sipho said that he is hungry.",
        "Sipho says that he was hungry.",
      ],
      0,
      "In reported speech the pronoun changes (I → he) and the present tense moves back to the past (am → was): Sipho said that he was hungry.",
    ],
    [
      "When changing direct speech to indirect speech, the word \"tomorrow\" usually becomes:",
      ["that day", "yesterday", "the next day", "today"],
      2,
      "Time words shift in reported speech: \"tomorrow\" becomes \"the next day\" (or \"the following day\").",
    ],
    [
      "She said, \"I will help you.\" In indirect speech this becomes:",
      [
        "She said that she will help me.",
        "She said that she would help me.",
        "She says that she would help me.",
        "She said that I will help you.",
      ],
      1,
      "\"Will\" changes to \"would\" in reported speech, and the pronouns shift: She said that she would help me.",
    ],
    [
      "When changing direct speech to indirect speech, \"here\" usually becomes:",
      ["nowhere", "everywhere", "where", "there"],
      3,
      "Place words shift in reported speech: \"here\" becomes \"there\".",
    ],
    [
      "He said, \"I saw the movie yesterday.\" In indirect speech this becomes:",
      [
        "He said that he saw the movie yesterday.",
        "He said that I had seen the movie yesterday.",
        "He said that he had seen the movie the previous day.",
        "He says that he sees the movie the day before.",
      ],
      2,
      "The past tense moves back to the past perfect (saw → had seen) and \"yesterday\" becomes \"the previous day\".",
    ],
    [
      "In indirect speech, a verb in the present tense usually changes to:",
      ["the past tense", "the future tense", "the present continuous", "it never changes"],
      0,
      "Reported speech moves the verb one step back in time, so the present tense becomes the past tense (e.g. \"am\" → \"was\").",
    ],
    [
      "\"Are you coming?\" she asked. In indirect speech this becomes:",
      [
        "She asked are you coming.",
        "She asked that I am coming.",
        "She said, are you coming?",
        "She asked whether I was coming.",
      ],
      3,
      "A reported question uses \"whether\" or \"if\", drops the question mark, and the tense moves back: She asked whether I was coming.",
    ],
    [
      "Mom said, \"We are leaving today.\" In indirect speech, \"today\" becomes:",
      ["tomorrow", "that day", "the next day", "this day"],
      1,
      "Time words shift in reported speech: \"today\" becomes \"that day\".",
    ],
  ],
  "Active & Passive Voice": [
    [
      "In which sentence is the verb in the passive voice?",
      [
        "The cat chased the mouse.",
        "The mouse was chased by the cat.",
        "The cat is chasing the mouse.",
        "The cat will chase the mouse.",
      ],
      1,
      "In the passive voice the subject receives the action: \"The mouse was chased by the cat\" uses was + past participle.",
    ],
    [
      "\"Thandi wrote the letter.\" In the passive voice this becomes:",
      [
        "The letter is written by Thandi.",
        "Thandi was written by the letter.",
        "The letter will be written by Thandi.",
        "The letter was written by Thandi.",
      ],
      3,
      "The past tense active becomes was/were + past participle: The letter was written by Thandi.",
    ],
    [
      "\"The boys play soccer.\" In the passive voice this becomes:",
      [
        "Soccer is played by the boys.",
        "Soccer was played by the boys.",
        "Soccer will be played by the boys.",
        "Soccer is playing the boys.",
      ],
      0,
      "The present tense active becomes is/are + past participle — \"soccer\" is singular, so: Soccer is played by the boys.",
    ],
    [
      "\"The cake was baked by Gogo.\" In the active voice this becomes:",
      ["Gogo bakes the cake.", "The cake baked Gogo.", "Gogo baked the cake.", "Gogo will bake the cake."],
      2,
      "The doer becomes the subject and the verb returns to the simple past: Gogo baked the cake.",
    ],
    [
      "In a passive sentence, the doer of the action is usually introduced by the word:",
      ["of", "with", "from", "by"],
      3,
      "The agent (doer) in a passive sentence follows \"by\": \"The letter was written by Thandi.\"",
    ],
    [
      "\"The teacher will mark the tests.\" In the passive voice this becomes:",
      [
        "The tests will be marked by the teacher.",
        "The tests were marked by the teacher.",
        "The tests are marked by the teacher.",
        "The tests will mark the teacher.",
      ],
      0,
      "The future tense active becomes will be + past participle: The tests will be marked by the teacher.",
    ],
    [
      "Which sentence is in the active voice?",
      [
        "The window was broken by the ball.",
        "The song was sung by the choir.",
        "The learners completed the project.",
        "The road is being repaired.",
      ],
      2,
      "In the active voice the subject performs the action: \"The learners completed the project.\" The other sentences are all passive.",
    ],
    [
      "\"She is washing the dishes.\" In the passive voice this becomes:",
      [
        "The dishes are washed by her.",
        "The dishes are being washed by her.",
        "The dishes were being washed by her.",
        "The dishes have been washed by her.",
      ],
      1,
      "The present continuous becomes is/are being + past participle: The dishes are being washed by her.",
    ],
  ],
  "Concord & Tenses": [
    [
      "Choose the correct verb: \"Each of the learners ___ a textbook.\"",
      ["have", "were having", "has", "are having"],
      2,
      "\"Each\" is singular, so it takes a singular verb: Each of the learners has a textbook.",
    ],
    [
      "Choose the correct verb: \"Neither Sipho nor his friends ___ at school today.\"",
      ["are", "is", "am", "be"],
      0,
      "With \"neither ... nor\", the verb agrees with the subject closest to it — \"friends\" is plural, so the verb is \"are\".",
    ],
    [
      "Choose the correct verb: \"Yesterday she ___ to the shop.\"",
      ["go", "goes", "gone", "went"],
      3,
      "\"Yesterday\" signals the simple past tense, and the past tense of \"go\" is \"went\".",
    ],
    [
      "Choose the correct verb: \"By next year, I ___ my studies.\"",
      ["will finish", "will have finished", "finished", "am finishing"],
      1,
      "\"By next year\" signals the future perfect tense — an action completed before a future time: will have finished.",
    ],
    [
      "Choose the correct verb: \"The news ___ shocking.\"",
      ["is", "are", "were", "have been"],
      0,
      "\"News\" looks plural but is an uncountable singular noun, so it takes a singular verb: The news is shocking.",
    ],
    [
      "Choose the correct sentence:",
      [
        "She have been waiting for an hour.",
        "She been waiting for an hour.",
        "She has been waiting for an hour.",
        "She have waited for an hour.",
      ],
      2,
      "The third-person singular \"she\" takes \"has\" in the present perfect continuous: She has been waiting for an hour.",
    ],
    [
      "Choose the correct verb: \"While I ___ supper, the lights went out.\"",
      ["cook", "was cooking", "am cooking", "will cook"],
      1,
      "An action in progress when another past action interrupted it takes the past continuous: While I was cooking supper, the lights went out.",
    ],
    [
      "Choose the correct verb: \"My brother, together with his friends, ___ playing outside.\"",
      ["are", "were", "be", "is"],
      3,
      "Phrases like \"together with\" do not change the subject — \"my brother\" is singular, so the verb is \"is\".",
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
