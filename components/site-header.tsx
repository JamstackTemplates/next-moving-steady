'use client';

import { useId, useState } from 'react';
import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { CloseIcon, MenuIcon, PhoneIcon, WaveMark } from './artwork/icons';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';

const NAV_LINKS = [
  { href: '/moves/', label: 'Moves' },
  { href: '/packing/', label: 'Packing' },
  { href: '/trucks/', label: 'Truck guide' },
  { href: '/checklist/', label: 'Checklist' },
  { href: '/contact/', label: 'Contact' },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  return (
    <header className="sticky top-0 z-40 bg-road text-road-ink">
      {/* Compact top utility strip on desktop with office status */}
      <div className="hidden border-b border-white/10 bg-black/25 text-xs text-road-muted lg:block">
        <div className="wrap flex items-center justify-between py-1.5">
          <OpenBadge
            hours={business.officeHours}
            fallback={`Brisbane office: ${business.officeHoursSummary}`}
          />
          <span>{business.movingDays} Phone &amp; email office — Greater Brisbane &amp; East Coast</span>
        </div>
      </div>

      {/* Main header bar */}
      <div className="wrap flex min-h-18 items-center justify-between gap-2 py-2.5 sm:gap-3">
        {/* Wordmark: DECKHAND in Anton + REMOVALS on orange tab + wave mark */}
        <SiteLink
          href="/"
          className="group flex min-w-0 shrink items-center gap-2 no-underline hover:no-underline"
          onClick={() => setOpen(false)}
        >
          <span className="flex flex-col leading-none">
            <span className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-display text-lg tracking-wider text-road-ink sm:text-2xl">
                DECKHAND
              </span>
              <span className="bg-accent px-1 py-0.5 font-display text-[0.58rem] tracking-[0.1em] text-on-accent sm:px-1.5 sm:text-[0.68rem]">
                REMOVALS
              </span>
            </span>
            <WaveMark className="mt-0.5 h-3 w-14 text-accent transition-transform group-hover:translate-x-1 sm:w-16" />
          </span>
        </SiteLink>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map(link => (
            <SiteLink
              key={link.href}
              href={link.href}
              markCurrent="page"
              className="px-3 py-2 text-sm font-semibold text-road-ink no-underline transition-colors hover:text-headlight aria-[current=page]:underline aria-[current=page]:decoration-accent aria-[current=page]:decoration-[3px] aria-[current=page]:underline-offset-8"
            >
              {link.label}
            </SiteLink>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${business.phoneE164}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold tabular text-road-ink no-underline hover:text-headlight"
          >
            <PhoneIcon size={16} className="text-accent" />
            <span>{business.phone}</span>
          </a>
          <SiteLink href="/contact/" className="button button-on-dark min-h-10 px-4 py-1.5 text-sm">
            Request a quote
          </SiteLink>
          <DarkModeToggle />
        </div>

        {/* Mobile actions: phone icon link, theme toggle, disclosure menu button */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:hidden">
          <a
            href={`tel:${business.phoneE164}`}
            aria-label={`Call ${business.phone}`}
            className="inline-flex h-9 w-9 items-center justify-center border-2 border-white/25 bg-white/5 text-road-ink hover:border-accent sm:h-10 sm:w-10"
          >
            <PhoneIcon size={17} />
          </a>
          <DarkModeToggle />
          <button
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen(prev => !prev)}
            className="inline-flex h-9 items-center gap-1 border-2 border-white/30 bg-white/10 px-2.5 text-xs font-bold text-road-ink hover:border-accent sm:h-10 sm:px-3 sm:text-sm"
          >
            {open ? <CloseIcon size={16} /> : <MenuIcon size={16} />}
            <span>{open ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile full-width disclosure panel */}
      <nav
        id={menuId}
        aria-label="Mobile menu"
        hidden={!open}
        className="border-t border-white/15 bg-road lg:hidden"
      >
        <div className="wrap grid gap-2 py-4">
          {NAV_LINKS.map(link => (
            <SiteLink
              key={link.href}
              href={link.href}
              markCurrent="page"
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-2.5 font-display text-xl tracking-wider text-road-ink no-underline hover:text-headlight aria-[current=page]:text-accent-ink"
            >
              {link.label}
            </SiteLink>
          ))}
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3 pt-1">
            <SiteLink
              href="/contact/"
              onClick={() => setOpen(false)}
              className="button button-on-dark w-full text-center"
            >
              Request a quote
            </SiteLink>
            <p className="text-xs text-road-muted">
              <OpenBadge
                hours={business.officeHours}
                fallback={business.officeHoursSummary}
              />
            </p>
          </div>
        </div>
      </nav>

      {/* No-JS mobile navigation fallback */}
      <noscript>
        <nav aria-label="Site links" className="border-t border-white/15 bg-road py-2 lg:hidden">
          <div className="wrap flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
            {NAV_LINKS.map(link => (
              <SiteLink key={link.href} href={link.href} className="text-road-ink underline">
                {link.label}
              </SiteLink>
            ))}
          </div>
        </nav>
      </noscript>

      {/* Orange livery bottom stripe */}
      <div className="h-2.5 w-full overflow-hidden bg-teal" aria-hidden="true">
        <div className="livery-stripe-enter h-full w-full bg-[linear-gradient(102deg,var(--accent)_0_76%,var(--surface)_76%_79%,var(--teal)_79%_100%)]" />
      </div>
    </header>
  );
}
