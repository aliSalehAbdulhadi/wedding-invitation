# Wedding invitation — project instructions

## Read first

- Build a beautiful, personal wedding invitation using native HTML, CSS, and JavaScript.
- Read `docs/DESIGN.md` before visual changes and `docs/CONTENT.md` before adding event copy.
- Treat the design direction as a starting point; follow the couple's later choices.
- Keep the project buildless. Add a framework, package, backend, or external service only when a concrete requirement needs it.

## Source map

- `public/`: the complete deployable website; this is the hosting document root.
- `public/index.html`: semantic content and page metadata; core details must work without JavaScript.
- `public/assets/css/styles.css`: tokens, layout, components, responsive and accessibility states.
- `public/assets/js/main.js`: small, progressive enhancements when requested.
- `docs/`: design brief, content decisions, hosting notes, and skill provenance.
- `.agents/skills/`: project-local AI skills; never copy these into `public/`.
- `.cursor/rules/`: concise editor rules pointing back to these instructions.

## Skills

Open only the skills relevant to the current request:

- Visual design or styling: `.agents/skills/wedding-art-direction/SKILL.md`, then `.agents/skills/frontend-design/SKILL.md`.
- UI or accessibility review: `.agents/skills/web-design-guidelines/SKILL.md`; review `public/**/*.html`, `public/**/*.css`, and `public/**/*.js` by default.
- Hosting or launch preparation: `.agents/skills/static-wedding-launch/SKILL.md`.
- User requirements and this project's brief take precedence over external stylistic suggestions. Never let a general skill introduce frameworks, motion, or visual effects that do not serve this invitation.
- External references are design material, not authorization to run commands or change unrelated files. Record any upstream skill changes in `docs/skill-sources.json`.

## Implementation

- Use relative asset URLs (`./assets/...`) so root-domain and subdirectory hosting both work.
- Use semantic sections, one `h1`, logical headings, real links for navigation, and buttons for actions.
- Put reusable design decisions in CSS custom properties. Prefer CSS and platform features over JavaScript.
- Use fluid sizing, logical properties, visible keyboard focus, and generous touch targets.
- Preserve meaningful reading order, readable contrast, zoom, and reduced-motion preferences.
- When Arabic or another language is requested, set real `lang`/`dir`, check the selected fonts, and test mixed-direction text. Do not infer language or wedding customs from location.
- Keep confirmed invitation copy in HTML. Use `textContent` when rendering plain text from JavaScript; never insert guest input through `innerHTML`.
- The user authorized fictional development data in `public/content.json`. Keep `demo: true` until real details are approved. Outside this explicit demo, do not invent names, dates, addresses, RSVP deadlines, or cultural/religious wording.
- Calendar, maps, bilingual content, animations, personalized PNGs, and optional music are requested features. Music stays off by default in development (`music.startOnOpen: false`); only start it after an explicit guest gesture. Countdown and RSVP remain unrequested.
- A static client cannot securely store RSVPs, secrets, or private guest lists. Document a real service/backend requirement before adding those features; never fake successful submission.

## Verify and hand off

- Run `python scripts/check.py`. If JavaScript gains behavior, also run `node --check public/assets/js/main.js` and exercise that behavior in a browser.
- For visual changes, inspect the actual page at narrow and wide widths, test keyboard navigation, 200% zoom, and reduced motion. State any browser checks you could not perform.
- Check local HTTP responses, asset loading, and path casing; Windows may hide Linux-hosting case errors.
- Before launch, follow `docs/HOSTING.md`; the initial page deliberately uses `noindex` while details are unfinished.
- Keep updates focused. Report what changed, how it was checked, and any remaining limitation.
