import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWnZ82SS81gKxDYjuzyZWid4E1LGJ_zNw",
  authDomain: "hackathon-fd326.firebaseapp.com",
  projectId: "hackathon-fd326",
  storageBucket: "hackathon-fd326.appspot.com",
  messagingSenderId: "753760336430",
  appId: "1:753760336430:web:6141c41ba885c31188bdbf",
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);