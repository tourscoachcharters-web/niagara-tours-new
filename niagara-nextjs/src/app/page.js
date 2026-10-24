import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getLiveTours } from '@/lib/firebase-utils';
import { REVIEWS_DATA } from '@/data/tours';
import HomeToursFilter from '@/components/HomeToursFilter';
import HomeQuickBook from '@/components/HomeQuickBook';
import HomeFaq from '@/components/HomeFaq';
import { getServiceSchema, JsonLd } from '@/lib/schema';
import { 
  Star, ChevronRight, Compass, Bus, Clock, Users, ShieldCheck, 
  Sparkles, CheckCircle2, Phone, MapPin, ArrowRight, Award, Zap,
  Ship, Wine, Camera, Heart
} from 'lucide-react';

export const revalidate = 3600;

export const metadata = {
  title: "Niagara Falls Tours from Toronto | Niagara Travels",
  description:
    "Award-winning guided tours to Niagara Falls departing daily from Downtown Toronto & the GTA. Experience the Voyage to the Falls boat cruise, winery tastings, and private VIP luxury charters.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Niagara Falls Tours from Toronto | Niagara Travels",
    description:
      "Unforgettable experiences, breathtaking views, and memories that last a lifetime. Book your Niagara Falls tour with local Canadian guides.",
    url: "https://www.niagaratravels.ca",
    images: [
      {
        url: "/images/hero-home.jpg",
        width: 1200,
        height: 630,
        alt: "Niagara Falls Panoramic View",
      },
    ],
  },
};

