import React from 'react';
import Link from 'next/link';
import { getLiveTours } from '@/lib/firebase-utils';
import TourCard from "@/components/TourCard";
import { Star, ChevronRight, Compass, Bus, Clock, Users, Camera, ShieldCheck, Globe, Settings } from 'lucide-react';

export const dynamic = 'force-dynamic'; // <-- ADD THIS EXACT LINE

export default async function HomePage() {
  const tours = await getLiveTours();
  // ... rest of your code stays exactly the same

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative pt-8 pb-20 lg:pt-12 lg:pb-24 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/hero-home.jpg" alt="Niagara Falls Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C3136]/90 via-[#0C3136]/30 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#D91E1E] p-1.5 rounded-full shadow-lg"><Star className="w-3.5 h-3.5 text-white fill-current" /></span>
              <span className="uppercase text-[11px] font-black tracking-[0.2em]">PROUDLY CANADIAN</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-black mb-4 leading-[1.1] tracking-tight">
              Discover the <br /> Magic of <br /><span className="text-[#F8A41E] italic">Niagara Falls</span>
            </h2>
            <p className="text-base lg:text-lg text-slate-200 mb-8 max-w-xl leading-relaxed font-medium">Unforgettable experiences. Breathtaking views. Memories that last a lifetime.</p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/tours" className="bg-[#D91E1E] hover:bg-[#b01818] text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-900/30 flex items-center gap-3">
                EXPLORE TOURS <ChevronRight className="w-4 h-4" />
              </Link>
              <Link href="/custom-itinerary" className="bg-white hover:bg-slate-50 text-[#0C3136] px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-3">
                <Settings className="w-4 h-4 text-[#F8A41E]" /> CUSTOM PACKAGE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <section className="container mx-auto px-4 -mt-12 lg:-mt-16 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {[
            { icon: Compass, title: "Local Guides", desc: "Born and raised experts" },
            { icon: Bus, title: "Transport", desc: "Modern A/C vehicles" },
            { icon: Clock, title: "Flexible", desc: "Customize your schedule" },
            { icon: Star, title: "Top Rated", desc: "Thousands of reviews" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-8 group cursor-pointer hover:bg-slate-50 transition-colors rounded-2xl">
              <div className="bg-[#0C3136]/5 p-4 rounded-full text-[#125D66] group-hover:bg-[#F8A41E] group-hover:text-[#0C3136] transition-all"><item.icon className="w-6 h-6" /></div>
              <div><h4 className="font-black text-[11px] text-[#0C3136] uppercase tracking-wider">{item.title}</h4><p className="text-xs text-slate-500 font-medium">{item.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gradient-to-b from-white to-[#F0F9FF] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8">
            <div className="lg:col-span-3">
              <p className="text-[#D91E1E] font-black text-[10px] uppercase tracking-[0.3em] mb-4">Why Choose Us</p>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0C3136] leading-[1.1] mb-6">Experience Niagara Like Never Before</h2>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                We're local, passionate, and dedicated to showing you the very best of Niagara Falls with exceptional service and unforgettable moments.
              </p>
            </div>
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-4 bg-[#F8A41E]/10 rounded-[4rem] blur-2xl group-hover:bg-[#F8A41E]/20 transition-all"></div>
              <div className="relative aspect-[4/3] rounded-[3rem] lg:rounded-[4rem] overflow-hidden border-8 border-white shadow-2xl">
                <img src="/images/why-choose-us.jpg" alt="Niagara Falls Tour Group" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C3136]/40 to-transparent"></div>
              </div>
            </div>
            <div className="lg:col-span-4 space-y-10">
              {[
                { icon: Users, t: "Local Experts", d: "Knowledgeable guides who bring Niagara's history and stories to life." },
                { icon: Compass, t: "Small Group Tours", d: "Personalized experiences with more attention and flexibility." },
                { icon: ShieldCheck, t: "Safety & Comfort", d: "Your safety and comfort are our top priorities." },
                { icon: Globe, t: "Sustainable Tourism", d: "We care for Niagara and support our local community." }
              ].map((feat, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-white shadow-lg border border-slate-50 flex items-center justify-center text-[#125D66] group-hover:bg-[#125D66] group-hover:text-white transition-all duration-300">
                    <feat.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-[#0C3136] uppercase tracking-wider mb-2">{feat.t}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{feat.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

{/* Signature Tours Showcase */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
             <div>
                <p className="text-[#F8A41E] font-black text-xs uppercase tracking-[0.4em] mb-2">OUR SIGNATURE TOURS</p>
                <h2 className="text-4xl font-black text-[#0C3136]">Explore Niagara & Beyond</h2>
             </div>
          </div>
          
          {/* Use the dynamic 'tours' array instead of TOURS_DATA */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.slice(0, 3).map((tour) => (
              <TourCard key={tour.firebaseId} tour={tour} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/tours" className="inline-block bg-[#0C3136] text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#125D66] transition-all shadow-xl">
              VIEW ALL {tours.length} TOURS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}