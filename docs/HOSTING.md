# Hosting and domain

## Deployment contract

This is a static website. Set the host's **publish directory/document root to `public/`**, and leave the build command empty. Upload the contents of `public/` if using a hosting control panel, SFTP, or an ordinary web server. `index.html` must be at the served root.

Do not serve `.agents/`, `.cursor/`, `docs/`, `scripts/`, or the project root. No SPA rewrite, Node server, database, or package installation is needed for the starter. If a provider insists on a build setting, use its documented static-site setup after the provider is chosen.

Links to local assets are relative, so `/` and `/wedding/` can both host the page. Keep filename casing exact. Test the page over HTTP rather than relying only on a `file://` preview.

## Attach a domain when selected

1. Deploy `public/` and check the provider's preview URL.
2. Add the exact custom hostname in the chosen host's dashboard.
3. Follow that host's current DNS instructions for the apex domain and/or `www`; record the actual values rather than inventing addresses.
4. Wait for domain verification and a valid HTTPS certificate, then enable HTTPS redirects.
5. Choose one canonical hostname and redirect the other hostname if applicable.
6. Test the real domain, internal anchors, assets, and mobile layout over HTTPS.

Provider-specific configuration and DNS values should be added only after choosing the provider and hostname. No live deployment or domain registration has been performed by this scaffold.

## Launch checklist

- Replace the starter heading, placeholders, title, description, and favicon with the approved invitation identity.
- Confirm event facts, copy, asset rights, and the intended public/private audience.
- Run `python scripts/check.py`. Check any JavaScript behavior in a browser.
- Inspect narrow and wide screens, keyboard navigation, 200% zoom, and reduced motion; check console/network errors.
- If search discovery is wanted, remove the HTML `noindex` directive and change `robots.txt` deliberately. If the couple prefers no indexing, keep them. Crawling restrictions do not provide privacy.
- After the real hostname is known, add an absolute canonical URL and appropriate Open Graph metadata with absolute HTTPS image URLs. Do not ship an invented domain or nonexistent share image.
- If a form is added, connect it to a real endpoint and verify delivery, errors, validation, and a fallback contact route. Keep secrets and guest lists out of frontend files.
- Add host-appropriate security headers once required external services are known. Set a Content Security Policy that matches real sources rather than disabling page features accidentally.
- If the invitation must be restricted, configure actual access control with the hosting provider. A hidden URL, `robots.txt`, or a JavaScript password is not authentication.
- Keep an editable source copy and a backup of the final published files.

## Local commands

```powershell
python -m http.server 8080 --bind 127.0.0.1 --directory public
python scripts/check.py
```

The first command is only a local preview server. Production hosting serves static files directly.
