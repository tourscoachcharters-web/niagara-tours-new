"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import CalendarDropdown from "@/components/CalendarDropdown";
import { 
  ChevronLeft, Clock, Sun, MapPin, ShieldCheck, Compass, CheckCircle2, 
  CheckCircle, XCircle, Ban, Navigation, Ticket, Users, Baby, Calendar, Star, Zap 
} from 'lucide-react';

const StaticPointsMap = dynamic(
  () => import('@/components/DynamicMap').then((mod) => mod.StaticPointsMap),
  { ssr: false, loading: () => <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center font-bold text-slate-400">Loading Map...</div> }
);

export default function TourClient({ tourId }) {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch tour data directly from Firebase using the tourId
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const tourRef = doc(db, 'tours', tourId); // Ensure your Firestore docs use tourId as the document ID, or use a query
        const docSnap = await getDoc(tourRef);
        
        if (docSnap.exists()) {
          setTour(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching tour:", error);
      }
      setLoading(false);
    };
    fetchTour();
  }, [tourId]);

  // --- Keep your existing UI state logic here ---
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);
  
  if (loading) return <div className="min-h-screen flex items-center justify-center font-black text-2xl">Loading Tour...</div>;
  if (!tour) return <div className="p-20 text-center font-black text-2xl">Tour not found.</div>;

  const [bookingCount] = useState(Math.floor(Math.random() * (24 - 7 + 1)) + 7);
  
  const tourReviews = REVIEWS_DATA.filter(r => r.tour === tour?.title);
  
  // ... Keep the rest of your file exactly the same!
  
  useEffect(() => {
    const handleClickOutside = (event) => { if (calendarRef.current && !calendarRef.current.contains(event.target)) setShowCalendar(false); };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToBooking = (e) => {
    e.preventDefault();
    document.getElementById('booking-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="animate-in fade-in duration-700 bg-[#F8FAFC]">
      {/* 1. HERO SECTION */}
      <section className="relative h-[550px] flex items-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src={tour.img} alt={tour.title} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C3136]/95 via-[#0C3136]/60 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 z-10">
           <div className="max-w-3xl">
             <Link href="/tours" className="flex w-max items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest mb-6 cursor-pointer hover:text-white transition-colors"><ChevronLeft className="w-3 h-3" /> Back to Tours</Link>
             <span className="bg-[#F8A41E] text-[#0C3136] text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-[0.2em] mb-4 inline-block shadow-lg">{tour.tag}</span>
             <h1 className="text-4xl lg:text-7xl font-black leading-tight tracking-tighter mb-4">{tour.title}</h1>
             <p className="text-xl text-slate-200 font-medium mb-8 leading-relaxed max-w-2xl border-l-4 border-[#F8A41E] pl-4">{tour.tagline}</p>
             <div className="flex flex-wrap items-center gap-6">
               <div className="flex flex-col">
                 <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">From</span>
                 <span className="text-3xl font-black text-white">CAD ${tour.price}</span>
               </div>
               <button onClick={scrollToBooking} className="bg-[#D91E1E] hover:bg-[#b01818] text-white px-8 py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-red-900/20">Book Your Tour Today</button>
             </div>
           </div>
        </div>
      </section>

      {/* 2. QUICK FACTS BAR */}
      <div className="bg-white border-b border-slate-200 shadow-sm relative z-20">
        <div className="container mx-auto px-4">
           <div className="flex flex-wrap justify-between items-center py-6 gap-6">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#125D66]"><Clock className="w-5 h-5" /></div>
                 <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</p><p className="font-bold text-[#0C3136] text-sm">{tour.duration}</p></div>
              </div>
              <div className="hidden md:block w-px h-10 bg-slate-100"></div>
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#125D66]"><Sun className="w-5 h-5" /></div>
                 <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Season</p><p className="font-bold text-[#0C3136] text-sm">Year-Round</p></div>
              </div>
              <div className="hidden lg:block w-px h-10 bg-slate-100"></div>
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#125D66]"><MapPin className="w-5 h-5" /></div>
                 <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pickup</p><p className="font-bold text-[#0C3136] text-sm">Included</p></div>
              </div>
              <div className="hidden xl:block w-px h-10 bg-slate-100"></div>
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#125D66]"><ShieldCheck className="w-5 h-5" /></div>
                 <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Passport</p><p className="font-bold text-[#0C3136] text-sm">Domestic (Not Req.)</p></div>
              </div>
           </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16 grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-16">
        
        {/* LEFT COLUMN: MAIN CONTENT */}
        <div className="xl:col-span-8 space-y-16">
           <section>
              <h2 className="text-3xl font-black text-[#0C3136] mb-6 flex items-center gap-3"><Compass className="text-[#F8A41E]" /> Tour Overview</h2>
              <p className="text-slate-600 text-lg leading-relaxed font-medium bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">{tour.overview}</p>
           </section>

           <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-emerald-50/50 p-8 rounded-[2rem] border border-emerald-100 h-full">
                 <h3 className="text-xl font-black text-[#0C3136] mb-6 flex items-center gap-3"><CheckCircle2 className="text-emerald-500" /> What's Included</h3>
                 <ul className="space-y-4">
                    {tour.inclusions.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-700 font-bold items-start"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" /> {item}</li>
                    ))}
                 </ul>
              </div>
              <div className="bg-red-50/50 p-8 rounded-[2rem] border border-red-100 h-full">
                 <h3 className="text-xl font-black text-[#0C3136] mb-6 flex items-center gap-3"><XCircle className="text-red-500" /> Exclusions</h3>
                 <ul className="space-y-4">
                    {(tour.exclusions || []).map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-700 font-bold items-start"><Ban className="w-5 h-5 text-red-400 shrink-0" /> {item}</li>
                    ))}
                 </ul>
              </div>
           </section>

           <section>
              <h3 className="text-3xl font-black text-[#0C3136] mb-8">Tour Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {tour.highlights.map((h, i) => (
                   <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center hover:border-[#F8A41E] transition-all">
                     <div className="bg-[#0C3136]/5 text-[#125D66] p-4 rounded-2xl mb-5"><h.i className="w-6 h-6" /></div>
                     <h4 className="font-black text-sm text-[#0C3136] mb-2">{h.t}</h4>
                     <p className="text-xs text-slate-500 font-medium leading-relaxed">{h.d}</p>
                   </div>
                 ))}
              </div>
           </section>

           <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-3xl font-black text-[#0C3136] mb-10 flex items-center gap-3"><Navigation className="text-[#F8A41E]" /> Step-by-Step Itinerary</h3>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-slate-100">
                {(tour.itinerary || []).map((item, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#F8A41E] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                       <span className="font-black text-xs">{i+1}</span>
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-50 p-6 rounded-2xl border border-slate-100 text-sm font-bold text-slate-700">
                       {item}
                    </div>
                  </div>
                ))}
              </div>
           </section>

           <section>
              <h3 className="text-3xl font-black text-[#0C3136] mb-8 flex items-center gap-3"><MapPin className="text-[#F8A41E]" /> Pickup & Meeting Points</h3>
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                 <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-8 space-y-4">
                       <p className="text-sm text-slate-500 font-bold mb-6">We offer complimentary pickup from the following central locations. Please arrive 10 minutes early.</p>
                       {PICKUP_POINTS.slice(0, 4).map((point, i) => (
                         <div key={i} className="flex flex-col justify-between p-4 bg-slate-50 rounded-2xl">
                            <h4 className="font-black text-[#0C3136] text-sm">{point.name}</h4>
                            <div className="flex justify-between items-center mt-2">
                               <span className="text-xs text-slate-500 font-medium">{point.sub}</span>
                               <span className="bg-[#0C3136] text-[#F8A41E] px-3 py-1 rounded-md text-[10px] font-black">{point.time}</span>
                            </div>
                         </div>
                       ))}
                    </div>
                    <div className="bg-slate-200 min-h-[300px] h-full relative z-0">
                       <StaticPointsMap points={PICKUP_POINTS} />
                    </div>
                 </div>
              </div>
           </section>

           <section>
              <h3 className="text-3xl font-black text-[#0C3136] mb-8 flex items-center gap-3"><Ticket className="text-[#F8A41E]" /> Pricing Details</h3>
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                          <th className="p-6">Passenger Type</th>
                          <th className="p-6">Age Group</th>
                          <th className="p-6 text-right">Price (CAD)</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-sm font-bold text-[#0C3136]">
                       <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-6 flex items-center gap-3"><Users className="w-5 h-5 text-slate-400" /> Adult</td>
                          <td className="p-6 text-slate-500">13+ Years</td>
                          <td className="p-6 text-right text-lg">${tour.price}.00</td>
                       </tr>
                       <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-6 flex items-center gap-3"><Users className="w-5 h-5 text-slate-400 scale-75" /> Child</td>
                          <td className="p-6 text-slate-500">2 - 12 Years</td>
                          <td className="p-6 text-right text-lg">${tour.price - 10}.00</td>
                       </tr>
                       <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-6 flex items-center gap-3"><Baby className="w-5 h-5 text-slate-400" /> Infant (Lap Child)</td>
                          <td className="p-6 text-slate-500">Under 2 Years</td>
                          <td className="p-6 text-right text-emerald-600 font-black uppercase tracking-widest text-[10px]">Free</td>
                       </tr>
                    </tbody>
                 </table>
              </div>
           </section>

        </div>

        {/* RIGHT COLUMN: BOOKING STICKY SIDEBAR (FINAL CTA) */}
        <div className="xl:col-span-4" id="booking-card">
           <div className="sticky top-28 space-y-10">
              <div className="bg-white rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-slate-100 group">
                 <div className="bg-gradient-to-br from-[#0C3136] to-[#125D66] px-8 py-8 text-white relative rounded-t-[2rem] overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8 blur-xl"></div>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 leading-tight relative z-10">Book Your Experience</h3>
                    <div className="space-y-0.5 relative z-10">
                       <p className="text-[9px] font-black uppercase text-slate-300 tracking-[0.2em]">Starting From</p>
                       <h4 className="text-[36px] font-black text-[#F8A41E] tracking-tighter leading-none flex items-baseline gap-2">
                          CAD ${tour.price} <span className="text-[10px] font-black text-white/90 tracking-normal italic leading-none">/ person</span>
                       </h4>
                    </div>
                 </div>
                 
                 <div className="p-8 space-y-6 bg-white relative rounded-b-[2rem]">
                    <div ref={calendarRef} className="relative">
                       <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5 block">1. Select Tour Date</label>
                       <button type="button" onClick={() => setShowCalendar(!showCalendar)} className="w-full flex items-center justify-between border border-slate-200 p-3.5 rounded-xl bg-white hover:border-[#F8A41E] cursor-pointer transition-all shadow-sm relative z-10">
                          <div className="flex items-center gap-3 font-bold text-slate-600 text-sm"><Calendar className="w-4 h-4 text-[#F8A41E]" /> {selectedDate || "Choose Date"}</div>
                          <ChevronLeft className={`w-4 h-4 -rotate-90 text-slate-300 transition-transform ${showCalendar ? 'rotate-[90deg]' : ''}`} />
                       </button>
                       {showCalendar && <CalendarDropdown onSelectDate={(d) => { setSelectedDate(d.toLocaleDateString()); setShowCalendar(false); }} />}
                    </div>

                    <Link href={`/checkout/${tour.id}?date=${selectedDate ? encodeURIComponent(selectedDate) : encodeURIComponent(new Date().toLocaleDateString())}`} className="block w-full text-center bg-[#D91E1E] hover:bg-[#b01818] text-white py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.3em] shadow-lg shadow-red-900/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
                      CHECK AVAILABILITY
                    </Link>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}