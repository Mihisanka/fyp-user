

import React, { useState } from "react";
import "./styles/Login.css";
import { Link } from 'react-router-dom';
import { db } from '../FirebaseConfig/Firebase';
import { getDocs, collection, where, query } from 'firebase/firestore';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const dbref = collection(db, "Auth");
    try {
      const emailMatch = query(dbref, where('Email', '==', email));
      const passwordMatch = query(dbref, where('Password', '==', password));
      const emailSnapshot = await getDocs(emailMatch);
      const emailArray = await emailSnapshot.docs.map((doc) => doc.data());
      const passwordSnapshot = await getDocs(passwordMatch);
      const passwordArray = passwordSnapshot.docs.map((doc) => doc.data());

      if (emailArray.length > 0 && passwordArray.length > 0) {
        alert('Login successful');
       
      } else {
        alert('invalid user name  password');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  return (
    <div className="container">
      <div className="form">
        <h2>Login</h2>
        <div className="box">
          <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <div className="box">
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <p>Don't have an account? <Link to='/registration'>Sign Up</Link> </p>
        <button onClick={login}>SignIn</button>
      </div>
    </div>
  );
};

export default  Login;




