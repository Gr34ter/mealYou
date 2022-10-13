import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC-KAjZkB7hsnHHTFz-eAxCkebaoRKBm8U",
    authDomain: "meal-planner-170c5.firebaseapp.com",
    projectId: "meal-planner-170c5",
    storageBucket: "meal-planner-170c5.appspot.com",
    messagingSenderId: "732508360182",
    appId: "1:732508360182:web:5f261f0182bedff377cbd7"
  };

//   init firebase app
const app = initializeApp(firebaseConfig);

// init firebase authantication
const auth = getAuth(app);

// init firebase firestore data base
const db = getFirestore(app);

export { db, app, auth }