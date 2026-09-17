'use client';

import React, { useState } from 'react';
import { Tag, Copy, Check } from 'lucide-react';

export default function DealsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const deals = [
    {
      id: 'matinee-magic',
      title: 'Matinee Savings: Up to 35% Off Daytime Showtimes',
      category: 'Cinema Matinee',
      description: 'Book screenings before 4:00 PM Monday through Thursday to automatically unlock discounted tier rates across AMC and Regal.',
      code: 'MATINEE35',
      badge: 'Automatic at Checkout',
      savings: 'Save up to $6.50 / ticket',
    },
    {
      id: 'zero-fee-tuesdays',
      title: 'Fee-Free Tuesdays: $0 Convenience Fees',
      category: 'Weekly Box Office Special',
      description: 'All primary box offices waive online booking fees on Tuesday screenings. BookByShow calculates the exact $0 fee quote.',
      code: 'ZEROFEETUE',
      badge: 'Every Tuesday',
      savings: 'Save up to $3.50 / ticket',
    },
    {
      id: 'student-rush',
      title: 'Student & Youth Rush: 20% Off Live Events',
      category: 'Concerts & Theatre',
      description: 'Exclusive rush rates for Broadway student rush tickets and general admission concert floors when booked 24 hours in advance.',
      code: 'STUDENTRUSH20',
      badge: 'Valid Student ID Required',
      savings: '20% off checkout',
    },
    {
      id: 'imax-double-pass',
      title: 'IMAX 70mm Fan Pass: $5 Off Return Screenings',
      category: 'Premium Large Format',
      description: 'Enjoy $5 off your next 70mm or dual-laser IMAX booking when comparing multiple showings on BookByShow.',
      code: 'IMAX70PASS',
      badge: 'Limited Availability',
      savings: '$5.00 flat discount',
    },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#09090b] pb-24">
      {/* Header */}
      <div className="border-b border-neutral-800 bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 rounded-md bg-neutral-850 text-neutral-300 border border-neutral-700">
              <Tag className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Verified Discount Aggregator
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Exclusive Deals & Promo Codes
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-2xl">
            Stack verified promo codes and discount tiers with BookByShow’s lowest price guarantee.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="p-6 rounded-xl bg-[#121215] border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col justify-between space-y-4 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-neutral-900 text-neutral-300 border border-neutral-800">
                    {deal.category}
                  </span>
                  <span className="text-xs font-bold text-white">
                    {deal.savings}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mt-2">{deal.title}</h3>
                <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                  {deal.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <code className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-mono text-xs font-bold">
                    {deal.code}
                  </code>
                  <button
                    onClick={() => handleCopy(deal.code)}
                    className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                    title="Copy promo code"
                  >
                    {copiedCode === deal.code ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <span className="text-[11px] text-neutral-500 font-medium self-center sm:self-auto">
                  {deal.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
