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
  appId: "1:357367526616:web:8323c7cfedb9ead16053ad",
  measurementId: "G-7Y6Q2PVFZG",
 // measurementId: "G-48XWCTC9Z1",
};

// Second configuration
const firebaseConfig2 = {
  apiKey: "AIzaSyCpkZHS43f4Pb7AQyudXqPl6y5zZSprlOM",
  authDomain: "user-new-99fd6.firebaseapp.com",
  projectId: "user-new-99fd6",
  storageBucket: "user-new-99fd6.appspot.com",
  messagingSenderId: "316646780081",
  appId: "1:316646780081:web:6b17d683a39d9b3a5c4690",
  measurementId: "G-JJ0BC0LDED"
  /////////////////////////////////////////////////////////////////
  // apiKey: "AIzaSyDrAzuzBn7smq9wmY5LHiJ4GOFiQM99owQ",
  // authDomain: "fyp-user-user.firebaseapp.com",
  // projectId: "fyp-user-user",
  // storageBucket: "fyp-user-user.appspot.com",
  // messagingSenderId: "708508861343",
  // appId: "1:708508861343:web:3a3ee7951d24ef653433aa",
  //////////////////////////////////////////////////////////////
  // apiKey: "AIzaSyDw_pxSr9SgcuCTUL7G09YUP5PwuYZaOxw",
  // authDomain: "fyp-user-use.firebaseapp.com",
  // projectId: "fyp-user-use",
  // storageBucket: "fyp-user-use.appspot.com",
  // messagingSenderId: "861234283293",
  // appId: "1:861234283293:web:188189f629b001e38e57f4",
  // measurementId: "G-XJRZBF70Q7"
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
