# Tampa Roofing Company: design concept

A working design concept for Tampa Roofing Company, Inc., a commercial roofing contractor in Tampa since 1936. Built to be shown to the owner as a demo. **Design concept, not the live company website.** The demo is served `noindex` and its forms send nothing.

Direction: "Engineered heritage": ink, steel and brass; Barlow Condensed and Barlow; a roof cross-section explorer and a "Since 1936" timeline as the signature devices.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npm run preview    # serve dist/
```

Node 18.20+ (built on Node 22). Static output, deployable to Vercel as is (`vercel.json` sets the `X-Robots-Tag: noindex` header).

## Where things live

| Path | What |
|---|---|
| `src/config.ts` | **Single source of truth** for every company fact: name, address, phone, license, history, leadership, policies, references, CTA labels. A `null` field is hidden everywhere |
| `src/content/` | Draft copy for owner review: roof systems, process, FAQ |
| `src/components/` | One component per section, route-ready |
| `src/lib/jsonld.ts` | Organization + RoofingContractor + FAQPage JSON-LD, generated from config and the visible FAQ |
| `src/styles/tokens.css` | Design tokens |
| `src/scripts/site.ts` | Progressive enhancement: menu, tabs, demo form, reveals |
| `scripts/qa.mjs` | Playwright screenshots, fast-scroll test, axe-core, keyboard and content checks |
| `scripts/lighthouse.mjs` | Lighthouse mobile run |
| `docs/STRATEGY.md` | Discovery, SERP scan, strategy brief, IA, tokens, design-critique log |
| `COPY_REVIEW.md` | Everything the owner must confirm |
| `SEO.md` | What is built and the launch checklist |
| `CREDITS.md` | Fonts, icons, (no) photos |

## QA

```bash
npm run build && npm run qa          # writes qa/out/*.png and results.json
npm run build && npm run lighthouse  # writes qa/out/lighthouse.json
```

`npm run qa` uses the Playwright that is installed globally in the build environment (`require('playwright')`); elsewhere run `npm i -D playwright` first.

Latest results (all 29 QA checks pass):

| Check | Result |
|---|---|
| Screenshots at 390, 768, 1440, 1920, no horizontal overflow | Pass |
| Fast-scroll test (900px jumps every ~60ms, plus jump to bottom and back): no section ever below full opacity once in view | Pass |
| axe-core WCAG 2.1 A/AA + best practice, at 390 and 1440, every system tab visited | 0 violations, 0 color-contrast failures |
| Keyboard: skip link first; menu opens with focus inside, traps focus, locks scroll, Escape closes and returns focus, all targets 48px+; tabs move with arrows/Home/End with `aria-selected`; form validates, focuses the first error, success state keeps the form height | Pass |
| Sticky mobile bar: Call + Request a proposal on one line | Pass |
| Reduced motion: nothing hidden; no-JS: all five system panels readable | Pass |
| JSON-LD NAP matches visible NAP; FAQPage matches visible FAQ; one H1; CTA labels limited to "Request a proposal" / "Call (813) 238-6436" / "Call"; no forbidden claims | Pass |
| Lighthouse mobile, demo build | Performance 99 to 100, Accessibility 100, Best Practices 100, **SEO 66** |
| Lighthouse mobile, launch build (`SITE_MODE=launch`) | 100 / 100 / 100 / 100 |
| Cumulative Layout Shift | 0 |

The demo's SEO score is capped at 66 because Lighthouse fails any page marked `noindex`, which the brief requires. The launch build shows the score with that one setting flipped.

Reveal animations: content is visible without JS. The script hides only below-the-fold elements, reveals them with IntersectionObserver (`rootMargin: 0px 0px -8% 0px`, 12px rise, opacity, 350ms, once), instantly shows anything scrolled past, force-shows everything still hidden after 1.2s, and does nothing under `prefers-reduced-motion`.

## Known limits

- **tamparoofing.com could not be fetched** from the build environment (network policy). Site facts came from search snippets of their pages; the five reference-letter PDFs were unreadable, so the References section shows "Reference letter on file" with links and no quotes. See COPY_REVIEW.md section B to add verified quotes.
- **No photos**: Unsplash and Pexels were also blocked. The hero uses an original line drawing. See CREDITS.md to add one.
- On phones the hero form sits below the headline and CTAs; the hero CTA and sticky bar link to the proposal form.
- No dark mode: the page already alternates dark and light sections by design.

## Demo script

Test data for the form: **Michael Smith, (813) 555-0142**. The form is never prefilled.
