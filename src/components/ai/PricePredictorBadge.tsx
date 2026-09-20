'use client';

import React, { useState } from 'react';
import { Event } from '@/types';
import { getPricePrediction } from '@/services/ai';
import { useApp } from '@/context/AppContext';
import {
  TrendingUp,
  TrendingDown,
  Sparkles,
  Bell,
  CheckCircle2,
  ChevronDown,
  Info,
} from 'lucide-react';

interface PricePredictorBadgeProps {
  event: Event;
  variant?: 'compact' | 'detailed';
}

export function PricePredictorBadge({
  event,
  variant = 'compact',
}: PricePredictorBadgeProps) {
  const { openAlertModal } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const prediction = getPricePrediction(event);

  const isBuyNow = prediction.recommendation === 'buy_now';

  if (variant === 'compact') {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          openAlertModal(event.title);
        }}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold tracking-wide border transition-all ${
          isBuyNow
            ? 'bg-red-950/80 text-red-300 border-red-500/40 hover:bg-red-900/80'
            : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/80'
        }`}
        title={`${prediction.reason} Click to set price alert.`}
      >
        <Sparkles className="w-3.5 h-3.5" />
        {isBuyNow ? (
          <>
            <TrendingUp className="w-3.5 h-3.5" />
            <span>AI: BUY NOW ({prediction.confidence}%)</span>
          </>
        ) : (
          <>
            <TrendingDown className="w-3.5 h-3.5" />
            <span>AI: WAIT & TRACK ({prediction.confidence}%)</span>
          </>
        )}
      </button>
    );
  }

  // Detailed Card on Event Detail Page
  return (
    <div className="p-5 rounded-2xl bg-[#0e1017] border border-neutral-800 shadow-xl space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              isBuyNow ? 'bg-red-950 text-red-400 border border-red-500/40' : 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
            }`}
          >
            {isBuyNow ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              AI Price Trajectory & Surge Predictor
            </span>
            <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2 mt-0.5">
              <span>{isBuyNow ? 'Recommendation: Buy Now' : 'Recommendation: Wait & Monitor'}</span>
              <span className="px-2.5 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-300">
                {prediction.confidence}% Confidence
              </span>
            </h4>
          </div>
        </div>

        <button
          onClick={() => openAlertModal(event.title)}
          className="px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-sm font-semibold text-neutral-200 hover:text-white flex items-center gap-1.5 transition-colors shrink-0"
        >
          <Bell className="w-4 h-4 text-[#e51821]" />
          <span>Price Alert</span>
        </button>
      </div>

      <p className="text-sm text-neutral-300 leading-relaxed">
        {prediction.reason}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-neutral-800/80 text-xs sm:text-sm">
        <div>
          <span className="text-neutral-400 block text-xs uppercase font-medium">Market Demand</span>
          <span className="text-white font-bold text-sm">{prediction.marketDemand}</span>
        </div>
        <div>
          <span className="text-neutral-400 block text-xs uppercase font-medium">Trajectory</span>
          <span className={`text-sm font-bold ${isBuyNow ? 'text-red-400' : 'text-emerald-400'}`}>
            {prediction.trajectory}
          </span>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <span className="text-neutral-400 block text-xs uppercase font-medium">Days to Event</span>
          <span className="text-white font-bold text-sm">{prediction.daysUntilEvent} days remaining</span>
        </div>
      </div>

      {prediction.estimatedSavings && (
        <div className="p-3 rounded-xl bg-red-950/30 border border-red-500/30 text-xs sm:text-sm text-red-200 flex items-center gap-2.5">
          <Info className="w-4 h-4 text-[#e51821] shrink-0" />
          <span>{prediction.estimatedSavings}</span>
        </div>
      )}
    </div>
  );
}
