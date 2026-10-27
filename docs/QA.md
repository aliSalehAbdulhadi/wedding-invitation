# Development verification

Verified in the in-app Chromium browser and with standard-library checks:

- Arabic default/RTL and English switching/LTR; localized headings, dialogs, dates, links, and copy.
- Desktop 1280px and phone widths 390px and 320px; narrow-screen overflow was found and fixed.
- Envelope entry, silent default, explicit music playback and mute; no console warnings/errors in the checked flows.
- Chapters wake once when they enter view and play timed entrances; ambient loops run only while a chapter is on screen. Nothing is scroll-scrubbed. Tapping the rings triggers the parting animation, and pointer movement/tap in starlight chapters spawns glints and a shooting star.
- Calendar choices render; a real browser download contains the expected UTC instants and demo label.
- Arabic and English personalized PNGs download at exactly 1200 × 1600. Arabic guest-name shaping was visually inspected. Blank-name handling was exercised.
- Eleven Node test groups cover calendar, content, Unicode guest, bird/wake, active-chapter behavior, complete bilingual palette data, text/button contrast across all five palettes, and developer-host preference isolation.
- Static HTML/asset/anchor/case checks and JavaScript syntax checks pass.

Reduced-motion and print fallbacks are implemented. OS-level reduced-motion emulation and 200% browser zoom were not exercised through the available browser controls. Final native iPhone/Android/Mac/Windows calendar-app import and mobile save-sheet behavior require device testing before launch. External calendar links were inspected; no real event was saved to an account.

Sequence check: the actual paper-bird element moves from the opening letter to the flight overlay, with changing transforms across scroll, no added horizontal overflow, and silent entry. PNG export and modal interaction were rechecked with the flight overlay active. The new PNG includes the same bird motif.

Autonomous-motion check: the browser entered `perched` with folded wings after an independent detour. Scrolling changed it to `following` and unfolded its wings, with no horizontal overflow or console errors. A new unit test checks gradual movement, settling, response to changed destinations, and a bounded time step after long pauses.

Wake update: the browser confirms the old static route is absent, the 32-mark SVG pool emits during actual flight/exploration, and all marks fade to zero visibility while perched. Scroll wakes the companion and creates a fresh wake. Inspected at 320px and 1280px with no horizontal overflow, no console errors/warnings, and music still off. The unit check covers bounded population, drift, expiry at rest, renewed flight, and stale-mark clearing after a long pause. Reduced motion and 200% browser zoom remain unexercised as noted above.

Chapter revision: inspected Arabic/RTL at a 523px phone viewport and a 1280px desktop viewport (scaled emulation), covering all six chapters and the opening screen; no horizontal overflow. Under emulated reduced motion every entrance element is at full opacity, the doors are open and no infinite animation runs. Ring parting, glints and tap meteors fired in a scripted pointer test. English/LTR, 200% zoom, keyboard-only and physical-device checks were not repeated for this revision.

The actual flight layer becomes a child of each open action dialog; the same bird lands at its header perch, and closing returns the layer to the body. Escape and the close button restore focus to the opener. An actual Arabic guest PNG downloaded with this layer present, and the input updates the on-page keepsake locally. Music stays off. The motion test was made robust by sampling the newest live wisp, rather than an older one that could expire at the next step.

Garden/ambient refinement: solid illustrated trees and busy ornament were replaced by fine architectural linework and sparse stems. Chromium reports the global scrollbar as 4px. Independent garden light and stem rotation continue while scroll position is unchanged; animations have reduced-motion/print fallbacks and pause on offscreen chapters. Physical-device, browser-zoom, OS reduced-motion, and Firefox-specific rendering checks remain outstanding.

Palette studio revision: the current time-based chapter observers, pointer interactions, and autonomous bird were retained. All five palettes were selected in Chromium; computed page ink, garden paper, and closing paper changed together. A reload restored the chosen preview. The developer dialog opened from the envelope and from the guest dialog. Closing the nested palette dialog restored the bird to the guest dialog and focus to the developer opener. Radio arrow keys and Escape worked. Arabic/RTL and English/LTR labels were checked.

Inspected at 1280px, 551px, and 320px. At 320px the dialog had five usable options without horizontal overflow, and the couple/card had a positive vertical gap (about 29px during animation). No console warnings/errors were captured. The actual Arabic PNG was 1200 × 1600; its corner pixel was RGB 243,244,243, matching `midnight`. Music remained off. Localhost/public-host gating and configured-theme resolution are unit-tested; no public deployment was performed. Reduced-motion CSS is preserved, but OS motion settings, 200% zoom, physical devices, and Firefox were not rechecked in this revision.

