// Seeds the Grade 11 Business Studies question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only (definitions, classifications, SA
// business facts). DISTINCT from the Gr12 Business Studies bank: Gr11-centric
// topics (business environments, forms of ownership, business sectors,
// entrepreneurship, business functions, contemporary socio-economic issues).
// Correct-answer positions are spread evenly A-D per topic because the quiz
// engine shuffles question order, not option order. Safe to re-run.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade11-businessstudies.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Business Studies";
const GRADE = "Grade 11";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Business Environments": [
    [
      "The micro environment of a business consists of factors that are:",
      [
        "within the business's control, such as its employees and resources",
        "completely outside any influence",
        "only international in nature",
        "limited to the weather",
      ],
      0,
      "The micro environment is made up of the internal elements the business controls — its vision, employees, resources and management.",
    ],
    [
      "The market environment of a business includes:",
      [
        "only the business's own employees",
        "suppliers, customers and competitors, which the business can influence but not control",
        "national laws only",
        "global interest rates only",
      ],
      1,
      "The market environment lies just outside the business — suppliers, customers, competitors and intermediaries — which it can influence but not fully control.",
    ],
    [
      "Which of the following forms part of the MACRO environment?",
      [
        "the business's own staff",
        "the business's direct competitors",
        "government legislation and the state of the economy",
        "the firm's internal budget",
      ],
      2,
      "The macro environment is made up of external forces the business cannot control, such as political/legal, economic, social, technological and environmental factors.",
    ],
    [
      "The degree of control a business has over its three environments is best described as:",
      [
        "full control over all three",
        "no control over any of them",
        "control only over the macro environment",
        "full control over micro, some influence over market, no control over macro",
      ],
      3,
      "A business fully controls the micro environment, can influence (but not control) the market environment, and has no control over the macro environment.",
    ],
    [
      "A new law passed by government that affects how businesses operate is a challenge from the:",
      ["macro environment", "micro environment", "market environment", "internal environment"],
      0,
      "Legislation comes from government — part of the macro environment, which is beyond the control of the business.",
    ],
    [
      "A business losing customers because a competitor lowers its prices is a challenge from the:",
      ["macro environment", "market environment", "micro environment", "physical environment"],
      1,
      "Competitors are part of the market environment — the business can respond to and influence them but cannot control them.",
    ],
    [
      "Poor leadership and a shortage of skilled workers inside the business are challenges in the:",
      ["macro environment", "market environment", "micro environment", "international environment"],
      2,
      "Leadership and the business's own workforce are internal factors, part of the micro environment, which the business can control.",
    ],
    [
      "A PESTLE analysis is a tool used mainly to analyse the:",
      ["micro environment", "market environment", "internal finances", "macro environment"],
      3,
      "PESTLE (Political, Economic, Social, Technological, Legal, Environmental) is used to analyse the macro environment.",
    ],
  ],
  "Forms of Ownership": [
    [
      "A business owned and run by one person, who keeps all the profit and bears all the losses, is a:",
      ["sole trader (sole proprietor)", "private company", "close corporation", "co-operative"],
      0,
      "A sole trader (sole proprietor) is owned by one person who takes all the profit and is personally liable for all the debts.",
    ],
    [
      "A key DISADVANTAGE of a sole trader is that the owner has:",
      ["limited liability", "unlimited liability for the business's debts", "many shareholders", "a separate legal personality"],
      1,
      "A sole trader has unlimited liability — the owner is personally responsible for all the business's debts, even to the extent of personal assets.",
    ],
    [
      "A business owned by 2 to 20 partners who share profits and management, with no separate legal personality, is a:",
      ["sole trader", "public company", "partnership", "state-owned enterprise"],
      2,
      "A partnership is owned by 2 to 20 partners who share profits, losses and management; it has no separate legal personality and the partners have unlimited liability.",
    ],
    [
      "The abbreviation '(Pty) Ltd' after a company's name indicates a:",
      ["sole trader", "partnership", "public company", "private company"],
      3,
      "'(Pty) Ltd' stands for Proprietary Limited — a private company whose shares may not be offered to the public and whose shareholders have limited liability.",
    ],
    [
      "'Limited liability' means that:",
      [
        "shareholders can only lose the amount they invested, not their personal assets",
        "the business can never make a loss",
        "there is no limit to how much profit may be made",
        "the owners must personally pay all the debts",
      ],
      0,
      "Limited liability means owners/shareholders risk only the money they invested; their personal assets are protected if the company cannot pay its debts.",
    ],
    [
      "A company that may sell its shares to the public and can be listed on a stock exchange is a:",
      ["sole trader", "public company (Ltd)", "partnership", "private company (Pty Ltd)"],
      1,
      "A public company (Ltd) may offer its shares to the public and can be listed on a securities exchange such as the JSE.",
    ],
    [
      "A business formed by a group of people to serve their common economic interests, where each member has one vote, is a:",
      ["public company", "sole trader", "co-operative", "private company"],
      2,
      "A co-operative is owned and run by its members for their mutual benefit and operates on a democratic 'one member, one vote' basis.",
    ],
    [
      "Which form of ownership has a separate legal personality, so the business can own property and be sued in its own name?",
      ["a sole trader", "a partnership", "a verbal agreement", "a company"],
      3,
      "A company is a separate legal entity (juristic person) — it can own property, enter contracts and be sued in its own name, separate from its owners.",
    ],
  ],
  "Business Sectors": [
    [
      "The primary sector of the economy involves:",
      [
        "extracting raw materials from nature, e.g. farming and mining",
        "manufacturing goods in factories",
        "providing services such as banking",
        "selling insurance policies",
      ],
      0,
      "The primary sector extracts natural raw materials — for example agriculture, mining, fishing and forestry.",
    ],
    [
      "The secondary sector of the economy is mainly concerned with:",
      [
        "mining raw materials",
        "processing and manufacturing raw materials into finished goods",
        "providing legal advice",
        "growing crops",
      ],
      1,
      "The secondary sector processes and manufactures raw materials into finished or semi-finished goods, for example factories and construction.",
    ],
    [
      "A bank, a school and a tour guide all belong to the:",
      ["primary sector", "secondary sector", "tertiary sector", "raw-material sector"],
      2,
      "The tertiary sector provides services rather than goods — for example banking, education, tourism, retail and transport.",
    ],
    [
      "Turning raw wheat into bread in a bakery is an activity of the:",
      ["primary sector", "tertiary sector", "service sector", "secondary sector"],
      3,
      "Manufacturing bread from raw wheat processes raw materials into a finished product — a secondary-sector activity.",
    ],
    [
      "Which of the following is a primary-sector activity?",
      ["catching fish at sea", "selling clothes in a shop", "repairing cellphones", "teaching learners"],
      0,
      "Catching fish harvests a natural resource directly from nature, which is a primary-sector activity.",
    ],
    [
      "Which of the following is a secondary-sector activity?",
      ["mining gold", "assembling motor vehicles in a factory", "offering haircuts", "providing internet access"],
      1,
      "Assembling motor vehicles manufactures a finished product from materials — a secondary-sector activity.",
    ],
    [
      "Which of the following is a tertiary-sector activity?",
      ["growing maize", "building furniture", "delivering parcels for customers", "drilling for oil"],
      2,
      "Delivering parcels is a transport service, which falls in the tertiary (services) sector.",
    ],
    [
      "In a developed economy, the sector that usually contributes the most to the economy is the:",
      ["primary sector", "mining sector", "farming sector", "tertiary (services) sector"],
      3,
      "In developed economies the tertiary (services) sector is usually the largest contributor to the economy and to employment.",
    ],
  ],
  "Entrepreneurship": [
    [
      "An entrepreneur is best described as a person who:",
      [
        "identifies an opportunity and starts a business, taking the risk to make a profit",
        "works for a fixed salary and takes no risk",
        "only invests money in a savings account",
        "collects taxes for the government",
      ],
      0,
      "An entrepreneur spots an opportunity and starts and runs a business, taking the risk involved in order to make a profit.",
    ],
    [
      "The four factors of production are natural resources, labour, capital and:",
      ["advertising", "entrepreneurship", "the weather", "taxation"],
      1,
      "The four factors of production are natural resources (land), labour, capital and entrepreneurship.",
    ],
    [
      "A written document that describes a business idea, its goals and how they will be achieved is a:",
      ["tax return", "salary slip", "business plan", "delivery note"],
      2,
      "A business plan sets out the business idea, its objectives and the strategies and resources needed to achieve them.",
    ],
    [
      "Which of the following is a desirable quality of a successful entrepreneur?",
      [
        "avoiding all responsibility",
        "giving up at the first problem",
        "being afraid of every risk",
        "being innovative, hardworking and willing to take calculated risks",
      ],
      3,
      "Successful entrepreneurs are typically innovative, hardworking, persistent and willing to take calculated (carefully considered) risks.",
    ],
    [
      "'Capital' as a factor of production refers to:",
      [
        "the money, equipment and buildings used to run the business",
        "the natural resources only",
        "the workers' skills only",
        "the government's laws",
      ],
      0,
      "Capital is the man-made resources used in production — money, machinery, equipment and buildings.",
    ],
    [
      "A common reason why new small businesses fail is:",
      [
        "keeping accurate financial records",
        "poor planning and a lack of management skills",
        "doing thorough market research",
        "controlling costs carefully",
      ],
      1,
      "Many new businesses fail because of poor planning and weak management skills, including poor cash-flow control.",
    ],
    [
      "Conducting market research before starting a business helps the entrepreneur to:",
      [
        "avoid paying any tax",
        "guarantee that profits are impossible",
        "understand customers' needs and the level of competition",
        "ignore the competition completely",
      ],
      2,
      "Market research provides information about customers' needs, the size of the market and competitors, helping the entrepreneur make informed decisions.",
    ],
    [
      "'Innovation' in business means:",
      [
        "copying a competitor exactly",
        "keeping everything exactly the same",
        "reducing the number of customers",
        "introducing new or improved products, services or ways of doing things",
      ],
      3,
      "Innovation is the introduction of new or improved products, services or methods that add value and give the business an advantage.",
    ],
  ],
  "Business Functions": [
    [
      "The business function responsible for recruiting, training and paying staff is the:",
      ["human resources function", "production function", "marketing function", "purchasing function"],
      0,
      "The human resources (HR) function handles recruitment, selection, training, remuneration and the wellbeing of employees.",
    ],
    [
      "The business function responsible for managing the money of the business, including budgets and financial records, is the:",
      ["marketing function", "financial function", "production function", "public relations function"],
      1,
      "The financial function manages the money of the business — budgeting, recording transactions, financial statements and cash flow.",
    ],
    [
      "The business function responsible for promoting and selling products to customers is the:",
      ["purchasing function", "administration function", "marketing function", "production function"],
      2,
      "The marketing function identifies customer needs and promotes, prices, distributes and sells the business's products.",
    ],
    [
      "The business function responsible for buying the raw materials, stock and equipment the business needs is the:",
      ["marketing function", "human resources function", "public relations function", "purchasing function"],
      3,
      "The purchasing (procurement) function obtains the raw materials, stock and equipment the business needs at the right price, quality and time.",
    ],
    [
      "The business function that converts raw materials into finished goods is the:",
      ["production function", "financial function", "public relations function", "administration function"],
      0,
      "The production (operations) function transforms raw materials and other inputs into finished goods or services.",
    ],
    [
      "The function that maintains a positive image of the business and good relations with the public and media is the:",
      ["purchasing function", "public relations function", "production function", "financial function"],
      1,
      "The public relations (PR) function builds and maintains a favourable image of the business with the public, media and other stakeholders.",
    ],
    [
      "The general management function is mainly responsible for:",
      [
        "only cleaning the offices",
        "only selling the products",
        "planning, organising, leading and controlling the whole business",
        "only buying the stock",
      ],
      2,
      "General management plans, organises, leads and controls the business as a whole and coordinates all the other functions.",
    ],
    [
      "The administration function of a business mainly deals with:",
      [
        "manufacturing goods",
        "advertising on television",
        "training factory workers",
        "managing information, records and office systems",
      ],
      3,
      "The administration function handles the processing, storage and flow of information and records, supporting the other functions with office systems.",
    ],
  ],
  "Contemporary Socio-Economic Issues": [
    [
      "'Inflation' refers to:",
      [
        "a sustained general increase in prices, which reduces buying power",
        "a fall in all prices",
        "an increase in the value of money",
        "a rise in employment",
      ],
      0,
      "Inflation is a sustained rise in the general level of prices, which means money buys less than it did before.",
    ],
    [
      "'Unemployment' describes a situation where people who are:",
      [
        "too young to work stay at home",
        "able and willing to work, and looking for jobs, cannot find work",
        "retired and choose not to work",
        "self-employed and run their own businesses",
      ],
      1,
      "Unemployment exists when people who are able and willing to work, and are actively looking for work, cannot find jobs.",
    ],
    [
      "Which of the following is a way a business can act in a socially responsible manner?",
      [
        "polluting rivers to save money",
        "ignoring worker safety",
        "supporting community projects and reducing pollution",
        "paying workers below the minimum wage",
      ],
      2,
      "Corporate social responsibility includes supporting community projects, protecting the environment and treating workers fairly — going beyond simply making a profit.",
    ],
    [
      "'Productivity' in a business measures:",
      [
        "the total number of employees",
        "the colour of the products",
        "how many managers there are",
        "how efficiently inputs are turned into outputs",
      ],
      3,
      "Productivity measures how efficiently a business converts inputs (such as labour and materials) into outputs; higher productivity means more output from the same resources.",
    ],
    [
      "A minimum wage is:",
      [
        "the lowest amount an employer may legally pay a worker",
        "the highest salary a manager may earn",
        "a tax charged on businesses",
        "the price of raw materials",
      ],
      0,
      "A minimum wage is the lowest amount that an employer is legally allowed to pay an employee for their work.",
    ],
    [
      "HIV/AIDS in the workplace can affect a business by:",
      [
        "increasing productivity",
        "increasing absenteeism and reducing productivity",
        "lowering all medical costs",
        "having no effect at all",
      ],
      1,
      "HIV/AIDS can raise absenteeism, increase medical and training costs and reduce productivity, so businesses run wellness and education programmes to address it.",
    ],
    [
      "'Affirmative action' in South Africa is intended to:",
      [
        "favour only foreign workers",
        "prevent anyone from being employed",
        "redress past unfair discrimination by advancing previously disadvantaged groups",
        "reduce wages for everyone",
      ],
      2,
      "Affirmative action aims to redress the effects of past unfair discrimination by advancing the employment of people from previously disadvantaged groups.",
    ],
    [
      "One way for a business to help reduce unemployment in its community is to:",
      [
        "replace all its workers with machines",
        "import all its labour from overseas",
        "close down its operations",
        "create jobs and provide skills training such as learnerships",
      ],
      3,
      "Businesses help reduce unemployment by creating jobs and offering skills development such as learnerships and internships.",
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
