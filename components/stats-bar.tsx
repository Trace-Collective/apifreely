import { CountUp } from "./motion";
import { Barcode } from "./barcode";

function Stat({
  value,
  icon,
  l1,
  l2,
  live,
}: {
  value?: number;
  icon?: React.ReactNode;
  l1: string;
  l2: string;
  live?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 px-5 py-5 lg:px-7">
      {icon ? (
        <span className="text-ink">{icon}</span>
      ) : (
        <CountUp
          to={value ?? 0}
          className="font-display text-4xl font-extrabold tabular-nums leading-none"
        />
      )}
      <span className="font-mono text-[10px] uppercase leading-tight tracking-wider">
        <span className="flex items-center gap-1.5 text-ink">
          {l1}
          {live && <span className="h-1.5 w-1.5 rounded-full bg-alive" />}
        </span>
        <span className="text-muted">{l2}</span>
      </span>
    </div>
  );
}

export function StatsBar({
  providers,
  models,
  agents,
}: {
  providers: number;
  models: number;
  agents: number;
}) {
  return (
    <section className="border-y border-line bg-paper/50">
      <div className="mx-auto flex max-w-6xl items-stretch px-4">
        <Barcode seed="AF-STATS-L" count={16} className="my-auto hidden h-9 w-9 text-ink md:flex" />
        <div className="flex flex-1 flex-wrap items-center justify-around divide-line lg:divide-x">
          <Stat value={providers} l1="Active providers" l2="Verified daily" live />
          <Stat value={models} l1="Verified models" l2="And growing" />
          <Stat value={agents} l1="Agent integrations" l2="Plug and play" />
          <Stat
            icon={
              <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <path d="M12 3l7 3v5c0 4.4-3 7.7-7 9-4-1.3-7-4.6-7-9V6l7-3z" strokeLinejoin="round" />
                <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            l1="Your API key"
            l2="Never stored"
          />
        </div>
        <Barcode seed="AF-STATS-R" count={16} className="my-auto hidden h-9 w-9 text-ink md:flex" />
      </div>
    </section>
  );
}
