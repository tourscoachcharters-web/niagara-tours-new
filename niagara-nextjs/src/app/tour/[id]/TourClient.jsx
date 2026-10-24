"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import CalendarDropdown from "@/components/CalendarDropdown";
import { PICKUP_POINTS, REVIEWS_DATA } from "@/data/tours"; 
import { 
  ChevronLeft, Clock, Sun, MapPin, ShieldCheck, Compass, CheckCircle2, 
  CheckCircle, XCircle, Ban, Navigation, Ticket, Users, Baby, Calendar, Star,
  Wind, Camera, Grape, Globe, Map as MapIcon, Zap, Utensils, Plane
} from 'lucide-react';

const ICON_MAP = {
  Users,
  Navigation,
  Camera,
  Clock,
  Zap,
  Bus: Compass,
  MapPin,
  Wind,
  Grape,
  Globe,
  ShieldCheck,
  Map: MapIcon,
  MapIcon,
  Utensils,
  Plane,
  Star,
  Sun,
  Baby,
  Ticket,
};

const StaticPointsMap = dynamic(
  () => import('@/components/DynamicMap').then((mod) => mod.StaticPointsMap),
  { ssr: false, loading: () => <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center font-bold text-slate-400">Loading Map...</div> }
);

export default function TourClient({ tour }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);

  const tourReviews = REVIEWS_DATA ? REVIEWS_DATA.filter((r) => r.tour === tour?.title) : [];

  useEffect(() => {
    const handleClickOutside = (event) => { 
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToBooking = (e) => {
    e.preventDefault();
    const element = document.getElementById('booking-card');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!tour) return null;

  return (
    <article aria-labelledby="tour-detail-heading" className="animate-in fade-in duration-700 bg-[#F8FAFC]">
      {/* 1. HERO SECTION & HEADER */}
      <header className="relative h-[500px] sm:h-[550px] flex items-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={tour.img || '/images/hero-home.jpg'} 
            alt={`${tour.title} hero showcase`} 
            fill 
            priority 
            sizes="100vw"
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C3136]/95 via-[#0C3136]/70 to-transparent" />
        </div>

        <div className="container mx-auto px-4 z-10">
          <div className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-6">
              <Link
                href="/tours"
                className="flex w-max items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded px-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Back to All Tours</span>
              </Link>
            </nav>

            <span className="bg-[#F8A41E] text-[#0C3136] text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-[0.2em] mb-4 inline-block shadow-lg">
              {tour.tag || 'FEATURED TOUR'}
            </span>

            <h1
              id="tour-detail-heading"
              className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tighter mb-4"
            >
              {tour.title}
            </h1>

            <p className="text-base sm:text-xl text-slate-200 font-medium mb-8 leading-relaxed max-w-2xl border-l-4 border-[#F8A41E] pl-4">
              {tour.tagline || tour.overview?.substring(0, 120) + '...'}
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
                  Starting From
                </span>
                <span className="text-3xl font-black text-white">CAD ${tour.price}</span>
              </div>
              <button
                type="button"
                onClick={scrollToBooking}
                className="bg-[#D91E1E] hover:bg-[#b01818] text-white px-8 py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-red-900/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Book Your Tour Today
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. QUICK FACTS BAR */}
      <section
        aria-labelledby="quick-facts-heading"
        className="bg-white border-b border-slate-200 shadow-sm relative z-20"
      >
        <h2 id="quick-facts-heading" className="sr-only">
          Tour Quick Specifications
        </h2>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center py-6 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#125D66]" aria-hidden="true">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</p>
                <p className="font-bold text-[#0C3136] text-sm">{tour.duration || "Flexible"}</p>
              </div>
            </div>

            <div className="hidden md:block w-px h-10 bg-slate-100" aria-hidden="true" />

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#125D66]" aria-hidden="true">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Season</p>
                <p className="font-bold text-[#0C3136] text-sm">Year-Round Operation</p>
              </div>
            </div>

            <div className="hidden lg:block w-px h-10 bg-slate-100" aria-hidden="true" />

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#125D66]" aria-hidden="true">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hotel Pickup</p>
                <p className="font-bold text-[#0C3136] text-sm">Toronto &amp; GTA Included</p>
              </div>
            </div>

            <div className="hidden xl:block w-px h-10 bg-slate-100" aria-hidden="true" />

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#125D66]" aria-hidden="true">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Passport</p>
                <p className="font-bold text-[#0C3136] text-sm">Domestic Tour (Not Req.)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT AND BOOKING SIDEBAR GRID */}
      <div className="container mx-auto px-4 py-16 grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-16">
        
        {/* LEFT COLUMN: DETAILED SECTIONS */}
        <div className="xl:col-span-8 space-y-16">
          {/* Overview */}
          <section aria-labelledby="tour-overview-heading">
            <h2 id="tour-overview-heading" className="text-3xl font-black text-[#0C3136] mb-6 flex items-center gap-3">
              <Compass className="text-[#F8A41E] w-7 h-7" aria-hidden="true" />
              <span>Tour Overview</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-medium bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
              {tour.overview}
            </p>
          </section>

          {/* Inclusions & Exclusions */}
          <section aria-labelledby="tour-inclusions-heading" className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <h2 id="tour-inclusions-heading" className="sr-only">
              Inclusions and Exclusions
            </h2>
            <div className="bg-emerald-50/60 p-8 rounded-[2rem] border border-emerald-100 h-full">
              <h3 className="text-xl font-black text-[#0C3136] mb-6 flex items-center gap-3">
                <CheckCircle2 className="text-emerald-500 w-6 h-6" aria-hidden="true" />
                <span>What&apos;s Included</span>
              </h3>
              <ul className="space-y-4">
                {(tour.inclusions || []).map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-700 font-bold items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50/60 p-8 rounded-[2rem] border border-red-100 h-full">
              <h3 className="text-xl font-black text-[#0C3136] mb-6 flex items-center gap-3">
                <XCircle className="text-red-500 w-6 h-6" aria-hidden="true" />
                <span>Exclusions</span>
              </h3>
              <ul className="space-y-4">
                {(tour.exclusions || []).map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-700 font-bold items-start">
                    <Ban className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Highlights */}
          {tour.highlights && tour.highlights.length > 0 && (
            <section aria-labelledby="tour-highlights-heading">
              <h2 id="tour-highlights-heading" className="text-3xl font-black text-[#0C3136] mb-8">
                Tour Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tour.highlights.map((h, i) => {
                  const Icon = typeof h.i === 'string' ? (ICON_MAP[h.i] || Star) : (h.i || Star);
                  return (
                    <article
                      key={i}
                      className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center hover:border-[#F8A41E] transition-all"
                    >
                      <div className="bg-[#0C3136]/5 text-[#125D66] p-4 rounded-2xl mb-5" aria-hidden="true">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-black text-sm text-[#0C3136] mb-2">{h.t}</h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{h.d}</p>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {/* Itinerary */}
          <section aria-labelledby="tour-itinerary-heading" className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 id="tour-itinerary-heading" className="text-3xl font-black text-[#0C3136] mb-10 flex items-center gap-3">
              <Navigation className="text-[#F8A41E] w-7 h-7" aria-hidden="true" />
              <span>Step-by-Step Itinerary</span>
            </h2>
            <ol className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-slate-100 list-none p-0">
              {(tour.itinerary || []).map((item, i) => (
                <li key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#F8A41E] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"
                    aria-hidden="true"
                  >
                    <span className="font-black text-xs">{i + 1}</span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-50 p-6 rounded-2xl border border-slate-100 text-sm font-bold text-slate-700">
                    {item}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Pickup & Meeting Points */}
          <section aria-labelledby="tour-pickup-heading">
            <h2 id="tour-pickup-heading" className="text-3xl font-black text-[#0C3136] mb-8 flex items-center gap-3">
              <MapPin className="text-[#F8A41E] w-7 h-7" aria-hidden="true" />
              <span>Pickup &amp; Meeting Points</span>
            </h2>
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 space-y-4">
                  <p className="text-sm text-slate-500 font-bold mb-6">
                    We offer complimentary pickup from central locations across Downtown Toronto and Mississauga.
                  </p>
                  {PICKUP_POINTS &&
                    PICKUP_POINTS.slice(0, 4).map((point, i) => (
                      <div key={i} className="flex flex-col justify-between p-4 bg-slate-50 rounded-2xl">
                        <h3 className="font-black text-[#0C3136] text-sm">{point.name}</h3>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-slate-500 font-medium">{point.sub}</span>
                          <span className="bg-[#0C3136] text-[#F8A41E] px-3 py-1 rounded-md text-[10px] font-black">
                            {point.time}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="bg-slate-200 min-h-[300px] h-full relative z-0">
                  {PICKUP_POINTS && <StaticPointsMap points={PICKUP_POINTS} />}
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Table */}
          <section aria-labelledby="tour-pricing-heading">
            <h2 id="tour-pricing-heading" className="text-3xl font-black text-[#0C3136] mb-8 flex items-center gap-3">
              <Ticket className="text-[#F8A41E] w-7 h-7" aria-hidden="true" />
              <span>Pricing Breakdown</span>
            </h2>
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <caption className="sr-only">Detailed passenger pricing table for {tour.title}</caption>
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                    <th scope="col" className="p-6">Passenger Type</th>
                    <th scope="col" className="p-6">Age Group</th>
                    <th scope="col" className="p-6 text-right">Price (CAD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm font-bold text-[#0C3136]">
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 flex items-center gap-3">
                      <Users className="w-5 h-5 text-slate-400" aria-hidden="true" />
                      <span>Adult</span>
                    </td>
                    <td className="p-6 text-slate-500">13+ Years</td>
                    <td className="p-6 text-right text-lg">${tour.price}.00</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 flex items-center gap-3">
                      <Users className="w-5 h-5 text-slate-400 scale-75" aria-hidden="true" />
                      <span>Child</span>
                    </td>
                    <td className="p-6 text-slate-500">2 - 12 Years</td>
                    <td className="p-6 text-right text-lg">${Math.max((tour.price || 0) - 10, 0)}.00</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 flex items-center gap-3">
                      <Baby className="w-5 h-5 text-slate-400" aria-hidden="true" />
                      <span>Infant (Lap Child)</span>
                    </td>
                    <td className="p-6 text-slate-500">Under 2 Years</td>
                    <td className="p-6 text-right text-emerald-600 font-black uppercase tracking-widest text-[10px]">
                      Free
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Tour Specific Reviews */}
          {tourReviews.length > 0 && (
            <section aria-labelledby="tour-reviews-heading">
              <h2 id="tour-reviews-heading" className="text-3xl font-black text-[#0C3136] mb-8 flex items-center gap-3">
                <Star className="text-[#F8A41E] w-7 h-7 fill-current" aria-hidden="true" />
                <span>Guest Experiences on this Tour</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tourReviews.map((r) => (
                  <article key={r.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex gap-1 text-[#F8A41E] mb-3" aria-label={`Rated ${r.rating} out of 5 stars`}>
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className={`w-4 h-4 ${idx < r.rating ? 'fill-current' : 'text-slate-200'}`} aria-hidden="true" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 italic mb-4 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                    <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-50 pt-3">
                      <span>{r.name}</span>
                      <span>{r.date}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* RIGHT COLUMN: BOOKING STICKY ASIDE */}
        <aside aria-labelledby="booking-aside-heading" className="xl:col-span-4" id="booking-card">
          <div className="sticky top-28 space-y-10">
            <div className="bg-white rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-slate-100">
              <div className="bg-gradient-to-br from-[#0C3136] to-[#125D66] px-8 py-8 text-white relative rounded-t-[2rem] overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8 blur-xl" aria-hidden="true" />
                <h2 id="booking-aside-heading" className="text-xs font-black uppercase tracking-[0.2em] mb-6 leading-tight relative z-10">
                  Book Your Experience
                </h2>
                <div className="space-y-0.5 relative z-10">
                  <p className="text-[9px] font-black uppercase text-slate-300 tracking-[0.2em]">
                    Starting From
                  </p>
                  <p className="text-[36px] font-black text-[#F8A41E] tracking-tighter leading-none flex items-baseline gap-2">
                    CAD ${tour.price}{' '}
                    <span className="text-[10px] font-black text-white/90 tracking-normal italic leading-none">
                      / person
                    </span>
                  </p>
                </div>
              </div>

              <div className="p-8 space-y-6 bg-white relative rounded-b-[2rem]">
                <div ref={calendarRef} className="relative">
                  <label htmlFor="select-tour-date-btn" className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5 block">
                    1. Select Tour Date
                  </label>
                  <button
                    id="select-tour-date-btn"
                    type="button"
                    aria-expanded={showCalendar}
                    aria-label={`Select tour date, currently ${selectedDate || "Choose Date"}`}
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full flex items-center justify-between border border-slate-200 p-3.5 rounded-xl bg-white hover:border-[#F8A41E] cursor-pointer transition-all shadow-sm relative z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8A41E]"
                  >
                    <div className="flex items-center gap-3 font-bold text-slate-600 text-sm">
                      <Calendar className="w-4 h-4 text-[#F8A41E]" aria-hidden="true" />
                      <span>{selectedDate || "Choose Date"}</span>
                    </div>
                    <ChevronLeft
                      className={`w-4 h-4 -rotate-90 text-slate-400 transition-transform ${showCalendar ? 'rotate-[90deg]' : ''}`}
                      aria-hidden="true"
                    />
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

                <Link
                  href={`/checkout/${tour.id}?date=${
                    selectedDate
                      ? encodeURIComponent(selectedDate)
                      : encodeURIComponent(new Date().toLocaleDateString())
                  }`}
                  aria-label={`Proceed to checkout for ${tour.title}`}
                  className="block w-full text-center bg-[#D91E1E] hover:bg-[#b01818] text-white py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.3em] shadow-lg shadow-red-900/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D91E1E]"
                >
                  CHECK AVAILABILITY
                </Link>

                <div className="pt-2 border-t border-slate-100 text-center">
                  <p className="text-[10px] font-bold text-slate-400 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                    <span>Free cancellation up to 24 hours prior</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </article>
  );
}
