import { notFound } from 'next/navigation';
import { getLiveTours, getTourById } from '@/lib/firebase-utils';
import { TOURS_DATA } from '@/data/tours';
import TourClient from './TourClient';
import { getTourProductSchema, getBreadcrumbSchema, JsonLd } from '@/lib/schema';

export const revalidate = 3600;

/**
 * Generate static params for SSG pre-rendering of all tour routes.
 * Guarantees zero empty loads for search engine bots.
 */
export async function generateStaticParams() {
  return TOURS_DATA.map((tour) => ({
    id: tour.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const tour = await getTourById(id);

  if (!tour) {
    return {
      title: 'Tour Not Found | Niagara Travels',
      description: 'The requested Niagara Falls tour package could not be located.',
    };
  }

  const siteUrl = 'https://www.niagaratravels.ca';
  const tourUrl = `${siteUrl}/tour/${id}`;
  const imageUrl = tour.img?.startsWith('http')
    ? tour.img
    : `${siteUrl}${tour.img || '/images/hero-home.jpg'}`;

  return {
    title: `${tour.title} | Niagara Travels`,
    description: tour.overview || tour.tagline,
    alternates: {
      canonical: tourUrl,
    },
    openGraph: {
      title: `${tour.title} | Niagara Travels`,
      description: tour.overview || tour.tagline,
      url: tourUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${tour.title} Tour Preview`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tour.title} | Niagara Travels`,
      description: tour.tagline || tour.overview,
      images: [imageUrl],
    },
  };
}

export default async function TourPage({ params }) {
  const { id } = await params;
  const tour = await getTourById(id);

  if (!tour) {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Tours', url: '/tours' },
    { name: tour.title, url: `/tour/${id}` },
  ];

  const tourProductSchema = getTourProductSchema(tour);
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={tourProductSchema} />
      <TourClient tour={tour} />
    </>
  );
}
