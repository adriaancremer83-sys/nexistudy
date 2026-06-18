import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import Anthropic from "@anthropic-ai/sdk";
import { authOptions } from "@/lib/auth";
import { consume, getRemaining, dailyLimit } from "@/lib/tutorUsage";
import { languageAllowed } from "@/lib/languages";
import { logApiUsage } from "@/lib/apiUsage";
import { getSubscription } from "@/lib/users";

// Cost controls live here:
//  - model per plan (Haiku free / Sonnet premium)
//  - hard output cap (max_tokens)
//  - trimmed history (last N turns) + input length cap
const MODEL = {
  free: "claude-haiku-4-5",
  premium: "claude-sonnet-4-6",
} as const;
const MAX_OUTPUT_TOKENS = 700;
const MAX_HISTORY_TURNS = 10;
const MAX_INPUT_CHARS = 1000;

interface IncomingMsg {
  role: "student" | "nexi";
  text: string;
}

function buildSystem(ctx: {
  curriculum: string;
  grade: string;
  subject: string;
  topic: string;
  language: string;
}): string {
  const topic = ctx.topic?.trim() || `general ${ctx.subject}`;
  return [
    "You are Nexi, a warm, patient South African study tutor inside the NexiStudy app.",
    "",
    "The learner is studying:",
    `- Curriculum: ${ctx.curriculum}`,
    `- Grade: ${ctx.grade}`,
    `- Subject: ${ctx.subject}`,
    `- Topic: ${topic}`,
    `- Preferred language: ${ctx.language}`,
    "",
    `LANGUAGE — STRICT RULE: Write your ENTIRE reply in ${ctx.language}. Always answer in ${ctx.language}, no matter which language the learner types their question in. Do NOT switch to English (unless ${ctx.language} is English), and never say things like "I'll stick to English" or apologise about language. ${ctx.language} is one of South Africa's official languages and you are fluent in it — use it naturally, including the correct mathematical and scientific terms (you may keep standard symbols, numbers and formulas as-is).`,
    "",
    "How you help:",
    "- Teach the METHOD, step by step, like a good teacher sitting next to them. For problems, guide them through the working instead of only giving the final answer.",
    `- Pitch everything to ${ctx.grade} level and the ${ctx.curriculum} syllabus.`,
    "- Be encouraging and concise: short, clear steps in plain language.",
    "- Stay on school topics. If asked something off-topic or inappropriate, gently steer back to studying.",
    "- Use plain text; avoid heavy LaTeX.",
  ].join("\n");
}

// GET — current remaining count (no consumption), to seed the chat counter.
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  // Live plan from the DB, not the session JWT — a just-upgraded learner must
  // get premium (Sonnet, unlimited chats, all languages) immediately.
  const { plan } = await getSubscription(session.user.id);
  const remaining = await getRemaining(session.user.id, plan);
  return NextResponse.json({ remaining, limit: dailyLimit(plan), plan });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Please sign in to chat with Nexi." }, { status: 401 });
  }
  // Live plan from the DB, not the session JWT — a just-upgraded learner must
  // get premium (Sonnet, unlimited chats, all languages) immediately.
  const { plan } = await getSubscription(session.user.id);

  const body = await req.json();
  const incoming: IncomingMsg[] = Array.isArray(body?.messages) ? body.messages : [];
  const latest = incoming[incoming.length - 1];
  if (!latest || latest.role !== "student" || !latest.text?.trim()) {
    return NextResponse.json({ error: "No message to answer." }, { status: 400 });
  }
  if (latest.text.length > MAX_INPUT_CHARS) {
    return NextResponse.json(
      { error: `Please keep your question under ${MAX_INPUT_CHARS} characters.` },
      { status: 400 }
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "Nexi Tutor isn't configured yet. Please try again later." },
      { status: 503 }
    );
  }

  // Server-side daily limit — checked and consumed before any paid API call.
  const { allowed, remaining } = await consume(session.user.id, plan);
  if (!allowed) {
    return NextResponse.json(
      { error: "You've used your tutor messages for today.", remaining: 0 },
      { status: 429 }
    );
  }

  // Free tier is restricted to English / Afrikaans / isiZulu (the languages
  // Haiku handles reliably). Premium is unrestricted. Clamp defensively so a
  // crafted request can't bypass the dropdown gating.
  const requestedLanguage = String(body.language ?? "English");
  const language = languageAllowed(plan, requestedLanguage) ? requestedLanguage : "English";

  const system = buildSystem({
    curriculum: String(body.curriculum ?? "CAPS"),
    grade: String(body.grade ?? "Grade 12"),
    subject: String(body.subject ?? "Mathematics"),
    topic: String(body.topic ?? ""),
    language,
  });

  const messages = incoming
    .slice(-MAX_HISTORY_TURNS)
    .map((m) => ({
      role: (m.role === "student" ? "user" : "assistant") as "user" | "assistant",
      content: m.text.slice(0, MAX_INPUT_CHARS * 4),
    }));

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const anthropic = new Anthropic();
        const model = MODEL[plan];
        const claude = anthropic.messages.stream({
          model,
          max_tokens: MAX_OUTPUT_TOKENS,
          system,
          messages,
        });
        claude.on("text", (delta) => controller.enqueue(encoder.encode(delta)));
        const finalMessage = await claude.finalMessage();
        // Log tokens + computed cost for the admin spend view (best-effort).
        await logApiUsage({
          userId: session.user.id,
          feature: "tutor",
          model,
          usage: finalMessage.usage,
        });
      } catch (err) {
        console.error("tutor stream failed:", err);
        controller.enqueue(
          encoder.encode("\n\n⚠️ Sorry — Nexi hit a problem. Please try again in a moment.")
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Chats-Remaining": String(remaining),
    },
  });
}
