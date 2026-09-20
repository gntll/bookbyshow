'use client';

import React, { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { MOVIES, EVENTS, CINEMAS } from '@/data/mockData';
import { Search, X, Film, Music, MapPin, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

export function GlobalSearchModal() {
  const { isSearchModalOpen, setIsSearchModalOpen } = useApp();
  const [query, setQuery] = useState('');

  const filteredResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      return {
        movies: MOVIES.slice(0, 3),
        events: EVENTS.slice(0, 2),
        cinemas: CINEMAS.slice(0, 2),
      };
    }

    const movies = MOVIES.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.genre.some((g) => g.toLowerCase().includes(q)) ||
        m.director.toLowerCase().includes(q) ||
        m.cast.some((c) => c.toLowerCase().includes(q))
    );

    const events = EVENTS.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.artistOrHost.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.venueName.toLowerCase().includes(q)
    );

    const cinemas = CINEMAS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.amenities.some((a) => a.toLowerCase().includes(q))
    );

    return { movies, events, cinemas };
  }, [query]);

  if (!isSearchModalOpen) return null;

  const totalFound =
    filteredResults.movies.length +
    filteredResults.events.length +
    filteredResults.cinemas.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-2xl bg-[#121215] border border-neutral-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input header */}
        <div className="relative border-b border-neutral-800 p-3.5 flex items-center gap-3 bg-neutral-900">
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies, concerts, comedy, sports, or cinemas..."
            className="w-full bg-transparent text-white placeholder-neutral-400 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1.5 rounded text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="px-2.5 py-1 text-xs font-bold text-neutral-300 bg-neutral-800 rounded border border-neutral-700"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto p-4 space-y-5">
          {totalFound === 0 ? (
            <div className="text-center py-12 text-neutral-400">
              <p className="text-base font-medium">No listings found matching &ldquo;{query}&rdquo;</p>
              <p className="text-sm text-neutral-400 mt-1">Try searching by title, artist, genre, or cinema name.</p>
            </div>
          ) : (
            <>
              {/* Movies Section */}
              {filteredResults.movies.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 px-2">
                    <Film className="w-4 h-4 text-neutral-400" />
                    <span>Movies & Cinema Showtimes ({filteredResults.movies.length})</span>
                  </div>
                  <div className="space-y-1">
                    {filteredResults.movies.map((m) => (
                      <Link
                        key={m.id}
                        href={`/movie/${m.slug}`}
                        onClick={() => setIsSearchModalOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-neutral-800/60 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={m.posterUrl}
                            alt={m.title}
                            className="w-10 h-14 object-cover rounded shrink-0 bg-neutral-900"
                          />
                          <div>
                            <p className="font-bold text-white text-base group-hover:text-neutral-200 transition-colors">
                              {m.title}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-neutral-300 mt-0.5">
                              <span>{m.runtimeMinutes}m</span>
                              <span>•</span>
                              <span>{m.genre.slice(0, 2).join(', ')}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1 text-amber-400 font-semibold">
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                {m.imdbScore}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-white">
                            From ${m.lowestPrice.toFixed(2)}
                          </span>
                          <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Events Section */}
              {filteredResults.events.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 px-2">
                    <Music className="w-4 h-4 text-neutral-400" />
                    <span>Concerts & Live Shows ({filteredResults.events.length})</span>
                  </div>
                  <div className="space-y-1">
                    {filteredResults.events.map((e) => (
                      <Link
                        key={e.id}
                        href={`/event/${e.slug}`}
                        onClick={() => setIsSearchModalOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-neutral-800/60 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={e.bannerUrl}
                            alt={e.title}
                            className="w-14 h-10 object-cover rounded shrink-0 bg-neutral-900"
                          />
                          <div>
                            <p className="font-bold text-white text-base group-hover:text-neutral-200 transition-colors">
                              {e.title}
                            </p>
                            <p className="text-sm text-neutral-300 mt-0.5">
                              {e.artistOrHost} • {e.venueCity}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-white">
                            From ${e.minPrice.toFixed(2)}
                          </span>
                          <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Cinemas Section */}
              {filteredResults.cinemas.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 px-2">
                    <MapPin className="w-4 h-4 text-neutral-400" />
                    <span>Venues & Auditoriums ({filteredResults.cinemas.length})</span>
                  </div>
                  <div className="space-y-1">
                    {filteredResults.cinemas.map((c) => (
                      <Link
                        key={c.id}
                        href={`/cinemas`}
                        onClick={() => setIsSearchModalOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-neutral-800/60 transition-colors group"
                      >
                        <div>
                          <p className="font-bold text-white text-base group-hover:text-neutral-200 transition-colors">
                            {c.name}
                          </p>
                          <p className="text-sm text-neutral-300 mt-0.5">
                            {c.address} • {c.screens.length} auditoriums
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between text-xs text-neutral-400">
          <span>Search updates dynamically as you type</span>
          <span className="font-medium">Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}
