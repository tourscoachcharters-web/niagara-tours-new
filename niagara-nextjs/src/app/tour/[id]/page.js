import { TOURS_DATA } from "@/data/tours";
import TourClient from "./TourClient";

// 1. THIS RUNS ON THE SERVER TO GENERATE PERFECT SEO FOR EACH TOUR
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

// 2. THIS PASSES THE DATA TO OUR CLIENT UI
export default async function TourPage({ params }) {
  const { id } = await params;
  const tour = TOURS_DATA.find((t) => t.id === id);

  if (!tour) return <div className="p-20 text-center font-black text-2xl">Tour not found.</div>;

  return <TourClient tour={tour} />;
}