import type { Metadata } from 'next';
import { MarkerTickIcon, TapeGunIcon } from '../../components/artwork/icons';
import { SupplyShelfArt } from '../../components/artwork/scene-illustrations';
import { ClosingBand } from '../../components/home-sections';
import { PageHead } from '../../components/page-head';
import { packingServices } from '../../content/services';
import { formatAud, supplies } from '../../content/supplies';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Packing & box supplies',
  description:
    'Brisbane packing and unpacking crews from $65 per packer per hour, plus double-walled cartons, port-a-robes, butcher’s paper and packing tape.',
  alternates: { canonical: absoluteUrl('/packing/') },
};

const PACKING_STEPS = [
  {
    step: '01',
    title: 'Heavy at the bottom',
    body: 'Use book cartons for books, tins and tools. Keep every carton under 20 kg so it stacks safely.',
  },
  {
    step: '02',
    title: 'Fill the gaps',
    body: 'Scrunch clean butcher’s paper into corners and along the top so nothing shifts or crushes under weight.',
  },
  {
    step: '03',
    title: 'Tape an H',
    body: 'Run one strip down the centre seam and two across the outer edges — top and bottom — to lock the flaps.',
  },
  {
    step: '04',
    title: 'Label two sides',
    body: 'Write the room and contents on two adjacent sides in marker so the crew can read it in a stack.',
  },
] as const;

