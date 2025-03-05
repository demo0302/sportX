import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHG2mY4kEwkyQOjL5pDGMq9dGuRRzw_tg",
  authDomain: "sportxdb.firebaseapp.com",
  projectId: "sportxdb",
  storageBucket: "sportxdb.appspot.com",
  messagingSenderId: "514395565718",
  appId: "1:514395565718:web:e325111db54c05a789dcb7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