October 23 mobile-arrival and silhouette revision:
- Foreground scenes now reveal independently at 22% visibility, with a 7% bottom margin; observers wait until the opening dialog closes. At 551px, the chapter was awake while story-art remained unarrived at top 807px, with the first ring still translated -150px. Scrolling the artwork into view set has-arrived and completed the join. Fast scrolling past an unseen scene left it waiting until returning.
- Verified 320px, 551px, and 1280px with Arabic/RTL and English/LTR. At 320px, page and palette-dialog scroll widths equaled their client widths. The silhouette and dedication had an 8px positive gap and the action remained accessible. The five wedding palettes updated all shared surfaces together. Keyboard radio arrows changed the palette; Escape restored the opener on the envelope.
- The guest-name dialog and nested palette modal retained the bird. Closing the palette returned the bird to the guest dialog. A real Arabic PNG for سارة أحمد downloaded at 1200 x 1600. Music remained off. No application console warnings/errors captured.
- Native browser zoom shortcuts did not alter CSS viewport size in this tool, so 200% zoom remains unverified. OS reduced motion, print, direct file preview, physical phones, and Firefox were not exercised. Reduced-motion changes reveal pending content in source; print overrides expose unvisited text. The file bootstrap avoids module imports and shows the local HTTP preview link; file URLs cannot be inspected by this browser tool.
- Static HTML/assets check passes (62 references); syntax checks for main.js, themes.js and preview.js pass; all 11 Node tests pass. The local server was restarted as a hidden process on 127.0.0.1:8082 after discovering the old preview was no longer responding. No deployment performed.

Enchanted encounters revision (23 October):
- Eight native ornament buttons share the living bird: hero star, rings, date star, jasmine, wish lantern, couple, paper friend, and closing rings. Each route varies its approach and uses the existing spring. All eight reactions were exercised in Chromium; the jasmine/letter/farewell emit short-lived outline hearts. A fresh hero ornament was later visited autonomously without a tap and acquired its quiet visited state.
- Verified keyboard Return on the couple and its persistent visited state. Focus scroll now settles before a requested encounter starts; deliberate wheel/touch scrolling cancels pending play. Native modal opening cleared the scene reaction and moved the bird into the guest dialog. The keepsake action's press pseudo-element ran magic-touch while the dialog opened normally. No application console warnings/errors captured during these flows.
- Inspected 320px, 551px, and 1280px, Arabic/RTL and English/LTR. At 320px, scroll width equaled client width (305px); the English map button was 236px wide and fit its container. Eight play points had bilingual accessible labels. The static HTML leaves them disabled until enhancement; reduced motion also disables them. The envelope is excluded from magic-control and its label has no arrow, underline shift, or press scaling.
- The venue illustration is now an imagined floating jasmine sky lantern and reflected ripples, without the old arches or plaque. Fairytale silhouette profiles, a prince's tailcoat, tiara and fuller ball gown retain the shared overhead lighting. Artwork and effects use palette tokens. Maps, calendars, names, event content, and PNG rendering were not changed.
- Static checks pass (63 references), JavaScript syntax passes, and all 12 Node tests pass, including the new visit-path tests at phone and desktop sizes. OS reduced-motion switching, 200% browser zoom, physical devices, and Firefox remain unverified in this revision. Music remained off. No external map/calendar navigation, deployment, or publishing was performed.


Personal moments revision (23 October):
- Promise footnote and bridge use cream text on the selected night surface. Inspected the connected jasmine garden at 551px and the English promise at 1280px; the foliage has reserved space below text. New SVG artwork enters independently and retains reduced-motion/print fallbacks.
- Modal backdrop now uses the valid ::backdrop selector. Chromium reports the selected night color at 90% opacity, layered stars and blur. At 320px, page widths were 305/305 and guest-dialog widths 265/265; developer controls no longer cover the submit action.
- Arabic typing (سارة أحمد عبد الله) moved the writing glint from x373.75 at the end to x471.438 at selection zero. English sequential typing also moved the destination. The bird settled above the field. Direction follows the native dir=auto input; names remain local.
- Actual Arabic and English PNG downloads completed. The Arabic file header confirms 1200 x 1600. During the ceremony, the form leaves keyboard navigation and Close receives focus. Escape canceled the reveal; reopening showed no result, no busy state, editable input and an enabled action. Successful retry downloaded normally.
- Background music remained off, and no application warnings/errors were captured. The opening chime is covered by a finite-voice unit test; audible quality and physical device output were not verified by these browser controls.
- Static checks pass (68 references), main.js syntax passes, all 13 Node tests pass. OS reduced motion switching, 200% zoom, physical-device save sheets and Firefox remain unverified. No account event was saved, no deployment performed.


