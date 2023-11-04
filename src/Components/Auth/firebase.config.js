// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDJ85x5jv5RjyeIHKKBvkzA5NeNaN-VQak",
    authDomain: "clothloop-auth.firebaseapp.com",
    projectId: "clothloop-auth",
    storageBucket: "clothloop-auth.appspot.com",
    messagingSenderId: "553851683580",
    appId: "1:553851683580:web:1aecff75d144fa6fbc0d79",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
