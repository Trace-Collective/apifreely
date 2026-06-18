"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Category, Provider, Status } from "@/lib/types";
import { ProviderCard } from "./provider-card";
import { ProviderLogo } from "./logos";
import { BracketLabel } from "./bracket-label";
import { Barcode } from "./barcode";
import { noCard } from "@/lib/providerMeta";

type SortKey = "relevance" | "name" | "status";
type OAI = "yes" | "no";
const PER_PAGE = 9;

const ACCESS: { id: Category; label: string }[] = [
  { id: "free-tier", label: "Free tier" },
  { id: "trial", label: "Free trial" },
  { id: "promo", label: "Promo / limited" },
];
const STATUSES: { id: Status; label: string }[] = [
  { id: "alive", label: "Alive" },
  { id: "unknown", label: "Verification" },
  { id: "expired", label: "Expired" },
];
const STATUS_DOT: Record<Status, string> = {
  alive: "bg-alive",
  expired: "bg-warn",
  unknown: "bg-concrete",
};

function Check({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between gap-2 py-1.5 text-left font-mono text-[11px] uppercase tracking-wider transition-colors hover:text-ink"
    >
      <span className="flex items-center gap-2">
        <span
          className={`flex h-3.5 w-3.5 items-center justify-center rounded border text-[9px] ${
            active ? "border-accent bg-accent text-accent-ink" : "border-line-soft bg-paper"
          }`}
        >
          {active ? "✓" : ""}
        </span>
        <span className={active ? "text-ink" : "text-muted"}>{label}</span>
      </span>
      <span className="text-muted/70">{count}</span>
    </button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-line py-4">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink">
          {title}
        </span>
        <svg viewBox="0 0 24 24" className="h-3 w-3 text-muted" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
          <path d="m6 15 6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {children}
    </div>
  );
}

