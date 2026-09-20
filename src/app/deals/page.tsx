'use client';

import React from 'react';
import Link from 'next/link';
import { Tag, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { AdBanner } from '@/components/ads/AdBanner';

export default function DealsPage() {
  const verifiedPrograms = [
    {
      id: 'amc-discount-tuesdays',
      title: 'AMC Discount Tuesdays & Daily Matinees',
      category: 'AMC Theatres Official Program',
      savings: 'Up to 30%–50% Off Tickets',
      badge: 'Official AMC Program',
      summary:
        'Save significantly on movie tickets every Tuesday, plus get 30% off all standard afternoon showtimes scheduled before 4:00 PM every single day.',
      howToRedeem: [
        'Join the free AMC Stubs Insider program online or in the AMC app.',
        'Select any Tuesday screening or daily matinee before 4:00 PM.',
        'Discount pricing automatically reflects in your ticket cart at checkout — no promo code required.',
      ],
      ctaText: 'Find AMC Showtimes',
      ctaHref: '/movies',
    },
    {
      id: 'regal-value-days',
      title: 'Regal Crown Club Value Days',
      category: 'Regal Cinemas Official Program',
      savings: 'Up to 40% Off Admission',
      badge: 'Official Regal Program',
      summary:
        'Enjoy reduced ticket prices on Tuesday screenings at participating Regal locations nationwide, plus matinee pricing on afternoon screenings.',
      howToRedeem: [
        'Sign up for a free Regal Crown Club (RCC) card or digital membership.',
        'Choose a Tuesday showtime or afternoon matinee at participating Regal locations.',
        'Enter your RCC number at checkout or present your barcode at the box office for instant discount rates.',
      ],
      ctaText: 'Browse Regal Showtimes',
      ctaHref: '/movies',
    },
    {
      id: 'cinemark-tuesdays',
      title: 'Cinemark Discount Tuesdays & Early Bird',
      category: 'Cinemark Theatres Official Program',
      savings: 'Weekly Discount Pricing',
      badge: 'Official Cinemark Program',
      summary:
        'Cinemark offers discounted ticket prices all day on Tuesdays and for the first matinee showtime of the day across participating theatres.',
      howToRedeem: [
        'Discounted Tuesday tickets are offered to all guests and Movie Rewards members.',
        'Pick the earliest show of the day for Early Bird tier pricing.',
        'Prices adjust automatically in the showtime selector without needing third-party voucher codes.',
      ],
      ctaText: 'Explore Cinemark Rates',
      ctaHref: '/movies',
    },
    {
      id: 'loyalty-fee-waivers',
      title: 'How to Get 100% Waived Online Booking Fees',
      category: 'Convenience Fee Savings',
      savings: 'Save $1.50 – $3.00 Fee / Ticket',
      badge: 'Legitimate Fee Waiver',
      summary:
        'Online ticketing platforms usually charge $1.50 to $2.50+ per ticket in convenience fees. You can legally avoid these fees every time through official theater loyalty programs.',
      howToRedeem: [
        'AMC Stubs Premiere ($15/yr) and A-List ($19.95–$24.95/mo) waive all online ticketing fees on AMC and Fandango.',
        'Cinemark Movie Club ($10.99/mo) waives online booking fees for all tickets purchased in your transaction.',
        'Purchasing directly at the cinema physical box office kiosk always incurs $0 in online convenience fees.',
      ],
      ctaText: 'Read Convenience Fee Guide',
      ctaHref: '/guides/how-to-avoid-movie-ticket-convenience-fees',
    },
    {
      id: 'primary-vs-resale',
      title: 'Primary Box Office vs. Secondary Resale Savings',
      category: 'Live Concerts, Sports & Broadway',
      savings: 'Save 40%–150%+ vs. Resale Markups',
      badge: 'Price Arbitrage Strategy',
      summary:
        'Secondary resale brokers often mark up high-demand concert and playoff tickets by 200% or more above face value. Comparing verified primary sellers saves hundreds of dollars.',
      howToRedeem: [
        'Compare primary box office inventory (Ticketmaster) against resale exchanges (SeatGeek, StubHub) side-by-side on BookByShow.',
        'Look for artist-authorized Face Value Exchanges where fans can only resell at the original face value price.',
        'Set BookByShow Price Drop Alerts to get notified when additional primary inventory drops close to showtime.',
      ],
      ctaText: 'Compare Live Events',
      ctaHref: '/events',
    },
    {
      id: 'student-military-senior',
      title: 'Student, Military & Senior Box Office Tiers',
      category: 'Identity-Based Discounts',
      savings: '10%–20% Off Standard Admission',
      badge: 'In-Person Box Office',
      summary:
        'Most cinema chains and theatrical venues offer dedicated discount admission tiers for active college students, military personnel, and seniors (ages 60+).',
      howToRedeem: [
        'Select Student, Senior, or Military ticket types when viewing available price tiers.',
        'Present a valid student ID, military identification, or government ID when entering the auditorium.',
        'Certain Broadway theatres also offer same-day in-person digital lottery or student rush tickets.',
      ],
      ctaText: 'View All Deals & Showtimes',
      ctaHref: '/movies',
    },
  ];

  return (
    <div className="min-h-screen bg-[#060709] pb-24">
      {/* Header */}
      <div className="border-b border-neutral-800 bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded-md bg-red-950/70 text-red-300 border border-red-500/40">
              <Tag className="w-3.5 h-3.5 text-[#e51821]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#e51821]">
              Verified Consumer Savings Guide
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Official Entertainment Deals & Savings Programs
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-3xl leading-relaxed">
            Unlike deceptive coupon sites that publish fake promo codes, BookByShow aggregates{' '}
            <strong className="text-neutral-200">verified, official money-saving programs</strong> from AMC, Regal, Cinemark, 
            and Ticketmaster so you can legally minimize your entertainment expenses.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {verifiedPrograms.map((program) => (
            <div
              key={program.id}
              className="p-6 rounded-2xl bg-[#0e1015] border border-neutral-800 hover:border-[#e51821]/50 transition-colors flex flex-col justify-between space-y-5 shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-neutral-900 text-neutral-300 border border-neutral-800">
                    {program.category}
                  </span>
                  <span className="text-xs font-bold text-[#e51821] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>{program.savings}</span>
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {program.title}
                </h2>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {program.summary}
                </p>

                <div className="pt-2">
                  <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#e51821]" />
                    <span>How This Savings Program Works:</span>
                  </p>
                  <ul className="space-y-1.5 pl-1">
                    {program.howToRedeem.map((step, idx) => (
                      <li key={idx} className="text-xs text-neutral-400 flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e51821] mt-1.5 shrink-0" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1 text-[11px] text-neutral-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{program.badge}</span>
                </span>

                <Link
                  href={program.ctaHref}
                  className="px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>{program.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#e51821]" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Consumer Truth & Trust Callout */}
        <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-[#e51821]/40 flex items-center justify-center shrink-0 text-[#e51821]">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">
                BookByShow Price Transparency Commitment
              </h3>
              <p className="text-xs text-neutral-400 max-w-2xl leading-relaxed">
                BookByShow is an independent comparison engine. We do not process payments directly or add any hidden fees. 
                When booking through our partner links, you always pay directly at the official box office or verified exchange with full fee transparency.
              </p>
            </div>
          </div>
          <Link
            href="/about"
            className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs border border-neutral-700 whitespace-nowrap transition-colors"
          >
            Learn How We Compare Prices
          </Link>
        </div>

        {/* AdSense Placement */}
        <AdBanner format="leaderboard" className="mt-8" />
      </div>
    </div>
  );
}
