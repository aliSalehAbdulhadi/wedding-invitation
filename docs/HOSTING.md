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


## Vercel setup

The root `vercel.json` selects the Other framework preset (`framework: null`), skips dependency installation and the build command, and serves only `public/`. `.vercelignore` uploads only `public/` and `vercel.json`; project instructions, documentation, tests and verification artifacts stay out of the upload. `.vercel/` is ignored by Git.

Run CLI commands from the repository root, with Root Directory left at the repository root in the dashboard:

```powershell
npx --yes vercel@65.2.0 login
npx --yes vercel@65.2.0 link
npx --yes vercel@65.2.0 deploy
```

Choose the intended Vercel account/team and project during linking. A Git repository is optional for CLI deployments. In a dashboard import, choose Other, Output Directory `public`, and empty Build/Install Command overrides; the checked-in configuration supplies these values.

Verify the generated preview URL over HTTPS before publishing to production. Once approved, deploy with `npx --yes vercel@65.2.0 deploy --prod`. Custom domains are optional; use the actual Vercel-assigned hostname until one is chosen. No custom hostname or DNS values have been invented.

The invitation retains its existing noindex/robots settings. On a public hostname, the local-only developer theme picker is hidden and the configured public palette is used. Guest-name PNGs are still generated entirely on the guest's device. There are no environment variables or backend services to configure.

Current status: deployed and verified on 24 October 2026. The couple approved production publishing; this update preserves their newer startup and font fixes and adds the measured venue/dance performance work.

- Live URL: https://wedding-invitation-ochre-nu.vercel.app
- Workspace/project: `ali-saleh2/wedding-invitation`.
- Application source commit: `0f1a63cde1562bdcb36ff7ae4a448e0c03c26795`.
- Production deployment: `dpl_8dX7SkFaai4MHBiRavDnF5vgTK58`, status READY.
- Unique deployment URL: https://wedding-invitation-d9ngu9gkp-ali-saleh2.vercel.app
- A separate earlier preview remains at https://wedding-invitation-4t0yohesy-ali-saleh2.vercel.app (Vercel Authentication protected).
- Published through Vercel CLI 65.2.0, explicitly targeting production in the existing workspace. Installed MCP deployment tools were not exposed in this chat.
- Only the 26 public files and `vercel.json` were uploaded. All 26 public files returned HTTP 200 over the production HTTPS alias and exactly matched local source bytes. Font responses retain `public, max-age=31536000, immutable`.
- Changed application URLs use release query `20261024-1`. The public site omits the local developer palette picker.
- Chrome DevTools phone-emulation results and functional checks are recorded in `docs/QA.md`. Temporary profiling probes, Chrome runners, traces and tools were kept outside public/ and were not deployed.
- The Git repository is pushed to GitHub, but automatic Git-to-Vercel deployments have not been connected. Future changes require another CLI deployment unless Git integration is configured.
- Local `.vercel/` and environment files remain ignored and were not uploaded or committed. No custom domain, DNS, authentication, event content or indexing settings changed.

Official references: [Static configuration](https://vercel.com/docs/project-configuration/vercel-json), [.vercelignore](https://vercel.com/docs/deployments/vercel-ignore), and [CLI deployment](https://vercel.com/docs/projects/deploy-from-cli).
