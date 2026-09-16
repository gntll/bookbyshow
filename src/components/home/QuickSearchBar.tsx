'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Search, MapPin, Film, Music, Sparkles, ArrowRight } from 'lucide-react';
import { POPULAR_SEARCH_TAGS } from '@/data/mockData';

export function QuickSearchBar() {
  const router = useRouter();
  const { currentCity, setIsCityModalOpen, setIsSearchModalOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'movies' | 'events'>('all');
  const [inputVal, setInputVal] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) {
      setIsSearchModalOpen(true);
      return;
    }
    if (activeTab === 'movies') {
      router.push(`/movies?q=${encodeURIComponent(inputVal.trim())}`);
    } else if (activeTab === 'events') {
      router.push(`/events?q=${encodeURIComponent(inputVal.trim())}`);
    } else {
      setIsSearchModalOpen(true);
    }
  };

  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12">
      <div className="p-4 sm:p-6 rounded-2xl bg-[#0d121e]/95 backdrop-blur-xl border border-[#1e2638] shadow-2xl shadow-black/80">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              activeTab === 'all'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                : 'bg-[#141b2a] text-gray-400 hover:text-white border border-[#1e2638]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>All Entertainment</span>
          </button>

          <button
            onClick={() => setActiveTab('movies')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              activeTab === 'movies'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                : 'bg-[#141b2a] text-gray-400 hover:text-white border border-[#1e2638]'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Movies & Cinemas</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              activeTab === 'events'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                : 'bg-[#141b2a] text-gray-400 hover:text-white border border-[#1e2638]'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span>Concerts & Live Shows</span>
          </button>
        </div>

        {/* Form Inputs Grid */}
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Main search keyword */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Search movies, artists, genres, or venues..."
              className="w-full bg-[#121826] border border-[#1e2638] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          {/* City / Location button */}
          <div className="md:col-span-4">
            <button
              type="button"
              onClick={() => setIsCityModalOpen(true)}
              className="w-full bg-[#121826] border border-[#1e2638] hover:border-gray-600 rounded-xl px-4 py-3 text-sm text-left flex items-center justify-between text-gray-300 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2 truncate">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span className="truncate">{currentCity.name}, {currentCity.stateOrRegion}</span>
              </div>
              <span className="text-[11px] text-gray-400 uppercase font-semibold">Change</span>
            </button>
          </div>

          {/* Quick Date Indicator & Action */}
          <div className="md:col-span-3 flex items-center gap-2">
            <button
              type="submit"
              className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-sm shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span>Compare Rates</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Popular quick tags */}
        <div className="mt-3.5 pt-3 border-t border-white/5 flex items-center gap-2 overflow-x-auto text-xs text-gray-400 scrollbar-none">
          <span className="shrink-0 text-gray-400 text-[11px] font-semibold">Trending Searches:</span>
          {POPULAR_SEARCH_TAGS.map((tag, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setInputVal(tag);
                setIsSearchModalOpen(true);
              }}
              className="shrink-0 px-2.5 py-1 rounded-lg bg-[#121826] hover:bg-[#182032] border border-[#1e2638] hover:border-gray-500 text-gray-300 hover:text-white transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
