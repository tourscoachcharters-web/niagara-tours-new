"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import TourCard from '@/components/TourCard';
import { Compass, Sparkles, ShieldCheck, Moon, ArrowRight, X, Calendar, MapPin } from 'lucide-react';

export default function HomeToursFilter({ tours }) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams?.get('category');
  const dateParam = searchParams?.get('date');
  const departureParam = searchParams?.get('departure');

  const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');

  useEffect(() => {
    if (categoryParam && ['all', 'day', 'private', 'evening'].includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

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

  const hasFilterParams = Boolean(dateParam || (departureParam && departureParam !== 'all') || (categoryParam && categoryParam !== 'all'));

  return (
    <div className="space-y-10">
      {/* Active Search Filter Banner */}
      {hasFilterParams && (
        <div className="bg-[#0C3136] text-white p-4 sm:p-5 rounded-3xl flex items-center justify-between flex-wrap gap-4 shadow-lg border border-white/10 animate-in fade-in duration-300">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[#F8A41E] uppercase tracking-wider text-[10px] font-black">
              Active Search Filters:
            </span>
            {categoryParam && categoryParam !== 'all' && (
              <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold capitalize">
                Category: {categoryParam}
              </span>
            )}
            {dateParam && (
              <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#F8A41E]" />
                Date: {dateParam}
              </span>
            )}
            {departureParam && departureParam !== 'all' && (
              <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 capitalize">
                <MapPin className="w-3.5 h-3.5 text-[#F8A41E]" />
                Pickup: {departureParam}
              </span>
            )}
          </div>

          <Link
            href="/tours"
            className="text-xs font-black text-[#F8A41E] hover:text-white flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-xl transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset Search</span>
          </Link>
        </div>
      )}

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
