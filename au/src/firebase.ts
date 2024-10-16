import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAAkxzxWxtyePdlXCsvycrvEPxfujHKbOQ",
  authDomain: "login-8de7a.firebaseapp.com",
  projectId: "login-8de7a",
  storageBucket: "login-8de7a.appspot.com",
  messagingSenderId: "80261281327",
  appId: "1:80261281327:web:ea21bb4a669878e424f8da",
  measurementId: "G-MY8C5PTYT4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);
