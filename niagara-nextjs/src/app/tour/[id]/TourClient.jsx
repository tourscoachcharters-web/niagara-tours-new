"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import CalendarDropdown from "@/components/CalendarDropdown";
import TourCard from "@/components/TourCard";
import { PICKUP_POINTS, REVIEWS_DATA } from "@/data/tours"; 
import { 
  ChevronLeft, Clock, Sun, MapPin, ShieldCheck, Compass, CheckCircle2, 
  CheckCircle, XCircle, Ban, Navigation, Ticket, Users, Baby, Calendar, Star,
  Wind, Camera, Grape, Globe, Map as MapIcon, Zap, Utensils, Plane,
  Ship, Info, Phone, ArrowRight, Sparkles, Award, Check, Bus,
  ExternalLink, ChevronRight, Train, AlertCircle
} from 'lucide-react';

const ICON_MAP = {
  Users,
  Navigation,
  Camera,
  Clock,
  Zap,
  Bus,
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
  Ship,
};

const StaticPointsMap = dynamic(
  () => import('@/components/DynamicMap').then((mod) => mod.StaticPointsMap),
  { ssr: false, loading: () => <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center font-bold text-slate-400">Loading Map...</div> }
);

const ENRICHED_PICKUP_METADATA = {
  0: {
    station: "Museum Station (TTC Line 1)",
    landmark: "Queen's Park Crystal Entrance",
    boardingNote: "Wait curbside at the main glass crystal entrance doors facing Queen's Park.",
    mapQuery: "Royal Ontario Museum, 100 Queens Park, Toronto"
  },
  1: {
    station: "College Station (TTC Line 1 - 2 min walk)",
    landmark: "Yonge & Carlton Street",
    boardingNote: "Wait at the main hotel driveway loading zone on Carlton Street.",
    mapQuery: "Holiday Inn Toronto Downtown Centre, 30 Carlton St, Toronto"
  },
  2: {
    station: "Dundas or College Station (TTC Line 1)",
    landmark: "Gerrard & Bay Street",
    boardingNote: "Wait directly outside the main Gerrard Street hotel entrance and revolving doors.",
    mapQuery: "Chelsea Hotel Toronto, 33 Gerrard St W, Toronto"
  },
  3: {
    station: "Osgoode or Queen Station (TTC Line 1)",
    landmark: "Opposite Nathan Phillips Square / City Hall",
    boardingNote: "Meet at the dedicated motorcoach bay and valet entrance along Queen Street West.",
    mapQuery: "Sheraton Centre Toronto Hotel, 123 Queen St W, Toronto"
  },
  4: {
    station: "Union Station (Subway Line 1, GO Transit, UP Express)",
    landmark: "South Bremner Blvd / Scotiabank Arena",
    boardingNote: "Meet outside the South Concourse glass doors on Bremner Blvd near Longo's.",
    mapQuery: "Maple Leaf Square, 15 York St, Toronto"
  }
};

const parseItineraryStep = (stepText, index, totalSteps) => {
  let title = '';
  let description = '';

  if (stepText.includes(':')) {
    const colonIndex = stepText.indexOf(':');
    title = stepText.slice(0, colonIndex).trim();
    description = stepText.slice(colonIndex + 1).trim();
  } else {
    title = stepText;
    description = '';
  }

  const lower = (title + ' ' + description).toLowerCase();
  let icon = Navigation;
  let categoryBadge = 'Scenic Stop';
  let badgeColor = 'bg-slate-100 text-slate-700';

  if (index === 0 || lower.includes('pickup') || lower.includes('departure')) {
    icon = Bus;
    categoryBadge = 'Departure & Boarding';
    badgeColor = 'bg-amber-100 text-amber-800';
  } else if (index === totalSteps - 1 || lower.includes('return') || lower.includes('drop-off')) {
    icon = CheckCircle2;
    categoryBadge = 'Safe Return';
    badgeColor = 'bg-emerald-100 text-emerald-800';
  } else if (lower.includes('boat') || lower.includes('cruise') || lower.includes('voyage') || lower.includes('mist')) {
    icon = Ship;
    categoryBadge = 'Featured Highlight';
    badgeColor = 'bg-cyan-100 text-cyan-800';
  } else if (lower.includes('skylon') || lower.includes('tower') || lower.includes('behind the falls') || lower.includes('journey')) {
    icon = Sparkles;
    categoryBadge = 'Included Admission';
    badgeColor = 'bg-purple-100 text-purple-800';
  } else if (lower.includes('wine') || lower.includes('tasting') || lower.includes('lunch') || lower.includes('syrup')) {
    icon = Utensils;
    categoryBadge = 'Culinary & Tasting';
    badgeColor = 'bg-rose-100 text-rose-800';
  } else if (lower.includes('clifton') || lower.includes('niagara-on-the-lake') || lower.includes('free time') || lower.includes('independent')) {
    icon = Compass;
    categoryBadge = 'Free Exploration';
    badgeColor = 'bg-blue-100 text-blue-800';
  } else if (lower.includes('whirlpool') || lower.includes('rapids') || lower.includes('clock') || lower.includes('photo') || lower.includes('gorge')) {
    icon = Camera;
    categoryBadge = 'Scenic Photo Stop';
    badgeColor = 'bg-teal-100 text-teal-800';
  }

  return { title, description, icon, categoryBadge, badgeColor };
};

export default function TourClient({ tour, relatedTours = [] }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedHub, setSelectedHub] = useState(0);
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

  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToBooking = (e) => {
    e.preventDefault();
    const element = document.getElementById('booking-card');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!tour) return null;

  const childPrice = Math.max((tour.price || 0) - 10, 0);
  const subtotal = (adults * tour.price) + (children * childPrice);

  // Gallery secondary photos
  const secondaryPhotos = [
    tour.img || '/images/hero-home.jpg',
    '/images/tour-classic.jpg',
    '/images/tour-evening.jpg',
  ];

  return (
    <article aria-labelledby="tour-detail-heading" className="animate-in fade-in duration-700 bg-[#F8FAFC]">
      
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & BREADCRUMBS                                               */}
      {/* ========================================================================= */}
      <section className="bg-white border-b border-slate-100 pt-6 pb-6">
        <div className="container mx-auto px-4">
          
          {/* Breadcrumb row */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <li>
                <Link href="/" className="hover:text-[#F8A41E] transition-colors focus-visible:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/tours" className="hover:text-[#F8A41E] transition-colors focus-visible:underline">
                  Tours
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#0C3136] font-black truncate max-w-[280px] sm:max-w-none" aria-current="page">
                {tour.title}
              </li>
            </ol>
          </nav>

          {/* Title and Key Badges */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                <span className="bg-[#D91E1E] text-white text-[10px] font-black uppercase tracking-[0.2em] px-3.5 py-1 rounded-full shadow-sm">
                  {tour.tag || 'FEATURED TOUR'}
                </span>
                <span className="bg-[#0C3136]/5 text-[#125D66] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                  Small Group Tour
                </span>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
                  <Check className="w-3 h-3" aria-hidden="true" /> Instant Confirmation
                </span>
              </div>

              <h1
                id="tour-detail-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0C3136] tracking-tight"
              >
                {tour.title}
              </h1>
            </div>

            {/* Quick Rating & Pricing Pill */}
            <div className="flex items-center gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 shrink-0">
              <div className="text-right">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Starting From</p>
                <p className="text-2xl sm:text-3xl font-black text-[#0C3136]">
                  CAD ${tour.price} <span className="text-xs text-slate-500 font-normal">/ person</span>
                </p>
              </div>
              <button
                type="button"
                onClick={scrollToBooking}
                className="bg-[#D91E1E] hover:bg-[#b01818] text-white px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-md active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D91E1E]"
              >
                BOOK NOW
              </button>
            </div>
          </div>

          {/* Social Proof & Quick Meta row */}
          <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-bold text-slate-500 border-t border-slate-100 mt-4">
            <div className="flex items-center gap-1.5 text-[#0C3136]">
              <div className="flex text-[#F8A41E]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                ))}
              </div>
              <span className="font-black text-sm">4.9</span>
              <span className="text-slate-400">(320+ Reviews)</span>
            </div>

            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#125D66]" aria-hidden="true" />
              <span>Toronto &amp; Niagara Falls, ON</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#125D66]" aria-hidden="true" />
              <span>{tour.duration}</span>
            </div>

            <div className="flex items-center gap-1.5 text-emerald-600">
              <ShieldCheck className="w-4 h-4 text-emerald-500" aria-hidden="true" />
              <span>Free cancellation up to 24h before departure</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. PHOTO GALLERY MOSAIC                                                   */}
      {/* ========================================================================= */}
      <section aria-label="Tour Photo Gallery" className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[380px] sm:h-[480px] rounded-3xl overflow-hidden shadow-xl">
          
          {/* Main Large Photo (7 Cols) */}
          <div className="lg:col-span-8 relative h-full group overflow-hidden">
            <Image
              src={secondaryPhotos[0]}
              alt={`${tour.title} primary view`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-4 left-4 bg-[#0C3136]/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider">
              {tour.tagline || 'Niagara Falls Premier Experience'}
            </div>
          </div>

          {/* Right Stacked Photos (4 Cols) */}
          <div className="lg:col-span-4 hidden lg:grid grid-rows-2 gap-4 h-full">
            <div className="relative h-full rounded-2xl overflow-hidden group">
              <Image
                src={secondaryPhotos[1]}
                alt="Niagara Falls boat cruise perspective"
                fill
                sizes="33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            <div className="relative h-full rounded-2xl overflow-hidden group">
              <Image
                src={secondaryPhotos[2]}
                alt="Scenic viewpoint over Niagara River"
                fill
                sizes="33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-[#0C3136] px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#F8A41E]" aria-hidden="true" />
                <span>Verified Tour Photos</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. STICKY IN-PAGE SECTION NAVIGATION                                     */}
      {/* ========================================================================= */}
      <nav
        aria-label="Tour Details Sections"
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-y border-slate-200 shadow-sm transition-all"
      >
        <div className="container mx-auto px-4 flex justify-between items-center py-2">
          
          {/* Scroll Navigation Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'inclusions', label: "What's Included" },
              { id: 'highlights', label: 'Highlights' },
              { id: 'itinerary', label: 'Itinerary' },
              { id: 'pickups', label: 'Meeting Points' },
              { id: 'pricing', label: 'Pricing' },
              { id: 'reviews', label: 'Reviews' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => scrollToSection(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8A41E] ${
                  activeTab === tab.id
                    ? 'bg-[#0C3136] text-white shadow-md'
                    : 'text-slate-600 hover:text-[#0C3136] hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Right CTA */}
          <div className="hidden sm:flex items-center gap-4 pl-4 shrink-0">
            <div>
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-widest leading-none">From</span>
              <span className="font-black text-lg text-[#0C3136]">CAD ${tour.price}</span>
            </div>
            <button
              type="button"
              onClick={scrollToBooking}
              className="bg-[#D91E1E] hover:bg-[#b01818] text-white px-5 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-md transition-all active:scale-95"
            >
              RESERVE
            </button>
          </div>

        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 4. MAIN DETAILS & STICKY BOOKING GRID                                     */}
      {/* ========================================================================= */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-16">
        
        {/* LEFT COLUMN: DETAILED SECTIONS */}
        <div className="xl:col-span-8 space-y-16">
          
          {/* Quick Specs Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3.5 p-2">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#F8A41E] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Duration</p>
                <p className="font-black text-sm text-[#0C3136]">{tour.duration || '9 Hours'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-2">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Group Size</p>
                <p className="font-black text-sm text-[#0C3136]">Max 25 Guests</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Globe className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Live Guide</p>
                <p className="font-black text-sm text-[#0C3136]">English Expert</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-2">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Bus className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Transport</p>
                <p className="font-black text-sm text-[#0C3136]">A/C Executive Coach</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-2">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                <Ticket className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Admission</p>
                <p className="font-black text-sm text-[#0C3136]">All Passes Included</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-2">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-wider">Cancellation</p>
                <p className="font-black text-sm text-[#0C3136]">100% Refundable</p>
              </div>
            </div>
          </div>

          {/* SECTION: Overview */}
          <section id="overview" aria-labelledby="tour-overview-heading" className="space-y-6">
            <h2 id="tour-overview-heading" className="text-2xl sm:text-3xl font-black text-[#0C3136] flex items-center gap-3">
              <Compass className="text-[#F8A41E] w-7 h-7" aria-hidden="true" />
              <span>Tour Overview</span>
            </h2>

            <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
              <p className="text-lg sm:text-xl font-bold text-[#125D66] border-l-4 border-[#F8A41E] pl-4 leading-relaxed">
                {tour.tagline || 'Experience the complete Niagara Falls journey from above, behind, and deep inside the mist.'}
              </p>

              <p className="text-slate-600 text-base leading-relaxed font-medium">
                {tour.overview}
              </p>

              {tour.idealFor && (
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Perfect For:</span>
                  <span className="text-xs font-bold text-[#0C3136] bg-slate-50 px-3 py-1.5 rounded-lg">
                    {tour.idealFor}
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* SECTION: What's Included & Excluded */}
          <section id="inclusions" aria-labelledby="inclusions-heading" className="space-y-6">
            <h2 id="inclusions-heading" className="text-2xl sm:text-3xl font-black text-[#0C3136] flex items-center gap-3">
              <CheckCircle2 className="text-emerald-500 w-7 h-7" aria-hidden="true" />
              <span>What&apos;s Included &amp; Excluded</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Inclusions */}
              <div className="bg-emerald-50/60 p-8 rounded-[2rem] border border-emerald-100 shadow-sm">
                <h3 className="text-lg font-black text-emerald-950 mb-5 flex items-center gap-2">
                  <CheckCircle className="text-emerald-600 w-5 h-5" aria-hidden="true" />
                  <span>Included in Your Ticket</span>
                </h3>
                <ul className="space-y-3.5">
                  {(tour.inclusions || []).map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-700 font-bold items-start">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="bg-red-50/60 p-8 rounded-[2rem] border border-red-100 shadow-sm">
                <h3 className="text-lg font-black text-rose-950 mb-5 flex items-center gap-2">
                  <XCircle className="text-rose-500 w-5 h-5" aria-hidden="true" />
                  <span>Not Included</span>
                </h3>
                <ul className="space-y-3.5">
                  {(tour.exclusions || []).map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-600 font-medium items-start">
                      <Ban className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </section>

          {/* SECTION: Highlights */}
          {tour.highlights && tour.highlights.length > 0 && (
            <section id="highlights" aria-labelledby="highlights-heading" className="space-y-6">
              <h2 id="highlights-heading" className="text-2xl sm:text-3xl font-black text-[#0C3136] flex items-center gap-3">
                <Sparkles className="text-[#F8A41E] w-7 h-7" aria-hidden="true" />
                <span>Tour Highlights</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tour.highlights.map((h, i) => {
                  const Icon = typeof h.i === 'string' ? (ICON_MAP[h.i] || Star) : (h.i || Star);
                  return (
                    <article
                      key={i}
                      className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg hover:border-[#F8A41E] transition-all flex flex-col items-start group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-[#0C3136]/5 text-[#125D66] group-hover:bg-[#125D66] group-hover:text-white flex items-center justify-center mb-5 transition-colors">
                        <Icon className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <h3 className="font-black text-base text-[#0C3136] mb-2">
                        {h.t}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        {h.d}
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {/* SECTION: Step-by-Step Itinerary */}
          <section id="itinerary" aria-labelledby="itinerary-heading" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#F8A41E] bg-[#0C3136] px-3.5 py-1.5 rounded-full inline-block mb-3">
                  CURATED TIMELINE
                </span>
                <h2 id="itinerary-heading" className="text-2xl sm:text-3xl font-black text-[#0C3136] flex items-center gap-3">
                  <Navigation className="text-[#F8A41E] w-7 h-7" aria-hidden="true" />
                  <span>Full Day Itinerary</span>
                </h2>
                <p className="text-sm text-slate-500 font-medium mt-1 max-w-xl">
                  Designed for maximum scenic immersion with priority admission, zero rush, and balanced free exploration time.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-bold border border-slate-200">
                  <Clock className="w-3.5 h-3.5 text-[#F8A41E]" aria-hidden="true" />
                  <span>{tour.itinerary?.length || 6} Curated Stops</span>
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-bold border border-slate-200">
                  <Sparkles className="w-3.5 h-3.5 text-[#F8A41E]" aria-hidden="true" />
                  <span>Skip-the-Line Entry</span>
                </span>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-10 md:p-12 rounded-[2.5rem] border border-slate-200/80 shadow-md">
              <ol className="relative border-l-2 border-slate-100 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8 list-none m-0 p-0">
                {(tour.itinerary || []).map((step, i) => {
                  const stepData = parseItineraryStep(step, i, (tour.itinerary || []).length);
                  const StepIcon = stepData.icon;

                  return (
                    <li key={i} className="relative group">
                      <div
                        className="absolute -left-[35px] sm:-left-[43px] top-1.5 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-[#0C3136] text-[#F8A41E] border-4 border-white shadow-md font-black text-xs sm:text-sm group-hover:scale-110 group-hover:bg-[#F8A41E] group-hover:text-[#0C3136] transition-all duration-300 z-10"
                        aria-hidden="true"
                      >
                        {i + 1}
                      </div>

                      <div className="bg-slate-50/80 hover:bg-white p-5 sm:p-7 rounded-3xl border border-slate-200/70 hover:border-[#F8A41E]/40 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-2.5">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${stepData.badgeColor}`}>
                              {stepData.categoryBadge}
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                              Stage 0{i + 1}
                            </span>
                          </div>

                          <div className="w-8 h-8 rounded-xl bg-white text-[#0C3136] flex items-center justify-center shadow-xs border border-slate-200/60 group-hover:text-[#F8A41E] transition-colors">
                            <StepIcon className="w-4 h-4" aria-hidden="true" />
                          </div>
                        </div>

                        <h3 className="font-black text-base sm:text-lg text-[#0C3136] tracking-tight group-hover:text-[#F8A41E] transition-colors">
                          {stepData.title}
                        </h3>

                        {stepData.description && (
                          <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                            {stepData.description}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>

              {/* Day Preparation Highlights */}
              <div className="mt-10 p-6 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4">
                <div className="flex items-center gap-2.5 text-[#0C3136] font-black text-xs sm:text-sm uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#F8A41E]" aria-hidden="true" />
                  <span>What to Expect on Tour Day</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-xs">
                    <p className="font-black text-[#0C3136] mb-1">Comfortable Footwear</p>
                    <p className="text-slate-500 font-medium leading-relaxed">
                      Paved walking trails with elevators at all attractions. Flat walking shoes recommended.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-xs">
                    <p className="font-black text-[#0C3136] mb-1">Complimentary Poncho</p>
                    <p className="text-slate-500 font-medium leading-relaxed">
                      Provided free of charge for the Voyage to the Falls Boat Cruise and Journey Behind the Falls.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-xs">
                    <p className="font-black text-[#0C3136] mb-1">Onboard Power &amp; Wi-Fi</p>
                    <p className="text-slate-500 font-medium leading-relaxed">
                      USB charging outlets available at every seat on our executive touring coaches.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION: Meeting & Pickup Points */}
          <section id="pickups" aria-labelledby="pickups-heading" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#F8A41E] bg-[#0C3136] px-3.5 py-1.5 rounded-full inline-block mb-3">
                  DEPARTURE HUBS &amp; TRANSIT
                </span>
                <h2 id="pickups-heading" className="text-2xl sm:text-3xl font-black text-[#0C3136] flex items-center gap-3">
                  <MapPin className="text-[#F8A41E] w-7 h-7" aria-hidden="true" />
                  <span>Downtown Toronto Pickup Hubs</span>
                </h2>
                <p className="text-sm text-slate-500 font-medium mt-1 max-w-xl">
                  Board at any of our 5 central Toronto hotel &amp; transit hubs. Private door-to-door pickup is also available across the Greater Toronto Area.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-4 py-2 rounded-2xl text-xs font-bold shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
                <span>Complimentary Round-Trip Transit</span>
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-200/80 shadow-md overflow-hidden p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Interactive Hub List (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Select a Hub for Directions &amp; Boarding Details:
                    </p>
                    <span className="text-xs font-bold text-slate-500">
                      5 Central Stops
                    </span>
                  </div>

                  <div className="space-y-3">
                    {(PICKUP_POINTS || []).map((point, i) => {
                      const isSelected = selectedHub === i;
                      const meta = ENRICHED_PICKUP_METADATA[i] || {};
                      return (
                        <div
                          key={i}
                          role="button"
                          tabIndex={0}
                          onClick={() => setSelectedHub(i)}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedHub(i); }}
                          className={`w-full text-left p-4 sm:p-5 rounded-2xl sm:rounded-3xl transition-all cursor-pointer border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                            isSelected
                              ? 'bg-[#0C3136] text-white border-[#0C3136] shadow-lg ring-2 ring-[#F8A41E]/40 scale-[1.01]'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200/80'
                          }`}
                        >
                          <div className="flex items-start gap-3.5">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 font-black text-xs ${
                              isSelected ? 'bg-[#F8A41E] text-[#0C3136]' : 'bg-white text-[#0C3136] shadow-sm'
                            }`}>
                              {i + 1}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className={`font-black text-sm sm:text-base ${isSelected ? 'text-white' : 'text-[#0C3136]'}`}>
                                  {point.name}
                                </h3>
                                {isSelected && (
                                  <span className="bg-[#F8A41E] text-[#0C3136] text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                                    Active Hub
                                  </span>
                                )}
                              </div>
                              <p className={`text-xs mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                                {point.sub}
                              </p>
                              <div className="flex items-center gap-3 mt-2 text-[11px] font-medium">
                                <span className={`inline-flex items-center gap-1.5 ${isSelected ? 'text-[#F8A41E]' : 'text-[#0C3136]'}`}>
                                  <Train className="w-3.5 h-3.5" aria-hidden="true" />
                                  {meta.station || 'TTC Subway Station'}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                            <span className={`text-[10px] font-bold uppercase tracking-wider block ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                              Departure
                            </span>
                            <span className={`text-sm sm:text-base font-black px-3 py-1 rounded-xl ${
                              isSelected ? 'bg-[#F8A41E] text-[#0C3136]' : 'bg-white text-[#0C3136] shadow-sm border border-slate-200/60'
                            }`}>
                              {point.time}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Selected Hub Spotlight Box */}
                  {(() => {
                    const activePoint = (PICKUP_POINTS || [])[selectedHub] || (PICKUP_POINTS || [])[0];
                    const activeMeta = ENRICHED_PICKUP_METADATA[selectedHub] || ENRICHED_PICKUP_METADATA[0] || {};
                    if (!activePoint) return null;

                    return (
                      <div className="p-5 sm:p-6 rounded-3xl bg-amber-50/70 border border-amber-200/80 space-y-3 mt-4">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2 text-[#0C3136] font-black text-xs uppercase tracking-wider">
                            <Info className="w-4 h-4 text-[#F8A41E]" aria-hidden="true" />
                            <span>Boarding Details for {activePoint.name}</span>
                          </div>
                          <a
                            href={activeMeta.mapQuery ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeMeta.mapQuery)}` : `https://maps.google.com/?q=${encodeURIComponent(activePoint.name + ' Toronto')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-black text-[#0C3136] hover:text-[#D91E1E] bg-white px-3 py-1.5 rounded-xl border border-amber-200 shadow-sm transition-colors"
                          >
                            <span>Open in Google Maps</span>
                            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                          </a>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                          {activeMeta.boardingNote || "Please arrive 10 minutes prior to scheduled departure. Look for our executive motorcoach with the Niagara Travels logo in the passenger loading zone."}
                        </p>
                        <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between flex-wrap gap-2 text-[11px] text-slate-600 font-semibold">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#F8A41E]" aria-hidden="true" />
                            Arrive 10 minutes prior to {activePoint.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Train className="w-3.5 h-3.5 text-[#0C3136]" aria-hidden="true" />
                            {activeMeta.landmark || "Downtown Toronto"}
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Right Column: Dynamic Leaflet Map & Navigation (5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-4 h-full">
                  <div className="bg-slate-100 rounded-3xl border border-slate-200 overflow-hidden h-[420px] lg:h-[460px] relative shadow-inner z-0">
                    {PICKUP_POINTS && <StaticPointsMap points={PICKUP_POINTS} />}
                    
                    <div className="absolute top-4 left-4 right-4 z-[400] bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-md border border-slate-200/80 text-xs font-bold text-slate-700 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                        <span>Interactive Pickup Map</span>
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 font-black">
                        5 Downtown Pins
                      </span>
                    </div>

                    {(() => {
                      const activePoint = (PICKUP_POINTS || [])[selectedHub] || (PICKUP_POINTS || [])[0];
                      if (!activePoint) return null;
                      return (
                        <div className="absolute bottom-4 left-4 right-4 z-[400] bg-[#0C3136]/95 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-lg border border-white/10 text-xs flex items-center justify-between">
                          <div>
                            <p className="text-[10px] text-[#F8A41E] uppercase font-black tracking-wider">Selected Boarding Hub</p>
                            <p className="font-bold truncate max-w-[180px] sm:max-w-[220px]">{activePoint.name}</p>
                          </div>
                          <span className="bg-[#F8A41E] text-[#0C3136] px-2.5 py-1 rounded-lg font-black text-xs shrink-0">
                            {activePoint.time}
                          </span>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Airport & Custom Pickup Guarantee Card */}
                  <div className="bg-gradient-to-r from-[#0C3136] to-[#125D66] text-white p-6 rounded-3xl space-y-2.5 border border-slate-700 shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#F8A41E]">
                        Custom Location?
                      </span>
                      <Plane className="w-4 h-4 text-[#F8A41E]" aria-hidden="true" />
                    </div>
                    <h4 className="font-black text-sm text-white">
                      Staying Outside Downtown Toronto?
                    </h4>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      Door-to-door private pickup is available for Pearson Airport (YYZ), Mississauga, Oakville, and Markham.
                    </p>
                    <div className="pt-2 flex items-center justify-between flex-wrap gap-2">
                      <a
                        href="tel:14164443000"
                        className="text-xs font-black text-[#F8A41E] hover:underline flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>(416) 444-3000</span>
                      </a>
                      <Link
                        href="/custom-itinerary"
                        className="text-[10px] font-black uppercase tracking-wider bg-white text-[#0C3136] hover:bg-[#F8A41E] px-3.5 py-1.5 rounded-xl transition-all"
                      >
                        Request Custom Pickup &rarr;
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* SECTION: Pricing Breakdown */}
          <section id="pricing" aria-labelledby="pricing-heading" className="space-y-6">
            <h2 id="pricing-heading" className="text-2xl sm:text-3xl font-black text-[#0C3136] flex items-center gap-3">
              <Ticket className="text-[#F8A41E] w-7 h-7" aria-hidden="true" />
              <span>Transparent Passenger Pricing</span>
            </h2>

            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <caption className="sr-only">Detailed passenger ticket pricing table</caption>
                <thead>
                  <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                    <th scope="col" className="p-6">Category</th>
                    <th scope="col" className="p-6">Age Bracket</th>
                    <th scope="col" className="p-6 text-right">Price (CAD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-bold text-[#0C3136]">
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 flex items-center gap-3">
                      <Users className="w-5 h-5 text-slate-400" aria-hidden="true" />
                      <span>Adult Ticket</span>
                    </td>
                    <td className="p-6 text-slate-500 font-medium">Ages 13+</td>
                    <td className="p-6 text-right text-lg font-black">${tour.price}.00</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 flex items-center gap-3">
                      <Users className="w-5 h-5 text-slate-400 scale-75" aria-hidden="true" />
                      <span>Child Ticket</span>
                    </td>
                    <td className="p-6 text-slate-500 font-medium">Ages 2 - 12</td>
                    <td className="p-6 text-right text-lg font-black">${childPrice}.00</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 flex items-center gap-3">
                      <Baby className="w-5 h-5 text-slate-400" aria-hidden="true" />
                      <span>Infant (Lap Child)</span>
                    </td>
                    <td className="p-6 text-slate-500 font-medium">Under 2 Years</td>
                    <td className="p-6 text-right text-emerald-600 font-black uppercase tracking-widest text-xs">
                      Free (CAD $0.00)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION: Reviews */}
          <section id="reviews" aria-labelledby="reviews-heading" className="space-y-6">
            <h2 id="reviews-heading" className="text-2xl sm:text-3xl font-black text-[#0C3136] flex items-center gap-3">
              <Star className="text-[#F8A41E] w-7 h-7 fill-current" aria-hidden="true" />
              <span>Guest Reviews &amp; Ratings</span>
            </h2>

            {/* Scorecard Box */}
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <div className="text-5xl font-black text-[#0C3136] mb-1">4.9 / 5</div>
                <div className="flex text-[#F8A41E] justify-center sm:justify-start mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                  Based on 320+ verified traveler reviews
                </p>
              </div>

              <div className="flex flex-col gap-2 text-xs font-bold text-slate-600 w-full sm:w-auto">
                <div className="flex items-center gap-3">
                  <span className="w-20">Guide Quality</span>
                  <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[98%]" />
                  </div>
                  <span>4.9</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-20">Transport</span>
                  <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[96%]" />
                  </div>
                  <span>4.8</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-20">Value</span>
                  <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[99%]" />
                  </div>
                  <span>5.0</span>
                </div>
              </div>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(tourReviews.length > 0 ? tourReviews : REVIEWS_DATA.slice(0, 4)).map((r) => (
                <article key={r.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex text-[#F8A41E] mb-3">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className={`w-3.5 h-3.5 ${idx < r.rating ? 'fill-current' : 'text-slate-200'}`} aria-hidden="true" />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 italic leading-relaxed mb-4">
                      &ldquo;{r.text}&rdquo;
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest pt-3 border-t border-slate-50">
                    <span className="text-[#0C3136]">{r.name}</span>
                    <span>{r.date}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* SECTION: Related / Recommended Tours */}
          {relatedTours && relatedTours.length > 0 && (
            <section aria-labelledby="related-heading" className="space-y-6 pt-6 border-t border-slate-200">
              <h2 id="related-heading" className="text-2xl font-black text-[#0C3136]">
                You Might Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedTours.map((t) => (
                  <TourCard key={t.id} tour={t} />
                ))}
              </div>
            </section>
          )}

        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: STICKY BOOKING CARD WIDGET                                 */}
        {/* ========================================================================= */}
        <aside aria-labelledby="booking-aside-heading" className="xl:col-span-4" id="booking-card">
          <div className="sticky top-20 space-y-6">
            
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
              
              {/* Header Gradient Bay */}
              <div className="bg-gradient-to-br from-[#0C3136] via-[#103E44] to-[#125D66] px-8 py-8 text-white relative">
                <span className="text-[#F8A41E] text-[10px] font-black uppercase tracking-[0.3em] block mb-2">
                  BEST PRICE GUARANTEE
                </span>
                
                <h2 id="booking-aside-heading" className="text-xl font-black mb-4">
                  Select Date &amp; Passengers
                </h2>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-[#F8A41E]">
                    CAD ${tour.price}
                  </span>
                  <span className="text-xs text-slate-200 font-bold uppercase tracking-wider">
                    / person
                  </span>
                </div>
              </div>

              {/* Form Controls */}
              <div className="p-8 space-y-6">
                
                {/* Date Picker Button */}
                <div ref={calendarRef} className="relative">
                  <label htmlFor="select-tour-date-btn" className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                    1. Choose Travel Date
                  </label>
                  <button
                    id="select-tour-date-btn"
                    type="button"
                    aria-expanded={showCalendar}
                    aria-label={`Select tour date, currently ${selectedDate || "Choose Date"}`}
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full flex items-center justify-between border-2 border-slate-100 hover:border-[#F8A41E] p-4 rounded-2xl bg-white cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8A41E]"
                  >
                    <div className="flex items-center gap-3 font-bold text-slate-700 text-sm">
                      <Calendar className="w-5 h-5 text-[#F8A41E]" aria-hidden="true" />
                      <span>{selectedDate || "Select Date on Calendar"}</span>
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

                {/* Passenger Selector */}
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                    2. Select Passengers
                  </label>

                  {/* Adults */}
                  <div className="flex justify-between items-center py-1">
                    <div>
                      <p className="font-bold text-xs text-[#0C3136]">Adults (13+)</p>
                      <p className="text-[10px] text-slate-400">CAD ${tour.price}.00 each</p>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-50 p-1 rounded-xl border border-slate-100">
                      <button
                        type="button"
                        aria-label="Decrease adult tickets"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center font-bold text-slate-600 hover:text-black"
                      >
                        -
                      </button>
                      <span className="font-black text-sm w-4 text-center">{adults}</span>
                      <button
                        type="button"
                        aria-label="Increase adult tickets"
                        onClick={() => setAdults(adults + 1)}
                        className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center font-bold text-slate-600 hover:text-black"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex justify-between items-center py-1">
                    <div>
                      <p className="font-bold text-xs text-[#0C3136]">Children (2-12)</p>
                      <p className="text-[10px] text-slate-400">CAD ${childPrice}.00 each</p>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-50 p-1 rounded-xl border border-slate-100">
                      <button
                        type="button"
                        aria-label="Decrease child tickets"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center font-bold text-slate-600 hover:text-black"
                      >
                        -
                      </button>
                      <span className="font-black text-sm w-4 text-center">{children}</span>
                      <button
                        type="button"
                        aria-label="Increase child tickets"
                        onClick={() => setChildren(children + 1)}
                        className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center font-bold text-slate-600 hover:text-black"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subtotal Calculation Box */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>{adults} Adult{adults > 1 ? 's' : ''} {children > 0 ? `+ ${children} Child` : ''}</span>
                    <span className="text-[#0C3136] font-black">CAD ${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Taxes calculated at checkout</span>
                    <span className="text-emerald-600 font-bold">13% HST</span>
                  </div>
                </div>

                {/* Primary Booking Link */}
                <Link
                  href={`/checkout/${tour.id}?date=${
                    selectedDate
                      ? encodeURIComponent(selectedDate)
                      : encodeURIComponent(new Date().toLocaleDateString())
                  }&adults=${adults}&children=${children}`}
                  className="block w-full text-center bg-[#D91E1E] hover:bg-[#b01818] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.25em] shadow-xl shadow-red-900/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D91E1E]"
                >
                  RESERVE YOUR SPOTS
                </Link>

                {/* Reassurance list */}
                <div className="space-y-2.5 pt-2 text-center">
                  <p className="text-[10px] font-bold text-slate-500 flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                    <span>Free cancellation up to 24h prior to departure</span>
                  </p>
                  <p className="text-[10px] font-bold text-slate-500 flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#125D66]" aria-hidden="true" />
                    <span>Instant confirmation &amp; mobile e-tickets</span>
                  </p>
                </div>

                {/* Help Box */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-3 text-slate-600">
                  <Phone className="w-4 h-4 text-[#F8A41E]" aria-hidden="true" />
                  <span className="text-xs font-bold">Have questions?</span>
                  <a href="tel:14164443000" className="text-xs font-black text-[#0C3136] hover:underline">
                    (416) 444-3000
                  </a>
                </div>

              </div>
            </div>

          </div>
        </aside>

      </div>
    </article>
  );
}
