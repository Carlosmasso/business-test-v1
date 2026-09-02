import DemoSection from "@/components/DemoSection";
import ContactForm from "@/components/ContactForm";
import WhatsAppMock from "@/components/WhatsAppMock";

const PROBLEMS = [
  {
    title: "Llamadas fuera de horario",
    text: "Un paciente escribe a las 21:00 preguntando precios y disponibilidad. Nadie responde hasta el día siguiente — y para entonces ya escribió a otra clínica.",
  },
  {
    title: "Recepción saturada",
    text: "El mismo horario, la misma dirección, el mismo \"¿hacéis limpiezas dentales?\" repetido decenas de veces al día, quitando tiempo a tareas que sí requieren a una persona.",
  },
  {
    title: "Datos duplicados a mano",
    text: "Cada cita agendada por WhatsApp hay que volver a escribirla en la agenda y, si hay suerte, también en el CRM. Se pierden datos y se pierde tiempo.",
  },
  {
    title: "Citas sin confirmar",
    text: "Sin recordatorio automático, un porcentaje de pacientes simplemente no aparece — y ese hueco en la agenda ya no se recupera.",
  },
];

const EXAMPLES = [
  {
    title: "Agendar fuera de horario",
    messages: [
      { from: "them" as const, text: "Hola, ¿tenéis hueco para una limpieza dental esta semana?", time: "21:04" },
      { from: "me" as const, text: "¡Hola! Sí, tenemos jueves 16:00 o viernes 10:30. ¿Cuál prefieres?", time: "21:04" },
      { from: "them" as const, text: "Viernes 10:30 perfecto", time: "21:05" },
      { from: "me" as const, text: "Cita confirmada ✅ Te recuerdo 24h antes.", time: "21:05" },
    ],
  },
  {
    title: "Responder al instante",
    messages: [
      { from: "them" as const, text: "¿Cuánto cuesta una revisión general?", time: "13:47" },
      { from: "me" as const, text: "Una revisión general cuesta 35€, incluye diagnóstico y radiografía si hace falta.", time: "13:47" },
      { from: "them" as const, text: "Genial, ¿me la podéis agendar?", time: "13:48" },
      { from: "me" as const, text: "Claro, ¿qué día te viene mejor?", time: "13:48" },
    ],
  },
  {
    title: "Recordatorio automático",
    messages: [
      { from: "me" as const, text: "Hola María 👋 Te recordamos tu cita mañana a las 12:00 con la Dra. Martínez.", time: "10:00" },
      { from: "them" as const, text: "Gracias, ahí estaré", time: "10:12" },
      { from: "me" as const, text: "¡Perfecto! Nos vemos mañana 😊", time: "10:12" },
    ],
  },
];

const PROCESS = [
  { title: "Diagnóstico gratuito", text: "30 minutos para entender tu flujo actual de citas y dónde se pierde más tiempo o pacientes." },
  { title: "Configuración", text: "Montamos el agente con tus servicios, horarios y tono reales — no una plantilla genérica." },
  { title: "Puesta en marcha", text: "Lo conectamos a tu WhatsApp y a tu agenda, y lo dejamos respondiendo en producción." },
  { title: "Medición", text: "Seguimos citas agendadas, tiempo de respuesta y no-shows evitados para demostrar el retorno." },
];

