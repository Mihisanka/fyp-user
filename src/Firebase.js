// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth }  from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyC2NQe9YIiKk8qipxrCxPlZkfNfogBePKI",
//   authDomain: "car-parking-f9338.firebaseapp.com",
//   databaseURL: "https://car-parking-f9338-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "car-parking-f9338",
//   storageBucket: "car-parking-f9338.appspot.com",
//   messagingSenderId: "357367526616",
//   appId: "1:357367526616:web:06ea12c1bc80944a6053ad",
//   measurementId: "G-PQBQEN12BG"
// };


// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// const auth = getAuth(app);


import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth }  from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2NQe9YIiKk8qipxrCxPlZkfNfogBePKI",
  authDomain: "car-parking-f9338.firebaseapp.com",
  databaseURL: "https://car-parking-f9338-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "car-parking-f9338",
  storageBucket: "car-parking-f9338.appspot.com",
  messagingSenderId: "357367526616",
  appId: "1:357367526616:web:053d086329e490a16053ad",
  measurementId: "G-TBK0FF4ZJX"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export const database= getAuth (app)