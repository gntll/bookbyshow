'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Bookmark, Trash2, ArrowRight, Film, Music } from 'lucide-react';

export default function WatchlistPage() {
  const { watchlist, toggleWatchlist } = useApp();

  return (
    <div className="min-h-screen bg-[#06080e] pb-24">
      {/* Header */}
      <div className="border-b border-[#1e2638] bg-gradient-to-b from-[#180e18] to-[#06080e] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-rose-600/20 text-rose-400 border border-rose-500/30">
              <Bookmark className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Your Personal Tracklist
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Saved Movies & Events
          </h1>
          <p className="text-sm text-gray-400 mt-1 max-w-2xl">
            Keep track of release dates, price drops, and seating inventory across all your favorite titles.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {watchlist.length === 0 ? (
          <div className="py-20 text-center rounded-2xl bg-[#0d121e] border border-[#1e2638] max-w-md mx-auto p-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-rose-600/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
              <Bookmark className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Your Watchlist is Empty</h3>
            <p className="text-xs text-gray-400">
              Tap the bookmark icon on any movie or live concert card to save it here for instant rate comparison.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <Link
                href="/movies"
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
              >
                Explore Movies
              </Link>
              <Link
                href="/events"
                className="px-4 py-2 rounded-xl bg-[#141b2a] hover:bg-[#1a2337] border border-[#1e2638] text-white font-semibold text-xs"
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
                className="p-4 rounded-2xl bg-[#0d121e] border border-[#1e2638] hover:border-rose-500/40 transition-all flex items-center gap-4 shadow-xl group"
              >
                <img
                  src={item.posterUrl}
                  alt={item.title}
                  className="w-16 h-24 object-cover rounded-xl shrink-0"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between h-24 py-1">
                  <div>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 uppercase font-bold">
                      {item.type === 'movie' ? (
                        <>
                          <Film className="w-3 h-3 text-rose-500" />
                          <span>Movie</span>
                        </>
                      ) : (
                        <>
                          <Music className="w-3 h-3 text-indigo-400" />
                          <span>Event</span>
                        </>
                      )}
                    </div>
                    <h4 className="font-bold text-white text-sm truncate mt-0.5 group-hover:text-rose-400 transition-colors">
                      {item.title}
                    </h4>
                    <span className="text-xs text-emerald-400 font-bold block mt-1">
                      From ${item.lowestPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5">
                    <Link
                      href={item.type === 'movie' ? `/movie/${item.id}` : `/event/${item.id}`}
                      className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1"
                    >
                      <span>Showtimes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => toggleWatchlist(item)}
                      className="text-gray-500 hover:text-red-400 transition-colors p-1"
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
