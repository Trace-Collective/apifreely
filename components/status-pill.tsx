import type { Status } from "@/lib/types";

const MAP: Record<Status, { label: string; dot: string; text: string }> = {
  alive: { label: "ALIVE", dot: "bg-alive", text: "text-alive" },
  expired: { label: "EXPIRED", dot: "bg-accent", text: "text-accent" },
  unknown: { label: "UNKNOWN", dot: "bg-warn", text: "text-warn" },
};

export function StatusPill({ status }: { status: Status }) {
  const s = MAP[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${s.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}
