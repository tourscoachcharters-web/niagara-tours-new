import { getLiveTours } from '@/lib/firebase-utils';
import { TOURS_DATA } from '@/data/tours';

const SITE_URL = 'https://www.niagaratravels.ca';

export default async function sitemap() {
  let tours = [];
  try {
    tours = await getLiveTours();
  } catch (e) {
    tours = TOURS_DATA;
  }

  const currentDate = new Date().toISOString();

  // Static core routes
  const staticRoutes = [
    {
      url: `${SITE_URL}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/tours`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/custom-itinerary`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/reviews`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Dynamic tour routes that automatically scale as new tours are added
  const tourRoutes = tours.map((tour) => ({
    url: `${SITE_URL}/tour/${tour.id}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticRoutes, ...tourRoutes];
}
