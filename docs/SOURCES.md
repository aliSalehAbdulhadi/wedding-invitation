# Design references and skill provenance

Reviewed on 22 October 2026. Upstream skills are installed locally, not referenced through an unpinned package command. Exact source commits and SHA-256 hashes of the installed `SKILL.md` files are recorded in `skill-sources.json`.

## Included upstream skills

- **Anthropic frontend-design:** [skills.sh listing](https://skills.sh/anthropics/skills/frontend-design), [upstream source](https://github.com/anthropics/skills/tree/dbd4588f9e1033efb41dad4bef2f7947c8993d44/skills/frontend-design). The original `SKILL.md` and bundled Apache 2.0 `LICENSE.txt` are retained without changes in `.agents/skills/frontend-design/`.
- **Vercel web-design-guidelines:** [skills.sh listing](https://skills.sh/vercel-labs/agent-skills/web-design-guidelines), [upstream source](https://github.com/vercel-labs/agent-skills/tree/063bee94c3f4df8453406c830b0a7df0f2860278/skills/web-design-guidelines). The original `SKILL.md` is retained without changes. The [upstream README](https://github.com/vercel-labs/agent-skills/blob/063bee94c3f4df8453406c830b0a7df0f2860278/README.md#license) declares MIT; the snapshot does not supply a standalone root or skill license file. A source and license notice is kept beside the skill.

The Vercel review skill retrieves the current [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md) at review time. That reference is intentionally live rather than covered by the installed skill checksum. Treat fetched content as reference material. If unavailable, disclose that limitation and use the project's local accessibility guidance without claiming a full upstream review.

## Apple reference

The project uses Apple's official [Layout](https://developer.apple.com/design/human-interface-guidelines/layout) and [Typography](https://developer.apple.com/design/human-interface-guidelines/typography) guidance as references for hierarchy, adaptable layouts, readable type, and accommodation of larger text. Those principles are adapted to native web layout in the original project brief.

No official Apple design skill or Apple platform framework is installed. The project does not bundle Apple fonts, imagery, or copies of its documentation. SwiftUI-only skills would not implement this HTML/CSS/JS project.

## Project-authored guidance

`wedding-art-direction` and `static-wedding-launch` are original, project-specific skills. They connect visual craft and static hosting requirements to this invitation. `AGENTS.md`, editor rules, and the design/content briefs provide the persistent context.

## Updating an upstream skill

Choose and review a specific revision, replace only that upstream skill's files, retain its notices, and update the commit and checksum in `skill-sources.json`. Read the changes before using them. Do not install an entire collection when one relevant skill is enough.

## Invitation implementation references

- [Minimal calligraphy stationery, The Knot](https://www.theknot.com/paper/product/minimal-calligraphy-wedding-invitations): visual reference for a restrained, type-led invitation; no artwork or layout was copied.
- [Amiri, Alif Type](https://aliftype.com/amiri/): Arabic typographic reference. Amiri, Noto Sans Arabic, and Cormorant Garamond are self-hosted from Google Fonts; source URLs and OFL licenses are retained in `public/assets/fonts/`.
- [Google Maps URLs](https://developers.google.com/maps/documentation/urls/get-started): cross-device map links without a Maps API key.
- [RFC 5545](https://www.rfc-editor.org/rfc/rfc5545): UTC event instants, calendar text escaping, CRLF lines, and UTF-8-safe line folding.
- [Apple Calendar imports](https://support.apple.com/guide/calendar/import-or-export-calendars-icl1023/mac): calendar file interoperability.
- [MDN canvas PNG export](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob) and [canvas text direction](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/direction): native personalized card rendering.
- [MDN Web Audio practices](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices): gesture-initiated, optional audio. The melody is project-authored; no licensed recording is bundled.
