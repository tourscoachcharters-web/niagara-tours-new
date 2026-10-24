import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import ContactMapWrapper from '@/components/ContactMapWrapper';
import { ORGANIZATION_SCHEMA, getBreadcrumbSchema, JsonLd } from '@/lib/schema';
import { 
  MapPin, Phone, Mail, ShieldCheck, ChevronRight, 
  Clock, MessageSquare, Headphones, Award, 
  Bus, CheckCircle2, ArrowRight, Sparkles 
} from 'lucide-react';

export const revalidate = 3600;

export const metadata = {
  title: "Contact Us & 24/7 Concierge Support | Niagara Travels",
  description:
    "Have questions about our Niagara Falls tours or need help arranging private charters? Contact our local Toronto team 24/7 at (416) 444-3000 or via WhatsApp.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Niagara Travels | Local Tour Operator & 24/7 Concierge",
    description:
      "Get in touch with our licensed Toronto tour experts 24/7 for instant bookings, private executive charters, group rates, and pickup schedules.",
    url: "https://www.niagaratravels.ca/contact",
    images: [
      {
        url: "/images/hero-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Niagara Travels Support & Dispatch",
      },
    ],
  },
};

export default function ContactPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Contact Us", url: "/contact" },
  ];

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Niagara Travels',
    url: 'https://www.niagaratravels.ca/contact',
    mainEntity: {
      ...ORGANIZATION_SCHEMA,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+1-416-444-3000',
          contactType: 'customer support',
          areaServed: 'CA',
          availableLanguage: ['en', 'fr'],
        },
        {
          '@type': 'ContactPoint',
          telephone: '+1-416-444-3000',
          contactType: 'reservations',
          areaServed: 'CA',
          availableLanguage: ['en'],
        },
      ],
    },
  };

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={contactSchema} />

      <div className="bg-[#F8FAFC] min-h-screen">
        {/* ============================================================= */}
        {/* HERO BANNER SECTION */}
        {/* ============================================================= */}
        <header className="relative py-20 lg:py-28 text-white overflow-hidden bg-[#0C3136]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-contact.jpg"
              alt="Niagara Falls skyline and scenic misty vistas"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C3136] via-[#0C3136]/90 to-[#0C3136]/70" />
          </div>

          <div className="container mx-auto px-4 relative z-10 max-w-7xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-xs font-black text-slate-300 uppercase tracking-widest">
                <li>
                  <Link href="/" className="hover:text-[#F8A41E] transition-colors focus-visible:underline">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </li>
                <li className="text-[#F8A41E]" aria-current="page">
                  Contact Us
                </li>
              </ol>
            </nav>

            <div className="inline-flex items-center gap-2 bg-[#F8A41E] text-[#0C3136] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-6 shadow-lg shadow-amber-500/10">
              <span className="w-2 h-2 rounded-full bg-[#0C3136] animate-ping" />
              <span>24/7 Canadian Tour Concierge</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight mb-6 max-w-3xl">
              We&apos;re Here to Help Plan Your Perfect Journey
            </h1>

            <p className="text-slate-200 text-base sm:text-xl max-w-2xl font-medium leading-relaxed mb-8">
              Whether you need immediate day-of-tour pickup coordination, custom VIP charter planning, or have general questions, our Toronto tour specialists are available around the clock.
            </p>

            {/* Quick Stat Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10 text-xs font-black text-slate-300 uppercase tracking-wider">
              <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10">
                <Clock className="w-3.5 h-3.5 text-[#F8A41E]" />
                <span>&lt; 15 Min Response Time</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Free 24h Cancellation</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10">
                <Bus className="w-3.5 h-3.5 text-sky-400" />
                <span>5 Downtown Toronto Boarding Hubs</span>
              </span>
            </div>
          </div>
        </header>

        {/* ============================================================= */}
        {/* 4 DIRECT CONTACT CHANNELS (BENTO GRID) */}
        {/* ============================================================= */}
        <section aria-labelledby="channels-heading" className="container mx-auto px-4 max-w-7xl -mt-10 relative z-20">
          <h2 id="channels-heading" className="sr-only">Contact Channels</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Phone Card */}
            <a
              href="tel:14164443000"
              className="bg-white p-6 rounded-3xl shadow-xl border border-slate-200/80 hover:border-[#0C3136] hover:shadow-2xl transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#F8A41E] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#0C3136] group-hover:text-white transition-all">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                  Toll-Free &amp; Local
                </span>
                <p className="text-xl font-black text-[#0C3136] group-hover:text-[#F8A41E] transition-colors leading-tight mb-2">
                  (416) 444-3000
                </p>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Direct phone access to our dispatch operators. Available 24/7.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-[#125D66]">
                <span>Call Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* 2. WhatsApp Card */}
            <a
              href="https://wa.me/14164443000?text=Hello%20Niagara%20Travels,%20I%20have%20an%20inquiry%20regarding%20a%20tour."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-3xl shadow-xl border border-slate-200/80 hover:border-emerald-600 hover:shadow-2xl transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                  Instant Messaging
                </span>
                <p className="text-xl font-black text-[#0C3136] group-hover:text-emerald-600 transition-colors leading-tight mb-2">
                  WhatsApp Concierge
                </p>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Fast mobile inquiries, custom quotes, and day-of-tour directions.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-emerald-600">
                <span>Start WhatsApp Chat</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* 3. Email Card */}
            <a
              href="mailto:info@niagaratravels.ca"
              className="bg-white p-6 rounded-3xl shadow-xl border border-slate-200/80 hover:border-[#125D66] hover:shadow-2xl transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#125D66] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#125D66] group-hover:text-white transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                  Email Desk
                </span>
                <p className="text-base sm:text-lg font-black text-[#0C3136] group-hover:text-[#125D66] transition-colors leading-tight mb-2 truncate">
                  info@niagaratravels.ca
                </p>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Ideal for detailed itineraries, group proposals, and receipts.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-[#125D66]">
                <span>Email Us</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* 4. Head Office Card */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=1315+Pickering+Parkway+Suite+300+Pickering+ON+L1V+7G5"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-3xl shadow-xl border border-slate-200/80 hover:border-[#0C3136] hover:shadow-2xl transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-100 text-[#0C3136] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#0C3136] group-hover:text-white transition-all">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                  Main Operations Office
                </span>
                <p className="text-sm font-black text-[#0C3136] leading-snug mb-1">
                  1315 Pickering Parkway, Ste 300
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  Pickering, ON L1V 7G5 (GTA Operations)
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-black text-[#0C3136]">
                <span>View on Google Maps</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

          </div>
        </section>

        {/* ============================================================= */}
        {/* MAIN 2-COLUMN GRID SECTION */}
        {/* ============================================================= */}
        <main className="container mx-auto px-4 py-16 lg:py-24 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* LEFT COLUMN: INTERACTIVE INQUIRY FORM & FAQS (7 COLS) */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* RIGHT COLUMN: DISPATCH STATUS & GOOGLE MAPS (5 COLS) */}
            <aside aria-label="Operations, Live Map and Schedule" className="lg:col-span-5 space-y-8">
              
              {/* LIVE CONCIERGE & SCHEDULE BOX */}
              <section className="bg-[#0C3136] rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 blur-2xl" />

                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-300">
                      Live Operations Active
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#F8A41E] bg-[#F8A41E]/10 px-3 py-1 rounded-full border border-[#F8A41E]/20">
                    Toronto, Canada
                  </span>
                </div>

                <h3 className="text-xl font-black mb-4">Tour Operating Hours &amp; Dispatch</h3>
                
                <div className="space-y-4 text-xs">
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-slate-400 font-bold">Daily Morning Coach Pickups</span>
                    <span className="font-black text-white">7:55 AM – 8:30 AM EST</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-slate-400 font-bold">Phone &amp; WhatsApp Concierge</span>
                    <span className="font-black text-white">24 Hours / 7 Days a Week</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-slate-400 font-bold">Private Charter Departures</span>
                    <span className="font-black text-[#F8A41E]">Flexible / Customer Choice</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400 font-bold">Emergency Guest Assistance</span>
                    <span className="font-black text-emerald-400">Always Open (24/7)</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-3 text-xs text-slate-300">
                  <Headphones className="w-5 h-5 text-[#F8A41E] shrink-0" />
                  <span>Traveling today? Mention your Booking Reference ID for priority queue routing.</span>
                </div>
              </section>

              {/* INTERACTIVE GOOGLE MAPS EMBED */}
              <section aria-labelledby="interactive-map-heading" className="bg-white rounded-[2.5rem] p-6 sm:p-8 border border-slate-200 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#D91E1E] flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Interactive Locator
                      </span>
                      <h3 id="interactive-map-heading" className="text-lg font-black text-[#0C3136]">
                        Office &amp; Downtown Hubs
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Explore our primary GTA East headquarters or switch to view the 5 official downtown Toronto boarding hubs:
                </p>

                <div className="h-[360px] w-full rounded-2xl overflow-hidden shadow-inner">
                  <ContactMapWrapper defaultView="office" />
                </div>
              </section>

              {/* WHY TRAVELERS CHOOSE US CARD */}
              <section className="bg-white rounded-[2.5rem] p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-black text-[#0C3136] uppercase tracking-wider mb-2">
                  The Niagara Travels Standard
                </h3>

                <ul className="space-y-3 text-xs">
                  <li className="flex items-start gap-3 text-slate-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Licensed Canadian Operator:</strong> Direct bookings with zero third-party broker markups.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Guaranteed Seat Reservations:</strong> Modern, air-conditioned executive motorcoaches.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>VIP Priority Admission:</strong> Hornblower boat cruise tickets and attraction passes arranged in advance.</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-600 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Risk-Free Planning:</strong> 100% full refund if cancelled up to 24 hours prior to departure.</span>
                  </li>
                </ul>
              </section>

            </aside>

          </div>
        </main>

        {/* ============================================================= */}
        {/* BOTTOM CALL-TO-ACTION BANNER */}
        {/* ============================================================= */}
        <section className="bg-[#0C3136] text-white py-16 border-t border-[#125D66]">
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#F8A41E] block mb-2">
              Ready For Niagara Falls?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 tracking-tight">
              Book Your Unforgettable Niagara Experience
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-medium">
              Daily guided tours from Toronto featuring Horseshoe Falls, Table Rock, Niagara-on-the-Lake wine tasting, and the Hornblower boat cruise.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/tours"
                className="w-full sm:w-auto bg-[#D91E1E] text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#b01818] transition-all shadow-xl shadow-red-900/30"
              >
                Browse All Tours
              </Link>
              <Link
                href="/custom-itinerary"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all"
              >
                Build Custom Itinerary
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