Responsive companion and wedding-paper revision (23 October):
- Verified 320px, 551px and 1280px in Chromium, Arabic and English. Page scroll/client widths matched at 305/305 and 1265/1265. At 320px the lantern measured about 262 x 239px, with a positive gap before the venue copy; its copy entrance delay is now .05s. Earlier 8% observers preserve independent scene arrival.
- Rings were joined with computed translate:none after the bird visit; there is no JavaScript path that restarts their parting. The veil has computed animation:none and transform:none. Inspected the curved profiles, larger lantern shoreline, headed paper friend and closing at phone/desktop sizes. The closing runs coda-travel and coda-breathe, with chapter offscreen and reduced-motion safeguards.
- Arabic sequential typing produced the word gesture; Backspace produced correction and the bird-puzzle animation. A real Arabic PNG downloaded (1200 x 1600 verified from its file header). After success the original submit button computed display:none; changing the name restored display:flex and hid the stale preview.
- A tap on empty closing starlight changed the companion to curious/exploring. Manual ring/lantern/couple/closing visits were exercised. Automatic ornament visits are once per page; practical controls and modal priority retain the existing behavior. The envelope pointer tilt source was preserved.
- All six added palettes were selected and shared ink/night variables changed. Eleven bilingual radio choices are present; the 320px palette panel measured 250/250 client/scroll width. Keyboard ArrowDown selected the next palette and Escape closed the dialog. The desktop studio uses two columns. Local preview was left on moonstone; public configuration was not changed.
- No application warnings/errors captured; background music aria-pressed remained false. Static checks pass (71 references), main syntax passes, all 13 tests pass, including contrast across eleven palettes and a short-visit timing bound. Changed module/CSS references have release queries because stale dependent scripts were observed during reload.
- OS reduced-motion switching, 200% browser zoom, physical devices and Firefox were not exercised in this revision. No deployment, external event saving or publishing was performed.


Text fade refinement: inspected Arabic at 551px and English at 1280px. Sampled heading opacity .0715645 during arrival, then 1 after settling; the waiting promise starts at .04 and was sampled at .234756 while fading in. Computed transitions include opacity for both headings and promise lines, with visible wrapper overflow. Supporting text settled at opacity 1. Desktop had no horizontal overflow. Static check passes (71 references). Reduced-motion/print full-opacity overrides are present; OS switching and 200% zoom were not re-exercised. No JavaScript behavior changed.


Press border and twirling entrance revision: verified Arabic at 551px/320px and English at 1280px. Before arrival the pair had animation:none; on arrival Chromium reported couple-twirl-in, a changing 3D matrix and opacity .658239. It settled at opacity 1 in the original orientation, with animation iteration count 1. The veil retained animation:none. Page scroll/client widths matched at 305/305 and 1265/1265.

A practical button press opened its calendar dialog immediately while its edge reported magic-edge, angle -1.67633deg, opacity 1 and mask-composite:exclude. Keyboard Space switched language and also triggered magic-edge. The map link contains the same aria-hidden border layer. No external map or calendar account action was performed. No console warnings/errors were captured. Background music remained off. Static checks (71 references), main.js syntax and all 13 tests pass. OS reduced-motion switching, 200% zoom, physical-device and Firefox rendering remain unverified; reduced-motion/print fallbacks are explicit in source.


Confirmed Ali and Tabarak content (23 October):
- Replaced the preview names/venue/date with the couple's confirmed data. Arabic and English show Friday 20/11/2026, with numeric months in the hero, date scene and PNG. The demo banner is hidden and demo prefixes are absent. The site remains noindex and has not been deployed. The supplied short Maps link was opened and resolved to the hall listing in Baghdad; the invitation retains the exact supplied link.
- Gathering 17:00, celebration 18:00, conclusion 22:00, Asia/Baghdad. The calendar spans the gathering through the conclusion; actual downloaded ICS contains DTSTART:20261120T140000Z and DTEND:20261120T190000Z, the real names, Officers’ Club and supplied map link. Google/Outlook parameters agree. No event was saved to an account.
- Downloaded and visually inspected a real Arabic guest PNG: 1200 x 1600, Ali/Tabarak, numeric date, Khayal Hall, Officers’ Club and Palestine Street all fit. Names remain local. Font loading samples now use configured names. JSON revalidates on load to avoid stale event facts.
- Inspected Arabic at 551px/320px and English at 1280px. The venue subtitle renders under the venue heading. Page widths matched at 305/305 and 1265/1265. The small paper friend is 42px wide. No console errors/warnings captured. Music stayed off. Existing scenery-only ornaments and recent local changes were preserved.
- Static check passes (72 local references), main syntax passes and all 14 Node tests pass. A new test checks bilingual venue subtitles in calendar output and validation; date tests use a fixed explicit demo fixture independently of the confirmed event. OS reduced-motion switching, 200% zoom, physical-device import/save behavior and Firefox were not re-exercised.


