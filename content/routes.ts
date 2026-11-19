import { DAYS, type Day } from '../lib/hours.ts';

export interface InterstateRoute {
  /** Stable URL-safe route identifier. */
  id: string;
  /** Destination city name. */
  to: string;
  /** Australian state or territory abbreviation. */
  state: string;
  /** Approximate road distance from Brisbane in kilometres. */
  distanceKm: number;
  /** Typical transit window in days as [min, max]. */
  transitDays: readonly [number, number];
  /** Weekday the shared-load truck departs Brisbane. */
  departs: Day;
  /** Shared-load rate in AUD per cubic metre (inc. GST). */
  sharedPerM3: number;
  /** Minimum billable cubic metres for a shared load. */
  minimumM3: number;
  /** Set false when shared-load departures are paused for the month. */
  running: boolean;
}

export const routes: readonly InterstateRoute[] = [
  {
    id: 'brisbane-sydney',
    to: 'Sydney',
    state: 'NSW',
    distanceKm: 920,
    transitDays: [2, 3],
    departs: 'Monday',
    sharedPerM3: 95,
    minimumM3: 10,
    running: true,
  },
  {
    id: 'brisbane-canberra',
    to: 'Canberra',
    state: 'ACT',
    distanceKm: 1200,
    transitDays: [3, 5],
    departs: 'Tuesday',
    sharedPerM3: 110,
    minimumM3: 10,
    running: true,
  },
  {
    id: 'brisbane-melbourne',
    to: 'Melbourne',
    state: 'VIC',
    distanceKm: 1770,
    transitDays: [4, 6],
    departs: 'Wednesday',
    sharedPerM3: 120,
    minimumM3: 10,
    running: true,
  },
  {
    id: 'brisbane-adelaide',
    to: 'Adelaide',
    state: 'SA',
    distanceKm: 2030,
    transitDays: [5, 7],
    departs: 'Thursday',
    sharedPerM3: 135,
    minimumM3: 10,
    running: true,
  },
  {
    id: 'brisbane-townsville',
    to: 'Townsville',
    state: 'QLD',
    distanceKm: 1340,
    transitDays: [3, 5],
    departs: 'Friday',
    sharedPerM3: 105,
    minimumM3: 10,
    running: true,
  },
];

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateRoutes(list: readonly InterstateRoute[] = routes): void {
  if (list.length === 0) throw new Error('routes: at least one route is required');
  const seen = new Set<string>();
  for (const r of list) {
    const label = `routes[${r.id || '(missing id)'}]`;
    if (!r.id || !ID_PATTERN.test(r.id)) {
      throw new Error(`${label}: id must be URL-safe lowercase letters, digits and hyphens`);
    }
    if (seen.has(r.id)) throw new Error(`${label}: duplicate route id`);
    seen.add(r.id);
    if (!r.to.trim()) throw new Error(`${label}: destination city is required`);
    if (!r.state.trim()) throw new Error(`${label}: state is required`);
    if (!Number.isInteger(r.distanceKm) || r.distanceKm <= 0) {
      throw new Error(`${label}: distanceKm must be a positive integer`);
    }
    const [min, max] = r.transitDays;
    if (!Number.isInteger(min) || !Number.isInteger(max) || min <= 0 || min > max) {
      throw new Error(`${label}: transitDays must be positive integers with min <= max`);
    }
    if (!DAYS.includes(r.departs)) {
      throw new Error(`${label}: departs "${r.departs}" must be a valid weekday`);
    }
    if (!Number.isFinite(r.sharedPerM3) || r.sharedPerM3 <= 0) {
      throw new Error(`${label}: sharedPerM3 must be a positive price`);
    }
    if (!Number.isInteger(r.minimumM3) || r.minimumM3 <= 0) {
      throw new Error(`${label}: minimumM3 must be a positive integer`);
    }
  }
}

export function cheapestInterstateRate(list: readonly InterstateRoute[] = routes): number {
  const active = list.filter(r => r.running);
  const pool = active.length > 0 ? active : list;
  return pool.reduce((min, r) => (r.sharedPerM3 < min ? r.sharedPerM3 : min), pool[0].sharedPerM3);
}
