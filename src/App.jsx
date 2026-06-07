import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, onSnapshot, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { 
  Phone, Mail, Clock, MapPin, Calendar, Users, Search, Star, ChevronRight, ChevronLeft,
  Navigation, ShieldCheck, Zap, Globe, Menu, X, Compass, Send, MessageSquare, Map as MapIcon, 
  Camera, CheckCircle2, Settings, Plane, Ticket, Loader2, Quote, ThumbsUp, LayoutDashboard, 
  CheckCircle, XCircle, Trash2, DollarSign, Bus, Wind, Grape, Utensils, LogOut, Plus, Minus, 
  AlertCircle, Ban, Sun, FileText, Baby, ArrowRight, Trophy, Flame, LifeBuoy, Car, Ship, 
  Award, Sparkles
} from 'lucide-react';

// --- LEAFLET MARKER FIX ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// --- FIREBASE INITIALIZATION ---
const firebaseConfig = {
  apiKey: "AIzaSyC5DVk0W9tBFW4sTwVZIEG6vQRiQHisIcY",
  authDomain: "new-niagara-tours.firebaseapp.com",
  projectId: "new-niagara-tours",
  storageBucket: "new-niagara-tours.firebasestorage.app",
  messagingSenderId: "617199953253",
  appId: "1:617199953253:web:1014a1aad3ce755da56d8c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const ImageWithFallback = ({ src, alt, className, size, isLogo }) => {
  const [error, setError] = useState(false);
  if (error || !src) {
    return (
      <div className={`${className} bg-slate-100 flex flex-col items-center justify-center text-slate-400 p-2 text-center border border-dashed border-slate-200 rounded-lg`}>
        <div className="bg-white p-2 rounded-full mb-1"><Camera className="w-4 h-4 text-slate-300" /></div>
        <p className="text-[8px] font-black uppercase tracking-tight text-[#0C3136]">{isLogo ? 'Logo' : 'Image'}</p>
        <p className="text-[7px] font-bold text-slate-400">Filename: {src.split('/').pop()}</p>
        <p className="text-[8px] font-black text-[#F8A41E]">{size}</p>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setError(true)} />;
};

// --- DYNAMIC CHAT WIDGET ---
const ChatWidget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleMessage = (event) => {
      // Listen for the broadcast from your Vercel Chat App
      if (event.data && event.data.type === 'CHAT_WIDGET_STATE') {
        setIsChatOpen(event.data.isOpen);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <iframe 
      src="https://multi-agent-chat-rho.vercel.app/?mode=embed&site=Niagara+Travels" 
      title="Live Support"
      allowTransparency={true}
      style={{
        position: 'fixed', 
        bottom: '0', 
        right: '0', 
        // Dynamically resizes based on state to prevent dead zones
        width: isChatOpen ? '400px' : '100px', 
        height: isChatOpen ? '600px' : '100px', 
        border: 'none', 
        zIndex: 999999, 
        background: 'transparent', 
        pointerEvents: 'auto',
        transition: 'all 0.3s ease-in-out'
      }}
    />
  );
};

// --- DATA & CONTENT ---
const TOURS_DATA = [
  {
    id: 'half-day-private',
    title: 'Niagara Falls Half Day Private Tour',
    tagline: 'A flexible, private escape to Niagara Falls for those with limited time.',
    price: 795, 
    duration: '5 - 6 Hours',
    img: '/images/tour-half-day.jpg',
    tag: 'HALF DAY PRIVATE',
    overview: 'Experience the beauty and excitement of Niagara Falls on a private half-day escape from Toronto. Perfect for couples, families, and small groups, this tour is personalized just for you.',
    inclusions: [
      'Private luxury transportation', 
      'Professional driver/guide', 
      'Hotel pickup and drop-off (Toronto & GTA)', 
      'Flexible sightseeing itinerary', 
      'Scenic Niagara Parkway drive', 
      'Complimentary bottled water'
    ],
    exclusions: [
      'Attraction Admission Tickets', 
      'Optional Boat Cruise / Helicopter Ride', 
      'Optional Winery Visit', 
      'Lunch or Dinner Packages'
    ],
    itinerary: [
      "Toronto Pickup: Your private driver-guide will pick you up from your hotel, residence, or preferred location.",
      "Scenic Niagara Parkway Drive: Enjoy views of the Niagara River, vineyards, and charming towns.",
      "Niagara Falls Experience: Explore Horseshoe Falls, Table Rock, Clifton Hill, and Queen Victoria Park.",
      "Scenic Stops: Enjoy photo stops at Whirlpool Rapids, Floral Clock, and Niagara Gorge.",
      "Optional Attractions: Enhance your trip with a Boat Cruise, Helicopter Tour, or Skylon Tower visit.",
      "Return to Toronto: Relax on your comfortable drive back after an unforgettable experience."
    ],
    highlights: [
      { t: 'Personalized Experience', d: 'Enjoy a stress-free tour with private luxury transportation and a professional local guide.', i: Users },
      { t: 'Flexible Itinerary', d: 'Explore at your own pace, customize your stops, and balance sightseeing with free time.', i: Navigation },
      { t: 'Breathtaking Stops', d: 'Visit the breathtaking Horseshoe Falls, Whirlpool Rapids, and the Floral Clock.', i: Camera }
    ],
    idealFor: 'Couples, families, small groups, corporate travelers, and visitors with limited time in Toronto.',
    facts: [
      { l: 'Duration', v: '5 - 6 Hours', i: Clock },
      { l: 'Group Size', v: 'Private', i: Users },
      { l: 'Pace', v: 'Flexible', i: Zap },
      { l: 'Transport', v: 'Luxury Vehicle', i: Bus },
      { l: 'Pickup', v: 'Toronto / GTA', i: MapPin }
    ]
  },
  {
    id: 'classic-day-escape',
    title: 'Niagara Classic Day Escape',
    tagline: 'Feel the mist and hear the roar on our most comprehensive day tour.',
    price: 99,
    duration: '9-10 Hours',
    img: '/images/tour-classic.jpg', 
    tag: 'BEST VALUE',
    overview: 'The Niagara Classic Day Escape is perfect for first-time visitors to Niagara Falls. Whether you\'re traveling solo, with friends, or with family, this affordable day tour offers a comprehensive Niagara experience.',
    inclusions: ['Round-trip Transport from Toronto', 'Niagara Falls Sightseeing', 'Niagara City Cruises (Seasonal)', 'Photo Stops at iconic locations', 'Free Time for exploration', 'Maple Syrup Tasting'],
    exclusions: ['Gratuities (Optional)', 'Meals and drinks', 'Pickup outside downtown Toronto'],
    itinerary: [
      "Morning departure from downtown Toronto pickup points",
      "Quick maple syrup tasting stop at a local farm",
      "Prime time at Niagara Falls including the iconic Boat Ride",
      "Optional independent sightseeing at Clifton Hill",
      "A charming stop at historic Niagara-on-the-Lake",
      "Return to Toronto in the late afternoon/evening"
    ],
    highlights: [
      { t: 'Niagara Falls Boat Ride', d: 'Get up close to the falls with an unforgettable boat ride during the summer season.', i: Wind },
      { t: 'Picturesque Views', d: 'Stop at the best viewing spots, including Table Rock and Queen Victoria Park.', i: Camera },
      { t: 'Cultural Experience', d: 'Visit a local maple syrup farm for a sweet taste of Canadian culture.', i: Grape }
    ],
    idealFor: 'First-time visitors, budget-conscious travelers, families',
    facts: [
      { l: 'Duration', v: '9 - 10 Hours', i: Clock },
      { l: 'Group Size', v: 'Max 50 Guests', i: Users },
      { l: 'Languages', v: 'English', i: Globe },
      { l: 'Transport', v: 'Luxury Coach', i: Bus },
      { l: 'Pickup', v: 'Toronto Downtown', i: MapPin }
    ]
  },
  {
    id: 'ultimate-adventure',
    title: 'Ultimate Niagara Adventure',
    tagline: 'See it all from above, behind, and deep inside the mist.',
    price: 199,
    duration: '9 Hours',
    img: '/images/tour-adventure.jpg',
    tag: 'MOST POPULAR',
    overview: 'The Ultimate Niagara Adventure is the complete Niagara Falls experience. Perfect for visitors who want to see it all, this tour includes premium access to iconic attractions like Journey Behind the Falls, boat cruise, and more!',
    inclusions: ['Niagara City Cruises Boat Ride', 'Journey Behind the Falls Admission', 'Skylon Tower Observation Deck', 'Scenic Photo Stops', 'Maple Syrup & Chocolate Tasting'],
    exclusions: ['Gratuities for guide/driver', 'Personal purchases', 'Transport to non-listed hotels'],
    itinerary: [
      "Early morning luxury pickup from your Toronto hotel",
      "Panoramic views from the Skylon Tower Observation Deck",
      "Thrilling 'Journey Behind the Falls' experience",
      "Iconic Boat Cruise into the heart of the mist",
      "Gourmet buffet lunch overlooking the Horseshoe Falls (Optional Add-on)",
      "Guided tour of the Niagara Parkway and Whirlpool Rapids",
      "Return to Toronto with door-to-door drop-off"
    ],
    highlights: [
      { t: 'Journey Behind the Falls', d: 'Discover Niagara\'s natural wonder from a unique perspective inside the rock behind the falls.', i: MapIcon },
      { t: 'Skylon Tower', d: 'Enjoy bird’s-eye views of the falls and the surrounding landscape.', i: Navigation },
      { t: 'Niagara City Cruises', d: 'Get close to the cascading waters for a truly memorable experience.', i: Wind }
    ],
    idealFor: 'Tourists who want the full Niagara experience, adventure seekers, families, couples',
    facts: [
      { l: 'Duration', v: '9 Hours', i: Clock },
      { l: 'Group Size', v: 'Max 25 Guests', i: Users },
      { l: 'Languages', v: 'English / French', i: Globe },
      { l: 'Inclusions', v: 'All Entrance Fees', i: ShieldCheck },
      { l: 'Pickup', v: 'Hotel Included', i: MapPin }
    ]
  },
  {
    id: 'evening-illumination',
    title: 'Niagara Evening Illumination Tour',
    tagline: 'Watch the falls transform into a dazzling display of color and light.',
    price: 109,
    duration: '10 Hours',
    img: '/images/tour-evening.jpg',
    tag: 'ROMANTIC',
    overview: 'Experience Niagara Falls in a whole new light on this evening tour. After a day of sightseeing, enjoy the illuminated falls and seasonal fireworks display, making this the perfect evening tour for photographers, couples, and anyone wanting to see the falls sparkle at night.',
    inclusions: ['Niagara Falls Sightseeing', 'Niagara City Cruises (Daytime)', 'Skylon Tower Night Views', 'Optional Dinner Stop', 'Niagara Falls Illumination', 'Seasonal Fireworks Display'],
    exclusions: ['Dinner cost', 'Gratuities', 'Hotel pickup (Meet at designated spots only)'],
    itinerary: [
      "Mid-afternoon departure from Toronto (2:00 PM)",
      "Visit to the world's smallest chapel and the Floral Clock",
      "Afternoon sightseeing and Boat Cruise experience",
      "Free time for dinner with a view of the falls",
      "Evening Illumination: watch the falls light up in color",
      "Seasonal Fireworks display (Weather permitting)",
      "Late night arrival back in Toronto (approx. midnight)"
    ],
    highlights: [
      { t: 'Falls Illumination', d: 'See the falls lit up in vibrant colors against the night sky.', i: Zap },
      { t: 'Fireworks Display', d: 'During peak seasons, enjoy a spectacular fireworks show over the falls.', i: Star },
      { t: 'Evening Serenity', d: 'The falls look magical at night, a perfect way to wrap up your day.', i: Clock }
    ],
    idealFor: 'Couples, photographers, anyone wanting to experience Niagara Falls at night',
    facts: [
      { l: 'Duration', v: '10 Hours', i: Clock },
      { l: 'Atmosphere', v: 'Romantic / Scenic', i: Star },
      { l: 'Best For', v: 'Couples', i: Users },
      { l: 'Timing', v: '2 PM Departure', i: Clock },
      { l: 'Pickup', v: 'Toronto & Niagara', i: MapPin }
    ]
  },
  {
    id: 'wine-country',
    title: 'Niagara Wine Country & Falls Tour',
    tagline: 'Sip award-winning icewine steps away from a world wonder.',
    price: 199,
    duration: 'Full Day',
    img: '/images/tour-wine.jpg',
    tag: 'WINE LOVERS',
    overview: 'This tour combines the best of both worlds—Niagara Falls’ natural beauty and the stunning vineyards of Niagara-on-the-Lake. Perfect for wine lovers, this tour offers a relaxing and scenic day with a wine-tasting experience after visiting the falls.',
    inclusions: ['Niagara Falls Sightseeing', 'Scenic Niagara-on-the-Lake Drive', 'Winery Tour & Tasting (2 locations)', 'Vineyard Walk', 'Photo Stops', 'Optional Gourmet Winery Lunch'],
    exclusions: ['Lunch cost', 'Additional bottles of wine', 'Gratuities'],
    itinerary: [
      "Morning departure through the scenic Golden Horseshoe",
      "Guided sightseeing at the brink of Niagara Falls",
      "Scenic drive along the Niagara Parkway to Wine Country",
      "Tasting and cellar tour at a boutique award-winning winery",
      "Leisurely lunch and shopping in Niagara-on-the-Lake",
      "Second premium tasting featuring world-famous Icewine",
      "Evening return to Toronto through the rolling countryside"
    ],
    highlights: [
      { t: 'Niagara-on-the-Lake', d: 'A charming town known for its wineries, heritage, and views of Lake Ontario.', i: MapPin },
      { t: 'Wine Tastings', d: 'Sample world-class wines at two of Niagara’s premier wineries.', i: Grape },
      { t: 'Vineyard Walk', d: 'Stroll through scenic vineyards while soaking in the sights and fresh air.', i: Camera },
    ],
    idealFor: 'Wine enthusiasts, couples, small groups',
    facts: [
      { l: 'Duration', v: '8 - 9 Hours', i: Clock },
      { l: 'Tastings', v: '2 Wineries Incl.', i: Grape },
      { l: 'Group Size', v: 'Small Group (14)', i: Users },
      { l: 'Age', v: '19+ for Wine', i: ShieldCheck },
      { l: 'Pickup', v: 'Toronto/Niagara', i: MapPin }
    ]
  },
  {
    id: 'vip-experience',
    title: 'Private Custom Niagara VIP Experience',
    tagline: 'Your schedule, your pace, your luxury vehicle.',
    price: 1795,
    duration: 'Flexible',
    img: '/images/tour-vip.jpg',
    tag: 'PRIVATE / VIP',
    overview: 'For those who want a personalized experience, the Private Custom Niagara VIP Experience offers luxury transportation and a flexible itinerary, ensuring you get the most out of your day in Niagara Falls and the surrounding area. Ideal for groups, families, or corporate outings.',
    inclusions: ['Private Chauffeur & Vehicle', 'Fully Custom Itinerary', 'Niagara City Cruises', 'Skylon Tower VIP Access', 'Wine & Food Tastings', 'Flexible Schedule'],
    exclusions: ['Meals not specified in custom itinerary', 'Gratuities'],
    itinerary: [
      "Luxury pickup at your preferred time and location",
      "Personal chauffeur-guide for the entire day",
      "Bespoke itinerary tailored to your specific interests",
      "Front-of-the-line access to major attractions",
      "Exclusive stops at 'locals-only' hidden viewpoints",
      "Gourmet dining reservations at the region's finest tables",
      "Flexible return time with door-to-door drop-off"
    ],
    highlights: [
      { t: 'VIP Experience', d: 'Private vehicle with a personal driver, offering a completely tailored experience.', i: Users },
      { t: 'Personalized Itinerary', d: 'Pick and choose your own attractions to create the perfect day.', i: Navigation },
      { t: 'Exclusive Stops', d: 'Visit off-the-beaten-path spots like local wineries and unique attractions.', i: ShieldCheck }
    ],
    idealFor: 'VIP guests, families, corporate groups, special occasions',
    facts: [
      { l: 'Duration', v: 'Completely Flexible', i: Clock },
      { l: 'Transport', v: 'Private SUV/Limo', i: Bus },
      { l: 'Group Size', v: 'Up to 6 Guests', i: Users },
      { l: 'Pace', v: 'Your Choice', i: Zap },
      { l: 'Pickup', v: 'Door-to-Door', i: MapPin }
    ]
  },
  {
    id: 'three-day-tour',
    title: 'Toronto, Thousand Islands & Niagara 3-Day Tour',
    tagline: 'Discover Canada’s most famous urban and natural landmarks.',
    price: 329,
    duration: '3 Days',
    img: '/images/tour-3day.jpg',
    tag: 'MULTI-CITY',
    overview: 'Make the most of your trip to Canada with this 3-day guided tour, visiting Toronto, Thousand Islands, Kingston, and Niagara Falls. Ideal for those with more time, this tour gives you a taste of Canada’s natural beauty and urban culture.',
    inclusions: ['Expert Tour Guide', 'Toronto Sightseeing', 'Thousand Islands Cruise', 'Kingston Historic Visit', 'Niagara Falls Full Experience', 'Hotel Accommodations (2 nights)'],
    exclusions: ['Lunches and Dinners', 'Gratuities', 'Personal expenses'],
    itinerary: [
      "Day 1: Comprehensive Toronto City Tour & travel to Kingston",
      "Day 1: Guided walk through historic Kingston (Canada's first capital)",
      "Day 2: Thousand Islands cruise through the heart of the St. Lawrence",
      "Day 2: Scenic drive to the Niagara region and hotel check-in",
      "Day 3: Full Niagara Falls adventure including Boat Cruise",
      "Day 3: Afternoon at Niagara-on-the-Lake and return to Toronto"
    ],
    highlights: [
      { t: 'Thousand Islands Cruise', d: 'A stunning cruise through one of the most beautiful spots in Canada.', i: Wind },
      { t: 'Niagara Falls', d: 'Visit the world’s most famous waterfall with multiple attractions.', i: MapIcon },
      { t: 'Toronto & Kingston', d: 'Discover two major Canadian cities filled with history, culture, and architecture.', i: Globe }
    ],
    idealFor: 'International tourists, those wanting to explore multiple destinations in one tour',
    facts: [
      { l: 'Duration', v: '3 Days / 2 Nights', i: Clock },
      { l: 'Stay', v: 'Hotel Included', i: MapPin },
      { l: 'Meals', v: 'Breakfast Incl.', i: Utensils },
      { l: 'Guide', v: 'Licensed Expert', i: Users },
      { l: 'Destinations', v: '3 Major Hubs', i: Globe }
    ]
  }
];

const REVIEWS_DATA = [
  { id: 1, name: "Sarah Jenkins", date: "August 15, 2025", rating: 5, tour: "Niagara Classic Day Escape", text: "Absolutely incredible experience! Our guide was so knowledgeable and knew exactly where to take us to avoid the biggest crowds. The boat ride was the highlight of our trip to Canada. Highly recommend this company to anyone visiting." },
  { id: 2, name: "Mark & Lisa Thompson", date: "July 22, 2025", rating: 5, tour: "Niagara Evening Illumination Tour", text: "Seeing the falls lit up at night is something we will never forget. The dinner overlooking the falls was spectacular. Highly recommend this tour for couples looking for a romantic and stress-free evening." },
  { id: 3, name: "David Chen", date: "September 05, 2025", rating: 4, tour: "Ultimate Niagara Adventure", text: "A very packed day but totally worth it if you only have one day to see everything. Journey Behind the Falls was amazing. The bus was comfortable and the pickup was prompt. Four stars only because the lunch was a bit rushed." },
  { id: 4, name: "Elena Rodriguez", date: "October 12, 2025", rating: 5, tour: "Niagara Wine Country & Falls Tour", text: "The perfect balance of sightseeing and relaxing. The falls were beautiful, but the wineries in Niagara-on-the-Lake were the real hidden gem. The icewine tasting was superb! Our guide Michael was the absolute best." },
  { id: 5, name: "The Patel Family", date: "June 30, 2025", rating: 5, tour: "Private Custom Niagara VIP Experience", text: "We had a large family group with young kids and elderly parents. Booking the private VIP tour was the best decision. Our driver catered to all our needs, modified the itinerary on the fly, and paced the day perfectly." },
  { id: 6, name: "James Wilson", date: "May 18, 2025", rating: 5, tour: "Toronto, Thousand Islands & Niagara 3-Day Tour", text: "A fantastic 3-day overview of the region. Everything was taken care of seamlessly - hotels, transport, tickets. Thousand Islands was surprisingly beautiful, but Niagara was definitely the grand finale." },
  { id: 7, name: "Emma Dubois", date: "April 02, 2025", rating: 5, tour: "Niagara Classic Day Escape", text: "Excellent value for money. The maple syrup stop was a sweet bonus that my kids loved. The coach was pristine and had wifi which was great for the ride back to Toronto." },
  { id: 8, name: "Robert Klein", date: "March 15, 2025", rating: 4, tour: "Ultimate Niagara Adventure", text: "Great tour covering all the bases. The Skylon tower view is unbeatable. I would suggest bringing an extra pair of socks for the boat ride, you will get wet!" },
  { id: 9, name: "Sophie & Alex", date: "February 14, 2025", rating: 5, tour: "Niagara Evening Illumination Tour", text: "We did this for Valentine's Day and it was magical. The fireworks were the cherry on top. Our guide made sure we got the perfect spot to take photos." }
];

const PICKUP_POINTS = [
  { name: "Royal Ontario Museum", sub: "(Queen's Park Entrance), 100 Queens Park", area: "Downtown Toronto", time: "7:55 AM", lat: 43.6677, lng: -79.3948 },
  { name: "Holiday Inn Downtown Centre", sub: "30 Carlton St", area: "Downtown Toronto", time: "8:00 AM", lat: 43.6624, lng: -79.3831 },
  { name: "Chelsea Hotel", sub: "33 Gerrard St W", area: "Downtown Toronto", time: "8:15 AM", lat: 43.6580, lng: -79.3828 },
  { name: "Sheraton Centre", sub: "123 Queen St W", area: "Downtown Toronto", time: "8:15 AM", lat: 43.6515, lng: -79.3836 },
  { name: "Maple Leaf Square", sub: "@ the South Entrance of Union Station", area: "Downtown Toronto", time: "8:30 AM", lat: 43.6431, lng: -79.3802 }
];

const MapleLeafIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2L12.88,4.12C13,4.41 13.27,4.6 13.58,4.6H15.82L14,5.92C13.74,6.11 13.64,6.44 13.73,6.74L14.41,8.86L12.59,7.54C12.33,7.35 12,7.35 11.74,7.54L9.92,8.86L10.6,6.74C10.69,6.44 10.59,6.11 10.33,5.92L8.51,4.6H10.75C11.06,4.6 11.33,4.41 11.45,4.12L12,2M12,10.33C12.44,10.33 12.8,10.69 12.8,11.13V15.93C14.53,15.13 16,13.6 16.8,11.93C17.07,11.4 17.73,11.2 18.27,11.47C18.8,11.73 19,12.4 18.73,12.93C17.67,15.13 15.8,17 13.6,18.07L14.4,20C14.53,20.4 14.33,20.87 13.93,21C13.8,21.07 13.67,21.07 13.53,21.07H10.47C10,21.07 9.67,20.73 9.67,20.33C9.67,20.2 9.67,20.07 9.73,19.93L10.53,18.13C8.33,17.07 6.47,15.2 5.4,13C5.13,12.47 5.33,11.8 5.87,11.53C6.4,11.27 7.07,11.47 7.33,12C8.13,13.67 9.6,15.13 11.33,15.93V11.27C11.33,10.87 11.6,10.53 12,10.53V10.33Z" />
  </svg>
);

const FacebookIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const TwitterIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-94 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
const YoutubeIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const CalendarDropdown = ({ onSelectDate }) => {
  const [viewDate, setViewDate] = useState(new Date());
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const firstDayOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();
  const handlePrevMonth = (e) => { e.stopPropagation(); setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1)); };
  const handleNextMonth = (e) => { e.stopPropagation(); setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1)); };

  return (
    <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 z-[100] p-6 animate-in zoom-in-95 duration-200 origin-top">
      <div className="flex justify-between items-center mb-6">
        <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-all"><ChevronLeft size={18} /></button>
        <div className="font-black text-[#0C3136] text-[11px] uppercase tracking-[0.2em]">{months[viewDate.getMonth()]} {viewDate.getFullYear()}</div>
        <button onClick={handleNextMonth} className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-all"><ChevronRight size={18} /></button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2 text-center text-[10px] font-black text-slate-300 uppercase">
        {days.map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {[...Array(firstDayOfMonth)].map((_, i) => <div key={`empty-${i}`} />)}
        {[...Array(daysInMonth)].map((_, i) => {
          const day = i + 1;
          const isToday = new Date().toDateString() === new Date(viewDate.getFullYear(), viewDate.getMonth(), day).toDateString();
          return (
            <button key={day} type="button" onClick={(e) => { e.stopPropagation(); onSelectDate(new Date(viewDate.getFullYear(), viewDate.getMonth(), day)); }}
              className={`h-9 w-full rounded-xl text-xs font-bold transition-all ${isToday ? 'bg-[#F8A41E] text-[#0C3136]' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const NavItem = ({ label, href, active, onClick }) => (
  <a href={href} onClick={onClick} className={`flex items-center gap-1 font-black text-[11px] uppercase tracking-widest cursor-pointer transition-colors ${active ? 'text-[#F8A41E]' : 'text-[#0C3136] hover:text-[#F8A41E]'}`}>
    {label}
  </a>
);

// --- REUSABLE PREMIUM TOUR CARD COMPONENT ---
const TourCard = ({ tour }) => {
  let theme = { badgeBg: 'bg-[#125D66]', badgeIcon: Compass, footerBg: 'bg-slate-50', textColor: 'text-[#125D66]', btnBg: 'bg-[#D91E1E]', features: [{ icon: Star, label: 'Top Rated' }, { icon: Bus, label: 'Transport' }, { icon: ShieldCheck, label: 'Secure' }] };
  if (tour.tag === 'HALF DAY PRIVATE') theme = { badgeBg: 'bg-[#D97706]', badgeIcon: LifeBuoy, footerBg: 'bg-[#FFFBEB]', textColor: 'text-[#B45309]', btnBg: 'bg-[#D91E1E]', features: [{ icon: Users, label: 'Private Tour' }, { icon: Car, label: 'Hotel Pickup' }, { icon: Camera, label: 'Scenic Stops' }] };
  else if (tour.tag === 'BEST VALUE') theme = { badgeBg: 'bg-[#0D9488]', badgeIcon: Trophy, footerBg: 'bg-[#F0FDFA]', textColor: 'text-[#0F766E]', btnBg: 'bg-[#0D9488]', features: [{ icon: Sparkles, label: 'Top Attractions' }, { icon: Ship, label: 'Boat Cruise' }, { icon: Users, label: 'Expert Guide' }] };
  else if (tour.tag === 'MOST POPULAR') theme = { badgeBg: 'bg-[#6D28D9]', badgeIcon: Flame, footerBg: 'bg-[#F5F3FF]', textColor: 'text-[#5B21B6]', btnBg: 'bg-[#6D28D9]', features: [{ icon: Award, label: 'Premium Access' }, { icon: Sparkles, label: 'Top Attractions' }, { icon: ShieldCheck, label: 'Unforgettable' }] };
  else if (tour.tag === 'ROMANTIC') theme = { badgeBg: 'bg-[#BE123C]', badgeIcon: Star, footerBg: 'bg-[#FFF1F2]', textColor: 'text-[#BE123C]', btnBg: 'bg-[#BE123C]', features: [{ icon: Zap, label: 'Illumination' }, { icon: Star, label: 'Fireworks' }, { icon: Camera, label: 'Scenic Stops' }] };
  else if (tour.tag === 'WINE LOVERS') theme = { badgeBg: 'bg-[#9D174D]', badgeIcon: Grape, footerBg: 'bg-[#FDF2F8]', textColor: 'text-[#9D174D]', btnBg: 'bg-[#9D174D]', features: [{ icon: Grape, label: 'Wine Tasting' }, { icon: Bus, label: 'Transport' }, { icon: Compass, label: 'Scenic Route' }] };
  else if (tour.tag === 'PRIVATE / VIP') theme = { badgeBg: 'bg-[#1E293B]', badgeIcon: ShieldCheck, footerBg: 'bg-[#F8FAFC]', textColor: 'text-[#334155]', btnBg: 'bg-[#0F172A]', features: [{ icon: Users, label: 'Private Group' }, { icon: Settings, label: 'Custom Route' }, { icon: Star, label: 'VIP Access' }] };
  else if (tour.tag === 'MULTI-CITY') theme = { badgeBg: 'bg-[#0369A1]', badgeIcon: MapIcon, footerBg: 'bg-[#F0F9FF]', textColor: 'text-[#0369A1]', btnBg: 'bg-[#0369A1]', features: [{ icon: Globe, label: 'Multi-City' }, { icon: Wind, label: 'Cruise' }, { icon: Users, label: 'Expert Guide' }] };

  const words = tour.tag.split(' ');
  const mid = Math.ceil(words.length / 2);
  const formattedTag = words.length > 1 ? `${words.slice(0, mid).join(' ')}\n${words.slice(mid).join(' ')}` : tour.tag;

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col h-full hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-300">
       <div className="h-56 relative overflow-hidden group">
          <ImageWithFallback src={tour.img} size="800 x 600 px" alt={tour.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className={`absolute top-4 left-4 ${theme.badgeBg} text-white pl-3 pr-4 py-2 rounded-xl flex items-center gap-3 shadow-lg`}>
             <theme.badgeIcon className="w-6 h-6" />
             <span className="text-[9px] font-black leading-tight uppercase tracking-widest text-left whitespace-pre-line">
               {formattedTag}
             </span>
          </div>
       </div>
       
       <div className="p-6 pb-2 flex-1 flex flex-col">
          <h3 className="text-xl font-black text-[#0C3136] mb-3 leading-tight tracking-tight hover:text-[#F8A41E] transition-colors line-clamp-2">{tour.title}</h3>
          
          <div className="flex items-center gap-4 text-[11px] font-bold text-slate-500 mb-4">
             <div className="flex items-center gap-1.5 text-yellow-500 bg-yellow-50 px-2 py-1 rounded-md">
               <Star className="w-3.5 h-3.5 fill-current" /> 4.8
             </div>
             <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
               <Clock className="w-3.5 h-3.5 text-[#125D66]" /> {tour.duration}
             </div>
          </div>
          
          <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">{tour.overview}</p>
       </div>

       <div className={`${theme.footerBg} p-5 mx-6 mb-5 rounded-2xl flex justify-between items-center`}>
          <div>
            <span className="text-slate-500 text-[9px] font-black block uppercase tracking-widest mb-0.5">From</span>
            <span className="text-2xl font-black text-[#0C3136]">CAD ${tour.price}</span>
          </div>
          <a href={`/tour/${tour.id}`} className={`${theme.btnBg} hover:opacity-90 text-white px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-md active:scale-95 flex items-center gap-1.5 group/btn`}>
            VIEW TOUR
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </a>
       </div>

       <div className="flex justify-between items-center px-6 py-4 border-t border-slate-100 bg-white mt-auto">
          {theme.features.map((feat, idx) => (
             <div key={idx} className="flex flex-col items-center gap-1.5 w-1/3">
                <feat.icon className={`w-5 h-5 ${theme.textColor}`} />
                <span className={`text-[8px] font-black uppercase tracking-wider text-center leading-tight ${theme.textColor}`}>{feat.label}</span>
             </div>
          ))}
       </div>
    </div>
  );
};

const WhyTravelersLoveSection = () => (
  <section className="py-20 bg-slate-50/50 border-t border-slate-100">
    <div className="container mx-auto px-4">
      <h3 className="text-2xl font-black text-[#0C3136] mb-10 tracking-tight text-center lg:text-left">Why Travelers Love This Tour</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Camera, t: 'Breathtaking Views', d: 'See the natural wonder of Niagara Falls up close.', color: 'text-teal-600', bg: 'bg-teal-50' },
          { icon: Users, t: 'Expert Local Guide', d: 'Learn the history and stories from our friendly guides.', color: 'text-blue-600', bg: 'bg-blue-50' },
          { icon: Bus, t: 'Comfortable Transport', d: 'Travel in clean, modern vehicles with A/C.', color: 'text-orange-600', bg: 'bg-orange-50' },
          { icon: ShieldCheck, t: 'Free Cancellation', d: 'Cancel up to 24 hours in advance for a full refund.', color: 'text-red-600', bg: 'bg-red-50' }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 group hover:shadow-md transition-all">
            <div className={`shrink-0 w-12 h-12 rounded-full ${item.bg} ${item.color} flex items-center justify-center`}>
              <item.icon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[13px] text-[#0C3136] leading-tight mb-1">{item.t}</h4>
              <p className="text-[11px] text-slate-500 font-medium leading-tight">{item.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const HomePage = () => {
  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative pt-8 pb-20 lg:pt-12 lg:pb-24 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback src="/images/hero-home.jpg" size="1920 x 1080 px" alt="Niagara Falls Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C3136]/90 via-[#0C3136]/30 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-[#D91E1E] p-1.5 rounded-full shadow-lg"><Star className="w-3.5 h-3.5 text-white fill-current" /></span>
              <span className="uppercase text-[11px] font-black tracking-[0.2em]">PROUDLY CANADIAN</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-black mb-4 leading-[1.1] tracking-tight">
              Discover the <br /> Magic of <br /><span className="text-[#F8A41E] italic">Niagara Falls</span>
            </h2>
            <p className="text-base lg:text-lg text-slate-200 mb-8 max-w-xl leading-relaxed font-medium">Unforgettable experiences. Breathtaking views. Memories that last a lifetime.</p>
            
            <div className="flex flex-wrap gap-4">
              <a href="/tour/classic-day-escape" className="bg-[#D91E1E] hover:bg-[#b01818] text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-900/30 flex items-center gap-3">
                EXPLORE TOURS <ChevronRight className="w-4 h-4" />
              </a>
              <a href="/custom-itinerary" className="bg-white hover:bg-slate-50 text-[#0C3136] px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-3">
                <Settings className="w-4 h-4 text-[#F8A41E]" /> CUSTOM PACKAGE
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-12 lg:-mt-16 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {[
            { icon: Compass, title: "Local Guides", desc: "Born and raised experts" },
            { icon: Bus, title: "Transport", desc: "Modern A/C vehicles" },
            { icon: Clock, title: "Flexible", desc: "Customize your schedule" },
            { icon: Star, title: "Top Rated", desc: "Thousands of reviews" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-8 group cursor-pointer hover:bg-slate-50 transition-colors rounded-2xl">
              <div className="bg-[#0C3136]/5 p-4 rounded-full text-[#125D66] group-hover:bg-[#F8A41E] group-hover:text-[#0C3136] transition-all"><item.icon className="w-6 h-6" /></div>
              <div><h4 className="font-black text-[11px] text-[#0C3136] uppercase tracking-wider">{item.title}</h4><p className="text-xs text-slate-500 font-medium">{item.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-white to-[#F0F9FF] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8">
            <div className="lg:col-span-3">
              <p className="text-[#D91E1E] font-black text-[10px] uppercase tracking-[0.3em] mb-4">Why Choose Us</p>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0C3136] leading-[1.1] mb-6">Experience Niagara Like Never Before</h2>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                We're local, passionate, and dedicated to showing you the very best of Niagara Falls with exceptional service and unforgettable moments.
              </p>
            </div>
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-4 bg-[#F8A41E]/10 rounded-[4rem] blur-2xl group-hover:bg-[#F8A41E]/20 transition-all"></div>
              <div className="relative aspect-[4/3] rounded-[3rem] lg:rounded-[4rem] overflow-hidden border-8 border-white shadow-2xl">
                <ImageWithFallback src="/images/why-choose-us.jpg" size="1200 x 900 px" alt="Niagara Falls Tour Group" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C3136]/40 to-transparent"></div>
              </div>
            </div>
            <div className="lg:col-span-4 space-y-10">
              {[
                { icon: Users, t: "Local Experts", d: "Knowledgeable guides who bring Niagara's history and stories to life." },
                { icon: Compass, t: "Small Group Tours", d: "Personalized experiences with more attention and flexibility." },
                { icon: ShieldCheck, t: "Safety & Comfort", d: "Your safety and comfort are our top priorities." },
                { icon: Globe, t: "Sustainable Tourism", d: "We care for Niagara and support our local community." }
              ].map((feat, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-white shadow-lg border border-slate-50 flex items-center justify-center text-[#125D66] group-hover:bg-[#125D66] group-hover:text-white transition-all duration-300">
                    <feat.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-[#0C3136] uppercase tracking-wider mb-2">{feat.t}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{feat.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
             <div><p className="text-[#F8A41E] font-black text-xs uppercase tracking-[0.4em] mb-2">OUR SIGNATURE TOURS</p><h2 className="text-4xl font-black text-[#0C3136]">Explore Niagara & Beyond</h2></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TOURS_DATA.slice(0, 3).map((tour, i) => (
              <TourCard key={i} tour={tour} />
            ))}
          </div>
          <div className="mt-16 text-center">
            <a href="/tours" className="inline-block bg-[#0C3136] text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#125D66] transition-all shadow-xl">VIEW ALL {TOURS_DATA.length} TOURS</a>
          </div>
        </div>
      </section>
    </div>
  );
};

const ToursPage = () => {
  return (
    <div className="animate-in fade-in duration-700 bg-white">
      <section className="relative h-[450px] flex items-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback src="/images/hero-tours.jpg" size="1920 x 800 px" alt="All Tours Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C3136]/90 to-[#0C3136]/40"></div>
        </div>
        <div className="container mx-auto px-4 z-10">
          <span className="bg-[#F8A41E] text-[#0C3136] text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-[0.2em] mb-6 inline-block shadow-lg">Our Collections</span>
          <h1 className="text-5xl lg:text-8xl font-black leading-tight tracking-tighter mb-4">Niagara Falls <br />Tour Packages</h1>
          <p className="text-slate-200 text-lg max-w-xl font-medium opacity-90">From classic day escapes to private VIP luxury, discover the perfect way to experience the world's most famous waterfall.</p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {TOURS_DATA.map((tour, i) => (
            <TourCard key={i} tour={tour} />
          ))}
        </div>
      </main>
    </div>
  );
};

const CustomItineraryPage = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);
  const [interests, setInterests] = useState([]);

  const attractions = [
    { id: 'boat', t: 'Boat Cruise', i: Wind, p: 'High' },
    { id: 'behind', t: 'Behind the Falls', i: MapIcon, p: 'Must-See' },
    { id: 'heli', t: 'Helicopter View', i: Plane, p: 'Premium' },
    { id: 'skylon', t: 'Skylon Tower', i: Navigation, p: 'Panoramic' },
    { id: 'wine', t: 'Winery Tours', i: Grape, p: 'Social' },
    { id: 'dine', t: 'Gourmet Dining', i: Utensils, p: 'Luxury' },
    { id: 'parkway', t: 'Scenic Parkway', i: Camera, p: 'Relaxing' },
    { id: 'clifton', t: 'Clifton Hill', i: Zap, p: 'Family' }
  ];

  const toggleInterest = (id) => {
    setInterests(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => { if (calendarRef.current && !calendarRef.current.contains(event.target)) setShowCalendar(false); };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="animate-in fade-in duration-700 bg-white">
      <section className="relative h-[400px] flex items-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback src="/images/hero-custom.jpg" size="1920 x 800 px" alt="Custom Itinerary Background" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-[#0C3136]/60"></div>
        </div>
        <div className="container mx-auto px-4 z-10">
          <p className="text-[#F8A41E] font-black text-[10px] uppercase tracking-[0.4em] mb-4">Build Your Experience</p>
          <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tighter">Custom <span className="text-[#F8A41E]">Itinerary</span></h1>
          <p className="text-slate-300 text-lg max-w-xl font-medium mt-6">Tell us what you love, and our experts will craft a unique Niagara Falls package just for you.</p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8">
           <div className="space-y-12">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-[#0C3136] text-[#F8A41E] flex items-center justify-center font-black">1</div>
                  <h2 className="text-2xl font-black text-[#0C3136]">What interests you?</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {attractions.map(attr => (
                    <div 
                      key={attr.id}
                      onClick={() => toggleInterest(attr.id)}
                      className={`cursor-pointer p-6 rounded-3xl border-2 transition-all group flex flex-col items-center text-center ${interests.includes(attr.id) ? 'bg-[#0C3136] border-[#0C3136] text-white' : 'bg-white border-slate-100 hover:border-[#F8A41E]'}`}
                    >
                      <attr.i className={`w-8 h-8 mb-4 transition-colors ${interests.includes(attr.id) ? 'text-[#F8A41E]' : 'text-[#125D66]'}`} />
                      <h4 className="font-black text-[11px] uppercase tracking-wider mb-1">{attr.t}</h4>
                      <p className={`text-[9px] font-bold ${interests.includes(attr.id) ? 'text-white/60' : 'text-slate-400'}`}>{attr.p}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-slate-100">
                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-full bg-[#0C3136] text-[#F8A41E] flex items-center justify-center font-black">2</div>
                    <h2 className="text-2xl font-black text-[#0C3136]">The Logistics</h2>
                  </div>
                  <div className="space-y-6">
                    <div ref={calendarRef} className="relative">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Travel Date</label>
                      <button onClick={() => setShowCalendar(!showCalendar)} className="w-full flex items-center justify-between border-2 border-slate-100 p-4 rounded-2xl bg-white font-bold text-slate-600 text-sm">
                        <div className="flex items-center gap-3"><Calendar className="w-5 h-5 text-[#F8A41E]" /> {selectedDate || "Select Date"}</div>
                        <ChevronRight className="w-4 h-4 rotate-90" />
                      </button>
                      {showCalendar && <CalendarDropdown onSelectDate={(d) => { setSelectedDate(d.toLocaleDateString()); setShowCalendar(false); }} />}
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Number of Guests</label>
                      <select className="w-full border-2 border-slate-100 p-4 rounded-2xl bg-white font-black text-[#0C3136] text-sm appearance-none outline-none focus:border-[#F8A41E]">
                        <option>2 Adults</option>
                        <option>1 Adult</option>
                        <option>Small Group (4-6)</option>
                        <option>Large Group (10+)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 rounded-full bg-[#0C3136] text-[#F8A41E] flex items-center justify-center font-black">3</div>
                    <h2 className="text-2xl font-black text-[#0C3136]">Your Contact</h2>
                  </div>
                  <div className="space-y-4">
                    <input type="text" placeholder="Full Name" className="w-full p-4 border-2 border-slate-100 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E]" />
                    <input type="email" placeholder="Email Address" className="w-full p-4 border-2 border-slate-100 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E]" />
                    <textarea placeholder="Tell us more about your special requirements..." className="w-full p-4 border-2 border-slate-100 rounded-2xl font-bold text-sm outline-none h-32 focus:border-[#F8A41E]" />
                  </div>
                </div>
              </div>

              <button className="w-full bg-[#D91E1E] text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.4em] shadow-xl shadow-red-900/20 hover:bg-[#b01818] transition-all transform hover:-translate-y-1">
                GENERATE CUSTOM PROPOSAL
              </button>
           </div>
        </div>

        <div className="lg:col-span-4">
           <div className="sticky top-28 space-y-10">
              <div className="bg-[#0C3136] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <h3 className="text-xl font-black mb-6">Why Customize?</h3>
                <ul className="space-y-6">
                  {[
                    { t: 'Private Pace', d: 'No rushing. Spend as much time as you want at each spot.' },
                    { t: 'Hidden Gems', d: 'Visit local spots typical tours miss.' },
                    { t: 'VIP Access', d: 'Skip the lines with our premium bookings.' },
                    { t: 'Door-to-Door', d: 'Private pickup from any location in Ontario.' }
                  ].map((benefit, i) => (
                    <li key={i} className="flex gap-4">
                      <CheckCircle2 className="w-5 h-5 text-[#F8A41E] shrink-0" />
                      <div>
                        <h4 className="font-black text-xs uppercase tracking-widest">{benefit.t}</h4>
                        <p className="text-[11px] text-slate-400 mt-1">{benefit.d}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl">
                 <h4 className="font-black text-[#0C3136] text-sm uppercase tracking-widest mb-6">Need Immediate Help?</h4>
                 <div className="space-y-4">
                   <div className="flex items-center gap-3 text-lg font-black text-[#0C3136] hover:text-[#D91E1E] transition-colors cursor-pointer"><Phone className="w-5 h-5 text-[#F8A41E]" /> (416) 444-3000</div>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed">Call us and speak directly with a local planning expert today.</p>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
};

const TourDetailPage = ({ tourId }) => {
  const tour = TOURS_DATA.find(t => t.id === tourId);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);
  
  const [bookingCount] = useState(Math.floor(Math.random() * (24 - 7 + 1)) + 7);
  
  // Filter reviews specifically for this tour
  const tourReviews = REVIEWS_DATA.filter(r => r.tour === tour?.title);
  
  useEffect(() => {
    const handleClickOutside = (event) => { if (calendarRef.current && !calendarRef.current.contains(event.target)) setShowCalendar(false); };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToBooking = (e) => {
    e.preventDefault();
    document.getElementById('booking-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!tour) return <div className="p-20 text-center font-black">Tour not found.</div>;

  return (
    <div className="animate-in fade-in duration-700 bg-[#F8FAFC]">
      {/* 1. HERO SECTION */}
      <section className="relative h-[550px] flex items-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback src={tour.img} size="1920 x 800 px" alt={tour.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C3136]/95 via-[#0C3136]/60 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 z-10">
           <div className="max-w-3xl">
             <a href="/tours" className="flex w-max items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest mb-6 cursor-pointer hover:text-white transition-colors"><ChevronLeft className="w-3 h-3" /> Back to Tours</a>
             <span className="bg-[#F8A41E] text-[#0C3136] text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-[0.2em] mb-4 inline-block shadow-lg">{tour.tag}</span>
             <h1 className="text-4xl lg:text-7xl font-black leading-tight tracking-tighter mb-4">{tour.title}</h1>
             <p className="text-xl text-slate-200 font-medium mb-8 leading-relaxed max-w-2xl border-l-4 border-[#F8A41E] pl-4">{tour.tagline || 'Experience the natural wonder of Niagara Falls with our premium, locally guided tours.'}</p>
             <div className="flex flex-wrap items-center gap-6">
               <div className="flex flex-col">
                 <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">From</span>
                 <span className="text-3xl font-black text-white">CAD ${tour.price}</span>
               </div>
               <button onClick={scrollToBooking} className="bg-[#D91E1E] hover:bg-[#b01818] text-white px-8 py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-red-900/20">Book Your Tour Today</button>
             </div>
           </div>
        </div>
      </section>

      {/* 2. QUICK FACTS BAR */}
      <div className="bg-white border-b border-slate-200 shadow-sm relative z-20">
        <div className="container mx-auto px-4">
           <div className="flex flex-wrap justify-between items-center py-6 gap-6">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#125D66]"><Clock className="w-5 h-5" /></div>
                 <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</p><p className="font-bold text-[#0C3136] text-sm">{tour.duration}</p></div>
              </div>
              <div className="hidden md:block w-px h-10 bg-slate-100"></div>
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#125D66]"><Sun className="w-5 h-5" /></div>
                 <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Season</p><p className="font-bold text-[#0C3136] text-sm">Year-Round</p></div>
              </div>
              <div className="hidden lg:block w-px h-10 bg-slate-100"></div>
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#125D66]"><MapPin className="w-5 h-5" /></div>
                 <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pickup</p><p className="font-bold text-[#0C3136] text-sm">Included</p></div>
              </div>
              <div className="hidden xl:block w-px h-10 bg-slate-100"></div>
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#125D66]"><ShieldCheck className="w-5 h-5" /></div>
                 <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Passport</p><p className="font-bold text-[#0C3136] text-sm">Domestic (Not Req.)</p></div>
              </div>
           </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16 grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-16">
        
        {/* LEFT COLUMN: MAIN CONTENT */}
        <div className="xl:col-span-8 space-y-16">
           
           {/* 3. TOUR OVERVIEW */}
           <section>
              <h2 className="text-3xl font-black text-[#0C3136] mb-6 flex items-center gap-3"><Compass className="text-[#F8A41E]" /> Tour Overview</h2>
              <p className="text-slate-600 text-lg leading-relaxed font-medium bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">{tour.overview}</p>
           </section>

           {/* 4 & 11. WHAT'S INCLUDED & EXCLUSIONS */}
           <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-emerald-50/50 p-8 rounded-[2rem] border border-emerald-100 h-full">
                 <h3 className="text-xl font-black text-[#0C3136] mb-6 flex items-center gap-3"><CheckCircle2 className="text-emerald-500" /> What's Included</h3>
                 <ul className="space-y-4">
                    {tour.inclusions.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-700 font-bold items-start"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" /> {item}</li>
                    ))}
                 </ul>
              </div>
              <div className="bg-red-50/50 p-8 rounded-[2rem] border border-red-100 h-full">
                 <h3 className="text-xl font-black text-[#0C3136] mb-6 flex items-center gap-3"><XCircle className="text-red-500" /> Exclusions</h3>
                 <ul className="space-y-4">
                    {(tour.exclusions || ['Gratuities (Optional)', 'Meals (Unless stated)', 'Transport outside pickup zone']).map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-700 font-bold items-start"><Ban className="w-5 h-5 text-red-400 shrink-0" /> {item}</li>
                    ))}
                 </ul>
              </div>
           </section>

           {/* 5. HIGHLIGHTS */}
           <section>
              <h3 className="text-3xl font-black text-[#0C3136] mb-8">Tour Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {tour.highlights.map((h, i) => (
                   <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center hover:border-[#F8A41E] transition-all">
                     <div className="bg-[#0C3136]/5 text-[#125D66] p-4 rounded-2xl mb-5"><h.i className="w-6 h-6" /></div>
                     <h4 className="font-black text-sm text-[#0C3136] mb-2">{h.t}</h4>
                     <p className="text-xs text-slate-500 font-medium leading-relaxed">{h.d}</p>
                   </div>
                 ))}
              </div>
           </section>

           {/* 6. ITINERARY */}
           <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-3xl font-black text-[#0C3136] mb-10 flex items-center gap-3"><Navigation className="text-[#F8A41E]" /> Step-by-Step Itinerary</h3>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-slate-100">
                {(tour.itinerary || []).map((item, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#F8A41E] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                       <span className="font-black text-xs">{i+1}</span>
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-slate-50 p-6 rounded-2xl border border-slate-100 text-sm font-bold text-slate-700">
                       {item}
                    </div>
                  </div>
                ))}
              </div>
           </section>

           {/* 7. PICKUP & MEETING POINT */}
           <section>
              <h3 className="text-3xl font-black text-[#0C3136] mb-8 flex items-center gap-3"><MapPin className="text-[#F8A41E]" /> Pickup & Meeting Points</h3>
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                 <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-8 space-y-4">
                       <p className="text-sm text-slate-500 font-bold mb-6">We offer complimentary pickup from the following central locations. Please arrive 10 minutes early.</p>
                       {PICKUP_POINTS.slice(0, 4).map((point, i) => (
                         <div key={i} className="flex flex-col justify-between p-4 bg-slate-50 rounded-2xl">
                            <h4 className="font-black text-[#0C3136] text-sm">{point.name}</h4>
                            <div className="flex justify-between items-center mt-2">
                               <span className="text-xs text-slate-500 font-medium">{point.sub}</span>
                               <span className="bg-[#0C3136] text-[#F8A41E] px-3 py-1 rounded-md text-[10px] font-black">{point.time}</span>
                            </div>
                         </div>
                       ))}
                    </div>
                    <div className="bg-slate-200 min-h-[300px] h-full relative z-0">
                       <MapContainer center={[43.655, -79.385]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%', zIndex: 0 }}>
                          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                          {PICKUP_POINTS.map((p, i) => (
                            <Marker key={i} position={[p.lat, p.lng]}>
                              <Popup><strong className="block">{p.name}</strong>{p.time}</Popup>
                            </Marker>
                          ))}
                       </MapContainer>
                    </div>
                 </div>
              </div>
           </section>

           {/* 8. PRICING TABLE */}
           <section>
              <h3 className="text-3xl font-black text-[#0C3136] mb-8 flex items-center gap-3"><Ticket className="text-[#F8A41E]" /> Pricing Details</h3>
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                          <th className="p-6">Passenger Type</th>
                          <th className="p-6">Age Group</th>
                          <th className="p-6 text-right">Price (CAD)</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-sm font-bold text-[#0C3136]">
                       <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-6 flex items-center gap-3"><Users className="w-5 h-5 text-slate-400" /> Adult</td>
                          <td className="p-6 text-slate-500">13+ Years</td>
                          <td className="p-6 text-right text-lg">${tour.price}.00</td>
                       </tr>
                       <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-6 flex items-center gap-3"><Users className="w-5 h-5 text-slate-400 scale-75" /> Child</td>
                          <td className="p-6 text-slate-500">2 - 12 Years</td>
                          <td className="p-6 text-right text-lg">${tour.price - 10}.00</td>
                       </tr>
                       <tr className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-6 flex items-center gap-3"><Baby className="w-5 h-5 text-slate-400" /> Infant (Lap Child)</td>
                          <td className="p-6 text-slate-500">Under 2 Years</td>
                          <td className="p-6 text-right text-emerald-600 font-black uppercase tracking-widest text-[10px]">Free</td>
                       </tr>
                    </tbody>
                 </table>
              </div>
           </section>

           {/* 9 & 10. IMPORTANT INFO & CANCELLATION */}
           <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                 <h3 className="text-lg font-black text-[#0C3136] mb-6 flex items-center gap-3"><AlertCircle className="text-[#F8A41E]" /> Important Information</h3>
                 <ul className="space-y-4 text-sm font-medium text-slate-600">
                    <li className="flex gap-3 items-start"><FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" /> <strong>Passport:</strong> Not required for this domestic Canadian tour.</li>
                    <li className="flex gap-3 items-start"><Wind className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" /> <strong>Weather:</strong> Tours operate rain or shine. Ponchos provided for the boat ride.</li>
                    <li className="flex gap-3 items-start"><Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" /> <strong>Confirmation:</strong> Please have your digital ticket ready on your phone.</li>
                 </ul>
              </div>
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-center text-center">
                 <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#125D66]"><Calendar className="w-6 h-6" /></div>
                 <h3 className="text-lg font-black text-[#0C3136] mb-2">Flexible Cancellation</h3>
                 <p className="text-sm font-medium text-slate-500 mb-4">Plans change. We get it. Cancel up to 24 hours in advance of your tour departure time for a full, no-questions-asked refund.</p>
                 <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-md w-fit mx-auto">100% Risk Free Booking</span>
              </div>
           </section>

           {/* 12. REVIEWS */}
           {tourReviews.length > 0 && (
             <section className="bg-[#0C3136] text-white p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <h3 className="text-3xl font-black mb-10 flex items-center gap-3 relative z-10"><Star className="text-[#F8A41E] fill-current" /> Verified Guest Reviews</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                   {tourReviews.slice(0, 4).map((review) => (
                     <div key={review.id} className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 flex flex-col h-full">
                       <div className="flex gap-1 text-[#F8A41E] mb-4">
                         {[...Array(5)].map((_, i) => <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-current' : 'text-white/20'}`} />)}
                       </div>
                       <p className="font-medium text-sm leading-relaxed mb-6 flex-1 italic text-slate-200">"{review.text}"</p>
                       <div className="flex justify-between items-center pt-4 border-t border-white/10">
                         <span className="font-black text-xs">{review.name}</span>
                         <span className="text-[9px] font-black uppercase tracking-widest text-white/50">{review.date}</span>
                       </div>
                     </div>
                   ))}
                </div>
             </section>
           )}
        </div>

        {/* RIGHT COLUMN: BOOKING STICKY SIDEBAR (FINAL CTA) */}
        <div className="xl:col-span-4" id="booking-card">
           <div className="sticky top-28 space-y-10">
              <div className="bg-white rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-slate-100 group">
                 <div className="bg-gradient-to-br from-[#0C3136] to-[#125D66] px-8 py-8 text-white relative rounded-t-[2rem] overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8 blur-xl"></div>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 leading-tight relative z-10">Book Your Experience</h3>
                    <div className="space-y-0.5 relative z-10">
                       <p className="text-[9px] font-black uppercase text-slate-300 tracking-[0.2em]">Starting From</p>
                       <h4 className="text-[36px] font-black text-[#F8A41E] tracking-tighter leading-none flex items-baseline gap-2">
                          CAD ${tour.price} <span className="text-[10px] font-black text-white/90 tracking-normal italic leading-none">/ person</span>
                       </h4>
                    </div>
                    <div className="flex flex-col gap-2 mt-5 relative z-10">
                      <div className="flex items-center gap-2 text-[9px] font-black tracking-widest text-emerald-400">
                         <Zap className="w-3 h-3 fill-current" /> BEST PRICE GUARANTEED
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-white/90 bg-white/10 w-fit px-3 py-1 rounded-lg border border-white/10 animate-pulse">
                        <Users className="w-3 h-3" /> {bookingCount} people already booked this tour!
                      </div>
                    </div>
                 </div>
                 
                 <div className="p-8 space-y-6 bg-white relative rounded-b-[2rem]">
                    <div ref={calendarRef} className="relative">
                       <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2.5 block">1. Select Tour Date</label>
                       <button type="button" onClick={() => setShowCalendar(!showCalendar)} className="w-full flex items-center justify-between border border-slate-200 p-3.5 rounded-xl bg-white hover:border-[#F8A41E] cursor-pointer transition-all shadow-sm relative z-10">
                          <div className="flex items-center gap-3 font-bold text-slate-600 text-sm"><Calendar className="w-4 h-4 text-[#F8A41E]" /> {selectedDate || "Choose Date"}</div>
                          <ChevronRight className={`w-4 h-4 rotate-90 text-slate-300 transition-transform ${showCalendar ? 'rotate-[-90deg]' : ''}`} />
                       </button>
                       {showCalendar && <CalendarDropdown onSelectDate={(d) => { setSelectedDate(d.toLocaleDateString()); setShowCalendar(false); }} />}
                    </div>

                    {/* 13. FINAL CTA BUTTON */}
                    <a href={`/checkout/${tour.id}?date=${selectedDate ? encodeURIComponent(selectedDate) : encodeURIComponent(new Date().toLocaleDateString())}`} className="block w-full text-center bg-[#D91E1E] hover:bg-[#b01818] text-white py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.3em] shadow-lg shadow-red-900/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0">CHECK AVAILABILITY</a>
                    
                    <div className="flex items-center justify-center gap-4 pt-1 border-t border-slate-50">
                       <div className="flex items-center gap-1 text-slate-400 text-[8px] font-black uppercase tracking-widest"><ShieldCheck className="w-3 h-3" /> Secure Payment</div>
                       <div className="flex items-center gap-1 text-slate-400 text-[8px] font-black uppercase tracking-widest"><Clock className="w-3 h-3" /> Instant Confirmation</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </main>
      <WhyTravelersLoveSection />
    </div>
  );
};

