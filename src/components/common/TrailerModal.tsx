'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { X } from 'lucide-react';

export function TrailerModal() {
  const { activeTrailer, closeTrailerModal } = useApp();

  if (!activeTrailer) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="trailer-title"
    >
      <div
        className="relative w-full max-w-4xl bg-[#121215] border border-neutral-800 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 bg-neutral-950 border-b border-neutral-800">
          <h3 id="trailer-title" className="text-sm font-semibold text-white tracking-wide">
            {activeTrailer.title} — Official Trailer
          </h3>
          <button
            onClick={closeTrailerModal}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close trailer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${activeTrailer.youtubeId}?autoplay=1&rel=0`}
            title={`${activeTrailer.title} Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
