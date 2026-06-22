import { getLiveTours } from "@/lib/firebase-utils";
import TourClient from "./TourClient";

export const dynamic = 'force-dynamic'; // <-- ADD THIS EXACT LINE

// 1. DYNAMIC SEO
export async function generateMetadata({ params }) {
  const { id } = await params;
  const tours = await getLiveTours();
  const tour = tours.find((t) => t.id === id);

  if (!tour) return { title: "Tour Not Found | Niagara Travels" };

  return {
    title: `${tour.title} | Niagara Travels`,
    description: tour.overview,
    alternates: { canonical: `/tour/${id}` },
    openGraph: {
      title: `${tour.title} | Niagara Travels`,
      description: tour.overview,
      images: [tour.img],
    },
  };
}

// 3. FETCH DATA FROM FIRESTORE
export default async function TourPage({ params }) {
  const { id } = await params;
  const tours = await getLiveTours();
  const tour = tours.find((t) => t.id === id);

  if (!tour) return <div className="p-20 text-center font-black text-2xl">Tour not found.</div>;

  // Passing the actual tour object allows the client to access details immediately
  return <TourClient tourId={id} />;
}