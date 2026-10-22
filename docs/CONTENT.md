# Content decisions

## Approved for the development preview

The user explicitly authorized fictional demo details on 22 October 2026. All event facts live in `public/content.json`. Keep `demo: true` until real details are approved.

- Couple: عمر وليان / Omar and Layan.
- Fictional venue: حدائق الياسمين / The Jasmine Gardens, Baghdad.
- Sample event: 21 May 2027, 19:00–23:30, Asia/Baghdad (UTC+3).
- Map: Baghdad city search for demonstration; it does not claim a real venue location.
- Languages: Arabic RTL by default; English LTR through the language switch.
- Theme: ivory stationery, deep olive, restrained champagne, botanical lines, and serif typography.
- Music: an original generated melody, **off by default** during development. `music.startOnOpen` is false; guests can explicitly opt in.
- Personalized download: a guest-name modal generates a 1200 × 1600 PNG locally. No guest names are sent or stored.
- Calendar: Google and Outlook compose links and a downloadable iCalendar file. Demo event titles are clearly marked.

## Narrative and motion

The user requested storytelling through scroll, beyond repeated fades. The revised visual chapters are joining orbits, a celestial evening dial, a promise under stars that bloom into jasmine, opening garden gates, and botanical paper unfolding into the guest's keepsake. Short bilingual bridge lines connect these scenes without inventing biographical details. Keep the approved envelope opening and overall palette. Reduced-motion visitors receive readable static compositions. The same bird now joins both action dialogs at a header perch.

## Before going live

Replace both language versions of names, venue, address, map link, copy, dates, time zone, and schedule in JSON. Update the static Arabic fallback in `public/index.html` as well. Replace descriptions that mention a demo, then disable the demo flag.

Confirm actual names and their order, the event's time zone and offset, map destination, dates, schedule, wording, and the intended privacy level. No religious wording, RSVP service, countdown, photography, or private guest list is implied by the demo.

Native calendar-app import/save behavior still needs final testing on the chosen iPhone, Android, Mac, and Windows apps before launch. Browser downloads and generated calendar contents are independently verifiable.

The latest creative direction replaces disconnected scene animations with one continuous guide: a paper bird emerging from the opening envelope, traveling through the chapters, and ending at the personal keepsake. Preserve this connected journey when changing layouts.
