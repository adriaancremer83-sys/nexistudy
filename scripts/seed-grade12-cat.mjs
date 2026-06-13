// Seeds the Grade 12 Computer Applications Technology (CAT) theory bank
// (6 topics x 8 questions). CAPS-aligned, objectively-checkable only
// (definitions, classifications, spreadsheet/database facts, hardware terms).
// No interpretive questions. Correct-answer positions are spread evenly A-D
// per topic because the quiz engine shuffles question order, not option order.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade12-cat.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Computer Applications Technology";
const GRADE = "Grade 12";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Systems Technologies": [
    [
      "What does the abbreviation CPU stand for?",
      ["Central Processing Unit", "Computer Power Unit", "Central Program Utility", "Core Processing Underlay"],
      0,
      "The CPU (Central Processing Unit) is the 'brain' of the computer that carries out the instructions of programs.",
    ],
    [
      "Which type of memory is volatile, meaning its contents are lost when the computer is switched off?",
      ["ROM", "RAM", "an SSD", "a hard drive"],
      1,
      "RAM (Random Access Memory) is volatile — it temporarily holds the data and programs in use and is cleared when power is removed.",
    ],
    [
      "How many bits are there in one byte?",
      ["4", "16", "8", "1 024"],
      2,
      "One byte consists of 8 bits.",
    ],
    [
      "Which storage unit is the largest?",
      ["Kilobyte (KB)", "Megabyte (MB)", "Gigabyte (GB)", "Terabyte (TB)"],
      3,
      "Ordered from smallest to largest the units are KB, MB, GB, TB — a terabyte is the largest of these.",
    ],
    [
      "Which of the following is an example of system software?",
      ["The operating system", "A web browser", "A word processor", "A photo editor"],
      0,
      "The operating system is system software that manages the hardware and runs application software. A browser, word processor and photo editor are application software.",
    ],
    [
      "What is the main advantage of an SSD compared to a traditional hard disk drive (HDD)?",
      [
        "It has a much larger capacity for the same price",
        "It is faster and has no moving parts",
        "It never needs any electricity",
        "It stores data without using any chips",
      ],
      1,
      "An SSD (Solid State Drive) has no moving parts, which makes it faster, quieter and more durable than a mechanical HDD.",
    ],
    [
      "ROM (Read-Only Memory) is best described as:",
      [
        "volatile memory that is cleared at shutdown",
        "memory used only for graphics",
        "non-volatile memory that retains its contents when powered off",
        "external backup storage",
      ],
      2,
      "ROM is non-volatile — it keeps its contents (such as start-up instructions) even when the computer is switched off.",
    ],
    [
      "Which component is mainly responsible for processing the graphics displayed on the screen?",
      ["The RAM", "The hard drive", "The power supply", "The GPU"],
      3,
      "The GPU (Graphics Processing Unit) handles the processing of images and graphics shown on the display.",
    ],
  ],
  "Network & Internet Technologies": [
    [
      "What does LAN stand for?",
      ["Local Area Network", "Large Access Node", "Linked Audio Network", "Limited Access Network"],
      0,
      "A LAN (Local Area Network) connects computers within a small area such as a single building.",
    ],
    [
      "A network that covers a large geographical area, such as the Internet, is called a:",
      ["LAN", "WAN", "PAN", "HAN"],
      1,
      "A WAN (Wide Area Network) spans a large geographical area; the Internet is the largest example of a WAN.",
    ],
    [
      "What is the main difference between the Internet and the World Wide Web (WWW)?",
      [
        "They are exactly the same thing",
        "The Web is the cables and the Internet is the websites",
        "The Internet is the global network of computers, while the Web is the collection of websites accessed over it",
        "The Internet works only on cellphones",
      ],
      2,
      "The Internet is the worldwide network of connected computers; the World Wide Web is the collection of web pages and websites accessed across that network.",
    ],
    [
      "Which device connects a home network to the Internet and directs data between networks?",
      ["A scanner", "A monitor", "A keyboard", "A router"],
      3,
      "A router connects networks together and directs (routes) data between a home network and the Internet.",
    ],
    [
      "Bandwidth refers to:",
      [
        "the amount of data that can be transferred over a connection in a given time",
        "the physical length of a network cable",
        "the number of devices in a network",
        "the amount of storage on a server",
      ],
      0,
      "Bandwidth is the volume of data that can be transferred over a connection in a given period, usually measured in bits per second.",
    ],
    [
      "A 'cap' on an internet account refers to:",
      [
        "the maximum speed of the connection",
        "a limit on the amount of data you may use",
        "the number of users allowed",
        "the monthly cost of the router",
      ],
      1,
      "A data cap is a limit on the amount of data you may upload or download in a billing period.",
    ],
    [
      "Which of the following is an example of a wireless network technology?",
      ["A fibre cable", "A UTP cable", "Wi-Fi", "A USB cable"],
      2,
      "Wi-Fi transmits data using radio waves and needs no cables, making it a wireless technology.",
    ],
    [
      "The unique numerical address that identifies a device on a network is its:",
      ["URL", "email address", "domain name", "IP address"],
      3,
      "An IP (Internet Protocol) address is the unique numerical address that identifies a device on a network.",
    ],
  ],
  "Information Management": [
    [
      "What is the difference between data and information?",
      [
        "Data is processed and given meaning to become information",
        "Data and information mean exactly the same thing",
        "Information is raw and unprocessed, while data has meaning",
        "Data can only ever be numbers",
      ],
      0,
      "Data consists of raw, unprocessed facts; once data is processed and given context and meaning it becomes information.",
    ],
    [
      "Which of the following is an example of raw data rather than information?",
      [
        "A report showing the class average",
        "A list of unprocessed test marks",
        "A graph of monthly sales",
        "A summary of survey results",
      ],
      1,
      "An unprocessed list of marks is raw data; the others have already been processed and summarised into information.",
    ],
    [
      "In a questionnaire, a 'closed' question is one that:",
      [
        "lets the respondent write any answer they like",
        "asks for a long written opinion",
        "offers a fixed set of options to choose from",
        "can only be asked face to face",
      ],
      2,
      "A closed question provides a fixed set of answer options (such as Yes/No or multiple choice), which makes the responses easy to process and compare.",
    ],
    [
      "Which source would give the most reliable, up-to-date information?",
      [
        "a personal blog with no named author",
        "an anonymous social media post",
        "a forwarded chain email",
        "the official Statistics South Africa website",
      ],
      3,
      "An official source such as Statistics SA is authoritative and current, making it more reliable than anonymous or unverified sources.",
    ],
    [
      "The process of checking that data entered into a system is reasonable and within accepted limits is called:",
      ["validation", "compression", "encryption", "formatting"],
      0,
      "Validation checks that entered data is sensible and meets defined rules (e.g. an age between 0 and 120). It cannot, however, guarantee the data is actually correct.",
    ],
    [
      "Verification of captured data means:",
      [
        "deleting old data",
        "checking that data was captured accurately, e.g. by entering it twice or proofreading",
        "sorting the data alphabetically",
        "making a backup copy of the data",
      ],
      1,
      "Verification checks that data has been captured accurately (for example by double-entry or proofreading), ensuring it matches the original source.",
    ],
    [
      "Which file format is best suited to sharing a final document so that it looks the same on any device and is not easily edited?",
      ["DOCX", "TXT", "PDF", "CSV"],
      2,
      "PDF (Portable Document Format) preserves the layout on any device and is not easily edited, making it ideal for sharing final documents.",
    ],
    [
      "Sending a questionnaire to many people to gather their responses is a method of:",
      ["data processing", "data storage", "data encryption", "data collection"],
      3,
      "A questionnaire (survey) is a tool used to collect or gather data from respondents.",
    ],
  ],
  "Social Implications": [
    [
      "Malware that disguises itself as legitimate software but carries a harmful payload is called a:",
      ["Trojan", "spreadsheet", "firewall", "cookie"],
      0,
      "A Trojan (Trojan horse) appears to be a useful program but secretly performs harmful actions once it is installed.",
    ],
    [
      "Sending fraudulent emails that pretend to be from a trusted institution to trick people into revealing passwords or banking details is called:",
      ["spamming", "phishing", "defragmenting", "encrypting"],
      1,
      "Phishing uses fake emails or websites that appear to come from a trusted source in order to trick users into giving away personal or financial information.",
    ],
    [
      "Which of the following is the best practice for creating a strong password?",
      [
        "use your name and birth year",
        "use the word 'password'",
        "use a long mix of upper- and lowercase letters, numbers and symbols",
        "use the same password for every account",
      ],
      2,
      "A strong password is long and combines uppercase and lowercase letters, numbers and symbols, which makes it hard to guess or crack.",
    ],
    [
      "A firewall is used to:",
      [
        "cool down the computer",
        "speed up the internet connection",
        "store backup files",
        "control and block unauthorised network traffic",
      ],
      3,
      "A firewall monitors network traffic and blocks unauthorised access to or from a private network.",
    ],
    [
      "'Green computing' refers to:",
      [
        "using and disposing of computers in an environmentally responsible way",
        "using only green-coloured devices",
        "a particular type of computer virus",
        "playing computer games outdoors",
      ],
      0,
      "Green computing means using computers efficiently and disposing of e-waste responsibly so as to reduce harm to the environment.",
    ],
    [
      "Copying someone else's work or ideas and presenting them as your own is called:",
      ["encryption", "plagiarism", "validation", "compression"],
      1,
      "Plagiarism is presenting another person's work or ideas as your own without acknowledging the source.",
    ],
    [
      "Which health problem is most associated with poor ergonomics and prolonged computer use?",
      ["measles", "the common cold", "repetitive strain injury (RSI)", "food poisoning"],
      2,
      "Repetitive Strain Injury (RSI) results from repeated movements and poor posture during prolonged computer use; good ergonomics helps to prevent it.",
    ],
    [
      "Software that you may use free of charge for a limited trial period, after which you must pay to keep using it, is called:",
      ["freeware", "open-source software", "malware", "shareware"],
      3,
      "Shareware is distributed free for a trial period, after which the user is expected to pay to continue using it. Freeware, by contrast, stays free permanently.",
    ],
  ],
  "Spreadsheet Concepts": [
    [
      "In a spreadsheet, every formula must begin with which symbol?",
      ["=", "+", "#", "@"],
      0,
      "A spreadsheet formula always starts with an equals sign (=), which tells the program to calculate a result rather than display text.",
    ],
    [
      "Which function would you use to add up the values in a range of cells, e.g. =____(A1:A10)?",
      ["AVERAGE", "SUM", "COUNT", "MAX"],
      1,
      "The SUM function adds together all the values in the specified range.",
    ],
    [
      "What does the function =AVERAGE(B2:B6) calculate?",
      [
        "the largest value in the range",
        "the number of cells in the range",
        "the mean (average) of the values in the range",
        "the smallest value in the range",
      ],
      2,
      "AVERAGE returns the mean of the values — their total divided by how many values there are.",
    ],
    [
      "In the cell reference $A$1, the dollar signs indicate:",
      [
        "a currency value",
        "a spelling error",
        "a hidden cell",
        "an absolute reference that does not change when the formula is copied",
      ],
      3,
      "$A$1 is an absolute cell reference; the dollar signs lock the column and the row so the reference stays fixed when the formula is copied to other cells.",
    ],
    [
      "Which function counts how many cells in a range contain numbers?",
      ["COUNT", "SUM", "IF", "AVERAGE"],
      0,
      "COUNT returns the number of cells in a range that contain numeric values.",
    ],
    [
      "The function =MAX(C1:C10) returns:",
      [
        "the total of the range",
        "the highest value in the range",
        "the average of the range",
        "the lowest value in the range",
      ],
      1,
      "MAX returns the largest (maximum) value found in the range.",
    ],
    [
      "An =IF() function in a spreadsheet is used to:",
      [
        "add up a column of numbers",
        "sort the data",
        "make a decision and return one of two results depending on a condition",
        "change the font colour of a cell",
      ],
      2,
      "The IF function tests a condition and returns one value if the condition is true and a different value if it is false.",
    ],
    [
      "If cell A1 contains 10 and cell A2 contains 5, what is the result of =A1*A2?",
      ["15", "2", "5", "50"],
      3,
      "The asterisk (*) is the multiplication operator, so =A1*A2 gives 10 × 5 = 50.",
    ],
  ],
  "Database Concepts": [
    [
      "In a database table, a single row that holds all the data about one item (e.g. one learner) is called a:",
      ["record", "field", "query", "form"],
      0,
      "A record is a complete set of data about one item, stored as a row in a database table.",
    ],
    [
      "A column in a database table, such as 'Surname' or 'DateOfBirth', is called a:",
      ["record", "field", "report", "macro"],
      1,
      "A field is a single category of data, represented by a column in a database table.",
    ],
    [
      "A primary key in a database is:",
      [
        "the password used to open the database",
        "always the first field in the table",
        "a field whose value uniquely identifies each record",
        "the largest field in the table",
      ],
      2,
      "A primary key is a field (or combination of fields) whose value is unique for every record, so it can be used to identify each record uniquely.",
    ],
    [
      "Which data type would be most suitable for a field that stores whether a learner has paid (yes or no)?",
      ["text", "number", "currency", "Boolean (yes/no)"],
      3,
      "A Boolean (yes/no) data type stores one of two values and is ideal for a true/false or paid/not-paid field.",
    ],
    [
      "A database object used to extract and display only the records that meet certain criteria is a:",
      ["query", "field", "primary key", "record"],
      0,
      "A query searches the database and returns only the records that match the criteria you specify.",
    ],
    [
      "Which data type should be used for a field that stores a cellphone number?",
      ["number", "text", "currency", "date/time"],
      1,
      "A cellphone number is stored as text because it may begin with a 0 and is never used in calculations; storing it as a number would drop the leading zero.",
    ],
    [
      "The main advantage of a database over storing the same data in many separate files is that it:",
      [
        "uses much more paper",
        "makes the data harder to find",
        "reduces duplication and keeps data consistent",
        "can only store numbers",
      ],
      2,
      "A database stores data centrally, which reduces duplication (redundancy) and helps keep the data consistent and up to date.",
    ],
    [
      "A database object designed to present data in a neatly formatted layout suitable for printing is a:",
      ["query", "field", "primary key", "report"],
      3,
      "A report presents data in a formatted, often printable layout suitable for sharing.",
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
