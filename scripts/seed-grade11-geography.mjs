// Seeds the Grade 11 Geography question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only (definitions, classifications,
// climatology/geomorphology facts, development indicators). DISTINCT from the
// Gr12 Geography bank: Gr11-centric topics (atmosphere composition & heating,
// moisture/rainfall types, rock-structure geomorphology, development geography,
// resources & sustainability) rather than Gr12 synoptic weather systems and
// fluvial geomorphology. Correct-answer positions are spread evenly A-D per
// topic because the quiz engine shuffles question order, not option order.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade11-geography.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Geography";
const GRADE = "Grade 11";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "The Atmosphere: Composition & Structure": [
    [
      "The most abundant gas in the Earth's atmosphere is:",
      ["nitrogen", "oxygen", "carbon dioxide", "argon"],
      0,
      "Nitrogen makes up about 78% of the atmosphere, the largest proportion of any gas.",
    ],
    [
      "Approximately what percentage of the atmosphere is made up of oxygen?",
      ["1%", "21%", "50%", "78%"],
      1,
      "Oxygen makes up about 21% of the atmosphere, while nitrogen makes up about 78%.",
    ],
    [
      "The lowest layer of the atmosphere, in which almost all weather occurs, is the:",
      ["stratosphere", "mesosphere", "troposphere", "thermosphere"],
      2,
      "The troposphere is the lowest layer of the atmosphere, where nearly all weather phenomena and clouds occur.",
    ],
    [
      "The ozone layer, which absorbs harmful ultraviolet radiation from the Sun, is found in the:",
      ["troposphere", "mesosphere", "thermosphere", "stratosphere"],
      3,
      "The ozone layer lies in the stratosphere and absorbs most of the Sun's harmful ultraviolet (UV) radiation.",
    ],
    [
      "Within the troposphere, temperature generally _____ as altitude increases.",
      ["decreases", "increases", "stays the same", "doubles"],
      0,
      "In the troposphere temperature normally decreases with height, at an average lapse rate of about 6.5 °C per 1000 m.",
    ],
    [
      "Which gas is most associated with the greenhouse effect and global warming?",
      ["nitrogen", "carbon dioxide", "argon", "oxygen"],
      1,
      "Carbon dioxide is a major greenhouse gas; rising levels trap more heat and contribute to global warming.",
    ],
    [
      "The thin layer of gases held around the Earth by gravity is called the:",
      ["lithosphere", "hydrosphere", "atmosphere", "biosphere"],
      2,
      "The atmosphere is the layer of gases surrounding the Earth, held in place by the Earth's gravity.",
    ],
    [
      "The depletion of the ozone layer is mainly caused by human-made chemicals called:",
      ["nitrogen oxides only", "water vapour", "oxygen molecules", "chlorofluorocarbons (CFCs)"],
      3,
      "Chlorofluorocarbons (CFCs), once widely used in aerosols and refrigerants, break down ozone and are the main cause of ozone-layer depletion.",
    ],
  ],
  "Heating of the Atmosphere": [
    [
      "The Earth's main source of energy and heat is:",
      ["the Sun (solar radiation)", "the Moon", "volcanoes", "the oceans"],
      0,
      "The Sun is the Earth's main source of energy; incoming solar radiation (insolation) heats the Earth and atmosphere.",
    ],
    [
      "Incoming solar radiation received from the Sun is known as:",
      ["terrestrial radiation", "insolation", "convection", "conduction"],
      1,
      "Insolation (INcoming SOLar radiATION) is the solar energy received at the Earth's surface.",
    ],
    [
      "Heat transfer through the direct contact of the ground with the air immediately above it is called:",
      ["radiation", "convection", "conduction", "advection"],
      2,
      "Conduction transfers heat through direct contact — for example warm ground heating the layer of air touching it.",
    ],
    [
      "The vertical transfer of heat as warm air rises and cooler air sinks is called:",
      ["conduction", "radiation", "advection", "convection"],
      3,
      "Convection is the transfer of heat by the vertical movement of air — warm air rises and cooler air sinks to replace it.",
    ],
    [
      "Areas near the equator are generally hotter than areas near the poles because near the equator the Sun's rays:",
      [
        "strike the Earth more directly (closer to vertical)",
        "strike at a very low angle",
        "never reach the surface",
        "are completely blocked by ozone",
      ],
      0,
      "Near the equator the Sun's rays strike the surface more directly, concentrating their energy over a smaller area, so it is hotter than at the poles.",
    ],
    [
      "As altitude increases up a mountain, the temperature generally:",
      ["increases", "decreases", "stays exactly the same", "rises and then doubles"],
      1,
      "Temperature normally decreases with increasing altitude, which is why high mountains are colder and may be snow-capped.",
    ],
    [
      "Which surface would reflect the most incoming solar radiation (have the highest albedo)?",
      ["a dark tar road", "a dark forest", "fresh white snow", "deep ocean water"],
      2,
      "Fresh white snow has a high albedo, reflecting most of the incoming solar radiation, whereas dark surfaces absorb more.",
    ],
    [
      "Heat radiated back into the atmosphere from the warmed surface of the Earth is called:",
      ["insolation", "solar radiation", "ultraviolet radiation", "terrestrial radiation"],
      3,
      "Terrestrial radiation is the heat radiated from the Earth's surface back into the atmosphere after it has been warmed by the Sun.",
    ],
  ],
  "Moisture in the Atmosphere": [
    [
      "The amount of water vapour present in the air is called:",
      ["humidity", "precipitation", "albedo", "insolation"],
      0,
      "Humidity is the amount of water vapour in the air; relative humidity expresses it as a percentage of the maximum the air can hold at that temperature.",
    ],
    [
      "The process by which water vapour changes into liquid water droplets is called:",
      ["evaporation", "condensation", "transpiration", "infiltration"],
      1,
      "Condensation is the change of water vapour (a gas) into liquid water droplets — for example when clouds or dew form.",
    ],
    [
      "The temperature to which air must be cooled for it to become saturated and condensation to begin is the:",
      ["boiling point", "lapse rate", "dew point", "freezing point"],
      2,
      "The dew point is the temperature at which air becomes saturated (100% relative humidity), so that further cooling causes condensation.",
    ],
    [
      "Rain that forms when moist air is forced to rise over a mountain is called:",
      ["convectional rainfall", "frontal rainfall", "drizzle", "relief (orographic) rainfall"],
      3,
      "Relief (orographic) rainfall forms when moist air is forced to rise over high ground, cooling and condensing to produce rain, mostly on the windward slope.",
    ],
    [
      "Rainfall caused by intense surface heating, rapidly rising warm moist air and towering cumulonimbus clouds (common on hot afternoons) is:",
      ["convectional rainfall", "relief rainfall", "frontal rainfall", "frost"],
      0,
      "Convectional rainfall occurs when strong surface heating makes warm moist air rise rapidly, forming cumulonimbus clouds and often thunderstorms.",
    ],
    [
      "Rainfall that occurs when a warm air mass meets and is forced to rise over a cold air mass along a front is called:",
      ["relief rainfall", "frontal rainfall", "convectional rainfall", "dew"],
      1,
      "Frontal rainfall forms where two air masses of different temperatures meet; the warm air is forced to rise over the cold air, cooling and producing rain.",
    ],
    [
      "Low cloud that forms at or near ground level, reducing visibility, is called:",
      ["cirrus", "cumulonimbus", "fog", "hail"],
      2,
      "Fog is essentially a cloud that forms at or near ground level, which reduces visibility.",
    ],
    [
      "Which of the following is a form of precipitation?",
      ["humidity", "evaporation", "condensation", "hail"],
      3,
      "Hail is a form of precipitation (along with rain, snow, sleet and drizzle). Humidity, evaporation and condensation are processes, not precipitation.",
    ],
  ],
  "Geomorphology: Rock Structure & Landforms": [
    [
      "A flat-topped hill with steep sides, larger than a butte but smaller than a plateau, formed from horizontal rock layers, is a:",
      ["mesa", "cuesta", "ridge", "valley"],
      0,
      "A mesa is a flat-topped, steep-sided hill formed from horizontally layered rock; it is larger than a butte but smaller than a plateau.",
    ],
    [
      "A small, steep-sided, flat-topped hill that is the last eroded remnant of a mesa is called a:",
      ["plateau", "butte", "spur", "delta"],
      1,
      "A butte is a small, steep-sided, flat-topped hill — the eroded remnant of a mesa, smaller in surface area.",
    ],
    [
      "A large, elevated, relatively flat area of land bounded by steep slopes is a:",
      ["butte", "mesa", "plateau", "floodplain"],
      2,
      "A plateau is an extensive, raised area of fairly level land bordered on at least one side by steep slopes.",
    ],
    [
      "A hill or ridge with one steep slope and one gentle slope, formed from gently inclined (tilted) rock strata, is a:",
      ["mesa", "butte", "plateau", "cuesta"],
      3,
      "A cuesta forms from gently inclined strata and is asymmetrical: it has one steep slope (the scarp) and one gentle slope (the dip slope).",
    ],
    [
      "A landscape of horizontally layered rocks of differing hardness typically produces a stepped slope pattern because:",
      [
        "harder layers resist erosion and form steeper sections, while softer layers erode more easily",
        "all the layers erode at exactly the same rate",
        "the softer layers never erode at all",
        "the rock is all of the same hardness",
      ],
      0,
      "Where horizontal layers differ in hardness, the resistant layers form steeper cliffs while the softer layers erode into gentler slopes, giving a stepped profile.",
    ],
    [
      "The steep slope of a cuesta, formed at the edge of the resistant rock layer, is called the:",
      ["dip slope", "scarp slope", "floodplain", "watershed"],
      1,
      "The scarp slope is the steep slope of a cuesta; the gentle slope that follows the angle of the dipping strata is the dip slope.",
    ],
    [
      "Landforms such as mesas, buttes and plateaus are typically associated with rock strata that are:",
      ["folded into mountains", "tilted steeply", "horizontally layered", "completely molten"],
      2,
      "Mesas, buttes and plateaus develop where rock strata lie horizontally — flat-lying layers of differing resistance.",
    ],
    [
      "The gentle slope of a cuesta, which follows the angle of the dipping rock layers, is called the:",
      ["scarp slope", "watershed", "cliff", "dip slope"],
      3,
      "The dip slope is the gentle slope of a cuesta that follows the angle (dip) of the inclined strata.",
    ],
  ],
  "Development Geography": [
    [
      "A country with a high income per person, advanced industry and good infrastructure is best described as a:",
      ["developed country", "developing country", "least developed country", "subsistence economy"],
      0,
      "A developed country has a high income per capita, advanced industry and services, and good infrastructure.",
    ],
    [
      "Which of the following is an indicator commonly used to measure a country's level of development?",
      ["the number of mountains", "Gross Domestic Product (GDP) per capita", "the design of the national flag", "the number of rivers"],
      1,
      "GDP per capita (the total value of goods and services produced, divided by the population) is a common economic indicator of development.",
    ],
    [
      "The Human Development Index (HDI) measures development using income, education and:",
      ["the total area of the country", "the population's favourite sport", "life expectancy (health)", "the number of cities"],
      2,
      "The HDI combines income (GNI per capita), education (years of schooling) and health (life expectancy) into a single development measure.",
    ],
    [
      "A high infant mortality rate in a country usually indicates:",
      ["a very high level of development", "excellent healthcare for everyone", "very high average incomes", "a lower level of development"],
      3,
      "A high infant mortality rate generally reflects poorer healthcare, nutrition and sanitation, and is associated with a lower level of development.",
    ],
    [
      "Which of the following is typical of a developing country?",
      [
        "a large percentage of workers in subsistence agriculture",
        "a very high GDP per capita",
        "an ageing population with very low birth rates",
        "almost everyone employed in financial services",
      ],
      0,
      "Developing countries often have a large share of the population in subsistence (small-scale) agriculture, with lower incomes and higher birth rates.",
    ],
    [
      "The gap between the rich and the poor within a country, often measured by the Gini coefficient, is referred to as:",
      ["the development index", "income inequality", "life expectancy", "the literacy rate"],
      1,
      "The Gini coefficient measures income inequality — the size of the gap between the rich and the poor within a country.",
    ],
    [
      "Financial or material help given by richer countries or organisations to poorer countries is called:",
      ["foreign trade", "globalisation", "development aid", "urbanisation"],
      2,
      "Development aid is assistance (money, goods or expertise) given by wealthier countries or organisations to help poorer countries develop.",
    ],
    [
      "The increasing connection and interdependence of countries through trade, technology and communication is called:",
      ["subsistence farming", "deforestation", "migration", "globalisation"],
      3,
      "Globalisation is the growing interconnection and interdependence of the world's countries through trade, technology, finance and communication.",
    ],
  ],
  "Resources & Sustainability": [
    [
      "A resource that can be replaced or replenished naturally within a short time, such as solar or wind energy, is called:",
      ["a renewable resource", "a non-renewable resource", "a fossil fuel", "a mineral resource"],
      0,
      "A renewable resource can be replenished naturally within a relatively short time — for example solar, wind, hydro and biomass energy.",
    ],
    [
      "Coal, oil and natural gas are examples of:",
      ["renewable resources", "non-renewable (fossil-fuel) resources", "solar resources", "wind resources"],
      1,
      "Coal, oil and natural gas are fossil fuels — non-renewable resources that take millions of years to form and will eventually run out.",
    ],
    [
      "The removal of fertile topsoil by wind or running water is called:",
      ["irrigation", "afforestation", "soil erosion", "condensation"],
      2,
      "Soil erosion is the wearing away and removal of fertile topsoil by agents such as wind and running water.",
    ],
    [
      "Which farming practice helps to REDUCE soil erosion on slopes?",
      [
        "ploughing straight up and down the slope",
        "removing all the vegetation",
        "overgrazing the land",
        "contour ploughing and planting cover crops",
      ],
      3,
      "Contour ploughing (along the contours) and cover crops slow run-off and hold the soil in place, reducing erosion. The other options increase erosion.",
    ],
    [
      "Which of the following is a renewable (non-conventional) energy source?",
      ["wind power", "coal", "petrol", "natural gas"],
      0,
      "Wind power is a renewable, non-conventional energy source. Coal, petrol and natural gas are non-renewable fossil fuels.",
    ],
    [
      "In South Africa, most electricity has traditionally been generated by:",
      ["wind farms", "burning coal", "nuclear power only", "solar panels"],
      1,
      "South Africa has traditionally generated most of its electricity by burning coal in thermal power stations.",
    ],
    [
      "Using resources in a way that meets present needs without harming the ability of future generations to meet their needs is called:",
      ["overexploitation", "deforestation", "sustainable use (sustainability)", "pollution"],
      2,
      "Sustainable use (sustainability) means using resources carefully so that present needs are met without compromising the needs of future generations.",
    ],
    [
      "Which of the following is a major reason to conserve water in South Africa?",
      [
        "South Africa has unlimited water",
        "water is not needed for farming",
        "rainfall is very high everywhere in the country",
        "South Africa is a water-scarce country with limited, uneven rainfall",
      ],
      3,
      "South Africa is a water-scarce country with relatively low and uneven rainfall, so water must be conserved and managed carefully.",
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
