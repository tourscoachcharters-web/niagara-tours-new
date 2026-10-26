export const TOURS_DATA = [
  {
    id: 'classic-day-escape',
    title: 'Niagara Classic Day Escape',
    tagline: 'Niagara Travels Signature Tour with Hornblower Boat Cruise',
    price: 129,
    childPrice: 109,
    infantPrice: 0,
    currency: 'CAD',
    currencySymbol: 'CA$',
    duration: '9.5 Hours',
    img: '/images/tour-classic.jpg',
    tag: 'SIGNATURE TOUR',
    category: 'day',
    overview: 'A seamless full-day guided excursion connecting downtown Toronto to the heart of the Niagara region. Experience panoramic vistas of the Canadian Horseshoe Falls, historic Niagara Parkway scenic stops, and leisure exploration time in Niagara-on-the-Lake.',
    inclusions: [
      'Round-trip luxury motorcoach/minibus transport from Toronto',
      'Licensed Niagara Parks tour director',
      'Skip-the-line seasonal Niagara City Cruises Hornblower boat ticket (May–Nov)',
      'Scenic stops at Floral Clock, Whirlpool Rapids, and Maple Leaf Place',
      '3 hours of independent free time at the Falls'
    ],
    exclusions: [
      'Meals and personal beverages',
      'Optional admissions (Journey Behind the Falls, Skylon Tower)',
      'Driver and tour director gratuities'
    ],
    itinerary: [
      "08:00 AM – Downtown Toronto departures from primary transit hubs",
      "10:00 AM – Scenic drive along Niagara Parkway with stops at Whirlpool Rapids & Floral Clock",
      "11:15 AM – Arrival at Niagara Falls Table Rock Welcome Centre & Hornblower Boat Cruise",
      "12:30 PM – 3 hours free time for lunch, Clifton Hill, and sightseeing",
      "03:30 PM – Visit historic Niagara-on-the-Lake",
      "04:30 PM – Departure back to Toronto (arrival approx. 5:45 PM)"
    ],
    highlights: [
      { t: 'Hornblower Boat Cruise', d: 'Sail into the spray of the Horseshoe Falls on the iconic Hornblower Boat Cruise.', i: 'Wind' },
      { t: 'Historic Niagara-on-the-Lake', d: 'Historic walk through 19th-century Niagara-on-the-Lake with boutiques and architecture.', i: 'MapPin' },
      { t: 'Gorge & Floral Clock', d: 'Stunning photo stops along the Niagara River Gorge and the iconic 40-foot Floral Clock.', i: 'Camera' }
    ],
    idealFor: 'First-time visitors, families, international travelers seeking the classic Canadian falls experience.',
    facts: [
      { l: 'Duration', v: '9.5 Hours', i: 'Clock' },
      { l: 'Boat Ride', v: 'Hornblower Incl.', i: 'Ship' },
      { l: 'Pace', v: 'Guided & Free Time', i: 'Zap' },
      { l: 'Transport', v: 'Luxury Coach', i: 'Bus' },
      { l: 'Departures', v: 'Daily from Toronto', i: 'MapPin' }
    ],
    meetingPointsText: 'Royal Ontario Museum (100 Queens Park), Chelsea Hotel (33 Gerrard St W), Sheraton Centre Toronto (123 Queen St W), Union Station / 65 Bremner Blvd.',
    pricingTiers: [
      { label: 'Adult Ticket', age: 'Ages 12+', price: 129 },
      { label: 'Child Ticket', age: 'Ages 3–11', price: 109 },
      { label: 'Infant (Lap)', age: 'Ages 0–2', price: 0 }
    ],
    rating: 4.9,
    reviewCount: '1,240+'
  },
  {
    id: 'freedom-day-tour',
    title: 'Niagara Falls Freedom Day Tour',
    tagline: 'Self-Paced Express Round-Trip Transit from Toronto',
    price: 89,
    childPrice: 79,
    infantPrice: 0,
    currency: 'CAD',
    currencySymbol: 'CA$',
    duration: '9 Hours',
    img: '/images/tour-freedom.jpg',
    tag: 'SELF-PACED / NO BOAT',
    category: 'day',
    overview: 'Designed for travelers seeking organized, stress-free transportation from Toronto with total freedom to build their own day. Ideal for repeat visitors, shoppers, or those who prefer to pick and choose attractions on-site.',
    inclusions: [
      'Round-trip transit in an air-conditioned luxury coach',
      'Live commentary on regional history during the drive',
      'Scenic stops at Queenston Heights and Whirlpool Rapids',
      '4+ hours of unguided free time in Niagara Falls'
    ],
    exclusions: [
      'Attraction tickets (Hornblower Boat, Journey Behind the Falls, Skylon)',
      'Lunch and refreshments',
      'Tour guide during free time'
    ],
    itinerary: [
      "08:15 AM – Toronto departures (Downtown Hasty Market & YYZ Renforth)",
      "10:15 AM – Niagara River photo stops (Whirlpool Rapids & Floral Clock)",
      "11:00 AM – Drop-off at Table Rock / Fallsview district; self-paced exploration",
      "03:30 PM – Board bus for departure at designated Table Rock pickup area",
      "05:15 PM – Return arrival in Toronto"
    ],
    highlights: [
      { t: 'Total Day Freedom', d: 'Total flexibility to visit casinos, Clifton Hill attractions, or the Butterfly Conservatory.', i: 'Zap' },
      { t: 'Budget-Friendly Transit', d: 'Budget-friendly direct round-trip highway coach transport without car rental or parking hassles.', i: 'Bus' },
      { t: 'Scenic Parkway Stops', d: 'Scenic Niagara River Parkway overview with photo stops at Whirlpool Rapids and Floral Clock.', i: 'Camera' }
    ],
    idealFor: 'Independent explorers, budget travelers, casino visitors, and repeat Niagara guests.',
    facts: [
      { l: 'Duration', v: '9 Hours', i: 'Clock' },
      { l: 'Free Time', v: '4+ Hours', i: 'Clock' },
      { l: 'Pace', v: '100% Self-Paced', i: 'Zap' },
      { l: 'Transport', v: 'Luxury Coach', i: 'Bus' },
      { l: 'Pickup', v: 'Toronto & YYZ', i: 'MapPin' }
    ],
    meetingPointsText: 'Toronto Downtown (Hasty Market, 129 Bremner Blvd) and YYZ Airport / Renforth Drive.',
    pickupPoints: [
      { name: "Downtown Toronto (Hasty Market)", sub: "129 Bremner Blvd (Maple Leaf Square)", area: "Downtown Toronto", time: "8:15 AM", lat: 43.6429, lng: -79.3820 },
      { name: "YYZ Airport / Renforth Hub", sub: "Renforth Drive & Eglinton Ave W", area: "Airport / Mississauga", time: "8:45 AM", lat: 43.6664, lng: -79.5894 }
    ],
    pricingTiers: [
      { label: 'Adult Ticket', age: 'Ages 12+', price: 89 },
      { label: 'Child Ticket', age: 'Ages 3–11', price: 79 }
    ],
    rating: 4.8,
    reviewCount: '890'
  },
  {
    id: 'evening-illumination',
    title: 'Niagara Evening Illumination & Fireworks Tour',
    tagline: 'Sunset Cruise, Cascading Illumination & Nightly Summer Fireworks',
    price: 135,
    childPrice: 115,
    infantPrice: 0,
    currency: 'CAD',
    currencySymbol: 'CA$',
    duration: '10.5 Hours',
    img: '/images/tour-evening.jpg',
    tag: 'EVENING ILLUMINATION',
    category: 'evening',
    overview: 'A later departure allowing travelers to witness both daytime panoramas and the transformation of the falls after dusk into illuminated jewel tones, capped by the nightly summer fireworks display.',
    inclusions: [
      'Round-trip transport departing at 1:00 PM',
      'Hornblower Boat Cruise admission ticket',
      'Niagara Parkway scenic drive through Niagara-on-the-Lake',
      'Niagara Falls evening light illumination viewing',
      'Seasonal fireworks spectacle viewing over the gorge'
    ],
    exclusions: [
      'Dinner (ample free time provided on Clifton Hill and Fallsview)',
      'Optional Table Rock attractions',
      'Gratuities'
    ],
    itinerary: [
      "01:00 PM – Pickup across downtown Toronto & Mississauga",
      "03:00 PM – Scenic drive through Niagara-on-the-Lake & river lookouts",
      "04:30 PM – Arrival at the Falls & VIP entry to Niagara City Boat Cruise",
      "06:00 PM – Free time for Clifton Hill dining, shops, and boardwalk strolling",
      "09:30 PM – Niagara Falls Illumination & 10:00 PM Fireworks show",
      "10:30 PM – Departure; drop-offs between 11:30 PM and midnight"
    ],
    highlights: [
      { t: 'Sunset Boat Cruise', d: 'Sunset cruise right up to the roaring Horseshoe basin in beautiful late afternoon light.', i: 'Wind' },
      { t: 'Vibrant Multi-Color Lights', d: 'Vibrant multi-colored illumination of American and Canadian falls against the night sky.', i: 'Zap' },
      { t: 'Gorge Fireworks Show', d: 'Nighttime fireworks over the gorge (seasonal / weather permitting).', i: 'Star' }
    ],
    idealFor: 'Couples, photographers, night owls, and travelers wanting to avoid early morning departures.',
    facts: [
      { l: 'Duration', v: '10.5 Hours', i: 'Clock' },
      { l: 'Departure', v: '1:00 PM Afternoon', i: 'Clock' },
      { l: 'Fireworks', v: 'Seasonal 10 PM', i: 'Star' },
      { l: 'Boat Ride', v: 'Hornblower Incl.', i: 'Ship' },
      { l: 'Pickup', v: 'Toronto & Mississauga', i: 'MapPin' }
    ],
    meetingPointsText: 'Fairmont Royal York, Chelsea Hotel Toronto, Mississauga Erin Mills Tim Hortons.',
    pickupPoints: [
      { name: "Fairmont Royal York", sub: "100 Front St W, Toronto", area: "Downtown Toronto", time: "1:00 PM", lat: 43.6457, lng: -79.3813 },
      { name: "Chelsea Hotel Toronto", sub: "33 Gerrard St W, Toronto", area: "Downtown Toronto", time: "1:15 PM", lat: 43.6580, lng: -79.3828 },
      { name: "Mississauga Erin Mills Hub", sub: "Erin Mills Town Centre / Tim Hortons", area: "Mississauga", time: "1:45 PM", lat: 43.5615, lng: -79.7120 }
    ],
    pricingTiers: [
      { label: 'Adult Ticket', age: 'Ages 13+', price: 135 },
      { label: 'Child Ticket', age: 'Ages 3–12', price: 115 }
    ],
    rating: 4.9,
    reviewCount: '2,100+'
  },
  {
    id: 'deluxe-fallsview-dinner',
    title: 'Deluxe Evening Fallsview Dinner & Illumination Tour',
    tagline: 'Panoramic Fallsview Dining, Hornblower Cruise & Night Illumination',
    price: 219,
    childPrice: 189,
    infantPrice: 0,
    currency: 'CAD',
    currencySymbol: 'CA$',
    duration: '9.5 Hours',
    img: '/images/tour-dinner.jpg',
    tag: 'DINNER & ILLUMINATION',
    category: 'evening',
    overview: 'A luxury dinner-inclusive night package that elevates your evening with a multi-course dinner overlooking the brink of the Falls, followed by illuminated views and Illumination Tower access.',
    inclusions: [
      'Round-trip transit in executive motorcoach',
      'Licensed expert tour guide',
      'Skip-the-line Hornblower Cruise tickets',
      'Reserved multi-course Fallsview buffet/plated dinner at Sheraton Fallsview or Table Rock',
      'Exclusive view of the light show and fireworks'
    ],
    exclusions: [
      'Alcoholic beverages at dinner (available for purchase on-site)',
      'Personal souvenirs',
      'Gratuities'
    ],
    itinerary: [
      "01:00 PM – Toronto departures from primary meeting hubs",
      "03:15 PM – Niagara Parkway photo stops & Floral Clock",
      "04:15 PM – Hornblower Boat Cruise experience",
      "06:30 PM – Reserved panoramic Fallsview dinner",
      "08:30 PM – Stroll to Table Rock for night light illumination",
      "10:00 PM – Fireworks viewing; 10:30 PM return trip to Toronto"
    ],
    highlights: [
      { t: 'Panoramic Fallsview Dinner', d: 'Panoramic dinner directly overlooking the thundering Canadian Horseshoe Falls.', i: 'Utensils' },
      { t: 'Up-Close Misty Cruise', d: 'Feel the exhilarating spray of the Horseshoe basin on the Hornblower cruise.', i: 'Wind' },
      { t: 'Queen Victoria Gardens', d: 'Evening leisure walk through Queen Victoria Park gardens and illuminated brink.', i: 'Camera' }
    ],
    idealFor: 'Couples, anniversary celebrations, food lovers, and luxury travelers seeking an all-inclusive evening.',
    facts: [
      { l: 'Duration', v: '9.5 Hours', i: 'Clock' },
      { l: 'Dinner', v: 'Multi-Course Incl.', i: 'Utensils' },
      { l: 'Boat Ride', v: 'Hornblower Incl.', i: 'Ship' },
      { l: 'Atmosphere', v: 'Romantic / Deluxe', i: 'Star' },
      { l: 'Pickup', v: 'Toronto Downtown & YYZ', i: 'MapPin' }
    ],
    meetingPointsText: '65 Bremner Blvd (Maple Leaf Square), Downtown Chelsea Hotel, Pearson Airport Hotels.',
    pricingTiers: [
      { label: 'Adult Ticket', age: 'Ages 13+', price: 219 },
      { label: 'Child Ticket', age: 'Ages 3–12', price: 189 }
    ],
    rating: 4.9,
    reviewCount: '1,450'
  },
  {
    id: 'ultimate-adventure',
    title: 'Ultimate Niagara Adventure',
    tagline: 'All-Attractions Pass: Boat Cruise, Journey Behind the Falls & Skylon Tower',
    price: 209,
    childPrice: 174,
    infantPrice: 0,
    currency: 'CAD',
    currencySymbol: 'CA$',
    duration: '9 Hours',
    img: '/images/tour-adventure.jpg',
    tag: 'ALL-ATTRACTIONS PASS',
    category: 'day',
    overview: 'The most action-packed day package available, combining both top-tier water-level and bedrock perspectives of the waterfalls.',
    inclusions: [
      'Transport from Toronto in executive motorcoach',
      'Comprehensive guide commentary throughout the day',
      'Skip-the-line ticket to Niagara City Cruises (Hornblower)',
      'Ticket to Journey Behind the Falls (walking bedrock tunnels behind the sheet of water)',
      'Admission to Skylon Tower Observation Deck (775 ft elevation)',
      'Stops at Whirlpool Rapids and historic Niagara-on-the-Lake'
    ],
    exclusions: [
      'Lunch and snacks (ample free time provided)',
      'Souvenirs and personal expenses',
      'Gratuities'
    ],
    itinerary: [
      "08:00 AM – Toronto hotel pickups and central hubs",
      "10:00 AM – Whirlpool Rapids & Gorge view photo stop",
      "11:00 AM – Niagara City Cruises Hornblower boat ride",
      "12:30 PM – Journey Behind the Falls tunnel walk",
      "02:00 PM – Skylon Tower elevator ascent & observation viewing",
      "03:30 PM – Niagara-on-the-Lake historic town stop",
      "04:45 PM – Return journey to Toronto (approx. 6:00 PM)"
    ],
    highlights: [
      { t: 'Journey Behind the Falls', d: 'Stand on the lower observation portal directly below the cascading water behind the roaring sheet of water.', i: 'MapIcon' },
      { t: 'Skylon Tower 360 Views', d: '360-degree aerial views from 775 feet above the gorge at the Skylon Tower summit.', i: 'Navigation' },
      { t: 'Top 3 Attractions Included', d: 'Complete coverage of Niagara’s top 3 ticketed attractions in one day without waiting in general lines.', i: 'ShieldCheck' }
    ],
    idealFor: 'Adventure seekers, families wanting all attractions pre-booked, and travelers on a tight schedule.',
    facts: [
      { l: 'Duration', v: '9 Hours', i: 'Clock' },
      { l: 'Attractions', v: '3 Major Passes Incl.', i: 'ShieldCheck' },
      { l: 'Observation', v: 'Skylon Tower 775ft', i: 'Navigation' },
      { l: 'Boat Ride', v: 'Hornblower Incl.', i: 'Ship' },
      { l: 'Pickup', v: 'Toronto Downtown Hubs', i: 'MapPin' }
    ],
    meetingPointsText: 'InterContinental Toronto Centre, Chelsea Hotel, Toronto Union Station.',
    pricingTiers: [
      { label: 'Adult Ticket', age: 'Ages 13+', price: 209 },
      { label: 'Child Ticket', age: 'Ages 3–12', price: 174 }
    ],
    rating: 4.8,
    reviewCount: '960'
  },
  {
    id: 'wine-country',
    title: 'Premium Wine & Falls Experience',
    tagline: '3 Estate Wineries, Authentic Canadian Icewine & Niagara Falls',
    price: 149,
    childPrice: 129,
    infantPrice: 0,
    currency: 'CAD',
    currencySymbol: 'CA$',
    duration: '9 Hours',
    img: '/images/tour-wine.jpg',
    tag: 'WINE & TASTING',
    category: 'evening',
    overview: 'A refined tasting day trip blending the natural spectacle of the gorge with the world-acclaimed microclimate wineries of Niagara-on-the-Lake.',
    inclusions: [
      'Round-trip executive shuttle from Toronto',
      '3 estate winery tours with structured flight tastings',
      'Authentic Canadian Icewine tasting (rare frozen winter grapes)',
      'Artisanal cheese and charcuterie pairing',
      '2 hours free time at Niagara Falls brink (Table Rock)',
      'Guided walking tour of old town Niagara-on-the-Lake'
    ],
    exclusions: [
      'Lunch (independent dining on historic Queen Street)',
      'Wine bottle retail purchases',
      'Gratuities'
    ],
    itinerary: [
      "08:30 AM – Toronto departures from designated meeting hubs",
      "10:15 AM – First boutique winery tour and structured flight tasting",
      "11:45 AM – Niagara-on-the-Lake historic town center & lunch stop",
      "01:30 PM – Second & third winery tastings with artisanal cheese pairing",
      "03:15 PM – Table Rock Welcome Centre at Niagara Falls",
      "05:15 PM – Return drive to downtown Toronto (approx. 7:00 PM)"
    ],
    highlights: [
      { t: 'Rare Canadian Icewine', d: 'Sample rare Icewine produced from naturally frozen winter grapes in the premier NOTL microclimate.', i: 'Grape' },
      { t: 'Historic Queen Street Walk', d: 'Stroll tree-lined Queen Street in historic Niagara-on-the-Lake with artisanal shops and eateries.', i: 'MapPin' },
      { t: 'Horseshoe Falls Free Time', d: 'View the thundering falls with 2 hours of ample photography time along the gorge brink.', i: 'Camera' }
    ],
    idealFor: 'Wine enthusiasts, couples, foodie travelers, and friends looking for a leisurely, sophisticated day out.',
    facts: [
      { l: 'Duration', v: '9 Hours', i: 'Clock' },
      { l: 'Tastings', v: '3 Estate Wineries', i: 'Grape' },
      { l: 'Pairing', v: 'Artisanal Cheeses', i: 'Utensils' },
      { l: 'Age', v: '19+ for Tastings', i: 'ShieldCheck' },
      { l: 'Pickup', v: 'Toronto Downtown', i: 'MapPin' }
    ],
    meetingPointsText: 'Royal Ontario Museum, Chelsea Hotel, Sheraton Centre Toronto.',
    pricingTiers: [
      { label: 'Adult (19+ Tasting)', age: 'Ages 19+', price: 149 },
      { label: 'Non-drinker / Youth', age: 'Under 19', price: 129 }
    ],
    rating: 4.9,
    reviewCount: '520'
  },
  {
    id: 'helicopter-flight-day-tour',
    title: 'Niagara Falls Helicopter Flight & Day Tour',
    tagline: 'Aerial Helicopter Flight, Hornblower Boat Cruise & Door-to-Door Pickup',
    price: 409,
    childPrice: 379,
    infantPrice: 0,
    currency: 'CAD',
    currencySymbol: 'CA$',
    duration: '8.5 Hours',
    img: '/images/tour-helicopter.jpg',
    tag: 'VIP HELICOPTER',
    category: 'private',
    overview: 'The premier VIP sightseeing combo featuring an adrenaline-filled 12-minute helicopter flight soaring directly above the Whirlpool, American Falls, and Canadian Horseshoe Falls.',
    inclusions: [
      'Round-trip transit from Toronto/Mississauga with direct hotel pickup',
      '12-minute scenic helicopter flight ticket with recorded individual headset commentary',
      'Hornblower Boat Cruise ticket (skip-the-line VIP entry)',
      'Niagara Parkway highlights & Niagara-on-the-Lake heritage stop',
      'Professional licensed guide'
    ],
    exclusions: [
      'Lunch and snacks',
      'Souvenir aerial photo prints',
      'Gratuities'
    ],
    itinerary: [
      "08:00 AM – Toronto pickups across downtown and Mississauga hotels",
      "10:00 AM – Niagara Helicopters helipad arrival and aerial flight",
      "11:30 AM – Transfer to Falls basin for Hornblower Boat Cruise",
      "01:00 PM – Free time for lunch at Table Rock / Clifton Hill",
      "03:00 PM – Niagara Parkway drive & NOTL heritage district",
      "04:30 PM – Return trip to Toronto"
    ],
    highlights: [
      { t: 'Aerial Helicopter Panorama', d: 'Unmatched bird’s-eye perspective of the mist and geological curve of the Horseshoe Falls.', i: 'Plane' },
      { t: 'Water-Level Boat Cruise', d: 'Contrast high-altitude aerial views with water-level spray on the Hornblower boat.', i: 'Wind' },
      { t: 'Door-to-Door Pickup', d: 'Direct hotel pickup across Toronto Downtown and Mississauga hotels for maximum comfort.', i: 'Bus' }
    ],
    idealFor: 'VIP travelers, photography enthusiasts, bucket-list seekers, and romantic anniversary gifts.',
    facts: [
      { l: 'Duration', v: '8.5 Hours', i: 'Clock' },
      { l: 'Flight Time', v: '12 Minutes Aerial', i: 'Plane' },
      { l: 'Boat Ride', v: 'Hornblower Incl.', i: 'Ship' },
      { l: 'Transport', v: 'Executive Shuttle', i: 'Bus' },
      { l: 'Pickup', v: 'Hotel Door-to-Door', i: 'MapPin' }
    ],
    meetingPointsText: 'Direct hotel pickup across Toronto Downtown and Mississauga hotels.',
    pricingTiers: [
      { label: 'Adult Ticket', age: 'Ages 12+', price: 409 },
      { label: 'Child Ticket', age: 'Under 12', price: 379 }
    ],
    rating: 5.0,
    reviewCount: '340'
  },
  {
    id: 'winter-wonder-festival-of-lights',
    title: 'Niagara Falls Winter Wonder & Festival of Lights Tour',
    tagline: 'Frozen Mist Sculptures, Power Station Tunnel & 3 Million Sparkling Lights',
    price: 149,
    childPrice: 129,
    infantPrice: 0,
    currency: 'CAD',
    currencySymbol: 'CA$',
    duration: '9.5 Hours',
    img: '/images/tour-winter.jpg',
    tag: 'WINTER WONDER & LIGHTS',
    category: 'evening',
    overview: 'A specialized tour operating November through April, highlighting the icy wonderland of frozen mist formations, the Niagara Parks Power Station light show, and the millions of sparkling lights of the Ontario Power Generation Winter Festival of Lights.',
    inclusions: [
      'Heated modern coach transportation from Toronto',
      'Licensed professional tour guide',
      'Admission to Journey Behind the Falls (replaces the seasonal boat)',
      'Admission to the Niagara Parks Power Station + The Subterranean Tunnel',
      'Maple syrup tasting at Maple Leaf Place',
      'Evening driving tour of the Winter Festival of Lights illumination route'
    ],
    exclusions: [
      'Dinner during Fallsview evening break',
      'Cold-weather clothing (hats, gloves, warm footwear recommended)',
      'Gratuities'
    ],
    itinerary: [
      "11:00 AM – Departure from Toronto (Union Station / Chelsea Hotel)",
      "01:00 PM – Maple syrup tasting at Maple Leaf Place",
      "02:00 PM – Niagara Parks Power Station & subterranean Tunnel walk",
      "03:45 PM – Journey Behind the Falls observation decks",
      "05:15 PM – Fallsview dinner break as night falls",
      "06:45 PM – Winter Festival of Lights illuminated driving tour & Falls illumination",
      "08:30 PM – Return departure to Toronto (approx. 10:00 PM)"
    ],
    highlights: [
      { t: 'Subterranean Power Tunnel', d: 'Walk the historic subterranean tunnel beneath the 115-year-old power station out to the river’s edge.', i: 'MapIcon' },
      { t: 'Frozen Mist Sculptures', d: 'Frozen mist sculptures clinging to Queen Victoria Park trees and iron railings.', i: 'Wind' },
      { t: '3 Million Holiday Lights', d: 'Over 3 million lights along the 8 km Winter Festival of Lights illumination trail.', i: 'Sparkles' }
    ],
    idealFor: 'Winter visitors, holiday vacationers, families, and lovers of cozy illuminated winter landscapes.',
    facts: [
      { l: 'Duration', v: '9.5 Hours', i: 'Clock' },
      { l: 'Season', v: 'Nov – Apr Only', i: 'Clock' },
      { l: 'Tunnel Walk', v: 'Power Station Incl.', i: 'MapIcon' },
      { l: 'Tasting', v: 'Pure Maple Syrup', i: 'Utensils' },
      { l: 'Pickup', v: 'Toronto Downtown', i: 'MapPin' }
    ],
    meetingPointsText: 'Toronto Downtown Union Station, Chelsea Hotel.',
    pricingTiers: [
      { label: 'Adult Ticket', age: 'Ages 13+', price: 149 },
      { label: 'Child Ticket', age: 'Ages 3–12', price: 129 }
    ],
    rating: 4.8,
    reviewCount: '620'
  },
  {
    id: 'canadian-adventure-lunch-local',
    title: 'Niagara Falls Canadian Adventure with Lunch (Local Departure)',
    tagline: 'Local Hotel Pickup, Sheraton Fallsview Buffet Lunch & Skylon Tower',
    price: 199,
    childPrice: 169,
    infantPrice: 0,
    currency: 'CAD',
    currencySymbol: 'CA$',
    duration: '7 Hours',
    img: '/images/tour-canadian-adventure.jpg',
    tag: 'LOCAL DEPARTURE / LUNCH',
    category: 'day',
    overview: 'Designed for travelers already staying in Niagara Falls, ON. A comprehensive 6-to-7-hour small-group itinerary that includes top attractions and lunch with front-row waterfall views.',
    inclusions: [
      'Door-to-door pickup from any Niagara Falls or Niagara-on-the-Lake hotel/B&B',
      'Hornblower Boat Cruise (or Journey Behind the Falls in winter)',
      'Skylon Tower observation pass (775 ft)',
      '3-course buffet lunch at Sheraton Fallsview restaurant overlooking the falls',
      'Whirlpool Aero Car viewpoint stop & Floral Clock'
    ],
    exclusions: [
      'Transportation to/from Toronto (Local Niagara Falls departure only)',
      'Personal purchases and souvenirs',
      'Driver-guide gratuities'
    ],
    itinerary: [
      "09:30 AM – Hotel pickup in Niagara Falls & Niagara-on-the-Lake",
      "10:00 AM – Hornblower Boat Cruise experience",
      "11:30 AM – Table Rock & Whirlpool Rapids overlook",
      "12:30 PM – Buffet Lunch at Sheraton Fallsview",
      "02:00 PM – Skylon Tower summit ride & 360 observation",
      "03:30 PM – Whirlpool Aero Car & Floral Clock photo stop",
      "04:30 PM – Drop-off at local hotel"
    ],
    highlights: [
      { t: 'Intimate Small Group', d: 'Intimate small-group vehicle with swift attraction access and zero parking hassles.', i: 'Users' },
      { t: 'Fallsview Buffet Lunch', d: 'Relaxed lunch directly overlooking the American and Horseshoe Falls at Sheraton Fallsview.', i: 'Utensils' },
      { t: 'Expert Local Narration', d: 'Expert local driver-guide narration with insider stories and history.', i: 'ShieldCheck' }
    ],
    idealFor: 'Tourists staying overnight in Niagara Falls or NOTL who want an all-inclusive VIP sightseeing day.',
    facts: [
      { l: 'Duration', v: '6 - 7 Hours', i: 'Clock' },
      { l: 'Lunch', v: 'Sheraton Buffet Incl.', i: 'Utensils' },
      { l: 'Boat Ride', v: 'Hornblower Incl.', i: 'Ship' },
      { l: 'Group Size', v: 'Small Group (Max 14)', i: 'Users' },
      { l: 'Pickup', v: 'All Local Hotels', i: 'MapPin' }
    ],
    meetingPointsText: 'Complimentary pickup at all Niagara Falls & Niagara-on-the-Lake hotels/B&Bs.',
    pickupPoints: [
      { name: "Fallsview Hotel District", sub: "Fallsview Blvd / Murray St (Direct Lobby Pickup)", area: "Niagara Falls, ON", time: "9:30 AM", lat: 43.0835, lng: -79.0815 },
      { name: "Clifton Hill District", sub: "Victoria Ave & Clifton Hill Hotels", area: "Niagara Falls, ON", time: "9:40 AM", lat: 43.0915, lng: -79.0735 },
      { name: "Niagara-on-the-Lake B&Bs", sub: "Old Town NOTL Accommodations", area: "Niagara-on-the-Lake", time: "9:15 AM", lat: 43.2550, lng: -79.0710 }
    ],
    pricingTiers: [
      { label: 'Adult Ticket', age: 'Ages 13+', price: 199 },
      { label: 'Child Ticket', age: 'Ages 3–12', price: 169 }
    ],
    rating: 4.9,
    reviewCount: '1,120'
  },
  {
    id: 'best-of-niagara-half-day-local',
    title: 'Best of Niagara Half-Day Sightseeing Tour (Local Departure)',
    tagline: 'Efficient 4.5-Hour Highlights: Boat Cruise, Tunnels & Dufferin Islands',
    price: 159,
    childPrice: 134,
    infantPrice: 0,
    currency: 'CAD',
    currencySymbol: 'CA$',
    duration: '4.5 Hours',
    img: '/images/tour-half-day-local.jpg',
    tag: 'HALF-DAY LOCAL HIGHLIGHTS',
    category: 'day',
    overview: 'A tight, efficient 4-to-5-hour highlights tour for visitors short on time who want to tick off the premier attractions without missing the historical context.',
    inclusions: [
      'Local hotel pickup and drop-off on the Canadian side',
      'Niagara City Cruise VIP tickets',
      'Journey Behind the Falls admission',
      'Scenic stops at Dufferin Islands, Floral Clock, and Whirlpool Rapids'
    ],
    exclusions: [
      'Meals (tour concludes at 1:30 PM for lunch at your leisure)',
      'Toronto transportation',
      'Gratuities'
    ],
    itinerary: [
      "09:00 AM or 01:30 PM – Hotel pickups in Niagara Falls",
      "09:30 AM – Fast-track entry to Hornblower Boat Cruise",
      "11:00 AM – Journey Behind the Falls observation tunnel",
      "12:15 PM – Scenic drive through Dufferin Islands & Whirlpool Rapids",
      "01:30 PM – Drop-off back at your hotel"
    ],
    highlights: [
      { t: 'Compact Half-Day Footprint', d: 'Compact half-day footprint leaving afternoons completely free for relaxation or winery visits.', i: 'Clock' },
      { t: 'Boat & Behind-the-Falls', d: 'Both boat and behind-the-falls perspectives included with pre-booked admission.', i: 'Wind' },
      { t: 'Dufferin Islands Nature', d: 'Stops at tranquil Dufferin Islands secluded nature park and wooden footbridges.', i: 'MapIcon' }
    ],
    idealFor: 'Overnight Niagara visitors with half a day to spare, cruise ship or conference attendees.',
    facts: [
      { l: 'Duration', v: '4.5 Hours', i: 'Clock' },
      { l: 'Attractions', v: 'Boat & Tunnels Incl.', i: 'ShieldCheck' },
      { l: 'Departures', v: 'Morning or Afternoon', i: 'Clock' },
      { l: 'Transport', v: 'Climate-Controlled Minibus', i: 'Bus' },
      { l: 'Pickup', v: 'Canadian Side Hotels', i: 'MapPin' }
    ],
    meetingPointsText: 'Any hotel on the Canadian side of Niagara Falls.',
    pickupPoints: [
      { name: "Niagara Falls, ON Hotels", sub: "Any hotel, motel, or B&B on the Canadian side", area: "Niagara Falls, ON", time: "9:00 AM / 1:30 PM", lat: 43.0850, lng: -79.0780 }
    ],
    pricingTiers: [
      { label: 'Adult Ticket', age: 'Ages 13+', price: 159 },
      { label: 'Child Ticket', age: 'Ages 3–12', price: 134 }
    ],
    rating: 4.8,
    reviewCount: '740'
  },
  {
    id: 'niagara-falls-usa-maid-mist',
    title: 'Niagara Falls USA Guided Tour (Maid of the Mist & Cave of the Winds)',
    tagline: 'State Park Exploration, Electric Maid of the Mist & Hurricane Deck',
    price: 148,
    childPrice: 118,
    infantPrice: 0,
    currency: 'USD',
    currencySymbol: 'US$',
    duration: '5 Hours',
    img: '/images/tour-maid-mist.jpg',
    tag: 'USA STATE PARK / MAID OF MIST',
    category: 'day',
    overview: 'Based out of Niagara Falls, New York (USA), exploring the lush state park side of the Falls. Get drenched at the famous Hurricane Deck and cruise right into the waters on the historic American Maid of the Mist.',
    inclusions: [
      'Guided transportation around Niagara Falls State Park (USA)',
      'Skip-the-line ticket to the historic Maid of the Mist boat tour',
      'Elevator pass & admission to the Cave of the Winds & Hurricane Deck',
      'Visit to Prospect Point Observation Tower and Goat Island'
    ],
    exclusions: [
      'Meals and drinks',
      'Canadian side transportation / border crossing',
      'Driver-guide gratuities'
    ],
    itinerary: [
      "09:00 AM – Hotel pickup in Niagara Falls, NY",
      "09:30 AM – Maid of the Mist Boat Cruise & Prospect Observation Deck",
      "11:00 AM – Goat Island & Three Sisters Islands scenic nature walk",
      "12:15 PM – Cave of the Winds descent through the gorge elevator down to Hurricane Deck",
      "02:00 PM – Return transfer to NY hotels"
    ],
    highlights: [
      { t: 'Cave of the Winds', d: 'Stand just feet from the Bridal Veil Falls at the thrilling Cave of the Winds Hurricane Deck.', i: 'Wind' },
      { t: 'Iconic Maid of the Mist', d: 'Board the iconic electric Maid of the Mist boat into the roaring gorge mist.', i: 'Ship' },
      { t: 'Goat Island Views', d: 'Unobstructed views of Horseshoe and American Falls from Goat Island and Terrapin Point.', i: 'Camera' }
    ],
    idealFor: 'Visitors staying in New York state, families without passports for Canada, and state park lovers.',
    facts: [
      { l: 'Duration', v: '5 Hours', i: 'Clock' },
      { l: 'Boat Ride', v: 'Maid of the Mist', i: 'Ship' },
      { l: 'Attractions', v: 'Cave of the Winds', i: 'Wind' },
      { l: 'Currency', v: 'USD ($)', i: 'ShieldCheck' },
      { l: 'Pickup', v: 'Niagara Falls, NY', i: 'MapPin' }
    ],
    meetingPointsText: '417 Portage Rd / Niagara Falls NY Hotel pickups.',
    pickupPoints: [
      { name: "417 Portage Rd Hub", sub: "417 Portage Rd, Niagara Falls, NY 14303", area: "Niagara Falls, NY", time: "9:00 AM", lat: 43.0886, lng: -79.0558 },
      { name: "Niagara Falls NY Hotels", sub: "Any hotel in downtown Niagara Falls, NY", area: "Niagara Falls, NY", time: "9:15 AM", lat: 43.0865, lng: -79.0585 }
    ],
    pricingTiers: [
      { label: 'Adult Ticket', age: 'Ages 12+', price: 148 },
      { label: 'Child Ticket', age: 'Ages 3–11', price: 118 }
    ],
    rating: 4.9,
    reviewCount: '3,300+'
  },
  {
    id: 'usa-canada-combo-tour',
    title: 'Niagara Falls USA & Canada Combo Tour with Lunch',
    tagline: 'Two Countries in One Day: Maid of the Mist, Skylon Tower & Sit-Down Lunch',
    price: 273,
    childPrice: 235,
    infantPrice: 0,
    currency: 'USD',
    currencySymbol: 'US$',
    duration: '8.5 Hours',
    img: '/images/tour-usa-canada.jpg',
    tag: 'USA & CANADA COMBO',
    category: 'day',
    overview: 'A cross-border tour giving travelers the complete picture by exploring both the American State Park vistas and the Canadian skyline. (Valid passport and appropriate visas required).',
    inclusions: [
      'Cross-border coach transit and border crossing assistance',
      'Maid of the Mist boat ride (USA side)',
      'Cave of the Winds Hurricane Deck',
      'Skylon Tower observation entry (Canada side)',
      'Sit-down lunch overlooking the gorge in Niagara Falls, Canada'
    ],
    exclusions: [
      'Border immigration visa fees (if applicable; valid passport mandatory)',
      'Alcoholic drinks at lunch',
      'Gratuities'
    ],
    itinerary: [
      "08:30 AM – Pickup in Niagara Falls, NY or ON",
      "09:00 AM – Maid of the Mist boat experience",
      "10:30 AM – Cave of the Winds exploration",
      "12:00 PM – International border crossing via Rainbow Bridge",
      "01:00 PM – Sit-down lunch in Niagara Falls, Canada",
      "02:30 PM – Skylon Tower Observation Deck & Table Rock",
      "04:30 PM – Return border crossing and hotel drop-offs"
    ],
    highlights: [
      { t: 'Dual-Nation Perspectives', d: 'Compare the natural park views of the US side with the panoramic views of the Canadian side.', i: 'Globe' },
      { t: 'Maid of Mist & Skylon', d: 'Ride the Maid of the Mist and ascend Skylon Tower on the same day.', i: 'Navigation' },
      { t: 'Fully Narrated Cross-Border', d: 'Fully narrated dual-country geopolitical and geological history with seamless border assistance.', i: 'ShieldCheck' }
    ],
    idealFor: 'Travelers with valid passports wanting the complete, definitive two-country Niagara experience.',
    facts: [
      { l: 'Duration', v: '8.5 Hours', i: 'Clock' },
      { l: 'Border', v: 'USA & Canada (Passport Req.)', i: 'Globe' },
      { l: 'Lunch', v: 'Sit-Down Gorge View', i: 'Utensils' },
      { l: 'Boat Ride', v: 'Maid of the Mist', i: 'Ship' },
      { l: 'Pickup', v: 'NY or ON Hotels', i: 'MapPin' }
    ],
    meetingPointsText: 'Selected hotels on both the US and Canadian sides of Niagara Falls.',
    pickupPoints: [
      { name: "Niagara Falls NY Pickups", sub: "Rainbow Blvd & downtown NY hotels", area: "Niagara Falls, NY", time: "8:30 AM", lat: 43.0886, lng: -79.0558 },
      { name: "Niagara Falls ON Pickups", sub: "Fallsview & Clifton Hill hotels", area: "Niagara Falls, ON", time: "8:45 AM", lat: 43.0850, lng: -79.0780 }
    ],
    pricingTiers: [
      { label: 'Adult Ticket', age: 'Ages 12+', price: 273 },
      { label: 'Child Ticket', age: 'Ages 3–11', price: 235 }
    ],
    rating: 4.9,
    reviewCount: '870'
  },
  {
    id: 'whirlpool-jet-boat-thrill',
    title: 'Whirlpool Jet Boat Thrill Tour',
    tagline: 'Class V Devil\'s Hole Whitewater Rapids & 360-Degree Canyon Spins',
    price: 79,
    childPrice: 65,
    infantPrice: 0,
    currency: 'CAD',
    currencySymbol: 'CA$',
    duration: '2 Hours',
    img: '/images/tour-jetboat.jpg',
    tag: 'THRILL & ADVENTURE',
    category: 'day',
    overview: 'A high-octane river expedition taking passengers on a jet boat through the Class V Devil’s Hole rapids and the Niagara Whirlpool.',
    inclusions: [
      '45-minute high-speed jet boat navigation through Devil’s Hole rapids',
      'Complete wet gear (life jackets, water booties, and splash gear)',
      'Expert captain with live maritime safety commentary',
      'Optional dry deck seating available on covered craft',
      'Access to warm change rooms and lockers'
    ],
    exclusions: [
      'Transport from Toronto (shuttle connection from Niagara Falls available)',
      'Souvenir high-speed photo/video packages',
      'Gratuities'
    ],
    itinerary: [
      "10:00 AM – Arrival at Queenston / Niagara-on-the-Lake boat dock",
      "10:30 AM – Safety briefing, gear fitting, and boarding",
      "11:00 AM – 45-minute jet tour up through Devil's Hole rapids to the Whirlpool",
      "11:45 AM – Dock return, warm change rooms, and photo viewing"
    ],
    highlights: [
      { t: '15-Foot Standing Waves', d: 'Blast through 15-foot standing whitewater waves in the Niagara Gorge.', i: 'Wind' },
      { t: '360-Degree Canyon Spins', d: '360-degree spins right outside the natural whirlpool canyon.', i: 'Zap' },
      { t: '200-Foot Gorge Walls', d: 'Unobstructed views of the towering 200-foot gorge walls from water level.', i: 'Camera' }
    ],
    idealFor: 'Thrill seekers, active families, groups of friends, and adrenaline enthusiasts.',
    facts: [
      { l: 'Duration', v: '2 Hours (45m on water)', i: 'Clock' },
      { l: 'Rapids', v: 'Class V Devil\'s Hole', i: 'Zap' },
      { l: 'Gear', v: 'Life Jackets & Wet Gear Incl.', i: 'ShieldCheck' },
      { l: 'Options', v: 'Wet or Dry Seating', i: 'Ship' },
      { l: 'Location', v: 'Queenston Boat Dock', i: 'MapPin' }
    ],
    meetingPointsText: '55 River Frontage Rd, Queenston, ON (shuttle connection from Niagara Falls available).',
    pickupPoints: [
      { name: "Queenston Boat Launch Dock", sub: "55 River Frontage Rd, Queenston, ON L0S 1L0", area: "Queenston / Niagara-on-the-Lake", time: "10:00 AM Check-in", lat: 43.1633, lng: -79.0538 }
    ],
    pricingTiers: [
      { label: 'Adult Ticket', age: 'Ages 13+', price: 79 },
      { label: 'Youth Ticket', age: 'Ages 4–12', price: 65 }
    ],
    rating: 4.8,
    reviewCount: '300+'
  },
  {
    id: 'vip-experience',
    title: 'Private Custom VIP Tour (Toronto / GTA Departure)',
    tagline: 'Dedicated Luxury Vehicle, Niagara Certified Private Guide & Bespoke Itinerary',
    price: 1395,
    childPrice: 0,
    infantPrice: 0,
    currency: 'CAD',
    currencySymbol: 'CA$',
    duration: '9.5 Hours',
    img: '/images/tour-vip.jpg',
    tag: 'PRIVATE / VIP BESPOKE',
    category: 'private',
    overview: 'A bespoke full-day experience with a dedicated vehicle and private Niagara Parks certified guide. The itinerary, pickup time, and stops are tailored entirely around your party.',
    inclusions: [
      'Private vehicle (choice of luxury SUV, Mercedes Sprinter, or mini-coach)',
      'Dedicated private guide/driver certified by Niagara Parks',
      'Door-to-door pickup from any address in Toronto or the GTA',
      'Flexible schedule tailored to include wineries, attractions, or dining',
      'All fuel, 407 highway tolls, and attraction parking included'
    ],
    exclusions: [
      'Attraction tickets (can be bundled at group discount rates on request)',
      'Client meals and wine tastings',
      'Driver gratuities'
    ],
    itinerary: [
      "Fully customizable. A standard popular schedule runs 9:00 AM to 6:30 PM, incorporating Table Rock, the Hornblower cruise, lunch in Niagara-on-the-Lake, and private estate wine tastings."
    ],
    highlights: [
      { t: 'Travel at Your Own Pace', d: 'Travel at your own pace with no waiting on other passengers.', i: 'Clock' },
      { t: 'Hidden Gems & Wineries', d: 'Freedom to stop at hidden gem vineyards, farm stands, or historic forts.', i: 'Grape' },
      { t: 'Priority Routing', d: 'Priority routing that dodges peak tour bus rush hours and long queues.', i: 'Navigation' }
    ],
    idealFor: 'Families with elderly or infants, VIP executives, couples celebrating milestones, private groups.',
    facts: [
      { l: 'Duration', v: '9.5 Hours (Flexible)', i: 'Clock' },
      { l: 'Vehicle', v: 'SUV / Sprinter / Coach', i: 'Bus' },
      { l: 'Guide', v: 'Niagara Parks Certified', i: 'ShieldCheck' },
      { l: 'Customization', v: '100% Bespoke Schedule', i: 'Zap' },
      { l: 'Pickup', v: 'Anywhere in Toronto / GTA', i: 'MapPin' }
    ],
    meetingPointsText: 'Door-to-door pickup anywhere in Toronto, Mississauga, Oakville, Brampton, or Niagara.',
    pricingTiers: [
      { label: 'Luxury SUV', age: 'Up to 6 guests', price: 1395 },
      { label: 'Executive Transit Van', age: 'Up to 14 guests', price: 1795 },
      { label: 'Mini-Coach', age: 'Up to 24 guests', price: 2095 }
    ],
    rating: 5.0,
    reviewCount: '410'
  },
  {
    id: 'three-day-tour',
    title: 'Toronto, Thousand Islands & Niagara 3-Day Regional Explorer',
    tagline: '3-Day Multi-City: 1000 Islands Boldt Castle, Fallsview Hotel & Hornblower Cruise',
    price: 689,
    childPrice: 599,
    infantPrice: 0,
    currency: 'CAD',
    currencySymbol: 'CA$',
    duration: '3 Days / 2 Nights',
    img: '/images/tour-3day.jpg',
    tag: '3-DAY REGIONAL EXPLORER',
    category: 'private',
    overview: 'A multi-day regional journey connecting Canada’s top urban and natural wonders. Takes travelers from Toronto’s downtown landmarks to a 1000 Islands St. Lawrence river cruise, culminating in an overnight stay and complete exploration of Niagara Falls.',
    inclusions: [
      '3 days of guided luxury motorcoach transit',
      '2 nights hotel accommodation (1 night Gananoque/Kingston, 1 night Niagara Falls Fallsview hotel)',
      '1000 Islands Boldt Castle boat cruise ticket',
      'Niagara City Hornblower cruise ticket',
      'Journey Behind the Falls admission',
      '2 daily continental breakfasts'
    ],
    exclusions: [
      'Lunches and dinners',
      'US customs landing fee at Boldt Castle (if applicable; passport required)',
      'Tour director & driver gratuities'
    ],
    itinerary: [
      "Day 1: Toronto departure to Thousand Islands; afternoon cruise past Millionaires' Row and Boldt Castle; overnight stay in Kingston.",
      "Day 2: Scenic morning drive across Prince Edward County to Niagara Falls; afternoon Hornblower Cruise; evening illumination and fireworks; overnight in Niagara Falls.",
      "Day 3: Morning Journey Behind the Falls; midday exploration of Niagara-on-the-Lake and winery stop; late afternoon return transfer to Toronto."
    ],
    highlights: [
      { t: 'Boldt Castle & Islands', d: 'Boldt Castle and island estates on the picturesque St. Lawrence River.', i: 'Wind' },
      { t: 'Fallsview Room Overnights', d: 'Fallsview room accommodations waking up to the mist of the waterfalls.', i: 'MapIcon' },
      { t: 'Clifton Hill & Night Lights', d: 'Evening free time to experience Clifton Hill and nighttime light shows.', i: 'Sparkles' }
    ],
    idealFor: 'International tourists, vacationers wanting a comprehensive multi-city Ontario exploration.',
    facts: [
      { l: 'Duration', v: '3 Days / 2 Nights', i: 'Clock' },
      { l: 'Accommodations', v: '2 Nights (Fallsview Incl.)', i: 'MapPin' },
      { l: 'Cruises', v: '1000 Islands & Niagara', i: 'Ship' },
      { l: 'Meals', v: 'Daily Breakfasts Incl.', i: 'Utensils' },
      { l: 'Pickup', v: 'Toronto Downtown Hubs', i: 'Bus' }
    ],
    meetingPointsText: 'Royal Ontario Museum or Union Station, Downtown Toronto.',
    pricingTiers: [
      { label: 'Double Occupancy', age: 'Per person sharing', price: 689 },
      { label: 'Single Occupancy', age: 'Private room', price: 849 }
    ],
    rating: 4.9,
    reviewCount: '230'
  },
  {
    id: 'half-day-private',
    title: 'Niagara Falls Half Day Private Tour',
    tagline: 'A flexible, private escape to Niagara Falls for those with limited time.',
    price: 795,
    childPrice: 0,
    infantPrice: 0,
    currency: 'CAD',
    currencySymbol: 'CA$',
    duration: '5 - 6 Hours',
    img: '/images/tour-half-day.jpg',
    tag: 'HALF DAY PRIVATE',
    category: 'private',
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
      { t: 'Personalized Experience', d: 'Enjoy a stress-free tour with private luxury transportation and a professional local guide.', i: 'Users' },
      { t: 'Flexible Itinerary', d: 'Explore at your own pace, customize your stops, and balance sightseeing with free time.', i: 'Navigation' },
      { t: 'Breathtaking Stops', d: 'Visit the breathtaking Horseshoe Falls, Whirlpool Rapids, and the Floral Clock.', i: 'Camera' }
    ],
    idealFor: 'Couples, families, small groups, corporate travelers, and visitors with limited time in Toronto.',
    facts: [
      { l: 'Duration', v: '5 - 6 Hours', i: 'Clock' },
      { l: 'Group Size', v: 'Private', i: 'Users' },
      { l: 'Pace', v: 'Flexible', i: 'Zap' },
      { l: 'Transport', v: 'Luxury Vehicle', i: 'Bus' },
      { l: 'Pickup', v: 'Toronto / GTA', i: 'MapPin' }
    ],
    meetingPointsText: 'Door-to-door pickup anywhere across Toronto and the Greater Toronto Area.',
    rating: 4.9,
    reviewCount: '180'
  }
];

