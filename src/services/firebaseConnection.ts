// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC7k6uUWG97ltsc5uSs9BYPY3O2xUbX57U",
  authDomain: "tarefasplus-3f3c2.firebaseapp.com",
  projectId: "tarefasplus-3f3c2",
  storageBucket: "tarefasplus-3f3c2.firebasestorage.app",
  messagingSenderId: "861249037674",
  appId: "1:861249037674:web:905b779a749f8ff1d93113",
  measurementId: "G-CQQ4LMQ0Z3"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp)

export {db}