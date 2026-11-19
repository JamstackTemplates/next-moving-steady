'use client';

import { useState } from 'react';
import { resolveTruckForSize, type HomeSize } from '../content/home-sizes';
import type { Truck } from '../content/trucks';
import { TruckIllustration } from './artwork/trucks-art';
import { SiteLink } from './site-link';

interface TruckPickerProps {
  sizes: readonly HomeSize[];
  trucks: readonly Truck[];
  /** 'compact' for the Home road-band teaser, 'full' for /trucks/. */
  variant?: 'compact' | 'full';
  /** Default selected size ID. */
  defaultSizeId?: string;
}

export function TruckPicker({
  sizes,
  trucks,
  variant = 'full',
  defaultSizeId = 'three-bed',
}: TruckPickerProps) {
  const initial = sizes.find(s => s.id === defaultSizeId) ?? sizes[0];
  const [selectedId, setSelectedId] = useState(initial.id);

  const selected = sizes.find(s => s.id === selectedId) ?? sizes[0];
  const activeTrucks = trucks.filter(t => t.inService);
  const resolved = resolveTruckForSize(selected, trucks);

  const homes = sizes.filter(s => s.kind === 'home');
  const offices = sizes.filter(s => s.kind === 'office');

  // Fill ratio for trip 1 and optional trip 2
  const trip1Fill = resolved
    ? Math.min(1, selected.volumeM3 / resolved.truck.capacityM3)
    : 0;
  const trip2Fill =
    resolved && resolved.trips > 1
      ? Math.min(1, Math.max(0, (selected.volumeM3 - resolved.truck.capacityM3) / resolved.truck.capacityM3))
      : 0;

  if (variant === 'compact') {
    return (
      <div className="space-y-6">
        {/* Home-size chips */}
        <div
          role="group"
          aria-label="Choose your home or office size"
          className="flex flex-wrap gap-2"
        >
          {sizes.map(size => {
            const isSelected = size.id === selected.id;
            return (
              <button
                key={size.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedId(size.id)}
                className={`border-2 px-3.5 py-2 text-sm font-bold transition-colors ${
                  isSelected
                    ? 'border-headlight bg-accent text-on-accent shadow-[3px_3px_0_#000]'
                    : 'border-white/25 bg-white/5 text-road-ink hover:border-headlight hover:bg-white/10'
                }`}
              >
                {size.label}
              </button>
            );
          })}
        </div>

        {/* Lineup + oversized volume readout */}
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_14rem]">
          <div className="grid items-end gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {activeTrucks.map(truck => {
              const isMatch = resolved?.truck.id === truck.id;
              return (
                <div
                  key={truck.id}
                  className={`flex flex-col justify-end border-b-4 pb-3 transition-opacity ${
                    isMatch
                      ? 'border-accent opacity-100'
                      : 'border-white/15 opacity-55'
                  }`}
                >
                  <TruckIllustration
                    truck={truck}
                    fillRatio={isMatch ? trip1Fill : 0}
                    highlighted={isMatch}
                    showGauge={false}
                    compact
                  />
                  <div className="mt-2 flex items-baseline justify-between gap-2 text-xs">
                    <span className={`font-display text-sm tracking-wider ${isMatch ? 'text-headlight' : 'text-road-muted'}`}>
                      {truck.name}
                    </span>
                    <span className="tabular text-road-muted">${truck.hourlyRate}/h</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Oversized volume numeral at right */}
          <div className="border-2 border-white/20 bg-black/35 p-4 text-road-ink">
            <p className="font-marker text-xs text-headlight">ESTIMATED LOAD</p>
            <p className="mt-1 font-display text-6xl leading-none tabular text-on-accent">
              {selected.volumeM3} <span className="text-3xl text-headlight">m³</span>
            </p>
            {resolved ? (
              <p className="mt-3 text-sm leading-snug text-road-muted">
                <strong className="text-road-ink">{resolved.truck.name}</strong>
                {resolved.trips > 1 ? ` · ${resolved.trips} trips` : ''} · {resolved.truck.crew} movers ·{' '}
                <span className="tabular font-bold text-headlight">${resolved.truck.hourlyRate}/h</span>
              </p>
            ) : null}
            <SiteLink href="/trucks/" className="mt-4 inline-block text-sm font-bold text-headlight underline">
              Open full truck guide →
            </SiteLink>
          </div>
        </div>

        <NoScriptLookupTable sizes={sizes} trucks={trucks} dark />
      </div>
    );
  }

  // Full interactive picker on /trucks/
  return (
    <div className="space-y-6">
      <div className="grid gap-8 lg:grid-cols-[18.5rem_1fr]">
        {/* Left rail: Home then Office options (horizontal scroll strip on mobile) */}
        <div className="space-y-5">
          <div>
            <p className="font-display text-sm tracking-wider text-muted">Homes</p>
            <div
              role="group"
              aria-label="Home sizes"
              className="mt-2 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
            >
              {homes.map(size => {
                const isSelected = size.id === selected.id;
                return (
                  <button
                    key={size.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedId(size.id)}
                    className={`shrink-0 border-2 px-3.5 py-2.5 text-left text-sm font-bold transition-colors lg:w-full ${
                      isSelected
                        ? 'border-ink bg-accent text-on-accent shadow-[4px_4px_0_var(--road)]'
                        : 'border-ink bg-surface text-ink hover:bg-kraft-soft'
                    }`}
                  >
                    <span className="block">{size.label}</span>
                    <span className={`block text-xs tabular ${isSelected ? 'text-on-accent/85' : 'text-muted'}`}>
                      About {size.volumeM3} m³
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="font-display text-sm tracking-wider text-muted">Offices</p>
            <div
              role="group"
              aria-label="Office sizes"
              className="mt-2 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
            >
              {offices.map(size => {
                const isSelected = size.id === selected.id;
                return (
                  <button
                    key={size.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedId(size.id)}
                    className={`shrink-0 border-2 px-3.5 py-2.5 text-left text-sm font-bold transition-colors lg:w-full ${
                      isSelected
                        ? 'border-ink bg-accent text-on-accent shadow-[4px_4px_0_var(--road)]'
                        : 'border-ink bg-surface text-ink hover:bg-kraft-soft'
                    }`}
                  >
                    <span className="block">{size.label}</span>
                    <span className={`block text-xs tabular ${isSelected ? 'text-on-accent/85' : 'text-muted'}`}>
                      About {size.volumeM3} m³
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right stage: Big side-on truck with cargo box filling + capacity gauge + readout */}
        <div className="carton-panel corrugated-bottom flex flex-col justify-between p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-ink/20 pb-4">
            <div>
              <span className="font-marker text-sm text-accent-ink">RECOMMENDED LOAD</span>
              <h2 className="mt-1 font-display text-3xl leading-none text-ink sm:text-4xl">
                {resolved ? resolved.truck.name : 'Ask our office'}
              </h2>
            </div>
            <div className="text-right tabular">
              <p className="font-display text-4xl leading-none text-accent-ink sm:text-5xl">
                {selected.volumeM3} m³
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-muted">
                Estimated load volume
              </p>
            </div>
          </div>

          {/* Truck bay drawing (drawn twice for 2-trip loads) */}
          {resolved ? (
            <div className="my-6 space-y-6">
              <div>
                {resolved.trips > 1 ? (
                  <p className="mb-1 font-marker text-xs text-muted">LOAD 1 OF {resolved.trips}</p>
                ) : null}
                <TruckIllustration
                  key={`${selected.id}-1`}
                  truck={resolved.truck}
                  fillRatio={trip1Fill}
                  highlighted
                  showGauge
                  className="mx-auto w-full max-w-xl text-ink"
                />
              </div>

              {resolved.trips > 1 ? (
                <div>
                  <p className="mb-1 font-marker text-xs text-muted">LOAD 2 OF {resolved.trips}</p>
                  <TruckIllustration
                    key={`${selected.id}-2`}
                    truck={resolved.truck}
                    fillRatio={trip2Fill}
                    highlighted
                    showGauge
                    className="mx-auto w-full max-w-xl text-ink"
                  />
                </div>
              ) : null}
            </div>
          ) : null}

          {/* Readout bar */}
          {resolved ? (
            <div className="border-2 border-ink bg-surface p-4" aria-live="polite">
              <p className="text-base font-bold text-ink tabular sm:text-lg">
                {selected.label} · about {selected.volumeM3} m³ · {resolved.truck.name}
                {resolved.trips > 1 ? ` (${resolved.trips} trips)` : ''} · {resolved.truck.crew} movers · $
                {resolved.truck.hourlyRate}/h
              </p>
              <p className="mt-1 text-sm text-muted tabular">
                Minimum {resolved.truck.minimumHours} hours · {resolved.truck.bodyLengthM} m cargo body ·{' '}
                {resolved.truck.tonnes} tonne truck ({resolved.truck.capacityM3} m³ capacity per load).
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <SiteLink href="/contact/" className="button">
                  Request a moving quote
                </SiteLink>
                <SiteLink href="/moves/#home" className="button button-quiet">
                  See what&apos;s included
                </SiteLink>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <NoScriptLookupTable sizes={sizes} trucks={trucks} />
    </div>
  );
}

function NoScriptLookupTable({
  sizes,
  trucks,
  dark = false,
}: {
  sizes: readonly HomeSize[];
  trucks: readonly Truck[];
  dark?: boolean;
}) {
  return (
    <noscript>
      <div className={`mt-6 border-2 p-4 ${dark ? 'border-white/25 bg-black/30 text-road-ink' : 'border-ink bg-surface text-ink'}`}>
        <p className="mb-3 text-sm font-bold">Truck size guide (static table — enable JavaScript for the interactive loader):</p>
        <div className="table-wrap">
          <table className="steady-table text-sm">
            <thead>
              <tr>
                <th>Home / office size</th>
                <th>Est. volume</th>
                <th>Recommended truck</th>
                <th>Trips</th>
                <th>Hourly rate</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map(size => {
                const match = resolveTruckForSize(size, trucks);
                return (
                  <tr key={size.id}>
                    <th>{size.label}</th>
                    <td>{size.volumeM3} m³</td>
                    <td>{match ? match.truck.name : '—'}</td>
                    <td>{match ? match.trips : '—'}</td>
                    <td>{match ? `$${match.truck.hourlyRate}/h` : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </noscript>
  );
}
