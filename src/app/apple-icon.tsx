import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#10233d",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
          fontWeight: 800,
          fontSize: 96,
        }}
      >
        <span>
          K<span style={{ color: "#14b8a6" }}>.</span>
        </span>
      </div>
    ),
    { ...size }
  );
}
