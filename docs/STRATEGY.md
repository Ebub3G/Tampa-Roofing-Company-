# Strategy, IA and design system

Workflow steps 1 to 5 of the brief. Steps 6 to 8 are the code, `COPY_REVIEW.md` and the QA section of the README.

## 1. Discovery

**Access note.** The build environment's network policy blocks `tamparoofing.com` (DNS refused for both direct requests and the fetch tool). Site content was gathered from search-engine snippets of the company's own pages (home, About Us, Our Founders, Commercial, Roof Maintenance and Inspections, Q&A, system pages). The five reference-letter PDFs could not be read at all; see "References" below.

What their current site says (via search snippets):

- 1700 East Ellicott Street, Tampa, FL 33610, (813) 238-6436. "Fourth-generation, family-owned roofing business in the same Tampa location since 1936."
- About Us: Bob Rentz started Rentz Roofing in 1936; son-in-law Morris Swope renamed it Tampa Roofing Company in 1950. Brian Swope (Bob's great-grandson) is President; Keith Swope is Vice President. "Specialize in long-term commercial warranties and maintenance agreements."
- **Conflict:** the Our Founders page gives 1940 for Rentz Roofing and 1960 for the rename. The brief's 1936/1950 is used; flagged in COPY_REVIEW.md.
- Commercial: Built Up, Modified, Cold Applied, TPO, Metal Roof systems, Roof Maintenance. Buildings: warehouses, high-rise offices, shopping centers, executive complexes; Walt Disney World's Main Street USA (self-reported).
- Maintenance and Inspections: free estimates for re-roofs, not repairs; $250 minimum repair charge, credited toward a replacement bought from them; sister company Swope & Associates (two CPRC, two state certified general contractors); Tampa Roofing covers inspection cost when the detailed work goes to them.
- Q&A: roofing license must be State Certified or local roofing license; an occupational license is not a roofing license; check MyFloridaLicense or the building department; Notice of Commencement signed and notarized by owner before a permit; confirm a permit before paying; tile warranties often exclude leaks; standing-seam waterproof warranties come from the installer. The Q&A is written for homeowners and dated (2019 footer).
- The site also has residential pages (shingles, tile, standing seam). This concept is commercial-only per the brief.

**Content gaps on the current site** (for a commercial buyer): no single place that explains the systems side by side; no explanation of what a maintenance agreement includes; testimonials are PDF links with no context; the license number is not prominent; leadership credentials are buried; no project process; Q&A is homeowner-oriented; no clear proposal path; typo in the URL (`/commerical/`).

## 2. SERP and competitor scan

Searches run (standard web search, November 2026): "commercial roofing Tampa", "flat roof repair Tampa", "TPO roofing Tampa", "built-up roofing Tampa", "roof maintenance agreement Tampa", "roof inspection Tampa". No search-volume data was available and none is claimed.

| Query | What ranks | Intent | Gap Tampa Roofing can fill |
|---|---|---|---|
| commercial roofing Tampa | Contractor pages (Baker, Tecta America West Florida, Elite Roofing Services, Acoma, Right Now Roofing), directories (Blue Book, downtobid), press-release syndication | Find and shortlist a contractor | Longevity (1936) and principals' credentials are stronger than most ranking pages; few show a license number up front |
| flat roof repair Tampa | Lead-gen aggregators (Angi, HomeAdvisor, Thumbtack) with cost ranges, thin local pages | Urgent fix, price check | Honest repair policy ($250 minimum, credit toward replacement) answers the price question directly |
| TPO roofing Tampa | Elite Roofing Services TPO page, Modernize, Advanced Roofing blog, Florida Building Commission product approvals | Research a system | A plain-English system page with the layer diagram; none of the ranking pages explain the assembly |
| built-up roofing Tampa | Directory listings, glossary pages, few dedicated local pages | Research a system, often older buildings | Weak competition; a dedicated BUR page from a 1936 company is credible |
| roof maintenance agreement Tampa | Elite Roofing Services (tiered programs), Baker, Tecta, residential roofers | Budget predictability | Explain what the agreement covers and how it protects the warranty; few pages do |
| roof inspection Tampa | Residential 4-point and insurance inspections, aggregators | Mostly residential/insurance | Commercial inspection via Swope & Associates with cost covered when work is awarded is a real differentiator |

Observations: most ranking pages are self-promotional and many lean on "24/7 emergency" and "free inspection" offers this company does not make; the honest policy is a positioning asset, not a weakness. Several ranking pages are syndicated press releases or doorway pages, so a solid, specific site can compete.

## 3. Strategy brief

**Audience and jobs-to-be-done**

| Buyer | Job | Main objections |
|---|---|---|
| Property managers | Keep roofs dry and costs predictable across a portfolio; give owners a defensible recommendation | Budget surprises; contractor responsiveness; disruption to tenants |
| Facility directors | Plan capital replacement; keep operations running | Disruption; warranty terms; who is accountable in five years |
| Condo / HOA boards | Choose a contractor the board can defend to owners | Licensing, insurance and bonding; references; comparing proposals |
| Churches and nonprofits | Spend limited funds once, correctly | Budget; trust; avoiding upsell |
| Municipal and institutional buyers | Qualify vendors; meet procurement rules | Licensing, bonding, references from public bodies |

**Positioning:** the Tampa commercial roofer that has been at the same address since 1936, led by credentialed principals who have served the industry statewide, with plain terms on repairs, warranties and maintenance.

**Proof points (verified in brief):** 1936, four generations, same address; License CCC1329915; two CPRC principals; FRSA and Florida Building Commission service; reference letters from the City of Tampa and Metropolitan Ministries among others; Swope & Associates inspections.

**Objection handling on the page:** budget predictability (maintenance section), warranty (FAQ, maintenance), licensing (license plate, FAQ with MyFloridaLicense), references (letters with original PDFs), disruption (process step 3 and 4), price honesty (repair policy card).

## 4. Information architecture

Single page, one component per section, each section with a stable `id` so it can be lifted into its own route.

```
Header (brand, nav, phone, Request a proposal)          -> every page
Hero: H1 + docked proposal form + reference proof          /
Trust strip
#heritage     Since 1936 timeline                          -> /about
#systems      Roof systems explorer (5 tabs)               -> /roof-systems/{built-up,modified,cold-applied,tpo,metal}
#maintenance  Maintenance, repair policy, inspections      -> /roof-maintenance-agreements, /roof-inspections
#credentials  License, leadership, buildings roofed        -> /about
#references   Reference letters                            -> /references
#process      How a project works                          -> /about or /roof-systems
#faq          FAQ (also FAQPage JSON-LD)                   -> /faq
#proposal     Proposal form + NAP                          -> /contact
Footer: NAP, license, nav, careers, demo line
Mobile: sticky bar Call + Request a proposal
```

Nav labels are nouns the buyer uses ("Roof systems", "Maintenance", "References", "Process", "FAQ"). One primary CTA label everywhere: "Request a proposal". Secondary: "Call (813) 238-6436".

## 5. Design tokens

Source: `src/styles/tokens.css`.

| Token | Value | Use |
|---|---|---|
| `--ink` | #0C1722 | Text on light, dark sections |
| `--steel` | #2E4A5E | Secondary text on light, trust strip |
| `--mist` | #EEF1F3 | Alternate light sections |
| `--paper` | #FAFAF8 | Page background, text on dark |
| `--brass` | #B38A3C | Fills, rules, accents on dark. Never text on light |
| `--on-ink-muted` | #B9C6D1 | Secondary text on ink |
| `--error` | #9B2C1F | Form errors on paper |

Type: Barlow Condensed 600/700 (headings), Barlow 400/500/600 (body), Source Serif 4 italic (timeline captions, pull quotes). Self-hosted from `@fontsource` packages, Latin subset, preloaded, `font-display: optional` (zero layout shift). Body 17px, microcopy 13px minimum, footer demo line 12.5px.

Space: 8px base scale `--s-1`..`--s-9`, fluid section padding. Radius 3 to 4px (engineered, not soft). Motion: 350ms reveal, 180ms UI.

Signature devices: (a) roof cross-section explorer, generated SVG with stepped cut-away layers; (b) "Since 1936" timeline with brass diamond markers; (c) the 6:12 pitch cut (26.57 degrees) on the top-left of the dark systems section, using `clip-path` with rise = run / 2 (kept: it reads well at 390px); (d) axonometric line drawing of a low-slope commercial roof in the hero.

## Design critique summary (passes run on screenshots)

Fixed during review:
- Desktop header wrapped onto two lines at 1440; nav reduced to five items, desktop nav from 1200px, all items `nowrap`.
- H1 broke into four lines; widened measure to 13.5ch (three lines).
- Hero drawing was hidden behind the form; moved down and right so it frames the form.
- License number rendered at body size due to a selector clash; fixed.
- Reference card grid left a large empty feature card when no quotes exist; grid now switches to a 3 + 2 layout without quotes and a featured layout once quotes are added.
- Duplicate document icons on reference cards removed.
- Process step headings misaligned across columns; grid `align-content: start`.
- In-diagram "Illustrative, not to scale" tag collided with the diagram at 390px; hidden on small screens (the text disclaimer under the diagram remains).
- Reveal CSS originally depended on an inline `js` class: if the main script failed, content would stay hidden. The hiding class is now added by the same script that reveals.
- Font swap caused CLS 0.05; replaced with preloaded `font-display: optional`.

Unresolved:
- On phones the hero form sits below the hero copy, not above the fold (the H1 and CTAs fill the first screen). The hero CTA and sticky bar both lead to the proposal form.
- No photography (see CREDITS.md).
