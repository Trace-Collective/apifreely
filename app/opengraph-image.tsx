import { ImageResponse } from "next/og";

export const alt = "apifreely — Free LLM APIs, ready in 30 seconds";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="96" height="60" viewBox="0 0 64 40">
            <path d="M12 0H52L64 12V28L52 40H12L0 28V12Z" fill="#080808" />
            <rect x="37" y="28" width="15" height="4" fill="#FF5A00" />
          </svg>
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
