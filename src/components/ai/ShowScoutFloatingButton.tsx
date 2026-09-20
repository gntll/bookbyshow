'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Sparkles, Bot } from 'lucide-react';

export function ShowScoutFloatingButton() {
  const { openShowScout } = useApp();

  return (
    <button
      onClick={() => openShowScout()}
      aria-label="Ask ShowScout AI Concierge"
      className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#e51821] to-red-700 text-white shadow-xl shadow-red-950/60 hover:shadow-red-700/40 hover:scale-105 active:scale-95 transition-all duration-200 border border-red-500/50"
    >
      <div className="relative flex items-center justify-center">
        <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
        <span className="absolute -top-1 -right-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-300" />
        </span>
      </div>

      <span className="text-xs font-black tracking-wide uppercase hidden sm:inline">
        Ask ShowScout AI
      </span>
      <span className="text-xs font-black tracking-wide uppercase sm:hidden">
        AI
      </span>
    </button>
  );
}
