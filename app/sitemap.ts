import type { MetadataRoute } from "next";
import { providers } from "@/data/providers";
import { agents } from "@/data/agents";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://apifreely.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/providers",
    "/setup-guides",
    "/generator",
    "/status",
    "/community",
    "/submit",
  ].map((p) => ({ url: `${BASE}${p}`, lastModified: now }));
  const providerRoutes = providers.map((p) => ({
    url: `${BASE}/providers/${p.id}`,
    lastModified: now,
  }));
  const guideRoutes = agents.map((a) => ({
    url: `${BASE}/setup-guides/${a.id}`,
    lastModified: now,
  }));
  return [...staticRoutes, ...providerRoutes, ...guideRoutes];
}
