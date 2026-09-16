'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { MOVIES } from '@/data/mockData';
import {
  Play,
  Ticket,
  Star,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Bookmark,
} from 'lucide-react';

export function HeroBanner() {
  const spotlightMovies = MOVIES.filter((m) => m.isSpotlight);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { openTrailerModal, toggleWatchlist, isItemInWatchlist } = useApp();

  const current = spotlightMovies[currentIndex] || spotlightMovies[0];

  // Auto rotate banner every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % spotlightMovies.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [spotlightMovies.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + spotlightMovies.length) % spotlightMovies.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % spotlightMovies.length);
  };

  const isSaved = isItemInWatchlist(current.id);

  return (
    <div className="relative w-full overflow-hidden bg-[#06080e] min-h-[580px] lg:min-h-[660px] flex items-center">
      {/* Background Cinematic Image with Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          key={current.id}
          src={current.backdropUrl}
          alt={current.title}
          className="w-full h-full object-cover object-center scale-105 transition-all duration-1000 opacity-35 filter brightness-90"
        />
        {/* Layered vignette overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06080e] via-[#06080e]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06080e] via-[#06080e]/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(225,29,72,0.15),transparent_60%)]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="max-w-2xl space-y-6">
          {/* Top badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-600/20 text-rose-400 border border-rose-500/40 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Spotlight Premiere
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#121826] border border-[#1e2638] text-xs font-semibold text-gray-300">
              {current.certificateRating}
            </span>
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#121826] border border-[#1e2638] text-xs font-semibold text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              {current.imdbScore} IMDb
            </span>
            <span className="px-2.5 py-1 rounded-full bg-red-950/40 border border-red-500/40 text-xs font-semibold text-red-400">
              🍅 {current.rtScore}% Rotten Tomatoes
            </span>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              {current.title}
            </h1>
            <p className="text-base sm:text-lg text-rose-300 font-medium italic mt-2">
              &ldquo;{current.tagline}&rdquo;
            </p>
          </div>

          {/* Synopsis */}
          <p className="text-sm sm:text-base text-gray-300 line-clamp-3 leading-relaxed max-w-xl">
            {current.synopsis}
          </p>

          {/* Formats and metadata */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-300">
            <div className="flex items-center gap-1 text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{Math.floor(current.runtimeMinutes / 60)}h {current.runtimeMinutes % 60}m</span>
            </div>
            <span>•</span>
            <span className="text-gray-400">{current.genre.join(', ')}</span>
            <span>•</span>
            <div className="flex flex-wrap gap-1.5">
              {current.formats.slice(0, 3).map((fmt, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#141c2c] border border-cyan-500/40 text-cyan-300"
                >
                  {fmt}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <Link
              href={`/movie/${current.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-sm shadow-xl shadow-rose-600/30 transition-all hover:scale-105"
            >
              <Ticket className="w-4 h-4" />
              <span>Compare Showtimes (From ${current.lowestPrice.toFixed(2)})</span>
            </Link>

            <button
              onClick={() => openTrailerModal(current.trailerYoutubeId, current.title)}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#121826]/90 hover:bg-[#182032] border border-[#1e2638] text-white font-semibold text-sm transition-all hover:scale-105"
            >
              <Play className="w-4 h-4 fill-white text-white" />
              <span>Watch Trailer</span>
            </button>

            <button
              onClick={() =>
                toggleWatchlist({
                  id: current.id,
                  type: 'movie',
                  title: current.title,
                  posterUrl: current.posterUrl,
                  dateOrRuntime: `${current.runtimeMinutes} min`,
                  lowestPrice: current.lowestPrice,
                })
              }
              className={`p-3.5 rounded-xl border transition-all ${
                isSaved
                  ? 'bg-rose-600/20 border-rose-500 text-rose-400'
                  : 'bg-[#121826]/90 border-[#1e2638] text-gray-400 hover:text-white'
              }`}
              title={isSaved ? 'In Watchlist' : 'Add to Watchlist'}
              aria-label="Save to watchlist"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
            </button>
          </div>

          {/* Aggregator guarantee pill */}
          <div className="pt-2 flex items-center gap-2 text-xs text-gray-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Comparing AMC, Regal, Cinemark & Fandango in real time</span>
          </div>
        </div>
      </div>

      {/* Slide Controls */}
      <div className="hidden sm:flex absolute right-8 bottom-8 z-20 items-center gap-3">
        <button
          onClick={handlePrev}
          className="p-2.5 rounded-full bg-[#121826]/80 hover:bg-white/10 border border-[#1e2638] text-gray-400 hover:text-white transition-colors"
          aria-label="Previous movie"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5">
          {spotlightMovies.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? 'w-7 bg-rose-500' : 'w-2 bg-gray-700 hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-2.5 rounded-full bg-[#121826]/80 hover:bg-white/10 border border-[#1e2638] text-gray-400 hover:text-white transition-colors"
          aria-label="Next movie"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
