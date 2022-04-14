// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2yiELLWWgNoFSvb90thNcFyPTifqtiBQ",
  authDomain: "genius-car-service-27316.firebaseapp.com",
  projectId: "genius-car-service-27316",
  storageBucket: "genius-car-service-27316.appspot.com",
  messagingSenderId: "722134636869",
  appId: "1:722134636869:web:4f56880f89b2ee890a062c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
