import type { Metadata } from 'next';
import { LiveryStripeDivider } from '../components/artwork/dividers';
import {
  ChecklistTeaserSection,
  ClosingBand,
  Hero,
  InterstateBoardSection,
  MoveDaySection,
  PickYourMoveSection,
  TruckTeaserBand,
} from '../components/home-sections';
import { TruckPicker } from '../components/truck-picker';
import { checklistTasks } from '../content/checklist';
import { homeSizes } from '../content/home-sizes';
import { routes } from '../content/routes';
import { getMoveTypes } from '../content/services';
import { startingHourlyRate, trucks } from '../content/trucks';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

const MOVE_DAY_STEPS = [
  {
    number: '01',
    title: 'Quote',
    body: 'Send your room list, suburbs and preferred date. We reply with a written hourly or interstate quote.',
  },
  {
    number: '02',
    title: 'Pre-pack',
    body: 'Pack yourself with our cartons, or have our packing crew wrap and label the day before.',
  },
  {
    number: '03',
    title: 'Load',
    body: 'Blankets, shrink wrap, trolleys and ramps come off the truck first. Heavy pieces strapped in tight.',
  },
  {
    number: '04',
    title: 'Drive',
    body: 'Straight to the new place across South East Queensland, or down the highway on our weekly runs.',
  },
  {
    number: '05',
    title: 'Unload and set up',
    body: 'Beds and tables reassembled, cartons placed in the right rooms, blankets folded back on board.',
  },
] as const;

export default function HomePage() {
  const fromRate = startingHourlyRate();
  const services = getMoveTypes();
  const eightWeeksTasks = checklistTasks.filter(t => t.groupId === 'eight-weeks').slice(0, 5);

  return (
    <>
      <Hero>
        <Hero.Heading>
          Big move?
          <br />
          Steady
          <br />
          hands.
        </Hero.Heading>
        <Hero.Introduction>
          Local, office and interstate moves out of Brisbane, at a fixed hourly rate from{' '}
          <strong className="tabular text-ink">${fromRate}</strong>. Blankets, trolleys and tape come
          on every truck.
        </Hero.Introduction>
        <Hero.Actions>
          <Hero.PrimaryAction href="/contact/">Request a moving quote</Hero.PrimaryAction>
          <Hero.SecondaryAction href="/trucks/">Which truck do I need?</Hero.SecondaryAction>
        </Hero.Actions>
      </Hero>

      <Hero.FactStrip
        facts={[
          `Fixed hourly rates from $${fromRate}/h (inc. GST)`,
          'Quilted blankets, wrap and trolleys on every truck',
          'Weekly east-coast interstate runs from Brisbane',
        ]}
      />

      <PickYourMoveSection
        heading="Pick your move"
        intro="Clear rates, real truck sizes, and a crew that turns up on time."
        services={services}
      />

      <TruckTeaserBand
        heading="Which truck fits your load?"
        intro="Pick your home or office size to see which boat in our fleet handles the job."
      >
        <TruckPicker sizes={homeSizes} trucks={trucks} variant="compact" defaultSizeId="three-bed" />
      </TruckTeaserBand>

      <MoveDaySection
        heading="How a move day runs"
        intro="Five straightforward steps from your first enquiry to the last carton off the tail-lift."
        steps={MOVE_DAY_STEPS}
      />

      <LiveryStripeDivider />

      <InterstateBoardSection
        heading="Interstate route board"
        intro="Weekly shared-load trucks leave our Brisbane depot every Monday through Friday."
        routes={routes}
      />

      <ChecklistTeaserSection
        heading="Start eight weeks out"
        intro="A free, printable moving checklist you can tick off as you go — plus the first-night box list so you can still make a cup of tea at 9 pm."
        tasks={eightWeeksTasks}
      />

      <ClosingBand
        heading="Tell us what's moving"
        body="Send through your suburbs, home size and ideal date. Our Brisbane office replies with a clear written quote — no guesswork, no surprise add-ons."
        actionLabel="Request a moving quote"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
