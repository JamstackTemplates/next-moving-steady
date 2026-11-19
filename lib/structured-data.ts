import { business, buildMetaDescription } from '../content/business.ts';
import { routes } from '../content/routes.ts';
import { startingHourlyRate, trucks, type Truck } from '../content/trucks.ts';
import { absoluteUrl } from './paths.ts';

/** MovingCompany schema derived from business, fleet, office hours and routes. */
export function businessStructuredData(truckList: readonly Truck[] = trucks) {
  const url = absoluteUrl('/');
  const minRate = startingHourlyRate(truckList);
  const maxRate = Math.max(...truckList.filter(t => t.inService).map(t => t.hourlyRate));

  const openingHoursSpecification = business.officeHours
    .filter(entry => entry.opens && entry.closes)
    .map(entry => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: entry.day,
      opens: entry.opens,
      closes: entry.closes,
    }));

  const areaServed = [
    ...business.serviceArea,
    ...routes.map(r => `${r.to}, ${r.state}`),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    name: business.name,
    description: buildMetaDescription(truckList),
    email: business.email,
    telephone: business.phoneE164,
    priceRange: `$${minRate}–$${maxRate}/h AUD`,
    areaServed,
    openingHoursSpecification,
    ...(url ? { url } : {}),
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
