import type { Agent, Provider, Snippet } from "@/lib/types";

const KEY = "<YOUR_API_KEY>";

/**
 * Build a copy-paste configuration snippet that wires a provider into a given
 * agent/tool. The user pastes their own key in place of <YOUR_API_KEY> — apifreely
 * never receives it.
 */
export function generateSnippet(provider: Provider, agent: Agent): Snippet {
  const model = provider.models[0];
  const base = provider.baseUrl;

  switch (agent.id) {
    case "claude-code":
      return {
        label: "Claude Code — env",
        language: "bash",
        code: `# settings.json "env" block, or your shell:
ANTHROPIC_BASE_URL=${base}
ANTHROPIC_AUTH_TOKEN=${KEY}
ANTHROPIC_MODEL=${model}

# Claude Code speaks the Anthropic Messages API. Use an Anthropic-compatible
# endpoint, or an OpenAI→Anthropic proxy in front of ${provider.name}.`,
      };
    case "aider":
      return {
        label: "Aider — env + flag",
        language: "bash",
        code: `# .env or shell (OpenAI-compatible):
OPENAI_API_BASE=${base}
OPENAI_API_KEY=${KEY}

# then run:
aider --model openai/${model}`,
      };
    case "windsurf":
      return {
        label: "Windsurf — Settings",
        language: "text",
        code: `Windsurf ▸ Settings ▸ Cascade / Models:
1. Add a custom "OpenAI-compatible" provider
2. Base URL → ${base}
3. API key → ${KEY}
4. Model → ${model}`,
      };
    case "cline":
    case "roo": {
      const label = agent.id === "cline" ? "Cline" : "Roo Code";
      return {
        label: `${label} — provider settings`,
        language: "json",
        code: `// In the ${label} settings panel choose "OpenAI Compatible", then:
{
  "API Provider": "OpenAI Compatible",
  "Base URL": "${base}",
  "Model ID": "${model}",
  "API Key": "${KEY}"
}`,
      };
    }
    case "continue":
      return {
        label: "Continue — config.json",
        language: "json",
        code: `// ~/.continue/config.json
{
  "models": [
    {
      "title": "${provider.name} · ${model}",
      "provider": "openai",
      "model": "${model}",
      "apiBase": "${base}",
      "apiKey": "${KEY}"
    }
  ]
}`,
      };
    case "cursor":
      return {
        label: "Cursor — Settings ▸ Models",
        language: "text",
        code: `Cursor ▸ Settings ▸ Models:
1. Paste your key into "OpenAI API Key": ${KEY}
2. Enable "Override OpenAI Base URL" → ${base}
3. Add a custom model name → ${model}
4. Click "Verify", then enable the model.

Note: Cursor's override expects an OpenAI-compatible endpoint.`,
      };
    case "hermes":
    case "openclaw":
      return {
        label: `${agent.name} — .env`,
        language: "bash",
        code: `# .env  (OpenAI-compatible backend)
OPENAI_BASE_URL=${base}
OPENAI_API_KEY=${KEY}
OPENAI_MODEL=${model}

# Some tools read the provider-native var instead:
${provider.apiKeyEnv}=${KEY}`,
      };
    case "librechat":
      return {
        label: "LibreChat — librechat.yaml",
        language: "yaml",
        code: `# librechat.yaml
endpoints:
  custom:
    - name: "${provider.name}"
      apiKey: "\${${provider.apiKeyEnv}}"
      baseURL: "${base}"
      models:
        default: ["${model}"]
        fetch: false
      titleConvo: true`,
      };
    default:
      return {
        label: `${agent.name} — env`,
        language: "bash",
        code: `OPENAI_BASE_URL=${base}
OPENAI_API_KEY=${KEY}
OPENAI_MODEL=${model}`,
      };
  }
}
