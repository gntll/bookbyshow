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
          <div className="w-8 h-8 rounded-lg bg-red-950/70 border border-red-500/40 text-[#e51821] flex items-center justify-center shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-tight">
                AI Critic & Audience Consensus
              </h3>
              <span className="px-2 py-0.2 rounded bg-neutral-900 border border-neutral-800 text-[10px] font-semibold text-neutral-300">
                Rotten Tomatoes {movie.rtScore}% • IMDb {movie.imdbScore}
              </span>
            </div>
            <p className="text-[11px] text-neutral-400">
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
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold text-neutral-200 hover:text-white transition-colors"
        >
          <Armchair className="w-3.5 h-3.5 text-[#e51821]" />
          <span>Seat Advisor</span>
        </button>
      </div>

      {/* 3-Point Consensus Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        {/* 1. The Verdict */}
        <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800/80 space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>The Critical Verdict</span>
          </span>
          <p className="text-neutral-300 text-[11px] leading-relaxed">
            {consensus.verdict}
          </p>
        </div>

        {/* 2. Target Audience */}
        <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800/80 space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-400 flex items-center gap-1">
            <Film className="w-3 h-3" />
            <span>Audience & Tone Guide</span>
          </span>
          <p className="text-neutral-300 text-[11px] leading-relaxed">
            {consensus.whoItsFor}
          </p>
        </div>

        {/* 3. Recommended Format */}
        <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800/80 space-y-1.5 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
              <Tv className="w-3 h-3" />
              <span>Recommended Format</span>
            </span>
            <p className="text-white font-bold text-xs mt-0.5">
              {consensus.recommendedFormat}
            </p>
            <p className="text-neutral-400 text-[10px] leading-relaxed mt-1">
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
            className="mt-2 text-[11px] font-bold text-[#e51821] hover:text-red-400 flex items-center gap-1 sm:hidden transition-colors"
          >
            <span>View optimal seat rows</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
