"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// Drives the upgrade flow:
//  - logged out → bounce to login, then back here to subscribe
//  - logged in  → fetch signed PayFast fields and POST a form to PayFast
//
// `className` lets each call site keep its own button styling.
export default function SubscribeButton({
  className,
  children,
  callbackUrl = "/pricing",
}: {
  className?: string;
  children: React.ReactNode;
  callbackUrl?: string;
}) {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setError(null);

    if (status !== "authenticated") {
      router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/payfast/checkout", { method: "POST" });
      const body = await res.json();
      if (!res.ok) {
        setError(body.error ?? "Couldn't start checkout. Please try again.");
        setLoading(false);
        return;
      }

      // Build a hidden form and submit it to PayFast (handles the redirect).
      const form = document.createElement("form");
      form.method = "POST";
      form.action = body.processUrl;
      for (const [key, value] of Object.entries(body.fields as Record<string, string>)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      }
      document.body.appendChild(form);
      form.submit();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleClick}
        disabled={loading}
        className={className}
        aria-busy={loading}
      >
        {loading ? "Redirecting to PayFast…" : children}
      </button>
      {error && <p className="text-xs text-red-400 text-center">{error}</p>}
    </div>
  );
}
