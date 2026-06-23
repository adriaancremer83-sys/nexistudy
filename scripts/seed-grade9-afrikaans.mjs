// Seeds the Grade 9 Afrikaans (taalstrukture) question bank (6 topics x 8).
// CAPS Senior Phase, TAALSTRUKTURE / language conventions ONLY (grammar) —
// never literature/comprehension (interpretive, not pipeline-suitable).
// Subject string "Afrikaans" matches the Gr10/Gr11/Gr12 Afrikaans banks so the
// four grades group together under one subject on /practice.
// Six topics chosen to be DISTINCT from the Gr10/Gr11/Gr12 Afrikaans banks:
//   Gr12 = Woordsoorte, Meervoude & Verkleinwoorde, Intensiewe Vorme,
//          Lydende & Bedrywende Vorm, Direkte & Indirekte Rede, Ontkenning
//   Gr11 = Sinsbou, Sinonieme & Antonieme, Voorvoegsels & Agtervoegsels,
//          Idiome & Spreekwoorde, Trappe van Vergelyking, Tye
//   Gr10 = Lidwoorde & Voornaamwoorde, Voorsetsels, Voegwoorde,
//          Spelling/Hoofletters & Afkortings, Sinsoorte, Byvoeglike
//          Naamwoorde & Bywoorde
//   Gr9 (this bank) = Soorte Selfstandige Naamwoorde, Telwoorde, Geslag
//          (Manlik & Vroulik), Modale Hulpwerkwoorde, Vraagwoorde, Die
//          Afkappingsteken — none reused from the other grades.
// Pitched at Grade 9 level (basic, foundational taalstrukture).
// NB blind-verify must use an AFRIKAANS-PROMPTED fresh-context subagent (the
// blind-solve gate is weaker for an English-defaulting solver).
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but NOT option order). Options must not differ only
// by capitalisation (case-insensitive dedupe in lint-bank.mjs).
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade9-afrikaans.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Afrikaans";
const GRADE = "Grade 9";

