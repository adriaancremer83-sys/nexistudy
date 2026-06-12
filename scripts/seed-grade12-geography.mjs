// Seeds the Grade 12 Geography question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only (definitions, map calculations, facts).
// Every numeric/map calculation double-checked during drafting.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade12-geography.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Geography";
const GRADE = "Grade 12";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Climate & Weather": [
    [
      "A mid-latitude cyclone forms where:",
      [
        "two warm air masses meet",
        "a warm and a cold air mass meet along fronts",
        "two cold air masses meet",
        "a tropical and a monsoon air mass meet",
      ],
      1,
      "Mid-latitude (temperate) cyclones develop along the fronts where a warm air mass and a cold air mass meet, in the 30°–60° latitude belt.",
    ],
    [
      "On a synoptic weather map, the lines joining places of equal air pressure are called:",
      ["isobars", "isotherms", "isohyets", "contours"],
      0,
      "Isobars join places of equal air pressure. (Isotherms join equal temperature, isohyets equal rainfall, contours equal height.)",
    ],
    [
      "In the Southern Hemisphere, air circulates around a high-pressure cell (anticyclone) in a(n):",
      ["clockwise direction", "anticlockwise direction", "straight line", "random direction"],
      1,
      "Because the Coriolis force deflects moving air to the left in the Southern Hemisphere, anticyclones rotate anticlockwise (and cyclones clockwise).",
    ],
    [
      "Which high-pressure cell develops over the interior of South Africa in winter?",
      ["The Kalahari High", "The South Atlantic High", "The South Indian High", "The Hawaiian High"],
      0,
      "The Kalahari (continental) High builds over the cool interior plateau in winter. The South Atlantic and South Indian Highs sit over the oceans.",
    ],
    [
      "A tropical cyclone weakens and dies out when it:",
      [
        "moves over warm ocean water",
        "moves over land or cooler water",
        "reaches the equator",
        "meets a warm front",
      ],
      1,
      "Tropical cyclones are fed by warm, moist ocean air. Once they move over land or cooler water, that energy source is cut off and they weaken.",
    ],
    [
      "The urban heat island effect describes how:",
      [
        "cities are cooler than the surrounding rural areas",
        "cities are warmer than the surrounding rural areas",
        "islands form in the ocean near cities",
        "parks cool the whole region",
      ],
      1,
      "Concrete, tar and human activity make built-up cities warmer than the surrounding rural areas — the urban heat island.",
    ],
    [
      "On a synoptic weather map, a cold front is shown by a line marked with:",
      [
        "triangles pointing in the direction of movement",
        "semicircles",
        "alternating triangles and semicircles",
        "small circles",
      ],
      0,
      "A cold front is drawn with triangles (barbs) pointing the way it moves. Semicircles mark a warm front; both symbols together mark an occluded front.",
    ],
    [
      "Berg winds along the South African coast are typically:",
      ["cold and moist", "hot and dry", "cold and dry", "warm and moist"],
      1,
      "Berg winds blow from the interior plateau down to the coast; as the air descends it is compressed and warms, making it hot and dry.",
    ],
  ],
  "Geomorphology (Fluvial)": [
    [
      "A drainage pattern that develops on uniform, gently sloping rock and branches like a tree is described as:",
      ["dendritic", "trellis", "radial", "rectangular"],
      0,
      "A dendritic pattern (from the Greek for 'tree') forms on uniform rock and resembles the branching of a tree.",
    ],
    [
      "The whole area drained by a single river and its tributaries is called a:",
      ["watershed", "drainage basin (catchment)", "confluence", "tributary"],
      1,
      "A drainage basin, or catchment, is the entire area whose water is collected by one river system.",
    ],
    [
      "The point where a tributary joins the main river is called the:",
      ["source", "confluence", "mouth", "watershed"],
      1,
      "A confluence is where two streams meet. The source is where a river begins and the mouth is where it ends.",
    ],
    [
      "In which part of its course does a river flow fastest over steep gradients and erode mainly vertically (downwards)?",
      ["the upper course", "the middle course", "the lower course", "the mouth"],
      0,
      "In the upper course the steep gradient gives the river energy to erode vertically, cutting a deep V-shaped valley.",
    ],
    [
      "The area of higher ground that separates two neighbouring drainage basins is called a:",
      ["watershed", "confluence", "floodplain", "delta"],
      0,
      "A watershed is the dividing line of high ground between two drainage basins.",
    ],
    [
      "A river in an arid region that flows only briefly after a rainstorm and is dry for the rest of the time is described as:",
      ["perennial", "periodic", "episodic", "permanent"],
      2,
      "An episodic river flows only occasionally after rain. A perennial river flows all year, while a periodic river flows seasonally.",
    ],
    [
      "Meanders and floodplains are landforms typical of a river's:",
      ["upper course", "lower course", "source", "watershed"],
      1,
      "In the lower course the gradient is gentle and lateral erosion and deposition produce meanders and broad floodplains.",
    ],
    [
      "River capture (river piracy) occurs when:",
      [
        "one river erodes headward and diverts the flow of another river",
        "two rivers simply join at a confluence",
        "a dam is built across a river",
        "a river overflows its banks",
      ],
      0,
      "River capture happens when a more powerful river erodes backwards (headward) until it cuts into and diverts the water of a neighbouring river.",
    ],
  ],
  "Settlement Geography": [
    [
      "A settlement where most people make a living from farming is best described as a ___ settlement.",
      ["urban", "rural", "industrial", "nucleated"],
      1,
      "Rural settlements are in the countryside and their economy is based mainly on farming and other primary activities.",
    ],
    [
      "A settlement pattern where buildings are clustered closely together around a central point is described as:",
      ["dispersed", "nucleated", "linear", "random"],
      1,
      "A nucleated settlement has its buildings grouped tightly together, often around a feature such as a crossroads or water source.",
    ],
    [
      "A settlement that is stretched out in a line along a road, river or valley shows a ___ pattern.",
      ["nucleated", "linear", "dispersed", "circular"],
      1,
      "A linear (ribbon) settlement develops in a long, narrow line, usually following a route or physical feature.",
    ],
    [
      "The 'range' of a good or service is:",
      [
        "the maximum distance people are willing to travel to obtain it",
        "the minimum number of people needed to support it",
        "the size of the shop",
        "the profit the shop makes",
      ],
      0,
      "The range is the greatest distance customers are prepared to travel for a good or service. (The minimum number of customers needed is the threshold.)",
    ],
    [
      "The 'threshold' of a service is:",
      [
        "the maximum distance customers will travel",
        "the minimum number of customers needed for it to survive",
        "the height of the building",
        "the number of competitors nearby",
      ],
      1,
      "The threshold is the minimum number of people (customers) needed before a service can operate profitably.",
    ],
    [
      "A high-order good or service, such as a specialist hospital, typically has:",
      [
        "a small range and a low threshold",
        "a large range and a high threshold",
        "no threshold at all",
        "an outlet in every small town",
      ],
      1,
      "High-order services are used less often and need many customers, so they have a high threshold and people travel far for them (large range).",
    ],
    [
      "The movement of people from rural areas to towns and cities is called:",
      ["urbanisation (rural-urban migration)", "suburbanisation", "deforestation", "gentrification"],
      0,
      "Urbanisation through rural-urban migration is the movement of people from the countryside into towns and cities.",
    ],
    [
      "An area of poor-quality, often self-built housing on the edge of a city is commonly called a(n):",
      [
        "central business district",
        "informal (squatter) settlement",
        "green belt",
        "commercial zone",
      ],
      1,
      "Informal settlements are unplanned areas of self-built housing, often on the urban fringe, that usually lack basic services.",
    ],
  ],
  "Economic Geography of South Africa": [
    [
      "Mining and farming are examples of ___ economic activities.",
      ["primary", "secondary", "tertiary", "quaternary"],
      0,
      "Primary activities extract raw materials directly from nature, such as mining, farming, fishing and forestry.",
    ],
    [
      "Manufacturing, in which raw materials are processed into finished goods, is a ___ activity.",
      ["primary", "secondary", "tertiary", "quaternary"],
      1,
      "Secondary activities process or manufacture raw materials into useful products, for example a factory or a refinery.",
    ],
    [
      "Services such as banking, retail and transport belong to the ___ sector.",
      ["primary", "secondary", "tertiary", "agricultural"],
      2,
      "Tertiary activities provide services rather than goods — for example banking, retail, transport and tourism.",
    ],
    [
      "South Africa's largest industrial region, centred on Johannesburg and Gauteng, is:",
      ["the PWV / Gauteng region", "the Western Cape", "Richards Bay", "the Vaal alone"],
      0,
      "The PWV (Pretoria–Witwatersrand–Vereeniging), now Gauteng, is South Africa's largest and most important industrial region.",
    ],
    [
      "The informal sector is best described as economic activity that is:",
      [
        "registered and taxed",
        "unregistered and not taxed",
        "owned by the government",
        "found only in rural areas",
      ],
      1,
      "The informal sector consists of small, unregistered businesses that are not taxed or officially recorded, such as street vendors.",
    ],
    [
      "An industry that loses a lot of mass during processing, and so locates near its raw materials, is called a ___ industry.",
      [
        "raw-material oriented (weight-losing)",
        "market oriented",
        "footloose",
        "labour-intensive",
      ],
      0,
      "Weight-losing (raw-material oriented) industries locate near their raw materials to reduce transport costs, because the product is lighter than the inputs.",
    ],
    [
      "A 'footloose' industry is one that:",
      [
        "must be located near its raw materials",
        "is not tied to any particular location",
        "can only operate at the coast",
        "depends on heavy, bulky raw materials",
      ],
      1,
      "Footloose industries (such as electronics) are not tied to raw materials or a single location, so they can be set up in many places.",
    ],
    [
      "South Africa's export economy depends heavily on:",
      [
        "minerals such as gold, platinum and coal",
        "tropical fruit only",
        "oil and natural gas",
        "manufactured electronics",
      ],
      0,
      "South Africa is a major exporter of minerals — especially gold, platinum and coal — which remain central to its economy.",
    ],
  ],
  "Map Skills — Calculations": [
    [
      "On a 1 : 50 000 topographic map, 1 cm represents an actual distance of:",
      ["0.5 km", "5 km", "50 km", "500 km"],
      0,
      "1 cm × 50 000 = 50 000 cm = 500 m = 0.5 km.",
    ],
    [
      "On a 1 : 50 000 map, a straight road measures 4 cm. The actual distance is:",
      ["0.5 km", "1 km", "2 km", "20 km"],
      2,
      "Each cm represents 0.5 km, so 4 cm × 0.5 km = 2 km.",
    ],
    [
      "Gradient is calculated using the formula:",
      [
        "vertical interval ÷ horizontal distance",
        "horizontal distance ÷ vertical interval",
        "vertical interval × horizontal distance",
        "vertical interval + horizontal distance",
      ],
      0,
      "Gradient = vertical interval ÷ horizontal distance (the rise divided by the run), expressed as a ratio like 1 : 20.",
    ],
    [
      "The vertical interval between two points is 100 m and the horizontal distance is 2 000 m. The gradient is:",
      ["1 : 5", "1 : 20", "1 : 200", "1 : 2 000"],
      1,
      "Gradient = 100 ÷ 2 000 = 1 ÷ 20, written as 1 : 20.",
    ],
    [
      "The Earth rotates 15° of longitude per hour, so 1° of longitude is equal to:",
      ["1 minute", "4 minutes", "15 minutes", "60 minutes"],
      1,
      "60 minutes ÷ 15° = 4 minutes per degree of longitude.",
    ],
    [
      "South African Standard Time (SAST) is based on the meridian of longitude:",
      ["15°E", "30°E", "0° (Greenwich)", "30°W"],
      1,
      "SAST is set on 30°E, which makes South Africa two hours ahead of Greenwich (GMT+2).",
    ],
    [
      "Vertical exaggeration of a cross-section is calculated as:",
      [
        "vertical scale ÷ horizontal scale",
        "horizontal scale ÷ vertical scale",
        "vertical scale × horizontal scale",
        "vertical scale + horizontal scale",
      ],
      0,
      "Vertical exaggeration = vertical scale ÷ horizontal scale. It shows how many times the vertical scale has been stretched.",
    ],
    [
      "A vehicle travels 30 km in 30 minutes. Its average speed is:",
      ["15 km/h", "30 km/h", "60 km/h", "90 km/h"],
      2,
      "30 minutes is half an hour, so speed = 30 km ÷ 0.5 h = 60 km/h.",
    ],
  ],
  "Map Skills — Concepts & GIS": [
    [
      "On a topographic map, the brown lines joining points of equal height above sea level are called:",
      ["contour lines", "isobars", "isohyets", "grid lines"],
      0,
      "Contour lines join points of equal height above sea level and show the shape and steepness of the land.",
    ],
    [
      "When contour lines on a map are very close together, the slope is:",
      ["gentle", "steep", "flat", "concave only"],
      1,
      "Closely spaced contour lines mean height changes rapidly over a short distance, so the slope is steep.",
    ],
    [
      "The compass direction exactly halfway between North and East is:",
      ["north-east", "north-west", "south-east", "east-south-east"],
      0,
      "North-east (NE) lies halfway between North and East, at a bearing of 045°.",
    ],
    [
      "A true bearing is measured in degrees:",
      [
        "clockwise from north (0° to 360°)",
        "anticlockwise from north",
        "clockwise from south",
        "from east to west",
      ],
      0,
      "A true bearing is measured clockwise from true north, from 0° up to 360°.",
    ],
    [
      "In mapping, 'GIS' stands for:",
      [
        "Geographic Information System",
        "Global Imaging Software",
        "General Information Service",
        "Geological Inspection System",
      ],
      0,
      "GIS stands for Geographic Information System — computer software that captures, stores and analyses spatial (geographic) data.",
    ],
    [
      "In a GIS, information about one theme, such as rivers or roads, is stored in a separate:",
      ["layer", "pixel", "contour", "legend"],
      0,
      "A GIS stores each theme in its own layer; layers can be overlaid to analyse relationships between different sets of data.",
    ],
    [
      "Spatial data in a GIS that is made up of points, lines and polygons is called:",
      ["vector data", "raster data", "analogue data", "verbal data"],
      0,
      "Vector data represents features as points, lines and polygons. Raster data, by contrast, is made up of a grid of pixels (cells).",
    ],
    [
      "In a GIS, a 'buffer' is:",
      [
        "a zone of a set distance created around a feature",
        "a type of contour line",
        "the map's legend",
        "a weather satellite",
      ],
      0,
      "A buffer is a zone drawn at a specified distance around a point, line or area — for example a 1 km protection zone around a river.",
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
