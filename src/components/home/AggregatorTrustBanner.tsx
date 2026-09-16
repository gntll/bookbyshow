'use client';

import React from 'react';
import { ShieldCheck, TrendingDown, CheckCircle, Percent, Sparkles, AlertTriangle } from 'lucide-react';

export function AggregatorTrustBanner() {
  return (
    <section className="my-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1222] via-[#0f172a] to-[#070b14] border border-[#1e293b] p-6 sm:p-10 shadow-2xl">
      {/* Background glow circle */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Smart Aggregator Advantage</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Stop Overpaying On Ticket Convenience Fees
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            Different ticket sellers charge wildly different booking markups for the exact same seat. BookByShow compares every provider side-by-side so you never get gouged.
          </p>
        </div>

        {/* Side-by-Side Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Without BookByShow Card */}
          <div className="p-6 rounded-2xl bg-[#090d18] border border-red-500/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Booking Without Comparing
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] bg-red-950/40 text-red-400 border border-red-500/30">
                  Hidden Surcharges
                </span>
              </div>

              <div className="space-y-3 text-xs text-gray-300">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span>IMAX Ticket Base</span>
                  <span className="font-semibold text-white">$21.50</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span>Platform Convenience Fee</span>
                  <span className="font-semibold text-red-400">+$3.75</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span>Checkout Processing Surcharge</span>
                  <span className="font-semibold text-red-400">+$1.50</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-400">Total Charged:</span>
              <span className="text-2xl font-black text-red-400">$26.75</span>
            </div>
          </div>

          {/* With BookByShow Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/25 via-[#0e1626] to-[#0a101d] border border-emerald-500/40 flex flex-col justify-between shadow-xl shadow-emerald-950/20 relative">
            <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-emerald-500 text-black text-[11px] font-black uppercase tracking-wider shadow-md">
              Save $4.76 (18%)
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  With BookByShow Price Engine
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] bg-emerald-950/50 text-emerald-300 border border-emerald-500/30">
                  Guaranteed Lowest
                </span>
              </div>

              <div className="space-y-3 text-xs text-gray-300">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span>Same IMAX Seat (Best Provider Picked)</span>
                  <span className="font-semibold text-white">$19.99</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span>Transparent Verified Fee</span>
                  <span className="font-semibold text-emerald-400">+$2.00</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span>Extra Hidden Markups</span>
                  <span className="font-semibold text-emerald-400">$0.00 (Zero)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-500/20 flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-gray-400 block">Total Verified:</span>
                <span className="text-[11px] text-emerald-400 font-semibold">100% price match guarantee</span>
              </div>
              <span className="text-2xl font-black text-emerald-400">$21.99</span>
            </div>
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10 text-center">
          <div className="p-3">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-2">
              <TrendingDown className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-white text-sm">Real-time Rate Comparison</h4>
            <p className="text-xs text-gray-400 mt-1">
              Continuously pulls quotes from AMC, Regal, Cinemark, and Fandango.
            </p>
          </div>

          <div className="p-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-2">
              <Percent className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-white text-sm">Zero Surprise Surcharges</h4>
            <p className="text-xs text-gray-400 mt-1">
              The price you see in our comparison table is the exact final price you pay.
            </p>
          </div>

          <div className="p-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-white text-sm">Official Authorized Outbound</h4>
            <p className="text-xs text-gray-400 mt-1">
              Direct handoff to primary box offices with full booking protection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
