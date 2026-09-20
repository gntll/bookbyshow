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
  ChevronLeft,
  ChevronRight,
  Bookmark,
} from 'lucide-react';

export function HeroBanner() {
  const spotlightMovies = MOVIES.filter((m) => m.isSpotlight);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { openTrailerModal, toggleWatchlist, isItemInWatchlist } = useApp();

  const current = spotlightMovies[currentIndex] || spotlightMovies[0];

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
    <div className="relative w-full overflow-hidden bg-[#060709] min-h-[560px] lg:min-h-[620px] flex items-center border-b border-neutral-800/80">
      {/* Background image with cinematic dark vignette */}
      <div className="absolute inset-0 z-0">
        <img
          key={current.id}
          src={current.backdropUrl}
          alt={current.title}
          className="w-full h-full object-cover object-center scale-105 transition-all duration-1000 opacity-25 filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-[#060709]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060709] via-[#060709]/90 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(229,24,33,0.12),transparent_50%)]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="max-w-2xl space-y-6">
          {/* Top badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-red-950/70 border border-[#e51821]/50 text-xs font-bold text-red-300 uppercase tracking-wider">
              Spotlight Premiere
            </span>
            <span className="px-2.5 py-1 rounded-md bg-neutral-900/90 border border-neutral-800 text-xs font-medium text-neutral-300">
              {current.certificateRating}
            </span>
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-900/90 border border-neutral-800 text-xs font-medium text-neutral-200">
              <Star className="w-3.5 h-3.5 fill-neutral-300 text-neutral-300" />
              {current.imdbScore} IMDb
            </span>
            <span className="px-2.5 py-1 rounded-md bg-neutral-900/90 border border-neutral-800 text-xs font-medium text-neutral-300">
              RT {current.rtScore}%
            </span>
          </div>

          {/* Title & Tagline */}
          <div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              {current.title}
            </h1>
            <p className="text-sm sm:text-base text-neutral-400 font-normal italic mt-2">
              &ldquo;{current.tagline}&rdquo;
            </p>
          </div>

          {/* Synopsis */}
          <p className="text-sm sm:text-base text-neutral-200 line-clamp-3 leading-relaxed max-w-xl">
            {current.synopsis}
          </p>

          {/* Formats and metadata */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-300">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-neutral-400" />
              <span>{Math.floor(current.runtimeMinutes / 60)}h {current.runtimeMinutes % 60}m</span>
            </div>
            <span>•</span>
            <span>{current.genre.join(', ')}</span>
            <span>•</span>
            <div className="flex flex-wrap gap-1.5">
              {current.formats.slice(0, 3).map((fmt, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded text-xs font-semibold bg-neutral-900 border border-neutral-700 text-neutral-200"
                >
                  {fmt}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs: Punchy AMC-style red pill button */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <Link
              href={`/movie/${current.slug}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#e51821] hover:bg-[#c9121a] text-white font-bold text-sm shadow-xl shadow-red-950/60 transition-transform hover:scale-102"
            >
              <Ticket className="w-4 h-4 fill-white" />
              <span>Compare Showtimes (From ${current.lowestPrice.toFixed(2)})</span>
            </Link>

            <button
              onClick={() => openTrailerModal(current.trailerYoutubeId, current.title)}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 text-white font-semibold text-sm transition-colors"
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
              className={`p-3.5 rounded-full border transition-colors ${
                isSaved
                  ? 'bg-[#e51821] border-[#e51821] text-white'
                  : 'bg-neutral-900/90 border-neutral-700 text-neutral-400 hover:text-white'
              }`}
              title={isSaved ? 'In Watchlist' : 'Add to Watchlist'}
              aria-label="Save to watchlist"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Slide Indicators & Arrows */}
      <div className="absolute bottom-6 right-4 sm:right-8 z-20 flex items-center gap-3">
        <div className="flex items-center gap-1.5 mr-2">
          {spotlightMovies.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === idx ? 'w-6 bg-[#e51821]' : 'w-2 bg-neutral-700'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handlePrev}
          className="p-2 rounded-lg bg-neutral-900/80 border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          className="p-2 rounded-lg bg-neutral-900/80 border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
