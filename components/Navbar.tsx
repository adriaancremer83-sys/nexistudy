"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Study Pro", href: "/studypro" },
  { label: "Nexi Tutor", href: "/nexi-tutor" },
  { label: "Past Papers", href: "/past-papers" },
  { label: "Pricing", href: "/pricing" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();
  const loading = status === "loading";

  // Solid navy bar once the page moves; transparent over the dark hero at the
  // top. No backdrop-filter (too costly on low-spec GPUs), so we swap to an
  // opaque background instead of relying on blur.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The bar is opaque when scrolled OR when the mobile menu is open, so page
  // content never shows through.
  const solid = scrolled || menuOpen;

  return (
    <nav
      className={`sticky top-0 z-50 border-x-0 border-t-0 transition-[background-color,border-color,box-shadow] duration-300 ${
        solid
          ? "bg-[#0A1628] border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
          : "bg-[#050D1A] border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-white font-bold text-xl tracking-tight">
              Nexi<span className="text-[#00D4FF]">Study</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-white nav-active"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-2">
            {!loading && session ? (
              <>
                <Link
                  href="/dashboard"
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    pathname === "/dashboard"
                      ? "text-white bg-[#2D6BE4]/25"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white border border-white/15 hover:border-[#00D4FF]/50 rounded-lg transition-colors cursor-pointer"
                >
                  Log Out
                </button>
              </>
            ) : !loading ? (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#2D6BE4] hover:bg-[#4A82F0] rounded-lg transition-all shadow-lg shadow-[#2D6BE4]/30 hover:shadow-[#00D4FF]/30"
                >
                  Sign Up
                </Link>
              </>
            ) : null}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white/70 hover:text-white p-2 rounded-md cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A1628] border-t border-white/10 px-4 pb-4">
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-white bg-[#2D6BE4]/25"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-white/10 my-2" />
            {session ? (
              <>
                <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-sm text-white/70 hover:text-white">Dashboard</Link>
                <button onClick={() => signOut({ callbackUrl: "/" })} className="px-3 py-2 text-sm text-left text-white/70 hover:text-white cursor-pointer">Log Out</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-sm text-white/70 hover:text-white">Login</Link>
                <Link href="/signup" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-sm text-center text-white bg-[#2D6BE4] hover:bg-[#4A82F0] rounded-lg">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
