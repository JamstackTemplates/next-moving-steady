import type { ReactNode } from 'react';
import { CartonStackSlice, TruckLineupSlice } from './artwork/trucks-art';

interface PageHeadProps {
  /** Marker carton sublabel such as "LOAD 02 · TRUCK GUIDE". */
  eyebrow: string;
  /** Large Anton page title. */
  title: string;
  /** Optional right-edge artwork slice. */
  art?: 'trucks' | 'cartons';
  children?: ReactNode;
}

/** Orange truck-livery page header for all inner pages. */
export function PageHead({ eyebrow, title, art = 'trucks', children }: PageHeadProps) {
  return (
    <section className="livery-band relative overflow-hidden border-b-[3px] border-ink">
      <div className="wrap relative z-10 grid items-end gap-6 py-10 sm:py-12 md:grid-cols-[1fr_auto]">
        <div className="max-w-2xl">
          <span className="inline-block -rotate-1 border-2 border-[#1E1915] bg-[#FFFBF4] px-3 py-1 font-marker text-xs tracking-wide text-[#1E1915] shadow-[3px_3px_0_#1E1915] sm:text-sm">
            {eyebrow}
          </span>
          <h1 className="mt-4 font-display text-4xl leading-[0.98] tracking-wide text-on-accent sm:text-6xl">
            {title}
          </h1>
          {children ? (
            <div className="mt-3 max-w-xl text-base leading-relaxed text-on-accent/95 sm:text-lg">
              {children}
            </div>
          ) : null}
        </div>

        <div className="no-print hidden w-56 shrink-0 translate-y-2 md:block lg:w-64" aria-hidden="true">
          {art === 'cartons' ? <CartonStackSlice /> : <TruckLineupSlice />}
        </div>
      </div>
    </section>
  );
}
