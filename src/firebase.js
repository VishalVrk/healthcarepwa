// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC4cgroHnb_WrnXAd_iMR8T4OsZNFrvj8w",
  authDomain: "healthcare-54b85.firebaseapp.com",
  projectId: "healthcare-54b85",
  storageBucket: "healthcare-54b85.appspot.com",
  messagingSenderId: "349262987127",
  appId: "1:349262987127:web:0c3a95e534d202661aab72",
  measurementId: "G-3XSRJLGRLK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };