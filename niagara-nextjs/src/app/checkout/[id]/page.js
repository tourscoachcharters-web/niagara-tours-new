import { TOURS_DATA } from "@/data/tours";
import CheckoutClient from "./CheckoutClient";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const tour = TOURS_DATA.find((t) => t.id === id);

  if (!tour) return { title: "Checkout Not Found | Niagara Travels" };

  return {
    title: `Secure Checkout - ${tour.title} | Niagara Travels`,
    description: `Complete your secure booking for the ${tour.title} experience.`,
    robots: { index: false, follow: false },
  };
}

export function generateStaticParams() {
  return TOURS_DATA.map((tour) => ({
    id: tour.id,
  }));
}

export default async function CheckoutPage({ params, searchParams }) {
  const { id } = await params;
  const awaitedSearchParams = await searchParams;
  const date = awaitedSearchParams?.date || new Date().toLocaleDateString();
  
  const tour = TOURS_DATA.find((t) => t.id === id);

  if (!tour) return <div className="p-20 text-center font-black">Tour not found.</div>;

  return <CheckoutClient tourId={id} initialDate={date} />;
}