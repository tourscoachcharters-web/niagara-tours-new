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

  // Add a little top margin so the header doesn't cover this message
  if (!tour) return <div className="p-20 text-center font-black text-2xl mt-20">Tour not found.</div>;

  // PASS THE FULL TOUR OBJECT
  return <TourClient tour={tour} />; 
}