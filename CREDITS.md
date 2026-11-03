# Credits

## Photography

None. The build environment's network policy blocked Unsplash and Pexels, so no stock photos were downloaded, and AI-generated images of crews, roofs or projects were ruled out by the brief. The hero uses an original axonometric line drawing of a generic low-slope commercial roof (`src/components/RoofDrawing.astro`), and the roof-system diagrams are original SVG (`src/components/CrossSection.astro`). Neither depicts a real building or a company project.

To add a hero photo later: choose an Unsplash or Pexels image of a large commercial flat roof or the Tampa skyline, save it locally as WebP and AVIF in `public/photos/`, set `object-position` so no faces are cropped, keep the dark gradient so text passes AA, add descriptive alt text, and record it here as:

| File | Photographer | Source URL | License |
|---|---|---|---|

Never caption a stock photo as the company's work.

## Fonts

Self-hosted from npm packages by Fontsource, all under the SIL Open Font License 1.1:

- Barlow and Barlow Condensed, by Jeremy Tribby. `@fontsource/barlow`, `@fontsource/barlow-condensed`.
- Source Serif 4, by Frank Grießhammer for Adobe. `@fontsource/source-serif-4`.

## Icons and marks

Inline SVG icons drawn for this project (`src/components/Icon.astro`). The gable monogram (`src/components/BrandMark.astro`) is a concept mark for this demo only, not the company's logo.

## Libraries

Astro (MIT). QA tooling: Playwright (Apache-2.0), axe-core (MPL-2.0), Lighthouse (Apache-2.0).
