export interface Truck {
  /** Stable URL-safe identifier referenced by home-sizes.ts and fits.ts. */
  id: string;
  /** Display name painted on the cab door. */
  name: string;
  /** Gross vehicle class in tonnes. */
  tonnes: number;
  /** Cargo body length in metres, used to draw the fleet to scale. */
  bodyLengthM: number;
  /** Internal cargo volume in cubic metres. */
  capacityM3: number;
  /** Number of movers included in the hourly rate. */
  crew: number;
  /** Fixed hourly rate in whole AUD including GST (truck + crew). */
  hourlyRate: number;
  /** Minimum billed hours per local move. */
  minimumHours: number;
  /** Short description of typical jobs this truck handles. */
  suits: string;
  /** Set false to take a truck off the road (hides it from the picker). */
  inService: boolean;
}

export const trucks: readonly Truck[] = [
  {
    id: 'dinghy',
    name: 'The Dinghy',
    tonnes: 3,
    bodyLengthM: 3.2,
    capacityM3: 10,
    crew: 2,
    hourlyRate: 139,
    minimumHours: 2,
    suits: 'Studio, single items, storage runs',
    inService: true,
  },
  {
    id: 'sloop',
    name: 'The Sloop',
    tonnes: 4.5,
    bodyLengthM: 4.3,
    capacityM3: 20,
    crew: 2,
    hourlyRate: 159,
    minimumHours: 3,
    suits: '1–2 bedroom units',
    inService: true,
  },
  {
    id: 'schooner',
    name: 'The Schooner',
    tonnes: 6,
    bodyLengthM: 5.8,
    capacityM3: 32,
    crew: 3,
    hourlyRate: 219,
    minimumHours: 3,
    suits: '3 bedroom houses, small offices',
    inService: true,
  },
  {
    id: 'freighter',
    name: 'The Freighter',
    tonnes: 8,
    bodyLengthM: 7.4,
    capacityM3: 45,
    crew: 3,
    hourlyRate: 249,
    minimumHours: 4,
    suits: '4–5 bedroom houses, larger offices',
    inService: true,
  },
];

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateTrucks(list: readonly Truck[] = trucks): void {
  if (list.length === 0) throw new Error('trucks: at least one truck is required');
  const seen = new Set<string>();
  let activeCount = 0;
  for (const truck of list) {
    const label = `trucks[${truck.id || '(missing id)'}]`;
    if (!truck.id || !ID_PATTERN.test(truck.id)) {
      throw new Error(`${label}: id must be URL-safe lowercase letters, digits and hyphens`);
    }
    if (seen.has(truck.id)) throw new Error(`${label}: duplicate truck id`);
    seen.add(truck.id);
    if (!truck.name.trim()) throw new Error(`${label}: name is required`);
    if (!truck.suits.trim()) throw new Error(`${label}: suits description is required`);
    if (!Number.isFinite(truck.tonnes) || truck.tonnes <= 0) throw new Error(`${label}: tonnes must be positive`);
    if (!Number.isFinite(truck.bodyLengthM) || truck.bodyLengthM <= 0) throw new Error(`${label}: bodyLengthM must be positive`);
    if (!Number.isInteger(truck.capacityM3) || truck.capacityM3 <= 0) throw new Error(`${label}: capacityM3 must be a positive integer`);
    if (!Number.isInteger(truck.crew) || truck.crew <= 0) throw new Error(`${label}: crew must be a positive integer`);
    if (!Number.isInteger(truck.hourlyRate) || truck.hourlyRate <= 0) throw new Error(`${label}: hourlyRate must be a positive whole dollar amount`);
    if (!Number.isInteger(truck.minimumHours) || truck.minimumHours <= 0) throw new Error(`${label}: minimumHours must be a positive integer`);
    if (truck.inService) activeCount++;
  }
  if (activeCount === 0) throw new Error('trucks: at least one truck must be inService');
}

/** Cheapest truck currently in service; drives the "from $X" rate across the site. */
export function cheapestInServiceTruck(list: readonly Truck[] = trucks): Truck {
  const active = list.filter(t => t.inService);
  if (active.length === 0) throw new Error('trucks: no in-service trucks available');
  return active.reduce((best, item) => (item.hourlyRate < best.hourlyRate ? item : best));
}

/** Starting hourly rate in AUD derived from the cheapest in-service truck. */
export function startingHourlyRate(list: readonly Truck[] = trucks): number {
  return cheapestInServiceTruck(list).hourlyRate;
}

/** Cheapest in-service truck suited to office moves (3+ crew or >= 30 m³), falling back to cheapest active. */
export function officeStartingRate(list: readonly Truck[] = trucks): number {
  const active = list.filter(t => t.inService);
  const officeReady = active.filter(t => t.capacityM3 >= 30);
  const pool = officeReady.length > 0 ? officeReady : active;
  return cheapestInServiceTruck(pool).hourlyRate;
}

export function truckById(id: string, list: readonly Truck[] = trucks): Truck | undefined {
  return list.find(t => t.id === id);
}
