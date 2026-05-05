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
  Bus,
  Utensils,
  Grape,
  Wind,
  Camera,
  CheckCircle2,
  Ticket,
  LifeBuoy,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  CloudRain,
  Accessibility
} from 'lucide-react';

// --- Custom Social Icons (Inline SVG to prevent Lucide Export Errors) ---
const FacebookIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const YoutubeIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

// --- Global Sub-components ---

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button className="w-full flex justify-between items-center py-4 text-left group" onClick={() => setIsOpen(!isOpen)}>
        <span className={`text-sm font-bold transition-colors ${isOpen ? 'text-[#F8A41E]' : 'text-slate-700 group-hover:text-[#F8A41E]'}`}>{question}</span>
        {isOpen ? <Minus className="w-4 h-4 text-[#F8A41E]" /> : <Plus className="w-4 h-4 text-slate-400" />}
      </button>
      {isOpen && <div className="pb-6 text-slate-500 text-sm leading-relaxed animate-in slide-in-from-top-1 duration-200">{answer}</div>}
    </div>
  );
};

const NavItem = ({ label, hasDropdown, active, onClick }) => (
  <div onClick={onClick} className={`flex items-center gap-1 font-black text-[11px] uppercase tracking-widest cursor-pointer transition-colors ${active ? 'text-[#F8A41E]' : 'text-[#0C3136] hover:text-[#F8A41E]'}`}>
    {label}
    {hasDropdown && <ChevronRight className="w-3 h-3 rotate-90" />}
  </div>
);

// --- PAGE: HOME (Ref: image_da0218.jpg) ---

