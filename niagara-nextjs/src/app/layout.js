import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- ENHANCED SEO METADATA FOR NIAGARA TRAVELS ---
export const metadata = {
  title: "Niagara Travels | Premium Niagara Falls Experiences",
  description: "Discover the magic of Niagara Falls with our guided tours, from classic day escapes to private VIP experiences.",
  metadataBase: new URL("https://www.niagaratravels.ca"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Niagara Travels | Premium Niagara Falls Experiences",
    description: "Discover the magic of Niagara Falls with our guided tours, from classic day escapes to private VIP experiences.",
    url: "https://www.niagaratravels.ca",
    siteName: "Niagara Travels",
    locale: "en_CA",
    type: "website",
  },
};

// Trigger Vercel Build.
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-slate-800 font-sans">
        {/* Global Navigation Header */}
        <Header />
        
        {/* Main Content Render Bay */}
        <main className="flex-1 min-h-screen">
          {children}
        </main>
        
        {/* Global Footer Hub */}
        <Footer />
        
        {/* Dynamic Chat Widget Drawer */}
        <ChatWidget />
      </body>
    </html>
  );
}