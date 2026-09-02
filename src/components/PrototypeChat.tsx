"use client";

import { useState } from "react";
import type { Slot } from "@/lib/googleCalendar";

type Message = { kind: "bot" | "user" | "system"; text: string };
type Stage = "start" | "loading" | "slots" | "booking" | "done";

function formatSlot(slot: Slot) {
  const start = new Date(slot.start);
  const dayLabel = start.toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short" });
  const timeLabel = start.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
  return `${dayLabel} · ${timeLabel}`;
}

export default function PrototypeChat() {
  const [messages, setMessages] = useState<Message[]>([
    { kind: "bot", text: "¡Hola! 👋 Soy el asistente de Clínica Dental Sonrisa. ¿En qué puedo ayudarte?" },
  ]);
  const [stage, setStage] = useState<Stage>("start");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [notConfigured, setNotConfigured] = useState(false);
  const [bookedLink, setBookedLink] = useState<string | null>(null);

  function addBubble(text: string, kind: Message["kind"] = "bot") {
    setMessages((prev) => [...prev, { kind, text }]);
  }

  async function handleAgendar() {
    addBubble("Quiero agendar una cita", "user");
    setStage("loading");
    addBubble("Un momento, miro la disponibilidad real de la agenda...");
    await new Promise((resolve) => setTimeout(resolve, 400));

    try {
      const res = await fetch("/api/availability");
      const data = await res.json();
      if (res.status === 503 || data.error === "NOT_CONFIGURED") {
        setNotConfigured(true);
        addBubble(
          "Todavía no tengo acceso a un calendario real — faltan las credenciales de Google Calendar en este entorno."
        );
        setStage("start");
        return;
      }
      if (!res.ok) throw new Error(data.error ?? "unknown");

      const availableSlots: Slot[] = data.slots ?? [];
      if (availableSlots.length === 0) {
        addBubble("No he encontrado huecos libres en los próximos días. Prueba más adelante.");
        setStage("start");
        return;
      }
      setSlots(availableSlots);
      addBubble("Estos son los próximos huecos libres de verdad en la agenda:");
      setStage("slots");
    } catch {
      addBubble("No he podido consultar la agenda ahora mismo. Inténtalo de nuevo en un momento.");
      setStage("start");
    }
  }

  async function handlePickSlot(slot: Slot) {
    addBubble(formatSlot(slot), "user");
    setStage("booking");
    addBubble("Reservando el hueco en el calendario real...");
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slot }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "unknown");

      addBubble("Cita confirmada ✅ Se ha creado de verdad en el calendario conectado.");
      setBookedLink(data.htmlLink ?? null);
      setStage("done");
    } catch {
      addBubble("No he podido crear la cita en el calendario. Vuelve a intentarlo.");
      setStage("start");
    }
  }

  function handleFaq(question: string, answer: string) {
    addBubble(question, "user");
    setTimeout(() => addBubble(answer), 300);
  }

  function restart() {
    setMessages([
      { kind: "bot", text: "¡Hola! 👋 Soy el asistente de Clínica Dental Sonrisa. ¿En qué puedo ayudarte?" },
    ]);
    setStage("start");
    setSlots([]);
    setNotConfigured(false);
    setBookedLink(null);
  }

  return (
    <div className="waWindow" style={{ maxWidth: 420 }}>
      <div className="waHeader">
        <span className="waAvatar">🦷</span>
        <div>
          <strong>Clínica Dental Sonrisa</strong>
          <span>Prototipo — agenda real</span>
        </div>
      </div>
      <div className="waBody" style={{ minHeight: 320 }}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={`waBubble ${m.kind === "bot" ? "waBubbleIn" : m.kind === "user" ? "waBubbleOut" : "waBubbleIn"}`}
          >
            <span>{m.text}</span>
          </div>
        ))}

        {stage === "start" && (
          <div className="chatQuickReplies" style={{ padding: "4px 0 0", background: "transparent" }}>
            <button className="chatQuickReply" onClick={handleAgendar}>
              Agendar una cita
            </button>
            <button
              className="chatQuickReply"
              onClick={() => handleFaq("¿Cuál es vuestro horario?", "Abrimos de lunes a viernes de 9:00 a 20:00, y sábados de 10:00 a 14:00.")}
            >
              Ver horarios
            </button>
            <button
              className="chatQuickReply"
              onClick={() => handleFaq("¿Cuánto cuesta una limpieza dental?", "Una limpieza dental estándar cuesta 45€.")}
            >
              Precio limpieza dental
            </button>
          </div>
        )}

        {stage === "slots" && (
          <div className="chatQuickReplies" style={{ padding: "4px 0 0", background: "transparent" }}>
            {slots.map((slot) => (
              <button key={slot.start} className="chatQuickReply" onClick={() => handlePickSlot(slot)}>
                {formatSlot(slot)}
              </button>
            ))}
          </div>
        )}

        {stage === "done" && bookedLink && (
          <a href={bookedLink} target="_blank" rel="noopener noreferrer" className="btn btnGhost btnSm" style={{ alignSelf: "flex-start" }}>
            Ver el evento creado →
          </a>
        )}
      </div>
      <div className="chatFooter">
        <button className="chatRestart" onClick={restart}>
          ↺ Reiniciar
        </button>
        {notConfigured && <span style={{ marginLeft: 12, fontSize: "0.75rem", color: "var(--muted)" }}>Sin credenciales configuradas</span>}
      </div>
    </div>
  );
}
