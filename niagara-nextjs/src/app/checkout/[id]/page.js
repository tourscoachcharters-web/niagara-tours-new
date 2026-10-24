import { notFound } from 'next/navigation';
import { getTourById, getLiveTours } from '@/lib/firebase-utils';
import { TOURS_DATA } from '@/data/tours';
import CheckoutClient from './CheckoutClient';
import { getTourProductSchema, getBreadcrumbSchema, JsonLd } from '@/lib/schema';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { id } = await params;
  let tour = await getTourById(id);

  if (!tour) {
    tour = TOURS_DATA.find((t) => t.id === id);
  }

  if (!tour) {
    return {
      title: 'Checkout | Niagara Travels',
      description: 'Complete your booking with Niagara Travels.',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `Book ${tour.title} | Niagara Travels Checkout`,
    description: `Complete your reservation for ${tour.title}. Instant e-ticket confirmation and complimentary pickup in Toronto and GTA.`,
    alternates: {
      canonical: `https://www.niagaratravels.ca/checkout/${id}`,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function CheckoutPage({ params, searchParams }) {
  const { id } = await params;
  const resolvedSearchParams = await searchParams;
  
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 1);
  const date = resolvedSearchParams?.date || defaultDate.toLocaleDateString();

  let tour = await getTourById(id);
  if (!tour) {
    tour = TOURS_DATA.find((t) => t.id === id);
  }

  if (!tour) {
    notFound();
  }

  const allTours = await getLiveTours();
  const safeTours = allTours && allTours.length > 0 ? allTours : TOURS_DATA;

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Tours', url: '/tours' },
    { name: tour.title, url: `/tour/${id}` },
    { name: 'Checkout', url: `/checkout/${id}` },
  ];

  const productSchema = getTourProductSchema(tour);
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={productSchema} />
      <CheckoutClient tour={tour} allTours={safeTours} initialDate={decodeURIComponent(date)} />
    </>
  );
}
