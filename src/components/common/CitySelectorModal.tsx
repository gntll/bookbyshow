'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { CITIES } from '@/data/mockData';
import { X, MapPin, Check, Navigation } from 'lucide-react';

export function CitySelectorModal() {
  const { currentCity, setCity, isCityModalOpen, setIsCityModalOpen } = useApp();

  if (!isCityModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="city-title"
    >
      <div
        className="relative w-full max-w-xl bg-[#0e1320] border border-[#1e2638] rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-[#1e2638] bg-gradient-to-r from-[#141b2b] to-[#0e1320] flex items-center justify-between">
          <div>
            <h3 id="city-title" className="text-xl font-bold text-white tracking-tight">
              Select Your Metro Area
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Personalize showtimes, regional venues, and local cinema deals
            </p>
          </div>
          <button
            onClick={() => setIsCityModalOpen(false)}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current & Auto-detect */}
        <div className="p-6 space-y-4">
          <button
            onClick={() => {
              // Simulated auto-detect
              const detected = CITIES[0];
              setCity(detected);
            }}
            className="w-full p-3.5 rounded-xl bg-gradient-to-r from-rose-950/30 to-purple-950/30 border border-rose-500/30 hover:border-rose-500/60 flex items-center justify-between text-left transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-600/30 border border-rose-500/40 flex items-center justify-center text-rose-400">
                <Navigation className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Auto-Detect Current Location</p>
                <p className="text-[11px] text-gray-400">Detect nearest cinemas via GPS</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-rose-400">Use Location</span>
          </button>

          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-3">
              Supported Metro Markets
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {CITIES.map((city) => {
                const isSelected = city.id === currentCity.id;
                return (
                  <button
                    key={city.id}
                    onClick={() => setCity(city)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-rose-600/20 border-rose-500 text-white shadow-md shadow-rose-950/40'
                        : 'bg-[#131929] border-[#1e2638] hover:border-gray-600 text-gray-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm">{city.name}</span>
                      {isSelected ? (
                        <Check className="w-4 h-4 text-rose-400" />
                      ) : (
                        <MapPin className="w-3.5 h-3.5 text-gray-500" />
                      )}
                    </div>
                    <span className="text-[10px] text-gray-400">
                      {city.stateOrRegion}, {city.country}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
