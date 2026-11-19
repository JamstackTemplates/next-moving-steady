import { cheapestInterstateRate, routes, type InterstateRoute } from './routes.ts';
import { officeStartingRate, startingHourlyRate, trucks, type Truck } from './trucks.ts';

export interface MoveType {
  /** Stable URL-safe identifier. */
  id: string;
  /** Display name. */
  name: string;
  /** One-line summary. */
  summary: string;
  /** Bullet list of what is included. */
  includes: readonly string[];
  /** Starting price in AUD, derived from trucks/routes/packing rates. */
  priceFrom: number;
  /** Display unit such as "/h" or "/m³". */
  priceUnit: string;
  /** Target route or anchor. */
  href: string;
}

export interface PackingService {
  /** Stable URL-safe identifier. */
  id: string;
  /** Service name. */
  name: string;
  /** Short description. */
  summary: string;
  /** Rate in AUD (inc. GST). */
  rate: number;
  /** Billing unit. */
  unit: 'per packer per hour' | 'from';
  /** What the packing crew brings and does. */
  includes: readonly string[];
}

export interface ExtraFee {
  /** Stable URL-safe identifier. */
  id: string;
  /** Fee or surcharge name. */
  name: string;
  /** Price in AUD, or null when quoted per job / billed at hourly rate. */
  price: number | null;
  /** Pricing unit or label. */
  unit: string;
  /** Plain-English note. */
  note: string;
}

export const packingServices: readonly PackingService[] = [
  {
    id: 'full-pack',
    name: 'Full pack',
    summary: 'Every room packed, labelled and listed the day before you move.',
    rate: 69,
    unit: 'per packer per hour',
    includes: [
      'Two-person crew for most 2–4 bedroom homes',
      'Room-by-room carton labels on two sides',
      'Cartons and paper billed only for what we use',
    ],
  },
  {
    id: 'kitchen-fragile',
    name: 'Kitchen and fragile pack',
    summary: 'Crockery, glassware, artwork and mirrors wrapped properly.',
    rate: 69,
    unit: 'per packer per hour',
    includes: [
      'Double-wrapped glasses and plates stood on edge',
      'Picture cartons for framed art and mirrors',
      'Clear FRAGILE markings so the load crew stacks them right',
    ],
  },
  {
    id: 'part-pack',
    name: 'Part pack',
    summary: 'You do the books and linen, we handle the rest.',
    rate: 69,
    unit: 'per packer per hour',
    includes: [
      'Targeted help for the rooms you run out of time for',
      'Wardrobe port-a-robes for hanging clothes',
      'Packed in the order that makes unloading fastest',
    ],
  },
  {
    id: 'unpack',
    name: 'Unpack and set up',
    summary: 'Unpack to benches and shelves, flatten and remove cartons.',
    rate: 65,
    unit: 'per packer per hour',
    includes: [
      'Kitchen, pantry and bedrooms unpacked on move day or the morning after',
      'All used cartons flattened and taken away for reuse',
      'Packing paper bundled and cleared out',
    ],
  },
];

export function cheapestPackingRate(list: readonly PackingService[] = packingServices): number {
  return list.reduce((min, item) => (item.rate < min ? item.rate : min), list[0].rate);
}

