import type { Metadata } from "next";
import PrototypeChat from "@/components/PrototypeChat";

export const metadata: Metadata = {
  title: "Prototipo — Kairo",
  robots: { index: false, follow: false },
};

export default function PrototipoPage() {
  return (
    <main>
      <section className="hero" style={{ paddingBottom: 40 }}>
        <div className="container heroInner">
          <span className="eyebrow">Página interna — no enlazada públicamente</span>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>Prototipo con calendario real</h1>
          <p className="heroLead">
            A diferencia de la demo pública (que sigue un guion fijo), este chat consulta la
            disponibilidad real de un Google Calendar y crea la cita de verdad al confirmarla.
            Sin texto libre todavía — solo botones, igual que la demo.
          </p>
        </div>
      </section>
      <section style={{ padding: "0 0 88px" }}>
        <div className="container">
          <PrototypeChat />
        </div>
      </section>
    </main>
  );
}
