'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, Mail } from 'lucide-react';

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
    <footer className="border-t border-neutral-800 bg-[#060709] text-neutral-400 pt-16 pb-24 md:pb-12 text-sm relative">
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#e51821] to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-neutral-900/70 border border-neutral-800 mb-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-[#e51821]/50 text-[#e51821] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">The BookByShow Fair Price Standard</h3>
              <p className="text-sm text-neutral-300 mt-1 max-w-xl">
                We compare prices across every major box office and primary ticket seller in real time. We display exact convenience fees upfront with zero hidden surcharges.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-sm">
            <div className="flex items-center gap-2 text-neutral-200 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#e51821]" />
              <span>Real-time Seats</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-200 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#e51821]" />
              <span>Direct Primary Handoff</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-200 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#e51821]" />
              <span>Encrypted Outbound</span>
            </div>
          </div>
        </div>

        <div className="mb-14 pb-12 border-b border-neutral-800/80">
          <p className="text-sm font-semibold text-neutral-400 uppercase tracking-wider text-center mb-6">
            Comparing Live Showtimes & Tickets Across Major Box Offices
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {partners.map((p, idx) => (
              <div
                key={idx}
                className="px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-sm font-medium text-neutral-200 hover:border-[#e51821]/40 transition-colors"
              >
                {p}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link href="/" className="inline-block mb-4" aria-label="BookByShow Home">
              <img
                src="/logo-transparent.png"
                alt="BookByShow"
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-neutral-300 leading-relaxed mb-4">
              BookByShow.com is an independent entertainment and ticket price comparison engine. We help fans find the closest auditorium, optimal sightlines, and lowest verified total rates.
            </p>
            <div className="space-y-1.5 text-sm text-neutral-400 mb-4">
              <p className="text-white font-medium">Publisher Desk:</p>
              <a href="mailto:support@bookbyshow.com" className="text-[#e51821] hover:underline block">support@bookbyshow.com</a>
              <a href="mailto:partners@bookbyshow.com" className="text-neutral-300 hover:text-white block">partners@bookbyshow.com</a>
            </div>
            <p className="text-xs text-neutral-400">
              &copy; {new Date().getFullYear()} BookByShow Inc. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e51821]" />
              <span>Company & Editorial</span>
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About BookByShow
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-white transition-colors font-medium text-white">
                  Cinema & Format Guides
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ & How It Works
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Support Desk
                </Link>
              </li>
              <li>
                <Link href="/deals" className="hover:text-white transition-colors">
                  Official Savings Guide
                </Link>
              </li>
              <li>
                <Link href="/affiliate-disclosure" className="text-[#e51821] hover:underline font-semibold transition-colors">
                  Affiliate Disclosure (FTC)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e51821]" />
              <span>Auditorium Formats</span>
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-300">
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
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#e51821]" />
              <span>Rate Drop Alerts</span>
            </h4>
            <p className="text-sm text-neutral-300 mb-3 leading-relaxed">
              Get notified for 70mm IMAX seat releases, stadium tour pre-sales, and verified matinee discount rates.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Subscribed! Welcome to early showtime drop alerts.');
              }}
              className="space-y-2.5"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#e51821]"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-[#e51821] hover:bg-[#c9121a] text-white font-bold text-sm rounded-lg shadow-md shadow-red-950/40 transition-colors"
              >
                Join Free Alerts
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p className="max-w-3xl leading-relaxed">
            <strong className="text-neutral-300">Affiliate & Legal Disclosure:</strong> BookByShow.com is an independent showtime and ticket price aggregator. We are supported by our users; when you buy tickets through affiliate links on our site, we may earn a referral commission from authorized ticket sellers at no extra cost to you. All trademarks, cinema logos, and promotional artwork belong to their respective copyright holders.
          </p>
          <div className="flex items-center gap-4 shrink-0 font-medium">
            <Link href="/about" className="hover:underline text-neutral-300 hover:text-white">About</Link>
            <Link href="/contact" className="hover:underline text-neutral-300 hover:text-white">Contact</Link>
            <Link href="/privacy" className="hover:underline text-neutral-300 hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:underline text-neutral-300 hover:text-white">Terms</Link>
            <Link href="/affiliate-disclosure" className="hover:underline text-[#e51821] font-semibold">Affiliate Disclosure</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
