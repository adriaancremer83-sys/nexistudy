import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getSubscription } from "@/lib/users";
import PackDownloads from "@/components/PackDownloads";
import { pageMeta } from "@/lib/seo";
import { getActiveProduct, listPackFiles, signPackFiles, MATRIC_PACK_SLUG } from "@/lib/pack";

export const metadata = pageMeta({
  title: "Your Survival Pack",
  description: "The Matric Prelim Survival Pack — included with Nexi Tutor Premium.",
  path: "/pack/premium",
});

// Premium members get the pack included via their subscription status — no
// purchase row involved (see SURVIVAL_PACK.md). The subscription check and
// URL signing both happen server-side.
export const dynamic = "force-dynamic";

export default async function PackPremiumPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect(`/login?callbackUrl=${encodeURIComponent("/pack/premium")}`);

  const { plan } = await getSubscription(session.user.id);
  if (plan !== "premium") redirect("/pack");

  const product = await getActiveProduct(MATRIC_PACK_SLUG);
  const files = product ? await listPackFiles(product.id) : [];
  const signed = await signPackFiles(files);

  return (
    <div className="min-h-screen page-hero">
      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24">
        <span className="inline-block mb-4 px-4 py-1 rounded-full glass text-[#00D4FF] text-sm font-medium tracking-wide uppercase">
          Included with Premium
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Your <span className="text-gradient">Survival Pack</span>
        </h1>
        <p className="text-white/60 mb-10">
          The full Matric Prelim Survival Pack, included with your Nexi Tutor
          Premium subscription. Download in English or Afrikaans below.
        </p>

        <PackDownloads files={signed} />

        <p className="text-white/40 text-sm mt-10">
          Prelims: 29 August. Every mark is a decision.
        </p>
        <Link
          href="/dashboard"
          className="inline-block mt-6 text-[#00D4FF] font-semibold text-sm hover:underline"
        >
          ← Back to dashboard
        </Link>
      </div>
    </div>
  );
}
