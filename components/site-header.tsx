"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ApiMark } from "./logos";
import { Barcode } from "./barcode";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { href: "/providers", label: "Providers" },
  { href: "/setup-guides", label: "Setup Guides" },
  { href: "/generator", label: "Generator" },
  { href: "/status", label: "Status" },
  { href: "/community", label: "Community" },
  { href: "/submit", label: "Submit" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) =>
    href !== "#" && (pathname === href || pathname.startsWith(href + "/"));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* brand */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <ApiMark className="h-8" />
            <span className="leading-none">
              <span className="block font-display text-lg font-bold tracking-tight">
                apifreely
              </span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                Free LLM API Directory
              </span>
            </span>
          </Link>
          <div className="hidden flex-col items-center xl:flex">
            <Barcode seed="AF-2024.10" count={20} className="h-4 text-ink" />
            <span className="mt-0.5 font-mono text-[8px] uppercase tracking-widest text-muted">
              AF-2024.10
            </span>
          </div>
        </div>

        {/* desktop nav */}
        <nav className="hidden items-center gap-5 lg:flex">
          {NAV.map((n, i) => (
            <Link
              key={i}
              href={n.href}
              className={`font-mono text-[11px] uppercase tracking-wider underline-offset-8 transition-colors ${
                isActive(n.href)
                  ? "text-accent underline decoration-accent decoration-2"
                  : "text-muted hover:text-ink"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* right */}
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-ink shadow-sm xl:flex">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <rect x="5" y="11" width="14" height="9" rx="1" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            We never see your API key
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-paper transition-transform active:scale-95"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* dropdown menu */}
      {open && (
        <div className="border-t border-line bg-paper">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {NAV.map((n, i) => (
              <Link
                key={i}
                href={n.href}
                onClick={() => setOpen(false)}
                className="border-b border-line-soft py-2.5 font-mono text-[12px] uppercase tracking-wider text-ink last:border-0 hover:text-accent"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
