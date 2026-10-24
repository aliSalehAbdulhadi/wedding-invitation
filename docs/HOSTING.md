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

Initial CLI setup used the commands below. Routine updates now deploy automatically from GitHub; push to origin/main and verify the resulting deployment. Keep Root Directory at the repository root in the dashboard:

```powershell
npx --yes vercel@65.2.0 login
npx --yes vercel@65.2.0 link
npx --yes vercel@65.2.0 deploy
```

Choose the intended Vercel account/team and project during linking. A Git repository is optional for CLI deployments. In a dashboard import, choose Other, Output Directory `public`, and empty Build/Install Command overrides; the checked-in configuration supplies these values.

Verify the generated preview URL over HTTPS before publishing to production. Once approved, deploy with `npx --yes vercel@65.2.0 deploy --prod`. Custom domains are optional; use the actual Vercel-assigned hostname until one is chosen. No custom hostname or DNS values have been invented.

The invitation retains its existing noindex/robots settings. On all hosts, the guest theme picker is available; a saved device preference overrides the configured default. Guest-name PNGs are still generated entirely on the guest's device. There are no environment variables or backend services to configure.

Current status: GitHub auto-deployment confirmed on 24 October 2026. The couple connected GitHub and instructed that future releases should use pushes rather than manual CLI deployment.

- Live URL: https://ali-tabarak-wedding-invitation.vercel.app/. The couple reassigned the hostname on 24 October 2026. The retired 20-11 and ochre-nu aliases return DEPLOYMENT_NOT_FOUND.
- Workspace/project: `ali-saleh2/wedding-invitation`, project ID `prj_STZJCePdAqIcWzZH8wykhxG1o2jY`.
- Connected GitHub repository: `aliSalehAbdulhadi/wedding-invitation`, production branch `main`.
- Application source commit: `451a6f60927e26145a59991009a8b0beb553cbd9` (device-aware map/calendar links).
- Automatic Git deployment `dpl_GjLE7M7RE4iSWzmR6qXTf6xKwqRv` reached READY for that commit. A CLI deployment of the same commit had already started before the connection was clarified; it also completed. Do not repeat manual deployments for routine changes.
- Future workflow: verify locally, commit and push to `origin/main`, then inspect the automatic deployment and public URL. A documentation push can trigger deployment too.
- Only public/ is served; there are 33 public files, including the two hosted calendar files. Browser test tooling, downloaded test engines and local artifacts remain outside the repository.
- Arabic and English .ics responses return HTTP 200 with `text/calendar; charset=utf-8`, `Content-Disposition: inline`, and cache revalidation. Explicit file-download links remain available. Git attributes preserve required CRLF bytes on Linux.
- Calendar files come from `node scripts/generate-calendar.mjs`; tests reject files that drift from confirmed event details. No build/install step is introduced.
- The title update uses main/preview release `20261024-4`; unchanged styles and other modules retain their existing release URLs. The Colors studio is available to all visitors; olive is the default for guests without a saved preference.
- No guest-name data is sent, no event is saved automatically, and indexing/noindex settings are preserved. Physical native-app handoff needs final phone checks; browser routing and file delivery are covered in docs/QA.md.
- Local .vercel/ and environment files stay ignored and are not uploaded or committed. No custom domain, DNS, account credentials or project settings were changed by the app-link implementation.

Official references: [Git deployments](https://vercel.com/docs/deployments/git), [Static configuration](https://vercel.com/docs/project-configuration/vercel-json), and [.vercelignore](https://vercel.com/docs/deployments/vercel-ignore).


Sharing metadata is static in index.html for the confirmed ali-tabarak hostname. The active sharing image is assets/images/wedding-ligature.jpg (1730x909, a custom merged-initials mark, about 72KB); it requires no JavaScript or account. robots.txt permits sharing crawlers while retaining general search exclusion and HTML noindex. If the hostname or event facts change, update canonical/Open Graph/Twitter URLs and the social image as well. Native-calendar links open separately so a WebKit file handoff does not cancel future font loads in the invitation. Google calendar links retain a normal direct navigation; explicit file downloads remain available.


Domain migration (24 October 2026): canonical, og:url, Open Graph image URLs and Twitter image URL use https://ali-tabarak-wedding-invitation.vercel.app/. Verified that the new hostname serves the page and JPEG, while the retired hostname returns DEPLOYMENT_NOT_FOUND. GitHub pushes remain the deployment path. WhatsApp may retain a previously fetched preview per URL; actual client preview must be checked after release.


Selected Arabic typography (24 October 2026): the main names use the approved Aref Ruqaa subset. styles.css and fonts.css use release 20261024-5; main JavaScript remains unchanged. The extra font is about 7KB, is self-hosted, and adds no external font request. No comparison sections or Gulzar assets are deployed.
