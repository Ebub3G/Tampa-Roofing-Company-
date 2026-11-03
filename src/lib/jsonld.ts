import { company, site } from '../config';
import { faq } from '../content/faq';

/** Built only from config + the visible FAQ, so it always matches the page. */
export function buildJsonLd() {
  const orgId = `${site.url}/#organization`;
  const address = {
    '@type': 'PostalAddress',
    streetAddress: company.address.street,
    addressLocality: company.address.city,
    addressRegion: company.address.region,
    postalCode: company.address.postalCode,
    addressCountry: company.address.country,
  };
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: company.legalName,
        url: `${site.url}/`,
        foundingDate: String(company.foundingYear),
        telephone: company.phone.display,
        address,
      },
      {
        '@type': 'RoofingContractor',
        '@id': `${site.url}/#business`,
        name: company.legalName,
        url: `${site.url}/`,
        parentOrganization: { '@id': orgId },
        foundingDate: String(company.foundingYear),
        telephone: company.phone.display,
        address,
        areaServed: { '@type': 'City', name: company.areaServed },
        hasCredential: {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'license',
          name: company.license.label,
          recognizedBy: { '@type': 'Organization', name: 'Florida Department of Business and Professional Regulation' },
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${site.url}/#faq`,
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}
