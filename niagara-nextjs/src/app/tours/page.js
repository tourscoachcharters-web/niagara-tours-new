import React from 'react';
import { getLiveTours } from '@/lib/firebase-utils'; // Fetch from Firebase
import TourCard from "@/components/TourCard";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "All Tour Packages | Niagara Travels",
  description: "From classic day escapes to private VIP luxury, discover the perfect way to experience the world's most famous waterfall.",
};

// Make sure to add 'async' here!
export default async function ToursPage() {
  // Fetch your live tours right here on the server
  const tours = await getLiveTours();

  return (
    <div className="animate-in fade-in duration-700 bg-white">
      <section className="relative h-[450px] flex items-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/hero-tours.jpg" alt="All Tours Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C3136]/90 to-[#0C3136]/40"></div>
        </div>
        <div className="container mx-auto px-4 z-10">
          <span className="bg-[#F8A41E] text-[#0C3136] text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-[0.2em] mb-6 inline-block shadow-lg">Our Collections</span>
          <h1 className="text-5xl lg:text-8xl font-black leading-tight tracking-tighter mb-4">Niagara Falls <br />Tour Packages</h1>
          <p className="text-slate-200 text-lg max-w-xl font-medium opacity-90">From classic day escapes to private VIP luxury, discover the perfect way to experience the world's most famous waterfall.</p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Map through the dynamic 'tours' array instead of TOURS_DATA */}
          {tours.map((tour) => (
            <TourCard key={tour.firebaseId || tour.id} tour={tour} />
          ))}
        </div>
      </main>
    </div>
  );
}