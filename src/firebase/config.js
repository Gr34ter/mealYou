import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "meal-planner-170c5.firebaseapp.com",
  projectId: "meal-planner-170c5",
  storageBucket: "meal-planner-170c5.appspot.com",
  messagingSenderId: "732508360182",
  appId: process.env.REACT_APP_APP_ID,
};

//   init firebase app
const app = initializeApp(firebaseConfig);

// init firebase authantication
const auth = getAuth(app);

// init firebase firestore data base
const db = getFirestore(app);

export { db, app, auth };
