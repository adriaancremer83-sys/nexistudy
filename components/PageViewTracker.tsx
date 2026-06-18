"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Fires a lightweight page-view beacon on each route change. Deliberately skips
// localhost (so local dev doesn't pollute live numbers) and /admin (so the
// owner's own visits aren't counted).
export default function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") return;

    let visitor = "";
    try {
      visitor = localStorage.getItem("nexi_vid") ?? "";
      if (!visitor) {
        visitor = crypto.randomUUID();
        localStorage.setItem("nexi_vid", visitor);
      }
    } catch {
      /* storage blocked — still count the view, just without a visitor id */
    }

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, visitor }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
