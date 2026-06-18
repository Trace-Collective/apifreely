import { agents } from "@/data/agents";
import { AgentIcon } from "./logos";

export function AgentStrip() {
  // duplicate the list so the marquee can loop seamlessly (translateX -50%)
  const loop = [...agents, ...agents];
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-line bg-paper px-5 py-4 shadow-sm md:flex-row md:items-center">
      <span className="shrink-0 font-mono text-[10px] uppercase leading-relaxed tracking-wider text-accent">
        // Works with
        <br className="hidden md:block" /> your favorite agents
      </span>
      <div className="marquee-wrap relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-x-10">
          {loop.map((a, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-ink"
            >
              <AgentIcon id={a.id} className="h-5 w-5 text-muted" />
              {a.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
