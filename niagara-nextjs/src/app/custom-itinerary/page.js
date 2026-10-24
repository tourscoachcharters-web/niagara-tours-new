import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CustomItineraryBuilder from '@/components/CustomItineraryBuilder';
import { getServiceSchema, getBreadcrumbSchema, JsonLd } from '@/lib/schema';
import { CheckCircle2, Phone, ChevronRight } from 'lucide-react';

export const revalidate = 3600;

export const metadata = {
  title: "Build Your Custom Niagara Falls Itinerary | Niagara Travels",
  description:
    "Design a bespoke Niagara Falls private tour or group charter tailored to your schedule, group size, and preferred attractions. Instant custom proposals.",
  alternates: {
    canonical: "/custom-itinerary",
  },
  openGraph: {
    title: "Build Your Custom Niagara Falls Itinerary | Niagara Travels",
    description:
      "Craft your dream Niagara Falls experience with custom pickup locations, flexible hours, private luxury vehicles, and VIP attraction access.",
    url: "https://www.niagaratravels.ca/custom-itinerary",
    images: [
      {
        url: "/images/hero-custom.jpg",
        width: 1200,
        height: 630,
        alt: "Custom Niagara Falls Tour Planning",
      },
    ],
  },
};

export default function CustomItineraryPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Custom Itinerary", url: "/custom-itinerary" },
  ];

  const serviceSchema = getServiceSchema({
    name: "Custom Niagara Falls Private Charter & Itinerary Service",
    description:
      "Personalized private tour planning with door-to-door luxury transport, custom stops, and VIP admission across Niagara Falls and Niagara-on-the-Lake.",
    serviceType: "Custom Tour Planning & Private Charter",
    url: "https://www.niagaratravels.ca/custom-itinerary",
  });

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={serviceSchema} />

      <div className="animate-in fade-in duration-700 bg-white">
        {/* Banner Section */}
        <header className="relative h-[420px] sm:h-[460px] flex items-center text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-custom.jpg"
              alt="Custom Niagara tour overlooking the majestic Horseshoe Falls"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-[#0C3136]/75" />
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
                  Custom Itinerary
                </li>
              </ol>
            </nav>

            <span className="bg-[#F8A41E] text-[#0C3136] text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-[0.2em] mb-4 inline-block shadow-lg">
              Bespoke Experiences
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tighter mb-4">
              Custom <span className="text-[#F8A41E]">Itinerary</span>
            </h1>
            <p className="text-slate-200 text-base sm:text-lg max-w-xl font-medium opacity-90 leading-relaxed">
              Tell us your preferences and our licensed trip architects will craft a one-of-a-kind Niagara Falls package tailored specifically for you.
            </p>
          </div>
        </header>

        {/* Builder Main Grid */}
        <div className="container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Builder Form */}
          <div className="lg:col-span-8">
            <CustomItineraryBuilder />
          </div>

          {/* Right Column Benefits & Immediate Hotline */}
          <aside aria-label="Custom tour benefits and support hotline" className="lg:col-span-4">
            <div className="sticky top-28 space-y-8">
              <section
                aria-labelledby="why-customize-heading"
                className="bg-[#0C3136] p-8 lg:p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" aria-hidden="true" />
                <h2 id="why-customize-heading" className="text-xl font-black mb-6">
                  Why Book a Custom Charter?
                </h2>
                <ul className="space-y-6">
                  {[
                    {
                      t: 'Personalized Pace',
                      d: 'No rushing. Spend as much or as little time as you want at every scenic stop.',
                    },
                    {
                      t: 'Hidden Gems',
                      d: 'Visit boutique wineries, historic Queenston Heights, and local lookouts off the bus route.',
                    },
                    {
                      t: 'VIP Attraction Access',
                      d: 'Skip ticket booth lines with pre-arranged timed entry passes.',
                    },
                    {
                      t: 'Door-to-Door Pickup',
                      d: 'Private pickup directly from your hotel, home, or Pearson Airport (YYZ).',
                    },
                  ].map((benefit, i) => (
                    <li key={i} className="flex gap-4">
                      <CheckCircle2 className="w-5 h-5 text-[#F8A41E] shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <h3 className="font-black text-xs uppercase tracking-widest text-slate-100">
                          {benefit.t}
                        </h3>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">{benefit.d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="custom-hotline-heading" className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl">
                <h2 id="custom-hotline-heading" className="font-black text-[#0C3136] text-sm uppercase tracking-widest mb-4">
                  Prefer to Talk to a Human?
                </h2>
                <div className="space-y-3">
                  <a
                    href="tel:14164443000"
                    className="flex items-center gap-3 text-lg font-black text-[#0C3136] hover:text-[#D91E1E] transition-colors focus-visible:underline"
                  >
                    <Phone className="w-5 h-5 text-[#F8A41E]" aria-hidden="true" />
                    <span>(416) 444-3000</span>
                  </a>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Our local concierge is available 24/7 to design custom routes for weddings, corporate groups, and family reunions.
                  </p>
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
