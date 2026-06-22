import { 
  Users, Navigation, Camera, Clock, Zap, Bus, MapPin, Wind, Grape, Globe, 
  ShieldCheck, Map as MapIcon, Utensils, Plane 
} from 'lucide-react';

export const TOURS_DATA = [
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

export const REVIEWS_DATA = [
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

export const PICKUP_POINTS = [
  { name: "Royal Ontario Museum", sub: "(Queen's Park Entrance), 100 Queens Park", area: "Downtown Toronto", time: "7:55 AM", lat: 43.6677, lng: -79.3948 },
  { name: "Holiday Inn Downtown Centre", sub: "30 Carlton St", area: "Downtown Toronto", time: "8:00 AM", lat: 43.6624, lng: -79.3831 },
  { name: "Chelsea Hotel", sub: "33 Gerrard St W", area: "Downtown Toronto", time: "8:15 AM", lat: 43.6580, lng: -79.3828 },
  { name: "Sheraton Centre", sub: "123 Queen St W", area: "Downtown Toronto", time: "8:15 AM", lat: 43.6515, lng: -79.3836 },
  { name: "Maple Leaf Square", sub: "@ the South Entrance of Union Station", area: "Downtown Toronto", time: "8:30 AM", lat: 43.6431, lng: -79.3802 }
];

// Combine the exports at the bottom explicitly if desired, but adding 'export' before 'const' as done above handles this securely in modern JS/Next.js!
export { TOURS_DATA, REVIEWS_DATA, PICKUP_POINTS };