# Development verification

Verified in the in-app Chromium browser and with standard-library checks:

- Arabic default/RTL and English switching/LTR; localized headings, dialogs, dates, links, and copy.
- Desktop 1280px and phone widths 390px and 320px; narrow-screen overflow was found and fixed.
- Envelope entry, silent default, explicit music playback and mute; no console warnings/errors in the checked flows.
- Scroll progress changes actual ring transforms, the promise text masks, the traced garden path and marker, and the emerging card transform. Scrolling back reverses the progression.
- Calendar choices render; a real browser download contains the expected UTC instants and demo label.
- Arabic and English personalized PNGs download at exactly 1200 × 1600. Arabic guest-name shaping was visually inspected. Blank-name handling was exercised.
- Nine Node test groups check content validation, ordered timezone-aware dates, calendar injection/escaping/UTF-8 folding, calendar URLs, Unicode name handling, flight-curve anchor continuity, spring convergence/inertia, wake emission/drift/expiry, and reversible/clamped chapter progress including reduced motion.
- Static HTML/asset/anchor/case checks and JavaScript syntax checks pass.

Reduced-motion and print fallbacks are implemented. OS-level reduced-motion emulation and 200% browser zoom were not exercised through the available browser controls. Final native iPhone/Android/Mac/Windows calendar-app import and mobile save-sheet behavior require device testing before launch. External calendar links were inspected; no real event was saved to an account.

Sequence check: the actual paper-bird element moves from the opening letter to the flight overlay, with changing transforms across scroll, no added horizontal overflow, and silent entry. PNG export and modal interaction were rechecked with the flight overlay active. The new PNG includes the same bird motif.

Autonomous-motion check: the browser entered `perched` with folded wings after an independent detour. Scrolling changed it to `following` and unfolded its wings, with no horizontal overflow or console errors. A new unit test checks gradual movement, settling, response to changed destinations, and a bounded time step after long pauses.

Wake update: the browser confirms the old static route is absent, the 32-mark SVG pool emits during actual flight/exploration, and all marks fade to zero visibility while perched. Scroll wakes the companion and creates a fresh wake. Inspected at 320px and 1280px with no horizontal overflow, no console errors/warnings, and music still off. The unit check covers bounded population, drift, expiry at rest, renewed flight, and stale-mark clearing after a long pause. Reduced motion and 200% browser zoom remain unexercised as noted above.

Connected-world revision: inspected Arabic/RTL and English/LTR at 320px, 390px, and 1280px. The scenes now use full-width orbit, celestial dial, blooming promise, architectural garden, and unfolding-letter compositions. Scroll changes ring union and gate perspective; reversing scroll reverses their progress. A cramped phone date dial was found and given independent height so its weekday clears the decorative stamp and its actions remain readable. No horizontal overflow was observed.

The actual flight layer becomes a child of each open action dialog; the same bird lands at its header perch, and closing returns the layer to the body. Escape and the close button restore focus to the opener. An actual Arabic guest PNG downloaded with this layer present, and the input updates the on-page keepsake locally. Music stays off. The motion test was made robust by sampling the newest live wisp, rather than an older one that could expire at the next step.

Garden/ambient refinement: solid illustrated trees and busy ornament were replaced by fine architectural linework and sparse stems. Chromium reports the global scrollbar as 4px. Independent garden light and stem rotation continue while scroll position is unchanged; animations have reduced-motion/print fallbacks and pause on offscreen chapters. Physical-device, browser-zoom, OS reduced-motion, and Firefox-specific rendering checks remain outstanding.
