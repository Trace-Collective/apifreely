"use client";

import { useState } from "react";
import type { Provider } from "@/lib/types";
import { Tabs } from "./tabs";
import { ProviderSetup } from "./provider-setup";
import { CodeBlock } from "./code-block";
import { CopyButton } from "./copy-button";
import { BracketLabel } from "./bracket-label";
import { endpoints, authLabel } from "@/lib/providerMeta";
import {
  generateApiSnippet,
  RESPONSE_EXAMPLE,
  LANGS,
  type Lang,
} from "@/lib/generateApiSnippet";

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2 text-[13px]">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-alive" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden>
        <path d="m5 12 5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {children}
    </li>
  );
}

function OverviewTab({ provider }: { provider: Provider }) {
  return (
    <div className="space-y-5">
      <p className="max-w-2xl text-[13.5px] leading-relaxed text-muted">
        {provider.freeDetails}
      </p>
      <div>
        <BracketLabel>What you get</BracketLabel>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {provider.highlights.map((h) => (
            <Check key={h}>{h}</Check>
          ))}
          <Check>{provider.openaiCompatible ? "OpenAI-compatible API" : "Native (Anthropic) API"}</Check>
          <Check>Auth: {authLabel(provider)}</Check>
        </ul>
      </div>
    </div>
  );
}

function ModelsTab({ provider }: { provider: Provider }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-paper shadow-sm">
      {provider.models.map((m, i) => (
        <div
          key={m}
          className={`flex items-center justify-between gap-2 px-4 py-2.5 ${
            i !== 0 ? "border-t border-line-soft" : ""
          }`}
        >
          <code className="truncate font-mono text-[12.5px]">{m}</code>
          {i === 0 && (
            <span className="shrink-0 rounded-md border border-line px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-accent">
              default
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function EndpointsTab({ provider }: { provider: Provider }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-paper shadow-sm">
      {endpoints(provider).map((e, i) => (
        <div
          key={e.url}
          className={`flex items-center justify-between gap-3 px-4 py-3 ${
            i !== 0 ? "border-t border-line-soft" : ""
          }`}
        >
          <span className="shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted">
            {e.purpose}
          </span>
          <code className="min-w-0 flex-1 truncate text-right font-mono text-[12px]">
            {e.url}
          </code>
          <CopyButton text={e.url} />
        </div>
      ))}
    </div>
  );
}

function ExamplesTab({ provider }: { provider: Provider }) {
  const [lang, setLang] = useState<Lang>("curl");
  const model = provider.models[0];
  const snip = generateApiSnippet(provider, model, lang);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {LANGS.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => setLang(l.id)}
            className={`rounded-lg border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              lang === l.id
                ? "border-ink bg-ink text-paper shadow-sm"
                : "border-line bg-paper text-muted hover:border-concrete"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <BracketLabel>Request · {lang}</BracketLabel>
          <CodeBlock code={snip.code} label={lang} />
        </div>
        <div className="space-y-2">
          <BracketLabel>Response</BracketLabel>
          <CodeBlock code={RESPONSE_EXAMPLE.replace("<model>", model)} label="200 OK" />
        </div>
      </div>
    </div>
  );
}

const FAQ = [
  {
    q: "Is it really free?",
    a: "Yes — this entry lists a free tier or promo. Some are rate-limited or time-limited, so check the rate limit and any expiry before relying on it in production.",
  },
  {
    q: "Where is my API key stored?",
    a: "Nowhere. apifreely never receives your key. You paste it into your own agent or environment — every generator here runs in your browser.",
  },
  {
    q: "How do I connect it to my agent?",
    a: "Open the Setup tab for a copy-paste config per tool, or use the Prompt Generator to get a prompt your agent can run to configure itself.",
  },
  {
    q: "What if the endpoint needs an account ID?",
    a: "Some providers (e.g. Cloudflare) include a placeholder like {ACCOUNT_ID} in the base URL — replace it with your own from the dashboard.",
  },
];

function FaqTab() {
  return (
    <div className="divide-y divide-line-soft overflow-hidden rounded-xl border border-line bg-paper shadow-sm">
      {FAQ.map((f) => (
        <div key={f.q} className="px-4 py-3.5">
          <p className="font-display text-[14px] font-bold">{f.q}</p>
          <p className="mt-1 text-[13px] leading-relaxed text-muted">{f.a}</p>
        </div>
      ))}
    </div>
  );
}

export function ProviderTabs({ provider }: { provider: Provider }) {
  return (
    <Tabs
      tabs={[
        { id: "overview", label: "Overview", content: <OverviewTab provider={provider} /> },
        { id: "models", label: `Models (${provider.models.length})`, content: <ModelsTab provider={provider} /> },
        { id: "endpoints", label: "Endpoints", content: <EndpointsTab provider={provider} /> },
        { id: "setup", label: "Setup", content: <ProviderSetup provider={provider} /> },
        { id: "examples", label: "Examples", content: <ExamplesTab provider={provider} /> },
        { id: "faq", label: "FAQ", content: <FaqTab /> },
      ]}
    />
  );
}
