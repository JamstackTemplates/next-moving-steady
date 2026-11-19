import type { Metadata } from 'next';
import { BedIcon, CartonIcon, FridgeIcon, SofaIcon } from '../../components/artwork/icons';
import { TruckIllustration } from '../../components/artwork/trucks-art';
import { ClosingBand } from '../../components/home-sections';
import { PageHead } from '../../components/page-head';
import { TruckPicker } from '../../components/truck-picker';
import { truckFits } from '../../content/fits';
import { homeSizes } from '../../content/home-sizes';
import { trucks } from '../../content/trucks';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Truck size guide',
  description:
    'Interactive Brisbane removal truck size guide: pick your home or office size to load cartons into The Dinghy, The Sloop, The Schooner or The Freighter.',
  alternates: { canonical: absoluteUrl('/trucks/') },
};

export default function TrucksPage() {
  const maxCartons = Math.max(...truckFits.map(r => r.cartons));

  return (
    <>
      <PageHead eyebrow="LOAD 03 · TRUCK GUIDE" title="Which truck do I need?" art="trucks">
        <p>
          Pick your home or office size below to see the estimated load volume, which truck in our
          fleet fits it cleanly, and the hourly rate.
        </p>
      </PageHead>

      {/* Section 2: Interactive Truck Picker (signature element) */}
      <section className="border-b-[3px] border-ink bg-bg py-12 sm:py-16">
        <div className="wrap">
          <TruckPicker sizes={homeSizes} trucks={trucks} variant="full" defaultSizeId="three-bed" />
        </div>
      </section>

      {/* Section 3: Truck spec plates — staggered two-column riveted compliance plates */}
      <section className="border-b-[3px] border-ink bg-surface py-14 sm:py-16">
        <div className="wrap">
          <div className="max-w-2xl">
            <span className="font-marker text-sm text-accent-ink">FLEET SPECIFICATIONS</span>
            <h2 className="mt-1 font-display text-4xl leading-none text-ink sm:text-5xl">
              Truck compliance plates
            </h2>
            <p className="mt-3 text-base text-muted sm:text-lg">
              Four trucks named after boats, maintained in-house and fitted with hydraulic
              tail-lifts, tie-down rails and padded walls.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {trucks.map((truck, idx) => (
              <article
                key={truck.id}
                className={`rivet-plate p-6 ${idx % 2 === 1 ? 'md:translate-y-6' : ''}`}
              >
                {/* 4 corner rivets */}
                <span aria-hidden="true" className="absolute top-3 left-3 h-2.5 w-2.5 rounded-full border border-ink bg-kraft" />
                <span aria-hidden="true" className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full border border-ink bg-kraft" />
                <span aria-hidden="true" className="absolute bottom-3 left-3 h-2.5 w-2.5 rounded-full border border-ink bg-kraft" />
                <span aria-hidden="true" className="absolute bottom-3 right-3 h-2.5 w-2.5 rounded-full border border-ink bg-kraft" />

                <div className="mb-4 flex items-center justify-between gap-2 border-b-2 border-ink pb-3">
                  <div>
                    <span className="font-marker text-xs text-muted">VESSEL 0{idx + 1}</span>
                    <h3 className="font-display text-3xl leading-none text-ink">{truck.name}</h3>
                  </div>
                  {truck.inService ? (
                    <span className="border-2 border-ink bg-accent px-3 py-1 font-display text-xl tabular text-on-accent">
                      ${truck.hourlyRate}/h
                    </span>
                  ) : (
                    <span className="tape-strip bg-road text-xs text-road-ink">OFF THE ROAD</span>
                  )}
                </div>

                {/* Scaled truck illustration above spec table */}
                <div className="my-4 flex min-h-36 items-end justify-center border border-line bg-bg/70 p-3">
                  <TruckIllustration
                    truck={truck}
                    fillRatio={truck.inService ? 0.55 : 0}
                    highlighted={truck.inService}
                    showGauge={false}
                    className="w-full max-w-sm text-ink"
                  />
                </div>

                <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 border-t-2 border-ink pt-4 text-sm tabular sm:grid-cols-3">
                  <div>
                    <dt className="font-display text-xs tracking-wider text-muted">Weight class</dt>
                    <dd className="font-bold text-ink">{truck.tonnes} tonnes</dd>
                  </div>
                  <div>
                    <dt className="font-display text-xs tracking-wider text-muted">Body length</dt>
                    <dd className="font-bold text-ink">{truck.bodyLengthM} m</dd>
                  </div>
                  <div>
                    <dt className="font-display text-xs tracking-wider text-muted">Capacity</dt>
                    <dd className="font-bold text-ink">{truck.capacityM3} m³</dd>
                  </div>
                  <div>
                    <dt className="font-display text-xs tracking-wider text-muted">Crew included</dt>
                    <dd className="font-bold text-ink">{truck.crew} movers</dd>
                  </div>
                  <div>
                    <dt className="font-display text-xs tracking-wider text-muted">Min. hours</dt>
                    <dd className="font-bold text-ink">{truck.minimumHours} hours</dd>
                  </div>
                  <div>
                    <dt className="font-display text-xs tracking-wider text-muted">Best for</dt>
                    <dd className="font-medium text-ink">{truck.suits}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: What fits — shared-scale icon load chart */}
      <section className="border-b-[3px] border-ink bg-bg py-14 sm:py-16">
        <div className="wrap">
          <div className="max-w-2xl">
            <span className="font-marker text-sm text-accent-ink">APPROXIMATE CAPACITY</span>
            <h2 className="mt-1 font-display text-4xl leading-none text-ink sm:text-5xl">
              What fits on board
            </h2>
            <p className="mt-3 text-base text-muted sm:text-lg">
              Typical furniture and carton counts per single load, drawn on a shared scale.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {truckFits.map(row => {
              const truck = trucks.find(t => t.id === row.truckId);
              if (!truck) return null;
              const barPct = Math.round((row.cartons / maxCartons) * 100);
              return (
                <div key={row.truckId} className="carton-surface p-5">
                  <div className="grid items-center gap-4 lg:grid-cols-[13rem_1fr_14rem]">
                    <div>
                      <h3 className="font-display text-2xl leading-none text-ink">{truck.name}</h3>
                      <p className="mt-1 text-xs font-bold text-muted tabular">
                        {truck.capacityM3} m³ · {truck.crew} movers
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm tabular sm:grid-cols-4">
                      <div className="flex items-center gap-2 border border-line bg-bg px-3 py-2">
                        <SofaIcon size={18} className="shrink-0 text-teal" />
                        <span>
                          <strong>{row.sofas}</strong> {row.sofas === 1 ? 'sofa' : 'sofas'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 border border-line bg-bg px-3 py-2">
                        <BedIcon size={18} className="shrink-0 text-teal" />
                        <span>
                          <strong>{row.beds}</strong> {row.beds === 1 ? 'bed' : 'beds'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 border border-line bg-bg px-3 py-2">
                        <FridgeIcon size={18} className="shrink-0 text-teal" />
                        <span>
                          <strong>{row.fridges}</strong> {row.fridges === 1 ? 'fridge' : 'fridges'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 border border-line bg-bg px-3 py-2">
                        <CartonIcon size={18} className="shrink-0 text-accent-ink" />
                        <span>
                          <strong>{row.cartons}</strong> cartons
                        </span>
                      </div>
                    </div>

                    {/* Shared-scale carton load bar */}
                    <div>
                      <div className="h-4 w-full border-2 border-ink bg-kraft-soft">
                        <div className="h-full bg-accent" style={{ width: `${barPct}%` }} />
                      </div>
                      <p className="mt-1 text-right text-[0.7rem] font-bold uppercase tracking-wider text-muted tabular">
                        ~{row.cartons} standard cartons
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 5: Tips — two marker notes taped onto a kraft panel */}
      <section className="border-b-[3px] border-ink bg-surface py-14 sm:py-16">
        <div className="wrap">
          <div className="carton-panel p-6 sm:p-10">
            <span className="font-marker text-sm text-accent-ink">DISPATCHER NOTES</span>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              <div className="relative border-2 border-ink bg-surface p-6 shadow-[4px_4px_0_var(--road)] md:-rotate-1">
                <span className="tape-strip absolute -top-3 left-6 text-[0.68rem]">TIP 01</span>
                <h2 className="mt-2 font-display text-2xl text-ink">
                  Two trips or a bigger truck?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Across town, one load in The Schooner or The Freighter almost always costs less
                  than two trips in a smaller truck — you only pay for the drive once. A smaller
                  truck only wins when your street has tight cul-de-sac access or low trees.
                </p>
              </div>

              <div className="relative border-2 border-ink bg-surface p-6 shadow-[4px_4px_0_var(--road)] md:rotate-1">
                <span className="tape-strip absolute -top-3 right-6 text-[0.68rem]">TIP 02</span>
                <h2 className="mt-2 font-display text-2xl text-ink">
                  Not sure? Put your room list in the quote message.
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Tell us how many bedrooms, big items (like a double-door fridge, piano or outdoor
                  setting) and whether there are stairs. Our dispatcher will match the right boat
                  and crew size before you decide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClosingBand
        heading="Got your truck picked?"
        body="Mention the truck size or your room list in a quote enquiry and we will send back a clear written estimate."
        actionLabel="Request a moving quote"
      />
    </>
  );
}
