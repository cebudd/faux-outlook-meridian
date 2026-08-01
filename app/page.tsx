import { parseDemoParams } from "@/lib/params";
import {
  workWeekDates,
  formatWeekRange,
  formatShortDate,
  formatWeekday,
  formatTime,
  formatTimeRange,
} from "@/lib/dates";
import { buildEvents, CATEGORY_STYLES, type CalendarEvent } from "@/lib/events";

export const dynamic = "force-dynamic";

// Time grid parameters
const DAY_START_HOUR = 7; // 7 AM
const DAY_END_HOUR = 18; // 6 PM
const HOUR_HEIGHT_PX = 56; // pixel height per hour row

function eventTopPx(e: CalendarEvent): number {
  const minutesFromStart =
    (e.startHour - DAY_START_HOUR) * 60 + e.startMin;
  return (minutesFromStart / 60) * HOUR_HEIGHT_PX;
}

function eventHeightPx(e: CalendarEvent): number {
  const durationMin =
    e.endHour * 60 + e.endMin - (e.startHour * 60 + e.startMin);
  return (durationMin / 60) * HOUR_HEIGHT_PX;
}

export default function CalendarPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const params = parseDemoParams(searchParams);

  const days = workWeekDates(params.start);
  const monday = days[0];
  const friday = days[4];
  const events = buildEvents(params);
  const weekRange = formatWeekRange(monday, friday);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar
        name={params.name}
        initials={params.initials}
        firstName={params.firstName}
      />
      <CommandBar weekRange={weekRange} />
      <div className="flex-1 flex">
        <Sidebar
          monday={monday}
          firstName={params.firstName}
          lastName={params.name.split(" ").slice(1).join(" ") || ""}
        />
        <main className="flex-1 bg-white overflow-hidden">
          <CalendarGrid days={days} events={events} />
        </main>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* Outlook top bar                                                          */
/* ----------------------------------------------------------------------- */

