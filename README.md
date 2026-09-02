# Kairo — Automatización con IA para clínicas y centros de salud/estética

Sitio de un negocio de servicios de IA orientado a empresas, enfocado en un único
producto: un agente de WhatsApp que atiende pacientes 24/7 para clínicas y
centros de salud/estética.

Construido con **Next.js 16 (App Router) + TypeScript + React 19**, sin librería
de UI externa (CSS propio en `src/app/globals.css`).

Diseño deliberadamente editorial/minimalista en vez del típico "SaaS de
producto": una única tipografía (**JetBrains Mono**) para titulares y texto/UI,
paleta casi monocroma (papel, tinta, un verde apagado como único acento). Las
secciones de contenido se separan con líneas finas, no con tarjetas ni bloques
de color alternados; los elementos interactivos (botones, el panel de la demo,
las tarjetas del kanban, el mockup del hero) llevan un toque de **neomorfismo**
— sombra clara/oscura sobre el mismo tono de fondo, para que parezcan
extruidos del papel — como única fuente de dinamismo visual, sin añadir color.
Los mockups de WhatsApp son la excepción a la paleta: usan los colores reales
de WhatsApp porque son contenido (una app real), no decoración de marca.

## Cómo ejecutarlo

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # build de producción
npm run start     # sirve el build de producción
npm run lint
```

Se despliega directamente en **Vercel** (conectar el repo, sin configuración
adicional) o en cualquier plataforma que soporte Next.js.

En cuanto el sitio tenga dominio final (el `*.vercel.app` o uno propio), añade
la variable de entorno `NEXT_PUBLIC_SITE_URL` en Vercel (Project Settings →
Environment Variables) con ese dominio — se usa para el canonical, Open Graph,
`robots.txt` y `sitemap.xml`. Sin ella cae en un placeholder de ejemplo.

## Por qué este nicho y no "empresas" en general

Ofrecer "optimización de procesos + agentes + integración de sistemas + CRM" a
"empresas" en general es difícil de vender: el comprador no sabe si el problema
es para él, y compites contra consultoras genéricas de IA mucho más grandes.

Se eligió **clínicas y centros de salud/estética** (dental, fisioterapia, medicina
estética, centros de fisio/nutrición) como vertical de entrada porque:

- **Dolor visible y constante**: WhatsApp/teléfono saturado, citas perdidas fuera
  de horario, no-shows, tareas repetitivas de recepción.
- **Decisor único**: normalmente el dueño o gerente decide sin comité de compras,
  lo que acorta el ciclo de venta.
- **Demo muy tangible**: un chatbot que agenda una cita se explica y se muestra
  en cinco minutos, a diferencia de un proyecto de "optimización de procesos"
  abstracto.
- **Ticket y recurrencia razonables**: son negocios con caja para pagar una cuota
  mensual, y el servicio es fácilmente repetible de una clínica a otra (mismo
  playbook, mismas integraciones típicas: WhatsApp, Google Calendar, CRMs de
  salud).

## Por qué un solo producto, no un catálogo

La primera versión del sitio ofrecía 3 servicios en escalera (agente → CRM →
integración de procesos) con 3 planes de precio. Para la fase de validación eso
es ruido: nadie sabe si te contrata para "un chatbot" o para "optimizar
procesos". El sitio vende **una sola cosa**: el agente de WhatsApp para
gestionar citas. La integración de sistemas más compleja se queda fuera de la
oferta por ahora, como upsell futuro una vez haya clientes reales.

Sí se ofrecen **2 planes** (Starter y Growth) en vez de 1: Starter es solo el
agente, Growth añade la sincronización con el CRM/agenda del cliente. Es la
escalera original acotada a sus dos primeros peldaños — lo justo para que un
cliente que ya usa un CRM no sienta que le falta algo, sin llegar a vender un
catálogo completo de servicios de IA.

## Por qué Next.js y no HTML/CSS/JS plano

La primera versión era HTML/CSS/JS estático sin build, suficiente para una
landing de una sola página. Se migró a Next.js pensando en escalar sin tener
que reescribir nada: si más adelante hace falta un **dashboard de cliente**
(ver sus leads en vivo), lógica de servidor real para el agente/CRM, o varias
páginas/verticales, Next.js ya trae App Router, rutas de API y despliegue
trivial en Vercel — sin necesidad de migrar de stack en ese momento.

## Estructura

```
src/app/page.tsx          página principal (contenido estático de cada sección)
src/app/layout.tsx         layout raíz, metadata (SEO, Open Graph, Twitter card), fuente (next/font)
src/app/globals.css        design tokens + estilos de toda la web
src/app/site-config.ts     dominio del sitio (NEXT_PUBLIC_SITE_URL), usado por metadata/robots/sitemap
src/app/icon.tsx            favicon generado por código (marca "K.")
src/app/apple-icon.tsx       icono para pantalla de inicio de iOS
src/app/opengraph-image.tsx  imagen de la tarjeta al compartir el enlace (WhatsApp, email, redes)
src/app/robots.ts / sitemap.ts   SEO básico
src/components/WhatsAppMock.tsx   mockup visual de una conversación de WhatsApp (hero + ejemplos)
src/components/DemoSection.tsx   contenedor con estado compartido chat ↔ CRM
src/components/ChatDemo.tsx      widget de chat con árbol de conversación guionizado, con la misma estética de WhatsApp
src/components/ContactForm.tsx   formulario conectado a FormSubmit (envío por email)
```

## Qué contiene el sitio

- Hero con propuesta de valor, llamada a la acción y un mockup de WhatsApp real
  (misma estética que usa toda la web: cabecera verde oscuro, burbujas y fondo
  de WhatsApp auténticos, para que se reconozca al instante).
- Sección de dolor/problema (sin estadísticas inventadas presentadas como dato real).
- Un único servicio: Agente de Atención 24/7.
- **"Así responde en el día a día"**: 3 mockups estáticos de conversaciones de
  WhatsApp reales (agendar fuera de horario, responder al instante, recordatorio
  automático) — ejemplos concretos antes de pedirle al visitante que pruebe la demo.
- **Demo interactiva de chatbot**: widget de chat funcional (sin backend, mismo
  estilo WhatsApp que los ejemplos) que simula a un paciente agendando una cita
  en una clínica dental ficticia.
- **Mock de CRM**: tablero tipo kanban que se sincroniza en vivo con la demo del
  chat (el lead se mueve solo de "Nuevo lead" → "Atendido por IA" → "Cita
  agendada").
- Proceso de trabajo en 4 pasos.
- 2 planes (Starter / Growth), orientativos (marcados explícitamente como
  ejemplo, a ajustar con investigación de mercado real).
- Caso de ejemplo **claramente etiquetado como ilustrativo/ficticio** — no es un
  testimonio real, para no inducir a error a nadie que visite el sitio.
- Formulario de contacto conectado a **FormSubmit** (envía a cmassoweb@gmail.com
  vía AJAX, sin backend propio). La primera vez que alguien lo envíe en
  producción, FormSubmit manda un email de activación que hay que confirmar una
  sola vez.

## Próximos pasos sugeridos

1. Validar el nicho con 5-10 conversaciones reales con dueños de clínicas antes
   de invertir más en el producto.
2. Sustituir el caso "ilustrativo" por un caso real en cuanto exista un primer
   cliente (aunque sea gratis/beta a cambio de testimonio).
3. Conectar el agente de la demo a la **API de WhatsApp Business** (o Twilio)
   con un LLM real detrás — no hace falta que sea self-service al principio,
   se puede configurar a mano por cliente mientras se valida.
4. Ajustar el precio con investigación de mercado real (competencia local:
   agencias de automatización, freelancers de IA).
5. Cuando el playbook esté probado en salud/estética, evaluar una segunda
   vertical (inmobiliarias, despachos) reutilizando la misma estructura.
