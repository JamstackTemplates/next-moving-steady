import type { Metadata } from 'next';
import { MarkerTickIcon } from '../../components/artwork/icons';
import { FirstNightBoxArt } from '../../components/artwork/scene-illustrations';
import { ClosingBand } from '../../components/home-sections';
import { MovingChecklist } from '../../components/moving-checklist';
import { PageHead } from '../../components/page-head';
import { checklistGroups, checklistTasks, firstNightBox } from '../../content/checklist';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Moving checklist',
  description:
    'A free, printable Brisbane moving checklist from eight weeks out to moving day, with tick-off progress and a first-night box list.',
  alternates: { canonical: absoluteUrl('/checklist/') },
};

export default function ChecklistPage() {
  return (
    <>
      <PageHead eyebrow="LOAD 04 · MOVING CHECKLIST" title="Your moving checklist" art="cartons">
        <p>
          Tick tasks off in your browser as you go, or print a clean copy with empty boxes to stick
          on the fridge.
        </p>
      </PageHead>

      {/* Section 2: Interactive & printable clipboard checklist */}
      <section className="border-b-[3px] border-ink bg-bg py-12 sm:py-16">
        <div className="wrap">
          <MovingChecklist groups={checklistGroups} tasks={checklistTasks} />
        </div>
      </section>

      {/* Section 3: First-night box */}
      <section className="border-b-[3px] border-ink bg-surface py-14 sm:py-16">
        <div className="wrap max-w-4xl">
          <div className="carton-panel corrugated-bottom grid items-center gap-8 p-6 sm:p-8 md:grid-cols-[0.85fr_1.15fr]">
            <div className="mx-auto w-full max-w-xs">
              <FirstNightBoxArt />
            </div>

            <div>
              <span className="font-marker text-sm text-accent-ink">KEEP IN THE CAR WITH YOU</span>
              <h2 className="mt-1 font-display text-3xl leading-none text-ink sm:text-4xl">
                The first-night box
              </h2>
              <p className="mt-2 text-sm text-muted">
                Pack one open-top carton that travels in your own car so you do not have to dig
                through twenty boxes for a mug or a phone charger.
              </p>

              <ul className="mt-5 grid gap-2.5 text-sm font-semibold text-ink sm:grid-cols-2">
                {firstNightBox.map(item => (
                  <li key={item} className="flex items-start gap-2 border border-ink/25 bg-surface px-3 py-2">
                    <MarkerTickIcon size={16} className="mt-0.5 shrink-0 text-teal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="no-print">
        <ClosingBand
          heading="Ready to lock in a date?"
          body="Send through your preferred move date, suburbs and room list. Our Brisbane office replies with a written quote."
          actionLabel="Request a moving quote"
        />
      </div>
    </>
  );
}
