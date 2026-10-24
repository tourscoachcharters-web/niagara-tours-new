"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, MessageSquare, Globe, LayoutDashboard } from 'lucide-react';

const MapleLeafIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12,2L12.88,4.12C13,4.41 13.27,4.6 13.58,4.6H15.82L14,5.92C13.74,6.11 13.64,6.44 13.73,6.74L14.41,8.86L12.59,7.54C12.33,7.35 12,7.35 11.74,7.54L9.92,8.86L10.6,6.74C10.69,6.44 10.59,6.11 10.33,5.92L8.51,4.6H10.75C11.06,4.6 11.33,4.41 11.45,4.12L12,2M12,10.33C12.44,10.33 12.8,10.69 12.8,11.13V15.93C14.53,15.13 16,13.6 16.8,11.93C17.07,11.4 17.73,11.2 18.27,11.47C18.8,11.73 19,12.4 18.73,12.93C17.67,15.13 15.8,17 13.6,18.07L14.4,20C14.53,20.4 14.33,20.87 13.93,21C13.8,21.07 13.67,21.07 13.53,21.07H10.47C10,21.07 9.67,20.73 9.67,20.33C9.67,20.2 9.67,20.07 9.73,19.93L10.53,18.13C8.33,17.07 6.47,15.2 5.4,13C5.13,12.47 5.33,11.8 5.87,11.53C6.4,11.27 7.07,11.47 7.33,12C8.13,13.67 9.6,15.13 11.33,15.93V11.27C11.33,10.87 11.6,10.53 12,10.53V10.33Z" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

const YoutubeIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#0C3136] text-white pt-16 relative overflow-hidden" role="contentinfo">
      <div className="container mx-auto px-4 relative z-10">
        {/* Newsletter Section */}
        <section
          aria-labelledby="newsletter-heading"
          className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-[2rem] p-8 lg:p-12 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 relative z-20"
        >
          <div className="text-center lg:text-left">
            <h2 id="newsletter-heading" className="text-2xl font-black text-white mb-2">
              Join Our Newsletter
            </h2>
            <p className="text-slate-300 font-medium text-sm">
              Subscribe for exclusive Niagara tour offers, seasonal tips, and priority updates.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing!");
            }}
            className="flex items-stretch w-full lg:w-auto min-w-0 sm:min-w-[400px] overflow-hidden rounded-xl shadow-2xl"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              aria-label="Email address for tour newsletter"
              className="bg-white px-6 py-4 text-sm flex-1 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#F8A41E]"
            />
            <button
              type="submit"
              className="bg-[#D91E1E] text-white px-8 font-black text-xs uppercase tracking-widest hover:bg-[#b01818] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Subscribe
            </button>
          </form>
        </section>

        {/* 4-column Main Navigation and Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative z-10">
          {/* Company Summary & Socials */}
          <div>
            <div className="flex items-center gap-3 mb-6 relative w-56 h-16">
              <Image
                src="/images/logo.png"
                alt="Niagara Travels"
                fill
                sizes="224px"
                className="object-contain"
              />
            </div>
            <p className="text-slate-300 text-xs leading-relaxed mb-8 font-medium">
              Your premier Canadian tour operator in Niagara Falls and the Greater Toronto Area. Delivering unforgettable sightseeing journeys and private charters.
            </p>
            <div className="flex gap-3" aria-label="Social media channels">
              <a
                href="https://facebook.com/niagaratravels"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Niagara Travels on Facebook"
                className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center hover:scale-110 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8A41E]"
              >
                <FacebookIcon className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://instagram.com/niagaratravels"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Niagara Travels on Instagram"
                className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center hover:scale-110 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8A41E]"
              >
                <InstagramIcon className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://niagaratravels.ca"
                aria-label="Niagara Travels Website"
                className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center hover:scale-110 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8A41E]"
              >
                <Globe className="w-4 h-4 text-white" aria-hidden="true" />
              </a>
              <a
                href="https://youtube.com/@niagaratravels"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Niagara Travels on YouTube"
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center hover:scale-110 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8A41E]"
              >
                <YoutubeIcon className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links Navigation */}
          <nav aria-labelledby="footer-quick-links">
            <h3
              id="footer-quick-links"
              className="font-black text-[10px] uppercase tracking-[0.3em] text-white mb-6 border-b border-white/10 pb-2"
            >
              Quick Links
            </h3>
            <ul className="space-y-3 text-xs font-bold text-slate-300 uppercase tracking-widest flex flex-col">
              <li>
                <Link href="/" className="hover:text-[#F8A41E] transition-colors focus-visible:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/tours" className="hover:text-[#F8A41E] transition-colors focus-visible:underline">
                  Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/custom-itinerary"
                  className="hover:text-[#F8A41E] transition-colors focus-visible:underline"
                >
                  Custom Itinerary
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-[#F8A41E] transition-colors focus-visible:underline">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F8A41E] transition-colors focus-visible:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>

          {/* Top Tours Navigation */}
          <nav aria-labelledby="footer-top-tours">
            <h3
              id="footer-top-tours"
              className="font-black text-[10px] uppercase tracking-[0.3em] text-white mb-6 border-b border-white/10 pb-2"
            >
              Featured Tours
            </h3>
            <ul className="space-y-3 text-xs font-bold text-slate-300 uppercase tracking-widest flex flex-col">
              <li>
                <Link href="/tour/classic-day-escape" className="hover:text-[#F8A41E] transition-colors focus-visible:underline">
                  Classic Day Escape
                </Link>
              </li>
              <li>
                <Link href="/tour/half-day-private" className="hover:text-[#F8A41E] transition-colors focus-visible:underline">
                  Half Day Private Tour
                </Link>
              </li>
              <li>
                <Link href="/tour/wine-country" className="hover:text-[#F8A41E] transition-colors focus-visible:underline">
                  Wine Country & Falls
                </Link>
              </li>
              <li>
                <Link href="/tour/evening-illumination" className="hover:text-[#F8A41E] transition-colors focus-visible:underline">
                  Evening Illumination
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact Details & Physical Location */}
          <section aria-labelledby="footer-contact">
            <h3
              id="footer-contact"
              className="font-black text-[10px] uppercase tracking-[0.3em] text-white mb-6 border-b border-white/10 pb-2"
            >
              Contact Us
            </h3>
            <address className="not-italic space-y-4 text-xs font-medium text-slate-300 mb-10">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F8A41E] shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  1315 Pickering Parkway, Suite 300<br />
                  Pickering, ON L1V 7G5, Canada
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#F8A41E] shrink-0" aria-hidden="true" />
                <a href="tel:14164443000" className="hover:text-[#F8A41E] transition-colors">
                  (416) 444-3000
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#F8A41E] shrink-0" aria-hidden="true" />
                <a href="mailto:info@niagaratravels.ca" className="hover:text-[#F8A41E] transition-colors">
                  info@niagaratravels.ca
                </a>
              </div>
            </address>
          </section>
        </div>

        {/* Footer Bottom Legal Bar */}
        <div className="pt-8 pb-10 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-6 relative z-10">
          <nav aria-label="Legal and Administrative" className="flex items-center gap-4 md:gap-6 text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase order-2 lg:order-1">
            <Link href="/privacy" className="hover:text-[#F8A41E] transition-colors">
              Privacy Policy
            </Link>
            <span className="opacity-30" aria-hidden="true">|</span>
            <Link href="/terms" className="hover:text-[#F8A41E] transition-colors">
              Terms & Conditions
            </Link>
            <span className="opacity-30" aria-hidden="true">|</span>
            <Link href="/admin" className="hover:text-[#F8A41E] flex items-center gap-1.5 transition-colors">
              <LayoutDashboard className="w-3 h-3" aria-hidden="true" />
              <span>Admin</span>
            </Link>
          </nav>
          <div className="flex items-center justify-center order-1 lg:order-2" aria-hidden="true">
            <MapleLeafIcon className="w-6 h-6 text-red-500" />
          </div>
          <div className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase order-3">
            © {new Date().getFullYear()} Niagara Travels. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
