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
    <div className="min-h-screen bg-[#06080e] pb-24">
      {/* Page Header */}
      <div className="border-b border-[#1e2638] bg-gradient-to-b from-[#14122e] to-[#06080e] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Music className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Live Concert & Tour Aggregator
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Live Concerts, Comedy & Sports
          </h1>
          <p className="text-sm text-gray-400 mt-1 max-w-2xl">
            Compare primary and resale tickets across Ticketmaster, StubHub, SeatGeek, and AXS with transparent fee calculation.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-4 rounded-2xl bg-[#0d121e] border border-[#1e2638] space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by artist, venue, team, or city..."
                className="w-full bg-[#131929] border border-[#1e2638] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-white/5 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-[#141b2a] text-gray-400 hover:text-white border border-[#1e2638]'
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
            <span className="text-xs text-gray-400 font-medium">
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
