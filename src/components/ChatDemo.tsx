"use client";

import { useEffect, useRef, useState } from "react";

type Message = { kind: "bot" | "user" | "system"; text: string };
type Option = { label: string; userText: string | null; next: string };
type LeadStage = "nuevo" | "contactado" | "agendado";
type Node = {
  bot: string;
  system?: string;
  options: Option[];
  onEnter?: LeadStage;
  leadLabel?: string;
};

const SCRIPT: Record<string, Node> = {
  start: {
    bot: "¡Hola! 👋 Soy el asistente de Clínica Dental Sonrisa. ¿En qué puedo ayudarte?",
    options: [
      { label: "Agendar una cita", userText: "Quiero agendar una cita", next: "tipoConsulta" },
      { label: "Ver horarios", userText: "¿Cuál es vuestro horario?", next: "horario" },
      { label: "Precio limpieza dental", userText: "¿Cuánto cuesta una limpieza dental?", next: "precio" },
    ],
  },
  horario: {
    bot: "Abrimos de lunes a viernes de 9:00 a 20:00, y sábados de 10:00 a 14:00. ¿Quieres que te agende una cita?",
    options: [
      { label: "Sí, agendar cita", userText: "Sí, agéndame una cita", next: "tipoConsulta" },
      { label: "No, gracias", userText: "No, gracias", next: "finSinCita" },
    ],
  },
  precio: {
    bot: "Una limpieza dental estándar cuesta 45€. ¿Quieres reservar hora?",
    options: [
      { label: "Sí, reservar", userText: "Sí, quiero reservar", next: "confirmarLimpieza" },
      { label: "No, gracias", userText: "No, gracias", next: "finSinCita" },
    ],
  },
  tipoConsulta: {
    bot: "Perfecto, ¿qué tipo de consulta necesitas?",
    options: [
      { label: "Limpieza dental", userText: "Limpieza dental", next: "confirmarLimpieza" },
      { label: "Revisión general", userText: "Revisión general", next: "confirmarRevision" },
      { label: "Urgencia", userText: "Es una urgencia", next: "urgencia" },
    ],
  },
  confirmarLimpieza: {
    bot: "Tenemos disponibilidad este jueves a las 16:00 o el viernes a las 10:30. ¿Cuál prefieres?",
    onEnter: "contactado",
    leadLabel: "Pide: limpieza dental",
    options: [
      { label: "Jueves 16:00", userText: "Jueves 16:00, por favor", next: "confirmada" },
      { label: "Viernes 10:30", userText: "Viernes 10:30, por favor", next: "confirmada" },
    ],
  },
  confirmarRevision: {
    bot: "Para una revisión general tenemos hueco mañana a las 12:00 o el lunes a las 9:30. ¿Cuál te viene mejor?",
    onEnter: "contactado",
    leadLabel: "Pide: revisión general",
    options: [
      { label: "Mañana 12:00", userText: "Mañana a las 12:00", next: "confirmada" },
      { label: "Lunes 9:30", userText: "El lunes a las 9:30", next: "confirmada" },
    ],
  },
  urgencia: {
    bot: "Entendido, las urgencias se atienden hoy mismo. Te paso con el equipo de recepción ahora mismo para coordinar la hora exacta.",
    onEnter: "contactado",
    leadLabel: "Urgencia — escalado a humano",
    options: [],
  },
  confirmada: {
    bot: "Cita confirmada ✅ Te he enviado la confirmación por WhatsApp y he añadido un recordatorio automático 24h antes.",
    system: "Este lead ya está guardado en tu CRM y sincronizado con tu agenda →",
    onEnter: "agendado",
    options: [],
  },
  finSinCita: {
    bot: "De acuerdo, aquí estaré si cambias de idea. ¡Que tengas un buen día! 😊",
    options: [],
  },
};

const COLUMNS: { key: LeadStage; label: string }[] = [
  { key: "nuevo", label: "Nuevo lead" },
  { key: "contactado", label: "Atendido por IA" },
  { key: "agendado", label: "Cita agendada" },
];

type LeadState = { stage: LeadStage; label: string };

export default function ChatDemo({ onLeadChange }: { onLeadChange: (lead: LeadState | null) => void }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [options, setOptions] = useState<Option[]>([]);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, options]);

  function start() {
    setMessages([]);
    onLeadChange({ stage: "nuevo", label: "Paciente WhatsApp" });
    goTo("start");
  }

  function goTo(nodeKey: string) {
    const node = SCRIPT[nodeKey];
    setOptions([]);
    if (node.onEnter) {
      onLeadChange({ stage: node.onEnter, label: node.leadLabel ?? "Paciente WhatsApp" });
    }
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { kind: "bot", text: node.bot }]);
      if (node.system) {
        setMessages((prev) => [...prev, { kind: "system", text: node.system as string }]);
      }
      setOptions(node.options);
    }, 550);
  }

  function handleChoice(opt: Option) {
    if (opt.userText) {
      setMessages((prev) => [...prev, { kind: "user", text: opt.userText as string }]);
    }
    goTo(opt.next);
  }

  function toggle() {
    const next = !open;
    setOpen(next);
    if (next && messages.length === 0) start();
  }

  return (
    <div className="chatWidget">
      <button className="chatToggle" onClick={toggle} aria-label="Abrir chat">
        💬
      </button>
      {open && (
        <div className="chatPanel">
          <div className="chatHeader">
            <div>
              <strong>Clínica Dental Sonrisa</strong>
              <span className="chatStatus">● Asistente IA — en línea</span>
            </div>
            <button className="chatClose" onClick={() => setOpen(false)} aria-label="Cerrar chat">
              ✕
            </button>
          </div>
          <div className="chatBody" ref={bodyRef}>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`chatBubble ${
                  m.kind === "bot" ? "chatBubbleBot" : m.kind === "user" ? "chatBubbleUser" : "chatBubbleSystem"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          {options.length > 0 && (
            <div className="chatQuickReplies">
              {options.map((opt) => (
                <button key={opt.label} className="chatQuickReply" onClick={() => handleChoice(opt)}>
                  {opt.label}
                </button>
              ))}
            </div>
          )}
          <div className="chatFooter">
            <button className="chatRestart" onClick={start}>
              ↺ Reiniciar demo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function Kanban({ lead }: { lead: LeadState | null }) {
  return (
    <div className="kanban">
      {COLUMNS.map((col) => (
        <div key={col.key} className="kanbanCol">
          <h4>{col.label}</h4>
          <div className="kanbanCards">
            {lead?.stage === col.key && (
              <div className="kanbanCard">
                <strong>Paciente WhatsApp</strong>
                <span>{lead.label === "Paciente WhatsApp" ? "+34 6XX XXX XXX" : lead.label}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
