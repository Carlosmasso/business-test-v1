# Kairo — Automatización con IA para clínicas y centros de salud/estética

Landing page de demostración para un negocio de servicios de IA orientado a empresas
(agentes/chatbots, integración de sistemas, CRM a medida, optimización de procesos).

Este documento resume el razonamiento estratégico detrás del sitio. El sitio en sí
está en `index.html` (abrir directamente en el navegador, sin build ni dependencias).

## Por qué este nicho y no "empresas" en general

Ofrecer "optimización de procesos + agentes + integración de sistemas + CRM" a
"empresas" en general es difícil de vender: el comprador no sabe si el problema
es para él, y compites contra consultoras genéricas de IA mucho más grandes.

Se eligió **clínicas y centros de salud/estética** (dental, fisioterapia, medicina
estética, centros de fisio/nutrición) como vertical de entrada porque:

- **Dolor visible y constante**: WhatsApp/teléfono saturado, citas perdidas fuera de
  horario, no-shows, tareas repetitivas de recepción.
- **Decisor único**: normalmente el dueño o gerente decide sin comité de compras,
  lo que acorta el ciclo de venta.
- **Demo muy tangible**: un chatbot que agenda una cita se explica y se muestra en
  cinco minutos, a diferencia de un proyecto de "optimización de procesos" abstracto.
- **Ticket y recurrencia razonables**: son negocios con caja para pagar una cuota
  mensual, y el servicio es fácilmente repetible de una clínica a otra (mismo
  playbook, mismas integraciones típicas: WhatsApp, Google Calendar, CRMs de salud).

## Cómo se empaquetan los 4 servicios originales

En vez de vender los cuatro servicios como un catálogo plano, se ordenan como
**escalera de venta**:

1. **Agente de Atención 24/7** (el gancho/wedge) — chatbot en WhatsApp/web que
   responde FAQs, agenda y confirma citas, envía recordatorios. Es lo que se
   demuestra primero porque es lo más fácil de "ver funcionando".
2. **Leads a CRM sin fricción** (upsell natural) — una vez que confían en el
   agente, se conecta con su CRM/agenda para que cada conversación se convierta
   en un registro sin trabajo manual.
3. **Integración de sistemas y CRM a medida** (fase 2, cliente ya caliente) —
   para clínicas con varias herramientas (facturación, historial clínico, etc.)
   que necesitan que todo hable entre sí.
4. **Optimización de procesos** — no se vende como servicio suelto; es la
   metodología que envuelve a los otros tres (se mapea el proceso actual antes
   de automatizar nada).

## Qué contiene el sitio (`index.html`)

- Hero con propuesta de valor y llamada a la acción.
- Sección de dolor/problema (sin estadísticas inventadas presentadas como dato
  real — se describe el problema cualitativamente).
- 3 paquetes de servicio siguiendo la escalera anterior.
- **Demo interactiva de chatbot**: widget de chat funcional (JS puro, sin backend)
  que simula a un paciente agendando una cita en una clínica dental ficticia.
- **Mock de CRM**: tablero tipo kanban que muestra cómo un lead entra por WhatsApp
  y termina como cita confirmada, sin trabajo manual.
- Proceso de trabajo en 4 pasos (diagnóstico → configuración → integración → medición).
- Precios orientativos (marcados explícitamente como ejemplo, a ajustar con
  investigación de mercado real).
- Caso de ejemplo **claramente etiquetado como ilustrativo/ficticio** — no es un
  testimonio real, para no inducir a error a nadie que visite el sitio.
- Formulario de contacto (estático de momento, sin backend conectado).

## Próximos pasos sugeridos

1. Validar el nicho con 5-10 conversaciones reales con dueños de clínicas antes
   de invertir más en el sitio.
2. Sustituir el caso "ilustrativo" por un caso real en cuanto exista un primer
   cliente (aunque sea gratis/beta a cambio de testimonio).
3. Conectar el formulario de contacto a un email o CRM real (ej. Tally, un
   backend propio, o un simple `mailto:` mejorado).
4. Definir precios reales investigando lo que cobra la competencia local
   (agencias de automatización, freelancers de IA) para ese tamaño de clínica.
5. Cuando el playbook esté probado en salud/estética, evaluar una segunda
   vertical (inmobiliarias, despachos) reutilizando la misma estructura de
   oferta y de sitio.
