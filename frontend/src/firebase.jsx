import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJHAyQN-5lfx5JqfIGaIYsIYNk6lj3cBI",
  authDomain: "brandonrobloxwebsite.firebaseapp.com",
  projectId: "brandonrobloxwebsite",
  storageBucket: "brandonrobloxwebsite.firebasestorage.app",
  messagingSenderId: "592942644700",
  appId: "1:592942644700:web:ede382d3745421b337e319",
  measurementId: "G-P3359Z26ME"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)