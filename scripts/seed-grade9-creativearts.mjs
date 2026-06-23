// Seeds the Grade 9 Creative Arts question bank (6 topics x 8 questions).
// CAPS Senior Phase Creative Arts. Subject string "Creative Arts" matches the
// Senior Phase subject list in app/nexi-tutor/page.tsx.
// Creative Arts is mostly practical (making/performing), so this bank is
// RESTRICTED to objectively-checkable arts THEORY only — visual-art elements,
// colour theory, music-notation basics, music terms, drama terms and dance
// terms. No "make/perform/interpret" tasks (not pipeline-suitable).
// Brand-new subject (no other grade has a Creative Arts bank), so no cross-grade
// distinctness constraint.
// Correct-answer positions spread evenly A-D per topic (engine shuffles question
// order, not option order). Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade9-creativearts.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Creative Arts";
const GRADE = "Grade 9";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Elements of Art": [
    [
      "The basic visual building blocks of art — line, shape, colour and texture — are called the ___ of art:",
      ["elements", "prices", "frames", "titles"],
      0,
      "The elements of art (line, shape, form, colour, texture, tone, space) are the basic building blocks artists use.",
    ],
    [
      "A mark made by a moving point, which can be straight, curved, thick or thin, is called a:",
      ["shape", "line", "dot", "colour"],
      1,
      "A line is a mark made by a moving point; it can be straight, curved, thick or thin.",
    ],
    [
      "A flat, enclosed area such as a circle, square or triangle is called a:",
      ["line", "texture", "shape", "tone"],
      2,
      "A shape is a flat (2D) enclosed area, such as a circle, square or triangle.",
    ],
    [
      "The element of art that describes how a surface feels, or looks like it would feel (rough or smooth), is:",
      ["colour", "line", "shape", "texture"],
      3,
      "Texture describes how a surface feels or appears to feel — for example rough, smooth or bumpy.",
    ],
    [
      "A three-dimensional object that has height, width and depth, such as a sculpture, shows the element called:",
      ["form", "line", "colour", "dot"],
      0,
      "Form is the 3D element — it has height, width and depth, like a sphere or a sculpture.",
    ],
    [
      "The lightness or darkness of a colour or area in an artwork is called its:",
      ["shape", "tone (value)", "line", "texture"],
      1,
      "Tone (or value) is how light or dark a colour or area is.",
    ],
    [
      "The empty areas around and between the objects in an artwork are called:",
      ["colour", "line", "space", "texture"],
      2,
      "Space refers to the empty areas around and between the objects in an artwork.",
    ],
    [
      "Which of the following is an element of art?",
      ["a paintbrush", "an easel", "a canvas", "colour"],
      3,
      "Colour is an element of art; a paintbrush, easel and canvas are tools/materials, not elements.",
    ],
  ],
  "Colour Theory": [
    [
      "The three primary colours are:",
      [
        "red, yellow and blue",
        "green, orange and purple",
        "black, white and grey",
        "pink, brown and gold",
      ],
      0,
      "The three primary colours are red, yellow and blue; they cannot be made by mixing other colours.",
    ],
    [
      "Mixing two primary colours together makes a ___ colour:",
      ["primary", "secondary", "black", "white"],
      1,
      "Mixing two primary colours makes a secondary colour (e.g. red + yellow = orange).",
    ],
    [
      "Which of these is a secondary colour?",
      ["red", "blue", "green", "yellow"],
      2,
      "Green is a secondary colour, made by mixing blue and yellow; red, blue and yellow are primary colours.",
    ],
    [
      "Colours such as red, orange and yellow, which remind us of fire and the sun, are called ___ colours:",
      ["cool", "dull", "dark", "warm"],
      3,
      "Red, orange and yellow are warm colours.",
    ],
    [
      "Colours such as blue, green and purple, which remind us of water and ice, are called ___ colours:",
      ["cool", "warm", "bright", "hot"],
      0,
      "Blue, green and purple are cool colours.",
    ],
    [
      "Mixing blue and yellow paint makes:",
      ["purple", "green", "orange", "brown"],
      1,
      "Blue + yellow = green.",
    ],
    [
      "Mixing red and yellow paint makes:",
      ["green", "purple", "orange", "blue"],
      2,
      "Red + yellow = orange.",
    ],
    [
      "Black, white and grey are known as ___ colours:",
      ["primary", "secondary", "warm", "neutral"],
      3,
      "Black, white and grey are neutral colours.",
    ],
  ],
  "Music Notation Basics": [
    [
      "The set of five horizontal lines on which music is written is called the:",
      ["staff (stave)", "scale", "bar", "beat"],
      0,
      "Music is written on a staff (or stave) — the set of five horizontal lines.",
    ],
    [
      "The symbol placed at the start of the staff that fixes the pitch of the notes is the:",
      ["bar line", "clef", "rest", "slur"],
      1,
      "The clef is placed at the start of the staff and fixes the pitch of the notes (e.g. the treble clef).",
    ],
    [
      "A note shaped as a hollow oval with a stem, lasting two beats, is a ___ note:",
      ["crotchet", "quaver", "minim", "semibreve"],
      2,
      "A minim is a hollow note head with a stem and lasts two beats.",
    ],
    [
      "A note that lasts four beats (a whole note), drawn as a hollow oval with no stem, is a:",
      ["crotchet", "minim", "quaver", "semibreve"],
      3,
      "A semibreve (whole note) lasts four beats and is a hollow oval with no stem.",
    ],
    [
      "A crotchet (a filled note head with a stem) lasts how many beats?",
      ["1", "2", "3", "4"],
      0,
      "A crotchet (quarter note) lasts one beat.",
    ],
    [
      "The vertical lines that divide the staff into equal sections (bars) are called:",
      ["clefs", "bar lines", "rests", "notes"],
      1,
      "Bar lines are the vertical lines that divide the staff into bars (measures).",
    ],
    [
      "A symbol that shows a period of silence in music is called a:",
      ["note", "clef", "rest", "bar"],
      2,
      "A rest is a symbol that shows a period of silence in music.",
    ],
    [
      "How many beats does a minim last?",
      ["1", "4", "3", "2"],
      3,
      "A minim lasts two beats.",
    ],
  ],
  "Music Terms": [
    [
      "In music, the word 'dynamics' refers to:",
      ["how loud or soft the music is", "the song's title", "the colour of the notes", "the price of a ticket"],
      0,
      "Dynamics describe how loud or soft music is played.",
    ],
    [
      "The Italian musical term 'forte' tells a musician to play:",
      ["softly", "loudly", "slowly", "backwards"],
      1,
      "'Forte' (f) means to play loudly.",
    ],
    [
      "The Italian musical term 'piano' (p) tells a musician to play:",
      ["loudly", "very fast", "softly", "very high"],
      2,
      "'Piano' (p) means to play softly.",
    ],
    [
      "The speed of a piece of music — how fast or slow it is played — is called the:",
      ["pitch", "dynamics", "melody", "tempo"],
      3,
      "Tempo is the speed of the music (how fast or slow it is).",
    ],
    [
      "How high or low a musical sound is, is called its:",
      ["pitch", "volume", "tempo", "rhythm"],
      0,
      "Pitch is how high or low a musical sound is.",
    ],
    [
      "A regular, repeated pattern of beats in music is called the:",
      ["pitch", "rhythm", "colour", "clef"],
      1,
      "Rhythm is the pattern of beats and note lengths in music.",
    ],
    [
      "The term 'allegro' tells a musician to play at a tempo that is:",
      ["very slow", "sad and heavy", "fast and lively", "completely silent"],
      2,
      "'Allegro' means to play at a fast, lively tempo.",
    ],
    [
      "A tune made of a series of musical notes played one after another is called a:",
      ["rest", "bar", "dynamic", "melody"],
      3,
      "A melody is a tune — a series of notes played one after another.",
    ],
  ],
  "Drama Terms": [
    [
      "The written text of a play, containing the words the actors say, is called the:",
      ["script", "prop", "stage", "curtain"],
      0,
      "The script is the written text of a play, with the dialogue and stage directions.",
    ],
    [
      "The objects an actor handles on stage, such as a sword or a cup, are called:",
      ["costumes", "props", "lights", "seats"],
      1,
      "Props (properties) are the objects actors use on stage, such as a cup or a sword.",
    ],
    [
      "Acting out a story using only movements and gestures, with no words, is called:",
      ["singing", "narrating", "mime", "reading"],
      2,
      "Mime is acting using only movement and gesture, without spoken words.",
    ],
    [
      "The people who watch a play or performance are called the:",
      ["actors", "directors", "crew", "audience"],
      3,
      "The audience are the people who watch a performance.",
    ],
    [
      "The person who guides the actors and is in charge of how a play is performed is the:",
      ["director", "audience", "usher", "cleaner"],
      0,
      "The director guides the actors and is in charge of how the play is staged and performed.",
    ],
    [
      "The clothes an actor wears to look like their character are called the:",
      ["props", "costume", "script", "set"],
      1,
      "A costume is the clothing an actor wears to portray their character.",
    ],
    [
      "The area where the actors perform in front of the audience is called the:",
      ["foyer", "parking lot", "stage", "kitchen"],
      2,
      "The stage is the area where actors perform in front of the audience.",
    ],
    [
      "The person an actor pretends to be in a play is called the:",
      ["director", "writer", "usher", "character"],
      3,
      "A character is the person (role) an actor pretends to be in a play.",
    ],
  ],
  "Dance Terms": [
    [
      "The art of creating and arranging the steps and movements of a dance is called:",
      ["choreography", "photography", "geography", "biography"],
      0,
      "Choreography is the art of creating and arranging a dance's steps and movements.",
    ],
    [
      "A person who creates the dance steps and movements is called a:",
      ["dancer", "choreographer", "singer", "painter"],
      1,
      "A choreographer is the person who creates and arranges the dance movements.",
    ],
    [
      "In dance, moving your body low to the floor, in the middle, or up high makes use of different:",
      ["colours", "words", "levels", "prices"],
      2,
      "Levels (low, medium, high) describe how high or low the body moves in the space.",
    ],
    [
      "The way dancers are arranged or positioned in the space, such as a line or a circle, is called the:",
      ["costume", "music", "lighting", "formation"],
      3,
      "A formation is the arrangement or pattern of dancers in the performance space.",
    ],
    [
      "A steady, repeated pattern of beats that dancers move to is called the:",
      ["rhythm", "painting", "script", "prop"],
      0,
      "Rhythm is the steady, repeated pattern of beats that dancers move in time with.",
    ],
    [
      "Warming up before dancing is important mainly because it:",
      ["wastes time", "helps prevent injury", "makes you too tired", "is only for fun"],
      1,
      "Warming up prepares the muscles and helps prevent injury.",
    ],
    [
      "A dance performed by a single dancer alone is called a:",
      ["duet", "group dance", "solo", "choir"],
      2,
      "A solo is a dance performed by one dancer alone.",
    ],
    [
      "A dance performed by exactly two dancers together is called a:",
      ["solo", "trio", "group dance", "duet"],
      3,
      "A duet is a dance performed by two dancers together.",
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
