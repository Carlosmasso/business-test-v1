import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 7,
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
          fontWeight: 800,
          fontSize: 20,
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
