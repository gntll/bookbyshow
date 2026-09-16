'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { X, ExternalLink, ShieldCheck, Armchair, Tag, AlertCircle } from 'lucide-react';

export function PriceComparisonModal() {
  const { comparisonShowtime, closeComparisonModal, openSeatMapModal } = useApp();

  if (!comparisonShowtime) return null;

  const { showtime, movie, cinemaName } = comparisonShowtime;

  // Find lowest price
  const lowestTotal = Math.min(...showtime.quotes.map((q) => q.total));
  const highestTotal = Math.max(...showtime.quotes.map((q) => q.total));
  const maxSavings = (highestTotal - lowestTotal).toFixed(2);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="comparison-title"
    >
      <div
        className="relative w-full max-w-2xl bg-[#0e1320] border border-[#1e2638] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#1e2638] bg-gradient-to-r from-[#141b2b] to-[#0e1320] relative">
          <button
            onClick={closeComparisonModal}
            className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 uppercase tracking-wider">
              {showtime.format}
            </span>
            <span className="text-xs text-gray-400 font-medium">
              {showtime.time} • {showtime.date}
            </span>
          </div>

          <h2 id="comparison-title" className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {movie ? movie.title : 'Selected Movie'}
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">
            {cinemaName} • <span className="text-gray-300">{showtime.screenName}</span>
          </p>

          {Number(maxSavings) > 0 && (
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
              <Tag className="w-3.5 h-3.5" />
              <span>You save up to ${maxSavings} per ticket by comparing on BookByShow!</span>
            </div>
          )}
        </div>

        {/* Content - Comparison Matrix */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between text-xs text-gray-400 px-2 font-medium">
            <span>TICKETING PARTNER</span>
            <span className="flex items-center gap-8">
              <span className="hidden sm:inline">BASE + FEES</span>
              <span>VERIFIED TOTAL</span>
            </span>
          </div>

          <div className="space-y-3">
            {showtime.quotes.map((quote, idx) => {
              const isBest = quote.total === lowestTotal;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    isBest
                      ? 'bg-rose-950/20 border-rose-500/50 shadow-lg shadow-rose-950/20'
                      : 'bg-[#131929] border-[#1e2638] hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        quote.provider.includes('AMC')
                          ? 'bg-red-600 text-white'
                          : quote.provider.includes('Fandango')
                          ? 'bg-amber-500 text-black font-extrabold'
                          : quote.provider.includes('Regal')
                          ? 'bg-orange-600 text-white'
                          : 'bg-indigo-600 text-white'
                      }`}
                    >
                      {quote.provider.slice(0, 3).toUpperCase()}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-base">{quote.provider}</span>
                        {isBest && (
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            BEST PRICE
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
                        <span>Base: ${quote.basePrice.toFixed(2)}</span>
                        <span>•</span>
                        <span>Fee: ${quote.fee.toFixed(2)}</span>
                        {quote.badge && (
                          <>
                            <span>•</span>
                            <span className="text-amber-400 font-medium">{quote.badge}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-0 border-white/5">
                    <div className="text-left sm:text-right">
                      <div className="text-xl font-extrabold text-white">
                        ${quote.total.toFixed(2)}
                      </div>
                      <span className="text-[11px] text-gray-400">All fees included</span>
                    </div>

                    <a
                      href={quote.directUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        isBest
                          ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/30'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      <span>Book Direct</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Seat Map Visual Shortcut */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 to-purple-950/40 border border-indigo-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <Armchair className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Interactive Seat Map Preview</p>
                <p className="text-xs text-gray-300">
                  {showtime.availableSeatCount} of {showtime.totalSeatCount} seats available (
                  {showtime.seatAvailability.replace('_', ' ')})
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                closeComparisonModal();
                openSeatMapModal(showtime, movie);
              }}
              className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
            >
              View Seats
            </button>
          </div>
        </div>

        {/* Footer Trust Guarantee */}
        <div className="p-4 border-t border-[#1e2638] bg-[#0a0d16] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <div className="flex items-center gap-2 text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>100% Price Transparency — No surprise fees added at checkout</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Official partner links</span>
          </div>
        </div>
      </div>
    </div>
  );
}
