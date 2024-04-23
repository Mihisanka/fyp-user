import React, { useState } from "react";
import { db2 } from "../FirebaseConfig/Firebase";
import "./styles/Registration.css";
import { Link, useNavigate } from "react-router-dom";
import { getDocs, addDoc, collection, where, query } from "firebase/firestore";
import Button from "@mui/material/Button";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehiclenumber, setVehicleNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const db2ref = collection(db2, "Auth");
  const [metch, setMetch] = useState([]);
  const navigate = useNavigate();

  const registration = async () => {
    const matchEmail = query(db2ref, where("Email", "==", email));
    try {
      const snapshot = await getDocs(matchEmail);
      const emailMatchingArray = snapshot.docs.map((doc) => doc.data());
      if (emailMatchingArray.length > 0) {
        alert(`This Email is already registered`);
      } else {
        await addDoc(db2ref, {
          Name: name,
          Email: email,
          Password: password,
          Vehiclenumber: vehiclenumber,
          Phonenumber: phoneNumber,
        });
        alert("Registration successful");
        window.location.href = "/login";
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <center>
        <div className="head">
          <h2>Registration</h2>
          <div className="inputs">
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="inputs">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="inputs">
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="inputs">
            <input
              type="number"
              placeholder="vehicle number"
              onChange={(e) => setVehicleNumber(e.target.value)}
            ></input>
          </div>
          <div className="inputs">
            <input
              type="number"
              placeholder="Phone Number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></input>
          </div>
          {/* <button onClick={registration}>SignUp</button> */}
          <Button onClick={registration} variant="contained" disableElevation>
            SignUp
          </Button>
          <div class="form-footer">
            <p>
              Already Have an account <Link to="/login">Sign in </Link>{" "}
            </p>
          </div>
        </div>
      </center>
    </div>
  );
};

export default Registration;
