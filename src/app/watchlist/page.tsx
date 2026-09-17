'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Bookmark, Trash2, ArrowRight, Film, Music } from 'lucide-react';

export default function WatchlistPage() {
  const { watchlist, toggleWatchlist } = useApp();

  return (
    <div className="min-h-screen bg-[#060709] pb-24">
      {/* Header */}
      <div className="border-b border-neutral-800 bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded-md bg-red-950/70 text-red-300 border border-red-500/40">
              <Bookmark className="w-3.5 h-3.5 text-[#e51821]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#e51821]">
              Saved Listings
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Saved Movies & Events
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
            Keep track of release dates, price drops, and seating inventory across your favorite titles.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {watchlist.length === 0 ? (
          <div className="py-20 text-center rounded-2xl bg-[#0e1015] border border-neutral-800 max-w-md mx-auto p-8 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-[#e51821]/40 text-[#e51821] flex items-center justify-center mx-auto">
              <Bookmark className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Your Watchlist is Empty</h3>
            <p className="text-xs text-neutral-400">
              Tap the bookmark icon on any movie or live concert card to save it here for instant rate comparison.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <Link
                href="/movies"
                className="px-4 py-2 rounded-lg bg-[#e51821] hover:bg-[#c9121a] text-white font-bold text-xs transition-colors"
              >
                Explore Movies
              </Link>
              <Link
                href="/events"
                className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-medium text-xs transition-colors"
              >
                Explore Events
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {watchlist.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-[#0e1015] border border-neutral-800 hover:border-[#e51821]/50 transition-colors flex items-center gap-4 shadow-lg group"
              >
                <img
                  src={item.posterUrl}
                  alt={item.title}
                  className="w-16 h-24 object-cover rounded-lg shrink-0 bg-neutral-900"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between h-24 py-1">
                  <div>
                    <div className="flex items-center gap-1 text-[10px] text-neutral-400 uppercase font-semibold">
                      {item.type === 'movie' ? (
                        <>
                          <Film className="w-3 h-3 text-[#e51821]" />
                          <span>Movie</span>
                        </>
                      ) : (
                        <>
                          <Music className="w-3 h-3 text-[#e51821]" />
                          <span>Event</span>
                        </>
                      )}
                    </div>
                    <h4 className="font-bold text-white text-sm truncate mt-0.5 group-hover:text-red-400 transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-xs text-white font-bold block mt-1">
                      From ${item.lowestPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-neutral-800">
                    <Link
                      href={item.type === 'movie' ? `/movie/${item.id}` : `/event/${item.id}`}
                      className="text-xs font-bold text-[#e51821] hover:underline flex items-center gap-1"
                    >
                      <span>Showtimes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => toggleWatchlist(item)}
                      className="text-neutral-500 hover:text-white transition-colors p-1"
                      title="Remove from saved"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