export const REVIEWS_DATA = [
  {
    id: 1,
    name: "David M.",
    date: "October 14, 2025",
    rating: 5,
    tour: "Niagara Classic Day Escape",
    text: "The boat ride was the highlight of our trip to Canada! Our guide knew exactly where to take us to avoid the heaviest crowds."
  },
  {
    id: 2,
    name: "Liam K.",
    date: "September 28, 2025",
    rating: 5,
    tour: "Niagara Falls Freedom Day Tour",
    text: "Super punctual and clean coach. Loved not being forced into group attraction queues."
  },
  {
    id: 3,
    name: "Marcus & Chloe",
    date: "August 19, 2025",
    rating: 5,
    tour: "Niagara Evening Illumination & Fireworks Tour",
    text: "Seeing the falls lit up at night with fireworks exploding right over the mist was unforgettable!"
  },
  {
    id: 4,
    name: "Evelyn P.",
    date: "September 12, 2025",
    rating: 5,
    tour: "Deluxe Evening Fallsview Dinner & Illumination Tour",
    text: "Dinner with that view was worth every penny. Excellent timing throughout the entire tour."
  },
  {
    id: 5,
    name: "Siddharth R.",
    date: "July 14, 2025",
    rating: 5,
    tour: "Ultimate Niagara Adventure",
    text: "Packed itinerary, but we covered everything we came to see without standing in general ticket lines."
  },
  {
    id: 6,
    name: "Claire & Julien",
    date: "October 04, 2025",
    rating: 5,
    tour: "Premium Wine & Falls Experience",
    text: "The icewine was extraordinary, and the pacing between the vineyards and the Falls was perfect."
  },
  {
    id: 7,
    name: "Ananya S.",
    date: "August 22, 2025",
    rating: 5,
    tour: "Niagara Falls Helicopter Flight & Day Tour",
    text: "Seeing the falls from the helicopter gives you a sense of scale you simply cannot get from the ground."
  },
  {
    id: 8,
    name: "Brendan & Tara",
    date: "December 18, 2025",
    rating: 5,
    tour: "Niagara Falls Winter Wonder & Festival of Lights Tour",
    text: "The frozen gorge was magical! The tunnel under the power station was a hidden architectural gem."
  },
  {
    id: 9,
    name: "Jimmy T.",
    date: "September 08, 2025",
    rating: 5,
    tour: "Niagara Falls Canadian Adventure with Lunch (Local Departure)",
    text: "Skip the parking hassles! Jimmy was an awesome guide with so many funny local stories."
  },
  {
    id: 10,
    name: "Nathan & Rachel",
    date: "August 11, 2025",
    rating: 5,
    tour: "Best of Niagara Half-Day Sightseeing Tour (Local Departure)",
    text: "The perfect length. Saw everything critical in the morning and had our afternoon to relax."
  },
  {
    id: 11,
    name: "Mark S.",
    date: "July 29, 2025",
    rating: 5,
    tour: "Niagara Falls USA Guided Tour (Maid of the Mist & Cave of the Winds)",
    text: "Cave of the Winds was mindblowing! Mark was so knowledgeable about the engineering and indigenous history."
  },
  {
    id: 12,
    name: "Samantha & Keith",
    date: "September 19, 2025",
    rating: 5,
    tour: "Niagara Falls USA & Canada Combo Tour with Lunch",
    text: "Border crossing was smooth with our guide. Getting both vantage points in a single day is the only way to see Niagara."
  },
  {
    id: 13,
    name: "Travis G.",
    date: "August 03, 2025",
    rating: 5,
    tour: "Whirlpool Jet Boat Thrill Tour",
    text: "Expect to get completely soaked! The power of the water in the rapids is exhilarating."
  },
  {
    id: 14,
    name: "The Harrison Family",
    date: "August 14, 2025",
    rating: 5,
    tour: "Private Custom VIP Tour (Toronto / GTA Departure)",
    text: "Traveling with elderly parents and toddlers was effortless. Our driver adjusted timing on the fly and made everything stress-free."
  },
  {
    id: 15,
    name: "George & Mary W.",
    date: "September 22, 2025",
    rating: 5,
    tour: "Toronto, Thousand Islands & Niagara 3-Day Regional Explorer",
    text: "Seamless logistics from start to finish. Staying overnight right by the falls made the whole trip feel like a true vacation."
  },
  {
    id: 16,
    name: "Sarah Jenkins",
    date: "August 15, 2025",
    rating: 5,
    tour: "Niagara Classic Day Escape",
    text: "Absolutely incredible experience! Our guide was so knowledgeable and knew exactly where to take us to avoid the biggest crowds."
  },
  {
    id: 17,
    name: "Emma Dubois",
    date: "July 02, 2025",
    rating: 5,
    tour: "Niagara Classic Day Escape",
    text: "Excellent value for money. The coach was pristine and had wifi which was great for the ride back to Toronto."
  }
];

export const PICKUP_POINTS = [
  { name: "Royal Ontario Museum", sub: "(Queen's Park Entrance), 100 Queens Park", area: "Downtown Toronto", time: "7:55 AM", lat: 43.6677, lng: -79.3948 },
  { name: "Holiday Inn Downtown Centre", sub: "30 Carlton St", area: "Downtown Toronto", time: "8:00 AM", lat: 43.6624, lng: -79.3831 },
  { name: "Chelsea Hotel", sub: "33 Gerrard St W", area: "Downtown Toronto", time: "8:15 AM", lat: 43.6580, lng: -79.3828 },
  { name: "Sheraton Centre", sub: "123 Queen St W", area: "Downtown Toronto", time: "8:15 AM", lat: 43.6515, lng: -79.3836 },
  { name: "Maple Leaf Square", sub: "@ the South Entrance of Union Station", area: "Downtown Toronto", time: "8:30 AM", lat: 43.6431, lng: -79.3802 }
];
