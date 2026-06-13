// Seeds the Grade 11 Computer Applications Technology (CAT) theory bank
// (6 topics x 8 questions). CAPS-aligned, objectively-checkable only.
// DELIBERATELY DISTINCT from the Grade 12 CAT bank: different facts and
// examples within the same content areas (input/output devices, the web,
// research/info management, security/backups, MIN/COUNTA/relative refs, word
// processing + basic database). No interpretive questions. Correct-answer
// positions are spread evenly A-D per topic because the quiz engine shuffles
// question order, not option order. Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade11-cat.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Computer Applications Technology";
const GRADE = "Grade 11";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Systems Technologies": [
    [
      "Which of the following is an input device?",
      ["keyboard", "monitor", "printer", "speaker"],
      0,
      "A keyboard is an input device — it sends data into the computer. A monitor, printer and speakers are output devices.",
    ],
    [
      "Which of the following is an output device?",
      ["mouse", "monitor", "scanner", "microphone"],
      1,
      "A monitor is an output device — it displays information from the computer. The mouse, scanner and microphone are input devices.",
    ],
    [
      "The clock speed (processing speed) of a CPU is measured in:",
      ["bytes", "pixels", "gigahertz (GHz)", "megabytes"],
      2,
      "CPU clock speed is measured in hertz, usually gigahertz (GHz) — the number of processing cycles it can perform per second.",
    ],
    [
      "Which type of software would you use to type and format a letter?",
      ["a spreadsheet program", "a web browser", "an operating system", "a word processor"],
      3,
      "A word processor is the application used to type and format text documents such as a letter.",
    ],
    [
      "The resolution of a screen or image is measured in:",
      ["pixels", "hertz", "decibels", "bytes per second"],
      0,
      "Resolution is measured in pixels (for example 1920 × 1080) — the number of tiny dots that make up the image.",
    ],
    [
      "Which of the following is an example of secondary (permanent) storage?",
      ["RAM", "a hard drive (HDD or SSD)", "the CPU", "cache memory"],
      1,
      "A hard drive (HDD or SSD) is secondary storage that keeps data permanently, even when the power is off. RAM and cache are temporary memory.",
    ],
    [
      "The 'motherboard' of a computer is best described as:",
      [
        "the screen that displays output",
        "the device used to type text",
        "the main circuit board that connects all the components",
        "a type of printer",
      ],
      2,
      "The motherboard is the main circuit board into which the CPU, memory and other components plug, and through which they communicate.",
    ],
    [
      "A megabyte (MB) is approximately equal to:",
      ["one thousand gigabytes", "a single bit", "eight pixels", "one thousand kilobytes"],
      3,
      "A megabyte is roughly 1 000 kilobytes (1 024 KB), and a gigabyte is in turn roughly 1 000 megabytes.",
    ],
  ],
  "Network & Internet Technologies": [
    [
      "The main purpose of a web browser is to:",
      ["access and display web pages", "create spreadsheets", "edit photographs", "print documents"],
      0,
      "A web browser (such as Chrome, Edge or Firefox) is software used to access and display web pages on the internet.",
    ],
    [
      "A URL such as www.example.co.za is best described as:",
      ["an email address", "the web address of a page or site", "a password", "a file name"],
      1,
      "A URL (Uniform Resource Locator) is the address used to find a specific web page or website on the internet.",
    ],
    [
      "Which of the following best describes 'the cloud' in computing?",
      [
        "a weather-forecasting program",
        "a type of printer",
        "storing data and using services on remote internet servers",
        "the inside of the computer case",
      ],
      2,
      "Cloud computing means storing data and running services on remote servers accessed over the internet, rather than only on your own device.",
    ],
    [
      "An ISP is a company that:",
      ["manufactures keyboards", "repairs computer screens", "writes antivirus software", "provides access to the internet"],
      3,
      "An ISP (Internet Service Provider) is a company that gives users access to the internet, for example via fibre, ADSL or mobile data.",
    ],
    [
      "Which of the following is an advantage of email over ordinary postal mail?",
      [
        "it is delivered almost instantly",
        "it cannot carry any attachments",
        "it always needs a postage stamp",
        "it can only be sent once a day",
      ],
      0,
      "Email is delivered almost instantly and can include attachments, making it far faster than ordinary ('snail') postal mail.",
    ],
    [
      "In an email address, the '@' symbol separates the:",
      [
        "first name and the last name",
        "username from the domain (mail server) name",
        "subject from the message",
        "date from the time",
      ],
      1,
      "In an address such as name@example.com, the @ separates the username (name) from the domain or mail-server name (example.com).",
    ],
    [
      "A 'hyperlink' on a web page is:",
      [
        "a spelling error",
        "a printer setting",
        "clickable text or an image that takes you to another page or resource",
        "the title of the page",
      ],
      2,
      "A hyperlink is clickable text or an image that, when clicked, takes the user to another web page, file or resource.",
    ],
    [
      "Which of the following would normally give the fastest internet connection?",
      [
        "a slow dial-up modem",
        "a 3G mobile connection in a weak-signal area",
        "an old copper telephone line",
        "a fibre-optic connection",
      ],
      3,
      "A fibre-optic connection offers the highest speeds, far faster than dial-up, a weak mobile signal or old copper lines.",
    ],
  ],
  "Information Management": [
    [
      "The first step in solving an information problem is usually to:",
      [
        "define and understand the task and what information is needed",
        "print the final report",
        "delete all the old files",
        "buy a new computer",
      ],
      0,
      "You must first define and understand the task — what question must be answered and what information is needed — before gathering or processing any data.",
    ],
    [
      "Which of the following is the most reliable source for a school research project?",
      [
        "an anonymous comment on a video",
        "an article on an official government or university website",
        "a random social-media rumour",
        "a forwarded WhatsApp message",
      ],
      1,
      "An official government or university website is an authoritative, accountable source, unlike anonymous comments, rumours or forwarded messages.",
    ],
    [
      "'Plagiarism' when doing research means:",
      [
        "listing your sources correctly",
        "writing the work in your own words",
        "copying someone's work and presenting it as your own",
        "summarising a source in your own words",
      ],
      2,
      "Plagiarism is copying another person's work or ideas and presenting them as your own without acknowledging the source.",
    ],
    [
      "A bibliography (list of sources) is included in a project mainly to:",
      [
        "make the project longer",
        "decorate the cover page",
        "hide where the information came from",
        "credit the sources used and let readers find them",
      ],
      3,
      "A bibliography credits the sources that were used and allows readers to locate them, which also helps to avoid plagiarism.",
    ],
    [
      "Which file format is best for sending a document that should keep its exact layout and not be easily changed?",
      ["PDF", "a plain text (.txt) file", "an audio (.mp3) file", "a video (.mp4) file"],
      0,
      "A PDF keeps the exact layout on any device and is not easily edited, making it ideal for sharing a finished document.",
    ],
    [
      "When evaluating information found online, you should check that it is:",
      [
        "written in capital letters",
        "accurate, current and from a trustworthy source",
        "the longest result available",
        "on the very first website you open",
      ],
      1,
      "Good information is accurate, up to date (current) and comes from a trustworthy, accountable source — not simply the longest or first result.",
    ],
    [
      "Turning a table of numbers into a graph is an example of:",
      ["deleting data", "encrypting data", "processing data into a more useful form", "backing up data"],
      2,
      "Presenting data as a graph processes it into a clearer, more useful form that is easier to interpret than a plain table of numbers.",
    ],
    [
      "A good research question is one that is:",
      [
        "impossible to answer",
        "about a completely unrelated topic",
        "answered simply with 'yes'",
        "clear, focused and answerable with the available information",
      ],
      3,
      "A good research question is clear and focused and can realistically be answered using the information that is available.",
    ],
  ],
  "Social Implications & Security": [
    [
      "Regularly making a backup of your work is important because it:",
      [
        "lets you restore your data if it is lost or damaged",
        "makes the computer run faster",
        "increases the screen resolution",
        "removes viruses automatically",
      ],
      0,
      "A backup is a spare copy of your data so that you can restore it if the original is lost, damaged or stolen.",
    ],
    [
      "Antivirus software is used to:",
      [
        "speed up your typing",
        "detect, block and remove malware such as viruses",
        "design web pages",
        "increase storage space",
      ],
      1,
      "Antivirus software detects, blocks and removes malicious software (malware) such as viruses, worms and Trojans.",
    ],
    [
      "'Spam' refers to:",
      ["a useful software update", "a strong password", "unwanted, unsolicited (usually bulk) email", "a backup copy"],
      2,
      "Spam is unwanted, unsolicited email, often sent in bulk to advertise products or to carry out scams.",
    ],
    [
      "What is the safest action if you receive an email from an unknown sender with a suspicious attachment?",
      [
        "open it immediately to see what it is",
        "forward it to all your friends",
        "reply to the sender with your password",
        "do not open the attachment and delete the email",
      ],
      3,
      "Suspicious attachments from unknown senders may contain malware, so you should not open them and should delete the email.",
    ],
    [
      "Repetitive Strain Injury (RSI) from computer use can best be prevented by:",
      [
        "using correct posture and taking regular breaks",
        "typing as fast as possible without ever stopping",
        "sitting very far from the screen all day",
        "never using a chair",
      ],
      0,
      "RSI is prevented by good ergonomics — correct posture, a properly set-up workstation and regular breaks from repetitive movements.",
    ],
    [
      "'e-waste' refers to:",
      [
        "junk email in your inbox",
        "discarded electronic equipment such as old computers and phones",
        "wasted electricity",
        "files you have deleted",
      ],
      1,
      "e-waste is discarded electronic equipment — such as old computers, phones and printers — which should be recycled responsibly to protect the environment.",
    ],
    [
      "A strong password should:",
      [
        "be your own first name",
        "simply be the word 'password'",
        "be long and mix letters, numbers and symbols",
        "be shared with all your friends",
      ],
      2,
      "A strong password is long, combines uppercase and lowercase letters, numbers and symbols, and is kept private.",
    ],
    [
      "Software piracy is:",
      [
        "buying software legally",
        "writing your own software",
        "donating software to a school",
        "illegally copying or using software without a proper licence",
      ],
      3,
      "Software piracy is the illegal copying, sharing or use of software without a valid licence, which is against the law.",
    ],
  ],
  "Spreadsheet Concepts": [
    [
      "In a spreadsheet, the block formed where a column and a row meet is called a:",
      ["cell", "chart", "sheet", "macro"],
      0,
      "A cell is the box formed where a column and a row meet; it is identified by its column letter and row number (for example B3).",
    ],
    [
      "The function =MIN(A1:A10) returns the:",
      [
        "total of the range",
        "smallest value in the range",
        "average of the range",
        "number of cells in the range",
      ],
      1,
      "MIN returns the smallest (minimum) value found in the range.",
    ],
    [
      "In the formula =B2+B3, the cell reference B2 (with no dollar signs) is an example of a:",
      ["absolute reference", "function name", "relative reference", "label"],
      2,
      "B2 with no dollar signs is a relative reference — it adjusts automatically when the formula is copied to another cell.",
    ],
    [
      "What does =10/2 display as its result in a spreadsheet?",
      ["12", "8", "20", "5"],
      3,
      "The forward slash (/) is the division operator, so =10/2 gives 5.",
    ],
    [
      "Which spreadsheet feature is best used to show visually how sales change over 12 months?",
      ["a chart (graph)", "the spell-checker", "a password", "the print preview"],
      0,
      "A chart (graph) presents data visually, making a trend such as monthly sales changes easy to see at a glance.",
    ],
    [
      "The COUNTA function counts the number of cells in a range that:",
      [
        "contain only the number zero",
        "are not empty (contain any data)",
        "are coloured red",
        "contain formulas only",
      ],
      1,
      "COUNTA counts all the cells in a range that are not empty — those containing numbers, text or any other data.",
    ],
    [
      "To make a cell reference stay fixed when a formula is copied, you should make it:",
      ["a relative reference", "a column label", "an absolute reference (e.g. $B$2)", "a chart"],
      2,
      "An absolute reference, written with dollar signs (for example $B$2), stays fixed and does not change when the formula is copied.",
    ],
    [
      "The function =SUM(A1:A5) will:",
      [
        "count how many cells are filled",
        "find the largest value",
        "sort the values",
        "add together the values in cells A1 to A5",
      ],
      3,
      "SUM adds together all the values in the specified range, so =SUM(A1:A5) totals the values in cells A1 through A5.",
    ],
  ],
  "Word Processing & Database Concepts": [
    [
      "In a word processor, which feature automatically checks for spelling mistakes?",
      ["the spell-checker", "the calculator", "the chart tool", "the firewall"],
      0,
      "The spell-checker automatically identifies and helps to correct spelling mistakes in a document.",
    ],
    [
      "'Word wrap' in a word processor means that text:",
      [
        "is deleted at the end of a line",
        "automatically moves to the next line when it reaches the right margin",
        "is printed in columns",
        "is converted into a picture",
      ],
      1,
      "Word wrap automatically moves text onto the next line when it reaches the right margin, so you do not press Enter at the end of every line.",
    ],
    [
      "Which formatting feature makes a heading stand out by making the text darker and thicker?",
      ["italics", "lowercase", "bold", "subscript"],
      2,
      "Bold makes text appear darker and thicker, which is often used to make headings stand out.",
    ],
    [
      "'Line spacing' in a document controls the:",
      [
        "colour of the text",
        "size of the page",
        "number of pages",
        "amount of vertical space between lines of text",
      ],
      3,
      "Line spacing sets the amount of vertical space between the lines of text, for example single or 1.5 line spacing.",
    ],
    [
      "In a database, a 'field' is best described as:",
      [
        "a single category of data, shown as a column (e.g. Surname)",
        "a complete row of data about one item",
        "the whole database file",
        "a printed report",
      ],
      0,
      "A field is a single category or type of data, represented by a column in a table (for example a 'Surname' field).",
    ],
    [
      "Sorting a database in 'ascending' order means arranging the records:",
      [
        "from Z to A, or largest to smallest",
        "from A to Z, or smallest to largest",
        "in a completely random order",
        "by their colour",
      ],
      1,
      "Ascending order arranges records from smallest to largest, or alphabetically from A to Z.",
    ],
    [
      "Which database data type would be most suitable for a 'DateOfBirth' field?",
      ["text", "currency", "date/time", "yes/no (Boolean)"],
      2,
      "A date/time data type is designed to store dates such as a date of birth, allowing them to be sorted and used in calculations correctly.",
    ],
    [
      "The main purpose of 'Find and Replace' in a word processor is to:",
      [
        "change the page colour",
        "insert a chart",
        "print the document",
        "search for text and replace it with other text",
      ],
      3,
      "Find and Replace searches a document for specific text and replaces it with other text, which is useful for correcting a word that appears many times.",
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
