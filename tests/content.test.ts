import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { buildMetaDescription, business } from '../content/business.ts';
import { checklistGroups, checklistTasks, validateChecklist } from '../content/checklist.ts';
import { truckFits, validateFits } from '../content/fits.ts';
import { homeSizes, validateHomeSizes } from '../content/home-sizes.ts';
import { routes, validateRoutes } from '../content/routes.ts';
import { getMoveTypes, validateServices } from '../content/services.ts';
import { supplies, validateSupplies } from '../content/supplies.ts';
import { startingHourlyRate, trucks, validateTrucks } from '../content/trucks.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

test('business content has actionable required fields', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'phone', 'phoneE164'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.disclaimer.trim(), 'business.enquiries.disclaimer: required');
  assert.ok(business.enquiries.usefulToInclude.length >= 5, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) {
    assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
  }
});

test('all core collections pass validation and report item-specific errors', () => {
  assert.doesNotThrow(() => validateTrucks());
  assert.doesNotThrow(() => validateHomeSizes());
  assert.doesNotThrow(() => validateFits());
  assert.doesNotThrow(() => validateRoutes());
  assert.doesNotThrow(() => validateServices());
  assert.doesNotThrow(() => validateSupplies());
  assert.doesNotThrow(() => validateChecklist());

  // Duplicate truck ID names the item
  assert.throws(
    () => validateTrucks([...trucks, { ...trucks[0] }]),
    /trucks\[dinghy\].*duplicate/i,
  );

  // Unknown truckId in home-sizes names the item
  assert.throws(
    () => validateHomeSizes([...homeSizes.slice(0, 1), { ...homeSizes[1], truckId: 'yacht' }], trucks),
    /home-sizes\[one-bed\].*yacht/,
  );

  // Exceeding volumeM3 > capacityM3 * trips names the item
  assert.throws(
    () => validateHomeSizes([{ ...homeSizes[0], volumeM3: 99, trips: 1 }], trucks),
    /home-sizes\[studio\].*exceeds/,
  );

  // Missing in-service truck in fits.ts names the truck
  assert.throws(
    () => validateFits(truckFits.filter(r => r.truckId !== 'sloop'), trucks),
    /fits\[sloop\]/,
  );

  // Invalid route transitDays min > max and invalid weekday name the route
  assert.throws(
    () => validateRoutes([{ ...routes[0], transitDays: [5, 2] }]),
    /routes\[brisbane-sydney\].*transitDays/,
  );
  assert.throws(
    () => validateRoutes([{ ...routes[0], departs: 'Funday' as never }]),
    /routes\[brisbane-sydney\].*Funday/,
  );

  // Supplies price with > 2 decimals or duplicate ID names the item
  assert.throws(
    () => validateSupplies([{ ...supplies[0], price: 4.555 }]),
    /supplies\[book-carton\].*two decimal/,
  );
  assert.throws(
    () => validateSupplies([...supplies, { ...supplies[0] }]),
    /supplies\[book-carton\].*duplicate/,
  );

  // Checklist duplicate task ID or invalid groupId names the task
  assert.throws(
    () => validateChecklist(checklistGroups, [...checklistTasks, { ...checklistTasks[0] }]),
    /checklist\.tasks\[book-removalist\].*duplicate/,
  );
  assert.throws(
    () => validateChecklist(checklistGroups, [{ ...checklistTasks[0], groupId: 'next-year' }]),
    /checklist\.tasks\[book-removalist\].*next-year/,
  );
});

test('starting hourly rate derives from cheapest in-service truck everywhere', () => {
  assert.equal(startingHourlyRate(trucks), 139);
  assert.match(buildMetaDescription(trucks), /from \$139/);

  const withoutDinghy = trucks.map(t => (t.id === 'dinghy' ? { ...t, inService: false } : t));
  assert.equal(startingHourlyRate(withoutDinghy), 159);
  assert.match(buildMetaDescription(withoutDinghy), /from \$159/);

  const derivedMoves = getMoveTypes(withoutDinghy);
  const homeMove = derivedMoves.find(m => m.id === 'home')!;
  assert.equal(homeMove.priceFrom, 159);

  const schema = businessStructuredData(withoutDinghy);
  assert.match(schema.priceRange, /^\$159–/);
  assert.match(schema.description, /from \$159/);
});

test('structured data is MovingCompany with derived fields and safe JSON-LD escaping', () => {
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'MovingCompany');
  assert.equal(schema.email, business.email);
  assert.equal(schema.telephone, business.phoneE164);
  assert.ok(Array.isArray(schema.areaServed) && schema.areaServed.includes('Greater Brisbane'));
  assert.ok(Array.isArray(schema.openingHoursSpecification) && schema.openingHoursSpecification.length === 6);

  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});

test('pages and content use enquiry wording without forbidden booking/order terms', () => {
  const forbidden = /\b(book now|confirmed booking|order now|reserve)\b/i;
  const dirs = ['app', 'components', 'content'];
  const collect = (dir: string): string[] => {
    const entries: string[] = [];
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) entries.push(...collect(full));
      else if (/\.(ts|tsx)$/.test(name)) entries.push(full);
    }
    return entries;
  };

  for (const dir of dirs) {
    for (const file of collect(dir)) {
      const source = readFileSync(file, 'utf8');
      const match = source.match(forbidden);
      assert.equal(match, null, `${file}: forbidden booking/order phrase "${match?.[0]}" found`);
    }
  }
});
