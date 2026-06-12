// Seeds the Grade 12 Business Studies question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only (definitions, classifications, legislation).
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but not option order, so clustering would leak).
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade12-businessstudies.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Business Studies";
const GRADE = "Grade 12";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Business Environments": [
    [
      "The three business environments are the micro, market and ___ environment.",
      ["macro", "internal only", "global", "natural"],
      0,
      "The three business environments are the micro (internal), market and macro environments.",
    ],
    [
      "Over which environment does a business have FULL control?",
      [
        "the market environment",
        "the macro environment",
        "the natural environment",
        "the micro (internal) environment",
      ],
      3,
      "A business has full control over its micro (internal) environment — its employees, resources and business functions.",
    ],
    [
      "The macro environment is the one over which a business has:",
      ["full control", "some control", "no control", "shared control"],
      2,
      "The macro environment (e.g. laws, the economy, technology) lies outside the business, so it has no control over it — only the ability to adapt.",
    ],
    [
      "Suppliers, customers and competitors form part of the ___ environment.",
      ["micro", "market", "macro", "internal"],
      1,
      "The market environment is made up of those just outside the business — suppliers, customers, competitors and intermediaries — over which it has some influence but not full control.",
    ],
    [
      "The framework that analyses the macro environment using Political, Economic, Social, Technological, Environmental and Legal factors is:",
      ["PESTLE analysis", "SWOT analysis", "the marketing mix", "Porter's five forces"],
      0,
      "PESTLE analysis examines the Political, Economic, Social, Technological, Environmental and Legal factors of the macro environment.",
    ],
    [
      "SWOT analysis stands for Strengths, Weaknesses, Opportunities and:",
      ["Trends", "Time", "Teamwork", "Threats"],
      3,
      "SWOT stands for Strengths, Weaknesses, Opportunities and Threats.",
    ],
    [
      "In a SWOT analysis, strengths and weaknesses are ___ factors.",
      ["external", "macro", "internal", "political"],
      2,
      "Strengths and weaknesses are internal factors within the business, while opportunities and threats are external.",
    ],
    [
      "Which Act promotes equal opportunity and fair treatment by eliminating unfair discrimination in employment?",
      [
        "the Consumer Protection Act",
        "the Employment Equity Act",
        "the National Credit Act",
        "the Companies Act",
      ],
      1,
      "The Employment Equity Act promotes equal opportunity and fair treatment and aims to eliminate unfair discrimination in the workplace.",
    ],
  ],
  "Forms of Ownership": [
    [
      "A business owned and run by one person, who has unlimited liability, is a:",
      ["partnership", "private company", "sole proprietor (sole trader)", "co-operative"],
      2,
      "A sole proprietor (sole trader) is owned and controlled by one person who has unlimited liability for the business's debts.",
    ],
    [
      "In a sole proprietorship, the owner's liability for the business's debts is:",
      ["unlimited", "limited to their investment", "shared with the bank", "covered by the state"],
      0,
      "A sole proprietor has unlimited liability — personal assets can be used to pay business debts, because the owner and business are not separate in law.",
    ],
    [
      "A private company in South Africa uses which abbreviation after its name?",
      ["Ltd", "(Pty) Ltd", "Inc", "CC"],
      1,
      "A private company uses (Pty) Ltd. A public company uses Ltd, and Inc is a personal-liability company.",
    ],
    [
      "A key feature of a company is that it has a separate ___ from its owners.",
      [
        "bank account only",
        "tax number only",
        "physical building",
        "legal identity (legal personality)",
      ],
      3,
      "A company has its own legal identity (legal personality), separate from its shareholders, so it can own property, sign contracts and be sued in its own name.",
    ],
    [
      "Shareholders in a private or public company have ___ liability.",
      ["unlimited", "no", "limited", "joint and several"],
      2,
      "Shareholders have limited liability — they can lose only the money they invested, not their personal assets.",
    ],
    [
      "A form of ownership where members work together for their mutual benefit and share profits among members is a:",
      ["co-operative", "public company", "sole trader", "partnership"],
      0,
      "A co-operative is owned and run by its members for their mutual benefit, with profits shared among members.",
    ],
    [
      "A disadvantage of a partnership is that the partners generally have:",
      [
        "limited liability",
        "no say in decisions",
        "a separate legal identity",
        "unlimited liability for the debts of the business",
      ],
      3,
      "Partners usually have unlimited liability and are jointly responsible for the debts of the partnership.",
    ],
    [
      "A public company can raise large amounts of capital because it may:",
      [
        "borrow only from its members",
        "sell shares to the public",
        "avoid being taxed",
        "avoid all regulation",
      ],
      1,
      "A public company can sell its shares to the general public (e.g. on the JSE), allowing it to raise large amounts of capital.",
    ],
  ],
  "Insurance & Investment": [
    [
      "The insurance principle stating that the insured may not profit from a claim but is only restored to the same financial position as before the loss is:",
      ["utmost good faith", "indemnity", "average", "security"],
      1,
      "The principle of indemnity means the insured is compensated for the actual loss only, not allowed to make a profit from a claim.",
    ],
    [
      "The principle of 'utmost good faith' requires the insured to:",
      [
        "disclose all relevant information honestly when taking out a policy",
        "pay double premiums",
        "insure only valuable items",
        "share the risk with competitors",
      ],
      0,
      "Utmost good faith means both parties must be honest, and the insured must disclose all relevant facts when taking out the policy.",
    ],
    [
      "Insurance covers an event that is uncertain and measurable, such as fire or theft. Such an event is a(n):",
      ["non-insurable risk", "guaranteed profit", "insurable risk", "unlimited liability"],
      2,
      "An insurable risk is an uncertain, measurable event (like fire or theft) that an insurer is willing to cover in exchange for a premium.",
    ],
    [
      "Which of the following is COMPULSORY insurance in South Africa?",
      [
        "household contents insurance",
        "life cover",
        "travel insurance",
        "UIF (Unemployment Insurance Fund) contributions",
      ],
      3,
      "UIF contributions are compulsory by law. Household, life and travel cover are all non-compulsory (voluntary) insurance.",
    ],
    [
      "The principle of 'average' applies when an item is:",
      [
        "under-insured, so the payout is reduced proportionally",
        "over-insured, so extra is paid out",
        "insured with two companies",
        "not insured at all",
      ],
      0,
      "The principle of average applies to under-insurance: if an item is insured for less than its value, the payout is reduced in proportion.",
    ],
    [
      "Buying shares in a company listed on the JSE is an example of a(n):",
      ["expense", "donation", "investment", "liability"],
      2,
      "Buying shares is an investment — money is used to buy an asset expected to grow in value or pay dividends.",
    ],
    [
      "An arrangement where many investors' money is pooled and managed by professionals who invest it in a range of shares is a:",
      ["fixed deposit", "unit trust", "current account", "personal loan"],
      1,
      "A unit trust pools money from many investors and is managed by professionals who spread it across a range of investments.",
    ],
    [
      "A business takes out insurance mainly in order to:",
      [
        "guarantee it will make a profit",
        "avoid paying any tax",
        "remove all business risk completely",
        "transfer the risk of certain losses to the insurer",
      ],
      3,
      "Insurance transfers the risk of specified possible losses (such as fire or theft) from the business to the insurer in exchange for a premium.",
    ],
  ],
  "Business Functions & Operations": [
    [
      "The business function responsible for recruiting, training and paying employees is the ___ function.",
      ["human resources", "marketing", "production", "financial"],
      0,
      "The human resources function recruits, trains, develops and remunerates the employees of a business.",
    ],
    [
      "The function that manages the four elements of the marketing mix is the ___ function.",
      ["purchasing", "marketing", "administration", "public relations"],
      1,
      "The marketing function manages the marketing mix — product, price, place and promotion — to satisfy customer needs profitably.",
    ],
    [
      "The '4 Ps' of the marketing mix are product, price, promotion and:",
      ["people", "profit", "place", "packaging"],
      2,
      "The 4 Ps are product, price, promotion and place.",
    ],
    [
      "The function that obtains raw materials and stock at the right time, price and quality is the ___ function.",
      ["production", "marketing", "financial", "purchasing"],
      3,
      "The purchasing function buys the raw materials, stock and equipment a business needs at the right time, price and quality.",
    ],
    [
      "Total Quality Management (TQM) aims to:",
      [
        "continuously improve quality and customer satisfaction throughout the business",
        "reduce employees' wages",
        "increase prices only",
        "remove the human resources function",
      ],
      0,
      "TQM is an approach in which the whole business works to continuously improve quality and customer satisfaction.",
    ],
    [
      "The process of attracting suitable candidates to apply for a job vacancy is called:",
      ["induction", "recruitment", "dismissal", "remuneration"],
      1,
      "Recruitment is the process of attracting suitably qualified candidates to apply for a vacancy.",
    ],
    [
      "The induction of a new employee refers to:",
      [
        "dismissing an employee",
        "paying overtime",
        "introducing and orientating the new employee to the business",
        "promoting a manager",
      ],
      2,
      "Induction introduces and orientates a new employee to the business, its people, policies and their job.",
    ],
    [
      "A 'quality circle' is:",
      [
        "the profit margin",
        "a type of share",
        "a marketing logo",
        "a small group of workers who meet to solve quality-related problems",
      ],
      3,
      "A quality circle is a small group of employees who meet regularly to identify and solve quality-related problems in their work area.",
    ],
  ],
  "Ethics, CSR & Human Rights": [
    [
      "CSR stands for Corporate Social ___.",
      ["Responsibility", "Revenue", "Reporting", "Recruitment"],
      0,
      "CSR stands for Corporate Social Responsibility — a business's duty to act in the best interests of society and the environment.",
    ],
    [
      "Corporate Social Investment (CSI) refers to:",
      [
        "investing in new machinery",
        "a business contributing money or resources to community and social projects",
        "buying shares for profit",
        "paying employees' salaries",
      ],
      1,
      "CSI is when a business contributes money, time or resources to community and social projects, such as education or health.",
    ],
    [
      "Acting ethically in business means:",
      [
        "maximising profit at any cost",
        "ignoring the law",
        "doing what is morally right, honest and fair",
        "avoiding all taxes",
      ],
      2,
      "Business ethics means doing what is morally right, honest and fair towards all stakeholders.",
    ],
    [
      "The King Code (King IV) provides guidelines on:",
      ["marketing campaigns", "production techniques", "insurance claims", "corporate governance"],
      3,
      "The King Code (King IV) sets out principles of good corporate governance — how a company should be ethically and effectively directed and controlled.",
    ],
    [
      "Which of the following is an example of UNETHICAL business behaviour?",
      ["bribery and corruption", "paying fair wages", "honest advertising", "recycling waste"],
      0,
      "Bribery and corruption are unethical (and illegal) business practices. The others are examples of responsible, ethical behaviour.",
    ],
    [
      "Including and respecting employees of different races, genders, ages and cultures is known as managing:",
      ["production", "diversity", "stock", "premiums"],
      1,
      "Managing diversity means valuing and including employees of different backgrounds, cultures, genders, ages and abilities.",
    ],
    [
      "Which right protects employees from being treated unfairly because of race, gender or religion?",
      [
        "the right to extra profit",
        "the right to avoid work",
        "the right to equality (freedom from unfair discrimination)",
        "the right to set their own salary",
      ],
      2,
      "The right to equality protects employees from unfair discrimination based on race, gender, religion and other grounds.",
    ],
    [
      "A business that pollutes a river and refuses to clean it up is failing in its:",
      [
        "marketing function",
        "purchasing function",
        "duty to pay dividends",
        "social responsibility to the environment",
      ],
      3,
      "Polluting and refusing to clean up shows a failure of social responsibility towards the environment and the community.",
    ],
  ],
  "Leadership, Teams & Conflict": [
    [
      "A leadership style where the leader makes all decisions alone and simply tells employees what to do is:",
      ["autocratic", "democratic", "laissez-faire", "consultative"],
      0,
      "An autocratic leader makes decisions alone and expects employees to follow instructions without much input.",
    ],
    [
      "A leadership style where the leader involves employees and lets them participate in decision-making is:",
      ["autocratic", "democratic (participative)", "dictatorial", "bureaucratic"],
      1,
      "A democratic (participative) leader involves employees in decisions and values their input.",
    ],
    [
      "A 'laissez-faire' (free-rein) leader:",
      [
        "controls every small detail",
        "never communicates with staff",
        "gives employees freedom to make their own decisions",
        "always works completely alone",
      ],
      2,
      "A laissez-faire (free-rein) leader gives employees a lot of freedom to make their own decisions and work independently.",
    ],
    [
      "The stages of team development are commonly described as forming, storming, norming and:",
      ["planning", "producing", "promoting", "performing"],
      3,
      "Tuckman's stages of team development are forming, storming, norming and performing.",
    ],
    [
      "A constructive way to handle conflict in the workplace is:",
      [
        "negotiation to find a win-win solution",
        "ignoring it completely",
        "shouting at staff",
        "dismissing everyone involved",
      ],
      0,
      "Negotiating to reach a win-win solution is a constructive, healthy way to resolve workplace conflict.",
    ],
    [
      "The CCMA (Commission for Conciliation, Mediation and Arbitration) helps to:",
      [
        "set interest rates",
        "resolve labour disputes between employers and employees",
        "collect taxes",
        "register new companies",
      ],
      1,
      "The CCMA resolves labour disputes between employers and employees through conciliation, mediation and arbitration.",
    ],
    [
      "A characteristic of a successful team is:",
      [
        "members working against each other",
        "no leadership at all",
        "clear shared goals and good communication",
        "constant unresolved conflict",
      ],
      2,
      "Successful teams have clear shared goals, good communication and members who support one another.",
    ],
    [
      "'Delegation' by a manager means:",
      [
        "doing all the work themselves",
        "firing employees",
        "ignoring the team",
        "assigning tasks and authority to subordinates",
      ],
      3,
      "Delegation is assigning tasks together with the authority to carry them out to subordinates, freeing the manager for other duties.",
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
