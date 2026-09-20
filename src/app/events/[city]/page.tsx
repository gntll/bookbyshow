import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { METRO_MARKETS, getMarketBySlug } from '@/data/metroMarkets';
import { getAutoUpdatedEvents } from '@/services/events';
import { EventCard } from '@/components/home/EventCard';
import { Music, MapPin, ChevronRight, CheckCircle2, Star, HelpCircle } from 'lucide-react';
import { AdBanner } from '@/components/ads/AdBanner';

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return METRO_MARKETS.map((market) => ({
    city: market.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const market = getMarketBySlug(city);
  if (!market) return { title: 'Live Events & Concerts | BookByShow' };

  const title = `Live Concerts & Events in ${market.name}, ${market.stateCode} | Compare Ticket Prices`;
  const description = `Compare primary and verified resale ticket prices across Ticketmaster, StubHub, SeatGeek & AXS for live concerts, sports and theatre in ${market.name}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://bookbyshow.com/events/${market.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://bookbyshow.com/events/${market.slug}`,
      siteName: 'BookByShow',
      type: 'website',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(`Live Events in ${market.name}`)}&badge=${encodeURIComponent(`${market.name} Shows`)}&type=event`,
          width: 1200,
          height: 630,
          alt: `Live Events in ${market.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        `/api/og?title=${encodeURIComponent(`Live Events in ${market.name}`)}&badge=${encodeURIComponent(`${market.name} Shows`)}&type=event`,
      ],
    },
  };
}

export default async function CityEventsPage({ params }: Props) {
  const { city } = await params;
  const market = getMarketBySlug(city);

  if (!market) {
    notFound();
  }

  const allEvents = getAutoUpdatedEvents();
  // Filter or localize events for this city
  const cityEvents = allEvents.map((e, idx) => ({
    ...e,
    venueCity: `${market.name}, ${market.stateCode}`,
    venueName: market.featuredVenues[idx % market.featuredVenues.length] || e.venueName,
  }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Live Events & Concerts in ${market.name}, ${market.stateCode}`,
    description: `Upcoming live concerts, stadium tours, and sporting events in ${market.name}.`,
    itemListElement: cityEvents.map((e, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Event',
        name: e.title,
        startDate: e.date,
        location: {
          '@type': 'Place',
          name: e.venueName,
          address: {
            '@type': 'PostalAddress',
            addressLocality: market.name,
            addressRegion: market.stateCode,
            addressCountry: 'US',
          },
        },
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: e.minPrice,
          highPrice: e.maxPrice,
          priceCurrency: 'USD',
          offerCount: e.quotes.length,
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://bookbyshow.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Events',
        item: 'https://bookbyshow.com/events',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: market.name,
        item: `https://bookbyshow.com/events/${market.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#060709] pb-24 text-neutral-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Hero Header */}
      <div className="border-b border-neutral-800 bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-neutral-400 mb-3">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/events" className="hover:text-white transition-colors">Events</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#e51821]">{market.name}</span>
          </nav>

          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded-md bg-red-950/70 text-red-300 border border-red-500/40">
              <Music className="w-3.5 h-3.5 text-[#e51821]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#e51821]">
              Live Concert & Tour Aggregator
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Concerts & Live Events in {market.name}, {market.stateCode}
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 mt-2 max-w-3xl leading-relaxed">
            Compare primary and resale ticket prices across Ticketmaster, StubHub, SeatGeek, and AXS for live concerts, comedy, and sports in {market.name}.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-neutral-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#e51821]" />
              <strong>{market.featuredVenues.length}+</strong> Premier Arenas & Amphitheatres
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#e51821]" />
              Primary vs. Resale Fee Comparison
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#e51821]" />
              Auto-Updating Upcoming Dates
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Featured Venues Spotlight */}
        <div className="p-6 rounded-2xl bg-[#0e1015] border border-neutral-800 shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span>Top Performance Venues in {market.name}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {market.featuredVenues.map((venue, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm font-semibold text-white flex items-center gap-2.5"
              >
                <MapPin className="w-4 h-4 text-[#e51821] shrink-0" />
                <span>{venue}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Upcoming Live Shows & Tours in {market.name}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cityEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        {/* AdSense Placement */}
        <AdBanner format="leaderboard" />

        {/* Local FAQs */}
        <div className="p-8 rounded-2xl bg-[#0e1015] border border-neutral-800 space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#e51821]" />
            <h2 className="text-xl font-bold text-white">
              Ticketing Advice for Live Shows in {market.name}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <h3 className="font-bold text-white text-base">
                How can I avoid excessive secondary markup fees in {market.name}?
              </h3>
              <p className="text-sm text-neutral-300 mt-1 leading-relaxed">
                Whenever available, always purchase from the authorized primary box office partner (usually Ticketmaster or AXS) before looking at secondary resale platforms. BookByShow labels primary tickets clearly so you don&apos;t pay 40%–150% scalper premiums on sold-out shows.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <h3 className="font-bold text-white text-base">
                When is the best time to purchase concert tickets in {market.name}?
              </h3>
              <p className="text-sm text-neutral-300 mt-1 leading-relaxed">
                Use BookByShow&apos;s AI &quot;Buy Now vs. Wait&quot; predictor. For high-demand stadium tours with limited supply, buying immediately during general on-sale secures face value. For arena tours with steady inventory, secondary resale prices often dip 24 to 48 hours before showtime as resellers drop prices to liquidate inventory.
              </p>
            </div>
          </div>
        </div>

        {/* Other Cities Grid */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">
            Explore Live Concerts in Other Metro Markets
          </h3>
          <div className="flex flex-wrap gap-2">
            {METRO_MARKETS.filter((m) => m.slug !== market.slug).map((m) => (
              <Link
                key={m.slug}
                href={`/events/${m.slug}`}
                className="px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-sm font-medium text-neutral-300 hover:text-white transition-colors"
              >
                {m.name}, {m.stateCode}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
