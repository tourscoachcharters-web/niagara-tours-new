import React from 'react';
import { REVIEWS_DATA } from "@/data/tours";
import { Star, Quote, ThumbsUp } from 'lucide-react';

export const metadata = {
  title: "Guest Reviews | Niagara Travels",
  description: "Don't just take our word for it. Read honest reviews from thousands of travelers who chose Niagara Travels.",
};

export default function ReviewsPage() {
  return (
    <div className="animate-in fade-in duration-700 bg-[#F8FAFC]">
      <section className="relative h-[450px] flex items-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/hero-reviews.jpg" alt="Reviews Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C3136]/95 to-[#0C3136]/60"></div>
        </div>
        <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <span className="bg-[#F8A41E] text-[#0C3136] text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-[0.2em] mb-6 inline-block shadow-lg">Guest Experiences</span>
            <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tighter mb-4">What Our <br />Guests Say</h1>
            <p className="text-slate-200 text-lg font-medium opacity-90">Don't just take our word for it. Read honest reviews from thousands of travelers who chose Niagara Travels.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[2.5rem] text-center w-full md:w-auto shrink-0 shadow-2xl">
            <div className="text-5xl font-black text-[#F8A41E] mb-2">4.9</div>
            <div className="flex justify-center gap-1 mb-3 text-[#F8A41E]">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
            </div>
            <p className="text-sm font-bold text-white mb-1">Excellent Rating</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Based on 1,500+ Reviews</p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REVIEWS_DATA.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-1 text-[#F8A41E]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-slate-200'}`} />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-slate-100 group-hover:text-[#F8A41E]/20 transition-colors" />
              </div>
              
              <h4 className="font-bold text-slate-700 text-sm leading-relaxed mb-8 flex-1 italic">"{review.text}"</h4>
              
              <div className="pt-6 border-t border-slate-50 mt-auto">
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <h5 className="font-black text-[#0C3136] text-sm">{review.name}</h5>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{review.date}</p>
                  </div>
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-[#125D66]">
                    <ThumbsUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="bg-[#0C3136]/5 text-[#125D66] text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg inline-block truncate max-w-full">
                  Tour: {review.tour}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}