'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Event } from '@/types';
import { Calendar, MapPin, Bookmark, Ticket } from 'lucide-react';

export function EventCard({ event }: { event: Event }) {
  const { toggleWatchlist, isItemInWatchlist } = useApp();
  const isSaved = isItemInWatchlist(event.id);

  const categoryColor = {
    concert: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    comedy: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    sports: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    theatre: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    festival: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  }[event.category];

  return (
    <div className="group relative rounded-2xl bg-[#0d121e] border border-[#1e2638] overflow-hidden flex flex-col hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl shadow-black/40">
      {/* Banner Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-900">
        <img
          src={event.bannerUrl}
          alt={event.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0d121e] via-transparent to-black/30" />

        {/* Top Badges: Category & Watchlist */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider border backdrop-blur-md ${categoryColor}`}>
            {event.category}
          </span>

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
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              isSaved
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/50'
                : 'bg-black/60 text-gray-300 hover:text-white hover:bg-black/80'
            }`}
            title={isSaved ? 'In Watchlist' : 'Add to Watchlist'}
            aria-label="Save event to watchlist"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Bottom tags */}
        <div className="absolute bottom-2.5 left-3 z-10 flex flex-wrap gap-1">
          {event.tags.slice(0, 2).map((t, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/75 backdrop-blur-md text-gray-300 border border-white/10"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <Link href={`/event/${event.slug}`}>
            <h3 className="font-bold text-white text-base line-clamp-1 group-hover:text-indigo-400 transition-colors">
              {event.title}
            </h3>
          </Link>
          <p className="text-xs text-rose-400 font-semibold mt-0.5">
            {event.artistOrHost}
          </p>

          <div className="mt-2.5 space-y-1 text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span>{event.date} • {event.time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gray-500" />
              <span className="truncate">{event.venueName}, {event.venueCity}</span>
            </div>
          </div>
        </div>

        {/* Price & Compare CTA */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase text-gray-500 font-semibold block">
              Verified Lowest
            </span>
            <span className="text-sm font-extrabold text-emerald-400">
              ${event.minPrice.toFixed(2)}
            </span>
          </div>

          <Link
            href={`/event/${event.slug}`}
            className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1 shadow-md shadow-indigo-600/20 transition-colors"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Compare</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
