'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Tag, Copy, Check, ArrowRight } from 'lucide-react';

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
      description: 'All primary box offices waive online booking fees on Tuesday screenings. BookByShow calculates the exact \$0 fee quote.',
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
      description: 'Enjoy \$5 off your next 70mm or dual-laser IMAX booking when comparing multiple showings on BookByShow.',
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
    <div className="min-h-screen bg-[#06080e] pb-24">
      {/* Header */}
      <div className="border-b border-[#1e2638] bg-gradient-to-b from-[#181122] to-[#06080e] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Tag className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Verified Discount Aggregator
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Exclusive Deals & Promo Codes
          </h1>
          <p className="text-sm text-gray-400 mt-1 max-w-2xl">
            Stack verified promo codes and discount tiers with BookByShow’s lowest price guarantee.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="p-6 rounded-2xl bg-[#0d121e] border border-[#1e2638] hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    {deal.category}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-400">
                    {deal.savings}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mt-2">{deal.title}</h3>
                <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                  {deal.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Promo Code:</span>
                  <div className="px-3 py-1.5 rounded-lg bg-[#141b2b] border border-gray-700 text-amber-300 font-mono font-bold text-xs flex items-center gap-2">
                    <span>{deal.code}</span>
                    <button
                      onClick={() => handleCopy(deal.code)}
                      className="text-gray-400 hover:text-white transition-colors"
                      title="Copy code"
                      aria-label="Copy promo code"
                    >
                      {copiedCode === deal.code ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <Link
                  href="/movies"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-amber-500/20"
                >
                  <span>Apply & Compare</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