Khayal Hall arrival redesign (23 October):
- Replaced the detached lantern and repeated copy block with an arched folded-paper gateway containing the venue details. Hinged paper leaves open once on foreground arrival; a continuous thread links the preceding garden, seal and next chapter. The imagined architecture is decorative, not a likeness of the real venue.
- Chromium verified the open door's 3D transform, full-opacity venue copy and removal of the inherited rectangular frame. The autonomous bird visited the gateway and its has-met-bird seal state persisted. The running light, interior glow and small stars have independent animations; shared chapter visibility pauses animations offscreen. No ornament buttons were reintroduced.
- Inspected Arabic at 551px and 320px and English at 1280px. At 320px, page client/scroll widths matched at 305/305, and the map action was about 210 x 53px. Desktop widths matched at 1265/1265. The real map URL is unchanged; keyboard focus reached the map link with a visible outline. No external navigation was triggered.
- Wisteria and champagne both recolored the paper, edges and ink; the prior champagne choice was restored. All artwork uses the existing tokens. The public event JSON was not changed. Background music remained off. No application warnings/errors captured in the inspected flows.
- Static checks pass (70 local references), main and bird-scene syntax pass, all 14 Node tests pass including gateway route bounds. Reduced-motion and print fallbacks are explicit in source; OS reduced motion, 200% zoom, physical devices, Firefox and actual print were not exercised in this revision. No publishing or deployment performed.


Chapter rhythm, timeline and paper-door refinement (23 October):
- Chromium inspected Arabic at 551px/320px and English at 1280px. The gap between the venue bridge and keepsake heading decreased from 144px to 68px at 551px (76px at 320px). Story height decreased from 884px to about 725px and promise height from 884px to about 746px at 551px. The jasmine still has its reserved artwork space. No horizontal overflow: 305/305 at 320px and 1265/1265 at 1280px.
- Before entry, names computed opacity 1 and ring transitions none. Once 35% of the ring artwork entered, the groups used the new 2.8-second easing; both names stayed centered inside their actual SVG ring groups. Later they computed opacity 0, the rings settled with translate:none and together computed opacity 1. English names swap to the left/right order; Arabic retains the opposite order. No parting loop or oversized word response was added.
- The timeline uses actual marker centers: at 551px delays were 0s, about 2.459s and 4.94s; at 1280px English they recalculated to 0s, 2.47s and 4.94s. Observed the last diamond lit while the thread reached its last stop, with the others quiet; on English localization the first stop lit at the restarted beginning. After navigating to the venue, both the dot and all diamonds computed animation-play-state:paused. No per-frame geometry measurements were added.
- Inspected the SVG paper leaves, arched inset contours and handles, with opening times 1.8s/.12s and 2s/.23s. Keyboard focus reached the real Maps link with a visible outline and the original supplied URL. No external navigation was triggered.
- The Arabic guest modal displays the new invitation copy, name placeholder and gentle helper, without pixel dimensions, PNG jargon or the old character/privacy disclaimer. The actual maxlength remains 60. At 320px the dialog client/scroll widths matched at 265/265. Escape closed it. The surrounding page privacy statement and local-only guest handling are preserved.
- Static check passes (71 local references); main/preview syntax checks and all 14 Node tests pass. No application console warnings/errors captured in the inspected flows. Background music remained off. Source includes reduced-motion and print fallbacks; OS preference switching, 200% browser zoom, physical devices, Firefox and actual printing were not exercised in this revision. No deployment performed.


Ring pacing and missing gate-opening fix (23 October):
- At 551px in Chromium, verified both pre-arrival door transforms were the identity rotation in perspective, with transition:none. Immediately after arrival the left matrix began at about cos(theta)=.9895 and the right at .9991; after settling they reached .207912 (78 degrees) with opposite signs. Saved an actual in-progress screenshot, rather than checking only the final open pose. The prior waiting selector lacked its closed transform.
- Rings compute 1.65s movement with .2s delay; both names were opacity 1 during approach. They settle with translate:none, names opacity 0 and together opacity 1. The name fade starts at 2.05s; together finishes at 3s. The 35% visibility gate is shared by the ring art and portal only; ordinary text still arrives early at 8%.
- Checked 320px/551px Arabic and 1280px English. No horizontal overflow (305/305 and 1265/1265). English names localized correctly and the exact supplied Maps link remains unchanged. Background music stayed off. No application warnings/errors captured.
- Static HTML/assets check (71 references), main syntax check and all 14 Node tests pass. Existing reduced-motion and print rules remain; OS preference switching, 200% browser zoom and physical devices were not exercised in this revision. No event facts, download behavior, or public deployment were changed.


