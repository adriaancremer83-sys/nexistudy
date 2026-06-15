// Seeds the Grade 11 Afrikaans question bank (6 topics x 8 questions).
// TAALSTRUKTURE EN -KONVENSIES ONLY — sinsbou, sinonieme/antonieme, voor- en
// agtervoegsels, idiome/spreekwoorde, trappe van vergelyking, tye. No
// literature/essay/interpretive questions. CAPS-aligned for HL and FAL.
// Topics + questions are DISTINCT from the Grade 12 Afrikaans bank.
// All forms checked against standard Afrikaans school grammar (AWS conventions).
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but NOT option order).
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade11-afrikaans.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Afrikaans";
const GRADE = "Grade 11";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Sinsbou: Sinsdele & Sinsoorte": [
    [
      "In die sin \"Die seun skop die bal\" is die onderwerp:",
      ["Die seun", "skop", "die bal", "skop die bal"],
      0,
      "Die onderwerp is die persoon of ding wat die handeling van die werkwoord uitvoer — hier doen \"die seun\" die skop.",
    ],
    [
      "'n Sin wat net een hoofsin bevat en een volledige gedagte uitdruk, word 'n ___ genoem.",
      ["saamgestelde sin", "enkelvoudige sin", "veelvoudige sin", "bysin"],
      1,
      "'n Enkelvoudige sin het net een hoofsin met een onderwerp en gesegde wat een volledige gedagte uitdruk.",
    ],
    [
      "\"Ek wou speel, maar dit het gereën.\" Hierdie sin bestaan uit:",
      ["een hoofsin", "een bysin", "twee hoofsinne", "geen werkwoord nie"],
      2,
      "Die sin verbind twee hoofsinne van gelyke waarde met die neweskikkende voegwoord \"maar\"; elke deel kan op sy eie staan.",
    ],
    [
      "In die sin \"Sy lees die boek\" is \"die boek\" die:",
      ["onderwerp", "werkwoord", "bywoord", "voorwerp"],
      3,
      "Die voorwerp ontvang die handeling van die werkwoord — dit wat gelees word, is \"die boek\".",
    ],
    [
      "In die sin \"Die kinders speel buite\" is die gesegde (werkwoord):",
      ["speel", "Die kinders", "buite", "kinders"],
      0,
      "Die gesegde is die werkwoord wat sê wat die onderwerp doen — hier \"speel\".",
    ],
    [
      "'n Groep woorde met 'n onderwerp en 'n werkwoord wat NIE alleen kan staan nie, word 'n ___ genoem.",
      ["hoofsin", "bysin", "voorsetsel", "naamwoord"],
      1,
      "'n Bysin het 'n onderwerp en werkwoord, maar kan nie alleen staan nie — dit hang van die hoofsin af.",
    ],
    [
      "\"Omdat sy moeg was, het sy gaan slaap.\" Die woorde \"Omdat sy moeg was\" vorm 'n:",
      ["hoofsin", "volledige sin", "bysin", "frase sonder werkwoord"],
      2,
      "\"Omdat sy moeg was\" kan nie alleen staan nie en hang van die hoofsin af, dus is dit 'n bysin.",
    ],
    [
      "\"Toe die klok lui, het die leerders uitgehardloop.\" Hierdie sin bestaan uit:",
      ["net een hoofsin", "twee gelyke hoofsinne", "net 'n frase", "'n hoofsin en 'n bysin"],
      3,
      "Die sin het 'n hoofsin (\"het die leerders uitgehardloop\") en 'n bysin (\"Toe die klok lui\") wat met die onderskikkende voegwoord \"toe\" begin.",
    ],
  ],
  "Sinonieme & Antonieme": [
    [
      "Watter woord is 'n SINONIEM (naaste in betekenis) vir \"bly\"?",
      ["gelukkig", "kwaad", "moeg", "honger"],
      0,
      "'n Sinoniem het 'n soortgelyke betekenis — \"gelukkig\" beteken min of meer dieselfde as \"bly\".",
    ],
    [
      "Watter woord is 'n ANTONIEM (teenoorgestelde) van \"oud\"?",
      ["bejaard", "jonk", "antiek", "grys"],
      1,
      "'n Antoniem het die teenoorgestelde betekenis — die teenoorgestelde van \"oud\" is \"jonk\".",
    ],
    [
      "Watter woord is 'n SINONIEM vir \"begin\"?",
      ["eindig", "ophou", "aanvang", "stop"],
      2,
      "\"Aanvang\" beteken dieselfde as \"begin\"; die ander is antonieme daarvan.",
    ],
    [
      "Watter woord is 'n ANTONIEM van \"vinnig\"?",
      ["rats", "haastig", "blitsig", "stadig"],
      3,
      "Die teenoorgestelde van \"vinnig\" is \"stadig\".",
    ],
    [
      "Watter woord is 'n SINONIEM vir \"mooi\"?",
      ["pragtig", "lelik", "vuil", "stukkend"],
      0,
      "\"Pragtig\" is 'n sinoniem vir \"mooi\"; \"lelik\" is die antoniem.",
    ],
    [
      "Watter woord is 'n ANTONIEM van \"ryk\"?",
      ["welgesteld", "arm", "vermoënd", "gegoed"],
      1,
      "Die teenoorgestelde van \"ryk\" is \"arm\"; die ander is sinonieme van ryk.",
    ],
    [
      "Watter woord is 'n SINONIEM vir \"dapper\"?",
      ["bang", "lafhartig", "moedig", "skrikkerig"],
      2,
      "\"Moedig\" beteken dieselfde as \"dapper\"; \"bang\", \"lafhartig\" en \"skrikkerig\" is antonieme.",
    ],
    [
      "Watter woord is 'n ANTONIEM van \"oop\"?",
      ["wyd", "los", "ruim", "toe"],
      3,
      "Die teenoorgestelde van \"oop\" is \"toe\" (gesluit).",
    ],
  ],
  "Voorvoegsels & Agtervoegsels": [
    [
      "Die voorvoegsel \"her-\" in die woord \"herskryf\" beteken:",
      ["weer / opnuut", "nie", "voor", "verkeerd"],
      0,
      "Die voorvoegsel \"her-\" beteken \"weer\" of \"opnuut\", dus beteken \"herskryf\" om weer te skryf.",
    ],
    [
      "Die voorvoegsel \"on-\" in die woord \"ongelukkig\" beteken:",
      ["baie gelukkig", "nie (die teenoorgestelde)", "weer gelukkig", "voor gelukkig"],
      1,
      "Die voorvoegsel \"on-\" dui die teenoorgestelde aan (\"nie\"), dus beteken \"ongelukkig\" \"nie gelukkig nie\".",
    ],
    [
      "Die agtervoegsel \"-loos\" in die woord \"werkloos\" beteken:",
      ["vol van", "weer", "sonder", "voor"],
      2,
      "Die agtervoegsel \"-loos\" beteken \"sonder\", dus beteken \"werkloos\" \"sonder werk\".",
    ],
    [
      "Watter agtervoegsel maak van die byvoeglike naamwoord \"mooi\" die selfstandige naamwoord \"mooiheid\"?",
      ["-loos", "-skap", "-ig", "-heid"],
      3,
      "Die agtervoegsel \"-heid\" vorm selfstandige naamwoorde (mooi → mooiheid, waar → waarheid).",
    ],
    [
      "Die voorvoegsel \"wan-\" in die woord \"wanhoop\" dui aan dat iets:",
      ["sleg / verkeerd / 'n gebrek is", "weer gebeur", "voor plaasvind", "baie goed is"],
      0,
      "Die voorvoegsel \"wan-\" dra 'n negatiewe of gebrekkige betekenis — \"wanhoop\" is 'n gebrek aan hoop.",
    ],
    [
      "Die agtervoegsel \"-skap\" in die woord \"vriendskap\" vorm 'n:",
      ["werkwoord", "selfstandige naamwoord", "bywoord", "voorsetsel"],
      1,
      "Die agtervoegsel \"-skap\" vorm selfstandige naamwoorde wat 'n toestand of verhouding aandui (vriend → vriendskap).",
    ],
    [
      "Die voorvoegsel \"ver-\" in die woord \"vergroot\" dui aan dat die voorwerp:",
      ["kleiner gemaak word", "weggegooi word", "groter gemaak word", "weer gemaak word"],
      2,
      "\"Vergroot\" beteken om groter te maak; die voorvoegsel \"ver-\" dui hier 'n verandering of proses aan.",
    ],
    [
      "As 'n mens \"-jie\", \"-tjie\" of \"-pie\" agter 'n woord voeg, maak jy 'n:",
      ["meervoud", "werkwoord", "bywoord", "verkleinwoord"],
      3,
      "Die agtervoegsels -jie / -tjie / -pie ens. vorm verkleinwoorde (hond → hondjie, boom → boompie).",
    ],
  ],
  "Idiome & Spreekwoorde": [
    [
      "Die idioom \"om die spyker op die kop te slaan\" beteken om:",
      ["presies reg te wees / die kern van die saak raak te sê", "hard te werk met 'n hamer", "'n fout te maak", "iemand seer te maak"],
      0,
      "\"Om die spyker op die kop te slaan\" beteken om presies reg te wees of die kern van die saak raak te sê.",
    ],
    [
      "Die idioom \"om die hasepad te kies\" beteken om:",
      ["stadig te loop", "weg te hardloop / te vlug", "'n haas te vang", "'n pad te bou"],
      1,
      "\"Om die hasepad te kies\" beteken om weg te hardloop of te vlug.",
    ],
    [
      "Die idioom \"om twee vlieë met een klap te slaan\" beteken om:",
      ["baie kwaad te wees", "insekte dood te maak", "twee dinge gelyktydig met een handeling reg te kry", "twee keer te misluk"],
      2,
      "\"Om twee vlieë met een klap te slaan\" beteken om twee doelwitte met een handeling te bereik.",
    ],
    [
      "Die spreekwoord \"Haastige hond verbrand sy mond\" waarsku 'n mens om nie:",
      ["honde te voer nie", "warm kos te eet nie", "vir honde bang te wees nie", "te haastig of onverantwoordelik op te tree nie"],
      3,
      "Die spreekwoord waarsku dat oorhaastigheid tot foute of nadeel lei — 'n mens moet eers dink voordat jy optree.",
    ],
    [
      "Die idioom \"om 'n appeltjie met iemand te skil\" beteken om:",
      ["'n meningsverskil met iemand uit te stryk / iemand oor iets aan te spreek", "vrugte te eet", "kos te maak", "iemand te help"],
      0,
      "\"Om 'n appeltjie met iemand te skil\" beteken om 'n geskil met iemand reg te maak of iemand oor iets aan te spreek.",
    ],
    [
      "Die idioom \"om in die sewende hemel te wees\" beteken om:",
      ["baie hartseer te wees", "baie gelukkig of in vervoering te wees", "hoog te vlieg", "in die kerk te wees"],
      1,
      "\"Om in die sewende hemel te wees\" beteken om uiters gelukkig of in 'n toestand van groot vreugde te wees.",
    ],
    [
      "Die spreekwoord \"'n Appel val nie ver van die boom nie\" beteken dat:",
      ["appels swaar is", "bome naby mekaar groei", "kinders dikwels soos hul ouers is", "vrugte vinnig val"],
      2,
      "Die spreekwoord beteken dat kinders gewoonlik baie van hul ouers se eienskappe of gewoontes vertoon.",
    ],
    [
      "Die idioom \"om die kat in die sak te koop\" beteken om:",
      ["'n troeteldier aan te skaf", "geld te mors", "'n kat weg te gee", "iets te koop sonder om dit eers te ondersoek (en bedroë daarvan af te kom)"],
      3,
      "\"Om die kat in die sak te koop\" beteken om iets te aanvaar sonder om dit eers te ondersoek, en dan bedroë daarvan af te kom.",
    ],
  ],
  "Trappe van Vergelyking": [
    [
      "Die vergrotende trap van \"groot\" is:",
      ["groter", "meer groot", "grootste", "die allergrootste"],
      0,
      "\"Groot\" vorm die vergrotende trap met \"-er\": groot → groter (en die oortreffende trap is \"grootste\").",
    ],
    [
      "Die oortreffende trap van \"goed\" is:",
      ["goeder", "beste", "goedste", "meer goed"],
      1,
      "\"Goed\" is onreëlmatig: die vergrotende trap is \"beter\" en die oortreffende trap is \"beste\".",
    ],
    [
      "Die vergrotende trap van \"min\" is:",
      ["minste", "minner", "minder", "meer min"],
      2,
      "\"Min\" is onreëlmatig: die vergrotende trap is \"minder\" en die oortreffende trap is \"minste\".",
    ],
    [
      "Die vergrotende trap van \"baie\" is:",
      ["baier", "baiste", "meeste", "meer"],
      3,
      "\"Baie\" is onreëlmatig: die vergrotende trap is \"meer\" en die oortreffende trap is \"meeste\".",
    ],
    [
      "Kies die korrekte sin: \"Van die drie seuns is Pieter die ___.\"",
      ["langste", "langer", "meer lank", "mees lank"],
      0,
      "Wanneer drie of meer vergelyk word, gebruik 'n mens die oortreffende trap — vir \"lank\" is dit \"langste\".",
    ],
    [
      "Die oortreffende trap van \"interessant\" is:",
      ["interessanter", "die interessantste / mees interessante", "interessantts", "meer interessant"],
      1,
      "Langer woorde vorm die oortreffende trap met die \"-ste\"-uitgang of \"mees\": die interessantste / mees interessante.",
    ],
    [
      "Kies die korrekte sin:",
      [
        "My boek is goeder as joune.",
        "My boek is meer goed as joune.",
        "My boek is beter as joune.",
        "My boek is die beterste as joune.",
      ],
      2,
      "\"Goed\" se vergrotende trap is \"beter\" (nie \"goeder\" of \"meer goed\" nie): My boek is beter as joune.",
    ],
    [
      "Die oortreffende trap van \"oud\" is:",
      ["ouer", "meer oud", "die ouer", "oudste"],
      3,
      "\"Oud\" vorm die trappe so: oud → ouer → oudste, dus is die oortreffende trap \"oudste\".",
    ],
  ],
  "Tye (Teenwoordige, Verlede & Toekomende Tyd)": [
    [
      "\"Ek loop skool toe.\" In die VERLEDE TYD word dit:",
      [
        "Ek het skool toe geloop.",
        "Ek sal skool toe loop.",
        "Ek loop nou skool toe.",
        "Ek geloop skool toe.",
      ],
      0,
      "Die verlede tyd word gevorm met \"het\" + \"ge-\" by die werkwoord: Ek het skool toe geloop.",
    ],
    [
      "\"Sy speel klavier.\" In die TOEKOMENDE TYD word dit:",
      [
        "Sy het klavier gespeel.",
        "Sy sal klavier speel.",
        "Sy speel nou klavier.",
        "Sy speel gister klavier.",
      ],
      1,
      "Die toekomende tyd word gevorm met die hulpwerkwoord \"sal\" + die werkwoord: Sy sal klavier speel.",
    ],
    [
      "\"Hy het die wedstryd gewen.\" Hierdie sin is in die:",
      ["teenwoordige tyd", "toekomende tyd", "verlede tyd", "bevelsvorm"],
      2,
      "Die \"het ... ge-\"-konstruksie dui die verlede tyd aan: Hy het die wedstryd gewen.",
    ],
    [
      "\"Ons sal môre swem.\" Hierdie sin is in die:",
      ["verlede tyd", "teenwoordige tyd", "bevelsvorm", "toekomende tyd"],
      3,
      "Die hulpwerkwoord \"sal\" dui die toekomende tyd aan: Ons sal môre swem.",
    ],
    [
      "\"Die kinders eet kos.\" In die VERLEDE TYD word dit:",
      [
        "Die kinders het kos geëet.",
        "Die kinders sal kos eet.",
        "Die kinders eet nou kos.",
        "Die kinders eet kos geword.",
      ],
      0,
      "Die verlede tyd word gevorm met \"het\" + \"ge-\": Die kinders het kos geëet.",
    ],
    [
      "Watter sin is in die TEENWOORDIGE TYD?",
      ["Ek het gewerk.", "Ek werk hard.", "Ek sal werk.", "Ek het gaan werk."],
      1,
      "Die teenwoordige tyd beskryf wat nou gebeur, sonder \"het ... ge-\" of \"sal\": Ek werk hard.",
    ],
    [
      "\"Ma maak die kos.\" In die VERLEDE TYD word dit:",
      [
        "Ma sal die kos maak.",
        "Ma maak nou die kos.",
        "Ma het die kos gemaak.",
        "Ma maak die kos gewees.",
      ],
      2,
      "Die verlede tyd word gevorm met \"het\" + \"ge-\": Ma het die kos gemaak.",
    ],
    [
      "\"Hy het 'n boek gekoop.\" In die TOEKOMENDE TYD word dit:",
      [
        "Hy koop 'n boek.",
        "Hy het gister 'n boek gekoop.",
        "Hy koop nou 'n boek.",
        "Hy sal 'n boek koop.",
      ],
      3,
      "Die toekomende tyd word met die hulpwerkwoord \"sal\" gevorm: Hy sal 'n boek koop.",
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
