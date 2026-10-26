import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { TOURS_DATA } from '@/data/tours';

function sanitizeTour(tour) {
  if (!tour) return null;
  const sanitized = { ...tour };
  if (Array.isArray(sanitized.highlights)) {
    sanitized.highlights = sanitized.highlights.map((h) => ({
      ...h,
      i: typeof h.i === 'string' ? h.i : (h.i?.displayName || h.i?.name || 'Star'),
    }));
  }
  if (Array.isArray(sanitized.facts)) {
    sanitized.facts = sanitized.facts.map((f) => ({
      ...f,
      i: typeof f.i === 'string' ? f.i : (f.i?.displayName || f.i?.name || 'Clock'),
    }));
  }
  return sanitized;
}

/**
 * Robust server-side & build-time tour data fetcher.
 * Guarantees zero blocking: fetches live Firestore updates if available,
 * and immediately falls back to rich static TOURS_DATA if offline, during SSG builds,
 * or if Firestore times out.
 */
export async function getLiveTours() {
  try {
    const fetchPromise = getDocs(collection(db, 'tours'));
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Firestore timeout')), 2000)
    );

    const querySnapshot = await Promise.race([fetchPromise, timeoutPromise]);
    
    if (querySnapshot && !querySnapshot.empty) {
      const live = querySnapshot.docs.map((doc) => ({
        firebaseId: doc.id,
        ...doc.data(),
      }));
      const mergedLive = live.map((liveTour) => {
        const fallback = TOURS_DATA.find((t) => t.id === liveTour.id) || {};
        return sanitizeTour({ ...fallback, ...liveTour });
      });
      const liveIds = new Set(live.map((l) => l.id));
      const remainingFallback = TOURS_DATA.filter((t) => !liveIds.has(t.id)).map(sanitizeTour);

      return [...mergedLive, ...remainingFallback];
    }
  } catch (err) {
    console.warn('[Data Layer] Falling back to static TOURS_DATA:', err.message);
  }

  return TOURS_DATA.map(sanitizeTour);
}

/**
 * Fetch a single tour by ID with guaranteed fallback
 */
export async function getTourById(id) {
  const tours = await getLiveTours();
  const tour = tours.find((t) => t.id === id) || TOURS_DATA.find((t) => t.id === id) || null;
  return sanitizeTour(tour);
}
