"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { CopyButton } from "./copy-button";
import { Barcode } from "./barcode";
import { EASE } from "./motion";

type Tok = { t: string; c?: "cmt" | "val" };
const LINES: Tok[][] = [
  [{ t: "# Paste this prompt into Cline", c: "cmt" }],
  [{ t: "# This will configure Groq API for you", c: "cmt" }],
  [],
  [{ t: "I want you to help me configure Groq as my LLM provider." }],
  [{ t: "Use the OpenAI-compatible endpoint." }],
  [],
  [{ t: "Base URL: " }, { t: "https://api.groq.com/openai/v1", c: "val" }],
  [{ t: "Model: " }, { t: "llama-3.3-70b-versatile", c: "val" }],
  [{ t: "API Key: " }, { t: "YOUR_API_KEY_HERE", c: "val" }],
  [],
  [{ t: "Steps:" }],
  [{ t: "1. Add the Groq provider" }],
  [{ t: "2. Set it as default" }],
  [{ t: "3. Verify the connection" }],
];

const PLAIN = LINES.map((l) => l.map((t) => t.t).join("")).join("\n");

function tokClass(c?: Tok["c"]) {
  if (c === "cmt") return "text-accent";
  if (c === "val") return "text-[#E8B84B]";
  return "text-panel-ink";
}

const HAZARD = {
  backgroundImage:
    "repeating-linear-gradient(-45deg, var(--color-accent) 0 7px, transparent 7px 14px)",
};

const container: Variants = {
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.25 } },
};
const lineV: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.32, ease: EASE } },
};

export function HeroCodePanel() {
  const reduce = useReducedMotion();
  return (
    <div className="relative flex overflow-hidden rounded-2xl border border-line bg-panel text-panel-ink shadow-[0_22px_55px_-18px_rgba(14,14,14,0.45)]">
      <div className="min-w-0 flex-1">
        {/* header */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
            <span className="text-accent">Setup preview</span>
            <span className="text-panel-muted">›</span>
            <span className="text-panel-ink">Groq + Cline</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/generator"
              className="font-mono text-[10px] uppercase tracking-wider text-panel-muted transition-colors hover:text-panel-ink"
            >
              Generate prompt
            </Link>
            <Barcode seed="AF-PROMPT" count={18} className="hidden h-4 text-panel-ink sm:flex" />
          </div>
        </div>

        {/* code body */}
        <motion.div
          className="px-3 py-3 font-mono text-[12.5px] leading-[1.55]"
          variants={reduce ? undefined : container}
          initial={reduce ? false : "hidden"}
          animate="show"
        >
          {LINES.map((line, i) => (
            <motion.div key={i} className="flex gap-3" variants={reduce ? undefined : lineV}>
              <span className="w-5 shrink-0 select-none text-right text-panel-muted/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 whitespace-pre-wrap break-words">
                {line.length === 0 ? (
                  <span>&nbsp;</span>
                ) : (
                  line.map((tok, j) => (
                    <span key={j} className={tokClass(tok.c)}>
                      {tok.t}
                    </span>
                  ))
                )}
                {i === LINES.length - 1 && (
                  <span className="animate-blink ml-1 inline-block h-[1.05em] w-[7px] translate-y-[2px] bg-accent" />
                )}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* footer */}
        <div className="flex items-center gap-3 border-t border-white/10 px-4 py-2.5">
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-panel-muted">
            Target agent:
            <span className="rounded-md border border-white/15 px-2 py-0.5 text-panel-ink">
              ◎ Cline
            </span>
          </span>
          <span className="mx-1 hidden h-3 flex-1 rounded-sm sm:block" style={HAZARD} />
          <CopyButton
            text={PLAIN}
            label="Copy prompt"
            className="rounded-lg border-accent bg-accent px-4 py-1.5 text-accent-ink"
          />
        </div>
      </div>

      {/* right barcode rail */}
      <div className="hidden flex-col items-center justify-between border-l border-white/10 px-1.5 py-3 lg:flex">
        <Barcode seed="AF-PROMPT-081" count={22} vertical className="w-3 text-panel-ink" />
        <span className="rotate-180 font-mono text-[8px] uppercase tracking-widest text-panel-muted [writing-mode:vertical-rl]">
          AF-PROMPT-081
        </span>
      </div>
    </div>
  );
}