/** Build move types with derived starting prices so truck/route edits flow everywhere. */
export function getMoveTypes(
  truckList: readonly Truck[] = trucks,
  routeList: readonly InterstateRoute[] = routes,
  packingList: readonly PackingService[] = packingServices,
): readonly MoveType[] {
  return [
    {
      id: 'home',
      name: 'Home moves',
      summary: 'Local moves across South East Queensland.',
      includes: [
        'Two or three trained movers',
        'Heavy-duty quilted furniture blankets and shrink wrap',
        'Trolleys, dollies, straps and loading ramps',
        'Bed and table dismantling and reassembly',
      ],
      priceFrom: startingHourlyRate(truckList),
      priceUnit: '/h',
      href: '/moves/#home',
    },
    {
      id: 'office',
      name: 'Office moves',
      summary: 'After hours or weekends, so Monday starts at the new desk.',
      includes: [
        'IT crate hire (first 20 crates free for a week)',
        'Labelled floor plans so desks and monitors land in the right bay',
        'Workstation dismantling and reassembly',
        'After-hours and Saturday crews with lift-booking coordination',
      ],
      priceFrom: officeStartingRate(truckList),
      priceUnit: '/h',
      href: '/moves/#office',
    },
    {
      id: 'interstate',
      name: 'Interstate',
      summary: 'Weekly shared loads down the east coast.',
      includes: [
        'Padded shared-load truck departing Brisbane every week',
        'Itemised consignment note at pickup and delivery',
        'Delivery inside the agreed transit window',
        'Dedicated truck option on request for full households',
      ],
      priceFrom: cheapestInterstateRate(routeList),
      priceUnit: '/m³',
      href: '/moves/#interstate',
    },
    {
      id: 'packing',
      name: 'Packing',
      summary: 'A packing crew the day before, or just the boxes.',
      includes: [
        'Full, part, or kitchen-and-fragile packing crews',
        'Unpack-and-remove service after the truck leaves',
        'Double-walled cartons, tape, paper and port-a-robes',
        'Delivered ahead of move day or brought on the truck',
      ],
      priceFrom: cheapestPackingRate(packingList),
      priceUnit: '/h',
      href: '/packing/',
    },
  ];
}

export const moveTypes: readonly MoveType[] = getMoveTypes();

export const extrasAndFees: readonly ExtraFee[] = [
  {
    id: 'travel-fee',
    name: 'Travel fee (depot to first address and back)',
    price: 70,
    unit: 'flat',
    note: 'Covers Greater Brisbane; quoted for outer areas.',
  },
  {
    id: 'stairs',
    name: 'Stairs past the first flight',
    price: 40,
    unit: 'per flight, per move',
    note: 'First flight is included at no extra charge.',
  },
  {
    id: 'piano-upright',
    name: 'Upright piano',
    price: 180,
    unit: 'per move',
    note: 'Includes piano trolley, ramp and extra strapping.',
  },
  {
    id: 'pool-table',
    name: 'Pool table',
    price: null,
    unit: 'quote only',
    note: 'Slate size and stair access decide crew and timing.',
  },
  {
    id: 'storage-run',
    name: 'Storage unit drop-off on the way',
    price: null,
    unit: 'hourly rate',
    note: 'Billed at the hourly rate, no extra fee.',
  },
];

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateServices(): void {
  const checkIds = (label: string, items: readonly { id: string; name: string }[]) => {
    const seen = new Set<string>();
    for (const item of items) {
      const ref = `${label}[${item.id || '(missing id)'}]`;
      if (!item.id || !ID_PATTERN.test(item.id)) throw new Error(`${ref}: invalid id`);
      if (seen.has(item.id)) throw new Error(`${ref}: duplicate id`);
      seen.add(item.id);
      if (!item.name.trim()) throw new Error(`${ref}: name is required`);
    }
  };

  const derived = getMoveTypes();
  checkIds('moveTypes', derived);
  for (const m of derived) {
    if (!Number.isFinite(m.priceFrom) || m.priceFrom <= 0) {
      throw new Error(`moveTypes[${m.id}]: priceFrom must be positive`);
    }
    if (m.includes.length === 0) throw new Error(`moveTypes[${m.id}]: includes must not be empty`);
  }

  checkIds('packingServices', packingServices);
  for (const p of packingServices) {
    if (!Number.isFinite(p.rate) || p.rate <= 0) {
      throw new Error(`packingServices[${p.id}]: rate must be positive`);
    }
    if (p.includes.length === 0) throw new Error(`packingServices[${p.id}]: includes must not be empty`);
  }

  checkIds('extrasAndFees', extrasAndFees);
  for (const e of extrasAndFees) {
    if (e.price !== null && (!Number.isFinite(e.price) || e.price <= 0)) {
      throw new Error(`extrasAndFees[${e.id}]: price must be positive or null`);
    }
    if (!e.unit.trim()) throw new Error(`extrasAndFees[${e.id}]: unit is required`);
  }
}
