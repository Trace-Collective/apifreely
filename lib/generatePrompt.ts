import type { Agent, Provider } from "@/lib/types";

export type PromptOpts = {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  includeReasoning?: boolean;
};

/**
 * Build a paste-into-your-agent prompt that instructs the agent to configure
 * itself against a free OpenAI-compatible endpoint. The user supplies the key
 * themselves — the prompt deliberately tells the agent to read it from an env
 * var rather than have it pasted in plain text.
 */
export function generatePrompt(
  provider: Provider,
  agent: Agent,
  opts: PromptOpts = {},
): string {
  const model = opts.model ?? provider.models[0];
  const anthropic = !provider.openaiCompatible;
  const authLine = anthropic
    ? "Auth:         x-api-key (Anthropic Messages API)"
    : "Auth:         Bearer token (OpenAI-compatible)";

  const tuning: string[] = [];
  if (opts.temperature !== undefined) tuning.push(`Temperature:  ${opts.temperature}`);
  if (opts.maxTokens !== undefined) tuning.push(`Max tokens:   ${opts.maxTokens}`);
  const tuningBlock = tuning.length ? `\n${tuning.join("\n")}` : "";

  const reasoning = opts.includeReasoning
    ? `\n5. Prefer step-by-step reasoning for complex tasks; keep simple answers concise.`
    : "";

  return `You are being set up to use a free LLM API as your model backend.

Provider:     ${provider.name}
Base URL:     ${provider.baseUrl}
Model:        ${model}
${authLine}
Key env var:  ${provider.apiKeyEnv}${tuningBlock}

Task:
1. Configure ${agent.name} to call the endpoint above using the ${
    anthropic ? "Anthropic Messages" : "OpenAI Chat Completions"
  } format.
2. Read the API key from the ${provider.apiKeyEnv} environment variable. Do NOT
   ask me to paste the key in plain text in this chat — I will set it in my env.
3. If a setting requires a base URL, use exactly: ${provider.baseUrl}
4. Send one short test message ("ping") and report back whether the call
   succeeded, including the model name and latency.${reasoning}

If anything is missing (e.g. an account ID for the base URL), ask me for just
that value and nothing else.`;
}
