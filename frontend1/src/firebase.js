import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQ8WvXGcQ8nOfnW0Aw8XRIkArvRir38f8",
  authDomain: "facctum-28457.firebaseapp.com",
  projectId: "facctum-28457",
  storageBucket: "facctum-28457.appspot.com",
  messagingSenderId: "671483496236",
  appId: "1:671483496236:web:80ed85f57154331614ce89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)