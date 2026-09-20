'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { getSeatAdvisorRecommendation } from '@/services/ai';
import { MovieFormat } from '@/types';
import {
  Sparkles,
  X,
  Volume2,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Armchair,
  ShieldCheck,
} from 'lucide-react';

export function SeatAdvisorModal() {
  const { isSeatAdvisorOpen, closeSeatAdvisor, seatAdvisorData } = useApp();

  if (!isSeatAdvisorOpen || !seatAdvisorData) return null;

  const { format, cinemaName } = seatAdvisorData;
  const rec = getSeatAdvisorRecommendation(format as MovieFormat, cinemaName);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="AI Optimal Seat & Acoustic Advisor"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeSeatAdvisor}
    >
      <div
        className="relative w-full max-w-xl bg-[#0b0d13] border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-7 space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-950/70 border border-red-500/50 text-[#e51821] flex items-center justify-center shadow-lg shadow-red-950/40 shrink-0">
              <Armchair className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  AI Optimal Seat Advisor
                </h3>
                <span className="px-2 py-0.5 rounded bg-[#e51821] text-white text-[10px] font-bold uppercase">
                  {rec.format}
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Auditorium acoustic sweet spots & field-of-view geometry for {cinemaName}
              </p>
            </div>
          </div>

          <button
            onClick={closeSeatAdvisor}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close Advisor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Auditorium Mini Map */}
        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 flex flex-col items-center justify-center text-center space-y-3">
          {/* Curved Screen */}
          <div className="w-3/4 h-2.5 rounded-full bg-gradient-to-r from-red-600 via-neutral-200 to-red-600 shadow-lg shadow-red-900/30" />
          <span className="text-xs uppercase font-bold text-neutral-400 tracking-wider">
            Curved Giant Screen (Front)
          </span>

          {/* Seat Grid Visual */}
          <div className="w-full max-w-xs space-y-2 pt-2">
            <div className="text-xs text-neutral-400 font-mono flex justify-between px-4">
              <span>Row A–C</span>
              <span className="text-neutral-400 font-bold">Avoid (Too Steep)</span>
            </div>
            <div className="h-5 rounded bg-neutral-900/80 border border-neutral-800 flex items-center justify-center text-xs text-neutral-400 font-medium">
              Front Rows (Eye Fatigue Zone)
            </div>

            <div className="text-xs text-emerald-400 font-mono flex justify-between px-4 pt-1 font-bold">
              <span>{rec.optimalRows}</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Optimal Zone
              </span>
            </div>
            <div className="h-7 rounded bg-emerald-950/80 border border-emerald-500/60 flex items-center justify-center text-xs font-bold text-emerald-200 shadow-sm shadow-emerald-950/40">
              {rec.optimalSeats} (Acoustic Sweet Spot)
            </div>

            <div className="text-xs text-neutral-400 font-mono flex justify-between px-4 pt-1">
              <span>Rear Rows</span>
              <span>Acceptable</span>
            </div>
            <div className="h-5 rounded bg-neutral-900/80 border border-neutral-800 flex items-center justify-center text-xs text-neutral-400 font-medium">
              Upper Recliners (Further Back)
            </div>
          </div>
        </div>

        {/* Two-Column Guidance Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm">
          <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1.5">
            <div className="flex items-center gap-1.5 text-white font-bold">
              <Eye className="w-4 h-4 text-cyan-400" />
              <span>Field of View</span>
            </div>
            <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed">
              {rec.fieldOfViewAngle}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1.5">
            <div className="flex items-center gap-1.5 text-white font-bold">
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>Acoustic Convergence</span>
            </div>
            <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed">
              {rec.acousticSweetSpot}
            </p>
          </div>
        </div>

        {/* Detailed AI Engineering Notes */}
        <div className="space-y-2">
          <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#e51821]" />
            <span>Format Calibration Details</span>
          </h4>
          <ul className="space-y-2 text-sm text-neutral-200">
            {rec.experienceNotes.map((note, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e51821] mt-1.5 shrink-0" />
                <span className="leading-relaxed">{note}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Warning Note */}
        <div className="p-3.5 rounded-xl bg-yellow-950/30 border border-yellow-500/40 text-sm text-yellow-200 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-yellow-100">Rows to Avoid:</strong>{' '}
            <span>{rec.avoidRows}</span>
          </div>
        </div>

        <button
          onClick={closeSeatAdvisor}
          className="w-full py-3 rounded-xl bg-[#e51821] hover:bg-[#c9121a] text-white text-sm font-bold transition-colors"
        >
          Got It, Pick My Seats
        </button>
      </div>
    </div>
  );
}
