import Link from "next/link";
import { BracketLabel } from "@/components/bracket-label";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-start px-4 py-24">
      <BracketLabel>Error 404</BracketLabel>
      <h1 className="mt-4 font-display text-6xl font-extrabold tracking-tight">
        Lost the signal.
      </h1>
      <p className="mt-3 max-w-md text-[14px] leading-relaxed text-muted">
        This page doesn&apos;t exist — or the free tier behind it expired. Head
        back and find a working one.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-xl border border-ink bg-ink px-5 py-3 font-mono text-[12px] uppercase tracking-wider text-paper shadow-sm transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
        >
          ← Home
        </Link>
        <Link
          href="/providers"
          className="rounded-xl border border-line bg-paper px-5 py-3 font-mono text-[12px] uppercase tracking-wider shadow-sm transition-colors hover:border-concrete"
        >
          Browse providers →
        </Link>
      </div>
    </div>
  );
}
