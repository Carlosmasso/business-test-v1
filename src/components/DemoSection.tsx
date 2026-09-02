"use client";

import { useState } from "react";
import ChatDemo, { Kanban } from "./ChatDemo";

type LeadStage = "nuevo" | "contactado" | "agendado";
type LeadState = { stage: LeadStage; label: string };

export default function DemoSection() {
  const [lead, setLead] = useState<LeadState | null>(null);

  return (
    <section id="demo" className="demo">
      <div className="container demoInner">
        <div>
          <h2 className="sectionTitle">Pruébalo tú mismo</h2>
          <p className="sectionSub">
            Esta es una demo funcional de cómo un paciente agendaría una cita hablando con el agente
            de una clínica dental ficticia. Haz clic en las opciones para avanzar la conversación.
          </p>
          <div className="demoHint">👉 Abre el chat de la esquina inferior derecha</div>
        </div>
        <div className="demoCrm">
          <h3 className="demoCrmTitle">Así llega el lead a tu CRM, en tiempo real</h3>
          <Kanban lead={lead} />
          <p className="demoCrmNote">La tarjeta se mueve sola a medida que avanzas la conversación del chat.</p>
        </div>
      </div>
      <ChatDemo onLeadChange={setLead} />
    </section>
  );
}
