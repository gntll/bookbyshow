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
        className="relative w-full max-w-2xl bg-[#0d121e] border border-[#1e2638] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input header */}
        <div className="relative border-b border-[#1e2638] p-4 flex items-center gap-3 bg-[#111728]">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies, concerts, comedy, sports, or cinemas..."
            className="w-full bg-transparent text-white placeholder-gray-500 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="px-2 py-1 text-xs text-gray-400 bg-gray-800 rounded border border-gray-700"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto p-4 space-y-6">
          {totalFound === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-sm">No listings found matching &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-gray-500 mt-1">Try searching by title, artist, genre, or cinema name.</p>
            </div>
          ) : (
            <>
              {/* Movies Section */}
              {filteredResults.movies.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5 px-2">
                    <Film className="w-3.5 h-3.5 text-rose-500" />
                    <span>Movies & Cinema Showtimes ({filteredResults.movies.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredResults.movies.map((m) => (
                      <Link
                        key={m.id}
                        href={`/movie/${m.slug}`}
                        onClick={() => setIsSearchModalOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#151c2e] transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={m.posterUrl}
                            alt={m.title}
                            className="w-10 h-14 object-cover rounded-md shrink-0"
                          />
                          <div>
                            <p className="font-semibold text-white text-sm group-hover:text-rose-400 transition-colors">
                              {m.title}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                              <span>{m.runtimeMinutes}m</span>
                              <span>•</span>
                              <span>{m.genre.slice(0, 2).join(', ')}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1 text-amber-400">
                                <Star className="w-3 h-3 fill-amber-400" />
                                {m.imdbScore}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-emerald-400">
                            From ${m.lowestPrice.toFixed(2)}
                          </span>
                          <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Events Section */}
              {filteredResults.events.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5 px-2">
                    <Music className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Concerts, Comedy & Sports ({filteredResults.events.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredResults.events.map((e) => (
                      <Link
                        key={e.id}
                        href={`/event/${e.slug}`}
                        onClick={() => setIsSearchModalOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#151c2e] transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={e.posterUrl}
                            alt={e.title}
                            className="w-10 h-14 object-cover rounded-md shrink-0"
                          />
                          <div>
                            <p className="font-semibold text-white text-sm group-hover:text-indigo-400 transition-colors">
                              {e.title}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                              <span className="capitalize">{e.category}</span>
                              <span>•</span>
                              <span>{e.venueCity}</span>
                              <span>•</span>
                              <span>{e.date}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-emerald-400">
                            From ${e.minPrice.toFixed(2)}
                          </span>
                          <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Cinemas Section */}
              {filteredResults.cinemas.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5 px-2">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Cinemas & Venues ({filteredResults.cinemas.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {filteredResults.cinemas.map((c) => (
                      <Link
                        key={c.id}
                        href={`/cinemas`}
                        onClick={() => setIsSearchModalOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#151c2e] transition-colors group"
                      >
                        <div>
                          <p className="font-semibold text-white text-sm group-hover:text-cyan-400 transition-colors">
                            {c.name}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {c.address} • {c.amenities.slice(0, 2).join(', ')}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
