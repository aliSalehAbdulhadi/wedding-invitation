# Wedding invitation

An Arabic-first, bilingual wedding invitation in native HTML, CSS, and JavaScript. No framework, runtime service, npm installation, or build step is required.

## Preview

From this folder, run:

```powershell
python -m http.server 8082 --bind 127.0.0.1 --directory public
```

Open <http://localhost:8082>. Use HTTP: loading `content.json`, ES modules, and local fonts requires a web server. Stop it with Ctrl+C. Optional `npm run dev` starts the same server on port 8080.

## Edit the invitation

**`public/content.json` is the editable event data.** It contains the demo flag, Arabic/English names and copy, dates with explicit offsets, the event time zone, schedule, venue, map link, and music setting. The current Omar/Layan wedding and Jasmine Gardens venue are fictional. The demo map deliberately opens Baghdad, not a made-up venue address.

- Replace both `ar` and `en` values with the real details when available.
- Set `event.start` and `event.end` to ISO timestamps with the correct offset. Keep `event.timeZone` consistent with the event location; schedule times are local wall-clock times.
- Replace `venue.mapsUrl` with the real HTTPS Google/Apple Maps location link.
- **`music.startOnOpen: false` keeps entry silent during development.** Music is opt-in from the alternate opening link or floating music button. The music is an original synthesized melody, not a third-party recording.
- Keep `demo: true` until all real details and copy are approved. It also marks downloaded cards and calendar events as demos. Switch it off only after replacing the demo copy.
- Keep the static Arabic fallback in `public/index.html` in sync when publishing real details. The live bilingual experience renders from JSON.

UI translations and small interactions are in `public/assets/js/main.js`. Shared validation/calendar helpers are in `public/assets/js/invitation.js`. Design tokens, layouts, and motion are in `public/assets/css/styles.css`.

## Guest experience

- Animated sealed-letter entrance: the same origami paper bird lifts out of the letter, flies into the main screen, and follows a continuous golden route through the story chapters.
- The bird has spring-based inertia, banking turns, independent little detours, blinking, and folded-wing perches when the guest pauses. Scrolling wakes it smoothly.
- The bird connects scroll-linked joining rings, a drawing timeline, a sticky typographic promise, a tracing garden path, and a personal letter lifting from an envelope. The same paper-bird motif appears on the downloaded card.
- Arabic RTL by default, with complete English LTR switching.
- Locally hosted Amiri, Noto Sans Arabic, and Cormorant Garamond fonts with their OFL licenses.
- Google Calendar and Outlook links, plus a standards-based `.ics` download for Apple Calendar and other calendar apps. Guests review and save the event in their chosen app.
- A native modal asks for the guest's name and creates a compact **1200 × 1600 PNG** on the device. There is also a persistent image preview/save link for mobile browsers. Names are not stored or transmitted.
- Reduced-motion and print styles; semantic Arabic fallback remains readable without JavaScript. Language switching, calendar generation, PNG generation, and music need JavaScript.

## Checks and hosting

```powershell
python scripts/check.py
node --check public/assets/js/main.js
node --test
```

Publish **only `public/`**, with no build command. Relative paths support custom domains and subdirectory hosting. See `docs/HOSTING.md` for domain and launch steps. The page remains `noindex` while developing; that does not provide access control.

Read `AGENTS.md` for AI instructions, `docs/DESIGN.md` for the visual direction, and `docs/SOURCES.md` for reference and skill provenance. Four project-local AI skills live in `.agents/skills/`.
