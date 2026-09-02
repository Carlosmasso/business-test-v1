import { getAvailability, isConfigured } from "@/lib/googleCalendar";

export async function GET() {
  if (!isConfigured()) {
    return Response.json(
      { error: "NOT_CONFIGURED", message: "Faltan las variables de entorno de Google Calendar." },
      { status: 503 }
    );
  }

  try {
    const slots = await getAvailability();
    return Response.json({ slots });
  } catch (error) {
    console.error("availability error", error);
    return Response.json({ error: "AVAILABILITY_FAILED" }, { status: 502 });
  }
}
