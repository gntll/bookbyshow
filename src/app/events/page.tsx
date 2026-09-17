'use client';

import React, { useState, useMemo } from 'react';
import { EVENTS } from '@/data/mockData';
import { EventCard } from '@/components/home/EventCard';
import { Music, Search } from 'lucide-react';

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Live Events' },
    { id: 'concert', label: 'Concerts & Stadium Tours' },
    { id: 'comedy', label: 'Standup Comedy' },
    { id: 'sports', label: 'Live Sports' },
    { id: 'theatre', label: 'Broadway & Theatre' },
  ];

  const filtered = useMemo(() => {
    return EVENTS.filter((e) => {
      const matchesCategory = selectedCategory === 'all' || e.category === selectedCategory;
      const matchesSearch =
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.artistOrHost.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.venueName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.venueCity.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#09090b] pb-24">
      {/* Page Header */}
      <div className="border-b border-neutral-800 bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded-md bg-neutral-850 text-neutral-300 border border-neutral-700">
              <Music className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Live Concert & Tour Aggregator
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Live Concerts, Comedy & Sports
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
            Compare primary and resale tickets across Ticketmaster, StubHub, SeatGeek, and AXS with transparent fee calculation.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-4 rounded-xl bg-[#121215] border border-neutral-800 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by artist, venue, team, or city..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
              />
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-neutral-800/80 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-white text-black font-semibold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-neutral-400 font-medium">
              Showing {filtered.length} of {EVENTS.length} events
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
