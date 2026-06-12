// Seeds the Grade 12 Tourism question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only (definitions, time/forex calculations,
// geography facts). Correct-answer positions spread evenly A-D per topic.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade12-tourism.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Tourism";
const GRADE = "Grade 12";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Tourism Sectors & Industry": [
    [
      "A person who travels to and stays in a place outside their usual environment for less than a year for leisure or business is a:",
      ["tourist", "resident", "citizen", "commuter"],
      0,
      "A tourist travels to and stays in a place outside their usual environment for less than a year for leisure, business or other purposes.",
    ],
    [
      "Which of the following forms part of the accommodation sector?",
      ["an airline", "a hotel", "a car-rental company", "a travel agency"],
      1,
      "A hotel is part of the accommodation sector. Airlines and car rental fall under transport, and a travel agency under travel services.",
    ],
    [
      "A business that sells travel products such as flights, tours and accommodation to the public on behalf of suppliers is a:",
      ["museum", "airline", "travel agency", "hotel"],
      2,
      "A travel agency sells travel products (flights, tours, accommodation) to the public on behalf of suppliers, earning commission.",
    ],
    [
      "Tour operators differ from travel agents in that tour operators:",
      [
        "only sell airline tickets",
        "provide accommodation only",
        "transport luggage only",
        "design and package the tours that agents then sell",
      ],
      3,
      "Tour operators put together (package) tours by combining transport, accommodation and activities; travel agents then sell these to the public.",
    ],
    [
      "Air, road, rail and sea travel all belong to the ___ sector.",
      ["transport", "accommodation", "catering", "entertainment"],
      0,
      "Air, road, rail and sea travel make up the transport sector of the tourism industry.",
    ],
    [
      "A 'domestic tourist' is someone who:",
      [
        "travels to another country",
        "travels within their own country",
        "never travels at all",
        "works at an airport",
      ],
      1,
      "A domestic tourist travels within the borders of their own country (e.g. a South African holidaying in Durban).",
    ],
    [
      "The tourism multiplier effect refers to how:",
      [
        "tourists multiply in number each year",
        "hotels multiply their prices",
        "tourist spending circulates and benefits the wider economy",
        "the number of flights is doubled",
      ],
      2,
      "The tourism multiplier effect describes how money spent by tourists is re-spent and circulates, benefiting many businesses and the wider economy.",
    ],
    [
      "Which of the following is an example of a tourist attraction?",
      ["a passport", "a credit card", "a boarding pass", "Table Mountain"],
      3,
      "Table Mountain is a natural tourist attraction. A passport, credit card and boarding pass are travel items, not attractions.",
    ],
  ],
  "World Time Zones & Travel": [
    [
      "The world is divided into time zones based on lines of:",
      ["latitude", "longitude", "altitude", "contour"],
      1,
      "Time zones are based on lines of longitude (meridians), measured east and west of the prime meridian.",
    ],
    [
      "The Earth rotates through 360° in 24 hours, which means 1 hour is equal to:",
      ["10° of longitude", "20° of longitude", "30° of longitude", "15° of longitude"],
      3,
      "360° ÷ 24 hours = 15° of longitude per hour.",
    ],
    [
      "As you travel EAST across time zones, you:",
      ["gain time (clocks go forward)", "lose time", "stay on the same time", "stop the clock"],
      0,
      "Travelling east, you move towards earlier (ahead) time zones, so clocks go forward and you gain time.",
    ],
    [
      "As you travel WEST across time zones, clocks generally go:",
      ["forward", "to GMT", "backward", "stop"],
      2,
      "Travelling west, you move into later (behind) time zones, so clocks go backward and you lose time.",
    ],
    [
      "Greenwich Mean Time (GMT) is measured at the prime meridian, which lies at:",
      ["90°E", "0° longitude", "180°", "30°E"],
      1,
      "The prime meridian, where GMT is measured, is the line of 0° longitude (running through Greenwich, London).",
    ],
    [
      "South African Standard Time is:",
      ["GMT −2", "GMT +0", "GMT +5", "GMT +2"],
      3,
      "South African Standard Time is two hours ahead of Greenwich, i.e. GMT +2 (based on 30°E).",
    ],
    [
      "If it is 12:00 (noon) GMT, the time in South Africa (GMT +2) is:",
      ["14:00", "10:00", "12:00", "16:00"],
      0,
      "South Africa is 2 hours ahead of GMT, so 12:00 + 2 hours = 14:00.",
    ],
    [
      "A city at GMT +8 is how many hours ahead of a city at GMT +2?",
      ["2 hours", "4 hours", "6 hours", "8 hours"],
      2,
      "The difference is 8 − 2 = 6 hours, so the GMT +8 city is 6 hours ahead.",
    ],
  ],
  "Foreign Exchange": [
    [
      "The exchange rate is best described as:",
      [
        "the price of one currency in terms of another",
        "a tax on imports",
        "an interest rate",
        "the price of gold",
      ],
      0,
      "An exchange rate is the price of one currency expressed in terms of another, e.g. R20 = US$1.",
    ],
    [
      "When a tourist BUYS foreign currency from a bank before travelling, the bank uses the:",
      ["bank buying rate (BBR)", "interest rate", "bank selling rate (BSR)", "prime rate"],
      2,
      "The bank is selling foreign currency to the tourist, so it applies the bank selling rate (BSR).",
    ],
    [
      "When a returning tourist exchanges leftover foreign currency back into rand, the bank uses the:",
      ["bank selling rate (BSR)", "bank buying rate (BBR)", "prime rate", "repo rate"],
      1,
      "The bank is buying the foreign currency back from the tourist, so it applies the bank buying rate (BBR).",
    ],
    [
      "A tourist exchanges R10 000 into US dollars at a rate of R20 = US$1. How many dollars do they receive?",
      ["$2 000", "$5 000", "$50", "$500"],
      3,
      "Divide rands by the rate: R10 000 ÷ 20 = US$500.",
    ],
    [
      "A tourist buys £200 when the rate is R23 = £1. How much does it cost in rand?",
      ["R4 600", "R2 300", "R460", "R200"],
      0,
      "Multiply by the rate: 200 × R23 = R4 600.",
    ],
    [
      "If the rand weakens (depreciates) against the US dollar, travelling to the USA becomes:",
      ["cheaper", "free", "more expensive for South Africans", "impossible"],
      2,
      "A weaker rand means each rand buys fewer dollars, so a trip to the USA costs South Africans more.",
    ],
    [
      "A tourist exchanges €300 back into rand at a rate of R19 = €1. How much do they receive?",
      ["R3 000", "R5 700", "R570", "R300"],
      1,
      "Multiply by the rate: 300 × R19 = R5 700.",
    ],
    [
      "Foreign exchange earned from international tourists benefits South Africa because it:",
      [
        "reduces local jobs",
        "raises taxes automatically",
        "prints more money",
        "brings foreign currency into the country",
      ],
      3,
      "International tourists spend foreign currency in South Africa, bringing foreign exchange into the country and helping the balance of payments.",
    ],
  ],
  "Tourism Geography (SA & World)": [
    [
      "The administrative capital of South Africa, home to the Union Buildings, is:",
      ["Pretoria (Tshwane)", "Cape Town", "Bloemfontein", "Durban"],
      0,
      "Pretoria (Tshwane) is the administrative capital and seat of the executive, where the Union Buildings are located.",
    ],
    [
      "Cape Town is the ___ capital of South Africa.",
      ["administrative", "legislative", "judicial", "financial"],
      1,
      "Cape Town is the legislative capital, where Parliament sits.",
    ],
    [
      "Bloemfontein is the ___ capital of South Africa.",
      ["administrative", "legislative", "judicial", "economic"],
      2,
      "Bloemfontein is the judicial capital, home of the Supreme Court of Appeal.",
    ],
    [
      "The Kruger National Park, a major wildlife attraction, is located mainly in which provinces?",
      ["Western Cape", "KwaZulu-Natal", "Gauteng", "Mpumalanga and Limpopo"],
      3,
      "The Kruger National Park lies mainly across Mpumalanga and Limpopo in the north-east of South Africa.",
    ],
    [
      "The Eiffel Tower is a famous tourist icon located in:",
      ["Paris, France", "London, England", "Rome, Italy", "New York, USA"],
      0,
      "The Eiffel Tower is the iconic landmark of Paris, France.",
    ],
    [
      "The Statue of Liberty is found in:",
      ["London", "New York, USA", "Sydney", "Cairo"],
      1,
      "The Statue of Liberty stands in New York Harbour in the USA.",
    ],
    [
      "The Great Pyramids of Giza are located in:",
      ["Greece", "Mexico", "Egypt", "India"],
      2,
      "The Great Pyramids of Giza are in Egypt, near Cairo.",
    ],
    [
      "The Sydney Opera House is an iconic attraction in:",
      ["Brazil", "China", "Canada", "Australia"],
      3,
      "The Sydney Opera House is a landmark of Sydney, Australia.",
    ],
  ],
  "World Heritage & Culture": [
    [
      "The organisation that designates World Heritage Sites is:",
      ["UNESCO", "SADC", "FIFA", "OPEC"],
      0,
      "UNESCO (the United Nations Educational, Scientific and Cultural Organization) designates World Heritage Sites.",
    ],
    [
      "A World Heritage Site is a place recognised for its:",
      [
        "cheap accommodation",
        "outstanding cultural or natural value to humanity",
        "large shopping malls",
        "fast-food outlets",
      ],
      1,
      "A World Heritage Site is recognised for its outstanding universal cultural or natural value to humanity.",
    ],
    [
      "Robben Island is a South African World Heritage Site best known as:",
      [
        "a large shopping centre",
        "a ski resort",
        "the prison where Nelson Mandela was held",
        "a motor-racing track",
      ],
      2,
      "Robben Island, off Cape Town, is famous as the prison where Nelson Mandela and others were held; it is a World Heritage Site.",
    ],
    [
      "Which of the following is a South African World Heritage Site?",
      ["the Eiffel Tower", "Big Ben", "the Colosseum", "the Cradle of Humankind"],
      3,
      "The Cradle of Humankind, near Johannesburg, is a South African World Heritage Site rich in hominid fossils.",
    ],
    [
      "The Taj Mahal, a World Heritage Site, is located in:",
      ["India", "China", "Egypt", "Peru"],
      0,
      "The Taj Mahal is in Agra, India.",
    ],
    [
      "'Cultural tourism' involves travelling mainly to experience:",
      [
        "only the beaches",
        "the history, traditions and customs of a place",
        "only shopping centres",
        "only sports events",
      ],
      1,
      "Cultural tourism focuses on experiencing the history, traditions, customs and way of life of a destination's people.",
    ],
    [
      "The Great Wall is a World Heritage Site located in:",
      ["Japan", "India", "China", "Russia"],
      2,
      "The Great Wall is in China.",
    ],
    [
      "Machu Picchu, an ancient Inca site and World Heritage Site, is located in:",
      ["Mexico", "Brazil", "Chile", "Peru"],
      3,
      "Machu Picchu is an Inca site high in the Andes of Peru.",
    ],
  ],
  "Travel Documents, Health & Responsible Tourism": [
    [
      "The official document required to travel internationally, issued by your home country, is a:",
      ["passport", "boarding pass", "loyalty card", "restaurant menu"],
      0,
      "A passport is the official identity and travel document issued by your home country for international travel.",
    ],
    [
      "An official endorsement in a passport that grants permission to enter a foreign country is a:",
      ["receipt", "visa", "tariff", "voucher"],
      1,
      "A visa is an endorsement in a passport that allows the holder to enter a particular foreign country.",
    ],
    [
      "'Jet lag' is best described as:",
      [
        "a fear of flying",
        "lost luggage",
        "tiredness and disorientation from quickly crossing several time zones",
        "a delayed flight",
      ],
      2,
      "Jet lag is the tiredness and disorientation that result from rapidly crossing several time zones, disrupting the body clock.",
    ],
    [
      "Deep Vein Thrombosis (DVT), a health risk on long flights, can be reduced by:",
      [
        "sitting completely still for the whole flight",
        "not drinking any water",
        "smoking during the flight",
        "moving and stretching the legs regularly",
      ],
      3,
      "Moving around and stretching the legs (and staying hydrated) on long flights helps reduce the risk of DVT (blood clots).",
    ],
    [
      "Responsible (sustainable) tourism means tourism that:",
      [
        "protects the environment and benefits local communities",
        "ignores the environment",
        "wastes natural resources",
        "excludes local people",
      ],
      0,
      "Responsible (sustainable) tourism protects the environment, respects local cultures and brings benefits to local communities.",
    ],
    [
      "Which of the following is an example of responsible tourist behaviour?",
      [
        "leaving litter behind at a site",
        "respecting local cultures and not littering",
        "damaging plants for souvenirs",
        "disturbing wildlife for photos",
      ],
      1,
      "Respecting local cultures and not littering is responsible behaviour. The other options harm the environment or communities.",
    ],
    [
      "Before travelling to a malaria-risk area, a tourist should:",
      [
        "ignore all health advice",
        "wear no protection",
        "take prophylaxis (anti-malaria medication) and use repellent",
        "travel only at night",
      ],
      2,
      "Travellers to malaria areas should take prophylaxis (preventive medication) and use measures such as repellent and nets to avoid bites.",
    ],
    [
      "Travel insurance is recommended because it:",
      [
        "guarantees good weather",
        "makes the flight faster",
        "is required to obtain a passport",
        "covers costs such as medical emergencies, cancellations or lost luggage",
      ],
      3,
      "Travel insurance covers unexpected costs such as medical emergencies, trip cancellations and lost luggage.",
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
