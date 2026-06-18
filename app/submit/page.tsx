import type { Metadata } from "next";
import { SubmitForm } from "@/components/submit-form";
import { BracketLabel } from "@/components/bracket-label";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Submit a free API — apifreely",
  description:
    "Found a free LLM API or credit on X? Submit it to the community moderation queue.",
};

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Reveal className="mb-8 border-b border-line pb-5">
        <BracketLabel>Contribute</BracketLabel>
        <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight">
          Help the community.
          <br />
          Submit a free API.
        </h1>
        <p className="mt-3 max-w-2xl text-[13px] text-muted">
          Spotted a free tier or a credit drop on X? Drop the link and details
          here. It goes into a moderation queue — expired and abuse-style tips
          get filtered out so the list stays trustworthy.
        </p>
      </Reveal>
      <SubmitForm />
    </div>
  );
}
