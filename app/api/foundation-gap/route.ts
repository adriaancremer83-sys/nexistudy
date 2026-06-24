import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import Anthropic from "@anthropic-ai/sdk";
import { authOptions } from "@/lib/auth";
import { foundationGapUsage } from "@/lib/foundationGapUsage";
import { logApiUsage } from "@/lib/apiUsage";
import { getSubscription } from "@/lib/users";
import { getTopicsWithMastery } from "@/lib/practice";

// Grade 8–9 Foundation Gap Finder: reads the learner's REAL Grade 9 quiz mastery
// per topic, finds the cracked foundational building blocks, and builds a fix-it
// plan before Grade 10. Streams like the tutor route. Free → Sonnet (the single
// biggest gap + a first step); Premium → Opus 4.8 + adaptive thinking (the full
// week-by-week repair plan).
const MODEL = {
  free: "claude-sonnet-4-6",
  premium: "claude-opus-4-8",
} as const;
const MAX_OUTPUT_TOKENS = { free: 650, premium: 2200 } as const;

// Mastery is a 0–100 integer percent. Below this a topic counts as a gap worth
// repairing; the model still gets the full practised list and sets priorities.
const GAP_THRESHOLD = 70;

interface GapTopic {
  subject: string;
  name: string;
  mastery: number;
}

function buildSystem(plan: "free" | "premium"): string {
  const shared = [
    "You are Nexi, a warm, sharp South African study coach helping a Grade 9 learner (and their parents) find and fix the FOUNDATIONAL gaps in their knowledge before they start Grade 10 under the CAPS curriculum. The learner is likely 14–15 and may be anxious — be encouraging and concrete, never alarmist.",
    "",
    "You are given the learner's REAL practice-quiz mastery per Grade 9 topic (objective evidence, 0–100%). A low score on a topic usually means an earlier building block cracked — reason backwards to the likely root cause:",
    "- Weak Algebra / Equations → often shaky integers, fractions, or order of operations from earlier grades.",
    "- Weak Geometry / Measurement → often gaps in basic angle facts, area/perimeter formulas, or working with units.",
    "- Weak Number Patterns → often skip-counting, multiplication facts, or spotting a constant difference.",
    "- Weak Natural Sciences topics → often missing core vocabulary or a misunderstood basic concept (e.g. atoms vs molecules) rather than the whole topic.",
    "- Weak EMS / financial topics → often shaky percentages, ratios, or basic money arithmetic.",
    "Name the LIKELY underlying building block in plain language, but don't pretend to certainty you don't have — say 'this usually points to…'.",
    "",
    "Why it matters: Grade 10 builds directly on these. Tie each gap to what it will affect in Grade 10 (e.g. weak Grade 9 algebra makes Grade 10 functions and equations much harder). This is the motivation to fix it NOW, while there's time.",
    "",
    "Ground rules:",
    "- Be specific to the topics and percentages given — never generic. Quote the topic name and the score.",
    "- Point them at NexiStudy's practice quizzes for the exact weak topics as the way to repair each gap, plus the Nexi Tutor for anything they don't understand.",
    "- Encouraging, plain language a Grade 9 and their parents can follow. Simple Markdown headings and short bullets. No long lectures.",
    "- If the learner has done few or no quizzes, gently tell them the report gets much sharper once they practise a few topics, and suggest starting with the subjects they're least sure of.",
  ];

  if (plan === "premium") {
    return [
      ...shared,
      "",
      "Produce a full Foundation Gap report with these sections (and only these):",
      "## Where you stand",
      "2–3 sentences: an honest, calm read on their foundational health overall, naming their strongest and weakest areas from the data.",
      "## Your gaps, in priority order",
      "Up to FOUR gaps, weakest/most-important first. For each: a bold topic name with its %, the likely underlying building block ('this usually points to…'), and one line on what it will affect in Grade 10.",
      "## Your repair plan, week by week",
      "A realistic 3–4 week plan. Each week: which 1–2 topics to drill on NexiStudy practice, what to revise first, and how they'll know it's fixed (e.g. 'aim for 75%+ on the quiz').",
      "## Keep these strong",
      "1–2 topics they already score well on, with a one-line nudge to keep them sharp.",
    ].join("\n");
  }

  // Free taste: nail the single most important gap, then stop.
  return [
    ...shared,
    "",
    "Keep this FREE-tier report short — ONLY these two sections:",
    "## Your biggest gap",
    "Name the single weakest/most-important topic with its %, the likely underlying building block, and one line on what it affects in Grade 10.",
    "## Your first step this week",
    "One concrete action — usually 'do the [topic] practice quiz on NexiStudy and aim for 75%+', plus one thing to revise first.",
    "Do NOT give the full priority list, the week-by-week plan, or the 'keep these strong' section — those are in the full report.",
  ].join("\n");
}

