"use client";

import React, { useState, useId } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import CalendarDropdown from '@/components/CalendarDropdown';
import { PICKUP_POINTS } from '@/data/tours';
import { 
  ChevronLeft, Calendar, Minus, Plus, MapPin, 
  Users, Loader2, ShieldCheck, CheckCircle2, 
  Clock, Tag, Sparkles, Printer, Lock, 
  CreditCard, Bus, Star, Award, Check, PhoneCall,
  Info, Compass, ChevronDown, CheckCircle
} from 'lucide-react';

// Dynamically load Google Maps components
const LocationMarkerMap = dynamic(
  () => import('@/components/DynamicMap').then((mod) => mod.LocationMarkerMap),
  { 
    ssr: false, 
    loading: () => (
      <div className="w-full h-full bg-slate-100 animate-pulse flex flex-col items-center justify-center gap-2 text-slate-400 font-bold text-xs">
        <Loader2 className="w-5 h-5 animate-spin text-[#0C3136]" />
        <span>Loading Interactive Map...</span>
      </div>
    ) 
  }
);

const StaticPointsMap = dynamic(
  () => import('@/components/DynamicMap').then((mod) => mod.StaticPointsMap),
  { 
    ssr: false, 
    loading: () => (
      <div className="w-full h-full bg-slate-100 animate-pulse flex flex-col items-center justify-center gap-2 text-slate-400 font-bold text-xs">
        <Loader2 className="w-5 h-5 animate-spin text-[#0C3136]" />
        <span>Loading Pickup Map...</span>
      </div>
    ) 
  }
);

