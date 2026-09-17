'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Home, Film, Music, Bookmark, Search } from 'lucide-react';

export function MobileNav() {
  const pathname = usePathname();
  const { setIsSearchModalOpen, watchlist } = useApp();

  const items = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Movies', href: '/movies', icon: Film },
    { label: 'Search', action: () => setIsSearchModalOpen(true), icon: Search },
    { label: 'Events', href: '/events', icon: Music },
    { label: 'Saved', href: '/watchlist', icon: Bookmark, count: watchlist.length },
  ];

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#09090b]/95 backdrop-blur-md border-t border-neutral-800 px-2 py-2 safe-area-bottom">
      <div className="flex items-center justify-around">
        {items.map((item, idx) => {
          const Icon = item.icon;
          const isActive = item.href && pathname === item.href;

          if (item.action) {
            return (
              <button
                key={idx}
                onClick={item.action}
                className="flex flex-col items-center justify-center p-1 text-neutral-400 hover:text-white"
              >
                <div className="w-8 h-8 rounded-lg bg-neutral-800 text-white flex items-center justify-center border border-neutral-700">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-medium mt-0.5 text-neutral-300">Search</span>
              </button>
            );
          }

          return (
            <Link
              key={idx}
              href={item.href!}
              className={`flex flex-col items-center justify-center p-1 relative ${
                isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.count && item.count > 0 ? (
                  <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-white text-black rounded-full text-[9px] font-bold flex items-center justify-center">
                    {item.count}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] font-medium mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
