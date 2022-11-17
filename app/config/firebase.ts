import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyBU8UX3o6hg1Pi6_gMWfMDFNjXn4-vyiMg",
  authDomain: "smart-ace27.firebaseapp.com",
  projectId: "smart-ace27",
  storageBucket: "smart-ace27.appspot.com",
  messagingSenderId: "139884937155",
  appId: "1:139884937155:web:7e0b01e4069c673fb1c776",
  measurementId: "G-ZQQ3XKTMXC"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);