import React from 'react';
import Link from 'next/link';
import { getBreadcrumbSchema, JsonLd } from '@/lib/schema';
import { ChevronRight } from 'lucide-react';

export const metadata = {
  title: "Privacy Policy | Niagara Travels",
  description: "Learn how Niagara Travels collects, uses, and protects your personal and booking information under Canadian privacy laws (PIPEDA).",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Privacy Policy", url: "/privacy" },
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
                Privacy Policy
              </li>
            </ol>
          </nav>

          <header className="mb-10 border-b border-slate-100 pb-8">
            <h1 className="text-3xl sm:text-5xl font-black text-[#0C3136] tracking-tight mb-3">
              Privacy Policy
            </h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Last Updated: January 2026 • Niagara Travels Inc.
            </p>
          </header>

          <div className="space-y-8 text-slate-600 text-sm leading-relaxed font-medium">
            <section aria-labelledby="privacy-intro">
              <h2 id="privacy-intro" className="text-xl font-black text-[#0C3136] mb-3">
                1. Information We Collect
              </h2>
              <p>
                When you make a booking or inquiry with Niagara Travels, we collect personal information necessary to deliver our tour services. This includes your name, email address, phone number, pickup location, travel dates, and payment transaction details.
              </p>
            </section>

            <section aria-labelledby="privacy-usage">
              <h2 id="privacy-usage" className="text-xl font-black text-[#0C3136] mb-3">
                2. How We Use Your Information
              </h2>
              <p>
                Your information is used solely to confirm reservations, provide e-tickets, coordinate hotel pickups, provide safety notices, and deliver customer support. We do not sell or rent your personal information to third parties.
              </p>
            </section>

            <section aria-labelledby="privacy-security">
              <h2 id="privacy-security" className="text-xl font-black text-[#0C3136] mb-3">
                3. Data Security &amp; Encryption
              </h2>
              <p>
                All sensitive communications and payments are processed through secure 256-bit SSL encrypted channels. Payment card data is processed by industry-compliant payment processors and is never stored on our servers.
              </p>
            </section>

            <section aria-labelledby="privacy-contact">
              <h2 id="privacy-contact" className="text-xl font-black text-[#0C3136] mb-3">
                4. Contacting Our Privacy Officer
              </h2>
              <p>
                If you have questions regarding our privacy practices or wish to update your records, please contact us at{' '}
                <a href="mailto:privacy@niagaratravels.ca" className="text-[#125D66] font-bold underline">
                  privacy@niagaratravels.ca
                </a>{' '}
                or by mail at 1315 Pickering Parkway, Suite 300, Pickering, ON L1V 7G5, Canada.
              </p>
            </section>
          </div>
        </article>
      </div>
    </>
  );
}
