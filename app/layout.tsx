import '@fontsource/anton';
import '@fontsource-variable/hanken-grotesk';
import '@fontsource/permanent-marker';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { buildMetaDescription, business } from '../content/business';
import { asset } from '../lib/paths';
import { site } from '../lib/site';
import './tailwind.input.css';

const description = buildMetaDescription();
const ogImage = asset('/og.png');

export const metadata: Metadata = {
  title: { default: `${business.name} — Brisbane Removalists`, template: `%s — ${business.name}` },
  description,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: {
    type: 'website',
    siteName: business.name,
    title: `${business.name} — ${business.tagline}`,
    description,
    images: [{ url: ogImage, width: 1200, height: 630, alt: `${business.name} — Brisbane removalists` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${business.name} — ${business.tagline}`,
    description,
    images: [ogImage],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <ThemeScript />
      </head>
      <body>
        <ThemeProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
