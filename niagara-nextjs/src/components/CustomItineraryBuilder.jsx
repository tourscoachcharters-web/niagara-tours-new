"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Wind, Map as MapIcon, Plane, Navigation, Grape, Utensils, Camera, Zap, 
  Calendar, ChevronRight, CheckCircle2 
} from 'lucide-react';
import CalendarDropdown from "@/components/CalendarDropdown";

export default function CustomItineraryBuilder() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);
  const [interests, setInterests] = useState(['boat', 'behind']);
  const [groupSize, setGroupSize] = useState('2 Adults');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const attractions = [
    { id: 'boat', t: 'Boat Cruise (Mist Access)', i: Wind, p: 'Must-See' },
    { id: 'behind', t: 'Journey Behind the Falls', i: MapIcon, p: 'Iconic' },
    { id: 'heli', t: 'Helicopter Flight', i: Plane, p: 'VIP Aerial' },
    { id: 'skylon', t: 'Skylon Tower Observation', i: Navigation, p: 'Panoramic' },
    { id: 'wine', t: 'Niagara-on-the-Lake Winery', i: Grape, p: 'Tastings' },
    { id: 'dine', t: 'Fallsview Gourmet Dining', i: Utensils, p: 'Luxury' },
    { id: 'parkway', t: 'Scenic Niagara Parkway', i: Camera, p: 'Relaxing' },
    { id: 'clifton', t: 'Clifton Hill Attractions', i: Zap, p: 'Family Fun' },
  ];

  const toggleInterest = (id) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-[2.5rem] p-10 lg:p-14 border border-slate-100 shadow-xl text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-3xl font-black text-[#0C3136] mb-3">Custom Proposal Requested!</h3>
        <p className="text-slate-600 font-medium max-w-lg mx-auto mb-6 leading-relaxed">
          Thank you, <span className="font-bold text-[#0C3136]">{fullName || 'traveler'}</span>. Our private charter specialist will craft your bespoke itinerary and email the proposal to <span className="font-bold text-[#125D66]">{email}</span> within 2 hours.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="bg-[#0C3136] text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#125D66] transition-colors"
        >
          Create Another Custom Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      {/* Step 1: Attractions */}
      <section aria-labelledby="step-1-heading">
        <div className="flex items-center gap-4 mb-8">
          <span className="w-10 h-10 rounded-full bg-[#0C3136] text-[#F8A41E] flex items-center justify-center font-black shrink-0" aria-hidden="true">
            1
          </span>
          <h2 id="step-1-heading" className="text-2xl font-black text-[#0C3136]">
            Select Your Preferred Experiences &amp; Sights
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" role="group" aria-label="Attractions selection">
          {attractions.map((attr) => {
            const isSelected = interests.includes(attr.id);
            return (
              <button
                type="button"
                key={attr.id}
                onClick={() => toggleInterest(attr.id)}
                aria-pressed={isSelected}
                className={`p-5 rounded-3xl border-2 transition-all flex flex-col items-center text-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8A41E] ${
                  isSelected
                    ? 'bg-[#0C3136] border-[#0C3136] text-white shadow-lg'
                    : 'bg-white border-slate-100 hover:border-[#F8A41E] text-slate-800'
                }`}
              >
                <attr.i
                  className={`w-7 h-7 mb-3 transition-colors ${
                    isSelected ? 'text-[#F8A41E]' : 'text-[#125D66]'
                  }`}
                  aria-hidden="true"
                />
                <span className="font-black text-[11px] uppercase tracking-wider mb-1 leading-tight">
                  {attr.t}
                </span>
                <span className={`text-[9px] font-bold ${isSelected ? 'text-white/70' : 'text-slate-400'}`}>
                  {attr.p}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Step 2 & 3: Logistics & Contact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 border-t border-slate-100">
        {/* Logistics */}
        <section aria-labelledby="step-2-heading" className="space-y-6">
          <div className="flex items-center gap-4 mb-4">
            <span className="w-10 h-10 rounded-full bg-[#0C3136] text-[#F8A41E] flex items-center justify-center font-black shrink-0" aria-hidden="true">
              2
            </span>
            <h2 id="step-2-heading" className="text-2xl font-black text-[#0C3136]">
              Travel Logistics
            </h2>
          </div>

          <div ref={calendarRef} className="relative">
            <label htmlFor="custom-date-btn" className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
              Desired Travel Date
            </label>
            <button
              id="custom-date-btn"
              type="button"
              aria-expanded={showCalendar}
              aria-label={`Select travel date, currently ${selectedDate || "Select Date"}`}
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full flex items-center justify-between border-2 border-slate-100 p-4 rounded-2xl bg-white font-bold text-slate-600 text-sm hover:border-[#F8A41E] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8A41E]"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#F8A41E]" aria-hidden="true" />
                <span>{selectedDate || "Select Date"}</span>
              </div>
              <ChevronRight className="w-4 h-4 rotate-90" aria-hidden="true" />
            </button>
            {showCalendar && (
              <CalendarDropdown
                onSelectDate={(d) => {
                  setSelectedDate(d.toLocaleDateString());
                  setShowCalendar(false);
                }}
              />
            )}
          </div>

          <div>
            <label htmlFor="custom-group-size" className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
              Number of Guests
            </label>
            <select
              id="custom-group-size"
              value={groupSize}
              onChange={(e) => setGroupSize(e.target.value)}
              className="w-full border-2 border-slate-100 p-4 rounded-2xl bg-white font-black text-[#0C3136] text-sm appearance-none outline-none focus:border-[#F8A41E]"
            >
              <option value="1 Adult">1 Adult (Solo Traveler)</option>
              <option value="2 Adults">2 Adults (Couple / Pair)</option>
              <option value="Small Group (3-5)">Small Group (3-5 Guests)</option>
              <option value="Medium Group (6-14)">Medium Group / Minibus (6-14 Guests)</option>
              <option value="Large Group (15-56)">Large Charter Coach (15-56 Guests)</option>
            </select>
          </div>
        </section>

        {/* Contact info */}
        <section aria-labelledby="step-3-heading" className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="w-10 h-10 rounded-full bg-[#0C3136] text-[#F8A41E] flex items-center justify-center font-black shrink-0" aria-hidden="true">
              3
            </span>
            <h2 id="step-3-heading" className="text-2xl font-black text-[#0C3136]">
              Your Contact Details
            </h2>
          </div>

          <div>
            <label htmlFor="custom-full-name" className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="custom-full-name"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Robert Smith"
              className="w-full p-4 border-2 border-slate-100 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E]"
            />
          </div>

          <div>
            <label htmlFor="custom-email" className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="custom-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="robert@example.com"
              className="w-full p-4 border-2 border-slate-100 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E]"
            />
          </div>

          <div>
            <label htmlFor="custom-notes" className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">
              Special Requests or Pickup Address
            </label>
            <textarea
              id="custom-notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Specify preferred pickup hotel, timing, dietary needs, or winery preferences..."
              className="w-full p-4 border-2 border-slate-100 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E] resize-none"
            />
          </div>
        </section>
      </div>

      <button
        type="submit"
        className="w-full bg-[#D91E1E] text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.4em] shadow-xl shadow-red-900/20 hover:bg-[#b01818] transition-all transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D91E1E]"
      >
        GENERATE CUSTOM ITINERARY PROPOSAL
      </button>
    </form>
  );
}