function Row({ provider }: { provider: Provider }) {
  return (
    <Link
      href={`/providers/${provider.id}`}
      className="group flex items-center gap-4 rounded-xl border border-line bg-paper px-4 py-3 shadow-sm transition-colors hover:border-concrete"
    >
      <ProviderLogo id={provider.id} className="h-10 w-10 shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-display text-[15px] font-bold">{provider.name}</h3>
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${STATUS_DOT[provider.status]}`} />
        </div>
        <p className="truncate text-[12px] text-muted">{provider.tagline}</p>
      </div>
      <span className="hidden shrink-0 rounded-md border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted md:inline">
        {provider.category}
      </span>
      <span className="hidden w-24 shrink-0 text-right font-mono text-[11px] uppercase tracking-wider md:inline">
        {provider.rateShort}
      </span>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-ink transition-colors group-hover:bg-ink">
        →
      </span>
    </Link>
  );
}

export function DirectoryClient({
  providers,
  initialQuery = "",
}: {
  providers: Provider[];
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [cats, setCats] = useState<Set<Category>>(new Set());
  const [stats, setStats] = useState<Set<Status>>(new Set());
  const [oai, setOai] = useState<Set<OAI>>(new Set());
  const [noCardOnly, setNoCardOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("relevance");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);

  function toggle<T>(set: Set<T>, val: T, setter: (s: Set<T>) => void) {
    const next = new Set(set);
    if (next.has(val)) next.delete(val);
    else next.add(val);
    setter(next);
    setPage(1);
  }

  function reset() {
    setCats(new Set());
    setStats(new Set());
    setOai(new Set());
    setNoCardOnly(false);
    setQuery("");
    setPage(1);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out = providers.filter((p) => {
      if (cats.size && !cats.has(p.category)) return false;
      if (stats.size && !stats.has(p.status)) return false;
      if (oai.size && !oai.has(p.openaiCompatible ? "yes" : "no")) return false;
      if (noCardOnly && !noCard(p)) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.models.some((m) => m.toLowerCase().includes(q))
      );
    });
    if (sort === "name") out.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "status") {
      const rank = { alive: 0, unknown: 1, expired: 2 } as const;
      out.sort((a, b) => rank[a.status] - rank[b.status]);
    }
    return out;
  }, [providers, query, cats, stats, oai, noCardOnly, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, pages);
  const shown = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const countCat = (c: Category) => providers.filter((p) => p.category === c).length;
  const countStat = (s: Status) => providers.filter((p) => p.status === s).length;
  const countOai = (v: OAI) =>
    providers.filter((p) => (p.openaiCompatible ? "yes" : "no") === v).length;

  const activeChips: { label: string; clear: () => void }[] = [
    ...[...cats].map((c) => ({ label: c, clear: () => toggle(cats, c, setCats) })),
    ...[...stats].map((s) => ({ label: s, clear: () => toggle(stats, s, setStats) })),
    ...[...oai].map((o) => ({
      label: o === "yes" ? "openai" : "non-openai",
      clear: () => toggle(oai, o, setOai),
    })),
    ...(noCardOnly ? [{ label: "no card", clear: () => setNoCardOnly(false) }] : []),
  ];

  return (
    <div className="grid gap-6 md:grid-cols-[230px_1fr]">
      {/* sidebar */}
      <aside className="relative">
        <div className="mb-3 flex items-center justify-between border-b border-line pb-2">
          <BracketLabel>Filters</BracketLabel>
          {(cats.size > 0 || stats.size > 0 || oai.size > 0 || noCardOnly || query.length > 0) && (
            <button
              type="button"
              onClick={reset}
              className="font-mono text-[10px] uppercase tracking-wider text-accent hover:underline"
            >
              Reset all
            </button>
          )}
        </div>

        <Section title="Access type">
          {ACCESS.map((a) => (
            <Check
              key={a.id}
              label={a.label}
              active={cats.has(a.id)}
              count={countCat(a.id)}
              onClick={() => toggle(cats, a.id, setCats)}
            />
          ))}
        </Section>
        <Section title="Status">
          {STATUSES.map((s) => (
            <Check
              key={s.id}
              label={s.label}
              active={stats.has(s.id)}
              count={countStat(s.id)}
              onClick={() => toggle(stats, s.id, setStats)}
            />
          ))}
        </Section>
        <Section title="OpenAI compatible">
          {(["yes", "no"] as OAI[]).map((v) => (
            <Check
              key={v}
              label={v}
              active={oai.has(v)}
              count={countOai(v)}
              onClick={() => toggle(oai, v, setOai)}
            />
          ))}
        </Section>
        <Section title="Requirements">
          <Check
            label="No credit card"
            active={noCardOnly}
            count={providers.filter(noCard).length}
            onClick={() => {
              setNoCardOnly((v) => !v);
              setPage(1);
            }}
          />
        </Section>

        <div className="mt-4 flex items-center gap-2">
          <Barcode seed="AF-FILTER-01" count={18} className="h-7 w-full text-line-soft" />
        </div>
      </aside>

      {/* main */}
      <div className="min-w-0">
        {/* search + sort */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-line bg-paper px-4 py-2.5 shadow-sm focus-within:border-concrete">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search provider, model, or feature…"
              className="min-w-0 flex-1 bg-transparent font-mono text-[12px] outline-none placeholder:text-muted"
            />
          </div>
          <label className="flex items-center gap-2 rounded-xl border border-line bg-paper px-3 py-2.5 font-mono text-[11px] uppercase tracking-wider shadow-sm">
            <span className="text-muted">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="bg-transparent uppercase outline-none"
            >
              <option value="relevance">Relevance</option>
              <option value="name">Name</option>
              <option value="status">Status</option>
            </select>
          </label>
        </div>

        {/* results header */}
        <div className="mb-4 flex flex-wrap items-center gap-3 border-b border-line pb-3">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-wider">
            {filtered.length} providers found
          </span>
          {activeChips.map((c, i) => (
            <button
              key={i}
              type="button"
              onClick={c.clear}
              className="flex items-center gap-1 rounded-md border border-line bg-paper px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider hover:border-concrete"
            >
              {c.label} <span className="text-accent">×</span>
            </button>
          ))}
          {activeChips.length > 0 && (
            <button
              type="button"
              onClick={reset}
              className="font-mono text-[10px] uppercase tracking-wider text-accent hover:underline"
            >
              Clear all
            </button>
          )}
          <div className="ml-auto flex items-center overflow-hidden rounded-lg border border-line">
            {(["grid", "list"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                  view === v ? "bg-ink text-paper" : "bg-paper text-muted hover:text-ink"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* results */}
        {shown.length === 0 ? (
          <div className="rounded-xl border border-dashed border-line p-10 text-center font-mono text-[12px] text-muted">
            No providers match your filters.
          </div>
        ) : view === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {shown.map((p) => (
              <ProviderCard key={p.id} provider={p} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {shown.map((p) => (
              <Row key={p.id} provider={p} />
            ))}
          </div>
        )}

        {/* pagination */}
        {pages > 1 && (
          <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Showing {(safePage - 1) * PER_PAGE + 1}–
              {Math.min(safePage * PER_PAGE, filtered.length)} of {filtered.length}
            </span>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={`h-7 w-7 rounded-md border font-mono text-[11px] transition-colors ${
                    n === safePage
                      ? "border-accent bg-accent text-accent-ink"
                      : "border-line bg-paper text-muted hover:border-concrete"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* submit banner */}
        <div className="mt-6 flex flex-col items-start gap-3 rounded-xl border border-line bg-paper p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Barcode seed="AF-CTA" count={14} className="hidden h-8 w-8 text-ink sm:flex" />
            <div>
              <p className="font-display text-base font-bold">
                Can&apos;t find what you&apos;re looking for?
              </p>
              <p className="text-[12px] text-muted">
                Submit a free tier or promo we missed. Help the community.
              </p>
            </div>
          </div>
          <Link
            href="/submit"
            className="flex shrink-0 items-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-accent-ink transition-colors hover:bg-ink"
          >
            Submit promo →
          </Link>
        </div>
      </div>
    </div>
  );
}
