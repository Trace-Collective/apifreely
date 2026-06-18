"use client";

import type { Provider } from "@/lib/types";
import { CopyButton } from "./copy-button";
import { websiteHost, authLabel } from "@/lib/providerMeta";

export function QuickSetup({ provider }: { provider: Provider }) {
  const envBlock = provider.openaiCompatible
    ? `OPENAI_BASE_URL=${provider.baseUrl}\n${provider.apiKeyEnv}=<YOUR_API_KEY>`
    : `ANTHROPIC_BASE_URL=${provider.baseUrl}\n${provider.apiKeyEnv}=<YOUR_API_KEY>`;

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-panel text-panel-ink shadow-[0_18px_45px_-18px_rgba(14,14,14,0.4)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-accent" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M7 8l3 4-3 4M13 16h4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Quick setup
        </span>
        <CopyButton
          text={envBlock}
          label="Copy setup"
          className="rounded-lg border-accent bg-accent px-3 py-1 text-accent-ink"
        />
      </div>

      <div className="space-y-3.5 px-4 py-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-panel-muted">
            1 · Base URL
          </p>
          <div className="mt-1 flex items-center justify-between gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2">
            <code className="truncate font-mono text-[12px]">{provider.baseUrl}</code>
            <CopyButton text={provider.baseUrl} className="border-white/25 text-panel-ink" />
          </div>
        </div>

        <div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-panel-muted">
            2 · API key
          </p>
          <div className="mt-1 flex items-center justify-between gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2">
            <code className="truncate font-mono text-[12px] text-panel-muted">
              {provider.apiKeyEnv}=••••••••••••••••••
            </code>
            <span className="shrink-0 rounded-md border border-white/15 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-panel-muted">
              env only
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-white/10 pt-3 font-mono text-[10px] uppercase tracking-wider text-panel-muted">
          <span>Auth · {authLabel(provider)}</span>
          <a
            href={provider.signupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Get key at {websiteHost(provider)} →
          </a>
        </div>
      </div>
    </div>
  );
}
