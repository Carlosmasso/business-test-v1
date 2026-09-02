// ---------- Smooth scroll for nav links ----------
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---------- Contact form (sends via FormSubmit, no backend needed) ----------
const contactForm = document.getElementById('contact-form');
const contactNote = document.getElementById('contact-note');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    contactNote.textContent = 'Enviando...';
    contactNote.style.color = '';

    try {
      const ajaxEndpoint = contactForm.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');
      const response = await fetch(ajaxEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(contactForm),
      });
      if (!response.ok) throw new Error('Request failed');
      contactNote.textContent = '¡Gracias! Hemos recibido tu mensaje, te contactamos pronto.';
      contactNote.style.color = '#0d9488';
      contactForm.reset();
    } catch (err) {
      contactNote.textContent = 'No se pudo enviar. Escríbenos directamente o inténtalo de nuevo.';
      contactNote.style.color = '#c0392b';
    } finally {
      submitBtn.disabled = false;
    }
  });
}

// ---------- Kanban mock ----------
const kanban = {
  nuevo: document.querySelector('[data-col="nuevo"] .kanban__cards'),
  contactado: document.querySelector('[data-col="contactado"] .kanban__cards'),
  agendado: document.querySelector('[data-col="agendado"] .kanban__cards'),
};

let leadCard = null;

function ensureLeadCard() {
  if (leadCard) return leadCard;
  leadCard = document.createElement('div');
  leadCard.className = 'kanban-card';
  leadCard.innerHTML = '<strong>Paciente WhatsApp</strong><span>+34 6XX XXX XXX</span>';
  kanban.nuevo.appendChild(leadCard);
  return leadCard;
}

function moveLeadTo(colKey, extraLabel) {
  const card = ensureLeadCard();
  if (extraLabel) {
    card.innerHTML = `<strong>Paciente WhatsApp</strong><span>${extraLabel}</span>`;
  }
  kanban[colKey].appendChild(card);
}

function resetKanban() {
  Object.values(kanban).forEach(col => (col.innerHTML = ''));
  leadCard = null;
}

// ---------- Chat widget ----------
const chatToggle = document.getElementById('chat-toggle');
const chatClose = document.getElementById('chat-close');
const chatPanel = document.getElementById('chat-panel');
const chatBody = document.getElementById('chat-body');
const chatQuickReplies = document.getElementById('chat-quick-replies');
const chatRestart = document.getElementById('chat-restart');

chatToggle.addEventListener('click', () => {
  chatPanel.hidden = !chatPanel.hidden;
  if (!chatPanel.hidden && chatBody.children.length === 0) {
    startConversation();
  }
});
chatClose.addEventListener('click', () => { chatPanel.hidden = true; });
chatRestart.addEventListener('click', () => {
  chatBody.innerHTML = '';
  resetKanban();
  startConversation();
});

function addBubble(text, kind) {
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble chat-bubble--${kind}`;
  bubble.textContent = text;
  chatBody.appendChild(bubble);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function setQuickReplies(options) {
  chatQuickReplies.innerHTML = '';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'chat-quick-reply';
    btn.textContent = opt.label;
    btn.addEventListener('click', () => handleChoice(opt));
    chatQuickReplies.appendChild(btn);
  });
}

function botSay(text, delay = 550) {
  return new Promise(resolve => {
    setTimeout(() => {
      addBubble(text, 'bot');
      resolve();
    }, delay);
  });
}

// Simple scripted conversation tree
const script = {
  start: {
    bot: '¡Hola! 👋 Soy el asistente de Clínica Dental Sonrisa. ¿En qué puedo ayudarte?',
    options: [
      { label: 'Agendar una cita', label_user: 'Quiero agendar una cita', next: 'tipo_consulta' },
      { label: 'Ver horarios', label_user: '¿Cuál es vuestro horario?', next: 'horario' },
      { label: 'Precio limpieza dental', label_user: '¿Cuánto cuesta una limpieza dental?', next: 'precio' },
    ],
  },
  horario: {
    bot: 'Abrimos de lunes a viernes de 9:00 a 20:00, y sábados de 10:00 a 14:00. ¿Quieres que te agende una cita?',
    options: [
      { label: 'Sí, agendar cita', label_user: 'Sí, agéndame una cita', next: 'tipo_consulta' },
      { label: 'No, gracias', label_user: 'No, gracias', next: 'fin_sin_cita' },
    ],
  },
  precio: {
    bot: 'Una limpieza dental estándar cuesta 45€. ¿Quieres reservar hora?',
    options: [
      { label: 'Sí, reservar', label_user: 'Sí, quiero reservar', next: 'confirmar_limpieza' },
      { label: 'No, gracias', label_user: 'No, gracias', next: 'fin_sin_cita' },
    ],
  },
  tipo_consulta: {
    bot: 'Perfecto, ¿qué tipo de consulta necesitas?',
    options: [
      { label: 'Limpieza dental', label_user: 'Limpieza dental', next: 'confirmar_limpieza' },
      { label: 'Revisión general', label_user: 'Revisión general', next: 'confirmar_revision' },
      { label: 'Urgencia', label_user: 'Es una urgencia', next: 'urgencia' },
    ],
  },
  confirmar_limpieza: {
    bot: 'Tenemos disponibilidad este jueves a las 16:00 o el viernes a las 10:30. ¿Cuál prefieres?',
    onEnter: () => moveLeadTo('contactado', 'Pide: limpieza dental'),
    options: [
      { label: 'Jueves 16:00', label_user: 'Jueves 16:00, por favor', next: 'confirmada' },
      { label: 'Viernes 10:30', label_user: 'Viernes 10:30, por favor', next: 'confirmada' },
    ],
  },
  confirmar_revision: {
    bot: 'Para una revisión general tenemos hueco mañana a las 12:00 o el lunes a las 9:30. ¿Cuál te viene mejor?',
    onEnter: () => moveLeadTo('contactado', 'Pide: revisión general'),
    options: [
      { label: 'Mañana 12:00', label_user: 'Mañana a las 12:00', next: 'confirmada' },
      { label: 'Lunes 9:30', label_user: 'El lunes a las 9:30', next: 'confirmada' },
    ],
  },
  urgencia: {
    bot: 'Entendido, las urgencias se atienden hoy mismo. Te paso con el equipo de recepción ahora mismo para coordinar la hora exacta.',
    onEnter: () => moveLeadTo('contactado', 'Urgencia — escalado a humano'),
    options: [],
  },
  confirmada: {
    bot: 'Cita confirmada ✅ Te he enviado la confirmación por WhatsApp y he añadido un recordatorio automático 24h antes.',
    onEnter: () => moveLeadTo('agendado', 'Cita confirmada'),
    system: 'Este lead ya está guardado en tu CRM y sincronizado con tu agenda →',
    options: [],
  },
  fin_sin_cita: {
    bot: 'De acuerdo, aquí estaré si cambias de idea. ¡Que tengas un buen día! 😊',
    options: [],
  },
};

async function goTo(nodeKey) {
  const node = script[nodeKey];
  setQuickReplies([]);
  if (node.onEnter) node.onEnter();
  await botSay(node.bot);
  if (node.system) {
    addBubble(node.system, 'system');
  }
  setQuickReplies(node.options);
}

function handleChoice(opt) {
  if (opt.label_user) addBubble(opt.label_user, 'user');
  goTo(opt.next);
}

function startConversation() {
  ensureLeadCard();
  goTo('start');
}
