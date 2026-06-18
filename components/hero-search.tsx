"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const POPULAR = ["Groq", "Gemini", "OpenRouter", "Mistral", "Claude"];

export function HeroSearch() {
  const [q, setQ] = useState("");
  const router = useRouter();

  function go(term: string) {
    const t = term.trim();
    router.push(t ? `/providers?q=${encodeURIComponent(t)}` : "/providers");
  }

  return (
    <div className="max-w-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          go(q);
        }}
        className="flex items-center gap-2 rounded-xl border border-line bg-paper px-4 py-3.5 shadow-sm transition-colors focus-within:border-concrete"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-muted" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" strokeLinecap="round" />
        </svg>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search provider, model, or agent…"
          className="min-w-0 flex-1 bg-transparent font-mono text-[13px] outline-none placeholder:text-muted"
        />
        <kbd className="hidden shrink-0 rounded-md border border-line px-2 py-0.5 font-mono text-[10px] text-muted sm:block">
          ⌘ K
        </kbd>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
          Popular searches:
        </span>
        {POPULAR.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => go(p)}
            className="rounded-lg border border-line bg-paper px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink shadow-sm transition-colors hover:border-concrete hover:text-accent"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
