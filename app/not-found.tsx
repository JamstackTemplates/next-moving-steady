import { LostInTransitArt } from '../components/artwork/scene-illustrations';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return (
    <section className="bg-bg py-14 sm:py-20">
      <div className="wrap max-w-3xl text-center">
        <span className="inline-block -rotate-1 border-2 border-ink bg-surface px-3 py-1 font-marker text-sm text-accent-ink shadow-[3px_3px_0_var(--road)]">
          ERROR 404 · LOST IN TRANSIT
        </span>
        <h1 className="mt-4 font-display text-5xl leading-none text-ink sm:text-6xl">
          This page fell off the truck
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-base text-muted sm:text-lg">
          That address is not on our run sheet. Head back to the depot, size up a truck, or send us
          a quote enquiry.
        </p>

        <div className="carton-surface mx-auto mt-8 overflow-hidden p-2">
          <LostInTransitArt />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <SiteLink href="/" className="button">
            Back to Home
          </SiteLink>
          <SiteLink href="/trucks/" className="button button-quiet">
            Truck guide
          </SiteLink>
          <SiteLink href="/contact/" className="button button-quiet">
            Request a quote
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
