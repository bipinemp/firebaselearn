import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCLQyFE3UTrH6VSerh_cbFXVOmJ6IAK08o",
  authDomain: "fir-learn-7481a.firebaseapp.com",
  projectId: "fir-learn-7481a",
  storageBucket: "fir-learn-7481a.appspot.com",
  messagingSenderId: "481565657824",
  appId: "1:481565657824:web:83fb2edf5d73c93ad4de85",
  measurementId: "G-72JEVWL302",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