Live Vercel verification (23 October 2026):
- Production deployment `dpl_79TQ2f4mbf8J8rCHQSUq5QKW5haf` is READY at https://wedding-invitation-ochre-nu.vercel.app. The first CLI upload was automatically classified as production; the couple explicitly approved keeping it. A separate protected preview is also READY. No existing deployment was removed.
- Public HTTPS requests to all 25 deployed files returned HTTP 200 and matched local SHA-256 hashes. Configuration serves only public/; the upload dry run excluded source instructions, docs, tests, artifacts, local link metadata and environment files.
- Opened the real live URL without a Vercel login gate, completed the envelope opening, inspected Arabic at 551px and English at 1280px, and generated a guest keepsake through the real form. Its completed PNG preview reported 1200 x 1600. The original submit action hid after success.
- Page client/scroll widths matched at 536/536 and 1265/1265. The developer color control was absent on the public host and the configured olive palette was active. Music remained off; no browser warnings/errors captured. Existing noindex behavior was preserved.
- OS reduced motion, 200% zoom, physical phones and native save/import sheets were not exercised in this hosted check. No calendar event was saved and no new app features were added.


## Chrome rendering performance pass — 24 October 2026

Reviewed commits c847098 and 710866a and preserved their startup, font compression, font cache headers, scroll restoration and backdrop compatibility fixes. The new pass targets continuous rendering, not event content.

Measured the current and optimized sources in isolated Google Chrome through the official Chrome DevTools CLI. Settings were 551 x 884 CSS pixels, DPR 2, mobile/touch, and 4x CPU slowdown. A temporary local-only harness ran the same six-second sinusoidal scroll in each scene. Fresh pages and delayed automatic runs avoided the DevTools click helper's DOM-stability observers; the profiler itself still adds overhead. Background music was not enabled. These are single lab samples, not real-device FPS guarantees or Core Web Vitals scores.

- Venue: 127 to 245 frame samples; median interval 41.8 to 20.9ms; p95 76.5 to 48.5ms; frames over 50ms 34 to 9. Long tasks fell from 30 / 2008ms total to 7 / 578ms. Scene rectangle reads fell from 288 to 112. Running animations at the end fell from 32 to 14.
- Dance: 91 to 251 frame samples; median interval 69.5 to 20.9ms; p95 83.5 to 41.6ms; frames over 50ms 82 to 5. Long tasks fell from 80 / 5361ms total to 5 / 320ms. Scene rectangle reads fell from 288 to 32. Running animations at the end fell from 46 to 10.
- Generated stars fell from 168 to 83 and motes from 60 to 30 at this viewport. Most stars remain still, so animated-element count falls further than the DOM count alone suggests.
- Raw Chrome traces, screenshots and JSON metrics are retained locally under the task workspace's artifacts/chrome-auto-{current,optimized}-{venue,dance} files. The temporary server, probe, CLI runner and conversion tools are outside public/ and outside the repository. They are not deployed.

Functional checks: delayed content loading kept the opaque envelope in front; a three-second delay produced zero sampled frames exposing the body before the opening dialog. Deliberate HTTP 503 returned to readable Arabic event details, and a page with scripts removed kept its map link and confirmed data. Keyboard Enter opened the invitation; reload from a lower section returned to the envelope at scroll position zero. Arabic typing, the bird's writing response, local PNG generation, hidden completed submit action, Escape close and English switching all worked without captured application warnings/errors in the manual flow.

Chrome reduced-motion emulation at 320px and 1280px showed zero running animations, a hidden flight layer, figure opacity 1, and no horizontal overflow. The 551px gateway and finished couple were visually inspected. Native browser zoom shortcuts did not change headless Chrome's zoom, so actual 200% browser zoom remains unverified. Physical-phone, Safari and Firefox testing remain unperformed.

Static HTML/assets check: 73 references pass. JavaScript syntax checks pass. All 16 Node tests pass, including the bounded canvas wake and existing startup/calendar/name/theme/physics coverage. Event facts, local-only guest names, noindex settings, optional music, the door opening, one-time dance entrance and bird encounters are preserved.


## App-aware map/calendar pass — 24 October 2026

Verified in isolated Playwright contexts with installed Chrome 156.0.8078.47 and Edge 155.0.4283.62, plus test Firefox 157.0 and WebKit 27.2 on Windows. This covers browser engines, not all versions or actual iOS/Android native apps.

