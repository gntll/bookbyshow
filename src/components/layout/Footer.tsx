'use client';

import React from 'react';
import Link from 'next/link';
import { Ticket, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CITIES } from '@/data/mockData';

export function Footer() {
  const partners = [
    'AMC Theatres',
    'Regal Cinemas',
    'Cinemark',
    'Ticketmaster',
    'Fandango',
    'Alamo Drafthouse',
    'SeatGeek',
    'StubHub',
    'AXS',
    'PVR INOX',
  ];

  return (
    <footer className="border-t border-[#1e2638] bg-[#04060b] text-gray-400 pt-16 pb-24 md:pb-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#0c111e] via-[#12192a] to-[#0c111e] border border-[#1e2638] mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">The BookByShow Fair Price Guarantee</h3>
              <p className="text-xs text-gray-400 mt-1 max-w-xl">
                We compare prices across every major box office and primary ticket seller in real time. We display exact convenience fees upfront with zero hidden surcharges.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-gray-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Real-time Seats</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Official Outbound Handoff</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>SSL 256-Bit Encrypted</span>
            </div>
          </div>
        </div>

        {/* Aggregator Network Badges */}
        <div className="mb-14 pb-12 border-b border-[#1a2130]">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest text-center mb-6">
            Comparing Live Showtimes & Tickets Across 20+ Primary Platforms
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {partners.map((p, idx) => (
              <div
                key={idx}
                className="px-3.5 py-1.5 rounded-lg bg-[#0e1320] border border-[#1e2638] text-xs font-semibold text-gray-300 hover:text-white transition-colors"
              >
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* 4-column Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white">
                <Ticket className="w-4 h-4 -rotate-12" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                BookBy<span className="text-rose-500">Show</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              BookByShow.com is the world’s premier live entertainment and cinema aggregator. We help millions find the closest cinema, best seating sightlines, and lowest verified ticket rates.
            </p>
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} BookByShow Inc. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Popular Formats
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/movies?format=IMAX+70mm" className="hover:text-white transition-colors">
                  IMAX 70mm Authentic Film
                </Link>
              </li>
              <li>
                <Link href="/movies?format=IMAX+with+Laser" className="hover:text-white transition-colors">
                  IMAX with Laser 4K
                </Link>
              </li>
              <li>
                <Link href="/movies?format=Dolby+Cinema" className="hover:text-white transition-colors">
                  Dolby Cinema with Atmos
                </Link>
              </li>
              <li>
                <Link href="/movies?format=4DX" className="hover:text-white transition-colors">
                  4DX Motion & Sensory
                </Link>
              </li>
              <li>
                <Link href="/movies?format=RealD+3D" className="hover:text-white transition-colors">
                  RealD 3D & HFR
                </Link>
              </li>
              <li>
                <Link href="/cinemas" className="hover:text-white transition-colors">
                  Luxury Heated Recliners
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Major Metros
            </h4>
            <ul className="space-y-2 text-xs">
              {CITIES.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <Link href={`/cinemas?city=${c.id}`} className="hover:text-white transition-colors">
                    {c.name}, {c.stateOrRegion}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Stay Ahead of Drops
            </h4>
            <p className="text-xs text-gray-400 mb-3">
              Get notified for 70mm IMAX ticket drops, stadium tour pre-sales, and exclusive matinee flash discounts.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Subscribed! Welcome to early showtime drop alerts.');
              }}
              className="space-y-2"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full bg-[#0e1320] border border-[#1e2638] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-rose-500"
              />
              <button
                type="submit"
                className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-md shadow-rose-600/30 transition-colors"
              >
                Join Free VIP Alerts
              </button>
            </form>
          </div>
        </div>

        {/* Legal Disclaimer & FTC Affiliate Disclosure */}
        <div className="pt-8 border-t border-[#141b2a] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p className="max-w-3xl">
            <strong>Affiliate & Legal Disclosure:</strong> BookByShow.com is an independent showtime and ticket price aggregator. We are supported by our users; when you buy tickets through affiliate links on our site, we may earn a referral commission from authorized ticket sellers at no extra cost to you. All trademarks, cinema logos, and promotional artwork belong to their respective copyright holders.
          </p>
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
            <Link href="/affiliate-disclosure" className="hover:underline text-rose-400 font-medium">Affiliate Disclosure</Link>
            <Link href="/deals" className="hover:underline">Partner Offers</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
