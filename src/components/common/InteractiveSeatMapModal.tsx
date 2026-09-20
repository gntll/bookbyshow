'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { X, Check, Armchair, Shield, Lock } from 'lucide-react';
import { Seat } from '@/types';
import { buildAffiliateOutboundUrl } from '@/config/affiliates';

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
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="seatmap-title"
    >
      <div
        className="relative w-full max-w-4xl bg-[#0e1015] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-neutral-800 bg-neutral-950/80 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded bg-red-950/70 text-red-300 border border-[#e51821]/40">
                {showtime.format}
              </span>
              <span className="text-sm text-neutral-300 font-medium">
                {showtime.time} • {showtime.date}
              </span>
            </div>
            <h2 id="seatmap-title" className="text-lg sm:text-2xl font-bold text-white tracking-tight">
              {movie?.title || 'Auditorium Seating'}
            </h2>
            <p className="text-sm text-neutral-300">
              {cinemaName} • <span className="text-neutral-200 font-medium">{showtime.screenName}</span>
            </p>
          </div>

          <button
            onClick={closeSeatMapModal}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close seat map"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legend */}
        <div className="px-4 py-2.5 bg-neutral-950 border-b border-neutral-800 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-neutral-200 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-neutral-800 border border-neutral-700 inline-block" />
            <span>Standard ($15.50)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-neutral-700 border border-neutral-600 inline-block" />
            <span>Prime Center ($19.99)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-neutral-600 border border-neutral-500 inline-block" />
            <span>Luxury Recliner ($22.99)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-[#e51821] inline-block" />
            <span className="text-white font-bold">Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-neutral-900 border border-neutral-800 opacity-40 inline-block" />
            <span className="text-neutral-500">Reserved</span>
          </div>
        </div>

        {/* Screen Visual & Seats Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center">
          {/* Cinema curved screen graphic */}
          <div className="w-full max-w-lg mb-8 text-center">
            <div className="relative h-6 w-full overflow-hidden">
              <div className="absolute inset-x-8 top-0 h-8 border-t-2 border-[#e51821]/70 rounded-[100%] shadow-[0_2px_15px_rgba(229,24,33,0.3)]" />
            </div>
            <p className="text-xs tracking-[0.2em] text-[#e51821] uppercase font-bold">
              Auditorium Screen
            </p>
          </div>

          {/* Rows of seats */}
          <div className="space-y-2 sm:space-y-2.5 w-full max-w-2xl flex flex-col items-center">
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((rowLetter) => {
              const rowSeats = seats.filter((s) => s.row === rowLetter);
              return (
                <div key={rowLetter} className="flex items-center gap-2 sm:gap-3">
                  <span className="w-4 text-xs font-bold text-neutral-500 text-center select-none">
                    {rowLetter}
                  </span>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {rowSeats.map((seat) => {
                      const isSelected = selectedSeatIds.includes(seat.id);
                      const isReserved = seat.status === 'reserved';

                      let colorClasses = 'bg-neutral-800 border-neutral-700 hover:border-neutral-500 text-neutral-300';
                      if (seat.tier === 'Prime Center') {
                        colorClasses = 'bg-neutral-750 border-neutral-600 hover:border-neutral-400 text-neutral-200';
                      } else if (seat.tier === 'Luxury Recliner') {
                        colorClasses = 'bg-neutral-700 border-neutral-500 hover:border-neutral-400 text-neutral-100';
                      }

                      if (isSelected) {
                        colorClasses = 'bg-[#e51821] border-[#e51821] text-white font-bold scale-108 shadow-lg shadow-red-950/60';
                      } else if (isReserved) {
                        colorClasses = 'bg-neutral-900 border-neutral-800 text-neutral-700 cursor-not-allowed opacity-40';
                      }

                      return (
                        <button
                          key={seat.id}
                          disabled={isReserved}
                          onClick={() => toggleSeatSelection(seat)}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded text-xs font-semibold border flex items-center justify-center transition-colors ${colorClasses}`}
                          title={`${seat.row}${seat.number} - ${seat.tier} ($${seat.price.toFixed(2)})`}
                          aria-label={`Seat ${seat.row}${seat.number}, ${seat.tier}, price $${seat.price.toFixed(2)}, ${seat.status}`}
                        >
                          {isSelected ? <Check className="w-3.5 h-3.5 text-white" /> : seat.number}
                        </button>
                      );
                    })}
                  </div>

                  <span className="w-4 text-xs font-bold text-neutral-500 text-center select-none">
                    {rowLetter}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Seats & Sticky Action Bar */}
        <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-950 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto">
            {selectedSeats.length > 0 ? (
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-neutral-300">Selected Seats:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedSeats.map((s) => (
                      <span
                        key={s.id}
                        className="px-2 py-0.5 rounded bg-red-950/80 text-red-200 text-xs font-bold border border-[#e51821]/50"
                      >
                        {s.id}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-lg font-black text-white mt-1">
                  Total: <span className="text-[#e51821]">${subtotal.toFixed(2)}</span>
                  <span className="text-sm text-neutral-400 font-normal ml-2">
                    ({selectedSeats.length} {selectedSeats.length === 1 ? 'ticket' : 'tickets'})
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-neutral-300">
                <Armchair className="w-4 h-4 text-neutral-400" />
                <span>Select available seats to reserve</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                closeSeatMapModal();
                openComparisonModal(showtime, movie);
              }}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white text-sm font-semibold transition-colors"
            >
              Compare All Providers
            </button>

            <button
              disabled={selectedSeats.length === 0 || isLocked}
              onClick={handleLockSeats}
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
                selectedSeats.length > 0
                  ? 'bg-[#e51821] hover:bg-[#c9121a] text-white shadow-lg shadow-red-950/50'
                  : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
              }`}
            >
              {isLocked ? (
                <>
                  <Lock className="w-4 h-4" />
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
        <div className="px-6 py-2.5 bg-neutral-950 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
          <span>BookByShow compares verified rates across official US partners. When you book tickets, we may earn an affiliate commission.</span>
          <span className="hidden sm:inline font-mono text-xs text-neutral-400">FTC Compliant • No Extra Cost</span>
        </div>
      </div>
    </div>
  );
}