Apple and Android user-agent cases select the expected primary map and calendar links, and always expose alternatives. Apple pins use the verified hall marker at 33.3376782,44.4264857; Google retains the couple’s exact share URL. A normal primary-map click issued the expected navigation GET, intercepted by the test before leaving for the external provider. Primary Google calendar clicks issued the supported event-editor URL with 20261120T140000Z/20261120T190000Z. Primary Apple calendar links produced the hosted calendar file in headless browsers; this verifies file delivery, not native Calendar import. Explicit downloads contain the same instants and localized venue/name details. Neither accounts nor calendar events were created.

All four engines passed Arabic/English link localization, alternate calendars, Escape dismissal, and 320/551/1280px layout checks. Screenshots of the narrow calendar dialog/date dial and narrow/wide venue were inspected. Chrome, Edge, Firefox, and WebKit also passed the existing envelope, door/dance arrivals, Arabic and English 1200x1600 PNGs, calendar download, reload-at-top, 320px reduced motion (zero running animations), and no-JavaScript fallback checks. No application errors/warnings were captured in the regression flows. An initial WebKit regression assertion expected the old Google-only map and was updated for its Apple platform hint. One concurrent screenshot timed out waiting for fonts; the isolated repeat passed. WebKit reports a normal frame-load interruption for a calendar response handed to its downloader.

The localhost palette studio remains present; production continues to hide it. Previously, all eleven palettes, local persistence and nested-dialog behavior passed in all four engines. No animation runtime, guest-name privacy, event time, or indexing setting changed in this pass.

Static check passes 77 references; main/preview syntax checks pass; all 19 Node tests pass. Tests ensure both hosted calendar files match current content, reject invalid coordinates, preserve the Google listing and check Apple/iPad defaults. Hosted files are regenerated with node scripts/generate-calendar.mjs; the site remains buildless. Vercel serves .ics as text/calendar, inline, with revalidation.

Actual iPhone/Android app handoff, calendar import/save sheets, physical-phone performance and native 200% zoom remain unverified. Website JavaScript cannot enumerate unrelated installed apps; no app-probing scheme or timer redirect is used. Safari-native verification still requires an Apple device, despite WebKit coverage. Temporary browser tools, downloaded engines, screenshots and runners remain outside the repository/public directory.


## Public colors, sharing metadata and calendar handoff — 24 October 2026

The user confirmed that all live visitors should see Colors. Removed the host gate and development wording; valid saved preferences apply on any host and invalid preferences fall back to the configured default. All eleven palette contrast checks remain. The existing nested-dialog studio and per-device preference storage are reused.

A WhatsApp-style HTTP request to the public hostname returned HTTP 200, normal HTML and a title, but no og:title; robots.txt also disallowed all crawlers. Added static canonical/Open Graph/Twitter tags for the confirmed hostname plus a real 1200x630 PNG (51,499 bytes) with approved names, numeric date and venue. Sharing crawlers have explicit Allow rules; other crawlers retain Disallow:/ and HTML noindex. This verifies page metadata and asset delivery, not WhatsApp’s cached preview UI or an actual sent message.

A WebKit primary calendar download could interrupt the invitation document loader, leaving a later English font in error/loading. Opening native calendar file links separately preserves the original loader. The local WebKit Apple/Android routing repeat then passed including subsequent English font-dependent screenshots, and no interrupted request was recorded. Explicit file downloads and ordinary Google event links retain their existing behavior. Native app import still requires a phone check.

Static references and JavaScript syntax pass. All 20 Node tests pass, including saved public-theme preference behavior, current-host sharing metadata, actual PNG size/dimensions and sharing-bot rules. The shared image was visually inspected. Existing app-link, event, font, name, physics and reduced-motion checks remain.


Sharing restraint pass (24 October 2026): simplified HTML/Open Graph/Twitter titles to علي وتبارك and descriptions to the numeric date plus قاعة خيال. Replaced the event-filled sharing card with a centered ع / ت monogram inside one fine champagne circle on ivory. The new filename wedding-monogram.png avoids reusing the previous image cache key; the previous image stays available for older cached previews. The 1200x630 image was rendered from native SVG/type using the existing licensed Amiri font and inspected visually. Browser title localization remains, with the narrative tagline removed. No layout, motion, themes, map/calendar routing, event facts, or indexing policy changed.
Verification: 20 Node checks and the static asset check pass. Real Chrome confirmed names-only Arabic/English browser titles, short localized date/venue descriptions, the static Arabic sharing title and no runtime errors. The new monogram PNG is 20,438 bytes. WhatsApp itself was not used to send a message; final crawler responses are checked after Git auto-deployment.

