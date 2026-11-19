import { business } from '../content/business';
import { EnvelopeIcon, PhoneIcon, WaveMark } from './artwork/icons';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';

export function SiteFooter() {
  return (
    <footer className="roller-door border-t-[4px] border-accent">
      {/* Top hazard / livery trim bar */}
      <div className="h-2 w-full bg-[repeating-linear-gradient(-45deg,var(--accent)_0_18px,var(--road)_18px_36px)]" aria-hidden="true" />

      <div className="wrap py-12">
        {/* Truck-back rego plate badge & wordmark */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-8">
          <div className="flex items-center gap-4">
            <div className="inline-flex flex-col items-center border-2 border-road-ink bg-surface px-3 py-1 text-ink shadow-[3px_3px_0_#000]">
              <span className="text-[0.6rem] font-bold tracking-[0.2em] text-accent-ink">QLD · BRISBANE</span>
              <span className="font-display text-xl leading-none tracking-[0.14em] tabular">DHR·001</span>
            </div>
            <div>
              <p className="font-display text-2xl tracking-wider text-road-ink">DECKHAND REMOVALS</p>
              <WaveMark className="h-3.5 w-20 text-accent" />
            </div>
          </div>

          <SiteLink href="/contact/" className="button button-on-dark">
            Request a moving quote
          </SiteLink>
        </div>

        {/* Four footer columns */}
        <div className="grid gap-8 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="font-display text-base tracking-wider text-headlight">Service area</h2>
            <p className="mt-2.5 leading-relaxed text-road-muted">{business.serviceAreaSummary}</p>
            <p className="mt-2 text-xs text-road-muted">Phone &amp; email office — no walk-in counter.</p>
          </div>

          <div>
            <h2 className="font-display text-base tracking-wider text-headlight">Office hours</h2>
            <p className="mt-2.5 font-semibold text-road-ink">
              <OpenBadge
                hours={business.officeHours}
                fallback={business.officeHoursSummary}
              />
            </p>
            <ul className="mt-2 space-y-1 text-road-muted tabular">
              <li>Mon–Fri: 07:00–17:30</li>
              <li>Saturday: 08:00–12:00</li>
              <li>Sunday: Closed</li>
            </ul>
            <p className="mt-2 text-xs text-road-muted">{business.movingDays} All times AEST (Brisbane).</p>
          </div>

          <div>
            <h2 className="font-display text-base tracking-wider text-headlight">Talk to the depot</h2>
            <ul className="mt-2.5 space-y-2.5">
              <li>
                <a
                  href={`tel:${business.phoneE164}`}
                  className="inline-flex items-center gap-2 font-bold tabular text-road-ink no-underline hover:text-headlight hover:underline"
                >
                  <PhoneIcon size={16} className="text-accent" />
                  <span>{business.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${business.email}`}
                  className="inline-flex items-center gap-2 break-all text-road-ink underline hover:text-headlight"
                >
                  <EnvelopeIcon size={16} className="shrink-0 text-accent" />
                  <span>{business.email}</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-base tracking-wider text-headlight">Pages</h2>
            <ul className="mt-2.5 space-y-1.5 text-road-muted">
              <li><SiteLink href="/" className="text-road-ink hover:text-headlight">Home</SiteLink></li>
              <li><SiteLink href="/moves/" className="text-road-ink hover:text-headlight">Moves &amp; rates</SiteLink></li>
              <li><SiteLink href="/packing/" className="text-road-ink hover:text-headlight">Packing &amp; boxes</SiteLink></li>
              <li><SiteLink href="/trucks/" className="text-road-ink hover:text-headlight">Truck size guide</SiteLink></li>
              <li><SiteLink href="/checklist/" className="text-road-ink hover:text-headlight">Moving checklist</SiteLink></li>
              <li><SiteLink href="/contact/" className="text-road-ink hover:text-headlight">Request a quote</SiteLink></li>
            </ul>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-6 text-xs text-road-muted">
          <p>{business.name} · Sample site for the Jamstacks gallery — prices in AUD inc. GST.</p>
          <span>
            Packed &amp; shipped with{' '}
            <a className="text-road-ink underline hover:text-headlight" href="https://jamstacks.net">
              jamstacks.net
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
