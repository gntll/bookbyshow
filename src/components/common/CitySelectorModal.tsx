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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="city-title"
    >
      <div
        className="relative w-full max-w-xl bg-[#0e1015] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-neutral-800 bg-neutral-950/80 flex items-center justify-between">
          <div>
            <h3 id="city-title" className="text-xl font-bold text-white tracking-tight">
              Select Your Metro Area
            </h3>
            <p className="text-sm text-neutral-300 mt-0.5">
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
            className="w-full p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#e51821]/60 flex items-center justify-between text-left transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-950/60 border border-[#e51821]/40 flex items-center justify-center text-[#e51821]">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base font-bold text-white">Auto-Detect Current Location</p>
                <p className="text-sm text-neutral-300">Detect nearest cinemas via browser location</p>
              </div>
            </div>
            <span className="text-sm font-bold text-[#e51821]">Use Location</span>
          </button>

          <div>
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-3">
              Supported Metro Markets
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {CITIES.map((city) => {
                const isSelected = city.id === currentCity.id;
                return (
                  <button
                    key={city.id}
                    onClick={() => setCity(city)}
                    className={`p-3 rounded-xl border text-left transition-colors flex flex-col justify-between ${
                      isSelected
                        ? 'bg-neutral-900 border-[#e51821] text-white shadow-md shadow-red-950/20'
                        : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-base">{city.name}</span>
                      {isSelected ? (
                        <Check className="w-4 h-4 text-[#e51821]" />
                      ) : (
                        <MapPin className="w-4 h-4 text-neutral-500" />
                      )}
                    </div>
                    <span className={`text-xs font-medium ${isSelected ? 'text-red-300' : 'text-neutral-400'}`}>
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
