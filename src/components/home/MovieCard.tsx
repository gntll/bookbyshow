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
    <div className="group relative rounded-xl bg-[#0f1115] border border-neutral-800/80 overflow-hidden flex flex-col hover:border-[#e51821]/50 transition-all duration-200 shadow-lg">
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-900">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-md border border-neutral-700 text-[10px] font-bold text-white uppercase">
              {movie.certificateRating}
            </span>
            {movie.releaseStatusLabel && (
              <span className="px-2 py-0.5 rounded bg-red-950/85 backdrop-blur-md border border-red-500/40 text-[10px] font-semibold text-red-200">
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
            className={`p-1.5 rounded-full backdrop-blur-md transition-colors ${
              isSaved
                ? 'bg-[#e51821] text-white shadow-md'
                : 'bg-black/60 text-neutral-300 hover:text-white hover:bg-black/80'
            }`}
            title={isSaved ? 'Remove from Watchlist' : 'Add to Watchlist'}
            aria-label="Toggle watchlist"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Trailer play overlay */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openTrailerModal(movie.trailerYoutubeId, movie.title);
          }}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
          aria-label={`Play trailer for ${movie.title}`}
        >
          <div className="w-11 h-11 rounded-full bg-[#e51821] text-white flex items-center justify-center shadow-xl transform scale-95 group-hover:scale-100 transition-transform">
            <Play className="w-4 h-4 fill-white ml-0.5" />
          </div>
        </button>

        {/* Bottom Poster Bar: Ratings */}
        <div className="absolute bottom-2.5 inset-x-2.5 z-10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-neutral-200 font-semibold border border-neutral-700 text-[11px]">
            <Star className="w-3 h-3 fill-neutral-300 text-neutral-300" />
            <span>{movie.imdbScore}</span>
          </div>

          <div className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-neutral-200 font-medium border border-neutral-700 text-[11px]">
            RT {movie.rtScore}%
          </div>
        </div>
      </div>

      {/* Details Body */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          <div className="flex flex-wrap gap-1 mb-1">
            {movie.formats.slice(0, 2).map((fmt, idx) => (
              <span
                key={idx}
                className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-neutral-900 text-neutral-300 border border-neutral-800"
              >
                {fmt}
              </span>
            ))}
            {movie.formats.length > 2 && (
              <span className="px-1.5 py-0.5 rounded text-[10px] text-neutral-500 bg-neutral-900 border border-neutral-800">
                +{movie.formats.length - 2}
              </span>
            )}
          </div>

          <Link href={`/movie/${movie.slug}`}>
            <h3 className="font-bold text-white text-sm line-clamp-1 group-hover:text-red-400 transition-colors">
              {movie.title}
            </h3>
          </Link>

          <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">
            {movie.genre.join(' • ')}
          </p>
        </div>

        {/* Price & Compare Button: Bold cinema red CTA */}
        <div className="pt-2 border-t border-neutral-800 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase text-neutral-400 font-semibold block leading-tight">
              Lowest Rate
            </span>
            <span className="text-xs font-bold text-white">
              ${movie.lowestPrice.toFixed(2)}
            </span>
          </div>

          <Link
            href={`/movie/${movie.slug}`}
            className="px-3.5 py-2 min-h-[36px] rounded-lg bg-[#e51821] hover:bg-[#c9121a] text-white text-xs font-bold inline-flex items-center gap-1 shadow-sm shadow-red-950/40 transition-colors focus:outline-none focus:ring-2 focus:ring-[#e51821] focus:ring-offset-2 focus:ring-offset-neutral-900"
          >
            <Ticket className="w-3 h-3" />
            <span>Compare</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
