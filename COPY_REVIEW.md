# Copy review for the owner

Everything below needs a yes, a correction or a removal before launch. All facts live in `src/config.ts`; roof-system, process and FAQ copy lives in `src/content/`.

## A. Facts to confirm

| # | Item | Where shown | Source / note |
|---|---|---|---|
| A1 | Founding dates: Rentz Roofing **1936**, renamed Tampa Roofing Company **1950** | Hero H1, timeline, trust strip, JSON-LD | About Us page. **Conflict:** the Our Founders page says 1940 and 1960. Which is correct? |
| A2 | "Same location since 1936" at 1700 East Ellicott Street, Tampa, FL 33610-4918 | Heritage, contact, footer | About Us. The ZIP+4 (-4918) is from the brief; confirm it matches the Google Business Profile |
| A3 | Fourth generation, family-owned | Hero, trust strip, heritage | About Us |
| A4 | Brian Swope, CPRC, President; Keith Swope, CPRC, Vice President | Credentials | **Confirm current roles** |
| A5 | Both are State Certified Roofing Contractors and Certified Professional Roofing Contractors (FRSA) | Credentials, trust strip "CPRC-certified" | **Confirm current** |
| A6 | Brian Swope has served as FRSA president | Credentials | **Confirm wording and that it is fine to state** |
| A7 | Brian Swope has represented the roofing industry on the Florida Building Commission since 2012 | Credentials | **Confirm he still serves**; if not, change to "from 2012 to 20XX" |
| A8 | License: State Certified Roofing Contractor License CCC1329915 | Everywhere | Confirm active status on MyFloridaLicense |
| A9 | Walt Disney World's Main Street USA roof work | Credentials, as text only, "per company history" | **Confirm** we may mention it. No logo or imagery is used |
| A10 | "No subcontractors" / "Our own crews install the roof" | Process step 4 | From a directory listing. **Confirm**; if not true, change to "Our crews..." or remove |
| A11 | Swope & Associates is a sister company with two CPRC and two state certified general contractors; Tampa Roofing covers the inspection cost when it does the detailed work | Maintenance | Maintenance page. Confirm names and current headcount |
| A12 | Free estimates for re-roofs; repairs $250 minimum, credited toward a replacement | Maintenance, FAQ | Maintenance page. Confirm the amount is current |
| A13 | Long-term commercial warranties and maintenance agreements | Maintenance, FAQ | About Us |
| A14 | Careers link points to the 2019 employment application PDF | Footer | Is that form still in use? |

## B. References (testimonials)

The PDFs could not be read from the build environment (network policy blocked tamparoofing.com), so **no quotes are shown**. Each card shows the organization, "Reference letter on file" and a "View original letter (PDF)" link, as the brief specifies for unreadable letters.

To add quotes: open each PDF, choose up to four exact excerpts (30 words max) from institutional letters, and fill `quote` and `signer` in `src/config.ts` exactly as written and signed. The hero then shows the first quote automatically and the References grid switches to a featured layout. Never paraphrase.

Labels to confirm (inferred from file names):

| File | Card label | Context label |
|---|---|---|
| cityoftampa.pdf | City of Tampa | Municipal |
| metropolitan-ministries.pdf | Metropolitan Ministries | Nonprofit |
| sweetbay1.pdf | Sweetbay | Retail |
| tampaheights.pdf | Tampa Heights | Community (**what organization is this?**) |
| shapiro.pdf | Shapiro | Bonding Company (**exact firm name?**) |

The hero line "Reference letters on file from City of Tampa and Metropolitan Ministries, among others" depends on those two letters being genuine references for roofing work.

## C. Draft copy for review (generic, no performance numbers)

- **Roof systems** (`src/content/systems.ts`): the summary, "Often a fit for" line and layer list for Built-Up, Modified, Cold Applied, TPO and Metal. Layer stacks are typical assemblies, labelled "Illustrative, not to scale". Confirm they match how you build each system (for example, whether you install cover boards on TPO, or restore metal with coatings).
- **Maintenance** section: "Scheduled, not reactive", "Protects the warranty", "A record your board can read". These describe what a maintenance agreement typically includes (scheduled inspections, written findings). **Confirm your agreements include written findings and a schedule.**
- **Process** (`src/content/process.ts`): five steps. Confirm you prepare the Notice of Commencement for the owner and that proposals list scope, exclusions and warranty terms.
- **FAQ** (`src/content/faq.ts`): six answers drawn from your Q&A page and policies. The bonding/insurance answer is general advice (your Q&A did not cover it in what we could read); confirm you are comfortable stating that a letter from your bonding company is in the references.
- **Heritage** lines: "Four generations later, the same family still runs it." and "the company that installed the roof is still here to answer for it."
- Section headlines and leads throughout.

## D. Not claimed anywhere (by design)

Free repair estimates, 24/7 or emergency service, star ratings, BBB status, financing, manufacturer certifications or logos, hours, service counties, email address, stock photos presented as your work. Hours, email and service counties are `null` in config and hidden; add verified values to show them.

## E. Directory inconsistency

At least one directory lists **(813) 302-1766**; the site uses **(813) 238-6436** throughout. Confirm which number is correct and fix the other listing (see SEO.md).
