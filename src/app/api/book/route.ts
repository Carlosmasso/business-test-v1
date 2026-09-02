import { createBooking, isConfigured, type Slot } from "@/lib/googleCalendar";

export async function POST(request: Request) {
  if (!isConfigured()) {
    return Response.json(
      { error: "NOT_CONFIGURED", message: "Faltan las variables de entorno de Google Calendar." },
      { status: 503 }
    );
  }

  const body = (await request.json()) as { slot?: Slot };
  if (!body.slot?.start || !body.slot?.end) {
    return Response.json({ error: "INVALID_SLOT" }, { status: 400 });
  }

  try {
    const event = await createBooking(body.slot, "Cita — Paciente (prototipo Kairo)");
    return Response.json({ ok: true, eventId: event.id, htmlLink: event.htmlLink });
  } catch (error) {
    console.error("booking error", error);
    return Response.json({ error: "BOOKING_FAILED" }, { status: 502 });
  }
}
