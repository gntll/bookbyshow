import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { PriceComparisonModal } from '@/components/common/PriceComparisonModal';
import { InteractiveSeatMapModal } from '@/components/common/InteractiveSeatMapModal';
import { TrailerModal } from '@/components/common/TrailerModal';
import { PriceAlertModal } from '@/components/common/PriceAlertModal';
import { CitySelectorModal } from '@/components/common/CitySelectorModal';
import { GlobalSearchModal } from '@/components/search/GlobalSearchModal';
import { CookieConsent } from '@/components/common/CookieConsent';
import { ShowScoutModal } from '@/components/ai/ShowScoutModal';
import { ShowScoutFloatingButton } from '@/components/ai/ShowScoutFloatingButton';
import { SeatAdvisorModal } from '@/components/ai/SeatAdvisorModal';
import { EveningPlannerModal } from '@/components/ai/EveningPlannerModal';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bookbyshow.com'),
  title: 'BookByShow | Compare Movie Showtimes & Live Event Tickets',
  description:
    'The premier entertainment aggregator. Compare showtimes, seat availability, and ticket prices across AMC, Regal, Cinemark, Ticketmaster, and Fandango with 100% price transparency and zero surprise fees.',
  keywords: [
    'movie tickets aggregator',
    'compare showtimes',
    'IMAX 70mm tickets',
    'Dolby Cinema showtimes',
    'cheap movie tickets',
    'concert ticket price comparison',
    'Taylor Swift tickets',
    'AMC showtimes',
    'Regal cinemas',
    'Ticketmaster vs StubHub',
    'BookByShow',
  ],
  authors: [{ name: 'BookByShow Editorial Team' }],
  creator: 'BookByShow Inc.',
  publisher: 'BookByShow Inc.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'BookByShow | Compare Every Seat. Book Every Show. Guaranteed Best Price.',
    description:
      'Compare movie showtimes and concert tickets across all major providers with 100% fee transparency.',
    url: 'https://bookbyshow.com',
    siteName: 'BookByShow',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'BookByShow Entertainment Aggregator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BookByShow | Compare Movie Showtimes & Event Tickets',
    description:
      'Compare ticket prices and fees across AMC, Regal, Cinemark, and Ticketmaster.',
    creator: '@bookbyshow',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'fo-verify': '3597a55d-72a7-4af2-804b-6dd251c401b9',
  },
};

export const viewport: Viewport = {
  themeColor: '#06080e',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BookByShow',
    url: 'https://bookbyshow.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://bookbyshow.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BookByShow',
    url: 'https://bookbyshow.com',
    logo: 'https://bookbyshow.com/icon.svg',
    sameAs: [
      'https://twitter.com/bookbyshow',
      'https://facebook.com/bookbyshow',
      'https://instagram.com/bookbyshow',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'support@bookbyshow.com',
      contactType: 'customer support',
      availableLanguage: 'English',
    },
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        {/* Google AdSense Publisher Tag */}
        {adsenseClientId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
          />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {/* Impact.com Universal Tracking & Publisher Verification Tag */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(i,m,p,a,c,t){c.ire_o=p;c[p]=c[p]||function(){(c[p].a=c[p].a||[]).push(arguments)};t=a.createElement(m);var z=a.getElementsByTagName(m)[0];t.async=1;t.src=i;z.parentNode.insertBefore(t,z)})('https://utt.impactcdn.com/P-A7792432-7267-4f67-9f57-6687ff5764db1.js','script','impactStat',document,window);impactStat('transformLinks');impactStat('trackImpression');`,
          }}
        />
        {/* FlexOffers Publisher Verification Meta Tag */}
        <meta name="fo-verify" content="3597a55d-72a7-4af2-804b-6dd251c401b9" />
      </head>
      <body className="min-h-full flex flex-col bg-[#060709] text-[#fafafa] selection:bg-[#e51821] selection:text-white">
        <AppProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileNav />

          {/* Global Modals */}
          <PriceComparisonModal />
          <InteractiveSeatMapModal />
          <TrailerModal />
          <PriceAlertModal />
          <CitySelectorModal />
          <GlobalSearchModal />
          <CookieConsent />

          {/* AI Modals & Floating Concierge */}
          <ShowScoutModal />
          <SeatAdvisorModal />
          <EveningPlannerModal />
          <ShowScoutFloatingButton />
        </AppProvider>
      </body>
    </html>
  );
}
