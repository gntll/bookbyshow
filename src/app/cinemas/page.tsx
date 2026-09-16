'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { CINEMAS } from '@/data/mockData';
import {
  MapPin,
  Star,
  Phone,
  Car,
  Search,
  ExternalLink,
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
    <div className="min-h-screen bg-[#06080e] pb-24">
      {/* Header */}
      <div className="border-b border-[#1e2638] bg-gradient-to-b from-[#0c1424] to-[#06080e] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Film className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Auditorium & Venue Directory
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Cinemas in {currentCity.name}
            </h1>
            <p className="text-sm text-gray-400 mt-1 max-w-xl">
              Locate authentic 70mm film auditoriums, dual-laser IMAX, Dolby Atmos, and in-seat dining.
            </p>
          </div>

          <button
            onClick={() => setIsCityModalOpen(true)}
            className="self-start md:self-auto px-4 py-2.5 rounded-xl bg-[#121826] border border-[#1e2638] hover:border-cyan-500/50 text-xs font-bold text-gray-300 hover:text-white flex items-center gap-2 transition-colors"
          >
            <MapPin className="w-4 h-4 text-rose-500" />
            <span>Switch Metro: {currentCity.name}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Amenities Filter */}
        <div className="p-4 rounded-2xl bg-[#0d121e] border border-[#1e2638] space-y-3 mb-8">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cinema chains, amenities, or street address..."
              className="w-full bg-[#131929] border border-[#1e2638] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-white/5 scrollbar-none">
            <span className="text-xs text-gray-500 font-semibold px-2 shrink-0">Amenity:</span>
            {amenities.map((a) => (
              <button
                key={a}
                onClick={() => setSelectedAmenity(a)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
                  selectedAmenity === a
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'bg-[#141b2a] text-gray-400 hover:text-white border border-[#1e2638]'
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
              className="rounded-2xl bg-[#0d121e] border border-[#1e2638] overflow-hidden flex flex-col sm:flex-row gap-4 p-5 hover:border-cyan-500/40 transition-all shadow-xl"
            >
              <div className="w-full sm:w-48 aspect-video sm:aspect-square rounded-xl overflow-hidden bg-gray-900 shrink-0 relative">
                <img
                  src={cinema.photoUrl}
                  alt={cinema.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-amber-400 font-bold text-xs flex items-center gap-1 border border-amber-500/30">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{cinema.rating}</span>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                      {cinema.chain}
                    </span>
                    <span className="text-[11px] text-gray-500">
                      • {cinema.distanceMiles} miles
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base mt-0.5">{cinema.name}</h3>

                  <p className="text-xs text-gray-400 mt-1 flex items-start gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-500 shrink-0 mt-0.5" />
                    <span>{cinema.address}</span>
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mt-2">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-gray-500" />
                      {cinema.phone}
                    </span>
                    {cinema.parkingAvailable && (
                      <span className="flex items-center gap-1 text-emerald-400 font-medium">
                        <Car className="w-3 h-3" />
                        Parking On-Site
                      </span>
                    )}
                  </div>

                  {/* Amenities */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {cinema.amenities.map((a, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#131929] text-gray-300 border border-[#1e2638]"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-3">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(cinema.name + ' ' + cinema.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
                  >
                    <span>Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <Link
                    href="/movies"
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-600/30 transition-colors"
                  >
                    View Showtimes
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
