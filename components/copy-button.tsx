"use client";

import { useState } from "react";

export function CopyButton({
  text,
  label = "COPY",
  className = "",
}: {
  text: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard blocked — no-op
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`cursor-pointer rounded-md border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors hover:bg-accent hover:text-accent-ink ${className}`}
    >
      {copied ? "COPIED ✓" : label}
    </button>
  );
}
