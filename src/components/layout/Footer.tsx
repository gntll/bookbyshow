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
    <footer className="border-t border-neutral-800 bg-[#09090b] text-neutral-400 pt-16 pb-24 md:pb-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Banner */}
        <div className="p-8 rounded-xl bg-neutral-900/60 border border-neutral-800 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-neutral-800 border border-neutral-700 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base">The BookByShow Fair Price Standard</h3>
              <p className="text-xs text-neutral-400 mt-0.5 max-w-xl">
                We compare prices across every major box office and primary ticket seller in real time. We display exact convenience fees upfront with zero hidden surcharges.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-neutral-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" />
              <span>Real-time Seats</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" />
              <span>Direct Primary Handoff</span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400" />
              <span>Encrypted Outbound</span>
            </div>
          </div>
        </div>

        {/* Aggregator Network Badges */}
        <div className="mb-14 pb-12 border-b border-neutral-800/80">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest text-center mb-6">
            Comparing Live Showtimes & Tickets Across 20+ Primary Box Offices
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {partners.map((p, idx) => (
              <div
                key={idx}
                className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-300"
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
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-black font-bold">
                <Ticket className="w-3.5 h-3.5 -rotate-12 fill-black" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                BookByShow
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              BookByShow.com is an independent entertainment and cinema price comparison engine. We help moviegoers find the closest auditorium, optimal sightlines, and lowest verified total rates.
            </p>
            <p className="text-xs text-neutral-500">
              &copy; {new Date().getFullYear()} BookByShow Inc. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Auditorium Formats
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
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
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
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Rate Drop Alerts
            </h4>
            <p className="text-xs text-neutral-400 mb-3">
              Get notified for 70mm IMAX seat releases, stadium tour pre-sales, and verified matinee discount rates.
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
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
              />
              <button
                type="submit"
                className="w-full py-2 bg-white hover:bg-neutral-200 text-black font-semibold text-xs rounded-lg transition-colors"
              >
                Join Free Alerts
              </button>
            </form>
          </div>
        </div>

        {/* Legal Disclaimer & FTC Affiliate Disclosure */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p className="max-w-3xl">
            <strong>Affiliate & Legal Disclosure:</strong> BookByShow.com is an independent showtime and ticket price aggregator. We are supported by our users; when you buy tickets through affiliate links on our site, we may earn a referral commission from authorized ticket sellers at no extra cost to you. All trademarks, cinema logos, and promotional artwork belong to their respective copyright holders.
          </p>
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/privacy" className="hover:underline text-neutral-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline text-neutral-400">Terms of Service</Link>
            <Link href="/affiliate-disclosure" className="hover:underline text-neutral-300 font-medium">Affiliate Disclosure</Link>
            <Link href="/deals" className="hover:underline text-neutral-400">Partner Offers</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
