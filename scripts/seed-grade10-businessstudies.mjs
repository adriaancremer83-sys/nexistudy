// Seeds the Grade 10 Business Studies question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only (definitions, classifications, SA
// business facts). Grade 10 level. Topics are fully DISTINCT from the Gr11 bank
// (Gr11 = Business Environments, Forms of Ownership, Business Sectors,
// Entrepreneurship, Business Functions, Socio-Economic Issues; Gr10 here draws
// on the Business Roles & Entrepreneurship strands).
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but NOT option order).
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade10-businessstudies.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Business Studies";
const GRADE = "Grade 10";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Creative Thinking & Problem-Solving": [
    [
      "Creative thinking is the ability to:",
      [
        "generate new and original ideas to solve problems",
        "copy a competitor exactly",
        "do the same thing repeatedly",
        "avoid all new ideas",
      ],
      0,
      "Creative thinking is the ability to look at things in new ways and generate fresh, original ideas to solve problems.",
    ],
    [
      "A group technique in which members freely call out as many ideas as possible without judging them is called:",
      ["a SWOT analysis", "brainstorming", "an audit", "a budget"],
      1,
      "Brainstorming is a group technique for generating many ideas quickly, where no idea is criticised at the idea-generating stage.",
    ],
    [
      "A diagram that starts with a central idea and branches outwards to show related ideas is called a:",
      ["balance sheet", "pie chart", "mind map", "flow chart"],
      2,
      "A mind map is a visual tool that places a central idea in the middle and branches out to related ideas, helping with creative thinking.",
    ],
    [
      "A 'non-conventional' (unconventional) solution to a problem is one that:",
      [
        "has been used many times before",
        "follows the usual rules exactly",
        "is always wrong",
        "is new and original, and not the usual way of doing things",
      ],
      3,
      "A non-conventional solution is a new, creative, out-of-the-ordinary approach rather than the usual or expected one.",
    ],
    [
      "The FIRST step in solving a problem is usually to:",
      [
        "identify and define the problem clearly",
        "celebrate the result",
        "spend the profit",
        "ignore the problem",
      ],
      0,
      "Problem-solving starts with clearly identifying and defining the problem before generating and evaluating possible solutions.",
    ],
    [
      "Choosing the best solution from several options and then putting it into action is part of:",
      ["ignoring the problem", "the problem-solving process", "doing nothing", "closing the business"],
      1,
      "The problem-solving process involves identifying the problem, generating options, choosing the best solution and implementing it.",
    ],
    [
      "A benefit of using creative thinking in a business is that it:",
      [
        "wastes time and money",
        "reduces the number of customers",
        "helps the business find new products and a competitive advantage",
        "stops all innovation",
      ],
      2,
      "Creative thinking helps a business develop new products, services and methods, giving it a competitive advantage.",
    ],
    [
      "The 'Delphi technique' for solving problems involves:",
      [
        "guessing randomly",
        "copying rivals",
        "asking only the owner",
        "gathering the opinions of a panel of experts, usually in writing",
      ],
      3,
      "The Delphi technique collects and combines the opinions of a panel of experts (often through written questionnaires) to reach a solution.",
    ],
  ],
  "Self-Management & Professionalism": [
    [
      "'Time management' means:",
      [
        "planning and using your time effectively to get tasks done",
        "always working as slowly as possible",
        "ignoring all deadlines",
        "doing everything at the last minute",
      ],
      0,
      "Time management is planning and organising how you divide your time between tasks so that work is completed efficiently and on time.",
    ],
    [
      "Setting clear goals helps a person to:",
      ["waste resources", "stay focused and measure their progress", "avoid all work", "lose direction"],
      1,
      "Clear goals give direction and a way to measure progress, helping a person stay focused and motivated.",
    ],
    [
      "'Self-motivation' is the ability to:",
      [
        "depend on others for every decision",
        "give up easily",
        "drive yourself to achieve goals without being pushed by others",
        "avoid all responsibility",
      ],
      2,
      "Self-motivation is the inner drive to set and work towards your own goals without needing others to push you.",
    ],
    [
      "Maintaining a professional image in the workplace includes:",
      [
        "arriving late every day",
        "dressing untidily",
        "being rude to clients",
        "dressing appropriately and behaving politely and responsibly",
      ],
      3,
      "A professional image is created by dressing appropriately, being punctual and behaving in a courteous, responsible manner.",
    ],
    [
      "A good way to manage work-related stress is to:",
      [
        "plan ahead, prioritise tasks and take regular breaks",
        "ignore the problem completely",
        "work without any rest",
        "blame other people",
      ],
      0,
      "Stress can be managed by planning ahead, prioritising tasks, taking breaks and keeping a healthy work-life balance.",
    ],
    [
      "'Prioritising' tasks means:",
      [
        "doing the easiest task first, always",
        "doing the most important and urgent tasks first",
        "doing tasks in a random order",
        "never finishing any task",
      ],
      1,
      "Prioritising means arranging tasks in order of importance and urgency so that the most important ones are done first.",
    ],
    [
      "A person who takes responsibility for their own actions and decisions is showing:",
      ["poor self-management", "dishonesty", "accountability", "laziness"],
      2,
      "Accountability means taking responsibility for your own actions, decisions and their consequences.",
    ],
    [
      "'Work-life balance' refers to:",
      [
        "working every hour of the day",
        "never working at all",
        "spending no time with family",
        "dividing your time well between work and personal life",
      ],
      3,
      "Work-life balance is managing time so that work responsibilities and personal or family life are both given proper attention.",
    ],
  ],
  "Stakeholders": [
    [
      "A 'stakeholder' is:",
      [
        "any person or group with an interest in the business",
        "only the owner of the business",
        "only the government",
        "a competitor only",
      ],
      0,
      "A stakeholder is any person or group that has an interest in, or is affected by, the activities of a business.",
    ],
    [
      "Which of the following is an INTERNAL stakeholder of a business?",
      ["a customer", "an employee", "the government", "a supplier"],
      1,
      "Internal stakeholders are inside the business — owners/shareholders, managers and employees. Customers, suppliers and government are external.",
    ],
    [
      "Which of the following is an EXTERNAL stakeholder of a business?",
      ["a manager", "the owner", "a customer", "an employee"],
      2,
      "External stakeholders are outside the business — customers, suppliers, the community and government. Managers, owners and employees are internal.",
    ],
    [
      "The main interest that shareholders (owners) have in a business is to:",
      [
        "pay more tax",
        "increase pollution",
        "reduce their own income",
        "earn a profit or return on their investment",
      ],
      3,
      "Shareholders invest in a business mainly to earn a profit (dividends) and a good return on their investment.",
    ],
    [
      "Employees are stakeholders who expect the business to provide:",
      [
        "fair wages, good working conditions and job security",
        "no pay at all",
        "unsafe working conditions",
        "no work to do",
      ],
      0,
      "Employees expect fair wages, safe and fair working conditions, job security and opportunities to develop.",
    ],
    [
      "The government, as a stakeholder, is mainly interested in a business:",
      ["making losses", "paying its taxes and obeying the law", "polluting freely", "avoiding all employment"],
      1,
      "As a stakeholder, the government expects businesses to pay taxes, comply with laws and contribute to the economy and employment.",
    ],
    [
      "The local community is a stakeholder that expects a business to:",
      [
        "pollute the area",
        "ignore local people",
        "act responsibly, create jobs and protect the environment",
        "avoid all social projects",
      ],
      2,
      "The community expects a business to provide jobs, act responsibly, support local development and protect the environment.",
    ],
    [
      "Customers, as stakeholders, mainly expect a business to provide:",
      [
        "faulty goods",
        "poor service",
        "high prices and no value",
        "good-quality products and services at fair prices",
      ],
      3,
      "Customers expect good-quality, safe products and services at fair prices, along with good customer service.",
    ],
  ],
  "Generating Business Ideas & SWOT Analysis": [
    [
      "A 'business opportunity' is best described as:",
      [
        "a gap or need in the market that a business can fill to make a profit",
        "a guaranteed loss",
        "a tax form",
        "a competitor's advertisement",
      ],
      0,
      "A business opportunity is a favourable gap or unmet need in the market that a business can fill profitably.",
    ],
    [
      "In a SWOT analysis, the 'S' stands for:",
      ["Sales", "Strengths", "Salaries", "Stock"],
      1,
      "In a SWOT analysis the letters stand for Strengths, Weaknesses, Opportunities and Threats.",
    ],
    [
      "In a SWOT analysis, 'Opportunities' and 'Threats' are factors that come from the:",
      [
        "business's own staff",
        "owner's personal savings",
        "external environment outside the business",
        "internal budget only",
      ],
      2,
      "Opportunities and threats are external factors (from outside the business), while strengths and weaknesses are internal.",
    ],
    [
      "Conducting 'market research' before starting a business helps the entrepreneur to:",
      [
        "avoid paying tax",
        "guarantee failure",
        "ignore customers",
        "find out what customers want and how strong the competition is",
      ],
      3,
      "Market research gathers information about customers' needs, the size of the market and competitors, helping the entrepreneur make informed decisions.",
    ],
    [
      "A business 'strength' in a SWOT analysis could be:",
      [
        "a skilled and experienced workforce",
        "a new competitor opening nearby",
        "rising fuel prices",
        "a change in the law",
      ],
      0,
      "Strengths are internal positives, such as a skilled workforce, a good reputation or strong finances.",
    ],
    [
      "A business 'weakness' in a SWOT analysis could be:",
      [
        "a loyal customer base",
        "outdated equipment and a shortage of skills",
        "a strong brand name",
        "healthy cash flow",
      ],
      1,
      "Weaknesses are internal negatives, such as outdated equipment, weak finances or a lack of skills, that put the business at a disadvantage.",
    ],
    [
      "New business ideas can be generated by:",
      [
        "ignoring customers' needs",
        "never observing the market",
        "identifying problems people have and finding ways to solve them",
        "doing nothing at all",
      ],
      2,
      "Many business ideas come from spotting problems, needs or gaps in the market and finding new ways to meet them.",
    ],
    [
      "A rise in unemployment and a new tax on businesses would be classified in a SWOT analysis as:",
      ["strengths", "weaknesses", "internal factors", "threats"],
      3,
      "Negative external factors such as a weak economy, new taxes or strong competitors are threats in a SWOT analysis.",
    ],
  ],
  "The Business Plan & Business Location": [
    [
      "A 'business plan' is a document that:",
      [
        "describes the business idea, goals and how they will be achieved",
        "lists only the owner's salary",
        "is a tax return",
        "records daily attendance",
      ],
      0,
      "A business plan sets out the business idea, its goals and the strategies, resources and finances needed to achieve them.",
    ],
    [
      "The part of a business plan that gives a short overview of the whole plan is the:",
      ["balance sheet", "executive summary", "delivery note", "staff roster"],
      1,
      "The executive summary is a brief overview at the start of the business plan that summarises its main points.",
    ],
    [
      "The financial plan in a business plan mainly shows:",
      [
        "the company logo",
        "the staff dress code",
        "the expected income, expenses and how much funding is needed",
        "the office layout",
      ],
      2,
      "The financial plan sets out projected income, expenses, profit and the amount of funding (capital) the business will need.",
    ],
    [
      "One important purpose of a business plan is to:",
      [
        "replace the need for any customers",
        "guarantee instant profit",
        "avoid having any goals",
        "help attract investors or obtain a loan from a bank",
      ],
      3,
      "A clear business plan helps convince investors or a bank to provide finance, and it guides the running of the business.",
    ],
    [
      "When choosing a location for a retail shop, an important factor to consider is:",
      [
        "how close it is to its customers and how easy it is to reach",
        "the colour of the walls inside",
        "the owner's favourite colour",
        "the name of the street only",
      ],
      0,
      "A retail business should be located where it is easy for customers to reach, with good foot traffic, access and parking.",
    ],
    [
      "A factory is often located near its raw materials or transport routes mainly to:",
      [
        "increase costs",
        "reduce transport costs and operate more efficiently",
        "make deliveries harder",
        "avoid all customers",
      ],
      1,
      "Locating a factory near raw materials or good transport links lowers transport costs and improves efficiency.",
    ],
    [
      "The marketing section of a business plan describes:",
      [
        "how staff will be paid",
        "the company's bank balance only",
        "how the product will be priced, promoted and sold to customers",
        "the office cleaning schedule",
      ],
      2,
      "The marketing plan explains the target market and how the product will be priced, promoted, distributed and sold.",
    ],
    [
      "Before opening a business in a particular area, an entrepreneur should check:",
      [
        "nothing at all",
        "only the weather",
        "only the building's colour",
        "the level of competition and the needs of customers in that area",
      ],
      3,
      "An entrepreneur should research the local market — customer needs and the competition — before choosing where to set up.",
    ],
  ],
  "Business Ethics & Code of Conduct": [
    [
      "'Business ethics' refers to:",
      [
        "the moral principles and standards that guide behaviour in business",
        "the total profit of a business",
        "the number of employees",
        "the price of shares",
      ],
      0,
      "Business ethics are the moral principles and standards of right and wrong that guide the behaviour and decisions of a business.",
    ],
    [
      "Which of the following is an example of UNETHICAL business behaviour?",
      [
        "paying fair wages",
        "accepting a bribe in exchange for a contract",
        "obeying the law",
        "treating customers honestly",
      ],
      1,
      "Accepting a bribe is unethical (and illegal) — it is dishonest and unfairly influences business decisions.",
    ],
    [
      "A 'code of conduct' is:",
      [
        "a list of the company's products",
        "the company's bank statement",
        "a set of rules that guides how employees should behave",
        "the daily sales total",
      ],
      2,
      "A code of conduct is a written set of rules and ethical standards that guides how employees and the business should behave.",
    ],
    [
      "'Corporate social responsibility' (CSR) means that a business:",
      [
        "focuses only on profit and ignores society",
        "pollutes to save money",
        "exploits its workers",
        "takes responsibility for its impact on society and the environment",
      ],
      3,
      "CSR is the idea that a business should act responsibly towards society and the environment, not only pursue profit.",
    ],
    [
      "Using a company's money for personal expenses without permission is an example of:",
      ["fraud and dishonesty", "good ethics", "social responsibility", "fair trade"],
      0,
      "Using company funds for personal use without permission is fraud — a serious unethical and illegal act.",
    ],
    [
      "A 'conflict of interest' occurs when an employee:",
      [
        "always acts in the business's best interest",
        "has a personal interest that clashes with their duty to the business",
        "follows the code of conduct",
        "works extra hours willingly",
      ],
      1,
      "A conflict of interest arises when an employee's personal interests interfere with, or clash with, their responsibilities to the business.",
    ],
    [
      "Acting ethically can benefit a business by:",
      [
        "destroying its reputation",
        "losing customers",
        "building trust and a good reputation with customers and the public",
        "increasing fraud",
      ],
      2,
      "Ethical behaviour builds trust, a good reputation and customer loyalty, which support the long-term success of the business.",
    ],
    [
      "An example of ethical behaviour towards the environment is:",
      [
        "dumping waste in a river",
        "ignoring pollution laws",
        "wasting resources",
        "recycling waste and reducing pollution",
      ],
      3,
      "Recycling waste and reducing pollution show ethical, responsible behaviour towards the environment.",
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
