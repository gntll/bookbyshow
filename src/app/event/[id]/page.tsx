'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { EVENTS } from '@/data/mockData';
import {
  Calendar,
  MapPin,
  ArrowLeft,
  ExternalLink,
  Bookmark,
  Bell,
  Download,
  Music,
  Sparkles,
} from 'lucide-react';
import { buildAffiliateOutboundUrl } from '@/config/affiliates';
import { AdBanner } from '@/components/ads/AdBanner';
import { PricePredictorBadge } from '@/components/ai/PricePredictorBadge';

export default function EventDetailPage() {
  const params = useParams();
  const slug = params?.id as string;
  const { openAlertModal, toggleWatchlist, isItemInWatchlist, openEveningPlanner } = useApp();

  const event = EVENTS.find((e) => e.slug === slug || e.id === slug);

  if (!event) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <Music className="w-12 h-12 text-neutral-600 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Event Not Found</h1>
        <p className="text-sm text-neutral-400 mb-6 max-w-md">
          This concert, comedy special, or sporting event could not be found or has completed.
        </p>
        <Link
          href="/events"
          className="px-5 py-2.5 rounded-lg bg-[#e51821] hover:bg-[#c9121a] text-white shadow-md shadow-red-950/40 text-sm font-semibold transition-colors min-h-[44px] inline-flex items-center"
        >
          Browse All Events
        </Link>
      </div>
    );
  }

  const isSaved = isItemInWatchlist(event.id);
  const lowestTotal = Math.min(...event.quotes.map((q) => q.total));
  const highestTotal = Math.max(...event.quotes.map((q) => q.total));

  const eventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: `${event.date}T${event.time}:00`,
    endDate: `${event.date}T23:00:00`,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: event.venueName,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.venueCity,
        addressCountry: 'US',
      },
    },
    image: [event.bannerUrl],
    description: event.description,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: lowestTotal.toFixed(2),
      highPrice: highestTotal.toFixed(2),
      offerCount: event.quotes.length,
      url: `https://bookbyshow.com/event/${event.slug}`,
      availability: 'https://schema.org/InStock',
    },
    performer: {
      '@type': 'PerformingGroup',
      name: event.artistOrHost,
    },
  };

  const breadcrumbJsonLd = {
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
        name: event.title,
        item: `https://bookbyshow.com/event/${event.slug}`,
      },
    ],
  };

  const downloadCalendarFile = () => {
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//BookByShow//Ticket Aggregator//EN\nBEGIN:VEVENT\nSUMMARY:${event.title}\nDESCRIPTION:${event.description.replace(/\n/g, ' ')}\nLOCATION:${event.venueName}, ${event.venueCity}\nDTSTART:${event.date.replace(/-/g, '')}T${event.time.replace(':', '')}00Z\nSTATUS:CONFIRMED\nEND:VEVENT\nEND:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.slug}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#060709] pb-24">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Top Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Events</span>
        </Link>
      </div>

      {/* Banner Hero */}
      <div className="relative w-full overflow-hidden min-h-[400px] flex items-center bg-[#060709] border-b border-neutral-800">
        <img
          src={event.bannerUrl}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-20 filter brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-[#060709]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/90 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider bg-neutral-900 text-neutral-300 border border-neutral-700">
                {event.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-neutral-900 text-neutral-400 border border-neutral-800">
                {event.tags.join(' • ')}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              {event.title}
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 font-medium">
              Headline: {event.artistOrHost}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-neutral-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-neutral-500" />
                <span>{event.date} • {event.time}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-neutral-500" />
                <span>{event.venueName}, {event.venueCity}</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed max-w-2xl">
              {event.description}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={downloadCalendarFile}
                className="px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white text-sm font-semibold flex items-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-neutral-300" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <button
                onClick={() => openAlertModal(event.title, event.minPrice)}
                className="px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-sm font-semibold flex items-center gap-2 transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span>Price Drop Alert</span>
              </button>

              <button
                onClick={() =>
                  toggleWatchlist({
                    id: event.id,
                    type: 'event',
                    title: event.title,
                    posterUrl: event.posterUrl,
                    dateOrRuntime: event.date,
                    lowestPrice: event.minPrice,
                  })
                }
                className={`px-4 py-2.5 rounded-lg border text-sm font-semibold flex items-center gap-2 transition-colors ${
                  isSaved
                    ? 'bg-white border-white text-black'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-200 hover:text-white'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-black' : ''}`} />
                <span>{isSaved ? 'Saved in Watchlist' : 'Add to Watchlist'}</span>
              </button>

              {/* AI Date Night / Evening Planner CTA */}
              <button
                onClick={() =>
                  openEveningPlanner({
                    title: event.title,
                    venueName: event.venueName,
                    city: event.venueCity,
                    time: event.time,
                  })
                }
                className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-sm flex items-center gap-1.5 shadow-md shadow-red-950/40 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Plan Evening</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* AI 'Buy Now vs. Wait' Price Trajectory & Velocity Predictor */}
        <PricePredictorBadge event={event} variant="detailed" />

        {/* Ticket Marketplace Comparison */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Verified Marketplace Pricing
              </h2>
              <p className="text-sm text-neutral-400 mt-1">
                Compare rates across primary sellers and verified resale exchanges
              </p>
            </div>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {event.quotes.map((quote, idx) => {
            const isBest = quote.total === lowestTotal;
            return (
              <div
                key={idx}
                className={`p-5 rounded-xl border flex flex-col justify-between space-y-4 ${
                  isBest
                    ? 'bg-neutral-900 border-neutral-600'
                    : 'bg-[#121215] border-neutral-800/80 hover:border-neutral-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-base sm:text-lg text-white">{quote.provider}</span>
                    {isBest && (
                      <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-white text-black">
                        BEST RATE
                      </span>
                    )}
                  </div>

                  <div className="mt-3 space-y-1.5 text-sm text-neutral-300">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Base Ticket</span>
                      <span className="text-white font-medium">${quote.basePrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Service / Platform Fee</span>
                      <span className="text-neutral-300">+${quote.fee.toFixed(2)}</span>
                    </div>
                    {quote.badge && (
                      <p className="text-xs text-neutral-300 font-medium pt-1">
                        Note: {quote.badge}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-neutral-400 uppercase font-semibold block">Total with Fees</span>
                    <span className="text-2xl font-black text-white">${quote.total.toFixed(2)}</span>
                  </div>

                  <a
                    href={buildAffiliateOutboundUrl(quote.provider, quote.directUrl, {
                      eventId: event.id,
                      subId: `event_${event.id}`,
                      campaign: 'event_detail',
                    })}
                    target="_blank"
                    rel="noopener noreferrer sponsored nofollow"
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                      isBest
                        ? 'bg-[#e51821] hover:bg-[#c9121a] text-white shadow-md shadow-red-950/40'
                        : 'bg-neutral-800 text-white hover:bg-neutral-700'
                    }`}
                  >
                    <span>Book on {quote.provider}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        </div>

        {/* AdSense Placement */}
        <AdBanner format="leaderboard" className="mt-12" />
      </div>
    </div>
  );
}
