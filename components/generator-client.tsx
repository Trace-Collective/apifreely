"use client";

import { useState } from "react";
import Link from "next/link";
import { providers } from "@/data/providers";
import { agents } from "@/data/agents";
import { generateSnippet } from "@/lib/generateSnippet";
import { generatePrompt } from "@/lib/generatePrompt";
import { authLabel } from "@/lib/providerMeta";
import { CodeBlock } from "./code-block";
import { CopyButton } from "./copy-button";
import { BracketLabel } from "./bracket-label";
import { ProviderLogo, AgentIcon } from "./logos";

const TEMPS = [
  { v: "0.2", label: "0.2 · Precise" },
  { v: "0.7", label: "0.7 · Balanced" },
  { v: "1.0", label: "1.0 · Creative" },
];
const MAXTOK = ["1024", "2048", "4096", "8192"];

function StepCard({
  n,
  title,
  desc,
  children,
}: {
  n: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-5 shadow-sm">
      <div className="flex items-baseline gap-3">
        <span className="font-display text-2xl font-extrabold text-accent">{n}</span>
        <div>
          <h3 className="font-display text-base font-bold">{title}</h3>
          <p className="text-[12px] text-muted">{desc}</p>
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Select({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none rounded-lg border border-line bg-bg px-3 py-2.5 font-mono text-[13px] shadow-sm outline-none focus:border-concrete"
    >
      {children}
    </select>
  );
}

function SummaryRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 border-t border-line-soft py-2 text-[12px] first:border-0">
      <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted">
        {label}
      </span>
      <span className="break-all text-right">{children}</span>
    </div>
  );
}

export function GeneratorClient() {
  const [providerId, setProviderId] = useState(providers[0].id);
  const [agentId, setAgentId] = useState(agents[0].id);
  const [modelIdx, setModelIdx] = useState(0);
  const [temp, setTemp] = useState("0.7");
  const [maxTok, setMaxTok] = useState("4096");
  const [reasoning, setReasoning] = useState(true);

  const provider = providers.find((p) => p.id === providerId)!;
  const agent = agents.find((a) => a.id === agentId)!;
  const safeIdx = Math.min(modelIdx, provider.models.length - 1);
  const model = provider.models[safeIdx];
  const tuned = { ...provider, models: [model, ...provider.models] };

  const prompt = generatePrompt(tuned, agent, {
    model,
    temperature: Number(temp),
    maxTokens: Number(maxTok),
    includeReasoning: reasoning,
  });
  const snippet = generateSnippet(tuned, agent);

  return (
    <div className="space-y-8">
      {/* steps 01 / 02 */}
      <div className="grid gap-4 md:grid-cols-2">
        <StepCard n="01" title="Choose provider" desc="Pick a free LLM API provider.">
          <div className="flex items-center gap-3">
            <ProviderLogo id={providerId} className="h-11 w-11 shrink-0" />
            <Select
              value={providerId}
              onChange={(v) => {
                setProviderId(v);
                setModelIdx(0);
              }}
            >
              {providers.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </Select>
          </div>
        </StepCard>

        <StepCard n="02" title="Choose agent / tool" desc="Select the tool you want to use.">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-bg">
              <AgentIcon id={agentId} className="h-6 w-6" />
            </span>
            <Select value={agentId} onChange={setAgentId}>
              {agents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </Select>
          </div>
        </StepCard>
      </div>

      {/* 03 output + summary */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-2xl font-extrabold text-accent">03</span>
            <h3 className="font-display text-base font-bold">Your setup prompt</h3>
          </div>
          <CopyButton
            text={prompt}
            label="Copy prompt"
            className="rounded-lg border-accent bg-accent px-4 py-1.5 text-accent-ink"
          />
        </div>
        <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
          <div className="space-y-3">
            <CodeBlock code={prompt} label="paste into your agent" />
            <BracketLabel>Manual config · {snippet.label}</BracketLabel>
            <CodeBlock code={snippet.code} label={snippet.language} />
          </div>
          <div className="rounded-2xl border border-line bg-paper p-4 shadow-sm">
            <BracketLabel>Config summary</BracketLabel>
            <div className="mt-2">
              <SummaryRow label="Provider">{provider.name}</SummaryRow>
              <SummaryRow label="Model">{model}</SummaryRow>
              <SummaryRow label="API type">
                {provider.openaiCompatible ? "OpenAI compatible" : "Anthropic"}
              </SummaryRow>
              <SummaryRow label="Base URL">{provider.baseUrl}</SummaryRow>
              <SummaryRow label="Auth">{authLabel(provider)}</SummaryRow>
              <SummaryRow label="Rate">{provider.rateShort}</SummaryRow>
              <SummaryRow label="Cost">
                {provider.category === "promo" ? "Promo credit" : "Free"}
              </SummaryRow>
            </div>
            <Link
              href={`/providers/${provider.id}`}
              className="mt-3 flex items-center justify-between rounded-lg border border-line px-3 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors hover:border-concrete"
            >
              View provider <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* agent presets */}
      <div>
        <BracketLabel>Agent / tool presets</BracketLabel>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {agents.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setAgentId(a.id)}
              className={`flex flex-col gap-1.5 rounded-xl border p-3 text-left transition-colors ${
                a.id === agentId
                  ? "border-accent bg-accent/[0.04] shadow-sm"
                  : "border-line bg-paper hover:border-concrete"
              }`}
            >
              <AgentIcon id={a.id} className="h-5 w-5 text-ink" />
              <span className="font-display text-[13px] font-bold leading-tight">{a.name}</span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted">
                {a.format}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* customization + what is this */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-paper p-5 shadow-sm">
          <BracketLabel>Customization</BracketLabel>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">Model</span>
              <div className="mt-1">
                <Select value={String(safeIdx)} onChange={(v) => setModelIdx(Number(v))}>
                  {provider.models.map((m, i) => (
                    <option key={m} value={i}>
                      {m}
                    </option>
                  ))}
                </Select>
              </div>
            </label>
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">Temperature</span>
              <div className="mt-1">
                <Select value={temp} onChange={setTemp}>
                  {TEMPS.map((t) => (
                    <option key={t.v} value={t.v}>
                      {t.label}
                    </option>
                  ))}
                </Select>
              </div>
            </label>
            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">Max tokens</span>
              <div className="mt-1">
                <Select value={maxTok} onChange={setMaxTok}>
                  {MAXTOK.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </Select>
              </div>
            </label>
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => setReasoning((v) => !v)}
                className="flex w-full items-center justify-between rounded-lg border border-line bg-bg px-3 py-2.5 font-mono text-[11px] uppercase tracking-wider"
              >
                Reasoning
                <span
                  className={`relative h-4 w-7 rounded-full transition-colors ${
                    reasoning ? "bg-accent" : "bg-concrete"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all ${
                      reasoning ? "left-3.5" : "left-0.5"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-paper p-5 shadow-sm">
          <BracketLabel>What is this?</BracketLabel>
          <p className="mt-3 text-[13px] leading-relaxed text-muted">
            This generates a prompt that configures your agent to use the selected
            free provider — with sensible defaults for coding and general use.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ["Optimized", "Sensible defaults"],
              ["Secure", "Key stays in your env"],
              ["Free", "Free tiers only"],
            ].map(([t, d]) => (
              <div key={t} className="rounded-lg border border-line-soft p-3">
                <p className="font-display text-[13px] font-bold">{t}</p>
                <p className="mt-0.5 text-[11px] text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
