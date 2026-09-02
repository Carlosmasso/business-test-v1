import { google } from "googleapis";

// Business hours the prototype offers slots within. Adjust to match a real
// clinic's schedule once this stops being a demo.
const BUSINESS_HOURS: Record<number, [number, number] | null> = {
  0: null, // Sunday - closed
  1: [9, 20],
  2: [9, 20],
  3: [9, 20],
  4: [9, 20],
  5: [9, 20],
  6: [10, 14], // Saturday
};
const SLOT_MINUTES = 30;
const TIMEZONE = "Europe/Madrid";

export type Slot = { start: string; end: string };

function isConfigured() {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY &&
      process.env.GOOGLE_CALENDAR_ID
  );
}

function getCalendarClient() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
  return google.calendar({ version: "v3", auth });
}

/** Candidate slots for the next `days` days, within business hours. */
function buildCandidateSlots(days: number): Slot[] {
  const slots: Slot[] = [];
  const now = new Date();

  for (let d = 0; d < days; d++) {
    const day = new Date(now);
    day.setDate(day.getDate() + d);
    const hours = BUSINESS_HOURS[day.getDay()];
    if (!hours) continue;

    const [openHour, closeHour] = hours;
    for (let h = openHour; h < closeHour; h += SLOT_MINUTES / 60) {
      const start = new Date(day);
      start.setHours(Math.floor(h), (h % 1) * 60, 0, 0);
      if (start <= now) continue; // skip past slots (including "today, earlier")
      const end = new Date(start.getTime() + SLOT_MINUTES * 60 * 1000);
      slots.push({ start: start.toISOString(), end: end.toISOString() });
    }
  }
  return slots;
}

/** Real availability: candidate slots minus whatever the calendar reports as busy. */
export async function getAvailability(days = 5, limit = 6): Promise<Slot[]> {
  if (!isConfigured()) {
    throw new Error("NOT_CONFIGURED");
  }
  const calendar = getCalendarClient();
  const candidates = buildCandidateSlots(days);
  if (candidates.length === 0) return [];

  const timeMin = candidates[0].start;
  const timeMax = candidates[candidates.length - 1].end;

  const freebusy = await calendar.freebusy.query({
    requestBody: {
      timeMin,
      timeMax,
      timeZone: TIMEZONE,
      items: [{ id: process.env.GOOGLE_CALENDAR_ID }],
    },
  });

  const busy =
    freebusy.data.calendars?.[process.env.GOOGLE_CALENDAR_ID as string]?.busy ?? [];

  const free = candidates.filter((slot) => {
    const slotStart = new Date(slot.start).getTime();
    const slotEnd = new Date(slot.end).getTime();
    return !busy.some((b) => {
      const busyStart = new Date(b.start as string).getTime();
      const busyEnd = new Date(b.end as string).getTime();
      return slotStart < busyEnd && slotEnd > busyStart;
    });
  });

  return free.slice(0, limit);
}

/** Creates a real event on the connected calendar for the chosen slot. */
export async function createBooking(slot: Slot, summary: string) {
  if (!isConfigured()) {
    throw new Error("NOT_CONFIGURED");
  }
  const calendar = getCalendarClient();
  const event = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    requestBody: {
      summary,
      description: "Creado desde el prototipo de Kairo (agente de WhatsApp).",
      start: { dateTime: slot.start, timeZone: TIMEZONE },
      end: { dateTime: slot.end, timeZone: TIMEZONE },
    },
  });
  return event.data;
}

export { isConfigured };
