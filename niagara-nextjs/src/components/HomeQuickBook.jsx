"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Compass, Calendar, ChevronDown, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';

const DEPARTURE_OPTIONS = [
  { value: 'all', label: 'Toronto & GTA Pickup (All Hubs)' },
  { value: 'downtown', label: 'Downtown Toronto (Central Hotel Hubs)' },
  { value: 'airport', label: 'Toronto Pearson Airport (YYZ)' },
  { value: 'mississauga', label: 'Mississauga / Brampton / Oakville' },
  { value: 'markham', label: 'Markham / Richmond Hill / Scarborough' },
];

const TOUR_OPTIONS = [
  { value: 'all', label: 'All Niagara Tours (Browse 7 Packages)' },
  {
    group: 'Curated Day Experiences',
    options: [
      { value: 'classic-day-escape', label: 'Classic Day Escape ($99) • Most Popular' },
      { value: 'ultimate-adventure', label: 'Ultimate Adventure ($149) • Boat & Tunnels' },
      { value: 'day', label: 'All Day Tours (View Category)' },
    ],
  },
  {
    group: 'Evening & Wine Adventures',
    options: [
      { value: 'evening-illumination', label: 'Evening & Fireworks ($139) • Night Falls' },
      { value: 'wine-country', label: 'Wine Country & Falls ($169) • Tastings' },
      { value: 'evening', label: 'All Evening & Wine Tours' },
    ],
  },
  {
    group: 'Private VIP Charters',
    options: [
      { value: 'half-day-private', label: 'Half Day Private Tour ($795) • Up to 6' },
      { value: 'vip-experience', label: 'Custom VIP Charter ($995) • Executive' },
      { value: 'private', label: 'All Private Charters' },
    ],
  },
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function formatDateDisplay(isoStr) {
  if (!isoStr) return "Any Date (Open)";
  try {
    const [year, month, day] = isoStr.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(year, month - 1, day);
    checkDate.setHours(0, 0, 0, 0);

    const diffDays = Math.round((checkDate - today) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";

    return dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return isoStr;
  }
}

function formatDateISO(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getUpcomingSaturday() {
  const d = new Date();
  const dayOfWeek = d.getDay();
  const distance = (6 - dayOfWeek + 7) % 7 || 7;
  d.setDate(d.getDate() + distance);
  return d;
}

export default function HomeQuickBook() {
  const router = useRouter();
  const [selectedDeparture, setSelectedDeparture] = useState('all');
  const [selectedTour, setSelectedTour] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const calendarRef = useRef(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calendar calculations
  const viewYear = calendarMonth.getFullYear();
  const viewMonth = calendarMonth.getMonth();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayISO = formatDateISO(today);

  const calendarDays = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push({ day: null });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const cellDate = new Date(viewYear, viewMonth, d);
    cellDate.setHours(0, 0, 0, 0);
    const iso = formatDateISO(cellDate);
    const isPast = cellDate < today;
    calendarDays.push({ day: d, iso, isPast });
  }

  const handlePrevMonth = (e) => {
    e.stopPropagation();
    setCalendarMonth(new Date(viewYear, viewMonth - 1, 1));
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    setCalendarMonth(new Date(viewYear, viewMonth + 1, 1));
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // 1. Direct match for single tour package
    const individualTourIds = [
      'classic-day-escape',
      'half-day-private',
      'ultimate-adventure',
      'evening-illumination',
      'wine-country',
      'vip-experience',
      'three-day-tour',
    ];

    if (individualTourIds.includes(selectedTour)) {
      const params = new URLSearchParams();
      if (selectedDate) params.set('date', selectedDate);
      if (selectedDeparture && selectedDeparture !== 'all') params.set('departure', selectedDeparture);
      const query = params.toString() ? `?${params.toString()}` : '';
      router.push(`/tour/${selectedTour}${query}`);
      return;
    }

    // 2. Category or All Tours
    const params = new URLSearchParams();
    if (selectedTour && selectedTour !== 'all') params.set('category', selectedTour);
    if (selectedDate) params.set('date', selectedDate);
    if (selectedDeparture && selectedDeparture !== 'all') params.set('departure', selectedDeparture);
    const query = params.toString() ? `?${params.toString()}` : '';

    // If on homepage and search has no filters, scroll smoothly to the tours section
    if (typeof window !== 'undefined' && window.location.pathname === '/' && !query) {
      const catalogEl = document.getElementById('tours-catalog') || document.getElementById('all-tours-heading');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    router.push(`/tours${query}`);
  };

  // Find readable labels for display
  const selectedDepartureObj = DEPARTURE_OPTIONS.find((o) => o.value === selectedDeparture);
  let selectedTourLabel = 'All Niagara Tours';
  if (selectedTour !== 'all') {
    for (const group of TOUR_OPTIONS) {
      if (group.options) {
        const found = group.options.find((o) => o.value === selectedTour);
        if (found) {
          selectedTourLabel = found.label.split('•')[0].trim();
          break;
        }
      }
    }
  }

  const displayDate = formatDateDisplay(selectedDate);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <form
        onSubmit={handleSearch}
        className="bg-white/95 backdrop-blur-md rounded-3xl lg:rounded-full p-3 sm:p-4 lg:p-2.5 shadow-2xl shadow-slate-950/20 border border-white/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-3 items-center relative z-40"
      >
        {/* 1. DEPARTURE POINT */}
        <div className="lg:col-span-3 relative flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer border border-transparent hover:border-slate-200">
          <div
            className="w-10 h-10 rounded-full bg-[#0C3136]/5 flex items-center justify-center text-[#125D66] shrink-0 group-hover:scale-105 transition-transform"
            aria-hidden="true"
          >
            <MapPin className="w-5 h-5 text-[#F8A41E]" />
          </div>
          <div className="text-left min-w-0 flex-1">
            <label
              htmlFor="hero-departure-select"
              className="text-[9px] font-black uppercase text-slate-400 tracking-widest block cursor-pointer"
            >
              Departure Point
            </label>
            <p className="font-bold text-xs text-[#0C3136] truncate">
              {selectedDepartureObj ? selectedDepartureObj.label.split('(')[0].trim() : 'Toronto & GTA Pickup'}
            </p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 pointer-events-none" aria-hidden="true" />

          {/* Full overlay interactive select */}
          <select
            id="hero-departure-select"
            aria-label="Select departure point"
            value={selectedDeparture}
            onChange={(e) => setSelectedDeparture(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-base"
          >
            {DEPARTURE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* 2. EXPERIENCE */}
        <div className="lg:col-span-4 relative flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer border border-transparent hover:border-slate-200">
          <div
            className="w-10 h-10 rounded-full bg-[#0C3136]/5 flex items-center justify-center text-[#125D66] shrink-0 group-hover:scale-105 transition-transform"
            aria-hidden="true"
          >
            <Compass className="w-5 h-5 text-[#125D66]" />
          </div>
          <div className="text-left min-w-0 flex-1">
            <label
              htmlFor="hero-tour-select"
              className="text-[9px] font-black uppercase text-slate-400 tracking-widest block cursor-pointer"
            >
              Experience
            </label>
            <p className="font-bold text-xs text-[#0C3136] truncate">
              {selectedTourLabel}
            </p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 pointer-events-none" aria-hidden="true" />

          {/* Full overlay interactive select */}
          <select
            id="hero-tour-select"
            aria-label="Select experience or tour package"
            value={selectedTour}
            onChange={(e) => setSelectedTour(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-base"
          >
            <option value="all">All Niagara Tours (Browse 7 Packages)</option>
            <optgroup label="Popular Day Experiences">
              <option value="classic-day-escape">Classic Day Escape ($99) • Most Popular</option>
              <option value="ultimate-adventure">Ultimate Adventure ($149) • Boat & Tunnels</option>
              <option value="day">View All Day Tours Category</option>
            </optgroup>
            <optgroup label="Evening & Wine Adventures">
              <option value="evening-illumination">Evening & Fireworks ($139) • Night Falls</option>
              <option value="wine-country">Wine Country & Falls ($169) • Tastings</option>
              <option value="evening">View All Evening & Wine Tours</option>
            </optgroup>
            <optgroup label="Private VIP Charters">
              <option value="half-day-private">Half Day Private Tour ($795) • Up to 6</option>
              <option value="vip-experience">Custom VIP Charter ($995) • Executive</option>
              <option value="private">View All Private Charters</option>
            </optgroup>
          </select>
        </div>

        {/* 3. TRAVEL DATE */}
        <div
          ref={calendarRef}
          className="lg:col-span-3 relative flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer border border-transparent hover:border-slate-200"
        >
          <div
            className="w-10 h-10 rounded-full bg-[#0C3136]/5 flex items-center justify-center text-[#125D66] shrink-0 group-hover:scale-105 transition-transform"
            aria-hidden="true"
          >
            <Calendar className="w-5 h-5 text-[#F8A41E]" />
          </div>
          <div className="text-left min-w-0 flex-1">
            <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
              Travel Date
            </span>
            <button
              type="button"
              onClick={() => setShowCalendar(!showCalendar)}
              aria-label={`Selected travel date: ${displayDate}`}
              aria-expanded={showCalendar}
              className="font-bold text-xs text-[#0C3136] text-left w-full truncate focus:outline-none"
            >
              {displayDate}
            </button>
          </div>

          {selectedDate ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedDate('');
                setShowCalendar(false);
              }}
              aria-label="Clear selected date"
              className="text-slate-400 hover:text-red-500 p-1 rounded-full transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 pointer-events-none" aria-hidden="true" />
          )}

          {/* Self-contained Dropdown Calendar */}
          {showCalendar && (
            <div
              role="dialog"
              aria-label="Choose travel date"
              className="absolute top-full right-0 sm:right-auto sm:left-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 z-[200] p-5 animate-in fade-in zoom-in-95 duration-200 text-[#0C3136]"
            >
              {/* Quick Presets */}
              <div className="flex items-center gap-1.5 pb-3 mb-3 border-b border-slate-100 overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => {
                    const tmrw = new Date();
                    tmrw.setDate(tmrw.getDate() + 1);
                    setSelectedDate(formatDateISO(tmrw));
                    setShowCalendar(false);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#F8A41E]/20 text-[10px] font-black text-slate-700 whitespace-nowrap transition-colors"
                >
                  Tomorrow
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const sat = getUpcomingSaturday();
                    setSelectedDate(formatDateISO(sat));
                    setShowCalendar(false);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#F8A41E]/20 text-[10px] font-black text-slate-700 whitespace-nowrap transition-colors"
                >
                  This Weekend
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDate('');
                    setShowCalendar(false);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[10px] font-black text-slate-500 whitespace-nowrap transition-colors"
                >
                  Any Date
                </button>
              </div>

              {/* Month Navigation */}
              <div className="flex justify-between items-center mb-3">
                <button
                  type="button"
                  aria-label="Previous month"
                  onClick={handlePrevMonth}
                  className="p-1.5 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-black text-xs uppercase tracking-wider text-[#0C3136]">
                  {MONTH_NAMES[viewMonth]} {viewYear}
                </span>
                <button
                  type="button"
                  aria-label="Next month"
                  onClick={handleNextMonth}
                  className="p-1.5 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Days of Week */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-black text-slate-400 uppercase mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                  <div key={d}>{d}</div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((cell, idx) => {
                  if (!cell.day) {
                    return <div key={`empty-${idx}`} />;
                  }
                  const isSelected = selectedDate === cell.iso;
                  const isToday = todayISO === cell.iso;
                  const isPast = cell.isPast;

                  return (
                    <button
                      key={cell.iso}
                      type="button"
                      disabled={isPast}
                      onClick={() => {
                        setSelectedDate(cell.iso);
                        setShowCalendar(false);
                      }}
                      className={`h-8 w-full rounded-xl text-xs font-bold transition-all flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#0C3136] text-[#F8A41E] font-black shadow-md'
                          : isToday
                          ? 'border border-[#F8A41E] text-[#0C3136] font-black hover:bg-amber-50'
                          : isPast
                          ? 'text-slate-300 cursor-not-allowed'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {cell.day}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 4. FIND TOURS CTA */}
        <div className="lg:col-span-2 p-1">
          <button
            type="submit"
            className="w-full bg-[#D91E1E] hover:bg-[#b01818] text-white py-3.5 px-4 rounded-2xl lg:rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-900/30 flex items-center justify-center gap-2 group active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D91E1E]"
          >
            <Search className="w-4 h-4 group-hover:scale-110 transition-transform" aria-hidden="true" />
            <span>FIND TOURS</span>
          </button>
        </div>
      </form>
    </div>
  );
}