const CheckoutPage = ({ tourId, initialDate, onBook }) => {
  const tour = TOURS_DATA.find(t => t.id === tourId);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [pickup, setPickup] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [customPos, setCustomPos] = useState(null);

  const childPrice = tour ? tour.price - 10 : 89;
  const subtotal = tour ? (adults * tour.price) + (children * childPrice) : 0;
  const taxes = subtotal * 0.13;
  const total = subtotal + taxes;

  // Listens for clicks on the map and sets the pin & text box
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setCustomPos(e.latlng);
        setPickup(`Map Pin: ${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}`);
      },
    });

    return customPos === null ? null : (
      <Marker position={customPos}>
        <Popup>Your Pickup Location</Popup>
      </Marker>
    );
  };

  const handleCompleteBooking = async () => {
    if (!fullName || !email || !pickup) {
      alert("Please fill in all required fields (Name, Email, and Pickup Location).");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate network delay for smooth UI
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newBooking = {
      id: `NVT-${Math.floor(1000 + Math.random() * 9000)}`,
      tourId: tour.id,
      tourName: tour.title,
      customerName: fullName,
      email: email,
      phone: phone,
      date: initialDate,
      adults: adults,
      children: children,
      total: total,
      pickup: pickup,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    // Save to Firebase
    await onBook(newBooking);

    // Send Confirmation Email via Resend API
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          fullName: fullName,
          bookingId: newBooking.id,
          tourName: tour.title,
          tourDate: initialDate,
          pickup: pickup,
          total: `CAD $${total.toFixed(2)}`
        }),
      });
      
      const result = await response.json();
      console.log("Email sent via Resend!", result);
    } catch (error) {
      console.error("Failed to trigger email API:", error);
    }
    
    setConfirmedBooking(newBooking);
    setIsSubmitting(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (confirmedBooking) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 animate-in fade-in zoom-in-95 duration-500">
        <div className="max-w-xl w-full bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 text-center">
           <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <CheckCircle2 size={48} />
           </div>
           <h2 className="text-4xl font-black text-[#0C3136] mb-4 tracking-tighter">Booking Confirmed!</h2>
           <p className="text-slate-500 font-medium mb-8 leading-relaxed">
             Thank you for choosing Niagara Travels, <span className="text-[#0C3136] font-black">{confirmedBooking.customerName}</span>. 
             A confirmation email has been sent to <span className="text-[#125D66] font-bold">{confirmedBooking.email}</span> with your e-tickets and pickup details.
           </p>
           <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-left mb-10 space-y-3">
              <div className="flex justify-between text-xs font-black uppercase text-slate-400 tracking-widest">
                 <span>Booking ID</span>
                 <span className="text-[#0C3136]">{confirmedBooking.id}</span>
              </div>
              <div className="flex justify-between text-xs font-black uppercase text-slate-400 tracking-widest">
                 <span>Tour Date</span>
                 <span className="text-[#0C3136]">{confirmedBooking.date}</span>
              </div>
              <div className="flex justify-between text-xs font-black uppercase text-slate-400 tracking-widest">
                 <span>Pickup Point</span>
                 <span className="text-[#0C3136]">{confirmedBooking.pickup}</span>
              </div>
           </div>
           <div className="flex justify-center">
             <a href="/" className="inline-block bg-[#0C3136] text-white px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#125D66] transition-all shadow-lg">
               RETURN HOME
             </a>
           </div>
        </div>
      </div>
    );
  }

  if (!tour) return <div className="p-20 text-center font-black">Session expired. Please restart your booking.</div>;

  return (
    <div className="animate-in fade-in duration-700 bg-slate-50 pb-20">
      <div className="bg-white border-b border-slate-200 py-6 mb-12">
        <div className="container mx-auto px-4 flex items-center justify-between">
           <a href={`/tour/${tourId}`} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#0C3136] hover:text-[#F8A41E] transition-all">
              <ChevronLeft className="w-4 h-4" /> Back to Tour
           </a>
           <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[#0C3136]">Secure Checkout</h2>
           <div className="w-20"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4 mb-10">
                 <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#125D66]">
                    <Calendar className="w-5 h-5" />
                 </div>
                 <h3 className="text-2xl font-black text-[#0C3136]">Visit Date & Tickets</h3>
              </div>

              <div className="space-y-8">
                 <div className="flex items-center justify-between pb-8 border-b border-slate-100">
                    <div>
                       <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1 block">Selected Date</label>
                       <p className="text-lg font-black text-[#0C3136]">{initialDate}</p>
                    </div>
                    <a href={`/tour/${tourId}`} className="text-[10px] font-black uppercase tracking-widest text-[#F8A41E] hover:underline">Change Date</a>
                 </div>

                 <div className="flex items-center justify-between py-2">
                    <div>
                       <h4 className="font-black text-[#0C3136] text-base leading-tight">Adults (Mens/Womens)</h4>
                       <p className="text-xs text-slate-400 font-bold mt-1">CAD ${tour.price}.00 per ticket</p>
                    </div>
                    <div className="flex items-center gap-6 p-2 bg-slate-50 rounded-2xl border border-slate-100">
                       <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-[#0C3136] transition-all"><Minus size={18}/></button>
                       <span className="font-black text-lg text-[#0C3136] w-6 text-center">{adults}</span>
                       <button onClick={() => setAdults(adults + 1)} className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-[#0C3136] transition-all"><Plus size={18}/></button>
                    </div>
                 </div>

                 <div className="flex items-center justify-between py-2">
                    <div>
                       <h4 className="font-black text-[#0C3136] text-base leading-tight">Children</h4>
                       <p className="text-xs text-slate-400 font-bold mt-1">Ages 2-12 • CAD ${childPrice}.00 per ticket</p>
                    </div>
                    <div className="flex items-center gap-6 p-2 bg-slate-50 rounded-2xl border border-slate-100">
                       <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-[#0C3136] transition-all"><Minus size={18}/></button>
                       <span className="font-black text-lg text-[#0C3136] w-6 text-center">{children}</span>
                       <button onClick={() => setChildren(children + 1)} className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-[#0C3136] transition-all"><Plus size={18}/></button>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#125D66]">
                    <MapPin className="w-5 h-5" />
                 </div>
                 <h3 className="text-2xl font-black text-[#0C3136]">Pickup Location</h3>
              </div>
              
              <div className="space-y-4">
                 <p className="text-sm font-bold text-slate-500 mb-2">Tap anywhere on the map to drop a pin for your custom pickup location, or type your address below:</p>
                 
                 {/* Interactive Map Container */}
                 <div className="h-[250px] w-full rounded-2xl overflow-hidden border-2 border-slate-100 relative z-0 cursor-crosshair shadow-inner">
                    <MapContainer center={[43.655, -79.385]} zoom={11} scrollWheelZoom={true} style={{ height: '100%', width: '100%', zIndex: 0 }}>
                       <TileLayer
                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                       />
                       <LocationMarker />
                    </MapContainer>
                 </div>

                 {/* Text Input */}
                 <div className="space-y-2 pt-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Address or Coordinates</label>
                    <input 
                       type="text"
                       placeholder="Enter hotel name, address, or drop a pin..." 
                       value={pickup} 
                       onChange={(e) => setPickup(e.target.value)}
                       className="w-full p-5 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-[#0C3136] text-sm outline-none focus:border-[#F8A41E] transition-all"
                    />
                 </div>
              </div>
           </div>

           <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4 mb-10">
                 <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#125D66]">
                    <Users className="w-5 h-5" />
                 </div>
                 <h3 className="text-2xl font-black text-[#0C3136]">Contact Details</h3>
              </div>
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Full Name</label>
                    <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" placeholder="John Doe" className="w-full p-5 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E] transition-all" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Email Address</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="john@example.com" className="w-full p-5 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E] transition-all" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Phone Number (Optional)</label>
                    <div className="flex gap-2">
                       <div className="w-20 p-5 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-center text-sm text-slate-400">+1</div>
                       <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="(555) 000-0000" className="flex-1 p-5 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E] transition-all" />
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="lg:col-span-4">
           <div className="sticky top-28 space-y-6">
              <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
                 <div className="p-8 lg:p-10">
                    <h3 className="text-xl font-black text-[#0C3136] mb-8">Order Summary</h3>
                    
                    <div className="space-y-6 pb-8 border-b border-slate-100 text-sm font-bold text-slate-600">
                       <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-slate-300" />
                          <span>{initialDate}</span>
                       </div>
                    </div>

                    <div className="py-8 space-y-4">
                       <div className="flex justify-between text-xs font-bold text-slate-500">
                          <span>{adults} Adult Tickets</span>
                          <span className="text-slate-700">CAD ${(adults * tour.price).toFixed(2)}</span>
                       </div>
                       {children > 0 && (
                        <div className="flex justify-between text-xs font-bold text-slate-500">
                           <span>{children} Child Tickets</span>
                           <span className="text-slate-700">CAD ${(children * childPrice).toFixed(2)}</span>
                        </div>
                       )}
                       <div className="flex justify-between text-xs font-bold text-slate-500">
                          <span>Taxes (13%)</span>
                          <span className="text-slate-700">CAD ${taxes.toFixed(2)}</span>
                       </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100 flex justify-between items-baseline mb-8">
                       <span className="text-base font-black text-[#0C3136]">Total Due</span>
                       <span className="text-3xl font-black text-[#0C3136]">CAD ${total.toFixed(2)}</span>
                    </div>

                    <button 
                      disabled={isSubmitting}
                      onClick={handleCompleteBooking}
                      className="w-full bg-[#D91E1E] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:bg-[#b01818] transition-all mb-4 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                       {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> PROCESSING...</> : 'COMPLETE BOOKING'}
                    </button>
                    
                    <div className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       <ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure Checkout
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: "Is hotel pickup included in the tours?", a: "Yes, we offer complimentary pickup from most hotels in downtown Toronto and Niagara Falls. Specific pickup times will be confirmed after booking." },
    { q: "What is your cancellation policy?", a: "We offer free cancellation up to 24 hours before your scheduled tour departure. Within 24 hours, cancellations are non-refundable." },
    { q: "Do you operate tours during the winter?", a: "Absolutely! Niagara Falls is stunning in winter. While the boat cruise is seasonal, we replace it with other attractions like the Butterfly Conservatory or Skylon Tower." },
    { q: "Can we book a private tour for a corporate group?", a: "Yes, we specialize in private and corporate VIP experiences. Use our 'Custom Itinerary' page to build a package or call us directly." }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative h-[450px] flex items-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback src="/images/hero-contact.jpg" size="1920 x 800 px" alt="Contact Us Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C3136]/90 to-[#0C3136]/40"></div>
        </div>
        <div className="container mx-auto px-4 z-10">
          <span className="bg-[#F8A41E] text-[#0C3136] text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-[0.2em] mb-6 inline-block shadow-lg">Get in touch</span>
          <h1 className="text-5xl lg:text-8xl font-black leading-tight tracking-tighter mb-4">We're Here <br />To Help</h1>
          <p className="text-slate-200 text-lg max-w-xl font-medium opacity-90">Have questions about our tours or need assistance with a booking? Reach out to our local team 24/7.</p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 lg:p-12 border border-slate-100">
              <h2 className="text-3xl font-black mb-10 text-[#0C3136]">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Full Name</label>
                    <input type="text" placeholder="Your Name" className="w-full p-4 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Email Address</label>
                    <input type="email" placeholder="email@example.com" className="w-full p-4 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E] transition-all" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Subject</label>
                  <select className="w-full p-4 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E] transition-all appearance-none">
                    <option>General Inquiry</option>
                    <option>Booking Assistance</option>
                    <option>Private Tour Request</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Message</label>
                  <textarea placeholder="How can we help you plan your perfect trip?" className="w-full p-4 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-sm outline-none h-40 focus:border-[#F8A41E] transition-all resize-none" />
                </div>
                <button type="button" onClick={() => alert("Message Sent! We will get back to you shortly.")} className="w-full bg-[#D91E1E] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:bg-[#b01818] transition-all flex items-center justify-center gap-3">
                  SEND MESSAGE <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              <h3 className="text-2xl font-black text-[#0C3136]">Office Locations</h3>
              {[
                { name: 'Head Office', addr: '1315 Pickering Parkway, Suite 300, Pickering, ON L1V 7G5', icon: MapPin },
              ].map((loc, i) => (
                <div key={i} className="flex gap-6 p-8 bg-white rounded-3xl shadow-lg border border-slate-50 group hover:border-[#F8A41E] transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-[#0C3136]/5 flex items-center justify-center text-[#F8A41E] group-hover:bg-[#0C3136] group-hover:text-white transition-all">
                    <loc.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-[#0C3136] mb-1">{loc.name}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{loc.addr}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#0C3136] p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
               <h3 className="text-xl font-black mb-6">Direct Support</h3>
               <div className="space-y-6">
                 <div className="flex gap-4 items-center group cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#F8A41E] transition-all"><Phone className="w-5 h-5" /></div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Call Anytime</p>
                      <p className="font-black text-lg">(416) 444-3000</p>
                    </div>
                 </div>
                 <div className="flex gap-4 items-center group cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#F8A41E] transition-all"><Mail className="w-5 h-5" /></div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Us</p>
                      <p className="font-black text-sm">info@niagaratravels.ca</p>
                    </div>
                 </div>
                 <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-emerald-400 font-black text-[10px] tracking-widest animate-pulse">
                       <ShieldCheck className="w-4 h-4" /> 24/7 CUSTOMER SERVICE ACTIVE
                    </div>
                 </div>
               </div>
            </div>
          </div>
        </div>

        <section className="mt-28">
           <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl font-black text-[#0C3136] mb-4">Common Questions</h2>
              <p className="text-slate-500 font-medium">Quick answers to the questions travelers ask us most often.</p>
           </div>
           <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-3xl border border-slate-100 overflow-hidden transition-all shadow-sm hover:shadow-md">
                   <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-8 text-left outline-none"
                   >
                      <span className="font-black text-[#0C3136]">{faq.q}</span>
                      {openFaq === i ? <Minus className="text-[#F8A41E]" /> : <Plus className="text-slate-300" />}
                   </button>
                   {openFaq === i && (
                     <div className="px-8 pb-8 text-slate-500 font-medium text-sm leading-relaxed animate-in slide-in-from-top-2 duration-300">
                        {faq.a}
                     </div>
                   )}
                </div>
              ))}
           </div>
        </section>
      </main>
    </div>
  );
};

const ReviewsPage = () => {
  return (
    <div className="animate-in fade-in duration-700 bg-[#F8FAFC]">
      <section className="relative h-[450px] flex items-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback src="/images/hero-reviews.jpg" size="1920 x 800 px" alt="Reviews Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C3136]/95 to-[#0C3136]/60"></div>
        </div>
        <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-xl">
            <span className="bg-[#F8A41E] text-[#0C3136] text-[10px] font-black px-4 py-2 rounded-lg uppercase tracking-[0.2em] mb-6 inline-block shadow-lg">Guest Experiences</span>
            <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tighter mb-4">What Our <br />Guests Say</h1>
            <p className="text-slate-200 text-lg font-medium opacity-90">Don't just take our word for it. Read honest reviews from thousands of travelers who chose Niagara Travels.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-[2.5rem] text-center w-full md:w-auto shrink-0 shadow-2xl">
            <div className="text-5xl font-black text-[#F8A41E] mb-2">4.9</div>
            <div className="flex justify-center gap-1 mb-3 text-[#F8A41E]">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
            </div>
            <p className="text-sm font-bold text-white mb-1">Excellent Rating</p>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/60">Based on 1,500+ Reviews</p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REVIEWS_DATA.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-1 text-[#F8A41E]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-slate-200'}`} />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-slate-100 group-hover:text-[#F8A41E]/20 transition-colors" />
              </div>
              
              <h4 className="font-bold text-slate-700 text-sm leading-relaxed mb-8 flex-1 italic">"{review.text}"</h4>
              
              <div className="pt-6 border-t border-slate-50 mt-auto">
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <h5 className="font-black text-[#0C3136] text-sm">{review.name}</h5>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{review.date}</p>
                  </div>
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-[#125D66]">
                    <ThumbsUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="bg-[#0C3136]/5 text-[#125D66] text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg inline-block truncate max-w-full">
                  Tour: {review.tour}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-[#0C3136] rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F8A41E]/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
           
           <div className="relative z-10 max-w-2xl mx-auto">
             <h2 className="text-3xl lg:text-5xl font-black text-white mb-6">Traveled With Us Recently?</h2>
             <p className="text-slate-300 font-medium text-lg mb-10">We would love to hear about your experience! Your feedback helps us continue to provide five-star service to all our guests.</p>
             <a href="/contact" className="inline-block bg-[#D91E1E] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-white hover:text-[#D91E1E] transition-all">
               WRITE A REVIEW
             </a>
           </div>
        </div>
      </main>
    </div>
  );
};

/* --- ADMIN LOGIN COMPONENT --- */
const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('Invalid admin credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 animate-in fade-in duration-500">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-xl border border-slate-100 p-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#0C3136]/5 text-[#F8A41E] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LayoutDashboard className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-[#0C3136]">Admin Access</h2>
          <p className="text-sm text-slate-500 font-medium mt-2">Enter your credentials to manage bookings.</p>
        </div>
        {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold mb-6 text-center">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Admin Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-4 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E] transition-all" required />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-4 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold text-sm outline-none focus:border-[#F8A41E] transition-all" required />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-[#0C3136] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:bg-[#125D66] transition-all flex justify-center items-center">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'SECURE LOGIN'}
          </button>
        </form>
        <div className="mt-8 text-center">
          <a href="/" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#F8A41E] flex items-center justify-center gap-1">
            <ChevronLeft className="w-3 h-3" /> Return to Website
          </a>
        </div>
      </div>
    </div>
  );
};


/* --- ADMIN DASHBOARD COMPONENTS --- */

const AdminDashboard = ({ bookings, updateBookingStatus, deleteBooking, handleLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Calculate Stats
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.status !== 'Cancelled' ? b.total : 0), 0);
  const pendingBookings = bookings.filter(b => b.status === 'Pending').length;

  const filteredBookings = bookings.filter(b => 
    b.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row animate-in fade-in duration-500">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0C3136] text-white flex flex-col shadow-2xl z-20 shrink-0">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="bg-[#F8A41E] p-2 rounded-lg"><LayoutDashboard className="w-5 h-5 text-[#0C3136]" /></div>
          <div>
             <h2 className="font-black text-sm tracking-widest uppercase text-[#F8A41E]">Admin Panel</h2>
             <p className="text-[10px] text-slate-400">Niagara Travels</p>
          </div>
        </div>
        
        <nav className="p-4 flex-1">
          <ul className="space-y-2">
            <li>
              <a href="/admin" className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-xl text-sm font-bold text-white transition-all">
                <Ticket className="w-4 h-4" /> Bookings Management
              </a>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-white/10 space-y-2">
           <a href="/" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all">
             <Globe className="w-4 h-4" /> View Live Site
           </a>
           <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 rounded-xl text-sm font-bold text-red-400 hover:text-red-300 transition-all text-left">
             <LogOut className="w-4 h-4" /> Secure Logout
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="bg-white px-8 py-5 flex items-center justify-between border-b border-slate-200 shadow-sm shrink-0">
          <h1 className="text-xl font-black text-[#0C3136]">Dashboard Overview</h1>
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-[#125D66] font-black">
                A
             </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 flex-1 overflow-y-auto">
           {/* Stats Row */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
                 <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <DollarSign className="w-7 h-7" />
                 </div>
                 <div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Total Revenue</p>
                    <h3 className="text-3xl font-black text-[#0C3136]">CAD ${totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</h3>
                 </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
                 <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Ticket className="w-7 h-7" />
                 </div>
                 <div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Total Bookings</p>
                    <h3 className="text-3xl font-black text-[#0C3136]">{bookings.length}</h3>
                 </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-5">
                 <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Clock className="w-7 h-7" />
                 </div>
                 <div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Pending Action</p>
                    <h3 className="text-3xl font-black text-[#0C3136]">{pendingBookings}</h3>
                 </div>
              </div>
           </div>

           {/* Bookings Table Section */}
           <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
              <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                 <h2 className="text-lg font-black text-[#0C3136]">Recent Bookings</h2>
                 <div className="relative">
                    <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search by ID or Name..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold w-full md:w-64 focus:outline-none focus:border-[#F8A41E] transition-colors"
                    />
                 </div>
              </div>
              
              <div className="overflow-x-auto flex-1">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-200">
                          <th className="p-5">Booking ID</th>
                          <th className="p-5">Customer</th>
                          <th className="p-5">Tour Details</th>
                          <th className="p-5">Date</th>
                          <th className="p-5">Total</th>
                          <th className="p-5">Status</th>
                          <th className="p-5 text-right">Actions</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                       {filteredBookings.length === 0 ? (
                         <tr>
                            <td colSpan="7" className="p-10 text-center text-slate-400 font-bold">No bookings found.</td>
                         </tr>
                       ) : (
                         filteredBookings.map(b => (
                           <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-5 font-black text-[#0C3136]">{b.id}</td>
                              <td className="p-5">
                                 <div className="font-bold text-[#0C3136]">{b.customerName}</div>
                                 <div className="text-xs text-slate-400 mt-0.5">{b.email}</div>
                              </td>
                              <td className="p-5">
                                 <div className="font-bold">{b.tourName}</div>
                                 <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-1"><Users className="w-3 h-3"/> {b.adults}A, {b.children}C</div>
                              </td>
                              <td className="p-5 font-bold">{b.date}</td>
                              <td className="p-5 font-black text-[#0C3136]">CAD ${b.total.toFixed(2)}</td>
                              <td className="p-5">
                                 <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center w-max gap-1
                                   ${b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' : 
                                     b.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                                     'bg-red-100 text-red-700'}`
                                 }>
                                    {b.status === 'Confirmed' && <CheckCircle size={12} />}
                                    {b.status === 'Pending' && <Clock size={12} />}
                                    {b.status === 'Cancelled' && <XCircle size={12} />}
                                    {b.status}
                                 </span>
                              </td>
                              <td className="p-5 text-right">
                                 <div className="flex items-center justify-end gap-2">
                                    {b.status !== 'Confirmed' && b.status !== 'Cancelled' && (
                                       <button onClick={() => updateBookingStatus(b.id, 'Confirmed')} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Confirm Booking">
                                          <CheckCircle size={18} />
                                       </button>
                                    )}
                                    {b.status !== 'Cancelled' && (
                                       <button onClick={() => updateBookingStatus(b.id, 'Cancelled')} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Cancel Booking">
                                          <XCircle size={18} />
                                       </button>
                                    )}
                                    <button onClick={() => { if(window.confirm('Delete this booking forever?')) deleteBooking(b.id) }} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete Record">
                                       <Trash2 size={18} />
                                    </button>
                                 </div>
                              </td>
                           </tr>
                         ))
                       )}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}

/* --- MAIN APP CONTAINER --- */

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [currentSearch, setCurrentSearch] = useState(window.location.search);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Firebase State
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);

  // Initialize Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // If not logged in at all, sign in anonymously for normal bookings
        signInAnonymously(auth).catch((error) => console.error("Auth error:", error));
      }
    });
    return () => unsubscribe();
  }, []);

  // Global Navigation Helper
  const navigate = (url) => {
    window.history.pushState({}, '', url);
    const urlObj = new URL(url, window.location.origin);
    setCurrentPath(urlObj.pathname);
    setCurrentSearch(urlObj.search);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  // Sync Bookings with Firestore
  useEffect(() => {
    if (!user) return;
    
    const bookingsRef = collection(db, 'bookings');
    const unsubscribe = onSnapshot(bookingsRef, 
      (snapshot) => {
        const loadedBookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        loadedBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBookings(loadedBookings);
      },
      (error) => console.error("Firestore error:", error)
    );
    
    return () => unsubscribe();
  }, [user]);

  // Firebase Mutators
  const handleAddBooking = async (newBooking) => {
    if (!user) return;
    try {
      await setDoc(doc(db, 'bookings', newBooking.id), newBooking);
    } catch (e) {
      console.error(e);
    }
  };

  const updateBookingStatus = async (id, newStatus) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, 'bookings', id), { status: newStatus });
    } catch (e) {
      console.error(e);
    }
  };

  const deleteBooking = async (id) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'bookings', id));
    } catch (e) {
      console.error(e);
    }
  };
  
  useEffect(() => { 
    const handleScroll = () => setIsScrolled(window.scrollY > 20); 
    window.addEventListener('scroll', handleScroll); 
    return () => window.removeEventListener('scroll', handleScroll); 
  }, []);
  
  // Listen to browser Back/Forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      setCurrentSearch(window.location.search);
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Global Interceptor for <a> tags to enable SPA Clean URLs
  useEffect(() => {
    const handleLinkClick = (e) => {
      const link = e.target.closest('a');
      if (link) {
        const href = link.getAttribute('href');
        // Only intercept internal routing links
        if (href && href.startsWith('/') && !href.startsWith('//')) {
          e.preventDefault();
          navigate(href);
          setMobileMenuOpen(false);
        }
      }
    };
    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, []);

  useEffect(() => {
    const path = currentPath;
    let pageTitle = 'Niagara Travels | Premium Niagara Falls Experiences';
    let pageDescription = 'Discover the magic of Niagara Falls with our guided tours, from classic day escapes to private VIP experiences.';

    if (path.startsWith('/tour/')) {
      const tourId = path.split('/')[2];
      const tour = TOURS_DATA.find(t => t.id === tourId);
      if (tour) {
        pageTitle = `${tour.title} | Niagara Travels`;
        pageDescription = tour.overview;
      }
    } else if (path === '/tours') {
      pageTitle = 'All Tour Packages | Niagara Travels';
    } else if (path === '/custom-itinerary') {
      pageTitle = 'Build a Custom Itinerary | Niagara Travels';
    } else if (path === '/reviews') {
      pageTitle = 'Guest Reviews | Niagara Travels';
    } else if (path === '/contact') {
      pageTitle = 'Contact Us | Niagara Travels';
    } else if (path.startsWith('/checkout/')) {
      pageTitle = 'Secure Checkout | Niagara Travels';
    } else if (path === '/admin') {
      pageTitle = 'Admin Dashboard | Niagara Travels';
    }

    document.title = pageTitle;
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = pageDescription;
  }, [currentPath]);
  
  // Render routing
  const cleanPath = currentPath;

  // Admin Route Protection
  if (cleanPath === '/admin') {
    if (user && !user.isAnonymous) {
      // User is logged in securely via email
      return <AdminDashboard bookings={bookings} updateBookingStatus={updateBookingStatus} deleteBooking={deleteBooking} handleLogout={handleLogout} />;
    } else {
      // Show login screen
      return <AdminLogin />;
    }
  }

  const renderPage = () => { 
    const urlParams = new URLSearchParams(currentSearch);

    if (cleanPath === '/' || cleanPath === '') return <HomePage />; 
    if (cleanPath === '/contact') return <ContactPage />; 
    if (cleanPath === '/custom-itinerary') return <CustomItineraryPage />;
    if (cleanPath === '/tours') return <ToursPage />;
    if (cleanPath === '/reviews') return <ReviewsPage />;
    if (cleanPath.startsWith('/checkout/')) {
       const tourId = cleanPath.split('/')[2];
       const date = urlParams.get('date') || new Date().toLocaleDateString();
       return <CheckoutPage tourId={tourId} initialDate={date} onBook={handleAddBooking} />;
    }
    if (cleanPath.startsWith('/tour/')) {
       const tourId = cleanPath.split('/')[2];
       return <TourDetailPage tourId={tourId} />;
    }
    return <HomePage />; 
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800">
      {/* Top Bar */}
      <div className="hidden lg:flex bg-[#0C3136] text-white px-8 py-2.5 justify-between items-center text-[10px] font-black tracking-[0.1em] uppercase">
        <div className="flex gap-10 items-center"><div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#F8A41E]" /> Pickering, Ontario</div><div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-[#F8A41E]" /> (416) 444-3000</div></div>
        <div className="flex items-center gap-4"><span className="text-[10px] font-bold text-[#F8A41E] animate-pulse">(Open 24/7)</span><a href="/tours" className="bg-[#D91E1E] text-white px-5 py-1.5 rounded-md font-black hover:bg-white hover:text-[#D91E1E] transition-all">BOOK NOW</a></div>
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-[1000000] transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-1' : 'bg-white py-2'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center relative">
          <a href="/" className="flex items-center gap-3 cursor-pointer">
            <div className="w-52 h-16 overflow-hidden flex items-center justify-center">
              <ImageWithFallback src="/images/logo.png" size="300 x 100 px" isLogo alt="Niagara Travels" className="max-h-full max-w-full object-contain" />
            </div>
          </a>
          
          <nav className="hidden lg:flex items-center gap-10">
            <NavItem label="Home" href="/" active={currentPath === '/' || currentPath === ''} />
            <NavItem label="Tours" href="/tours" active={currentPath.includes('/tours') || currentPath.includes('/tour/')} />
            <NavItem label="Custom Itinerary" href="/custom-itinerary" active={currentPath === '/custom-itinerary'} />
            <NavItem label="Reviews" href="/reviews" active={currentPath === '/reviews'} />
            <NavItem label="Contact" href="/contact" active={currentPath === '/contact'} />
          </nav>
          
          <button className="lg:hidden text-[#0C3136] p-2" aria-label="Toggle Menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-2xl p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300 z-[100]">
               {[
                 { label: 'Home', path: '/' },
                 { label: 'Tours', path: '/tours' },
                 { label: 'Custom Itinerary', path: '/custom-itinerary' },
                 { label: 'Reviews', path: '/reviews' },
                 { label: 'Contact', path: '/contact' }
               ].map(item => (
                 <a 
                   key={item.path} 
                   href={item.path} 
                   className={`font-black block text-sm uppercase tracking-widest py-3 border-b border-slate-50 transition-colors ${currentPath === item.path ? 'text-[#F8A41E]' : 'text-[#0C3136]'}`}
                 >
                   {item.label}
                 </a>
               ))}
               <a href="/tours" className="block text-center bg-[#D91E1E] text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg">BOOK NOW</a>
            </div>
          )}
        </div>
      </header>

      <main className="min-h-screen">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-[#0C3136] text-white pt-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          
          {/* NEW Horizontal Newsletter Section */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-[2rem] p-8 lg:p-12 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 relative z-20">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-black text-white mb-2">Join Our Newsletter</h3>
              <p className="text-slate-300 font-medium text-sm">Subscribe for exclusive offers, travel tips, and the latest updates.</p>
            </div>
            <div className="flex items-stretch w-full lg:w-auto min-w-0 sm:min-w-[400px] overflow-hidden rounded-xl shadow-2xl">
              <input type="email" placeholder="Enter your email address..." aria-label="Email address" className="bg-white px-6 py-4 text-sm flex-1 text-slate-800 focus:outline-none" />
              <button className="bg-[#D91E1E] text-white px-8 font-black text-xs uppercase tracking-widest hover:bg-white hover:text-[#D91E1E] transition-all">Subscribe</button>
            </div>
          </div>

          {/* 4-column Grid for the rest of the footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative z-10">
            
            {/* Col 1: Logo & Socials */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <ImageWithFallback src="/images/logo.png" size="300 x 100 px" isLogo alt="Logo" className="w-56 h-20 object-contain" />
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-8 font-medium">Your trusted local tour operator in Niagara Falls, Canada. Creating unforgettable experiences since 2010.</p>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"><FacebookIcon className="w-4 h-4 text-white" /></div>
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"><InstagramIcon className="w-4 h-4 text-white" /></div>
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"><Globe className="w-4 h-4 text-white" /></div>
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"><MessageSquare className="w-4 h-4 text-white" /></div>
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"><YoutubeIcon className="w-4 h-4 text-white" /></div>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-white mb-6 border-b border-white/10 pb-2">Quick Links</h4>
              <ul className="space-y-3 text-xs font-bold text-slate-400 uppercase tracking-widest flex flex-col">
                <a href="/" className="hover:text-[#F8A41E] transition-colors">Home</a>
                <a href="/tours" className="hover:text-[#F8A41E] transition-colors">Tours</a>
                <a href="/custom-itinerary" className="hover:text-[#F8A41E] transition-colors">Custom Itinerary</a>
                <a href="/reviews" className="hover:text-[#F8A41E] transition-colors">Reviews</a>
                <a href="/contact" className="hover:text-[#F8A41E] transition-colors">Contact Us</a>
              </ul>
            </div>

            {/* Col 3: Top Tours */}
            <div>
              <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-white mb-6 border-b border-white/10 pb-2">Top Tours</h4>
              <ul className="space-y-3 text-xs font-bold text-slate-400 uppercase tracking-widest flex flex-col">
                <a href="/tour/classic-day-escape" className="hover:text-[#F8A41E]">Niagara Day Tour</a>
                <a href="/tour/wine-country" className="hover:text-[#F8A41E]">Falls & Winery Escape</a>
                <a href="/tour/ultimate-adventure" className="hover:text-[#F8A41E]">Family Adventure Package</a>
              </ul>
            </div>

            {/* Col 4: Contact Us */}
            <div>
              <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-white mb-6 border-b border-white/10 pb-2">Contact Us</h4>
              <ul className="space-y-4 text-xs font-medium text-slate-400 mb-10">
                <li className="flex items-start gap-3"><MapPin className="w-4 h-4 text-[#F8A41E] shrink-0" /><span>1315 Pickering Parkway,<br />Suite 300, Pickering, ON L1V 7G5</span></li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#F8A41E] shrink-0" /><span>(416) 444-3000</span></li>
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#F8A41E] shrink-0" /><span>info@niagaratravels.ca</span></li>
              </ul>
            </div>

          </div>

          {/* Footer Bottom Bar */}
          <div className="pt-8 pb-10 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-6 relative z-10">
            {/* Clickable Links moved to the FAR LEFT side safely away from the chat widget */}
            <div className="flex items-center gap-4 md:gap-6 text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase order-2 lg:order-1">
              <a href="/privacy" className="hover:text-[#F8A41E] transition-colors relative z-20">Privacy Policy</a><span className="opacity-20">|</span>
              <a href="/terms" className="hover:text-[#F8A41E] transition-colors relative z-20">Terms & Conditions</a><span className="opacity-20">|</span>
              <a href="/admin" className="hover:text-[#F8A41E] flex items-center gap-1 transition-colors relative z-20"><LayoutDashboard className="w-3 h-3" /> Admin Login</a>
            </div>
            
            {/* Logo in the middle */}
            <div className="flex items-center justify-center order-1 lg:order-2"><MapleLeafIcon className="w-6 h-6 text-red-600" /></div>
            
            {/* Plain text copyright moved to the RIGHT side (Under the chat widget) */}
            <div className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase order-3 lg:pr-[80px] xl:pr-0">
              © 2026 Niagara Travels. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
      
      {/* --- DYNAMIC CHAT WIDGET --- */}
      <ChatWidget />

    </div>
  );
}