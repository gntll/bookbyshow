'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { X, ExternalLink, ShieldCheck, Armchair, Tag, AlertCircle } from 'lucide-react';
import { buildAffiliateOutboundUrl } from '@/config/affiliates';

export function PriceComparisonModal() {
  const { comparisonShowtime, closeComparisonModal, openSeatMapModal } = useApp();

  if (!comparisonShowtime) return null;

  const { showtime, movie, cinemaName } = comparisonShowtime;

  const lowestTotal = Math.min(...showtime.quotes.map((q) => q.total));
  const highestTotal = Math.max(...showtime.quotes.map((q) => q.total));
  const maxSavings = (highestTotal - lowestTotal).toFixed(2);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="comparison-title"
    >
      <div
        className="relative w-full max-w-2xl bg-[#0e1015] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 bg-neutral-950/80 relative">
          <button
            onClick={closeComparisonModal}
            className="absolute top-5 right-5 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 text-xs font-bold rounded bg-red-950/70 text-red-300 border border-[#e51821]/40 uppercase tracking-wider">
              {showtime.format}
            </span>
            <span className="text-sm text-neutral-300 font-medium">
              {showtime.time} • {showtime.date}
            </span>
          </div>

          <h2 id="comparison-title" className="text-xl md:text-2xl font-bold text-white tracking-tight">
            {movie ? movie.title : 'Selected Movie'}
          </h2>
          <p className="text-sm text-neutral-300 mt-0.5">
            {cinemaName} • <span className="text-neutral-200 font-medium">{showtime.screenName}</span>
          </p>

          {Number(maxSavings) > 0 && (
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-red-950/40 border border-[#e51821]/40 text-red-300 text-sm font-semibold">
              <Tag className="w-4 h-4 text-[#e51821]" />
              <span>You save up to ${maxSavings} per ticket by comparing on BookByShow!</span>
            </div>
          )}
        </div>

        {/* Content - Comparison Matrix */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-400 px-2">
            <span>TICKETING PARTNER</span>
            <span className="flex items-center gap-8">
              <span className="hidden sm:inline">BASE + FEES</span>
              <span>VERIFIED TOTAL</span>
            </span>
          </div>

          <div className="space-y-2.5">
            {showtime.quotes.map((quote, idx) => {
              const isBest = quote.total === lowestTotal;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    isBest
                      ? 'bg-neutral-900 border-[#e51821]/70 shadow-md shadow-red-950/20'
                      : 'bg-neutral-950 border-neutral-800/80 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isBest ? 'bg-[#e51821] text-white' : 'bg-neutral-800 text-neutral-200 border border-neutral-700'
                    }`}>
                      {quote.provider.slice(0, 3).toUpperCase()}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-base">{quote.provider}</span>
                        {isBest && (
                          <span className="px-2 py-0.5 text-xs font-bold rounded bg-[#e51821] text-white">
                            BEST RATE
                          </span>
                        )}
                      </div>

                      <div className="text-sm text-neutral-300 mt-0.5 flex items-center gap-2">
                        <span>Base: ${quote.basePrice.toFixed(2)}</span>
                        <span>•</span>
                        <span>Fee: ${quote.fee.toFixed(2)}</span>
                        {quote.badge && (
                          <>
                            <span>•</span>
                            <span className="text-neutral-200 font-medium">{quote.badge}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-0 border-neutral-800">
                    <div className="text-left sm:text-right">
                      <div className="text-xl sm:text-2xl font-black text-white">
                        ${quote.total.toFixed(2)}
                      </div>
                      <span className="text-xs text-neutral-400">All fees included</span>
                    </div>

                    <a
                      href={buildAffiliateOutboundUrl(quote.provider, quote.directUrl, { showtimeId: showtime.id })}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                        isBest
                          ? 'bg-[#e51821] hover:bg-[#c9121a] text-white shadow-md shadow-red-950/40'
                          : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                      }`}
                    >
                      <span>Book Direct</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Seat Map Visual Shortcut */}
          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-950/60 border border-[#e51821]/40 flex items-center justify-center text-[#e51821]">
                <Armchair className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base font-bold text-white">Auditorium Seat Sightlines</p>
                <p className="text-sm text-neutral-300">
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
              className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-semibold border border-neutral-700 transition-colors"
            >
              View Seats
            </button>
          </div>
        </div>

        {/* Footer Trust Guarantee & FTC Disclosure */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex flex-col gap-2 text-sm text-neutral-300">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-neutral-200 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#e51821]" />
              <span>100% Price Transparency — No surprise fees added at checkout</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-400">
              <AlertCircle className="w-4 h-4" />
              <span>Official primary box office partners</span>
            </div>
          </div>
          <p className="text-xs text-neutral-400 text-center sm:text-left pt-1 border-t border-neutral-800/80">
            <strong>Affiliate Disclosure:</strong> BookByShow is an independent comparison engine. We may earn a referral commission from authorized ticket providers when you complete a booking through our verified links, at no extra cost to you.
          </p>
        </div>
      </div>
    </div>
  );
}
