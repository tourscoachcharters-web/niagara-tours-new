"use client";

import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export default function HomeFaq() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "Where in Toronto do you pick up passengers?",
      a: "We provide complimentary pickup from central downtown Toronto hotels including the Royal Ontario Museum (ROM), Chelsea Hotel, Sheraton Centre, Holiday Inn Downtown Centre, and Maple Leaf Square (Union Station). Custom hotel or residential pickups are available on all private tours.",
    },
    {
      q: "Is the Voyage to the Falls boat cruise ticket included in the price?",
      a: "Yes! On our Classic Day Escape and Ultimate Adventure tours, skip-the-line admission for the world-famous Niagara City Cruises (Voyage to the Falls) boat ride is fully included along with waterproof ponchos.",
    },
    {
      q: "Do I need a passport or Canadian visa to take this tour?",
      a: "No! All our tours take place entirely on the Canadian side of Niagara Falls (Ontario). As long as you are already legally in Canada, no passport or border crossing is required during the tour.",
    },
    {
      q: "What happens in case of rain, snow, or seasonal boat closures?",
      a: "Our tours operate year-round, rain or shine! Our vehicles are modern, heated, and air-conditioned. During the winter season when the boat cruise is closed, we replace it with Journey Behind the Falls or the Skylon Tower Observation Deck.",
    },
    {
      q: "What is your cancellation and refund policy?",
      a: "We offer 100% full refunds for cancellations made up to 24 hours prior to departure. You can book with complete peace of mind knowing you can change your travel plans if needed.",
    },
  ];

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {faqs.map((faq, idx) => {
        const isOpen = openIdx === idx;
        const answerId = `home-faq-ans-${idx}`;
        const buttonId = `home-faq-btn-${idx}`;
        return (
          <div
            key={idx}
            className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'bg-white border-[#125D66]/30 shadow-lg shadow-[#0C3136]/5'
                : 'bg-white/80 border-slate-100 hover:border-slate-200'
            }`}
          >
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={answerId}
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="w-full p-6 text-left font-black text-sm text-[#0C3136] flex justify-between items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8A41E]"
            >
              <span className="flex items-center gap-3">
                <HelpCircle className={`w-4 h-4 shrink-0 ${isOpen ? 'text-[#F8A41E]' : 'text-slate-400'}`} aria-hidden="true" />
                <span>{faq.q}</span>
              </span>
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  isOpen ? 'bg-[#0C3136] text-[#F8A41E]' : 'bg-slate-100 text-slate-500'
                }`}
                aria-hidden="true"
              >
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>
            {isOpen && (
              <div
                id={answerId}
                role="region"
                aria-labelledby={buttonId}
                className="px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed font-medium animate-in fade-in duration-300"
              >
                <div className="pt-2 border-t border-slate-50">{faq.a}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
