import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC5DVk0W9tBFW4sTwVZIEG6vQRiQHisIcY",
  authDomain: "new-niagara-tours.firebaseapp.com",
  projectId: "new-niagara-tours",
  storageBucket: "new-niagara-tours.firebasestorage.app",
  messagingSenderId: "617199953253",
  appAppId: "1:617199953253:web:1014a1aad3ce755da56d8c"
};

// Prevent duplicate initialization during hot reloads
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };