export interface SupplyItem {
  /** Stable URL-safe identifier. */
  id: string;
  /** Product name on the depot shelf. */
  name: string;
  /** Dimensions in cm as "L × W × H", or blank when sold as a roll/bag. */
  size: string;
  /** Price in AUD including GST (up to 2 decimal places). */
  price: number;
  /** Selling unit (e.g. "each", "10 kg roll"). */
  unit: string;
  /** Toggle to false to stamp "OUT OF STOCK" tape across the item without removing it. */
  inStock: boolean;
  /** Short practical note for packers. */
  note: string;
  /** Shelf placement: cartons sit on the top shelf, rolls and bags on the lower shelf. */
  shelf: 'carton' | 'roll';
}

export const supplies: readonly SupplyItem[] = [
  {
    id: 'book-carton',
    name: 'Book carton',
    size: '40 × 30 × 30',
    price: 4.5,
    unit: 'each',
    inStock: true,
    note: 'Heavy books, records, pantry tins and tools.',
    shelf: 'carton',
  },
  {
    id: 'standard-carton',
    name: 'Standard carton',
    size: '45 × 40 × 40',
    price: 5.5,
    unit: 'each',
    inStock: true,
    note: 'Everyday kitchenware, ornaments and folded clothes.',
    shelf: 'carton',
  },
  {
    id: 'tea-chest',
    name: 'Tea chest carton',
    size: '60 × 40 × 50',
    price: 7.0,
    unit: 'each',
    inStock: true,
    note: 'Bulky light items: linen, pillows, pots and lampshades.',
    shelf: 'carton',
  },
  {
    id: 'picture-carton',
    name: 'Picture and mirror carton',
    size: '100 × 10 × 75',
    price: 9.0,
    unit: 'each',
    inStock: true,
    note: 'Flat double-wall sleeve for framed art and mirrors.',
    shelf: 'carton',
  },
  {
    id: 'port-a-robe',
    name: 'Port-a-robe (with hanging rail)',
    size: '50 × 50 × 120',
    price: 22.0,
    unit: 'each',
    inStock: true,
    note: 'Move shirts, coats and dresses straight off the wardrobe rail.',
    shelf: 'carton',
  },
  {
    id: 'mattress-bag',
    name: 'Queen mattress bag',
    size: '',
    price: 12.0,
    unit: 'each',
    inStock: false,
    note: 'Heavy-gauge plastic cover against rain and dust.',
    shelf: 'roll',
  },
  {
    id: 'butchers-paper',
    name: "Butcher's paper",
    size: '',
    price: 32.0,
    unit: '10 kg roll',
    inStock: true,
    note: 'Clean unprinted paper — no newsprint ink on plates.',
    shelf: 'roll',
  },
  {
    id: 'bubble-wrap',
    name: 'Bubble wrap',
    size: '',
    price: 29.0,
    unit: '50 m roll',
    inStock: true,
    note: 'Cushioning for glass, electronics and fragile frames.',
    shelf: 'roll',
  },
  {
    id: 'packing-tape',
    name: 'Packing tape',
    size: '',
    price: 4.0,
    unit: '75 m roll',
    inStock: true,
    note: 'High-tack tan tape that sticks in Brisbane humidity.',
    shelf: 'roll',
  },
];

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function formatAud(amount: number): string {
  return Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`;
}

export function validateSupplies(list: readonly SupplyItem[] = supplies): void {
  if (list.length === 0) throw new Error('supplies: at least one supply item is required');
  const seen = new Set<string>();
  for (const item of list) {
    const label = `supplies[${item.id || '(missing id)'}]`;
    if (!item.id || !ID_PATTERN.test(item.id)) {
      throw new Error(`${label}: id must be URL-safe lowercase letters, digits and hyphens`);
    }
    if (seen.has(item.id)) throw new Error(`${label}: duplicate supply id`);
    seen.add(item.id);
    if (!item.name.trim()) throw new Error(`${label}: name is required`);
    if (!item.unit.trim()) throw new Error(`${label}: unit is required`);
    if (!Number.isFinite(item.price) || item.price <= 0) {
      throw new Error(`${label}: price must be a positive number`);
    }
    if (Math.round(item.price * 100) !== item.price * 100) {
      throw new Error(`${label}: price ${item.price} must have at most two decimal places`);
    }
    if (item.shelf !== 'carton' && item.shelf !== 'roll') {
      throw new Error(`${label}: shelf must be "carton" or "roll"`);
    }
  }
}
