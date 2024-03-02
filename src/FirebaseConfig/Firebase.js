

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth }  from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBs5xY58LqMt8j3dTDYhro7reNIbeD_Rdw",
  authDomain: "user-fyp-5987b.firebaseapp.com",
  projectId: "user-fyp-5987b",
  storageBucket: "user-fyp-5987b.appspot.com",
  messagingSenderId: "820823722560",
  appId: "1:820823722560:web:ede50a6beb83aef84c2da5"
};


// const app = initializeApp(firebaseConfig);
const app = firebase. initializeApp(firebaseConfig);
export const db = app.firestore();
// export const analytics = getAnalytics(app);
// export const auth = getAuth(app);
