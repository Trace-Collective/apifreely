import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="32" height="20" viewBox="0 0 64 40">
          <path d="M12 0H52L64 12V28L52 40H12L0 28V12Z" fill="#080808" />
          <rect x="37" y="28" width="15" height="4" fill="#FF5A00" />
        </svg>
      </div>
    ),
    size,
  );
}
