import { trucks, type Truck } from './trucks.ts';

export interface HomeSize {
  /** Stable URL-safe identifier. */
  id: string;
  /** Human-readable home or office size label shown in the truck picker. */
  label: string;
  /** Groups residential and commercial options in the picker. */
  kind: 'home' | 'office';
  /** Typical estimated load volume in cubic metres. */
  volumeM3: number;
  /** Recommended truck id from content/trucks.ts. */
  truckId: string;
  /** Number of loads required (1 or 2). */
  trips: 1 | 2;
}

export const homeSizes: readonly HomeSize[] = [
  { id: 'studio', label: 'Studio or room share', kind: 'home', volumeM3: 8, truckId: 'dinghy', trips: 1 },
  { id: 'one-bed', label: '1 bedroom unit', kind: 'home', volumeM3: 14, truckId: 'sloop', trips: 1 },
  { id: 'two-bed', label: '2 bedroom unit', kind: 'home', volumeM3: 19, truckId: 'sloop', trips: 1 },
  { id: 'three-bed', label: '3 bedroom house', kind: 'home', volumeM3: 30, truckId: 'schooner', trips: 1 },
  { id: 'four-bed', label: '4 bedroom house', kind: 'home', volumeM3: 42, truckId: 'freighter', trips: 1 },
  { id: 'five-bed', label: '5 bedroom house', kind: 'home', volumeM3: 58, truckId: 'freighter', trips: 2 },
  { id: 'small-office', label: 'Small office (up to 10 desks)', kind: 'office', volumeM3: 24, truckId: 'schooner', trips: 1 },
  { id: 'medium-office', label: 'Office (10–25 desks)', kind: 'office', volumeM3: 44, truckId: 'freighter', trips: 1 },
];

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateHomeSizes(
  sizes: readonly HomeSize[] = homeSizes,
  truckList: readonly Truck[] = trucks,
): void {
  if (sizes.length === 0) throw new Error('home-sizes: at least one size option is required');
  const byId = new Map(truckList.map(t => [t.id, t]));
  const seen = new Set<string>();
  for (const item of sizes) {
    const label = `home-sizes[${item.id || '(missing id)'}]`;
    if (!item.id || !ID_PATTERN.test(item.id)) {
      throw new Error(`${label}: id must be URL-safe lowercase letters, digits and hyphens`);
    }
    if (seen.has(item.id)) throw new Error(`${label}: duplicate home size id`);
    seen.add(item.id);
    if (!item.label.trim()) throw new Error(`${label}: label is required`);
    if (item.kind !== 'home' && item.kind !== 'office') {
      throw new Error(`${label}: kind must be "home" or "office"`);
    }
    if (!Number.isFinite(item.volumeM3) || item.volumeM3 <= 0) {
      throw new Error(`${label}: volumeM3 must be positive`);
    }
    if (item.trips !== 1 && item.trips !== 2) {
      throw new Error(`${label}: trips must be 1 or 2`);
    }
    const truck = byId.get(item.truckId);
    if (!truck) {
      throw new Error(`${label}: truckId "${item.truckId}" does not exist in trucks.ts`);
    }
    if (item.volumeM3 > truck.capacityM3 * item.trips) {
      throw new Error(
        `${label}: volumeM3 (${item.volumeM3}) exceeds ${truck.name} capacity (${truck.capacityM3} × ${item.trips} = ${truck.capacityM3 * item.trips})`,
      );
    }
  }
}

/** Resolve the best in-service truck and trips for a home size (falls back gracefully if preferred truck is off-road). */
export function resolveTruckForSize(
  size: HomeSize,
  truckList: readonly Truck[] = trucks,
): { truck: Truck; trips: number } | undefined {
  const active = truckList.filter(t => t.inService);
  if (active.length === 0) return undefined;
  const preferred = active.find(t => t.id === size.truckId);
  if (preferred) return { truck: preferred, trips: size.trips };
  // Pick smallest active truck that fits in 1 trip, or largest active truck with enough trips.
  const sorted = [...active].sort((a, b) => a.capacityM3 - b.capacityM3);
  const singleTrip = sorted.find(t => t.capacityM3 >= size.volumeM3);
  if (singleTrip) return { truck: singleTrip, trips: 1 };
  const largest = sorted[sorted.length - 1];
  return { truck: largest, trips: Math.ceil(size.volumeM3 / largest.capacityM3) };
}
