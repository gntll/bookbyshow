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
      <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-400 shrink-0">
        <Calendar className="w-3.5 h-3.5 text-neutral-500" />
        <span>Date:</span>
      </div>

      {days.map((item) => {
        const isSelected = selectedDate === item.iso;
        return (
          <button
            key={item.iso}
            onClick={() => onSelectDate(item.iso)}
            className={`flex flex-col items-center justify-center px-3.5 py-1.5 rounded-lg text-center transition-colors shrink-0 min-w-[80px] border ${
              isSelected
                ? 'bg-white border-white text-black font-semibold'
                : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white'
            }`}
          >
            <span className="text-[10px] uppercase tracking-wider font-semibold">
              {item.dayName}
            </span>
            <span className="text-xs font-normal mt-0.5">
              {item.monthDay}
            </span>
          </button>
        );
      })}
    </div>
  );
}
