// Import the functions you need from the SDKs you need
import { Platform } from "react-native";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  inMemoryPersistence,
  GoogleAuthProvider,
  getReactNativePersistence,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCrYZaMJcADomZOR3mLbQ8cElgad0aS-2Q",
  authDomain: "driver-83623.firebaseapp.com",
  projectId: "driver-83623",
  storageBucket: "driver-83623.appspot.com",
  messagingSenderId: "463824073258",
  appId: "1:463824073258:web:0ba394395ce1fdffd28953",
  measurementId: "G-8ML410PDL8",
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);

auth.languageCode = "it";

Platform.OS === "web"
  ? inMemoryPersistence
  : getReactNativePersistence(AsyncStorage);

export { app, analytics, db, auth, googleProvider, storage };
