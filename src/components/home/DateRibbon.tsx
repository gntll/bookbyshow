'use client';

import React from 'react';
import { Calendar } from 'lucide-react';

interface DateRibbonProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export function DateRibbon({ selectedDate, onSelectDate }: DateRibbonProps) {
  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);

    const iso = d.toISOString().split('T')[0];
    const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const monthDay = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    return {
      iso,
      dayName,
      monthDay,
      isToday: i === 0,
      isWeekend: d.getDay() === 0 || d.getDay() === 6,
    };
  });

  return (
    <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
      <div className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-neutral-300 shrink-0">
        <Calendar className="w-4 h-4 text-[#e51821]" />
        <span>Date:</span>
      </div>

      {days.map((item) => {
        const isSelected = selectedDate === item.iso;
        return (
          <button
            key={item.iso}
            onClick={() => onSelectDate(item.iso)}
            className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl text-center transition-all shrink-0 min-w-[86px] border ${
              isSelected
                ? 'bg-[#e51821] border-[#e51821] text-white font-bold shadow-md shadow-red-950/40 scale-102'
                : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white'
            }`}
          >
            <span className="text-xs uppercase tracking-wider font-bold">
              {item.dayName}
            </span>
            <span className="text-sm font-semibold mt-0.5">
              {item.monthDay}
            </span>
          </button>
        );
      })}
    </div>
  );
}