export default function PackingPage() {
  const cartons = supplies.filter(item => item.shelf === 'carton');
  const rolls = supplies.filter(item => item.shelf === 'roll');

  return (
    <>
      <PageHead eyebrow="LOAD 02 · PACKING & SUPPLIES" title="Packed properly, unpacked fast" art="cartons">
        <p>
          Bring in our packing crew the day before your move, or pick up sturdy cartons, paper and
          tape to pack at your own pace.
        </p>
      </PageHead>

      {/* Section 2: Packing services — 4 tape-sealed cartons in a staggered row */}
      <section className="border-b-[3px] border-ink bg-bg py-14 sm:py-16">
        <div className="wrap">
          <div className="max-w-2xl">
            <span className="font-marker text-sm text-accent-ink">PACKING CREWS</span>
            <h2 className="mt-1 font-display text-4xl leading-none text-ink sm:text-5xl">
              Packing and unpacking services
            </h2>
            <p className="mt-3 text-base text-muted sm:text-lg">
              Same careful hands as our truck crews. Cartons and wrapping materials are billed only
              for what your job uses.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {packingServices.map((service, idx) => (
              <article
                key={service.id}
                className={`carton-panel corrugated-bottom flex flex-col justify-between p-5 ${
                  idx % 2 === 1 ? 'lg:translate-y-4' : ''
                }`}
              >
                <div>
                  {/* Top tape seal */}
                  <div className="-mt-8 mb-4 flex justify-center" aria-hidden="true">
                    <span className="tape-strip text-[0.68rem]">SEALED · CREW 0{idx + 1}</span>
                  </div>

                  {/* Rate on a marker label */}
                  <div className="inline-block -rotate-1 border-2 border-ink bg-surface px-3 py-1.5 shadow-[2px_2px_0_var(--road)]">
                    <span className="font-display text-2xl leading-none tabular text-accent-ink">
                      ${service.rate}
                    </span>
                    <span className="ml-1.5 font-marker text-xs text-ink">{service.unit}</span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl leading-tight text-ink">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{service.summary}</p>

                  <ul className="mt-4 space-y-2 border-t border-ink/20 pt-3 text-xs text-ink">
                    {service.includes.map(item => (
                      <li key={item} className="flex items-start gap-2">
                        <MarkerTickIcon size={15} className="mt-0.5 shrink-0 text-teal" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Boxes and supplies — depot shelf */}
      <section id="supplies" className="border-b-[3px] border-ink bg-surface py-14 sm:py-16">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="font-marker text-sm text-accent-ink">DEPOT SHELF</span>
              <h2 className="mt-1 font-display text-4xl leading-none text-ink sm:text-5xl">
                Boxes and supplies
              </h2>
              <p className="mt-3 text-base text-muted sm:text-lg">
                Double-walled removal cartons and clean wrapping supplies. Include your list in an
                enquiry and we can drop them ahead of move day or bring them on the truck.
              </p>
            </div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-muted">
              <TapeGunIcon size={20} className="text-accent-ink" />
              <span>All prices AUD inc. GST</span>
            </p>
          </div>

          {/* Upper shelf: Cartons */}
          <div className="mt-10">
            <h3 className="font-display text-xl tracking-wider text-muted">
              UPPER SHELF · REMOVAL CARTONS
            </h3>
            <div className="mt-3 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {cartons.map(item => (
                <article
                  key={item.id}
                  data-supply-id={item.id}
                  className="relative flex flex-col justify-between border-2 border-ink bg-bg p-4"
                >
                  {!item.inStock ? (
                    <div className="pointer-events-none absolute inset-x-0 top-12 z-10 flex justify-center">
                      <span className="tape-strip -rotate-6 bg-accent px-4 py-1 text-xs text-on-accent">
                        OUT OF STOCK
                      </span>
                    </div>
                  ) : null}

                  <div className={!item.inStock ? 'opacity-55' : undefined}>
                    <div className="mx-auto flex h-28 w-28 items-end justify-center">
                      <SupplyShelfArt id={item.id} className="h-full w-full" />
                    </div>
                    <h4 className="mt-3 font-display text-xl leading-tight text-ink">{item.name}</h4>
                    {item.size ? (
                      <p className="mt-1 text-xs font-semibold tabular text-muted">{item.size} cm</p>
                    ) : null}
                    <p className="mt-2 text-xs leading-relaxed text-muted">{item.note}</p>
                  </div>

                  {/* Shelf price tag */}
                  <div className="mt-4 flex items-baseline justify-between border-t-2 border-ink pt-3">
                    <span className="font-display text-2xl leading-none tabular text-accent-ink">
                      {formatAud(item.price)}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted">
                      {item.unit}
                    </span>
                  </div>
                </article>
              ))}
            </div>
            {/* Heavy depot shelf plank */}
            <div className="h-3.5 w-full border-2 border-t-0 border-ink bg-kraft shadow-[0_4px_0_var(--road)]" aria-hidden="true" />
          </div>

          {/* Lower shelf: Rolls and bags */}
          <div className="mt-10">
            <h3 className="font-display text-xl tracking-wider text-muted">
              LOWER SHELF · PAPER, WRAP, BAGS &amp; TAPE
            </h3>
            <div className="mt-3 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {rolls.map(item => (
                <article
                  key={item.id}
                  data-supply-id={item.id}
                  className="relative flex flex-col justify-between border-2 border-ink bg-bg p-4"
                >
                  {!item.inStock ? (
                    <div className="pointer-events-none absolute inset-x-0 top-12 z-10 flex justify-center">
                      <span className="tape-strip -rotate-6 bg-accent px-4 py-1 text-xs text-on-accent">
                        OUT OF STOCK
                      </span>
                    </div>
                  ) : null}

                  <div className={!item.inStock ? 'opacity-55' : undefined}>
                    <div className="mx-auto flex h-24 w-28 items-end justify-center">
                      <SupplyShelfArt id={item.id} className="h-full w-full" />
                    </div>
                    <h4 className="mt-3 font-display text-xl leading-tight text-ink">{item.name}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{item.note}</p>
                  </div>

                  <div className="mt-4 flex items-baseline justify-between border-t-2 border-ink pt-3">
                    <span className="font-display text-2xl leading-none tabular text-accent-ink">
                      {formatAud(item.price)}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted">
                      {item.unit}
                    </span>
                  </div>
                </article>
              ))}
            </div>
            <div className="h-3.5 w-full border-2 border-t-0 border-ink bg-kraft shadow-[0_4px_0_var(--road)]" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* Section 4: How to pack a box — 4 carton flaps opening */}
      <section className="border-b-[3px] border-ink bg-bg py-14 sm:py-16">
        <div className="wrap">
          <div className="max-w-2xl">
            <span className="font-marker text-sm text-accent-ink">CREW TIPS</span>
            <h2 className="mt-1 font-display text-4xl leading-none text-ink sm:text-5xl">
              How to pack a box
            </h2>
            <p className="mt-3 text-base text-muted">
              Four habits that keep crockery intact and speed up loading day.
            </p>
          </div>

          <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PACKING_STEPS.map(item => (
              <li key={item.step} className="relative border-2 border-ink bg-surface p-5 shadow-[4px_4px_0_var(--road)]">
                {/* Drawn open carton flap fold at top */}
                <div className="-mx-5 -mt-5 mb-4 flex border-b-2 border-ink bg-kraft-soft">
                  <div className="w-1/2 border-r-2 border-ink px-3 py-1.5 font-display text-sm text-muted">
                    FLAP {item.step}
                  </div>
                  <div className="w-1/2 px-3 py-1.5 text-right font-marker text-xs text-accent-ink">
                    ↑ UP
                  </div>
                </div>
                <span className="font-display text-5xl leading-none tabular text-accent-ink">
                  {item.step}
                </span>
                <h3 className="mt-2 font-display text-2xl text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ClosingBand
        heading="Need a packing crew or boxes?"
        body="Tell us how many rooms you have and whether you want a pre-pack crew or a carton drop-off. We will include it in your written quote."
        actionLabel="Ask about packing"
      />
    </>
  );
}
