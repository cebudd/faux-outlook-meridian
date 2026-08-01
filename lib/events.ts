// Week 1 calendar events for the MSL onboarding demo.
//
// Each event is a template — the {name}, {firstName}, {manager}, and {ta}
// placeholders are interpolated with the URL-param values at render time
// so the same calendar works for any new hire / manager / therapeutic area.
//
// Events are encoded against day indexes 0–4 (Mon–Fri). The actual
// calendar dates come from the `start` param.

import type { DemoParams } from "./params";

export type EventCategory =
  | "orientation"
  | "training"
  | "one-on-one"
  | "field"
  | "it"
  | "team"
  | "compliance"
  | "social"
  | "milestone";

export interface EventTemplate {
  /** 0=Mon, 1=Tue, 2=Wed, 3=Thu, 4=Fri. */
  dayIndex: number;
  /** Start hour in 24h (e.g., 14 for 2 PM). */
  startHour: number;
  startMin: number;
  endHour: number;
  endMin: number;
  /** Title template — supports {firstName}, {name}, {manager}, {ta}. */
  title: string;
  /** Optional location. */
  location?: string;
  /** Organizer name (appears in event details). */
  organizer: string;
  category: EventCategory;
}

export interface CalendarEvent extends Omit<EventTemplate, "title"> {
  title: string;
}

const TEMPLATES: EventTemplate[] = [
  // ----- Monday — Day 1 -------------------------------------------------
  {
    dayIndex: 0,
    startHour: 8,
    startMin: 30,
    endHour: 9,
    endMin: 0,
    title: "HR Welcome & Badge Pickup",
    location: "Meridian HQ — Cambridge, MA (Lobby)",
    organizer: "Meridian People Operations",
    category: "orientation",
  },
  {
    dayIndex: 0,
    startHour: 9,
    startMin: 0,
    endHour: 10,
    endMin: 30,
    title: "Medical Affairs Team Intro",
    location: "Microsoft Teams Meeting",
    organizer: "Medical Affairs Team",
    category: "orientation",
  },
  {
    dayIndex: 0,
    startHour: 10,
    startMin: 30,
    endHour: 11,
    endMin: 30,
    title: "IT Setup: M365, Veeva, Meridian Medical Portal walkthrough",
    location: "Microsoft Teams Meeting",
    organizer: "IT Concierge",
    category: "it",
  },
  {
    dayIndex: 0,
    startHour: 12,
    startMin: 0,
    endHour: 13,
    endMin: 0,
    title: "Welcome Lunch",
    location: "Meridian HQ — Café",
    organizer: "{manager}",
    category: "social",
  },
  {
    dayIndex: 0,
    startHour: 14,
    startMin: 0,
    endHour: 15,
    endMin: 0,
    title: "Manager 1:1 with {manager}",
    location: "Microsoft Teams Meeting",
    organizer: "{manager}",
    category: "one-on-one",
  },
  {
    dayIndex: 0,
    startHour: 15,
    startMin: 0,
    endHour: 16,
    endMin: 0,
    title: "Veeva Medical CRM orientation — KOL stakeholder list",
    location: "Self-paced",
    organizer: "Medical Affairs Operations",
    category: "it",
  },

  // ----- Tuesday — Day 2 ------------------------------------------------
  {
    dayIndex: 1,
    startHour: 9,
    startMin: 0,
    endHour: 10,
    endMin: 0,
    title: "MSL Role Onboarding: Compliance Expectations",
    location: "Microsoft Teams Meeting",
    organizer: "Compliance Office",
    category: "compliance",
  },
  {
    dayIndex: 1,
    startHour: 10,
    startMin: 0,
    endHour: 13,
    endMin: 0,
    title: "FDA Promotional Compliance Training (due EOD)",
    location: "Medical Affairs LMS",
    organizer: "Meridian Learning",
    category: "training",
  },
  {
    dayIndex: 1,
    startHour: 14,
    startMin: 0,
    endHour: 15,
    endMin: 0,
    title: "{ta} TA Certification — Module 1 kickoff",
    location: "Medical Affairs LMS",
    organizer: "Meridian Learning",
    category: "training",
  },
  {
    dayIndex: 1,
    startHour: 15,
    startMin: 30,
    endHour: 15,
    endMin: 45,
    title: "Check-in with {manager}",
    location: "Microsoft Teams Meeting",
    organizer: "{manager}",
    category: "one-on-one",
  },

  // ----- Wednesday — Day 3 ----------------------------------------------
  {
    dayIndex: 2,
    startHour: 8,
    startMin: 30,
    endHour: 9,
    endMin: 30,
    title: "Meridian Medical Portal — guided tour",
    location: "Microsoft Teams Meeting",
    organizer: "IT Concierge",
    category: "it",
  },
  {
    dayIndex: 2,
    startHour: 10,
    startMin: 0,
    endHour: 15,
    endMin: 0,
    title: "Field Shadowing — Senior MSL, Boston",
    location: "Boston, MA (travel)",
    organizer: "Dr. James O'Brien (Senior MSL)",
    category: "field",
  },
  {
    dayIndex: 2,
    startHour: 16,
    startMin: 0,
    endHour: 17,
    endMin: 0,
    title: "Debrief notes / CRM logging",
    location: "Self-paced",
    organizer: "{firstName} {name}",
    category: "field",
  },

  // ----- Thursday — Day 4 -----------------------------------------------
  {
    dayIndex: 3,
    startHour: 9,
    startMin: 0,
    endHour: 11,
    endMin: 0,
    title: "{ta} TA Certification — Module 2",
    location: "Medical Affairs LMS",
    organizer: "Meridian Learning",
    category: "training",
  },
  {
    dayIndex: 3,
    startHour: 11,
    startMin: 30,
    endHour: 12,
    endMin: 30,
    title: "KOL Strategy briefing with Regional Medical Director",
    location: "Microsoft Teams Meeting",
    organizer: "Regional Medical Director",
    category: "team",
  },
  {
    dayIndex: 3,
    startHour: 14,
    startMin: 0,
    endHour: 15,
    endMin: 0,
    title: "Jarvis: Getting a call pre-brief and calling in a sample HCP interaction",
    location: "Microsoft Teams Meeting",
    organizer: "IT Concierge",
    category: "it",
  },
  {
    dayIndex: 3,
    startHour: 15,
    startMin: 0,
    endHour: 16,
    endMin: 0,
    title: "{ta} TA Certification — Module 3",
    location: "Medical Affairs LMS",
    organizer: "Meridian Learning",
    category: "training",
  },

  // ----- Friday — Day 5 -------------------------------------------------
  {
    dayIndex: 4,
    startHour: 9,
    startMin: 0,
    endHour: 11,
    endMin: 0,
    title: "{ta} TA Certification — Module 4 & Final Assessment (due EOD)",
    location: "Medical Affairs LMS",
    organizer: "Meridian Learning",
    category: "training",
  },
  {
    dayIndex: 4,
    startHour: 11,
    startMin: 30,
    endHour: 12,
    endMin: 30,
    title: "Specialty Care Field Medical Team weekly",
    location: "Microsoft Teams Meeting",
    organizer: "Field Medical Team",
    category: "team",
  },
  {
    dayIndex: 4,
    startHour: 14,
    startMin: 0,
    endHour: 15,
    endMin: 0,
    title: "Manager 1:1 — Field Readiness Sign-off with {manager}",
    location: "Microsoft Teams Meeting",
    organizer: "{manager}",
    category: "one-on-one",
  },
  {
    dayIndex: 4,
    startHour: 15,
    startMin: 0,
    endHour: 16,
    endMin: 0,
    title: "Week 1 Wrap & Independent Field Readiness — CLEARED",
    location: "Microsoft Teams Meeting",
    organizer: "{manager}",
    category: "milestone",
  },
];

