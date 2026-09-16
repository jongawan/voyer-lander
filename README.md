# Voyer Design — arsitektur.voyerdesign.com

Single-page landing site for Voyer Design's architecture / Design & Build ad
traffic. Zero build step — plain HTML/CSS/JS, deploys on Vercel with default
settings.

> This started as a 3-page site (home, interior, arsitektur). Interior and
> the multi-page home were retired to focus ad spend on one arsitektur
> one-pager. Their content is fully recoverable from git history — see
> commit `e88d197` onward, before the consolidation commit that removed them.

## Structure

```
/
├── index.html          The one-pager (arsitektur / Design & Build landing page)
├── css/style.css        Design system
├── js/main.js           Mobile nav, FAQ accordion, consultation form → WhatsApp
└── assets/
    ├── img/              Logo + real project photos
    └── videos/           Compressed project walkthrough + testimonial videos
```

## Run locally

No build tools needed. Either:
- Open `index.html` directly in a browser, or
- `npx serve .` (or any static server) from the project root for clean relative paths.
  Note: video playback needs a server that supports HTTP Range requests
  (`npx serve` does; Python's `http.server` does not).

## Deploy — GitHub → Vercel

1. Push to the GitHub repo.
2. In Vercel: **New Project → Import** the repo. Framework preset: **Other** /
   **Static**. No build command, no output directory override needed (root is
   already the static root).
3. Deploy — you'll get a generic `*.vercel.app` URL to test with immediately.
4. Once ready: Vercel project → **Settings → Domains** → add
   `arsitektur.voyerdesign.com`, then add the CNAME record Vercel gives you to
   the voyerdesign.com DNS.

## Before running ads — things to wire up

**1. Lead flow is WhatsApp-only by design**
There's no backend and no lead magnet — the consultation form
(`#consult-form` in `js/main.js`) reads whatever fields are filled in,
formats them into a message, and opens `wa.me` in a new tab with the text
pre-filled. The visitor still has to hit "send" in WhatsApp. Nothing is
stored server-side; if you want captured leads persisted somewhere (Sheets,
CRM, etc.) that needs to be added separately.

**2. Meta Pixel / conversion tracking**
No tracking pixel is installed yet. Add Meta Pixel / Google Ads tag to the
`<head>` (and fire a custom conversion event on `consultForm` submit) before
spending ad budget.

**3. WhatsApp number**
All WA links point to `6282117777290`. Confirm this is the number sales reps
are actually monitoring for this campaign.

## Design notes

- Palette matched directly from voyerdesign.com: white/cream background,
  brass-orange accent (`#B0762A`), near-black footer (`#181818`).
- Type system: Cormorant Garamond serif caps for headline/CTA moments,
  Poppins bold uppercase for section headings, Inter for body/UI.
- Hero pattern (full-bleed image + dark trust band with stat cards) mimics
  jasaarsitek.com's structure, adapted to Voyer's palette and real numbers.
- All project photos/videos in `assets/` are real Voyer projects (Bintaro,
  Pantai Mutiara, Camar Indah 6 PIK, Cibubur, Kelapa Gading, Modernland,
  Pulomas), not stock/placeholder images.
