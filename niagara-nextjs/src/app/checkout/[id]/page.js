import { getLiveTours } from "@/lib/firebase-utils";
import CheckoutClient from "./CheckoutClient";

export const dynamic = 'force-dynamic'; // Always fetch the freshest data

export default async function CheckoutPage({ params, searchParams }) {
  // Grab the ID from the URL
  const { id } = await params;
  
  // Grab the date from the URL (or default to today)
  const resolvedSearchParams = await searchParams;
  const date = resolvedSearchParams?.date || new Date().toLocaleDateString();

  // Fetch from Firebase
  const tours = await getLiveTours();
  const tour = tours.find((t) => t.id === id);

  if (!tour) {
    return <div className="p-20 text-center font-black text-2xl mt-20">Tour not found.</div>;
  }

  // Pass the full 'tour' object to the client component
  return <CheckoutClient tour={tour} initialDate={decodeURIComponent(date)} />;
}