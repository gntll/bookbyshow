'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, Check, Armchair, Shield, Sparkles } from 'lucide-react';
import { Seat } from '@/types';
import { buildAffiliateOutboundUrl } from '@/config/affiliates';

// Generate mock seats for auditorium layout
const generateAuditoriumSeats = (): Seat[] => {
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seats: Seat[] = [];

  rows.forEach((row, rIdx) => {
    const seatCount = rIdx < 2 ? 10 : rIdx < 5 ? 12 : 14;
    for (let num = 1; num <= seatCount; num++) {
      let tier: Seat['tier'] = 'Standard';
      let price = 15.50;

      if (rIdx >= 2 && rIdx <= 4 && num >= 4 && num <= 9) {
        tier = 'Prime Center';
        price = 19.99;
      } else if (rIdx >= 5) {
        tier = 'Luxury Recliner';
        price = 22.99;
      }

      if (rIdx === 0 && (num === 1 || num === seatCount)) {
        tier = 'Wheelchair';
        price = 15.50;
      }

      // Randomly mark some seats reserved
      const isReserved = (rIdx * 7 + num * 3) % 4 === 0;

      seats.push({
        id: `${row}${num}`,
        row,
        number: num,
        tier,
        price,
        status: isReserved ? 'reserved' : 'available',
      });
    }
  });

  return seats;
};

