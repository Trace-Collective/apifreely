import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { agents, getAgent } from "@/data/agents";
import { AgentIcon } from "@/components/logos";
import { AgentSetup } from "@/components/agent-setup";
import { BracketLabel } from "@/components/bracket-label";
import { Reveal } from "@/components/motion";

export function generateStaticParams() {
  return agents.map((a) => ({ agent: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ agent: string }>;
}): Promise<Metadata> {
  const { agent } = await params;
  const a = getAgent(agent);
  if (!a) return { title: "Not found — apifreely" };
  return {
    title: `${a.name} setup guide — apifreely`,
    description: `Connect ${a.name} to any free LLM API. ${a.blurb}.`,
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ agent: string }>;
}) {
  const { agent } = await params;
  const a = getAgent(agent);
  if (!a) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link
        href="/setup-guides"
        className="font-mono text-[11px] uppercase tracking-wider text-muted hover:text-ink"
      >
        ← all guides
      </Link>

      <div className="mt-4 flex items-center gap-4 border-b border-line pb-6">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-line bg-paper text-ink shadow-sm">
          <AgentIcon id={a.id} className="h-7 w-7" />
        </span>
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight">
            {a.name}
          </h1>
          <p className="mt-1 text-[13px] text-muted">{a.blurb}</p>
        </div>
      </div>

      <Reveal className="mt-8">
        <BracketLabel>Connect a free provider</BracketLabel>
        <h2 className="mt-2 mb-5 font-display text-2xl font-bold">
          Pick a provider, copy, done.
        </h2>
        <AgentSetup agent={a} />
      </Reveal>
    </div>
  );
}
