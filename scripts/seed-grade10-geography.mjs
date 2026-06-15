// Seeds the Grade 10 Geography question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only (definitions, classifications,
// map-skill facts/calculations). Grade 10 level. Topics are fully DISTINCT from
// the Gr11 bank (Gr11 = atmosphere composition/heating/moisture, rock-structure
// landforms, development, resources; Gr10 here = mapwork, Earth structure &
// plate tectonics, folding/faulting/earthquakes/volcanoes, population, the water
// cycle, settlements).
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but NOT option order).
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade10-geography.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Geography";
const GRADE = "Grade 10";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Map Skills & Mapwork": [
    [
      "On most maps, the direction at the top of the map is:",
      ["north", "south", "east", "west"],
      0,
      "By convention, north is at the top of a map unless a north arrow shows otherwise.",
    ],
    [
      "A line on a topographic map that joins all points of equal height above sea level is a:",
      ["river", "contour line", "road", "latitude line"],
      1,
      "A contour line joins points of equal height (altitude) above sea level; closely spaced contours show steep slopes.",
    ],
    [
      "The four main (cardinal) compass directions are:",
      [
        "north-east, south-east, south-west and north-west",
        "up, down, left and right",
        "north, east, south and west",
        "x, y, latitude and longitude",
      ],
      2,
      "The four cardinal points are north, east, south and west; NE, SE, SW and NW are the intercardinal directions in between.",
    ],
    [
      "Lines that run east to west around the globe and measure distance north or south of the equator are lines of:",
      ["longitude", "elevation", "the prime meridian", "latitude"],
      3,
      "Lines of latitude (parallels) run east–west and measure the angular distance north or south of the equator (0°).",
    ],
    [
      "When contour lines on a map are very close together, the slope of the land is:",
      ["steep", "gentle", "flat", "below sea level"],
      0,
      "Closely spaced contour lines indicate a steep slope; widely spaced contours indicate a gentle slope.",
    ],
    [
      "On a map with a scale of 1 : 50 000, 1 cm on the map represents an actual distance of:",
      ["50 m", "500 m (0.5 km)", "5 km", "50 km"],
      1,
      "1 cm × 50 000 = 50 000 cm = 500 m (0.5 km) on the ground.",
    ],
    [
      "A system that captures, stores and analyses spatial (geographic) data on a computer is known as:",
      ["GPS only", "a contour map", "a Geographic Information System (GIS)", "a weather station"],
      2,
      "A Geographic Information System (GIS) captures, stores, analyses and displays geographic (spatial) data in layers on a computer.",
    ],
    [
      "Lines that run from the North Pole to the South Pole and measure distance east or west of the prime meridian are lines of:",
      ["latitude", "the equator", "contour", "longitude"],
      3,
      "Lines of longitude (meridians) run north–south and measure the angular distance east or west of the prime meridian (0°).",
    ],
  ],
  "The Structure of the Earth & Plate Tectonics": [
    [
      "The three main layers of the Earth, from the outside inwards, are the:",
      [
        "crust, mantle and core",
        "core, mantle and crust",
        "mantle, crust and core",
        "atmosphere, crust and mantle",
      ],
      0,
      "From the outside inwards, the Earth's three main layers are the crust, the mantle and the core.",
    ],
    [
      "The thin, solid, outermost layer of the Earth, on which we live, is the:",
      ["mantle", "crust", "outer core", "inner core"],
      1,
      "The crust is the thin, solid, outermost layer of the Earth.",
    ],
    [
      "The theory that the Earth's outer shell is divided into large plates that move slowly over time is called:",
      ["the water cycle", "the greenhouse effect", "plate tectonics", "the rock cycle"],
      2,
      "Plate tectonics is the theory that the Earth's lithosphere is broken into large plates that move slowly, driven by movement in the mantle.",
    ],
    [
      "The idea that the continents were once joined in a single supercontinent that later broke apart is called:",
      ["plate tectonics", "the rock cycle", "the water cycle", "continental drift"],
      3,
      "Continental drift is the idea (proposed by Alfred Wegener) that the continents were once joined and have since drifted apart.",
    ],
    [
      "The single supercontinent that is believed to have existed before the continents drifted apart is called:",
      ["Pangaea", "Africa", "Antarctica", "Eurasia"],
      0,
      "Pangaea was the single supercontinent that, according to continental drift, later broke apart to form today's continents.",
    ],
    [
      "The very hot, thick layer between the crust and the core, which makes up most of the Earth's volume, is the:",
      ["crust", "mantle", "outer core", "atmosphere"],
      1,
      "The mantle is the thick, hot layer between the crust and the core and makes up the largest part of the Earth's volume.",
    ],
    [
      "Most earthquakes and volcanoes occur:",
      [
        "in the middle of continents",
        "only at the equator",
        "along the boundaries where tectonic plates meet",
        "only in the oceans far from any plate",
      ],
      2,
      "Most earthquakes and volcanoes occur along plate boundaries, where plates move against, apart from or past one another.",
    ],
    [
      "The slow movement of the tectonic plates is mainly driven by:",
      ["the rotation of the Moon", "ocean tides", "the wind", "convection currents in the mantle"],
      3,
      "Heat from the core sets up convection currents in the mantle, which slowly move the tectonic plates above them.",
    ],
  ],
  "Folding, Faulting, Earthquakes & Volcanoes": [
    [
      "When layers of rock are squeezed and bent by compression forces, the process is called:",
      ["folding", "faulting", "erosion", "weathering"],
      0,
      "Folding occurs when compression forces squeeze and bend layers of rock without breaking them.",
    ],
    [
      "When rocks crack and the blocks move along the crack because of tension or pressure, the process is called:",
      ["folding", "faulting", "condensation", "deposition"],
      1,
      "Faulting occurs when rocks fracture (crack) and the blocks move relative to each other along the fault line.",
    ],
    [
      "The point inside the Earth where an earthquake originates is called the:",
      ["epicentre", "crater", "focus", "vent"],
      2,
      "The focus (or hypocentre) is the point inside the Earth where an earthquake originates; the epicentre is the point on the surface directly above it.",
    ],
    [
      "The point on the Earth's SURFACE directly above where an earthquake starts is called the:",
      ["focus", "magma chamber", "crater", "epicentre"],
      3,
      "The epicentre is the point on the Earth's surface directly above the focus of an earthquake.",
    ],
    [
      "The molten rock found BELOW the Earth's surface is called:",
      ["magma", "lava", "ash", "pumice"],
      0,
      "Molten rock beneath the surface is called magma; once it erupts onto the surface it is called lava.",
    ],
    [
      "Molten rock that has erupted onto the Earth's surface from a volcano is called:",
      ["magma", "lava", "the mantle", "sediment"],
      1,
      "Lava is molten rock that has reached and flows on the Earth's surface; below the surface the same material is called magma.",
    ],
    [
      "The instrument used to measure and record the strength of earthquakes is the:",
      ["barometer", "thermometer", "seismograph", "anemometer"],
      2,
      "A seismograph (seismometer) detects and records the vibrations (seismic waves) produced by earthquakes.",
    ],
    [
      "An upfold (arch shape) in folded rock layers is called an:",
      ["fault", "epicentre", "syncline", "anticline"],
      3,
      "An anticline is an upfold (arch-shaped fold) in rock layers; a downfold (trough shape) is called a syncline.",
    ],
  ],
  "Population Geography": [
    [
      "The number of live births per 1 000 people per year is called the:",
      ["birth rate", "death rate", "literacy rate", "migration rate"],
      0,
      "The birth rate (natality) is the number of live births per 1 000 people in a population per year.",
    ],
    [
      "The number of deaths per 1 000 people per year is called the:",
      ["birth rate", "death rate", "growth rate", "fertility rate"],
      1,
      "The death rate (mortality) is the number of deaths per 1 000 people in a population per year.",
    ],
    [
      "The natural increase of a population is calculated as:",
      ["death rate + birth rate", "death rate × birth rate", "birth rate − death rate", "births + deaths"],
      2,
      "Natural increase = birth rate − death rate; it is the growth of a population before migration is taken into account.",
    ],
    [
      "The number of people living per square kilometre is called population:",
      ["growth", "migration", "structure", "density"],
      3,
      "Population density is the average number of people living per unit area (per square kilometre).",
    ],
    [
      "A graph that shows the age and sex (gender) structure of a population is called a:",
      ["population pyramid", "pie chart", "contour map", "weather chart"],
      0,
      "A population pyramid is a graph showing the distribution of a population by age group and sex.",
    ],
    [
      "The movement of people from rural areas to towns and cities is called:",
      ["emigration abroad", "urbanisation", "natural increase", "commuting only"],
      1,
      "Urbanisation is the movement of people from rural areas into towns and cities, increasing the urban population.",
    ],
    [
      "When people move permanently OUT of a country to live in another, it is called:",
      ["immigration", "natural increase", "emigration", "urbanisation"],
      2,
      "Emigration is when people leave (move out of) their country to settle permanently in another country.",
    ],
    [
      "A 'push factor' that causes people to leave an area could be:",
      ["good job opportunities", "excellent schools", "a safe environment", "unemployment and a lack of services"],
      3,
      "Push factors drive people away from an area — for example unemployment, poverty, conflict or a lack of services. Pull factors attract people to a new area.",
    ],
  ],
  "Water Resources & the Water Cycle": [
    [
      "The process by which the Sun's heat changes liquid water into water vapour is called:",
      ["evaporation", "condensation", "precipitation", "infiltration"],
      0,
      "Evaporation is the change of liquid water into water vapour (a gas) caused by heat from the Sun.",
    ],
    [
      "The process by which water vapour cools and changes back into tiny water droplets, forming clouds, is called:",
      ["evaporation", "condensation", "runoff", "transpiration"],
      1,
      "Condensation is the change of water vapour into liquid droplets as it cools, forming clouds.",
    ],
    [
      "Water that falls from clouds as rain, snow, sleet or hail is called:",
      ["evaporation", "infiltration", "precipitation", "runoff"],
      2,
      "Precipitation is water that falls from the atmosphere to the ground as rain, snow, sleet or hail.",
    ],
    [
      "The total area of land drained by a river and all its tributaries is called the:",
      ["watershed", "confluence", "estuary", "drainage basin (catchment area)"],
      3,
      "A drainage basin (catchment area) is the whole area of land drained by a river and all its tributaries.",
    ],
    [
      "The point where two rivers (or a tributary and the main river) join is called the:",
      ["confluence", "source", "mouth", "watershed"],
      0,
      "A confluence is the point where two rivers, or a tributary and the main river, meet and join.",
    ],
    [
      "The place where a river begins, often in the mountains, is called its:",
      ["mouth", "source", "confluence", "delta"],
      1,
      "The source is the starting point of a river, often a spring or high ground such as mountains.",
    ],
    [
      "A smaller river or stream that flows into a larger main river is called a:",
      ["mouth", "delta", "tributary", "watershed"],
      2,
      "A tributary is a smaller stream or river that flows into and joins a larger main river.",
    ],
    [
      "The high ground (dividing line) that separates one drainage basin from another is called the:",
      ["confluence", "tributary", "source", "watershed"],
      3,
      "A watershed is the high ground or dividing line that separates one drainage basin (catchment area) from another.",
    ],
  ],
  "Settlement Geography": [
    [
      "A settlement in the countryside, often based on farming and with a small population, is a ___ settlement.",
      ["rural", "urban", "industrial", "central"],
      0,
      "A rural settlement is found in the countryside, usually with a smaller population and often based on farming.",
    ],
    [
      "A large settlement such as a city or town, with many people, services and industries, is an ___ settlement.",
      ["rural", "urban", "isolated", "dispersed"],
      1,
      "An urban settlement (a town or city) has a large population and a wide range of services, jobs and industries.",
    ],
    [
      "A settlement pattern in which buildings are clustered closely together around a central point is described as:",
      ["dispersed", "linear", "nucleated", "random"],
      2,
      "A nucleated settlement pattern has buildings clustered closely together, often around a central feature such as a church or crossroads.",
    ],
    [
      "A settlement that is spread out along a road, river or valley in a line is described as a ___ pattern.",
      ["nucleated", "dispersed", "circular", "linear"],
      3,
      "A linear settlement is stretched out in a line, usually along a route such as a road, river or coastline.",
    ],
    [
      "A settlement pattern in which buildings are spread far apart, common on farmland, is described as:",
      ["dispersed", "nucleated", "linear", "clustered"],
      0,
      "A dispersed settlement pattern has buildings spread out and far apart, typical of farming areas.",
    ],
    [
      "The range of goods, services and activities that a settlement provides is known as its:",
      ["population pyramid", "function", "latitude", "contour"],
      1,
      "The function of a settlement refers to the main goods, services and activities it provides (for example a mining town or a market town).",
    ],
    [
      "The growth in the proportion of people living in towns and cities is called:",
      ["emigration", "deforestation", "urbanisation", "evaporation"],
      2,
      "Urbanisation is the increase in the proportion of a population living in urban areas (towns and cities).",
    ],
    [
      "Which of the following is usually a feature of a RURAL area rather than an urban area?",
      [
        "many tall office buildings",
        "heavy traffic and large shopping malls",
        "a very high population density",
        "large open spaces and farmland",
      ],
      3,
      "Rural areas typically have large open spaces, farmland and a low population density, unlike the built-up, crowded nature of urban areas.",
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
