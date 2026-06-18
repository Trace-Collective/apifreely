import type { Metadata } from "next";
import { providers } from "@/data/providers";
import { DirectoryClient } from "@/components/directory-client";
import { BracketLabel } from "@/components/bracket-label";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Providers — apifreely",
  description: "Browse free & free-tier LLM API providers.",
};

export default async function ProvidersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Reveal className="mb-8 border-b border-line pb-5">
        <BracketLabel>Browse providers</BracketLabel>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">
          Every free LLM API, in one place.
        </h1>
        <p className="mt-2 max-w-2xl text-[13px] text-muted">
          Filter by what&apos;s free and whether it&apos;s still alive. All
          endpoints are OpenAI-compatible unless noted. Found one we&apos;re
          missing?{" "}
          <a href="/submit" className="text-accent hover:underline">
            Submit it →
          </a>
        </p>
      </Reveal>
      <DirectoryClient providers={providers} initialQuery={q ?? ""} />
    </div>
  );
}
