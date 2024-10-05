import { initializeApp, getApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
// import Config from "react-native-config";
// console.log("Firebase API Key: ", Config.Test);

const firebaseConfig = {
  apiKey: "AIzaSyCp2WNQfO7jw-oZ49DqbOnO2ZLO1F49uWA",
  authDomain: "time-2-train.firebaseapp.com",
  projectId: "time-2-train",
  storageBucket: "time-2-train.appspot.com",
  messagingSenderId: "845446958839",
  appId: "1:845446958839:web:9ab401efe603d287304df2",
  measurementId: "G-0N7FZEP1ZQ", // Optional if you're not using analytics
};

let app;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  console.log("Firebase app initialized.");
} else {
  app = getApp();
  console.log("Using existing Firebase app.");
}

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { app, auth, db };
