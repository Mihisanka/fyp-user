import React, { useState } from "react";
import "./styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { db2 } from "../FirebaseConfig/Firebase";
import { getDocs, collection, where, query } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const login = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const db2ref = collection(db2, "Auth");
    try {
      const emailMatch = query(db2ref, where("Email", "==", email));
      const passwordMatch = query(db2ref, where("Password", "==", password));
      const emailSnapshot = await getDocs(emailMatch);
      const emailArray = await emailSnapshot.docs.map((doc) => doc.data());
      const passwordSnapshot = await getDocs(passwordMatch);
      const passwordArray = passwordSnapshot.docs.map((doc) => doc.data());

      if (emailArray.length > 0 && passwordArray.length > 0) {
        alert("Login successful");
        // Pass email as a parameter to the Booking component
        navigate(
          `/booking/${encodeURIComponent(email)}?user=${encodeURIComponent(
            JSON.stringify({ email })
          )}`
        );
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="body">
      <div className="container">
        <form>
          <div className="head">
            <span>Sign up</span>
            <p>Create a free account with your email.</p>
          </div>
          <div className="inputs">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            ></input>
          </div>
          <div className="inputs">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <button onClick={login}>SignIn</button>
        </form>
        <div className="form-footer">
          <p>
            Don't have an account? <Link to="/registration">Sign Up</Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
