"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MapPin, Phone, Menu, X } from 'lucide-react';

const FacebookIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const NavItem = ({ label, href, active, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className={`flex items-center gap-1 font-black text-[11px] uppercase tracking-widest cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8A41E] rounded-md px-2 py-1 ${
      active ? 'text-[#F8A41E]' : 'text-[#0C3136] hover:text-[#F8A41E]'
    }`}
  >
    {label}
  </Link>
);

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentPath = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="w-full relative z-[100]" role="banner">
      {/* Top Notification Bar */}
      <div
        className="hidden lg:flex bg-[#0C3136] text-white px-8 py-2.5 justify-between items-center text-[10px] font-black tracking-[0.1em] uppercase"
        role="region"
        aria-label="Contact and Hours Information"
      >
        <div className="flex gap-10 items-center">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#F8A41E]" aria-hidden="true" />
            <span>Pickering, Ontario, Canada</span>
          </div>
          <a
            href="tel:14164443000"
            className="flex items-center gap-2 hover:text-[#F8A41E] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F8A41E] rounded"
          >
            <Phone className="w-3.5 h-3.5 text-[#F8A41E]" aria-hidden="true" />
            <span>(416) 444-3000</span>
          </a>
        </div>
        <div className="flex items-center gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-3 pr-4 border-r border-white/20">
            <span className="text-[9px] text-slate-300 font-bold lowercase tracking-wider">Follow:</span>
            <a
              href="https://www.facebook.com/profile.php?id=61596253191095"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Niagara Travels on Facebook"
              className="text-white hover:text-[#F8A41E] transition-colors"
            >
              <FacebookIcon className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://www.instagram.com/niagaratravels.ca/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Niagara Travels on Instagram"
              className="text-white hover:text-[#F8A41E] transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
            </a>
          </div>

          <span className="text-[10px] font-bold text-[#F8A41E] animate-pulse">
            (Open 24/7)
          </span>
          <Link
            href="/tours"
            className="bg-[#D91E1E] text-white px-5 py-1.5 rounded-md font-black hover:bg-white hover:text-[#D91E1E] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            BOOK NOW
          </Link>
        </div>
      </div>

      {/* Main Sticky Navigation Bar */}
      <div
        className={`sticky top-0 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-1' : 'bg-white py-2'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center relative">
          {/* Brand Logo */}
          <Link
            href="/"
            aria-label="Niagara Travels Home"
            className="flex items-center gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8A41E] rounded-lg"
          >
            <div className="w-48 sm:w-56 h-14 sm:h-16 relative overflow-hidden flex items-center">
              <Image
                src="/images/logo.png"
                alt="Niagara Travels - Niagara Falls Tours & Charters"
                fill
                sizes="(max-width: 640px) 192px, 224px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-8 xl:gap-10">
            <NavItem label="Home" href="/" active={currentPath === '/'} />
            <NavItem label="Tours" href="/tours" active={currentPath?.startsWith('/tour')} />
            <NavItem
              label="Custom Itinerary"
              href="/custom-itinerary"
              active={currentPath === '/custom-itinerary'}
            />
            <NavItem label="Reviews" href="/reviews" active={currentPath === '/reviews'} />
            <NavItem label="Contact" href="/contact" active={currentPath === '/contact'} />
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="lg:hidden text-[#0C3136] p-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8A41E]"
            aria-label={mobileMenuOpen ? "Close main navigation menu" : "Open main navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
          </button>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <nav
              id="mobile-navigation"
              aria-label="Mobile Navigation"
              className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-2xl p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300 z-[100]"
            >
              {[
                { label: 'Home', path: '/' },
                { label: 'Tours', path: '/tours' },
                { label: 'Custom Itinerary', path: '/custom-itinerary' },
                { label: 'Reviews', path: '/reviews' },
                { label: 'Contact', path: '/contact' },
              ].map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-black block text-sm uppercase tracking-widest py-3 border-b border-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8A41E] rounded ${
                    currentPath === item.path ? 'text-[#F8A41E]' : 'text-[#0C3136]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/tours"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center bg-[#D91E1E] text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-[#b01818] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#D91E1E]"
              >
                BOOK NOW
              </Link>
              
              {/* Mobile Social Links */}
              <div className="flex items-center justify-center gap-4 pt-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">Follow Us:</span>
                <a
                  href="https://www.facebook.com/profile.php?id=61596253191095"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Niagara Travels on Facebook"
                  className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/niagaratravels.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Niagara Travels on Instagram"
                  className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-sm"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
