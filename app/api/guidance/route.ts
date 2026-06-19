import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import Anthropic from "@anthropic-ai/sdk";
import { authOptions } from "@/lib/auth";
import { guidanceUsage } from "@/lib/guidanceUsage";
import { logApiUsage } from "@/lib/apiUsage";
import { getSubscription } from "@/lib/users";
import { computeAps, type SubjectMark } from "@/lib/aps";

// Funding & Career Advice (lives inside Study Pro): a South African school-leaver
// guidance counsellor. Study Pro already does the deterministic work — APS, which
// universities/courses the learner qualifies for, focus subjects — so this layer
// deliberately does NOT repeat that. It adds what Study Pro can't: funding
// (NSFAS/bursaries), a personalised career direction from marks + interests, and a
// concrete action plan. Cost controls mirror the tutor route.
const MODEL = {
  free: "claude-sonnet-4-6",
  premium: "claude-opus-4-8",
} as const;
const MAX_OUTPUT_TOKENS = { free: 900, premium: 2400 } as const;
const MAX_TEXT = 600;

function buildSystem(plan: "free" | "premium"): string {
  const shared = [
    "You are Nexi, a knowledgeable, encouraging South African school-leaver guidance counsellor. You sit inside NexiStudy's Study Pro tool.",
    "",
    "IMPORTANT — what NOT to do: Study Pro ALREADY shows the learner their APS score and a list of exactly which universities, degrees, diplomas and certificates they qualify for. Do NOT recompute the APS, do NOT produce a 'you qualify / you don't qualify' list, and do NOT rank specific universities by entry score — that's already on their screen. Your job is the part Study Pro can't do.",
    "",
    "Focus on three things only:",
    "1. FUNDING — NSFAS and bursaries (Study Pro says nothing about paying for study).",
    "2. CAREER DIRECTION — connect their marks + what they enjoy to fields and the KINDS of careers/qualifications that fit, with the reasoning. Not an admissions table — a sense of direction.",
    "3. A concrete ACTION PLAN.",
    "",
    "Ground rules:",
    "- Be specific to the South African post-school landscape: universities, universities of technology, TVET colleges, learnerships, SETA programmes.",
    "- Be honest but encouraging — always give a viable path, including bridging/foundation or TVET routes.",
    "- Funding: NSFAS income thresholds, bursary criteria and application DEADLINES change every year. Give the general picture, but explicitly tell the learner to verify the current year's thresholds and dates on the official sites (nsfas.org.za and each provider). Never state a specific threshold figure or date as if it were current and certain.",
    "- Warm, plain-language tone for a Grade 11–12 learner and their family. Simple Markdown headings and bullets.",
  ];

  if (plan === "premium") {
    return [
      ...shared,
      "",
      "Produce a full advice report with these sections (and ONLY these):",
      "## Career directions that fit you",
      "2–4 directions linking their strongest subjects and interests to fields and the kinds of careers/qualifications worth exploring, each with a short 'why this fits you'. Direction and reasoning — not an entry-requirements table.",
      "## Paying for it — NSFAS & bursaries",
      "Explain in general terms whether NSFAS is likely relevant and how it works, then name 2–3 bursary categories worth chasing (e.g. government department, corporate, sector/SETA). Remind them to verify current criteria and deadlines on the official sites.",
      "## Your next 5 steps",
      "A concrete action checklist — applications, supporting documents, funding deadlines to look up, people to talk to.",
    ].join("\n");
  }

  // Free taste: a real, useful starting point — clearly lighter than premium.
  return [
    ...shared,
    "",
    "Keep this FREE-tier advice short — ONLY these two sections:",
    "## Your direction",
    "One or two sentences linking their strengths and interests to a field worth exploring.",
    "## Funding & next step",
    "One or two sentences on whether NSFAS is likely relevant (remind them to verify current criteria), plus the single most important next step.",
    "Do NOT produce the full report, career list, or a long action plan — keep it to the above.",
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
      // No APS echo here — Study Pro already shows the APS ring on the same
      // screen. The figure is still passed to the model for context.
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
