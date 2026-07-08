"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";

// Top-level links kept deliberately short. The four learning tools live in a
// "Study Tools" dropdown so the bar doesn't sprawl; About Us & Contact live in
// the footer.
const PRIMARY_LINKS = [{ label: "Home", href: "/" }];
const TOOL_LINKS = [
  { label: "Study Pro", href: "/studypro" },
  { label: "Nexi Tutor", href: "/nexi-tutor" },
  { label: "Mark Answer", href: "/mark" },
  { label: "Past Papers", href: "/past-papers" },
];
const END_LINKS = [{ label: "Pricing", href: "/pricing" }];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const toolsRef = useRef<HTMLDivElement>(null);

  // Solid navy bar once the page moves; transparent over the dark hero at the
  // top. No backdrop-filter (too costly on low-spec GPUs).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close both menus on navigation.
  useEffect(() => {
    setMenuOpen(false);
    setToolsOpen(false);
  }, [pathname]);

  // Close the tools dropdown on outside click or Escape.
  useEffect(() => {
    if (!toolsOpen) return;
    const onDown = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) setToolsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setToolsOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [toolsOpen]);

  const solid = scrolled || menuOpen;
  const onTool = TOOL_LINKS.some((l) => pathname === l.href);

  const linkCls = (active: boolean) =>
    `nav-link px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      active ? "text-white nav-active" : "text-white/70 hover:text-white"
    }`;

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
          <Link href="/" className="flex items-center flex-shrink-0" aria-label="NexiStudy home">
            <Image
              src="/images/nexi-logo-new.png"
              alt="NexiStudy"
              width={150}
              height={50}
              priority
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {PRIMARY_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={linkCls(pathname === link.href)}>
                {link.label}
              </Link>
            ))}

            {/* Study Tools dropdown */}
            <div className="relative" ref={toolsRef}>
              <button
                onClick={() => setToolsOpen((o) => !o)}
                aria-haspopup="true"
                aria-expanded={toolsOpen}
                className={`${linkCls(onTool)} inline-flex items-center gap-1 cursor-pointer`}
              >
                Study Tools
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${toolsOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {toolsOpen && (
                <div
                  role="menu"
                  className="absolute left-0 mt-2 w-48 rounded-xl border border-white/10 bg-[#0A1628] shadow-[0_12px_30px_rgba(0,0,0,0.45)] py-2"
                >
                  {TOOL_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      role="menuitem"
                      className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                        pathname === link.href
                          ? "text-white bg-[#2D6BE4]/25"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {END_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={linkCls(pathname === link.href)}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-2">
            {!loading && session ? (
              <>
                <Link
                  href="/account"
                  className="hidden lg:flex flex-col items-end leading-tight mr-2 group"
                  title="Account"
                >
                  <span className="text-sm font-semibold text-white truncate max-w-[180px] group-hover:text-[#00D4FF] transition-colors">
                    {session.user?.name}
                  </span>
                  <span className="text-xs text-white/45 truncate max-w-[180px]">
                    {session.user?.email}
                  </span>
                </Link>
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
                <Link
                  href="/account"
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    pathname === "/account"
                      ? "text-white bg-[#2D6BE4]/25"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Account
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
            aria-expanded={menuOpen}
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
            {PRIMARY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href ? "text-white bg-[#2D6BE4]/25" : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Study Tools group */}
            <p className="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-white/35">
              Study Tools
            </p>
            {TOOL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href ? "text-white bg-[#2D6BE4]/25" : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="h-px bg-white/10 my-2" />
            {END_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href ? "text-white bg-[#2D6BE4]/25" : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <hr className="border-white/10 my-2" />
            {session ? (
              <>
                <div className="px-3 py-2">
                  <p className="text-sm font-semibold text-white truncate">{session.user?.name}</p>
                  <p className="text-xs text-white/45 truncate">{session.user?.email}</p>
                </div>
                <hr className="border-white/10 my-1" />
                <Link href="/dashboard" className="px-3 py-2.5 text-sm text-white/70 hover:text-white">Dashboard</Link>
                <Link href="/account" className="px-3 py-2.5 text-sm text-white/70 hover:text-white">Account</Link>
                <button onClick={() => signOut({ callbackUrl: "/" })} className="px-3 py-2.5 text-sm text-left text-white/70 hover:text-white cursor-pointer">Log Out</button>
              </>
            ) : (
              <>
                <Link href="/login" className="px-3 py-2.5 text-sm text-white/70 hover:text-white">Login</Link>
                <Link href="/signup" className="px-3 py-2.5 text-sm text-center text-white bg-[#2D6BE4] hover:bg-[#4A82F0] rounded-lg">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
