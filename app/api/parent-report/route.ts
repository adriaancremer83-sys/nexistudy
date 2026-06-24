import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import Anthropic from "@anthropic-ai/sdk";
import { authOptions } from "@/lib/auth";
import { parentReportUsage } from "@/lib/parentReportUsage";
import { logApiUsage } from "@/lib/apiUsage";
import { getSubscription, findUserById } from "@/lib/users";
import { getQuizActivitySince, type QuizActivity } from "@/lib/practice";

// Termly Parent Report: turns a learner's real practice activity over the past
// school term into a plain-language report a parent can read in a minute —
// effort, subject-by-subject trend, wins, gaps, and what to do next. Streams
// like the tutor route. Free → Sonnet (a short snapshot); Premium → Opus 4.8 +
// adaptive thinking (the full report).
const MODEL = {
  free: "claude-sonnet-4-6",
  premium: "claude-opus-4-8",
} as const;
const MAX_OUTPUT_TOKENS = { free: 600, premium: 2200 } as const;

// A school term is ~10 weeks; a 90-day rolling window captures the current term
// plus a little overlap, and works year-round without hardcoding term dates.
const TERM_DAYS = 90;
// Minimum questions before a subject/topic average is worth reporting on.
const MIN_QUESTIONS = 8;

function pct(correct: number, total: number): number {
  return total > 0 ? Math.round((correct / total) * 100) : 0;
}

interface SubjectStat {
  subject: string;
  quizzes: number;
  questions: number;
  correct: number;
  scores: number[]; // per-attempt %, oldest first
}

// Rolls the raw attempts into a compact, model-ready summary string.
function summarise(activity: QuizActivity[]): string {
  const totalQuizzes = activity.length;
  const totalQuestions = activity.reduce((s, a) => s + a.total, 0);
  const totalCorrect = activity.reduce((s, a) => s + a.correct, 0);
  const daysActive = new Set(activity.map((a) => a.createdAt.slice(0, 10))).size;
  const firstDay = activity[0].createdAt.slice(0, 10);
  const lastDay = activity[activity.length - 1].createdAt.slice(0, 10);

  // Per subject (attempts arrive oldest-first, so scores stay in order).
  const bySubject = new Map<string, SubjectStat>();
  for (const a of activity) {
    const s = bySubject.get(a.subject) ?? {
      subject: a.subject,
      quizzes: 0,
      questions: 0,
      correct: 0,
      scores: [],
    };
    s.quizzes += 1;
    s.questions += a.total;
    s.correct += a.correct;
    s.scores.push(pct(a.correct, a.total));
    bySubject.set(a.subject, s);
  }

  const subjectLines = [...bySubject.values()]
    .sort((x, y) => y.questions - x.questions)
    .map((s) => {
      const avg = pct(s.correct, s.questions);
      let trend = "";
      if (s.scores.length >= 4) {
        const mid = Math.floor(s.scores.length / 2);
        const early = s.scores.slice(0, mid);
        const recent = s.scores.slice(mid);
        const earlyAvg = Math.round(early.reduce((a, b) => a + b, 0) / early.length);
        const recentAvg = Math.round(recent.reduce((a, b) => a + b, 0) / recent.length);
        const delta = recentAvg - earlyAvg;
        const label = delta >= 8 ? "improving" : delta <= -8 ? "slipping" : "steady";
        trend = ` (${label}: ${earlyAvg}% early → ${recentAvg}% recent)`;
      }
      return `${s.subject}: ${s.quizzes} quizzes, ${avg}% accuracy${trend}`;
    });

  // Per topic, for clearest win / biggest gap (only well-practised topics).
  const byTopic = new Map<string, { correct: number; questions: number; subject: string }>();
  for (const a of activity) {
    const key = `${a.topic} (${a.subject})`;
    const t = byTopic.get(key) ?? { correct: 0, questions: 0, subject: a.subject };
    t.correct += a.correct;
    t.questions += a.total;
    byTopic.set(key, t);
  }
  const ranked = [...byTopic.entries()]
    .filter(([, t]) => t.questions >= MIN_QUESTIONS)
    .map(([key, t]) => ({ key, score: pct(t.correct, t.questions) }))
    .sort((a, b) => a.score - b.score);

  const lines = [
    `Report window: ${firstDay} to ${lastDay} (roughly the past school term).`,
    `Effort: ${totalQuizzes} practice quizzes across ${bySubject.size} subjects, ${totalQuestions} questions answered, active on ${daysActive} separate days.`,
    `Overall accuracy: ${pct(totalCorrect, totalQuestions)}%.`,
    `By subject (most-practised first): ${subjectLines.join("; ")}.`,
  ];
  if (ranked.length > 0) {
    const strongest = ranked[ranked.length - 1];
    const weakest = ranked[0];
    lines.push(`Strongest well-practised topic: ${strongest.key} ${strongest.score}%.`);
    lines.push(`Weakest well-practised topic: ${weakest.key} ${weakest.score}%.`);
  }
  return lines.join("\n");
}

