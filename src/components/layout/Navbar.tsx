'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  MapPin,
  Search,
  Bookmark,
  ChevronDown,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { currentCity, setIsCityModalOpen, setIsSearchModalOpen, watchlist } = useApp();

  const navLinks = [
    { label: 'Movies', href: '/movies' },
    { label: 'Live Events', href: '/events' },
    { label: 'Cinemas', href: '/cinemas' },
    { label: 'Deals & Offers', href: '/deals' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-[#09090b]/95 backdrop-blur-md transition-all">
      {/* Discreet institutional comparison notice */}
      <div className="bg-neutral-950 border-b border-neutral-800/80 py-1.5 px-4 text-center text-xs text-neutral-400">
        <span>
          <strong className="text-neutral-200 font-semibold">Independent Price Engine:</strong> Real-time verified rates compared side-by-side with full surcharge transparency.
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & City Selector */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className="flex items-center group py-1" aria-label="BookByShow Home">
            <img
              src="/logo-transparent.png"
              alt="BookByShow"
              className="h-8 sm:h-9 w-auto object-contain transition-opacity group-hover:opacity-90"
            />
          </Link>

          {/* City switcher pill */}
          <button
            onClick={() => setIsCityModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs font-medium text-neutral-300 hover:text-white transition-colors"
            title="Change Location"
          >
            <MapPin className="w-3.5 h-3.5 text-neutral-400" />
            <span className="max-w-[110px] truncate">{currentCity.name}</span>
            <ChevronDown className="w-3 h-3 text-neutral-500" />
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
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'text-white bg-neutral-800'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Search trigger, Watchlist, VIP Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search trigger */}
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white text-xs transition-all"
            title="Search (Cmd + K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Search movies, venues...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-neutral-800 text-neutral-400 rounded border border-neutral-700">
              ⌘K
            </kbd>
          </button>

          {/* Watchlist */}
          <Link
            href="/watchlist"
            className="relative p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white transition-colors"
            title="Saved Watchlist"
          >
            <Bookmark className="w-4 h-4" />
            {watchlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-black text-[10px] font-bold flex items-center justify-center">
                {watchlist.length}
              </span>
            )}
          </Link>

          {/* Rate Alerts CTA */}
          <button
            onClick={() => {
              alert('BookByShow rate engine is active. Real-time surcharge calculations and alerts enabled.');
            }}
            className="hidden sm:flex items-center px-4 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-black text-xs font-semibold transition-colors"
          >
            <span>Rate Alerts</span>
          </button>
        </div>
      </div>
    </header>
  );
}
