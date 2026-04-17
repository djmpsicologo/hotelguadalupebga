import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyWfi6CRuozC6jl3o1wbr42KV5H1Bv3uw",
  authDomain: "hotelguadalupebga-b9696.firebaseapp.com",
  projectId: "hotelguadalupebga-b9696",
  storageBucket: "hotelguadalupebga-b9696.firebasestorage.app",
  messagingSenderId: "273051343783",
  appId: "1:273051343783:web:6b3079279eb170f5687482",
  measurementId: "G-KZ4P749HSD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
