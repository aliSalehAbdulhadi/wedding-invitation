# Content decisions

## Confirmed invitation details

The couple confirmed the real details on 23 October 2026, including the year 2026 and a numeric month. All event facts live in `public/content.json`; `demo` is now false. The site remains local and noindex until launch is requested.

- Couple: علي وتبارك / Ali and Tabarak.
- Venue: قاعة خيال / Khayal Hall. Secondary venue title: نادي الضباط / Officers’ Club. Address: شارع فلسطين، بغداد، العراق / Palestine Street, Baghdad, Iraq.
- Date: Friday, 20/11/2026. Display the month numerically in both languages, including the PNG. Gathering at 17:00, celebration at 18:00, conclusion at 22:00, Asia/Baghdad (UTC+3). Calendar events cover 17:00–22:00 so guests arrive for the gathering; the description includes the 18:00 celebration start.
- Map: https://maps.app.goo.gl/6jaVgZaiFFihzx8ZA (supplied by the couple; opens the hall listing in Baghdad).
- Languages: Arabic RTL by default; English LTR through the language switch.
- Theme: ivory stationery, deep olive, restrained champagne, botanical lines, and serif typography.
- Default palette: `design.theme` in `public/content.json` (`olive`, `pearl`, `champagne`, `midnight`, `sage`, `lilac`, `sea-glass`, `moonstone`, `oyster`, `wisteria`, or `celadon`). The Colors button is available to every visitor and remembers each guest’s choice on their own device. It never edits event facts or the configured default. Set the JSON value when choosing the initial palette for guests without a saved choice.
- Opening feedback: a brief original magical bell chime plays after the envelope is activated.
- Music: an original generated melody, **off by default** during development. `music.startOnOpen` is false; guests can explicitly opt in.
- Personalized download: a guest-name modal reveals the invitation in a short magical ceremony, then generates a 1200 × 1600 PNG locally. Closing cancels the pending download; reduced motion skips the ceremony. No guest names are sent or stored.
- Calendar: the main action opens the hosted .ics on Apple devices and Google’s HTTPS event editor elsewhere. Other calendars offers Google, Outlook, the device calendar, and an explicit file download. Both hosted files are generated from content.json with `node scripts/generate-calendar.mjs`; regenerate whenever event facts change. A test rejects stale hosted files. Real event titles have no demo prefix. Venue subtitles are included in calendar locations and the PNG.

## Narrative and motion

The user requested storytelling section by section without scroll-tied animation. The chapters are joining orbits, a celestial evening dial, a promise under stars that bloom into jasmine, a lantern-lit garden, a couple in silhouette under an overhead light beside the guest's unframed dedication, and a light closing that repeats the rings. Short bilingual bridge lines connect these scenes without inventing biographical details. Keep the approved envelope opening and overall palette. Reduced-motion visitors receive readable static compositions. The same bird joins both action dialogs; it follows the guest-name caret and visits the paper during its reveal.

## Before going live

The confirmed names, numeric date, venue subtitle, map and schedule are in JSON and the static Arabic fallback. Future changes must update both. Keep noindex until the couple asks to publish.

Confirm actual names and their order, the event's time zone and offset, map destination, dates, schedule, wording, and the intended privacy level. No religious wording, RSVP service, countdown, photography, or private guest list was requested.

Native calendar-app import/save behavior still needs final testing on the chosen iPhone, Android, Mac, and Windows apps before launch. Browser downloads and generated calendar contents are independently verifiable.

The latest creative direction replaces disconnected scene animations with one continuous guide: a paper bird emerging from the opening envelope, traveling through the chapters, and ending at the personal keepsake. Preserve this connected journey when changing layouts.


## Device-aware map and calendar links — 24 October 2026

The supplied Google listing resolves to the hall pin at latitude 33.3376782, longitude 44.4264857 (the place marker, not the map camera center). These verified coordinates are stored in venue.coordinates. Apple devices, including iPad desktop mode, prefer an HTTPS Apple Maps pin; other devices retain the exact supplied Google listing. A quiet secondary link always offers the other map provider.

Platform hints select defaults; they do not claim to detect installed apps. HTTPS map links let the operating system open a supported app, with the provider’s website as fallback. Calendar handlers can open a hosted text/calendar file, or download it for import. Google and Outlook web editors and an explicit download remain available. No custom-scheme probing, subscription calendar, account access, or automatic event save is used. Physical iPhone/Android app handoff still needs device verification.

References: [Google Maps app/browser links](https://developers.google.com/maps/documentation/urls/get-started), [Apple Maps links](https://developer.apple.com/documentation/mapkit/unified-map-urls), [Google event compose links](https://developers.google.com/workspace/calendar/api/concepts/inviting-attendees-to-events), [installed-related-app restrictions](https://developer.chrome.com/docs/capabilities/get-installed-related-apps).


Public palettes and social sharing, confirmed 24 October 2026: the couple requested the theme selector for everyone. Saved palette preferences now apply on public hosts too; the studio uses ordinary Colors / الألوان labels. This supersedes the earlier localhost-only requirement. The confirmed hostname is https://ali-tabarak-wedding-invitation.vercel.app/. Static Arabic Open Graph/Twitter metadata uses just علي وتبارك as the title and ٢٠/١١/٢٠٢٦ · قاعة خيال as the description. The 1200x630 wedding-monogram.png is a restrained ع / ت seal on ivory, with no event text in the image. Keep these synchronized with future content changes. Sharing crawler rules permit WhatsApp/facebookexternalhit/Facebot; general search indexing remains disabled.


Sharing refinement (24 October 2026): the couple asked for quieter metadata and a cleaner logo image. Use names only in titles, date and venue only in the description, and the Arabic initials monogram. The previous wedding-share.png remains available for already-cached previews; new metadata references wedding-monogram.png.


Merged monogram (24 October 2026): the couple liked the generated interwoven ع / ت mark and authorized using it for the sharing preview. The active image is wedding-ligature.jpg, 1730x909, encoded to 71,611 bytes for delivery. Prior preview images remain available for cached links. Arabic hero typography options were shown as real Aref Ruqaa, Ruwudu and Gulzar samples; no hero font is changed until the couple chooses one.


Public hostname updated by the couple on 24 October 2026: https://ali-tabarak-wedding-invitation.vercel.app/. Sharing metadata must point only to this current hostname; earlier domain references in historical QA notes are not active links.


Arabic hero font confirmed (24 October 2026): the couple selected Aref Ruqaa, the former option 2. It now styles only the main Arabic names at the approved smaller responsive sizes. Preserve the original Cormorant Garamond italic ampersand with a 0.32em downward optical adjustment. English names and all other headings retain their existing typography. The comparison labels and duplicate Gulzar hero are removed. The licensed names-only WOFF2 subset is 7,304 bytes; provenance is in assets/fonts/sources.json.
