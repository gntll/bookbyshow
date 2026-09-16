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
} from 'lucide-react';

export default function EventDetailPage() {
  const params = useParams();
  const slug = params?.id as string;
  const { openAlertModal, toggleWatchlist, isItemInWatchlist } = useApp();

  const event = EVENTS.find((e) => e.slug === slug || e.id === slug);

  if (!event) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <Music className="w-16 h-16 text-indigo-500 mb-4 opacity-50" />
        <h1 className="text-2xl font-bold text-white mb-2">Event Not Found</h1>
        <p className="text-sm text-gray-400 mb-6 max-w-md">
          This concert, comedy special, or sporting event could not be found or has completed.
        </p>
        <Link
          href="/events"
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold"
        >
          Browse All Events
        </Link>
      </div>
    );
  }

  const isSaved = isItemInWatchlist(event.id);
  const lowestTotal = Math.min(...event.quotes.map((q) => q.total));

  // Calendar .ics download generator
  const downloadCalendarFile = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//BookByShow//Ticket Aggregator//EN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description.replace(/\n/g, ' ')}
LOCATION:${event.venueName}, ${event.venueCity}
DTSTART:${event.date.replace(/-/g, '')}T${event.time.replace(':', '')}00Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.slug}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#06080e] pb-24">
      {/* Top Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Events</span>
        </Link>
      </div>

      {/* Banner Hero */}
      <div className="relative w-full overflow-hidden min-h-[420px] flex items-center bg-[#0a0e1c] border-b border-[#1e2638]">
        <img
          src={event.bannerUrl}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-30 filter brightness-90 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06080e] via-[#06080e]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06080e] via-[#06080e]/90 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                {event.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#141b2a] text-gray-300 border border-[#1e2638]">
                {event.tags.join(' • ')}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {event.title}
            </h1>
            <p className="text-lg text-rose-400 font-bold">
              Headline: {event.artistOrHost}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-300">
              <div className="flex items-center gap-1.5 text-amber-400">
                <Calendar className="w-4 h-4" />
                <span>{event.date} • {event.time}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 text-cyan-400">
                <MapPin className="w-4 h-4" />
                <span>{event.venueName}, {event.venueCity}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-2xl">
              {event.description}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={downloadCalendarFile}
                className="px-4 py-2.5 rounded-xl bg-[#141b2a] hover:bg-[#1a2337] border border-[#1e2638] text-white text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <button
                onClick={() => openAlertModal(event.title, event.minPrice)}
                className="px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Track Price Drops</span>
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
                className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  isSaved
                    ? 'bg-rose-600/20 border-rose-500 text-rose-400'
                    : 'bg-[#121826] border-[#1e2638] text-gray-300 hover:text-white'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500' : ''}`} />
                <span>{isSaved ? 'Saved' : 'Save Event'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 space-y-12">
        {/* Ticket Provider Comparison Matrix */}
        <section className="p-6 sm:p-8 rounded-2xl bg-[#0d121e] border border-[#1e2638] shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                <span>Multi-Platform Ticket Price Comparison</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Verified Total
                </span>
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Prices include all estimated venue, primary service, and fulfillment fees
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {event.quotes.map((quote, idx) => {
              const isBest = quote.total === lowestTotal;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
                    isBest
                      ? 'bg-indigo-950/20 border-indigo-500/50 shadow-md shadow-indigo-950/30'
                      : 'bg-[#121826] border-[#1e2638] hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                      {quote.provider.slice(0, 3).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-base">{quote.provider}</span>
                        {isBest && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            LOWEST OVERALL
                          </span>
                        )}
                        {quote.badge && (
                          <span className="text-[11px] text-amber-400 font-semibold hidden md:inline">
                            • {quote.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Base: ${quote.basePrice.toFixed(2)} + Fees: ${quote.fee.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-0 border-white/5">
                    <div className="text-left sm:text-right">
                      <span className="text-xl font-black text-white block">
                        ${quote.total.toFixed(2)}
                      </span>
                      <span className="text-[11px] text-emerald-400">Exact Checkout Price</span>
                    </div>

                    <a
                      href={quote.directUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        isBest
                          ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      <span>Get Tickets</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Seating Tiers */}
        <section>
          <h2 className="text-xl font-bold text-white tracking-tight mb-4">
            Auditorium Seating Tiers & Packages
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {event.ticketTiers.map((tier, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#0d121e] border border-[#1e2638] flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#151c2e] text-indigo-300 border border-indigo-500/30 uppercase">
                      Tier {idx + 1}
                    </span>
                    <span className="text-xs text-amber-400 font-semibold capitalize">
                      {tier.availability.replace('_', ' ')} Availability
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">{tier.name}</h3>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-gray-400">Starting from</span>
                  <span className="text-lg font-black text-emerald-400">
                    ${tier.lowestPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
