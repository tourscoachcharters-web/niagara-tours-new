import React, { useState, useEffect, useRef } from 'react';
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
  Info, 
  Plus, 
  Minus, 
  Bus, 
  Utensils, 
  Grape, 
  Wind, 
  Camera, 
  CheckCircle2, 
  LifeBuoy, 
  Settings, 
  Coffee, 
  Plane 
} from 'lucide-react';

/**
 * PRODUCTION IMAGE GUIDE:
 * To see your images live, upload your files to 'public/images/' in your GitHub repo.
 * 
 * LOGO:
 * - Filename: logo.png
 * - Recommended Size: 300 x 100 px (Horizontal)
 */

const ImageWithFallback = ({ src, alt, className, size, isLogo }) => {
  const [error, setError] = useState(false);
  
  if (error || !src) {
    return (
      <div className={`${className} bg-slate-100 flex flex-col items-center justify-center text-slate-400 p-2 text-center border border-dashed border-slate-200 rounded-lg`}>
        <p className="text-[8px] font-black uppercase tracking-tight text-[#0C3136]">{isLogo ? 'Logo' : 'Image'}</p>
        <p className="text-[7px] font-bold text-slate-400">Filename: {src.split('/').pop()}</p>
        <p className="text-[8px] font-black text-[#F8A41E]">{size}</p>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setError(true)} />;
};

const TOURS_DATA = [
  {
    id: 'classic-day-escape',
    title: 'Niagara Classic Day Escape',
    price: '99',
    duration: '9-10 Hours',
    img: '/images/tour-classic.jpg', 
    tag: 'BEST VALUE',
    overview: 'The Niagara Classic Day Escape is perfect for first-time visitors to Niagara Falls. Whether you\'re traveling solo, with friends, or with family, this affordable day tour offers a comprehensive Niagara Falls experience, including the breathtaking boat ride and stunning views of Horseshoe Falls.',
    inclusions: ['Round-trip Transport from Toronto', 'Niagara Falls Sightseeing', 'Niagara City Cruises (Seasonal)', 'Photo Stops at iconic locations', 'Free Time for exploration', 'Maple Syrup Tasting'],
    highlights: [
      { t: 'Niagara Falls Boat Ride', d: 'Get up close to the falls with an unforgettable boat ride during the summer season.', i: Wind },
      { t: 'Picturesque Views', d: 'Stop at the best viewing spots, including Table Rock and Queen Victoria Park.', i: Camera },
      { t: 'Cultural Experience', d: 'Visit a local maple syrup farm for a sweet taste of Canadian culture.', i: Grape }
    ],
    idealFor: 'First-time visitors, budget-conscious travelers, families',
    facts: [
      { l: 'Duration', v: '9 - 10 Hours', i: Clock },
      { l: 'Group Size', v: 'Max 50 Guests', i: Users },
      { l: 'Languages', v: 'English', i: Globe },
      { l: 'Transport', v: 'Luxury Coach', i: Bus },
      { l: 'Pickup', v: 'Toronto Downtown', i: MapPin }
    ]
  },
  {
    id: 'ultimate-adventure',
    title: 'Ultimate Niagara Adventure',
    price: '199',
    duration: '9 Hours',
    img: '/images/tour-adventure.jpg',
    tag: 'MOST POPULAR',
    overview: 'The Ultimate Niagara Adventure is the complete Niagara Falls experience. Perfect for visitors who want to see it all, this tour includes iconic attractions like Journey Behind the Falls, Niagara City Cruises, and Skylon Tower, all in one action-packed day.',
    inclusions: ['Niagara City Cruises Boat Ride', 'Journey Behind the Falls Admission', 'Skylon Tower Observation Deck', 'Scenic Photo Stops', 'Maple Syrup & Chocolate Tasting'],
    highlights: [
      { t: 'Journey Behind the Falls', d: 'Discover Niagara\'s natural wonder from a unique perspective inside the rock behind the falls.', i: MapIcon },
      { t: 'Skylon Tower', d: 'Enjoy bird’s-eye views of the falls and the surrounding landscape.', i: Navigation },
      { t: 'Niagara City Cruises', d: 'Get close to the cascading waters for a truly memorable experience.', i: Wind }
    ],
    idealFor: 'Tourists who want the full Niagara experience, adventure seekers, families, couples',
    facts: [
      { l: 'Duration', v: '9 Hours', i: Clock },
      { l: 'Group Size', v: 'Max 25 Guests', i: Users },
      { l: 'Languages', v: 'English / French', i: Globe },
      { l: 'Inclusions', v: 'All Entrance Fees', i: ShieldCheck },
      { l: 'Pickup', v: 'Hotel Included', i: MapPin }
    ]
  },
  {
    id: 'evening-illumination',
    title: 'Niagara Evening Illumination Tour',
    price: '109',
    duration: '10 Hours',
    img: '/images/tour-evening.jpg',
    tag: 'ROMANTIC',
    overview: 'Experience Niagara Falls in a whole new light on this evening tour. After a day of sightseeing, enjoy the illuminated falls and seasonal fireworks display, making this the perfect evening tour for photographers, couples, and anyone wanting to see the falls sparkle at night.',
    inclusions: ['Niagara Falls Sightseeing', 'Niagara City Cruises (Daytime)', 'Skylon Tower Night Views', 'Optional Dinner Stop', 'Niagara Falls Illumination', 'Seasonal Fireworks Display'],
    highlights: [
      { t: 'Falls Illumination', d: 'See the falls lit up in vibrant colors against the night sky.', i: Zap },
      { t: 'Fireworks Display', d: 'During peak seasons, enjoy a spectacular fireworks show over the falls.', i: Star },
      { t: 'Evening Serenity', d: 'The falls look magical at night, a perfect way to wrap up your day.', i: Clock }
    ],
    idealFor: 'Couples, photographers, anyone wanting to experience Niagara Falls at night',
    facts: [
      { l: 'Duration', v: '10 Hours', i: Clock },
      { l: 'Atmosphere', v: 'Romantic / Scenic', i: Star },
      { l: 'Best For', v: 'Couples', i: Users },
      { l: 'Timing', v: '2 PM Departure', i: Clock },
      { l: 'Pickup', v: 'Toronto & Niagara', i: MapPin }
    ]
  },
  {
    id: 'wine-country',
    title: 'Niagara Wine Country & Falls Tour',
    price: '199',
    duration: 'Full Day',
    img: '/images/tour-wine.jpg',
    tag: 'WINE LOVERS',
    overview: 'This tour combines the best of both worlds—Niagara Falls’ natural beauty and the stunning vineyards of Niagara-on-the-Lake. Perfect for wine lovers, this tour offers a relaxing and scenic day with a wine-tasting experience after visiting the falls.',
    inclusions: ['Niagara Falls Sightseeing', 'Scenic Niagara-on-the-Lake Drive', 'Winery Tour & Tasting (2 locations)', 'Vineyard Walk', 'Photo Stops', 'Optional Gourmet Winery Lunch'],
    highlights: [
      { t: 'Niagara-on-the-Lake', d: 'A charming town known for its wineries, heritage, and views of Lake Ontario.', i: MapPin },
      { t: 'Wine Tastings', d: 'Sample world-class wines at two of Niagara’s premier wineries.', i: Grape },
      { t: 'Vineyard Walk', d: 'Stroll through scenic vineyards while soaking in the sights and fresh air.', i: Camera }
    ],
    idealFor: 'Wine enthusiasts, couples, small groups',
    facts: [
      { l: 'Duration', v: '8 - 9 Hours', i: Clock },
      { l: 'Tastings', v: '2 Wineries Incl.', i: Grape },
      { l: 'Group Size', v: 'Small Group (14)', i: Users },
      { l: 'Age', v: '19+ for Wine', i: ShieldCheck },
      { l: 'Pickup', v: 'Toronto/Niagara', i: MapPin }
    ]
  },
  {
    id: 'vip-experience',
    title: 'Private Custom Niagara VIP Experience',
    price: '1795',
    duration: 'Flexible',
    img: '/images/tour-vip.jpg',
    tag: 'PRIVATE / VIP',
    overview: 'For those who want a personalized experience, the Private Custom Niagara VIP Experience offers luxury transportation and a flexible itinerary, ensuring you get the most out of your day in Niagara Falls and the surrounding area. Ideal for groups, families, or corporate outings.',
    inclusions: ['Private Chauffeur & Vehicle', 'Fully Custom Itinerary', 'Niagara City Cruises', 'Skylon Tower VIP Access', 'Wine & Food Tastings', 'Flexible Schedule'],
    highlights: [
      { t: 'VIP Experience', d: 'Private vehicle with a personal driver, offering a completely tailored experience.', i: Users },
      { t: 'Personalized Itinerary', d: 'Pick and choose your own attractions to create the perfect day.', i: Navigation },
      { t: 'Exclusive Stops', d: 'Visit off-the-beaten-path spots like local wineries and unique attractions.', i: ShieldCheck }
    ],
    idealFor: 'VIP guests, families, corporate groups, special occasions',
    facts: [
      { l: 'Duration', v: 'Completely Flexible', i: Clock },
      { l: 'Transport', v: 'Private SUV/Limo', i: Bus },
      { l: 'Group Size', v: 'Up to 6 Guests', i: Users },
      { l: 'Pace', v: 'Your Choice', i: Zap },
      { l: 'Pickup', v: 'Door-to-Door', i: MapPin }
    ]
  },
  {
    id: 'three-day-tour',
    title: 'Toronto, Thousand Islands & Niagara 3-Day Tour',
    price: '329',
    duration: '3 Days',
    img: '/images/tour-3day.jpg',
    tag: 'MULTI-CITY',
    overview: 'Make the most of your trip to Canada with this 3-day guided tour, visiting Toronto, Thousand Islands, Kingston, and Niagara Falls. Ideal for those with more time, this tour gives you a taste of Canada’s natural beauty and urban culture.',
    inclusions: ['Expert Tour Guide', 'Toronto Sightseeing', 'Thousand Islands Cruise', 'Kingston Historic Visit', 'Niagara Falls Full Experience', 'Hotel Accommodations (2 nights)'],
    highlights: [
      { t: 'Thousand Islands Cruise', d: 'A stunning cruise through one of the most beautiful spots in Canada.', i: Wind },
      { t: 'Niagara Falls', d: 'Visit the world’s most famous waterfall with multiple attractions.', i: MapIcon },
      { t: 'Toronto & Kingston', d: 'Discover two major Canadian cities filled with history, culture, and architecture.', i: Globe }
    ],
    idealFor: 'International tourists, those wanting to explore multiple destinations in one tour',
    facts: [
      { l: 'Duration', v: '3 Days / 2 Nights', i: Clock },
      { l: 'Stay', v: 'Hotel Included', i: MapPin },
      { l: 'Meals', v: 'Breakfast Incl.', i: Utensils },
      { l: 'Guide', v: 'Licensed Expert', i: Users },
      { l: 'Destinations', v: '3 Major Hubs', i: Globe }
    ]
  }
];

// --- Custom Components & Icons ---
const MapleLeafIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2L12.88,4.12C13,4.41 13.27,4.6 13.58,4.6H15.82L14,5.92C13.74,6.11 13.64,6.44 13.73,6.74L14.41,8.86L12.59,7.54C12.33,7.35 12,7.35 11.74,7.54L9.92,8.86L10.6,6.74C10.69,6.44 10.59,6.11 10.33,5.92L8.51,4.6H10.75C11.06,4.6 11.33,4.41 11.45,4.12L12,2M12,10.33C12.44,10.33 12.8,10.69 12.8,11.13V15.93C14.53,15.13 16,13.6 16.8,11.93C17.07,11.4 17.73,11.2 18.27,11.47C18.8,11.73 19,12.4 18.73,12.93C17.67,15.13 15.8,17 13.6,18.07L14.4,20C14.53,20.4 14.33,20.87 13.93,21C13.8,21.07 13.67,21.07 13.53,21.07H10.47C10,21.07 9.67,20.73 9.67,20.33C9.67,20.2 9.67,20.07 9.73,19.93L10.53,18.13C8.33,17.07 6.47,15.2 5.4,13C5.13,12.47 5.33,11.8 5.87,11.53C6.4,11.27 7.07,11.47 7.33,12C8.13,13.67 9.6,15.13 11.33,15.93V11.27C11.33,10.87 11.6,10.53 12,10.53V10.33Z" />
  </svg>
);

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

