// Seeds the Grade 10 Afrikaans question bank (6 topics x 8 questions).
// TAALSTRUKTURE EN -KONVENSIES ONLY — lidwoorde & voornaamwoorde, voorsetsels,
// voegwoorde, spelling/hoofletters/afkortings, sinsoorte, byvoeglike naamwoorde
// & bywoorde. No literature/essay/interpretive questions. CAPS-aligned for HL/FAL.
// Topics + questions are DISTINCT from BOTH the Gr11 bank (sinsbou,
// sinonieme/antonieme, voor-/agtervoegsels, idiome/spreekwoorde, trappe van
// vergelyking, tye) and the Gr12 bank (woordsoorte, meervoude & verkleinwoorde,
// intensiewe vorme, lydende/bedrywende vorm, direkte/indirekte rede, ontkenning).
// All forms checked against standard Afrikaans school grammar (AWS conventions).
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but NOT option order). NOTE: the lint dedupe is
// case-insensitive, so options must not differ only by capitalisation.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade10-afrikaans.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Afrikaans";
const GRADE = "Grade 10";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Lidwoorde & Voornaamwoorde": [
    [
      "Die ONBEPAALDE lidwoord in Afrikaans is:",
      ["'n", "die", "hierdie", "daardie"],
      0,
      "\"'n\" is die onbepaalde lidwoord (bv. 'n hond); \"die\" is die bepaalde lidwoord.",
    ],
    [
      "Die BEPAALDE lidwoord in Afrikaans is:",
      ["'n", "die", "een", "geen"],
      1,
      "\"Die\" is die bepaalde lidwoord wat na 'n spesifieke ding verwys; \"'n\" is die onbepaalde lidwoord.",
    ],
    [
      "Kies die korrekte persoonlike voornaamwoord: \"___ is my beste vriend.\" (verwys na een seun, onderwerp)",
      ["Hom", "Sy", "Hy", "Hulle"],
      2,
      "\"Hy\" is die persoonlike voornaamwoord (onderwerpsvorm) vir een manlike persoon; \"hom\" is die voorwerpsvorm.",
    ],
    [
      "Kies die korrekte besitlike voornaamwoord: \"Hierdie boek is ___.\" (dit behoort aan my)",
      ["ek", "my", "ekke", "myne"],
      3,
      "\"Myne\" is die selfstandige besitlike voornaamwoord wat alleen staan: Hierdie boek is myne.",
    ],
    [
      "Kies die korrekte voornaamwoord: \"Ma roep ___.\" (verwys na my, voorwerp van die sin)",
      ["my", "ek", "myne", "ons"],
      0,
      "\"My\" is die voorwerpsvorm (Ma roep my); \"ek\" is die onderwerpsvorm.",
    ],
    [
      "Kies die korrekte besitlike voornaamwoord: \"Die seuns speel met ___ bal.\" (die bal behoort aan die seuns)",
      ["sy", "hulle", "hom", "haar"],
      1,
      "Vir 'n meervoud (die seuns) is die besitlike voornaamwoord \"hulle\": hulle bal.",
    ],
    [
      "Kies die korrekte voornaamwoord: \"Sara hou van haar werk. ___ is baie hardwerkend.\"",
      ["Hy", "Hom", "Sy", "Haar"],
      2,
      "\"Sy\" is die persoonlike voornaamwoord (onderwerpsvorm) vir een vroulike persoon.",
    ],
    [
      "Die woord \"hierdie\" in \"hierdie boek\" is 'n:",
      [
        "persoonlike voornaamwoord",
        "besitlike voornaamwoord",
        "voorsetsel",
        "aanwysende voornaamwoord",
      ],
      3,
      "\"Hierdie\" en \"daardie\" is aanwysende voornaamwoorde wat aandui wátter een bedoel word.",
    ],
  ],
  "Voorsetsels": [
    [
      "Kies die korrekte voorsetsel: \"Die kat sit ___ die tafel.\" (bo-op die oppervlak)",
      ["onder", "op", "tussen", "in"],
      1,
      "\"Op\" dui aan dat iets bo-op 'n oppervlak is.",
    ],
    [
      "Kies die korrekte voorsetsel: \"Die bal rol ___ die bed.\" (daaronder in)",
      ["op", "bo", "onder", "langs"],
      2,
      "\"Onder\" dui aan dat iets benede iets anders is.",
    ],
    [
      "Kies die korrekte voorsetsel: \"Sy sit ___ haar twee vriende.\" (een aan elke kant)",
      ["onder", "op", "in", "tussen"],
      3,
      "\"Tussen\" word gebruik vir twee dinge of persone (een aan elke kant).",
    ],
    [
      "Kies die korrekte voorsetsel: \"Sy gooi die bal ___ die lug.\"",
      ["in", "onder", "tussen", "agter"],
      0,
      "'n Mens gooi die bal \"in\" die lug.",
    ],
    [
      "Kies die korrekte voorsetsel: \"Die boek lê ___ die laai.\" (binne-in)",
      ["op", "in", "onder", "oor"],
      1,
      "\"In\" dui aan dat iets binne-in iets anders is.",
    ],
    [
      "Kies die korrekte voorsetsel: \"Die kinders speel ___ die park.\"",
      ["op", "aan", "in", "onder"],
      2,
      "'n Mens speel \"in\" die park.",
    ],
    [
      "Kies die korrekte voorsetsel van tyd: \"Die vergadering begin ___ nege-uur.\"",
      ["in", "op", "van", "om"],
      3,
      "By kloktye gebruik 'n mens \"om\": om nege-uur.",
    ],
    [
      "Kies die korrekte voorsetsel: \"Sy stap ___ die winkel toe.\" (rigting)",
      ["na", "in", "op", "tussen"],
      0,
      "Rigting word aangedui met \"na ... toe\": Sy stap na die winkel toe.",
    ],
  ],
  "Voegwoorde": [
    [
      "Kies die korrekte voegwoord: \"Sy is slim ___ hardwerkend.\" (voeg twee soortgelyke idees saam)",
      ["maar", "of", "en", "want"],
      2,
      "\"En\" voeg twee soortgelyke idees saam.",
    ],
    [
      "Kies die korrekte voegwoord: \"Hy wou speel, ___ dit het gereën.\" (teenstelling)",
      ["en", "of", "want", "maar"],
      3,
      "\"Maar\" dui 'n teenstelling of teenoorgestelde idee aan.",
    ],
    [
      "Kies die korrekte voegwoord: \"Wil jy tee ___ koffie hê?\" (keuse)",
      ["of", "en", "maar", "want"],
      0,
      "\"Of\" bied 'n keuse tussen twee moontlikhede aan.",
    ],
    [
      "Kies die korrekte voegwoord: \"Ek het by die huis gebly, ___ ek was siek.\" (rede)",
      ["maar", "want", "of", "en"],
      1,
      "\"Want\" gee die rede vir iets aan (en is neweskikkend, dus verander die woordorde nie).",
    ],
    [
      "'n Voegwoord is 'n woord wat:",
      [
        "'n selfstandige naamwoord beskryf",
        "wys aan wie iets behoort",
        "woorde, frases of sinne met mekaar verbind",
        "'n naamwoord vervang",
      ],
      2,
      "'n Voegwoord (soos en, maar, of, want) verbind woorde, frases of sinne met mekaar.",
    ],
    [
      "Kies die korrekte voegwoord: \"Die wedstryd was spannend, ___ ons span het verloor.\" (teenstelling)",
      ["en", "of", "want", "maar"],
      3,
      "\"Maar\" dui die teenstelling aan: dit was spannend, tóg het hulle verloor.",
    ],
    [
      "Kies die korrekte voegwoord: \"My ma kook die kos ___ my pa was die skottelgoed.\" (saamvoeg)",
      ["en", "of", "want", "maar"],
      0,
      "\"En\" verbind die twee dele wat saamgevoeg word.",
    ],
    [
      "Kies die korrekte voegwoord: \"Ons kan fliek toe gaan ___ by die huis bly.\" (keuse)",
      ["en", "of", "want", "maar"],
      1,
      "\"Of\" bied 'n keuse tussen twee moontlikhede aan.",
    ],
  ],
  "Spelling, Hoofletters & Afkortings": [
    [
      "Watter woord is KORREK gespel?",
      ["geluk-kig", "gelukig", "gellukkig", "gelukkig"],
      3,
      "\"Gelukkig\" word met 'n dubbel-k gespel: ge-luk-kig.",
    ],
    [
      "Watter woord is KORREK gespel?",
      ["asseblief", "aseblief", "assblief", "asebliyf"],
      0,
      "\"Asseblief\" word met 'n dubbel-s en \"-blief\" gespel.",
    ],
    [
      "Watter woord is KORREK gespel?",
      ["onmiddelik", "onmiddellik", "onmidellik", "onmiddelllik"],
      1,
      "\"Onmiddellik\" word met 'n dubbel-d en 'n dubbel-l gespel.",
    ],
    [
      "In die sin \"ons woon in pretoria\" watter woorde het hoofletters nodig?",
      ["net 'woon'", "net 'in'", "'Ons' en 'Pretoria'", "geen woord nie"],
      2,
      "Die eerste woord van die sin (\"Ons\") en die eienaam/pleknaam (\"Pretoria\") kry hoofletters.",
    ],
    [
      "Die name van dae en maande, soos \"Maandag\" en \"April\":",
      [
        "kry nooit 'n hoofletter nie",
        "kry net aan die einde van 'n sin 'n hoofletter",
        "word altyd in volle hoofletters geskryf",
        "begin altyd met 'n hoofletter",
      ],
      3,
      "Dae van die week en maande van die jaar is eiename en begin altyd met 'n hoofletter.",
    ],
    [
      "Die afkorting \"ens.\" staan vir:",
      ["ensovoorts", "ensiklopedie", "enkelvoud", "ensemble"],
      0,
      "\"Ens.\" is die afkorting vir \"ensovoorts\" (en so aan).",
    ],
    [
      "Die afkorting \"dr.\" staan vir:",
      ["drukker", "dokter", "drie", "drama"],
      1,
      "\"Dr.\" is die afkorting vir \"dokter\", 'n titel wat voor 'n persoon se naam gebruik word.",
    ],
    [
      "Watter woord begin met 'n hoofletter omdat dit 'n eienaam is?",
      ["hond", "stad", "Tafelberg", "berg"],
      2,
      "\"Tafelberg\" is 'n eienaam (die naam van 'n spesifieke berg) en kry 'n hoofletter; \"berg\" en \"hond\" is soortname.",
    ],
  ],
  "Sinsoorte: Stel-, Vraag-, Bevel- & Uitroepsin": [
    [
      "'n Sin wat 'n stelling maak en met 'n punt eindig, word 'n ___ genoem.",
      ["vraagsin", "stelsin", "bevelsin", "uitroepsin"],
      1,
      "'n Stelsin maak 'n stelling en eindig met 'n punt, bv. \"Die son skyn.\"",
    ],
    [
      "'n Sin wat iets vra en met 'n vraagteken eindig, word 'n ___ genoem.",
      ["stelsin", "bevelsin", "vraagsin", "uitroepsin"],
      2,
      "'n Vraagsin vra iets en eindig met 'n vraagteken.",
    ],
    [
      "\"Maak die deur toe, asseblief.\" Hierdie sin is 'n:",
      ["vraagsin", "stelsin", "uitroepsin", "bevelsin"],
      3,
      "'n Bevelsin gee 'n bevel, opdrag of versoek.",
    ],
    [
      "\"Wat 'n pragtige dag is dit!\" Hierdie sin is 'n:",
      ["uitroepsin", "vraagsin", "stelsin", "bevelsin"],
      0,
      "'n Uitroepsin druk sterk gevoel uit en eindig met 'n uitroepteken.",
    ],
    [
      "Watter leesteken hoort aan die einde van die sin \"Waarheen gaan jy\"?",
      ["'n punt", "'n vraagteken", "'n komma", "geen leesteken nie"],
      1,
      "\"Waarheen gaan jy\" is 'n vraag, dus eindig dit met 'n vraagteken.",
    ],
    [
      "Watter sin is 'n BEVELSIN?",
      [
        "Die son skyn helder.",
        "Skyn die son vandag?",
        "Sit stil en luister.",
        "Wat 'n mooi tuin!",
      ],
      2,
      "\"Sit stil en luister\" gee 'n opdrag, dus is dit 'n bevelsin.",
    ],
    [
      "'n Uitroepsin eindig gewoonlik met:",
      ["'n punt", "'n vraagteken", "'n komma", "'n uitroepteken"],
      3,
      "'n Uitroepsin druk sterk emosie uit en eindig met 'n uitroepteken.",
    ],
    [
      "\"Die leerders skryf hul eksamen in November.\" Hierdie sin is 'n:",
      ["stelsin", "vraagsin", "bevelsin", "uitroepsin"],
      0,
      "Die sin stel net 'n feit en eindig met 'n punt, dus is dit 'n stelsin.",
    ],
  ],
  "Byvoeglike Naamwoorde & Bywoorde": [
    [
      "'n Byvoeglike naamwoord is 'n woord wat:",
      [
        "'n werkwoord beskryf",
        "twee sinne verbind",
        "'n selfstandige naamwoord beskryf",
        "aandui waar iets is",
      ],
      2,
      "'n Byvoeglike naamwoord beskryf 'n selfstandige naamwoord, bv. die GROOT huis.",
    ],
    [
      "In die sin \"Die vinnige seun hardloop\" is die byvoeglike naamwoord:",
      ["Die", "seun", "hardloop", "vinnige"],
      3,
      "\"Vinnige\" beskryf die selfstandige naamwoord \"seun\", dus is dit die byvoeglike naamwoord.",
    ],
    [
      "Kies die korrekte vorm: \"Dit is 'n ___ boek.\" (van die woord \"goed\")",
      ["goeie", "goed", "goeder", "goedste"],
      0,
      "\"Goed\" word attributief (voor die naamwoord) \"goeie\": 'n goeie boek.",
    ],
    [
      "'n Bywoord is 'n woord wat gewoonlik:",
      [
        "'n selfstandige naamwoord beskryf",
        "die werkwoord beskryf (hóé, wanneer of waar iets gebeur)",
        "aan iemand behoort",
        "twee sinne verbind",
      ],
      1,
      "'n Bywoord beskryf gewoonlik die werkwoord en sê hóé, wanneer of waar iets gebeur.",
    ],
    [
      "In die sin \"Sy sing mooi\" sê die woord \"mooi\" vir ons:",
      [
        "wie sing",
        "wat sy sing",
        "hóé sy sing (dit is 'n bywoord)",
        "wanneer sy sing",
      ],
      2,
      "Hier beskryf \"mooi\" die werkwoord \"sing\" (hóé sy sing), dus tree dit as bywoord op.",
    ],
    [
      "Kies die korrekte vorm: \"Hulle bly in 'n ___ huis.\" (van die woord \"nuut\")",
      ["nuut", "nuter", "nuutste", "nuwe"],
      3,
      "\"Nuut\" word attributief (voor die naamwoord) \"nuwe\": 'n nuwe huis.",
    ],
    [
      "Kies die korrekte vorm: \"Dit is 'n ___ berg.\" (van die woord \"hoog\")",
      ["hoë", "hoog", "hoogte", "hoogste"],
      0,
      "\"Hoog\" word attributief (voor die naamwoord) \"hoë\": 'n hoë berg.",
    ],
    [
      "In die sin \"Die ou man loop stadig\" is \"stadig\" 'n:",
      ["byvoeglike naamwoord", "bywoord", "selfstandige naamwoord", "voegwoord"],
      1,
      "\"Stadig\" beskryf hóé die man loop (die werkwoord), dus is dit 'n bywoord.",
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
