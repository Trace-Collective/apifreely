import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// Type system per brand sheet: Archivo (heavy display), IBM Plex Mono (UI/labels/code),
// Inter (body).
const display = Archivo({
  variable: "--font-display-src",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono-src",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Inter({
  variable: "--font-body-src",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://apifreely.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "apifreely — Free LLM APIs, ready in 30 seconds",
    template: "%s",
  },
  description:
    "A free & open directory of LLM APIs for developers. Discover free tiers, get copy-paste setup for your agent, and let it configure itself. We never see your keys.",
  keywords: [
    "free LLM API",
    "free AI API",
    "OpenAI compatible",
    "Groq",
    "Gemini",
    "GLM",
    "DeepSeek",
    "Qwen",
    "Claude Code",
    "Cline",
    "free API directory",
  ],
  applicationName: "apifreely",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "apifreely",
    title: "apifreely — Free LLM APIs, ready in 30 seconds",
    description:
      "Find free & free-tier LLM APIs and connect them to your agent in seconds. We never see your keys.",
  },
  twitter: {
    card: "summary_large_image",
    title: "apifreely — Free LLM APIs, ready in 30 seconds",
    description:
      "Find free & free-tier LLM APIs and connect them to your agent in seconds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
