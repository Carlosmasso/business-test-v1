import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 90px",
          background:
            "radial-gradient(circle at 15% 15%, #16344f 0%, #10233d 45%, #0b1a2e 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 40, fontWeight: 800, color: "#fff" }}>
          <span>
            Kairo<span style={{ color: "#14b8a6" }}>.</span>
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 920 }}>
          <span
            style={{
              alignSelf: "flex-start",
              fontSize: 24,
              fontWeight: 600,
              color: "#14b8a6",
              background: "rgba(20, 184, 166, 0.14)",
              padding: "8px 20px",
              borderRadius: 999,
            }}
          >
            Para clínicas dentales, fisioterapia y centros de estética
          </span>
          <span style={{ fontSize: 64, fontWeight: 800, color: "#fff", lineHeight: 1.15, letterSpacing: -1 }}>
            Deja de perder pacientes por no responder a tiempo
          </span>
          <span style={{ fontSize: 30, color: "rgba(255,255,255,0.75)", lineHeight: 1.4 }}>
            Un agente de IA que atiende tu WhatsApp 24/7 y agenda citas por ti.
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
