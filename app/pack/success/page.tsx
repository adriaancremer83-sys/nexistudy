import Link from "next/link";
import PackDownloads from "@/components/PackDownloads";
import { pageMeta } from "@/lib/seo";
import {
  bumpDownloadCount,
  getPurchaseByToken,
  listPackFiles,
  signPackFiles,
} from "@/lib/pack";

export const metadata = pageMeta({
  title: "Your Survival Pack",
  description: "Download your NexiStudy Matric Prelim Survival Pack.",
  path: "/pack/success",
});

// Token-gated download page. All validation and URL signing happens here on
// the server (service-role) — the client only ever sees short-lived signed
// URLs, never storage paths or Supabase queries.
export const dynamic = "force-dynamic";

export default async function PackSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : "";
  const purchase = token ? await getPurchaseByToken(token) : null;

  // Unknown/missing token → no hints about why, just a clean dead end.
  if (!purchase) {
    return (
      <Shell>
        <h1 className="text-3xl font-bold text-white mb-3">Link not found</h1>
        <p className="text-white/60 mb-8">
          We couldn&apos;t find a purchase for this link. Check the link in your
          delivery email, or contact us if you think this is a mistake.
        </p>
        <Link href="/pack" className="text-[#00D4FF] font-semibold hover:underline">
          Back to the Survival Pack →
        </Link>
      </Shell>
    );
  }

  // PayFast's return redirect usually lands before the ITN is processed.
  if (purchase.status === "pending") {
    return (
      <Shell>
        <span className="inline-block mb-4 px-4 py-1 rounded-full glass text-[#00D4FF] text-sm font-medium tracking-wide uppercase">
          Payment processing
        </span>
        <h1 className="text-3xl font-bold text-white mb-3">Almost there…</h1>
        <p className="text-white/60 mb-8">
          We&apos;re confirming your payment with PayFast. This usually takes
          under a minute — refresh this page shortly. We&apos;ll also email your
          download link to <span className="text-white">{purchase.email}</span>.
        </p>
      </Shell>
    );
  }

  if (purchase.status !== "paid") {
    return (
      <Shell>
        <h1 className="text-3xl font-bold text-white mb-3">Payment not completed</h1>
        <p className="text-white/60 mb-8">
          This payment was {purchase.status === "refunded" ? "refunded" : "not successful"}.
          If you believe this is wrong, contact us and we&apos;ll sort it out.
        </p>
        <Link href="/pack" className="text-[#00D4FF] font-semibold hover:underline">
          Try again →
        </Link>
      </Shell>
    );
  }

  // Paid → fresh signed URLs (1 hour) for every file in the pack.
  const files = await listPackFiles(purchase.product_id);
  const signed = await signPackFiles(files);
  await bumpDownloadCount(purchase);

  return (
    <Shell wide>
      <span className="inline-block mb-4 px-4 py-1 rounded-full glass text-[#00D4FF] text-sm font-medium tracking-wide uppercase">
        Payment confirmed
      </span>
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
        Your <span className="text-gradient">Survival Pack</span> is ready
      </h1>
      <p className="text-white/60 mb-10">
        Thank you! Download your documents below — available in English and
        Afrikaans. A copy of this link was emailed to{" "}
        <span className="text-white">{purchase.email}</span>.
      </p>

      <PackDownloads files={signed} />

      {/* Nexi Tutor upsell */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 mt-12">
        <h2 className="text-xl font-bold text-white mb-2">
          Want Nexi in your corner all the way to the finals?
        </h2>
        <p className="text-white/60 text-sm mb-5">
          Nexi Tutor Premium gives you unlimited AI tutoring, examiner-style
          marking of your handwritten answers, and a day-by-day exam plan — in
          all 11 official languages. Premium members get this pack included.
        </p>
        <Link
          href="/pricing"
          className="inline-block px-6 py-3 rounded-full bg-[#00D4FF] text-[#0a0a1a] font-bold text-sm hover:opacity-90 transition-opacity"
        >
          Explore Nexi Tutor Premium →
        </Link>
      </div>

      <p className="text-white/40 text-sm mt-10">
        Prelims: 29 August. Every mark is a decision.
      </p>
    </Shell>
  );
}

function Shell({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="min-h-screen page-hero">
      <div className={`${wide ? "max-w-2xl" : "max-w-xl"} mx-auto px-4 py-16 sm:py-24`}>
        {children}
      </div>
    </div>
  );
}
