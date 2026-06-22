import { TOURS_DATA } from "@/data/tours";
import TourClient from "./TourClient";

// 1. GENERATE PERFECT SEO
export async function generateMetadata({ params }) {
  const { id } = await params;
  const tour = TOURS_DATA.find((t) => t.id === id);

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

// 2. PRE-BUILD ALL ROUTES FOR MAXIMUM SPEED
export function generateStaticParams() {
  return TOURS_DATA.map((tour) => ({
    id: tour.id,
  }));
}

// 3. PASS ONLY THE ID STRING TO THE CLIENT
export default async function TourPage({ params }) {
  const { id } = await params;
  const tour = TOURS_DATA.find((t) => t.id === id);

  if (!tour) return <div className="p-20 text-center font-black text-2xl">Tour not found.</div>;

  return <TourClient tourId={id} />;
}