Public verification: Git deployment a3cf362 reached READY. WhatsApp/facebookexternalhit HTTP requests received the names-only title, date/venue description, and new monogram URL; the 20,438-byte PNG returned HTTP 200 with image/png. No message was sent through WhatsApp.


Merged identity pass (24 October 2026): rendered three real typeface options with the exact Arabic names; all fonts loaded and their glyph shapes were visually inspected. These remain preview-only pending the couple’s font choice. The couple liked the custom generated initials artwork. It is used as the sharing preview in a compact JPEG encoding, 1730x909 and 71,611 bytes, with matching Open Graph dimensions/type and a new filename. The original generated PNG remains in the task workspace, and generation provenance is in docs/monogram-artwork.md. No hero layout or animation changes are included in this preview-asset pass.


## Selected Arabic hero typography — 24 October 2026

Aref Ruqaa is the selected Arabic name face, with the original italic Cormorant ampersand lowered 0.32em. The temporary comparison and Gulzar assets were removed. The single names-only WOFF2 is 7,304 bytes and includes its OFL license and source provenance. English names retain the original typeface and ampersand position.

Validation: static smoke check passes (79 local references), all 20 Node tests pass, and the final single-hero layout passes in isolated Chrome at 375/551/1280px plus Edge and Firefox at 551px. Each browser loaded the selected face, displayed one hero and one h1, preserved English switching, and reported no runtime errors or horizontal overflow. Chrome screenshots were inspected. WebKit could not launch in this environment (spawn UNKNOWN, repeated once); this release has no fresh WebKit/Safari validation.


## Recorded music — 24 October 2026

Moonlight’s self-hosted quiet edit is a 4,070,678-byte stereo MP3, about 254 seconds. The original composer’s CC BY 4.0 permission and attribution format were checked on the official track and usage pages. Source URLs, file hashes and changes are recorded alongside the asset.

Browser playback checks passed in isolated Chrome, Edge and Firefox at 375px: zero MP3 requests on a silent opening, decoded playback and advancing currentTime after opt-in, pause/resume preserving position, native loop enabled, English control labels and visible credit, no horizontal overflow or JavaScript errors. Chrome additionally checked the music-enabled envelope, cancellation while a cold audio request is pending, and retry after a deliberately aborted request. Existing 20 Node tests, syntax checks and the static smoke check pass. No new Safari or physical phone playback test is claimed; WebKit’s executable could not launch during the immediately preceding typography check.

To recheck manually: open silently and confirm Network has no audio request; enable music and confirm the actual recording plays; pause/resume and confirm position is retained; switch languages; open with music from a fresh visit; toggle off while loading; temporarily make the MP3 unavailable, then restore it and retry. Native audio remains a normal same-origin file, with no account or third-party streaming request.

## Supplied recording replacement — 27 October 2026

Replaced Moonlight with the couple's supplied MP3 of فستانك الأبيض by حسين الجسمي. The full approximately 274-second recording is retained; the stereo 128 kbps / 44.1 kHz playback copy is 4,392,446 bytes versus 6,588,636 bytes supplied, with gain 0.35, a one-second intro fade, and a two-second ending fade. The original Downloads file is untouched. Footer and source metadata no longer claim a CC BY license for this recording.

The repository static check passes (2 HTML pages / 92 references including the untracked local audition page), JavaScript syntax and git diff whitespace checks pass. Chrome, Edge, and Firefox verified that silent opening makes no MP3 request, the new recording decodes and advances, pause/resume retains position, native looping/preload flags remain correct, bilingual controls work, and the updated footer has no mobile overflow or runtime errors. Chrome additionally passed music-enabled opening, cancellation during a delayed audio request, and retry after a failed audio request. The footer was visually inspected at 551px. No new Safari or physical-device test was performed. The untracked music-preview.html comparison is excluded from the release.


## Song-only audio at half level — 27 October 2026

Re-encoded directly from the supplied original at gain 0.175, exactly half the preceding 0.35 setting. FFmpeg measured mean/peak levels changing from -23.6/-9.0 dB to -29.6/-15.0 dB (6 dB lower). The full recording and existing fades remain. The new soft.mp3 filename avoids the older louder browser cache. Removed the opening chime import, AudioContext creation, caller, unused module and obsolete chime test. Main modulepreload and preview import use matching release 20261027-1.

All 19 remaining Node tests, static references and JavaScript syntax checks pass. Chrome, Edge and Firefox verified the new track decodes and plays, silent opening makes no audio request, and play/pause, looping, bilingual controls and resume work without runtime errors. Chrome WebAudio diagnostics observed no context on envelope opening; cold-load cancellation and failed-request retry also pass. No new Safari or physical-device test was performed.


