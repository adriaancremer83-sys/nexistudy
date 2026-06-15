// Seeds the Grade 10 Computer Applications Technology (CAT) theory bank
// (6 topics x 8 questions). CAPS-aligned, objectively-checkable only.
// DELIBERATELY DISTINCT from BOTH the Gr11 and Gr12 CAT banks: the same CAPS
// content areas, but more basic Grade 10 facts and examples (e.g. hardware vs
// software, RAM volatility, LAN/WAN, data vs information, =AVERAGE/=MAX, records
// & fields, primary key) — NONE of the specific Gr11 items (MIN/COUNTA, the
// motherboard, the @ symbol, word wrap, etc.) are reused.
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but NOT option order). Numeric answers double-checked.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade10-cat.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Computer Applications Technology";
const GRADE = "Grade 10";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Systems Technologies": [
    [
      "'Hardware' refers to:",
      [
        "the physical parts of a computer that you can touch",
        "the programs and apps that run on a computer",
        "data stored on the internet",
        "an email message",
      ],
      0,
      "Hardware is the physical, tangible parts of a computer system, such as the keyboard, screen and CPU.",
    ],
    [
      "'Software' refers to:",
      [
        "the physical parts of a computer",
        "the programs and instructions that tell the computer what to do",
        "the desk the computer stands on",
        "the electricity supply to the computer",
      ],
      1,
      "Software is the set of programs and instructions that tell the hardware what to do.",
    ],
    [
      "RAM is described as 'volatile' memory because it:",
      [
        "stores data permanently forever",
        "is a type of printer",
        "loses its contents when the power is switched off",
        "can never be changed",
      ],
      2,
      "RAM is volatile: it only holds data while the computer is on, and its contents are lost when the power is switched off.",
    ],
    [
      "Which of the following is an example of system software?",
      [
        "a word processor",
        "a web browser",
        "a spreadsheet program",
        "the operating system (for example Windows)",
      ],
      3,
      "The operating system is system software that manages the hardware and runs other programs. Word processors, browsers and spreadsheets are application software.",
    ],
    [
      "A 'GUI' (Graphical User Interface) allows a user to:",
      [
        "interact with the computer using icons, windows and a mouse",
        "type only text commands",
        "physically repair the hardware",
        "increase the internet speed",
      ],
      0,
      "A GUI lets users interact with the computer using graphical elements such as icons, windows, menus and a pointer, instead of typing text commands.",
    ],
    [
      "Which of the following is a portable storage device?",
      ["the monitor", "a USB flash drive", "the CPU", "the keyboard"],
      1,
      "A USB flash drive is a small, portable secondary storage device used to carry and transfer files.",
    ],
    [
      "The smallest unit of data in a computer is a:",
      ["megabyte", "kilobyte", "bit", "gigabyte"],
      2,
      "A bit (binary digit, a 0 or 1) is the smallest unit of data. Eight bits make a byte, and kilobytes, megabytes and gigabytes are larger units.",
    ],
    [
      "Which device is BOTH an input and an output device?",
      ["a mouse", "a scanner", "a microphone", "a touch screen"],
      3,
      "A touch screen both displays output and accepts input through touch, so it is both an input and an output device.",
    ],
  ],
  "Network & Internet Technologies": [
    [
      "A 'computer network' is:",
      [
        "a single computer with no connections",
        "two or more computers connected together to share data and resources",
        "a type of printer",
        "a word-processing document",
      ],
      1,
      "A computer network is two or more computers connected so they can communicate and share data and resources such as files and printers.",
    ],
    [
      "A 'LAN' (Local Area Network) is a network that:",
      [
        "covers an entire country on its own",
        "connects computers across the whole world",
        "connects computers in one building or a small area, such as a school",
        "uses only the postal service",
      ],
      2,
      "A LAN connects computers within a small area, such as one building, office or school. A network spanning a large area is a WAN.",
    ],
    [
      "The 'internet' is best described as:",
      [
        "a single computer in a school",
        "a word processor",
        "a type of keyboard",
        "a massive global network connecting millions of computers worldwide",
      ],
      3,
      "The internet is a huge global network that links millions of computers and smaller networks around the world.",
    ],
    [
      "A 'search engine' such as Google is used to:",
      [
        "find information and websites on the internet",
        "print documents",
        "edit photographs",
        "scan paper documents",
      ],
      0,
      "A search engine helps users find websites and information on the internet by searching for keywords.",
    ],
    [
      "'Wi-Fi' allows devices to connect to a network:",
      [
        "only by using a cable",
        "wirelessly, using radio signals",
        "by posting a letter",
        "by printing a page",
      ],
      1,
      "Wi-Fi connects devices to a network wirelessly using radio signals, without the need for cables.",
    ],
    [
      "The device that connects a home network to the internet is usually a:",
      ["monitor", "scanner", "router (modem)", "speaker"],
      2,
      "A router/modem connects a home network to the internet and directs data between the network and the ISP.",
    ],
    [
      "The 'World Wide Web' is:",
      [
        "exactly the same thing as a printer",
        "a single website only",
        "a type of network cable",
        "the collection of web pages and websites accessed through the internet",
      ],
      3,
      "The World Wide Web (WWW) is the collection of linked web pages and websites that are accessed over the internet using a browser.",
    ],
    [
      "An advantage of connecting computers in a network is that users can:",
      [
        "share resources such as files and a printer",
        "never communicate with one another",
        "lose all their data automatically",
        "stop using the internet completely",
      ],
      0,
      "Networking lets users share resources such as files, an internet connection and printers, and communicate easily.",
    ],
  ],
  "Information Management": [
    [
      "The difference between 'data' and 'information' is that information is:",
      [
        "always longer than data",
        "exactly the same as data",
        "data that has been processed and given meaning so that it is useful",
        "always a picture",
      ],
      2,
      "Data is raw, unprocessed facts; information is data that has been processed and organised so that it has meaning and is useful.",
    ],
    [
      "The basic information processing cycle is:",
      [
        "print, scan, copy, delete",
        "open, close, save, exit",
        "type, read, write, send",
        "input, processing, output and storage",
      ],
      3,
      "The information processing cycle is input → processing → output, with storage supporting the whole process.",
    ],
    [
      "When using a search engine, using specific 'keywords' helps you to:",
      [
        "get more relevant and accurate results",
        "slow down the computer",
        "delete the web page",
        "increase the screen brightness",
      ],
      0,
      "Specific, well-chosen keywords narrow a search so that the results are more relevant and accurate.",
    ],
    [
      "Organising your files into clearly named 'folders' helps you to:",
      [
        "use much more electricity",
        "find and manage your files more easily",
        "delete the operating system",
        "make the files larger",
      ],
      1,
      "Storing files in clearly named folders keeps them organised so they are easier to find and manage.",
    ],
    [
      "Giving a file a clear, descriptive file name is useful because it:",
      [
        "changes the file into a picture",
        "makes the file print faster",
        "makes it easier to identify and find the file later",
        "connects the computer to Wi-Fi",
      ],
      2,
      "A clear, descriptive file name makes it easy to recognise the file's contents and find it again later.",
    ],
    [
      "When deciding whether a website is trustworthy, you should consider:",
      [
        "how colourful the page is",
        "how many adverts it shows",
        "the size of the font used",
        "who created it and whether the information is accurate and up to date",
      ],
      3,
      "A website's trustworthiness depends on who created it, its accuracy and how current the information is — not on its appearance.",
    ],
    [
      "A graph or chart is often used instead of a long table of numbers because it:",
      [
        "makes trends and comparisons easier to see at a glance",
        "always uses more paper",
        "hides the information",
        "deletes the data",
      ],
      0,
      "A graph or chart presents data visually, making trends and comparisons quick and easy to see.",
    ],
    [
      "'Sorting' a list of data means:",
      [
        "deleting some of the data",
        "arranging it in a particular order, such as alphabetically",
        "printing it twice",
        "changing it into a photograph",
      ],
      1,
      "Sorting arranges data in a chosen order, for example alphabetically or from smallest to largest.",
    ],
  ],
  "Social Implications & Computer Ethics": [
    [
      "'Green computing' refers to:",
      [
        "painting your computer green",
        "using the internet only at night",
        "playing computer games outdoors",
        "using computers in an environmentally friendly way, such as saving energy and recycling e-waste",
      ],
      3,
      "Green computing means using computers in an environmentally responsible way — saving electricity, reducing waste and recycling old equipment.",
    ],
    [
      "'Netiquette' refers to:",
      [
        "the rules of polite and respectful behaviour when communicating online",
        "a type of computer virus",
        "the speed of the internet connection",
        "a brand of computer",
      ],
      0,
      "Netiquette is the set of guidelines for polite, respectful and responsible behaviour when communicating on the internet.",
    ],
    [
      "'Cyberbullying' is:",
      [
        "fixing a broken computer",
        "using technology to harass, threaten or embarrass someone",
        "making a backup of your files",
        "typing very quickly",
      ],
      1,
      "Cyberbullying is using digital technology — such as messages or social media — to harass, threaten or humiliate another person.",
    ],
    [
      "'Phishing' is a scam in which criminals try to:",
      [
        "improve your internet speed",
        "recycle old computers",
        "trick you into giving out personal information such as passwords or bank details",
        "physically clean your keyboard",
      ],
      2,
      "Phishing uses fake emails or websites to trick people into revealing personal information such as passwords or banking details.",
    ],
    [
      "To protect your health when using a computer for long periods, you should:",
      [
        "stare at the screen without blinking",
        "sit in the most awkward position possible",
        "never move from your chair",
        "sit with good posture and take regular breaks to rest your eyes and body",
      ],
      3,
      "Good posture, a well-set-up workstation and regular breaks help prevent eye strain and bodily injury from long computer use.",
    ],
    [
      "A 'firewall' is used to:",
      [
        "help protect a computer or network from unauthorised access",
        "physically cool down the CPU",
        "increase the font size on screen",
        "print documents faster",
      ],
      0,
      "A firewall monitors and controls network traffic to help protect a computer or network from unauthorised access and threats.",
    ],
    [
      "The 'digital divide' refers to:",
      [
        "splitting a screen into two windows",
        "the gap between people who have access to technology and those who do not",
        "dividing two numbers in a spreadsheet",
        "a cracked monitor",
      ],
      1,
      "The digital divide is the gap between those who have access to computers and the internet and those who do not.",
    ],
    [
      "Before posting a photo of a friend online, good ethical behaviour is to:",
      [
        "post it immediately without thinking",
        "tag as many strangers as possible",
        "ask your friend's permission first",
        "delete your own account",
      ],
      2,
      "Respecting others' privacy means asking a person's permission before posting photos or information about them online.",
    ],
  ],
  "Spreadsheet Concepts": [
    [
      "Every formula in a spreadsheet must begin with:",
      ["an equals sign (=)", "a full stop", "the letter F", "a space"],
      0,
      "A spreadsheet formula always starts with an equals sign (=), which tells the program that a calculation follows.",
    ],
    [
      "The function =AVERAGE(B1:B4) calculates the:",
      [
        "largest value in the range",
        "average (mean) of the values in the range",
        "number of cells in the range",
        "smallest value in the range",
      ],
      1,
      "AVERAGE adds up the values in the range and divides by how many there are, giving the mean.",
    ],
    [
      "In a spreadsheet, the result of =5*3 is:",
      ["8", "2", "15", "53"],
      2,
      "The asterisk (*) is the multiplication operator, so =5*3 gives 15.",
    ],
    [
      "Columns in a spreadsheet are labelled with:",
      ["numbers", "symbols", "colours", "letters (A, B, C ...)"],
      3,
      "Spreadsheet columns are labelled with letters (A, B, C ...), while rows are labelled with numbers.",
    ],
    [
      "The function =MAX(A1:A5) returns the:",
      [
        "largest value in the range",
        "total of the range",
        "average of the range",
        "first cell in the range",
      ],
      0,
      "MAX returns the largest (maximum) value found in the range.",
    ],
    [
      "The cell that is currently selected and ready to be used is called the:",
      ["hidden cell", "active cell", "deleted cell", "locked cell"],
      1,
      "The active (current) cell is the one that is selected and into which data or a formula will be entered.",
    ],
    [
      "In a spreadsheet, the result of =20-8 is:",
      ["28", "208", "12", "160"],
      2,
      "The minus sign (-) is the subtraction operator, so =20-8 gives 12.",
    ],
    [
      "Rows in a spreadsheet are labelled with:",
      ["letters", "colours", "symbols", "numbers (1, 2, 3 ...)"],
      3,
      "Spreadsheet rows are labelled with numbers (1, 2, 3 ...), while columns are labelled with letters.",
    ],
  ],
  "Word Processing & Database Concepts": [
    [
      "Which word-processing feature places text in the middle of the page from left to right?",
      ["left align", "centre align", "justify", "bold"],
      1,
      "Centre alignment positions text in the middle of the page between the left and right margins.",
    ],
    [
      "The 'undo' feature in a word processor is used to:",
      [
        "save the document",
        "print the document",
        "reverse the last action you performed",
        "close the program",
      ],
      2,
      "Undo reverses the most recent action, which is useful for correcting a mistake you have just made.",
    ],
    [
      "A 'bulleted list' is used to:",
      [
        "draw a picture",
        "calculate numbers",
        "play music",
        "present a list of items, each marked with a symbol such as a dot",
      ],
      3,
      "A bulleted list shows a set of items, each marked with a bullet (such as a dot), where the order does not matter.",
    ],
    [
      "Changing the 'font size' in a document changes:",
      [
        "how big or small the text appears",
        "the colour of the page",
        "the speed of the printer",
        "the file's location on the computer",
      ],
      0,
      "Font size controls how large or small the text characters appear in the document.",
    ],
    [
      "In a database table, a 'record' is:",
      [
        "a single category of data shown as a column",
        "all the data about one item, shown as a row",
        "the name of the database file",
        "a printed page",
      ],
      1,
      "A record is all the data about one item or person, stored as a single row in a database table.",
    ],
    [
      "In a database, a 'field' is:",
      [
        "a complete row of data about one item",
        "the whole database file",
        "a single category of data, shown as a column (for example 'FirstName')",
        "a chart",
      ],
      2,
      "A field is one category of data, shown as a column in a table — for example a 'FirstName' or 'Age' field.",
    ],
    [
      "A 'primary key' in a database is a field that:",
      [
        "is always left empty",
        "stores only pictures",
        "may be the same for every record",
        "uniquely identifies each record, so no two records have the same value",
      ],
      3,
      "A primary key uniquely identifies each record in a table, so its value is different for every record (for example a learner number).",
    ],
    [
      "Using 'Save As' instead of 'Save' allows you to:",
      [
        "save the document with a new name, or in a new location or format",
        "permanently delete the document",
        "print the document",
        "switch off the computer",
      ],
      0,
      "'Save As' lets you save a copy of the document under a different name, in a different folder, or in a different file format.",
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
