import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Tambahan import untuk Storage

const firebaseConfig = {
  apiKey: "AIzaSyClWqtc2ySs6sYkbodYUntuzhcud_OjvaQ",
  authDomain: "recipe-planner-d5be4.firebaseapp.com",
  projectId: "recipe-planner-d5be4",
  storageBucket: "recipe-planner-d5be4.firebasestorage.app",
  messagingSenderId: "821502643804",
  appId: "1:821502643804:web:273c9c827a2c3b24a56099",
  measurementId: "G-6GCF6BEGNG"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Export layanan yang digunakan
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Tambahan export untuk Storage
