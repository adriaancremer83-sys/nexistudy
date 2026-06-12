// Seeds the Grade 12 Afrikaans question bank (6 topics x 8 questions).
// TAALSTRUKTURE EN -KONVENSIES ONLY — woordsoorte, meervoude/verkleinwoorde,
// intensiewe vorme, lydende/bedrywende vorm, direkte/indirekte rede, ontkenning.
// No literature/essay/interpretive questions. CAPS-aligned for HL and FAL.
// All forms checked against standard Afrikaans school grammar (AWS conventions).
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade12-afrikaans.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Afrikaans";
const GRADE = "Grade 12";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Woordsoorte": [
    [
      "In die sin \"Die hond blaf hard\" is die woord \"hard\" 'n:",
      ["selfstandige naamwoord", "bywoord", "byvoeglike naamwoord", "werkwoord"],
      1,
      "\"Hard\" sê vir ons hóé die hond blaf — dit beskryf die werkwoord, dus is dit 'n bywoord.",
    ],
    [
      "In die sin \"Sy koop 'n pragtige rok\" is die woord \"pragtige\" 'n:",
      ["werkwoord", "bywoord", "voornaamwoord", "byvoeglike naamwoord"],
      3,
      "\"Pragtige\" beskryf die selfstandige naamwoord \"rok\", dus is dit 'n byvoeglike naamwoord.",
    ],
    [
      "In die sin \"Hulle wag by die stasie\" is die woord \"by\" 'n:",
      ["voorsetsel", "voegwoord", "lidwoord", "tussenwerpsel"],
      0,
      "\"By\" dui die plekverhouding tussen die werkwoord en \"die stasie\" aan, dus is dit 'n voorsetsel.",
    ],
    [
      "In die sin \"Thabo en Sipho speel sokker\" is die woord \"en\" 'n:",
      ["voorsetsel", "bywoord", "voegwoord", "voornaamwoord"],
      2,
      "\"En\" verbind die twee naamwoorde \"Thabo\" en \"Sipho\", dus is dit 'n (neweskikkende) voegwoord.",
    ],
    [
      "Watter woord in hierdie sin is 'n voornaamwoord: \"Sy gee die boek vir die onderwyser\"?",
      ["boek", "gee", "onderwyser", "Sy"],
      3,
      "\"Sy\" staan in die plek van 'n naam, dus is dit 'n voornaamwoord. \"Boek\" en \"onderwyser\" is naamwoorde en \"gee\" is 'n werkwoord.",
    ],
    [
      "Die woord \"geluk\" is 'n:",
      ["abstrakte selfstandige naamwoord", "konkrete selfstandige naamwoord", "eienaam", "versamelnaam"],
      0,
      "\"Geluk\" benoem 'n gevoel wat 'n mens nie kan sien of aanraak nie, dus is dit 'n abstrakte selfstandige naamwoord.",
    ],
    [
      "In die frase \"'n trop skape\" is die woord \"trop\" 'n:",
      ["eienaam", "abstrakte naamwoord", "versamelnaam", "voornaamwoord"],
      2,
      "'n Versamelnaam benoem 'n groep — \"trop\" is die versamelnaam vir 'n groep skape.",
    ],
    [
      "In die sin \"Eina! Dit is seer\" is die woord \"Eina\" 'n:",
      ["werkwoord", "tussenwerpsel", "lidwoord", "voegwoord"],
      1,
      "\"Eina\" druk 'n skielike gevoel uit en staan los van die sinstruktuur, dus is dit 'n tussenwerpsel.",
    ],
  ],
  "Meervoude & Verkleinwoorde": [
    [
      "Die meervoud van \"kind\" is:",
      ["kinde", "kindjies", "kinders", "kindes"],
      2,
      "Die korrekte meervoud van \"kind\" is \"kinders\".",
    ],
    [
      "Die meervoud van \"stad\" is:",
      ["stede", "stads", "stadde", "stade"],
      0,
      "\"Stad\" het 'n onreëlmatige meervoud met klinkerverandering: stad → stede.",
    ],
    [
      "Die meervoud van \"skip\" is:",
      ["skips", "skippe", "skipe", "skepe"],
      3,
      "\"Skip\" het 'n onreëlmatige meervoud met klinkerverandering: skip → skepe.",
    ],
    [
      "Die verkleinwoord van \"boom\" is:",
      ["boomjie", "boompie", "boomtjie", "bometjie"],
      1,
      "Woorde wat op -m eindig, kry -pie as verkleiningsagtervoegsel: boom → boompie.",
    ],
    [
      "Die verkleinwoord van \"hond\" is:",
      ["hondjie", "hondtjie", "hondetjie", "hondpie"],
      0,
      "Woorde wat op -d eindig, kry -jie as verkleiningsagtervoegsel: hond → hondjie.",
    ],
    [
      "Die meervoud van \"oog\" is:",
      ["oogte", "oons", "ogies", "oë"],
      3,
      "Die korrekte meervoud van \"oog\" is \"oë\" (met 'n deelteken). \"Ogies\" is die meervoud van die verkleinwoord.",
    ],
    [
      "Die verkleinwoord van \"ring\" is:",
      ["ringjie", "ringetjie", "ringtjie", "ringkie"],
      1,
      "Woorde met 'n kort klinker wat op -ng eindig, kry -etjie: ring → ringetjie.",
    ],
    [
      "Die meervoud van \"blad\" is:",
      ["blads", "bladde", "blaaie", "blade"],
      2,
      "Die korrekte meervoud van \"blad\" is \"blaaie\".",
    ],
  ],
  "Intensiewe Vorme": [
    [
      "Die intensiewe vorm van \"swart\" is:",
      ["sneeuswart", "doodswart", "yswart", "gitswart"],
      3,
      "Die vaste intensiewe vorm van \"swart\" is \"gitswart\" (so swart soos git).",
    ],
    [
      "Die intensiewe vorm van \"wit\" is:",
      ["gitwit", "spierwit", "bloedwit", "pikwit"],
      1,
      "Die vaste intensiewe vorm van \"wit\" is \"spierwit\".",
    ],
    [
      "Die intensiewe vorm van \"koud\" is:",
      ["yskoud", "vuurkoud", "doodkoud", "sneeukoud"],
      0,
      "Die vaste intensiewe vorm van \"koud\" is \"yskoud\" (so koud soos ys).",
    ],
    [
      "Die intensiewe vorm van \"warm\" is:",
      ["yswarm", "kliphard", "vuurwarm", "spierwarm"],
      2,
      "Die vaste intensiewe vorm van \"warm\" is \"vuurwarm\" (so warm soos vuur).",
    ],
    [
      "Die intensiewe vorm van \"hard\" is:",
      ["bloedhard", "kliphard", "sneeuhard", "gitshard"],
      1,
      "Die vaste intensiewe vorm van \"hard\" is \"kliphard\" (so hard soos klip).",
    ],
    [
      "Die intensiewe vorm van \"ryk\" is:",
      ["klipryk", "witryk", "bloedryk", "skatryk"],
      3,
      "Die vaste intensiewe vorm van \"ryk\" is \"skatryk\" (so ryk soos 'n skat).",
    ],
    [
      "Die intensiewe vorm van \"arm\" is:",
      ["skatarm", "ysarm", "brandarm", "spierarm"],
      2,
      "Die vaste intensiewe vorm van \"arm\" is \"brandarm\".",
    ],
    [
      "Die intensiewe vorm van \"nuut\" is:",
      ["splinternuut", "blinknuut", "vuurnuut", "gitnuut"],
      0,
      "Die vaste intensiewe vorm van \"nuut\" is \"splinternuut\" (so nuut soos 'n splinter).",
    ],
  ],
  "Lydende & Bedrywende Vorm": [
    [
      "\"Die hond byt die man.\" In die lydende vorm word dit:",
      [
        "Die man word deur die hond gebyt.",
        "Die man is deur die hond gebyt.",
        "Die man sal deur die hond gebyt word.",
        "Die hond word deur die man gebyt.",
      ],
      0,
      "In die teenwoordige tyd gebruik die lydende vorm \"word\": Die man word deur die hond gebyt.",
    ],
    [
      "\"Thandi het die brief geskryf.\" In die lydende vorm word dit:",
      [
        "Die brief word deur Thandi geskryf.",
        "Die brief sal deur Thandi geskryf word.",
        "Die brief is deur Thandi geskryf.",
        "Thandi is deur die brief geskryf.",
      ],
      2,
      "In die verlede tyd verander \"het ... geskryf\" na \"is ... geskryf\": Die brief is deur Thandi geskryf.",
    ],
    [
      "In die lydende vorm word die doener van die handeling ingelei deur die woord:",
      ["met", "deur", "van", "by"],
      1,
      "Die doener in 'n lydende sin volg op \"deur\": \"Die brief is deur Thandi geskryf.\"",
    ],
    [
      "\"Die onderwyser sal die toetse nasien.\" In die lydende vorm word dit:",
      [
        "Die toetse word deur die onderwyser nagesien.",
        "Die toetse is deur die onderwyser nagesien.",
        "Die onderwyser word deur die toetse nagesien.",
        "Die toetse sal deur die onderwyser nagesien word.",
      ],
      3,
      "In die toekomende tyd gebruik die lydende vorm \"sal ... word\": Die toetse sal deur die onderwyser nagesien word.",
    ],
    [
      "Watter sin is in die lydende vorm?",
      [
        "Die kat jaag die muis.",
        "Die seun skop die bal.",
        "Die koek word deur Ouma gebak.",
        "Die meisie sing 'n lied.",
      ],
      2,
      "In die lydende vorm ontvang die onderwerp die handeling: \"Die koek word deur Ouma gebak.\" Die ander sinne is almal bedrywend.",
    ],
    [
      "\"Die koek is deur Ouma gebak.\" In die bedrywende vorm word dit:",
      ["Ouma het die koek gebak.", "Ouma bak die koek.", "Ouma sal die koek bak.", "Die koek het Ouma gebak."],
      0,
      "Die lydende verlede tyd (\"is ... gebak\") word bedrywend \"het ... gebak\": Ouma het die koek gebak.",
    ],
    [
      "Watter sin is in die bedrywende vorm?",
      [
        "Die venster word deur die bal gebreek.",
        "Die lied is deur die koor gesing.",
        "Die pad word herstel.",
        "Die leerders voltooi die projek.",
      ],
      3,
      "In die bedrywende vorm voer die onderwerp die handeling uit: \"Die leerders voltooi die projek.\" Die ander sinne is almal lydend.",
    ],
    [
      "\"Sy was die skottelgoed.\" In die lydende vorm word dit:",
      [
        "Die skottelgoed is deur haar gewas.",
        "Die skottelgoed word deur haar gewas.",
        "Die skottelgoed sal deur haar gewas word.",
        "Die skottelgoed het deur haar gewas.",
      ],
      1,
      "Die sin is in die teenwoordige tyd, dus gebruik die lydende vorm \"word\": Die skottelgoed word deur haar gewas.",
    ],
  ],
  "Direkte & Indirekte Rede": [
    [
      "Sipho sê: \"Ek is honger.\" In die indirekte rede word dit:",
      [
        "Sipho sê dat ek honger is.",
        "Sipho sê dat hy honger is.",
        "Sipho sê dat hy is honger.",
        "Sipho sê hy honger dat is.",
      ],
      1,
      "Die voornaamwoord verander (ek → hy) en die werkwoord skuif na die einde ná \"dat\": Sipho sê dat hy honger is.",
    ],
    [
      "In die indirekte rede verander \"môre\" gewoonlik na:",
      ["daardie dag", "gister", "vandag", "die volgende dag"],
      3,
      "Tydwoorde skuif in die indirekte rede: \"môre\" word \"die volgende dag\".",
    ],
    [
      "Sy het gesê: \"Ek sal jou help.\" In die indirekte rede word dit:",
      [
        "Sy het gesê dat sy my sou help.",
        "Sy het gesê dat sy jou sal help.",
        "Sy het gesê dat ek haar sou help.",
        "Sy sê dat sy my sal help.",
      ],
      0,
      "\"Sal\" verander na \"sou\" en die voornaamwoorde skuif (ek → sy, jou → my): Sy het gesê dat sy my sou help.",
    ],
    [
      "In die indirekte rede verander \"hier\" gewoonlik na:",
      ["oral", "nêrens", "daar", "iewers"],
      2,
      "Plekwoorde skuif in die indirekte rede: \"hier\" word \"daar\".",
    ],
    [
      "Hy vra: \"Kom jy saam?\" In die indirekte rede word dit:",
      [
        "Hy vra dat jy saamkom.",
        "Hy vra kom jy saam.",
        "Hy vra of jy saam kom?",
        "Hy vra of ek saamkom.",
      ],
      3,
      "'n Vraag word in die indirekte rede met \"of\" ingelei, die voornaamwoord verander (jy → ek), die werkwoord skuif na die einde en die vraagteken val weg.",
    ],
    [
      "In die indirekte rede verander \"vandag\" gewoonlik na:",
      ["môre", "daardie dag", "die volgende dag", "hierdie dag"],
      1,
      "Tydwoorde skuif in die indirekte rede: \"vandag\" word \"daardie dag\".",
    ],
    [
      "Ma het gesê: \"Ek het gister die fliek gesien.\" In die indirekte rede word dit:",
      [
        "Ma het gesê dat sy die vorige dag die fliek gesien het.",
        "Ma het gesê dat ek gister die fliek gesien het.",
        "Ma sê dat sy gister die fliek sien.",
        "Ma het gesê dat sy die volgende dag die fliek gesien het.",
      ],
      0,
      "Die voornaamwoord verander (ek → sy), \"gister\" word \"die vorige dag\" en die werkwoord skuif na die einde.",
    ],
    [
      "Wanneer 'n stelsin met \"dat\" na die indirekte rede oorgesit word, skuif die werkwoord gewoonlik na:",
      ["die begin van die sin", "direk ná \"dat\"", "die einde van die sin", "dit bly op dieselfde plek"],
      2,
      "Die voegwoord \"dat\" stuur die werkwoord na die einde van die bysin: \"... dat hy honger is.\"",
    ],
  ],
  "Ontkenning": [
    [
      "\"Ek sien die hond.\" In die ontkennende vorm word dit:",
      [
        "Ek sien nie die hond.",
        "Ek nie sien die hond nie.",
        "Ek sien nie die hond nie.",
        "Ek sien die hond nie.",
      ],
      2,
      "Afrikaans gebruik die dubbele ontkenning: die eerste \"nie\" ná die werkwoord en die tweede \"nie\" aan die einde van die sin.",
    ],
    [
      "Die ontkennende vorm van \"iemand\" is:",
      ["niemand", "niks", "nêrens", "nooit"],
      0,
      "\"Iemand\" word \"niemand\" in die ontkenning: \"Niemand het gekom nie.\"",
    ],
    [
      "Die ontkennende vorm van \"iets\" is:",
      ["niemand", "nêrens", "nooit", "niks"],
      3,
      "\"Iets\" word \"niks\" in die ontkenning: \"Ek het niks gesien nie.\"",
    ],
    [
      "\"Sy is altyd vroeg.\" In die ontkennende vorm word dit:",
      [
        "Sy is nie altyd vroeg.",
        "Sy is nooit vroeg nie.",
        "Sy is altyd nie vroeg nie.",
        "Sy is nooit nie vroeg.",
      ],
      1,
      "\"Altyd\" word \"nooit\" in die ontkenning, met \"nie\" aan die einde: Sy is nooit vroeg nie.",
    ],
    [
      "Die ontkennende vorm van \"êrens\" is:",
      ["nêrens", "niks", "niemand", "geen"],
      0,
      "\"Êrens\" word \"nêrens\" in die ontkenning: \"Ek kan dit nêrens kry nie.\"",
    ],
    [
      "\"Het jy al geëet?\" Die korrekte ontkennende antwoord is:",
      [
        "Nee, ek het nie geëet.",
        "Nee, ek het al nie geëet nie.",
        "Nee, ek het nog nie geëet nie.",
        "Nee, ek het nooit geëet.",
      ],
      2,
      "\"Al\" word \"nog nie\" in die ontkenning, met die tweede \"nie\" aan die einde: Nee, ek het nog nie geëet nie.",
    ],
    [
      "\"Ek ken daardie man.\" In die ontkennende vorm word dit:",
      [
        "Ek ken daardie man nie.",
        "Ek ken nie daardie man nie.",
        "Ek nie ken daardie man.",
        "Ek ken nie daardie man.",
      ],
      1,
      "Die dubbele ontkenning vereis \"nie\" ná die werkwoord én aan die einde: Ek ken nie daardie man nie.",
    ],
    [
      "\"Ek het iets gesê.\" In die ontkennende vorm word dit:",
      [
        "Ek het nie iets gesê nie.",
        "Ek het niemand gesê nie.",
        "Ek niks gesê het nie.",
        "Ek het niks gesê nie.",
      ],
      3,
      "\"Iets\" word \"niks\" in die ontkenning: Ek het niks gesê nie.",
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
