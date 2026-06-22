"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
// REMOVED TOURS_DATA IMPORT
import { 
  ChevronLeft, Calendar, Minus, Plus, MapPin, 
  Users, Loader2, ShieldCheck, Clock, CheckCircle2 
} from 'lucide-react';

const LocationMarkerMap = dynamic(
  () => import('@/components/DynamicMap').then((mod) => mod.LocationMarkerMap),
  { ssr: false, loading: () => <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center font-bold text-slate-400">Loading Map...</div> }
);

// Accept 'tour' directly instead of 'tourId'
export default function CheckoutClient({ tour, initialDate }) {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [pickup, setPickup] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Fallback just in case
  if (!tour) return <div className="p-20 text-center font-black">Tour not found.</div>;

  const childPrice = Math.max((tour.price || 0) - 10, 0); // Safety check on price
  const subtotal = (adults * tour.price) + (children * childPrice);
  const taxes = subtotal * 0.13;
  const total = subtotal + taxes;

  const handleCompleteBooking = async () => {
    if (!fullName || !email || !pickup) {
      alert("Please fill in all required fields (Name, Email, and Pickup Location).");
      return;
    }

    setIsSubmitting(true);
    
    const newBooking = {
      id: `NVT-${Math.floor(1000 + Math.random() * 9000)}`,
      tourId: tour.id,
      tourName: tour.title,
      customerName: fullName,
      email: email,
      phone: phone,
      date: initialDate,
      adults: adults,
      children: children,
      total: total,
      pickup: pickup,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    try {
      if (!auth.currentUser) {
        await signInAnonymously(auth);
      }
      
      await setDoc(doc(db, 'bookings', newBooking.id), newBooking);

      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            fullName: fullName,
            bookingId: newBooking.id,
            tourName: tour.title,
            tourDate: initialDate,
            pickup: pickup,
            total: `CAD $${total.toFixed(2)}`
          }),
        });
      } catch (err) {
        console.warn("Email API not configured yet", err);
      }

      setConfirmedBooking(newBooking);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (firebaseError) {
      console.error("Error saving booking:", firebaseError);
      alert("There was an issue processing your booking. Please try again.");
      setIsSubmitting(false);
    }
  };

  // SUCCESS SCREEN
  if (confirmedBooking) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 animate-in fade-in zoom-in-95 duration-500 py-20 px-4">
        <div className="max-w-xl w-full bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100 text-center">
           <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <CheckCircle2 size={48} />
           </div>
           <h2 className="text-4xl font-black text-[#0C3136] mb-4 tracking-tighter">Booking Confirmed!</h2>
           <p className="text-slate-500 font-medium mb-8 leading-relaxed">
             Thank you for choosing Niagara Travels, <span className="text-[#0C3136] font-black">{confirmedBooking.customerName}</span>. 
             A confirmation email has been sent to <span className="text-[#125D66] font-bold">{confirmedBooking.email}</span> with your e-tickets and pickup details.
           </p>
           <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-left mb-10 space-y-3">
              <div className="flex justify-between text-xs font-black uppercase text-slate-400 tracking-widest">
                 <span>Booking ID</span>
                 <span className="text-[#0C3136]">{confirmedBooking.id}</span>
              </div>
              <div className="flex justify-between text-xs font-black uppercase text-slate-400 tracking-widest">
                 <span>Tour Date</span>
                 <span className="text-[#0C3136]">{confirmedBooking.date}</span>
              </div>
              <div className="flex justify-between text-xs font-black uppercase text-slate-400 tracking-widest">
                 <span>Pickup Point</span>
                 <span className="text-[#0C3136]">{confirmedBooking.pickup}</span>
              </div>
           </div>
           <div className="flex justify-center">
             <Link href="/" className="inline-block bg-[#0C3136] text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#125D66] transition-all shadow-lg">
               RETURN HOME
             </Link>
           </div>
        </div>
      </div>
    );
  }

  // CHECKOUT FORM SCREEN
  return (
    <div className="animate-in fade-in duration-700 bg-slate-50 pb-20 pt-8 lg:pt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
           
           {/* Section 1: Tickets */}
           <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <div className="flex flex-wrap items-center justify-between mb-10 gap-4">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#125D66]">
                       <Calendar className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-black text-[#0C3136]">Visit Date & Tickets</h3>
                 </div>
                 <Link href={`/tour/${tour.id}`} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#F8A41E] transition-all bg-slate-50 px-4 py-2 rounded-lg">
                    <ChevronLeft className="w-3 h-3" /> Back to Tour
                 </Link>
              </div>

              <div className="space-y-8">
                 <div className="flex items-center justify-between pb-8 border-b border-slate-100">
                    <div>
                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 block">Selected Date</label>
                       <p className="text-lg font-black text-[#0C3136]">{initialDate}</p>
                    </div>
                    <Link href={`/tour/${tour.id}`} className="text-[10px] font-black uppercase tracking-widest text-[#F8A41E] hover:underline">Change Date</Link>
                 </div>

                 <div className="flex items-center justify-between py-2">
                    <div>
                       <h4 className="font-black text-[#0C3136] text-base leading-tight">Adults (Mens/Womens)</h4>
                       <p className="text-xs text-slate-400 font-bold mt-1">CAD ${tour.price}.00 per ticket</p>
                    </div>
                    <div className="flex items-center gap-6 p-2 bg-slate-50 rounded-2xl border border-slate-100">
                       <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-[#0C3136] transition-all"><Minus size={18}/></button>
                       <span className="font-black text-lg text-[#0C3136] w-6 text-center">{adults}</span>
                       <button onClick={() => setAdults(adults + 1)} className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-[#0C3136] transition-all"><Plus size={18}/></button>
                    </div>
                 </div>

                 <div className="flex items-center justify-between py-2">
                    <div>
                       <h4 className="font-black text-[#0C3136] text-base leading-tight">Children</h4>
                       <p className="text-xs text-slate-400 font-bold mt-1">Ages 2-12 • CAD ${childPrice}.00 per ticket</p>
                    </div>
                    <div className="flex items-center gap-6 p-2 bg-slate-50 rounded-2xl border border-slate-100">
                       <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-[#0C3136] transition-all"><Minus size={18}/></button>
                       <span className="font-black text-lg text-[#0C3136] w-6 text-center">{children}</span>
                       <button onClick={() => setChildren(children + 1)} className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-[#0C3136] transition-all"><Plus size={18}/></button>
                    </div>
                 </div>
              </div>
           </div>

           {/* Section 2: Interactive Pickup Map */}
           <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#125D66]">
                    <MapPin className="w-5 h-5" />
                 </div>
                 <h3 className="text-2xl font-black text-[#0C3136]">Pickup Location</h3>
              </div>
              
              <div className="space-y-4">
                 <p className="text-sm font-bold text-slate-500 mb-2">Tap anywhere on the map to drop a pin for your custom pickup location, or type your address below:</p>
                 
                 <div className="h-[250px] w-full rounded-2xl overflow-hidden border-2 border-slate-100 relative z-0 cursor-crosshair shadow-inner">
                    <LocationMarkerMap onLocationSelect={setPickup} />
                 </div>

                 <div className="space-y-2 pt-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Address or Coordinates</label>
                    <input 
                       type="text"
                       placeholder="Enter hotel name, address, or drop a pin..." 
                       value={pickup} 
                       onChange={(e) => setPickup(e.target.value)}
                       className="w-full p-5 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-[#0C3136] text-sm outline-none focus:border-[#F8A41E] transition-all"
                    />
                 </div>
              </div>
           </div>

           {/* Section 3: Contact */}
           <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4 mb-10">
                 <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#125D66]">
                    <Users className="w-5 h-5" />
                 </div>
                 <h3 className="text-2xl font-black text-[#0C3136]">Contact Details</h3>
              </div>
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Full Name</label>
                    <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" placeholder="John Doe" className="w-full p-5 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E] transition-all" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Email Address</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="john@example.com" className="w-full p-5 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E] transition-all" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Phone Number (Optional)</label>
                    <div className="flex gap-2">
                       <div className="w-20 p-5 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-center text-sm text-slate-400">+1</div>
                       <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="(555) 000-0000" className="flex-1 p-5 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E] transition-all" />
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* RIGHT COLUMN: STICKY RECEIPT */}
        <div className="lg:col-span-4">
           <div className="sticky top-28 space-y-6">
              <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
                 <div className="p-8 lg:p-10">
                    <h3 className="text-xl font-black text-[#0C3136] mb-8">Order Summary</h3>
                    
                    <div className="space-y-6 pb-8 border-b border-slate-100 text-sm font-bold text-slate-600">
                       <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-slate-300" />
                          <span>{initialDate}</span>
                       </div>
                    </div>

                    <div className="py-8 space-y-4">
                       <div className="flex justify-between text-xs font-bold text-slate-500">
                          <span>{adults} Adult Tickets</span>
                          <span className="text-slate-700">CAD ${(adults * tour.price).toFixed(2)}</span>
                       </div>
                       {children > 0 && (
                        <div className="flex justify-between text-xs font-bold text-slate-500">
                           <span>{children} Child Tickets</span>
                           <span className="text-slate-700">CAD ${(children * childPrice).toFixed(2)}</span>
                        </div>
                       )}
                       <div className="flex justify-between text-xs font-bold text-slate-500">
                          <span>Taxes (13%)</span>
                          <span className="text-slate-700">CAD ${taxes.toFixed(2)}</span>
                       </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100 flex justify-between items-baseline mb-8">
                       <span className="text-base font-black text-[#0C3136]">Total Due</span>
                       <span className="text-3xl font-black text-[#0C3136]">CAD ${total.toFixed(2)}</span>
                    </div>

                    <button 
                      disabled={isSubmitting}
                      onClick={handleCompleteBooking}
                      className="w-full bg-[#D91E1E] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:bg-[#b01818] transition-all mb-4 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                       {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> PROCESSING...</> : 'COMPLETE BOOKING'}
                    </button>
                    
                    <div className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       <ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure Checkout
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}