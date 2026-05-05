import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  Calendar, 
  Users, 
  Search, 
  Star, 
  ChevronRight, 
  ChevronLeft,
  Navigation,
  ShieldCheck,
  Zap,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Menu,
  X,
  Compass,
  Send,
  MessageSquare,
  Map as MapIcon,
  Headphones,
  Info,
  Plus,
  Minus,
  Bus
} from 'lucide-react';

// --- Sub-components ---

const NavItem = ({ label, hasDropdown }) => (
  <div className="flex items-center gap-1 text-slate-700 font-medium hover:text-[#F8A41E] cursor-pointer transition-colors text-sm">
    {label}
    {hasDropdown && <ChevronRight className="w-4 h-4 rotate-90" />}
  </div>
);

const ContactCard = ({ icon: Icon, title, desc, action, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
    <div className={`p-4 rounded-full ${color} shrink-0`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <h4 className="font-bold text-slate-800 text-sm">{title}</h4>
      <p className="text-slate-500 text-xs mb-1">{desc}</p>
      <div className="text-[#125D66] font-bold text-sm tracking-tight">{action}</div>
    </div>
  </div>
);

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button 
        className="w-full flex justify-between items-center py-4 text-left group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-sm font-bold transition-colors ${isOpen ? 'text-[#F8A41E]' : 'text-slate-700 group-hover:text-[#F8A41E]'}`}>{question}</span>
        {isOpen ? <Minus className="w-4 h-4 text-[#F8A41E]" /> : <Plus className="w-4 h-4 text-slate-400" />}
      </button>
      {isOpen && (
        <div className="pb-6 text-slate-500 text-sm leading-relaxed animate-in slide-in-from-top-1 duration-200">
          {answer}
        </div>
      )}
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800">
      {/* Top Bar */}
      <div className="hidden lg:flex bg-[#0C3136] text-white px-8 py-2 justify-between items-center text-[11px] font-medium tracking-wide">
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#F8A41E]" /> Niagara Falls, Ontario, Canada</div>
          <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#F8A41E]" /> +1 (905) 123-4567</div>
          <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#F8A41E]" /> info@niagaravistatours.com</div>
        </div>
        <div className="flex gap-6 items-center">
          <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#F8A41E]" /> Open Daily 8:00 AM – 8:00 PM</div>
          <button className="bg-[#F8A41E] px-4 py-2 -my-2 font-bold hover:bg-[#e09115] transition-colors uppercase text-[10px] text-[#0C3136]">BOOK NOW</button>
        </div>
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F8A41E] rounded-xl flex items-center justify-center shadow-lg shadow-[#F8A41E]/20">
              <Compass className="w-6 h-6 text-[#0C3136]" />
            </div>
            <div>
              <h1 className="text-xl font-black text-[#0C3136] tracking-tighter leading-none">NIAGARA</h1>
              <p className="text-[8px] font-bold text-[#F8A41E] tracking-[0.2em] leading-none mt-1 uppercase">Vista Tours</p>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-8">
            <NavItem label="Home" />
            <NavItem label="Tours" hasDropdown />
            <NavItem label="Packages" />
            <NavItem label="About" />
            <NavItem label="Reviews" />
            <NavItem label="Contact" />
            <div className="flex items-center gap-1 ml-4 cursor-pointer text-sm font-bold uppercase"><img src="https://flagcdn.com/w20/ca.png" className="w-4 h-3" /> EN <ChevronRight className="w-3 h-3 rotate-90" /></div>
          </nav>
          <div className="flex items-center gap-4">
             <button className="lg:hidden p-2 text-slate-800"><Menu /></button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[380px] flex items-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C3136]/90 via-[#0C3136]/50 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-slate-300 text-[10px] font-bold uppercase tracking-widest mb-4">
               Home / Contact
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-4 h-4 text-[#F8A41E]" />
              <span className="text-[#F8A41E] text-[10px] font-black uppercase tracking-widest">GET IN TOUCH</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black mb-4 leading-tight">Contact Us</h1>
            <p className="text-slate-200 text-lg max-w-lg leading-relaxed opacity-90">
              We're here to help you plan your perfect Niagara Falls adventure. Reach out to our local travel experts anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content: Form & Sidebar */}
      <main className="container mx-auto px-4 py-20 -mt-16 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Send Message Form */}
          <div className="lg:w-2/3 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-[#125D66]" />
              <h2 className="text-lg font-black text-[#0C3136] uppercase tracking-widest text-sm">Send Us a Message</h2>
            </div>
            <div className="p-8">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Full Name <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input type="text" placeholder="Enter your full name" className="w-full bg-white border border-slate-200 rounded-xl px-10 py-3 text-sm focus:outline-none focus:border-[#F8A41E] transition-colors" />
                    <Users className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-300" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Email Address <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input type="email" placeholder="Enter your email" className="w-full bg-white border border-slate-200 rounded-xl px-10 py-3 text-sm focus:outline-none focus:border-[#F8A41E] transition-colors" />
                    <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-300" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Phone Number <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input type="tel" placeholder="Enter your phone number" className="w-full bg-white border border-slate-200 rounded-xl px-10 py-3 text-sm focus:outline-none focus:border-[#F8A41E] transition-colors" />
                    <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-300" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Subject <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select className="w-full bg-white border border-slate-200 rounded-xl px-10 py-3 text-sm focus:outline-none focus:border-[#F8A41E] transition-colors appearance-none cursor-pointer">
                      <option>What is this regarding?</option>
                      <option>Booking Inquiry</option>
                      <option>Custom Tour</option>
                      <option>Cancellation</option>
                    </select>
                    <MessageSquare className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-300" />
                    <ChevronRight className="w-4 h-4 absolute right-3 top-3.5 rotate-90 text-slate-400" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Tour Interest <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select className="w-full bg-white border border-slate-200 rounded-xl px-10 py-3 text-sm focus:outline-none focus:border-[#F8A41E] transition-colors appearance-none cursor-pointer">
                      <option>Select a tour or service</option>
                      <option>Niagara Day Tour</option>
                      <option>Winery Escape</option>
                    </select>
                    <Compass className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-300" />
                    <ChevronRight className="w-4 h-4 absolute right-3 top-3.5 rotate-90 text-slate-400" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Travel Date</label>
                  <div className="relative">
                    <input type="text" placeholder="Select your preferred date" className="w-full bg-white border border-slate-200 rounded-xl px-10 py-3 text-sm focus:outline-none focus:border-[#F8A41E] transition-colors" />
                    <Calendar className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-300" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Number of Guests</label>
                  <div className="relative">
                    <input type="number" placeholder="How many guests?" className="w-full bg-white border border-slate-200 rounded-xl px-10 py-3 text-sm focus:outline-none focus:border-[#F8A41E] transition-colors" />
                    <Users className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-300" />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Message <span className="text-red-500">*</span></label>
                  <textarea rows="5" placeholder="Tell us more about your trip, questions, or special requests..." className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F8A41E] transition-colors resize-none"></textarea>
                </div>
                <div className="md:col-span-2">
                  <button className="w-full bg-[#F8A41E] hover:bg-[#e09115] text-[#0C3136] py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-xl shadow-[#F8A41E]/20 flex items-center justify-center gap-3">
                    SEND MESSAGE <Send className="w-4 h-4" />
                  </button>
                  <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Your information is safe and secure. We respect your privacy.
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Sidebar Info */}
          <div className="lg:w-1/3 space-y-8">
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
               <div className="bg-[#0C3136] px-8 py-6 text-white text-xs font-black uppercase tracking-widest">Contact Information</div>
               <div className="p-8 space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-cyan-50 p-2.5 rounded-lg shrink-0"><MapPin className="w-5 h-5 text-[#125D66]" /></div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">4900 Clifton Hill, Niagara Falls,</h4>
                      <p className="text-xs text-slate-500">Ontario, Canada L2G 3N4</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-cyan-50 p-2.5 rounded-lg shrink-0"><Phone className="w-5 h-5 text-[#125D66]" /></div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">+1 (905) 123-4567</h4>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-cyan-50 p-2.5 rounded-lg shrink-0"><Mail className="w-5 h-5 text-[#125D66]" /></div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">info@niagaravistatours.com</h4>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-cyan-50 p-2.5 rounded-lg shrink-0"><Clock className="w-5 h-5 text-[#125D66]" /></div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Office Hours</h4>
                      <p className="text-xs text-slate-500 font-medium">Open Daily: 8:00 AM – 8:00 PM</p>
                    </div>
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
               <div className="px-8 py-6 border-b border-slate-100 text-[#0C3136] text-xs font-black uppercase tracking-widest">Quick Help</div>
               <div className="p-8 space-y-6">
                  {[
                    { icon: ShieldCheck, title: "Booking Support", desc: "Get help with existing or new bookings" },
                    { icon: Compass, title: "Custom Tours", desc: "Create your perfect custom itinerary" },
                    { icon: Users, title: "Group Bookings", desc: "Special rates for groups & events" },
                    { icon: Globe, title: "Travel Advice", desc: "Local tips & travel recommendations" }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 group cursor-pointer">
                      <div className="bg-slate-50 text-[#125D66] p-2 rounded-lg group-hover:bg-[#F8A41E] group-hover:text-[#0C3136] transition-colors">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-bold text-slate-800 tracking-tight">{item.title}</h4>
                        <p className="text-[11px] text-slate-500 leading-tight">{item.desc}</p>
                      </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-[#0C3136] rounded-3xl p-8 text-white relative overflow-hidden group shadow-xl">
               <div className="relative z-10">
                 <h4 className="text-lg font-black uppercase tracking-widest mb-2">We're Here to Help!</h4>
                 <p className="text-[11px] text-slate-300 leading-relaxed mb-6 max-w-[190px]">Our friendly travel experts are ready to assist you with any questions or special requests.</p>
                 <div className="space-y-4">
                    <div className="text-[9px] font-bold text-[#F8A41E] uppercase tracking-[0.2em] opacity-80">Call us anytime</div>
                    <div className="text-2xl font-black">+1 (905) 123-4567</div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <Clock className="w-3 h-3" /> Open Daily: 8:00 AM – 8:00 PM
                    </div>
                 </div>
               </div>
               <img src="https://randomuser.me/api/portraits/women/68.jpg" className="absolute -bottom-2 -right-2 w-32 h-32 rounded-full border-4 border-white/5 grayscale group-hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>
        </div>

        {/* Quad Contact Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <ContactCard icon={Phone} title="Call Us" desc="Speak directly with our travel experts" action="+1 (905) 123-4567" color="bg-cyan-50 text-cyan-600" />
          <ContactCard icon={Mail} title="Email Us" desc="Send us a message anytime" action="info@niagaravistatours.com" color="bg-blue-50 text-blue-600" />
          <ContactCard icon={MapPin} title="Visit Our Office" desc="Stop by and say hello! We're here to help." action="4900 Clifton Hill, Niagara Falls" color="bg-amber-50 text-amber-600" />
          <ContactCard icon={Headphones} title="Live Support" desc="Chat with us in real-time for quick answers" action="Available 8AM – 8PM" color="bg-purple-50 text-purple-600" />
        </div>

        {/* Map Section */}
        <div className="mt-24">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 flex flex-col lg:flex-row">
            <div className="lg:w-1/2 min-h-[400px] relative bg-slate-200 p-8">
               <div className="absolute inset-0 grayscale contrast-125 opacity-40">
                 <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" />
               </div>
               {/* Marker Overlay */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#F8A41E] rounded-full flex items-center justify-center">
                    <Compass className="w-6 h-6 text-[#0C3136]" />
                  </div>
                  <div>
                    <h4 className="font-black text-[11px] text-[#0C3136] uppercase tracking-tighter">Niagara Vista Tours</h4>
                    <p className="text-[9px] text-slate-500 font-bold uppercase">4900 Clifton Hill, Niagara Falls</p>
                  </div>
               </div>
            </div>
            <div className="lg:w-1/2 p-12 lg:p-16">
              <h2 className="text-3xl font-black text-[#0C3136] mb-4">Find Us in Niagara Falls</h2>
              <div className="flex items-center gap-3 text-[#125D66] font-bold text-sm mb-6">
                <MapPin className="w-5 h-5 text-[#F8A41E]" /> 4900 Clifton Hill, Niagara Falls, Ontario, Canada L2G 3N4
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-10">
                Located in the heart of Clifton Hill, just steps away from the Fallsview attractions, restaurants, and major hotels.
              </p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-50 p-2.5 rounded-lg text-[#125D66]"><Bus className="w-4 h-4" /></div>
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tighter">2 min walk to Niagara Falls</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-slate-50 p-2.5 rounded-lg text-[#125D66]"><MapIcon className="w-4 h-4" /></div>
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tighter">Free Parking Available</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-slate-50 p-2.5 rounded-lg text-[#125D66]"><Navigation className="w-4 h-4" /></div>
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tighter">Near Major Hotels</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-slate-50 p-2.5 rounded-lg text-[#125D66]"><Zap className="w-4 h-4" /></div>
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-tighter">Steps to Clifton Hill Attractions</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Reach Out Section */}
        <div className="mt-24 text-center">
           <h2 className="text-3xl font-black text-[#0C3136] mb-12 uppercase tracking-widest">Why Reach Out to Us?</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { icon: Users, title: "Local Experts", desc: "Born and raised in Niagara, we know the best spots and hidden gems." },
                { icon: Clock, title: "Fast Response", desc: "We typically respond to all inquiries within a few hours." },
                { icon: Compass, title: "Custom Packages", desc: "Tailored experiences to match your interests, budget, and schedule." },
                { icon: ShieldCheck, title: "Trusted Support", desc: "Thousands of happy travelers trust us for their Niagara adventures." }
              ].map((benefit, i) => (
                <div key={i} className="flex flex-col items-center">
                   <div className="bg-white w-20 h-20 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center text-[#125D66] mb-6 hover:border-[#F8A41E] transition-colors">
                      <benefit.icon className="w-8 h-8" />
                   </div>
                   <h4 className="font-bold text-[#0C3136] mb-2 uppercase text-xs tracking-widest">{benefit.title}</h4>
                   <p className="text-xs text-slate-500 leading-relaxed max-w-[220px]">{benefit.desc}</p>
                </div>
              ))}
           </div>
        </div>

        {/* FAQ Section (Side-by-Side) */}
        <div className="mt-32 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/3">
               <span className="text-[#F8A41E] text-[11px] font-black tracking-widest uppercase">FAQ</span>
               <h2 className="text-3xl font-black text-[#0C3136] mt-2 mb-4">Frequently Asked Questions</h2>
               <p className="text-sm text-slate-500 leading-relaxed">Find quick answers to common questions about bookings, cancellations, and tours.</p>
            </div>
            <div className="md:w-2/3 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <FaqItem question="Do you offer hotel pickup for tours?" answer="Yes, we offer complimentary hotel pickup and drop-off from all major hotels in Niagara Falls and Niagara-on-the-Lake." />
              <FaqItem question="How quickly will I receive a response?" answer="We pride ourselves on our responsiveness. During business hours, we typically respond within 1-2 hours. All other inquiries are answered within 24 hours." />
              <FaqItem question="Can I customize my tour itinerary?" answer="Absolutely! We specialize in custom tours. Reach out via the form above with your specific requests and we'll build a custom package for you." />
              <FaqItem question="Do you help with group bookings?" answer="Yes, we offer special rates and dedicated coordinators for groups of 10 or more, including corporate events and weddings." />
              <FaqItem question="What is your cancellation policy?" answer="Most tours offer a full refund if canceled at least 24 hours in advance. Please refer to your specific booking details for precise terms." />
            </div>
          </div>
        </div>
      </main>

      {/* CTA Banner */}
      <section className="bg-[#0C3136] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12">
          <div className="text-center lg:text-left">
            <p className="text-[#F8A41E] font-bold text-[11px] uppercase tracking-[0.3em] mb-4">Let's Plan Your Perfect Trip!</p>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">Ready to Explore Niagara Falls?</h2>
            <p className="text-slate-300 text-sm max-w-xl">Contact our team today or book your unforgettable experience in just a few clicks.</p>
          </div>
          <div className="flex flex-col items-center gap-6">
            <button className="bg-[#F8A41E] hover:bg-[#e09115] text-[#0C3136] px-10 py-5 rounded-xl font-bold uppercase tracking-widest transition-all flex items-center gap-2 shadow-xl shadow-[#F8A41E]/30 whitespace-nowrap text-xs">
              BOOK YOUR EXPERIENCE NOW <ChevronRight className="w-5 h-5" />
            </button>
            <div className="text-white text-xs">
              <span className="opacity-50 uppercase font-bold mr-3 tracking-widest">Use code:</span>
              <span className="text-[#F8A41E] font-black tracking-widest">NIAGARAVISTA15</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#F8A41E] rounded-lg flex items-center justify-center">
                  <Compass className="w-5 h-5 text-[#0C3136]" />
                </div>
                <h1 className="text-xl font-black tracking-tighter">NIAGARA <span className="block text-[8px] tracking-[0.3em] text-[#F8A41E] leading-none uppercase">Vista Tours</span></h1>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-6">Your trusted local tour operator in Niagara Falls, Ontario. Creating unforgettable experiences since 2010.</p>
              <div className="flex gap-4">
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                  <Icon key={i} className="w-4 h-4 text-slate-500 hover:text-[#F8A41E] cursor-pointer transition-colors" />
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-[10px] uppercase tracking-widest text-[#F8A41E] mb-6">Quick Links</h4>
              <ul className="space-y-4 text-xs text-slate-400">
                <li className="hover:text-white cursor-pointer transition-colors">Home</li>
                <li className="hover:text-white cursor-pointer transition-colors">Tours</li>
                <li className="hover:text-white cursor-pointer transition-colors">Packages</li>
                <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-white cursor-pointer transition-colors text-[#F8A41E]">Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[10px] uppercase tracking-widest text-[#F8A41E] mb-6">Contact Us</h4>
              <ul className="space-y-4 text-xs text-slate-400">
                <li className="flex gap-3"><MapPin className="w-4 h-4 text-[#F8A41E]" /> Niagara Falls, Ontario, Canada</li>
                <li className="flex gap-3"><Phone className="w-4 h-4 text-[#F8A41E]" /> +1 (905) 123-4567</li>
                <li className="flex gap-3"><Mail className="w-4 h-4 text-[#F8A41E]" /> info@niagaravistatours.com</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[10px] uppercase tracking-widest text-[#F8A41E] mb-6">Newsletter</h4>
              <p className="text-[10px] text-slate-500 mb-4">Subscribe for exclusive travel tips and special offers.</p>
              <div className="flex gap-1">
                <input type="text" placeholder="Email Address" className="bg-slate-800 border-none rounded-lg px-4 py-3 text-xs flex-1 focus:ring-1 focus:ring-[#F8A41E] outline-none" />
                <button className="bg-[#F8A41E] px-4 rounded-lg font-bold text-[10px] uppercase text-[#0C3136]">Join</button>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-800 flex flex-col md:row justify-between items-center gap-6">
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">© 2025 Niagara Vista Tours. All Rights Reserved.</div>
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
               <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}