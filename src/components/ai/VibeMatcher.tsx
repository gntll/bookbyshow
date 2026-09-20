'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { VIBES } from '@/services/ai';
import { MOVIES, EVENTS } from '@/data/mockData';
import {
  Brain,
  Flame,
  Heart,
  Sparkles,
  Smile,
  Ghost,
  ChevronRight,
  Ticket,
  Film,
  Calendar,
} from 'lucide-react';

export function VibeMatcher() {
  const [selectedVibeId, setSelectedVibeId] = useState<string>(VIBES[0].id);

  const activeVibe = VIBES.find((v) => v.id === selectedVibeId) || VIBES[0];

  const matchedMovies = MOVIES.filter((m) => activeVibe.movieMatches.includes(m.slug));
  const matchedEvents = EVENTS.filter((e) => activeVibe.eventMatches.includes(e.slug));

  const getVibeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain':
        return <Brain className="w-4 h-4" />;
      case 'Flame':
        return <Flame className="w-4 h-4" />;
      case 'Heart':
        return <Heart className="w-4 h-4" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'Smile':
        return <Smile className="w-4 h-4" />;
      case 'Ghost':
        return <Ghost className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0e1017] to-[#07080b] border border-neutral-800 shadow-2xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-red-950/70 border border-red-500/40 text-[10px] font-bold text-red-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                <span>AI Taste Engine</span>
              </span>
              <span className="text-xs text-neutral-400 font-medium">
                Personalized Mood Discovery
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Match Your Entertainment Vibe
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              Don&apos;t know what to watch? Tell us your mood and let our AI engine pair you with optimal theater formats and live tours.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80 max-w-sm">
            <p className="text-xs text-neutral-300 italic leading-relaxed">
              &ldquo;{activeVibe.rationale}&rdquo;
            </p>
          </div>
        </div>

        {/* Vibe Selection Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2">
          {VIBES.map((vibe) => {
            const isSelected = vibe.id === selectedVibeId;
            return (
              <button
                key={vibe.id}
                onClick={() => setSelectedVibeId(vibe.id)}
                className={`p-3 rounded-2xl flex flex-col items-start text-left transition-all border ${
                  isSelected
                    ? 'bg-[#e51821] text-white border-red-400 shadow-lg shadow-red-950/50 scale-102'
                    : 'bg-neutral-900/80 text-neutral-300 hover:text-white hover:bg-neutral-800 border-neutral-800'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center mb-2 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  {getVibeIcon(vibe.iconName)}
                </div>
                <span className="text-xs font-bold leading-snug">{vibe.label}</span>
                <span
                  className={`text-[10px] mt-1 line-clamp-1 ${
                    isSelected ? 'text-red-100' : 'text-neutral-400'
                  }`}
                >
                  {vibe.tagline}
                </span>
              </button>
            );
          })}
        </div>

        {/* Matched Results Display */}
        <div className="pt-4 border-t border-neutral-800/80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              AI Recommendations for &ldquo;{activeVibe.label}&rdquo;
            </h3>
            <span className="text-xs text-neutral-400">
              {matchedMovies.length} movies • {matchedEvents.length} events
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Movies */}
            {matchedMovies.map((movie) => (
              <Link
                key={movie.id}
                href={`/movie/${movie.slug}`}
                className="group p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-[#e51821]/50 flex items-center gap-3 transition-colors"
              >
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-14 h-20 rounded-xl object-cover shrink-0 shadow-md group-hover:scale-102 transition-transform"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="px-1.5 py-0.2 rounded bg-red-950/80 text-red-300 text-[9px] font-bold uppercase">
                      Cinema
                    </span>
                    <span className="text-[10px] text-neutral-400 font-medium">
                      {movie.certificateRating}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-red-400 truncate">
                    {movie.title}
                  </h4>
                  <p className="text-[10px] text-neutral-400 truncate mt-0.5">
                    {movie.formats.slice(0, 2).join(' • ')}
                  </p>
                  <p className="text-[11px] font-bold text-white mt-1">
                    From ${movie.lowestPrice.toFixed(2)}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-white" />
              </Link>
            ))}

            {/* Events */}
            {matchedEvents.map((event) => (
              <Link
                key={event.id}
                href={`/event/${event.slug}`}
                className="group p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-[#e51821]/50 flex items-center gap-3 transition-colors"
              >
                <img
                  src={event.bannerUrl}
                  alt={event.title}
                  className="w-20 h-20 rounded-xl object-cover shrink-0 shadow-md group-hover:scale-102 transition-transform"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="px-1.5 py-0.2 rounded bg-blue-950/80 text-blue-300 text-[9px] font-bold uppercase">
                      Live Tour
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      {event.venueCity}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-red-400 truncate">
                    {event.title}
                  </h4>
                  <p className="text-[10px] text-neutral-400 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-2.5 h-2.5 text-[#e51821]" />
                    <span>{event.date}</span>
                  </p>
                  <p className="text-[11px] font-bold text-white mt-1">
                    From ${event.minPrice.toFixed(2)}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-white" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
