import type { OpeningHours } from '../lib/hours.ts';
import { startingHourlyRate, trucks, type Truck } from './trucks.ts';

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short headline for the home page. */
  tagline: string;
  /** Plain-text introduction used by fallback metadata. */
  introduction: string;
  /** Public contact email, always visible on Contact and in the footer. */
  email: string;
  /** Public display phone number. */
  phone: string;
  /** Public phone number in E.164 format for tel: links and structured data. */
  phoneE164: string;
  /** Regions served locally out of Brisbane. */
  serviceArea: readonly string[];
  /** Human-readable service area summary. */
  serviceAreaSummary: string;
  /** Office phone hours (not moving hours). Same-day intervals in Australia/Brisbane. */
  officeHours: readonly OpeningHours[];
  /** Neutral summary of office hours shown before JS hydration and in print. */
  officeHoursSummary: string;
  /** Days trucks run local moves. */
  movingDays: string;
  /** Currency code. */
  currency: 'AUD';
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** Plain-English enquiry introduction. */
    introduction: string;
    /** Enquiry wording disclaimer shown under the form. */
    disclaimer: string;
    /** Suggestions for the message, not additional form inputs. */
    usefulToInclude: readonly string[];
  };
}

/** Build the site meta description with the current cheapest in-service truck rate. */
export function buildMetaDescription(truckList: readonly Truck[] = trucks): string {
  const rate = startingHourlyRate(truckList);
  return `Brisbane removalists for home, office and interstate moves. Fixed hourly rates from $${rate}, packing services, a truck size guide and a free moving checklist.`;
}

export const business: Business = {
  name: 'Deckhand Removals',
  tagline: 'Big move? Steady hands.',
  introduction: buildMetaDescription(),
  email: 'moves@deckhandremovals.example',
  phone: '(07) 5550 2614',
  phoneE164: '+61755502614',
  serviceArea: [
    'Greater Brisbane',
    'Moreton Bay',
    'Ipswich',
    'Logan',
    'Redlands',
    'Gold Coast',
    'Sunshine Coast',
  ],
  serviceAreaSummary:
    'Greater Brisbane, Moreton Bay, Ipswich, Logan, Redlands, Gold Coast and Sunshine Coast, plus weekly east-coast interstate runs.',
  officeHours: [
    { day: 'Monday', opens: '07:00', closes: '17:30' },
    { day: 'Tuesday', opens: '07:00', closes: '17:30' },
    { day: 'Wednesday', opens: '07:00', closes: '17:30' },
    { day: 'Thursday', opens: '07:00', closes: '17:30' },
    { day: 'Friday', opens: '07:00', closes: '17:30' },
    { day: 'Saturday', opens: '08:00', closes: '12:00' },
    { day: 'Sunday' },
  ],
  officeHoursSummary: 'Mon–Fri 07:00–17:30, Sat 08:00–12:00, Sun closed (AEST)',
  movingDays: 'Moves run Mon–Sat.',
  currency: 'AUD',
  enquiries: {
    title: 'Request a moving quote',
    introduction:
      'Tell us what is moving, where it is going and when you would like to go. Our Brisbane office replies by email or phone during office hours.',
    disclaimer:
      'Sending this form is an enquiry. Your date and price are confirmed only when our office replies with a written quote.',
    usefulToInclude: [
      'Preferred move date, or a date range',
      'Suburb moving from and suburb (or city) moving to',
      'Home size or number of rooms, or desks for an office',
      'Stairs, lifts or tricky access at either end',
      'Large or awkward items: piano, pool table, fridge, gym equipment',
      "Whether you'd like packing help or boxes",
      "A phone number, if you'd like a call back",
    ],
  },
};
