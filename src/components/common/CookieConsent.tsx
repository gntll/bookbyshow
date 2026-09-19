'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, X } from 'lucide-react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('bbs_cookie_consent');
      if (!consent) {
        const timer = setTimeout(() => setIsVisible(true), 600);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage disabled in private mode
    }
  }, []);

  const handleAccept = (type: 'all' | 'essential') => {
    try {
      localStorage.setItem('bbs_cookie_consent', type);
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Privacy and Cookie Choices"
      className="fixed bottom-20 md:bottom-6 inset-x-4 max-w-xl mx-auto z-50 p-4 sm:p-5 rounded-2xl bg-[#0c0e14]/95 border border-neutral-800 shadow-2xl backdrop-blur-md text-neutral-300 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-red-950/60 border border-[#e51821]/50 text-[#e51821] flex items-center justify-center shrink-0 mt-0.5">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xs sm:text-sm font-bold text-white">
              Your Privacy & Cookie Preferences
            </h3>
            <button
              onClick={() => handleAccept('essential')}
              className="text-neutral-500 hover:text-white p-1 rounded transition-colors"
              aria-label="Dismiss cookie notice"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[11px] sm:text-xs text-neutral-400 leading-relaxed">
            BookByShow uses essential cookies and authorized affiliate tracking tags (such as Impact Universal Tag) to compare live showtimes and sustain our free service at zero extra cost to you. We never sell your personal data. Learn more in our{' '}
            <Link href="/privacy" className="text-white underline hover:text-[#e51821]">
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href="/affiliate-disclosure" className="text-[#e51821] underline hover:text-white">
              Affiliate Disclosure
            </Link>.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1.5">
            <button
              onClick={() => handleAccept('all')}
              className="px-3.5 py-1.5 rounded-lg bg-[#e51821] hover:bg-[#c9121a] text-white font-bold text-xs shadow-md shadow-red-950/40 transition-colors"
            >
              Accept All
            </button>
            <button
              onClick={() => handleAccept('essential')}
              className="px-3.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white font-semibold text-xs transition-colors"
            >
              Essential Only
            </button>
            <Link
              href="/privacy#do-not-sell"
              className="text-[11px] text-neutral-400 hover:text-white underline ml-auto hidden sm:inline"
            >
              Do Not Sell My Info (CCPA)
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
