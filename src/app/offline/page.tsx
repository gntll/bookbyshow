'use client';

import React from 'react';
import Link from 'next/link';
import { WifiOff, RotateCcw, Home, Bookmark } from 'lucide-react';

export default function OfflinePage() {
  const handleRetry = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <main className="min-h-screen bg-[#06080e] text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl shadow-rose-950/20">
        <div className="w-20 h-20 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto text-rose-400">
          <WifiOff className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold tracking-wide uppercase">
            Offline Mode
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">
            No Internet Connection
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            You appear to be offline. BookByShow has cached your recently viewed showtimes and saved events so you can still access them.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleRetry}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold text-sm transition-all shadow-lg shadow-rose-500/25 active:scale-98"
          >
            <RotateCcw className="w-4 h-4" />
            Retry Connection
          </button>
          <Link
            href="/watchlist"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-sm transition-all"
          >
            <Bookmark className="w-4 h-4 text-amber-400" />
            Watchlist
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-800/80">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            Return to Home (Cached)
          </Link>
        </div>
      </div>
    </main>
  );
}
