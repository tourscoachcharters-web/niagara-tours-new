"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarDropdown({ onSelectDate, direction = "down", className = "" }) {
  const [viewDate, setViewDate] = useState(new Date());
  
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handlePrevMonth = (e) => { 
    e.stopPropagation(); 
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1)); 
  };
  
  const handleNextMonth = (e) => { 
    e.stopPropagation(); 
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1)); 
  };

  const positionClasses = direction === "up"
    ? "absolute bottom-full left-0 right-0 mb-3 origin-bottom"
    : "absolute top-full left-0 right-0 mt-2 origin-top";

  return (
    <div
      role="dialog"
      aria-label="Calendar date selector"
      className={`${positionClasses} bg-white rounded-3xl shadow-2xl border border-slate-200 z-[200] p-5 animate-in zoom-in-95 duration-200 text-[#0C3136] ${className}`}
    >
      {/* Quick Presets */}
      <div className="flex items-center gap-1.5 pb-3 mb-3 border-b border-slate-100 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            const tmrw = new Date();
            tmrw.setDate(tmrw.getDate() + 1);
            onSelectDate(tmrw);
          }}
          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#F8A41E]/20 text-[10px] font-black text-slate-700 whitespace-nowrap transition-colors"
        >
          Tomorrow
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            const sat = new Date();
            const dist = (6 - sat.getDay() + 7) % 7 || 7;
            sat.setDate(sat.getDate() + dist);
            onSelectDate(sat);
          }}
          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#F8A41E]/20 text-[10px] font-black text-slate-700 whitespace-nowrap transition-colors"
        >
          This Weekend
        </button>
      </div>

      {/* Month Navigator */}
      <div className="flex justify-between items-center mb-4">
        <button
          type="button"
          aria-label="Previous month"
          onClick={handlePrevMonth}
          className="p-1.5 hover:bg-slate-100 rounded-full text-slate-500 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8A41E]"
        >
          <ChevronLeft size={16} aria-hidden="true" />
        </button>
        <div className="font-black text-[#0C3136] text-xs uppercase tracking-wider" aria-live="polite">
          {months[viewDate.getMonth()]} {viewDate.getFullYear()}
        </div>
        <button
          type="button"
          aria-label="Next month"
          onClick={handleNextMonth}
          className="p-1.5 hover:bg-slate-100 rounded-full text-slate-500 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8A41E]"
        >
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2 text-center text-[10px] font-black text-slate-400 uppercase" aria-hidden="true">
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1" role="grid">
        {[...Array(firstDayOfMonth)].map((_, i) => (
          <div key={`empty-${i}`} aria-hidden="true" />
        ))}
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const cellDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
          cellDate.setHours(0, 0, 0, 0);
          const isToday = today.toDateString() === cellDate.toDateString();
          const isPast = cellDate < today;

          return (
            <button 
              key={day} 
              type="button" 
              disabled={isPast}
              aria-label={`${months[viewDate.getMonth()]} ${day}, ${viewDate.getFullYear()}`}
              onClick={(e) => { 
                e.stopPropagation(); 
                onSelectDate(cellDate); 
              }}
              className={`h-8 w-full rounded-xl text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C3136] flex items-center justify-center ${
                isPast 
                  ? 'text-slate-300 cursor-not-allowed'
                  : isToday 
                  ? 'border border-[#F8A41E] text-[#0C3136] font-black hover:bg-amber-50' 
                  : 'text-[#0C3136] hover:bg-slate-100'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
