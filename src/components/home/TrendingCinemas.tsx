'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { CINEMAS } from '@/data/mockData';
import { MapPin, Star, ArrowRight } from 'lucide-react';

export function TrendingCinemas() {
  const { currentCity } = useApp();

  return (
    <section className="my-14">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Top Rated Cinemas Near You
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {currentCity.name}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Premium auditoriums with 70mm IMAX, Dolby Atmos, and luxury recliners
          </p>
        </div>

        <Link
          href="/cinemas"
          className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
        >
          <span>View All Venues</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {CINEMAS.map((cinema) => (
          <div
            key={cinema.id}
            className="group rounded-2xl bg-[#0d121e] border border-[#1e2638] overflow-hidden flex flex-col justify-between hover:border-cyan-500/40 transition-all hover:-translate-y-1 shadow-lg shadow-black/40"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-900">
              <img
                src={cinema.photoUrl}
                alt={cinema.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d121e] via-transparent to-black/30" />
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-amber-400 font-bold text-xs flex items-center gap-1 border border-amber-500/30">
                <Star className="w-3 h-3 fill-amber-400" />
                <span>{cinema.rating}</span>
              </div>
              <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-gray-300 text-[11px] font-medium border border-white/10">
                {cinema.distanceMiles} miles away
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                  {cinema.chain}
                </span>
                <h3 className="font-bold text-white text-sm line-clamp-1 group-hover:text-cyan-300 transition-colors mt-0.5">
                  {cinema.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1 line-clamp-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-gray-500 shrink-0" />
                  <span>{cinema.address}</span>
                </p>

                {/* Amenities pills */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {cinema.amenities.slice(0, 2).map((a, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] bg-[#141b2b] text-gray-300 border border-[#1e2638]"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-gray-400 text-[11px]">
                  {cinema.screens.length} Screen Types
                </span>
                <Link
                  href={`/cinemas`}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                >
                  <span>Showtimes</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
