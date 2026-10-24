import { getLiveTours, getTourById } from '@/lib/firebase-utils';
import { TOURS_DATA } from '@/data/tours';
import CheckoutClient from './[id]/CheckoutClient';
import { getTourProductSchema, getBreadcrumbSchema, JsonLd } from '@/lib/schema';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const tourId = resolvedSearchParams?.tour || resolvedSearchParams?.id || 'classic-day-escape';
  let tour = await getTourById(tourId);

  if (!tour) {
    tour = TOURS_DATA.find((t) => t.id === tourId) || TOURS_DATA[0];
  }

  return {
    title: `Book ${tour?.title || 'Niagara Falls Tour'} | Niagara Travels Checkout`,
    description: `Complete your reservation for ${tour?.title || 'Niagara Falls Tour'}. Instant e-ticket confirmation and complimentary pickup across Toronto and GTA.`,
    alternates: {
      canonical: `https://www.niagaratravels.ca/checkout`,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function CheckoutRootPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const tourId = resolvedSearchParams?.tour || resolvedSearchParams?.id || 'classic-day-escape';
  const rawDate = resolvedSearchParams?.date;

  const allTours = await getLiveTours();
  const safeTours = allTours && allTours.length > 0 ? allTours : TOURS_DATA;

  let tour = safeTours.find((t) => t.id === tourId);
  if (!tour) {
    tour = safeTours[0];
  }

  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 1);
  const initialDate = rawDate ? decodeURIComponent(rawDate) : defaultDate.toLocaleDateString();

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Tours', url: '/tours' },
    { name: tour.title, url: `/tour/${tour.id}` },
    { name: 'Checkout', url: `/checkout` },
  ];

  const productSchema = getTourProductSchema(tour);
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={productSchema} />
      <CheckoutClient tour={tour} allTours={safeTours} initialDate={initialDate} />
    </>
  );
}
