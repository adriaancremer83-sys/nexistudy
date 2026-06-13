// Seeds the Grade 12 Information Technology (IT) theory bank (6 topics x 8
// questions). CAPS-aligned, objectively-checkable only (number-system
// conversions, CPU internals, network facts, SQL/database theory, programming
// concepts, security definitions). Pitched deliberately deeper/more technical
// than the CAT bank so the two subjects do not overlap. No interpretive
// questions; every numeric/conversion answer was checked by computation.
// Correct-answer positions are spread evenly A-D per topic because the quiz
// engine shuffles question order, not option order.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade12-it.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Information Technology";
const GRADE = "Grade 12";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Data Representation & Number Systems": [
    [
      "The binary number system uses only which two digits?",
      ["0 and 1", "1 and 2", "0 and 9", "1 and 10"],
      0,
      "The binary (base-2) number system uses only the digits 0 and 1.",
    ],
    [
      "What is the denary (decimal) value of the binary number 1010?",
      ["8", "10", "12", "20"],
      1,
      "1010 in binary = (1×8) + (0×4) + (1×2) + (0×1) = 8 + 2 = 10.",
    ],
    [
      "How many different values can be represented using one byte (8 bits)?",
      ["8", "16", "256", "1024"],
      2,
      "With 8 bits there are 2^8 = 256 possible combinations, representing the values 0 to 255.",
    ],
    [
      "Which number system, often used as a shorthand for binary, uses base 16?",
      ["denary (decimal)", "octal", "binary", "hexadecimal"],
      3,
      "Hexadecimal is the base-16 system (digits 0–9 and A–F) and is a compact way of representing binary values.",
    ],
    [
      "The denary number 5 is represented in binary as:",
      ["101", "110", "011", "111"],
      0,
      "5 = 4 + 1 = (1×4) + (0×2) + (1×1), which is written as 101 in binary.",
    ],
    [
      "A coding scheme that represents characters such as letters, digits and symbols as binary numbers is:",
      ["RGB", "ASCII", "RAM", "CPU"],
      1,
      "ASCII (American Standard Code for Information Interchange) assigns a unique binary code to each character, such as a letter, digit or symbol.",
    ],
    [
      "How many bits are there in 2 bytes?",
      ["8", "10", "16", "32"],
      2,
      "One byte equals 8 bits, so 2 bytes = 2 × 8 = 16 bits.",
    ],
    [
      "In the 4-bit binary number 1101, the place value of the leftmost (most significant) bit is:",
      ["1", "2", "4", "8"],
      3,
      "In a 4-bit number the place values from right to left are 1, 2, 4, 8, so the leftmost bit has a place value of 8.",
    ],
  ],
  "Hardware & System Software": [
    [
      "The part of the CPU that performs arithmetic calculations and logical comparisons is the:",
      ["ALU (Arithmetic Logic Unit)", "hard drive", "monitor", "power supply"],
      0,
      "The ALU (Arithmetic Logic Unit) is the part of the CPU that carries out all arithmetic calculations and logical comparisons.",
    ],
    [
      "The part of the CPU that fetches, decodes and coordinates the execution of instructions is the:",
      ["ALU", "Control Unit", "RAM", "GPU"],
      1,
      "The Control Unit directs and coordinates the CPU's operations — fetching and decoding instructions and controlling the flow of data.",
    ],
    [
      "Small, very fast memory located on or close to the CPU that stores frequently used data and instructions is called:",
      ["a hard disk", "ROM", "cache memory", "a flash drive"],
      2,
      "Cache memory is small, very fast memory close to the CPU that holds frequently used instructions and data to speed up processing.",
    ],
    [
      "Which of the following is an example of an operating system?",
      ["Microsoft Word", "Google Chrome", "Adobe Photoshop", "Windows"],
      3,
      "Windows is an operating system (system software). Word, Chrome and Photoshop are application software that run on top of an operating system.",
    ],
    [
      "The sequence the CPU repeats to process each instruction (fetch, decode, execute) is known as the:",
      ["machine cycle (fetch-decode-execute cycle)", "boot sequence", "compile cycle", "refresh rate"],
      0,
      "The machine cycle (fetch–decode–execute cycle) is the sequence of steps the CPU repeats to carry out each instruction.",
    ],
    [
      "Which of the following is a function of an operating system?",
      [
        "editing photographs",
        "managing hardware resources and running application programs",
        "designing websites",
        "browsing the internet",
      ],
      1,
      "An operating system manages the computer's hardware resources (CPU, memory, storage and devices) and provides the platform on which application programs run.",
    ],
    [
      "The non-volatile memory chip that holds the start-up (boot) firmware the computer uses when switched on is:",
      ["RAM", "cache memory", "ROM", "the GPU"],
      2,
      "ROM (Read-Only Memory) is non-volatile and holds the start-up firmware (such as the BIOS/boot instructions) used when the computer is switched on.",
    ],
    [
      "A 'device driver' is software that:",
      [
        "controls who is allowed to log in",
        "speeds up the internet connection",
        "protects the computer against viruses",
        "allows the operating system to communicate with a hardware device",
      ],
      3,
      "A device driver is software that lets the operating system communicate with and control a specific hardware device, such as a printer or graphics card.",
    ],
  ],
  "Networks & Internet Technologies": [
    [
      "A network in which every device is connected to a single central device such as a switch uses a:",
      ["star topology", "bus topology", "ring topology", "mesh topology"],
      0,
      "In a star topology every device connects to a central node (such as a switch or hub); if one cable fails, only that one device is affected.",
    ],
    [
      "The agreed set of rules that governs how data is transmitted over a network is called a:",
      ["topology", "protocol", "bandwidth", "packet"],
      1,
      "A protocol is an agreed set of rules that governs how data is formatted, transmitted and received over a network.",
    ],
    [
      "Which protocol is mainly responsible for transferring web pages from a web server to a browser?",
      ["FTP", "SMTP", "HTTP", "POP3"],
      2,
      "HTTP (HyperText Transfer Protocol) is used to transfer web pages between a web server and a web browser.",
    ],
    [
      "Which transmission medium carries data as pulses of light and offers the highest speed over long distances?",
      ["UTP copper cable", "coaxial cable", "Wi-Fi radio waves", "fibre-optic cable"],
      3,
      "Fibre-optic cable carries data as pulses of light and provides very high speeds with low signal loss over long distances.",
    ],
    [
      "A device that connects two or more different networks and routes data between them is a:",
      ["router", "monitor", "keyboard", "scanner"],
      0,
      "A router connects different networks (for example a home network to the internet) and directs data packets between them.",
    ],
    [
      "When data is sent over a network it is broken into small units that are routed separately and reassembled at the destination. Each such unit is called a:",
      ["topology", "packet", "protocol", "node"],
      1,
      "Data sent over a network is divided into packets, each routed separately and then reassembled in the correct order at the destination.",
    ],
    [
      "The unique hardware address assigned to a network interface card by its manufacturer is the:",
      ["IP address", "URL", "MAC address", "domain name"],
      2,
      "A MAC (Media Access Control) address is a unique hardware address assigned to a network interface card by its manufacturer.",
    ],
    [
      "Which of the following is the best example of a WAN (Wide Area Network)?",
      [
        "two computers linked in one room",
        "a single home Wi-Fi network",
        "one office LAN",
        "the internet",
      ],
      3,
      "The internet is the largest example of a WAN — it connects networks across the world over a wide geographical area.",
    ],
  ],
  "Database & SQL Concepts": [
    [
      "In a relational database, a field whose value uniquely identifies each record in a table is the:",
      ["primary key", "foreign key", "index", "query"],
      0,
      "A primary key is a field (or set of fields) whose value is unique for every record, so it identifies each record uniquely.",
    ],
    [
      "A field in one table that refers to the primary key of another table, creating a link between them, is a:",
      ["primary key", "foreign key", "composite field", "candidate key"],
      1,
      "A foreign key stores the primary-key value of another table, creating a relationship (link) between the two tables.",
    ],
    [
      "Which SQL statement is used to retrieve data from a database?",
      ["INSERT", "DELETE", "SELECT", "UPDATE"],
      2,
      "The SELECT statement is used to query and retrieve data from one or more tables in a database.",
    ],
    [
      "Organising the fields and tables of a database to reduce data redundancy and improve data integrity is called:",
      ["querying", "indexing", "encryption", "normalisation"],
      3,
      "Normalisation organises a database's tables and fields to minimise duplicate data (redundancy) and avoid anomalies, which improves data integrity.",
    ],
    [
      "In a database table, a single complete row of related data (e.g. all the details of one learner) is called a:",
      ["record (row)", "field", "key", "table"],
      0,
      "A record is a complete set of related data about one item, represented by a row in a database table.",
    ],
    [
      "Which SQL clause is used to filter rows so that only those meeting a condition are returned?",
      ["ORDER BY", "WHERE", "FROM", "INSERT"],
      1,
      "The WHERE clause specifies a condition so that only the rows satisfying it are returned by the query.",
    ],
    [
      "A DBMS is software that:",
      [
        "edits images",
        "designs computer networks",
        "creates, manages and controls access to a database",
        "compiles program source code",
      ],
      2,
      "A DBMS (Database Management System) is software used to create, manage, query and control access to a database.",
    ],
    [
      "A relationship in which one record in a table can be linked to many records in another table is called a:",
      ["one-to-one relationship", "many-to-many relationship", "self-relationship", "one-to-many relationship"],
      3,
      "A one-to-many relationship links a single record in one table to several related records in another — for example one customer with many orders.",
    ],
  ],
  "Programming & Algorithm Concepts": [
    [
      "Which data type is used to store whole numbers such as -3, 0 and 25?",
      ["integer", "string", "boolean", "real (float)"],
      0,
      "An integer data type stores whole numbers, with no fractional or decimal part.",
    ],
    [
      "A data type that can store only one of two values, true or false, is a:",
      ["integer", "boolean", "string", "character"],
      1,
      "A boolean data type can hold only one of two values: true or false.",
    ],
    [
      "A programming structure that repeats a block of code while a condition remains true is called a:",
      ["selection (if) statement", "variable", "loop (iteration structure)", "comment"],
      2,
      "A loop (iteration structure) repeats a block of code as long as, or until, a specified condition is met.",
    ],
    [
      "A named storage location whose value can change while a program runs is called a:",
      ["constant", "loop", "comment", "variable"],
      3,
      "A variable is a named location in memory whose value can change during the execution of a program. A constant, by contrast, keeps the same value throughout.",
    ],
    [
      "A clear, step-by-step set of instructions for solving a problem, usually planned before coding, is an:",
      ["algorithm", "operating system", "interface", "array"],
      0,
      "An algorithm is a clear, step-by-step sequence of instructions designed to solve a problem or perform a task.",
    ],
    [
      "A data structure that stores many values of the same type under one name, each accessed by an index, is an:",
      ["if statement", "array", "comment", "constant"],
      1,
      "An array is a data structure that holds multiple values of the same data type under one name, each accessed by its index (position).",
    ],
    [
      "Software that translates an entire high-level program into machine code before it is run is a:",
      ["debugger", "web browser", "compiler", "spreadsheet"],
      2,
      "A compiler translates the whole source program into machine code in advance, producing an executable file that can then be run.",
    ],
    [
      "The process of finding and fixing errors (bugs) in a program is called:",
      ["compiling", "encrypting", "formatting", "debugging"],
      3,
      "Debugging is the process of locating and correcting errors (bugs) in a program so that it works correctly.",
    ],
  ],
  "Social, Ethical & Security Issues": [
    [
      "A self-replicating program that spreads from computer to computer, often without the user's knowledge, is a:",
      ["computer virus or worm", "spreadsheet", "compiler", "firewall"],
      0,
      "A virus or worm is malware that copies itself and spreads to other computers, often without the user being aware of it.",
    ],
    [
      "Converting data into a coded form so that only an authorised party with the correct key can read it is called:",
      ["compression", "encryption", "formatting", "defragmentation"],
      1,
      "Encryption scrambles data into an unreadable form; only someone with the correct key can decrypt and read it.",
    ],
    [
      "An attempt to obtain sensitive information such as passwords by sending an email that pretends to be from a trustworthy organisation is called:",
      ["compressing", "encrypting", "phishing", "backing up"],
      2,
      "Phishing uses fake emails or websites that appear to come from a trusted organisation to trick users into revealing sensitive information.",
    ],
    [
      "Making illegal copies of software in breach of its licence agreement is an example of:",
      ["encryption", "normalisation", "debugging", "software piracy"],
      3,
      "Software piracy is the illegal copying, distribution or use of software in breach of its licence agreement and copyright.",
    ],
    [
      "Gaining unauthorised access to a computer system or its data by overcoming its security is known as:",
      ["hacking", "encryption", "compression", "making a backup"],
      0,
      "Hacking is gaining unauthorised access to a computer system or its data, usually by overcoming or bypassing security measures.",
    ],
    [
      "A DDoS (Distributed Denial of Service) attack aims to:",
      [
        "repair a damaged network",
        "overwhelm a server with traffic so it cannot serve legitimate users",
        "encrypt files to keep them safe",
        "speed up a slow website",
      ],
      1,
      "A DDoS attack floods a server or network with so much traffic from many sources that it becomes overwhelmed and can no longer serve legitimate users.",
    ],
    [
      "Using, manufacturing and disposing of computer equipment in an environmentally responsible way is referred to as:",
      ["hacking", "phishing", "green computing", "encryption"],
      2,
      "Green computing means using, manufacturing and disposing of computer equipment in ways that reduce harm to the environment, including recycling e-waste.",
    ],
    [
      "Regularly making a separate copy of important data so it can be restored if the original is lost is called:",
      ["hacking", "phishing", "software piracy", "making a backup"],
      3,
      "A backup is a copy of data kept separately so it can be restored if the original data is lost, damaged or corrupted.",
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
