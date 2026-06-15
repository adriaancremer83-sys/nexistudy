// Seeds the Grade 11 English question bank (6 topics x 8 questions).
// LANGUAGE CONVENTIONS ONLY — sentence structure, homophones, synonyms/antonyms,
// affixes/word formation, idioms/proverbs, degrees of comparison. No literature/
// essay/interpretive questions (those are not objectively checkable). Topics +
// questions are DISTINCT from the Grade 12 English bank.
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but NOT option order).
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade11-english.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "English";
const GRADE = "Grade 11";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Sentence Structure & Clauses": [
    [
      "In the sentence \"The boy kicked the ball\", the subject is:",
      ["The boy", "kicked", "the ball", "kicked the ball"],
      0,
      "The subject is the person or thing that performs the action of the verb — here \"the boy\" does the kicking.",
    ],
    [
      "A sentence that contains only one main clause and expresses one complete thought is called a:",
      ["compound sentence", "simple sentence", "complex sentence", "clause fragment"],
      1,
      "A simple sentence has one main (independent) clause with a single subject and verb, expressing one complete idea.",
    ],
    [
      "\"I wanted to play, but it was raining.\" This is a:",
      ["simple sentence", "complex sentence", "compound sentence", "sentence fragment"],
      2,
      "A compound sentence joins two main clauses of equal weight with a coordinating conjunction such as \"but\".",
    ],
    [
      "A group of words that has a subject and a verb and can stand on its own as a complete sentence is called a:",
      ["phrase", "subordinate clause", "preposition", "main (independent) clause"],
      3,
      "A main (independent) clause has a subject and a verb and expresses a complete thought, so it can stand alone as a sentence.",
    ],
    [
      "In \"Because she was tired, she went to bed\", the words \"Because she was tired\" form a:",
      ["subordinate (dependent) clause", "main clause", "complete sentence", "phrase with no verb"],
      0,
      "\"Because she was tired\" has a subject and verb but cannot stand alone — it depends on the main clause — so it is a subordinate (dependent) clause.",
    ],
    [
      "A group of related words that does NOT contain both a subject and a verb is called a:",
      ["clause", "phrase", "sentence", "paragraph"],
      1,
      "A phrase is a group of words that works as a unit but lacks a subject–verb combination, e.g. \"in the morning\".",
    ],
    [
      "In the sentence \"She quickly read the book\", the object is:",
      ["She", "quickly", "the book", "read"],
      2,
      "The object receives the action of the verb — what was read is \"the book\".",
    ],
    [
      "\"When the bell rang, the learners ran outside.\" This sentence is:",
      ["a simple sentence", "a compound sentence", "a sentence fragment", "a complex sentence"],
      3,
      "A complex sentence has one main clause (\"the learners ran outside\") plus a subordinate clause (\"When the bell rang\").",
    ],
  ],
  "Homophones & Commonly Confused Words": [
    [
      "Choose the correct word: \"They left ___ books at home.\"",
      ["their", "there", "they're", "thair"],
      0,
      "\"Their\" is the possessive form (belonging to them); \"there\" refers to place and \"they're\" means \"they are\".",
    ],
    [
      "Choose the correct word: \"I would like to come ___, please.\"",
      ["to", "too", "two", "tou"],
      1,
      "\"Too\" means \"also\" or \"as well\"; \"to\" is a preposition and \"two\" is the number 2.",
    ],
    [
      "Choose the correct word: \"You are going to ___ your keys if you are not careful.\"",
      ["loose", "louse", "lose", "loosen"],
      2,
      "\"Lose\" (to misplace or be deprived of) is the verb needed here; \"loose\" is an adjective meaning not tight.",
    ],
    [
      "Choose the correct word: \"___ going to be late if we don't hurry.\"",
      ["Their", "There", "Theyre", "They're"],
      3,
      "\"They're\" is the contraction of \"they are\", which fits here; \"their\" shows possession and \"there\" refers to place.",
    ],
    [
      "Choose the correct word: \"Did the bad news ___ your decision?\"",
      ["affect", "effect", "afect", "effekt"],
      0,
      "\"Affect\" is usually the verb (to influence); \"effect\" is usually the noun (the result).",
    ],
    [
      "Choose the correct word: \"Everyone may come ___ John, who is busy.\"",
      ["accept", "except", "exept", "acept"],
      1,
      "\"Except\" means \"apart from\" or \"excluding\"; \"accept\" means \"to receive or agree to\".",
    ],
    [
      "Choose the correct word: \"___ jacket is hanging on the chair.\"",
      ["You're", "Youre", "Your", "Yours'"],
      2,
      "\"Your\" is the possessive form (belonging to you); \"you're\" is the contraction of \"you are\".",
    ],
    [
      "Choose the correct word: \"I am not sure ___ it will rain today.\"",
      ["weather", "wether", "wheather", "whether"],
      3,
      "\"Whether\" introduces a choice or doubt; \"weather\" refers to the state of the atmosphere (rain, sun, etc.).",
    ],
  ],
  "Synonyms & Antonyms": [
    [
      "Which word is a SYNONYM (closest in meaning) for \"happy\"?",
      ["joyful", "angry", "tired", "hungry"],
      0,
      "A synonym has a similar meaning — \"joyful\" means much the same as \"happy\".",
    ],
    [
      "Which word is an ANTONYM (opposite) of \"ancient\"?",
      ["old", "modern", "historic", "aged"],
      1,
      "An antonym has the opposite meaning — the opposite of \"ancient\" (very old) is \"modern\".",
    ],
    [
      "Which word is a SYNONYM for \"begin\"?",
      ["finish", "stop", "start", "end"],
      2,
      "\"Start\" means the same as \"begin\"; the others are antonyms of it.",
    ],
    [
      "Which word is an ANTONYM of \"generous\"?",
      ["kind", "giving", "helpful", "stingy"],
      3,
      "The opposite of \"generous\" (willing to give) is \"stingy\" (unwilling to give or spend).",
    ],
    [
      "Which word is a SYNONYM for \"difficult\"?",
      ["hard", "easy", "simple", "light"],
      0,
      "\"Hard\" is a synonym of \"difficult\"; \"easy\" and \"simple\" are antonyms.",
    ],
    [
      "Which word is an ANTONYM of \"victory\"?",
      ["triumph", "defeat", "success", "win"],
      1,
      "The opposite of \"victory\" is \"defeat\"; the others are synonyms of victory.",
    ],
    [
      "Which word is a SYNONYM for \"brave\"?",
      ["fearful", "cowardly", "courageous", "timid"],
      2,
      "\"Courageous\" means the same as \"brave\"; \"fearful\", \"cowardly\" and \"timid\" are antonyms.",
    ],
    [
      "Which word is an ANTONYM of \"expand\"?",
      ["grow", "enlarge", "increase", "shrink"],
      3,
      "The opposite of \"expand\" (to grow larger) is \"shrink\" (to become smaller).",
    ],
  ],
  "Prefixes, Suffixes & Word Formation": [
    [
      "The prefix \"re-\" in the word \"rewrite\" means:",
      ["again", "not", "before", "wrongly"],
      0,
      "The prefix \"re-\" means \"again\", so \"rewrite\" means to write again.",
    ],
    [
      "Adding the prefix \"un-\" to \"happy\" gives \"unhappy\", which means:",
      ["very happy", "not happy", "happy again", "happy before"],
      1,
      "The prefix \"un-\" means \"not\", so \"unhappy\" means \"not happy\".",
    ],
    [
      "The prefix \"pre-\" in the word \"preview\" means:",
      ["after", "against", "before", "again"],
      2,
      "The prefix \"pre-\" means \"before\", so a \"preview\" is a viewing that takes place before the main event.",
    ],
    [
      "The suffix \"-less\" in the word \"hopeless\" means:",
      ["full of", "able to", "in the manner of", "without"],
      3,
      "The suffix \"-less\" means \"without\", so \"hopeless\" means \"without hope\".",
    ],
    [
      "The prefix \"mis-\" in the word \"misunderstand\" means:",
      ["wrongly or badly", "again", "before", "not at all"],
      0,
      "The prefix \"mis-\" means \"wrongly\" or \"badly\", so to \"misunderstand\" is to understand wrongly.",
    ],
    [
      "Which suffix turns the verb \"enjoy\" into the noun \"enjoyment\"?",
      ["-ful", "-ment", "-less", "-ly"],
      1,
      "The suffix \"-ment\" forms nouns from verbs (enjoy → enjoyment, agree → agreement).",
    ],
    [
      "The suffix \"-ful\" in the word \"careful\" means:",
      ["without", "again", "full of", "before"],
      2,
      "The suffix \"-ful\" means \"full of\", so \"careful\" means \"full of care\".",
    ],
    [
      "Adding \"-ly\" to the adjective \"quick\" forms \"quickly\", which is:",
      ["a noun", "a verb", "an adjective", "an adverb"],
      3,
      "The suffix \"-ly\" usually turns an adjective into an adverb, so \"quickly\" is an adverb describing how something is done.",
    ],
  ],
  "Idioms & Proverbs": [
    [
      "The idiom \"to let the cat out of the bag\" means to:",
      ["reveal a secret", "buy a pet", "make a mistake", "lose something"],
      0,
      "\"To let the cat out of the bag\" means to reveal a secret, often by accident.",
    ],
    [
      "The idiom \"once in a blue moon\" means:",
      ["every day", "very rarely", "at night only", "twice a week"],
      1,
      "\"Once in a blue moon\" means that something happens very rarely.",
    ],
    [
      "The proverb \"Don't count your chickens before they hatch\" warns us not to:",
      ["eat too much", "keep birds", "rely on something good before it is certain", "wake up early"],
      2,
      "The proverb warns against assuming success or relying on something before it has actually happened.",
    ],
    [
      "The idiom \"to bite off more than you can chew\" means to:",
      ["eat very fast", "be very hungry", "speak rudely", "take on more than you can manage"],
      3,
      "\"To bite off more than you can chew\" means to take on a task that is too big or difficult to handle.",
    ],
    [
      "The idiom \"to be under the weather\" means to:",
      ["feel ill", "be outside", "be very busy", "be late"],
      0,
      "\"Under the weather\" is an idiom meaning to feel ill or unwell.",
    ],
    [
      "The proverb \"The early bird catches the worm\" means that:",
      ["birds eat worms", "those who act early gain an advantage", "worms wake up late", "it is good to sleep in"],
      1,
      "The proverb means that the person who acts or arrives first has the best chance of success.",
    ],
    [
      "The idiom \"to cost an arm and a leg\" means something is:",
      ["dangerous", "painful", "very expensive", "very cheap"],
      2,
      "\"To cost an arm and a leg\" means to be very expensive.",
    ],
    [
      "The idiom \"to hit the nail on the head\" means to:",
      ["hurt yourself", "do building work", "miss the point", "be exactly right"],
      3,
      "\"To hit the nail on the head\" means to describe or identify something exactly correctly.",
    ],
  ],
  "Degrees of Comparison & Adjective/Adverb Use": [
    [
      "The correct comparative form of \"big\" is:",
      ["bigger", "more big", "biggest", "more bigger"],
      0,
      "Short adjectives form the comparative by adding \"-er\": big → bigger (and the superlative is \"biggest\").",
    ],
    [
      "The correct superlative form of \"good\" is:",
      ["gooder", "best", "goodest", "more good"],
      1,
      "\"Good\" is irregular: its comparative is \"better\" and its superlative is \"best\".",
    ],
    [
      "Choose the correct sentence:",
      [
        "She sings more beautiful than her sister.",
        "She sings beautifuller than her sister.",
        "She sings more beautifully than her sister.",
        "She sings most beautiful than her sister.",
      ],
      2,
      "\"Beautifully\" is an adverb describing how she sings, and longer words form the comparative with \"more\": more beautifully.",
    ],
    [
      "The correct comparative form of \"bad\" is:",
      ["badder", "baddest", "more bad", "worse"],
      3,
      "\"Bad\" is irregular: its comparative is \"worse\" and its superlative is \"worst\".",
    ],
    [
      "Choose the correct word: \"Of the three runners, Themba is the ___.\"",
      ["fastest", "faster", "more fast", "most fast"],
      0,
      "When comparing three or more, use the superlative — for \"fast\" that is \"fastest\".",
    ],
    [
      "Choose the correct word: \"He drives very ___.\"",
      ["careful", "carefully", "carefuller", "more careful"],
      1,
      "An adverb is needed to describe the verb \"drives\"; \"carefully\" tells us how he drives.",
    ],
    [
      "Choose the correct sentence:",
      [
        "This book is interestinger than that one.",
        "This book is more interestinger than that one.",
        "This book is more interesting than that one.",
        "This book is most interesting than that one.",
      ],
      2,
      "Longer adjectives form the comparative with \"more\" (not \"-er\", and not a double comparison): \"more interesting than\".",
    ],
    [
      "Choose the correct word: \"She is the ___ student in the class.\"",
      ["cleverer", "more clever", "more cleverer", "cleverest"],
      3,
      "\"In the class\" compares many, so the superlative is needed: the cleverest student.",
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
