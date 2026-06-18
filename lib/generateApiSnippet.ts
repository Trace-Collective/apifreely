import type { Provider, Snippet } from "./types";

export type Lang = "curl" | "python" | "node" | "typescript";
export const LANGS: { id: Lang; label: string }[] = [
  { id: "curl", label: "cURL" },
  { id: "python", label: "Python" },
  { id: "node", label: "Node" },
  { id: "typescript", label: "TypeScript" },
];

const KEY = "<YOUR_API_KEY>";

/** Raw API call example for a provider + model in the chosen language. */
export function generateApiSnippet(
  provider: Provider,
  model: string,
  lang: Lang,
): Snippet {
  const base = provider.baseUrl.replace(/\/$/, "");

  if (!provider.openaiCompatible) {
    // Anthropic Messages API
    const code: Record<Lang, string> = {
      curl: `curl ${base}/messages \\
  -H "x-api-key: ${KEY}" \\
  -H "anthropic-version: 2023-06-01" \\
  -H "content-type: application/json" \\
  -d '{
    "model": "${model}",
    "max_tokens": 256,
    "messages": [{ "role": "user", "content": "Hello!" }]
  }'`,
      python: `from anthropic import Anthropic

client = Anthropic(base_url="${base.replace(/\/v1$/, "")}", api_key="${KEY}")
msg = client.messages.create(
    model="${model}",
    max_tokens=256,
    messages=[{"role": "user", "content": "Hello!"}],
)
print(msg.content[0].text)`,
      node: `import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ baseURL: "${base.replace(/\/v1$/, "")}", apiKey: "${KEY}" });
const msg = await client.messages.create({
  model: "${model}",
  max_tokens: 256,
  messages: [{ role: "user", content: "Hello!" }],
});
console.log(msg.content[0].text);`,
      typescript: `import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ baseURL: "${base.replace(/\/v1$/, "")}", apiKey: "${KEY}" });
const msg = await client.messages.create({
  model: "${model}",
  max_tokens: 256,
  messages: [{ role: "user", content: "Hello!" }],
});
console.log(msg.content[0].text);`,
    };
    return { label: lang, language: lang, code: code[lang] };
  }

  // OpenAI-compatible
  const code: Record<Lang, string> = {
    curl: `curl ${base}/chat/completions \\
  -H "Authorization: Bearer ${KEY}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${model}",
    "messages": [{ "role": "user", "content": "Hello!" }]
  }'`,
    python: `from openai import OpenAI

client = OpenAI(base_url="${base}", api_key="${KEY}")
resp = client.chat.completions.create(
    model="${model}",
    messages=[{"role": "user", "content": "Hello!"}],
)
print(resp.choices[0].message.content)`,
    node: `import OpenAI from "openai";

const client = new OpenAI({ baseURL: "${base}", apiKey: "${KEY}" });
const resp = await client.chat.completions.create({
  model: "${model}",
  messages: [{ role: "user", content: "Hello!" }],
});
console.log(resp.choices[0].message.content);`,
    typescript: `import OpenAI from "openai";
import type { ChatCompletion } from "openai/resources";

const client = new OpenAI({ baseURL: "${base}", apiKey: "${KEY}" });
const resp: ChatCompletion = await client.chat.completions.create({
  model: "${model}",
  messages: [{ role: "user", content: "Hello!" }],
});
console.log(resp.choices[0].message.content);`,
  };
  return { label: lang, language: lang, code: code[lang] };
}

export const RESPONSE_EXAMPLE = `{
  "id": "chatcmpl-...",
  "object": "chat.completion",
  "model": "<model>",
  "choices": [
    {
      "index": 0,
      "message": { "role": "assistant", "content": "Hello! How can I help?" },
      "finish_reason": "stop"
    }
  ],
  "usage": { "prompt_tokens": 9, "completion_tokens": 12, "total_tokens": 21 }
}`;