function TopBar({
  name,
  initials,
  firstName,
}: {
  name: string;
  initials: string;
  firstName: string;
}) {
  return (
    <header className="bg-outlook-blueDarker text-white">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3">
          <button className="p-1.5 hover:bg-white/10 rounded">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
                fill="#ffffff"
                opacity="0.9"
              />
              <rect x="3" y="5" width="18" height="3" fill="#0078D4" />
              <text
                x="12"
                y="17"
                textAnchor="middle"
                fill="#0078D4"
                fontSize="9"
                fontWeight="700"
                fontFamily="Segoe UI, sans-serif"
              >
                O
              </text>
            </svg>
            <span className="font-semibold text-[15px] tracking-tight">
              Outlook
            </span>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-6">
          <div className="relative">
            <svg
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outlook-textDim"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              disabled
              placeholder="Search"
              className="w-full bg-white/10 text-white placeholder-white/60 text-sm py-1.5 pl-9 pr-3 rounded outline-none border border-white/10 focus:border-white/30"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-1.5 hover:bg-white/10 rounded" aria-label="Settings">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33h0a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51h0a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v0a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
          </button>
          <div className="flex items-center gap-2 pl-2">
            <div
              className="w-8 h-8 rounded-full bg-gradient-to-br from-outlook-purple to-outlook-blueDark flex items-center justify-center text-sm font-semibold"
              title={name}
            >
              {initials}
            </div>
            <span className="text-sm hidden md:inline">{firstName}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ----------------------------------------------------------------------- */
/* Command bar — view picker, "Today" button, week range                    */
/* ----------------------------------------------------------------------- */

function CommandBar({ weekRange }: { weekRange: string }) {
  return (
    <div className="bg-white border-b border-outlook-border">
      <div className="flex items-center gap-2 px-4 py-2">
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-outlook-blue hover:bg-outlook-rail rounded">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          New event
        </button>
        <div className="w-px h-5 bg-outlook-border mx-1" />
        <button className="px-3 py-1.5 text-sm text-slate-700 hover:bg-outlook-rail rounded">
          Today
        </button>
        <div className="flex">
          <button className="p-1.5 text-slate-700 hover:bg-outlook-rail rounded" aria-label="Previous week">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button className="p-1.5 text-slate-700 hover:bg-outlook-rail rounded" aria-label="Next week">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
        <h1 className="text-base font-semibold text-slate-900 ml-2">
          {weekRange}
        </h1>
        <div className="flex-1" />
        <div className="flex bg-outlook-rail rounded p-0.5">
          <button className="px-3 py-1 text-xs text-slate-600 rounded">
            Day
          </button>
          <button className="px-3 py-1 text-xs bg-white text-slate-900 rounded shadow-sm font-medium">
            Work week
          </button>
          <button className="px-3 py-1 text-xs text-slate-600 rounded">
            Week
          </button>
          <button className="px-3 py-1 text-xs text-slate-600 rounded">
            Month
          </button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* Left sidebar — mini month + "my calendars"                               */
/* ----------------------------------------------------------------------- */

function Sidebar({
  monday,
  firstName,
  lastName,
}: {
  monday: Date;
  firstName: string;
  lastName: string;
}) {
  return (
    <aside className="w-60 bg-outlook-rail border-r border-outlook-border p-3 hidden lg:block">
      <MiniMonth monday={monday} />
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            My calendars
          </span>
        </div>
        <ul className="space-y-1.5">
          <li className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              defaultChecked
              className="w-3.5 h-3.5 accent-outlook-blue"
              readOnly
            />
            <span className="text-slate-800">
              Calendar — {firstName}
              {lastName ? ` ${lastName}` : ""}
            </span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              defaultChecked
              className="w-3.5 h-3.5 accent-purple-500"
              readOnly
            />
            <span className="text-slate-800">Meridian Holidays — US</span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="w-3.5 h-3.5"
              readOnly
            />
            <span className="text-slate-500">United States holidays</span>
          </li>
          <li className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="w-3.5 h-3.5"
              readOnly
            />
            <span className="text-slate-500">Birthdays</span>
          </li>
        </ul>
      </div>
      <div className="mt-6">
        <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
          People&apos;s calendars
        </span>
        <ul className="mt-2 space-y-1.5">
          <li className="flex items-center gap-2 text-sm text-slate-500">
            <input type="checkbox" className="w-3.5 h-3.5" readOnly />
            Add calendar…
          </li>
        </ul>
      </div>
    </aside>
  );
}

function MiniMonth({ monday }: { monday: Date }) {
  // Build a 6-week mini-month grid for the month containing the Monday.
  const year = monday.getFullYear();
  const month = monday.getMonth();
  const firstOfMonth = new Date(year, month, 1);
  // Sunday-start grid like Outlook.
  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(gridStart.getDate() - gridStart.getDay());

  const cells: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(d.getDate() + i);
    cells.push(d);
  }

  // The work-week dates are highlighted (the demo's "current" week).
  const weekStart = new Date(monday);
  const weekEnd = new Date(monday);
  weekEnd.setDate(weekEnd.getDate() + 4);

  const inHighlight = (d: Date) => d >= weekStart && d <= weekEnd;
  const inMonth = (d: Date) => d.getMonth() === month;

  const monthLabel = firstOfMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded border border-outlook-border p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-slate-900">{monthLabel}</span>
        <div className="flex gap-0.5">
          <button className="p-0.5 text-slate-500 hover:bg-outlook-rail rounded" aria-label="Previous month">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button className="p-0.5 text-slate-500 hover:bg-outlook-rail rounded" aria-label="Next month">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-[10px] text-slate-500 mb-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} className="text-center">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((d, i) => {
          const isHighlight = inHighlight(d);
          const isMonday = isHighlight && d.getDay() === 1;
          const dim = !inMonth(d);
          return (
            <div
              key={i}
              className={[
                "h-6 flex items-center justify-center text-[11px] rounded",
                isHighlight
                  ? "bg-outlook-blue/10 text-outlook-blueDarker font-semibold"
                  : dim
                    ? "text-slate-300"
                    : "text-slate-700",
                isMonday ? "ring-1 ring-outlook-blue" : "",
              ].join(" ")}
            >
              {d.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* Calendar grid                                                            */
/* ----------------------------------------------------------------------- */

function CalendarGrid({
  days,
  events,
}: {
  days: Date[];
  events: CalendarEvent[];
}) {
  const hours: number[] = [];
  for (let h = DAY_START_HOUR; h <= DAY_END_HOUR; h++) hours.push(h);
  const gridHeight = (DAY_END_HOUR - DAY_START_HOUR) * HOUR_HEIGHT_PX;

  return (
    <div className="h-[calc(100vh-104px)] overflow-auto">
      {/* Day-of-week header row, sticky */}
      <div className="sticky top-0 z-10 grid grid-cols-[64px_repeat(5,_1fr)] bg-white border-b border-outlook-border">
        <div /> {/* time gutter spacer */}
        {days.map((d, i) => (
          <DayHeader key={i} date={d} isDayOne={i === 0} />
        ))}
      </div>

      {/* Time grid + day columns */}
      <div className="grid grid-cols-[64px_repeat(5,_1fr)] relative">
        {/* Time gutter */}
        <div className="border-r border-outlook-border">
          {hours.map((h) => (
            <div
              key={h}
              style={{ height: HOUR_HEIGHT_PX }}
              className="relative text-[11px] text-outlook-textDim text-right pr-2 pt-1"
            >
              {h === DAY_START_HOUR ? null : formatTime(h, 0)}
            </div>
          ))}
        </div>

        {/* Day columns */}
        {days.map((d, dayIdx) => {
          const dayEvents = events.filter((e) => e.dayIndex === dayIdx);
          return (
            <div
              key={dayIdx}
              className="relative border-r border-outlook-border last:border-r-0"
              style={{ height: gridHeight }}
            >
              {/* Hour rule lines */}
              {hours.map((h, i) => (
                <div
                  key={h}
                  className={
                    "absolute left-0 right-0 border-t " +
                    (i === 0
                      ? "border-transparent"
                      : "border-outlook-border/70")
                  }
                  style={{ top: (h - DAY_START_HOUR) * HOUR_HEIGHT_PX }}
                />
              ))}

              {/* Events */}
              {dayEvents.map((e, i) => (
                <EventBlock key={i} event={e} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DayHeader({ date, isDayOne }: { date: Date; isDayOne: boolean }) {
  return (
    <div className="px-2 py-2 text-center border-r border-outlook-border last:border-r-0">
      <div className="text-[11px] uppercase tracking-wide text-outlook-textDim">
        {formatWeekday(date)}
      </div>
      <div className="flex items-center justify-center gap-2 mt-0.5">
        <span
          className={
            isDayOne
              ? "inline-flex items-center justify-center w-7 h-7 rounded-full bg-outlook-today text-white text-sm font-semibold"
              : "text-base font-medium text-slate-900"
          }
        >
          {date.getDate()}
        </span>
        <span className="text-xs text-outlook-textDim hidden xl:inline">
          {formatShortDate(date).split(" ")[0]}
        </span>
      </div>
    </div>
  );
}

function EventBlock({ event }: { event: CalendarEvent }) {
  const top = eventTopPx(event);
  const height = eventHeightPx(event);
  const style = CATEGORY_STYLES[event.category];
  const timeStr = formatTimeRange(
    event.startHour,
    event.startMin,
    event.endHour,
    event.endMin,
  );

  // Very small events (< 30 min) get a single-line layout.
  const compact = height < 40;

  return (
    <div
      className={[
        "absolute left-1 right-1 rounded-sm border-l-[3px] shadow-sm overflow-hidden",
        "px-2 py-1 cursor-pointer hover:brightness-95 transition",
        style.bar,
        style.fill,
        style.text,
      ].join(" ")}
      style={{ top, height: Math.max(height - 2, 18) }}
      title={`${event.title}\n${timeStr}${event.location ? `\n${event.location}` : ""}`}
    >
      {compact ? (
        <div className="flex items-center gap-2 text-[11px] leading-tight">
          <span className="font-semibold truncate">{event.title}</span>
          <span className="opacity-70 flex-shrink-0">
            {formatTime(event.startHour, event.startMin)}
          </span>
        </div>
      ) : (
        <>
          <div className="font-semibold text-[12px] leading-tight line-clamp-2">
            {event.title}
          </div>
          <div className="text-[11px] opacity-80 mt-0.5">{timeStr}</div>
          {event.location && height > 56 ? (
            <div className="text-[11px] opacity-70 mt-0.5 truncate">
              {event.location}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
