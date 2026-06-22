"use client";

import React, { useState } from 'react';
import { MapPin, Phone, Mail, ShieldCheck, Send, Plus, Minus } from 'lucide-react';

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: "Is hotel pickup included in the tours?", a: "Yes, we offer complimentary pickup from most hotels in downtown Toronto and Niagara Falls. Specific pickup times will be confirmed after booking." },
    { q: "What is your cancellation policy?", a: "We offer free cancellation up to 24 hours before your scheduled tour departure. Within 24 hours, cancellations are non-refundable." },
    { q: "Do you operate tours during the winter?", a: "Absolutely! Niagara Falls is stunning in winter. While the boat cruise is seasonal, we replace it with other attractions like the Butterfly Conservatory or Skylon Tower." },
    { q: "Can we book a private tour for a corporate group?", a: "Yes, we specialize in private and corporate VIP experiences. Use our 'Custom Itinerary' page to build a package or call us directly." }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative h-[450px] flex items-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/hero-contact.jpg" alt="Contact Us Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C3136]/90 to-[#0C3136]/40"></div>
        </div>
        <div className="container mx-auto px-4 z-10">
          <span className="bg-[#F8A41E] text-[#0C3136] text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-[0.2em] mb-6 inline-block shadow-lg">Get in touch</span>
          <h1 className="text-5xl lg:text-8xl font-black leading-tight tracking-tighter mb-4">We're Here <br />To Help</h1>
          <p className="text-slate-200 text-lg max-w-xl font-medium opacity-90">Have questions about our tours or need assistance with a booking? Reach out to our local team 24/7.</p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 lg:p-12 border border-slate-100">
              <h2 className="text-3xl font-black mb-10 text-[#0C3136]">Send us a Message</h2>
              <form onSubmit={(e) => { e.preventDefault(); alert("Message Sent! We will get back to you shortly."); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Full Name</label>
                    <input type="text" placeholder="Your Name" required className="w-full p-4 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Email Address</label>
                    <input type="email" placeholder="email@example.com" required className="w-full p-4 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E] transition-all" />
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Subject</label>
                  <select className="w-full p-4 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E] transition-all appearance-none">
                    <option>General Inquiry</option>
                    <option>Booking Assistance</option>
                    <option>Private Tour Request</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2 mt-4">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Message</label>
                  <textarea placeholder="How can we help you plan your perfect trip?" required className="w-full p-4 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-sm outline-none h-40 focus:border-[#F8A41E] transition-all resize-none" />
                </div>
                <button type="submit" className="w-full mt-6 bg-[#D91E1E] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:bg-[#b01818] transition-all flex items-center justify-center gap-3">
                  SEND MESSAGE <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              <h3 className="text-2xl font-black text-[#0C3136]">Office Locations</h3>
              <div className="flex gap-6 p-8 bg-white rounded-3xl shadow-lg border border-slate-50 group hover:border-[#F8A41E] transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#0C3136]/5 flex items-center justify-center text-[#F8A41E] group-hover:bg-[#0C3136] group-hover:text-white transition-all">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-sm text-[#0C3136] mb-1">Head Office</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">1315 Pickering Parkway, Suite 300, Pickering, ON L1V 7G5</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0C3136] p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
               <h3 className="text-xl font-black mb-6">Direct Support</h3>
               <div className="space-y-6">
                 <div className="flex gap-4 items-center group cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#F8A41E] transition-all"><Phone className="w-5 h-5" /></div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Call Anytime</p>
                      <p className="font-black text-lg">(416) 444-3000</p>
                    </div>
                 </div>
                 <div className="flex gap-4 items-center group cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#F8A41E] transition-all"><Mail className="w-5 h-5" /></div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Us</p>
                      <p className="font-black text-sm">info@niagaratravels.ca</p>
                    </div>
                 </div>
                 <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-emerald-400 font-black text-[10px] tracking-widest animate-pulse">
                       <ShieldCheck className="w-4 h-4" /> 24/7 CUSTOMER SERVICE ACTIVE
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>

        <section className="mt-28">
           <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl font-black text-[#0C3136] mb-4">Common Questions</h2>
              <p className="text-slate-500 font-medium">Quick answers to the questions travelers ask us most often.</p>
           </div>
           <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-3xl border border-slate-100 overflow-hidden transition-all shadow-sm hover:shadow-md">
                   <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-8 text-left outline-none"
                   >
                      <span className="font-black text-[#0C3136]">{faq.q}</span>
                      {openFaq === i ? <Minus className="text-[#F8A41E]" /> : <Plus className="text-slate-300" />}
                   </button>
                   {openFaq === i && (
                     <div className="px-8 pb-8 text-slate-500 font-medium text-sm leading-relaxed animate-in slide-in-from-top-2 duration-300">
                        {faq.a}
                     </div>
                   )}
                </div>
              ))}
           </div>
        </section>
      </main>
    </div>
  );
}