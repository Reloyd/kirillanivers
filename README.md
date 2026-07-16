# Anniversary site — for Malak

A small, private gift site. Vite + React + TypeScript + Tailwind CSS + Framer Motion.

## For Kirill: editing content

Everything you'll ever want to change — text, dates, photos, songs, reasons — lives
in one file: **`src/content.ts`**. You never need to touch anything else.

See **`README-edit.md`** for a step-by-step guide in Russian, written for editing
directly on GitHub's website (no terminal, no code).

## Local development

```bash
npm install
npm run dev       # starts a local server at http://localhost:5173
npm run build      # builds to dist/ for production
npm run preview    # preview the production build locally
```

Note: this project was scaffolded without running `npm install` / a build in this
session (no local toolchain was available). Before deploying, run `npm install`
and `npm run build` once yourself (or let the GitHub Action do it) and fix any
type errors that surface — the code was written carefully but hasn't been
compiled yet.

## Project structure

```
src/
  content.ts              ← all editable content (see README-edit.md)
  App.tsx                 ← page shell: envelope intro, gate countdown, section order
  components/              shared UI (Nav, Envelope, Polaroid, YouTube embed, ...)
  components/sections/     one file per section of the page
  hooks/                   live counter, countdown, random reason picker
  utils/date.ts            date math helpers
public/
  img/                     put your photos here, reference them from content.ts
  robots.txt                disallows all crawlers (site stays unindexed)
.github/workflows/deploy.yml   auto-builds + rsyncs dist/ to your VPS on push to main
deploy/nginx.conf.example      example nginx config for serving the static build
```

## Deployment (GitHub Actions → your VPS)

1. Push this repo to GitHub.
2. On your VPS: create a deploy user, an authorized SSH key for it, and a target
   directory (e.g. `/var/www/anniversary-site`) that nginx serves — see
   `deploy/nginx.conf.example`.
3. In the GitHub repo, add these secrets (Settings → Secrets and variables → Actions):
   - `SSH_PRIVATE_KEY` — the private key matching the authorized key on the VPS
   - `VPS_HOST` — server IP or hostname
   - `VPS_USER` — the deploy SSH user
   - `VPS_PATH` — the directory nginx serves, e.g. `/var/www/anniversary-site`
4. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and
   rsyncs `dist/` to the server automatically, in about 1–2 minutes.

If you'd rather not manage a VPS, `dist/` also deploys as-is to Netlify or Vercel
(drag-and-drop or connect the repo) — no code changes needed.

## The reveal gate

`content.meta.reveal.enabled` is `false` by default, so the site opens straight
to the envelope. Flip it to `true` and it will show a countdown to
`content.meta.reveal.at` instead, unlocking itself automatically once that
moment passes.
