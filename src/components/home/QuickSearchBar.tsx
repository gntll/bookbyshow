'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Search, MapPin, Film, Music, ArrowRight } from 'lucide-react';
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
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10">
      <div className="p-4 sm:p-5 rounded-xl bg-neutral-900 border border-neutral-800 shadow-xl">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 mb-4 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
              activeTab === 'all'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
            }`}
          >
            All Listings
          </button>

          <button
            onClick={() => setActiveTab('movies')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 flex items-center gap-1.5 ${
              activeTab === 'movies'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Movies & Cinemas</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 flex items-center gap-1.5 ${
              activeTab === 'events'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
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
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Search movies, artists, genres, or venues..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
            />
          </div>

          {/* City / Location button */}
          <div className="md:col-span-4">
            <button
              type="button"
              onClick={() => setIsCityModalOpen(true)}
              className="w-full bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-left flex items-center justify-between text-neutral-300 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2 truncate">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span className="truncate">{currentCity.name}, {currentCity.stateOrRegion}</span>
              </div>
              <span className="text-[10px] text-neutral-500 uppercase font-semibold">Change</span>
            </button>
          </div>

          {/* Action */}
          <div className="md:col-span-3">
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-white hover:bg-neutral-200 text-black font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Compare Rates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Popular quick tags */}
        <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center gap-2 overflow-x-auto text-xs text-neutral-400 scrollbar-none">
          <span className="shrink-0 text-neutral-500 text-[11px] font-medium">Trending Searches:</span>
          {POPULAR_SEARCH_TAGS.map((tag, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setInputVal(tag);
                setIsSearchModalOpen(true);
              }}
              className="px-2.5 py-1 rounded-md bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 text-xs shrink-0 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
