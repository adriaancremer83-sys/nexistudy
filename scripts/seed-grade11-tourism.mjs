// Seeds the Grade 11 Tourism question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only (definitions, classifications,
// time-zone & foreign-exchange calculations, world/SA icons, responsible
// tourism, customer care). DISTINCT from the Gr12 Tourism bank. Every numeric
// answer (time zones, forex) was checked by computation during drafting.
// Correct-answer positions are spread evenly A-D per topic because the quiz
// engine shuffles question order, not option order. Safe to re-run.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade11-tourism.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Tourism";
const GRADE = "Grade 11";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Tourism Sectors & the Industry": [
    [
      "A 'tourist' is best defined as a person who travels to and stays in a place outside their usual environment for:",
      [
        "at least one night (more than 24 hours), for leisure, business or other purposes",
        "less than one hour",
        "work every single day",
        "no particular reason at all",
      ],
      0,
      "A tourist travels to and stays in a place outside their usual environment for at least one night (more than 24 hours). A same-day visitor is an excursionist.",
    ],
    [
      "Which of the following is part of the ACCOMMODATION sector of the tourism industry?",
      ["an airline", "a guesthouse (B&B)", "a car-rental company", "a travel insurance company"],
      1,
      "A guesthouse or bed-and-breakfast forms part of the accommodation sector. Airlines and car rental belong to the transport sector.",
    ],
    [
      "Airlines, buses, trains and car-rental companies all belong to which tourism sector?",
      ["accommodation", "food and beverage", "transport", "attractions"],
      2,
      "Airlines, buses, trains and car-rental companies provide the movement of tourists, so they form part of the transport sector.",
    ],
    [
      "A person who travels for tourism within their own country is engaging in:",
      ["international tourism", "outbound tourism", "inbound tourism", "domestic tourism"],
      3,
      "Domestic tourism is when residents travel within their own country. Inbound tourism is foreigners visiting; outbound is residents travelling abroad.",
    ],
    [
      "A foreign tourist visiting South Africa is an example of:",
      ["inbound tourism", "domestic tourism", "outbound tourism", "no tourism at all"],
      0,
      "Inbound tourism refers to visitors from other countries travelling into a country — for example a foreign tourist visiting South Africa.",
    ],
    [
      "A travel agency mainly:",
      ["builds aircraft", "books and arranges travel, accommodation and tours for clients", "grows food for hotels", "prints passports"],
      1,
      "A travel agency acts as an intermediary that books and arranges travel, accommodation, tours and related services on behalf of clients.",
    ],
    [
      "Which of the following is an example of a 'business tourist'?",
      [
        "a family on a beach holiday",
        "friends visiting a game reserve for fun",
        "a person attending a work conference in another city",
        "a couple on honeymoon",
      ],
      2,
      "A business tourist travels for work-related reasons, such as attending a conference, meeting or trade show — not mainly for leisure.",
    ],
    [
      "The tourism industry is important to the South African economy mainly because it:",
      [
        "reduces the number of jobs",
        "uses up all natural resources",
        "discourages foreign visitors",
        "creates jobs and earns foreign exchange",
      ],
      3,
      "Tourism is a major contributor to the SA economy because it creates employment and earns valuable foreign exchange (foreign currency).",
    ],
  ],
  "Map Work, Time Zones & Travel": [
    [
      "The starting point (0°) for measuring world time zones, running through Greenwich, is the:",
      ["Prime Meridian", "Equator", "Tropic of Cancer", "International Date Line"],
      0,
      "The Prime Meridian (0° longitude), passing through Greenwich in London, is the reference point for world time zones (GMT/UTC).",
    ],
    [
      "South African Standard Time is:",
      ["GMT (the same as Greenwich)", "GMT + 2 hours", "GMT − 5 hours", "GMT + 10 hours"],
      1,
      "South African Standard Time is GMT + 2 hours — two hours ahead of Greenwich Mean Time.",
    ],
    [
      "As you travel EAST across the world, time generally:",
      ["goes backward (becomes earlier)", "stays exactly the same", "goes forward (becomes later)", "stops completely"],
      2,
      "Travelling east, clocks move forward (time becomes later); travelling west, clocks move backward (earlier).",
    ],
    [
      "The imaginary line at roughly 180° longitude, where the calendar date changes by one day, is the:",
      ["Prime Meridian", "Equator", "Tropic of Capricorn", "International Date Line"],
      3,
      "The International Date Line, at about 180° longitude, is where the calendar date changes by one day.",
    ],
    [
      "If it is 12:00 (noon) GMT in London, the time in South Africa (GMT + 2) is:",
      ["14:00", "10:00", "12:00", "16:00"],
      0,
      "South Africa is GMT + 2, so when it is 12:00 in London it is 12:00 + 2 = 14:00 in South Africa.",
    ],
    [
      "Which travel document is an official booklet, issued by your government, that proves your identity and nationality when travelling internationally?",
      ["a boarding pass", "a passport", "a hotel voucher", "a credit card"],
      1,
      "A passport is the official government-issued document that proves your identity and nationality and is required for international travel.",
    ],
    [
      "An official endorsement placed in a passport that gives permission to enter a particular foreign country is a:",
      ["boarding pass", "loyalty card", "visa", "luggage tag"],
      2,
      "A visa is an official permission (often a stamp or sticker in the passport) allowing the holder to enter, stay in or leave a specific country.",
    ],
    [
      "'Jet lag' is a condition experienced by travellers who:",
      ["drive a short distance", "walk to a nearby town", "stay at home", "fly quickly across several time zones"],
      3,
      "Jet lag results from rapidly crossing several time zones by air, which disrupts the body's natural sleep–wake cycle (body clock).",
    ],
  ],
  "Foreign Exchange": [
    [
      "'Foreign exchange' refers to:",
      ["the currency of other countries (foreign money)", "exchanging old clothes", "swapping passports", "a type of aircraft"],
      0,
      "Foreign exchange (forex) is foreign currency — the money of other countries — used when trading or travelling internationally.",
    ],
    [
      "The official currency of South Africa is the:",
      ["US dollar", "rand", "euro", "pound"],
      1,
      "The rand (ZAR) is the official currency of South Africa.",
    ],
    [
      "If 1 US dollar = R18, then to buy goods costing US$100 you would need:",
      ["R18", "R118", "R1 800", "R100"],
      2,
      "Rand amount = US$100 × R18 = R1 800.",
    ],
    [
      "When a foreign tourist arrives in South Africa, they will usually need to:",
      [
        "keep using only their own currency in all shops",
        "post their money back home",
        "avoid spending any money",
        "exchange their foreign currency for rands",
      ],
      3,
      "Foreign tourists usually convert their home currency into the local currency (rands) in order to spend money in South Africa.",
    ],
    [
      "If the rand WEAKENS against the US dollar (for example from R18 to R20 per dollar), then for tourists holding US dollars, South Africa becomes:",
      [
        "cheaper to visit, because their dollars buy more rands",
        "more expensive to visit",
        "impossible to visit",
        "exactly the same price",
      ],
      0,
      "When the rand weakens, each dollar buys more rands, so dollar-holding tourists get more value and South Africa becomes a cheaper destination for them.",
    ],
    [
      "A South African travelling overseas who needs foreign currency would typically obtain it from:",
      [
        "a supermarket till",
        "a bank or a registered bureau de change",
        "a petrol station",
        "a post-office stamp counter",
      ],
      1,
      "Travellers buy foreign currency from banks or from a registered bureau de change (a foreign-exchange dealer).",
    ],
    [
      "A traveller exchanges R10 000 into US dollars at a rate of R20 = US$1. How many dollars do they receive (ignoring fees)?",
      ["US$200 000", "US$2 000", "US$500", "US$200"],
      2,
      "Dollar amount = R10 000 ÷ R20 = US$500.",
    ],
    [
      "The official currency used in most countries of the European Union is the:",
      ["rand", "dollar", "yen", "euro"],
      3,
      "The euro (€) is the official currency used by most member countries of the European Union (the eurozone).",
    ],
  ],
  "Tourism Attractions (World & SA Icons)": [
    [
      "Table Mountain, a famous flat-topped mountain and a New7Wonder of Nature, overlooks which South African city?",
      ["Cape Town", "Durban", "Johannesburg", "Bloemfontein"],
      0,
      "Table Mountain overlooks Cape Town and is one of the New7Wonders of Nature.",
    ],
    [
      "The Eiffel Tower, a world-famous iron tower and tourist icon, is located in:",
      ["London", "Paris (France)", "Rome", "New York"],
      1,
      "The Eiffel Tower is located in Paris, France.",
    ],
    [
      "The Kruger National Park, one of Africa's largest game reserves, is especially famous for viewing the:",
      ["Northern Lights", "Great Barrier Reef", "Big Five animals", "Egyptian pyramids"],
      2,
      "The Kruger National Park is renowned for game viewing, especially the Big Five: lion, leopard, elephant, rhino and buffalo.",
    ],
    [
      "The Statue of Liberty, a famous tourist landmark, is found in which city?",
      ["Paris", "London", "Cape Town", "New York (USA)"],
      3,
      "The Statue of Liberty stands in New York Harbour in the United States.",
    ],
    [
      "The Victoria Falls, one of the world's largest waterfalls, lies on the border between Zambia and:",
      ["Zimbabwe", "Egypt", "Kenya", "Nigeria"],
      0,
      "The Victoria Falls, on the Zambezi River, lies on the border between Zambia and Zimbabwe.",
    ],
    [
      "The Great Pyramids of Giza, an ancient world icon, are located in:",
      ["South Africa", "Egypt", "Greece", "India"],
      1,
      "The Great Pyramids of Giza are located near Cairo in Egypt.",
    ],
    [
      "Robben Island, a World Heritage Site near Cape Town, is best known as the place where:",
      [
        "the 2010 World Cup final was held",
        "the Eiffel Tower stands",
        "Nelson Mandela was imprisoned",
        "gold was first discovered",
      ],
      2,
      "Robben Island is famous as the prison where Nelson Mandela was held for many years; it is now a World Heritage Site and museum.",
    ],
    [
      "The Taj Mahal, a white marble mausoleum and famous world icon, is located in:",
      ["Brazil", "Australia", "South Africa", "India"],
      3,
      "The Taj Mahal is located in Agra, India.",
    ],
  ],
  "Responsible & Sustainable Tourism": [
    [
      "'Sustainable tourism' means tourism that:",
      [
        "meets present needs without harming the ability of future generations to enjoy the same resources",
        "uses up all the resources as quickly as possible",
        "completely ignores the environment",
        "only ever benefits the tourists",
      ],
      0,
      "Sustainable tourism meets the needs of present tourists and host communities while protecting and enhancing opportunities for the future.",
    ],
    [
      "The 'triple bottom line' of responsible tourism refers to balancing:",
      [
        "only profit",
        "people (social), planet (environmental) and profit (economic)",
        "only the environment",
        "only the tourists' comfort",
      ],
      1,
      "Responsible tourism's triple bottom line balances social (people), environmental (planet) and economic (profit) responsibility.",
    ],
    [
      "Which of the following is an example of ENVIRONMENTALLY responsible tourism?",
      [
        "littering at a beach",
        "leaving taps running in a hotel",
        "reducing water use and not littering in a nature reserve",
        "driving off-road through fragile sand dunes",
      ],
      2,
      "Conserving water and not littering are environmentally responsible actions that protect the natural environment for the future.",
    ],
    [
      "Buying locally made crafts and using local guides is an example of responsible tourism that provides:",
      [
        "environmental benefits only",
        "no real responsibility",
        "harm to local communities",
        "economic and social benefits to local communities",
      ],
      3,
      "Supporting local crafters and guides keeps tourism income in the community, an economically and socially responsible practice.",
    ],
    [
      "'Ecotourism' is best described as:",
      [
        "responsible travel to natural areas that conserves the environment and benefits local people",
        "building large factories in nature reserves",
        "mass tourism with no rules at all",
        "tourism that pollutes rivers and lakes",
      ],
      0,
      "Ecotourism is responsible travel to natural areas that conserves the environment, sustains the wellbeing of local people and involves education.",
    ],
    [
      "Which action by a hotel would BEST reduce its impact on the environment?",
      [
        "leaving all the lights on overnight",
        "using solar power and recycling waste",
        "wasting food every day",
        "dumping sewage into a nearby river",
      ],
      1,
      "Using solar power and recycling waste reduces a hotel's energy use and pollution, lowering its environmental impact.",
    ],
    [
      "A benefit of responsible tourism for a local community is that it:",
      [
        "forces people to move away",
        "destroys the local culture",
        "creates jobs and supports local businesses",
        "increases pollution in the area",
      ],
      2,
      "Responsible tourism creates employment and income for local people and supports local businesses, helping the community to develop.",
    ],
    [
      "The 'carrying capacity' of a tourist attraction refers to:",
      [
        "how much luggage a tourist may bring",
        "the price of entry to the site",
        "the number of staff employed there",
        "the maximum number of visitors a site can handle without being damaged",
      ],
      3,
      "Carrying capacity is the maximum number of visitors a destination can support at one time without damaging the environment or spoiling the visitor experience.",
    ],
  ],
  "Customer Care & Professionalism": [
    [
      "Good customer service in tourism means:",
      [
        "meeting and exceeding customers' needs in a friendly, helpful way",
        "ignoring customers' complaints",
        "being rude to tourists",
        "overcharging the customers",
      ],
      0,
      "Good customer service means understanding and meeting (or exceeding) customers' needs in a friendly, professional and helpful manner.",
    ],
    [
      "When a tourist makes a complaint, a professional employee should:",
      [
        "argue with the tourist",
        "listen carefully, apologise and try to solve the problem",
        "ignore the tourist completely",
        "blame the tourist for the problem",
      ],
      1,
      "A professional handles complaints by listening attentively, apologising where appropriate and taking steps to resolve the problem.",
    ],
    [
      "Which of the following shows professional behaviour by a tour guide?",
      [
        "arriving late and unprepared",
        "being dishonest with the guests",
        "being punctual, knowledgeable and well-groomed",
        "ignoring the group's questions",
      ],
      2,
      "Professional tour guides are punctual, knowledgeable, neatly presented and attentive to their guests' needs and questions.",
    ],
    [
      "'Verbal communication' with a tourist is shown by:",
      ["body language only", "a written email", "a printed brochure", "speaking clearly and politely to the tourist"],
      3,
      "Verbal communication is spoken communication — speaking clearly and politely. Email and brochures are written, and body language is non-verbal.",
    ],
    [
      "An example of effective NON-VERBAL communication is:",
      ["smiling and making eye contact", "shouting loudly", "speaking very quickly", "writing a long letter"],
      0,
      "Non-verbal communication includes facial expressions and gestures such as smiling and making eye contact, which make tourists feel welcome.",
    ],
    [
      "Being aware of and respecting the different customs of international tourists is known as:",
      ["ignoring them", "cultural sensitivity (awareness)", "being unprofessional", "giving poor service"],
      1,
      "Cultural sensitivity means being aware of and respecting the cultural differences and customs of tourists from different backgrounds.",
    ],
    [
      "The main reason businesses aim to provide excellent customer service is that satisfied customers:",
      [
        "never come back again",
        "tell others nothing about the business",
        "return and recommend the business to others",
        "always demand refunds",
      ],
      2,
      "Satisfied customers are likely to return (repeat business) and to recommend the business to others, which increases income and reputation.",
    ],
    [
      "A professional appearance for a tourism employee includes:",
      [
        "an untidy, dirty uniform",
        "chewing gum while talking to guests",
        "ignoring personal hygiene",
        "a clean, neat uniform and good personal hygiene",
      ],
      3,
      "A professional tourism employee wears a clean, neat uniform and maintains good personal hygiene, creating a positive impression on tourists.",
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
