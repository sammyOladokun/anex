# Anex telehealth frontend

A React + TypeScript landing page starter for a telehealth product. The public experience is designed to introduce virtual care and guide prospective patients toward booking. The supplied reference photos are in `public/images/`.

## Local development

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
cp .env.example .env.local
npm run dev
```

Open the local URL printed by Vite. `npm run build` creates the production bundle in `dist/`; `npm run preview` serves that bundle locally.

## Frontend structure

- `src/App.tsx` — landing page sections, navigation, and appointment/video dialogs
- `src/styles.css` — responsive visual system and layout
- `src/main.tsx` — application entry point
- `public/images/` — supplied care photography
- `vite.config.ts` — Vite and React setup

The landing page is intentionally independent of a specific EMR. Booking dialogs are frontend prototypes and do not submit patient data. Add a server-side API adapter when the EMR vendor and booking flow are selected. Keep vendor credentials and patient data off the browser bundle. `VITE_*` values are public and must never contain secrets.

## Before production

- Select the EMR and confirm its supported patient-facing APIs and authentication model.
- Add a server-side integration layer for vendor credentials, authorization, and audit logging.
- Replace sample patient and appointment content with authorized API data.
- Add the product's identity, consent, privacy, accessibility, and telehealth session requirements.
- Configure deployment environment variables and the approved video visit provider.
