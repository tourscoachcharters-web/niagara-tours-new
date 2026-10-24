import React from 'react';
import Link from 'next/link';
import { getBreadcrumbSchema, JsonLd } from '@/lib/schema';
import { ChevronRight } from 'lucide-react';

export const metadata = {
  title: "Terms and Conditions | Niagara Travels",
  description: "Review Niagara Travels terms and conditions, booking policies, 24-hour cancellation rules, and passenger guidelines.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Terms & Conditions", url: "/terms" },
  ];

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
      <div className="bg-[#F8FAFC] py-16 lg:py-24 animate-in fade-in duration-700">
        <article className="container mx-auto px-4 max-w-4xl bg-white p-8 sm:p-14 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <li>
                <Link href="/" className="hover:text-[#F8A41E] transition-colors focus-visible:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3.5 h-3.5" />
              </li>
              <li className="text-[#0C3136]" aria-current="page">
                Terms &amp; Conditions
              </li>
            </ol>
          </nav>

          <header className="mb-10 border-b border-slate-100 pb-8">
            <h1 className="text-3xl sm:text-5xl font-black text-[#0C3136] tracking-tight mb-3">
              Terms &amp; Conditions
            </h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Effective Date: January 2026 • Niagara Travels Inc.
            </p>
          </header>

          <div className="space-y-8 text-slate-600 text-sm leading-relaxed font-medium">
            <section aria-labelledby="terms-booking">
              <h2 id="terms-booking" className="text-xl font-black text-[#0C3136] mb-3">
                1. Booking &amp; Confirmation
              </h2>
              <p>
                All bookings are subject to availability and are confirmed upon receipt of full payment. An electronic confirmation with booking ID and itinerary details will be issued via email.
              </p>
            </section>

            <section aria-labelledby="terms-cancellation">
              <h2 id="terms-cancellation" className="text-xl font-black text-[#0C3136] mb-3">
                2. 24-Hour Cancellation Policy
              </h2>
              <p>
                Full refunds are granted for cancellations made at least 24 hours prior to the scheduled tour departure time. Cancellations made within 24 hours of departure, or no-shows at the scheduled pickup time, are strictly non-refundable.
              </p>
            </section>

            <section aria-labelledby="terms-itinerary">
              <h2 id="terms-itinerary" className="text-xl font-black text-[#0C3136] mb-3">
                3. Weather &amp; Route Modifications
              </h2>
              <p>
                Tours operate rain, snow, or shine. Niagara Travels reserves the right to adjust tour stops or attraction sequences in the event of extreme weather, road closures, or attraction maintenance, ensuring a comparable or superior replacement experience.
              </p>
            </section>

            <section aria-labelledby="terms-safety">
              <h2 id="terms-safety" className="text-xl font-black text-[#0C3136] mb-3">
                4. Safety &amp; Passenger Conduct
              </h2>
              <p>
                Passengers are required to follow guide and driver instructions at all times. Smoking, vaping, and unauthorized consumption of alcohol are strictly prohibited aboard all tour vehicles.
              </p>
            </section>
          </div>
        </article>
      </div>
    </>
  );
}
