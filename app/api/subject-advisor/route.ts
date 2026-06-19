import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import Anthropic from "@anthropic-ai/sdk";
import { authOptions } from "@/lib/auth";
import { subjectAdvisorUsage } from "@/lib/subjectAdvisorUsage";
import { logApiUsage } from "@/lib/apiUsage";
import { getSubscription } from "@/lib/users";

// Grade 9 Subject Choice Advisor: helps a learner choosing their Grade 10
// subjects at the end of Grade 9 — the highest-stakes decision in CAPS. Streams
// like the tutor route. Free → Sonnet (the Maths-vs-Maths-Lit call + a
// direction); Premium → Opus 4.8 + adaptive thinking (full report).
const MODEL = {
  free: "claude-sonnet-4-6",
  premium: "claude-opus-4-8",
} as const;
const MAX_OUTPUT_TOKENS = { free: 700, premium: 2200 } as const;
const MAX_TEXT = 600;

function buildSystem(plan: "free" | "premium"): string {
  const shared = [
    "You are Nexi, a warm, level-headed South African school guidance counsellor helping a Grade 9 learner (and their parents) choose subjects for Grade 10 under the CAPS curriculum. The learner is likely 14–15 and stressed — be reassuring and concrete.",
    "",
    "How CAPS Grade 10–12 subject choice works (use this, don't re-explain it at length):",
    "- Every learner takes 7 subjects: FOUR compulsory — Home Language, First Additional Language, Life Orientation, and EITHER Mathematics OR Mathematical Literacy — plus THREE elective subjects.",
    "- The Maths vs Mathematical Literacy choice is the biggest one. Mathematical Literacy is NOT accepted for engineering, medicine and health sciences, BSc/science degrees, actuarial science, most BCom Accounting/Finance, architecture, and many quantitative fields. Pure Mathematics keeps all of those open. Switching from Maths Lit to Maths later is very hard, so if there's any chance the learner wants those fields, lean towards keeping pure Maths.",
    "- Common electives: Physical Sciences, Life Sciences, Geography, History, Accounting, Business Studies, Economics, Computer Applications Technology (CAT), Information Technology (IT), Tourism, Consumer Studies, Hospitality Studies, Agricultural Sciences, Engineering Graphics & Design, Visual Arts, Dramatic Arts, Music. Schools differ in which they offer and how they group them.",
    "- Rough streams: SCIENCES (Physical Sciences + Life Sciences, with pure Maths) → engineering/health/science; COMMERCE (Accounting, Business Studies, Economics, usually pure Maths) → business/finance; HUMANITIES (History, Geography, languages, arts) → law/social/creative.",
    "",
    "Use their Grade 9 marks as evidence: Grade 9 Mathematics predicts how they'll cope with pure Maths; Natural Sciences predicts Physical & Life Sciences; EMS predicts Accounting/Business/Economics; Social Sciences predicts History/Geography. Be honest about fit but never discouraging — there's a strong path for every learner.",
    "",
    "Ground rules:",
    "- Schools differ, so always tell them to confirm exactly which subjects and combinations their school offers.",
    "- Never shame a Mathematical Literacy choice if it genuinely fits the learner — frame it as 'keeping doors open' vs 'a realistic, successful fit', not pass/fail.",
    "- Warm, plain language a Grade 9 and their parents can follow. Simple Markdown headings and bullets. No long lectures.",
  ];

  if (plan === "premium") {
    return [
      ...shared,
      "",
      "Produce a full advice report with these sections (and only these):",
      "## Maths or Maths Literacy",
      "A clear recommendation based on their Maths mark and their dream/interests, with one or two sentences on what each option keeps open or closes. If their Maths mark wasn't given, say what mark range would point each way and ask them to check it.",
      "## Your subject package",
      "Name a stream that fits, then recommend THREE specific elective subjects, each with a one-line 'why it fits you' tied to their marks/interests.",
      "## What this opens up",
      "The kinds of study paths and careers this package keeps open.",
      "## Watch-outs",
      "2–3 honest cautions (e.g. subjects that are hard to add later, don't drop Maths on a whim, electives that need a strong Grade 9 mark).",
      "## Questions to ask your school",
      "2–3 specific questions, since schools differ on what they offer and how subjects are grouped.",
      "## For your parents",
      "A short, calm paragraph a parent can read to understand the recommendation and how to support the choice.",
    ].join("\n");
  }

  // Free taste: answer the single most stressful question well, then stop.
  return [
    ...shared,
    "",
    "Keep this FREE-tier advice short — ONLY these two sections:",
    "## Maths or Maths Literacy",
    "A clear recommendation based on their Maths mark and dream, plus one sentence on why. If the Maths mark is missing, tell them to add it.",
    "## A direction to explore",
    "Name one stream (sciences / commerce / humanities) that seems to fit and one sentence why.",
    "Do NOT give the full subject package, watch-outs, school questions, or a parents' summary — those are in the full report.",
  ].join("\n");
}

