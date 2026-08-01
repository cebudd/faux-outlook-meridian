// URL query param parsing for the faux Outlook calendar.
//
// Supported params (all optional — sensible defaults make the bare URL demo
// cleanly):
//
//   start    — ISO date of Day 1 (Monday). e.g. "2026-06-08".
//              If missing or invalid, falls back to "the next Monday >= 14
//              days from today", matching the Faux Workday convention.
//   name     — Employee full name. Default "Sarah Chen".
//   manager  — Hiring manager full name. Default "Daniel Reyes".
//   ta       — Therapeutic area. Default "Oncology".
//
// Example:
//   /?start=2026-09-07&name=Sarah+Chen&manager=Daniel+Reyes&ta=Oncology

export interface DemoParams {
  /** ISO date string YYYY-MM-DD — always a Monday. */
  start: string;
  /** Employee full name. */
  name: string;
  /** Employee first name (derived). */
  firstName: string;
  /** Employee initials (derived). */
  initials: string;
  /** Hiring manager full name. */
  manager: string;
  /** Therapeutic area. */
  ta: string;
}

/**
 * Compute a default Day 1: first Monday at least 14 days from today.
 * Returns YYYY-MM-DD in LOCAL time so the date doesn't slip across timezones.
 */
function defaultStart(): string {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  const daysUntilMonday = (1 - d.getDay() + 7) % 7;
  d.setDate(d.getDate() + daysUntilMonday);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Validate that an ISO date string is well-formed AND parseable. If the
 * input is missing or invalid, return the default Monday.
 *
 * If the input is a valid date but NOT a Monday, snap it back to the
 * Monday of that week so the calendar grid always lines up.
 */
function normalizeStart(raw: string | undefined): string {
  if (!raw) return defaultStart();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return defaultStart();
  const [y, m, day] = raw.split("-").map(Number);
  const d = new Date(y, m - 1, day);
  if (isNaN(d.getTime())) return defaultStart();
  // Snap to Monday of the same week.
  // getDay(): 0=Sun, 1=Mon, ..., 6=Sat. We want 1.
  const dow = d.getDay();
  const offset = dow === 0 ? -6 : 1 - dow;
  d.setDate(d.getDate() + offset);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function initialsOf(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function firstNameOf(fullName: string): string {
  return fullName.trim().split(/\s+/)[0] || fullName;
}

/**
 * Parse Next.js searchParams (string | string[] | undefined values) into a
 * fully-resolved DemoParams object with defaults applied.
 */
export function parseDemoParams(
  searchParams: Record<string, string | string[] | undefined>,
): DemoParams {
  const first = (v: string | string[] | undefined): string | undefined => {
    if (Array.isArray(v)) return v[0];
    return v;
  };

  const start = normalizeStart(first(searchParams.start));
  const name = first(searchParams.name)?.trim() || "Sarah Chen";
  const manager = first(searchParams.manager)?.trim() || "Daniel Reyes";
  const ta = first(searchParams.ta)?.trim() || "Oncology";

  return {
    start,
    name,
    firstName: firstNameOf(name),
    initials: initialsOf(name),
    manager,
    ta,
  };
}