function interpolate(template: string, p: DemoParams): string {
  return template
    .replace(/\{firstName\}/g, p.firstName)
    .replace(/\{name\}/g, p.name)
    .replace(/\{manager\}/g, p.manager)
    .replace(/\{ta\}/g, p.ta);
}

/** Resolve all event templates against demo params. */
export function buildEvents(p: DemoParams): CalendarEvent[] {
  return TEMPLATES.map((t) => ({
    ...t,
    title: interpolate(t.title, p),
    location: t.location ? interpolate(t.location, p) : undefined,
    organizer: interpolate(t.organizer, p),
  }));
}

/**
 * Category → Tailwind class strings used to color event blocks.
 * Each entry returns the bar-color (left border), fill, and text class.
 */
export const CATEGORY_STYLES: Record<
  EventCategory,
  { bar: string; fill: string; text: string; chipBg: string }
> = {
  orientation: {
    bar: "border-l-purple-500",
    fill: "bg-purple-50",
    text: "text-purple-900",
    chipBg: "bg-purple-500",
  },
  training: {
    bar: "border-l-amber-500",
    fill: "bg-amber-50",
    text: "text-amber-900",
    chipBg: "bg-amber-500",
  },
  "one-on-one": {
    bar: "border-l-blue-500",
    fill: "bg-blue-50",
    text: "text-blue-900",
    chipBg: "bg-blue-500",
  },
  field: {
    bar: "border-l-emerald-500",
    fill: "bg-emerald-50",
    text: "text-emerald-900",
    chipBg: "bg-emerald-500",
  },
  it: {
    bar: "border-l-slate-500",
    fill: "bg-slate-50",
    text: "text-slate-900",
    chipBg: "bg-slate-500",
  },
  team: {
    bar: "border-l-teal-500",
    fill: "bg-teal-50",
    text: "text-teal-900",
    chipBg: "bg-teal-500",
  },
  compliance: {
    bar: "border-l-rose-500",
    fill: "bg-rose-50",
    text: "text-rose-900",
    chipBg: "bg-rose-500",
  },
  social: {
    bar: "border-l-yellow-500",
    fill: "bg-yellow-50",
    text: "text-yellow-900",
    chipBg: "bg-yellow-500",
  },
  milestone: {
    bar: "border-l-pink-500",
    fill: "bg-pink-50",
    text: "text-pink-900",
    chipBg: "bg-pink-500",
  },
};
