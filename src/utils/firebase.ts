import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAgNjn-ivvA4J4VCm48Wv-jxK44wy2lQw8",
  authDomain: "motos-web.firebaseapp.com",
  projectId: "motos-web",
  storageBucket: "motos-web.firebasestorage.app",
  messagingSenderId: "327759130538",
  appId: "1:327759130538:web:5ad60935539afb202c05d3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
