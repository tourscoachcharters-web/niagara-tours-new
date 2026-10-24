"use client";

import React, { useState } from 'react';
import { 
  Send, Plus, Minus, CheckCircle2, Loader2, 
  HelpCircle, Sparkles, PhoneCall, Calendar, 
  Users, MessageSquare, Clock, ShieldCheck 
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

const INQUIRY_TYPES = [
  { id: 'general', label: 'Day Tour Inquiry', icon: '🌊' },
  { id: 'private', label: 'Private VIP Charter', icon: '🚐' },
  { id: 'group', label: 'Corporate & Group', icon: '👥' },
  { id: 'custom', label: 'Custom Itinerary', icon: '✨' },
  { id: 'support', label: 'Existing Booking', icon: '🎫' },
];

const AVAILABLE_TOURS = [
  "Niagara Falls Classic Day Escape ($89)",
  "Niagara Day & Night Lights with Fireworks ($129)",
  "Ultimate Niagara Falls Adventure + Hornblower Boat ($149)",
  "Niagara Falls Luxury Private Tour ($795)",
  "Niagara Wine Country & Tasting Trail ($139)",
  "Niagara Falls Half Day Private Tour ($795)",
  "Other / Custom Private Group Charter"
];

const FAQS = [
  {
    category: "Pickups & Transit",
    q: "Where do your daily Toronto tours depart from?",
    a: "We offer 5 official downtown Toronto boarding hubs with scheduled morning pickups between 7:55 AM and 8:30 AM: Royal Ontario Museum (7:55 AM), Holiday Inn Downtown Centre (8:00 AM), Chelsea Hotel (8:15 AM), Sheraton Centre (8:15 AM), and Union Station / Maple Leaf Square (8:30 AM). For private tours and custom charters, complimentary door-to-door pickup is included anywhere in Toronto and the GTA.",
  },
  {
    category: "Cancellation & Weather",
    q: "What is your cancellation and weather policy?",
    a: "We provide 100% free cancellation up to 24 hours prior to departure for all public tours. If your plans change, simply notify us by phone or email for a complete refund. Our luxury coaches are fully climate-controlled and heated/air-conditioned, and Niagara tours operate rain, shine, or snow. In winter, seasonal boat cruises are seamlessly replaced with Journey Behind the Falls.",
  },
  {
    category: "Boat Cruises & Attractions",
    q: "Are the Niagara City (Hornblower) Boat Cruise tickets included?",
    a: "Yes! When you select the 'Ultimate Niagara Falls Adventure' or add attraction passes, VIP priority admission to the Niagara City Cruises Boat Tour is included so you bypass regular ticket lines. Ponchos are provided complimentary.",
  },
  {
    category: "Private Charters & Groups",
    q: "Can we customize a private charter for our family or corporate group?",
    a: "Absolutely. We operate a fleet of executive Sprinters and luxury motorcoaches. Our private tours include personalized pickup times, custom stop durations, winery visit additions in Niagara-on-the-Lake, and dedicated licensed driver-guides.",
  },
  {
    category: "Children & Accessibility",
    q: "Do you accommodate children, strollers, and luggage?",
    a: "Yes, children of all ages are welcome. Children ages 2-12 receive a discounted fare, and infants under 2 travel free on lap. Foldable strollers and standard carry-on luggage fit comfortably in our dedicated motorcoach luggage bays.",
  },
];

export default function ContactForm() {
  const [inquiryType, setInquiryType] = useState('general');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTour, setSelectedTour] = useState(AVAILABLE_TOURS[0]);
  const [estimatedDate, setEstimatedDate] = useState('');
  const [partySize, setPartySize] = useState('2 Guests');
  const [message, setMessage] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) {
      alert("Please fill in your name, email, and message.");
      return;
    }

    setLoading(true);
    const refId = `INQ-${Math.floor(10000 + Math.random() * 90000)}`;

    const inquiryData = {
      refId,
      inquiryType,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim() || 'N/A',
      selectedTour,
      estimatedDate: estimatedDate || 'Flexible / Not Decided',
      partySize,
      message: message.trim(),
      createdAt: new Date().toISOString(),
      status: 'New'
    };

    try {
      // Save inquiry to Firestore
      await addDoc(collection(db, 'inquiries'), inquiryData);
    } catch (err) {
      console.warn("Firestore inquiry save notice:", err.message);
    }

    setLoading(false);
    setSubmittedInquiry(inquiryData);
  };

  const handleReset = () => {
    setSubmittedInquiry(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setEstimatedDate('');
  };

  return (
    <div className="space-y-12">
      {/* ------------------------------------------------------------- */}
      {/* CONTACT INQUIRY CARD */}
      {/* ------------------------------------------------------------- */}
      <section aria-labelledby="inquiry-form-heading" className="bg-white rounded-[2.5rem] shadow-xl p-8 lg:p-12 border border-slate-200">
        
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#F8A41E]">
                Concierge Dispatch Active
              </span>
            </div>
            <h2 id="inquiry-form-heading" className="text-2xl sm:text-3xl font-black text-[#0C3136]">
              Send Us an Inquiry
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-full">
            ⚡ Typical Response: &lt; 15 mins
          </span>
        </div>

        {submittedInquiry ? (
          <div className="bg-emerald-50/80 border border-emerald-200 p-8 sm:p-10 rounded-3xl text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
              <CheckCircle2 size={36} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full mb-3 inline-block">
              Inquiry Dispatched
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0C3136] mb-3">
              Thank You, {submittedInquiry.fullName}!
            </h3>
            <p className="text-slate-600 text-sm font-medium mb-6 max-w-md mx-auto leading-relaxed">
              We received your inquiry regarding <strong className="text-[#0C3136]">{submittedInquiry.selectedTour}</strong>. 
              A member of our Niagara concierge team will reply to <span className="text-[#125D66] font-bold">{submittedInquiry.email}</span> shortly.
            </p>

            <div className="bg-white p-5 rounded-2xl border border-emerald-200/60 max-w-xs mx-auto mb-8 text-left space-y-2 text-xs">
              <div className="flex justify-between text-slate-400 font-bold uppercase tracking-wider">
                <span>Reference ID</span>
                <span className="text-[#0C3136] font-black">{submittedInquiry.refId}</span>
              </div>
              <div className="flex justify-between text-slate-400 font-bold uppercase tracking-wider">
                <span>Inquiry Type</span>
                <span className="text-[#0C3136] capitalize font-bold">{submittedInquiry.inquiryType}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto bg-[#0C3136] text-white px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#125D66] transition-colors shadow-md"
              >
                Send Another Message
              </button>
              <a
                href="tel:14164443000"
                className="w-full sm:w-auto bg-white text-[#0C3136] border border-slate-200 px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#F8A41E]" />
                <span>Call Concierge Now</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Inquiry Category Pills */}
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-2.5">
                What Can We Help You With?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {INQUIRY_TYPES.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setInquiryType(type.id)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 text-xs font-black ${
                      inquiryType === type.id
                        ? 'bg-[#0C3136] text-white border-[#0C3136] shadow-md scale-[1.02]'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <span className="text-base">{type.icon}</span>
                    <span className="truncate w-full">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="contact-full-name" className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-full-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm text-[#0C3136] outline-none focus:border-[#0C3136] focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah@example.com"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm text-[#0C3136] outline-none focus:border-[#0C3136] focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Phone & Tour Dropdown Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="contact-phone" className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">
                  Phone Number (for SMS confirmation)
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (416) 000-0000"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm text-[#0C3136] outline-none focus:border-[#0C3136] focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-tour" className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">
                  Tour of Interest
                </label>
                <select
                  id="contact-tour"
                  value={selectedTour}
                  onChange={(e) => setSelectedTour(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-xs text-[#0C3136] outline-none focus:border-[#0C3136] focus:bg-white transition-all cursor-pointer truncate"
                >
                  {AVAILABLE_TOURS.map((t, idx) => (
                    <option key={idx} value={t} className="text-[#0C3136] font-bold">
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date & Group Size Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="contact-date" className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">
                  Estimated Travel Date
                </label>
                <input
                  id="contact-date"
                  type="date"
                  value={estimatedDate}
                  onChange={(e) => setEstimatedDate(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm text-[#0C3136] outline-none focus:border-[#0C3136] focus:bg-white transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-party" className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">
                  Estimated Party Size
                </label>
                <select
                  id="contact-party"
                  value={partySize}
                  onChange={(e) => setPartySize(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm text-[#0C3136] outline-none focus:border-[#0C3136] focus:bg-white transition-all cursor-pointer"
                >
                  <option value="1 Solo Traveler">1 Solo Traveler</option>
                  <option value="2 Guests (Couple)">2 Guests (Couple)</option>
                  <option value="3-4 Guests (Family)">3-4 Guests (Family)</option>
                  <option value="5-8 Guests (Small Group)">5-8 Guests (Small Group)</option>
                  <option value="9-15 Guests (Minibus)">9-15 Guests (Minibus)</option>
                  <option value="16+ Guests (Private Motorcoach)">16+ Guests (Private Motorcoach)</option>
                </select>
              </div>
            </div>

            {/* Message Area */}
            <div className="space-y-1.5">
              <label htmlFor="contact-message" className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">
                How Can We Tailor Your Experience? <span className="text-red-500">*</span>
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your travel details: preferred departure time, hotel pickup location, special occasions (birthdays, anniversaries), dietary requirements, or any specific stops..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm text-[#0C3136] outline-none focus:border-[#0C3136] focus:bg-white transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D91E1E] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.25em] shadow-xl shadow-red-900/20 hover:bg-[#b01818] active:translate-y-0.5 transition-all flex items-center justify-center gap-2.5 disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D91E1E]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>TRANSMITTING INQUIRY...</span>
                </>
              ) : (
                <>
                  <span>SEND INQUIRY TO CONCIERGE</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-slate-400 font-bold">
              🔒 Privacy Guaranteed. We never share your contact details. Your inquiry connects directly with our licensed Toronto tour coordinators.
            </p>
          </form>
        )}
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FAQ ACCORDION SECTION */}
      {/* ------------------------------------------------------------- */}
      <section aria-labelledby="contact-faq-heading" className="bg-white rounded-[2.5rem] p-8 lg:p-12 border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#F8A41E]">
              Quick Answers
            </span>
            <h2 id="contact-faq-heading" className="text-2xl sm:text-3xl font-black text-[#0C3136]">
              Frequently Asked Questions
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-400">
            {FAQS.length} Key Topics Covered
          </span>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border rounded-2xl transition-all overflow-hidden ${
                openFaq === idx ? 'border-[#0C3136] bg-slate-50/50 shadow-sm' : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                aria-expanded={openFaq === idx}
                className="w-full p-5 text-left font-black text-sm text-[#0C3136] flex justify-between items-center gap-4 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-200 shrink-0">
                    {faq.category}
                  </span>
                  <span>{faq.q}</span>
                </div>
                <span className="shrink-0 w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-[#0C3136]">
                  {openFaq === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-200">
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
