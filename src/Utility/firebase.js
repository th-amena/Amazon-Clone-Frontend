// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
//get auth is used for authentication purposes

import {getFirestore} from "firebase/firestore";
//needed to use the firestore db

import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyCF_Zwc-YDGNtahlZg8ac6aiUBLTE2D3fI",
   authDomain: "clone-2f73e.firebaseapp.com",
   projectId: "clone-2f73e",
   storageBucket: "clone-2f73e.appspot.com",
   messagingSenderId: "88029953913",
   appId: "1:88029953913:web:3d5680548702af0b9eb9a8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

