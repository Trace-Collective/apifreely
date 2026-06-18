import Link from "next/link";
import { providers } from "@/data/providers";
import { agents } from "@/data/agents";
import { ProviderCard } from "@/components/provider-card";
import { BracketLabel } from "@/components/bracket-label";
import { HeroCodePanel } from "@/components/hero-code-panel";
import { HeroSearch } from "@/components/hero-search";
import { AsciiArt } from "@/components/ascii-art";
import { AgentStrip } from "@/components/agent-strip";
import { StatsBar } from "@/components/stats-bar";
import { Appear, Reveal, Stagger, StaggerItem } from "@/components/motion";

const STEPS = [
  {
    n: "01",
    title: "Pick a provider",
    body: "Browse free & free-tier LLM APIs. Each card shows what's free, the endpoint, models, and a live status badge.",
  },
  {
    n: "02",
    title: "Generate setup",
    body: "Get a copy-paste config for your tool (Cline, Cursor, LibreChat…) or a prompt your agent can run to configure itself.",
  },
  {
    n: "03",
    title: "Paste your own key",
    body: "You add the API key in your own environment. apifreely never stores or sees it — the generator runs in your browser.",
  },
];

export default function Home() {
  const featured = providers.slice(0, 4);
  const totalModels = providers.reduce((s, p) => s + p.models.length, 0);

  return (
    <>
      {/* HERO — cream, 3-zone */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_140px_400px]">
            {/* left: copy + search */}
            <div>
              <Appear delay={0.05}>
                <BracketLabel>
                  100% free to use. <span className="text-accent">Always.</span>
                </BracketLabel>
              </Appear>
              <Appear delay={0.12}>
                <h1 className="mt-4 font-display font-[800] leading-[0.9] tracking-[-0.02em]">
                  <span className="block text-5xl sm:text-6xl">FREE LLM APIS,</span>
                  <span className="block text-5xl sm:text-6xl">READY IN</span>
                  <span className="mt-1 block text-6xl font-[900] text-accent sm:text-7xl">
                    30 SECONDS.
                  </span>
                </h1>
              </Appear>
              <Appear delay={0.2}>
                <p className="mt-6 max-w-md text-[14px] leading-relaxed text-muted">
                  Find working free-tier APIs, get setup guides for your favorite
                  agents, and let your agent configure itself.
                </p>
              </Appear>
              <Appear delay={0.28} className="mt-7">
                <HeroSearch />
              </Appear>
            </div>

            {/* middle: ascii (xl only) */}
            <Appear delay={0.35} className="hidden xl:block">
              <AsciiArt className="h-full" />
            </Appear>

            {/* right: code panel */}
            <Appear delay={0.22} y={24} className="lg:pt-1">
              <HeroCodePanel />
            </Appear>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <StatsBar
        providers={providers.length}
        models={totalModels}
        agents={agents.length}
      />

      {/* POPULAR FREE PROVIDERS */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <Reveal className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
            <span className="text-accent">// </span>Popular free providers
          </h2>
          <Link
            href="/providers"
            className="group flex shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-ink hover:text-accent"
          >
            View all providers
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((p) => (
            <StaggerItem key={p.id} className="h-full">
              <ProviderCard provider={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* AGENT STRIP */}
      <section className="mx-auto max-w-6xl px-4 pb-4">
        <Reveal>
          <AgentStrip />
        </Reveal>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <Reveal>
            <BracketLabel>How it works</BracketLabel>
          </Reveal>
          <Stagger className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {STEPS.map((s) => (
              <StaggerItem key={s.n} className="bg-paper p-6">
                <span className="font-display text-4xl font-bold text-accent">
                  {s.n}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  {s.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line">
        <Reveal className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-4 py-12 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-xl font-display text-3xl font-bold leading-tight">
            Get your favorite model running in your agent.
          </h2>
          <div className="flex shrink-0 gap-3">
            <Link
              href="/generator"
              className="rounded-xl border border-ink bg-ink px-5 py-3 font-mono text-[12px] uppercase tracking-wider text-paper shadow-sm transition-colors hover:bg-accent hover:border-accent hover:text-accent-ink"
            >
              Open generator →
            </Link>
            <Link
              href="/submit"
              className="rounded-xl border border-line bg-paper px-5 py-3 font-mono text-[12px] uppercase tracking-wider shadow-sm transition-colors hover:border-concrete"
            >
              Submit a tip
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
