"use client";

import { useState } from "react";
import type { Provider } from "@/lib/types";
import { agents } from "@/data/agents";
import { generateSnippet } from "@/lib/generateSnippet";
import { generatePrompt } from "@/lib/generatePrompt";
import { CodeBlock } from "./code-block";
import { BracketLabel } from "./bracket-label";

export function ProviderSetup({ provider }: { provider: Provider }) {
  const [agentId, setAgentId] = useState(agents[0].id);
  const agent = agents.find((a) => a.id === agentId)!;
  const snippet = generateSnippet(provider, agent);
  const prompt = generatePrompt(provider, agent);

  return (
    <div className="space-y-4">
      {/* Agent tabs */}
      <div className="flex flex-wrap gap-1.5">
        {agents.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => setAgentId(a.id)}
            className={`rounded-lg border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              a.id === agentId
                ? "border-ink bg-ink text-paper shadow-sm"
                : "border-line bg-paper text-muted hover:border-concrete"
            }`}
          >
            {a.name}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <BracketLabel>Config snippet · {snippet.label}</BracketLabel>
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
