"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import TourCard from '@/components/TourCard';
import { Compass, Sparkles, ShieldCheck, Moon, ArrowRight } from 'lucide-react';

export default function HomeToursFilter({ tours }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Experiences', icon: Compass },
    { id: 'day', label: 'Day Escapes', icon: Sparkles },
    { id: 'private', label: 'Private & VIP', icon: ShieldCheck },
    { id: 'evening', label: 'Wine & Evening', icon: Moon },
  ];

  const filteredTours = tours.filter((tour) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'day') {
      return tour.id === 'classic-day-escape' || tour.id === 'ultimate-adventure' || tour.tag === 'BEST VALUE' || tour.tag === 'MOST POPULAR';
    }
    if (activeCategory === 'private') {
      return tour.id.includes('private') || tour.id.includes('vip') || tour.tag?.includes('PRIVATE') || tour.tag?.includes('VIP');
    }
    if (activeCategory === 'evening') {
      return tour.id === 'evening-illumination' || tour.id === 'wine-country' || tour.tag === 'ROMANTIC' || tour.tag === 'WINE LOVERS';
    }
    return true;
  });

  return (
    <div className="space-y-10">
      {/* Category Pills Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-3" role="tablist" aria-label="Tour categories">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8A41E] ${
                isActive
                  ? 'bg-[#0C3136] text-white shadow-xl shadow-[#0C3136]/25 scale-105'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-[#F8A41E] hover:text-[#0C3136]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#F8A41E]' : 'text-slate-400'}`} aria-hidden="true" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTours.map((tour) => (
          <TourCard key={tour.firebaseId || tour.id} tour={tour} />
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center pt-6">
        <Link
          href="/tours"
          className="inline-flex items-center gap-3 bg-[#0C3136] hover:bg-[#125D66] text-white px-10 py-4.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0C3136] group"
        >
          <span>BROWSE ALL {tours.length} TOUR PACKAGES</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
