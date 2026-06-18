import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase";
import { todaysSpendUsd } from "@/lib/apiUsage";
import { getViewStats } from "@/lib/analytics";
import AdminReviews from "@/components/AdminReviews";

export const dynamic = "force-dynamic";

// Lightweight, single-glance ops view. Gated to the owner account only
// (ADMIN_EMAIL). Anyone else gets a 404 — the page doesn't advertise itself.

interface SignupCounts {
  free: number;
  premium: number;
  total: number;
}

async function signupsSince(iso: string): Promise<SignupCounts> {
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("plan")
    .gte("created_at", iso);
  if (error) {
    console.error("signupsSince failed:", error.message);
    return { free: 0, premium: 0, total: 0 };
  }
  const rows = data ?? [];
  const premium = rows.filter((r) => r.plan === "premium").length;
  return { free: rows.length - premium, premium, total: rows.length };
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0E1F3D] px-5 py-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">
        {label}
      </p>
      <p className="text-3xl font-extrabold text-white">{value}</p>
      {sub && <p className="text-xs text-white/40 mt-1">{sub}</p>}
    </div>
  );
}

export default async function AdminOverviewPage() {
  const session = await getServerSession(authOptions);
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();

  // Stealth gate: unauthorised → 404, not a redirect that hints the page exists.
  if (
    !adminEmail ||
    !session?.user?.email ||
    session.user.email.toLowerCase() !== adminEmail
  ) {
    notFound();
  }

  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [today, week, spend, views] = await Promise.all([
    signupsSince(startOfDay.toISOString()),
    signupsSince(weekAgo.toISOString()),
    todaysSpendUsd(),
    getViewStats(),
  ]);

  return (
    <div className="min-h-screen">
      <section className="page-hero py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#00D4FF] text-sm font-medium mb-1">Admin</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Overview</h1>
          <p className="text-white/40 text-sm mt-1">
            Today is {startOfDay.toLocaleDateString("en-ZA", { dateStyle: "full" })} (UTC)
          </p>
        </div>
      </section>

      <div className="section-divider" />

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <div>
          <h2 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">
            Website views
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Stat label="Today" value={views.today.toLocaleString("en-ZA")} />
            <Stat label="Last 7 days" value={views.week.toLocaleString("en-ZA")} />
            <Stat
              label="Unique visitors"
              value={views.uniqueWeek.toLocaleString("en-ZA")}
              sub="last 7 days"
            />
            <Stat label="All time" value={views.total.toLocaleString("en-ZA")} />
          </div>
          {views.topPages.length > 0 && (
            <div className="mt-4 rounded-xl border border-white/[0.08] bg-[#0E1F3D] px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">
                Top pages — last 7 days
              </p>
              <ul className="space-y-2">
                {views.topPages.map((p) => (
                  <li key={p.path} className="flex items-center justify-between text-sm">
                    <span className="text-white/70 truncate mr-4">{p.path}</span>
                    <span className="text-white font-bold tabular-nums flex-shrink-0">
                      {p.views.toLocaleString("en-ZA")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="text-[11px] text-white/30 mt-2">
            Counts public page views (excludes /admin and local dev). Bot traffic
            isn&apos;t filtered, so treat as a trend, not a billing-grade figure.
          </p>
        </div>

        <div>
          <h2 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">
            Signups — Today
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <Stat label="Total today" value={String(today.total)} />
            <Stat label="Free" value={String(today.free)} />
            <Stat label="Premium" value={String(today.premium)} sub="paying" />
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">
            Signups — Last 7 days
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <Stat label="Total this week" value={String(week.total)} />
            <Stat label="Free" value={String(week.free)} />
            <Stat label="Premium" value={String(week.premium)} sub="paying" />
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">
            Anthropic API spend — Today
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Stat
              label="Approx. spend (USD)"
              value={`$${spend.toFixed(2)}`}
              sub="sum of logged token cost"
            />
            <Stat
              label="Approx. spend (ZAR)"
              value={`R${(spend * 18.5).toFixed(2)}`}
              sub="@ ~R18.5/USD, indicative"
            />
          </div>
        </div>

        <p className="text-xs text-white/30">
          Spend is computed from tokens logged per Claude call (Haiku for free,
          Sonnet for premium). It reflects tutor usage recorded in{" "}
          <code className="text-white/50">api_usage</code> and is indicative, not a
          billing figure.
        </p>

        <div>
          <h2 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">
            Student reviews — moderation
          </h2>
          <AdminReviews />
        </div>
      </div>
    </div>
  );
}
