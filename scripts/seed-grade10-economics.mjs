// Seeds the Grade 10 Economics question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only (definitions, classifications, SA
// institutions/facts). Grade 10 level. Topics are fully DISTINCT from the Gr11
// Economics bank (Gr11 = Circular Flow, Demand/Supply, Business Cycles, Money &
// Banking, Public Sector, Growth & Indicators). Gr10 here covers the
// foundations: basic economic concepts, factors of production, economic systems,
// the production possibility curve, population, and labour & trade unions.
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but NOT option order).
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade10-economics.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Economics";
const GRADE = "Grade 10";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Basic Economic Concepts": [
    [
      "The basic economic problem is best described as:",
      [
        "unlimited needs and wants but limited (scarce) resources",
        "too much money in the economy",
        "too many factories producing goods",
        "having more resources than people could ever need",
      ],
      0,
      "The basic economic problem is scarcity: people have unlimited needs and wants, but the resources to satisfy them are limited, so choices must be made.",
    ],
    [
      "'Scarcity' means that:",
      [
        "there is more than enough of everything for everyone",
        "resources are limited relative to people's unlimited wants",
        "money in the economy is unlimited",
        "only wealthy people have wants",
      ],
      1,
      "Scarcity is the condition where the resources available are limited compared with the unlimited wants people have for them.",
    ],
    [
      "'Opportunity cost' is best defined as:",
      [
        "the money price printed on a product",
        "the total cost of running a business for a year",
        "the value of the next best alternative given up when a choice is made",
        "a cost that is always equal to zero",
      ],
      2,
      "Opportunity cost is the value of the next best alternative that is sacrificed when a choice is made, because resources used for one purpose cannot be used for another.",
    ],
    [
      "A learner has R50 and chooses to buy a book instead of a movie ticket. The opportunity cost of the book is:",
      ["the R50 spent", "the book itself", "nothing at all", "the movie ticket that was given up"],
      3,
      "Opportunity cost is the best alternative forgone — here the movie ticket the learner chose not to buy.",
    ],
    [
      "A 'free good' differs from an 'economic good' in that a free good:",
      [
        "is not scarce and has no opportunity cost, such as air",
        "is always the most expensive item in a shop",
        "can only be obtained by paying cash",
        "is produced only by the government",
      ],
      0,
      "A free good (such as air) is not scarce and has no opportunity cost, while an economic good is scarce and therefore has a price and an opportunity cost.",
    ],
    [
      "'Needs' are best described as:",
      [
        "luxuries that people would simply like to have",
        "things essential for survival, such as food, water and shelter",
        "items bought only by wealthy people",
        "things that are never important to anyone",
      ],
      1,
      "Needs are the basic things essential for human survival — food, water, shelter and clothing — whereas wants are desires beyond the basics.",
    ],
    [
      "Because resources are scarce, every society is forced to:",
      [
        "stop producing goods altogether",
        "give everyone everything they want",
        "make choices about what to produce and how to use its resources",
        "abolish the use of money",
      ],
      2,
      "Scarcity forces choices: a society cannot produce everything, so it must decide how best to use its limited resources.",
    ],
    [
      "A 'want' differs from a 'need' in that a want is:",
      [
        "always essential for survival",
        "always available free of charge",
        "exactly the same thing as a need",
        "something desired to improve comfort or enjoyment, but not essential for survival",
      ],
      3,
      "A want is something that improves comfort or enjoyment but is not essential for survival, unlike a need.",
    ],
  ],
  "Factors of Production": [
    [
      "The four factors of production are:",
      [
        "money, gold, shares and bonds",
        "land, labour, capital and entrepreneurship",
        "buyers, sellers, banks and government",
        "imports, exports, taxes and savings",
      ],
      1,
      "The four factors of production are land, labour, capital and entrepreneurship — the resources used to produce goods and services.",
    ],
    [
      "'Land' as a factor of production includes:",
      [
        "factory machines and tools",
        "the skills and effort of workers",
        "natural resources such as soil, minerals, water and forests",
        "money kept in the bank",
      ],
      2,
      "Land as a factor of production means all natural resources — soil, minerals, water, forests — provided by nature.",
    ],
    [
      "'Labour' as a factor of production refers to:",
      [
        "machines and equipment used in a factory",
        "natural resources from the earth",
        "money invested in a business",
        "the human effort, both physical and mental, used in production",
      ],
      3,
      "Labour is the physical and mental human effort used to produce goods and services.",
    ],
    [
      "'Capital' as a factor of production means:",
      [
        "manufactured goods used to produce other goods, such as machinery, tools and equipment",
        "natural resources such as land and minerals",
        "the salary paid to the business owner",
        "undeveloped raw land",
      ],
      0,
      "In economics, capital refers to man-made goods (machinery, tools, equipment, factories) used to produce other goods and services.",
    ],
    [
      "The 'entrepreneur' is the factor of production that:",
      [
        "only supplies physical labour",
        "organises the other factors of production and takes the risk of running a business",
        "owns the land but does nothing else",
        "lends money to commercial banks",
      ],
      1,
      "The entrepreneur combines and organises land, labour and capital, takes the risk and makes the decisions needed to run a business.",
    ],
    [
      "The reward (income) earned by the owners of land is:",
      ["wages", "interest", "rent", "profit"],
      2,
      "Land earns rent, labour earns wages, capital earns interest, and entrepreneurship earns profit.",
    ],
    [
      "The reward earned by labour for its effort is:",
      ["rent", "interest", "profit", "wages (or salaries)"],
      3,
      "Labour is rewarded with wages or salaries in return for the work performed.",
    ],
    [
      "The reward earned by the entrepreneur for organising production and taking risk is:",
      ["profit", "rent", "wages", "interest"],
      0,
      "The entrepreneur's reward is profit — the return for taking the risk of organising the other factors and running the business.",
    ],
  ],
  "Economic Systems": [
    [
      "Every economic system must answer three central questions: what to produce, how to produce, and:",
      ["when to close the business", "where to keep the money", "for whom to produce", "who to tax the most"],
      2,
      "The three fundamental economic questions are what to produce, how to produce it, and for whom to produce (how output is shared).",
    ],
    [
      "In a 'command' (centrally planned) economy, the main economic decisions are made by:",
      ["private businesses", "individual consumers", "foreign companies", "the government (the state)"],
      3,
      "In a command economy the government owns the resources and makes the main decisions about production and distribution.",
    ],
    [
      "In a 'market' (free-market) economy, economic decisions are made mainly by:",
      [
        "private individuals and businesses through the price mechanism",
        "the government acting alone",
        "other countries",
        "trade unions only",
      ],
      0,
      "In a market economy, decisions are guided by the price mechanism (demand and supply), with private individuals and firms making most decisions.",
    ],
    [
      "A 'mixed economy', such as South Africa's, is one in which:",
      [
        "only the government produces everything",
        "both the private sector and the government play a role in the economy",
        "there is no government involvement at all",
        "no goods or services are produced",
      ],
      1,
      "A mixed economy combines features of market and command systems: private businesses operate alongside government, which provides services and regulates the economy.",
    ],
    [
      "In a 'traditional' economy, decisions about production are based mainly on:",
      [
        "computer algorithms",
        "stock-exchange prices",
        "customs, habits and traditions passed down over generations",
        "five-year government plans",
      ],
      2,
      "A traditional economy relies on customs, traditions and inherited ways of doing things to decide what and how to produce.",
    ],
    [
      "A key feature of a market economy is:",
      [
        "state ownership of all firms",
        "central planning of all production",
        "the absence of private property",
        "private ownership of the factors of production",
      ],
      3,
      "Private ownership of the factors of production and freedom of choice are central features of a market economy.",
    ],
    [
      "One disadvantage of a command economy is that:",
      [
        "there is often little consumer choice and weak incentives to work hard",
        "there is too much competition between firms",
        "prices are set only by supply and demand",
        "businesses are allowed to make very large profits",
      ],
      0,
      "Because the state plans production, command economies often suffer from limited consumer choice, shortages and weak incentives for effort and innovation.",
    ],
    [
      "A possible disadvantage of a pure market economy is that:",
      [
        "the government controls all prices",
        "the gap between rich and poor can widen, and some people may be left without basic services",
        "private property is not allowed",
        "there is no competition between firms",
      ],
      1,
      "In a pure market economy, those who cannot afford to pay may be left without services, so inequality between rich and poor can grow.",
    ],
  ],
  "The Production Possibility Curve": [
    [
      "A production possibility curve (PPC) shows:",
      [
        "the prices of two different goods",
        "a country's population growth over time",
        "the inflation rate from year to year",
        "the maximum combinations of two goods an economy can produce when its resources are fully employed",
      ],
      3,
      "A PPC shows the different maximum combinations of two goods or services an economy can produce when all its resources are used fully and efficiently.",
    ],
    [
      "A point INSIDE (below) the PPC represents a situation where:",
      [
        "resources are underutilised — the economy is not producing at full capacity",
        "the combination is impossible to reach",
        "the economy is at maximum efficiency",
        "prices are rising rapidly",
      ],
      0,
      "A point inside the curve means some resources are unemployed or used inefficiently, so the economy could produce more.",
    ],
    [
      "A point OUTSIDE (beyond) the PPC represents a combination of goods that is:",
      [
        "easily achievable right now",
        "currently unattainable with the existing resources and technology",
        "located inside the economy",
        "the most efficient point of all",
      ],
      1,
      "A point beyond the curve cannot be reached with the economy's current resources and technology — it is unattainable for now.",
    ],
    [
      "A point lying exactly ON the PPC shows that the economy is:",
      [
        "wasting most of its resources",
        "producing nothing at all",
        "using all its resources fully and efficiently",
        "definitely in a recession",
      ],
      2,
      "Any point on the curve represents full and efficient use of all available resources.",
    ],
    [
      "Moving along the PPC to produce more of one good and less of another best illustrates the concept of:",
      ["inflation", "unemployment", "population growth", "opportunity cost"],
      3,
      "Because resources are fully used on the curve, producing more of one good means giving up some of the other — this trade-off is opportunity cost.",
    ],
    [
      "An economy produces only tractors and wheat. On its PPC, producing more tractors means:",
      [
        "producing less wheat (a trade-off)",
        "automatically producing more wheat too",
        "no change in the amount of wheat",
        "leaving the curve completely",
      ],
      0,
      "On the PPC all resources are already in use, so shifting resources to make more tractors means less wheat can be produced.",
    ],
    [
      "Economic growth is shown on a PPC diagram by:",
      [
        "a movement to a point inside the curve",
        "the whole curve shifting outward to the right",
        "the curve shifting inward to the left",
        "the curve shrinking to a single point",
      ],
      1,
      "An outward shift of the whole PPC shows that the economy can now produce more of both goods — this represents economic growth.",
    ],
    [
      "The PPC is usually drawn curving outward (bowed away from the origin) because of:",
      [
        "a constant population",
        "continually falling prices",
        "increasing opportunity cost, since resources are not equally suited to producing both goods",
        "a rising inflation rate",
      ],
      2,
      "The bowed shape reflects increasing opportunity cost: as more of one good is produced, increasingly unsuitable resources must be switched over, so more of the other good is sacrificed.",
    ],
  ],
  "Population & Demographics": [
    [
      "A country's 'population' refers to:",
      [
        "the total number of people living in the country",
        "only the people who are employed",
        "the number of businesses in the country",
        "the total amount of money in the economy",
      ],
      0,
      "Population is the total number of people living in a country at a particular time.",
    ],
    [
      "The 'birth rate' is usually measured as the number of live births per:",
      ["100 people per year", "1 000 people of the population per year", "family per month", "10 people per decade"],
      1,
      "The birth rate is normally expressed as the number of live births per 1 000 people in the population per year.",
    ],
    [
      "A 'census' is:",
      [
        "a tax charged on people's income",
        "a type of private business",
        "an official count of a country's population, usually carried out every few years",
        "a list of a country's imports",
      ],
      2,
      "A census is the official process of counting a country's population and collecting information about it, done periodically.",
    ],
    [
      "The official body responsible for collecting population and economic statistics in South Africa is:",
      ["the South African Reserve Bank", "SARS", "the JSE", "Statistics South Africa (Stats SA)"],
      3,
      "Statistics South Africa (Stats SA) is the national body that conducts the census and collects official population and economic data.",
    ],
    [
      "If a country's birth rate is higher than its death rate, its population will generally:",
      ["increase (grow)", "decrease", "stay exactly the same", "fall to zero"],
      0,
      "When more people are born than die (a natural increase), the population grows, before migration is taken into account.",
    ],
    [
      "'Net migration' refers to:",
      [
        "the total number of births in a year",
        "the difference between the number of people moving into a country and the number moving out",
        "the death rate of a country",
        "the unemployment rate",
      ],
      1,
      "Net migration is immigration (people moving in) minus emigration (people moving out) over a period.",
    ],
    [
      "A 'population pyramid' is a diagram that shows:",
      [
        "the prices of goods and services",
        "a country's imports and exports",
        "the age and gender distribution of a population",
        "the national budget",
      ],
      2,
      "A population pyramid is a graph showing how a population is divided by age group and gender.",
    ],
    [
      "A rapidly growing population can place pressure on a country by:",
      [
        "reducing the need for schools",
        "lowering the demand for food",
        "removing the need for jobs",
        "increasing the demand for services such as housing, schools and healthcare",
      ],
      3,
      "A fast-growing population increases demand for housing, education, healthcare, jobs and other services, which can strain a country's resources.",
    ],
  ],
  "Labour & Trade Unions": [
    [
      "The 'labour force' (economically active population) consists of:",
      [
        "every single person living in the country",
        "people who are able and willing to work, whether they are employed or unemployed",
        "only school children",
        "only retired pensioners",
      ],
      1,
      "The labour force is made up of all people who are able and willing to work — both those employed and those unemployed but seeking work.",
    ],
    [
      "A 'trade union' is:",
      [
        "a government department",
        "a type of commercial bank",
        "an organisation that represents workers and protects their interests",
        "a group made up only of business owners",
      ],
      2,
      "A trade union is an organisation of workers formed to protect and promote their interests, such as wages and working conditions.",
    ],
    [
      "'Collective bargaining' is the process in which:",
      [
        "workers go shopping together",
        "the government sets every wage on its own",
        "each worker negotiates separately with the boss",
        "a trade union negotiates with employers on behalf of workers over wages and conditions",
      ],
      3,
      "Collective bargaining is negotiation between a trade union (representing many workers) and employers about wages and working conditions.",
    ],
    [
      "A 'strike' is:",
      [
        "a refusal by workers to work in order to press their demands",
        "a bonus paid to workers at year-end",
        "a type of tax on wages",
        "a promotion to a higher position",
      ],
      0,
      "A strike is a collective refusal by workers to work, used as a way to pressure employers to meet their demands.",
    ],
    [
      "The 'productivity' of labour refers to:",
      [
        "the total number of workers in a country",
        "the amount of output produced per worker (or per hour worked)",
        "the total wages paid to all workers",
        "the number of trade unions in a country",
      ],
      1,
      "Labour productivity measures output per worker or per hour of work — how efficiently labour produces goods and services.",
    ],
    [
      "In South Africa, the law that sets the lowest wage an employer may legally pay a worker is the:",
      ["Income Tax Act", "Companies Act", "national minimum wage", "exchange-rate policy"],
      2,
      "The national minimum wage sets the legal floor below which workers may not be paid, aimed at protecting low-income workers.",
    ],
    [
      "One effective way for a worker to increase their productivity and earning potential is to:",
      [
        "work fewer hours for no particular reason",
        "avoid all forms of training",
        "ignore any new technology",
        "gain more education, training and skills",
      ],
      3,
      "Education, training and skills development make workers more productive, which raises their value and earning potential.",
    ],
    [
      "'Unemployment' occurs when people who are:",
      [
        "able and willing to work cannot find jobs",
        "retired and no longer want to work",
        "still attending school full-time",
        "choosing not to work at all",
      ],
      0,
      "Unemployment refers to people who are part of the labour force — able and willing to work — but who cannot find employment.",
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
