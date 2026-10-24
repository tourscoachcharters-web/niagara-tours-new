/**
 * Schema.org JSON-LD generation utilities for Niagara Travels
 * Standardized for SEO crawler discovery and Rich Results
 */

const SITE_URL = 'https://www.niagaratravels.ca';

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['TravelAgency', 'LocalBusiness'],
  '@id': `${SITE_URL}/#organization`,
  name: 'Niagara Travels',
  alternateName: 'Niagara Tours & Coach Charters',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  image: `${SITE_URL}/images/hero-home.jpg`,
  description: 'Premium guided tours and private luxury charters from Toronto to Niagara Falls, Ontario, Canada.',
  telephone: '+1-416-444-3000',
  email: 'info@niagaratravels.ca',
  priceRange: '$$',
  currenciesAccepted: 'CAD, USD',
  paymentAccepted: 'Credit Card, Debit Card',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1315 Pickering Parkway, Suite 300',
    addressLocality: 'Pickering',
    addressRegion: 'ON',
    postalCode: 'L1V 7G5',
    addressCountry: 'CA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 43.8354,
    longitude: -79.0890,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  ],
  areaServed: [
    { '@type': 'City', name: 'Toronto' },
    { '@type': 'City', name: 'Niagara Falls' },
    { '@type': 'City', name: 'Mississauga' },
    { '@type': 'AdministrativeArea', name: 'Greater Toronto Area' },
    { '@type': 'AdministrativeArea', name: 'Ontario' },
    { '@type': 'Country', name: 'Canada' },
  ],
  sameAs: [
    'https://www.facebook.com/niagaratravels',
    'https://www.instagram.com/niagaratravels',
    'https://www.youtube.com/@niagaratravels',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '1500',
    bestRating: '5',
    worstRating: '1',
  },
};

export function getServiceSchema({ name, description, serviceType = 'Guided Tour Service', url }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url || SITE_URL}#service`,
    name,
    description,
    serviceType,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: ORGANIZATION_SCHEMA.areaServed,
    termsOfService: `${SITE_URL}/terms`,
  };
}

export function getTourProductSchema(tour) {
  const tourUrl = `${SITE_URL}/tour/${tour.id}`;
  const checkoutUrl = `${SITE_URL}/checkout/${tour.id}`;
  const imageUrl = tour.img?.startsWith('http') ? tour.img : `${SITE_URL}${tour.img || '/images/hero-home.jpg'}`;

  const itineraryItems = Array.isArray(tour.itinerary)
    ? tour.itinerary.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: typeof item === 'string' ? item.split(':')[0] : `Stop ${idx + 1}`,
        description: typeof item === 'string' ? item : '',
      }))
    : [];

  return {
    '@context': 'https://schema.org',
    '@type': ['Product', 'TouristTrip'],
    '@id': `${tourUrl}#trip`,
    name: tour.title,
    description: tour.overview || tour.tagline,
    image: imageUrl,
    touristType: ['Couples', 'Families', 'Groups', 'Solo Travelers'],
    offers: {
      '@type': 'Offer',
      price: tour.price,
      priceCurrency: 'CAD',
      availability: 'https://schema.org/InStock',
      url: checkoutUrl,
      validFrom: '2026-01-01',
      seller: { '@id': `${SITE_URL}/#organization` },
    },
    provider: { '@id': `${SITE_URL}/#organization` },
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: itineraryItems.length,
      itemListElement: itineraryItems,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '350',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

export function getBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function getReviewsSchema(reviews) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ORGANIZATION_SCHEMA,
      ...reviews.map((r) => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: r.name,
        },
        datePublished: r.date,
        reviewBody: r.text,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: r.rating,
          bestRating: '5',
          worstRating: '1',
        },
        itemReviewed: {
          '@type': 'TouristTrip',
          name: r.tour || 'Niagara Falls Tour',
          provider: { '@id': `${SITE_URL}/#organization` },
        },
      })),
    ],
  };
}

/**
 * Reusable React component to safely render JSON-LD in the HTML head/body
 */
export function JsonLd({ data }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
