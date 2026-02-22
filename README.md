# Dylan Dana Portfolio (Next.js)

Race car driver portfolio site with a hero-focused homepage, a dedicated on-track page, and a 3D telemetry panel.

## Quick Start

1. `npm install`
2. `npm run dev`
3. Open `http://localhost:3000`

## Requirements

- Node.js (LTS recommended)
- npm (bundled with Node)

## Dependencies (from `package.json`)

- Runtime: `next`, `react`, `react-dom`, `three`
- Dev: `typescript`, `tailwindcss`, `eslint`, `eslint-config-next`, `@types/*`

## Scripts

- `npm run dev` starts the local dev server.
- `npm run build` builds the production bundle.
- `npm run start` serves the production build.
- `npm run lint` runs ESLint.

## Routes

- `/` Home
- `/on-track` On-track page

## Where To Update Information

- Site title and description live in `app/layout.tsx` under `metadata`.
- Homepage hero copy, CTA buttons, and the "Driver Identity" blocks live in `app/page.tsx` under `leadPhoto`, `driverProfile`, and the main hero text.
- Accomplishments list lives in `app/page.tsx` under `drivingAccomplishments`.
- Coaching focus chips live in `app/page.tsx` under `coachingAreas`.
- Social links and handles live in `app/page.tsx` under `socialLinks`.
- Video highlights live in `app/page.tsx` under `videoHighlights`.
- "Next Race" callouts are hard-coded in `app/page.tsx` and `app/on-track/page.tsx`.
- Race schedule data lives in `data/raceEvents.ts`.
- On-track season stats live in `app/on-track/page.tsx` under `seasonStats`.
- On-track highlight cards live in `app/on-track/page.tsx` under `highlightCards`.
- Weekend notes live in `app/on-track/page.tsx` under `weekendNotes`.
- Loading screen text lives in `app/loading.tsx`.
- Footer credit and footer copy live at the bottom of `app/page.tsx`.

## Race Calendar Data Rules

- `data/raceEvents.ts` expects `date` in `YYYY-MM-DD` format.
- `status` must be one of `Complete`, `Upcoming`, or `Testing`.
- The calendar year is set in `app/on-track/page.tsx` on the `RaceCalendar` component (`year={2026}`), so update that when you roll seasons.

## Assets

- Hero and card photos are in `public/photos`. Update the file names referenced in `leadPhoto`, `videoHighlights`, and `highlightCards`.
- Sponsor logos are in `public/sponsors` and referenced in `components/sponsor-marquee.tsx`.
- Partner documents are in `public/partner-deck.pdf` and `public/media-kit.pdf`.
- The track reference asset lives in `public/track/sebring-reference.svg`.
- Favicon lives in `app/favicon.ico`.

## Theme & Styling

- Global colors, fonts, and animations are defined in `app/globals.css`.
- Update the `:root` CSS variables in `app/globals.css` to change the palette or typography.

## Optional Components

- The 3D telemetry panel is implemented in `components/track-model-panel.tsx`.
- The sponsor marquee component is `components/sponsor-marquee.tsx` (import and render it where needed).
