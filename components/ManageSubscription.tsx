"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

// Client controls on the account page:
//  - if we arrived from a successful PayFast payment (?upgrade=success), nudge
//    next-auth to re-sync the plan into the session, then refresh the view.
//  - render a Cancel button for active subscriptions.
export default function ManageSubscription({
  plan,
  status,
}: {
  plan: "free" | "premium";
  status: "none" | "active" | "cancelled";
}) {
  const { update } = useSession();
  const router = useRouter();
  const params = useSearchParams();

  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // One-time session refresh after a successful upgrade redirect.
  useEffect(() => {
    if (params.get("upgrade") === "success") {
      update({ refreshSubscription: true }).then(() => router.refresh());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleCancel() {
    if (
      !confirm(
        "Cancel your Premium subscription? You'll keep Premium until the end of " +
          "your current billing month, then move to the Free plan."
      )
    ) {
      return;
    }
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/payfast/cancel", { method: "POST" });
      const body = await res.json();
      if (!res.ok) {
        setError(body.error ?? "Could not cancel. Please try again.");
      } else {
        setMessage(body.message ?? "Your subscription has been cancelled.");
        router.refresh();
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const canCancel = plan === "premium" && status === "active";

  return (
    <div className="space-y-3">
      {message && (
        <p className="text-sm text-emerald-400 bg-emerald-400/10 border border-emerald-400/25 rounded-lg px-4 py-3">
          {message}
        </p>
      )}
      {error && (
        <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/25 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      {canCancel && (
        <button
          onClick={handleCancel}
          disabled={busy}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-red-400/40 text-red-300 hover:bg-red-400/10 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-wait"
        >
          {busy ? "Cancelling…" : "Cancel subscription"}
        </button>
      )}

      {status === "cancelled" && plan === "premium" && (
        <p className="text-sm text-white/50">
          Your subscription is cancelled and won&apos;t renew. You keep Premium
          until your current month ends.
        </p>
      )}
    </div>
  );
}
