"use client";

import { useState, type ReactNode } from "react";

export type Tab = { id: string; label: string; content: ReactNode };

/** Reusable tab control. All panels stay in the DOM (toggled via `hidden`) so
 *  content remains SEO-indexable. */
export function Tabs({ tabs, className = "" }: { tabs: Tab[]; className?: string }) {
  const [active, setActive] = useState(tabs[0]?.id);
  return (
    <div className={className}>
      <div className="flex flex-wrap gap-0.5 border-b border-line">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            className={`-mb-px border-b-2 px-3 py-2.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              active === t.id
                ? "border-accent text-accent"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div key={t.id} hidden={t.id !== active} className="pt-5">
          {t.content}
        </div>
      ))}
    </div>
  );
}
