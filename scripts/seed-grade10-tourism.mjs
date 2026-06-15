// Seeds the Grade 10 Tourism question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only (definitions, SA tourism facts,
// travel documents, marketing terms, economic concepts). Grade 10 level.
// Topics + questions are DISTINCT from the Gr11 Tourism bank (Gr11 = sectors,
// time zones, forex, world/SA icons, sustainable tourism, customer care).
// SA facts checked against standard references. Correct-answer positions are
// spread evenly A-D per topic (the quiz engine shuffles question order, not
// option order). Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade10-tourism.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Tourism";
const GRADE = "Grade 10";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Tourism Concepts & Reasons for Travel": [
    [
      "'Tourism' involves people travelling to and staying in places:",
      [
        "outside their usual environment, for leisure, business or other purposes",
        "only within their own home",
        "only for work each day in their home town",
        "without ever leaving home",
      ],
      0,
      "Tourism involves travelling to and staying in places outside one's usual environment for purposes such as leisure, business or visiting others.",
    ],
    [
      "A person who travels for tourism within their OWN country is taking part in:",
      ["inbound tourism", "domestic tourism", "outbound tourism", "international tourism"],
      1,
      "Domestic tourism is when residents travel within their own country, for example a South African holidaying in Durban.",
    ],
    [
      "A South African who travels overseas to another country is an example of:",
      ["domestic tourism", "inbound tourism", "outbound tourism", "local tourism"],
      2,
      "Outbound tourism is when residents of a country travel to and visit other countries.",
    ],
    [
      "A person who travels to attend a wedding and stay with family is travelling mainly for the purpose of:",
      ["business", "attending a conference", "medical treatment", "visiting friends and relatives (VFR)"],
      3,
      "VFR (visiting friends and relatives) is travel whose main purpose is to see family or friends, such as attending a family wedding.",
    ],
    [
      "The letters 'MICE' in tourism stand for Meetings, Incentives, Conferences and:",
      ["Events/Exhibitions", "Eating", "Emigration", "Entertainment only"],
      0,
      "MICE tourism refers to Meetings, Incentives, Conferences and Events/Exhibitions — a major form of business tourism.",
    ],
    [
      "A visitor who travels to a place and returns home on the SAME day, without staying overnight, is called a(n):",
      ["overnight tourist", "excursionist (day visitor)", "outbound tourist", "business tourist"],
      1,
      "An excursionist (day visitor) visits a place and returns home the same day; a tourist stays at least one night.",
    ],
    [
      "A person travelling to another country mainly to receive a medical operation is an example of:",
      ["sport tourism", "religious tourism", "medical tourism", "cultural tourism"],
      2,
      "Medical tourism is travel to another place or country mainly to receive medical or health treatment.",
    ],
    [
      "The place that a tourist travels to and visits is called the:",
      ["source area", "home town", "departure point", "destination"],
      3,
      "The destination is the place a tourist travels to and visits, away from their usual home environment.",
    ],
  ],
  "Domestic Tourism & SA Provinces": [
    [
      "South Africa is made up of how many provinces?",
      ["nine", "five", "eleven", "four"],
      0,
      "South Africa has nine provinces, each with its own attractions for domestic tourists.",
    ],
    [
      "Table Mountain and the V&A Waterfront are major tourist attractions in which province?",
      ["Gauteng", "Western Cape", "Limpopo", "Free State"],
      1,
      "Table Mountain and the V&A Waterfront are in Cape Town, in the Western Cape.",
    ],
    [
      "The Kruger National Park, a top wildlife destination, lies mainly in Mpumalanga and which other province?",
      ["Western Cape", "Northern Cape", "Limpopo", "Free State"],
      2,
      "The Kruger National Park stretches across Mpumalanga and Limpopo in the north-east of South Africa.",
    ],
    [
      "The popular beaches and warm Indian Ocean coastline around Durban are found in which province?",
      ["Gauteng", "Western Cape", "Free State", "KwaZulu-Natal"],
      3,
      "Durban, known for its warm beaches and Indian Ocean coastline, is in KwaZulu-Natal.",
    ],
    [
      "Domestic tourism is important for South Africa because it:",
      [
        "keeps tourism money circulating within the country and supports local jobs",
        "only benefits foreign countries",
        "reduces all local income",
        "discourages people from travelling",
      ],
      0,
      "Domestic tourism keeps spending within the country, supporting local businesses and jobs, and is less affected by global events than international tourism.",
    ],
    [
      "South Africa's domestic tourism campaign that encourages locals to travel and explore their own country is called:",
      ["Visit Britain", "Sho't Left", "Incredible India", "Australia Uncovered"],
      1,
      "'Sho't Left' is South African Tourism's campaign encouraging South Africans to travel and explore their own country affordably.",
    ],
    [
      "Gauteng is South Africa's smallest province by area, but is very important for tourism because it:",
      [
        "has the longest coastline",
        "is mostly desert with no cities",
        "contains Johannesburg and Pretoria and is the main business and gateway hub",
        "has no airports",
      ],
      2,
      "Gauteng contains Johannesburg and Pretoria and OR Tambo International Airport, making it the economic centre and main gateway for visitors.",
    ],
    [
      "A family from Johannesburg taking a holiday to the Drakensberg mountains is an example of:",
      ["outbound tourism", "inbound tourism", "international tourism", "domestic tourism"],
      3,
      "Travelling within South Africa (from Johannesburg to the Drakensberg) is domestic tourism.",
    ],
  ],
  "South African Heritage & Culture": [
    [
      "A 'World Heritage Site' is a place that:",
      [
        "has special cultural or natural value and is protected internationally by UNESCO",
        "is only open to local residents",
        "has no historical importance",
        "is a private shopping mall",
      ],
      0,
      "A World Heritage Site is a place of outstanding cultural or natural value, recognised and protected internationally by UNESCO.",
    ],
    [
      "'Heritage tourism' (cultural tourism) means travelling to experience:",
      [
        "only the beach",
        "the history, culture and traditions of a place or people",
        "only sports events",
        "only shopping centres",
      ],
      1,
      "Heritage (cultural) tourism involves travelling to experience the history, culture, traditions and heritage of a place or community.",
    ],
    [
      "The 'Cradle of Humankind', a World Heritage Site near Johannesburg, is famous for:",
      ["beach holidays", "snow skiing", "important fossils of early human ancestors", "a large shopping centre"],
      2,
      "The Cradle of Humankind is a World Heritage Site where many fossils of early human ancestors (hominids) have been found.",
    ],
    [
      "South Africa is often called the 'Rainbow Nation' because it has:",
      [
        "only one culture",
        "no official languages",
        "no cultural diversity at all",
        "many different cultures, languages and traditions",
      ],
      3,
      "South Africa is called the Rainbow Nation because of its rich diversity of cultures, languages and traditions, which attracts cultural tourists.",
    ],
    [
      "Heritage Day, a public holiday on which South Africans celebrate their cultural heritage, is on:",
      ["24 September", "1 January", "25 December", "16 June"],
      0,
      "Heritage Day is celebrated on 24 September each year, when South Africans celebrate their diverse cultural heritage.",
    ],
    [
      "The Voortrekker Monument and the Union Buildings, important heritage sites, are located in:",
      ["Cape Town", "Pretoria (Tshwane)", "Durban", "Bloemfontein"],
      1,
      "The Voortrekker Monument and the Union Buildings are both in Pretoria (Tshwane), Gauteng.",
    ],
    [
      "Visiting a battlefield, museum or monument to learn about past events is a form of:",
      ["beach tourism", "adventure tourism", "heritage (cultural) tourism", "sport tourism"],
      2,
      "Visiting battlefields, museums and monuments to learn about history is heritage (cultural) tourism.",
    ],
    [
      "iSimangaliso Wetland Park, a World Heritage Site with lakes, beaches and wildlife, is located in which province?",
      ["Gauteng", "Western Cape", "Free State", "KwaZulu-Natal"],
      3,
      "iSimangaliso Wetland Park, South Africa's first World Heritage Site, is on the KwaZulu-Natal coast and is known for its wetlands, beaches and wildlife.",
    ],
  ],
  "Travel Documents & Traveller Health & Safety": [
    [
      "An official government booklet that proves your identity and nationality when travelling internationally is a:",
      ["passport", "boarding pass", "hotel voucher", "shopping receipt"],
      0,
      "A passport is the official government document that proves your identity and nationality and is required for international travel.",
    ],
    [
      "An official permission (often a stamp or sticker in a passport) that allows you to enter a particular foreign country is a:",
      ["boarding pass", "visa", "loyalty card", "luggage tag"],
      1,
      "A visa is the official permission granted by a country, allowing a traveller to enter, stay in or pass through it.",
    ],
    [
      "Cover that pays for unexpected costs such as medical emergencies, cancellations or lost luggage while travelling is called:",
      ["a passport", "a visa", "travel insurance", "a boarding pass"],
      2,
      "Travel insurance covers unexpected costs such as medical emergencies, trip cancellations and lost or stolen luggage during a trip.",
    ],
    [
      "A document proving a traveller has been vaccinated against certain diseases (such as yellow fever), required for entry to some countries, is a:",
      ["boarding pass", "visa", "luggage tag", "health (vaccination) certificate"],
      3,
      "A health/vaccination certificate proves a traveller has received required vaccinations (e.g. against yellow fever), which some countries require for entry.",
    ],
    [
      "The document issued at check-in that allows a passenger to board a specific flight is the:",
      ["boarding pass", "passport", "visa", "travel insurance policy"],
      0,
      "A boarding pass is issued at check-in and allows the passenger to board a specific flight, showing the seat and gate.",
    ],
    [
      "To stay healthy while travelling to a region with malaria, a tourist should:",
      [
        "drink unclean water",
        "take anti-malaria precautions such as medication and insect repellent",
        "ignore all health advice",
        "never wash their hands",
      ],
      1,
      "Travellers to malaria areas should take precautions such as anti-malaria medication, insect repellent and protective clothing to avoid being bitten.",
    ],
    [
      "To keep their valuables safe while travelling, a tourist should:",
      [
        "leave their passport lying in public places",
        "show large amounts of cash openly",
        "use a hotel safe and keep documents secure",
        "tell strangers their room number",
      ],
      2,
      "Tourists should protect valuables by using a hotel safe, keeping documents secure and not openly displaying cash or valuables.",
    ],
    [
      "Before travelling to a foreign country, a tourist should check whether they need a visa, because:",
      [
        "a visa is never required anywhere",
        "passports are not needed for travel",
        "visas are only for local citizens",
        "some countries require a visa for entry, and a traveller can be refused entry without one",
      ],
      3,
      "Visa requirements differ by country; travellers must check in advance, as they may be refused entry if they arrive without a required visa.",
    ],
  ],
  "Marketing & Promotion in Tourism": [
    [
      "'Marketing' in tourism mainly involves:",
      [
        "promoting and selling tourism products to attract customers",
        "cleaning hotel rooms",
        "flying the aircraft",
        "only cooking food",
      ],
      0,
      "Marketing involves promoting and selling tourism products and destinations in order to attract and satisfy customers.",
    ],
    [
      "The specific group of customers that a tourism business aims its products at is called the:",
      ["competitors", "target market", "suppliers", "shareholders"],
      1,
      "The target market is the specific group of customers (by age, income, interests, etc.) that a business aims its products and marketing at.",
    ],
    [
      "The four elements of the marketing mix (the '4 Ps') are product, price, place and:",
      ["passport", "profit", "promotion", "petrol"],
      2,
      "The marketing mix (4 Ps) consists of Product, Price, Place and Promotion.",
    ],
    [
      "The 'brand' of a tourism business or destination is:",
      [
        "the price of a ticket",
        "the number of staff it employs",
        "the size of its building",
        "its name, logo and image that make it recognisable",
      ],
      3,
      "A brand is the name, logo and overall image that make a business or destination recognisable and distinct from its competitors.",
    ],
    [
      "The national organisation responsible for marketing South Africa as a tourism destination is:",
      ["South African Tourism (SA Tourism)", "the Reserve Bank", "SARS", "Eskom"],
      0,
      "South African Tourism (SA Tourism) is the national body responsible for marketing South Africa as a leisure and business tourism destination.",
    ],
    [
      "Advertising a destination on social media, television and websites is part of which element of the marketing mix?",
      ["price", "promotion", "place", "product"],
      1,
      "Advertising and publicity are forms of promotion, the marketing-mix element that communicates with and attracts customers.",
    ],
    [
      "'Place' in the tourism marketing mix refers to:",
      [
        "the price charged",
        "the advertising used",
        "where and how the product is made available to customers",
        "the staff uniform",
      ],
      2,
      "'Place' (distribution) refers to where and how the tourism product is made available to customers — for example online booking or travel agents.",
    ],
    [
      "The main aim of tourism marketing is to:",
      [
        "reduce the number of visitors",
        "make the destination unknown",
        "discourage people from travelling",
        "attract more visitors and increase tourism income",
      ],
      3,
      "The aim of tourism marketing is to attract more visitors to a destination or product, increasing bookings and tourism income.",
    ],
  ],
  "The Economic Importance of Tourism": [
    [
      "One major economic benefit of tourism for a country is that it:",
      [
        "creates jobs and earns foreign exchange",
        "destroys all businesses",
        "removes income from the country",
        "reduces employment",
      ],
      0,
      "Tourism creates many jobs and earns valuable foreign exchange (foreign currency), boosting the economy.",
    ],
    [
      "'Foreign exchange' earned through tourism refers to:",
      [
        "local coins only",
        "the foreign currency that overseas tourists spend in the country",
        "free travel for locals",
        "tourists' luggage",
      ],
      1,
      "Foreign exchange is the foreign currency that international tourists spend in a country, which strengthens its economy.",
    ],
    [
      "The way tourist spending passes from one business to another, spreading benefits through the economy, is known as the:",
      ["exchange rate", "carrying capacity", "multiplier effect", "balance of trade"],
      2,
      "The multiplier effect describes how money spent by tourists is re-spent by businesses and workers, spreading the economic benefit through the wider economy.",
    ],
    [
      "Tourism helps to reduce unemployment because it:",
      [
        "replaces all workers with machines",
        "needs no staff at all",
        "closes hotels and restaurants",
        "creates many jobs in hotels, transport, restaurants and attractions",
      ],
      3,
      "Tourism is labour-intensive and creates many jobs across accommodation, transport, food services and attractions, helping to reduce unemployment.",
    ],
    [
      "Many small businesses (SMMEs) benefit from tourism — for example:",
      [
        "local craft sellers and tour guides",
        "large foreign banks only",
        "overseas factories",
        "international oil companies",
      ],
      0,
      "Tourism supports small, medium and micro enterprises (SMMEs) such as craft sellers, tour guides, B&Bs and local restaurants.",
    ],
    [
      "A negative economic effect that can happen in a very popular tourist area is:",
      [
        "lower prices for everything",
        "higher prices for goods, services and property for local residents",
        "no change at all",
        "free housing for everyone",
      ],
      1,
      "In popular tourist areas, high demand can push up the prices of goods, services and property, which can disadvantage local residents.",
    ],
    [
      "Tourism contributes to a country's economy by adding to its:",
      ["rainfall", "population pyramid", "Gross Domestic Product (GDP)", "time zone"],
      2,
      "Tourism contributes a significant share of a country's Gross Domestic Product (GDP) — the total value of goods and services produced.",
    ],
    [
      "The government can benefit economically from tourism by collecting:",
      [
        "nothing at all",
        "only complaints",
        "fewer visitors",
        "taxes such as VAT on the money tourists spend",
      ],
      3,
      "Governments earn revenue from tourism through taxes such as VAT and airport/tourism levies on the money tourists spend.",
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
