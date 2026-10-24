import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { ORGANIZATION_SCHEMA, getBreadcrumbSchema, JsonLd } from '@/lib/schema';
import { MapPin, Phone, Mail, ShieldCheck, ChevronRight, Clock } from 'lucide-react';

export const revalidate = 3600;

export const metadata = {
  title: "Contact Us & 24/7 Support | Niagara Travels",
  description:
    "Have questions about our Niagara Falls tours or need help booking a private charter? Contact our local Toronto team 24/7 at (416) 444-3000.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Niagara Travels | Local Tour Operator",
    description:
      "Get in touch with our local tour experts 24/7 for bookings, private charters, group discounts, and custom packages.",
    url: "https://www.niagaratravels.ca/contact",
    images: [
      {
        url: "/images/hero-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Niagara Travels Support",
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
    mainEntity: ORGANIZATION_SCHEMA,
  };

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={contactSchema} />

      <div className="animate-in fade-in duration-700 bg-[#F8FAFC]">
        {/* Banner Section */}
        <header className="relative h-[420px] sm:h-[460px] flex items-center text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-contact.jpg"
              alt="Niagara Falls skyline and scenic vistas"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C3136]/95 via-[#0C3136]/80 to-[#0C3136]/50" />
          </div>

          <div className="container mx-auto px-4 z-10">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-widest">
                <li>
                  <Link href="/" className="hover:text-[#F8A41E] transition-colors focus-visible:underline">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="w-3.5 h-3.5" />
                </li>
                <li className="text-[#F8A41E]" aria-current="page">
                  Contact
                </li>
              </ol>
            </nav>

            <span className="bg-[#F8A41E] text-[#0C3136] text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-[0.2em] mb-4 inline-block shadow-lg">
              24/7 Local Support
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tighter mb-4">
              We&apos;re Here <br />
              To Help You
            </h1>
            <p className="text-slate-200 text-base sm:text-lg max-w-xl font-medium opacity-90 leading-relaxed">
              Have questions about tour itineraries, hotel pickups, or group charters? Reach out to our Canadian team anytime.
            </p>
          </div>
        </header>

        {/* Main Grid Section */}
        <div className="container mx-auto px-4 py-20 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Interactive Form and FAQs */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Right Column: Office Location, Direct Contact, Trust Indicators */}
            <aside aria-label="Office and Emergency Contact Information" className="lg:col-span-5 space-y-10">
              
              {/* Physical Office Card */}
              <section aria-labelledby="head-office-heading" className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 group">
                <div className="flex gap-5 items-start">
                  <div
                    className="w-12 h-12 rounded-2xl bg-[#0C3136]/5 flex items-center justify-center text-[#F8A41E] group-hover:bg-[#0C3136] group-hover:text-white transition-all shrink-0"
                    aria-hidden="true"
                  >
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 id="head-office-heading" className="font-black text-base text-[#0C3136] mb-1">
                      Main Operations Office
                    </h2>
                    <address className="not-italic text-xs text-slate-500 font-medium leading-relaxed">
                      1315 Pickering Parkway, Suite 300<br />
                      Pickering, ON L1V 7G5<br />
                      Canada
                    </address>
                  </div>
                </div>
              </section>

              {/* Direct Support Card */}
              <section
                aria-labelledby="direct-support-heading"
                className="bg-[#0C3136] p-8 lg:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" aria-hidden="true" />
                
                <h2 id="direct-support-heading" className="text-xl font-black mb-6">
                  Direct Line &amp; Support
                </h2>
                
                <div className="space-y-6">
                  <div className="flex gap-4 items-center group">
                    <div
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#F8A41E] shrink-0"
                      aria-hidden="true"
                    >
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Toll-Free &amp; Local
                      </p>
                      <a
                        href="tel:14164443000"
                        className="font-black text-xl hover:text-[#F8A41E] transition-colors focus-visible:underline"
                      >
                        (416) 444-3000
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center group">
                    <div
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#F8A41E] shrink-0"
                      aria-hidden="true"
                    >
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Email Concierge
                      </p>
                      <a
                        href="mailto:info@niagaratravels.ca"
                        className="font-black text-base hover:text-[#F8A41E] transition-colors focus-visible:underline"
                      >
                        info@niagaratravels.ca
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center group">
                    <div
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#F8A41E] shrink-0"
                      aria-hidden="true"
                    >
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Booking Hours
                      </p>
                      <p className="font-bold text-sm text-slate-200">
                        24 Hours / 7 Days a Week
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2 text-emerald-400 font-black text-xs tracking-wider">
                      <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                      <span>24/7 CUSTOMER CONCIERGE ACTIVE</span>
                    </div>
                  </div>
                </div>
              </section>

            </aside>

          </div>
        </div>
      </div>
    </>
  );
}
