'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  MapPin,
  Search,
  Bookmark,
  ChevronDown,
  X,
  Tag,
  Sparkles,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { currentCity, setIsCityModalOpen, setIsSearchModalOpen, watchlist, openShowScout } = useApp();
  const [showPromoBanner, setShowPromoBanner] = useState(true);

  const navLinks = [
    { label: 'Movies', href: '/movies' },
    { label: 'Live Events', href: '/events' },
    { label: 'Cinemas', href: '/cinemas' },
    { label: 'Guides', href: '/guides' },
    { label: 'Deals', href: '/deals' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-[#060709]/95 backdrop-blur-md transition-all">
      {/* Top AMC-style Cinema Red Announcement Banner */}
      {showPromoBanner && (
        <div className="bg-[#e51821] text-white py-2 px-4 text-xs sm:text-sm font-medium flex items-center justify-between gap-3 shadow-inner">
          <div className="flex-1 text-center flex items-center justify-center gap-2">
            <Tag className="w-4 h-4 shrink-0" />
            <span>
              100% Price Transparency: Compare verified ticket rates, showtimes & fees across AMC, Regal, Cinemark & Ticketmaster.{' '}
              <Link href="/deals" className="underline font-bold hover:text-neutral-100 ml-1">
                Savings Guide →
              </Link>
            </span>
          </div>
          <button
            onClick={() => setShowPromoBanner(false)}
            className="text-white/80 hover:text-white p-1.5 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Dismiss announcement banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Navbar */}
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 hover:border-[#e51821]/60 text-sm font-medium text-neutral-200 hover:text-white transition-colors"
            title="Change Location"
          >
            <MapPin className="w-4 h-4 text-[#e51821]" />
            <span className="max-w-[120px] truncate">{currentCity.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          </button>
        </div>

        {/* Main Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-colors relative ${
                  isActive
                    ? 'text-white bg-neutral-900 border border-neutral-800'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-900/60'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 inset-x-2 h-[2px] bg-[#e51821] rounded-full" />
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
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white text-sm transition-all"
            title="Search (Cmd + K)"
          >
            <Search className="w-4 h-4 text-neutral-400" />
            <span className="hidden lg:inline text-sm">Search movies, venues...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-xs bg-neutral-800 text-neutral-400 rounded border border-neutral-700">
              ⌘K
            </kbd>
          </button>

          {/* Watchlist */}
          <Link
            href="/watchlist"
            className="relative p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-[#e51821]/50 text-neutral-300 hover:text-white transition-colors"
            title="Saved Watchlist"
          >
            <Bookmark className="w-4 h-4" />
            {watchlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#e51821] text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                {watchlist.length}
              </span>
            )}
          </Link>

          {/* Ask AI Concierge CTA */}
          <button
            onClick={() => openShowScout()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-[#e51821] hover:from-red-500 hover:to-red-600 text-white text-sm font-bold shadow-md shadow-red-950/40 border border-red-500/40 transition-all focus:outline-none focus:ring-2 focus:ring-[#e51821] focus:ring-offset-2 focus:ring-offset-neutral-900"
            title="Ask ShowScout AI Concierge"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>
        </div>
      </div>
    </header>
  );
}
