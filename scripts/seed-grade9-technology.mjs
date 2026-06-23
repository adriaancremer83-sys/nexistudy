// Seeds the Grade 9 Technology question bank (6 topics x 8 questions).
// CAPS Senior Phase Technology. Subject string "Technology" matches the Senior
// Phase subject list in app/nexi-tutor/page.tsx.
// Brand-new subject (no other grade has a Technology bank), so no cross-grade
// distinctness constraint. Objectively-checkable only — definitions, the design
// process sequence, structure/force types, gear-ratio sums, circuit facts,
// material processing, and technical-drawing facts.
// Every numeric answer (gear ratios, scale) double-checked by computation.
// Correct-answer positions spread evenly A-D per topic (engine shuffles question
// order, not option order). Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade9-technology.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Technology";
const GRADE = "Grade 9";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "The Design Process": [
    [
      "The first stage of the design process, where you identify the problem and find out more about it, is to:",
      ["investigate", "make", "evaluate", "communicate"],
      0,
      "The design process begins by investigating — identifying the problem and gathering information about it.",
    ],
    [
      "A short, clear statement that explains the problem to be solved is called the:",
      ["evaluation", "design brief", "prototype", "final product"],
      1,
      "A design brief is a short statement that explains the problem and what must be designed.",
    ],
    [
      "The stage of the design process in which you actually build the product is the ___ stage:",
      ["investigate", "design", "make", "evaluate"],
      2,
      "The 'make' stage is where the product is actually built.",
    ],
    [
      "The conditions a product must meet (for example 'must be waterproof' or 'must cost under R50') are called the design:",
      ["sketches", "materials", "tools", "specifications"],
      3,
      "Design specifications are the requirements or conditions the product must meet.",
    ],
    [
      "A first working model of a product, built to test whether the design works, is called a:",
      ["prototype", "blueprint", "brief", "survey"],
      0,
      "A prototype is an early working model made to test and improve the design before final production.",
    ],
    [
      "The stage in which you judge whether your product actually solved the problem well is the ___ stage:",
      ["make", "evaluate", "investigate", "design"],
      1,
      "During the 'evaluate' stage you test the product and judge how well it solved the problem.",
    ],
    [
      "Drawing several quick, rough idea-sketches to explore possible solutions is called:",
      ["evaluating", "testing", "brainstorming", "manufacturing"],
      2,
      "Brainstorming means generating and sketching many possible ideas before choosing one.",
    ],
    [
      "During which stage would you ask people what they need by using a survey or interview?",
      ["make", "evaluate", "communicate", "investigate"],
      3,
      "Surveys and interviews are used during the 'investigate' stage to understand the problem and people's needs.",
    ],
  ],
  "Structures": [
    [
      "A structure made of separate parts joined together to form a framework, such as an electricity pylon or a bridge, is a ___ structure:",
      ["frame", "shell", "solid", "liquid"],
      0,
      "A frame structure is built from parts (members) joined together into a framework, e.g. a pylon or crane.",
    ],
    [
      "A hollow structure that gets its strength from its curved outer shape, such as an egg or a dome, is a ___ structure:",
      ["frame", "shell", "solid", "open"],
      1,
      "A shell structure is hollow and gains its strength from its shape, e.g. an egg, dome or tortoise shell.",
    ],
    [
      "A pushing or squashing force that tries to crush a structure is called:",
      ["tension", "bending", "compression", "torsion"],
      2,
      "Compression is a pushing/squashing force that tries to crush or shorten a part.",
    ],
    [
      "A pulling or stretching force that tries to pull a structure apart is called:",
      ["compression", "shear", "torsion", "tension"],
      3,
      "Tension is a pulling/stretching force that tries to pull a part apart.",
    ],
    [
      "A part of a structure that is being squashed (in compression), such as a support column, is called a:",
      ["strut", "tie", "rope", "cable"],
      0,
      "A strut is a structural member that is in compression (being pushed/squashed).",
    ],
    [
      "A part of a structure that is being stretched (in tension), such as a cable, is called a:",
      ["strut", "tie", "column", "wall"],
      1,
      "A tie is a structural member that is in tension (being stretched/pulled).",
    ],
    [
      "Adding diagonal pieces to make a frame structure stronger and stiffer is called:",
      ["bending", "folding", "triangulation", "melting"],
      2,
      "Triangulation adds diagonal members to form triangles, which makes a frame much stiffer and stronger.",
    ],
    [
      "Which shape is the strongest and most stable for building rigid frame structures?",
      ["circle", "square", "rectangle", "triangle"],
      3,
      "The triangle is the strongest, most rigid shape because it cannot be pushed out of shape like a square can.",
    ],
  ],
  "Mechanical Systems & Control": [
    [
      "A simple machine that turns on a pivot to make work easier, such as a seesaw or a crowbar, is a:",
      ["lever", "gear", "pulley", "cam"],
      0,
      "A lever is a rigid bar that turns about a pivot (fulcrum) to make moving a load easier.",
    ],
    [
      "The fixed point about which a lever turns is called the:",
      ["load", "fulcrum", "effort", "beam"],
      1,
      "The fulcrum is the fixed pivot point about which a lever turns.",
    ],
    [
      "Two or more toothed wheels that mesh together to transfer movement are called:",
      ["pulleys", "levers", "gears", "axles"],
      2,
      "Gears are toothed wheels that mesh together to transfer rotary motion and force.",
    ],
    [
      "A driver gear has 10 teeth and the driven gear has 30 teeth. The gear ratio (driven : driver) is:",
      ["1 : 3", "10 : 1", "1 : 30", "3 : 1"],
      3,
      "Gear ratio (driven : driver) = 30 : 10 = 3 : 1.",
    ],
    [
      "When a small driver gear turns a larger driven gear, the larger gear turns:",
      ["slower, but with more turning force", "faster, with less force", "at exactly the same speed", "backwards only"],
      0,
      "A small gear driving a larger gear makes the larger gear turn more slowly but with greater turning force (torque).",
    ],
    [
      "A wheel with a groove and a rope or belt around it, used to lift or move loads, is a:",
      ["gear", "pulley", "cam", "lever"],
      1,
      "A pulley is a grooved wheel with a rope or belt over it, used to lift or move loads.",
    ],
    [
      "A specially shaped wheel that changes rotary (turning) motion into up-and-down (reciprocating) motion is a:",
      ["gear", "pulley", "cam", "axle"],
      2,
      "A cam is an oddly shaped wheel that converts rotary motion into reciprocating (up-and-down) motion.",
    ],
    [
      "A driver gear has 20 teeth and meshes with a driven gear of 40 teeth. If the driver turns 4 times, how many times does the driven gear turn?",
      ["4", "8", "1", "2"],
      3,
      "Teeth passed = 20 × 4 = 80; driven turns = 80 ÷ 40 = 2 times.",
    ],
  ],
  "Electrical Systems": [
    [
      "A complete path that allows electric current to flow is called a:",
      ["circuit", "switch", "conductor", "fuse"],
      0,
      "An electric circuit is a complete (closed) path that allows current to flow.",
    ],
    [
      "A component that stores chemical energy and supplies electrical energy to a circuit is a:",
      ["resistor", "cell (battery)", "switch", "lamp"],
      1,
      "A cell (or battery) stores chemical energy and supplies electrical energy to the circuit.",
    ],
    [
      "A material that allows electricity to flow through it easily, such as copper, is a:",
      ["insulator", "plastic", "conductor", "rubber"],
      2,
      "A conductor, such as copper, allows electric current to flow through it easily.",
    ],
    [
      "A component used to open or close a circuit, switching it off or on, is a:",
      ["resistor", "lamp", "cell", "switch"],
      3,
      "A switch opens or closes a circuit, turning the current off or on.",
    ],
    [
      "In a ___ circuit, all the components are connected one after another in a single loop:",
      ["series", "parallel", "broken", "open"],
      0,
      "In a series circuit the components are connected one after another in a single path/loop.",
    ],
    [
      "A component that resists or limits the flow of current in a circuit is a:",
      ["cell", "resistor", "switch", "wire"],
      1,
      "A resistor limits or controls the amount of current flowing in a circuit.",
    ],
    [
      "A material that does NOT allow electricity to flow through it easily, such as rubber, is an:",
      ["conductor", "metal", "insulator", "battery"],
      2,
      "An insulator, such as rubber or plastic, does not allow current to flow through it easily.",
    ],
    [
      "The unit used to measure electric current is the:",
      ["volt", "watt", "ohm", "ampere"],
      3,
      "Electric current is measured in amperes (amps).",
    ],
  ],
  "Processing of Materials": [
    [
      "Changing a raw material into a useful product by cutting, shaping and joining it is called ___ the material:",
      ["processing", "recycling", "melting", "weighing"],
      0,
      "Processing is changing a raw material into a useful product through steps like cutting, shaping and joining.",
    ],
    [
      "Wood, cotton and wool are examples of ___ materials:",
      ["synthetic", "natural", "plastic", "metal"],
      1,
      "Natural materials come from plants, animals or the earth — for example wood, cotton and wool.",
    ],
    [
      "Plastic and nylon, which people make from chemicals, are examples of ___ materials:",
      ["natural", "recycled", "synthetic", "wooden"],
      2,
      "Synthetic (man-made) materials such as plastic and nylon are manufactured from chemicals.",
    ],
    [
      "Which tool is used to make holes in wood or metal?",
      ["hammer", "saw", "file", "drill"],
      3,
      "A drill is used to make holes in materials such as wood or metal.",
    ],
    [
      "Joining two pieces of metal by melting them together is called:",
      ["welding", "gluing", "nailing", "stapling"],
      0,
      "Welding joins metals by melting the edges so they fuse together.",
    ],
    [
      "Joining electronic components or thin metal using a melted soft metal and a hot iron is called:",
      ["welding", "soldering", "screwing", "gluing"],
      1,
      "Soldering joins components or thin metal using melted solder applied with a soldering iron.",
    ],
    [
      "A saw is a tool used mainly to:",
      ["join materials", "paint materials", "cut materials", "measure materials"],
      2,
      "A saw is used to cut materials such as wood, metal or plastic.",
    ],
    [
      "Applying varnish or paint to protect a finished product and improve its appearance is called:",
      ["shaping", "joining", "marking", "finishing"],
      3,
      "Finishing means treating the surface (e.g. varnishing or painting) to protect the product and improve its look.",
    ],
  ],
  "Graphics & Technical Drawing": [
    [
      "A quick drawing done by hand, without rulers or instruments, is called a ___ sketch:",
      ["freehand", "scale", "isometric", "working"],
      0,
      "A freehand sketch is drawn by hand without the use of drawing instruments.",
    ],
    [
      "A 3D drawing in which the object is drawn on lines set at 30° to the horizontal is an ___ drawing:",
      ["oblique", "isometric", "orthographic", "freehand"],
      1,
      "An isometric drawing shows an object in 3D using lines drawn at 30° to the horizontal.",
    ],
    [
      "A drawing that shows the front, top and side views of an object separately is called an ___ (working) drawing:",
      ["isometric", "oblique", "orthographic", "pictorial"],
      2,
      "An orthographic drawing shows separate 2D views (front, top, side) and is used as a working drawing.",
    ],
    [
      "On a drawing, the measurements that show the real sizes of an object are called the:",
      ["labels", "colours", "titles", "dimensions"],
      3,
      "Dimensions are the measurements added to a drawing to show the real sizes of the object.",
    ],
    [
      "A drawing made smaller or larger than the real object, in a fixed ratio, is called a ___ drawing:",
      ["scale", "freehand", "rough", "colour"],
      0,
      "A scale drawing represents the object larger or smaller than real life, using a fixed ratio.",
    ],
    [
      "A scale of 1 : 2 means the drawing is:",
      ["twice the real size", "half the real size", "exactly the real size", "ten times the real size"],
      1,
      "A scale of 1 : 2 means 1 unit on the drawing equals 2 units in real life, so the drawing is half the real size.",
    ],
    [
      "Which instrument is used to draw accurate circles?",
      ["ruler", "pencil", "compass", "eraser"],
      2,
      "A pair of compasses is used to draw accurate circles and arcs.",
    ],
    [
      "An isometric drawing is used to show an object in:",
      ["one view only", "flat 2D outline", "text form", "three dimensions (3D)"],
      3,
      "An isometric drawing shows an object in three dimensions (3D), so its length, width and height are all visible.",
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
