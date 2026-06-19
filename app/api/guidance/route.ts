import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import Anthropic from "@anthropic-ai/sdk";
import { authOptions } from "@/lib/auth";
import { guidanceUsage } from "@/lib/guidanceUsage";
import { logApiUsage } from "@/lib/apiUsage";
import { getSubscription } from "@/lib/users";
import { computeAps, type SubjectMark } from "@/lib/aps";

// Career & APS Guidance: a South African school-leaver guidance counsellor. Takes
// the learner's subject marks and interests and returns study/career direction —
// course and university fit, NSFAS eligibility, bursary categories, next steps.
// Cost controls mirror the tutor route.
const MODEL = {
  free: "claude-sonnet-4-6",
  premium: "claude-opus-4-8",
} as const;
const MAX_OUTPUT_TOKENS = { free: 900, premium: 2400 } as const;
const MAX_TEXT = 600;

function buildSystem(plan: "free" | "premium"): string {
  const shared = [
    "You are Nexi, a knowledgeable, encouraging South African school-leaver guidance counsellor helping a learner plan study and career options after matric.",
    "",
    "Ground rules:",
    "- Be specific to the South African post-school landscape: public universities, universities of technology, TVET colleges, learnerships, and SETA programmes.",
    "- Use the learner's APS and subject marks to judge realistic admission fit. Be honest but encouraging — always give a viable path, including bridging/foundation routes or a TVET option when university entry is a stretch.",
    "- APS conventions differ per university, so frame fit as a guide and tell the learner to confirm exact requirements on each institution's website.",
    "- Funding: NSFAS income thresholds, bursary criteria and application DEADLINES change every year. Give the general picture, but explicitly tell the learner to verify the current year's thresholds and dates on the official sites (nsfas.org.za and each university/bursary provider). Never state a specific threshold figure or date as if it were current and certain.",
    "- Keep a warm, plain-language tone suitable for a Grade 11–12 learner and their family.",
    "- Use simple Markdown headings and bullets.",
  ];

  if (plan === "premium") {
    return [
      ...shared,
      "",
      "Produce a full guidance report with these sections:",
      "## Where you stand",
      "Reflect their APS and strongest subjects in one short paragraph.",
      "## Courses that fit you",
      "4–6 specific qualifications matched to their interests and marks, each with a one-line 'why it fits' and a rough sense of how their APS compares to typical entry.",
      "## Where to study",
      "Suggest concrete SA institution types/examples for those courses (including a university-of-technology or TVET alternative).",
      "## Paying for it — NSFAS & bursaries",
      "Explain in general terms whether NSFAS is likely relevant, and name 2–3 bursary categories worth chasing (e.g. government department, corporate, sector). Remind them to verify current criteria and deadlines.",
      "## Your next 5 steps",
      "A short, concrete action checklist (applications, supporting documents, deadlines to look up).",
    ].join("\n");
  }

  // Free taste: a real, useful starting point — but clearly lighter than the
  // full premium report.
  return [
    ...shared,
    "",
    "Keep this FREE-tier guidance short:",
    "## Where you stand",
    "One or two sentences on their APS and strengths.",
    "## 3 courses to explore",
    "Three specific qualifications that fit, each with a one-line reason.",
    "## Funding & next step",
    "One or two sentences on whether NSFAS is likely relevant (remind them to verify current criteria), plus a single most-important next step.",
    "Do NOT produce the full multi-section report or a long action plan — keep it to the above.",
  ].join("\n");
}

function buildTask(ctx: {
  aps: number;
  countedSummary: string;
  fieldOfInterest: string;
  interests: string;
}): string {
  const lines = [
    `The learner's estimated APS is ${ctx.aps} (best six subjects, Life Orientation excluded).`,
    `Subjects counted: ${ctx.countedSummary}.`,
  ];
  if (ctx.fieldOfInterest.trim()) lines.push(`Field they're leaning towards: ${ctx.fieldOfInterest.trim()}`);
  if (ctx.interests.trim()) lines.push(`What they enjoy / are good at: ${ctx.interests.trim()}`);
  lines.push("Give them guidance based on this.");
  return lines.join("\n");
}

// GET — current remaining count (no consumption), to seed the page counter.
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  const { plan } = await getSubscription(session.user.id);
  const remaining = await guidanceUsage.getRemaining(session.user.id, plan);
  return NextResponse.json({ remaining, limit: guidanceUsage.dailyLimit(plan), plan });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Please sign in to get guidance." }, { status: 401 });
  }
  const { plan } = await getSubscription(session.user.id);

  const body = await req.json().catch(() => null);
  const rawSubjects = Array.isArray(body?.subjects) ? body.subjects : [];
  const subjects: SubjectMark[] = rawSubjects
    .map((s: unknown) => {
      const o = s as { name?: unknown; percent?: unknown };
      return { name: String(o?.name ?? ""), percent: Number(o?.percent) };
    })
    .filter((s: SubjectMark) => s.name.trim() && Number.isFinite(s.percent));

  if (subjects.length < 4) {
    return NextResponse.json(
      { error: "Please enter marks for at least four subjects." },
      { status: 400 }
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "Guidance isn't configured yet. Please try again later." },
      { status: 503 }
    );
  }

  // Server-side daily limit — checked and consumed before any paid API call.
  const { allowed, remaining } = await guidanceUsage.consume(session.user.id, plan);
  if (!allowed) {
    return NextResponse.json(
      { error: "You've used your guidance reports for today.", remaining: 0 },
      { status: 429 }
    );
  }

  // Recompute APS server-side — never trust a client-supplied score.
  const { aps, countedSubjects } = computeAps(subjects);
  const countedSummary = countedSubjects
    .map((s) => `${s.name} ${s.percent}% (level ${s.level})`)
    .join(", ");

  const system = buildSystem(plan);
  const task = buildTask({
    aps,
    countedSummary,
    fieldOfInterest: String(body.fieldOfInterest ?? "").slice(0, MAX_TEXT),
    interests: String(body.interests ?? "").slice(0, MAX_TEXT),
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      // Lead with the computed APS so the learner sees it even before the model
      // streams — and so the deterministic figure is always correct.
      controller.enqueue(encoder.encode(`**Your estimated APS: ${aps} / 42**\n\n`));
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
          feature: `guidance_${plan}`,
          model,
          usage: finalMessage.usage,
        });
      } catch (err) {
        console.error("guidance stream failed:", err);
        controller.enqueue(
          encoder.encode("\n\n⚠️ Sorry — Nexi couldn't generate guidance right now. Please try again in a moment.")
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
      "X-Guidance-Remaining": String(remaining),
    },
  });
}
