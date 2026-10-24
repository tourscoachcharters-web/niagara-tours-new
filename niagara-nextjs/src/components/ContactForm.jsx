"use client";

import React, { useState } from 'react';
import { Send, Plus, Minus } from 'lucide-react';

export default function ContactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "Is hotel pickup included in the tours?",
      a: "Yes, we offer complimentary pickup from central hotels in downtown Toronto, Mississauga, and Niagara Falls. Specific pickup time windows are confirmed upon booking.",
    },
    {
      q: "What is your cancellation policy?",
      a: "We offer 100% free cancellation up to 24 hours prior to your scheduled tour departure. Cancellations made within 24 hours are non-refundable.",
    },
    {
      q: "Do you operate tours during the winter months?",
      a: "Absolutely! Niagara Falls is breathtaking in winter. When the seasonal boat cruise is closed for winter, we replace it with Journey Behind the Falls, the Skylon Tower, or Butterfly Conservatory.",
    },
    {
      q: "Can we book a private charter for corporate or family groups?",
      a: "Yes, we specialize in private custom charters for groups of all sizes. Use our Custom Itinerary builder or call us directly at (416) 444-3000.",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormSubmitted(true);
    }, 600);
  };

  return (
    <div className="space-y-12">
      {/* Contact Form Box */}
      <section aria-labelledby="message-form-heading" className="bg-white rounded-[2.5rem] shadow-2xl p-8 lg:p-12 border border-slate-100">
        <h2 id="message-form-heading" className="text-3xl font-black mb-4 text-[#0C3136]">
          Send Us a Message
        </h2>
        <p className="text-slate-500 text-sm font-medium mb-8">
          Fill out the form below and one of our Niagara tour coordinators will respond within 2 hours.
        </p>

        {formSubmitted ? (
          <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center">
            <h3 className="text-2xl font-black text-emerald-800 mb-2">Message Sent Successfully!</h3>
            <p className="text-emerald-700 text-sm font-medium mb-6">
              Thank you for reaching out. We have received your inquiry and will contact you shortly.
            </p>
            <button
              type="button"
              onClick={() => setFormSubmitted(false)}
              className="bg-[#0C3136] text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#125D66] transition-colors"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="contact-full-name" className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 block">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-full-name"
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                  className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E] focus:bg-white transition-all"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-email" className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 block">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="jane@example.com"
                  className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-subject" className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 block">
                Subject
              </label>
              <select
                id="contact-subject"
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E] focus:bg-white transition-all appearance-none"
              >
                <option value="General Inquiry">General Tour Inquiry</option>
                <option value="Booking Assistance">Booking Assistance</option>
                <option value="Private Tour Request">Private VIP Charter Request</option>
                <option value="Corporate Event">Corporate / Group Travel</option>
                <option value="Other">Other Question</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1 block">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                placeholder="How can we help plan your perfect Niagara Falls experience?"
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E] focus:bg-white transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D91E1E] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:bg-[#b01818] transition-all flex items-center justify-center gap-3 disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D91E1E]"
            >
              <span>{loading ? 'SENDING...' : 'SEND MESSAGE'}</span>
              <Send className="w-4 h-4" aria-hidden="true" />
            </button>
          </form>
        )}
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section aria-labelledby="faq-heading" className="bg-white rounded-[2.5rem] p-8 lg:p-12 border border-slate-100 shadow-sm">
        <h2 id="faq-heading" className="text-2xl font-black text-[#0C3136] mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-slate-100 rounded-2xl overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                aria-expanded={openFaq === idx}
                className="w-full p-5 text-left font-bold text-sm text-[#0C3136] flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8A41E]"
              >
                <span>{faq.q}</span>
                <span className="shrink-0 p-1 rounded-full bg-slate-100 text-[#125D66]" aria-hidden="true">
                  {openFaq === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              {openFaq === idx && (
                <div className="p-5 pt-0 text-xs text-slate-600 leading-relaxed font-medium bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
