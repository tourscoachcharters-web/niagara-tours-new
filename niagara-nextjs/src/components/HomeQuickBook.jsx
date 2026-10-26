"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { TOURS_DATA } from '@/data/tours';
import { 
  MapPin, Compass, Calendar, ChevronDown, ChevronLeft, ChevronRight, 
  Search, X, Check, Sparkles, Moon, ShieldCheck, Clock, Zap
} from 'lucide-react';

const DEPARTURE_OPTIONS = [
  { value: 'all', label: 'Toronto & GTA Pickup (All Hubs)', desc: '5 Downtown Hubs + Hotel Loading Zones' },
  { value: 'downtown', label: 'Downtown Toronto (Central Hotel Hubs)', desc: 'ROM, Chelsea, Sheraton, Union' },
  { value: 'airport', label: 'Toronto Pearson Airport (YYZ)', desc: 'Airport Hotels & Renforth Hub' },
  { value: 'mississauga', label: 'Mississauga / Brampton / Oakville', desc: 'West GTA Hotel & Transit Pickups' },
  { value: 'niagara', label: 'Niagara Falls & NOTL Local', desc: 'Direct Pickup from Niagara Hotels & B&Bs' },
  { value: 'markham', label: 'Markham / Richmond Hill / Scarborough', desc: 'East & North GTA Locations' },
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

export default function HomeQuickBook({ tours }) {
  const router = useRouter();
  const [selectedDeparture, setSelectedDeparture] = useState('all');
  const [selectedTour, setSelectedTour] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [tourSearchQuery, setTourSearchQuery] = useState('');
  
  // Single dropdown state: 'departure' | 'experience' | 'calendar' | null
  const [openDropdown, setOpenDropdown] = useState(null);

  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const wrapperRef = useRef(null);

  // Fallback to static TOURS_DATA if tours prop is empty or not provided
  const allTours = useMemo(() => {
    return (tours && tours.length > 0) ? tours : TOURS_DATA;
  }, [tours]);

  // Dynamically group all existing & future tours by category
  const dynamicTourGroups = useMemo(() => {
    const day = allTours.filter((t) => !t.category || t.category === 'day');
    const evening = allTours.filter((t) => t.category === 'evening');
    const privateCharters = allTours.filter((t) => t.category === 'private');
    const others = allTours.filter((t) => t.category && !['day', 'evening', 'private'].includes(t.category));

    const groups = [
      {
        id: 'day',
        title: 'Day Tours & Escapes',
        icon: Sparkles,
        categoryValue: 'day',
        categoryLabel: 'All Day Tours',
        categoryDesc: `Browse all ${day.length} day tour packages`,
        tours: day
      },
      {
        id: 'evening',
        title: 'Evening, Dinner & Wine Adventures',
        icon: Moon,
        categoryValue: 'evening',
        categoryLabel: 'All Evening & Wine Tours',
        categoryDesc: `Browse all ${evening.length} twilight & winery packages`,
        tours: evening
      },
      {
        id: 'private',
        title: 'Private VIP Charters & Custom',
        icon: ShieldCheck,
        categoryValue: 'private',
        categoryLabel: 'All Private Charters',
        categoryDesc: `Browse all ${privateCharters.length} private group charters`,
        tours: privateCharters
      }
    ];

    if (others.length > 0) {
      groups.push({
        id: 'other',
        title: 'Special & Regional Explorations',
        icon: Compass,
        categoryValue: 'all',
        categoryLabel: 'All Special Experiences',
        categoryDesc: `Browse ${others.length} special regional packages`,
        tours: others
      });
    }

    return groups;
  }, [allTours]);

  // Filtered tours for real-time search within the experience dropdown
  const filteredTourGroups = useMemo(() => {
    const q = tourSearchQuery.trim().toLowerCase();
    if (!q) return dynamicTourGroups;

    return dynamicTourGroups.map((group) => {
      const matchedTours = group.tours.filter((tour) => {
        return (
          tour.title?.toLowerCase().includes(q) ||
          tour.tagline?.toLowerCase().includes(q) ||
          tour.overview?.toLowerCase().includes(q) ||
          tour.tag?.toLowerCase().includes(q)
        );
      });
      return {
        ...group,
        tours: matchedTours
      };
    }).filter((group) => group.tours.length > 0);
  }, [dynamicTourGroups, tourSearchQuery]);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
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
    setOpenDropdown(null);

    // 1. Direct match for any individual tour package (existing or future)
    const matchedTour = allTours.find((t) => t.id === selectedTour);
    if (matchedTour) {
      const params = new URLSearchParams();
      if (selectedDate) params.set('date', selectedDate);
      if (selectedDeparture && selectedDeparture !== 'all') params.set('departure', selectedDeparture);
      const query = params.toString() ? `?${params.toString()}` : '';
      router.push(`/tour/${matchedTour.id}${query}`);
      return;
    }

    // 2. Category Filter or All Tours
    const params = new URLSearchParams();
    if (selectedTour && selectedTour !== 'all') params.set('category', selectedTour);
    if (selectedDate) params.set('date', selectedDate);
    if (selectedDeparture && selectedDeparture !== 'all') params.set('departure', selectedDeparture);
    const query = params.toString() ? `?${params.toString()}` : '';

    // If on homepage and search has no filters, scroll smoothly to catalog
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

  let selectedTourTitle = 'All Niagara Tours';
  if (selectedTour !== 'all') {
    const directTour = allTours.find((t) => t.id === selectedTour);
    if (directTour) {
      selectedTourTitle = directTour.title;
    } else if (selectedTour === 'day') {
      selectedTourTitle = 'All Day Tours';
    } else if (selectedTour === 'evening') {
      selectedTourTitle = 'All Evening & Wine Tours';
    } else if (selectedTour === 'private') {
      selectedTourTitle = 'All Private & VIP Charters';
    }
  }

  const displayDate = formatDateDisplay(selectedDate);

  return (
    <div ref={wrapperRef} className="w-full max-w-5xl mx-auto">
      <form
        onSubmit={handleSearch}
        className="bg-white/95 backdrop-blur-md rounded-3xl lg:rounded-full p-3 sm:p-4 lg:p-2.5 shadow-2xl shadow-slate-950/20 border border-white/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-3 items-center relative z-50 text-slate-800"
      >
        {/* ========================================================================= */}
        {/* 1. DEPARTURE POINT                                                        */}
        {/* ========================================================================= */}
        <div className="lg:col-span-3 relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === 'departure' ? null : 'departure')}
            aria-expanded={openDropdown === 'departure'}
            aria-label={`Selected departure point: ${selectedDepartureObj?.label || 'Toronto & GTA Pickup'}`}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-left border ${
              openDropdown === 'departure'
                ? 'bg-slate-50 border-[#F8A41E] shadow-sm'
                : 'hover:bg-slate-50 border-transparent hover:border-slate-200'
            }`}
          >
            <div
              className="w-10 h-10 rounded-full bg-[#0C3136]/5 flex items-center justify-center text-[#125D66] shrink-0"
              aria-hidden="true"
            >
              <MapPin className="w-5 h-5 text-[#F8A41E]" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                Departure Point
              </span>
              <p className="font-bold text-xs text-[#0C3136] truncate">
                {selectedDepartureObj ? selectedDepartureObj.label.split('(')[0].trim() : 'Toronto & GTA Pickup'}
              </p>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${
                openDropdown === 'departure' ? 'rotate-180 text-[#F8A41E]' : ''
              }`}
              aria-hidden="true"
            />
          </button>

          {/* Custom Departure Menu */}
          {openDropdown === 'departure' && (
            <div
              role="listbox"
              aria-label="Available departure points"
              className="absolute top-full left-0 mt-3 w-72 sm:w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 z-[200] p-2.5 text-[#0C3136] animate-in fade-in zoom-in-95 duration-200"
            >
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Select Boarding Region
                </span>
              </div>
              <div className="space-y-1">
                {DEPARTURE_OPTIONS.map((opt) => {
                  const isSelected = selectedDeparture === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setSelectedDeparture(opt.value);
                        setOpenDropdown(null);
                      }}
                      className={`w-full text-left p-3 rounded-2xl text-xs font-bold transition-all flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'bg-[#0C3136] text-white shadow-sm'
                          : 'text-[#0C3136] hover:bg-slate-100'
                      }`}
                    >
                      <div>
                        <p className={`font-black ${isSelected ? 'text-[#F8A41E]' : 'text-[#0C3136]'}`}>
                          {opt.label}
                        </p>
                        <p className={`text-[11px] font-medium mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                          {opt.desc}
                        </p>
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-[#F8A41E] shrink-0 mt-0.5" aria-hidden="true" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 2. EXPERIENCE (AUTOMATIC ALL TOURS + FUTURE TOURS)                         */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === 'experience' ? null : 'experience')}
            aria-expanded={openDropdown === 'experience'}
            aria-label={`Selected tour experience: ${selectedTourTitle}`}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-left border ${
              openDropdown === 'experience'
                ? 'bg-slate-50 border-[#F8A41E] shadow-sm'
                : 'hover:bg-slate-50 border-transparent hover:border-slate-200'
            }`}
          >
            <div
              className="w-10 h-10 rounded-full bg-[#0C3136]/5 flex items-center justify-center text-[#125D66] shrink-0"
              aria-hidden="true"
            >
              <Compass className="w-5 h-5 text-[#125D66]" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                Experience
              </span>
              <p className="font-bold text-xs text-[#0C3136] truncate">
                {selectedTourTitle}
              </p>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${
                openDropdown === 'experience' ? 'rotate-180 text-[#F8A41E]' : ''
              }`}
              aria-hidden="true"
            />
          </button>

          {/* Dynamic Experience Menu */}
          {openDropdown === 'experience' && (
            <div
              role="listbox"
              aria-label="Available Niagara tour packages"
              className="absolute top-full left-0 sm:left-auto lg:left-0 mt-3 w-80 sm:w-[420px] bg-white rounded-3xl shadow-2xl border border-slate-200 z-[200] p-3 text-[#0C3136] max-h-[460px] overflow-y-auto no-scrollbar animate-in fade-in zoom-in-95 duration-200"
            >
              {/* Quick Filter Input */}
              <div className="relative mb-2 px-1 pt-1">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={tourSearchQuery}
                  onChange={(e) => setTourSearchQuery(e.target.value)}
                  placeholder="Type to filter tours by name..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-7 py-2 text-xs font-bold text-[#0C3136] placeholder:text-slate-400 focus:outline-none focus:border-[#F8A41E]"
                />
                {tourSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setTourSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* All Niagara Tours Option */}
              <button
                type="button"
                role="option"
                aria-selected={selectedTour === 'all'}
                onClick={() => {
                  setSelectedTour('all');
                  setOpenDropdown(null);
                }}
                className={`w-full text-left p-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between mb-2.5 ${
                  selectedTour === 'all'
                    ? 'bg-[#0C3136] text-white shadow-sm'
                    : 'bg-slate-50 text-[#0C3136] hover:bg-slate-100'
                }`}
              >
                <div>
                  <p className={`font-black ${selectedTour === 'all' ? 'text-[#F8A41E]' : 'text-[#0C3136]'}`}>
                    All Niagara Tours
                  </p>
                  <p className={`text-[11px] font-medium ${selectedTour === 'all' ? 'text-slate-300' : 'text-slate-500'}`}>
                    Browse all {allTours.length} tour packages &amp; charters
                  </p>
                </div>
                {selectedTour === 'all' && (
                  <Check className="w-4 h-4 text-[#F8A41E] shrink-0" aria-hidden="true" />
                )}
              </button>

              {/* Dynamically Grouped Tour Sections */}
              {filteredTourGroups.map((group) => {
                const GroupIcon = group.icon;
                return (
                  <div key={group.id} className="pt-2.5 border-t border-slate-100 first:border-0 first:pt-0">
                    <div className="flex items-center justify-between px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <GroupIcon className="w-3.5 h-3.5 text-[#F8A41E]" aria-hidden="true" />
                        <span>{group.title}</span>
                      </div>
                      <span className="text-[9px] font-bold text-slate-400">
                        {group.tours.length} Tours
                      </span>
                    </div>

                    {/* Category Overview Option */}
                    {!tourSearchQuery && group.categoryValue && (
                      <button
                        type="button"
                        role="option"
                        aria-selected={selectedTour === group.categoryValue}
                        onClick={() => {
                          setSelectedTour(group.categoryValue);
                          setOpenDropdown(null);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between mb-1 ${
                          selectedTour === group.categoryValue
                            ? 'bg-[#0C3136] text-white'
                            : 'bg-slate-50/70 hover:bg-slate-100 text-[#0C3136]'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <p className={`font-black ${selectedTour === group.categoryValue ? 'text-[#F8A41E]' : 'text-[#0C3136]'}`}>
                            {group.categoryLabel}
                          </p>
                          <p className={`text-[10px] ${selectedTour === group.categoryValue ? 'text-slate-300' : 'text-slate-500'}`}>
                            {group.categoryDesc}
                          </p>
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          selectedTour === group.categoryValue ? 'bg-[#F8A41E] text-[#0C3136]' : 'bg-slate-200/80 text-slate-600'
                        }`}>
                          Category
                        </span>
                      </button>
                    )}

                    {/* Individual Tour Buttons (Every existing & future tour) */}
                    <div className="space-y-1 mt-1">
                      {group.tours.map((tour) => {
                        const isSelected = selectedTour === tour.id;
                        const priceDisplay = `${tour.currencySymbol || 'CAD $'}${tour.price}`;
                        return (
                          <button
                            key={tour.id}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => {
                              setSelectedTour(tour.id);
                              setOpenDropdown(null);
                            }}
                            className={`w-full text-left p-2.5 rounded-2xl text-xs font-bold transition-all flex items-start justify-between gap-3 ${
                              isSelected
                                ? 'bg-[#0C3136] text-white shadow-sm'
                                : 'text-[#0C3136] hover:bg-slate-100'
                            }`}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className={`font-black leading-snug ${isSelected ? 'text-white' : 'text-[#0C3136]'}`}>
                                  {tour.title}
                                </span>
                                {tour.tag && (
                                  <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                    isSelected
                                      ? 'bg-[#F8A41E] text-[#0C3136]'
                                      : 'bg-slate-100 text-slate-600'
                                  }`}>
                                    {tour.tag}
                                  </span>
                                )}
                              </div>
                              <p className={`text-[11px] font-medium mt-0.5 truncate ${
                                isSelected ? 'text-slate-300' : 'text-slate-500'
                              }`}>
                                {tour.tagline || tour.overview}
                              </p>
                            </div>

                            <div className="text-right shrink-0 pt-0.5">
                              <span className={`text-xs font-black ${
                                isSelected ? 'text-[#F8A41E]' : 'text-[#0C3136]'
                              }`}>
                                {priceDisplay}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {filteredTourGroups.length === 0 && (
                <div className="p-6 text-center text-slate-400">
                  <p className="text-xs font-bold">No tours found matching &ldquo;{tourSearchQuery}&rdquo;</p>
                  <button
                    type="button"
                    onClick={() => setTourSearchQuery('')}
                    className="text-[11px] font-black text-[#F8A41E] hover:underline mt-2 inline-block"
                  >
                    Clear Filter
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 3. TRAVEL DATE                                                            */}
        {/* ========================================================================= */}
        <div className="lg:col-span-3 relative">
          <div
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all border ${
              openDropdown === 'calendar'
                ? 'bg-slate-50 border-[#F8A41E] shadow-sm'
                : 'hover:bg-slate-50 border-transparent hover:border-slate-200'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'calendar' ? null : 'calendar')}
              aria-expanded={openDropdown === 'calendar'}
              aria-label={`Selected travel date: ${displayDate}`}
              className="flex items-center gap-3 min-w-0 flex-1 text-left focus:outline-none"
            >
              <div
                className="w-10 h-10 rounded-full bg-[#0C3136]/5 flex items-center justify-center text-[#125D66] shrink-0"
                aria-hidden="true"
              >
                <Calendar className="w-5 h-5 text-[#F8A41E]" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">
                  Travel Date
                </span>
                <p className="font-bold text-xs text-[#0C3136] truncate">
                  {displayDate}
                </p>
              </div>
            </button>

            {selectedDate ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDate('');
                  setOpenDropdown(null);
                }}
                aria-label="Clear selected date"
                className="text-slate-400 hover:text-red-500 p-1 rounded-full transition-colors shrink-0"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'calendar' ? null : 'calendar')}
                className="focus:outline-none"
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    openDropdown === 'calendar' ? 'rotate-180 text-[#F8A41E]' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            )}
          </div>

          {/* Custom Date Popover */}
          {openDropdown === 'calendar' && (
            <div
              role="dialog"
              aria-label="Choose travel date"
              className="absolute top-full right-0 sm:right-auto sm:left-0 lg:right-0 lg:left-auto mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-slate-200 z-[200] p-5 text-[#0C3136] animate-in fade-in zoom-in-95 duration-200"
            >
              {/* Quick Presets */}
              <div className="flex items-center gap-1.5 pb-3 mb-3 border-b border-slate-100 overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => {
                    const tmrw = new Date();
                    tmrw.setDate(tmrw.getDate() + 1);
                    setSelectedDate(formatDateISO(tmrw));
                    setOpenDropdown(null);
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
                    setOpenDropdown(null);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#F8A41E]/20 text-[10px] font-black text-slate-700 whitespace-nowrap transition-colors"
                >
                  This Weekend
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDate('');
                    setOpenDropdown(null);
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
                  className="p-1.5 hover:bg-slate-100 rounded-full text-slate-600 transition-colors"
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
                  className="p-1.5 hover:bg-slate-100 rounded-full text-slate-600 transition-colors"
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
                        setOpenDropdown(null);
                      }}
                      className={`h-8 w-full rounded-xl text-xs font-bold transition-all flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#0C3136] text-[#F8A41E] font-black shadow-md'
                          : isToday
                          ? 'border border-[#F8A41E] text-[#0C3136] font-black hover:bg-amber-50'
                          : isPast
                          ? 'text-slate-300 cursor-not-allowed'
                          : 'text-[#0C3136] hover:bg-slate-100'
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

        {/* ========================================================================= */}
        {/* 4. FIND TOURS CTA                                                         */}
        {/* ========================================================================= */}
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
