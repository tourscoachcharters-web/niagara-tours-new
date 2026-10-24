import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getLiveTours } from '@/lib/firebase-utils';
import TourCard from '@/components/TourCard';
import { getBreadcrumbSchema, JsonLd } from '@/lib/schema';
import { ChevronRight } from 'lucide-react';

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

      <div className="animate-in fade-in duration-700 bg-white">
        {/* Banner Section */}
        <section
          aria-labelledby="tours-page-heading"
          className="relative h-[420px] sm:h-[460px] flex items-center text-white overflow-hidden"
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
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C3136]/95 via-[#0C3136]/75 to-[#0C3136]/40" />
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

            <span className="bg-[#F8A41E] text-[#0C3136] text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-[0.2em] mb-4 inline-block shadow-lg">
              Curated Collections
            </span>
            <h1
              id="tours-page-heading"
              className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tighter mb-4"
            >
              Niagara Falls <br />
              Tour Packages
            </h1>
            <p className="text-slate-200 text-base sm:text-lg max-w-xl font-medium opacity-90 leading-relaxed">
              From classic day escapes to private VIP luxury, discover the perfect way to experience the world&apos;s most famous waterfall.
            </p>
          </div>
        </section>

        {/* Tours Grid Section */}
        <section aria-labelledby="tours-grid-heading" className="container mx-auto px-4 py-20 lg:py-24">
          <header className="mb-12">
            <h2 id="tours-grid-heading" className="text-2xl sm:text-3xl font-black text-[#0C3136] mb-2">
              Available Itineraries &amp; Charters
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              Showing {tours.length} verified packages with daily hotel pickup across Toronto and GTA.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {tours.map((tour) => (
              <TourCard key={tour.firebaseId || tour.id} tour={tour} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
