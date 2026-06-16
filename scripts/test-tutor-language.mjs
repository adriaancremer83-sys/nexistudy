// Verifies the Nexi Tutor language fix: the model must reply in the SELECTED
// language regardless of the language the question is typed in.
// Run: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/test-tutor-language.mjs
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

// Mirrors buildSystem() in app/api/tutor/route.ts (the fixed version).
function buildSystem({ curriculum, grade, subject, topic, language }) {
  const t = topic?.trim() || `general ${subject}`;
  return [
    "You are Nexi, a warm, patient South African study tutor inside the NexiStudy app.",
    "",
    "The learner is studying:",
    `- Curriculum: ${curriculum}`,
    `- Grade: ${grade}`,
    `- Subject: ${subject}`,
    `- Topic: ${t}`,
    `- Preferred language: ${language}`,
    "",
    `LANGUAGE — STRICT RULE: Write your ENTIRE reply in ${language}. Always answer in ${language}, no matter which language the learner types their question in. Do NOT switch to English (unless ${language} is English), and never say things like "I'll stick to English" or apologise about language. ${language} is one of South Africa's official languages and you are fluent in it — use it naturally, including the correct mathematical and scientific terms (you may keep standard symbols, numbers and formulas as-is).`,
    "",
    "How you help:",
    "- Teach the METHOD, step by step, like a good teacher sitting next to them. For problems, guide them through the working instead of only giving the final answer.",
    `- Pitch everything to ${grade} level and the ${curriculum} syllabus.`,
    "- Be encouraging and concise: short, clear steps in plain language.",
    "- Stay on school topics. If asked something off-topic or inappropriate, gently steer back to studying.",
    "- Use plain text; avoid heavy LaTeX.",
  ].join("\n");
}

const QUESTION = "Solve for x: 2x + 6 = 14"; // typed in English every time
const LANGUAGES = ["English", "Afrikaans", "isiZulu"];

for (const language of LANGUAGES) {
  const system = buildSystem({
    curriculum: "CAPS",
    grade: "Grade 10",
    subject: "Mathematics",
    topic: "Algebra",
    language,
  });
  const res = await anthropic.messages.create({
    model: "claude-haiku-4-5", // the free-tier model
    max_tokens: 700,
    system,
    messages: [{ role: "user", content: QUESTION }],
  });
  const text = res.content.map((b) => (b.type === "text" ? b.text : "")).join("");
  console.log(`\n================ selected language: ${language} ================`);
  console.log(`(question typed in English: "${QUESTION}")\n`);
  console.log(text.trim());
}
console.log("\n=== done ===");