export default async function HomePage() {
  const tours = await getLiveTours();

  const homeServiceSchema = getServiceSchema({
    name: "Toronto to Niagara Falls Guided Tours",
    description:
      "Comprehensive day tours, evening illumination packages, and private VIP charters to Niagara Falls, Ontario.",
    url: "https://www.niagaratravels.ca",
  });

  // Best seller tour spotlight
  const featuredTour = tours.find(t => t.id === 'classic-day-escape') || tours[0];

  return (
    <>
      <JsonLd data={homeServiceSchema} />

      <div className="animate-in fade-in duration-700 bg-[#F8FAFC]">
        
        {/* ========================================================================= */}
        {/* 1. HERO SECTION: CINEMATIC SPLIT WITH FLOATING LIVE CARD                 */}
        {/* ========================================================================= */}
        <section
          aria-labelledby="hero-heading"
          className="relative z-40 pt-12 pb-24 lg:pt-20 lg:pb-36 flex items-center min-h-[660px]"
        >
          {/* Background Image with Cinematic Gradient Mask */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="/images/hero-home.jpg"
              alt="Majestic view of Niagara Falls with tour boat passing through mist"
              fill
              priority
              sizes="100vw"
              className="object-cover scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C3136]/95 via-[#0C3136]/80 to-[#0C3136]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C3136] via-transparent to-black/20" />
          </div>

          <div className="container mx-auto px-4 z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Headline & Value Propositions */}
              <header className="lg:col-span-7 text-white space-y-6">
                
                {/* Status Pill */}
                <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full shadow-lg">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#F8A41E]">
                    2026 Season Booking Active
                  </span>
                  <span className="text-white/40 font-bold" aria-hidden="true">•</span>
                  <span className="text-[11px] font-bold text-slate-200">
                    Daily Toronto Departures
                  </span>
                </div>

                {/* Primary Hero Title */}
                <h1
                  id="hero-heading"
                  className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight text-white drop-shadow-sm"
                >
                  Feel the Thunder of <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8A41E] via-amber-300 to-yellow-200 italic">
                    Niagara Falls
                  </span>
                </h1>

                {/* Subheading */}
                <p className="text-base sm:text-lg lg:text-xl text-slate-200 max-w-xl leading-relaxed font-medium">
                  Toronto&apos;s highest-rated guided sightseeing tours. Experience skip-the-line boat cruise admission, world-famous Niagara Icewine tastings, and personalized VIP service.
                </p>

                {/* Social Proof Bar */}
                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <div className="flex items-center gap-3 bg-[#0C3136]/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                    <div className="flex text-[#F8A41E]" aria-label="5 stars rating">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />
                      ))}
                    </div>
                    <div className="text-xs">
                      <strong className="font-black text-white">4.9 / 5</strong>
                      <span className="text-slate-300 ml-1">(1,500+ Reviews)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                    <span>Free Cancellation up to 24h</span>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <nav aria-label="Hero Action Links" className="flex flex-wrap gap-4 pt-4">
                  <Link
                    href="/tours"
                    className="bg-[#D91E1E] hover:bg-[#b01818] text-white px-9 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-900/40 hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <span>EXPLORE TOURS</span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </Link>

                  <Link
                    href="/custom-itinerary"
                    className="bg-white/10 hover:bg-white hover:text-[#0C3136] text-white border border-white/30 px-9 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all backdrop-blur-md shadow-lg flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8A41E]"
                  >
                    <Users className="w-4 h-4 text-[#F8A41E]" aria-hidden="true" />
                    <span>PRIVATE CHARTERS</span>
                  </Link>
                </nav>
              </header>

              {/* Right Column: Floating Feature Card */}
              <aside
                aria-label="Today's featured tour preview"
                className="lg:col-span-5 hidden lg:block"
              >
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[2.5rem] shadow-2xl text-white space-y-4">
                  <div className="relative h-60 w-full rounded-2xl overflow-hidden shadow-inner">
                    <Image
                      src="/images/tour-classic.jpg"
                      alt="Voyage to the Falls boat approaching Horseshoe Falls"
                      fill
                      sizes="400px"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#D91E1E] text-white text-[9px] font-black uppercase px-3 py-1 rounded-full shadow-md">
                      #1 MOST BOOKED TOUR
                    </div>
                    <div className="absolute bottom-3 right-3 bg-[#0C3136]/90 backdrop-blur-sm text-white text-xs font-black px-3 py-1.5 rounded-xl border border-white/20">
                      CAD $99 / person
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white mb-1">
                      Niagara Classic Day Escape
                    </h3>
                    <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                      Includes Voyage to the Falls boat cruise, Table Rock overlook, Whirlpool Rapids, and Niagara-on-the-Lake historic town.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-[10px] font-bold">
                    <div className="bg-white/5 p-2 rounded-xl">
                      <Clock className="w-4 h-4 mx-auto mb-1 text-[#F8A41E]" aria-hidden="true" />
                      <span>9-10 Hours</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded-xl">
                      <Ship className="w-4 h-4 mx-auto mb-1 text-[#F8A41E]" aria-hidden="true" />
                      <span>Boat Cruise</span>
                    </div>
                    <div className="bg-white/5 p-2 rounded-xl">
                      <MapPin className="w-4 h-4 mx-auto mb-1 text-[#F8A41E]" aria-hidden="true" />
                      <span>Toronto Pickup</span>
                    </div>
                  </div>

                  <Link
                    href="/tour/classic-day-escape"
                    className="block text-center bg-[#F8A41E] hover:bg-amber-400 text-[#0C3136] py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20"
                  >
                    VIEW THIS EXPERIENCE
                  </Link>
                </div>
              </aside>

            </div>

            {/* Overlapping Quick Search Bar */}
            <div className="mt-14 -mb-32 relative z-30">
              <HomeQuickBook />
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. TRUST PILLARS BAR                                                      */}
        {/* ========================================================================= */}
        <section
          aria-labelledby="trust-pillars-heading"
          className="container mx-auto px-4 pt-24 lg:pt-28 pb-16 relative z-20"
        >
          <h2 id="trust-pillars-heading" className="sr-only">
            Why Choose Niagara Travels
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Compass,
                title: 'Local Niagara Guides',
                desc: 'Born & raised Canadian guides sharing captivating history and hidden photo spots.',
                color: 'text-[#125D66]',
                bg: 'bg-[#125D66]/10',
              },
              {
                icon: Bus,
                title: 'Executive Climate Fleet',
                desc: 'Travel in luxury air-conditioned coaches and Mercedes Sprinters with free Wi-Fi.',
                color: 'text-[#D91E1E]',
                bg: 'bg-red-500/10',
              },
              {
                icon: Ship,
                title: 'Priority Boat Access',
                desc: 'Skip long ticket booth lines for the world-famous Voyage to the Falls cruise.',
                color: 'text-[#0369A1]',
                bg: 'bg-sky-500/10',
              },
              {
                icon: ShieldCheck,
                title: 'Zero-Risk Booking',
                desc: '100% full refund guarantee for cancellations made up to 24 hours prior to departure.',
                color: 'text-emerald-600',
                bg: 'bg-emerald-500/10',
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-3xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${pillar.bg} ${pillar.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                  aria-hidden="true"
                >
                  <pillar.icon className="w-7 h-7" />
                </div>
                <h3 className="font-black text-sm text-[#0C3136] uppercase tracking-wider mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SIGNATURE TOUR SPOTLIGHT: EDITORIAL BANNER                            */}
        {/* ========================================================================= */}
        <section aria-labelledby="spotlight-heading" className="py-16 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            
            <div className="bg-gradient-to-br from-[#0C3136] via-[#0F3D43] to-[#125D66] rounded-[3rem] p-8 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden">
              {/* Background ambient blurs */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#F8A41E]/15 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl -ml-24 -mb-24 pointer-events-none" aria-hidden="true" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                
                {/* Visual Image Showcase */}
                <div className="lg:col-span-6 relative">
                  <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border-4 border-white/20 shadow-2xl group">
                    <Image
                      src={featuredTour.img || '/images/tour-classic.jpg'}
                      alt={`${featuredTour.title} highlight photo`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <div className="absolute top-5 left-5 bg-[#D91E1E] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2">
                      <Award className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>MOST POPULAR CHOICE</span>
                    </div>

                    <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest">
                          Starting From
                        </p>
                        <p className="text-3xl font-black text-white">
                          CAD ${featuredTour.price}
                        </p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold text-white border border-white/20">
                        {featuredTour.duration}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content & Details */}
                <div className="lg:col-span-6 space-y-6">
                  <div>
                    <span className="text-[#F8A41E] font-black text-xs uppercase tracking-[0.4em] mb-2 block">
                      FEATURED EXPERIENCE
                    </span>
                    <h2 id="spotlight-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-white mb-4">
                      {featuredTour.title}
                    </h2>
                    <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
                      {featuredTour.overview}
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {[
                      { icon: Ship, label: 'Voyage to the Falls Cruise' },
                      { icon: MapPin, label: 'Table Rock & Horseshoe Falls' },
                      { icon: Wine, label: 'Niagara-on-the-Lake Visit' },
                      { icon: Bus, label: 'Toronto Hotel Pickup & Return' },
                    ].map((feat, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10">
                        <feat.icon className="w-4 h-4 text-[#F8A41E] shrink-0" aria-hidden="true" />
                        <span className="text-xs font-bold text-slate-100">{feat.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/tour/${featuredTour.id}`}
                      className="bg-[#D91E1E] hover:bg-[#b01818] text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-900/30 flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                      <span>BOOK THIS TOUR</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>

                    <Link
                      href="/tours"
                      className="text-slate-300 hover:text-white text-xs font-bold uppercase tracking-widest px-4 py-3 underline-offset-8 hover:underline"
                    >
                      Compare All Tours
                    </Link>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. CURATED TOURS SHOWCASE WITH INTERACTIVE FILTER PILLS                   */}
        {/* ========================================================================= */}
        <section id="tours-catalog" aria-labelledby="all-tours-heading" className="py-20 bg-[#F8FAFC]">
          <div className="container mx-auto px-4">
            
            <header className="text-center max-w-2xl mx-auto mb-14">
              <span className="bg-[#F8A41E] text-[#0C3136] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-4 inline-block shadow-md">
                Find Your Perfect Journey
              </span>
              <h2 id="all-tours-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0C3136] tracking-tight mb-4">
                Curated Niagara Tour Packages
              </h2>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                Choose from full-day classics, romantic evening illumination tours with fireworks, boutique winery tastings, and bespoke private charters.
              </p>
            </header>

            {/* Interactive Client-Side Filter + Grid */}
            <Suspense fallback={<div className="h-96 animate-pulse bg-slate-100 rounded-3xl" />}>
              <HomeToursFilter tours={tours} />
            </Suspense>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. VISUAL BENTO GRID: ICONIC NIAGARA MOMENTS                              */}
        {/* ========================================================================= */}
        <section aria-labelledby="moments-heading" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
              <div>
                <p className="text-[#D91E1E] font-black text-xs uppercase tracking-[0.3em] mb-2">
                  UNFORGETTABLE HIGHLIGHTS
                </p>
                <h2 id="moments-heading" className="text-3xl sm:text-4xl font-black text-[#0C3136] tracking-tight">
                  Iconic Moments Awaiting You
                </h2>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Included in select tour itineraries
              </p>
            </header>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Card 1: Large Featured Boat Cruise (7 cols) */}
              <div className="md:col-span-7 relative h-[380px] rounded-[2.5rem] overflow-hidden group shadow-lg border border-slate-100">
                <Image
                  src="/images/hero-home.jpg"
                  alt="Voyage to the Falls boat surrounded by Niagara mist"
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C3136]/90 via-[#0C3136]/30 to-transparent" />
                
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <span className="bg-[#125D66] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
                    The Main Attraction
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black mb-2 text-white">
                    Voyage to the Falls Boat Cruise
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-2 max-w-lg leading-relaxed">
                    Hear the thunderous roar and feel the refreshing mist of 6 million cubic feet of water cascading every minute right in front of you.
                  </p>
                </div>
              </div>

              {/* Card 2: Evening Illumination (5 cols) */}
              <div className="md:col-span-5 relative h-[380px] rounded-[2.5rem] overflow-hidden group shadow-lg border border-slate-100">
                <Image
                  src="/images/tour-evening.jpg"
                  alt="Niagara Falls illuminated at night with neon lights"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C3136]/90 via-[#0C3136]/30 to-transparent" />
                
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <span className="bg-[#6D28D9] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
                    Nightfall Spectacle
                  </span>
                  <h3 className="text-2xl font-black mb-2 text-white">
                    Evening Illumination &amp; Fireworks
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                    Watch Horseshoe and American Falls illuminate in vivid shifting colors against the starlit sky.
                  </p>
                </div>
              </div>

              {/* Card 3: Wine Country (5 cols) */}
              <div className="md:col-span-5 relative h-[340px] rounded-[2.5rem] overflow-hidden group shadow-lg border border-slate-100">
                <Image
                  src="/images/tour-wine.jpg"
                  alt="Vineyard estate and wine tasting in Niagara-on-the-Lake"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C3136]/90 via-[#0C3136]/30 to-transparent" />
                
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <span className="bg-[#9D174D] text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
                    Gourmet Tastings
                  </span>
                  <h3 className="text-2xl font-black mb-2 text-white">
                    Niagara-on-the-Lake Wine Country
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                    Sample world-renowned Canadian Icewine and estate varietals surrounded by historic 19th-century architecture.
                  </p>
                </div>
              </div>

              {/* Card 4: VIP Charters (7 cols) */}
              <div className="md:col-span-7 relative h-[340px] rounded-[2.5rem] overflow-hidden group shadow-lg border border-slate-100">
                <Image
                  src="/images/tour-vip.jpg"
                  alt="Private luxury Mercedes vehicle overlooking Niagara Parkway"
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C3136]/90 via-[#0C3136]/30 to-transparent" />
                
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <span className="bg-[#F8A41E] text-[#0C3136] text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block">
                    Exclusive Service
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black mb-2 text-white">
                    Private Custom VIP Charters
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-2 max-w-lg leading-relaxed">
                    Custom door-to-door luxury transport, your personal guide, and complete control over your sightseeing schedule.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. HOW YOUR DAY WORKS: VISUAL TIMELINE ROADMAP                           */}
        {/* ========================================================================= */}
        <section aria-labelledby="roadmap-heading" className="py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            
            <header className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[#F8A41E] font-black text-[10px] uppercase tracking-[0.3em] mb-3 block">
                SEAMLESS DAY TRIP ITINERARY
              </span>
              <h2 id="roadmap-heading" className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
                How Your Tour Day Unfolds
              </h2>
              <p className="text-slate-300 text-sm font-medium leading-relaxed">
                We handle every detail—from central Toronto pickup to front-row attraction access and scenic drives.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  time: '08:00 AM',
                  title: 'Toronto Hotel Pickup',
                  desc: 'Board your comfortable air-conditioned coach from central downtown Toronto pickup hubs.',
                  icon: Bus,
                },
                {
                  step: '02',
                  time: '10:15 AM',
                  title: 'Niagara Parkway & Whirlpool',
                  desc: 'Scenic drive along the Niagara River gorge with photo stops at Whirlpool Rapids and the Floral Clock.',
                  icon: Camera,
                },
                {
                  step: '03',
                  time: '11:45 AM',
                  title: 'Table Rock & Boat Cruise',
                  desc: 'Up-close encounter at Horseshoe Falls followed by priority admission to the Voyage to the Falls boat.',
                  icon: Ship,
                },
                {
                  step: '04',
                  time: '03:45 PM',
                  title: 'Wine Country & Return',
                  desc: 'Stroll through historic Niagara-on-the-Lake, sample Canadian wines, and relax on your drive back to Toronto.',
                  icon: Wine,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-3xl p-7 relative hover:bg-white/10 transition-colors group"
                >
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-3xl font-black text-[#F8A41E]">
                      {item.step}
                    </span>
                    <span className="text-[10px] font-black uppercase text-slate-400 bg-white/5 px-3 py-1 rounded-lg">
                      {item.time}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-[#125D66] text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="w-5 h-5" aria-hidden="true" />
                  </div>

                  <h3 className="text-base font-black text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. VERIFIED REVIEWS & RATINGS                                            */}
        {/* ========================================================================= */}
        <section aria-labelledby="reviews-heading" className="py-20 bg-[#F8FAFC]">
          <div className="container mx-auto px-4">
            
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-14 gap-6">
              <div>
                <span className="bg-[#D91E1E] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-3 inline-block">
                  Verified Traveler Feedback
                </span>
                <h2 id="reviews-heading" className="text-3xl sm:text-5xl font-black text-[#0C3136] tracking-tight">
                  Loved by Travelers Worldwide
                </h2>
              </div>

              {/* Overall Scorecard Pill */}
              <div className="bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-md flex items-center gap-4">
                <div className="text-3xl font-black text-[#F8A41E]">4.9</div>
                <div>
                  <div className="flex text-[#F8A41E]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider mt-0.5">
                    1,500+ Reviews
                  </p>
                </div>
              </div>
            </header>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {REVIEWS_DATA.slice(0, 3).map((review) => (
                <article
                  key={review.id}
                  className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="flex text-[#F8A41E] mb-4" aria-label={`Rated ${review.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>

                  <blockquote className="text-slate-600 text-sm leading-relaxed font-medium mb-6 flex-1 italic">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>

                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                    <div>
                      <h3 className="font-black text-[#0C3136]">{review.name}</h3>
                      <p className="text-[10px] text-slate-400 font-bold">{review.date}</p>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 text-[9px] font-black uppercase px-2.5 py-1 rounded-md">
                      Verified
                    </span>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/reviews"
                className="text-xs font-black text-[#125D66] hover:text-[#0C3136] uppercase tracking-widest inline-flex items-center gap-2 focus-visible:underline"
              >
                <span>Read All 1,500+ Guest Reviews</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. FREQUENTLY ASKED QUESTIONS ACCORDION                                  */}
        {/* ========================================================================= */}
        <section aria-labelledby="home-faq-heading" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            
            <header className="text-center max-w-xl mx-auto mb-12">
              <span className="text-[#125D66] font-black text-[10px] uppercase tracking-[0.3em] mb-2 block">
                GOT QUESTIONS?
              </span>
              <h2 id="home-faq-heading" className="text-3xl sm:text-4xl font-black text-[#0C3136] tracking-tight mb-3">
                Everything You Need to Know
              </h2>
              <p className="text-slate-500 text-sm font-medium">
                Common questions regarding pickups, weather, cruise tickets, and passports.
              </p>
            </header>

            <HomeFaq />

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. HIGH-CONVERTING FINAL CTA BANNER                                      */}
        {/* ========================================================================= */}
        <section aria-labelledby="cta-heading" className="py-20 bg-gradient-to-b from-white to-[#F0F9FF]">
          <div className="container mx-auto px-4">
            
            <div className="bg-[#0C3136] rounded-[3rem] p-10 sm:p-14 lg:p-20 text-white text-center relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 z-0 opacity-20">
                <Image
                  src="/images/hero-home.jpg"
                  alt="Niagara Falls background texture"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C3136] via-[#0C3136]/90 to-transparent" />

              <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                <span className="bg-[#F8A41E] text-[#0C3136] text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-[0.2em] inline-block shadow-lg">
                  READY FOR AN UNFORGETTABLE EXPERIENCE?
                </span>

                <h2 id="cta-heading" className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                  Reserve Your Niagara Falls Adventure Today
                </h2>

                <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto font-medium leading-relaxed">
                  Spaces on our signature tours sell out quickly during peak travel dates. Secure your seats now with zero risk—free cancellation up to 24 hours prior.
                </p>

                <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
                  <Link
                    href="/tours"
                    className="bg-[#D91E1E] hover:bg-[#b01818] text-white px-10 py-4.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-900/40 hover:scale-105 active:scale-95 flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <span>BROWSE TOURS &amp; DATES</span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </Link>

                  <a
                    href="tel:14164443000"
                    className="bg-white/10 hover:bg-white hover:text-[#0C3136] text-white border border-white/20 px-8 py-4.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-3 backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8A41E]"
                  >
                    <Phone className="w-4 h-4 text-[#F8A41E]" aria-hidden="true" />
                    <span>CALL (416) 444-3000</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </>
  );
}
