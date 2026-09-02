"use client";

import { useState, type FormEvent } from "react";

const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/cmassoweb@gmail.com";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contactForm" onSubmit={handleSubmit}>
      <input type="hidden" name="_subject" value="Nuevo contacto desde la web de Kairo" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" className="honeypot" tabIndex={-1} autoComplete="off" />
      <div className="formRow">
        <label>
          Nombre
          <input type="text" name="name" required />
        </label>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
      </div>
      <label>
        Nombre de la clínica / negocio
        <input type="text" name="business" />
      </label>
      <label>
        Cuéntanos tu situación
        <textarea
          name="message"
          rows={4}
          placeholder="Ej: recibimos muchos mensajes por WhatsApp fuera de horario y perdemos pacientes..."
        />
      </label>
      <button type="submit" className="btn btnPrimary" disabled={status === "sending"}>
        {status === "sending" ? "Enviando..." : "Enviar"}
      </button>
      <p
        className={`contactNote ${
          status === "success" ? "contactNoteSuccess" : status === "error" ? "contactNoteError" : ""
        }`}
      >
        {status === "success" && "¡Gracias! Hemos recibido tu mensaje, te contactamos pronto."}
        {status === "error" && "No se pudo enviar. Escríbenos directamente o inténtalo de nuevo."}
        {status === "idle" && "Al enviar, el mensaje llega directamente a nuestro email."}
        {status === "sending" && "Enviando..."}
      </p>
    </form>
  );
}
