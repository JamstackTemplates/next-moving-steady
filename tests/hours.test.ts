import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { DAYS, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const hours: OpeningHours[] = DAYS.map(day => day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' });
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});

test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(at('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, opens } : x)), /Tuesday/);
  }
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, closes: undefined } : x)), /Tuesday/);
});

test('Brisbane office hours at 07:00, 17:29, 17:30, Saturday 12:00 and southern DST dates (UTC+10 all year)', () => {
  const bne = (iso: string) => openingLabel(business.officeHours, 'Australia/Brisbane', new Date(iso));

  // Monday 2026-10-05 (day after NSW/VIC spring-forward DST on 4 Oct 2026): Brisbane stays UTC+10
  // 07:00 AEST = 2026-10-04T21:00:00Z
  assert.equal(bne('2026-10-04T20:59:00Z'), 'Closed · opens today at 07:00');
  assert.equal(bne('2026-10-04T21:00:00Z'), 'Open now · until 17:30');
  // 17:29 AEST = 2026-10-05T07:29:00Z
  assert.equal(bne('2026-10-05T07:29:00Z'), 'Open now · until 17:30');
  // 17:30 AEST = 2026-10-05T07:30:00Z (closing exclusive)
  assert.equal(bne('2026-10-05T07:30:00Z'), 'Closed · opens Tuesday at 07:00');

  // Saturday 2026-10-10: 08:00–12:00 AEST
  // 11:59 AEST = 01:59Z, 12:00 AEST = 02:00Z (wraps to Monday 07:00)
  assert.equal(bne('2026-10-10T01:59:00Z'), 'Open now · until 12:00');
  assert.equal(bne('2026-10-10T02:00:00Z'), 'Closed · opens Monday at 07:00');

  // Southern DST spring-forward date: Sunday 4 Oct 2026 (closed all day, opens Monday 07:00)
  assert.equal(bne('2026-10-04T00:00:00Z'), 'Closed · opens Monday at 07:00');

  // Southern DST fall-back date: Sunday 4 Apr 2027 -> Monday 5 Apr 2027 07:00 AEST = 2027-04-04T21:00:00Z
  assert.equal(bne('2027-04-04T20:59:00Z'), 'Closed · opens today at 07:00');
  assert.equal(bne('2027-04-04T21:00:00Z'), 'Open now · until 17:30');
});
