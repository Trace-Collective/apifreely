"use client";

import { useState } from "react";
import type { Agent } from "@/lib/types";
import { providers } from "@/data/providers";
import { generateSnippet } from "@/lib/generateSnippet";
import { generatePrompt } from "@/lib/generatePrompt";
import { CodeBlock } from "./code-block";
import { BracketLabel } from "./bracket-label";
import { ProviderLogo } from "./logos";

function shortName(name: string) {
  return name.replace(/\s*\(.*\)\s*/, "");
}

export function AgentSetup({ agent }: { agent: Agent }) {
  const [pid, setPid] = useState(providers[0].id);
  const provider = providers.find((p) => p.id === pid)!;
  const snippet = generateSnippet(provider, agent);
  const prompt = generatePrompt(provider, agent);

  return (
    <div className="space-y-4">
      {/* provider picker */}
      <div className="flex flex-wrap gap-2">
        {providers.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPid(p.id)}
            className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              p.id === pid
                ? "border-ink bg-ink text-paper shadow-sm"
                : "border-line bg-paper text-muted hover:border-concrete"
            }`}
          >
            <ProviderLogo id={p.id} className="h-4 w-4" />
            {shortName(p.name)}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <BracketLabel>Config · {snippet.label}</BracketLabel>
          <CodeBlock code={snippet.code} label={snippet.language} />
        </div>
        <div className="space-y-2">
          <BracketLabel>Paste-to-agent prompt</BracketLabel>
          <CodeBlock code={prompt} label="prompt" />
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
            ↳ You supply the key in your own env. apifreely never sees it.
          </p>
        </div>
      </div>
    </div>
  );
}
