'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Event } from '@/types';
import { Calendar, MapPin, Bookmark, Ticket } from 'lucide-react';

export function EventCard({ event }: { event: Event }) {
  const { toggleWatchlist, isItemInWatchlist } = useApp();
  const isSaved = isItemInWatchlist(event.id);

  return (
    <div className="group relative rounded-xl bg-[#0f1115] border border-neutral-800/80 overflow-hidden flex flex-col hover:border-[#e51821]/50 transition-all duration-200 shadow-lg">
      {/* Banner Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900">
        <img
          src={event.bannerUrl}
          alt={event.title}
          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-neutral-200 border border-neutral-700">
              {event.category}
            </span>
            {event.quotes.some((q) => q.provider === 'Ticketmaster') && (
              <span className="px-1.5 py-0.5 rounded bg-blue-950/85 backdrop-blur-md text-[9px] font-bold text-blue-300 border border-blue-500/40">
                Ticketmaster
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWatchlist({
                id: event.id,
                type: 'event',
                title: event.title,
                posterUrl: event.posterUrl,
                dateOrRuntime: event.date,
                lowestPrice: event.minPrice,
              });
            }}
            className={`p-1.5 rounded-full backdrop-blur-md transition-colors ${
              isSaved
                ? 'bg-[#e51821] text-white shadow-md'
                : 'bg-black/60 text-neutral-300 hover:text-white hover:bg-black/80'
            }`}
            title={isSaved ? 'In Watchlist' : 'Add to Watchlist'}
            aria-label="Save event to watchlist"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Bottom tags */}
        <div className="absolute bottom-2 left-2.5 z-10 flex flex-wrap gap-1">
          {event.tags.slice(0, 2).map((t, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/80 backdrop-blur-md text-neutral-300 border border-neutral-700"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          <Link href={`/event/${event.slug}`}>
            <h3 className="font-bold text-white text-sm line-clamp-1 group-hover:text-red-400 transition-colors">
              {event.title}
            </h3>
          </Link>
          <p className="text-xs text-neutral-400 font-medium mt-0.5">
            {event.artistOrHost}
          </p>

          <div className="mt-2 space-y-1 text-xs text-neutral-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#e51821]" />
              <span>{event.date} • {event.time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-neutral-500" />
              <span className="truncate">{event.venueName}, {event.venueCity}</span>
            </div>
          </div>
        </div>

        {/* Price & Compare CTA */}
        <div className="pt-2 border-t border-neutral-800 flex items-center justify-between gap-2">
          <div>
            <span className="text-[9px] uppercase text-neutral-500 font-semibold block leading-tight">
              Verified Lowest
            </span>
            <span className="text-xs font-bold text-white">
              ${event.minPrice.toFixed(2)}
            </span>
          </div>

          <Link
            href={`/event/${event.slug}`}
            className="px-3.5 py-1.5 rounded-lg bg-[#e51821] hover:bg-[#c9121a] text-white text-xs font-bold flex items-center gap-1 shadow-sm shadow-red-950/40 transition-colors"
          >
            <Ticket className="w-3 h-3" />
            <span>Compare</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
