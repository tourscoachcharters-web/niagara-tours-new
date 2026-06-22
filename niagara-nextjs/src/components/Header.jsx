"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MapPin, Phone, Menu, X } from 'lucide-react';

const NavItem = ({ label, href, active, onClick }) => (
  <Link 
    href={href} 
    onClick={onClick} 
    className={`flex items-center gap-1 font-black text-[11px] uppercase tracking-widest cursor-pointer transition-colors ${active ? 'text-[#F8A41E]' : 'text-[#0C3136] hover:text-[#F8A41E]'}`}
  >
    {label}
  </Link>
);

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentPath = usePathname(); // Next.js way to get current URL

  useEffect(() => { 
    const handleScroll = () => setIsScrolled(window.scrollY > 20); 
    window.addEventListener('scroll', handleScroll); 
    return () => window.removeEventListener('scroll', handleScroll); 
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:flex bg-[#0C3136] text-white px-8 py-2.5 justify-between items-center text-[10px] font-black tracking-[0.1em] uppercase">
        <div className="flex gap-10 items-center">
          <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#F8A41E]" /> Pickering, Ontario</div>
          <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-[#F8A41E]" /> (416) 444-3000</div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold text-[#F8A41E] animate-pulse">(Open 24/7)</span>
          <Link href="/tours" className="bg-[#D91E1E] text-white px-5 py-1.5 rounded-md font-black hover:bg-white hover:text-[#D91E1E] transition-all">BOOK NOW</Link>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-[100] transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-1' : 'bg-white py-2'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center relative">
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <div className="w-52 h-16 relative overflow-hidden flex items-center justify-center">
              <Image 
                src="/images/logo.png" 
                alt="Niagara Travels" 
                fill
                className="object-contain" 
                priority
              />
            </div>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-10">
            <NavItem label="Home" href="/" active={currentPath === '/'} />
            <NavItem label="Tours" href="/tours" active={currentPath?.includes('/tour')} />
            <NavItem label="Custom Itinerary" href="/custom-itinerary" active={currentPath === '/custom-itinerary'} />
            <NavItem label="Reviews" href="/reviews" active={currentPath === '/reviews'} />
            <NavItem label="Contact" href="/contact" active={currentPath === '/contact'} />
          </nav>
          
          <button className="lg:hidden text-[#0C3136] p-2" aria-label="Toggle Menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-2xl p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300 z-[100]">
               {[
                 { label: 'Home', path: '/' },
                 { label: 'Tours', path: '/tours' },
                 { label: 'Custom Itinerary', path: '/custom-itinerary' },
                 { label: 'Reviews', path: '/reviews' },
                 { label: 'Contact', path: '/contact' }
               ].map(item => (
                 <Link 
                   key={item.path} 
                   href={item.path} 
                   onClick={() => setMobileMenuOpen(false)}
                   className={`font-black block text-sm uppercase tracking-widest py-3 border-b border-slate-50 transition-colors ${currentPath === item.path ? 'text-[#F8A41E]' : 'text-[#0C3136]'}`}
                 >
                   {item.label}
                 </Link>
               ))}
               <Link href="/tours" onClick={() => setMobileMenuOpen(false)} className="block text-center bg-[#D91E1E] text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg">BOOK NOW</Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
}