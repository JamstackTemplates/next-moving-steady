'use client';

import { useEffect, useState } from 'react';
import { openingLabel, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

interface OpenBadgeProps {
  hours: readonly OpeningHours[];
  /** Neutral static text rendered before hydration and when JS is disabled. */
  fallback?: string;
  className?: string;
}

/** Browser-only office phone status in Australia/Brisbane, refreshed every minute. */
export function OpenBadge({
  hours,
  fallback = 'Office hours: Mon–Fri 07:00–17:30, Sat 08:00–12:00',
  className = '',
}: OpenBadgeProps) {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setLabel(openingLabel(hours, site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);

  const text = label ?? fallback;
  const isOpen = label?.startsWith('Open now') ?? false;

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        aria-hidden="true"
        className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full border border-current ${
          label === null ? 'bg-tape' : isOpen ? 'bg-teal' : 'bg-accent'
        }`}
      />
      <span>{text}</span>
    </span>
  );
}