## Romantic garden branch study — 28 October 2026

Chrome visually checked the burgundy opening and original floral/swan hero at 375px, 551px and 1280px, with reduced motion, loaded responsive art, no horizontal overflow and no runtime errors. English names and the venue were visually inspected at 375px. Chrome and Firefox exercised bilingual switching, all twelve palette controls, switching pearl/rose, and real personalized PNG download. Chrome also checked keyboard access and an effective 200% zoom layout. All 19 Node tests pass, including twelve-palette contrast and event/calendar preservation. No fresh Safari or physical-device verification. Original transparent art is delivered as 281KB/513KB WebP variants; no image animation runs continuously. The local untracked music comparison is excluded from the branch commit.


## Vintage palette refinement — 28 October 2026

All 19 Node tests and static references pass. Chrome and Firefox tested every one of the twelve palette choices: every opening/envelope changes, closing background equals the body background, the original olive default initializes correctly, saved choices survive reload, and no runtime errors occur. Chrome captured the olive opening, hero, schedule and closing at 375px, the hero at 1280px, and checked overflow at 320px. The painted frame uses subtle theme-dependent color toning; text remains live. The burgundy palette remains optional. No fresh Safari/device check. Screenshots and the runnable browser check are in the task QA workspace, not the deployable site.


## Dance handoff and white stationery — 28 October 2026

Chrome frame sampling found an approximately 12px translation discontinuity when dance-waltz entered its active phase at 2.4s, before the 2.8s twirl finished. The loop now waits until 2.8s, starts/ends with the neutral transform and eases through left/right poses. The twirl ends with the same explicit perspective/rotation/scale list rather than switching to none. A repeated 4.2-second sample found no initial step; the largest measured loop translation increment was about 0.066px per approximately 7ms sample. This measures movement continuity, not whole-page frame-rate performance.

All 19 Node tests, static references and whitespace checks pass. Chrome and Firefox checked all twelve palettes: the envelope stays white/light ivory, seals and backgrounds remain theme-aware, closing matches paper and saved choices persist. The opening was visually reviewed at 375px. Added subtle inset engraving, paper-fold shading and a small flourish under the landing title. No new runtime loop, audio or dependency. The source study remains on codex/reel-inspired-invitation, separate from production main.


## Musical companion and Arabic seal — 28 October 2026

Chrome and Firefox verified no MP3 request before opt-in; actual changing song energy (observed approximately 0.48–0.65 during the sampled phrase); playing/pausing/resuming the selected recording; noninteractive edge light; reset to zero on pause; and changing reduced motion while music continues. A fresh reduced-motion visit played the song without starting reactions. Chrome also checked recovery after an aborted MP3 download with active analysis. The new lifecycle regression test verifies one audio graph, no rerouting before context permission resolves, pause cleanup, hidden-page cleanup and reduced-motion behavior. All 20 Node tests and static references pass. The white envelope/approved Arabic monogram were visually inspected at 551px. No fresh physical iPhone or Safari playback check was performed. The sampler has no renderer of its own: it updates three bounded style properties at most 20 times/second and shares the existing capped bird wake canvas.


## Stronger travelling music reactions — 28 October 2026

Chrome and Firefox again passed real playback/energy changes, pause/resume cleanup, reduced-motion switching without stopping the song, and a fresh reduced-motion music opening. The focused Chrome check observed 64 different perimeter transforms in 6.5 seconds, an accent peak of 1.0, a light-opacity peak approximately 0.60 on paper, and distinct changing frequency-band values. Contrast mode switched correctly between celebration/night and venue/paper. These are runtime measurements of response values, not a claim of physical-device smoothness. The note-and-waveform control was visually inspected expanded and collapsed, and paper/night compositions were captured after section arrivals. All 20 Node tests and syntax/static checks pass. No new Safari or physical-device verification. Existing song gain, white envelope, approved initials, event facts and production main remain unchanged.


## Calm irregular reflections — 28 October 2026

All 21 tests, including a new seeded light-timing regression, pass. The regression verifies zero-opacity entry, complete fade-out before relocation, a quiet gap, varied entry edges, bounded local drift, and a lower dark-scene brightness limit. Chrome real-time observation saw three independent appearances (top/bottom/right), one reflection at a time, fully quiet intervals and a maximum target night opacity of 0.0394 during the sampled recording. The bird pseudo-element content is none. Chrome and Firefox retained real song playback, energy changes, pause/resume cleanup and reduced-motion playback without reactions. Settled paper/night screenshots were reviewed at 551px. Physical-device/Safari testing remains unperformed. No audio level or event-data changes; production main is untouched.