function buildSystem(plan: "free" | "premium"): string {
  const shared = [
    "You are Nexi, writing a warm, plain-language progress report addressed TO a South African parent about their child's studying. The parent may not be technical or know the curriculum — be clear, calm and encouraging, but honest. Never alarmist.",
    "",
    "IMPORTANT — what this report is and isn't:",
    "- It is based ONLY on the child's practice activity on NexiStudy this term (practice quizzes they chose to do), NOT their official school marks or report card. Say so plainly so the parent doesn't confuse it with school results.",
    "- Frame it as 'a look between report cards' — an early read on effort and where things are heading.",
    "- Use the child's first name throughout. Address the parent as 'you'.",
    "",
    "Reading the data:",
    "- 'accuracy' is the % of practice questions answered correctly. A trend (improving/steady/slipping) compares earlier vs recent quizzes in that subject.",
    "- Celebrate effort (number of quizzes, days active) as much as scores — consistency is the win at this age.",
    "- Turn gaps into next steps, never just bad news. Point to doing more NexiStudy practice on the weak topics and using the Nexi Tutor for anything confusing.",
    "- If the child has done very little practice, be kind about it and gently encourage a simple routine (e.g. two short quizzes a week).",
    "- Plain language, short Markdown headings and bullets. No jargon, no long lectures.",
  ];

  if (plan === "premium") {
    return [
      ...shared,
      "",
      "Write the full Termly Parent Report with these sections (and only these):",
      "## This term at a glance",
      "2–3 warm sentences: overall effort and the headline on how the term is going.",
      "## Subject by subject",
      "One short bullet per subject they practised: how they're doing and the trend, in plain words a parent understands.",
      "## What improved",
      "The clearest wins this term — subjects or topics that moved in the right direction, or strong consistency.",
      "## Where the gaps are",
      "The 1–3 areas needing attention, framed constructively, each tied to a concrete focus.",
      "## What you can do next",
      "2–3 specific, doable things the parent can do to support — including the exact weak topics to encourage practice on, and a realistic routine.",
    ].join("\n");
  }

  // Free taste: the headline plus one win and one watch-point, then stop.
  return [
    ...shared,
    "",
    "Keep this FREE snapshot short — ONLY these two sections:",
    "## This term at a glance",
    "2–3 sentences on overall effort and how the term is going, with the overall accuracy.",
    "## One win and one to watch",
    "One clear thing to celebrate and one area to keep an eye on, each in a sentence.",
    "Do NOT give the subject-by-subject breakdown, the full gaps list, or the parent action plan — those are in the full report.",
  ].join("\n");
}

function buildTask(ctx: { childName: string; grade: string; stats: string }): string {
  const who = ctx.grade
    ? `${ctx.childName}, a ${ctx.grade} learner`
    : ctx.childName;
  return [
    `Write a parent report about ${who}, based on this NexiStudy practice activity:`,
    "",
    ctx.stats,
  ].join("\n");
}

// GET — current remaining count (no consumption), to seed the page counter.
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  const { plan } = await getSubscription(session.user.id);
  const remaining = await parentReportUsage.getRemaining(session.user.id, plan);
  return NextResponse.json({ remaining, limit: parentReportUsage.dailyLimit(plan), plan });
}

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Please sign in to get a parent report." }, { status: 401 });
  }
  const { plan } = await getSubscription(session.user.id);

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "The Parent Report isn't configured yet. Please try again later." },
      { status: 503 }
    );
  }

  // Pull the term's activity BEFORE consuming a credit, so a learner with no
  // practice gets pointed at quizzes instead of burning their report.
  const since = new Date(Date.now() - TERM_DAYS * 86400000).toISOString();
  const activity = await getQuizActivitySince(session.user.id, since).catch(() => []);
  if (activity.length === 0) {
    return NextResponse.json(
      {
        error: "There's no practice yet this term — do a few quizzes so Nexi can build a report.",
        needsData: true,
      },
      { status: 422 }
    );
  }

  const { allowed, remaining } = await parentReportUsage.consume(session.user.id, plan);
  if (!allowed) {
    return NextResponse.json(
      { error: "You've used your parent reports for today.", remaining: 0 },
      { status: 429 }
    );
  }

  const user = await findUserById(session.user.id).catch(() => null);
  const childName = (user?.name ?? "your child").trim().split(/\s+/)[0] || "your child";
  const system = buildSystem(plan);
  const task = buildTask({ childName, grade: user?.grade ?? "", stats: summarise(activity) });

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
          feature: `parent_report_${plan}`,
          model,
          usage: finalMessage.usage,
        });
      } catch (err) {
        console.error("parent-report stream failed:", err);
        controller.enqueue(
          encoder.encode("\n\n⚠️ Sorry — Nexi couldn't build the report right now. Please try again in a moment.")
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
      "X-Report-Remaining": String(remaining),
    },
  });
}
