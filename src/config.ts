/**
 * Single source of truth for every company fact shown on the site.
 * Components and JSON-LD read from here; never hard-code phone, address or
 * license anywhere else. A field set to `null` is hidden everywhere.
 *
 * Items marked CONFIRM are listed in COPY_REVIEW.md for the owner.
 */

const LEGACY = 'https://tamparoofing.com';

export const site = {
  /** Canonical origin for launch. The demo itself is served noindex. */
  url: 'https://tamparoofing.com',
  title: 'Commercial Roofing in Tampa Since 1936 | Tampa Roofing Company, Inc.',
  description:
    'Fourth-generation, family-owned commercial roofing contractor in Tampa since 1936. Built-up, modified, cold applied, TPO and metal roofs, plus maintenance agreements and inspections.',
  /** Demo builds are noindex. `SITE_MODE=launch npm run build` drops the meta tag (see SEO.md). */
  isDemo: !(typeof process !== 'undefined' && process.env?.SITE_MODE === 'launch'),
  demoNote: 'Design concept, not the live company website.',
} as const;

export const company = {
  legalName: 'Tampa Roofing Company, Inc.',
  shortName: 'Tampa Roofing Company',
  foundingYear: 1936,
  address: {
    street: '1700 East Ellicott Street',
    city: 'Tampa',
    region: 'FL',
    postalCode: '33610-4918',
    country: 'US',
  },
  phone: {
    display: '(813) 238-6436',
    href: 'tel:+18132386436',
    e164: '+18132386436',
  },
  license: {
    number: 'CCC1329915',
    label: 'State Certified Roofing Contractor License CCC1329915',
    verifyUrl: 'https://www.myfloridalicense.com/',
  },
  areaServed: 'Tampa',
  /** No verified values: hidden everywhere. */
  email: null,
  hours: null,
  serviceCounties: null,
  careersUrl: `${LEGACY}/wp-content/uploads/2019/07/EMPLOYMENT-APPLICATION.pdf`,
  /** CONFIRM: from the company's own directory listing. */
  noSubcontractors: true,
} as const;

export const history = [
  {
    year: '1936',
    title: 'Rentz Roofing',
    caption: 'Bob Rentz starts Rentz Roofing in Tampa.',
  },
  {
    year: '1950',
    title: 'Tampa Roofing Company',
    caption: 'His son-in-law, Morris Swope, renames the business Tampa Roofing Company.',
  },
  {
    year: 'Today',
    title: 'Fourth generation',
    caption: 'Still family-owned, still at the same Tampa address.',
  },
] as const;

/** CONFIRM current roles with the owner before launch. */
export const leadership = [
  {
    name: 'Brian Swope, CPRC',
    role: 'President',
    notes: [
      'State Certified Roofing Contractor',
      'Certified Professional Roofing Contractor (FRSA)',
      'Has served as president of FRSA',
      'Has represented the roofing industry on the Florida Building Commission since 2012',
    ],
  },
  {
    name: 'Keith Swope, CPRC',
    role: 'Vice President',
    notes: [
      'State Certified Roofing Contractor',
      'Certified Professional Roofing Contractor (FRSA)',
    ],
  },
] as const;

export const buildingsRoofed = [
  'Warehouses',
  'High-rise offices',
  'Shopping centers',
  'Executive complexes',
] as const;

/** CONFIRM: text-only, per company history. No logos or imagery. */
export const notableWork = "Per company history, the crew also performed roof work on Walt Disney World's Main Street USA.";

export const policies = {
  freeEstimates: 'Free estimates for re-roofs.',
  repairMinimum: 250,
  repairMinimumNote:
    'Repairs carry a $250 minimum. If the roof is too far gone for a lasting repair, we measure it and quote a replacement, and the repair charge is credited toward that replacement if you go ahead with us.',
} as const;

export const inspections = {
  partner: 'Swope & Associates',
  relation: 'sister company',
  team: 'two Certified Professional Roofing Contractors and two state certified general contractors',
  costNote:
    'When you use Tampa Roofing Company for the detailed work an inspection identifies, Tampa Roofing covers the cost of the inspection.',
} as const;

/**
 * Reference letters hosted on the company's current site.
 * `quote` stays null until the exact text has been extracted from the PDF
 * (the PDFs could not be reached from the build environment). A null quote
 * renders "Reference letter on file". Never write or edit a quote by hand.
 */
export type Reference = {
  org: string;
  context: string;
  pdf: string;
  quote: string | null;
  signer: string | null;
};

export const references: Reference[] = [
  { org: 'City of Tampa', context: 'Municipal', pdf: `${LEGACY}/wp-content/uploads/2019/07/cityoftampa.pdf`, quote: null, signer: null },
  { org: 'Metropolitan Ministries', context: 'Nonprofit', pdf: `${LEGACY}/wp-content/uploads/2019/07/metropolitan-ministries.pdf`, quote: null, signer: null },
  { org: 'Sweetbay', context: 'Retail', pdf: `${LEGACY}/wp-content/uploads/2019/07/sweetbay1.pdf`, quote: null, signer: null },
  { org: 'Tampa Heights', context: 'Community', pdf: `${LEGACY}/wp-content/uploads/2019/07/tampaheights.pdf`, quote: null, signer: null },
  { org: 'Shapiro', context: 'Bonding Company', pdf: `${LEGACY}/wp-content/uploads/2019/07/shapiro.pdf`, quote: null, signer: null },
];

export const cta = {
  primary: 'Request a proposal',
  call: `Call ${company.phone.display}`,
  callShort: 'Call',
} as const;

export const formNeeds = [
  'New roof or re-roof proposal',
  'Repair',
  'Maintenance agreement',
  'Roof inspection',
] as const;

export const nav = [
  { href: '#systems', label: 'Roof systems' },
  { href: '#maintenance', label: 'Maintenance' },
  { href: '#references', label: 'References' },
  { href: '#process', label: 'Process' },
  { href: '#faq', label: 'FAQ' },
] as const;

export const fullAddress = `${company.address.street}, ${company.address.city}, ${company.address.region} ${company.address.postalCode}`;
export const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${company.legalName} ${fullAddress}`)}`;
