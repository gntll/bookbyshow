'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { CINEMAS } from '@/data/mockData';
import {
  MapPin,
  Star,
  Search,
  Film,
} from 'lucide-react';

export default function CinemasPage() {
  const { currentCity, setIsCityModalOpen } = useApp();
  const [selectedAmenity, setSelectedAmenity] = useState<string>('All');
  const [query, setQuery] = useState('');

  const amenities = [
    'All',
    'IMAX with Laser',
    'Dolby Cinema',
    'Signature Recliners',
    'Full Bar & Food',
    'Heated Recliners',
  ];

  const filtered = CINEMAS.filter((cinema) => {
    const matchesQuery =
      cinema.name.toLowerCase().includes(query.toLowerCase()) ||
      cinema.address.toLowerCase().includes(query.toLowerCase()) ||
      cinema.chain.toLowerCase().includes(query.toLowerCase());

    const matchesAmenity =
      selectedAmenity === 'All' || cinema.amenities.includes(selectedAmenity);

    return matchesQuery && matchesAmenity;
  });

  return (
    <div className="min-h-screen bg-[#060709] pb-24">
      {/* Header */}
      <div className="border-b border-neutral-800 bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1 rounded-md bg-red-950/70 text-red-300 border border-red-500/40">
                <Film className="w-3.5 h-3.5 text-[#e51821]" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#e51821]">
                Auditorium Directory
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Cinemas in {currentCity.name}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
              Locate authentic 70mm film auditoriums, dual-laser IMAX, Dolby Atmos, and in-seat dining.
            </p>
          </div>

          <button
            onClick={() => setIsCityModalOpen(true)}
            className="self-start md:self-auto px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#e51821]/50 text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-2 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-[#e51821]" />
            <span>Switch Metro: {currentCity.name}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Amenities Filter */}
        <div className="p-4 rounded-2xl bg-[#0e1015] border border-neutral-800 space-y-3 mb-8 shadow-xl">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cinema chains, amenities, or street address..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#e51821]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-neutral-800/80 scrollbar-none">
            <span className="text-xs text-neutral-500 font-medium px-2 shrink-0">Amenity:</span>
            {amenities.map((a) => (
              <button
                key={a}
                onClick={() => setSelectedAmenity(a)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                  selectedAmenity === a
                    ? 'bg-[#e51821] text-white shadow-sm'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Cinemas Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((cinema) => (
            <div
              key={cinema.id}
              className="rounded-2xl bg-[#0e1015] border border-neutral-800 overflow-hidden flex flex-col sm:flex-row gap-4 p-5 hover:border-[#e51821]/40 transition-colors shadow-lg"
            >
              <div className="w-full sm:w-48 aspect-video sm:aspect-square rounded-xl overflow-hidden bg-neutral-900 shrink-0 relative">
                <img
                  src={cinema.photoUrl}
                  alt={cinema.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-neutral-200 font-semibold text-xs flex items-center gap-1 border border-neutral-700">
                  <Star className="w-3 h-3 fill-neutral-300 text-neutral-300" />
                  <span>{cinema.rating}</span>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#e51821]">
                      {cinema.chain}
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      • {cinema.distanceMiles} miles
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base mt-0.5">{cinema.name}</h3>

                  <p className="text-xs text-neutral-400 mt-1 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
                    <span>{cinema.address}</span>
                  </p>

                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {cinema.amenities.map((a, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-900 text-neutral-300 border border-neutral-800"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <span className="text-neutral-500 text-[11px]">
                    {cinema.screens.length} Screen Types
                  </span>
                  <span className="text-[#e51821] font-semibold">
                    Showtimes active
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
