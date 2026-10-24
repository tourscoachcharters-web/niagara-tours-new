import React, { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getLiveTours } from '@/lib/firebase-utils';
import HomeToursFilter from '@/components/HomeToursFilter';
import { getBreadcrumbSchema, JsonLd } from '@/lib/schema';
import { ChevronRight, ShieldCheck, Bus, Ship, Star, Award } from 'lucide-react';

export const revalidate = 3600;

export const metadata = {
  title: "All Tour Packages | Niagara Travels",
  description:
    "From classic day escapes to private VIP luxury, discover the perfect way to experience the world's most famous waterfall from Toronto and the GTA.",
  alternates: {
    canonical: "/tours",
  },
  openGraph: {
    title: "All Niagara Falls Tour Packages | Niagara Travels",
    description:
      "Explore curated Niagara Falls tours including boat cruises, wine country tours, evening illumination, and private custom charters.",
    url: "https://www.niagaratravels.ca/tours",
    images: [
      {
        url: "/images/hero-tours.jpg",
        width: 1200,
        height: 630,
        alt: "Niagara Falls Tour Experiences",
      },
    ],
  },
};

export default async function ToursPage() {
  const tours = await getLiveTours();

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Tours", url: "/tours" },
  ];

  const toursItemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Niagara Falls Tour Packages',
    description: 'Curated collection of Niagara Falls sightseeing tours from Toronto.',
    numberOfItems: tours.length,
    itemListElement: tours.map((tour, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: tour.title,
      url: `https://www.niagaratravels.ca/tour/${tour.id}`,
    })),
  };

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={toursItemListSchema} />

      <div className="animate-in fade-in duration-700 bg-[#F8FAFC]">
        {/* Banner Section */}
        <header
          aria-labelledby="tours-page-heading"
          className="relative h-[440px] sm:h-[480px] flex items-center text-white overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-tours.jpg"
              alt="Panoramic aerial view of Niagara Falls and the Niagara Gorge"
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
                  Tours
                </li>
              </ol>
            </nav>

            <span className="bg-[#F8A41E] text-[#0C3136] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-4 inline-block shadow-lg">
              Curated Collections
            </span>
            <h1
              id="tours-page-heading"
              className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tighter mb-4"
            >
              Niagara Falls <br />
              Tour Packages
            </h1>
            <p className="text-slate-200 text-base sm:text-lg max-w-xl font-medium opacity-90 leading-relaxed mb-6">
              From classic day escapes to private VIP luxury, discover the perfect way to experience the world&apos;s most famous waterfall.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs font-bold text-slate-300">
              <div className="flex items-center gap-2">
                <Bus className="w-4 h-4 text-[#F8A41E]" aria-hidden="true" />
                <span>Downtown Toronto Pickups</span>
              </div>
              <div className="flex items-center gap-2">
                <Ship className="w-4 h-4 text-[#F8A41E]" aria-hidden="true" />
                <span>Boat Cruise Access</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>Free 24h Cancellation</span>
              </div>
            </div>
          </div>
        </header>

        {/* Tours Showcase Section */}
        <section aria-labelledby="tours-grid-heading" className="container mx-auto px-4 py-20 lg:py-24">
          <header className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#125D66] font-black text-[10px] uppercase tracking-[0.3em] mb-2 block">
              FIND YOUR ADVENTURE
            </span>
            <h2 id="tours-grid-heading" className="text-3xl sm:text-4xl font-black text-[#0C3136] tracking-tight mb-3">
              Available Itineraries &amp; Charters
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              Filter by experience style or browse our full lineup below. All packages include licensed local guides and central Toronto transport.
            </p>
          </header>

          <Suspense fallback={<div className="h-96 animate-pulse bg-slate-100 rounded-3xl" />}>
            <HomeToursFilter tours={tours} />
          </Suspense>
        </section>
      </div>
    </>
  );
}
