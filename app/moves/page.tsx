import type { Metadata } from 'next';
import { PackingTapeDivider } from '../../components/artwork/dividers';
import { FoldedBlanketIcon, MarkerTickIcon } from '../../components/artwork/icons';
import { RouteBoardMap } from '../../components/artwork/route-map';
import { OfficeCrateArt } from '../../components/artwork/scene-illustrations';
import { ClosingBand } from '../../components/home-sections';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { routes } from '../../content/routes';
import { extrasAndFees, getMoveTypes } from '../../content/services';
import { startingHourlyRate, trucks } from '../../content/trucks';
import { absoluteUrl } from '../../lib/paths';

const fromRate = startingHourlyRate();

export const metadata: Metadata = {
  title: 'Moves & rates',
  description: `Local home moves from $${fromRate}/h, after-hours office relocations, weekly east-coast interstate shared loads and transparent extras.`,
  alternates: { canonical: absoluteUrl('/moves/') },
};

export default function MovesPage() {
  const moveTypes = getMoveTypes();
  const homeMove = moveTypes.find(m => m.id === 'home')!;
  const officeMove = moveTypes.find(m => m.id === 'office')!;
  const currentFrom = startingHourlyRate();

  return (
    <>
      <PageHead eyebrow="LOAD 01 · MOVES & RATES" title="Moves, priced by the hour" art="trucks">
        <p>
          Local home moves from <strong className="tabular">${currentFrom}/h</strong>, weekend
          office relocations and weekly east-coast interstate runs out of Brisbane. All prices in
          AUD including GST.
        </p>
      </PageHead>

      {/* Section 2: Home moves (#home) */}
      <section id="home" className="border-b-[3px] border-ink bg-bg py-14 sm:py-16">
        <div className="wrap">
          <div className="max-w-2xl">
            <span className="font-marker text-sm text-accent-ink">LOCAL FLEET RATES</span>
            <h2 className="mt-1 font-display text-4xl leading-none text-ink sm:text-5xl">
              Home moves
            </h2>
            <p className="mt-3 text-base text-muted sm:text-lg">
              {homeMove.summary} Every truck rolls out with trained movers, blankets, wrap and
              trolleys. Rates start from <strong className="tabular text-ink">${currentFrom}/h</strong>{' '}
              with a clear minimum hours call-out.
            </p>
          </div>

          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1.35fr_0.65fr]">
            {/* Rate table styled as the signwritten side of the truck */}
            <div className="carton-surface overflow-hidden">
              <div className="flex items-center justify-between border-b-2 border-ink bg-accent px-5 py-3 text-on-accent">
                <span className="font-display text-lg tracking-wider">TRUCK &amp; CREW HOURLY RATES</span>
                <span className="text-xs font-bold uppercase tracking-widest">AUD INC. GST</span>
              </div>
              <div className="table-wrap" tabIndex={0} role="region" aria-label="Home move truck hourly rates">
                <table className="steady-table steady-table-stack text-sm">
                  <thead>
                    <tr>
                      <th>Truck</th>
                      <th>Crew</th>
                      <th>Capacity</th>
                      <th>Hourly rate</th>
                      <th>Min. hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trucks.map(truck => (
                      <tr key={truck.id} className={!truck.inService ? 'opacity-65' : undefined}>
                        <th>
                          {truck.name}
                          <span className="block text-xs font-normal text-muted">{truck.suits}</span>
                        </th>
                        <td data-label="Crew">{truck.crew} movers</td>
                        <td data-label="Capacity">{truck.capacityM3} m³</td>
                        <td data-label="Hourly rate" className="font-bold text-accent-ink">
                          {truck.inService ? `$${truck.hourlyRate}/h` : 'Off the road'}
                        </td>
                        <td data-label="Min. hours">{truck.minimumHours} hrs</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t-2 border-ink bg-kraft-soft/60 px-5 py-3 text-xs text-muted">
                Not sure which size fits?{' '}
                <SiteLink href="/trucks/" className="text-link">
                  Try the interactive truck size guide
                </SiteLink>
                .
              </div>
            </div>

            {/* Included on every truck — packing slip on kraft */}
            <aside className="carton-panel corrugated-bottom p-6">
              <div className="flex items-center gap-2 border-b-2 border-ink/25 pb-3">
                <FoldedBlanketIcon size={22} className="text-teal" />
                <h3 className="font-display text-2xl leading-none text-ink">
                  Included on every truck
                </h3>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-ink">
                {homeMove.includes.map(item => (
                  <li key={item} className="flex items-start gap-2.5">
                    <MarkerTickIcon size={18} className="mt-0.5 shrink-0 text-accent-ink" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-ink/20 pt-3 text-xs text-muted">
                Billed in 15-minute increments after the minimum hours, plus the flat depot travel
                fee listed below.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* Section 3: Office moves (#office) */}
      <section id="office" className="border-b-[3px] border-ink bg-surface py-14 sm:py-16">
        <div className="wrap grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="carton-surface p-3">
            <OfficeCrateArt />
          </div>

          <div>
            <span className="font-marker text-sm text-accent-ink">AFTER HOURS &amp; WEEKENDS</span>
            <h2 className="mt-1 font-display text-4xl leading-none text-ink sm:text-5xl">
              Office moves
            </h2>
            <p className="mt-3 text-base text-muted sm:text-lg">
              {officeMove.summary} We move teams of 5 to 25 desks on Friday evenings or Saturdays
              with commercial lift coordination and colour-coded bay labels.
            </p>

            {/* Floor-plan label sheet */}
            <div className="mt-6 border-2 border-ink bg-bg p-5 shadow-[4px_4px_0_var(--road)]">
              <div className="flex items-center justify-between border-b-2 border-ink pb-2">
                <span className="font-display text-lg text-ink">OFFICE MOVE CHECKLIST</span>
                <span className="font-marker text-xs text-accent-ink tabular">
                  FROM ${officeMove.priceFrom}/H
                </span>
              </div>
              <ul className="mt-4 space-y-2.5 text-sm text-ink">
                {officeMove.includes.map(item => (
                  <li key={item} className="flex items-start gap-2.5">
                    <MarkerTickIcon size={18} className="mt-0.5 shrink-0 text-teal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Interstate (#interstate) */}
      <section id="interstate" className="border-b-[3px] border-ink bg-bg py-14 sm:py-16">
        <div className="wrap">
          <div className="max-w-2xl">
            <span className="font-marker text-sm text-accent-ink">WEEKLY SHARED LOADS</span>
            <h2 className="mt-1 font-display text-4xl leading-none text-ink sm:text-5xl">
              Interstate from Brisbane
            </h2>
            <p className="mt-3 text-base text-muted sm:text-lg">
              Pay only for the cubic metres your household uses on our scheduled weekly runs, or
              ask for a dedicated truck on your own timetable.
            </p>
          </div>

          <div className="mt-8 grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="carton-surface p-3">
              <RouteBoardMap routes={routes} />
            </div>

            <div className="space-y-6">
              {/* Consignment note table */}
              <div className="carton-surface overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink bg-road px-5 py-3 text-road-ink">
                  <span className="font-display text-lg tracking-wider">
                    CONSIGNMENT NOTE · INTERSTATE SCHEDULE
                  </span>
                  <span className="tape-strip text-[0.7rem]">SHARED LOAD</span>
                </div>
                <div className="table-wrap" tabIndex={0} role="region" aria-label="Interstate shared-load rates">
                  <table className="steady-table steady-table-stack text-sm">
                    <thead>
                      <tr>
                        <th>Destination</th>
                        <th>Distance</th>
                        <th>Departs</th>
                        <th>Transit</th>
                        <th>Rate / m³</th>
                      </tr>
                    </thead>
                    <tbody>
                      {routes.map(route => (
                        <tr key={route.id}>
                          <th>
                            {route.to}, {route.state}
                          </th>
                          <td data-label="Distance">{route.distanceKm.toLocaleString('en-AU')} km</td>
                          <td data-label="Departs">
                            {route.running ? route.departs : 'No departures this month'}
                          </td>
                          <td data-label="Transit">
                            {route.transitDays[0]}–{route.transitDays[1]} days
                          </td>
                          <td data-label="Rate / m³" className="font-bold text-accent-ink">
                            {route.running
                              ? `$${route.sharedPerM3}/m³ (min ${route.minimumM3} m³)`
                              : 'Ask about a dedicated truck'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Shared load vs dedicated truck */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="carton-panel p-5">
                  <h3 className="font-display text-xl text-ink">Shared load</h3>
                  <p className="mt-2 text-sm text-muted">
                    Best for 10–30 m³ loads. Your items travel in a padded, partitioned bay with an
                    itemised consignment note and delivery inside the transit window.
                  </p>
                </div>
                <div className="carton-surface p-5">
                  <h3 className="font-display text-xl text-ink">Dedicated truck</h3>
                  <p className="mt-2 text-sm text-muted">
                    Best for full 4–5 bedroom homes or fixed settlement dates. Direct door-to-door
                    delivery on a quote-only basis — ask in your enquiry message.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Extras and fees — dispatch docket with torn bottom edge */}
      <section id="extras" className="bg-surface py-14 sm:py-16">
        <div className="wrap max-w-4xl">
          <div className="docket-torn p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-ink pb-4">
              <div>
                <span className="font-marker text-xs text-accent-ink">NO HIDDEN SURCHARGES</span>
                <h2 className="mt-1 font-display text-3xl leading-none text-ink sm:text-4xl">
                  Extras and fees
                </h2>
              </div>
              <span className="font-display text-sm tracking-widest text-muted tabular">
                DOCKET · AUD INC. GST
              </span>
            </div>

            <dl className="mt-4 divide-y divide-dashed divide-line">
              {extrasAndFees.map(extra => (
                <div
                  key={extra.id}
                  className="grid gap-1 py-4 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6"
                >
                  <div>
                    <dt className="text-base font-bold text-ink">{extra.name}</dt>
                    <dd className="mt-0.5 text-sm text-muted">{extra.note}</dd>
                  </div>
                  <dd className="font-display text-xl tabular text-accent-ink sm:text-right">
                    {extra.price !== null ? `$${extra.price}` : ''}
                    <span className="ml-1 font-sans text-xs font-bold uppercase tracking-wider text-muted">
                      {extra.unit}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <PackingTapeDivider className="mt-12" />
      </section>

      <ClosingBand
        heading="Ready for a written quote?"
        body="Tell us your move type, suburbs, stairs and rough room list. Our Brisbane office replies with a clear written estimate."
        actionLabel="Request a moving quote"
      />
    </>
  );
}
