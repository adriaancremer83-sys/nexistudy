// Seeds the Grade 11 Consumer Studies question bank (6 topics x 8 questions).
// CAPS-aligned, objectively-checkable only (definitions, classifications,
// SA consumer facts, simple budgeting calculations). No interpretive questions.
// Topics + questions are DISTINCT from the Grade 12 Consumer Studies bank.
// Correct-answer positions are spread evenly A-D per topic (the quiz engine
// shuffles question order but NOT option order). Every numeric answer was
// double-checked by computation during drafting.
// Safe to re-run: topics upserted, questions replaced.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-grade11-consumerstudies.mjs
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

const SUBJECT = "Consumer Studies";
const GRADE = "Grade 11";

// q: [prompt, [4 options], correctIndex, explanation]
const bank = {
  "Budgeting & Personal Finance": [
    [
      "Which of the following is a NEED rather than a want?",
      ["basic food", "a smartphone", "a games console", "designer sneakers"],
      0,
      "Needs are essentials for survival such as basic food, shelter and clothing; the others are wants that we can live without.",
    ],
    [
      "A personal budget is best described as:",
      [
        "a loan from a bank",
        "a plan that compares expected income with expected expenses",
        "a list of luxury items",
        "the interest charged on credit",
      ],
      1,
      "A budget is a financial plan that balances expected income against expected expenses so a person does not overspend.",
    ],
    [
      "Which of the following is a FIXED monthly expense in a household budget?",
      ["airtime", "groceries", "rent", "entertainment"],
      2,
      "Rent is the same amount every month — a fixed expense. Airtime, groceries and entertainment change from month to month (variable).",
    ],
    [
      "A household has a monthly income of R15 000 and total expenses of R12 500. The budget surplus is:",
      ["R27 500", "R12 500", "R1 250", "R2 500"],
      3,
      "Surplus = income − expenses = R15 000 − R12 500 = R2 500, which the household can save.",
    ],
    [
      "When a household's expenses are greater than its income, the budget shows a:",
      ["deficit", "surplus", "profit", "savings"],
      0,
      "A deficit occurs when expenses exceed income — the household spends more than it earns and may have to borrow.",
    ],
    [
      "R2 000 is invested at 8% simple interest per year. The interest earned after one year is:",
      ["R80", "R160", "R2 160", "R16"],
      1,
      "Simple interest for one year = R2 000 × 8% = R160.",
    ],
    [
      "The main reason for keeping an emergency fund is to:",
      [
        "buy luxury goods",
        "earn a salary",
        "cover unexpected expenses such as a medical bill or car repair",
        "pay income tax",
      ],
      2,
      "An emergency fund provides money for unexpected costs without the person having to go into debt.",
    ],
    [
      "Which type of bank account is designed mainly for everyday transactions such as receiving a salary and paying bills?",
      [
        "a fixed deposit account",
        "a savings account",
        "a retirement annuity",
        "a cheque (current) account",
      ],
      3,
      "A cheque/current account is for day-to-day transactions; a fixed deposit locks money away for a set period to earn higher interest.",
    ],
  ],
  "Food Preservation & Spoilage": [
    [
      "Food spoilage is mainly caused by:",
      [
        "the growth of micro-organisms such as bacteria, yeasts and moulds",
        "adding too much salt",
        "keeping food in the freezer",
        "cooking food thoroughly",
      ],
      0,
      "Micro-organisms (bacteria, yeasts and moulds), together with natural enzymes, cause most food spoilage.",
    ],
    [
      "Freezing preserves food because the low temperature:",
      [
        "adds nutrients to the food",
        "slows down the growth of micro-organisms and enzyme activity",
        "kills all bacteria permanently",
        "increases the moisture content",
      ],
      1,
      "Freezing does not kill micro-organisms; the cold slows their growth and enzyme activity so the food keeps for longer.",
    ],
    [
      "Drying (dehydration) preserves food such as biltong and dried fruit by:",
      [
        "adding sugar",
        "freezing the water in the food",
        "removing the moisture that micro-organisms need to grow",
        "sealing it from the air",
      ],
      2,
      "Removing moisture deprives micro-organisms of the water they need to multiply, so dried food keeps much longer.",
    ],
    [
      "Pickling preserves food such as onions and gherkins by storing them in:",
      ["sugar syrup", "plain water", "oil", "vinegar (an acid)"],
      3,
      "The acid in vinegar creates conditions in which spoilage micro-organisms cannot grow, preserving the food.",
    ],
    [
      "A high concentration of sugar preserves jam because it:",
      [
        "draws moisture out of micro-organisms, stopping their growth",
        "adds vitamins to the fruit",
        "lowers the temperature of the jam",
        "removes the colour",
      ],
      0,
      "A high sugar concentration draws water out of micro-organisms by osmosis, so they cannot multiply.",
    ],
    [
      "Commercial canning preserves food mainly by:",
      [
        "adding artificial colour",
        "heating the food to destroy micro-organisms and sealing it airtight",
        "freezing it before sealing",
        "drying it out completely",
      ],
      1,
      "Canning heats the food to kill micro-organisms and seals it in an airtight container so no new organisms can enter.",
    ],
    [
      "When a cut apple turns brown after a while, this browning is caused by:",
      ["bacteria", "added sugar", "enzymes reacting with oxygen in the air", "freezing"],
      2,
      "Enzymes in the fruit react with oxygen (enzymatic browning); lemon juice slows it because its acid inactivates the enzymes.",
    ],
    [
      "Adding a lot of salt to preserve food, such as salted fish, works because the salt:",
      [
        "adds protein",
        "makes the food sweeter",
        "raises the temperature",
        "draws out moisture so micro-organisms cannot grow",
      ],
      3,
      "Salt draws water out of both the food and any micro-organisms, creating conditions in which they cannot survive.",
    ],
  ],
  "Fibres & Fabrics": [
    [
      "Which of the following is a natural fibre obtained from a plant?",
      ["cotton", "polyester", "nylon", "acrylic"],
      0,
      "Cotton comes from the cotton plant — a natural cellulose fibre. Polyester, nylon and acrylic are synthetic (man-made).",
    ],
    [
      "Wool is a natural fibre obtained from:",
      ["the flax plant", "the fleece of sheep", "petroleum", "wood pulp"],
      1,
      "Wool is an animal (protein) fibre shorn from sheep.",
    ],
    [
      "Which of the following is a synthetic (man-made) fibre?",
      ["cotton", "wool", "polyester", "linen"],
      2,
      "Polyester is manufactured from chemicals (petroleum based); cotton, wool and linen are natural fibres.",
    ],
    [
      "An important property of cotton that makes it comfortable for summer clothing and underwear is that it is:",
      ["waterproof", "non-absorbent", "elastic like rubber", "absorbent and cool to wear"],
      3,
      "Cotton is absorbent and breathable, so it soaks up perspiration and feels cool — ideal for hot weather.",
    ],
    [
      "Linen is a natural fibre made from the:",
      [
        "stem of the flax plant",
        "fleece of a goat",
        "cocoon of the silkworm",
        "leaves of the sisal plant",
      ],
      0,
      "Linen is a cellulose fibre obtained from the stem of the flax plant.",
    ],
    [
      "The main purpose of a care label sewn into a garment is to:",
      [
        "show the price of the garment",
        "tell the consumer how to wash, dry and iron the garment correctly",
        "advertise the brand",
        "show the date of manufacture",
      ],
      1,
      "Care labels give washing, drying and ironing instructions so the consumer can look after the garment without damaging it.",
    ],
    [
      "Silk is a natural fibre produced by:",
      ["the cotton plant", "sheep", "the silkworm", "a purely chemical process"],
      2,
      "Silk is a protein fibre spun by the silkworm when it makes its cocoon.",
    ],
    [
      "Compared with cotton, a synthetic fibre such as polyester generally:",
      [
        "absorbs much more moisture",
        "creases very easily",
        "shrinks badly when washed",
        "dries quickly and resists creasing",
      ],
      3,
      "Polyester absorbs little moisture, so it dries quickly and resists creasing — an easy-care fabric.",
    ],
  ],
  "Marketing, Advertising & Buying Skills": [
    [
      "Impulse buying means:",
      [
        "making an unplanned purchase on the spur of the moment",
        "comparing prices in several shops first",
        "buying only items on a shopping list",
        "saving up before buying",
      ],
      0,
      "An impulse buy is an unplanned purchase made suddenly, often triggered by an attractive display or a special offer.",
    ],
    [
      "An advertisement that mainly gives facts such as the price, ingredients and where to buy a product is an example of:",
      ["persuasive advertising", "informative advertising", "a guarantee", "a care label"],
      1,
      "Informative advertising gives the consumer factual information, while persuasive advertising tries to convince through emotion and image.",
    ],
    [
      "An advert that says 'Everyone is switching to this brand — don't be left out!' uses which persuasion technique?",
      ["factual comparison", "a printed price list", "the bandwagon technique", "a care instruction"],
      2,
      "The bandwagon technique pressures consumers to follow the crowd and buy what 'everyone else' is supposedly buying.",
    ],
    [
      "Comparing prices and quality at different shops before buying helps the consumer to:",
      [
        "spend more money",
        "buy on impulse",
        "ignore product information",
        "get the best value for money",
      ],
      3,
      "Comparison shopping lets the consumer find the best quality at the best price — good value for money.",
    ],
    [
      "The unit price shown on a shelf label helps a consumer to:",
      [
        "compare the cost per kilogram or litre between different package sizes",
        "see the date the product was made",
        "read the washing instructions",
        "find the bar code",
      ],
      0,
      "Unit price (e.g. the price per 100 g) lets shoppers compare value across different brands and pack sizes.",
    ],
    [
      "A shop sells milk very cheaply to draw customers into the store, hoping they will buy other items too. This technique is called a:",
      ["unit price", "loss leader", "care label", "cooling-off period"],
      1,
      "A loss leader is a product sold at a very low price (sometimes below cost) to attract customers into the shop.",
    ],
    [
      "A guarantee (warranty) on a product is:",
      [
        "the price of the product",
        "an advertisement for the product",
        "a promise by the manufacturer to repair or replace the product if it is faulty within a stated period",
        "a list of the ingredients",
      ],
      2,
      "A guarantee/warranty is the manufacturer's promise to repair or replace a faulty product within a set time.",
    ],
    [
      "Placing sweets and magazines next to the till (point of sale) is a marketing strategy designed to encourage:",
      [
        "comparison shopping",
        "saving money",
        "reading the label",
        "impulse buying while waiting to pay",
      ],
      3,
      "Items at the till tempt waiting customers into unplanned (impulse) purchases.",
    ],
  ],
  "Sustainable Living & Resource Management": [
    [
      "The 'three Rs' of waste management are:",
      [
        "reduce, reuse, recycle",
        "rinse, rub, repeat",
        "read, record, report",
        "rent, return, replace",
      ],
      0,
      "The three Rs — reduce, reuse and recycle — lower the amount of waste sent to landfill.",
    ],
    [
      "Which of the following is an example of recycling?",
      [
        "throwing glass bottles in the general bin",
        "turning used paper into new paper products",
        "leaving a tap running",
        "burning plastic in the yard",
      ],
      1,
      "Recycling processes used materials such as paper and glass into new products instead of sending them to landfill.",
    ],
    [
      "Which action saves water in the home?",
      [
        "leaving the tap running while brushing teeth",
        "watering the garden at midday",
        "fixing a dripping tap and taking shorter showers",
        "hosing down the driveway every day",
      ],
      2,
      "Fixing leaks and shortening showers cut water use — important in water-scarce South Africa.",
    ],
    [
      "Which of the following saves electricity at home?",
      [
        "leaving lights on all day",
        "using an electric geyser without a timer",
        "running the oven while it is empty",
        "switching appliances off at the wall and using LED globes",
      ],
      3,
      "Switching appliances off at the wall (no standby) and using energy-efficient LED bulbs reduce electricity use.",
    ],
    [
      "A material that is 'biodegradable' is one that:",
      [
        "breaks down naturally through the action of micro-organisms",
        "lasts forever in landfill",
        "cannot be composted",
        "is always made of plastic",
      ],
      0,
      "Biodegradable materials such as food scraps and paper are broken down naturally by micro-organisms, unlike most plastics.",
    ],
    [
      "Composting is the process of:",
      [
        "burning garden waste",
        "turning organic kitchen and garden waste into a natural fertiliser",
        "recycling glass bottles",
        "purifying drinking water",
      ],
      1,
      "Composting lets organic waste decompose into a nutrient-rich soil conditioner, which reduces landfill waste.",
    ],
    [
      "Sustainable consumption means using resources in a way that:",
      [
        "uses as much as possible right now",
        "ignores future generations",
        "meets present needs without harming the ability of future generations to meet theirs",
        "wastes water and electricity",
      ],
      2,
      "Sustainable consumption meets today's needs without depleting resources or harming the environment for future generations.",
    ],
    [
      "Which choice best reduces single-use plastic waste when shopping?",
      [
        "asking for extra plastic bags",
        "buying more bottled water",
        "double-bagging every item",
        "taking your own reusable shopping bags",
      ],
      3,
      "Reusable bags cut down on single-use plastic, which pollutes the environment and is slow to break down.",
    ],
  ],
  "Consumer Information, Rights & Redress": [
    [
      "To return a faulty product to a shop, the most important document a consumer should keep is the:",
      [
        "till slip (receipt) as proof of purchase",
        "shopping list",
        "advertisement for the product",
        "delivery van's number plate",
      ],
      0,
      "The till slip (receipt) proves what was bought, when and for how much — essential when returning faulty goods.",
    ],
    [
      "The 'best before' date on a food product indicates:",
      [
        "the date the product was manufactured",
        "the date until which the food is at its best quality, though it may still be safe to eat afterwards",
        "the date the food becomes poisonous",
        "the date it was delivered to the shop",
      ],
      1,
      "'Best before' refers to quality, not safety — the food may still be safe afterwards but past its best. The 'use by' date is the safety date.",
    ],
    [
      "If a consumer buys a faulty appliance, the first place to seek redress is usually:",
      [
        "the national newspaper",
        "Parliament",
        "the shop or supplier where it was bought",
        "the consumer's bank",
      ],
      2,
      "A consumer should first return to the shop/supplier to ask for a repair, replacement or refund before approaching outside bodies.",
    ],
    [
      "On a food label, the ingredient present in the largest amount is:",
      [
        "always sugar",
        "listed last",
        "shown only on the back",
        "listed first, because ingredients appear in order of quantity",
      ],
      3,
      "By law ingredients are listed in descending order of quantity, so the first ingredient is present in the greatest amount.",
    ],
    [
      "The bar code printed on a product is used to:",
      [
        "identify the product and call up its price at the till scanner",
        "show the consumer how to recycle it",
        "give cooking instructions",
        "list the allergens",
      ],
      0,
      "The bar code is scanned at the till to identify the item and look up its price from the store's system.",
    ],
    [
      "Which of the following is an example of responsible consumer behaviour?",
      [
        "buying more than you can afford on credit",
        "reading the label and checking the expiry date before buying",
        "ignoring all product information",
        "always buying the most expensive brand",
      ],
      1,
      "A responsible consumer checks labels, expiry dates and prices and buys within their means.",
    ],
    [
      "A consumer who is sold food that is already past its expiry date has the right to:",
      [
        "keep quiet about it",
        "pay extra for it",
        "complain and ask for a refund or replacement",
        "throw it away without telling anyone",
      ],
      2,
      "Selling expired food is unlawful; the consumer is entitled to a refund or replacement and should report it to the shop.",
    ],
    [
      "Which is the most reliable source of information when deciding which product to buy?",
      [
        "only the product's own advertisement",
        "the brightest packaging on the shelf",
        "a celebrity endorsement",
        "independent product reviews and comparing the labels yourself",
      ],
      3,
      "Independent reviews and comparing labels are more objective than adverts, packaging or celebrity endorsements, which are designed to sell.",
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
