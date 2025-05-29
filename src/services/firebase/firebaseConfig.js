// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC40PuGg853WL9_E69rStsiuwYcA20sR6w",
  authDomain: "lab-7-c6f3c.firebaseapp.com",
  projectId: "lab-7-c6f3c",
  storageBucket: "lab-7-c6f3c.firebasestorage.app",
  messagingSenderId: "380632723189",
  appId: "1:380632723189:web:94dcae7a4950eab2fadfbc",
  measurementId: "G-RQW1GL35E0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
