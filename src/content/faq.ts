import { company, policies } from '../config';

/**
 * DRAFT FOR OWNER REVIEW. Drawn from the company's own Q&A page and policies.
 * This array feeds both the visible FAQ and the FAQPage JSON-LD, so the two
 * can never drift apart.
 */
export const faq = [
  {
    q: 'How do I check that a roofing contractor is licensed?',
    a: `A roofing contractor in Florida should hold either a State Certified Roofing Contractor license or a local roofing license. An occupational (business tax) license is not a roofing license. Without a roofing license a contractor cannot legally pull a permit or do the job. You can look up any license on MyFloridaLicense.com or call your building department. Ours is ${company.license.label}.`,
  },
  {
    q: 'What should I ask about bonding and insurance?',
    a: 'Ask for a certificate of insurance sent directly from the contractor’s insurance agent, with your organization named as certificate holder, and confirm the coverage dates run through the project. On larger projects, ask whether the contractor can be bonded and who their bonding company is. A letter from our bonding company is in the reference letters above.',
  },
  {
    q: 'What is a Notice of Commencement, and why does it matter?',
    a: 'Before a contractor can buy a permit, the owner signs a Notice of Commencement, and it is notarized and recorded. Contractors usually arrange the notary and filing for you. If work starts without one, that is a warning sign. Before you pay your bill, you can call the building department to confirm a permit was purchased.',
  },
  {
    q: 'What is the difference between a manufacturer warranty and a contractor warranty?',
    a: 'A manufacturer warranty covers the roofing materials under the manufacturer’s terms, and some exclude leaks. A contractor warranty covers the workmanship of the installation. Read what each one covers, what it excludes, and what maintenance it requires. We specialize in long-term commercial warranties and maintenance agreements, and we will walk you through the terms for your system.',
  },
  {
    q: 'Should we repair the roof or replace it?',
    a: `It depends on the condition of the whole roof, not just the leak. If a lasting repair is possible, we repair it. If the roof is too far gone for that, we measure it and quote a replacement, and the repair charge is credited toward the replacement if you go ahead with us. Repairs carry a $${policies.repairMinimum} minimum.`,
  },
  {
    q: 'Are your estimates free?',
    a: `Estimates for re-roofs are free. Repairs are not estimated for free: they carry a $${policies.repairMinimum} minimum, which is credited toward a replacement if one turns out to be needed.`,
  },
];
