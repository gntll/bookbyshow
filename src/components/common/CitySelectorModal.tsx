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
        className="relative w-full max-w-xl bg-[#121215] border border-neutral-800 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-neutral-800 bg-neutral-900/60 flex items-center justify-between">
          <div>
            <h3 id="city-title" className="text-xl font-bold text-white tracking-tight">
              Select Your Metro Area
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Personalize showtimes, regional venues, and local cinema schedules
            </p>
          </div>
          <button
            onClick={() => setIsCityModalOpen(false)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current & Auto-detect */}
        <div className="p-6 space-y-4">
          <button
            onClick={() => {
              const detected = CITIES[0];
              setCity(detected);
            }}
            className="w-full p-3.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 flex items-center justify-between text-left transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white">
                <Navigation className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Auto-Detect Current Location</p>
                <p className="text-[11px] text-neutral-400">Detect nearest cinemas via browser location</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-neutral-300">Use Location</span>
          </button>

          <div>
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-3">
              Supported Metro Markets
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {CITIES.map((city) => {
                const isSelected = city.id === currentCity.id;
                return (
                  <button
                    key={city.id}
                    onClick={() => setCity(city)}
                    className={`p-3 rounded-lg border text-left transition-colors flex flex-col justify-between ${
                      isSelected
                        ? 'bg-white border-white text-black'
                        : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm">{city.name}</span>
                      {isSelected ? (
                        <Check className="w-4 h-4 text-black" />
                      ) : (
                        <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                      )}
                    </div>
                    <span className={`text-[10px] ${isSelected ? 'text-neutral-700' : 'text-neutral-500'}`}>
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
