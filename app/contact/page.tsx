import type { Metadata } from 'next';
import { ClockIcon, EnvelopeIcon, MarkerTickIcon, PhoneIcon } from '../../components/artwork/icons';
import { CopyEmail } from '../../components/copy-email';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { OpenBadge } from '../../components/open-badge';
import { PageHead } from '../../components/page-head';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Request a moving quote',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);

  return (
    <>
      <PageHead eyebrow="LOAD 05 · QUOTE ENQUIRY" title={business.enquiries.title} art="cartons">
        <p>{business.enquiries.introduction}</p>
      </PageHead>

      <section className="bg-bg py-12 sm:py-16">
        <div className="wrap grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Left column: Consignment note checklist + contact details, office hours & service area */}
          <div className="space-y-6">
            <div className="carton-surface p-6">
              <div className="flex items-center justify-between border-b-2 border-ink pb-3">
                <h2 className="font-display text-2xl leading-none text-ink">
                  What to put in your message
                </h2>
                <span className="font-marker text-xs text-accent-ink">CONSIGNMENT NOTE</span>
              </div>
              <p className="mt-3 text-sm text-muted">
                The form takes your name, email and message. Including these details helps our
                dispatcher reply with an accurate written quote first go:
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-ink">
                {business.enquiries.usefulToInclude.map(tip => (
                  <li key={tip} className="flex items-start gap-2.5">
                    <MarkerTickIcon size={17} className="mt-0.5 shrink-0 text-accent-ink" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct email, phone, office hours & service area */}
            <aside aria-label="Brisbane office contact details" className="carton-surface p-6 space-y-5">
              <div>
                <h2 className="font-display text-xl text-ink">Email &amp; phone</h2>
                <div className="mt-3 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      className="text-link inline-flex items-center gap-2 break-all text-base"
                      href={`mailto:${business.email}`}
                    >
                      <EnvelopeIcon size={18} className="shrink-0" />
                      <span>{business.email}</span>
                    </a>
                    <CopyEmail email={business.email} />
                  </div>
                  <p>
                    <a
                      className="inline-flex items-center gap-2 font-display text-2xl tracking-wide tabular text-ink no-underline hover:text-accent-ink hover:underline"
                      href={`tel:${business.phoneE164}`}
                    >
                      <PhoneIcon size={20} className="text-accent-ink" />
                      <span>{business.phone}</span>
                    </a>
                  </p>
                </div>
              </div>

              <div className="border-t border-line pt-4">
                <h3 className="flex items-center gap-2 font-display text-lg text-ink">
                  <ClockIcon size={18} className="text-teal" />
                  <span>Office phone hours</span>
                </h3>
                <p className="mt-2 text-sm font-bold text-ink">
                  <OpenBadge
                    hours={business.officeHours}
                    fallback={business.officeHoursSummary}
                  />
                </p>
                <ul className="mt-2 space-y-1 text-sm text-muted tabular">
                  <li>Mon–Fri: 07:00–17:30</li>
                  <li>Saturday: 08:00–12:00</li>
                  <li>Sunday: Closed</li>
                </ul>
                <p className="mt-2 text-xs text-muted">
                  {business.movingDays} All times AEST (Australia/Brisbane). Phone and email office
                  only — no walk-in counter.
                </p>
              </div>

              <div className="border-t border-line pt-4">
                <h3 className="font-display text-lg text-ink">Service area</h3>
                <p className="mt-1.5 text-sm text-muted">{business.serviceAreaSummary}</p>
              </div>
            </aside>
          </div>

          {/* Right column: Hosted Jamstacks form or email fallback on a kraft carton panel */}
          <div className="space-y-4">
            <div className="carton-panel corrugated-bottom relative p-6 sm:p-8">
              {/* Angled tape strip across top corner */}
              <div className="no-print absolute -top-3.5 right-6 rotate-3" aria-hidden="true">
                <span className="tape-strip text-[0.7rem]">QUOTE ENQUIRY</span>
              </div>

              <section aria-label="Quote enquiry form">
                {hosted ? (
                  <JamstacksSupportForm
                    siteId={site.jamstacksSite}
                    embedUrl={site.jamstacksEmbedUrl}
                    email={business.email}
                  />
                ) : (
                  <div className="border-2 border-ink bg-surface p-6">
                    <h2 className="font-display text-2xl text-ink">Email your quote enquiry</h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      The online enquiry form is not connected on this preview. Send your move
                      details straight to{' '}
                      <a className="text-link break-all" href={`mailto:${business.email}`}>
                        {business.email}
                      </a>{' '}
                      or call{' '}
                      <a className="text-link tabular" href={`tel:${business.phoneE164}`}>
                        {business.phone}
                      </a>{' '}
                      during office hours.
                    </p>
                    <div className="mt-4">
                      <a className="button" href={`mailto:${business.email}?subject=Moving%20quote%20enquiry`}>
                        Email {business.email}
                      </a>
                    </div>
                  </div>
                )}
              </section>
            </div>

            {/* Required enquiry wording note */}
            <p className="border-l-4 border-accent bg-surface px-4 py-3 text-sm text-muted">
              <strong className="text-ink">Enquiry note:</strong> {business.enquiries.disclaimer} No
              payments or deposits are taken through this website.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
