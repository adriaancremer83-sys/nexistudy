// Seeds the Grade 9 English (language conventions) question bank (6 topics x 8).
// CAPS Senior Phase, LANGUAGE CONVENTIONS ONLY (grammar/usage) — never
// literature/comprehension/essay (those are interpretive, not pipeline-suitable).
// Subject string "English" matches the Senior Phase subject list.
// Six topics chosen to be DISTINCT from the Gr10/Gr11/Gr12 English banks:
//   Gr12 = Parts of Speech, Figures of Speech, Punctuation, Direct & Indirect
//          Speech, Active & Passive Voice, Concord & Tenses
//   Gr11 = Sentence Structure & Clauses, Homophones, Synonyms & Antonyms,
//          Prefixes/Suffixes, Idioms & Proverbs, Degrees of Comparison
//   Gr10 = Spelling & Plurals, Articles & Determiners, Prepositions,
//          Conjunctions & Connectors, Capital Letters & Abbreviations,
//          Sentence Types
// Gr9 (this bank) = Nouns (Common/Proper/Collective/Abstract), Pronouns,
//          Verb Tenses, Modal Verbs, Question Tags, Contractions & the
//          Possessive Apostrophe — none reused from the other grades.
// Pitched at Grade 9 level (basic, foundational grammar).
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but NOT option order). Lint gotcha: options must not
// differ only by capitalisation (case-insensitive dedupe), so any case-based
// question uses options that differ by more than just case.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade9-english.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "English";
const GRADE = "Grade 9";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Common, Proper & Collective Nouns": [
    [
      "A word that names a person, place, thing or idea is called a:",
      ["noun", "verb", "adjective", "adverb"],
      0,
      "A noun is a naming word — it names a person, place, thing or idea.",
    ],
    [
      "Which of the following is a common noun?",
      ["Sipho", "dog", "Durban", "Monday"],
      1,
      "A common noun names a general, everyday thing; 'dog' is common, while Sipho, Durban and Monday are proper nouns.",
    ],
    [
      "Which of the following is a proper noun (and must start with a capital letter)?",
      ["city", "river", "Johannesburg", "mountain"],
      2,
      "A proper noun names a specific person or place; 'Johannesburg' is a proper noun, unlike the general words city, river and mountain.",
    ],
    [
      "Which of the following is a collective noun?",
      ["player", "ball", "field", "team"],
      3,
      "A collective noun names a group as a single unit; a 'team' is a group of players.",
    ],
    [
      "The correct collective noun for a group of lions is a:",
      ["pride", "flock", "swarm", "herd"],
      0,
      "A group of lions is called a pride.",
    ],
    [
      "The correct collective noun for a group of sheep is a:",
      ["pride", "flock", "school", "pack"],
      1,
      "A group of sheep is called a flock.",
    ],
    [
      "Which word is a proper noun?",
      ["teacher", "country", "Africa", "school"],
      2,
      "'Africa' is the name of a specific place, so it is a proper noun and always takes a capital letter.",
    ],
    [
      "An abstract noun names something you cannot touch or see, such as a feeling. Which word is an abstract noun?",
      ["table", "chair", "dog", "happiness"],
      3,
      "An abstract noun names an idea or feeling; 'happiness' cannot be touched or seen, unlike a table, chair or dog.",
    ],
  ],
  "Pronouns": [
    [
      "A word that takes the place of a noun is called a:",
      ["pronoun", "preposition", "conjunction", "interjection"],
      0,
      "A pronoun replaces a noun so we do not have to repeat it, e.g. 'he', 'she', 'it', 'they'.",
    ],
    [
      "Choose the correct pronoun: 'Thabo is tired, so ___ wants to rest.'",
      ["him", "he", "his", "them"],
      1,
      "'He' is the subject pronoun that replaces 'Thabo' as the doer of the action.",
    ],
    [
      "Choose the correct word: 'The book is ___.' (it belongs to me)",
      ["my", "me", "mine", "I"],
      2,
      "'Mine' is the possessive pronoun that shows the book belongs to me.",
    ],
    [
      "Which word is a possessive pronoun (showing ownership)?",
      ["they", "who", "this", "theirs"],
      3,
      "'Theirs' is a possessive pronoun showing that something belongs to them.",
    ],
    [
      "Choose the correct pronoun: 'Nomsa and ___ went to the shop.'",
      ["I", "me", "mine", "my"],
      0,
      "'I' is correct because it is the subject (the doer) of the sentence — 'Nomsa and I went'.",
    ],
    [
      "A reflexive pronoun ends in -self or -selves. Which word is a reflexive pronoun?",
      ["him", "himself", "his", "he"],
      1,
      "'Himself' is a reflexive pronoun, ending in -self.",
    ],
    [
      "Choose the correct word: 'The girls packed ___ bags.'",
      ["there", "they're", "their", "them"],
      2,
      "'Their' shows that the bags belong to the girls; 'there' and 'they're' are different words that sound the same.",
    ],
    [
      "Which word is a personal pronoun?",
      ["happy", "quickly", "blue", "she"],
      3,
      "'She' is a personal pronoun; happy and blue are adjectives and quickly is an adverb.",
    ],
  ],
  "Verb Tenses (Present, Past & Future)": [
    [
      "A word that shows an action or a state of being is a:",
      ["verb", "noun", "adjective", "pronoun"],
      0,
      "A verb is a 'doing' or 'being' word, such as run, eat, or is.",
    ],
    [
      "Which sentence is written in the past tense?",
      [
        "She walks to school.",
        "She walked to school.",
        "She will walk to school.",
        "She is walking to school.",
      ],
      1,
      "'Walked' is the past-tense form, showing the action already happened.",
    ],
    [
      "The future tense of 'I play' is:",
      ["I played", "I am playing", "I will play", "I play"],
      2,
      "The future tense uses 'will' + the verb: 'I will play'.",
    ],
    [
      "The past tense of the irregular verb 'go' is:",
      ["goed", "gone", "going", "went"],
      3,
      "'Go' is irregular; its simple past tense is 'went' (not 'goed').",
    ],
    [
      "Which sentence is in the present continuous tense?",
      [
        "The dog is barking.",
        "The dog barked.",
        "The dog will bark.",
        "The dog barks.",
      ],
      0,
      "The present continuous uses 'is/are' + verb-ing: 'The dog is barking'.",
    ],
    [
      "The past tense of the verb 'eat' is:",
      ["eated", "ate", "eaten", "eating"],
      1,
      "'Eat' is irregular; its simple past tense is 'ate'.",
    ],
    [
      "Choose the correct verb: 'Yesterday we ___ a movie.'",
      ["watch", "watches", "watched", "will watch"],
      2,
      "'Yesterday' signals the past, so the past-tense 'watched' is correct.",
    ],
    [
      "The past tense of most regular verbs is formed by adding:",
      ["-ing", "-s", "-en", "-ed"],
      3,
      "Regular verbs form the past tense by adding -ed, e.g. walk → walked.",
    ],
  ],
  "Modal Verbs": [
    [
      "Helping words like 'can', 'must' and 'should', which show ability, obligation or possibility, are called:",
      ["modal verbs", "nouns", "adverbs", "prepositions"],
      0,
      "Modal verbs (can, may, must, should, will, etc.) work with a main verb to show ability, permission, obligation or possibility.",
    ],
    [
      "Choose the best modal verb: 'You ___ wear a seatbelt; it is the law.'",
      ["may", "must", "might", "could"],
      1,
      "'Must' shows a strong obligation, which fits a law.",
    ],
    [
      "Which modal verb best shows ability? 'She ___ swim very well.'",
      ["should", "must", "can", "may"],
      2,
      "'Can' expresses ability — she is able to swim well.",
    ],
    [
      "Choose the best modal verb to ask politely: '___ I please borrow your pen?'",
      ["Must", "Shall", "Will", "May"],
      3,
      "'May' is used to ask politely for permission.",
    ],
    [
      "Choose the best modal verb to give advice: 'You ___ see a doctor about that cough.'",
      ["should", "can", "will", "must"],
      0,
      "'Should' is used to give advice or a recommendation.",
    ],
    [
      "Which modal verb shows that something is possible? 'It ___ rain later.'",
      ["must", "might", "shall", "would"],
      1,
      "'Might' shows possibility — it is perhaps going to rain.",
    ],
    [
      "Identify the modal verb in this sentence: 'Learners must wear their uniforms.'",
      ["Learners", "wear", "must", "uniforms"],
      2,
      "'Must' is the modal verb; it helps the main verb 'wear' and shows obligation.",
    ],
    [
      "Choose the best modal verb to offer help: 'I ___ help you carry those bags if you like.'",
      ["must", "should", "might", "will"],
      3,
      "'Will' is used here to offer help and show willingness.",
    ],
  ],
  "Question Tags": [
    [
      "Add the correct question tag: 'You are coming to the party, ___'",
      ["aren't you?", "are you?", "isn't it?", "don't you?"],
      0,
      "A positive statement takes a negative tag that matches the verb: 'You are…, aren't you?'",
    ],
    [
      "Add the correct question tag: 'She doesn't like tea, ___'",
      ["doesn't she?", "does she?", "is she?", "do she?"],
      1,
      "A negative statement takes a positive tag: 'She doesn't…, does she?'",
    ],
    [
      "Add the correct question tag: 'They live in Cape Town, ___'",
      ["aren't they?", "doesn't they?", "don't they?", "do they?"],
      2,
      "A positive statement with 'live' takes the negative tag 'don't they?'",
    ],
    [
      "Add the correct question tag: 'He can swim, ___'",
      ["can he?", "couldn't he?", "doesn't he?", "can't he?"],
      3,
      "The positive statement 'He can…' takes the negative tag 'can't he?'",
    ],
    [
      "Add the correct question tag: 'We have finished the work, ___'",
      ["haven't we?", "have we?", "didn't we?", "don't we?"],
      0,
      "The positive statement 'We have finished…' takes the negative tag 'haven't we?'",
    ],
    [
      "Add the correct question tag: 'It isn't raining, ___'",
      ["isn't it?", "is it?", "does it?", "it is?"],
      1,
      "The negative statement 'It isn't…' takes the positive tag 'is it?'",
    ],
    [
      "Add the correct question tag: 'You didn't see the message, ___'",
      ["did you not?", "didn't you?", "did you?", "do you?"],
      2,
      "The negative statement 'You didn't…' takes the positive tag 'did you?'",
    ],
    [
      "A question tag is separated from the main statement by which punctuation mark?",
      ["a full stop", "a question mark", "a colon", "a comma"],
      3,
      "A comma separates the statement from its question tag, e.g. 'You're ready, aren't you?'",
    ],
  ],
  "Contractions & the Possessive Apostrophe": [
    [
      "The contraction (short form) of 'do not' is:",
      ["don't", "dont", "do'nt", "doesn't"],
      0,
      "'Do not' is shortened to 'don't', with the apostrophe where the 'o' of 'not' is left out.",
    ],
    [
      "The contraction of 'I am' is:",
      ["Im", "I'm", "I'am", "am I"],
      1,
      "'I am' is shortened to 'I'm', with the apostrophe replacing the missing 'a'.",
    ],
    [
      "In a contraction, the apostrophe is used to show that:",
      [
        "a word is plural",
        "a word is a name",
        "one or more letters have been left out",
        "a sentence has ended",
      ],
      2,
      "In a contraction the apostrophe marks where letters have been left out, e.g. 'cannot' → 'can't'.",
    ],
    [
      "The contraction of 'they are' is:",
      ["theyre", "their", "there", "they're"],
      3,
      "'They are' is shortened to 'they're'; 'their' and 'there' are different words that sound the same.",
    ],
    [
      "To show that the book belongs to one boy, you write:",
      ["the boy's book", "the boys book", "the boys' book", "the book boy"],
      0,
      "For a singular owner, add apostrophe + s: 'the boy's book'.",
    ],
    [
      "To show that the bags belong to more than one girl, you write:",
      ["the girl's bags", "the girls' bags", "the girls bags", "the girlses bags"],
      1,
      "For a plural owner already ending in -s, add only an apostrophe after the s: 'the girls' bags'.",
    ],
    [
      "Which sentence uses the apostrophe correctly?",
      [
        "The dog wagged it's tail.",
        "Thats my pencil.",
        "That is Sara's pencil.",
        "The cat licked its' paw.",
      ],
      2,
      "'Sara's pencil' correctly shows possession; 'it's' means 'it is' (wrong for the tail), and 'its'' is never correct.",
    ],
    [
      "The contraction of 'cannot' is:",
      ["cant", "ca'nt", "cann't", "can't"],
      3,
      "'Cannot' is shortened to 'can't', with the apostrophe replacing the missing letters.",
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
