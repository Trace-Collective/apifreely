"use client";

import { useState } from "react";
import { BracketLabel } from "./bracket-label";

type State = "idle" | "sending" | "ok" | "error";

function Input({
  label,
  name,
  placeholder,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <BracketLabel>
        {label}
        {required ? " *" : ""}
      </BracketLabel>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2.5 font-mono text-[12px] shadow-sm outline-none placeholder:text-muted focus:border-concrete"
      />
    </label>
  );
}

export function SubmitForm() {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Submission failed");
      setState("ok");
      setMessage(json.message ?? "Thanks — your tip is in the moderation queue.");
      form.reset();
    } catch (err) {
      setState("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "ok") {
    return (
      <div className="rounded-2xl border border-line bg-paper p-8 text-center shadow-sm">
        <p className="font-display text-2xl font-bold text-alive">SUBMITTED ✓</p>
        <p className="mt-2 text-[13px] text-muted">{message}</p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-5 rounded-lg border border-ink bg-ink px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-paper transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
      <Input label="Provider name" name="name" placeholder="e.g. Groq" required />
      <label className="block">
        <BracketLabel>Category *</BracketLabel>
        <select
          name="category"
          required
          defaultValue="free-tier"
          className="mt-2 w-full appearance-none rounded-lg border border-line bg-paper px-3 py-2.5 font-mono text-[12px] shadow-sm outline-none focus:border-concrete"
        >
          <option value="free-tier">Free tier</option>
          <option value="trial">Trial</option>
          <option value="promo">Promo / limited</option>
        </select>
      </label>
      <Input
        label="Source (X post / docs URL)"
        name="sourceUrl"
        placeholder="https://x.com/…  or  docs link"
        required
        type="url"
      />
      <Input label="Signup URL" name="signupUrl" placeholder="https://…" type="url" />
      <Input label="Base URL (OpenAI-compatible)" name="baseUrl" placeholder="https://api…/v1" />
      <Input label="Example model id" name="model" placeholder="llama-3.3-70b" />
      <label className="block md:col-span-2">
        <BracketLabel>What is free about it? *</BracketLabel>
        <textarea
          name="freeDetails"
          required
          rows={3}
          placeholder="Free tier limits, how to get the key, any expiry…"
          className="mt-2 w-full resize-y rounded-lg border border-line bg-paper px-3 py-2.5 font-mono text-[12px] shadow-sm outline-none placeholder:text-muted focus:border-concrete"
        />
      </label>

      <div className="md:col-span-2 rounded-lg border border-line bg-bg p-3 font-mono text-[10px] uppercase leading-relaxed tracking-wider text-muted">
        ★ Do not submit API keys, trial-abuse / multi-account tricks, or leaked
        credentials — those get rejected. Share legit free tiers & promos only.
      </div>

      {state === "error" && (
        <p className="md:col-span-2 rounded-lg border border-accent bg-accent/[0.06] px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-accent">
          {message}
        </p>
      )}

      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={state === "sending"}
          className="w-full rounded-xl border border-accent bg-accent px-4 py-3.5 font-mono text-[12px] uppercase tracking-wider text-accent-ink shadow-sm transition-colors hover:border-ink hover:bg-ink hover:text-paper disabled:opacity-50"
        >
          {state === "sending" ? "Sending…" : "Submit to moderation queue →"}
        </button>
      </div>
    </form>
  );
}
