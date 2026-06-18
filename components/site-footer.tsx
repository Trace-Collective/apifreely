import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono uppercase tracking-wider">
          © 2026 apifreely.com
        </span>
        <span className="font-mono uppercase tracking-wider text-accent">
          ★ we never see your api keys
        </span>
        <div className="flex gap-4">
          <Link href="/providers" className="font-mono uppercase tracking-wider hover:text-ink">
            Providers
          </Link>
          <Link href="/submit" className="font-mono uppercase tracking-wider hover:text-ink">
            Contribute
          </Link>
        </div>
      </div>
    </footer>
  );
}
