import type { Metadata } from "next";
import { GeneratorClient } from "@/components/generator-client";
import { BracketLabel } from "@/components/bracket-label";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Prompt generator — apifreely",
  description:
    "Generate a paste-into-your-agent prompt or manual config for any free LLM API. Runs in your browser; your key stays with you.",
};

export default function GeneratorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Reveal className="mb-8 border-b border-line pb-5">
        <BracketLabel>Prompt generator</BracketLabel>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">
          Make your agent configure itself.
        </h1>
        <p className="mt-2 max-w-2xl text-[13px] text-muted">
          Choose a provider, model and tool. Copy the prompt into your agent —
          it sets up the endpoint and reads the key from your environment. Or
          grab the manual config. Nothing here leaves your browser.
        </p>
      </Reveal>
      <GeneratorClient />
    </div>
  );
}
