import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth"; // Add this import
import AsyncStorage from "@react-native-async-storage/async-storage"; // Add this import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCp2WNQfO7jw-oZ49DqbOnO2ZLO1F49uWA",
  authDomain: "time-2-train.firebaseapp.com",
  projectId: "time-2-train",
  storageBucket: "time-2-train.appspot.com",
  messagingSenderId: "845446958839",
  appId: "1:845446958839:web:9ab401efe603d287304df2",
  measurementId: "G-0N7FZEP1ZQ", // Optional if you're not using analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // Add this line
});

export { app, auth }; // Export the initialized app and auth
