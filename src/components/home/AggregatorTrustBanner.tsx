'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export function AggregatorTrustBanner() {
  return (
    <section className="my-16 rounded-2xl bg-[#0e1015] border border-neutral-800 p-6 sm:p-8 shadow-xl">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/60 border border-[#e51821]/50 text-red-300 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#e51821]" />
            <span>Independent Ticket Aggregator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Stop Overpaying On Hidden Booking Surcharges
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2">
            Different ticket sellers charge wildly different convenience markups for the exact same seat. BookByShow calculates and compares verified total checkout costs side-by-side.
          </p>
        </div>

        {/* Side-by-Side Comparison Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Uncompared Card */}
          <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-neutral-500" />
                  Booking Without Comparing
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] bg-neutral-900 text-neutral-400 border border-neutral-800">
                  Hidden Surcharges
                </span>
              </div>

              <div className="space-y-3 text-xs text-neutral-300">
                <div className="flex justify-between py-1.5 border-b border-neutral-800">
                  <span>IMAX Ticket Base</span>
                  <span className="font-semibold text-white">$21.50</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-800">
                  <span>Platform Convenience Fee</span>
                  <span className="font-medium text-neutral-400">+$3.75</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-800">
                  <span>Checkout Processing Surcharge</span>
                  <span className="font-medium text-neutral-400">+$1.50</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">Total Charged:</span>
              <span className="text-xl font-bold text-white">$26.75</span>
            </div>
          </div>

          {/* With BookByShow Card: Highlighted in Cinema Red */}
          <div className="p-6 rounded-xl bg-neutral-900 border border-[#e51821]/70 flex flex-col justify-between relative shadow-lg shadow-red-950/20">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#e51821]" />
                  With BookByShow Price Engine
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#e51821] text-white text-[11px] font-bold">
                  Save $4.76 (18%)
                </span>
              </div>

              <div className="space-y-3 text-xs text-neutral-300">
                <div className="flex justify-between py-1.5 border-b border-neutral-800">
                  <span>Same IMAX Seat (Best Provider Picked)</span>
                  <span className="font-semibold text-white">$19.99</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-800">
                  <span>Transparent Verified Fee</span>
                  <span className="font-semibold text-neutral-300">+$2.00</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-neutral-800">
                  <span>Checkout Processing Surcharge</span>
                  <span className="font-semibold text-neutral-300">$0.00</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400">Total Charged:</span>
              <span className="text-xl font-bold text-[#e51821]">$21.99</span>
            </div>
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 pt-8 border-t border-neutral-800 text-xs text-neutral-400">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#e51821] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-medium">Real-Time Comparisons</strong>
              <span>Live querying across AMC, Regal, Cinemark, Ticketmaster, and Fandango.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#e51821] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-medium">100% Upfront Rates</strong>
              <span>Convenience and facility charges are broken down before you leave our site.</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#e51821] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block font-medium">Direct Authorized Tickets</strong>
              <span>Checkouts finish securely with primary authorized box offices with venue guarantees.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
