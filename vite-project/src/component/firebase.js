// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Import Firestore functions

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "sportx-2216.firebaseapp.com",
  projectId: "sportx-2216",
  storageBucket: "sportx-2216.appspot.com",  // Corrected storageBucket
  messagingSenderId: "1008229689331",
  appId: "1:1008229689331:web:0f94a024df7fafedaf1486",
  measurementId: "G-C1PDP52M6Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize authentication and Firestore
export const auth = getAuth();
export const db = getFirestore(app);

// Export Firestore functions (addDoc, collection)
export { addDoc, collection };

// Default export for the app
export default app;
