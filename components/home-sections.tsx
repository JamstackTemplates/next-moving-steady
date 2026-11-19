import type { ReactNode } from 'react';
import { business } from '../content/business';
import type { ChecklistTask } from '../content/checklist';
import type { InterstateRoute } from '../content/routes';
import type { MoveType } from '../content/services';
import {
  CartonIcon,
  EnvelopeIcon,
  HighwayIcon,
  HouseIcon,
  MarkerTickIcon,
  OfficeTowerIcon,
  PhoneIcon,
  UpArrowsIcon,
} from './artwork/icons';
import { HeroLoadingScene } from './artwork/hero-scene';
import { RouteBoardMap } from './artwork/route-map';
import { HandTruckArt, HandTruckNosePlate } from './artwork/scene-illustrations';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';

type ContentProps = { children: ReactNode };

/* ==========================================================================
   1. Hero — asymmetric split on kraft-cream + riveted truck side-skirt strip
   ========================================================================== */

function HeroRoot({ children }: ContentProps) {
  return (
    <section className="hero-scene-root relative overflow-hidden border-b-[3px] border-ink bg-bg">
      <div className="wrap grid items-center gap-6 pt-6 pb-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)] lg:gap-4 lg:pt-10 lg:pb-10">
        <div className="relative z-10 max-w-xl">{children}</div>
        {/* Right: Loading day scene, cropped to truck tail & cartons on narrow screens */}
        <div className="relative -mx-4 overflow-hidden border-y-2 border-ink sm:mx-0 sm:border-2 sm:shadow-[6px_6px_0_var(--road)] lg:-mr-20 lg:border-r-0 lg:shadow-none">
          <div className="w-[140%] -translate-x-[27%] sm:w-full sm:translate-x-0">
            <HeroLoadingScene />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroHeading({ children }: ContentProps) {
  return (
    <h1 className="font-display text-[3.1rem] leading-[0.94] tracking-wide text-ink sm:text-6xl lg:text-[4.65rem]">
      {children}
    </h1>
  );
}

function HeroIntroduction({ children }: ContentProps) {
  return (
    <p className="mt-4 max-w-lg text-base leading-relaxed text-muted sm:mt-5 sm:text-lg">
      {children}
    </p>
  );
}

function HeroActions({ children }: ContentProps) {
  return <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-7">{children}</div>;
}

function HeroPrimaryAction({ children, href = '/contact/' }: { children: ReactNode; href?: string }) {
  return (
    <SiteLink href={href} className="button hero-primary-cta">
      {children}
    </SiteLink>
  );
}

function HeroSecondaryAction({ children, href = '/trucks/' }: { children: ReactNode; href?: string }) {
  return (
    <SiteLink href={href} className="button button-quiet">
      {children}
    </SiteLink>
  );
}

/** Full-width road-charcoal truck side-skirt fact strip with rivets. */
function HeroFactStrip({ facts }: { facts: readonly string[] }) {
  return (
    <div className="border-b-[3px] border-ink bg-road text-road-ink">
      <div className="wrap py-3.5">
        <ul className="grid gap-3 text-sm font-semibold sm:grid-cols-3 sm:gap-0">
          {facts.map((fact, idx) => (
            <li
              key={fact}
              className={`flex items-center gap-3 sm:px-4 ${
                idx > 0 ? 'sm:border-l sm:border-white/15' : 'sm:pl-0'
              }`}
            >
              <span
                aria-hidden="true"
                className="inline-block h-2.5 w-2.5 shrink-0 rounded-full border border-black bg-kraft-soft shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]"
              />
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export const Hero = Object.assign(HeroRoot, {
  Heading: HeroHeading,
  Introduction: HeroIntroduction,
  Actions: HeroActions,
  PrimaryAction: HeroPrimaryAction,
  SecondaryAction: HeroSecondaryAction,
  FactStrip: HeroFactStrip,
});

/* ==========================================================================
   2. Pick your move — 4 cartons of varied sizes stacked on a hand-truck
   ========================================================================== */

function MoveIcon({ id }: { id: string }) {
  switch (id) {
    case 'home':
      return <HouseIcon size={22} />;
    case 'office':
      return <OfficeTowerIcon size={22} />;
    case 'interstate':
      return <HighwayIcon size={22} />;
    default:
      return <CartonIcon size={22} />;
  }
}

export function PickYourMoveSection({
  heading,
  intro,
  services,
}: {
  heading: ReactNode;
  intro: ReactNode;
  services: readonly MoveType[];
}) {
  // Varied widths on desktop, all flush against the hand-truck rail, so the 4 cartons read as one
  // stacked load (narrower on top, widest at the bottom resting on the nose plate)
  const cartonStyles = ['lg:w-[86%]', 'lg:w-[92%]', 'lg:w-[89%]', 'lg:w-[96%]'];

  return (
    <section className="border-b-[3px] border-ink bg-surface py-14 sm:py-18">
      <div className="wrap">
        <div className="max-w-2xl">
          <span className="font-marker text-sm text-accent-ink">FOUR WAYS WE MOVE</span>
          <h2 className="mt-1 font-display text-4xl leading-none text-ink sm:text-5xl">{heading}</h2>
          <p className="mt-3 text-base text-muted sm:text-lg">{intro}</p>
        </div>

        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[4.5rem_1fr] lg:gap-0">
          {/* Hand-truck frame at left on desktop */}
          <div className="hidden lg:block">
            <HandTruckArt />
          </div>

          {/* Stacked kraft cartons resting on the hand-truck nose plate */}
          <div className="grid gap-4 lg:gap-3">
            {services.map((service, idx) => (
              <SiteLink
                key={service.id}
                href={service.href}
                className={`carton-panel corrugated-bottom group block p-5 text-ink no-underline transition-transform hover:-translate-y-0.5 hover:no-underline sm:p-6 ${
                  cartonStyles[idx % cartonStyles.length]
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center border-2 border-ink bg-surface text-ink">
                      <MoveIcon id={service.id} />
                    </span>
                    <div>
                      <span className="font-marker text-xs uppercase tracking-wider text-muted">
                        CARTON 0{idx + 1} · {service.name}
                      </span>
                      <h3 className="mt-0.5 font-display text-2xl leading-tight text-ink group-hover:text-accent-ink sm:text-3xl">
                        {service.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted sm:text-base">{service.summary}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="hidden text-muted sm:inline-flex" aria-hidden="true">
                      <UpArrowsIcon size={20} />
                    </span>
                    <div className="border-2 border-ink bg-accent px-3.5 py-2 text-right text-on-accent shadow-[3px_3px_0_var(--road)]">
                      <span className="block text-[0.65rem] font-bold uppercase tracking-widest opacity-90">
                        From
                      </span>
                      <span className="font-display text-2xl leading-none tabular">
                        ${service.priceFrom}
                        <span className="text-sm">{service.priceUnit}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </SiteLink>
            ))}
            <HandTruckNosePlate className="-mt-3 hidden w-[calc(96%+10px)] lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   3. Truck guide teaser — full-bleed road-charcoal band
   ========================================================================== */

export function TruckTeaserBand({
  heading,
  intro,
  children,
}: {
  heading: ReactNode;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="road-band border-b-[3px] border-ink py-14 sm:py-18">
      <div className="wrap">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="font-marker text-sm text-headlight">LOAD IT UP</span>
            <h2 className="mt-1 font-display text-4xl leading-none text-road-ink sm:text-5xl">
              {heading}
            </h2>
            <p className="mt-3 text-base text-road-muted">{intro}</p>
          </div>
          <SiteLink href="/trucks/" className="button button-on-dark">
            Full truck guide
          </SiteLink>
        </div>

        {children}
      </div>
    </section>
  );
}

/* ==========================================================================
   4. How a move day runs — dashed road line with 5 stops (01-05)
   ========================================================================== */

export interface MoveDayStep {
  number: string;
  title: string;
  body: string;
}

export function MoveDaySection({
  heading,
  intro,
  steps,
}: {
  heading: ReactNode;
  intro: ReactNode;
  steps: readonly MoveDayStep[];
}) {
  return (
    <section className="border-b-[3px] border-ink bg-bg py-14 sm:py-18">
      <div className="wrap">
        <div className="max-w-2xl">
          <span className="font-marker text-sm text-accent-ink">START TO FINISH</span>
          <h2 className="mt-1 font-display text-4xl leading-none text-ink sm:text-5xl">{heading}</h2>
          <p className="mt-3 text-base text-muted sm:text-lg">{intro}</p>
        </div>

        <ol className="relative mt-10 grid gap-6 lg:grid-cols-5 lg:gap-4">
          {/* Horizontal dashed road line on desktop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-9 right-6 left-6 hidden border-t-[3px] border-dashed border-ink/40 lg:block"
          />
          {steps.map(step => (
            <li
              key={step.number}
              className="relative flex gap-4 border-l-[3px] border-dashed border-ink/40 pl-5 lg:block lg:border-l-0 lg:pl-0"
            >
              <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center border-2 border-ink bg-surface shadow-[3px_3px_0_var(--road)] lg:h-18 lg:w-18">
                <span className="font-display text-3xl leading-none tabular text-accent-ink lg:text-4xl">
                  {step.number}
                </span>
              </div>
              <div className="lg:mt-4">
                <h3 className="font-display text-xl tracking-wide text-ink">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ==========================================================================
   5. Interstate route board — route map left, departure board right
   ========================================================================== */

export function InterstateBoardSection({
  heading,
  intro,
  routes,
}: {
  heading: ReactNode;
  intro: ReactNode;
  routes: readonly InterstateRoute[];
}) {
  return (
    <section className="border-b-[3px] border-ink bg-surface py-14 sm:py-18">
      <div className="wrap">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="font-marker text-sm text-accent-ink">EAST COAST RUNS</span>
            <h2 className="mt-1 font-display text-4xl leading-none text-ink sm:text-5xl">
              {heading}
            </h2>
            <p className="mt-3 text-base text-muted">{intro}</p>
          </div>
          <SiteLink href="/moves/#interstate" className="button button-quiet">
            Interstate details →
          </SiteLink>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="carton-surface p-3">
            <RouteBoardMap routes={routes} />
          </div>

          <div className="carton-surface overflow-hidden">
            <div className="flex items-center justify-between border-b-2 border-ink bg-road px-5 py-3 text-road-ink">
              <span className="font-display text-lg tracking-wider">BRISBANE DEPARTURE BOARD</span>
              <span className="tape-strip text-[0.7rem]">SHARED LOAD</span>
            </div>
            <div className="table-wrap" tabIndex={0} role="region" aria-label="Weekly interstate departures">
              <table className="steady-table steady-table-stack text-sm">
                <thead>
                  <tr>
                    <th>City</th>
                    <th>Departs</th>
                    <th>Transit</th>
                    <th>From / m³</th>
                  </tr>
                </thead>
                <tbody>
                  {routes.map(route => (
                    <tr key={route.id}>
                      <th>
                        {route.to} <span className="font-normal text-muted">{route.state}</span>
                      </th>
                      <td data-label="Departs">
                        {route.running ? route.departs : 'Paused this month'}
                      </td>
                      <td data-label="Transit">
                        {route.transitDays[0]}–{route.transitDays[1]} days
                      </td>
                      <td data-label="From / m³" className="font-bold text-accent-ink">
                        {route.running ? `$${route.sharedPerM3}/m³` : 'Ask about dedicated'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t-2 border-ink bg-kraft-soft/50 px-5 py-3 text-xs text-muted">
              Minimum 10 m³ on shared loads. Need a full truck on your own date?{' '}
              <SiteLink href="/moves/#interstate" className="text-link">
                See dedicated truck options
              </SiteLink>
              .
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   6. Checklist teaser — teal quilted furniture blanket band + tilted clipboard
   ========================================================================== */

export function ChecklistTeaserSection({
  heading,
  intro,
  tasks,
}: {
  heading: ReactNode;
  intro: ReactNode;
  tasks: readonly ChecklistTask[];
}) {
  return (
    <section className="blanket-quilted border-b-[3px] border-ink py-14 sm:py-18">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="font-marker text-sm text-headlight">8 WEEKS OUT</span>
          <h2 className="mt-1 font-display text-4xl leading-none text-on-accent sm:text-5xl">
            {heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-on-accent/90 sm:text-lg">{intro}</p>
          <div className="mt-6">
            <SiteLink href="/checklist/" className="button button-white">
              Open printable checklist
            </SiteLink>
          </div>
        </div>

        {/* Tilted clipboard showing first 5 tasks */}
        <div className="mx-auto w-full max-w-xl lg:-rotate-1">
          <div className="carton-panel p-3 text-ink sm:p-4">
            <div className="border-2 border-ink bg-surface p-5 sm:p-6">
              <div className="flex items-center justify-between border-b-2 border-ink pb-3">
                <span className="font-display text-xl text-ink">8 WEEKS OUT</span>
                <span className="font-marker text-xs text-accent-ink">FIRST 5 TASKS</span>
              </div>
              <ul className="mt-3 divide-y divide-line">
                {tasks.map((task, idx) => (
                  <li key={task.id} className="flex items-start gap-3 py-2.5 text-sm">
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 border-ink ${
                        idx < 2 ? 'bg-accent text-on-accent' : 'bg-bg text-transparent'
                      }`}
                    >
                      <MarkerTickIcon size={13} />
                    </span>
                    <span className={idx < 2 ? 'text-muted line-through decoration-accent' : 'font-medium text-ink'}>
                      {task.task}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-right text-xs font-bold text-accent-ink">
                <SiteLink href="/checklist/" className="text-link">
                  All 27 tasks + first-night box →
                </SiteLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   7. Closing band — orange livery band with quote CTA, phone, email & status
   ========================================================================== */

export function ClosingBand({
  heading,
  body,
  actionLabel = 'Request a moving quote',
}: {
  heading: ReactNode;
  body: ReactNode;
  actionLabel?: string;
}) {
  return (
    <section className="livery-band py-14 sm:py-16">
      <div className="wrap grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="font-display text-4xl leading-none text-on-accent sm:text-6xl">
            {heading}
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-on-accent/95 sm:text-lg">
            {body}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <SiteLink href="/contact/" className="button button-white">
              {actionLabel}
            </SiteLink>
            <a
              href={`tel:${business.phoneE164}`}
              className="inline-flex items-center gap-2 font-display text-2xl tracking-wide tabular text-on-accent no-underline hover:underline"
            >
              <PhoneIcon size={22} />
              <span>{business.phone}</span>
            </a>
          </div>
        </div>

        <div className="border-2 border-[#1E1915] bg-[#1E1915]/25 p-5 text-sm text-on-accent">
          <p className="font-marker text-xs text-headlight">BRISBANE OFFICE</p>
          <p className="mt-2 font-bold">
            <OpenBadge
              hours={business.officeHours}
              fallback={business.officeHoursSummary}
              className="text-on-accent"
            />
          </p>
          <p className="mt-3 flex items-center gap-2">
            <EnvelopeIcon size={16} className="shrink-0" />
            <a href={`mailto:${business.email}`} className="break-all font-semibold text-on-accent underline">
              {business.email}
            </a>
          </p>
          <p className="mt-2 text-xs text-on-accent/85">{business.movingDays}</p>
        </div>
      </div>
    </section>
  );
}
