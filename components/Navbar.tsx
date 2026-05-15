"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Study Pro", href: "/studypro" },
  { label: "Nexi Tutor", href: "/nexi-tutor" },
  { label: "Pricing", href: "/pricing" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#1B2A4A] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-white font-bold text-xl tracking-tight">
              Nexi<span className="text-[#2D6BE4]">Study</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-white bg-[#2D6BE4]/20 border-b-2 border-[#2D6BE4]"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop action buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 text-sm font-medium text-white bg-[#2D6BE4] hover:bg-[#2558C5] rounded-lg transition-colors"
            >
              Sign Up
            </Link>
            <Link
              href="/profile"
              className="px-4 py-2 text-sm font-medium text-[#2D6BE4] border border-[#2D6BE4] hover:bg-[#2D6BE4] hover:text-white rounded-lg transition-colors"
            >
              My Profile
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-gray-300 hover:text-white p-2 rounded-md"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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
        <div className="md:hidden bg-[#121D33] border-t border-white/10 px-4 pb-4">
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-white bg-[#2D6BE4]/20"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-white/10 my-2" />
            <Link href="/login" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-sm text-gray-300 hover:text-white">Login</Link>
            <Link href="/signup" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-sm text-center text-white bg-[#2D6BE4] hover:bg-[#2558C5] rounded-lg">Sign Up</Link>
            <Link href="/profile" onClick={() => setMenuOpen(false)} className="px-3 py-2 text-sm text-center text-[#2D6BE4] border border-[#2D6BE4] rounded-lg hover:bg-[#2D6BE4] hover:text-white">My Profile</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
