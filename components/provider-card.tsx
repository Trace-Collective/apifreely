import Link from "next/link";
import type { Provider } from "@/lib/types";
import { ProviderLogo } from "./logos";
import { Barcode } from "./barcode";

const DOT: Record<string, string> = {
  alive: "bg-alive text-alive",
  expired: "bg-warn text-warn",
  unknown: "bg-concrete text-muted",
};

export function ProviderCard({ provider }: { provider: Provider }) {
  const dot = DOT[provider.status];
  const apiLabel = provider.openaiCompatible
    ? "OpenAI"
    : provider.apiKeyEnv.startsWith("ANTHROPIC")
      ? "Anthropic"
      : "Native";
  return (
    <Link
      href={`/providers/${provider.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper shadow-sm transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_14px_34px_-10px_rgba(16,16,16,0.22)]"
    >
      <div className="flex-1 p-5">
        {/* top row */}
        <div className="flex items-center justify-between">
          <span className={`flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider ${dot.split(" ")[1]}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${dot.split(" ")[0]}`} />
            {provider.status}
          </span>
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-concrete transition-colors group-hover:text-accent" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18.4 6.2 21.4l1.1-6.5L2.6 9.8l6.5-.9z" strokeLinejoin="round" />
          </svg>
        </div>

        {/* logo + name + barcode */}
        <div className="mt-4 flex items-start gap-3">
          <ProviderLogo id={provider.id} className="h-12 w-12 shrink-0" />
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-xl font-bold leading-tight">
              {provider.name}
            </h3>
            <p className="mt-1 text-[12.5px] leading-snug text-muted">
              {provider.tagline}
            </p>
          </div>
          <Barcode seed={`AF-${provider.id}`} count={9} vertical className="hidden w-3 self-stretch text-concrete/70 sm:flex" />
        </div>

        {/* highlights */}
        <ul className="mt-4 space-y-2">
          {provider.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-[12.5px]">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-alive" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden>
                <path d="m5 12 5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {h}
            </li>
          ))}
        </ul>
      </div>

      {/* footer */}
      <div className="flex items-center justify-between border-t border-line px-5 py-3.5">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider">
          <span className="font-semibold text-ink">{provider.rateShort}</span>
          <span className="text-muted">{apiLabel}</span>
        </div>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-ink transition-colors group-hover:bg-ink">
          <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
