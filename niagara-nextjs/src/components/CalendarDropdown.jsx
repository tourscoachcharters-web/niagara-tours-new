"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarDropdown({ onSelectDate }) {
  const [viewDate, setViewDate] = useState(new Date());
  
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  
  const handlePrevMonth = (e) => { 
    e.stopPropagation(); 
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1)); 
  };
  
  const handleNextMonth = (e) => { 
    e.stopPropagation(); 
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1)); 
  };

  return (
    <div className="absolute bottom-full left-0 right-0 mb-3 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 z-[100] p-6 animate-in zoom-in-95 duration-200 origin-bottom">
      <div className="flex justify-between items-center mb-6">
        <button type="button" onClick={handlePrevMonth} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-all">
          <ChevronLeft size={18} />
        </button>
        <div className="font-black text-[#0C3136] text-[11px] uppercase tracking-[0.2em]">
          {months[viewDate.getMonth()]} {viewDate.getFullYear()}
        </div>
        <button type="button" onClick={handleNextMonth} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-all">
          <ChevronRight size={18} />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2 text-center text-[10px] font-black text-slate-300 uppercase">
        {days.map(day => <div key={day}>{day}</div>)}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {[...Array(firstDayOfMonth)].map((_, i) => <div key={`empty-${i}`} />)}
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const isToday = new Date().toDateString() === new Date(viewDate.getFullYear(), viewDate.getMonth(), day).toDateString();
          return (
            <button 
              key={day} 
              type="button" 
              onClick={(e) => { 
                e.stopPropagation(); 
                onSelectDate(new Date(viewDate.getFullYear(), viewDate.getMonth(), day)); 
              }}
              className={`h-9 w-full rounded-xl text-xs font-bold transition-all ${isToday ? 'bg-[#F8A41E] text-[#0C3136]' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}