export default function Home() {
  return (
    <main>
      <header className="nav">
        <div className="container navInner">
          <a href="#top" className="brand">
            Kairo<span className="brandDot">.</span>
          </a>
          <nav className="navLinks">
            <a href="#servicio">Servicio</a>
            <a href="#demo">Demo</a>
            <a href="#proceso">Cómo funciona</a>
            <a href="#precio">Precios</a>
          </nav>
          <a href="#contacto" className="btn btnSm btnPrimary">
            Agenda una llamada
          </a>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="container heroGrid">
          <div className="heroInner">
            <span className="eyebrow">Para clínicas dentales, fisioterapia y centros de estética</span>
            <h1>Deja de perder pacientes por no responder a tiempo</h1>
            <p className="heroLead">
              Un agente de IA que atiende tu WhatsApp 24/7, agenda citas y las sincroniza con tu agenda —
              sin contratar más personal de recepción.
            </p>
            <div className="heroActions">
              <a href="#demo" className="btn btnPrimary">
                Ver demo en vivo
              </a>
              <a href="#contacto" className="btn btnGhost">
                Hablar con nosotros
              </a>
            </div>
          </div>
          <div className="heroPhone">
            <WhatsAppMock
              contact="Clínica Dental Sonrisa"
              avatar="🦷"
              messages={[
                { from: "them", text: "Hola, ¿tenéis hueco para mañana?", time: "21:04" },
                { from: "me", text: "¡Hola! Sí, tenemos a las 10:00 o a las 17:30. ¿Cuál prefieres?", time: "21:04" },
                { from: "them", text: "A las 17:30 genial", time: "21:05" },
                { from: "me", text: "Cita confirmada ✅ Te escribo un recordatorio 24h antes.", time: "21:05" },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="problem">
        <div className="container">
          <h2 className="sectionTitle">El día a día de una clínica sin automatizar</h2>
          <div className="problemGrid">
            {PROBLEMS.map((p) => (
              <div key={p.title} className="problemCard">
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="servicio" className="service">
        <div className="container serviceInner">
          <div>
            <h2 className="sectionTitle">Un producto, no un catálogo</h2>
            <p className="sectionSub" style={{ marginBottom: 0 }}>
              En vez de venderte un catálogo de servicios de IA, nos centramos en resolver una cosa:
              que ningún paciente se quede sin respuesta. Empiezas solo con el agente, y añades la
              sincronización con tu CRM en cuanto la necesites de verdad.
            </p>
          </div>
          <div className="serviceCard">
            <h3>Agente de Atención 24/7</h3>
            <p>Un chatbot en WhatsApp que responde preguntas frecuentes, agenda y confirma citas, y envía recordatorios automáticos para reducir las ausencias.</p>
            <ul>
              <li>Disponible fuera de horario y fines de semana</li>
              <li>Habla con el tono de tu clínica, no como un robot genérico</li>
              <li>Escala a una persona real cuando hace falta</li>
              <li>Cada cita queda sincronizada con tu agenda, sin trabajo manual</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="examples">
        <div className="container">
          <h2 className="sectionTitle">Así responde en el día a día</h2>
          <p className="sectionSub">Tres situaciones reales de una clínica, resueltas por el agente sin que nadie del equipo tenga que intervenir.</p>
          <div className="examplesGrid">
            {EXAMPLES.map((ex) => (
              <div key={ex.title} className="exampleCard">
                <h3>{ex.title}</h3>
                <WhatsAppMock contact="Clínica Dental Sonrisa" avatar="🦷" messages={ex.messages} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <DemoSection />

      <section id="proceso" className="process">
        <div className="container">
          <h2 className="sectionTitle">Cómo trabajamos</h2>
          <div className="processGrid">
            {PROCESS.map((step, i) => (
              <div key={step.title} className="processStep">
                <span className="processNum">{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="precio" className="pricing">
        <div className="container">
          <h2 className="sectionTitle">Precios</h2>
          <p className="sectionSub">Precios orientativos a modo de ejemplo — se ajustan con la investigación de mercado real antes de publicarse.</p>
          <div className="pricingGrid">
            <div className="priceCard">
              <h3>Starter</h3>
              <p className="priceValue">
                desde 200€<span>/mes</span>
              </p>
              <p className="priceDesc">El agente de atención 24/7, listo para dejar de perder pacientes.</p>
              <ul>
                <li>WhatsApp + web</li>
                <li>Respuestas y agendado de citas</li>
                <li>Recordatorios automáticos</li>
                <li>Configuración y puesta en marcha incluidas</li>
              </ul>
              <a href="#contacto" className="btn btnGhost">
                Pedir diagnóstico gratuito
              </a>
            </div>
            <div className="priceCard">
              <span className="priceBadge">Más elegido</span>
              <h3>Growth</h3>
              <p className="priceValue">
                desde 400€<span>/mes</span>
              </p>
              <p className="priceDesc">Todo lo de Starter, y cada cita queda sincronizada con tu CRM o agenda sin trabajo manual.</p>
              <ul>
                <li>Todo lo del plan Starter</li>
                <li>Sincronización con tu CRM o agenda actual</li>
                <li>Historial de conversación por paciente</li>
                <li>Soporte prioritario</li>
              </ul>
              <a href="#contacto" className="btn btnPrimary">
                Pedir diagnóstico gratuito
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="case">
        <div className="container caseInner">
          <span className="caseTag">Ejemplo ilustrativo — no es un cliente real</span>
          <h2 className="sectionTitle">&quot;Clínica Dental Sonrisa&quot; (caso hipotético)</h2>
          <p className="caseDesc">
            Así es como se vería el impacto en una clínica dental de tamaño medio tras implementar el
            agente. Los números son un ejemplo de escenario, no datos medidos.
          </p>
          <div className="caseStats">
            <div>
              <span className="caseStatNum">24/7</span>
              <span className="caseStatLabel">horario de atención cubierto</span>
            </div>
            <div>
              <span className="caseStatNum">0</span>
              <span className="caseStatLabel">citas escritas a mano en la agenda</span>
            </div>
            <div>
              <span className="caseStatNum">-1</span>
              <span className="caseStatLabel">recordatorio automático por cita, para reducir no-shows</span>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="contact">
        <div className="container contactInner">
          <h2 className="sectionTitle">Hablemos de tu clínica</h2>
          <p className="sectionSub">Cuéntanos brevemente tu caso y te contactamos para el diagnóstico gratuito de 30 minutos.</p>
          <ContactForm />
        </div>
      </section>

      <footer className="footer">
        <div className="container footerInner">
          <span>Kairo — sitio de demostración. Textos, precios y caso son ilustrativos.</span>
        </div>
      </footer>
    </main>
  );
}
