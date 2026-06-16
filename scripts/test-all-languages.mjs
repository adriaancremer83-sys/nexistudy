// Honesty check for the "all 11 official languages" claim: does each model
// actually answer IN each language? Prints a short reply per language per model.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/test-all-languages.mjs
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

const LANGUAGES = [
  "English",
  "Afrikaans",
  "isiZulu",
  "isiXhosa",
  "Sesotho sa Leboa (Sepedi)",
  "Setswana",
  "Sesotho",
  "Xitsonga",
  "siSwati",
  "Tshivenda",
  "isiNdebele",
];

const MODELS = { "Haiku (free)": "claude-haiku-4-5", "Sonnet (paid)": "claude-sonnet-4-6" };

function system(language) {
  return `You are Nexi, a South African study tutor.\nLANGUAGE — STRICT RULE: Write your ENTIRE reply in ${language}. Always answer in ${language} no matter what language the learner types in. Do NOT switch to English (unless ${language} is English) and never apologise about language. ${language} is one of South Africa's official languages and you are fluent in it.`;
}

const QUESTION = "In 2 short sentences, explain to a Grade 10 learner what a fraction is."; // typed in English

for (const [label, model] of Object.entries(MODELS)) {
  console.log(`\n########################## MODEL: ${label} ##########################`);
  for (const language of LANGUAGES) {
    try {
      const res = await anthropic.messages.create({
        model,
        max_tokens: 250,
        system: system(language),
        messages: [{ role: "user", content: QUESTION }],
      });
      const text = res.content.map((b) => (b.type === "text" ? b.text : "")).join("").trim();
      console.log(`\n--- ${language} ---`);
      console.log(text);
    } catch (e) {
      console.log(`\n--- ${language} --- ERROR: ${e.message}`);
    }
  }
}
console.log("\n=== done ===");
