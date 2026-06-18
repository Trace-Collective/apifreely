import { CopyButton } from "./copy-button";

export function CodeBlock({
  code,
  label,
}: {
  code: string;
  label?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-panel text-panel-ink">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-panel-muted">
          {label ?? "code"}
        </span>
        <CopyButton
          text={code}
          className="border-white/25 text-panel-ink"
        />
      </div>
      <pre className="overflow-x-auto px-4 py-3 text-[12px] leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
