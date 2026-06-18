import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { providers, getProvider } from "@/data/providers";
import { StatusPill } from "@/components/status-pill";
import { BracketLabel } from "@/components/bracket-label";
import { ProviderLogo } from "@/components/logos";
import { QuickSetup } from "@/components/quick-setup";
import { ProviderTabs } from "@/components/provider-tabs";
import { Reveal } from "@/components/motion";
import { websiteHost, docsUrl, authLabel } from "@/lib/providerMeta";

export function generateStaticParams() {
  return providers.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const provider = getProvider(id);
  if (!provider) return { title: "Not found — apifreely" };
  return {
    title: `${provider.name} — free setup · apifreely`,
    description: provider.freeDetails,
  };
}

function Row({ label, children }: { label: string; children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <div className="flex items-center justify-between gap-3 border-t border-line-soft py-2 text-[12.5px] first:border-0">
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
        {label}
      </span>
      <span className="truncate text-right">{children}</span>
    </div>
  );
}

export default async function ProviderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const provider = getProvider(id);
  if (!provider) notFound();

  const docs = docsUrl(provider);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* breadcrumb */}
      <Link
        href="/providers"
        className="font-mono text-[11px] uppercase tracking-wider text-muted hover:text-ink"
      >
        ← all providers
      </Link>

      {/* header */}
      <div className="mt-4 flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <ProviderLogo id={provider.id} className="h-14 w-14 shrink-0" />
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-display text-3xl font-extrabold tracking-tight">
                {provider.name}
              </h1>
              <StatusPill status={provider.status} />
            </div>
            <p className="mt-1 text-[13px] text-muted">{provider.tagline}</p>
          </div>
        </div>
        <a
          href={provider.signupUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-xl border border-accent bg-accent px-4 py-2.5 text-center font-mono text-[12px] uppercase tracking-wider text-accent-ink shadow-sm transition-colors hover:border-ink hover:bg-ink hover:text-paper"
        >
          Get a free key →
        </a>
      </div>

      {/* body: tabs + rail */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_330px]">
        <Reveal className="order-2 min-w-0 lg:order-1">
          <ProviderTabs provider={provider} />
        </Reveal>

        <div className="order-1 space-y-4 lg:order-2">
          <QuickSetup provider={provider} />

          <div className="rounded-2xl border border-line bg-paper p-4 shadow-sm">
            <BracketLabel>General info</BracketLabel>
            <div className="mt-2">
              <Row label="Website">
                <a
                  href={provider.signupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  {websiteHost(provider)}
                </a>
              </Row>
              {docs && (
                <Row label="Docs">
                  <a
                    href={docs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    docs ↗
                  </a>
                </Row>
              )}
              <Row label="Category">{provider.category}</Row>
              <Row label="Status">{provider.status}</Row>
              <Row label="OpenAI-compatible">
                {provider.openaiCompatible ? "Yes" : "No"}
              </Row>
              <Row label="Auth">{authLabel(provider)}</Row>
              <Row label="Source">{provider.source.type}</Row>
              <Row label="Added">{provider.added}</Row>
              {provider.expires && (
                <Row label="Expires">
                  <span className="text-warn">{provider.expires}</span>
                </Row>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-paper p-4 shadow-sm">
            <BracketLabel>Rate limit</BracketLabel>
            <p className="mt-2 text-[13px] leading-snug">{provider.rateLimit}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-accent">
              {provider.rateShort}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
