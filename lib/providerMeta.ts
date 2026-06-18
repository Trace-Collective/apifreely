import type { Provider } from "./types";

/** Derived, certain-only provider metadata — no fabricated values. */

/** True only when the provider explicitly states no credit card is needed. */
export function noCard(p: Provider): boolean {
  const hay = (p.freeDetails + " " + p.highlights.join(" ")).toLowerCase();
  return /no (credit )?card/.test(hay);
}

/** Display host for the provider's site (from its signup URL). */
export function websiteHost(p: Provider): string {
  try {
    return new URL(p.signupUrl).host.replace(/^www\./, "");
  } catch {
    return p.signupUrl;
  }
}

/** Docs URL — only when the source is the provider's official docs. */
export function docsUrl(p: Provider): string | undefined {
  return p.source.type === "official" ? p.source.url : undefined;
}

/** Auth scheme label, derived from compatibility + key env var. */
export function authLabel(p: Provider): string {
  if (p.openaiCompatible) return "Bearer (OpenAI)";
  if (p.apiKeyEnv.startsWith("ANTHROPIC")) return "x-api-key (Anthropic)";
  return "Bearer";
}

export type Endpoint = { purpose: string; url: string };

/** Concrete API endpoints derived from the base URL. */
export function endpoints(p: Provider): Endpoint[] {
  const base = p.baseUrl.replace(/\/$/, "");
  if (p.openaiCompatible) {
    return [
      { purpose: "Chat completions", url: `${base}/chat/completions` },
      { purpose: "Completions", url: `${base}/completions` },
      { purpose: "Models", url: `${base}/models` },
    ];
  }
  // Anthropic-style
  return [
    { purpose: "Messages", url: `${base}/messages` },
    { purpose: "Models", url: `${base}/models` },
  ];
}
