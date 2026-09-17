'use client';

import React, { useState, useMemo } from 'react';
import { MOVIES } from '@/data/mockData';
import { MovieCard } from '@/components/home/MovieCard';
import { Search, Film } from 'lucide-react';
import { MovieFormat } from '@/types';

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'now_showing' | 'advance_booking' | 'coming_soon'>('all');
  const [sortBy, setSortBy] = useState<'trending' | 'rating' | 'price'>('trending');

  const allGenres = ['All', 'Sci-Fi', 'Action', 'Drama', 'Adventure', 'Musical', 'Horror', 'Comedy'];
  const allFormats = ['All', 'IMAX 70mm', 'IMAX with Laser', 'Dolby Cinema', 'RealD 3D', '4DX'];

  const filtered = useMemo(() => {
    return MOVIES.filter((m) => {
      const matchesSearch =
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.cast.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
        m.director.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGenre = selectedGenre === 'All' || m.genre.includes(selectedGenre);
      const matchesFormat = selectedFormat === 'All' || m.formats.includes(selectedFormat as MovieFormat);
      const matchesStatus =
        selectedStatus === 'all' ||
        (selectedStatus === 'now_showing' && (m.status === 'now_showing' || !m.status)) ||
        m.status === selectedStatus;

      return matchesSearch && matchesGenre && matchesFormat && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.imdbScore - a.imdbScore;
      if (sortBy === 'price') return a.lowestPrice - b.lowestPrice;
      return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
    });
  }, [searchQuery, selectedGenre, selectedFormat, selectedStatus, sortBy]);

  return (
    <div className="min-h-screen bg-[#06080e] pb-24">
      {/* Page Header */}
      <div className="border-b border-[#1e2638] bg-gradient-to-b from-[#0e1424] to-[#06080e] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-rose-600/20 text-rose-400 border border-rose-500/30">
              <Film className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Box Office Aggregator
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            All Movies & Showtimes
          </h1>
          <p className="text-sm text-gray-400 mt-1 max-w-2xl">
            Compare showtimes, auditorium formats, and live ticket prices across AMC, Regal, Cinemark, and independent cinemas.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-4 rounded-2xl bg-[#0d121e] border border-[#1e2638] space-y-4 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by title, director, or actor..."
                className="w-full bg-[#131929] border border-[#1e2638] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            {/* Sort Filter */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'trending' | 'rating' | 'price')}
                className="w-full bg-[#131929] border border-[#1e2638] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500"
              >
                <option value="trending">Sort: Trending First</option>
                <option value="rating">Sort: Highest IMDb Rating</option>
                <option value="price">Sort: Lowest Ticket Price</option>
              </select>
            </div>

            {/* Format Filter */}
            <div className="md:col-span-3">
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="w-full bg-[#131929] border border-[#1e2638] rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-rose-500"
              >
                {allFormats.map((f) => (
                  <option key={f} value={f}>
                    Screen: {f}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Genre Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-white/5 scrollbar-none">
            <span className="text-xs text-gray-500 font-semibold px-2 shrink-0">Genre:</span>
            {allGenres.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
                  selectedGenre === g
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-[#141b2a] text-gray-400 hover:text-white border border-[#1e2638]'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Release Status Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-white/5 scrollbar-none">
            <span className="text-xs text-gray-500 font-semibold px-2 shrink-0">Status:</span>
            {[
              { id: 'all', label: 'All Releases' },
              { id: 'now_showing', label: '🔥 In Theaters Now' },
              { id: 'advance_booking', label: '🎟️ Advance Booking / Pre-Sale' },
              { id: 'coming_soon', label: '⏳ Upcoming 2025' },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStatus(st.id as 'all' | 'now_showing' | 'advance_booking' | 'coming_soon')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                  selectedStatus === st.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'bg-[#141b2a] text-gray-400 hover:text-white border border-[#1e2638]'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-400 font-medium">
              Showing {filtered.length} of {MOVIES.length} movies
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center rounded-2xl bg-[#0d121e] border border-[#1e2638]">
              <p className="text-white font-bold text-base">No movies match your filters</p>
              <p className="text-xs text-gray-400 mt-1">Try resetting the search query or selecting &lsquo;All&rsquo; formats.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedGenre('All');
                  setSelectedFormat('All');
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filtered.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
