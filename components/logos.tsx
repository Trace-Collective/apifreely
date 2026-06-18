/* Brand + UI marks. Real providers use official SVG paths (Simple Icons) on
   brand-colored app-icon tiles; a few keep hand-crafted multicolor marks where
   the official silhouette would lose the brand (Mistral grid, Groq wordmark). */

import { BRAND_PATHS } from "./brand-icons";

const OCTAGON =
  "polygon(20% 0, 80% 0, 100% 30%, 100% 70%, 80% 100%, 20% 100%, 0 70%, 0 30%)";

/** Primary "API_" badge mark (brand Variant 1 — industrial). */
export function ApiMark({ className = "h-8" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center bg-ink font-mono font-bold leading-none text-paper ${className}`}
      style={{ clipPath: OCTAGON }}
    >
      <span className="px-2.5 text-[14px] tracking-tight">
        API<span className="text-accent">_</span>
      </span>
    </span>
  );
}

/** Minimal octagon glyph (brand Variant 2) for favicon / OG / SVG contexts. */
export function ApiGlyph({
  className = "",
  fill = "#080808",
  dash = "#FF5A00",
}: {
  className?: string;
  fill?: string;
  dash?: string;
}) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden>
      <path d="M12 0H52L64 12V28L52 40H12L0 28V12Z" fill={fill} />
      <rect x="37" y="28" width="15" height="4" fill={dash} />
    </svg>
  );
}

function Tile({
  background,
  children,
  className = "",
}: {
  background: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`flex items-center justify-center rounded-[27%] ${className}`}
      style={{ background }}
    >
      {children}
    </span>
  );
}

/** Official-path brand icon on a colored tile. */
function BrandTile({
  slug,
  background,
  icon = "#fff",
  scale = 0.58,
  className = "",
}: {
  slug: keyof typeof BRAND_PATHS | string;
  background: string;
  icon?: string;
  scale?: number;
  className?: string;
}) {
  const d = BRAND_PATHS[slug as keyof typeof BRAND_PATHS];
  return (
    <Tile background={background} className={className}>
      <svg
        viewBox="0 0 24 24"
        style={{ width: `${scale * 100}%`, height: `${scale * 100}%` }}
        fill={icon}
        aria-hidden
      >
        <path d={d} />
      </svg>
    </Tile>
  );
}

function ColorMark({
  color,
  letter,
  className = "",
}: {
  color: string;
  letter: string;
  className?: string;
}) {
  return (
    <Tile background={color} className={className}>
      <span className="font-display text-[0.42em] font-extrabold uppercase text-white">
        {letter}
      </span>
    </Tile>
  );
}

const BRAND: Record<string, { color: string; letter: string }> = {
  cerebras: { color: "#F15A29", letter: "CB" },
  sambanova: { color: "#EE3124", letter: "SN" },
  together: { color: "#0F6FFF", letter: "T" },
  inferall: { color: "#6D28D9", letter: "IF" },
  sauna: { color: "#0EA5E9", letter: "SA" },
  aerolink: { color: "#1E40AF", letter: "AE" },
  junior: { color: "#DB2777", letter: "JR" },
  zhipu: { color: "#3859FF", letter: "GLM" },
  moonshot: { color: "#16171B", letter: "K2" },
  siliconflow: { color: "#6D28D9", letter: "SF" },
  zenmux: { color: "#7C3AED", letter: "ZM" },
};

export function ProviderLogo({
  id,
  className = "h-11 w-11",
}: {
  id: string;
  className?: string;
}) {
  switch (id) {
    case "groq":
      return (
        <Tile background="#F55B2A" className={className}>
          <span
            className="font-display text-[0.46em] font-bold lowercase text-white"
            style={{ letterSpacing: "-0.03em" }}
          >
            groq
          </span>
        </Tile>
      );
    case "google-ai-studio":
      return (
        <BrandTile
          slug="googlegemini"
          background="linear-gradient(140deg,#4B8DF8 0%,#7B6BF0 55%,#9168D6 100%)"
          scale={0.6}
          className={className}
        />
      );
    case "openrouter":
      return <BrandTile slug="openrouter" background="#6467F2" scale={0.62} className={className} />;
    case "mistral":
      return (
        <Tile background="#FF7000" className={className}>
          <svg viewBox="0 0 20 20" className="h-[64%] w-[64%]" aria-hidden>
            <rect x="0" y="0" width="9" height="9" fill="#FF7000" />
            <rect x="11" y="0" width="9" height="9" fill="#0E0E0E" />
            <rect x="0" y="11" width="9" height="9" fill="#0E0E0E" />
            <rect x="11" y="11" width="9" height="9" fill="#FFD000" />
          </svg>
        </Tile>
      );
    case "cohere":
      return (
        <Tile background="#0A0A0A" className={className}>
          <svg viewBox="0 0 24 24" className="h-[52%] w-[52%]" fill="none" aria-hidden>
            <path d="M9 8.5c0-2 1.6-3.5 3.6-3.5H18" stroke="#FF7759" strokeWidth="3" strokeLinecap="round" />
            <path d="M6 15.5c0 2 1.6 3.5 3.6 3.5H12" stroke="#39A0A0" strokeWidth="3" strokeLinecap="round" />
            <circle cx="8" cy="12" r="2.6" fill="#fff" />
          </svg>
        </Tile>
      );
    case "github-models":
      return <BrandTile slug="github" background="#181717" scale={0.64} className={className} />;
    case "cloudflare-workers-ai":
      return <BrandTile slug="cloudflare" background="#F38020" scale={0.66} className={className} />;
    case "qwen":
      return <BrandTile slug="qwen" background="#615CED" scale={0.58} className={className} />;
    case "deepseek":
      return <BrandTile slug="deepseek" background="#4D6BFE" scale={0.62} className={className} />;
    default: {
      const b = BRAND[id] ?? { color: "#1B1B19", letter: id.charAt(0).toUpperCase() };
      return <ColorMark color={b.color} letter={b.letter} className={className} />;
    }
  }
}

const AGENT_PATHS: Record<string, React.ReactNode> = {
  "claude-code": <path d="M12 3.5v17M5.2 7l13.6 10M18.8 7L5.2 17" />,
  aider: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 10l2.6 2L7 14M12.5 14H17" />
    </>
  ),
  windsurf: (
    <path d="M3 8c3-2 6 2 9 0s6-2 9 0M3 13c3-2 6 2 9 0s6-2 9 0M3 18c3-2 6 2 9 0s6-2 9 0" />
  ),
  cline: (
    <>
      <rect x="4" y="7" width="16" height="12" rx="2" />
      <path d="M12 4v3M9 12h.01M15 12h.01" />
    </>
  ),
  roo: (
    <>
      <path d="M5 19V11a7 7 0 0 1 14 0v8l-2.5-2-2 2-2.5-2-2 2L8 19l-3 0z" />
      <path d="M10 11h.01M14 11h.01" />
    </>
  ),
  continue: <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />,
  cursor: (
    <>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
    </>
  ),
  hermes: <path d="M12 12L4 5v14l8-7zM12 12l8-7v14l-8-7z" />,
  openclaw: <path d="M6 4v8a6 6 0 0 0 12 0V4M9 4v7M15 4v7" />,
  librechat: (
    <>
      <path d="M4 6h16v10H9l-4 4v-4H4z" />
      <path d="M8 11h.01M12 11h.01M16 11h.01" />
    </>
  ),
};

export function AgentIcon({
  id,
  className = "h-5 w-5",
}: {
  id: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {AGENT_PATHS[id] ?? <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}
