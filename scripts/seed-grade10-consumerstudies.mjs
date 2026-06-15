// Seeds the Grade 10 Consumer Studies question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only (definitions, classifications, SA
// consumer facts, simple calculations). Grade 10 level. Topics + questions are
// DISTINCT from BOTH the Gr11 bank (Budgeting, Food Preservation, Fibres &
// Fabrics, Marketing/Advertising, Sustainable Living, Consumer Info/Rights) and
// the Gr12 bank (Consumer Rights, Income/Taxes/Inflation, Nutrition & Deficiency
// Diseases, Food Safety, Housing & Financing, Entrepreneurship & Costing). Gr10
// here covers the foundations: the consumer & behaviour, nutrients & functions,
// a balanced diet & meal planning, clothing choice/design/care, housing &
// furnishings, and entrepreneurship.
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but NOT option order). Numeric answers double-checked.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade10-consumerstudies.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Consumer Studies";
const GRADE = "Grade 10";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "The Consumer & Consumer Behaviour": [
    [
      "A 'consumer' is best described as:",
      [
        "a person who buys and uses goods and services to satisfy their needs and wants",
        "a person who only manufactures goods in a factory",
        "a shop that sells products",
        "a person who never spends any money",
      ],
      0,
      "A consumer is anyone who buys and uses goods and services to satisfy their needs and wants.",
    ],
    [
      "The difference between 'goods' and 'services' is that goods are tangible (physical) items, while services are:",
      [
        "always provided free of charge",
        "actions or work done for others, such as a haircut or a bus ride",
        "exactly the same thing as goods",
        "only ever sold in supermarkets",
      ],
      1,
      "Goods are physical products you can touch; services are useful actions performed for others, such as a haircut, a taxi ride or banking.",
    ],
    [
      "A 'durable' good is one that:",
      [
        "is used up immediately, like a slice of bread",
        "can never be bought in a shop",
        "lasts a long time and can be used repeatedly, such as a fridge",
        "is always the cheapest item available",
      ],
      2,
      "Durable goods (such as a fridge, car or furniture) last a long time and can be used over and over again.",
    ],
    [
      "Bread and milk are examples of 'non-durable' goods because they:",
      [
        "last for many years",
        "are actually types of services",
        "can be reused many times",
        "are used up quickly and do not last long",
      ],
      3,
      "Non-durable goods, such as food and drink, are used up quickly and do not last long.",
    ],
    [
      "Which of the following is most likely to influence a teenager's buying decisions?",
      [
        "peer pressure and advertising",
        "the price of gold on world markets",
        "the national budget speech",
        "the repo rate set by the Reserve Bank",
      ],
      0,
      "Teenagers' choices are strongly influenced by friends (peer pressure) and by advertising aimed at them.",
    ],
    [
      "A consumer's 'income' affects their buying behaviour because it determines:",
      [
        "the weather on shopping day",
        "how much they can afford to spend",
        "the colour of the products in a shop",
        "the number of shops in a town",
      ],
      1,
      "Income is the money a consumer has available, which determines how much they are able to spend.",
    ],
    [
      "Buying a product simply because a famous celebrity advertises it is an example of being influenced by:",
      [
        "the product's nutritional value",
        "the unit price on the shelf",
        "advertising and marketing",
        "the garment's care label",
      ],
      2,
      "Celebrity endorsements are an advertising and marketing technique used to persuade consumers to buy.",
    ],
    [
      "A responsible consumer planning to buy an expensive item should first:",
      [
        "buy it immediately without thinking about it",
        "ignore the price completely",
        "borrow as much money as possible",
        "compare prices and quality and consider whether they can afford it",
      ],
      3,
      "Responsible consumers compare prices and quality and make sure they can afford an item before buying it.",
    ],
  ],
  "Nutrients & Their Functions": [
    [
      "The nutrient that is the body's main source of energy is:",
      ["vitamins", "carbohydrates", "water", "minerals"],
      1,
      "Carbohydrates (such as bread, rice and pap) are the body's main and cheapest source of energy.",
    ],
    [
      "The nutrient mainly needed for the growth and repair of body tissues (body-building) is:",
      ["fat", "carbohydrate", "protein", "fibre"],
      2,
      "Protein is the body-building nutrient; it is needed for the growth, repair and maintenance of body tissues.",
    ],
    [
      "A good source of protein is:",
      ["white sugar", "cooking oil", "white bread", "eggs, meat and beans"],
      3,
      "Eggs, meat, fish, milk and beans are rich in protein. Sugar and oil supply mainly energy, not protein.",
    ],
    [
      "Fats and oils are important in the diet because they:",
      [
        "provide a concentrated source of energy and help the body absorb certain vitamins",
        "contain no kilojoules at all",
        "are the body's main building material",
        "cannot be stored by the body",
      ],
      0,
      "Fats give a concentrated source of energy and help the body absorb the fat-soluble vitamins (A, D, E and K).",
    ],
    [
      "Vitamins and minerals are known as 'protective' nutrients because they:",
      [
        "provide most of our daily energy",
        "help protect the body from illness and keep it working properly",
        "build muscle tissue only",
        "are found only in fats",
      ],
      1,
      "Vitamins and minerals are protective nutrients: they help the body resist disease and keep its systems working correctly.",
    ],
    [
      "Dietary fibre (roughage) is important because it:",
      [
        "provides most of the body's energy",
        "builds strong muscles",
        "helps the digestive system work and prevents constipation",
        "is a type of mineral",
      ],
      2,
      "Fibre (roughage) adds bulk to food, helping it move through the digestive system and preventing constipation.",
    ],
    [
      "The mineral needed to build strong bones and teeth is:",
      ["iron", "vitamin C", "protein", "calcium"],
      3,
      "Calcium is the mineral needed for strong bones and teeth; good sources include milk and dairy products.",
    ],
    [
      "The nutrient that makes up a large part of the body and is essential for many body processes such as digestion is:",
      ["water", "fat", "sugar", "starch"],
      0,
      "Water makes up a large part of the body and is essential for digestion, controlling body temperature and removing waste.",
    ],
  ],
  "A Balanced Diet & Meal Planning": [
    [
      "A 'balanced diet' is one that:",
      [
        "contains only carbohydrates",
        "is made up entirely of fruit",
        "contains the right amounts and variety of all the nutrients the body needs",
        "avoids all of the food groups",
      ],
      2,
      "A balanced diet provides the correct amounts and a good variety of all the nutrients the body needs to stay healthy.",
    ],
    [
      "The 'food groups' are useful because they help people to:",
      [
        "avoid eating any vegetables",
        "spend much more money on food",
        "eat only one type of food",
        "plan meals that include a variety of foods for a balanced diet",
      ],
      3,
      "Grouping foods helps people plan meals that include a variety of foods so that all nutrient needs are met.",
    ],
    [
      "Foods such as bread, rice, pap and potatoes belong mainly to the group that provides:",
      ["carbohydrates (energy)", "mostly protein", "only vitamins", "only fat"],
      0,
      "Starchy staples such as bread, rice, pap and potatoes are carbohydrate-rich energy foods.",
    ],
    [
      "A meal of pap, beans, spinach and a glass of milk is considered balanced because it:",
      [
        "contains only one nutrient",
        "includes energy, body-building and protective foods",
        "has no vegetables in it",
        "is made only of sugar",
      ],
      1,
      "This meal combines energy foods (pap), body-building foods (beans, milk) and protective foods (spinach, milk), making it balanced.",
    ],
    [
      "When planning family meals on a tight budget, a consumer should:",
      [
        "always buy the most expensive brands",
        "buy only imported luxury foods",
        "choose affordable, nutritious foods and buy produce that is in season",
        "skip meals in order to save money",
      ],
      2,
      "On a tight budget, choosing affordable, nutritious foods and in-season produce gives the best value while keeping meals healthy.",
    ],
    [
      "Eating too much sugar and fatty food, together with too little exercise, can lead to:",
      [
        "stronger bones immediately",
        "better eyesight",
        "faster growth only",
        "obesity and related health problems",
      ],
      3,
      "A diet high in sugar and fat with little exercise can cause obesity and related health problems such as heart disease and diabetes.",
    ],
    [
      "Choosing fruit and vegetables that are 'in season' is usually a good idea because they are generally:",
      [
        "fresher, cheaper and more readily available",
        "always far more expensive",
        "much lower in all nutrients",
        "never available in shops",
      ],
      0,
      "In-season produce is usually fresher, cheaper and more plentiful than out-of-season produce.",
    ],
    [
      "Drinking enough clean water every day is important because water:",
      [
        "provides most of our energy",
        "is needed for digestion, controlling body temperature and removing waste",
        "builds muscle tissue",
        "replaces the need for all other nutrients",
      ],
      1,
      "Water is essential for digestion, regulating body temperature and flushing waste from the body.",
    ],
  ],
  "Clothing: Choice, Design & Care": [
    [
      "An important factor to consider when choosing clothing for a particular purpose is:",
      [
        "the colour of the shop",
        "the name of the cashier",
        "the brand of the till",
        "the occasion, the climate, comfort and cost",
      ],
      3,
      "When choosing clothing you should consider the occasion, the climate, comfort, durability and cost.",
    ],
    [
      "In clothing design, the 'elements of design' include:",
      [
        "line, colour, texture and shape",
        "price, brand and shop name",
        "washing, drying and ironing",
        "income, savings and tax",
      ],
      0,
      "The elements of design are the visual features used to create a garment: line, colour, texture and shape (form).",
    ],
    [
      "Vertical lines on a garment tend to make the wearer appear:",
      ["shorter and wider", "taller and slimmer", "exactly the same as before", "invisible"],
      1,
      "Vertical lines lead the eye up and down, creating the illusion that the wearer is taller and slimmer.",
    ],
    [
      "A care label showing a washing tub with a hand in it means the garment should be:",
      ["tumble dried on high heat", "machine washed in very hot water", "hand washed", "dry cleaned only"],
      2,
      "The tub-with-a-hand symbol indicates that the garment should be hand washed rather than machine washed.",
    ],
    [
      "The main reason for following the care label instructions on clothing is to:",
      [
        "increase the price of the garment",
        "make the garment shrink",
        "change the brand of the garment",
        "keep the garment looking good and make it last longer",
      ],
      3,
      "Following the care label keeps clothing in good condition and helps it last longer, protecting the consumer's money.",
    ],
    [
      "'Fashion' is best described as:",
      [
        "a style of clothing that is popular at a particular time",
        "a permanent style that never changes",
        "a type of fabric",
        "the price printed on a garment",
      ],
      0,
      "Fashion is the style of clothing that is popular at a particular time; it changes from season to season.",
    ],
    [
      "When buying clothing on a budget, a wise consumer should:",
      [
        "always buy the most expensive designer labels",
        "choose good-quality, versatile items that can be mixed and matched",
        "buy clothes that do not fit properly",
        "ignore the care label completely",
      ],
      1,
      "Versatile, good-quality items that can be combined in different ways give the best value for money.",
    ],
    [
      "Storing clean clothing correctly, such as folding knitwear instead of hanging it, helps to:",
      [
        "make it dirty",
        "raise its price",
        "keep it in good shape and prevent stretching",
        "change its colour",
      ],
      2,
      "Folding knitwear instead of hanging it prevents it from stretching out of shape, keeping garments looking good.",
    ],
  ],
  "Housing & Furnishings": [
    [
      "An important factor to consider when choosing where to live is:",
      [
        "the cost, location, size and safety of the home",
        "the colour of the neighbour's car",
        "the brand of the kettle",
        "the name of the street only",
      ],
      0,
      "Choosing a home involves weighing up cost, location, size, safety and the needs of the household.",
    ],
    [
      "A person who pays a monthly amount to live in a home they do not own is called a:",
      ["landlord", "tenant", "estate agent", "builder"],
      1,
      "A tenant rents a home and pays rent to the owner (landlord) for the right to live there.",
    ],
    [
      "A 'landlord' is a person who:",
      [
        "rents a home from someone else",
        "builds public roads",
        "owns a property and rents it out to others",
        "sells groceries in a shop",
      ],
      2,
      "A landlord owns a property and rents it out to a tenant in return for rent.",
    ],
    [
      "When furnishing a first home on a limited budget, a sensible approach is to:",
      [
        "buy only the most expensive furniture available",
        "fill every room immediately on credit",
        "buy nothing at all, ever",
        "buy the essential items first and add others over time",
      ],
      3,
      "Buying essentials first and adding to them over time avoids overspending and unnecessary debt.",
    ],
    [
      "A 'lease agreement' is:",
      [
        "a contract between a landlord and a tenant setting out the rental terms",
        "a grocery receipt",
        "a type of food",
        "a clothing care label",
      ],
      0,
      "A lease agreement is the written contract that sets out the rights and responsibilities of the landlord and the tenant.",
    ],
    [
      "One advantage of renting rather than buying a home is that:",
      [
        "the tenant becomes the owner of the property",
        "it usually requires less money upfront and offers more flexibility to move",
        "the tenant never has to pay anything",
        "renting always builds personal wealth",
      ],
      1,
      "Renting usually needs less money upfront than buying and makes it easier to move when needed.",
    ],
    [
      "When arranging furniture in a room, making good use of space means:",
      [
        "blocking all of the doorways",
        "covering the windows completely",
        "allowing easy and safe movement around the room",
        "placing furniture in a random way",
      ],
      2,
      "Furniture should be arranged so that people can move around safely and easily, making good use of the available space.",
    ],
    [
      "A 'deposit' paid when renting a home is:",
      [
        "a free gift from the landlord",
        "the monthly grocery bill",
        "money that can never be refunded under any circumstances",
        "an amount paid in advance as security, often refundable if the property is left undamaged",
      ],
      3,
      "A rental deposit is paid upfront as security and is usually refunded at the end of the lease if the property is undamaged.",
    ],
  ],
  "Entrepreneurship": [
    [
      "An 'entrepreneur' is a person who:",
      [
        "only works for a large company for a fixed salary",
        "starts and runs their own business, taking the risk in the hope of making a profit",
        "never takes any risks at all",
        "spends money without ever earning any",
      ],
      1,
      "An entrepreneur starts and runs their own business and takes the risks involved in the hope of earning a profit.",
    ],
    [
      "Which of the following is a typical characteristic of a successful entrepreneur?",
      [
        "giving up at the first problem",
        "avoiding all hard work",
        "creativity, determination and a willingness to take calculated risks",
        "refusing to plan ahead",
      ],
      2,
      "Successful entrepreneurs are typically creative, determined, hard-working and willing to take calculated risks.",
    ],
    [
      "A small business selling handmade candles has a monthly income of R3 000 and expenses of R1 800. Its profit is:",
      ["R4 800", "R1 800", "R3 000", "R1 200"],
      3,
      "Profit = income − expenses = R3 000 − R1 800 = R1 200.",
    ],
    [
      "'Profit' is best described as:",
      [
        "the amount left over after total expenses are subtracted from total income",
        "the total income before any costs are taken off",
        "the money borrowed from a bank",
        "the tax paid to the government",
      ],
      0,
      "Profit is what remains once total expenses are subtracted from total income.",
    ],
    [
      "A young person who wants to start a small business should first:",
      [
        "spend all their money on advertising",
        "identify a need in the market and make a simple plan",
        "copy a friend exactly without thinking it through",
        "borrow as much money as possible",
      ],
      1,
      "A good first step is to spot a need or gap in the market and make a simple plan for how to meet it.",
    ],
    [
      "A 'business plan' helps an entrepreneur to:",
      [
        "avoid having any customers",
        "guarantee instant wealth",
        "set out their goals and how the business will be run",
        "ignore costs and income",
      ],
      2,
      "A business plan sets out the entrepreneur's goals and how the business will be run, financed and grown.",
    ],
    [
      "If a business's expenses are greater than its income, the business makes a:",
      ["profit", "saving", "donation", "loss"],
      3,
      "When expenses are greater than income, the business makes a loss.",
    ],
    [
      "One benefit of entrepreneurship for the country is that it:",
      [
        "creates jobs and helps the economy grow",
        "increases unemployment",
        "reduces the number of goods available",
        "removes the need for any workers",
      ],
      0,
      "Entrepreneurs create new businesses that provide jobs and goods and services, helping the economy to grow.",
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
