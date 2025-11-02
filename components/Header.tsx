"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/training", label: "Training" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  }

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 no-underline">
          <Image
            src="/assets/ripotek_favicon.svg"
            alt="Ripotek logo"
            width={32}
            height={32}
            priority
            className="rounded-lg shadow-sm"
          />
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Ripo<span className="bg-gradient-to-r from-sky-400 to-teal-300 bg-clip-text text-transparent">tek</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors no-underline ${
                isActive(item.href)
                  ? "text-slate-900 bg-slate-100"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="ml-2 inline-flex items-center justify-center px-4 py-2 rounded-xl font-semibold text-white bg-gradient-to-br from-teal-600 to-sky-500 shadow hover:brightness-105"
          >
            Book a discovery call
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border text-slate-700"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-2">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 rounded-lg no-underline ${
                  isActive(item.href)
                    ? "text-slate-900 bg-slate-100"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-xl font-semibold text-white bg-gradient-to-br from-teal-600 to-sky-500 shadow"
            >
              Book a discovery call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
