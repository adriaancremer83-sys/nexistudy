import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { getSubscription } from "@/lib/users";
import SubscribeButton from "@/components/SubscribeButton";
import ManageSubscription from "@/components/ManageSubscription";
import { IconStar } from "@/components/icons";

export const dynamic = "force-dynamic";

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "—";
  }
}

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login?callbackUrl=/account");

  // Read live state from the DB — the session JWT may lag right after an upgrade.
  const sub = await getSubscription(session.user.id);
  const isPremium = sub.plan === "premium";

  return (
    <div className="min-h-screen">
      <section className="page-hero py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#00D4FF] text-sm font-medium mb-1">Account</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            {session.user.name}
          </h1>
          <p className="text-white/40 text-sm mt-1">{session.user.email}</p>
        </div>
      </section>

      <div className="section-divider" />

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        {/* ── SUBSCRIPTION CARD ── */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center gap-2.5 text-[#00D4FF]">
            <IconStar className="w-4 h-4" />
            <h2 className="text-xs font-semibold text-white uppercase tracking-widest">
              Subscription
            </h2>
          </div>

          <div className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-white/50 text-sm">Current plan</span>
              <span
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold border ${
                  isPremium
                    ? "bg-[#2D6BE4]/20 text-[#00D4FF] border-[#00D4FF]/40"
                    : "glass text-white/70"
                }`}
              >
                {isPremium && <IconStar className="w-4 h-4" />}
                {isPremium ? "Premium" : "Free Plan"}
              </span>
            </div>

            {isPremium && (
              <>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Price</span>
                  <span className="text-white font-semibold">R199 / month</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Member since</span>
                  <span className="text-white font-semibold">
                    {formatDate(sub.startedAt)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">Status</span>
                  <span className="text-white font-semibold capitalize">
                    {sub.status === "active" ? "Active — renews monthly" : sub.status}
                  </span>
                </div>
              </>
            )}

            <div className="pt-2">
              {isPremium ? (
                <Suspense fallback={null}>
                  <ManageSubscription plan={sub.plan} status={sub.status} />
                </Suspense>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <p className="text-white/50 text-sm flex-1">
                    Upgrade to unlock unlimited Nexi Tutor chats, the Exam Plan,
                    past-paper walkthroughs and more.
                  </p>
                  <SubscribeButton
                    callbackUrl="/account"
                    className="px-6 py-3 rounded-xl font-bold text-sm bg-[#2D6BE4] hover:bg-[#4A82F0] text-white transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-wait whitespace-nowrap"
                  >
                    Upgrade to Premium
                  </SubscribeButton>
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-white/30">
          Payments are processed securely by PayFast. Questions? Email{" "}
          <a
            href="mailto:support@nexistudy.co.za"
            className="text-[#00D4FF] hover:underline"
          >
            support@nexistudy.co.za
          </a>
          .
        </p>
      </div>
    </div>
  );
}
