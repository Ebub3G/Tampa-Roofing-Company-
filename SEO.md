# SEO: what is built, and the launch checklist

## Built into the demo

- Unique `<title>` and meta description (`src/config.ts` → `site`).
- One H1 ("Commercial roofing in Tampa since 1936"), H2 per section, H3 within. Logical order.
- Canonical `https://tamparoofing.com/`, Open Graph basics, `sitemap.xml`, `robots.txt` with `Allow: /`.
- Demo stays out of search two ways: `<meta name="robots" content="noindex, nofollow">` and an `X-Robots-Tag: noindex, nofollow` header in `vercel.json`. Crawlers and audit tools can still read the page.
- JSON-LD (`src/lib/jsonld.ts`), built only from `src/config.ts` and the visible FAQ:
  - `Organization` with `foundingDate` 1936, address, telephone.
  - `RoofingContractor` with `foundingDate`, address, telephone, `areaServed` Tampa, license credential.
  - `FAQPage` generated from the same array that renders the visible FAQ, so they cannot drift.
- `npm run qa` asserts the JSON-LD phone and address appear in the visible text and that FAQPage matches the visible questions.
- Lighthouse mobile: SEO scores **66 on the demo build by design** (the only failing audit is "Page is blocked from indexing"). A launch build (`SITE_MODE=launch npm run build`) scores **100**.
- No images yet, so no alt text is needed beyond the SVG labels: the roof cross-sections have descriptive `aria-label`s; decorative drawings are `aria-hidden`. Any photo added must have descriptive alt text.

## Launch checklist

1. **Remove noindex.** Build with `SITE_MODE=launch npm run build` (drops the meta tag), and delete the `X-Robots-Tag` header block from `vercel.json`. Keep `robots.txt` as is.
2. **NAP identical to the Google Business Profile.** Name "Tampa Roofing Company, Inc.", "1700 East Ellicott Street, Tampa, FL 33610-4918", "(813) 238-6436". Match punctuation, suite/ZIP+4 and the "Inc." exactly between GBP, the site footer and `src/config.ts`.
3. **Fix the conflicting directory phone number.** At least one directory lists (813) 302-1766 against (813) 238-6436 on the site. Confirm the correct number and update Yelp, BBB listing pages, Blue Book, Manta, YellowPages, Bing Places and Apple Business Connect so every citation matches.
4. **Redirects.** Map old URLs to new ones with 301s, including the misspelled `/commerical/` → `/commercial-roofing/`, and each system page.
5. **Dedicated pages** (the components are route-ready; each section has its own component):
   - `/roof-systems/built-up/`, `/roof-systems/modified/`, `/roof-systems/cold-applied/`, `/roof-systems/tpo/`, `/roof-systems/metal/` (one diagram + owner-approved copy + FAQ each).
   - `/roof-maintenance-agreements/` (what is included, how it protects warranties, how to start).
   - `/roof-inspections/` (Swope & Associates, cost covered when work is awarded).
   - `/references/` with each letter and a text excerpt.
   - `/about/` (history, leadership, credentials) and `/contact/`.
6. **Per page:** unique title and description, one H1, `BreadcrumbList` JSON-LD, internal links between system pages and the maintenance page, sitemap entries with `lastmod`.
7. **Search Console and Bing Webmaster Tools:** verify, submit the sitemap, check coverage after launch.
8. **Photos:** licensed or original project photos, compressed to WebP/AVIF, with descriptive alt text. Only label a photo as a company project if it is one.

## Content plan from the SERP scan

No search volumes are claimed; priorities are based on what ranks and the gaps we saw (see `docs/STRATEGY.md` section 2).

| Priority | Page or article | Target query family | Why |
|---|---|---|---|
| 1 | Roof maintenance agreements | roof maintenance agreement Tampa, commercial roof maintenance Tampa | Few ranking pages explain contents; strongest fit with "budget predictability" |
| 1 | Built-up roofing in Tampa | built-up roofing Tampa, BUR roof repair | Weak competition; matches heritage |
| 1 | TPO roofing in Tampa | TPO roofing Tampa | Competitors rank with thin pages; the layer diagram is a differentiator |
| 2 | Commercial roof inspections | roof inspection Tampa commercial | Results are mostly residential; Swope & Associates offer is distinctive |
| 2 | Flat roof repair: our policy | flat roof repair Tampa | Aggregators dominate with price ranges; the honest $250 policy answers the price question |
| 2 | Modified bitumen, cold applied, metal restoration pages | system + Tampa | Complete the set |
| 3 | Guide: how to check a roofing contractor's license in Florida | verify roofing license Florida | Already in their Q&A; useful to boards and HOAs |
| 3 | Guide: Notice of Commencement for commercial owners | notice of commencement roofing | Same |
| 3 | Guide: manufacturer vs contractor roof warranties | commercial roof warranty | Supports the warranty story |
| 3 | Guide for condo and HOA boards: comparing roofing proposals | HOA roof replacement Tampa | Matches a core audience |
