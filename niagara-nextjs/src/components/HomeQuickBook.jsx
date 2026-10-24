"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Compass, Calendar, ChevronDown, Search } from 'lucide-react';
import CalendarDropdown from '@/components/CalendarDropdown';

export default function HomeQuickBook() {
  const router = useRouter();
  const [selectedTour, setSelectedTour] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedTour && selectedTour !== 'all') {
      const url = `/tour/${selectedTour}${selectedDate ? `?date=${encodeURIComponent(selectedDate)}` : ''}`;
      router.push(url);
    } else {
      router.push('/tours');
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <form
        onSubmit={handleSearch}
        className="bg-white/95 backdrop-blur-md rounded-3xl lg:rounded-full p-4 lg:p-3 shadow-2xl shadow-slate-950/20 border border-white/50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center"
      >
        {/* Pickup Location */}
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl hover:bg-slate-50 transition-colors">
          <div className="w-10 h-10 rounded-full bg-[#0C3136]/5 flex items-center justify-center text-[#125D66] shrink-0" aria-hidden="true">
            <MapPin className="w-5 h-5 text-[#F8A41E]" />
          </div>
          <div className="text-left min-w-0 flex-1">
            <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
              Departure Point
            </label>
            <p className="font-bold text-xs text-[#0C3136] truncate">Toronto &amp; GTA Pickup</p>
          </div>
        </div>

        {/* Experience Dropdown */}
        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl hover:bg-slate-50 transition-colors relative">
          <div className="w-10 h-10 rounded-full bg-[#0C3136]/5 flex items-center justify-center text-[#125D66] shrink-0" aria-hidden="true">
            <Compass className="w-5 h-5 text-[#125D66]" />
          </div>
          <div className="text-left min-w-0 flex-1">
            <label htmlFor="hero-tour-select" className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
              Experience
            </label>
            <select
              id="hero-tour-select"
              value={selectedTour}
              onChange={(e) => setSelectedTour(e.target.value)}
              className="font-bold text-xs text-[#0C3136] bg-transparent outline-none w-full cursor-pointer appearance-none pr-5"
            >
              <option value="all">All Niagara Tours</option>
              <option value="classic-day-escape">Classic Day Escape ($99)</option>
              <option value="half-day-private">Half Day Private ($795)</option>
              <option value="ultimate-adventure">Ultimate Adventure ($149)</option>
              <option value="evening-illumination">Evening &amp; Fireworks ($139)</option>
              <option value="wine-country">Wine Country &amp; Falls ($169)</option>
              <option value="vip-experience">Custom VIP Charter ($995)</option>
            </select>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
        </div>

        {/* Date Selector */}
        <div ref={calendarRef} className="relative flex items-center gap-3 px-5 py-3 rounded-2xl hover:bg-slate-50 transition-colors">
          <div className="w-10 h-10 rounded-full bg-[#0C3136]/5 flex items-center justify-center text-[#125D66] shrink-0" aria-hidden="true">
            <Calendar className="w-5 h-5 text-[#F8A41E]" />
          </div>
          <div className="text-left min-w-0 flex-1">
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
              Travel Date
            </span>
            <button
              type="button"
              onClick={() => setShowCalendar(!showCalendar)}
              aria-label={`Selected date: ${selectedDate || "Choose Date"}`}
              className="font-bold text-xs text-[#0C3136] text-left w-full truncate focus:outline-none"
            >
              {selectedDate || "Any Date (Open)"}
            </button>
          </div>
          {showCalendar && (
            <div className="absolute top-full left-0 mt-3 z-50">
              <CalendarDropdown
                onSelectDate={(d) => {
                  setSelectedDate(d.toLocaleDateString());
                  setShowCalendar(false);
                }}
              />
            </div>
          )}
        </div>

        {/* Search CTA */}
        <div className="p-1">
          <button
            type="submit"
            className="w-full bg-[#D91E1E] hover:bg-[#b01818] text-white py-4 px-6 rounded-2xl lg:rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-900/30 flex items-center justify-center gap-2 group active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D91E1E]"
          >
            <Search className="w-4 h-4" aria-hidden="true" />
            <span>FIND TOURS</span>
          </button>
        </div>
      </form>
    </div>
  );
}
