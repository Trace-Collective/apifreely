"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-start px-4 py-24">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        <span className="text-accent">[</span> Error <span className="text-accent">]</span>
      </span>
      <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight">
        Something broke.
      </h1>
      <p className="mt-3 max-w-md text-[14px] leading-relaxed text-muted">
        An unexpected error occurred while loading this page. You can retry — if
        it keeps happening, the upstream provider may be down.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-7 rounded-xl border border-accent bg-accent px-5 py-3 font-mono text-[12px] uppercase tracking-wider text-accent-ink shadow-sm transition-colors hover:border-ink hover:bg-ink hover:text-paper"
      >
        Try again
      </button>
    </div>
  );
}
