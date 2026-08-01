// Date math for the work-week calendar.
//
// All inputs/outputs are LOCAL-time. We deliberately avoid `new Date(iso)`
// for bare YYYY-MM-DD strings because that parses as UTC midnight and
// shows up as the previous day in negative-offset timezones.

/** Parse a YYYY-MM-DD string into a local Date at midnight. */
export function parseLocalDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Add N days to a Date. Mutates a copy, returns it. */
export function addDays(d: Date, days: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + days);
  return out;
}

/** YYYY-MM-DD in LOCAL time. */
export function isoDate(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/** Given Monday's ISO date, return the 5 work-week dates [Mon..Fri]. */
export function workWeekDates(mondayIso: string): Date[] {
  const monday = parseLocalDate(mondayIso);
  return [0, 1, 2, 3, 4].map((i) => addDays(monday, i));
}

/**
 * Format a Date as "Monday, June 8" / "Tuesday, June 9" etc.
 * Used for column headers and event details.
 */
export function formatDayHeader(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

/** Format a Date as "Jun 8" — used for the compact column header. */
export function formatShortDate(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/** Format a Date as "Monday" — weekday name only. */
export function formatWeekday(d: Date): string {
  return d.toLocaleDateString("en-US", { weekday: "short" });
}

/**
 * Format the week range shown in the page header.
 * Example: "June 8 – 12, 2026" or "June 29 – July 3, 2026" if spans months.
 */
export function formatWeekRange(monday: Date, friday: Date): string {
  const year = friday.getFullYear();
  const sameMonth = monday.getMonth() === friday.getMonth();
  const mLong = monday.toLocaleDateString("en-US", { month: "long" });
  const fLong = friday.toLocaleDateString("en-US", { month: "long" });
  const mDay = monday.getDate();
  const fDay = friday.getDate();
  if (sameMonth) {
    return `${mLong} ${mDay} – ${fDay}, ${year}`;
  }
  return `${mLong} ${mDay} – ${fLong} ${fDay}, ${year}`;
}

/**
 * Format a time like "9:00 AM" / "2:30 PM" from hour (0-23) + minute (0-59).
 */
export function formatTime(hour: number, minute: number): string {
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  const mm = String(minute).padStart(2, "0");
  const ampm = hour < 12 ? "AM" : "PM";
  return `${h12}:${mm} ${ampm}`;
}

/**
 * Format an event time range like "9:00 AM – 10:30 AM".
 * Drops minutes when both are :00 to match Outlook's compact rendering.
 */
export function formatTimeRange(
  startHour: number,
  startMin: number,
  endHour: number,
  endMin: number,
): string {
  return `${formatTime(startHour, startMin)} – ${formatTime(endHour, endMin)}`;
}