export function InteractiveSeatMapModal() {
  const { seatMapShowtime, closeSeatMapModal, openComparisonModal } = useApp();
  const [seats] = useState<Seat[]>(() => generateAuditoriumSeats());
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [isLocked, setIsLocked] = useState(false);

  if (!seatMapShowtime) return null;

  const { showtime, movie, cinemaName } = seatMapShowtime;

  const toggleSeatSelection = (seat: Seat) => {
    if (seat.status === 'reserved') return;

    if (selectedSeatIds.includes(seat.id)) {
      setSelectedSeatIds((prev) => prev.filter((id) => id !== seat.id));
    } else {
      if (selectedSeatIds.length >= 8) {
        alert('Maximum 8 seats per booking');
        return;
      }
      setSelectedSeatIds((prev) => [...prev, seat.id]);
    }
  };

  const selectedSeats = seats.filter((s) => selectedSeatIds.includes(s.id));
  const subtotal = selectedSeats.reduce((acc, s) => acc + s.price, 0);

  const handleLockSeats = () => {
    if (selectedSeats.length === 0) return;
    setIsLocked(true);
    setTimeout(() => {
      // Find lowest quote
      const lowestQuote = [...showtime.quotes].sort((a, b) => a.total - b.total)[0];
      if (lowestQuote?.directUrl) {
        const outboundUrl = buildAffiliateOutboundUrl(lowestQuote.provider, lowestQuote.directUrl, {
          showtimeId: showtime.id,
          medium: 'seatmap_lock',
        });
        window.open(outboundUrl, '_blank', 'noopener,noreferrer');
      }
      closeSeatMapModal();
      setIsLocked(false);
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="seatmap-title"
    >
      <div
        className="relative w-full max-w-4xl bg-[#0b0e17] border border-[#1e2638] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#1e2638] bg-gradient-to-r from-[#121826] to-[#0b0e17] flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                {showtime.format}
              </span>
              <span className="text-xs text-gray-400 font-medium">
                {showtime.time} • {showtime.date}
              </span>
            </div>
            <h2 id="seatmap-title" className="text-lg sm:text-2xl font-bold text-white tracking-tight">
              {movie?.title || 'Auditorium Seating'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              {cinemaName} • <span className="text-gray-300">{showtime.screenName}</span>
            </p>
          </div>

          <button
            onClick={closeSeatMapModal}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close seat map"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legend */}
        <div className="px-4 py-3 bg-[#0d121e] border-b border-[#1a2130] flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-gray-300">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-[#1e293b] border border-gray-600 inline-block" />
            <span>Available ($15.50)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-amber-500/30 border border-amber-500 inline-block" />
            <span>Prime Center ($19.99)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-rose-500/30 border border-rose-500 inline-block" />
            <span>Luxury Recliner ($22.99)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-emerald-500 inline-block" />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-gray-800 border border-gray-800 opacity-40 inline-block" />
            <span>Reserved</span>
          </div>
        </div>

        {/* Screen Visual & Seats Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center">
          {/* Curved Screen Graphic */}
          <div className="w-full max-w-lg mb-8 text-center">
            <div className="relative h-7 w-full overflow-hidden">
              <div className="absolute inset-x-8 top-0 h-10 border-t-4 border-cyan-400/80 rounded-[100%] shadow-[0_4px_25px_rgba(6,182,212,0.5)]" />
            </div>
            <p className="text-[10px] tracking-[0.25em] text-cyan-400/90 uppercase font-semibold">
              All Eyes On Screen
            </p>
          </div>

          {/* Rows of seats */}
          <div className="space-y-2.5 sm:space-y-3 w-full max-w-2xl flex flex-col items-center">
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((rowLetter) => {
              const rowSeats = seats.filter((s) => s.row === rowLetter);
              return (
                <div key={rowLetter} className="flex items-center gap-2 sm:gap-3">
                  <span className="w-4 text-xs font-bold text-gray-500 text-center select-none">
                    {rowLetter}
                  </span>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {rowSeats.map((seat) => {
                      const isSelected = selectedSeatIds.includes(seat.id);
                      const isReserved = seat.status === 'reserved';

                      let colorClasses = 'bg-[#1e293b] border-gray-600 hover:border-gray-400 text-gray-300';
                      if (seat.tier === 'Prime Center') {
                        colorClasses = 'bg-amber-950/40 border-amber-500/70 hover:border-amber-400 text-amber-200';
                      } else if (seat.tier === 'Luxury Recliner') {
                        colorClasses = 'bg-rose-950/40 border-rose-500/70 hover:border-rose-400 text-rose-200';
                      }

                      if (isSelected) {
                        colorClasses = 'bg-emerald-600 border-emerald-400 text-white font-bold scale-110 shadow-lg shadow-emerald-600/40';
                      } else if (isReserved) {
                        colorClasses = 'bg-gray-900 border-gray-800 text-gray-700 cursor-not-allowed opacity-40';
                      }

                      return (
                        <button
                          key={seat.id}
                          disabled={isReserved}
                          onClick={() => toggleSeatSelection(seat)}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[10px] font-semibold border flex items-center justify-center transition-all ${colorClasses}`}
                          title={`${seat.row}${seat.number} - ${seat.tier} ($${seat.price.toFixed(2)})`}
                          aria-label={`Seat ${seat.row}${seat.number}, ${seat.tier}, price $${seat.price.toFixed(2)}, ${seat.status}`}
                        >
                          {isSelected ? <Check className="w-3.5 h-3.5" /> : seat.number}
                        </button>
                      );
                    })}
                  </div>

                  <span className="w-4 text-xs font-bold text-gray-500 text-center select-none">
                    {rowLetter}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Seats & Sticky Action Bar */}
        <div className="p-4 sm:p-6 border-t border-[#1e2638] bg-[#0d121e] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto">
            {selectedSeats.length > 0 ? (
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Selected Seats:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedSeats.map((s) => (
                      <span
                        key={s.id}
                        className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30"
                      >
                        {s.id}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-lg font-bold text-white mt-1">
                  Total: <span className="text-emerald-400">${subtotal.toFixed(2)}</span>
                  <span className="text-xs text-gray-400 font-normal ml-2">
                    ({selectedSeats.length} {selectedSeats.length === 1 ? 'ticket' : 'tickets'})
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Armchair className="w-4 h-4 text-gray-500" />
                <span>Tap any available seat above to select and hold your spots</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                closeSeatMapModal();
                openComparisonModal(showtime, movie);
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white text-xs font-semibold transition-colors"
            >
              Compare All Providers
            </button>

            <button
              disabled={selectedSeats.length === 0 || isLocked}
              onClick={handleLockSeats}
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                selectedSeats.length > 0
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isLocked ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Locking Best Rate...</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  <span>Lock In Lowest Rate</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Affiliate Disclosure Footer */}
        <div className="px-6 py-2 bg-[#090c14] border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500">
          <span>BookByShow compares verified rates across official US partners. When you book tickets, we may earn an affiliate commission.</span>
          <span className="hidden sm:inline font-mono text-[9px] text-gray-600">FTC Compliant • No Extra Cost to You</span>
        </div>
      </div>
    </div>
  );
}
