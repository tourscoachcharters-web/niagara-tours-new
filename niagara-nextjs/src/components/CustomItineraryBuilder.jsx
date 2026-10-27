"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Wind, Map as MapIcon, Plane, Navigation, Grape, Utensils, Camera, Zap, 
  Calendar, ChevronRight, CheckCircle2, Loader2, Phone, Mail, Sparkles
} from 'lucide-react';
import CalendarDropdown from "@/components/CalendarDropdown";
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function CustomItineraryBuilder() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);
  const [interests, setInterests] = useState(['boat', 'behind']);
  const [groupSize, setGroupSize] = useState('2 Adults');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedProposal, setSubmittedProposal] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      alert("Please provide your name and email.");
      return;
    }

    setIsSubmitting(true);
    const refId = `CUST-${Math.floor(10000 + Math.random() * 90000)}`;

    const selectedAttractionsList = attractions
      .filter((a) => interests.includes(a.id))
      .map((a) => a.t);

    const proposalData = {
      refId,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim() || 'N/A',
      selectedDate: selectedDate || 'Flexible / Not Decided',
      groupSize,
      interests: selectedAttractionsList,
      notes: notes.trim() || 'No additional notes provided',
      createdAt: new Date().toISOString(),
      type: 'custom_itinerary',
      status: 'New'
    };

    try {
      // 1. Save proposal to Firestore inquiries
      await addDoc(collection(db, 'inquiries'), proposalData);
    } catch (err) {
      console.warn("Firestore custom itinerary save notice:", err.message);
    }

    try {
      // 2. Dispatch instant email notification to tourscoachcharters@gmail.com & info@niagaratravels.ca
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'custom_itinerary',
          ...proposalData,
        }),
      });
    } catch (emailErr) {
      console.warn("Custom proposal email dispatch notice:", emailErr.message);
    }

    setIsSubmitting(false);
    setSubmittedProposal(proposalData);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmittedProposal(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setSelectedDate(null);
  };

  if (submitted && submittedProposal) {
    return (
      <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 lg:p-16 border border-slate-100 shadow-xl text-center animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        
        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1.5 rounded-full mb-3 inline-block">
          Proposal Request Dispatched
        </span>
        
        <h3 className="text-3xl sm:text-4xl font-black text-[#0C3136] mb-3">
          Custom Proposal Requested!
        </h3>
        
        <p className="text-slate-600 font-medium max-w-lg mx-auto mb-6 leading-relaxed text-sm sm:text-base">
          Thank you, <span className="font-bold text-[#0C3136]">{submittedProposal.fullName}</span>. 
          Our private charter specialists have received your request and will email your bespoke itinerary proposal to <span className="font-bold text-[#125D66]">{submittedProposal.email}</span> within 2 hours.
        </p>

        {/* Proposal Summary Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 max-w-lg mx-auto mb-8 text-left space-y-3 text-xs sm:text-sm">
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">Reference ID</span>
            <span className="font-black text-[#0C3136] bg-white px-2.5 py-1 rounded-md border border-slate-200">
              {submittedProposal.refId}
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">Desired Date</span>
            <span className="font-bold text-[#0C3136]">{submittedProposal.selectedDate}</span>
          </div>
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">Group Tier</span>
            <span className="font-bold text-[#0C3136]">{submittedProposal.groupSize}</span>
          </div>
          <div>
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px] block mb-1.5">
              Selected Experiences
            </span>
            <div className="flex flex-wrap gap-1.5">
              {submittedProposal.interests.map((item, idx) => (
                <span key={idx} className="bg-white border border-slate-200 text-[#0C3136] font-bold text-xs px-2.5 py-1 rounded-lg">
                  ✨ {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="bg-[#0C3136] text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#125D66] transition-all shadow-md"
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
              Number of Guests / Vehicle Size
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              <label htmlFor="custom-phone" className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 block">
                Phone / Mobile
              </label>
              <input
                id="custom-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (416) 555-0199"
                className="w-full p-4 border-2 border-slate-100 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E]"
              />
            </div>
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
        disabled={isSubmitting}
        className="w-full bg-[#D91E1E] text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.4em] shadow-xl shadow-red-900/20 hover:bg-[#b01818] transition-all transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D91E1E] flex items-center justify-center gap-3 disabled:opacity-75 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>DISPATCHING CUSTOM REQUEST...</span>
          </>
        ) : (
          <span>GENERATE CUSTOM ITINERARY PROPOSAL</span>
        )}
      </button>
    </form>
  );
}