export default function CheckoutClient({ tour, allTours = [], initialDate }) {
  // Tour Selection
  const [selectedTour, setSelectedTour] = useState(tour || (allTours && allTours[0]));
  const [showTourSwitcher, setShowTourSwitcher] = useState(false);

  // Date Selection
  const [selectedDate, setSelectedDate] = useState(initialDate || new Date().toLocaleDateString());
  const [showCalendar, setShowCalendar] = useState(false);

  // Guest Counters
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  // Pickup Mode: 'hub' (official 5 downtown hubs) or 'custom' (hotel / address)
  const [pickupMode, setPickupMode] = useState('hub');
  const [selectedHubIndex, setSelectedHubIndex] = useState(0);
  const [customPickup, setCustomPickup] = useState('');
  const [hotelRoom, setHotelRoom] = useState('');

  // Primary Passenger Contact
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Promo Code
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');

  // Payment Option
  const [paymentOption, setPaymentOption] = useState('guarantee'); // 'guarantee' or 'card'

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  if (!selectedTour) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-2xl font-black text-[#0C3136] mb-4">No Tour Selected</h1>
        <Link 
          href="/tours" 
          className="bg-[#0C3136] text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#125D66] transition-all"
        >
          Browse All Tours
        </Link>
      </div>
    );
  }

  // Pricing calculations
  const adultPrice = selectedTour.price || 89;
  const childPrice = Math.max((adultPrice) - 10, 0);
  const baseSubtotal = (adults * adultPrice) + (children * childPrice);
  
  // Promo calculation
  const discountAmount = appliedPromo ? (baseSubtotal * (appliedPromo.discountPercent / 100)) : 0;
  const netSubtotal = Math.max(0, baseSubtotal - discountAmount);
  const taxes = netSubtotal * 0.13; // 13% Ontario HST
  const total = netSubtotal + taxes;

  // Active Pickup Address String
  const activePickupString = pickupMode === 'hub'
    ? `${PICKUP_POINTS[selectedHubIndex]?.name} (${PICKUP_POINTS[selectedHubIndex]?.time}) - ${PICKUP_POINTS[selectedHubIndex]?.sub}`
    : (customPickup || 'Custom Hotel / Address Pickup');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    const cleanCode = promoInput.trim().toUpperCase();
    if (!cleanCode) return;

    if (cleanCode === 'NIAGARA10' || cleanCode === 'WELCOME10') {
      setAppliedPromo({ code: cleanCode, discountPercent: 10 });
      setPromoInput('');
    } else if (cleanCode === 'FALLS5' || cleanCode === 'SAVE5') {
      setAppliedPromo({ code: cleanCode, discountPercent: 5 });
      setPromoInput('');
    } else {
      setPromoError('Invalid coupon code. Try NIAGARA10 for 10% off.');
    }
  };

  const handleCompleteBooking = async (e) => {
    if (e) e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      alert("Please enter the primary passenger's First Name, Last Name, and Email Address.");
      return;
    }

    if (pickupMode === 'custom' && !customPickup.trim()) {
      alert("Please enter or pick your Hotel / Address on the map for pickup.");
      return;
    }

    setIsSubmitting(true);
    const fullName = `${firstName.trim()} ${lastName.trim()}`;
    const bookingId = `NVT-${Math.floor(10000 + Math.random() * 90000)}`;

    const newBooking = {
      id: bookingId,
      tourId: selectedTour.id,
      tourName: selectedTour.title,
      customerName: fullName,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim() || 'N/A',
      date: selectedDate,
      adults: adults,
      children: children,
      infants: infants,
      pickup: activePickupString,
      pickupMode: pickupMode,
      hotelRoom: hotelRoom.trim() || '',
      specialRequests: specialRequests.trim() || '',
      paymentMethod: paymentOption === 'guarantee' ? 'Card Guarantee (Zero Due Today)' : 'Direct Reservation',
      subtotal: baseSubtotal,
      discount: discountAmount,
      promoCode: appliedPromo?.code || null,
      taxes: taxes,
      total: total,
      status: 'Confirmed',
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
            email: email.trim(),
            fullName: fullName,
            bookingId: newBooking.id,
            tourName: selectedTour.title,
            tourDate: selectedDate,
            pickup: activePickupString,
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
      alert("There was an issue processing your booking. Please try again or call our 24/7 concierge at (416) 444-3000.");
      setIsSubmitting(false);
    }
  };

  // =========================================================================
  // SUCCESS SCREEN: LUXURY BOARDING PASS & CONFIRMATION
  // =========================================================================
  if (confirmedBooking) {
    return (
      <section aria-labelledby="booking-confirmed-heading" className="min-h-screen bg-slate-50 py-12 lg:py-20 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header celebration */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/10 animate-bounce">
              <CheckCircle2 size={44} />
            </div>
            <span className="inline-block bg-emerald-50 text-emerald-800 text-[11px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-emerald-200 mb-3">
              Booking Confirmed &amp; Guaranteed
            </span>
            <h1 id="booking-confirmed-heading" className="text-3xl sm:text-4xl font-black text-[#0C3136] tracking-tight mb-2">
              Pack Your Bags, {confirmedBooking.firstName}!
            </h1>
            <p className="text-slate-500 font-medium text-sm max-w-md mx-auto">
              Your official digital e-ticket has been issued and emailed to{' '}
              <strong className="text-[#0C3136]">{confirmedBooking.email}</strong>.
            </p>
          </div>

          {/* Luxury E-Ticket Boarding Pass Mockup */}
          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden mb-8">
            {/* Top branding banner */}
            <div className="bg-[#0C3136] text-white p-6 sm:p-8 flex items-center justify-between border-b border-[#125D66]">
              <div>
                <p className="text-[10px] font-black text-[#F8A41E] uppercase tracking-[0.25em] mb-1">
                  Official Boarding Pass
                </p>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">{confirmedBooking.tourName}</h2>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-widest">Pass ID</span>
                <span className="font-mono text-base sm:text-lg font-black text-white">{confirmedBooking.id}</span>
              </div>
            </div>

            {/* Ticket Details Grid */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Passenger</span>
                  <p className="text-xs sm:text-sm font-black text-[#0C3136] truncate">{confirmedBooking.customerName}</p>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Date</span>
                  <p className="text-xs sm:text-sm font-black text-[#0C3136]">{confirmedBooking.date}</p>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Party Size</span>
                  <p className="text-xs sm:text-sm font-black text-[#0C3136]">
                    {confirmedBooking.adults} Adult{confirmedBooking.adults > 1 ? 's' : ''}
                    {confirmedBooking.children > 0 && `, ${confirmedBooking.children} Child`}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">Total CAD</span>
                  <p className="text-xs sm:text-sm font-black text-emerald-600">${confirmedBooking.total.toFixed(2)}</p>
                </div>
              </div>

              {/* Boarding Point Highlight */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Bus className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-900">
                      Designated Boarding Point
                    </span>
                    <span className="text-[11px] font-black bg-amber-200/80 text-amber-950 px-2.5 py-0.5 rounded-full">
                      Be ready 10 min prior
                    </span>
                  </div>
                  <p className="text-sm font-black text-[#0C3136] leading-snug">{confirmedBooking.pickup}</p>
                  {confirmedBooking.hotelRoom && (
                    <p className="text-xs text-slate-600 mt-1">Room / Suite: {confirmedBooking.hotelRoom}</p>
                  )}
                </div>
              </div>

              {/* Perforation Line */}
              <div className="relative py-2 flex items-center justify-center">
                <div className="w-full border-b-2 border-dashed border-slate-200" />
                <span className="absolute bg-white px-4 text-[9px] font-black uppercase tracking-widest text-slate-400">
                  Digital Boarding Scan
                </span>
              </div>

              {/* Simulated QR Code for Boarding */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-slate-900 rounded-2xl p-2 flex items-center justify-center shrink-0 shadow-md">
                    {/* SVG QR Code Simulation */}
                    <div className="grid grid-cols-5 gap-1 w-full h-full p-1 bg-white rounded-lg">
                      <div className="bg-slate-900 rounded-sm col-span-2 row-span-2" />
                      <div className="bg-slate-900 rounded-sm" />
                      <div className="bg-slate-900 rounded-sm col-span-2 row-span-2" />
                      <div className="bg-slate-900 rounded-sm" />
                      <div className="bg-slate-900 rounded-sm" />
                      <div className="bg-slate-900 rounded-sm" />
                      <div className="bg-slate-900 rounded-sm" />
                      <div className="bg-slate-900 rounded-sm col-span-2 row-span-2" />
                      <div className="bg-slate-900 rounded-sm" />
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-black text-[#0C3136] block mb-0.5">Show this to your tour driver</span>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">
                      Your driver will scan this barcode or check your name on boarding. No physical printout strictly needed.
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-[#0C3136] px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Ticket</span>
                  </button>
                  <Link
                    href="/"
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#0C3136] hover:bg-[#125D66] text-white px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all shadow-md"
                  >
                    <span>Return Home</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Assistance footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 font-medium gap-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% Guaranteed Spot • Free 24h Cancellation</span>
              </span>
              <a href="tel:4164443000" className="text-[#125D66] font-bold hover:underline flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Need assistance? (416) 444-3000</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // MAIN REDESIGNED CHECKOUT EXPERIENCE
  // =========================================================================
  return (
    <div className="bg-slate-50/70 min-h-screen pt-4 pb-24 text-[#0C3136]">
      {/* Top Navigation & Breadcrumb */}
      <div className="container mx-auto px-4 max-w-7xl mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-slate-200">
          <Link
            href={selectedTour?.id ? `/tour/${selectedTour.id}` : '/tours'}
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-500 hover:text-[#0C3136] transition-colors bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Tour Details</span>
          </Link>

          <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
            <span className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 text-[11px] font-black uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" />
              256-Bit SSL Encrypted
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="hidden sm:inline">Official Niagara Tour Operator</span>
          </div>
        </div>

        {/* 4-Step Progress Indicator */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mt-6">
          {[
            { num: '1', title: 'Tour & Date', active: true },
            { num: '2', title: 'Tickets & Fare', active: true },
            { num: '3', title: 'Pickup Hub / Map', active: true },
            { num: '4', title: 'Contact & Confirm', active: true },
          ].map((s, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm flex items-center gap-3"
            >
              <div className="w-7 h-7 rounded-xl bg-[#0C3136] text-white flex items-center justify-center text-xs font-black shrink-0">
                {s.num}
              </div>
              <div className="min-w-0">
                <span className="text-[9px] uppercase font-black tracking-widest text-slate-400 block">Step {s.num}</span>
                <span className="text-xs font-black text-[#0C3136] truncate block">{s.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <main className="container mx-auto px-4 max-w-7xl">
        <form onSubmit={handleCompleteBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================================================================= */}
          {/* LEFT COLUMN: MAIN CHECKOUT SECTIONS (8 COLS) */}
          {/* ================================================================= */}
          <div className="lg:col-span-8 space-y-6">

            {/* --------------------------------------------------------------- */}
            {/* 1. TOUR PACKAGE SELECTOR & SUMMARY */}
            {/* --------------------------------------------------------------- */}
            <section aria-labelledby="experience-heading" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 text-[#125D66] flex items-center justify-center shrink-0">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#F8A41E]">Experience Package</span>
                    <h2 id="experience-heading" className="text-xl sm:text-2xl font-black text-[#0C3136]">
                      Selected Tour
                    </h2>
                  </div>
                </div>

                {allTours && allTours.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setShowTourSwitcher(!showTourSwitcher)}
                    className="text-xs font-black text-[#125D66] hover:text-[#0C3136] bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-1.5 transition-all"
                  >
                    <span>Change Package</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Tour Switcher Drawer / Dropdown */}
              {showTourSwitcher && allTours && (
                <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 animate-in fade-in duration-200">
                  <p className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">Available Experiences</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {allTours.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          setSelectedTour(t);
                          setShowTourSwitcher(false);
                        }}
                        className={`text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                          selectedTour.id === t.id 
                            ? 'bg-white border-[#0C3136] shadow-sm ring-2 ring-[#0C3136]/10' 
                            : 'bg-white/60 border-slate-200 hover:bg-white'
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-black text-[#0C3136] truncate">{t.title}</p>
                          <p className="text-[11px] text-slate-500 font-bold">CAD ${t.price}.00 per adult</p>
                        </div>
                        {selectedTour.id === t.id && (
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Active Tour Highlight Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <div className="relative w-full sm:w-28 h-36 sm:h-28 rounded-xl overflow-hidden shrink-0 shadow-sm">
                  <Image
                    src={selectedTour.img || '/images/hero-bg.jpg'}
                    alt={selectedTour.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 112px"
                    className="object-cover"
                  />
                  <span className="absolute bottom-1.5 left-1.5 bg-[#0C3136]/90 backdrop-blur-xs text-white text-[9px] font-black px-2 py-0.5 rounded-md">
                    {selectedTour.tag || 'TOP RATED'}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} className="fill-current" />
                      ))}
                    </div>
                    <span className="text-xs font-black text-slate-500">4.9/5 (1,240+ verified reviews)</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-[#0C3136] leading-tight mb-2">
                    {selectedTour.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-bold">
                    <span className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      <Clock className="w-3.5 h-3.5 text-[#F8A41E]" />
                      <span>{selectedTour.duration || '9 - 10 Hours'}</span>
                    </span>
                    <span className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      <Bus className="w-3.5 h-3.5 text-[#125D66]" />
                      <span>Luxury Motorcoach</span>
                    </span>
                    <span className="flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Free 24h Cancellation</span>
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* --------------------------------------------------------------- */}
            {/* 2. VISIT DATE & PASSENGER TICKET TALLY */}
            {/* --------------------------------------------------------------- */}
            <section aria-labelledby="date-tickets-heading" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#F8A41E] flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#F8A41E]">Tour Date &amp; Guests</span>
                  <h2 id="date-tickets-heading" className="text-xl sm:text-2xl font-black text-[#0C3136]">
                    When Are You Visiting?
                  </h2>
                </div>
              </div>

              {/* Date Selector with Calendar Dropdown */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">
                      Departure Date
                    </span>
                    <p className="text-lg font-black text-[#0C3136] flex items-center gap-2">
                      <span>{selectedDate}</span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                        Instant Availability
                      </span>
                    </p>
                  </div>

                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCalendar(!showCalendar)}
                      className="bg-white hover:bg-slate-50 text-[#0C3136] border border-slate-200 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm transition-all flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4 text-[#F8A41E]" />
                      <span>{showCalendar ? 'Close Calendar' : 'Change Date'}</span>
                    </button>

                    {showCalendar && (
                      <CalendarDropdown
                        direction="down"
                        onSelectDate={(d) => {
                          setSelectedDate(d.toLocaleDateString());
                          setShowCalendar(false);
                        }}
                      />
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <Info className="w-3.5 h-3.5 text-[#125D66] shrink-0" />
                  <span>Standard morning pickups begin between 7:55 AM and 8:30 AM depending on your hub.</span>
                </div>
              </div>

              {/* Ticket Quantities */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Select Passenger Quantity</h3>

                {/* Adult */}
                <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all bg-white">
                  <div>
                    <h4 className="font-black text-base text-[#0C3136]">Adults</h4>
                    <p className="text-xs text-slate-400 font-bold">Ages 13+ • CAD ${adultPrice}.00 per passenger</p>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      aria-label="Decrease adult tickets"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-9 h-9 rounded-lg bg-white shadow-xs flex items-center justify-center text-slate-500 hover:text-[#0C3136] hover:bg-slate-100 transition-all"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-black text-base text-[#0C3136] w-6 text-center">{adults}</span>
                    <button
                      type="button"
                      aria-label="Increase adult tickets"
                      onClick={() => setAdults(adults + 1)}
                      className="w-9 h-9 rounded-lg bg-white shadow-xs flex items-center justify-center text-slate-500 hover:text-[#0C3136] hover:bg-slate-100 transition-all"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all bg-white">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-base text-[#0C3136]">Children</h4>
                      <span className="text-[10px] font-black uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                        $10 OFF
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-bold">Ages 2-12 • CAD ${childPrice}.00 per child</p>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      aria-label="Decrease child tickets"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-9 h-9 rounded-lg bg-white shadow-xs flex items-center justify-center text-slate-500 hover:text-[#0C3136] hover:bg-slate-100 transition-all"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-black text-base text-[#0C3136] w-6 text-center">{children}</span>
                    <button
                      type="button"
                      aria-label="Increase child tickets"
                      onClick={() => setChildren(children + 1)}
                      className="w-9 h-9 rounded-lg bg-white shadow-xs flex items-center justify-center text-slate-500 hover:text-[#0C3136] hover:bg-slate-100 transition-all"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Infants */}
                <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all bg-white">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-base text-[#0C3136]">Infants</h4>
                      <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                        FREE
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-bold">Under 2 years • Sits on lap of parent/guardian</p>
                  </div>
                  <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      aria-label="Decrease infant tickets"
                      onClick={() => setInfants(Math.max(0, infants - 1))}
                      className="w-9 h-9 rounded-lg bg-white shadow-xs flex items-center justify-center text-slate-500 hover:text-[#0C3136] hover:bg-slate-100 transition-all"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-black text-base text-[#0C3136] w-6 text-center">{infants}</span>
                    <button
                      type="button"
                      aria-label="Increase infant tickets"
                      onClick={() => setInfants(infants + 1)}
                      className="w-9 h-9 rounded-lg bg-white shadow-xs flex items-center justify-center text-slate-500 hover:text-[#0C3136] hover:bg-slate-100 transition-all"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* --------------------------------------------------------------- */}
            {/* 3. PICKUP LOCATION (GOOGLE MAPS POWERED) */}
            {/* --------------------------------------------------------------- */}
            <section aria-labelledby="pickup-section-heading" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#D91E1E] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#D91E1E]">Boarding Point</span>
                    <h2 id="pickup-section-heading" className="text-xl sm:text-2xl font-black text-[#0C3136]">
                      Toronto Pickup Location
                    </h2>
                  </div>
                </div>

                {/* Mode Selector Tabs */}
                <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setPickupMode('hub')}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                      pickupMode === 'hub' 
                        ? 'bg-[#0C3136] text-white shadow-sm' 
                        : 'text-slate-500 hover:text-[#0C3136]'
                    }`}
                  >
                    Express Hubs (5)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPickupMode('custom')}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                      pickupMode === 'custom' 
                        ? 'bg-[#0C3136] text-white shadow-sm' 
                        : 'text-slate-500 hover:text-[#0C3136]'
                    }`}
                  >
                    Hotel Pin Picker
                  </button>
                </div>
              </div>

              {/* MODE A: OFFICIAL EXPRESS HUBS */}
              {pickupMode === 'hub' && (
                <div className="space-y-6">
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">
                    Select your closest downtown boarding location. All 5 hubs feature guaranteed scheduled departures and direct subway/transit connectivity:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PICKUP_POINTS.map((point, idx) => {
                      const isSelected = selectedHubIndex === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedHubIndex(idx)}
                          className={`text-left p-4 rounded-2xl border transition-all relative ${
                            isSelected
                              ? 'bg-amber-50/50 border-[#F8A41E] shadow-md ring-2 ring-[#F8A41E]/20'
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                              isSelected ? 'bg-[#0C3136] text-white' : 'bg-slate-100 text-slate-600'
                            }`}>
                              Hub #{idx + 1}
                            </span>
                            <span className="font-black text-xs text-[#0C3136] bg-amber-100/80 text-amber-900 px-2 py-0.5 rounded-md">
                              {point.time}
                            </span>
                          </div>
                          <h4 className="font-black text-sm text-[#0C3136] leading-tight mb-1">{point.name}</h4>
                          <p className="text-xs text-slate-500 font-medium truncate">{point.sub}</p>
                        </button>
                      );
                    })}
                  </div>

                  {/* Google Map of Hubs */}
                  <div className="h-[280px] sm:h-[320px] rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative">
                    <StaticPointsMap
                      points={PICKUP_POINTS}
                      activeIndex={selectedHubIndex}
                      onSelectPoint={setSelectedHubIndex}
                    />
                  </div>
                </div>
              )}

              {/* MODE B: CUSTOM HOTEL PIN / ADDRESS MAP */}
              {pickupMode === 'custom' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">
                    Staying at a hotel, Airbnb, or residence? Drop a pin directly on the Google Map below or type your address for door-to-door coordination:
                  </p>

                  <div className="h-[300px] sm:h-[340px] rounded-2xl overflow-hidden relative shadow-inner">
                    <LocationMarkerMap
                      onLocationSelect={(addr) => setCustomPickup(addr)}
                      initialLocation={customPickup}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="sm:col-span-2 space-y-1.5">
                      <label htmlFor="custom-address" className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                        Street Address or Hotel Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="custom-address"
                        type="text"
                        required={pickupMode === 'custom'}
                        value={customPickup}
                        onChange={(e) => setCustomPickup(e.target.value)}
                        placeholder="e.g. 100 Front St W (Fairmont Royal York)"
                        className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-[#0C3136] focus:bg-white focus:border-[#0C3136] focus:outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="hotel-room" className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                        Room / Suite (Optional)
                      </label>
                      <input
                        id="hotel-room"
                        type="text"
                        value={hotelRoom}
                        onChange={(e) => setHotelRoom(e.target.value)}
                        placeholder="e.g. Room 412"
                        className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-[#0C3136] focus:bg-white focus:border-[#0C3136] focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* --------------------------------------------------------------- */}
            {/* 4. PRIMARY PASSENGER CONTACT DETAILS */}
            {/* --------------------------------------------------------------- */}
            <section aria-labelledby="passenger-contact-heading" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Lead Guest</span>
                  <h2 id="passenger-contact-heading" className="text-xl sm:text-2xl font-black text-[#0C3136]">
                    Passenger Contact Information
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="first-name" className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="first-name"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Alexander"
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-[#0C3136] focus:bg-white focus:border-[#0C3136] focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="last-name" className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="last-name"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Hayes"
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-[#0C3136] focus:bg-white focus:border-[#0C3136] focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email-address" className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    Email Address (for Digital Voucher) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email-address"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alexander@example.com"
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-[#0C3136] focus:bg-white focus:border-[#0C3136] focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="phone-number" className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                    Mobile Phone Number (for Driver SMS updates) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone-number"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (416) 000-0000"
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-[#0C3136] focus:bg-white focus:border-[#0C3136] focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <label htmlFor="special-notes" className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Dietary Requirements, Accessibility, or Special Occasions (Optional)
                </label>
                <textarea
                  id="special-notes"
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Vegetarian meal for 1, traveling with wheelchair, celebrating anniversary..."
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-[#0C3136] focus:bg-white focus:border-[#0C3136] focus:outline-none transition-all resize-none"
                />
              </div>
            </section>

            {/* --------------------------------------------------------------- */}
            {/* 5. PAYMENT & RISK-FREE GUARANTEE */}
            {/* --------------------------------------------------------------- */}
            <section aria-labelledby="payment-guarantee-heading" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Peace of Mind</span>
                  <h2 id="payment-guarantee-heading" className="text-xl sm:text-2xl font-black text-[#0C3136]">
                    Booking Guarantee &amp; Cancellation
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-black text-xs text-emerald-950 uppercase tracking-wider mb-1">Free Cancellation</h3>
                    <p className="text-[11px] text-emerald-800 font-medium leading-relaxed">
                      Cancel up to 24 hours prior to departure for a 100% full refund, no questions asked.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#125D66] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-black text-xs text-[#0C3136] uppercase tracking-wider mb-1">Guaranteed Departure</h3>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                      All tours operate daily with confirmed seats and dedicated luxury coaches.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#F8A41E] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-black text-xs text-[#0C3136] uppercase tracking-wider mb-1">Direct Operator Rate</h3>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                      Zero broker commissions, no hidden luggage fees, and complimentary bottled water.
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Method Badges */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase text-slate-400 tracking-wider">Accepted:</span>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <span className="bg-slate-100 font-black text-[10px] px-2.5 py-1 rounded-md border border-slate-200">VISA</span>
                    <span className="bg-slate-100 font-black text-[10px] px-2.5 py-1 rounded-md border border-slate-200">MASTERCARD</span>
                    <span className="bg-slate-100 font-black text-[10px] px-2.5 py-1 rounded-md border border-slate-200">AMEX</span>
                    <span className="bg-slate-100 font-black text-[10px] px-2.5 py-1 rounded-md border border-slate-200">APPLE PAY</span>
                    <span className="bg-slate-100 font-black text-[10px] px-2.5 py-1 rounded-md border border-slate-200">GOOGLE PAY</span>
                  </div>
                </div>

                <div className="text-xs text-slate-400 font-bold flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Secure SSL Checkout</span>
                </div>
              </div>
            </section>

          </div>

          {/* ================================================================= */}
          {/* RIGHT COLUMN: STICKY ORDER SUMMARY ASIDE (4 COLS) */}
          {/* ================================================================= */}
          <aside aria-labelledby="checkout-summary-heading" className="lg:col-span-4">
            <div className="sticky top-6 space-y-4">
              
              <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                {/* Header */}
                <div className="p-6 bg-[#0C3136] text-white">
                  <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#F8A41E] mb-1">
                    <span>Order Summary</span>
                    <span>100% Guaranteed</span>
                  </div>
                  <h2 id="checkout-summary-heading" className="text-xl font-black leading-tight text-white">
                    {selectedTour.title}
                  </h2>
                </div>

                {/* Itinerary Snapshot */}
                <div className="p-6 border-b border-slate-100 space-y-3 text-xs">
                  <div className="flex items-center gap-2.5 text-slate-600 font-bold">
                    <Calendar className="w-4 h-4 text-[#F8A41E] shrink-0" />
                    <span>Date: <strong className="text-[#0C3136]">{selectedDate}</strong></span>
                  </div>
                  <div className="flex items-start gap-2.5 text-slate-600 font-bold">
                    <MapPin className="w-4 h-4 text-[#D91E1E] shrink-0 mt-0.5" />
                    <span className="truncate">
                      Pickup: <strong className="text-[#0C3136]">{activePickupString.split(' - ')[0]}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-600 font-bold">
                    <Clock className="w-4 h-4 text-[#125D66] shrink-0" />
                    <span>Duration: <strong className="text-[#0C3136]">{selectedTour.duration || 'Full Day'}</strong></span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="p-6 space-y-3">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span>{adults} Adult Ticket{adults > 1 ? 's' : ''} (CAD ${adultPrice}.00 ea)</span>
                    <span className="text-[#0C3136] font-black">CAD ${(adults * adultPrice).toFixed(2)}</span>
                  </div>

                  {children > 0 && (
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                      <span>{children} Child Ticket{children > 1 ? 's' : ''} (CAD ${childPrice}.00 ea)</span>
                      <span className="text-[#0C3136] font-black">CAD ${(children * childPrice).toFixed(2)}</span>
                    </div>
                  )}

                  {infants > 0 && (
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                      <span>{infants} Infant{infants > 1 ? 's' : ''} (Lap Seat)</span>
                      <span className="text-emerald-600 font-black">FREE ($0.00)</span>
                    </div>
                  )}

                  {appliedPromo && (
                    <div className="flex justify-between text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        <span>Promo Code ({appliedPromo.code})</span>
                      </span>
                      <span className="font-black">-CAD ${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>Ontario HST (13%)</span>
                    <span className="text-[#0C3136] font-bold">CAD ${taxes.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>Booking &amp; Service Fee</span>
                    <span className="text-emerald-600 font-black uppercase text-[10px]">WAIVED ($0.00)</span>
                  </div>

                  {/* Total Line */}
                  <div className="pt-4 border-t border-slate-200 flex justify-between items-baseline">
                    <div>
                      <span className="text-xs uppercase font-black tracking-wider text-slate-400 block">Total Due</span>
                      <span className="text-[11px] text-slate-400 font-bold">Includes all taxes &amp; fees</span>
                    </div>
                    <span className="text-3xl font-black text-[#0C3136] tracking-tight">
                      CAD ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Promo Code Input Box */}
                <div className="px-6 pb-6">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Coupon code (e.g. NIAGARA10)"
                        className="bg-transparent text-xs font-bold text-[#0C3136] placeholder:text-slate-400 outline-none flex-1 min-w-0"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="bg-[#0C3136] text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-lg hover:bg-[#125D66] transition-all shrink-0"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-[11px] text-red-500 font-bold mt-1.5 ml-1">{promoError}</p>
                    )}
                  </div>
                </div>

                {/* CTA Action Button */}
                <div className="p-6 pt-0 space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#D91E1E] hover:bg-[#b01818] active:translate-y-0.5 text-white py-4 sm:py-5 rounded-2xl font-black text-xs uppercase tracking-[0.25em] shadow-xl shadow-red-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D91E1E]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>CONFIRMING RESERVATION...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>CONFIRM &amp; RESERVE NOW</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-slate-400 font-bold leading-relaxed">
                    By confirming, you agree to our standard 24h cancellation terms. No payment is charged without reservation verification.
                  </p>
                </div>
              </div>

              {/* Assistance Box */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 text-center space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#125D66] block">
                  Questions About Your Tour?
                </span>
                <p className="text-xs text-slate-500 font-medium">
                  Our Toronto local tour specialists are available daily 7 AM – 9 PM.
                </p>
                <a
                  href="tel:4164443000"
                  className="inline-flex items-center justify-center gap-2 text-xs font-black text-[#0C3136] hover:text-[#125D66] transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#F8A41E]" />
                  <span>Call (416) 444-3000</span>
                </a>
              </div>

            </div>
          </aside>

        </form>
      </main>
    </div>
  );
}
