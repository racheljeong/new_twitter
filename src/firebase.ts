import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqBwcnNdE_vMMlnyykyOAWQuEzKFqqB98",
  authDomain: "new-twitter-81419.firebaseapp.com",
  projectId: "new-twitter-81419",
  storageBucket: "new-twitter-81419.appspot.com",
  messagingSenderId: "997718830210",
  appId: "1:997718830210:web:de840800a2989b3a27d89b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//authentication
export const auth = getAuth(app);