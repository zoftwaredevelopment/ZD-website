// Import necessary modules from Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Define the Firebase configuration object
// Note: These are placeholders. The user needs to replace them with actual values from their Firebase project console.
const firebaseConfig = {
  apiKey: "AIzaSyBJBdei6CiONuB71Iy_jQ59dFF1N09AG1g",
  authDomain: "ecotrust-ledger-94c6a.firebaseapp.com",
  projectId: "ecotrust-ledger-94c6a",
  storageBucket: "ecotrust-ledger-94c6a.firebasestorage.app",
  messagingSenderId: "1065570691279",
  appId: "1:1065570691279:web:6627a120a777bfe2e36fba",
  measurementId: "G-1TK6PRSFSC",
};

// Initialize the Firebase app with the provided configuration
const app = initializeApp(firebaseConfig);

// Initialize and export the Firestore database instance
export const db = getFirestore(app);
