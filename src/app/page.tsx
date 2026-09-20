'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HeroBanner } from '@/components/home/HeroBanner';
import { QuickSearchBar } from '@/components/home/QuickSearchBar';
import { DateRibbon } from '@/components/home/DateRibbon';
import { MovieCard } from '@/components/home/MovieCard';
import { EventCard } from '@/components/home/EventCard';
import { AggregatorTrustBanner } from '@/components/home/AggregatorTrustBanner';
import { TrendingCinemas } from '@/components/home/TrendingCinemas';
import { AdBanner } from '@/components/ads/AdBanner';
import { MOVIES, EVENTS } from '@/data/mockData';
import {
  ArrowRight,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import { Movie, Event, MovieFormat } from '@/types';

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>(MOVIES);
  const [events, setEvents] = useState<Event[]>(EVENTS);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    fetch('/api/movies')
      .then((res) => res.json())
      .then((data) => {
        if (data.movies && Array.isArray(data.movies) && data.movies.length > 0) {
          setMovies(data.movies);
        }
      })
      .catch(() => {});

    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => {
        if (data.events && Array.isArray(data.events) && data.events.length > 0) {
          setEvents(data.events);
        }
      })
      .catch(() => {});
  }, []);

  const formats = ['All', 'IMAX 70mm', 'IMAX with Laser', 'Dolby Cinema', 'RealD 3D', '4DX'];

  const filteredMovies = movies.filter((m) => {
    if (selectedFormat === 'All') return true;
    return m.formats.includes(selectedFormat as MovieFormat);
  });

  const concerts = events.filter((e) => e.category === 'concert');
  const otherEvents = events.filter((e) => e.category !== 'concert');

  const faqs = [
    {
      q: 'How does BookByShow guarantee the lowest ticket price?',
      a: 'BookByShow queries live ticketing APIs across AMC Theatres, Regal, Cinemark, Ticketmaster, Fandango, and SeatGeek simultaneously. We calculate the exact total price including all booking fees and point you to whichever seller has the lowest total checkout cost for your chosen seat.',
    },
    {
      q: 'Are convenience fees included upfront in the search results?',
      a: 'Yes, 100%. Unlike other ticketing platforms that obscure booking surcharges until the final payment screen, BookByShow breaks down Base Ticket + Convenience Fee = Total Verified Price upfront.',
    },
    {
      q: 'Can I choose specific seats in IMAX 70mm or Dolby Cinema?',
      a: 'Yes. Our interactive seat map lets you preview auditorium sightlines and available seats across recliner tiers, wheelchair spots, and prime center rows before locking in the price with the primary box office.',
    },
    {
      q: 'Are tickets purchased through BookByShow authentic and verified?',
      a: 'All outbound links and checkouts are completed directly with the official authorized primary box offices (e.g., AMC Direct, Ticketmaster, Fandango). Your tickets are 100% genuine, barcode-scannable, and backed by the venue guarantee.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#060709] pb-16">
      {/* 1. Spotlight Hero Carousel */}
      <HeroBanner />

      {/* 2. Interactive Quick Search Bar */}
      <QuickSearchBar />

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        {/* Date Selector Strip */}
        <div className="p-4 rounded-2xl bg-[#0e1015] border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
          <DateRibbon selectedDate={selectedDate} onSelectDate={setSelectedDate} />

          {/* Format pills: Cinema Red Active */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
            <span className="text-xs text-neutral-500 font-medium px-2 shrink-0">Screen:</span>
            {formats.map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
                  selectedFormat === fmt
                    ? 'bg-[#e51821] text-white shadow-md shadow-red-950/40'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Now Showing Blockbusters: AMC-style title */}
        <section>
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-neutral-800/60">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Movies at Theatres
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-950/70 text-red-300 border border-[#e51821]/40">
                  Live Rates
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Compare real-time showtimes and seating across AMC, Regal, and Cinemark
              </p>
            </div>

            <Link
              href="/movies"
              className="text-xs sm:text-sm font-bold text-[#e51821] hover:text-red-400 flex items-center gap-1 transition-colors"
            >
              <span>Explore All ({MOVIES.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* AdSense Leaderboard Placement */}
        <AdBanner format="leaderboard" className="my-4" />

        {/* 4. Aggregator Trust & Transparency Showcase */}
        <AggregatorTrustBanner />

        {/* 5. Trending Live Stadium Concerts */}
        <section>
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-neutral-800/60">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Stadium Tours & Concerts
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-neutral-900 text-neutral-300 border border-neutral-800">
                  Live Nation & Ticketmaster
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Direct primary and resale ticket comparison with zero unverified scalper markups
              </p>
            </div>

            <Link
              href="/events?category=concert"
              className="text-xs sm:text-sm font-bold text-[#e51821] hover:text-red-400 flex items-center gap-1 transition-colors"
            >
              <span>View All Concerts</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {concerts.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        {/* 6. Comedy Specials, Sports & Broadway */}
        <section>
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-neutral-800/60">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Comedy, Sports & Broadway
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-neutral-900 text-neutral-300 border border-neutral-800">
                  Top Rated
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Radio City, Madison Square Garden, and Broadway box offices
              </p>
            </div>

            <Link
              href="/events"
              className="text-xs sm:text-sm font-bold text-[#e51821] hover:text-red-400 flex items-center gap-1 transition-colors"
            >
              <span>Explore All Shows</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        {/* 7. Nearby Top Rated Auditoriums */}
        <TrendingCinemas />

        {/* 8. Conversion FAQ Section */}
        <section className="py-12 border-t border-neutral-800">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="w-11 h-11 rounded-xl bg-red-950/60 text-[#e51821] flex items-center justify-center mx-auto mb-3 border border-[#e51821]/40">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Everything you need to know about comparing tickets on BookByShow
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl bg-[#0f1115] border border-neutral-800 overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-white font-medium text-sm hover:text-red-400 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#e51821]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/80 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
