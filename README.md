# Faux Outlook — Meridian Biopharma

A mock Microsoft Outlook web calendar for **Meridian Biopharma**, cloned from the
Solaris faux-outlook and rebranded. It shows the new-hire **first-week (Work week)
experience** downstream of the Meridian MSL onboarding flow — the calendar events
here are the ones Elementum will have pushed to the employee's M365 mailbox via
Microsoft Graph before they ever logged in.

This is a demo prop, not a real Outlook client. Solaris is untouched — this is a
separate project.

## Running locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Dynamic via URL params

The calendar is fully parameterized. A bare URL renders a default
Sarah Chen / Daniel Reyes / Oncology demo on the next available Monday, so you can
always demo without thinking about dates.

| Param | Default | Notes |
| --- | --- | --- |
| `start` | next Monday ≥ 14 days | ISO date (YYYY-MM-DD). Snaps to that week's Monday. |
| `name` | Sarah Chen | Employee full name. Drives the user chip + calendar label. |
| `manager` | Daniel Reyes | Hiring manager. Appears as organizer on 1:1 events. |
| `ta` | Oncology | Therapeutic area. Used in TA Certification event titles. |

Example:

```
/?start=2026-09-07&name=Sarah+Chen&manager=Daniel+Reyes&ta=Oncology
```

### Slick move — drive it from Elementum

Put an "Open Outlook Calendar" link button on Sarah's record layout that assembles
this URL from her Hire Date, Full Name, Hiring Manager, and Therapeutic Area fields.
That way the calendar is always the right hire on the right week. The Concierge
agent's welcome email could also include the link.

## What's on the calendar

Five days, 21 events, derived from Sarah's onboarding plan:

- **Mon (Day 1):** HR welcome, Medical Affairs intro, IT setup, welcome lunch, manager 1:1, Veeva orientation.
- **Tue (Day 2):** Compliance expectations, FDA Promotional Compliance Training (LMS, due EOD), TA Cert Module 1, check-in with manager.
- **Wed (Day 3):** Meridian Medical Portal tour, field shadowing in Boston, debrief.
- **Thu (Day 4):** TA Cert Module 2, KOL strategy briefing, Jarvis call pre-brief, TA Cert Module 3.
- **Fri (Day 5):** TA Cert final assessment, Specialty Care team weekly, manager 1:1 — Field Readiness Sign-off, Week 1 wrap.

Events are color-coded by category (orientation, training, 1:1, field, IT, team, compliance, social, milestone).

## Deploying to Vercel

Same hosting pattern as Faux Workday. After pushing to GitHub:

1. Import the repo into Vercel.
2. Under **Settings → Deployment Protection**, set Vercel Authentication to
   "Only Preview Deployments" (not "All Deployments"), so the production URL is
   publicly viewable without a Vercel login wall.
3. The production alias becomes the demo URL — e.g. `https://faux-outlook-meridian.vercel.app/`.

## File map

```
app/
  layout.tsx    root layout, font stack, body background
  page.tsx      the entire calendar (server-rendered)
  globals.css   tailwind directives + font-family

lib/
  params.ts     URL query-param parser + defaults
  dates.ts      work-week + formatting helpers (local-time safe)
  events.ts     the 21 event templates + category color map
```
