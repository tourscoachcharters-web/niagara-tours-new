"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Wind, Map as MapIcon, Plane, Navigation, Grape, Utensils, Camera, Zap, 
  Calendar, ChevronRight, CheckCircle2, Phone, Settings 
} from 'lucide-react';
import CalendarDropdown from "@/components/CalendarDropdown";

export default function CustomItineraryPage() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);
  const [interests, setInterests] = useState([]);

  const attractions = [
    { id: 'boat', t: 'Boat Cruise', i: Wind, p: 'High' },
    { id: 'behind', t: 'Behind the Falls', i: MapIcon, p: 'Must-See' },
    { id: 'heli', t: 'Helicopter View', i: Plane, p: 'Premium' },
    { id: 'skylon', t: 'Skylon Tower', i: Navigation, p: 'Panoramic' },
    { id: 'wine', t: 'Winery Tours', i: Grape, p: 'Social' },
    { id: 'dine', t: 'Gourmet Dining', i: Utensils, p: 'Luxury' },
    { id: 'parkway', t: 'Scenic Parkway', i: Camera, p: 'Relaxing' },
    { id: 'clifton', t: 'Clifton Hill', i: Zap, p: 'Family' }
  ];

  const toggleInterest = (id) => {
    setInterests(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => { if (calendarRef.current && !calendarRef.current.contains(event.target)) setShowCalendar(false); };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="animate-in fade-in duration-700 bg-white">
      <section className="relative h-[400px] flex items-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/hero-custom.jpg" alt="Custom Itinerary Background" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-[#0C3136]/60"></div>
        </div>
        <div className="container mx-auto px-4 z-10">
          <p className="text-[#F8A41E] font-black text-[10px] uppercase tracking-[0.4em] mb-4">Build Your Experience</p>
          <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tighter">Custom <span className="text-[#F8A41E]">Itinerary</span></h1>
          <p className="text-slate-300 text-lg max-w-xl font-medium mt-6">Tell us what you love, and our experts will craft a unique Niagara Falls package just for you.</p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8">
           <div className="space-y-12">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-[#0C3136] text-[#F8A41E] flex items-center justify-center font-black">1</div>
                  <h2 className="text-2xl font-black text-[#0C3136]">What interests you?</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {attractions.map(attr => (
                    <div 
                      key={attr.id}
                      onClick={() => toggleInterest(attr.id)}
                      className={`cursor-pointer p-6 rounded-3xl border-2 transition-all group flex flex-col items-center text-center ${interests.includes(attr.id) ? 'bg-[#0C3136] border-[#0C3136] text-white' : 'bg-white border-slate-100 hover:border-[#F8A41E]'}`}
                    >
                      <attr.i className={`w-8 h-8 mb-4 transition-colors ${interests.includes(attr.id) ? 'text-[#F8A41E]' : 'text-[#125D66]'}`} />
                      <h4 className="font-black text-[11px] uppercase tracking-wider mb-1">{attr.t}</h4>
                      <p className={`text-[9px] font-bold ${interests.includes(attr.id) ? 'text-white/60' : 'text-slate-400'}`}>{attr.p}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-slate-100">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-full bg-[#0C3136] text-[#F8A41E] flex items-center justify-center font-black">2</div>
                    <h2 className="text-2xl font-black text-[#0C3136]">The Logistics</h2>
                  </div>
                  <div className="space-y-6">
                    <div ref={calendarRef} className="relative">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Travel Date</label>
                      <button onClick={() => setShowCalendar(!showCalendar)} className="w-full flex items-center justify-between border-2 border-slate-100 p-4 rounded-2xl bg-white font-bold text-slate-600 text-sm">
                        <div className="flex items-center gap-3"><Calendar className="w-5 h-5 text-[#F8A41E]" /> {selectedDate || "Select Date"}</div>
                        <ChevronRight className="w-4 h-4 rotate-90" />
                      </button>
                      {showCalendar && <CalendarDropdown onSelectDate={(d) => { setSelectedDate(d.toLocaleDateString()); setShowCalendar(false); }} />}
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Number of Guests</label>
                      <select className="w-full border-2 border-slate-100 p-4 rounded-2xl bg-white font-black text-[#0C3136] text-sm appearance-none outline-none focus:border-[#F8A41E]">
                        <option>2 Adults</option>
                        <option>1 Adult</option>
                        <option>Small Group (4-6)</option>
                        <option>Large Group (10+)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-full bg-[#0C3136] text-[#F8A41E] flex items-center justify-center font-black">3</div>
                    <h2 className="text-2xl font-black text-[#0C3136]">Your Contact</h2>
                  </div>
                  <div className="space-y-4">
                    <input type="text" placeholder="Full Name" className="w-full p-4 border-2 border-slate-100 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E]" />
                    <input type="email" placeholder="Email Address" className="w-full p-4 border-2 border-slate-100 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E]" />
                    <textarea placeholder="Tell us more about your special requirements..." className="w-full p-4 border-2 border-slate-100 rounded-2xl font-bold text-sm outline-none h-32 focus:border-[#F8A41E]" />
                  </div>
                </div>
              </div>

              <button className="w-full bg-[#D91E1E] text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.4em] shadow-xl shadow-red-900/20 hover:bg-[#b01818] transition-all transform hover:-translate-y-1">
                GENERATE CUSTOM PROPOSAL
              </button>
           </div>
        </div>

        <div className="lg:col-span-4">
           <div className="sticky top-28 space-y-10">
              <div className="bg-[#0C3136] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <h3 className="text-xl font-black mb-6">Why Customize?</h3>
                <ul className="space-y-6">
                  {[
                    { t: 'Private Pace', d: 'No rushing. Spend as much time as you want at each spot.' },
                    { t: 'Hidden Gems', d: 'Visit local spots typical tours miss.' },
                    { t: 'VIP Access', d: 'Skip the lines with our premium bookings.' },
                    { t: 'Door-to-Door', d: 'Private pickup from any location in Ontario.' }
                  ].map((benefit, i) => (
                    <li key={i} className="flex gap-4">
                      <CheckCircle2 className="w-5 h-5 text-[#F8A41E] shrink-0" />
                      <div>
                        <h4 className="font-black text-xs uppercase tracking-widest">{benefit.t}</h4>
                        <p className="text-[11px] text-slate-400 mt-1">{benefit.d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl">
                 <h4 className="font-black text-[#0C3136] text-sm uppercase tracking-widest mb-6">Need Immediate Help?</h4>
                 <div className="space-y-4">
                   <div className="flex items-center gap-3 text-lg font-black text-[#0C3136] hover:text-[#D91E1E] transition-colors cursor-pointer"><Phone className="w-5 h-5 text-[#F8A41E]" /> (416) 444-3000</div>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed">Call us and speak directly with a local planning expert today.</p>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}