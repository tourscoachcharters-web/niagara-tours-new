"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { 
  ChevronLeft, Calendar, Minus, Plus, MapPin, 
  Users, Loader2, ShieldCheck, CheckCircle2 
} from 'lucide-react';

const LocationMarkerMap = dynamic(
  () => import('@/components/DynamicMap').then((mod) => mod.LocationMarkerMap),
  { ssr: false, loading: () => <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center font-bold text-slate-400">Loading Map...</div> }
);

export default function CheckoutClient({ tour, initialDate }) {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [pickup, setPickup] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  if (!tour) return <div className="p-20 text-center font-black">Tour not found.</div>;

  const childPrice = Math.max((tour.price || 0) - 10, 0);
  const subtotal = (adults * tour.price) + (children * childPrice);
  const taxes = subtotal * 0.13;
  const total = subtotal + taxes;

  const handleCompleteBooking = async (e) => {
    e.preventDefault();

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
        console.warn("Email API dispatch error:", err);
      }

      setConfirmedBooking(newBooking);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (firebaseError) {
      console.error("Error saving booking:", firebaseError);
      alert("There was an issue processing your booking. Please try again or call (416) 444-3000.");
      setIsSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION SCREEN
  if (confirmedBooking) {
    return (
      <section aria-labelledby="booking-confirmed-heading" className="min-h-[80vh] flex items-center justify-center bg-slate-50 animate-in fade-in zoom-in-95 duration-500 py-20 px-4">
        <div className="max-w-xl w-full bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100 text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
            <CheckCircle2 size={42} />
          </div>
          <h1 id="booking-confirmed-heading" className="text-3xl sm:text-4xl font-black text-[#0C3136] mb-4 tracking-tighter">
            Booking Confirmed!
          </h1>
          <p className="text-slate-500 font-medium mb-8 leading-relaxed">
            Thank you for choosing Niagara Travels, <span className="text-[#0C3136] font-black">{confirmedBooking.customerName}</span>. 
            A confirmation receipt has been emailed to <span className="text-[#125D66] font-bold">{confirmedBooking.email}</span> with your e-tickets and pickup instructions.
          </p>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-left mb-8 space-y-3">
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
              <span className="text-[#0C3136] truncate max-w-[200px]">{confirmedBooking.pickup}</span>
            </div>
            <div className="flex justify-between text-xs font-black uppercase text-slate-400 tracking-widest pt-2 border-t border-slate-200">
              <span>Total Paid</span>
              <span className="text-[#0C3136] font-black">CAD ${confirmedBooking.total.toFixed(2)}</span>
            </div>
          </div>
          <Link
            href="/"
            className="inline-block bg-[#0C3136] text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#125D66] transition-all shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C3136]"
          >
            RETURN HOME
          </Link>
        </div>
      </section>
    );
  }

  // MAIN CHECKOUT FORM
  return (
    <div className="animate-in fade-in duration-700 bg-slate-50 pb-20 pt-8 lg:pt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <form onSubmit={handleCompleteBooking} className="lg:col-span-8 space-y-8">
          
          {/* Section 1: Tickets */}
          <section aria-labelledby="tickets-heading" className="bg-white p-8 lg:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#125D66]" aria-hidden="true">
                  <Calendar className="w-5 h-5" />
                </div>
                <h2 id="tickets-heading" className="text-2xl font-black text-[#0C3136]">
                  Visit Date &amp; Tickets
                </h2>
              </div>
              <Link
                href={`/tour/${tour.id}`}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#F8A41E] transition-all bg-slate-50 px-4 py-2 rounded-lg"
              >
                <ChevronLeft className="w-3 h-3" aria-hidden="true" />
                <span>Back to Tour</span>
              </Link>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 block">
                    Selected Date
                  </span>
                  <p className="text-lg font-black text-[#0C3136]">{initialDate}</p>
                </div>
                <Link
                  href={`/tour/${tour.id}`}
                  className="text-[10px] font-black uppercase tracking-widest text-[#F8A41E] hover:underline"
                >
                  Change Date
                </Link>
              </div>

              {/* Adult count */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="font-black text-[#0C3136] text-base leading-tight">Adults</h3>
                  <p className="text-xs text-slate-400 font-bold mt-1">Ages 13+ • CAD ${tour.price}.00 per ticket</p>
                </div>
                <div className="flex items-center gap-6 p-2 bg-slate-50 rounded-2xl border border-slate-100">
                  <button
                    type="button"
                    aria-label="Decrease adult tickets"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-[#0C3136] transition-all focus-visible:ring-2 focus-visible:ring-[#F8A41E]"
                  >
                    <Minus size={18} aria-hidden="true" />
                  </button>
                  <span className="font-black text-lg text-[#0C3136] w-6 text-center" aria-live="polite">
                    {adults}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase adult tickets"
                    onClick={() => setAdults(adults + 1)}
                    className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-[#0C3136] transition-all focus-visible:ring-2 focus-visible:ring-[#F8A41E]"
                  >
                    <Plus size={18} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Child count */}
              <div className="flex items-center justify-between py-2">
                <div>
                  <h3 className="font-black text-[#0C3136] text-base leading-tight">Children</h3>
                  <p className="text-xs text-slate-400 font-bold mt-1">Ages 2-12 • CAD ${childPrice}.00 per ticket</p>
                </div>
                <div className="flex items-center gap-6 p-2 bg-slate-50 rounded-2xl border border-slate-100">
                  <button
                    type="button"
                    aria-label="Decrease child tickets"
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-[#0C3136] transition-all focus-visible:ring-2 focus-visible:ring-[#F8A41E]"
                  >
                    <Minus size={18} aria-hidden="true" />
                  </button>
                  <span className="font-black text-lg text-[#0C3136] w-6 text-center" aria-live="polite">
                    {children}
                  </span>
                  <button
                    type="button"
                    aria-label="Increase child tickets"
                    onClick={() => setChildren(children + 1)}
                    className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-[#0C3136] transition-all focus-visible:ring-2 focus-visible:ring-[#F8A41E]"
                  >
                    <Plus size={18} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Interactive Pickup Map */}
          <section aria-labelledby="pickup-heading" className="bg-white p-8 lg:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#125D66]" aria-hidden="true">
                <MapPin className="w-5 h-5" />
              </div>
              <h2 id="pickup-heading" className="text-2xl font-black text-[#0C3136]">
                Pickup Location
              </h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm font-bold text-slate-500 mb-2">
                Drop a pin on the map or type your hotel name/address below for door-to-door pickup:
              </p>
              
              <div className="h-[250px] w-full rounded-2xl overflow-hidden border-2 border-slate-100 relative z-0 cursor-crosshair shadow-inner">
                <LocationMarkerMap onLocationSelect={setPickup} />
              </div>

              <div className="space-y-2 pt-2">
                <label htmlFor="checkout-pickup" className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 block">
                  Pickup Hotel or Street Address <span className="text-red-500">*</span>
                </label>
                <input 
                  id="checkout-pickup"
                  type="text"
                  required
                  placeholder="e.g. Chelsea Hotel Toronto (or click on map)" 
                  value={pickup} 
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full p-5 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-[#0C3136] text-sm outline-none focus:border-[#F8A41E] focus:bg-white transition-all"
                />
              </div>
            </div>
          </section>

          {/* Section 3: Contact */}
          <section aria-labelledby="contact-heading" className="bg-white p-8 lg:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#125D66]" aria-hidden="true">
                <Users className="w-5 h-5" />
              </div>
              <h2 id="contact-heading" className="text-2xl font-black text-[#0C3136]">
                Primary Passenger Contact Details
              </h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="checkout-full-name" className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 block">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="checkout-full-name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  className="w-full p-5 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E] focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="checkout-email" className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 block">
                  Email Address (for e-tickets) <span className="text-red-500">*</span>
                </label>
                <input
                  id="checkout-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full p-5 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E] focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="checkout-phone" className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 block">
                  Mobile Phone Number
                </label>
                <input
                  id="checkout-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="(416) 000-0000"
                  className="w-full p-5 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E] focus:bg-white transition-all"
                />
              </div>
            </div>
          </section>

          {/* Submit button on mobile */}
          <div className="lg:hidden">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#D91E1E] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:bg-[#b01818] transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> PROCESSING...</> : `PAY CAD $${total.toFixed(2)}`}
            </button>
          </div>
        </form>

        {/* RIGHT COLUMN: STICKY RECEIPT ASIDE */}
        <aside aria-labelledby="order-summary-heading" className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
              <div className="p-8 lg:p-10">
                <h2 id="order-summary-heading" className="text-xl font-black text-[#0C3136] mb-6">
                  Order Summary
                </h2>
                
                <div className="space-y-4 pb-6 border-b border-slate-100 text-sm font-bold text-slate-600">
                  <p className="font-black text-[#0C3136] text-base">{tour.title}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-4 h-4 text-[#F8A41E]" aria-hidden="true" />
                    <span>{initialDate}</span>
                  </div>
                </div>

                <div className="py-6 space-y-3">
                  <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>{adults} Adult Ticket{adults > 1 ? 's' : ''}</span>
                    <span className="text-slate-700">CAD ${(adults * tour.price).toFixed(2)}</span>
                  </div>
                  {children > 0 && (
                    <div className="flex justify-between text-xs font-bold text-slate-500">
                      <span>{children} Child Ticket{children > 1 ? 's' : ''}</span>
                      <span className="text-slate-700">CAD ${(children * childPrice).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>Harmonized Sales Tax (HST 13%)</span>
                    <span className="text-slate-700">CAD ${taxes.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-between items-baseline mb-6">
                  <span className="text-base font-black text-[#0C3136]">Total Due</span>
                  <span className="text-3xl font-black text-[#0C3136]">CAD ${total.toFixed(2)}</span>
                </div>

                <button 
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleCompleteBooking}
                  className="w-full bg-[#D91E1E] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:bg-[#b01818] transition-all mb-4 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D91E1E]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" aria-hidden="true" />
                      <span>PROCESSING...</span>
                    </>
                  ) : (
                    'COMPLETE BOOKING'
                  )}
                </button>
                
                <div className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                  <span>256-Bit SSL Encrypted &amp; Secure</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
