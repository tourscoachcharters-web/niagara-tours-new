import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getLiveTours } from '@/lib/firebase-utils';
import TourCard from '@/components/TourCard';
import { ORGANIZATION_SCHEMA, getServiceSchema, JsonLd } from '@/lib/schema';
import { 
  Star, ChevronRight, Compass, Bus, Clock, Users, ShieldCheck, Globe, Settings 
} from 'lucide-react';

export const revalidate = 3600; // SSG with ISR revalidation

export const metadata = {
  title: "Niagara Falls Tours from Toronto | Niagara Travels",
  description:
    "Discover the magic of Niagara Falls with top-rated guided tours from Toronto. Enjoy scenic boat cruises, Niagara-on-the-Lake wine tasting, and private custom VIP charters.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Niagara Falls Tours from Toronto | Niagara Travels",
    description:
      "Unforgettable experiences, breathtaking views, and memories that last a lifetime. Book your Niagara Falls tour with local Canadian guides.",
    url: "https://www.niagaratravels.ca",
    images: [
      {
        url: "/images/hero-home.jpg",
        width: 1200,
        height: 630,
        alt: "Niagara Falls Panoramic View",
      },
    ],
  },
};

export default async function HomePage() {
  const tours = await getLiveTours();

  const homeServiceSchema = getServiceSchema({
    name: "Toronto to Niagara Falls Guided Tours",
    description:
      "Comprehensive day tours, evening illumination packages, and private VIP charters to Niagara Falls, Ontario.",
    url: "https://www.niagaratravels.ca",
  });

  return (
    <>
      <JsonLd data={homeServiceSchema} />

      <div className="animate-in fade-in duration-700">
        {/* 1. Hero Section */}
        <section
          aria-labelledby="hero-heading"
          className="relative pt-12 pb-24 lg:pt-16 lg:pb-32 flex items-center overflow-hidden min-h-[580px]"
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-home.jpg"
              alt="Majestic view of Niagara Falls with tour boat in mist"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C3136]/95 via-[#0C3136]/60 to-transparent" />
          </div>

          <div className="container mx-auto px-4 z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <header className="text-white">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-[#D91E1E] p-1.5 rounded-full shadow-lg" aria-hidden="true">
                  <Star className="w-3.5 h-3.5 text-white fill-current" />
                </span>
                <span className="uppercase text-[11px] font-black tracking-[0.2em] text-[#F8A41E]">
                  PROUDLY CANADIAN & LOCAL OPERATOR
                </span>
              </div>

              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-[1.1] tracking-tight"
              >
                Discover the <br /> Magic of <br />
                <span className="text-[#F8A41E] italic">Niagara Falls</span>
              </h1>
              <p className="text-base lg:text-lg text-slate-200 mb-8 max-w-xl leading-relaxed font-medium">
                Unforgettable day escapes, romantic evening illumination tours, and bespoke private charters departing daily from Toronto &amp; the GTA.
              </p>

              <nav aria-label="Hero Action Links" className="flex flex-wrap gap-4">
                <Link
                  href="/tours"
                  className="bg-[#D91E1E] hover:bg-[#b01818] text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-900/30 flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>EXPLORE TOURS</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/custom-itinerary"
                  className="bg-white hover:bg-slate-50 text-[#0C3136] px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0C3136]"
                >
                  <Settings className="w-4 h-4 text-[#F8A41E]" aria-hidden="true" />
                  <span>CUSTOM PACKAGE</span>
                </Link>
              </nav>
            </header>
          </div>
        </section>

        {/* 2. Trust Badges Section */}
        <section
          aria-labelledby="trust-badges-heading"
          className="container mx-auto px-4 -mt-12 lg:-mt-16 relative z-20"
        >
          <h2 id="trust-badges-heading" className="sr-only">
            Why travelers trust Niagara Travels
          </h2>
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {[
              { icon: Compass, title: 'Local Guides', desc: 'Born and raised Niagara experts' },
              { icon: Bus, title: 'Transport', desc: 'Modern air-conditioned vehicles' },
              { icon: Clock, title: 'Flexible Pacing', desc: 'Customizable departure schedules' },
              { icon: Star, title: 'Top Rated', desc: 'Over 1,500+ verified 5-star reviews' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-8 group cursor-default hover:bg-slate-50 transition-colors rounded-2xl"
              >
                <div
                  className="bg-[#0C3136]/5 p-4 rounded-full text-[#125D66] group-hover:bg-[#F8A41E] group-hover:text-[#0C3136] transition-all"
                  aria-hidden="true"
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-xs text-[#0C3136] uppercase tracking-wider">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Why Choose Us Section */}
        <section
          aria-labelledby="why-choose-us-heading"
          className="py-24 bg-gradient-to-b from-white to-[#F0F9FF] overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8">
              <header className="lg:col-span-4">
                <p className="text-[#D91E1E] font-black text-[10px] uppercase tracking-[0.3em] mb-4">
                  Why Choose Us
                </p>
                <h2
                  id="why-choose-us-heading"
                  className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0C3136] leading-[1.1] mb-6"
                >
                  Experience Niagara Like Never Before
                </h2>
                <p className="text-slate-600 text-sm font-medium leading-relaxed mb-6">
                  We are local, passionate, and dedicated to showing you the very best of Niagara Falls with exceptional service, comfortable luxury coaches, and memorable stories.
                </p>
                <div className="flex items-center gap-3 text-xs font-black text-[#125D66] uppercase tracking-wider">
                  <ShieldCheck className="w-5 h-5 text-[#F8A41E]" aria-hidden="true" />
                  <span>Licensed &amp; Fully Insured Canadian Tour Operator</span>
                </div>
              </header>

              <figure className="lg:col-span-4 relative group">
                <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl">
                  <Image
                    src="/images/why-choose-us.jpg"
                    alt="Tour group admiring Niagara Falls with local guide"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C3136]/40 to-transparent" />
                </div>
                <figcaption className="sr-only">
                  Tour guests experiencing Niagara Falls up close with Niagara Travels
                </figcaption>
              </figure>

              <div className="lg:col-span-4 space-y-8">
                {[
                  {
                    icon: Users,
                    t: 'Local Experts',
                    d: 'Knowledgeable guides who bring Niagara history and legends to life.',
                  },
                  {
                    icon: Compass,
                    t: 'Small Group & VIP Tours',
                    d: 'Personalized experiences with more attention, flexibility, and comfort.',
                  },
                  {
                    icon: ShieldCheck,
                    t: 'Safety & Comfort',
                    d: 'Modern climate-controlled fleet with professional commercial drivers.',
                  },
                  {
                    icon: Globe,
                    t: 'Sustainable Tourism',
                    d: 'We respect the Niagara ecosystem and support local family wineries.',
                  },
                ].map((feat, idx) => (
                  <article key={idx} className="flex gap-5 group">
                    <div
                      className="shrink-0 w-12 h-12 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center text-[#125D66] group-hover:bg-[#125D66] group-hover:text-white transition-all duration-300"
                      aria-hidden="true"
                    >
                      <feat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-[#0C3136] uppercase tracking-wider mb-1">
                        {feat.t}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{feat.d}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Signature Tours Showcase Section */}
        <section aria-labelledby="signature-tours-heading" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
              <div>
                <p className="text-[#F8A41E] font-black text-xs uppercase tracking-[0.4em] mb-2">
                  OUR SIGNATURE EXPERIENCES
                </p>
                <h2 id="signature-tours-heading" className="text-3xl sm:text-4xl font-black text-[#0C3136]">
                  Explore Niagara &amp; Beyond
                </h2>
              </div>
              <Link
                href="/tours"
                className="text-xs font-black text-[#125D66] hover:text-[#0C3136] uppercase tracking-widest flex items-center gap-1.5 focus-visible:underline"
              >
                <span>View All Tour Packages</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.slice(0, 3).map((tour) => (
                <TourCard key={tour.firebaseId || tour.id} tour={tour} />
              ))}
            </div>

            <nav aria-label="Explore more tours" className="mt-16 text-center">
              <Link
                href="/tours"
                className="inline-block bg-[#0C3136] text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#125D66] transition-all shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0C3136]"
              >
                VIEW ALL {tours.length} TOUR PACKAGES
              </Link>
            </nav>
          </div>
        </section>
      </div>
    </>
  );
}
