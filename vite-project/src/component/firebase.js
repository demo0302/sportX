// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjdx-kpONDBjsE1vvhY9I9KmaHi96g5UI",
  authDomain: "sportx-2216.firebaseapp.com",
  projectId: "sportx-2216",
  storageBucket: "sportx-2216.firebasestorage.app",
  messagingSenderId: "1008229689331",
  appId: "1:1008229689331:web:0f94a024df7fafedaf1486",
  measurementId: "G-C1PDP52M6Y"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;