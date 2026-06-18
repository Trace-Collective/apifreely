import type { Metadata } from "next";
import Link from "next/link";
import { providers } from "@/data/providers";
import { ProviderLogo } from "@/components/logos";
import { BracketLabel } from "@/components/bracket-label";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export const metadata: Metadata = {
  title: "Community — apifreely",
  description: "Community-sourced free API tiers and promo drops. Verify before use.",
};

export default function CommunityPage() {
  const tips = providers
    .filter((p) => p.source.type === "community" || p.category === "promo")
    .sort((a, b) => b.added.localeCompare(a.added));

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Reveal className="border-b border-line pb-5">
        <BracketLabel>Community</BracketLabel>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
          Community tips.
        </h1>
        <p className="mt-2 max-w-2xl text-[14px] text-muted">
          Free tiers and promo drops surfaced by the community. These are
          unverified by us and often time-limited — always check the source and
          expiry before you rely on one.
        </p>
      </Reveal>

      <Stagger className="mt-6 space-y-3">
        {tips.map((p) => (
          <StaggerItem key={p.id}>
            <div className="rounded-2xl border border-line bg-paper p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <ProviderLogo id={p.id} className="h-11 w-11 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg font-bold">{p.name}</h3>
                    <span className="rounded-md border border-line px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-accent">
                      {p.category}
                    </span>
                    {p.expires && (
                      <span className="rounded-md border border-warn/40 bg-warn/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-warn">
                        expires {p.expires}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                    {p.freeDetails}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line-soft pt-3 font-mono text-[10px] uppercase tracking-wider">
                <a
                  href={p.source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Source ↗
                </a>
                <Link href={`/providers/${p.id}`} className="text-muted hover:text-ink">
                  Details →
                </Link>
                <span className="ml-auto text-muted/70">★ verify before use</span>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-6 flex flex-col items-start gap-3 rounded-2xl border border-line bg-paper p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-base font-bold">Spotted a free API on X?</p>
          <p className="text-[12px] text-muted">
            Drop the link — it goes into the moderation queue.
          </p>
        </div>
        <Link
          href="/submit"
          className="shrink-0 rounded-lg bg-accent px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-accent-ink transition-colors hover:bg-ink"
        >
          Submit a tip →
        </Link>
      </div>
    </div>
  );
}
