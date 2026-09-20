'use client';

import React from 'react';
import { Movie } from '@/types';
import { getCriticConsensus } from '@/services/ai';
import { useApp } from '@/context/AppContext';
import {
  Sparkles,
  Star,
  CheckCircle2,
  Tv,
  Film,
  Armchair,
  ChevronRight,
} from 'lucide-react';

export function CriticConsensus({ movie }: { movie: Movie }) {
  const { openSeatAdvisor } = useApp();
  const consensus = getCriticConsensus(movie);

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-[#0d0f14] border border-neutral-800 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-neutral-800/80">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-red-950/70 border border-red-500/40 text-[#e51821] flex items-center justify-center shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-tight">
                AI Critic & Audience Consensus
              </h3>
              <span className="px-2.5 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-200">
                Rotten Tomatoes {movie.rtScore}% • IMDb {movie.imdbScore}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
              Verified critical reception and theatrical viewing guidance
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            openSeatAdvisor(
              movie.formats.includes('IMAX 70mm') ? 'IMAX 70mm' : movie.formats[0] || 'Dolby Cinema',
              'Premier Cinema'
            )
          }
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-sm font-semibold text-neutral-200 hover:text-white transition-colors"
        >
          <Armchair className="w-4 h-4 text-[#e51821]" />
          <span>Seat Advisor</span>
        </button>
      </div>

      {/* 3-Point Consensus Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {/* 1. The Verdict */}
        <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/80 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>The Critical Verdict</span>
          </span>
          <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed">
            {consensus.verdict}
          </p>
        </div>

        {/* 2. Target Audience */}
        <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/80 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-yellow-400 flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5" />
            <span>Audience & Tone Guide</span>
          </span>
          <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed">
            {consensus.whoItsFor}
          </p>
        </div>

        {/* 3. Recommended Format */}
        <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/80 space-y-2 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Tv className="w-3.5 h-3.5" />
              <span>Recommended Format</span>
            </span>
            <p className="text-white font-bold text-sm mt-1">
              {consensus.recommendedFormat}
            </p>
            <p className="text-neutral-300 text-xs leading-relaxed mt-1.5">
              {consensus.formatRationale}
            </p>
          </div>

          <button
            onClick={() =>
              openSeatAdvisor(
                movie.formats.includes('IMAX 70mm') ? 'IMAX 70mm' : movie.formats[0] || 'Dolby Cinema',
                'Premier Cinema'
              )
            }
            className="mt-2 text-xs font-bold text-[#e51821] hover:text-red-400 flex items-center gap-1 sm:hidden transition-colors"
          >
            <span>View optimal seat rows</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
