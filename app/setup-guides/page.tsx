import type { Metadata } from "next";
import Link from "next/link";
import { agents } from "@/data/agents";
import { AgentIcon } from "@/components/logos";
import { BracketLabel } from "@/components/bracket-label";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export const metadata: Metadata = {
  title: "Setup Guides — apifreely",
  description:
    "Connect your favorite agent (Cline, Cursor, LibreChat…) to any free LLM API in seconds.",
};

export default function SetupGuidesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Reveal className="mb-8 border-b border-line pb-5">
        <BracketLabel>Setup guides</BracketLabel>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight">
          Connect your agent in seconds.
        </h1>
        <p className="mt-2 max-w-2xl text-[14px] text-muted">
          Pick your tool and get the exact config — or a paste-to-agent prompt —
          for every free provider. You keep your key; we never see it.
        </p>
      </Reveal>

      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((a) => (
          <StaggerItem key={a.id} className="h-full">
            <Link
              href={`/setup-guides/${a.id}`}
              className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-5 shadow-sm transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_14px_34px_-10px_rgba(16,16,16,0.22)]"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-bg text-ink">
                  <AgentIcon id={a.id} className="h-6 w-6" />
                </span>
                <span className="rounded-md border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                  {a.format}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">{a.name}</h3>
              <p className="mt-1 flex-1 text-[13px] leading-snug text-muted">
                {a.blurb}
              </p>
              <span className="mt-4 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-accent">
                View guide
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
