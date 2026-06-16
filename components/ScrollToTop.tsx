"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Next keeps scroll position on some client transitions; this resets every
// route change to the top so pages always open at the hero, not mid-scroll.
export default function ScrollToTop() {
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
