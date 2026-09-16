'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  Ticket,
  MapPin,
  Search,
  Bookmark,
  ChevronDown,
  Sparkles,
  Flame,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { currentCity, setIsCityModalOpen, setIsSearchModalOpen, watchlist } = useApp();

  const navLinks = [
    { label: 'Movies', href: '/movies' },
    { label: 'Live Events', href: '/events' },
    { label: 'Cinemas', href: '/cinemas' },
    { label: 'Deals & Offers', href: '/deals', badge: 'Hot' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1e2638] bg-[#06080e]/85 backdrop-blur-xl transition-all">
      {/* Top micro-announcement banner */}
      <div className="bg-gradient-to-r from-rose-950/60 via-purple-950/60 to-indigo-950/60 border-b border-white/5 py-1 px-4 text-center text-xs text-gray-300 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>
          <strong className="text-white font-semibold">100% Price Transparency:</strong> Zero hidden convenience fees compared across AMC, Regal, Cinemark & Ticketmaster.
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & City Selector */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-rose-600/30 group-hover:scale-105 transition-transform">
              <Ticket className="w-5 h-5 -rotate-12" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center">
                BookBy<span className="text-rose-500">Show</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-gray-400 font-medium">
                Compare & Book
              </span>
            </div>
          </Link>

          {/* City switcher pill */}
          <button
            onClick={() => setIsCityModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#121826] border border-[#1e2638] hover:border-rose-500/50 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
            title="Change Location"
          >
            <MapPin className="w-3.5 h-3.5 text-rose-500" />
            <span className="max-w-[100px] truncate">{currentCity.name}</span>
            <ChevronDown className="w-3 h-3 text-gray-500" />
          </button>
        </div>

        {/* Main Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white bg-white/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-0.5">
                    <Flame className="w-2.5 h-2.5" />
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Search trigger, Watchlist, VIP Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search trigger */}
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#121826] border border-[#1e2638] hover:border-gray-500 text-gray-400 hover:text-white text-xs transition-all"
            title="Search (Cmd + K)"
          >
            <Search className="w-4 h-4" />
            <span className="hidden lg:inline">Search movies, events...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-black/40 text-gray-400 rounded border border-gray-700">
              ⌘K
            </kbd>
          </button>

          {/* Watchlist */}
          <Link
            href="/watchlist"
            className="relative p-2.5 rounded-xl bg-[#121826] border border-[#1e2638] hover:border-rose-500/50 text-gray-300 hover:text-white transition-colors"
            title="Saved Watchlist"
          >
            <Bookmark className="w-4 h-4" />
            {watchlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-extrabold flex items-center justify-center shadow-md shadow-rose-600/50">
                {watchlist.length}
              </span>
            )}
          </Link>

          {/* Join VIP / Sign In CTA */}
          <button
            onClick={() => {
              alert('Welcome to BookByShow VIP! Compare showtimes and save on convenience fees with zero subscription cost.');
            }}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition-all hover:scale-[1.02]"
          >
            <span>VIP Access</span>
          </button>
        </div>
      </div>
    </header>
  );
}
