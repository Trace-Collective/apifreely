import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const alt = "apifreely — Free LLM APIs, ready in 30 seconds";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const badge = `data:image/svg+xml;base64,${readFileSync(
  join(process.cwd(), "public", "logo-badge-orange.svg"),
).toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#FAFAF8",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={badge} width={150} height={75} alt="" />
          <div style={{ display: "flex", fontSize: 42, fontWeight: 800, color: "#080808" }}>
            apifreely
          </div>
        </div>

        <div
          style={{
            marginTop: 44,
            display: "flex",
            flexDirection: "column",
            fontSize: 82,
            fontWeight: 800,
            color: "#080808",
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          <span>Free LLM APIs,</span>
          <span style={{ color: "#FF5A00" }}>ready in 30 seconds.</span>
        </div>

        <div style={{ display: "flex", marginTop: 34, fontSize: 28, color: "#6B7280" }}>
          A free &amp; open directory of LLM APIs · we never see your keys
        </div>
      </div>
    ),
    size,
  );
}
