// Seeds the Grade 11 Information Technology (IT) theory bank (6 topics x 8
// questions). CAPS-aligned, objectively-checkable only (number-system
// conversions, hardware/storage facts, software categories, network terms,
// database concepts, programming/algorithm basics). Pitched a level BELOW the
// Grade 12 IT bank: peripherals/storage rather than CPU internals, software
// categories rather than OS internals, conceptual databases (validation/
// redundancy) rather than SQL statements, and planning-level programming
// (flowcharts/pseudocode/IPO). Topics + questions are DISTINCT from Gr12 IT.
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but NOT option order). Every conversion was checked
// by computation during drafting.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade11-it.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Information Technology";
const GRADE = "Grade 11";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Number Systems & Data Representation": [
    [
      "A single binary digit, which can be either 0 or 1, is called a:",
      ["bit", "byte", "pixel", "field"],
      0,
      "A bit (binary digit) is the smallest unit of data and can have only the value 0 or 1.",
    ],
    [
      "How many bits make up one byte?",
      ["4", "8", "16", "32"],
      1,
      "One byte consists of 8 bits.",
    ],
    [
      "What is the denary (decimal) value of the binary number 0110?",
      ["3", "5", "6", "9"],
      2,
      "0110 = (0×8) + (1×4) + (1×2) + (0×1) = 4 + 2 = 6.",
    ],
    [
      "Which of the following lists storage units in order from SMALLEST to LARGEST?",
      [
        "gigabyte, megabyte, kilobyte",
        "megabyte, kilobyte, gigabyte",
        "gigabyte, kilobyte, megabyte",
        "kilobyte, megabyte, gigabyte",
      ],
      3,
      "From smallest to largest the order is kilobyte (KB) → megabyte (MB) → gigabyte (GB), each roughly 1024 times the previous.",
    ],
    [
      "The denary number 8 is represented in binary as:",
      ["1000", "0100", "0010", "0001"],
      0,
      "8 = (1×8) + (0×4) + (0×2) + (0×1), which is written as 1000 in binary.",
    ],
    [
      "The smallest dot, or picture element, that makes up a bitmap image is called a:",
      ["byte", "pixel", "bit", "record"],
      1,
      "A pixel (picture element) is the smallest individual dot in a bitmap image; thousands of pixels together form the picture.",
    ],
    [
      "Hexadecimal is a base-16 system. Which set of symbols does it use?",
      ["only 0 and 1", "0 to 7 only", "0 to 9 and A to F", "1 to 16"],
      2,
      "Hexadecimal uses sixteen symbols: the digits 0–9 and the letters A–F (where A = 10 … F = 15).",
    ],
    [
      "Computers ultimately store and process all data — text, images and sound — in the form of:",
      ["hexadecimal letters", "decimal numbers", "analogue waves", "binary (0s and 1s)"],
      3,
      "At the lowest level a computer represents all data as binary — patterns of 0s and 1s (off/on states).",
    ],
  ],
  "Hardware: Input, Output & Storage Devices": [
    [
      "Which of the following is an INPUT device?",
      ["keyboard", "monitor", "printer", "speaker"],
      0,
      "A keyboard sends data into the computer, so it is an input device. A monitor, printer and speaker are output devices.",
    ],
    [
      "Which of the following is an OUTPUT device?",
      ["mouse", "printer", "scanner", "microphone"],
      1,
      "A printer produces output (a printout) from the computer. The mouse, scanner and microphone are input devices.",
    ],
    [
      "Which type of memory is volatile, meaning its contents are lost when the power is switched off?",
      ["ROM", "a hard drive", "RAM", "a DVD"],
      2,
      "RAM (Random Access Memory) is volatile — it loses its contents when the power goes off. ROM, hard drives and DVDs keep data without power.",
    ],
    [
      "Which storage device has NO moving parts and therefore reads and writes data faster than a traditional hard disk drive?",
      ["a magnetic tape", "an optical CD", "a floppy disk", "a solid-state drive (SSD)"],
      3,
      "An SSD uses flash memory with no moving parts, so it is faster and more durable than a traditional spinning hard disk drive.",
    ],
    [
      "A device that works as BOTH an input and an output device is a:",
      ["touch screen", "keyboard", "scanner", "mouse"],
      0,
      "A touch screen both displays output and accepts input through touch, so it is both an input and an output device.",
    ],
    [
      "Which unit would best describe the storage capacity of a modern hard drive?",
      ["bits", "terabytes (TB)", "pixels", "hertz"],
      1,
      "Modern hard-drive capacity is measured in gigabytes or terabytes (TB); hertz measures frequency and pixels measure image resolution.",
    ],
    [
      "The physical socket on a computer into which a device such as a flash drive or printer is plugged is called a:",
      ["pixel", "driver", "port", "byte"],
      2,
      "A port is the physical interface (socket), such as a USB port, into which an external device is connected.",
    ],
    [
      "Which of the following is an example of secondary (permanent) storage?",
      ["RAM", "cache memory", "a CPU register", "a hard disk drive"],
      3,
      "A hard disk drive is secondary storage — it keeps data even when powered off. RAM, cache and registers are temporary (primary) storage.",
    ],
  ],
  "System & Application Software": [
    [
      "Software that manages the computer's hardware and provides a platform for other programs to run is called:",
      ["system software", "application software", "a spreadsheet", "a web page"],
      0,
      "System software (such as the operating system) controls the hardware and provides the environment in which application software runs.",
    ],
    [
      "Which of the following is an example of APPLICATION software?",
      ["Windows", "a word processor", "Linux", "a device driver"],
      1,
      "A word processor is application software used for a specific user task. Windows, Linux and device drivers are system software.",
    ],
    [
      "Utility software such as antivirus, disk clean-up and file compression is used mainly to:",
      [
        "create presentations",
        "play video games",
        "maintain, manage and protect the computer system",
        "browse social media",
      ],
      2,
      "Utility software performs maintenance and protection tasks — scanning for viruses, freeing disk space, compressing files — that help the system run well.",
    ],
    [
      "The part of the software that the user sees and interacts with — buttons, icons, menus and windows — is called the:",
      ["CPU", "algorithm", "database", "user interface (GUI)"],
      3,
      "The user interface (a graphical user interface, or GUI, uses icons, menus and windows) is how the user interacts with the computer.",
    ],
    [
      "An interface in which the user types text commands instead of clicking icons is a:",
      ["command line interface (CLI)", "graphical user interface", "touch interface", "menu interface"],
      0,
      "A command line interface (CLI) requires the user to type text commands, unlike a GUI where the user clicks icons and menus.",
    ],
    [
      "Software that is supplied free of charge, with its source code available so users may use, copy and modify it, is known as:",
      ["pirated software", "free and open-source software (FOSS)", "a device driver", "an operating system"],
      1,
      "Free and open-source software (FOSS) is provided at no cost together with its source code, so users may legally use, copy and modify it.",
    ],
    [
      "The process of starting up a computer and loading the operating system into memory is called:",
      ["compiling", "formatting", "booting", "encrypting"],
      2,
      "Booting is the start-up process in which the computer loads the operating system from storage into RAM so the machine is ready to use.",
    ],
    [
      "Which of the following is a core function of an operating system?",
      [
        "designing a poster",
        "editing a photograph",
        "calculating a budget",
        "managing files, memory and input/output devices",
      ],
      3,
      "The operating system manages files, memory, processes and input/output devices, and provides the platform on which applications run.",
    ],
  ],
  "Computer Networks & Communications": [
    [
      "A network that connects computers within a single building or small area, such as a school computer lab, is a:",
      ["LAN (Local Area Network)", "WAN (Wide Area Network)", "the internet", "a modem"],
      0,
      "A LAN (Local Area Network) connects computers over a small area such as one building, office or school.",
    ],
    [
      "A device that converts a computer's digital signals so that they can travel over a communication line, and back again, is a:",
      ["printer", "modem", "scanner", "monitor"],
      1,
      "A modem modulates and demodulates signals, converting digital data into a form that can be sent over a communication line and back again.",
    ],
    [
      "A unique numerical address that identifies a device on a network or the internet is its:",
      ["MAC name", "URL", "IP address", "password"],
      2,
      "An IP (Internet Protocol) address is a unique numerical address assigned to a device so that data can be sent to and from it on a network.",
    ],
    [
      "The amount of data that can be transferred over a network connection in a given time is called its:",
      ["topology", "protocol", "pixel rate", "bandwidth"],
      3,
      "Bandwidth is the maximum amount of data that can be transmitted over a connection in a given time, often measured in megabits per second (Mbps).",
    ],
    [
      "A powerful central computer that stores files and provides services to other computers (clients) on a network is a:",
      ["server", "scanner", "modem", "router"],
      0,
      "A server is a central computer that manages resources and provides services (files, email, printing) to client computers on the network.",
    ],
    [
      "Connecting to a network using radio waves, without physical cables, is known as:",
      ["fibre networking", "wireless (Wi-Fi) networking", "cabled networking", "serial networking"],
      1,
      "Wireless (Wi-Fi) networking uses radio waves instead of cables to connect devices to a network.",
    ],
    [
      "A private network that uses internet technologies but is accessible only to an organisation's own members is an:",
      ["extranet", "internet", "intranet", "ethernet"],
      2,
      "An intranet is a private network, restricted to an organisation's members, that uses the same technologies as the internet.",
    ],
    [
      "Which of the following is an ADVANTAGE of connecting computers in a network?",
      [
        "data can never be shared",
        "hardware such as printers cannot be shared",
        "it makes communication impossible",
        "users can share files, hardware and an internet connection",
      ],
      3,
      "Networking lets users share files, hardware (such as printers) and a single internet connection, and communicate easily.",
    ],
  ],
  "Database Concepts": [
    [
      "In a database, raw, unprocessed facts such as a list of numbers are called:",
      ["data", "information", "a query", "a report"],
      0,
      "Data is raw, unprocessed facts and figures; once it is processed and given meaning it becomes information.",
    ],
    [
      "A single piece of information about an item, such as a learner's surname, stored in one column of a table, is called a:",
      ["record", "field", "table", "form"],
      1,
      "A field is a single category of data (one column), such as 'Surname'; a group of related fields makes up a record.",
    ],
    [
      "All the related fields about ONE item — for example all the details of a single learner — make up a:",
      ["field", "table", "record", "query"],
      2,
      "A record is a complete set of related fields about one item, shown as a single row in a database table.",
    ],
    [
      "A field that uniquely identifies each record in a table, so that no two records share the same value, is the:",
      ["text field", "foreign field", "validation field", "primary key"],
      3,
      "A primary key is a field whose value is unique for every record, allowing each record to be identified without confusion.",
    ],
    [
      "Which database data type would best store a learner's date of birth?",
      ["date/time", "text (string)", "boolean (yes/no)", "currency"],
      0,
      "A date of birth should be stored using a date/time data type so it can be validated and used in date calculations.",
    ],
    [
      "A check the database performs to make sure entered data is reasonable and in the correct format — for example that an age is not negative — is called:",
      ["encryption", "data validation", "compression", "sorting"],
      1,
      "Data validation checks that input data is sensible and in the allowed range or format before it is accepted, improving data integrity.",
    ],
    [
      "A database made up of several linked tables, rather than one single large table, is called a:",
      ["flat-file database", "spreadsheet", "relational database", "text file"],
      2,
      "A relational database stores data in multiple tables that are linked by common fields, which reduces duplicated data.",
    ],
    [
      "Storing the same data in several places, which wastes space and can lead to inconsistencies, is known as data:",
      ["validation", "encryption", "compression", "redundancy"],
      3,
      "Data redundancy is the unnecessary duplication of data; it wastes storage and can cause inconsistencies when one copy is updated but another is not.",
    ],
  ],
  "Algorithms & Programming Basics": [
    [
      "A diagram that uses standard symbols such as boxes and arrows to show the steps of an algorithm is a:",
      ["flowchart", "spreadsheet", "database", "network"],
      0,
      "A flowchart represents the steps and flow of an algorithm using standard symbols (e.g. a diamond for a decision) connected by arrows.",
    ],
    [
      "Writing out the logic of a program in structured, plain-language statements before coding it is called:",
      ["compiling", "pseudocode", "encryption", "debugging"],
      1,
      "Pseudocode describes a program's logic in structured, human-readable statements (not a real programming language) as a planning step before coding.",
    ],
    [
      "Which data type would be used to store a person's name, such as 'Thandi'?",
      ["integer", "boolean", "string", "real (float)"],
      2,
      "A string data type stores text — a sequence of characters such as a name — whereas integers and reals store numbers.",
    ],
    [
      "A named value that is set once and does NOT change while the program runs, such as PI = 3.14, is a:",
      ["variable", "loop", "array", "constant"],
      3,
      "A constant holds a value that stays the same throughout the program's execution, unlike a variable whose value can change.",
    ],
    [
      "A programming structure that chooses between different actions depending on whether a condition is true or false (e.g. an IF statement) is called:",
      ["selection (a decision structure)", "iteration", "a constant", "an array"],
      0,
      "Selection (a decision structure such as IF…THEN…ELSE) lets a program choose between different actions based on a condition.",
    ],
    [
      "The basic sequence that most simple programs follow is:",
      [
        "output, process, input",
        "input, process, output",
        "process, input, output",
        "output, input, process",
      ],
      1,
      "The standard processing model is input → process → output: data is taken in, processed, and the result is sent out.",
    ],
    [
      "In programming, the symbols +, −, * and / are examples of:",
      ["logical operators", "data types", "arithmetic operators", "variables"],
      2,
      "+, −, * and / are arithmetic operators used to perform calculations (add, subtract, multiply, divide).",
    ],
    [
      "An error that occurs because a programmer breaks the grammar rules of the programming language (e.g. a missing bracket) is a:",
      ["logic error", "runtime error", "power failure", "syntax error"],
      3,
      "A syntax error breaks the language's grammar rules (such as a missing bracket or semicolon) and stops the program from compiling or running.",
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
