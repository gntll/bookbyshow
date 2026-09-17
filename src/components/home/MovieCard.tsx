'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Movie } from '@/types';
import { Star, Play, Bookmark, Ticket } from 'lucide-react';

export function MovieCard({ movie }: { movie: Movie }) {
  const { openTrailerModal, toggleWatchlist, isItemInWatchlist } = useApp();
  const isSaved = isItemInWatchlist(movie.id);

  return (
    <div className="group relative rounded-2xl bg-[#0d121e] border border-[#1e2638] overflow-hidden flex flex-col hover:border-rose-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl shadow-black/40">
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-900">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d121e] via-transparent to-black/40" />

        {/* Top Badges: Certificate, Status & Watchlist */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white uppercase">
              {movie.certificateRating}
            </span>
            {movie.releaseStatusLabel && (
              <span className={`px-2 py-0.5 rounded-md backdrop-blur-md border text-[10px] font-bold ${
                movie.status === 'advance_booking'
                  ? 'bg-amber-500/90 text-black border-amber-300 shadow-sm'
                  : movie.status === 'coming_soon'
                  ? 'bg-purple-600/90 text-white border-purple-400 shadow-sm'
                  : 'bg-emerald-500/90 text-black border-emerald-300 shadow-sm'
              }`}>
                {movie.releaseStatusLabel}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWatchlist({
                id: movie.id,
                type: 'movie',
                title: movie.title,
                posterUrl: movie.posterUrl,
                dateOrRuntime: `${movie.runtimeMinutes} min`,
                lowestPrice: movie.lowestPrice,
              });
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              isSaved
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/50'
                : 'bg-black/60 text-gray-300 hover:text-white hover:bg-black/80'
            }`}
            title={isSaved ? 'Remove from Watchlist' : 'Add to Watchlist'}
            aria-label="Toggle watchlist"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Trailer play button overlay */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openTrailerModal(movie.trailerYoutubeId, movie.title);
          }}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
          aria-label={`Play trailer for ${movie.title}`}
        >
          <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-lg shadow-rose-600/50 transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </button>

        {/* Bottom Poster Bar: Ratings & Formats */}
        <div className="absolute bottom-2.5 inset-x-3 z-10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-amber-400 font-bold border border-amber-500/30">
            <Star className="w-3 h-3 fill-amber-400" />
            <span>{movie.imdbScore}</span>
          </div>

          <div className="px-2 py-0.5 rounded bg-red-950/80 backdrop-blur-md text-red-400 font-semibold border border-red-500/30 text-[11px]">
            🍅 {movie.rtScore}%
          </div>
        </div>
      </div>

      {/* Details Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex flex-wrap gap-1 mb-1.5">
            {movie.formats.slice(0, 2).map((fmt, idx) => (
              <span
                key={idx}
                className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#141d2e] text-cyan-300 border border-cyan-500/30"
              >
                {fmt}
              </span>
            ))}
            {movie.formats.length > 2 && (
              <span className="px-1.5 py-0.5 rounded text-[10px] text-gray-400 bg-black/40">
                +{movie.formats.length - 2}
              </span>
            )}
          </div>

          <Link href={`/movie/${movie.slug}`}>
            <h3 className="font-bold text-white text-base line-clamp-1 group-hover:text-rose-400 transition-colors">
              {movie.title}
            </h3>
          </Link>

          <p className="text-xs text-gray-400 mt-1 line-clamp-1">
            {movie.genre.join(' • ')}
          </p>
        </div>

        {/* Price & Compare Button */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase text-gray-500 font-semibold block">
              Lowest Rate
            </span>
            <span className="text-sm font-extrabold text-emerald-400">
              ${movie.lowestPrice.toFixed(2)}
            </span>
          </div>

          <Link
            href={`/movie/${movie.slug}`}
            className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1 shadow-md shadow-rose-600/20 transition-colors"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Compare</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
