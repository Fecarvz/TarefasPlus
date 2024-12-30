// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "***********************",
  authDomain: ""***********************",
  projectId: ""***********************",
  storageBucket: ""***********************",
  messagingSenderId: ""***********************",
  appId: ""***********************",
  measurementId: ""***********************"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp)

export {db}
