import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export async function getLiveTours() {
  const querySnapshot = await getDocs(collection(db, 'tours'));
  return querySnapshot.docs.map(doc => ({ firebaseId: doc.id, ...doc.data() }));
}