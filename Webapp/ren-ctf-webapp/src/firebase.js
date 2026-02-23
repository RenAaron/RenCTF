// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { firebaseConfig } from "./fake_env.js" // comment this out and replace below wit ur stuff

// const firebaseConfig = {

//     apiKey: "YOUR_apiKey",
  
//     authDomain: "YOUR_authDomain",
  
//     projectId: "YOUR_projectId",
  
//     storageBucket: "YOUR_storageBucket",
  
//     messagingSenderId: "YOUR_messagingSenderId",
  
//     appId: "YOUR_appId",
  
//     measurementId: "YOUR_measurementId"
  
//   };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
