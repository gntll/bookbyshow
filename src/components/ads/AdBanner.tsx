'use client';

import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  format?: 'leaderboard' | 'in-feed' | 'sidebar';
  slotId?: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export function AdBanner({
  format = 'leaderboard',
  slotId = '0000000000',
  className = '',
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const isProduction = process.env.NODE_ENV === 'production';
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (adsenseClientId && isProduction && !hasLoadedRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        hasLoadedRef.current = true;
      } catch (e) {
        console.error('AdSense display error:', e);
      }
    }
  }, [adsenseClientId, isProduction]);

  // Dimension styling based on standard IAB / Google AdSense sizes
  const formatClasses = {
    leaderboard: 'w-full max-w-[728px] min-h-[90px]',
    'in-feed': 'w-full min-h-[100px] sm:min-h-[120px]',
    sidebar: 'w-full max-w-[300px] min-h-[250px]',
  };

  return (
    <aside
      aria-label="Advertisement"
      className={`my-6 flex flex-col items-center justify-center overflow-hidden ${className}`}
    >
      <div className="w-full flex items-center justify-center gap-2 mb-1.5">
        <span className="text-[10px] font-semibold tracking-widest text-neutral-500 uppercase">
          Advertisement
        </span>
      </div>

      <div
        className={`${formatClasses[format]} rounded-xl border border-neutral-800/80 bg-neutral-900/40 p-2 flex items-center justify-center text-center transition-colors`}
      >
        {adsenseClientId && isProduction ? (
          <ins
            ref={adRef}
            className="adsbygoogle block w-full h-full"
            style={{ display: 'block' }}
            data-ad-client={adsenseClientId}
            data-ad-slot={slotId}
            data-ad-format={format === 'sidebar' ? 'rectangle' : 'auto'}
            data-full-width-responsive="true"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-4 text-neutral-500 space-y-1 select-none">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-neutral-600" />
              <span>Google AdSense Slot</span>
            </div>
            <p className="text-[11px] text-neutral-400 max-w-sm">
              {format === 'leaderboard' && 'Leaderboard (728×90 / 320×100 Responsive)'}
              {format === 'in-feed' && 'In-Feed Responsive Display Unit'}
              {format === 'sidebar' && 'Medium Rectangle (300×250)'}
            </p>
            <span className="text-[10px] text-neutral-400 font-mono">
              Ready for client: {adsenseClientId || 'pub-XXXXXXXXXXXXXXXX'}
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}