const CalendarDropdown = ({ onSelectDate }) => {
  const [viewDate, setViewDate] = useState(new Date());
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const handlePrevMonth = (e) => { e.stopPropagation(); setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1)); };
  const handleNextMonth = (e) => { e.stopPropagation(); setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1)); };

  return (
    <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 z-[100] p-6 animate-in zoom-in-95 duration-200 origin-top">
      <div className="flex justify-between items-center mb-6">
        <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-all"><ChevronLeft size={18} /></button>
        <div className="font-black text-[#0C3136] text-[11px] uppercase tracking-[0.2em]">{months[viewDate.getMonth()]} {viewDate.getFullYear()}</div>
        <button onClick={handleNextMonth} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-all"><ChevronRight size={18} /></button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2 text-center text-[10px] font-black text-slate-300 uppercase">
        {days.map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {[...Array(firstDayOfMonth)].map((_, i) => <div key={`empty-${i}`} />)}
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const isToday = new Date().toDateString() === new Date(viewDate.getFullYear(), viewDate.getMonth(), day).toDateString();
          return (
            <button key={day} type="button" onClick={(e) => { e.stopPropagation(); onSelectDate(new Date(viewDate.getFullYear(), viewDate.getMonth(), day)); }}
              className={`h-9 w-full rounded-xl text-xs font-bold transition-all ${isToday ? 'bg-[#F8A41E] text-[#0C3136]' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const NavItem = ({ label, active, onClick }) => (
  <div onClick={onClick} className={`flex items-center gap-1 font-black text-[11px] uppercase tracking-widest cursor-pointer transition-colors ${active ? 'text-[#F8A41E]' : 'text-[#0C3136] hover:text-[#F8A41E]'}`}>
    {label}
  </div>
);

// --- SHARED COMPONENT: WHY TRAVELERS LOVE THIS TOUR ---
const WhyTravelersLoveSection = () => (
  <section className="py-20 bg-slate-50/50 border-t border-slate-100">
    <div className="container mx-auto px-4">
      <h3 className="text-2xl font-black text-[#0C3136] mb-10 tracking-tight text-center lg:text-left">Why Travelers Love This Tour</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Camera, t: 'Breathtaking Views', d: 'See the natural wonder of Niagara Falls up close.', color: 'text-teal-600', bg: 'bg-teal-50' },
          { icon: Users, t: 'Expert Local Guide', d: 'Learn the history and stories from our friendly guides.', color: 'text-blue-600', bg: 'bg-blue-50' },
          { icon: Bus, t: 'Comfortable Transport', d: 'Travel in clean, modern vehicles with A/C.', color: 'text-orange-600', bg: 'bg-orange-50' },
          { icon: ShieldCheck, t: 'Free Cancellation', d: 'Cancel up to 24 hours in advance for a full refund.', color: 'text-red-600', bg: 'bg-red-50' }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 group hover:shadow-md transition-all">
            <div className={`shrink-0 w-12 h-12 rounded-full ${item.bg} ${item.color} flex items-center justify-center`}>
              <item.icon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[13px] text-[#0C3136] leading-tight mb-1">{item.t}</h4>
              <p className="text-[11px] text-slate-500 font-medium leading-tight">{item.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- PAGE: HOME ---
const HomePage = ({ navigateTo }) => {
  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback src="/images/hero-home.jpg" size="1920 x 1080 px" alt="Niagara Falls Background" className="w-full h-full object-cover" />
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
              <button onClick={() => navigateTo('classic-day-escape')} className="bg-[#D91E1E] hover:bg-[#b01818] text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-900/30 flex items-center gap-3">EXPLORE TOURS <ChevronRight className="w-4 h-4" /></button>
              <button onClick={() => navigateTo('custom-itinerary')} className="bg-white hover:bg-slate-50 text-[#0C3136] px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-3"><Settings className="w-4 h-4 text-[#F8A41E]" /> CUSTOM PACKAGE</button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Factors */}
      <section className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {[
            { icon: Compass, title: "Local Guides", desc: "Born and raised experts" },
            { icon: Bus, title: "Transport", desc: "Modern A/C vehicles" },
            { icon: Clock, title: "Flexible", desc: "Customize your schedule" },
            { icon: Star, title: "Top Rated", desc: "Thousands of reviews" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-8 group cursor-pointer hover:bg-slate-50 transition-colors rounded-2xl">
              <div className="bg-[#0C3136]/5 p-4 rounded-full text-[#125D66] group-hover:bg-[#F8A41E] group-hover:text-[#0C3136] transition-all"><item.icon className="w-6 h-6" /></div>
              <div><h4 className="font-black text-[11px] text-[#0C3136] uppercase tracking-wider">{item.title}</h4><p className="text-xs text-slate-500 font-medium">{item.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-b from-white to-[#F0F9FF] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8">
            <div className="lg:col-span-3">
              <p className="text-[#D91E1E] font-black text-[10px] uppercase tracking-[0.3em] mb-4">Why Choose Us</p>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0C3136] leading-[1.1] mb-6">Experience Niagara Like Never Before</h2>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                We're local, passionate, and dedicated to showing you the very best of Niagara Falls with exceptional service and unforgettable moments.
              </p>
            </div>
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-4 bg-[#F8A41E]/10 rounded-[4rem] blur-2xl group-hover:bg-[#F8A41E]/20 transition-all"></div>
              <div className="relative aspect-[4/3] rounded-[3rem] lg:rounded-[4rem] overflow-hidden border-8 border-white shadow-2xl">
                <ImageWithFallback src="/images/why-choose-us.jpg" size="1200 x 900 px" alt="Niagara Falls Tour Group" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C3136]/40 to-transparent"></div>
              </div>
            </div>
            <div className="lg:col-span-4 space-y-10">
              {[
                { icon: Users, t: "Local Experts", d: "Knowledgeable guides who bring Niagara's history and stories to life." },
                { icon: Compass, t: "Small Group Tours", d: "Personalized experiences with more attention and flexibility." },
                { icon: ShieldCheck, t: "Safety & Comfort", d: "Your safety and comfort are our top priorities." },
                { icon: Globe, t: "Sustainable Tourism", d: "We care for Niagara and support our local community." }
              ].map((feat, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-white shadow-lg border border-slate-50 flex items-center justify-center text-[#125D66] group-hover:bg-[#125D66] group-hover:text-white transition-all duration-300">
                    <feat.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-[#0C3136] uppercase tracking-wider mb-2">{feat.t}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{feat.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tour Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
             <div><p className="text-[#F8A41E] font-black text-xs uppercase tracking-[0.4em] mb-2">OUR SIGNATURE TOURS</p><h2 className="text-4xl font-black text-[#0C3136]">Explore Niagara & Beyond</h2></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TOURS_DATA.map((tour, i) => (
              <div key={i} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-lg overflow-hidden group flex flex-col h-full">
                 <div className="h-64 relative overflow-hidden">
                    <ImageWithFallback src={tour.img} size="800 x 600 px" alt={tour.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <span className="absolute top-4 left-4 bg-[#125D66] text-white text-[9px] font-black px-3 py-1 rounded-md uppercase tracking-widest">{tour.tag}</span>
                 </div>
                 <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-xl font-black text-[#0C3136] mb-2">{tour.title}</h3>
                    <div className="flex items-center gap-4 text-[11px] font-black text-slate-400 mb-6">
                       <div className="flex items-center gap-1 text-yellow-500"><Star className="w-3.5 h-3.5 fill-current" /> 4.8</div>
                       <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {tour.duration}</div>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1 line-clamp-3">{tour.overview}</p>
                    <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-auto">
                       <div><span className="text-slate-400 text-[10px] font-black block uppercase tracking-widest">FROM</span><span className="text-2xl font-black text-[#0C3136]">CAD ${tour.price}</span></div>
                       <button onClick={() => navigateTo(tour.id)} className="bg-[#D91E1E] hover:bg-[#b01818] text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">VIEW TOUR</button>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// --- PAGE: CUSTOM ITINERARY ---
const CustomItineraryPage = ({ navigateTo }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);
  const [interests, setInterests] = useState([]);

  const attractions = [
    { id: 'boat', t: 'Boat Cruise', i: Wind, p: 'High' },
    { id: 'behind', t: 'Behind the Falls', i: MapIcon, p: 'Must-See' },
    { id: 'heli', t: 'Helicopter View', i: Plane, p: 'Premium' },
    { id: 'skylon', t: 'Skylon Tower', i: Navigation, p: 'Panoramic' },
    { id: 'wine', t: 'Winery Tours', i: Grape, p: 'Social' },
    { id: 'dine', t: 'Gourmet Dining', i: Utensils, p: 'Luxury' },
    { id: 'parkway', t: 'Scenic Parkway', i: Camera, p: 'Relaxing' },
    { id: 'clifton', t: 'Clifton Hill', i: Zap, p: 'Family' }
  ];

  const toggleInterest = (id) => {
    setInterests(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => { if (calendarRef.current && !calendarRef.current.contains(event.target)) setShowCalendar(false); };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="animate-in fade-in duration-700 bg-white">
      {/* Hero */}
      <section className="relative h-[400px] flex items-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback src="/images/hero-custom.jpg" size="1920 x 800 px" alt="Custom Itinerary Background" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-[#0C3136]/60"></div>
        </div>
        <div className="container mx-auto px-4 z-10">
          <p className="text-[#F8A41E] font-black text-[10px] uppercase tracking-[0.4em] mb-4">Build Your Experience</p>
          <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tighter">Custom <span className="text-[#F8A41E]">Itinerary</span></h1>
          <p className="text-slate-300 text-lg max-w-xl font-medium mt-6">Tell us what you love, and our experts will craft a unique Niagara Falls package just for you.</p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8">
           <div className="space-y-12">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-[#0C3136] text-[#F8A41E] flex items-center justify-center font-black">1</div>
                  <h2 className="text-2xl font-black text-[#0C3136]">What interests you?</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {attractions.map(attr => (
                    <div 
                      key={attr.id}
                      onClick={() => toggleInterest(attr.id)}
                      className={`cursor-pointer p-6 rounded-3xl border-2 transition-all group flex flex-col items-center text-center ${interests.includes(attr.id) ? 'bg-[#0C3136] border-[#0C3136] text-white' : 'bg-white border-slate-100 hover:border-[#F8A41E]'}`}
                    >
                      <attr.i className={`w-8 h-8 mb-4 transition-colors ${interests.includes(attr.id) ? 'text-[#F8A41E]' : 'text-[#125D66]'}`} />
                      <h4 className="font-black text-[11px] uppercase tracking-wider mb-1">{attr.t}</h4>
                      <p className={`text-[9px] font-bold ${interests.includes(attr.id) ? 'text-white/60' : 'text-slate-400'}`}>{attr.p}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-slate-100">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-full bg-[#0C3136] text-[#F8A41E] flex items-center justify-center font-black">2</div>
                    <h2 className="text-2xl font-black text-[#0C3136]">The Logistics</h2>
                  </div>
                  <div className="space-y-6">
                    <div ref={calendarRef} className="relative">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Travel Date</label>
                      <button onClick={() => setShowCalendar(!showCalendar)} className="w-full flex items-center justify-between border-2 border-slate-100 p-4 rounded-2xl bg-white font-bold text-slate-600 text-sm">
                        <div className="flex items-center gap-3"><Calendar className="w-5 h-5 text-[#F8A41E]" /> {selectedDate || "Select Date"}</div>
                        <ChevronRight className="w-4 h-4 rotate-90" />
                      </button>
                      {showCalendar && <CalendarDropdown onSelectDate={(d) => { setSelectedDate(d.toLocaleDateString()); setShowCalendar(false); }} />}
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Number of Guests</label>
                      <select className="w-full border-2 border-slate-100 p-4 rounded-2xl bg-white font-black text-[#0C3136] text-sm appearance-none outline-none focus:border-[#F8A41E]">
                        <option>2 Adults</option>
                        <option>1 Adult</option>
                        <option>Small Group (4-6)</option>
                        <option>Large Group (10+)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-full bg-[#0C3136] text-[#F8A41E] flex items-center justify-center font-black">3</div>
                    <h2 className="text-2xl font-black text-[#0C3136]">Your Contact</h2>
                  </div>
                  <div className="space-y-4">
                    <input type="text" placeholder="Full Name" className="w-full p-4 border-2 border-slate-100 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E]" />
                    <input type="email" placeholder="Email Address" className="w-full p-4 border-2 border-slate-100 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E]" />
                    <textarea placeholder="Tell us more about your special requirements..." className="w-full p-4 border-2 border-slate-100 rounded-2xl font-bold text-sm outline-none h-32 focus:border-[#F8A41E]" />
                  </div>
                </div>
              </div>

              <button className="w-full bg-[#D91E1E] text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.4em] shadow-xl shadow-red-900/20 hover:bg-[#b01818] transition-all transform hover:-translate-y-1">
                GENERATE CUSTOM PROPOSAL
              </button>
           </div>
        </div>

        <div className="lg:col-span-4">
           <div className="sticky top-28 space-y-10">
              <div className="bg-[#0C3136] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <h3 className="text-xl font-black mb-6">Why Customize?</h3>
                <ul className="space-y-6">
                  {[
                    { t: 'Private Pace', d: 'No rushing. Spend as much time as you want at each spot.' },
                    { t: 'Hidden Gems', d: 'Visit local spots typical tours miss.' },
                    { t: 'VIP Access', d: 'Skip the lines with our premium bookings.' },
                    { t: 'Door-to-Door', d: 'Private pickup from any location in Ontario.' }
                  ].map((benefit, i) => (
                    <li key={i} className="flex gap-4">
                      <CheckCircle2 className="w-5 h-5 text-[#F8A41E] shrink-0" />
                      <div>
                        <h4 className="font-black text-xs uppercase tracking-widest">{benefit.t}</h4>
                        <p className="text-[11px] text-slate-400 mt-1">{benefit.d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl">
                 <h4 className="font-black text-[#0C3136] text-sm uppercase tracking-widest mb-6">Need Immediate Help?</h4>
                 <div className="space-y-4">
                   <div className="flex items-center gap-3 text-lg font-black text-[#0C3136] hover:text-[#D91E1E] transition-colors cursor-pointer"><Phone className="w-5 h-5 text-[#F8A41E]" /> +1 (905) 123-4567</div>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed">Call us and speak directly with a local planning expert today.</p>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

// --- PAGE: TOUR DETAIL ---
const TourDetailPage = ({ tourId, navigateTo }) => {
  const tour = TOURS_DATA.find(t => t.id === tourId);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => { if (calendarRef.current && !calendarRef.current.contains(event.target)) setShowCalendar(false); };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!tour) return <div className="p-20 text-center font-black">Tour not found.</div>;

  return (
    <div className="animate-in fade-in duration-700 bg-white">
      <section className="relative h-[480px] flex items-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback src={tour.img} size="1920 x 800 px" alt={tour.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C3136]/90 via-[#0C3136]/50 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 z-10">
           <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest mb-6 cursor-pointer" onClick={() => navigateTo('home')}>Home / Tours / {tour.title}</div>
           <span className="bg-cyan-600 text-white text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-[0.2em] mb-6 inline-block shadow-lg">{tour.tag}</span>
           <h1 className="text-4xl lg:text-7xl font-black leading-tight tracking-tighter mb-4">{tour.title}</h1>
           <div className="flex flex-wrap gap-8 p-6 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 w-fit">
              <div className="flex items-center gap-3"><Clock className="w-5 h-5 text-[#F8A41E]" /><span className="text-sm font-black">{tour.duration}</span></div>
              <div className="flex items-center gap-3"><Users className="w-5 h-5 text-[#F8A41E]" /><span className="text-sm font-black">Group & Private Available</span></div>
           </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8">
           <h2 className="text-3xl font-black text-[#0C3136] mb-6 tracking-tight">Overview</h2>
           <p className="text-slate-600 text-lg leading-relaxed mb-12">{tour.overview}</p>
           
           <h3 className="text-2xl font-black text-[#0C3136] mb-10 tracking-tight">Tour Highlights</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {tour.highlights.map((h, i) => (
                <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:shadow-xl transition-all">
                  <div className="bg-[#0C3136]/5 text-[#125D66] p-4 rounded-2xl mb-6 group-hover:bg-[#F8A41E] group-hover:text-[#0C3136] transition-all"><h.i className="w-7 h-7" /></div>
                  <h4 className="font-black text-[11px] text-[#0C3136] uppercase tracking-widest mb-2">{h.t}</h4>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{h.d}</p>
                </div>
              ))}
           </div>

           <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden mb-12">
              <div className="bg-[#125D66] text-white px-8 py-5 font-black text-xs uppercase tracking-widest">Package Inclusions</div>
              <div className="p-10 space-y-4 grid grid-cols-1 md:grid-cols-2">
                 {tour.inclusions.map((item, i) => (
                   <div key={i} className="flex gap-4 text-xs text-slate-600 font-bold items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> {item}</div>
                 ))}
              </div>
           </div>
        </div>

        {/* --- ENHANCED SIDEBAR --- */}
        <div className="lg:col-span-4">
           <div className="sticky top-28 space-y-10">
              {/* Main Booking Card */}
              {/* Removed overflow-hidden to allow calendar to show fully */}
              <div className="bg-white rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] border border-slate-100 group">
                 <div className="bg-gradient-to-br from-[#0C3136] to-[#125D66] px-10 py-12 text-white relative rounded-t-[2.5rem] overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-8 leading-tight relative z-10">Book Your Experience</h3>
                    <div className="space-y-0.5 relative z-10">
                       <p className="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Starting From</p>
                       <h4 className="text-[44px] font-black text-[#F8A41E] tracking-tighter leading-none flex items-baseline gap-2">
                          CAD ${tour.price} <span className="text-[12px] font-black text-white/90 tracking-normal italic leading-none">/ person</span>
                       </h4>
                    </div>
                    <div className="flex flex-col gap-2 mt-6 relative z-10">
                      <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-emerald-400">
                         <Zap className="w-3.5 h-3.5 fill-current" /> BEST PRICE GUARANTEED
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-bold text-white/90 bg-white/10 w-fit px-3 py-1.5 rounded-lg border border-white/10 animate-pulse">
                        <Users className="w-3.5 h-3.5" /> 10 people already book this tour, Hurry get yours!
                      </div>
                    </div>
                 </div>
                 
                 <div className="p-10 space-y-8 bg-white relative rounded-b-[2.5rem]">
                    <div ref={calendarRef} className="relative">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3.5 block">1. Select Tour Date</label>
                       <button type="button" onClick={() => setShowCalendar(!showCalendar)} className="w-full flex items-center justify-between border border-slate-200 p-4.5 rounded-2xl bg-white hover:border-[#F8A41E] cursor-pointer transition-all shadow-sm relative z-10">
                          <div className="flex items-center gap-3.5 font-bold text-slate-600 text-sm"><Calendar className="w-5 h-5 text-[#F8A41E]" /> {selectedDate || "Choose Date"}</div>
                          <ChevronRight className={`w-4 h-4 rotate-90 text-slate-300 transition-transform ${showCalendar ? 'rotate-[-90deg]' : ''}`} />
                       </button>
                       {showCalendar && <CalendarDropdown onSelectDate={(d) => { setSelectedDate(d.toLocaleDateString()); setShowCalendar(false); }} />}
                    </div>

                    <button className="w-full bg-[#D91E1E] hover:bg-[#b01818] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl shadow-red-900/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0">RESERVE NOW</button>
                    <div className="flex items-center justify-center gap-4 pt-2 border-t border-slate-50">
                       <div className="flex items-center gap-1.5 text-slate-400 text-[9px] font-black uppercase tracking-widest"><ShieldCheck className="w-3 h-3" /> Secure Payment</div>
                       <div className="flex items-center gap-1.5 text-slate-400 text-[9px] font-black uppercase tracking-widest"><Clock className="w-3 h-3" /> Instant Confirmation</div>
                    </div>
                 </div>
              </div>

              {tour.facts && (
                <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
                   <div className="px-8 py-5 border-b border-slate-100 text-[10px] font-black text-[#0C3136] uppercase tracking-[0.2em] bg-slate-50/50">Tour Quick Facts</div>
                   <div className="p-8 space-y-5">
                      {tour.facts.map((f, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest"><f.i className="w-4 h-4 text-[#F8A41E]" /> {f.l}</div>
                          <div className="font-black text-[#0C3136] text-[11px]">{f.v}</div>
                        </div>
                      ))}
                   </div>
                </div>
              )}
           </div>
        </div>
      </main>
      <WhyTravelersLoveSection />
    </div>
  );
};

// --- PAGE: CONTACT ---
const ContactPage = () => (
  <div className="animate-in fade-in duration-700">
    <section className="relative h-[350px] flex items-center text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ImageWithFallback src="/images/hero-contact.jpg" size="1920 x 800 px" alt="Contact Us Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C3136]/90 to-[#0C3136]/40"></div>
      </div>
      <div className="container mx-auto px-4 z-10"><h1 className="text-4xl lg:text-7xl font-black leading-tight tracking-tighter">Contact Us</h1></div>
    </section>
    <main className="container mx-auto px-4 py-20 -mt-20 relative z-20"><div className="bg-white rounded-[2.5rem] shadow-2xl p-12 border border-slate-100"><h2 className="text-2xl font-black mb-8 text-[#0C3136]">Get in Touch</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-12"><div className="space-y-6"><div className="flex gap-4"><Phone className="text-[#F8A41E]" /> +1 (905) 123-4567</div><div className="flex gap-4"><Mail className="text-[#F8A41E]" /> info@niagaravistatours.com</div></div><form className="space-y-4"><input type="text" placeholder="Your Name" className="w-full p-4 bg-slate-50 rounded-xl" /><textarea placeholder="How can we help?" className="w-full p-4 bg-slate-50 rounded-xl h-32" /><button className="bg-[#D91E1E] text-white py-4 px-8 rounded-xl font-black">SEND MESSAGE</button></form></div></div></main>
  </div>
);

// --- MAIN APP ---
export default function App() {
  const [page, setPage] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => { const handleScroll = () => setIsScrolled(window.scrollY > 20); window.addEventListener('scroll', handleScroll); return () => window.removeEventListener('scroll', handleScroll); }, []);
  const navigateTo = (p) => { setPage(p); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  
  const renderPage = () => { 
    if (page === 'home') return <HomePage navigateTo={navigateTo} />; 
    if (page === 'contact') return <ContactPage />; 
    if (page === 'custom-itinerary') return <CustomItineraryPage navigateTo={navigateTo} />;
    return <TourDetailPage tourId={page} navigateTo={navigateTo} />; 
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800">
      <div className="hidden lg:flex bg-[#0C3136] text-white px-8 py-2.5 justify-between items-center text-[10px] font-black tracking-[0.1em] uppercase">
        <div className="flex gap-10 items-center"><div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#F8A41E]" /> Niagara Falls, Ontario</div><div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-[#F8A41E]" /> +1 (905) 123-4567</div></div>
        <div className="flex items-center gap-4"><span className="text-[10px] font-bold text-[#F8A41E] animate-pulse">(Open 24/7)</span><button className="bg-[#D91E1E] text-white px-5 py-1.5 rounded-md font-black hover:bg-white hover:text-[#D91E1E] transition-all">BOOK NOW</button></div>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-white py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div onClick={() => navigateTo('home')} className="flex items-center gap-3 cursor-pointer">
            <div className="w-12 h-12 overflow-hidden flex items-center justify-center">
              <ImageWithFallback src="/images/logo.png" size="300 x 100 px" isLogo alt="Niagara Vista Tours" className="max-h-full max-w-full object-contain" />
            </div>
            <div><h1 className="text-2xl font-black text-[#0C3136] tracking-tighter leading-none uppercase">Niagara</h1><p className="text-[9px] font-black text-[#F8A41E] tracking-[0.3em] uppercase leading-none">Vista Tours</p></div>
          </div>
          <nav className="hidden lg:flex items-center gap-10">
            <NavItem label="Home" active={page === 'home'} onClick={() => navigateTo('home')} />
            <NavItem label="Custom Itinerary" active={page === 'custom-itinerary'} onClick={() => navigateTo('custom-itinerary')} />
            <NavItem label="Contact" active={page === 'contact'} onClick={() => navigateTo('contact')} />
          </nav>
          <button className="lg:hidden text-[#0C3136]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
        </div>
      </header>

      <main className="min-h-screen">
        {renderPage()}
      </main>

      <footer className="bg-[#0C3136] text-white pt-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <ImageWithFallback src="/images/logo.png" size="300 x 100 px" isLogo alt="Logo" className="w-12 h-12 object-contain" />
                <h1 className="text-lg font-black tracking-tighter uppercase leading-none">Niagara <span className="block text-[9px] tracking-[0.2em] text-[#F8A41E] mt-1">Vista Tours</span></h1>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-8 font-medium">Your trusted local tour operator in Niagara Falls, Canada. Creating unforgettable experiences since 2010.</p>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"><FacebookIcon className="w-4 h-4 text-white" /></div>
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"><InstagramIcon className="w-4 h-4 text-white" /></div>
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"><Globe className="w-4 h-4 text-white" /></div>
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"><MessageSquare className="w-4 h-4 text-white" /></div>
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"><YoutubeIcon className="w-4 h-4 text-white" /></div>
              </div>
            </div>
            <div>
              <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-white mb-8 border-b border-white/10 pb-2">Quick Links</h4>
              <ul className="space-y-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <li onClick={() => navigateTo('home')} className="hover:text-[#F8A41E] cursor-pointer transition-colors">Home</li>
                <li onClick={() => navigateTo('custom-itinerary')} className="hover:text-[#F8A41E] cursor-pointer transition-colors">Custom Itinerary</li>
                <li className="hover:text-[#F8A41E] cursor-pointer transition-colors">About Us</li>
                <li onClick={() => navigateTo('contact')} className="hover:text-[#F8A41E] cursor-pointer transition-colors">Contact Us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-white mb-8 border-b border-white/10 pb-2">Top Tours</h4>
              <ul className="space-y-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <li onClick={() => navigateTo('classic-day-escape')} className="cursor-pointer hover:text-[#F8A41E]">Niagara Day Tour</li>
                <li onClick={() => navigateTo('wine-country')} className="cursor-pointer hover:text-[#F8A41E]">Falls & Winery Escape</li>
                <li onClick={() => navigateTo('ultimate-adventure')} className="cursor-pointer hover:text-[#F8A41E]">Family Adventure Package</li>
                <li className="cursor-pointer hover:text-[#F8A41E]">Boat Cruise</li>
                <li onClick={() => navigateTo('vip-experience')} className="cursor-pointer hover:text-[#F8A41E]">Private Tours</li>
                <li onClick={() => navigateTo('custom-itinerary')} className="cursor-pointer hover:text-[#F8A41E]">Custom Packages</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-white mb-8 border-b border-white/10 pb-2">Contact Us</h4>
              <ul className="space-y-4 text-xs font-medium text-slate-400">
                <li className="flex items-start gap-3"><MapPin className="w-4 h-4 text-[#F8A41E] shrink-0" /><span>Niagara Falls, Ontario,<br />Canada L2G 3Y9</span></li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#F8A41E] shrink-0" /><span>+1 (905) 123-4567</span></li>
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#F8A41E] shrink-0" /><span>info@niagaravistatours.com</span></li>
                <li className="flex items-center gap-3"><Clock className="w-4 h-4 text-[#F8A41E] shrink-0" /><span>Open Daily 8:00 AM – 8:00 PM</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-white mb-8 border-b border-white/10 pb-2">Newsletter</h4>
              <p className="text-xs text-slate-400 font-medium mb-6">Subscribe for exclusive offers, travel tips and the latest updates.</p>
              <div className="flex items-stretch gap-0 overflow-hidden rounded-lg">
                <input type="email" placeholder="Enter your email" className="bg-white px-4 py-3 text-xs w-full text-slate-800 focus:outline-none" />
                <button className="bg-[#D91E1E] text-white px-4 font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-[#D91E1E] transition-all">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="pt-8 pb-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase order-2 md:order-1">© 2026 Niagara Vista Tours. All Rights Reserved.</div>
            <div className="flex items-center justify-center order-1 md:order-2"><MapleLeafIcon className="w-6 h-6 text-red-600" /></div>
            <div className="flex gap-6 text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase order-3">
              <a href="#" className="hover:text-[#F8A41E]">Privacy Policy</a><span className="opacity-20">|</span><a href="#" className="hover:text-[#F8A41E]">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
```eof
