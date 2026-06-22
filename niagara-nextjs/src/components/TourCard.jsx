import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Compass, LifeBuoy, Trophy, Flame, Star, Zap, Grape, ShieldCheck, Map as MapIcon, 
  Bus, Car, Ship, Award, Users, Camera, Clock, ArrowRight, Globe, Wind, Settings, Sparkles 
} from 'lucide-react';

export default function TourCard({ tour }) {
  let theme = { badgeBg: 'bg-[#125D66]', badgeIcon: Compass, footerBg: 'bg-slate-50', textColor: 'text-[#125D66]', btnBg: 'bg-[#D91E1E]', features: [{ icon: Star, label: 'Top Rated' }, { icon: Bus, label: 'Transport' }, { icon: ShieldCheck, label: 'Secure' }] };
  if (tour.tag === 'HALF DAY PRIVATE') theme = { badgeBg: 'bg-[#D97706]', badgeIcon: LifeBuoy, footerBg: 'bg-[#FFFBEB]', textColor: 'text-[#B45309]', btnBg: 'bg-[#D91E1E]', features: [{ icon: Users, label: 'Private Tour' }, { icon: Car, label: 'Hotel Pickup' }, { icon: Camera, label: 'Scenic Stops' }] };
  else if (tour.tag === 'BEST VALUE') theme = { badgeBg: 'bg-[#0D9488]', badgeIcon: Trophy, footerBg: 'bg-[#F0FDFA]', textColor: 'text-[#0F766E]', btnBg: 'bg-[#0D9488]', features: [{ icon: Sparkles, label: 'Top Attractions' }, { icon: Ship, label: 'Boat Cruise' }, { icon: Users, label: 'Expert Guide' }] };
  else if (tour.tag === 'MOST POPULAR') theme = { badgeBg: 'bg-[#6D28D9]', badgeIcon: Flame, footerBg: 'bg-[#F5F3FF]', textColor: 'text-[#5B21B6]', btnBg: 'bg-[#6D28D9]', features: [{ icon: Award, label: 'Premium Access' }, { icon: Star, label: 'Top Attractions' }, { icon: ShieldCheck, label: 'Unforgettable' }] };
  else if (tour.tag === 'ROMANTIC') theme = { badgeBg: 'bg-[#BE123C]', badgeIcon: Star, footerBg: 'bg-[#FFF1F2]', textColor: 'text-[#BE123C]', btnBg: 'bg-[#BE123C]', features: [{ icon: Zap, label: 'Illumination' }, { icon: Star, label: 'Fireworks' }, { icon: Camera, label: 'Scenic Stops' }] };
  else if (tour.tag === 'WINE LOVERS') theme = { badgeBg: 'bg-[#9D174D]', badgeIcon: Grape, footerBg: 'bg-[#FDF2F8]', textColor: 'text-[#9D174D]', btnBg: 'bg-[#9D174D]', features: [{ icon: Grape, label: 'Wine Tasting' }, { icon: Bus, label: 'Transport' }, { icon: Compass, label: 'Scenic Route' }] };
  else if (tour.tag === 'PRIVATE / VIP') theme = { badgeBg: 'bg-[#1E293B]', badgeIcon: ShieldCheck, footerBg: 'bg-[#F8FAFC]', textColor: 'text-[#334155]', btnBg: 'bg-[#0F172A]', features: [{ icon: Users, label: 'Private Group' }, { icon: Settings, label: 'Custom Route' }, { icon: Star, label: 'VIP Access' }] };
  else if (tour.tag === 'MULTI-CITY') theme = { badgeBg: 'bg-[#0369A1]', badgeIcon: MapIcon, footerBg: 'bg-[#F0F9FF]', textColor: 'text-[#0369A1]', btnBg: 'bg-[#0369A1]', features: [{ icon: Globe, label: 'Multi-City' }, { icon: Wind, label: 'Cruise' }, { icon: Users, label: 'Expert Guide' }] };

  const formattedTag = tour.tag.replace(' ', '\n');

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col h-full hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-300">
       <div className="h-56 relative overflow-hidden group">
          <Image src={tour.img} alt={tour.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className={`absolute top-4 left-4 ${theme.badgeBg} text-white pl-3 pr-4 py-2 rounded-xl flex items-center gap-3 shadow-lg`}>
             <theme.badgeIcon className="w-6 h-6" />
             <span className="text-[9px] font-black leading-tight uppercase tracking-widest text-left whitespace-pre-line">{formattedTag}</span>
          </div>
       </div>
       
       <div className="p-6 pb-2 flex-1 flex flex-col">
          <h3 className="text-xl font-black text-[#0C3136] mb-3 leading-tight tracking-tight hover:text-[#F8A41E] transition-colors line-clamp-2">{tour.title}</h3>
          <div className="flex items-center gap-4 text-[11px] font-bold text-slate-500 mb-4">
             <div className="flex items-center gap-1.5 text-yellow-500 bg-yellow-50 px-2 py-1 rounded-md"><Star className="w-3.5 h-3.5 fill-current" /> 4.8</div>
             <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md"><Clock className="w-3.5 h-3.5 text-[#125D66]" /> {tour.duration}</div>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">{tour.overview}</p>
       </div>

       <div className={`${theme.footerBg} p-5 mx-6 mb-5 rounded-2xl flex justify-between items-center`}>
          <div>
            <span className="text-slate-500 text-[9px] font-black block uppercase tracking-widest mb-0.5">From</span>
            <span className="text-2xl font-black text-[#0C3136]">CAD ${tour.price}</span>
          </div>
          <Link href={`/tour/${tour.id}`} className={`${theme.btnBg} hover:opacity-90 text-white px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center gap-1.5 group/btn`}>
            VIEW TOUR <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
       </div>

       <div className="flex justify-between items-center px-6 py-4 border-t border-slate-100 bg-white mt-auto">
          {theme.features.map((feat, idx) => (
             <div key={idx} className="flex flex-col items-center gap-1.5 w-1/3">
                <feat.icon className={`w-5 h-5 ${theme.textColor}`} />
                <span className={`text-[8px] font-black uppercase tracking-wider text-center leading-tight ${theme.textColor}`}>{feat.label}</span>
             </div>
          ))}
       </div>
    </div>
  );
}