# Voyer Design — konsultasi.voyerdesign.com

Static landing site for Voyer Design ad traffic. Three pages, zero build step —
plain HTML/CSS/JS, so it deploys on Vercel with default settings.

## Structure

```
/
├── index.html          Home (routes to Interior / Arsitektur)
├── interior.html        Interior design landing page
├── arsitektur.html      Architecture / Design & Build landing page
├── css/style.css        Shared design system
├── js/main.js           Mobile nav, FAQ accordion, form handlers
└── assets/
    ├── img/              Logo + project photos (cropped from client IG — see note below)
    └── voyer-brochure.pdf  Placeholder brochure (swap for real one)
```

## Run locally

No build tools needed. Either:
- Open `index.html` directly in a browser, or
- `npx serve .` (or any static server) from the project root for clean relative paths.

## Deploy — GitHub → Vercel

1. `git init && git add . && git commit -m "Voyer lander v1"`
2. Push to a new GitHub repo (e.g. `jongawan/voyer-lander`).
3. In Vercel: **New Project → Import** the repo. Framework preset: **Other** /
   **Static**. No build command, no output directory override needed (root is
   already the static root).
4. Deploy — you'll get a generic `*.vercel.app` URL to test with immediately.
5. Once ready: Vercel project → **Settings → Domains** → add
   `konsultasi.voyerdesign.com`, then add the CNAME record Vercel gives you to
   the voyerdesign.com DNS.

## Before running ads — things to wire up

**1. Lead capture backend (important — forms currently don't send anywhere)**
Both the brochure-download form and the consultation form only work
client-side right now (they show a success message and, for the brochure
form, trigger a local PDF download). Nothing is actually saved or sent.
Wire up `js/main.js` (`brochureForm` and `consultForm` submit handlers) to a
real endpoint — e.g. reuse the Google Sheets Apps Script pattern from the
SMCI Orderflow lander, or a service like Formspree. The `// TODO` comments
mark exactly where to add the `fetch(...)` call.

**2. Real brochure PDF**
`assets/voyer-brochure.pdf` is a placeholder built from IG photos so the
download button works end-to-end today. Replace with a real designed PDF
before launch.

**3. Photos are cropped from Instagram screenshots**
The images in `assets/img/` were cropped from the client's own IG grid
screenshots as placeholders so the site isn't full of gray boxes. Swap in
proper high-res exports from the client's project folders before running
paid traffic — screenshot crops will look soft at large hero sizes on
bigger screens.

**4. Meta Pixel / conversion tracking**
No tracking pixel is installed yet. Add Meta Pixel / Google Ads tag to the
`<head>` of all three pages (and fire a custom conversion event on
`brochureForm` and `consultForm` submit, and on WhatsApp button clicks)
before spending ad budget.

**5. WhatsApp number**
All WA links point to `6282117777290` (from the main site). Confirm this is
the number sales reps are actually monitoring for this campaign.

## Design notes

- Palette matched directly from voyerdesign.com: white/cream background,
  brass-orange accent (`#B0762A`), WhatsApp green (`#25D366`), near-black
  footer (`#181818`) — sampled straight from the client's live site
  screenshots rather than guessed.
- Type system mirrors the real site's hierarchy: Cormorant Garamond serif
  caps for the hero headline and primary CTA button (matches their
  "BUILD YOUR DREAM..." slider text and orange "CONTACT US" button), Poppins
  bold uppercase for section headings and the logo wordmark, Inter for body
  copy, nav, and forms.
- Footer intentionally stays dark while the rest of the site is light —
  matches the real site's actual footer treatment.
- Each page (`index`, `interior`, `arsitektur`) repeats its own header/footer
  markup rather than using includes, to keep this deployable with zero build
  step. If you later move this into Next.js/Astro, header/footer/FAQ-item are
  the first things to componentize.
