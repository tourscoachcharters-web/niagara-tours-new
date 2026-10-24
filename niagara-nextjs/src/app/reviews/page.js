import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { REVIEWS_DATA } from "@/data/tours";
import { getReviewsSchema, getBreadcrumbSchema, JsonLd } from "@/lib/schema";
import { Star, Quote, ThumbsUp, ChevronRight } from 'lucide-react';

export const revalidate = 3600;

export const metadata = {
  title: "Guest Reviews & Ratings | Niagara Travels",
  description:
    "Read honest reviews from thousands of travelers who experienced Niagara Falls with Niagara Travels. Over 1,500+ verified 5-star ratings.",
  alternates: {
    canonical: "/reviews",
  },
  openGraph: {
    title: "Guest Reviews & Ratings | Niagara Travels",
    description:
      "See what our guests say about our guided Niagara Falls tours, wine country tastings, and private VIP experiences.",
    url: "https://www.niagaratravels.ca/reviews",
    images: [
      {
        url: "/images/hero-reviews.jpg",
        width: 1200,
        height: 630,
        alt: "Guest Reviews - Niagara Travels",
      },
    ],
  },
};

export default function ReviewsPage() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Guest Reviews", url: "/reviews" },
  ];

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={getReviewsSchema(REVIEWS_DATA)} />

      <div className="animate-in fade-in duration-700 bg-[#F8FAFC]">
        {/* Banner Section */}
        <header className="relative h-[420px] sm:h-[460px] flex items-center text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-reviews.jpg"
              alt="Happy guests enjoying Niagara Falls viewpoint"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C3136]/95 via-[#0C3136]/80 to-[#0C3136]/50" />
          </div>

          <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl">
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
                    Reviews
                  </li>
                </ol>
              </nav>

              <span className="bg-[#F8A41E] text-[#0C3136] text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-[0.2em] mb-4 inline-block shadow-lg">
                Guest Experiences
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tighter mb-4">
                What Our <br />
                Guests Say
              </h1>
              <p className="text-slate-200 text-base sm:text-lg font-medium opacity-90 leading-relaxed">
                Read authentic testimonials from travelers who experienced Niagara Falls with our expert local team.
              </p>
            </div>

            {/* Scorecard Box */}
            <aside
              aria-label="Overall guest rating scorecard"
              className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[2.5rem] text-center w-full md:w-auto shrink-0 shadow-2xl"
            >
              <div className="text-5xl font-black text-[#F8A41E] mb-2">4.9</div>
              <div className="flex justify-center gap-1 mb-3 text-[#F8A41E]" aria-label="5 out of 5 stars rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="text-sm font-bold text-white mb-1">Excellent Rating</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/70">
                Based on 1,500+ Verified Reviews
              </p>
            </aside>
          </div>
        </header>

        {/* Reviews List Section */}
        <section aria-labelledby="reviews-list-heading" className="container mx-auto px-4 py-20 lg:py-24">
          <header className="mb-12">
            <h2 id="reviews-list-heading" className="text-2xl sm:text-3xl font-black text-[#0C3136] mb-2">
              Verified Traveler Stories
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              Real feedback from couples, families, and private charter clients.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {REVIEWS_DATA.map((review) => {
              const authorId = `review-author-${review.id}`;
              return (
                <article
                  key={review.id}
                  aria-labelledby={authorId}
                  className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div
                      className="flex gap-1 text-[#F8A41E]"
                      aria-label={`Rated ${review.rating} out of 5 stars`}
                    >
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-slate-200'}`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-slate-200 group-hover:text-[#F8A41E]/40 transition-colors" aria-hidden="true" />
                  </div>

                  <blockquote className="font-medium text-slate-700 text-sm leading-relaxed mb-8 flex-1 italic">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>

                  <div className="pt-6 border-t border-slate-100 mt-auto">
                    <div className="flex justify-between items-end mb-3">
                      <div>
                        <h3 id={authorId} className="font-black text-[#0C3136] text-sm">
                          {review.name}
                        </h3>
                        <time className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">
                          {review.date}
                        </time>
                      </div>
                      <div
                        className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-[#125D66]"
                        aria-hidden="true"
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="bg-[#0C3136]/5 text-[#125D66] text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg inline-block truncate max-w-full">
                      Tour: {review.tour}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
