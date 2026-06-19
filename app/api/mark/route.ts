import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import Anthropic from "@anthropic-ai/sdk";
import { authOptions } from "@/lib/auth";
import { markingUsage } from "@/lib/markingUsage";
import { logApiUsage } from "@/lib/apiUsage";
import { getSubscription } from "@/lib/users";

// "Mark My Answer": a learner photographs a handwritten answer and Nexi marks it
// like an NSC examiner. Cost controls mirror the tutor route:
//  - model per plan (Sonnet free / Opus premium)
//  - premium runs adaptive thinking for accurate mark allocation
//  - hard output cap, and an image-size cap to bound input tokens
const MODEL = {
  free: "claude-sonnet-4-6",
  premium: "claude-opus-4-8",
} as const;
const MAX_OUTPUT_TOKENS = { free: 800, premium: 2200 } as const;

// Anthropic caps images at ~5MB. Base64 inflates ~33%, so cap the encoded string
// a little under the equivalent to reject oversized uploads before the API call.
const MAX_IMAGE_BASE64_CHARS = 7_000_000; // ~5.2MB decoded
const ALLOWED_MEDIA = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_TEXT = 800;

function buildSystem(plan: "free" | "premium"): string {
  const shared = [
    "You are Nexi, a fair, encouraging South African NSC (CAPS) examiner marking a learner's handwritten answer from a photo.",
    "",
    "Marking rules:",
    "- Mark to South African NSC/CAPS standards and mark-allocation conventions for the given subject and grade.",
    "- Award METHOD marks: in Maths/Sciences/Accounting, credit correct steps (substitution, formula, working) even if the final answer is wrong.",
    "- Be specific about exactly where marks were earned and where they were lost, referencing what the learner actually wrote.",
    "- If the photo is unclear or cut off, say so and mark only what you can read — never invent what isn't visible.",
    "- Be warm and constructive: the goal is to help the learner earn more marks next time.",
    "- Use plain text and simple Markdown headings/bullets. Avoid heavy LaTeX; keep symbols and formulas readable.",
  ];

  if (plan === "premium") {
    return [
      ...shared,
      "",
      "Produce a thorough examiner report with these sections:",
      "## Mark awarded",
      "Give an estimated mark out of the total (state the total you assumed if none was given).",
      "## Mark-by-mark breakdown",
      "Walk through the mark allocation: which marks were earned and the specific reason each lost mark was lost.",
      "## Model answer",
      "Show the full marks-earning answer the way an examiner expects to see it.",
      "## How to earn the marks next time",
      "2–4 concrete, exam-technique tips specific to this question.",
    ].join("\n");
  }

  // Free taste: genuinely useful, but a clear notch below the premium report —
  // an overall estimate and the two highest-impact tips, no full breakdown or
  // model answer.
  return [
    ...shared,
    "",
    "Keep this FREE-tier marking short and high-level:",
    "## Mark estimate",
    "An estimated mark out of the total (state the total you assumed if none was given) and one sentence on the overall quality.",
    "## Top 2 things to fix",
    "The two highest-impact improvements, each one or two sentences.",
    "Do NOT give a full mark-by-mark breakdown or a complete model answer — keep it to the above.",
  ].join("\n");
}

function buildTask(ctx: {
  subject: string;
  grade: string;
  questionText: string;
  totalMarks: string;
}): string {
  const lines = [
    "Mark the answer in the attached photo.",
    `Subject: ${ctx.subject}`,
    `Grade: ${ctx.grade}`,
  ];
  if (ctx.questionText.trim()) lines.push(`Question: ${ctx.questionText.trim()}`);
  if (ctx.totalMarks.trim()) lines.push(`Total marks for this question: ${ctx.totalMarks.trim()}`);
  else lines.push("Total marks: not given — infer a sensible total and state it.");
  return lines.join("\n");
}

// GET — current remaining count (no consumption), to seed the page counter.
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  const { plan } = await getSubscription(session.user.id);
  const remaining = await markingUsage.getRemaining(session.user.id, plan);
  return NextResponse.json({ remaining, limit: markingUsage.dailyLimit(plan), plan });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Please sign in to use Mark My Answer." }, { status: 401 });
  }
  // Live plan from the DB, not the session JWT — a just-upgraded learner must get
  // premium marking immediately.
  const { plan } = await getSubscription(session.user.id);

  const body = await req.json().catch(() => null);
  const image = body?.image;
  if (!image?.data || typeof image.data !== "string" || !ALLOWED_MEDIA.has(image.mediaType)) {
    return NextResponse.json(
      { error: "Please attach a clear photo (JPG, PNG or WebP) of your answer." },
      { status: 400 }
    );
  }
  if (image.data.length > MAX_IMAGE_BASE64_CHARS) {
    return NextResponse.json(
      { error: "That image is too large. Please use a photo under ~5MB." },
      { status: 413 }
    );
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "Mark My Answer isn't configured yet. Please try again later." },
      { status: 503 }
    );
  }

  // Server-side daily limit — checked and consumed before any paid API call.
  const { allowed, remaining } = await markingUsage.consume(session.user.id, plan);
  if (!allowed) {
    return NextResponse.json(
      { error: "You've used your markings for today.", remaining: 0 },
      { status: 429 }
    );
  }

  const system = buildSystem(plan);
  const task = buildTask({
    subject: String(body.subject ?? "Mathematics"),
    grade: String(body.grade ?? "Grade 12"),
    questionText: String(body.questionText ?? "").slice(0, MAX_TEXT),
    totalMarks: String(body.totalMarks ?? "").slice(0, 12),
  });

  const userContent: Anthropic.ContentBlockParam[] = [
    {
      type: "image",
      source: { type: "base64", media_type: image.mediaType, data: image.data },
    },
    { type: "text", text: task },
  ];

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
          // Premium leans on adaptive thinking so the mark allocation is reasoned
          // through carefully — that accuracy is the whole point of the feature.
          ...(plan === "premium" ? { thinking: { type: "adaptive" as const } } : {}),
          messages: [{ role: "user", content: userContent }],
        });
        claude.on("text", (delta) => controller.enqueue(encoder.encode(delta)));
        const finalMessage = await claude.finalMessage();
        await logApiUsage({
          userId: session.user.id,
          feature: `marking_${plan}`,
          model,
          usage: finalMessage.usage,
        });
      } catch (err) {
        console.error("marking stream failed:", err);
        controller.enqueue(
          encoder.encode("\n\n⚠️ Sorry — Nexi couldn't mark that one. Please try again in a moment.")
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
      "X-Markings-Remaining": String(remaining),
    },
  });
}
