import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyClWqtc2ySs6sYkbodYUntuzhcud_OjvaQ",
  authDomain: "recipe-planner-d5be4.firebaseapp.com",
  projectId: "recipe-planner-d5be4",
  storageBucket: "recipe-planner-d5be4.firebasestorage.app",
  messagingSenderId: "821502643804",
  appId: "1:821502643804:web:273c9c827a2c3b24a56099",
  measurementId: "G-6GCF6BEGNG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
