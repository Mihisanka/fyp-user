

// // import { initializeApp } from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// // import { getAuth }  from "firebase/auth";
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';

// const firebaseConfig = {
//   // apiKey: "AIzaSyBs5xY58LqMt8j3dTDYhro7reNIbeD_Rdw",
//   // authDomain: "user-fyp-5987b.firebaseapp.com",
//   // projectId: "user-fyp-5987b",
//   // storageBucket: "user-fyp-5987b.appspot.com",
//   // messagingSenderId: "820823722560",
//   // appId: "1:820823722560:web:ede50a6beb83aef84c2da5"
//   apiKey: "AIzaSyDrAzuzBn7smq9wmY5LHiJ4GOFiQM99owQ",
//   authDomain: "fyp-user-user.firebaseapp.com",
//   projectId: "fyp-user-user",
//   storageBucket: "fyp-user-user.appspot.com",
//   messagingSenderId: "708508861343",
//   appId: "1:708508861343:web:3a3ee7951d24ef653433aa"
// };


// // const app = initializeApp(firebaseConfig);
// const app = firebase. initializeApp(firebaseConfig);
// export const db = app.firestore();
// // export const analytics = getAnalytics(app);
// // export const auth = getAuth(app);


import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, remove, set } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// First configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2NQe9YIiKk8qipxrCxPlZkfNfogBePKI",
  authDomain: "car-parking-f9338.firebaseapp.com",
  databaseURL:
    "https://car-parking-f9338-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "car-parking-f9338",
  storageBucket: "car-parking-f9338.appspot.com",
  messagingSenderId: "357367526616",
  appId: "1:357367526616:web:461c0dca8edf47f36053ad",
  measurementId: "G-48XWCTC9Z1",
};

// Second configuration
const firebaseConfig2 = {
  apiKey: "AIzaSyDrAzuzBn7smq9wmY5LHiJ4GOFiQM99owQ",
  authDomain: "fyp-user-user.firebaseapp.com",
  projectId: "fyp-user-user",
  storageBucket: "fyp-user-user.appspot.com",
  messagingSenderId: "708508861343",
  appId: "1:708508861343:web:3a3ee7951d24ef653433aa",
};

// Initialize Firebase apps with unique names
const app1 = initializeApp(firebaseConfig, "app1"); // Provide unique name 'app1'
const app2 = initializeApp(firebaseConfig2, "app2"); // Provide unique name 'app2'

// Export databases and storage
export const db1 = getDatabase(app1);
export const db2 = getFirestore(app2);
export const storage1 = getStorage(app1);
export const storage2 = getStorage(app2);

// Define the 'off' function
export const off = (ref, callback) => {
  // Implement your logic for unsubscribing from realtime updates here
};

// Export database functions
export { ref, onValue, set, remove };
