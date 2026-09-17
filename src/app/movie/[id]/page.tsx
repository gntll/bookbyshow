'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { MOVIES, CINEMAS, getShowtimesForMovie } from '@/data/mockData';
import {
  Star,
  Clock,
  Play,
  Bookmark,
  Bell,
  Armchair,
  MapPin,
  ArrowLeft,
  ChevronRight,
  Film,
} from 'lucide-react';

export default function MovieDetailPage() {
  const params = useParams();
  const slug = params?.id as string;
  const { openComparisonModal, openSeatMapModal, openTrailerModal, openAlertModal, toggleWatchlist, isItemInWatchlist } = useApp();

  const movie = MOVIES.find((m) => m.slug === slug || m.id === slug);
  const [selectedFormat, setSelectedFormat] = useState<string>('All');

  if (!movie) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <Film className="w-16 h-16 text-rose-500 mb-4 opacity-50" />
        <h1 className="text-2xl font-bold text-white mb-2">Movie Not Found</h1>
        <p className="text-sm text-gray-400 mb-6 max-w-md">
          The requested film listing might have concluded its theatrical run or been moved.
        </p>
        <Link
          href="/movies"
          className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-bold shadow-lg shadow-rose-600/30"
        >
          Browse All Now Showing
        </Link>
      </div>
    );
  }

  const isSaved = isItemInWatchlist(movie.id);

  // Filter showtimes for this movie
  const movieShowtimes = getShowtimesForMovie(movie.id);

  // Group showtimes by Cinema
  const cinemasWithShowtimes = CINEMAS.map((cinema) => {
    const times = movieShowtimes.filter((s) => {
      const matchesCinema = s.cinemaId === cinema.id;
      const matchesFormat = selectedFormat === 'All' || s.format === selectedFormat;
      return matchesCinema && matchesFormat;
    });
    return { cinema, times };
  }).filter((g) => g.times.length > 0);

  return (
    <div className="min-h-screen bg-[#06080e] pb-24">
      {/* Top Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <Link
          href="/movies"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Movies</span>
        </Link>
      </div>

      {/* Cinematic Backdrop Hero */}
      <div className="relative w-full overflow-hidden min-h-[460px] flex items-center bg-[#090d16] border-b border-[#1e2638]">
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-25 filter brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06080e] via-[#06080e]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06080e] via-[#06080e]/90 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Poster Thumbnail */}
            <div className="w-44 sm:w-56 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl shadow-black/80 border border-white/10 shrink-0 relative group">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => openTrailerModal(movie.trailerYoutubeId, movie.title)}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
              >
                <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/50">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
              </button>
            </div>

            {/* Info details */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-rose-600/20 text-rose-400 border border-rose-500/30 text-xs font-bold uppercase">
                  Now In Theatres
                </span>
                <span className="px-2 py-0.5 rounded bg-[#131929] text-gray-300 text-xs font-semibold border border-[#1e2638]">
                  {movie.certificateRating}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-[#131929] text-amber-400 text-xs font-semibold border border-[#1e2638] flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {movie.imdbScore} IMDb
                </span>
                <span className="px-2.5 py-0.5 rounded bg-red-950/50 text-red-400 text-xs font-semibold border border-red-500/30">
                  🍅 {movie.rtScore}% Rotten Tomatoes
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                {movie.title}
              </h1>
              <p className="text-sm sm:text-base text-rose-300 italic font-medium">
                &ldquo;{movie.tagline}&rdquo;
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>{Math.floor(movie.runtimeMinutes / 60)}h {movie.runtimeMinutes % 60}m</span>
                </div>
                <span>•</span>
                <span>{movie.genre.join(', ')}</span>
                <span>•</span>
                <span>Directed by <strong className="text-white">{movie.director}</strong></span>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-3xl">
                {movie.synopsis}
              </p>

              <div className="text-xs text-gray-400">
                <strong className="text-gray-300">Starring: </strong>
                {movie.cast.join(', ')}
              </div>

              {/* Actions row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => openTrailerModal(movie.trailerYoutubeId, movie.title)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-2 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Watch Trailer</span>
                </button>

                <button
                  onClick={() => openAlertModal(movie.title, movie.lowestPrice)}
                  className="px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Price Drop Alert</span>
                </button>

                <button
                  onClick={() =>
                    toggleWatchlist({
                      id: movie.id,
                      type: 'movie',
                      title: movie.title,
                      posterUrl: movie.posterUrl,
                      dateOrRuntime: `${movie.runtimeMinutes} min`,
                      lowestPrice: movie.lowestPrice,
                    })
                  }
                  className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isSaved
                      ? 'bg-rose-600/20 border-rose-500 text-rose-400'
                      : 'bg-[#121826] border-[#1e2638] text-gray-300 hover:text-white'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-500' : ''}`} />
                  <span>{isSaved ? 'Saved to Watchlist' : 'Add to Watchlist'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Showtimes & Multi-Cinema Price Matrix */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>Showtimes & Seating Availability</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Live Quotes
              </span>
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Select any showtime pill to compare AMC, Fandango, and Regal prices side-by-side
            </p>
          </div>

          {/* Format filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {['All', ...movie.formats].map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                  selectedFormat === fmt
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'bg-[#0f1422] text-gray-400 hover:text-white border border-[#1e2638]'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {/* Cinemas list */}
        {cinemasWithShowtimes.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#0d121e] border border-[#1e2638] text-center text-gray-400">
            <Armchair className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="text-sm font-semibold text-white">No showtimes found for {selectedFormat}</p>
            <p className="text-xs text-gray-500 mt-1">Try switching format filters or selecting another date.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {cinemasWithShowtimes.map(({ cinema, times }) => (
              <div
                key={cinema.id}
                className="p-6 rounded-2xl bg-[#0d121e] border border-[#1e2638] shadow-xl shadow-black/40 space-y-4"
              >
                {/* Cinema header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
                        {cinema.chain}
                      </span>
                      <h3 className="font-bold text-white text-base sm:text-lg">
                        {cinema.name}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-500" />
                      <span>{cinema.address} • {cinema.distanceMiles} miles away</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {cinema.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#141b2b] text-gray-300 border border-[#1e2638]"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Showtimes grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {times.map((st) => {
                    const lowestQuote = [...st.quotes].sort((a, b) => a.total - b.total)[0];
                    const isAlmostSoldOut = st.seatAvailability === 'almost_sold_out';

                    return (
                      <div
                        key={st.id}
                        className="p-4 rounded-xl bg-[#121826] border border-[#1e2638] hover:border-rose-500/50 transition-all flex flex-col justify-between group shadow-sm"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1a233a] text-cyan-300 border border-cyan-500/30">
                              {st.format}
                            </span>
                            <span
                              className={`text-[10px] font-bold ${
                                isAlmostSoldOut ? 'text-red-400 animate-pulse' : 'text-emerald-400'
                              }`}
                            >
                              {st.availableSeatCount} seats left
                            </span>
                          </div>

                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-xl font-black text-white group-hover:text-rose-400 transition-colors">
                              {st.time}
                            </span>
                            <span className="text-xs text-gray-400 truncate max-w-[140px]">
                              {st.screenName}
                            </span>
                          </div>

                          <div className="mt-2 text-xs text-gray-400">
                            Lowest rate: <strong className="text-emerald-400">${lowestQuote.total.toFixed(2)}</strong> via {lowestQuote.provider}
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2">
                          <button
                            onClick={() => openComparisonModal(st, movie)}
                            className="flex-1 py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-rose-600/20 transition-colors"
                          >
                            <span>Compare Rates</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => openSeatMapModal(st, movie)}
                            className="p-2 rounded-lg bg-[#1a2236] hover:bg-[#222d47] text-gray-300 hover:text-white border border-gray-700 transition-colors"
                            title="Interactive Seat Map"
                            aria-label="Interactive Seat Map"
                          >
                            <Armchair className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
