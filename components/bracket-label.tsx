export function BracketLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-mono text-[11px] uppercase tracking-[0.18em] text-muted ${className}`}
    >
      <span className="text-accent">[</span> {children}{" "}
      <span className="text-accent">]</span>
    </span>
  );
}
