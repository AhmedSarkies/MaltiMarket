import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBA7ZeQCogWvpmKAghqj2wgFyoK9BS1i_w",
  authDomain: "maltimarket-bf62d.firebaseapp.com",
  projectId: "maltimarket-bf62d",
  storageBucket: "maltimarket-bf62d.appspot.com",
  messagingSenderId: "829658027881",
  appId: "1:829658027881:web:45e0eb0ad0c4ab0aa38ff8",
  measurementId: "G-J36MLJ5GVZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;