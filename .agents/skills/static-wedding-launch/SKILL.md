---
name: static-wedding-launch
description: Prepare this native HTML, CSS, and JavaScript wedding invitation for static hosting and a custom domain. Use when packaging, deploying, reviewing domain readiness, or preparing launch.
---

# Static wedding launch

Read `docs/HOSTING.md` and the current content decisions in `docs/CONTENT.md`. Follow the user's chosen provider and audience; domain readiness alone does not select a provider or publish a site.

## Delivery contract

- `public/` is the complete deployment directory. Keep agent instructions, docs, scripts, and private content outside it.
- Use the provider's static file hosting, with no build command for the current starter.
- Retain relative local URLs so custom domains and subdirectory previews both work. Check filename casing and all referenced files.
- Run `python scripts/check.py`, then inspect an HTTP preview. If JavaScript behavior exists, syntax-check it and exercise the important guest flow.
- Document actual deployment settings and results when a provider is chosen. Consult its current official documentation for DNS and HTTPS setup.

## Before release

Confirm real event details and remove starter copy. Add canonical and social metadata only after the exact public hostname and assets are known. Deliberately choose whether to keep the initial noindex settings.

A static client cannot securely store RSVP records, protect a private guest list, or keep API secrets. If such features are requested, select an appropriate real service or backend and test delivery/failure behavior. Never fake completion or treat robots directives as access control.

Verify the intended domain over HTTPS, asset responses, navigation, phone layout, keyboard access, and any real RSVP or calendar action before claiming launch is complete. State any remaining external verification or domain setup work.
