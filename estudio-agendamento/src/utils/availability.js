import { WEEK_KEYS } from "../constants/week";
import { SLOT_STEP } from "../constants/defaults";
import { toISODate, timeToMinutes } from "./datetime";

export function getAvailableSlots(dateISO, totalDuration, appointments, hours, blockedDates) {
  if (blockedDates.includes(dateISO)) return [];
  const d = new Date(dateISO + "T00:00:00");
  const dayKey = WEEK_KEYS[d.getDay()];
  const dayHours = hours[dayKey];
  if (!dayHours || dayHours.closed) return [];

  const openMinutes = timeToMinutes(dayHours.open);
  const closeMinutes = timeToMinutes(dayHours.close);
  const dayAppointments = appointments.filter((a) => a.date === dateISO);

  const now = new Date();
  const isToday = toISODate(now) === dateISO;
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const slots = [];
  for (let start = openMinutes; start + totalDuration <= closeMinutes; start += SLOT_STEP) {
    if (isToday && start <= nowMinutes) continue;
    const end = start + totalDuration;
    const overlap = dayAppointments.some((a) => start < a.endMinutes && end > a.startMinutes);
    if (!overlap) slots.push(start);
  }
  return slots;
}
