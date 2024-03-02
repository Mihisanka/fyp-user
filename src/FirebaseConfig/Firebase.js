

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth }  from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  // apiKey: "AIzaSyBs5xY58LqMt8j3dTDYhro7reNIbeD_Rdw",
  // authDomain: "user-fyp-5987b.firebaseapp.com",
  // projectId: "user-fyp-5987b",
  // storageBucket: "user-fyp-5987b.appspot.com",
  // messagingSenderId: "820823722560",
  // appId: "1:820823722560:web:ede50a6beb83aef84c2da5"
  apiKey: "AIzaSyDrAzuzBn7smq9wmY5LHiJ4GOFiQM99owQ",
  authDomain: "fyp-user-user.firebaseapp.com",
  projectId: "fyp-user-user",
  storageBucket: "fyp-user-user.appspot.com",
  messagingSenderId: "708508861343",
  appId: "1:708508861343:web:3a3ee7951d24ef653433aa"
};


// const app = initializeApp(firebaseConfig);
const app = firebase. initializeApp(firebaseConfig);
export const db = app.firestore();
// export const analytics = getAnalytics(app);
// export const auth = getAuth(app);
