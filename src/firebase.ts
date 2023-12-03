import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCE4e91L5-yAT7-Xk6D83t7xM2tRttxXLs",
  authDomain: "mini-twitter-b71cd.firebaseapp.com",
  projectId: "mini-twitter-b71cd",
  storageBucket: "mini-twitter-b71cd.appspot.com",
  messagingSenderId: "1037281540032",
  appId: "1:1037281540032:web:8e7c298711afebb00b7a25"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);