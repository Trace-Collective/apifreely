import type { Agent } from "@/lib/types";

// Agent / tool targets we generate setup snippets + self-config prompts for.
// Most consume an OpenAI-compatible (baseUrl + model + apiKey) config; Claude Code
// uses the Anthropic Messages API (ANTHROPIC_BASE_URL / ANTHROPIC_AUTH_TOKEN).

export const agents: Agent[] = [
  { id: "claude-code", name: "Claude Code", blurb: "Anthropic's agentic coding CLI", format: "env" },
  { id: "cline", name: "Cline", blurb: "VS Code autonomous coding agent", format: "json" },
  { id: "cursor", name: "Cursor", blurb: "AI-first code editor", format: "ui" },
  { id: "roo", name: "Roo Code", blurb: "VS Code agent (Cline fork)", format: "json" },
  { id: "continue", name: "Continue", blurb: "Open-source IDE assistant", format: "json" },
  { id: "windsurf", name: "Windsurf", blurb: "Agentic IDE by Codeium", format: "ui" },
  { id: "aider", name: "Aider", blurb: "AI pair programming in your terminal", format: "env" },
  { id: "hermes", name: "Hermes", blurb: "Generic OpenAI-compatible agent", format: "env" },
  { id: "openclaw", name: "OpenClaw", blurb: "Open agent runtime", format: "env" },
  { id: "librechat", name: "LibreChat", blurb: "Self-hosted chat UI", format: "yaml" },
];

export function getAgent(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}