// q: [prompt, [4 opsies], korrekteIndeks, verduideliking]
const bank = {
  "Soorte Selfstandige Naamwoorde": [
    [
      "'n Woord wat 'n mens, dier, plek of ding benoem, is 'n:",
      ["selfstandige naamwoord", "werkwoord", "byvoeglike naamwoord", "bywoord"],
      0,
      "'n Selfstandige naamwoord is 'n naamwoord — dit benoem 'n mens, dier, plek of ding.",
    ],
    [
      "Watter woord is 'n soortnaam (gewone naam)?",
      ["Pretoria", "hond", "Piet", "Maandag"],
      1,
      "'n Soortnaam benoem 'n gewone, alledaagse ding; 'hond' is 'n soortnaam, terwyl Pretoria, Piet en Maandag eiename is.",
    ],
    [
      "Watter woord is 'n eienaam en begin altyd met 'n hoofletter?",
      ["stad", "rivier", "Kaapstad", "berg"],
      2,
      "'n Eienaam benoem 'n spesifieke plek of mens; 'Kaapstad' is 'n eienaam, anders as die gewone woorde stad, rivier en berg.",
    ],
    [
      "Watter woord is 'n versamelnaam?",
      ["speler", "bal", "veld", "span"],
      3,
      "'n Versamelnaam benoem 'n groep as 'n eenheid; 'n 'span' is 'n groep spelers.",
    ],
    [
      "Die versamelnaam vir 'n groep skape is 'n:",
      ["trop", "swerm", "vlug", "skool"],
      0,
      "'n Mens praat van 'n 'trop' skape. ('n swerm bye, 'n vlug voëls, 'n skool visse.)",
    ],
    [
      "Die versamelnaam vir 'n groep bye is 'n:",
      ["trop", "swerm", "kudde", "vlug"],
      1,
      "'n Mens praat van 'n 'swerm' bye. ('n kudde beeste, 'n vlug voëls.)",
    ],
    [
      "Watter woord is 'n eienaam?",
      ["onderwyser", "land", "Afrika", "skool"],
      2,
      "'Afrika' is die naam van 'n spesifieke plek, daarom is dit 'n eienaam wat altyd 'n hoofletter kry.",
    ],
    [
      "'n Abstrakte naamwoord benoem iets wat 'n mens nie kan sien of aanraak nie, soos 'n gevoel. Watter woord is 'n abstrakte naamwoord?",
      ["tafel", "stoel", "hond", "liefde"],
      3,
      "'n Abstrakte naamwoord benoem 'n gedagte of gevoel; 'liefde' kan nie aangeraak of gesien word nie, anders as 'n tafel, stoel of hond.",
    ],
  ],
  "Telwoorde": [
    [
      "Woorde wat getalle of hoeveelheid aandui, soos 'drie' en 'tweede', word ___ genoem:",
      ["telwoorde", "werkwoorde", "voorsetsels", "lidwoorde"],
      0,
      "Telwoorde dui getalle of hoeveelheid aan — hooftelwoorde (een, twee) en rangtelwoorde (eerste, tweede).",
    ],
    [
      "'n Hooftelwoord dui 'n hoeveelheid aan. Watter een is 'n hooftelwoord?",
      ["eerste", "vyf", "tweede", "laaste"],
      1,
      "'Vyf' is 'n hooftelwoord — dit dui 'n hoeveelheid aan; eerste en tweede is rangtelwoorde.",
    ],
    [
      "'n Rangtelwoord dui orde of volgorde aan. Watter een is 'n rangtelwoord?",
      ["tien", "sewe", "derde", "baie"],
      2,
      "'Derde' is 'n rangtelwoord — dit dui volgorde aan; tien en sewe is hooftelwoorde.",
    ],
    [
      "Die rangtelwoord vir die getal 3 is:",
      ["drie", "drietal", "derduisend", "derde"],
      3,
      "Die rangtelwoord (volgorde) vir 3 is 'derde'; 'drie' is die hooftelwoord.",
    ],
    [
      "Skryf die hooftelwoord vir die syfer 7:",
      ["sewe", "sewende", "sewental", "sewes"],
      0,
      "Die hooftelwoord vir 7 is 'sewe'; 'sewende' is die rangtelwoord.",
    ],
    [
      "Skryf die rangtelwoord vir die syfer 2:",
      ["twee", "tweede", "tweetal", "twees"],
      1,
      "Die rangtelwoord (volgorde) vir 2 is 'tweede'; 'twee' is die hooftelwoord.",
    ],
    [
      "Hoe skryf 'n mens die getal 12 in woorde?",
      ["tien", "elf", "twaalf", "dertien"],
      2,
      "Die getal 12 word as 'twaalf' geskryf.",
    ],
    [
      "Watter een van die volgende is 'n rangtelwoord?",
      ["agt", "ses", "nege", "vierde"],
      3,
      "'Vierde' is 'n rangtelwoord (volgorde); agt, ses en nege is hooftelwoorde.",
    ],
  ],
  "Geslag (Manlik & Vroulik)": [
    [
      "Die vroulike vorm van 'koning' is:",
      ["koningin", "prinses", "hertogin", "keiserin"],
      0,
      "Die vroulike vorm van koning is 'koningin'.",
    ],
    [
      "Die vroulike vorm van 'man' is:",
      ["tannie", "vrou", "meisie", "dame"],
      1,
      "Die vroulike teenoorgestelde van man is 'vrou'.",
    ],
    [
      "Die manlike vorm van 'koei' is:",
      ["kalf", "os", "bul", "perd"],
      2,
      "Die manlike vorm van koei is 'bul'. ('n Os is 'n gesnyde bul; 'n kalf is 'n jong dier.)",
    ],
    [
      "Die vroulike vorm van 'haan' is:",
      ["eend", "gans", "kuiken", "hen"],
      3,
      "Die vroulike vorm van haan is 'hen'.",
    ],
    [
      "Die vroulike vorm van 'oom' is:",
      ["tante", "ouma", "suster", "niggie"],
      0,
      "Die vroulike vorm van oom is 'tante'.",
    ],
    [
      "Die manlike vorm van 'merrie' is:",
      ["vul", "hings", "esel", "bul"],
      1,
      "Die manlike vorm van merrie (vroulike perd) is 'hings'.",
    ],
    [
      "Die vroulike vorm van 'neef' is:",
      ["tante", "suster", "niggie", "dogter"],
      2,
      "Die vroulike vorm van neef is 'niggie'.",
    ],
    [
      "Die manlike vorm van 'ooi' is:",
      ["lam", "bok", "kalf", "ram"],
      3,
      "Die manlike vorm van ooi (vroulike skaap) is 'ram'.",
    ],
  ],
  "Modale Hulpwerkwoorde": [
    [
      "Werkwoorde soos 'kan', 'moet' en 'mag', wat saam met 'n hoofwerkwoord gebruik word, word ___ genoem:",
      ["modale hulpwerkwoorde", "selfstandige naamwoorde", "byvoeglike naamwoorde", "voorsetsels"],
      0,
      "Modale hulpwerkwoorde (kan, mag, moet, sal, wil) werk saam met 'n hoofwerkwoord om vermoë, toestemming, verpligting of moontlikheid aan te dui.",
    ],
    [
      "Kies die beste modale werkwoord: 'Jy ___ jou gordel dra; dit is die wet.'",
      ["mag", "moet", "kan", "wil"],
      1,
      "'Moet' dui 'n sterk verpligting aan, wat by 'n wet pas.",
    ],
    [
      "Watter modale werkwoord dui vermoë aan? 'Sy ___ baie goed swem.'",
      ["moet", "wil", "kan", "mag"],
      2,
      "'Kan' dui vermoë aan — sy is in staat om goed te swem.",
    ],
    [
      "Kies die beste woord om beleefd toestemming te vra: '___ ek asseblief jou pen leen?'",
      ["Moet", "Sal", "Wil", "Mag"],
      3,
      "'Mag' word gebruik om beleefd toestemming te vra.",
    ],
    [
      "Kies die beste modale werkwoord om 'n aanbod te maak: 'Ek ___ jou help dra as jy wil.'",
      ["sal", "moet", "mag", "kan"],
      0,
      "'Sal' word hier gebruik om hulp aan te bied en bereidwilligheid te wys.",
    ],
    [
      "Watter modale werkwoord dui 'n wens of begeerte aan? 'Ek ___ graag eendag 'n dokter word.'",
      ["kan", "wil", "mag", "moet"],
      1,
      "'Wil' dui 'n wens of begeerte aan.",
    ],
    [
      "Identifiseer die modale hulpwerkwoord in die sin: 'Leerders moet hul skooldrag dra.'",
      ["Leerders", "dra", "moet", "skooldrag"],
      2,
      "'Moet' is die modale hulpwerkwoord; dit help die hoofwerkwoord 'dra' en dui verpligting aan.",
    ],
    [
      "Kies die beste modale werkwoord om moontlikheid aan te dui: 'Dit ___ later reën.'",
      ["moet", "wil", "sal", "kan"],
      3,
      "'Kan' dui moontlikheid aan — dit is moontlik dat dit later sal reën.",
    ],
  ],
  "Vraagwoorde": [
    [
      "Woorde soos 'wie', 'wat' en 'waar' wat 'n vraag begin, word ___ genoem:",
      ["vraagwoorde", "voegwoorde", "lidwoorde", "telwoorde"],
      0,
      "Vraagwoorde (wie, wat, waar, wanneer, hoekom, hoe) begin 'n vraagsin.",
    ],
    [
      "Watter vraagwoord vra na 'n persoon? '___ het die venster gebreek?'",
      ["Wat", "Wie", "Waar", "Wanneer"],
      1,
      "'Wie' vra na 'n persoon.",
    ],
    [
      "Watter vraagwoord vra na 'n plek? '___ woon jy?'",
      ["Wie", "Wat", "Waar", "Hoekom"],
      2,
      "'Waar' vra na 'n plek.",
    ],
    [
      "Watter vraagwoord vra na 'n tyd? '___ begin die fliek?'",
      ["Waar", "Wie", "Hoe", "Wanneer"],
      3,
      "'Wanneer' vra na 'n tyd.",
    ],
    [
      "Watter vraagwoord vra na 'n rede? '___ is jy laat?'",
      ["Hoekom", "Wat", "Wie", "Waar"],
      0,
      "'Hoekom' (of waarom) vra na 'n rede.",
    ],
    [
      "Watter vraagwoord vra na 'n manier of wyse? '___ het jy dit reggekry?'",
      ["Waar", "Hoe", "Wie", "Wanneer"],
      1,
      "'Hoe' vra na die manier of wyse waarop iets gedoen is.",
    ],
    [
      "Watter vraagwoord vra na 'n hoeveelheid? '___ koek het ons nog oor?'",
      ["Wie", "Wat", "Hoeveel", "Waar"],
      2,
      "'Hoeveel' vra na 'n hoeveelheid of getal.",
    ],
    [
      "'n Vraagsin eindig altyd met 'n:",
      ["punt", "komma", "uitroepteken", "vraagteken"],
      3,
      "'n Vraagsin eindig met 'n vraagteken (?).",
    ],
  ],
  "Die Afkappingsteken": [
    [
      "Die meervoud van 'ma' word geskryf as:",
      ["ma's", "mas", "maas", "ma'e"],
      0,
      "Woorde wat op 'n enkelklinker eindig, kry 's in die meervoud: ma → ma's.",
    ],
    [
      "Die meervoud van 'foto' word geskryf as:",
      ["fotos", "foto's", "fotoe", "foto'e"],
      1,
      "Woorde wat op 'n klinker eindig, kry 's in die meervoud: foto → foto's.",
    ],
    [
      "Die afkappingsteken in 'ma's' wys dat:",
      [
        "die woord 'n eienaam is",
        "die woord 'n werkwoord is",
        "dit die meervoud van 'n woord op 'n klinker is",
        "die sin geëindig het",
      ],
      2,
      "Die afkappingsteken in 'ma's' dui die meervoud aan van 'n woord wat op 'n klinker eindig.",
    ],
    [
      "Die onbepaalde lidwoord wat met 'n afkappingsteken geskryf word, is:",
      ["die", "en", "hy", "'n"],
      3,
      "Die onbepaalde lidwoord ''n' word met 'n afkappingsteken geskryf.",
    ],
    [
      "Die meervoud van 'baba' word geskryf as:",
      ["baba's", "babas", "babaas", "baba'e"],
      0,
      "Woorde wat op 'n klinker eindig, kry 's in die meervoud: baba → baba's.",
    ],
    [
      "'Hy het' kan verkort word na:",
      ["hyt", "hy't", "hy'et", "het hy"],
      1,
      "Die afkappingsteken dui weggelate letters aan: 'hy het' word 'hy't'.",
    ],
    [
      "Watter woord is korrek met die afkappingsteken geskryf?",
      ["taxis", "taxi'e", "taxi's", "taxiis"],
      2,
      "Die meervoud van 'taxi' (eindig op 'n klinker) is 'taxi's'.",
    ],
    [
      "Die afkappingsteken word NIE gebruik om ___ aan te dui nie:",
      [
        "die meervoud van 'ma'",
        "die onbepaalde lidwoord ''n'",
        "die weglating van letters",
        "die einde van 'n sin",
      ],
      3,
      "Die afkappingsteken dui meervoude (ma's), die lidwoord ''n' en weggelate letters (hy't) aan — nie die einde van 'n sin nie (dit is die punt se werk).",
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