const HomePage = ({ navigateTo }) => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=2070" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C3136]/90 via-[#0C3136]/30 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 pt-10 pb-20 items-center">
          <div className="text-white">
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-[#D91E1E] p-1.5 rounded-full shadow-lg"><Star className="w-3.5 h-3.5 text-white fill-current" /></span>
              <span className="uppercase text-[11px] font-black tracking-[0.2em]">PROUDLY CANADIAN</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
              Discover the <br /> Magic of <br /><span className="text-[#F8A41E] italic">Niagara Falls</span>
            </h2>
            <p className="text-lg text-slate-200 mb-10 max-w-xl leading-relaxed font-medium">Unforgettable experiences. Breathtaking views. Memories that last a lifetime.</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigateTo('itinerary')} className="bg-[#D91E1E] hover:bg-[#b01818] text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-900/30 flex items-center gap-3">EXPLORE TOURS <ChevronRight className="w-4 h-4" /></button>
              <button className="bg-white hover:bg-slate-50 text-[#0C3136] px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-3"><Calendar className="w-4 h-4 text-[#F8A41E]" /> PLAN YOUR TRIP</button>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden border border-slate-100 max-w-lg lg:ml-auto">
            <div className="flex bg-slate-50 border-b">
              <button className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest bg-[#0C3136] text-white flex items-center justify-center gap-2"><Search className="w-3.5 h-3.5 text-[#F8A41E]" /> Find a Tour</button>
              <button className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100">Private Tour</button>
              <button className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100">Custom Package</button>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div><label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Tour Type</label><select className="w-full border-b border-slate-200 py-3 focus:outline-none focus:border-[#F8A41E] font-bold text-sm bg-transparent appearance-none"><option>All Tours</option><option>Day Tours</option></select></div>
                <div><label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Date</label><div className="flex items-center gap-2 border-b border-slate-200 py-3"><Calendar className="w-4 h-4 text-[#F8A41E]" /><span className="text-sm font-bold text-slate-700">Select Date</span></div></div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div><label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Guests</label><select className="w-full border-b border-slate-200 py-3 focus:outline-none focus:border-[#F8A41E] font-bold text-sm bg-transparent appearance-none"><option>2 Adults</option></select></div>
                <div><label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Location</label><select className="w-full border-b border-slate-200 py-3 focus:outline-none focus:border-[#F8A41E] font-bold text-sm bg-transparent appearance-none"><option>Niagara Falls, ON</option></select></div>
              </div>
              <button onClick={() => navigateTo('itinerary')} className="w-full bg-[#D91E1E] hover:bg-[#b01818] text-white py-4 rounded-xl font-black text-xs tracking-[0.2em] uppercase transition-all shadow-lg shadow-red-900/20">SEARCH TOURS</button>
              <div className="flex items-center justify-between px-2 pt-2">
                <div className="flex items-center gap-1.5 text-emerald-600 text-[9px] font-black tracking-widest uppercase"><ShieldCheck className="w-3.5 h-3.5" /> Free Cancellation</div>
                <div className="flex items-center gap-1.5 text-cyan-700 text-[9px] font-black tracking-widest uppercase"><Zap className="w-3.5 h-3.5" /> Best Price</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Factors */}
      <section className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {[
            { icon: Users, title: "Local Guides", desc: "Born and raised experts" },
            { icon: Navigation, title: "Transport", desc: "Modern A/C vehicles" },
            { icon: Star, title: "Flexible", desc: "Customize your schedule" },
            { icon: LifeBuoy, title: "Top Rated", desc: "Thousands of reviews" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-8 group cursor-pointer hover:bg-slate-50 transition-colors rounded-2xl">
              <div className="bg-[#0C3136]/5 p-4 rounded-full text-[#125D66] group-hover:bg-[#F8A41E] group-hover:text-[#0C3136] transition-all"><item.icon className="w-6 h-6" /></div>
              <div><h4 className="font-black text-[11px] text-[#0C3136] uppercase tracking-wider">{item.title}</h4><p className="text-xs text-slate-500 font-medium">{item.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* Tour Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
             <div><p className="text-[#F8A41E] font-black text-xs uppercase tracking-[0.4em] mb-2">FEATURED TOURS</p><h2 className="text-4xl font-black text-[#0C3136]">Top Niagara Falls Tour Packages</h2></div>
             <button onClick={() => navigateTo('itinerary')} className="text-[#125D66] font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:text-[#F8A41E] transition-colors">VIEW ALL TOURS <ChevronRight className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { t: 'Niagara Day Tour', p: '129', b: 'MOST POPULAR', img: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=600' },
              { t: 'Falls & Winery Escape', p: '179', b: 'GREAT VALUE', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600' },
              { t: 'Family Adventure', p: '149', b: 'FAMILY FAVORITE', img: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600' }
            ].map((tour, i) => (
              <div key={i} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-lg overflow-hidden group">
                 <div className="h-60 relative overflow-hidden">
                    <img src={tour.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <span className="absolute top-4 left-4 bg-[#125D66] text-white text-[9px] font-black px-3 py-1 rounded-md uppercase tracking-widest">{tour.b}</span>
                 </div>
                 <div className="p-8">
                    <h3 className="text-xl font-black text-[#0C3136] mb-2">{tour.t}</h3>
                    <div className="flex items-center gap-4 text-[11px] font-black text-slate-400 mb-6">
                       <div className="flex items-center gap-1 text-yellow-500"><Star className="w-3.5 h-3.5 fill-current" /> 4.8 (1,245)</div>
                       <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 6-7 HOURS</div>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8">Experience the best of Niagara Falls with a boat cruise and local landmarks.</p>
                    <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                       <div><span className="text-slate-400 text-[10px] font-black block uppercase tracking-widest">FROM</span><span className="text-2xl font-black text-[#0C3136]">CAD ${tour.p}</span></div>
                       <button onClick={() => navigateTo('itinerary')} className="bg-[#D91E1E] hover:bg-[#b01818] text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">VIEW DETAILS</button>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Attractions Carousel */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 mb-16 flex justify-between items-end">
           <div><p className="text-[#125D66] font-black text-xs uppercase tracking-[0.4em] mb-2">EXPERIENCES</p><h2 className="text-3xl lg:text-4xl font-black text-[#0C3136]">Must-See Attractions</h2></div>
           <div className="flex gap-4"><button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-[#F8A41E] hover:text-[#F8A41E] transition-all"><ChevronLeft /></button><button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-[#F8A41E] hover:text-[#F8A41E] transition-all"><ChevronRight /></button></div>
        </div>
        <div className="container mx-auto px-4 flex gap-8 overflow-x-auto no-scrollbar pb-10">
          {[
            { t: 'Boat Cruise', p: '49', i: 'https://images.unsplash.com/photo-1527267207156-348162c94a10?auto=format&fit=crop&w=600' },
            { t: 'Journey Behind Falls', p: '39', i: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=600' },
            { t: 'Clifton Hill', p: '30', i: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=600' },
            { t: 'Helicopter View', p: '199', i: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=600' }
          ].map((item, idx) => (
            <div key={idx} className="min-w-[320px] group cursor-pointer">
               <div className="h-80 rounded-[2.5rem] overflow-hidden relative shadow-lg">
                  <img src={item.i} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                     <h4 className="font-black text-xl mb-1">{item.t}</h4>
                     <p className="text-[#F8A41E] font-black text-xs uppercase tracking-widest">FROM CAD ${item.p}</p>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// --- PAGE: ITINERARY (Ref: image_d9fa5d.jpg) ---

const ItineraryStep = ({ time, title, duration, img, desc, icon: Icon, isLast }) => (
  <div className="flex gap-6 group">
    <div className="flex flex-col items-center">
      <div className="text-[10px] font-black text-[#F8A41E] mb-1.5 whitespace-nowrap uppercase tracking-tighter">{time}</div>
      <div className="w-10 h-10 rounded-full bg-[#0C3136] text-[#F8A41E] flex items-center justify-center shadow-lg relative z-10 ring-4 ring-white group-hover:scale-110 transition-all">
        <Icon className="w-5 h-5" />
      </div>
      {!isLast && <div className="w-0.5 flex-1 bg-slate-200 my-2 border-dashed border-l-2 border-slate-300"></div>}
    </div>
    <div className="flex-1 pb-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
      <div className="md:w-56 h-36 shrink-0 rounded-[2rem] overflow-hidden shadow-xl ring-1 ring-slate-100">
        <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-black text-[#0C3136] tracking-tight">{title}</h3>
          <span className="flex items-center gap-2 text-[10px] font-black text-[#125D66] bg-cyan-50 px-3 py-1.5 rounded-full uppercase tracking-tighter shadow-sm"><Clock className="w-3.5 h-3.5" /> {duration}</span>
        </div>
        <p className="text-slate-500 text-sm leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  </div>
);

const ItineraryPage = ({ navigateTo }) => {
  return (
    <div className="animate-in fade-in duration-700 bg-white">
      {/* Hero */}
      <section className="relative h-[400px] flex items-end pb-16 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C3136] via-[#0C3136]/50 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 z-10">
           <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest mb-6">Home / Tours / Niagara Day Tour / Itinerary</div>
           <span className="bg-[#125D66] text-white text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-[0.2em] mb-6 inline-block shadow-lg shadow-cyan-900/50">FEATURED TOUR</span>
           <h1 className="text-4xl lg:text-7xl font-black leading-tight tracking-tighter">Niagara Day Tour <br /><span className="text-[#F8A41E]">Itinerary</span></h1>
           <div className="flex flex-wrap gap-8 mt-10 p-6 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 w-fit">
              <div className="flex items-center gap-3"><Star className="w-5 h-5 text-[#F8A41E] fill-current" /><span className="text-sm font-black">4.8 <span className="font-medium opacity-60 text-xs ml-1">(1,215 Reviews)</span></span></div>
              <div className="flex items-center gap-3"><Clock className="w-5 h-5 text-[#F8A41E]" /><span className="text-sm font-black">6 - 7 Hours</span></div>
              <div className="flex items-center gap-3"><Users className="w-5 h-5 text-[#F8A41E]" /><span className="text-sm font-black">2 - 50 Guests</span></div>
              <div className="flex items-center gap-3 text-[#F8A41E] uppercase text-[10px] font-black tracking-widest"><Calendar className="w-5 h-5" /> DAILY DEPARTURES</div>
           </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Timeline */}
        <div className="lg:col-span-8">
           <h2 className="text-3xl font-black text-[#0C3136] mb-12 tracking-tight">Your Full-Day Adventure, Step by Step</h2>
           <div className="space-y-4">
              <ItineraryStep time="8:30 AM" title="Luxury Hotel Pickup" duration="30 min" icon={Bus} img="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=500" desc="Sit back and relax as our professional guide picks you up in a modern, climate-controlled vehicle." />
              <ItineraryStep time="9:00 AM" title="Scenic Niagara Parkway" duration="30 min" icon={Navigation} img="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=500" desc="Enjoy one of the world's most scenic drives, passing the Floral Clock and Whirlpool Rapids." />
              <ItineraryStep time="10:00 AM" title="Niagara City Boat Cruise" duration="1 Hour" icon={Wind} img="https://images.unsplash.com/photo-1527267207156-348162c94a10?auto=format&fit=crop&w=500" desc="The legendary boat tour takes you directly into the mist of the Horseshoe Falls." />
              <ItineraryStep time="11:15 AM" title="Journey Behind the Falls" duration="1 Hour" icon={MapIcon} img="https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=500" desc="Descend through bedrock to see the falls from the tunnels directly behind the cascade." />
              <ItineraryStep time="12:30 PM" title="Fallsview Lunch Break" duration="1.5 Hours" icon={Utensils} img="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500" desc="Enjoy a relaxed lunch with panoramic views of the entire falls area." />
              <ItineraryStep time="2:45 PM" title="VQA Winery Tasting" duration="1 Hour" icon={Grape} img="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=500" desc="Visit an award-winning winery for a guided tasting of world-famous Niagara Icewine." isLast />
           </div>

           {/* Why Travelers Love This */}
           <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { i: Camera, t: 'Views' },
                { i: Users, t: 'Guides' },
                { i: Bus, t: 'Comfort' },
                { i: ShieldCheck, t: 'Safety' }
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-xl transition-all">
                   <div className="bg-[#0C3136] text-[#F8A41E] p-4 rounded-2xl mb-6 shadow-lg"><item.i className="w-7 h-7" /></div>
                   <h4 className="font-black text-[10px] text-[#0C3136] uppercase tracking-widest">{item.t}</h4>
                </div>
              ))}
           </div>

           {/* Detailed Information Grid */}
           <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                 <div className="bg-[#125D66] text-white px-8 py-5 font-black text-xs uppercase tracking-widest flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#F8A41E]" /> What's Included</div>
                 <div className="p-10 space-y-5">
                    {['Round-trip transport', 'Licensed local guide', 'All attraction entrance fees', 'Icewine tasting session', 'Bottled water'].map((t, i) => (
                      <div key={i} className="flex gap-4 text-sm text-slate-600 font-bold"><span className="text-[#F8A41E] mt-0.5">✓</span> {t}</div>
                    ))}
                 </div>
              </div>
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                 <div className="bg-[#0C3136] text-white px-8 py-5 font-black text-xs uppercase tracking-widest flex items-center gap-3"><MapIcon className="w-5 h-5 text-[#F8A41E]" /> Route Overview</div>
                 <div className="p-6">
                    <div className="bg-slate-50 rounded-[1.5rem] h-56 flex flex-col items-center justify-center border-2 border-dashed border-slate-200">
                       <Navigation className="w-10 h-10 text-slate-300 mb-4" />
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Map View</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Tips Section */}
           <div className="mt-20">
              <h3 className="text-2xl font-black text-[#0C3136] mb-10">Important Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 {[
                   { i: Info, t: 'What to Wear', d: 'Comfortable walking shoes and a light jacket are recommended.' },
                   { i: Accessibility, t: 'Accessibility', d: 'The tour is fully wheelchair accessible with prior notice.' },
                   { i: MapPin, t: 'Meeting Point', d: 'Complimentary hotel pickup from all major Niagara area hotels.' },
                   { i: CloudRain, t: 'Weather Note', d: 'Tours operate rain or shine. Ponchos provided for boat ride.' }
                 ].map((tip, i) => (
                   <div key={i} className="flex gap-5 p-4 group">
                      <div className="bg-cyan-50 text-[#125D66] p-3 rounded-2xl h-fit group-hover:bg-[#F8A41E] group-hover:text-[#0C3136] transition-all"><tip.i className="w-6 h-6" /></div>
                      <div><h4 className="font-black text-[#0C3136] uppercase text-xs tracking-wider mb-2">{tip.t}</h4><p className="text-slate-500 text-sm font-medium leading-relaxed">{tip.d}</p></div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Right Sticky Sidebar */}
        <div className="lg:col-span-4">
           <div className="sticky top-28 space-y-10">
              <div className="bg-white rounded-[2.5rem] shadow-[0_40px_70px_-15px_rgba(0,0,0,0.25)] border border-slate-100 overflow-hidden">
                 <div className="bg-[#0C3136] p-10 text-white">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">BOOKING PRICE</p>
                    <h3 className="text-5xl font-black text-[#F8A41E] mb-2 tracking-tighter">CAD $129 <span className="text-xs font-medium text-slate-400">/ PER PERSON</span></h3>
                    <div className="flex items-center gap-2 mt-4 text-yellow-500 font-black text-xs"><Star className="w-4 h-4 fill-current" /> 4.8 <span className="text-white opacity-60 ml-1 font-medium">(1,215 REVIEWS)</span></div>
                 </div>
                 <div className="p-10 space-y-8">
                    <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Travel Date</label><div className="flex items-center justify-between border-2 border-slate-100 p-4 rounded-2xl bg-slate-50 group hover:border-[#F8A41E] cursor-pointer transition-all"><div className="flex items-center gap-3 font-bold text-slate-700 text-sm"><Calendar className="w-5 h-5 text-[#F8A41E]" /> Select Date</div><ChevronRight className="w-4 h-4 rotate-90 text-slate-300" /></div></div>
                    <button className="w-full bg-[#D91E1E] hover:bg-[#b01818] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-red-900/20 transition-all">RESERVE YOUR SPOT</button>
                    <button className="w-full border-2 border-slate-200 text-[#0C3136] py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-50 transition-all">CHECK AVAILABILITY</button>
                    <div className="flex items-center justify-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest pt-4"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure Payment Gateway</div>
                 </div>
              </div>

              <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
                 <div className="px-8 py-5 border-b border-slate-100 text-[10px] font-black text-[#0C3136] uppercase tracking-[0.2em]">Tour Quick Facts</div>
                 <div className="p-8 space-y-6">
                    {[
                      { l: 'Duration', v: '6-7 Hours', i: Clock },
                      { l: 'Tour Type', v: 'Guided Day Tour', i: Bus },
                      { l: 'Guests', v: '2-50 People', i: Users },
                      { l: 'Languages', v: 'EN / FR / ES', i: Globe }
                    ].map((f, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest"><f.i className="w-4 h-4 text-[#F8A41E]" /> {f.l}</div>
                        <div className="font-black text-[#0C3136] text-sm">{f.v}</div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-[#0C3136] p-10 rounded-[2.5rem] text-white relative overflow-hidden group shadow-2xl">
                 <div className="relative z-10">
                    <h4 className="font-black text-lg uppercase tracking-widest mb-3">Need Assistance?</h4>
                    <p className="text-xs text-slate-400 font-medium mb-8 leading-relaxed max-w-[180px]">Our tour specialists are available 24/7 to help plan your adventure.</p>
                    <div className="space-y-4">
                       <div className="text-[9px] font-black text-[#F8A41E] uppercase tracking-widest opacity-80">Call US DIRECTLY</div>
                       <div className="text-2xl font-black tracking-tight">+1 (905) 123-4567</div>
                    </div>
                 </div>
                 <img src="https://randomuser.me/api/portraits/women/68.jpg" className="absolute -bottom-8 -right-8 w-44 h-44 rounded-full grayscale opacity-20 border-4 border-white/10 group-hover:scale-110 transition-transform duration-700" />
              </div>
           </div>
        </div>
      </main>

      {/* FAQ Section */}
      <section className="py-24 border-t border-slate-100 bg-[#F8FAFC]">
         <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-black text-[#0C3136] mb-12 text-center tracking-tight">Frequently Asked Questions</h2>
            <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100 space-y-2">
               <FaqItem question="What time does the Niagara Day Tour start?" answer="The tour typically starts at 8:30 AM with hotel pickups beginning 30 minutes prior." />
               <FaqItem question="Is the boat cruise included in the tour price?" answer="Yes, admission to the Niagara City Cruises (seasonal) is fully included." />
               <FaqItem question="What happens if it rains during our tour?" answer="Tours operate in all weather conditions. Niagara is beautiful even in the rain!" />
               <FaqItem question="Can I cancel my booking for a refund?" answer="Yes, we offer a full refund for cancellations made at least 24 hours in advance." />
            </div>
         </div>
      </section>
    </div>
  );
};

// --- PAGE: CONTACT (Ref: image_d9ef3a.png) ---

const ContactPage = () => {
  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative h-[350px] flex items-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C3136]/90 to-[#0C3136]/40"></div>
        </div>
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6"><Mail className="w-5 h-5 text-[#F8A41E]" /><span className="text-[#F8A41E] text-[10px] font-black uppercase tracking-[0.3em]">GET IN TOUCH</span></div>
            <h1 className="text-4xl lg:text-7xl font-black leading-tight tracking-tighter">Contact Us</h1>
            <p className="text-slate-200 text-lg mt-6 max-w-lg leading-relaxed font-medium">We're here to help you plan your perfect Niagara Falls adventure. Reach out anytime.</p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-20 -mt-20 relative z-20">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
               <div className="bg-slate-50 px-10 py-6 border-b border-slate-100 flex items-center gap-4"><MessageSquare className="w-6 h-6 text-[#125D66]" /><h2 className="text-lg font-black text-[#0C3136] uppercase tracking-widest">Send Us a Message</h2></div>
               <form className="p-12 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Full Name *</label><input type="text" placeholder="John Doe" className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-[#F8A41E] focus:bg-white transition-all" /></div>
                     <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Email Address *</label><input type="email" placeholder="john@example.com" className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-[#F8A41E] focus:bg-white transition-all" /></div>
                  </div>
                  <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Message *</label><textarea rows="5" placeholder="How can we help you?" className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:border-[#F8A41E] focus:bg-white transition-all resize-none"></textarea></div>
                  <button className="bg-[#D91E1E] text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-red-900/20 hover:bg-[#b01818] transition-all flex items-center gap-3">SEND MESSAGE <Send className="w-4 h-4" /></button>
               </form>
            </div>
            
            <div className="lg:col-span-4 space-y-8">
               <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-10 space-y-10">
                  <div className="flex gap-6 items-center"><div className="bg-[#0C3136] text-[#F8A41E] p-4 rounded-2xl"><Phone className="w-6 h-6" /></div><div><h4 className="font-black text-[10px] text-slate-400 uppercase tracking-widest">Call Us</h4><p className="font-black text-[#0C3136] text-lg">+1 (905) 123-4567</p></div></div>
                  <div className="flex gap-6 items-center"><div className="bg-[#0C3136] text-[#F8A41E] p-4 rounded-2xl"><Mail className="w-6 h-6" /></div><div><h4 className="font-black text-[10px] text-slate-400 uppercase tracking-widest">Email Us</h4><p className="font-black text-[#0C3136] text-lg">info@niagara.com</p></div></div>
                  <div className="flex gap-6 items-center"><div className="bg-[#0C3136] text-[#F8A41E] p-4 rounded-2xl"><MapPin className="w-6 h-6" /></div><div><h4 className="font-black text-[10px] text-slate-400 uppercase tracking-widest">Visit Office</h4><p className="font-black text-[#0C3136] text-lg leading-tight">Clifton Hill, Niagara Falls</p></div></div>
               </div>
            </div>
         </div>
      </main>
    </div>
  );
};

// --- MAIN APP SHELL ---

export default function App() {
  const [page, setPage] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (p) => {
    setPage(p);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800">
      {/* Top Bar */}
      <div className="hidden lg:flex bg-[#0C3136] text-white px-8 py-2.5 justify-between items-center text-[10px] font-black tracking-[0.1em] uppercase">
        <div className="flex gap-10 items-center">
          <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#F8A41E]" /> Niagara Falls, Ontario, Canada</div>
          <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-[#F8A41E]" /> +1 (905) 123-4567</div>
          <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-[#F8A41E]" /> info@niagaravistatours.com</div>
        </div>
        <div className="flex gap-10 items-center">
          <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-[#F8A41E]" /> Open Daily 8:00 AM – 8:00 PM</div>
          <button className="bg-[#D91E1E] text-white px-5 py-1.5 rounded-md -my-1 font-black transition-colors hover:bg-white hover:text-[#D91E1E]">BOOK NOW</button>
        </div>
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] py-2' : 'bg-white py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div onClick={() => navigateTo('home')} className="flex items-center gap-3 cursor-pointer group">
            <div className="w-11 h-11 bg-[#F8A41E] rounded-2xl flex items-center justify-center shadow-lg shadow-[#F8A41E]/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 text-[#0C3136]" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[#0C3136] tracking-tighter leading-none">NIAGARA</h1>
              <p className="text-[9px] font-black text-[#F8A41E] tracking-[0.3em] mt-1.5 uppercase leading-none">Vista Tours</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-10">
            {['Home', 'Tours', 'Packages', 'About', 'Reviews', 'Contact'].map(item => (
              <NavItem 
                key={item} 
                label={item} 
                active={page === (item.toLowerCase() === 'tours' ? 'itinerary' : item.toLowerCase())} 
                onClick={() => navigateTo(item.toLowerCase() === 'tours' ? 'itinerary' : item.toLowerCase())} 
              />
            ))}
            <div className="flex items-center gap-2 ml-4 cursor-pointer text-[11px] font-black text-[#0C3136] hover:text-[#F8A41E] transition-colors">
               <img src="https://flagcdn.com/w20/ca.png" className="w-4 h-3 rounded-sm shadow-sm" /> EN <ChevronRight className="w-3.5 h-3.5 rotate-90" />
            </div>
          </nav>

          <button className="lg:hidden text-[#0C3136] p-2 hover:bg-slate-50 rounded-xl transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        
        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute w-full bg-white border-t border-slate-100 shadow-2xl p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
             {['Home', 'Tours', 'Packages', 'About', 'Reviews', 'Contact'].map(item => (
               <div 
                 key={item} 
                 onClick={() => navigateTo(item.toLowerCase() === 'tours' ? 'itinerary' : item.toLowerCase())} 
                 className="font-black text-sm uppercase tracking-widest text-[#0C3136] py-2 border-b border-slate-50"
               >{item}</div>
             ))}
             <button className="bg-[#D91E1E] text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest">BOOK NOW</button>
          </div>
        )}
      </header>

      {/* Main Pages */}
      <main className="min-h-screen">
        {page === 'home' && <HomePage navigateTo={navigateTo} />}
        {page === 'itinerary' && <ItineraryPage navigateTo={navigateTo} />}
        {page === 'contact' && <ContactPage />}
      </main>

      {/* Footer (Ref: image_da0218.jpg) */}
      <footer className="bg-[#0C3136] text-white pt-24 pb-10 px-4 mt-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-[#F8A41E] rounded-xl flex items-center justify-center shadow-xl shadow-black/20"><Compass className="w-6 h-6 text-[#0C3136]" /></div>
                <h1 className="text-xl font-black tracking-tighter">NIAGARA <span className="block text-[9px] tracking-[0.3em] text-[#F8A41E] leading-none uppercase mt-1">Vista Tours</span></h1>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium">Trusted local tour operator in Niagara Falls, Ontario. Creating unforgettable experiences since 2010.</p>
              <div className="flex gap-4">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#F8A41E] hover:text-[#0C3136] transition-all cursor-pointer"><FacebookIcon className="w-4.5 h-4.5" /></div>
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#F8A41E] hover:text-[#0C3136] transition-all cursor-pointer"><InstagramIcon className="w-4.5 h-4.5" /></div>
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#F8A41E] hover:text-[#0C3136] transition-all cursor-pointer"><TwitterIcon className="w-4.5 h-4.5" /></div>
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-[#F8A41E] hover:text-[#0C3136] transition-all cursor-pointer"><YoutubeIcon className="w-4.5 h-4.5" /></div>
              </div>
            </div>

            <div><h4 className="font-black text-xs uppercase tracking-[0.3em] text-[#F8A41E] mb-8">Quick Links</h4><ul className="space-y-4 text-xs font-bold text-slate-400 uppercase tracking-widest"><li onClick={() => navigateTo('home')} className="hover:text-white cursor-pointer">Home</li><li onClick={() => navigateTo('itinerary')} className="hover:text-white cursor-pointer">Tours</li><li className="hover:text-white cursor-pointer">Packages</li><li className="hover:text-white cursor-pointer">About Us</li><li onClick={() => navigateTo('contact')} className="hover:text-white cursor-pointer">Contact</li></ul></div>
            
            <div><h4 className="font-black text-xs uppercase tracking-[0.3em] text-[#F8A41E] mb-8">Top Tours</h4><ul className="space-y-4 text-xs font-bold text-slate-400 uppercase tracking-widest"><li>Niagara Day Tour</li><li>Falls & Winery Escape</li><li>Family Adventure</li><li>Boat Cruise</li><li>Private Tours</li></ul></div>

            <div><h4 className="font-black text-xs uppercase tracking-[0.3em] text-[#F8A41E] mb-8">Newsletter</h4><p className="text-xs text-slate-400 font-medium mb-6">Subscribe for exclusive travel tips and stay updated with latest offers.</p><div className="flex gap-2"><input type="email" placeholder="Enter your email" className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-xs w-full focus:ring-1 focus:ring-[#F8A41E] outline-none transition-all" /><button className="bg-[#D91E1E] text-white px-5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-[#D91E1E] transition-all">Join</button></div></div>
          </div>
          
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
               <div className="text-[10px] font-black text-slate-500 tracking-widest uppercase">© 2025 Niagara Vista Tours. All Rights Reserved.</div>
               <div className="flex items-center gap-2"><img src="https://flagcdn.com/w20/ca.png" className="w-4 h-3 grayscale opacity-30" /><span className="text-[9px] font-bold text-slate-600 uppercase tracking-tighter">Proudly Canadian Local Business</span></div>
            </div>
            <div className="flex gap-10 text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase">
              <a href="#" className="hover:text-[#F8A41E] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#F8A41E] transition-colors">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
