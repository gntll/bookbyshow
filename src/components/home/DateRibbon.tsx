'use client';

import React from 'react';
import { Calendar } from 'lucide-react';

interface DateRibbonProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export function DateRibbon({ selectedDate, onSelectDate }: DateRibbonProps) {
  // Generate next 7 days
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
    <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none">
      <div className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-400 shrink-0">
        <Calendar className="w-4 h-4 text-rose-500" />
        <span>Date:</span>
      </div>

      {days.map((item) => {
        const isSelected = selectedDate === item.iso;
        return (
          <button
            key={item.iso}
            onClick={() => onSelectDate(item.iso)}
            className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl text-center transition-all shrink-0 min-w-[85px] border ${
              isSelected
                ? 'bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-600/30 scale-105'
                : 'bg-[#0f1422] border-[#1e2638] hover:border-gray-500 text-gray-300 hover:text-white'
            }`}
          >
            <span className="text-[11px] font-bold uppercase tracking-wider">
              {item.dayName}
            </span>
            <span className="text-xs font-medium mt-0.5 opacity-90">
              {item.monthDay}
            </span>
          </button>
        );
      })}
    </div>
  );
}
