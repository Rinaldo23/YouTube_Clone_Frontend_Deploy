import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD9EJB6x3-TjDvizzlMp4UBTt6EEmlY9eY",
    authDomain: "clone-678ca.firebaseapp.com",
    projectId: "clone-678ca",
    storageBucket: "clone-678ca.appspot.com",
    messagingSenderId: "953841958081",
    appId: "1:953841958081:web:f6b40b7421ed5e4cbaa840"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;