// Seeds the Grade 9 Life Orientation question bank (6 topics x 8 questions).
// CAPS Senior Phase Life Orientation. Subject string "Life Orientation" matches
// the Senior Phase subject list in app/nexi-tutor/page.tsx.
// LO has no external NSC exam and much of it is reflective/values-based, so this
// bank is RESTRICTED to the objectively-checkable factual slice only —
// constitutional facts, civic facts, health/nutrition facts, disease/substance
// facts, study-skills definitions and world-of-work facts. No opinion or
// attitude questions (those are not pipeline-suitable / not blind-verifiable).
// Brand-new subject (no other grade has an LO bank), so no cross-grade
// distinctness constraint.
// Correct-answer positions spread evenly A-D per topic (engine shuffles question
// order, not option order). Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade9-lifeorientation.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Life Orientation";
const GRADE = "Grade 9";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "The Constitution & Bill of Rights": [
    [
      "The highest law in South Africa, which all other laws must obey, is the:",
      ["Constitution", "school rules", "by-laws", "newspaper"],
      0,
      "The Constitution is the supreme (highest) law of South Africa; all other laws must agree with it.",
    ],
    [
      "The part of the Constitution that lists the basic rights of everyone in South Africa is called the:",
      ["preamble", "Bill of Rights", "national anthem", "pledge"],
      1,
      "The Bill of Rights (Chapter 2 of the Constitution) sets out the basic human rights of all people in South Africa.",
    ],
    [
      "The right to be treated the same no matter your race, gender or religion is the right to:",
      ["privacy", "movement", "equality", "property"],
      2,
      "The right to equality means everyone must be treated equally and not be unfairly discriminated against.",
    ],
    [
      "Along with rights, every citizen also has ___, such as obeying the law and respecting others:",
      ["holidays", "salaries", "votes", "responsibilities"],
      3,
      "Rights come with responsibilities — for example obeying the law and respecting other people's rights.",
    ],
    [
      "Which of these is a basic human right protected in the Bill of Rights?",
      [
        "the right to basic education",
        "the right to break the law",
        "the right to avoid paying tax",
        "the right to harm others",
      ],
      0,
      "The right to basic education is protected in the Bill of Rights; the others are not rights.",
    ],
    [
      "South Africa is divided into how many provinces?",
      ["6", "9", "11", "4"],
      1,
      "South Africa has 9 provinces.",
    ],
    [
      "Government in South Africa has three spheres: national, provincial and ___:",
      ["foreign", "royal", "local", "private"],
      2,
      "The three spheres of government are national, provincial and local.",
    ],
    [
      "Human Rights Day in South Africa is celebrated on:",
      ["16 June", "27 April", "25 December", "21 March"],
      3,
      "Human Rights Day is on 21 March, remembering the Sharpeville events of 1960.",
    ],
  ],
  "Democracy & Active Citizenship": [
    [
      "A system of government in which the people choose their leaders by voting is called a:",
      ["democracy", "dictatorship", "monarchy", "anarchy"],
      0,
      "In a democracy the people choose their government and leaders by voting.",
    ],
    [
      "In South Africa, the minimum age at which a citizen may vote is:",
      ["16", "18", "21", "25"],
      1,
      "South African citizens may vote from the age of 18.",
    ],
    [
      "The process by which citizens choose their government representatives is called an:",
      ["auction", "census", "election", "audit"],
      2,
      "An election is the process of voting to choose government representatives.",
    ],
    [
      "South Africa's first democratic election, in which all adults could vote, took place in:",
      ["1976", "1990", "1986", "1994"],
      3,
      "South Africa's first fully democratic election was held in 1994.",
    ],
    [
      "Treating someone unfairly because of their race is called:",
      ["racism", "patriotism", "citizenship", "leadership"],
      0,
      "Racism is unfair treatment or prejudice against someone because of their race.",
    ],
    [
      "Treating someone unfairly because of their gender (being male or female) is called:",
      ["racism", "sexism", "ageism", "patriotism"],
      1,
      "Sexism is unfair treatment or prejudice against someone because of their sex/gender.",
    ],
    [
      "The unfair dislike or fear of people from other countries is called:",
      ["racism", "sexism", "xenophobia", "nationalism"],
      2,
      "Xenophobia is the unfair fear, dislike or hatred of people from other countries.",
    ],
    [
      "The African idea that 'a person is a person through other people', encouraging kindness and community, is called:",
      ["apartheid", "capitalism", "tourism", "ubuntu"],
      3,
      "Ubuntu is the African value of humanity and community — we are who we are through others.",
    ],
  ],
  "Healthy Lifestyle & Nutrition": [
    [
      "A diet that contains the correct amounts of all the food groups the body needs is called a ___ diet:",
      ["balanced", "fast-food", "sugary", "single-food"],
      0,
      "A balanced diet contains the right amounts of all the nutrients and food groups the body needs.",
    ],
    [
      "Which nutrient is the body's main source of energy?",
      ["vitamins", "carbohydrates", "minerals", "water"],
      1,
      "Carbohydrates (e.g. bread, rice, pap) are the body's main source of energy.",
    ],
    [
      "Which nutrient is needed mainly for the growth and repair of body tissues such as muscle?",
      ["fats", "sugar", "proteins", "fibre"],
      2,
      "Proteins (e.g. meat, eggs, beans) are needed for the growth and repair of body tissues.",
    ],
    [
      "Oranges and other citrus fruits are a good source of which vitamin?",
      ["vitamin D", "vitamin K", "vitamin B12", "vitamin C"],
      3,
      "Citrus fruits such as oranges are rich in vitamin C.",
    ],
    [
      "Regular physical exercise helps to:",
      [
        "keep the heart and body healthy",
        "weaken the muscles",
        "cause heart disease",
        "reduce overall fitness",
      ],
      0,
      "Regular exercise strengthens the heart and muscles and keeps the body healthy.",
    ],
    [
      "Drinking enough of which substance every day is essential for the body to work properly?",
      ["cooldrink", "water", "coffee", "alcohol"],
      1,
      "Water is essential every day; the body needs it for almost every process.",
    ],
    [
      "Regularly eating too much sugary and fatty food, with little exercise, can lead to:",
      ["stronger bones", "better eyesight", "obesity", "faster running"],
      2,
      "Too much fatty, sugary food with little exercise can lead to obesity and related health problems.",
    ],
    [
      "Which of these is the healthiest snack choice?",
      ["a chocolate bar", "a packet of chips", "a fizzy cooldrink", "a piece of fresh fruit"],
      3,
      "Fresh fruit is the healthiest snack of these options — it is low in added sugar and high in nutrients.",
    ],
  ],
  "Disease & Substance Abuse": [
    [
      "A disease that can spread from one person to another, such as flu or TB, is called a ___ disease:",
      ["communicable", "inherited", "lifestyle", "imaginary"],
      0,
      "A communicable (infectious) disease can be passed from one person to another.",
    ],
    [
      "A disease that is NOT spread from person to person, such as diabetes or heart disease, is called a ___ disease:",
      ["communicable", "non-communicable", "contagious", "infectious"],
      1,
      "A non-communicable disease cannot be passed between people; it is often linked to lifestyle or genetics.",
    ],
    [
      "HIV, the virus that can lead to AIDS, is mainly spread through:",
      [
        "shaking hands",
        "sharing food",
        "unprotected sex and infected blood",
        "breathing the same air",
      ],
      2,
      "HIV is mainly spread through unprotected sex and contact with infected blood — not through casual contact like shaking hands.",
    ],
    [
      "Alcohol and tobacco are examples of substances that are harmful but ___ for adults:",
      ["illegal", "imaginary", "banned", "legal"],
      3,
      "Alcohol and tobacco are legal for adults, even though they are harmful and addictive.",
    ],
    [
      "Pressure from friends to do something you may not want to do, such as smoking, is called:",
      ["peer pressure", "blood pressure", "air pressure", "water pressure"],
      0,
      "Peer pressure is the influence friends or people your age put on you to act in a certain way.",
    ],
    [
      "Which organ is most damaged by smoking tobacco?",
      ["the eyes", "the lungs", "the feet", "the hair"],
      1,
      "Smoking most damages the lungs and can cause lung disease and cancer.",
    ],
    [
      "The harmful and addictive drug found in cigarettes is:",
      ["vitamin C", "oxygen", "nicotine", "water"],
      2,
      "Nicotine is the addictive drug in cigarettes that makes smoking so hard to stop.",
    ],
    [
      "The healthiest way to respond to peer pressure to use drugs is to:",
      [
        "give in immediately",
        "keep it a secret from everyone",
        "always say yes",
        "confidently say no and walk away",
      ],
      3,
      "Confidently refusing and walking away is the healthiest, safest response to pressure to use drugs.",
    ],
  ],
  "Goal-Setting & Study Skills": [
    [
      "A clear aim that you plan and work towards achieving is called a:",
      ["goal", "habit", "hobby", "mistake"],
      0,
      "A goal is a clear aim or target that you plan and work towards.",
    ],
    [
      "In the SMART method of goal-setting, the 'M' stands for:",
      ["Magic", "Measurable", "Massive", "Maybe"],
      1,
      "In SMART goals the 'M' stands for Measurable — you can tell when the goal is reached.",
    ],
    [
      "A short-term goal is one that you aim to achieve:",
      ["over many years", "never", "in the near future", "only after school"],
      2,
      "A short-term goal is achieved soon (in the near future), unlike a long-term goal.",
    ],
    [
      "Planning how you use your hours so that you finish your work on time is called ___ management:",
      ["money", "anger", "stress", "time"],
      3,
      "Time management is planning and organising how you use your time to get work done.",
    ],
    [
      "A diagram with a central idea and branches, used to organise information for studying, is called a:",
      ["mind map", "time sheet", "bar graph", "menu"],
      0,
      "A mind map organises information around a central idea with branches, which helps with studying.",
    ],
    [
      "Which is the best study habit before an exam?",
      [
        "never sleeping the night before",
        "studying a little, regularly, over time",
        "copying from a friend",
        "skipping all your classes",
      ],
      1,
      "Studying regularly in small amounts over time (not cramming) is the most effective study habit.",
    ],
    [
      "In SMART goals, the 'T' stands for:",
      ["Tiny", "Tough", "Time-bound", "Tired"],
      2,
      "In SMART goals the 'T' stands for Time-bound — the goal has a deadline.",
    ],
    [
      "A goal that you aim to achieve over a long period, such as becoming a doctor, is a ___ goal:",
      ["short-term", "daily", "weekly", "long-term"],
      3,
      "A long-term goal is achieved over a long period, such as completing your education and a career.",
    ],
  ],
  "The World of Work & Careers": [
    [
      "A job or profession that a person trains for and does over a long period is called a:",
      ["career", "holiday", "hobby", "weekend"],
      0,
      "A career is the work or profession a person trains for and follows over a long time.",
    ],
    [
      "A document that lists your personal details, education and skills when you apply for a job is called a:",
      ["passport", "CV (curriculum vitae)", "receipt", "timetable"],
      1,
      "A CV (curriculum vitae) summarises your details, education and skills for a job application.",
    ],
    [
      "Workers who are registered, pay tax and have job protection work in the ___ sector:",
      ["hidden", "illegal", "formal", "secret"],
      2,
      "The formal sector is made up of registered, taxed jobs with legal protection and benefits.",
    ],
    [
      "Someone who starts and runs their own business, taking on its risks, is called an:",
      ["employee", "customer", "manager", "entrepreneur"],
      3,
      "An entrepreneur starts and runs their own business and takes on the risks of doing so.",
    ],
    [
      "A person who studies and treats sick people works in which career field?",
      ["the health/medical field", "engineering", "farming", "law"],
      0,
      "Doctors and nurses, who treat sick people, work in the health/medical field.",
    ],
    [
      "Subjects like Mathematics and Physical Sciences are usually required to become an:",
      ["artist", "engineer", "chef", "musician"],
      1,
      "Mathematics and Physical Sciences are usually required to study engineering.",
    ],
    [
      "Money earned from doing work, usually paid each month, is called a:",
      ["fine", "debt", "salary", "loan"],
      2,
      "A salary is the money earned for work, usually paid monthly.",
    ],
    [
      "The main reason it is important to choose your school subjects carefully in Grade 9 is that:",
      [
        "subjects have interesting names",
        "teachers prefer it",
        "it fills up the timetable",
        "they affect the careers you can follow later",
      ],
      3,
      "Your Grade 9 subject choices affect which careers and courses you can follow after school, so they matter.",
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
