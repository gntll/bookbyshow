'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { MOVIES, CINEMAS, getShowtimesForMovie } from '@/data/mockData';
import { DateRibbon } from '@/components/home/DateRibbon';
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
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);

  if (!movie) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <Film className="w-12 h-12 text-neutral-600 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Movie Not Found</h1>
        <p className="text-sm text-neutral-400 mb-6 max-w-md">
          The requested film listing might have concluded its theatrical run or been moved.
        </p>
        <Link
          href="/movies"
          className="px-5 py-2.5 rounded-lg bg-[#e51821] hover:bg-[#c9121a] text-white text-sm font-bold transition-colors"
        >
          Browse All Now Showing
        </Link>
      </div>
    );
  }

  const isSaved = isItemInWatchlist(movie.id);
  const movieShowtimes = getShowtimesForMovie(movie.id, selectedDate);

  const cinemasWithShowtimes = CINEMAS.map((cinema) => {
    const times = movieShowtimes.filter((s) => {
      const matchesCinema = s.cinemaId === cinema.id;
      const matchesFormat = selectedFormat === 'All' || s.format === selectedFormat;
      return matchesCinema && matchesFormat;
    });
    return { cinema, times };
  }).filter((g) => g.times.length > 0);

  return (
    <div className="min-h-screen bg-[#060709] pb-24">
      {/* Top Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <Link
          href="/movies"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#e51821]" />
          <span>Back to All Movies</span>
        </Link>
      </div>

      {/* Cinematic Backdrop Hero */}
      <div className="relative w-full overflow-hidden min-h-[440px] flex items-center bg-[#060709] border-b border-neutral-800">
        <img
          src={movie.backdropUrl}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-20 filter brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-[#060709]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060709] via-[#060709]/90 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Poster Thumbnail */}
            <div className="w-44 sm:w-52 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 shrink-0 relative group">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => openTrailerModal(movie.trailerYoutubeId, movie.title)}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
              >
                <div className="w-12 h-12 rounded-full bg-[#e51821] text-white flex items-center justify-center shadow-xl">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
              </button>
            </div>

            {/* Info details */}
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-red-950/70 text-red-300 border border-[#e51821]/50 text-xs font-bold uppercase">
                  Now In Theatres
                </span>
                <span className="px-2.5 py-0.5 rounded bg-neutral-900 text-neutral-300 text-xs font-medium border border-neutral-800">
                  {movie.certificateRating}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-neutral-900 text-neutral-200 text-xs font-medium border border-neutral-800 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-neutral-300 text-neutral-300" />
                  {movie.imdbScore} IMDb
                </span>
                <span className="px-2.5 py-0.5 rounded bg-neutral-900 text-neutral-300 text-xs font-medium border border-neutral-800">
                  RT {movie.rtScore}% Rotten Tomatoes
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                {movie.title}
              </h1>
              <p className="text-sm sm:text-base text-neutral-400 italic font-normal">
                &ldquo;{movie.tagline}&rdquo;
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-neutral-500" />
                  <span>{Math.floor(movie.runtimeMinutes / 60)}h {movie.runtimeMinutes % 60}m</span>
                </div>
                <span>•</span>
                <span>{movie.genre.join(', ')}</span>
                <span>•</span>
                <span>Directed by <strong className="text-white">{movie.director}</strong></span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl">
                {movie.synopsis}
              </p>

              <div className="text-xs text-neutral-400">
                <strong className="text-neutral-300">Starring: </strong>
                {movie.cast.join(', ')}
              </div>

              {/* Actions row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => openTrailerModal(movie.trailerYoutubeId, movie.title)}
                  className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-semibold text-xs flex items-center gap-2 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Watch Trailer</span>
                </button>

                <button
                  onClick={() => openAlertModal(movie.title, movie.lowestPrice)}
                  className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 font-medium text-xs flex items-center gap-1.5 transition-colors"
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
                  className={`px-4 py-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isSaved
                      ? 'bg-[#e51821] border-[#e51821] text-white'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:text-white'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
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
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>Showtimes & Seating Availability</span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-red-950/70 text-red-300 border border-[#e51821]/40">
                Live Quotes
              </span>
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Select any showtime to compare AMC, Fandango, and Regal prices side-by-side
            </p>
          </div>

          {/* Format filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {['All', ...movie.formats].map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                  selectedFormat === fmt
                    ? 'bg-[#e51821] text-white shadow-md'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>

        {/* Date Selector Strip */}
        <div className="mb-6 p-4 rounded-2xl bg-[#0e1015] border border-neutral-800 shadow-md">
          <DateRibbon selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        </div>

        {/* Cinemas list */}
        {cinemasWithShowtimes.length === 0 ? (
          <div className="p-12 rounded-2xl bg-[#0e1015] border border-neutral-800 text-center text-neutral-400">
            <Armchair className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
            <p className="text-sm font-semibold text-white">No showtimes found for {selectedFormat}</p>
            <p className="text-xs text-neutral-500 mt-1">Try switching format filters or selecting another date.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {cinemasWithShowtimes.map(({ cinema, times }) => (
              <div
                key={cinema.id}
                className="p-6 rounded-2xl bg-[#0e1015] border border-neutral-800 shadow-xl space-y-4"
              >
                {/* Cinema header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#e51821]">
                        {cinema.chain}
                      </span>
                      <h3 className="font-bold text-white text-base sm:text-lg">
                        {cinema.name}
                      </h3>
                    </div>
                    <p className="text-xs text-neutral-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#e51821]" />
                      <span>{cinema.address} • {cinema.distanceMiles} miles away</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {cinema.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-900 text-neutral-300 border border-neutral-800"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Showtimes grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {times.map((st) => {
                    const lowestQuote = [...st.quotes].sort((a, b) => a.total - b.total)[0];
                    const isAlmostSoldOut = st.seatAvailability === 'almost_sold_out';

                    return (
                      <div
                        key={st.id}
                        className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-[#e51821]/50 transition-colors flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-neutral-900 text-neutral-300 border border-neutral-800">
                              {st.format}
                            </span>
                            <span
                              className={`text-[10px] font-medium ${
                                isAlmostSoldOut ? 'text-red-400 font-semibold' : 'text-neutral-400'
                              }`}
                            >
                              {st.availableSeatCount} seats left
                            </span>
                          </div>

                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                              {st.time}
                            </span>
                            <span className="text-xs text-neutral-500 truncate max-w-[140px]">
                              {st.screenName}
                            </span>
                          </div>

                          <div className="mt-2 text-xs text-neutral-400">
                            Lowest rate: <strong className="text-white">${lowestQuote.total.toFixed(2)}</strong> via {lowestQuote.provider}
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center gap-2">
                          <button
                            onClick={() => openComparisonModal(st, movie)}
                            className="flex-1 py-2 px-3 rounded-lg bg-[#e51821] hover:bg-[#c9121a] text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-red-950/40 transition-colors"
                          >
                            <span>Compare Rates</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => openSeatMapModal(st, movie)}
                            className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 transition-colors"
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