function buildTask(ctx: { marksSummary: string; dreamCareer: string; interests: string }): string {
  const lines = [
    "Help this Grade 9 learner choose their Grade 10 subjects.",
    ctx.marksSummary
      ? `Their latest Grade 9 marks: ${ctx.marksSummary}.`
      : "They haven't entered marks yet — give general guidance and ask them to add their Grade 9 marks (especially Mathematics) for a sharper recommendation.",
  ];
  if (ctx.dreamCareer.trim()) lines.push(`Dream job / field: ${ctx.dreamCareer.trim()}`);
  if (ctx.interests.trim()) lines.push(`What they enjoy / are good at: ${ctx.interests.trim()}`);
  return lines.join("\n");
}

// GET — current remaining count (no consumption), to seed the page counter.
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  const { plan } = await getSubscription(session.user.id);
  const remaining = await subjectAdvisorUsage.getRemaining(session.user.id, plan);
  return NextResponse.json({ remaining, limit: subjectAdvisorUsage.dailyLimit(plan), plan });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Please sign in to get subject advice." }, { status: 401 });
  }
  const { plan } = await getSubscription(session.user.id);

  const body = await req.json().catch(() => null);
  const rawMarks = Array.isArray(body?.marks) ? body.marks : [];
  const marks = rawMarks
    .map((s: unknown) => {
      const o = s as { name?: unknown; percent?: unknown };
      return { name: String(o?.name ?? "").trim(), percent: Number(o?.percent) };
    })
    .filter((s: { name: string; percent: number }) => s.name && Number.isFinite(s.percent));

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "The Subject Choice Advisor isn't configured yet. Please try again later." },
      { status: 503 }
    );
  }

  // Server-side daily limit — checked and consumed before any paid API call.
  const { allowed, remaining } = await subjectAdvisorUsage.consume(session.user.id, plan);
  if (!allowed) {
    return NextResponse.json(
      { error: "You've used your subject-advice reports for today.", remaining: 0 },
      { status: 429 }
    );
  }

  const marksSummary = marks
    .map((m: { name: string; percent: number }) => `${m.name} ${m.percent}%`)
    .join(", ");

  const system = buildSystem(plan);
  const task = buildTask({
    marksSummary,
    dreamCareer: String(body.dreamCareer ?? "").slice(0, MAX_TEXT),
    interests: String(body.interests ?? "").slice(0, MAX_TEXT),
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const anthropic = new Anthropic();
        const model = MODEL[plan];
        const claude = anthropic.messages.stream({
          model,
          max_tokens: MAX_OUTPUT_TOKENS[plan],
          system,
          ...(plan === "premium" ? { thinking: { type: "adaptive" as const } } : {}),
          messages: [{ role: "user", content: task }],
        });
        claude.on("text", (delta) => controller.enqueue(encoder.encode(delta)));
        const finalMessage = await claude.finalMessage();
        await logApiUsage({
          userId: session.user.id,
          feature: `subject_advisor_${plan}`,
          model,
          usage: finalMessage.usage,
        });
      } catch (err) {
        console.error("subject-advisor stream failed:", err);
        controller.enqueue(
          encoder.encode("\n\n⚠️ Sorry — Nexi couldn't generate advice right now. Please try again in a moment.")
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
      "X-Advisor-Remaining": String(remaining),
    },
  });
}
