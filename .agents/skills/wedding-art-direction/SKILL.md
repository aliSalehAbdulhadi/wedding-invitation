---
name: wedding-art-direction
description: Design or refine this wedding invitation's visual identity, typography, palette, layout, and motion in native HTML and CSS. Use for visual implementation and styling requests in this project.
---

# Wedding art direction

Read `docs/DESIGN.md` and the relevant facts in `docs/CONTENT.md` from the project root. Treat them as the starting brief, with later user choices taking priority. Read the local `frontend-design` skill for broader craft guidance when helpful.

## Shape the invitation

Choose a coherent identity suited to this couple: typography, paper/background, ink, a single visual motif, and a clear information hierarchy. The default proposal is modern heirloom stationery. Keep the distinctive element connected to the couple rather than adding fashionable effects by habit.

Let the names and invitation wording lead. Practical details must be easy to find and read on a phone. Prefer meaningful sections and generous space to repeated generic cards. Do not invent event facts or cultural wording to fill a composition.

## Translate into native web code

- Extend existing tokens in `public/assets/css/styles.css` instead of starting a second design system.
- Use expressive serif headings and legible supporting type; keep type families limited and fonts licensed. Do not assume Apple font redistribution rights.
- Set body text at a comfortable size and line height. Keep small text in a strong ink color; reserve pale gold/bronze for ornament unless contrast is verified.
- Use semantic HTML, relative assets, fluid type, and layouts that tolerate long names and wrapped text.
- Add a purposeful motif in CSS or SVG when appropriate. Preserve reading order and distinguish decorative imagery from meaningful content.
- Add motion only when it improves the requested experience. It must respect reduced motion and leave core content visible without JavaScript.

## Evaluate

Preview the real page at phone and desktop widths. Check whether the invitation has one clear focal point, balanced spacing, readable details, and an obvious next action if one exists. Inspect keyboard focus, text zoom, and the actual language/direction in use. State unperformed browser checks honestly.

Keep the implementation small; visual quality should come from deliberate composition and typography, not from frameworks or animation packages.
