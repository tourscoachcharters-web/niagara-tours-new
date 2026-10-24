import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { ORGANIZATION_SCHEMA, JsonLd } from "@/lib/schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://www.niagaratravels.ca";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Niagara Travels | Premium Niagara Falls Experiences & Tours",
    template: "%s | Niagara Travels",
  },
  description:
    "Experience the ultimate Niagara Falls tours from Toronto. Luxury transportation, licensed expert guides, boat cruises, wine tastings, and private custom VIP packages.",
  keywords: [
    "Niagara Falls tours",
    "Toronto to Niagara Falls tour",
    "Niagara Falls day tour",
    "Niagara Falls boat cruise",
    "Niagara-on-the-Lake wine tour",
    "private Niagara tour",
    "Niagara Falls private charter",
    "Niagara Travels",
  ],
  authors: [{ name: "Niagara Travels", url: SITE_URL }],
  creator: "Niagara Travels",
  publisher: "Niagara Travels",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    title: "Niagara Travels | Premium Niagara Falls Experiences & Tours",
    description:
      "Discover the magic of Niagara Falls with top-rated guided tours, scenic boat cruises, and luxury private excursions from Toronto.",
    url: SITE_URL,
    siteName: "Niagara Travels",
    images: [
      {
        url: "/images/hero-home.jpg",
        width: 1200,
        height: 630,
        alt: "Niagara Falls Sightseeing Tours",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Niagara Travels | Premium Niagara Falls Experiences & Tours",
    description:
      "Experience the beauty and excitement of Niagara Falls on our award-winning day tours and private luxury charters.",
    images: ["/images/hero-home.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-CA"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <JsonLd data={ORGANIZATION_SCHEMA} />
      </head>
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-slate-800 font-sans">
        {/* Skip to Content for Screen Readers & Keyboard Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#0C3136] focus:text-white focus:font-bold focus:rounded-lg focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#F8A41E]"
        >
          Skip to main content
        </a>

        {/* Global Semantic Header with Navigation */}
        <Header />

        {/* Semantic Main Content Region */}
        <main id="main-content" className="flex-1 min-h-screen outline-none" tabIndex={-1}>
          {children}
        </main>

        {/* Semantic Global Footer Hub */}
        <Footer />

        {/* Interactive Chat Widget */}
        <ChatWidget />
      </body>
    </html>
  );
}
