import type { Metadata } from "next";
import Link from "next/link";
import { providers } from "@/data/providers";
import { ProviderLogo } from "@/components/logos";
import { StatusPill } from "@/components/status-pill";
import { BracketLabel } from "@/components/bracket-label";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export const metadata: Metadata = {
  title: "Status — apifreely",
  description: "Health overview of every free LLM API in the directory.",
};

function Stat({ n, label, color }: { n: number; label: string; color: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      <span className="font-display text-2xl font-extrabold tabular-nums">{n}</span>
      <span className="font-mono text-[10px] uppercase leading-tight tracking-wider text-muted">
        {label}
      </span>
    </div>
  );
}

export default function StatusPage() {
  const alive = providers.filter((p) => p.status === "alive").length;
  const expired = providers.filter((p) => p.status === "expired").length;
  const unknown = providers.filter((p) => p.status === "unknown").length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Reveal className="border-b border-line pb-5">
        <BracketLabel>Status</BracketLabel>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
          Provider status.
        </h1>
        <p className="mt-2 max-w-2xl text-[14px] text-muted">
          Health overview for every provider in the directory. This is a curated
          snapshot — always verify a free tier or promo before relying on it.
        </p>
        <div className="mt-5 flex flex-wrap gap-6">
          <Stat n={alive} label="Alive" color="bg-alive" />
          <Stat n={unknown} label="Verifying" color="bg-concrete" />
          <Stat n={expired} label="Expired" color="bg-warn" />
        </div>
      </Reveal>

      <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-paper shadow-sm">
        <div className="hidden grid-cols-[1fr_110px_120px_130px_90px] gap-3 border-b border-line px-4 py-2.5 font-mono text-[10px] uppercase tracking-wider text-muted md:grid">
          <span>Provider</span>
          <span>Status</span>
          <span>Category</span>
          <span>Rate limit</span>
          <span className="text-right">Added</span>
        </div>
        <Stagger>
          {providers.map((p) => (
            <StaggerItem key={p.id}>
              <Link
                href={`/providers/${p.id}`}
                className="grid grid-cols-1 items-center gap-3 border-t border-line-soft px-4 py-3 transition-colors first:border-0 hover:bg-bg md:grid-cols-[1fr_110px_120px_130px_90px]"
              >
                <span className="flex items-center gap-3">
                  <ProviderLogo id={p.id} className="h-9 w-9 shrink-0" />
                  <span className="min-w-0">
                    <span className="block truncate font-display text-[14px] font-bold">
                      {p.name}
                    </span>
                    <span className="block truncate text-[11px] text-muted">{p.tagline}</span>
                  </span>
                </span>
                <span><StatusPill status={p.status} /></span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  {p.category}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider">
                  {p.rateShort}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted md:text-right">
                  {p.added}
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  );
}
