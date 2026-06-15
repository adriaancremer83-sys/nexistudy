// Seeds the Grade 10 Information Technology (IT) theory bank (6 topics x 8
// questions). CAPS-aligned, objectively-checkable only (number-system basics,
// hardware categories, software basics, networking intro, database & programming
// foundations). Pitched a level BELOW the Gr11 IT bank and DISTINCT from BOTH
// the Gr11 and Gr12 IT banks: same six CAPS content areas, but entirely new,
// more basic facts and DIFFERENT binary conversions (none of the Gr11 items —
// 0110=6, 8=1000, primary key, validation, redundancy, constant, IPO, syntax
// error, etc. — are reused). Also distinct from the Gr10 CAT bank (CAT = basic
// computer literacy; IT here goes into binary, data types and algorithms).
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but NOT option order). Every conversion was checked by
// computation during drafting.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade10-it.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Information Technology";
const GRADE = "Grade 10";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Number Systems & Data Representation": [
    [
      "The binary number system uses only which two digits?",
      ["0 and 1", "1 and 2", "0 to 9", "A and B"],
      0,
      "Binary is a base-2 system that uses only the two digits 0 and 1.",
    ],
    [
      "What is the denary (decimal) value of the binary number 0011?",
      ["1", "3", "5", "11"],
      1,
      "0011 = (0×8) + (0×4) + (1×2) + (1×1) = 2 + 1 = 3.",
    ],
    [
      "The denary number 5 is written in binary as:",
      ["0011", "0100", "0101", "1010"],
      2,
      "5 = (0×8) + (1×4) + (0×2) + (1×1) = 4 + 1, which is written as 0101 in binary.",
    ],
    [
      "Approximately how many bytes are there in one kilobyte (KB)?",
      ["10", "100", "8", "about 1 000 (1 024)"],
      3,
      "One kilobyte is about 1 000 bytes (exactly 1 024), the next unit up from a single byte.",
    ],
    [
      "Why do computers use the binary system to represent data?",
      [
        "because their electronic circuits have two states: on (1) and off (0)",
        "because people have ten fingers",
        "because it is exactly the same as the decimal system",
        "because it uses the letters A to F",
      ],
      0,
      "A computer's circuits have two states — on and off — which are represented by the binary digits 1 and 0.",
    ],
    [
      "What is the denary value of the binary number 1001?",
      ["5", "9", "11", "100"],
      1,
      "1001 = (1×8) + (0×4) + (0×2) + (1×1) = 8 + 1 = 9.",
    ],
    [
      "A 'kilobyte' is approximately one thousand:",
      ["bits", "gigabytes", "bytes", "megabytes"],
      2,
      "A kilobyte is roughly one thousand bytes; a megabyte is about a thousand kilobytes, and a gigabyte about a thousand megabytes.",
    ],
    [
      "The denary number 4 is written in binary as:",
      ["0001", "0010", "1000", "0100"],
      3,
      "4 = (0×8) + (1×4) + (0×2) + (0×1), which is written as 0100 in binary.",
    ],
  ],
  "Hardware: Input, Output & Storage Devices": [
    [
      "Which of the following is an INPUT device?",
      ["a monitor", "a mouse", "a printer", "a speaker"],
      1,
      "A mouse sends input (movement and clicks) into the computer; a monitor, printer and speaker are output devices.",
    ],
    [
      "Which of the following is an OUTPUT device?",
      ["a scanner", "a keyboard", "a monitor (screen)", "a microphone"],
      2,
      "A monitor displays output from the computer; the scanner, keyboard and microphone are input devices.",
    ],
    [
      "The 'brain' of the computer, which carries out instructions and processes data, is the:",
      ["monitor", "printer", "hard drive", "CPU (central processing unit)"],
      3,
      "The CPU (central processing unit) is the part that processes data and carries out the program instructions.",
    ],
    [
      "A 'scanner' is an input device used to:",
      [
        "convert a printed document or photo into a digital image",
        "print documents onto paper",
        "display pictures on a screen",
        "play sound through the speakers",
      ],
      0,
      "A scanner reads a printed page or photo and converts it into a digital image that the computer can store and use.",
    ],
    [
      "A USB flash drive is an example of a:",
      ["processing device", "storage device", "output device", "display device"],
      1,
      "A USB flash drive stores data so it can be saved and carried around, making it a (secondary) storage device.",
    ],
    [
      "Which device produces 'hard copy' — a printout on paper?",
      ["a monitor", "a speaker", "a printer", "a microphone"],
      2,
      "A printer produces hard copy (a physical printout on paper); a monitor produces soft copy on the screen.",
    ],
    [
      "A webcam and a microphone are both examples of ___ devices.",
      ["output", "storage", "processing", "input"],
      3,
      "A webcam captures video and a microphone captures sound, so both send data into the computer as input devices.",
    ],
    [
      "The monitor, the speakers and the printer are all examples of ___ devices.",
      ["output", "input", "storage", "processing"],
      0,
      "These devices all present results from the computer to the user (pictures, sound, printouts), so they are output devices.",
    ],
  ],
  "System & Application Software": [
    [
      "Which of the following is an example of an operating system?",
      ["Microsoft Word", "Google Chrome", "Windows", "a USB cable"],
      2,
      "Windows is an operating system (system software). Word and Chrome are application software, and a USB cable is hardware.",
    ],
    [
      "'Application software' is software designed to:",
      [
        "control the computer's hardware",
        "boot up the computer",
        "manage the computer's memory",
        "help the user do a specific task, such as writing a letter or editing a photo",
      ],
      3,
      "Application software helps the user carry out particular tasks, such as word processing, editing photos or browsing the web.",
    ],
    [
      "Which of the following is an example of application software?",
      [
        "a web browser like Google Chrome",
        "the Windows operating system",
        "a device driver",
        "the computer's BIOS",
      ],
      0,
      "A web browser is application software used for a user task; the OS, drivers and BIOS are system software.",
    ],
    [
      "The two main categories of software are:",
      [
        "input software and output software",
        "system software and application software",
        "hard software and soft software",
        "free software and paid software",
      ],
      1,
      "Software is divided into system software (which runs the computer) and application software (which performs user tasks).",
    ],
    [
      "'Antivirus' is an example of ___ software, which helps to protect and maintain the computer.",
      ["word-processing", "operating-system", "utility", "gaming"],
      2,
      "Antivirus is a type of utility software, which performs maintenance and protection tasks for the computer.",
    ],
    [
      "A program that lets you create and edit documents containing text is a:",
      ["spreadsheet", "web browser", "database", "word processor"],
      3,
      "A word processor is application software for creating and editing text documents such as letters and reports.",
    ],
    [
      "A 'spreadsheet' program is used mainly to:",
      [
        "work with numbers, calculations and tables of data",
        "edit videos",
        "control the computer's hardware",
        "connect the computer to Wi-Fi",
      ],
      0,
      "A spreadsheet is used to organise numbers and data in rows and columns and to perform calculations on them.",
    ],
    [
      "A 'web browser' such as Chrome or Edge is application software used to:",
      [
        "boot up the computer",
        "view web pages on the internet",
        "manage the computer's memory",
        "print documents",
      ],
      1,
      "A web browser is used to access and view web pages and websites on the internet.",
    ],
  ],
  "Computer Networks & Communications": [
    [
      "A 'computer network' is:",
      [
        "a single computer used by one person",
        "a type of printer",
        "a word-processing program",
        "two or more computers connected together to share data and resources",
      ],
      3,
      "A network is two or more connected computers that can share data and resources such as files and printers.",
    ],
    [
      "A network that covers a large geographical area, such as a whole country, is a:",
      ["WAN (Wide Area Network)", "LAN (Local Area Network)", "single PC", "printer"],
      0,
      "A WAN (Wide Area Network) connects computers over a large area, such as between cities or countries.",
    ],
    [
      "The largest WAN in the world, connecting millions of computers globally, is the:",
      ["school computer lab", "internet", "office printer", "single keyboard"],
      1,
      "The internet is the world's largest wide area network, linking millions of computers and smaller networks worldwide.",
    ],
    [
      "The device that joins a home network together and connects it to the internet is a:",
      ["scanner", "monitor", "router", "webcam"],
      2,
      "A router connects the devices on a home network to one another and to the internet.",
    ],
    [
      "Network cabling (such as fibre or UTP) and Wi-Fi are two ways of providing a network's:",
      ["software", "printer", "monitor", "communication medium (the connection between devices)"],
      3,
      "The communication medium is the path that carries data between devices; it can be a cable (wired) or Wi-Fi (wireless).",
    ],
    [
      "One advantage of using a network is that users can:",
      [
        "share a single printer among many computers",
        "never communicate with each other",
        "lose all their files automatically",
        "stop the computers from working",
      ],
      0,
      "On a network, resources such as a printer and an internet connection can be shared among many computers.",
    ],
    [
      "'Email' is a network service used to:",
      [
        "print photographs",
        "send electronic messages between people",
        "cool down the CPU",
        "store files permanently",
      ],
      1,
      "Email (electronic mail) lets people send and receive text messages and attachments over a network.",
    ],
    [
      "When you connect your phone to the school's Wi-Fi, you are joining a:",
      ["printer", "single offline computer", "wireless network", "spreadsheet"],
      2,
      "Wi-Fi lets a device join a network wirelessly using radio signals, so connecting your phone joins a wireless network.",
    ],
  ],
  "Database Concepts": [
    [
      "A 'database' is best described as:",
      [
        "an organised collection of related data, stored so it can be searched and used easily",
        "a single photograph",
        "a type of printer",
        "a programming language",
      ],
      0,
      "A database is an organised, structured collection of related data that can be searched, sorted and used efficiently.",
    ],
    [
      "Which of these is an everyday example of a database?",
      [
        "a single song playing",
        "a school's list of all its learners and their details",
        "a light switch",
        "a paperclip",
      ],
      1,
      "A school's record of all its learners and their details is a database — an organised collection of related data.",
    ],
    [
      "In a database table, the data is arranged in:",
      ["circles and triangles", "one single long line", "rows and columns", "random piles"],
      2,
      "A database table arranges data in rows (records) and columns (fields).",
    ],
    [
      "The main purpose of 'sorting' a database is to:",
      [
        "delete all the data",
        "change the data into pictures",
        "make the computer slower",
        "arrange the records in a particular order, such as alphabetically",
      ],
      3,
      "Sorting arranges the records in a chosen order — for example alphabetically or from smallest to largest — making data easier to read.",
    ],
    [
      "A 'query' (search) in a database is used to:",
      [
        "find and display only the records that match certain conditions",
        "switch off the computer",
        "print the keyboard",
        "delete the operating system",
      ],
      0,
      "A query searches the database and returns only the records that meet the conditions you set, such as all learners in Grade 10.",
    ],
    [
      "One advantage of storing information in a computer database instead of on paper is that:",
      [
        "it can never be changed",
        "data can be searched and sorted quickly and easily",
        "it always gets lost",
        "it uses far more paper",
      ],
      1,
      "A computer database can be searched, sorted and updated quickly and easily, unlike paper records.",
    ],
    [
      "Which data type would best store a learner's age, which is a whole number?",
      ["text", "picture", "number (integer)", "sound"],
      2,
      "An age is a whole number, so it is best stored using a number (integer) data type, which also allows calculations.",
    ],
    [
      "Which data type would best store a learner's first name?",
      ["number", "date", "yes/no", "text (string)"],
      3,
      "A name is made up of letters (characters), so it is stored using a text (string) data type.",
    ],
  ],
  "Algorithms & Programming Basics": [
    [
      "An 'algorithm' is best described as:",
      [
        "a type of computer virus",
        "a step-by-step set of instructions to solve a problem or complete a task",
        "a piece of computer hardware",
        "a network cable",
      ],
      1,
      "An algorithm is a clear, step-by-step set of instructions for solving a problem or carrying out a task.",
    ],
    [
      "A 'variable' in a program is:",
      [
        "a fixed number that can never change",
        "a type of printer",
        "a named storage location whose value can change while the program runs",
        "a network device",
      ],
      2,
      "A variable is a named storage location in memory that holds a value which can change as the program runs.",
    ],
    [
      "A 'loop' (iteration) in a program is used to:",
      [
        "store a single value",
        "connect to the internet",
        "give a file a name",
        "repeat a set of instructions a number of times",
      ],
      3,
      "A loop (iteration) repeats a block of instructions, which saves the programmer from writing the same steps over and over.",
    ],
    [
      "Finding and fixing errors in a program is called:",
      ["debugging", "booting", "printing", "saving"],
      0,
      "Debugging is the process of finding and correcting errors (bugs) in a program so that it works correctly.",
    ],
    [
      "In programming, the symbols >, < and = are examples of:",
      ["arithmetic operators", "comparison (relational) operators", "data types", "loops"],
      1,
      "Comparison (relational) operators such as >, < and = compare two values and give a true or false result.",
    ],
    [
      "A 'boolean' data type can store only one of two values, namely:",
      ["any whole number", "any piece of text", "true or false", "a date"],
      2,
      "A boolean data type stores only one of two values: true or false.",
    ],
    [
      "If a program runs without crashing but gives the WRONG answer, this is most likely a:",
      ["syntax error", "power failure", "broken keyboard", "logic error"],
      3,
      "A logic error lets the program run but produces the wrong result, because the logic or formula used is incorrect.",
    ],
    [
      "The first step when solving a problem with a program is usually to:",
      [
        "understand the problem and plan the solution before writing any code",
        "switch off the computer",
        "delete all the files",
        "print the screen",
      ],
      0,
      "Good programming starts with understanding the problem and planning the solution before any code is written.",
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