function buildTask(ctx: {
  gapSummary: string;
  strongSummary: string;
  unpractisedSummary: string;
  marksSummary: string;
}): string {
  const lines = ["Find this Grade 9 learner's foundational gaps and how to fix them before Grade 10."];
  if (ctx.gapSummary) {
    lines.push(`Quiz-measured weak topics (weakest first, these are the gaps): ${ctx.gapSummary}.`);
  }
  if (ctx.strongSummary) {
    lines.push(`Topics they're already solid on (quiz-measured): ${ctx.strongSummary}.`);
  }
  if (ctx.unpractisedSummary) {
    lines.push(`Subjects/topics they haven't practised yet (no quiz data — encourage a quiz to check these): ${ctx.unpractisedSummary}.`);
  }
  if (ctx.marksSummary) {
    lines.push(`Self-reported Readiness Check marks (rougher than quiz data — use only where there's no quiz evidence): ${ctx.marksSummary}.`);
  }
  return lines.join("\n");
}

// GET — current remaining count (no consumption), to seed the page counter.
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  const { plan } = await getSubscription(session.user.id);
  const remaining = await foundationGapUsage.getRemaining(session.user.id, plan);
  return NextResponse.json({ remaining, limit: foundationGapUsage.dailyLimit(plan), plan });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Please sign in to find your gaps." }, { status: 401 });
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
      { error: "The Foundation Gap Finder isn't configured yet. Please try again later." },
      { status: 503 }
    );
  }

  // Pull real Grade 9 quiz mastery first (before consuming a credit) so we can
  // tell an empty-handed learner to go practise instead of burning their report.
  const topics = await getTopicsWithMastery(session.user.id, "Grade 9").catch(() => []);
  const practised = topics
    .filter((t) => t.mastery !== null)
    .map((t): GapTopic => ({ subject: t.subject, name: t.name, mastery: t.mastery ?? 0 }));

  if (practised.length === 0 && marks.length === 0) {
    return NextResponse.json(
      {
        error: "Do a few practice quizzes first so Nexi can find your real gaps.",
        needsData: true,
      },
      { status: 422 }
    );
  }

  // Server-side daily limit — checked and consumed before any paid API call.
  const { allowed, remaining } = await foundationGapUsage.consume(session.user.id, plan);
  if (!allowed) {
    return NextResponse.json(
      { error: "You've used your Foundation Gap reports for today.", remaining: 0 },
      { status: 429 }
    );
  }

  const sorted = [...practised].sort((a, b) => a.mastery - b.mastery);
  const gaps = sorted.filter((t) => t.mastery < GAP_THRESHOLD);
  const strong = sorted.filter((t) => t.mastery >= GAP_THRESHOLD).slice(-3).reverse();
  const fmt = (t: GapTopic) => `${t.name} (${t.subject}) ${t.mastery}%`;

  // Subjects the learner hasn't touched in quizzes yet, so the model can nudge a check.
  const practisedSubjects = new Set(practised.map((t) => t.subject));
  const unpractisedSubjects = [...new Set(topics.map((t) => t.subject))].filter(
    (s) => !practisedSubjects.has(s)
  );

  const task = buildTask({
    gapSummary: (gaps.length ? gaps : sorted).map(fmt).join(", "),
    strongSummary: strong.map(fmt).join(", "),
    unpractisedSummary: unpractisedSubjects.join(", "),
    marksSummary: marks
      .map((m: { name: string; percent: number }) => `${m.name} ${m.percent}%`)
      .join(", "),
  });
  const system = buildSystem(plan);

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
          feature: `foundation_gap_${plan}`,
          model,
          usage: finalMessage.usage,
        });
      } catch (err) {
        console.error("foundation-gap stream failed:", err);
        controller.enqueue(
          encoder.encode("\n\n⚠️ Sorry — Nexi couldn't build your gap report right now. Please try again in a moment.")
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
      "X-Gap-Remaining": String(remaining),
    },
  });
}
