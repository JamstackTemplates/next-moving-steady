import { trucks, type Truck } from './trucks.ts';

export interface TruckFits {
  /** Truck id from content/trucks.ts. */
  truckId: string;
  /** Approximate number of sofas. */
  sofas: number;
  /** Approximate number of beds. */
  beds: number;
  /** Approximate number of fridges. */
  fridges: number;
  /** Approximate number of standard cartons. */
  cartons: number;
}

export const truckFits: readonly TruckFits[] = [
  { truckId: 'dinghy', sofas: 1, beds: 1, fridges: 1, cartons: 25 },
  { truckId: 'sloop', sofas: 2, beds: 2, fridges: 1, cartons: 50 },
  { truckId: 'schooner', sofas: 3, beds: 3, fridges: 2, cartons: 90 },
  { truckId: 'freighter', sofas: 4, beds: 5, fridges: 2, cartons: 130 },
];

export function validateFits(
  rows: readonly TruckFits[] = truckFits,
  truckList: readonly Truck[] = trucks,
): void {
  const byId = new Map(truckList.map(t => [t.id, t]));
  const seen = new Set<string>();
  for (const row of rows) {
    const label = `fits[${row.truckId || '(missing truckId)'}]`;
    if (!byId.has(row.truckId)) {
      throw new Error(`${label}: truckId "${row.truckId}" does not exist in trucks.ts`);
    }
    if (seen.has(row.truckId)) {
      throw new Error(`${label}: duplicate truckId row`);
    }
    seen.add(row.truckId);
    for (const key of ['sofas', 'beds', 'fridges', 'cartons'] as const) {
      if (!Number.isInteger(row[key]) || row[key] < 0) {
        throw new Error(`${label}.${key}: must be a non-negative integer`);
      }
    }
  }
  for (const truck of truckList) {
    if (truck.inService && !seen.has(truck.id)) {
      throw new Error(`fits[${truck.id}]: missing "What fits" row for in-service truck ${truck.name}`);
    }
  }
}
