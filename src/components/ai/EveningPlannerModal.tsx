'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { generateEveningPlan } from '@/services/ai';
import {
  Sparkles,
  X,
  Clock,
  MapPin,
  Utensils,
  Film,
  GlassWater,
  Copy,
  Check,
  Calendar,
  Share2,
} from 'lucide-react';

export function EveningPlannerModal() {
  const { isEveningPlannerOpen, closeEveningPlanner, eveningPlannerItem } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isEveningPlannerOpen || !eveningPlannerItem) return null;

  const plan = generateEveningPlan(
    eveningPlannerItem.title,
    eveningPlannerItem.venueName || 'Premier Cinema',
    eveningPlannerItem.city || 'New York',
    eveningPlannerItem.time || '7:30 PM'
  );

  const handleCopy = () => {
    const text = `🎬 Date Night Itinerary: ${plan.title}\n📍 ${plan.venueName}, ${plan.city}\n\n` +
      plan.steps.map((s) => `${s.time} — ${s.title} (${s.venue})\n${s.description}\n`).join('\n') +
      `\nPlanned via BookByShow.com (https://bookbyshow.com)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getStepIcon = (category: string) => {
    switch (category) {
      case 'dining':
        return <Utensils className="w-4 h-4 text-amber-400" />;
      case 'showtime':
        return <Film className="w-4 h-4 text-[#e51821]" />;
      case 'lounge':
        return <GlassWater className="w-4 h-4 text-purple-400" />;
      default:
        return <Clock className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="AI Date Night & Evening Planner"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeEveningPlanner}
    >
      <div
        className="relative w-full max-w-xl bg-[#0b0d13] border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-7 space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-amber-600 text-white flex items-center justify-center shadow-lg shadow-red-950/50 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  AI Date Night & Evening Planner
                </h3>
                <span className="px-2 py-0.2 rounded-full bg-red-950/70 border border-red-500/40 text-[10px] font-bold text-red-300 uppercase">
                  3-Step Plan
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Tailored dining, arrival window, and post-show lounge near {plan.venueName}
              </p>
            </div>
          </div>

          <button
            onClick={closeEveningPlanner}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close Evening Planner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feature Hero Card */}
        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-semibold text-neutral-400 block">
              Event / Movie
            </span>
            <h4 className="text-sm font-bold text-white">{plan.title}</h4>
            <p className="text-xs text-neutral-400 flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-3 h-3 text-[#e51821]" />
              <span>{plan.venueName} • {plan.city}</span>
            </p>
          </div>
          <span className="px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-700 text-xs font-bold text-white shrink-0">
            {plan.scheduledTime}
          </span>
        </div>

        {/* Timeline Steps */}
        <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-neutral-800">
          {plan.steps.map((step, idx) => (
            <div key={idx} className="relative flex items-start gap-4 pl-1">
              <div className="w-7 h-7 rounded-full bg-neutral-900 border-2 border-neutral-700 flex items-center justify-center shrink-0 z-10 shadow">
                {getStepIcon(step.category)}
              </div>

              <div className="flex-1 p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-1.5">
                <div className="flex items-baseline justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-white">{step.time}</span>
                    <span className="text-xs font-semibold text-neutral-300">{step.title}</span>
                  </div>
                  <span className="text-[10px] font-medium text-neutral-400 shrink-0">
                    {step.proximity}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-amber-300/90 font-medium">
                  <span>{step.venue}</span>
                  <span>•</span>
                  <span className="text-neutral-400">{step.priceTier}</span>
                </div>

                <p className="text-[11px] text-neutral-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleCopy}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#e51821] hover:bg-[#c9121a] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-950/40 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Itinerary Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Date Night Plan</span>
              </>
            )}
          </button>

          <button
            onClick={closeEveningPlanner}
            className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
