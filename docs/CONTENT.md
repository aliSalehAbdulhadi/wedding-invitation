# Content decisions

## Confirmed invitation details

The couple confirmed the real details on 23 October 2026, including the year 2026 and a numeric month. All event facts live in `public/content.json`; `demo` is now false. The site remains local and noindex until launch is requested.

- Couple: علي وتبارك / Ali and Tabarak.
- Venue: قاعة خيال / Khayal Hall. Secondary venue title: نادي الضباط / Officers’ Club. Address: شارع فلسطين، بغداد، العراق / Palestine Street, Baghdad, Iraq.
- Date: Friday, 20/11/2026. Display the month numerically in both languages, including the PNG. Gathering at 17:00, celebration at 18:00, conclusion at 22:00, Asia/Baghdad (UTC+3). Calendar events cover 17:00–22:00 so guests arrive for the gathering; the description includes the 18:00 celebration start.
- Map: https://maps.app.goo.gl/6jaVgZaiFFihzx8ZA (supplied by the couple; opens the hall listing in Baghdad).
- Languages: Arabic RTL by default; English LTR through the language switch.
- Theme: ivory stationery, deep olive, restrained champagne, botanical lines, and serif typography.
- Default palette: `design.theme` in `public/content.json` (`olive`, `pearl`, `champagne`, `midnight`, `sage`, `lilac`, `sea-glass`, `moonstone`, `oyster`, `wisteria`, or `celadon`). The localhost-only Colors button previews these without editing event facts and remembers the choice on this device. Set the JSON value when choosing the final palette for hosting.
- Opening feedback: a brief original magical bell chime plays after the envelope is activated.
- Music: an original generated melody, **off by default** during development. `music.startOnOpen` is false; guests can explicitly opt in.
- Personalized download: a guest-name modal reveals the invitation in a short magical ceremony, then generates a 1200 × 1600 PNG locally. Closing cancels the pending download; reduced motion skips the ceremony. No guest names are sent or stored.
- Calendar: Google and Outlook compose links and a downloadable iCalendar file. Real event titles have no demo prefix. Venue subtitles are included in calendar locations and the PNG.

## Narrative and motion

The user requested storytelling section by section without scroll-tied animation. The chapters are joining orbits, a celestial evening dial, a promise under stars that bloom into jasmine, a lantern-lit garden, a couple in silhouette under an overhead light beside the guest's unframed dedication, and a light closing that repeats the rings. Short bilingual bridge lines connect these scenes without inventing biographical details. Keep the approved envelope opening and overall palette. Reduced-motion visitors receive readable static compositions. The same bird joins both action dialogs; it follows the guest-name caret and visits the paper during its reveal.

## Before going live

The confirmed names, numeric date, venue subtitle, map and schedule are in JSON and the static Arabic fallback. Future changes must update both. Keep noindex until the couple asks to publish.

Confirm actual names and their order, the event's time zone and offset, map destination, dates, schedule, wording, and the intended privacy level. No religious wording, RSVP service, countdown, photography, or private guest list was requested.

Native calendar-app import/save behavior still needs final testing on the chosen iPhone, Android, Mac, and Windows apps before launch. Browser downloads and generated calendar contents are independently verifiable.

The latest creative direction replaces disconnected scene animations with one continuous guide: a paper bird emerging from the opening envelope, traveling through the chapters, and ending at the personal keepsake. Preserve this connected journey when changing layouts.
