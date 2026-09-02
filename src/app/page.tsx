import DemoSection from "@/components/DemoSection";
import ContactForm from "@/components/ContactForm";

const PROBLEMS = [
  {
    icon: "📵",
    title: "Llamadas fuera de horario",
    text: "Un paciente escribe a las 21:00 preguntando precios y disponibilidad. Nadie responde hasta el día siguiente — y para entonces ya escribió a otra clínica.",
  },
  {
    icon: "🗒️",
    title: "Recepción saturada",
    text: "El mismo horario, la misma dirección, el mismo \"¿hacéis limpiezas dentales?\" repetido decenas de veces al día, quitando tiempo a tareas que sí requieren a una persona.",
  },
  {
    icon: "🔁",
    title: "Datos duplicados a mano",
    text: "Cada cita agendada por WhatsApp hay que volver a escribirla en la agenda y, si hay suerte, también en el CRM. Se pierden datos y se pierde tiempo.",
  },
  {
    icon: "👻",
    title: "Citas sin confirmar",
    text: "Sin recordatorio automático, un porcentaje de pacientes simplemente no aparece — y ese hueco en la agenda ya no se recupera.",
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
            <a href="#precio">Precio</a>
          </nav>
          <a href="#contacto" className="btn btnSm btnPrimary">
            Agenda una llamada
          </a>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="container heroInner">
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
      </section>

      <section className="problem">
        <div className="container">
          <h2 className="sectionTitle">El día a día de una clínica sin automatizar</h2>
          <div className="problemGrid">
            {PROBLEMS.map((p) => (
              <div key={p.title} className="problemCard">
                <span className="problemIcon">{p.icon}</span>
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
            <h2 className="sectionTitle">Un solo producto, bien hecho</h2>
            <p className="sectionSub" style={{ marginBottom: 0 }}>
              En vez de venderte un catálogo de servicios de IA, nos centramos en resolver una cosa:
              que ningún paciente se quede sin respuesta. El resto (integrarlo con tu CRM, conectar más
              herramientas) lo añadimos más adelante, cuando ya confíes en el agente y lo necesites de verdad.
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
          <h2 className="sectionTitle">Precio</h2>
          <p className="sectionSub">Precio orientativo a modo de ejemplo — se ajusta con la investigación de mercado real antes de publicarse.</p>
          <div className="priceCard">
            <h3>Agente de Atención 24/7</h3>
            <p className="priceValue">
              desde 250€<span>/mes</span>
            </p>
            <p className="priceDesc">Todo lo que necesitas para dejar de perder pacientes por no responder a tiempo.</p>
            <ul>
              <li>WhatsApp + web</li>
              <li>Respuestas y agendado de citas</li>
              <li>Recordatorios automáticos</li>
              <li>Sincronización con tu agenda</li>
              <li>Configuración y puesta en marcha incluidas</li>
            </ul>
            <a href="#contacto" className="btn btnPrimary">
              Pedir diagnóstico gratuito
            </a>
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
          <span>Kairo — sitio de demostración. Textos, precio y caso son ilustrativos.</span>
        </div>
      </footer>
    </main>
  );
}
