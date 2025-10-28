"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

  return (
    <header className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand: icon + RIPOTEK*/}
        <Link href="/" className="flex items-center gap-3 no-underline">
          <Image
            src="/assets/ripotek_logo.png"
            alt="Ripotek logo"
            width={90}
            height={90}
            className="w-auto h-25"
            priority
          />
          <span className="text-xl font-extrabold tracking-wide text-slate-900">
            RIPOTEK
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
          {/* Primary CTA example */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl font-semibold text-white bg-gradient-to-br from-[#7b34ff] to-[#142a66]"
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
          {/* hamburger */}
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
                className="py-2 text-slate-700 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-xl font-semibold text-white bg-gradient-to-br from-[#7b34ff] to-[#142a66]"
            >
              Book a discovery call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
