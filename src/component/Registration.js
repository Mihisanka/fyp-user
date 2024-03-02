
import React, { useState } from "react";
import {db} from '../FirebaseConfig/Firebase';
import './styles/Login.css';
import {Link} from 'react-router-dom';
import {getDocs, addDoc ,collection,where,query} from  'firebase/firestore';

const  Registration = () => {

  const[name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehiclenumber, setVehicleNumber] = useState("");
  const[phoneNumber,setPhoneNumber]=useState('');
  const dbref =collection(db,"Auth")
  const registration = async ()=>{
    await addDoc (dbref,{Name:name,Email:email,Password:password,Vehiclenumber:vehiclenumber,Phonenumber: phoneNumber})
  }

  return(
    <div className="container">
      <div className=" form ">
        <h2>Registration</h2>
        <div className="box">
          <input  type="text" placeholder="Name" onChange={(e) =>setName(e.target.value)}></input>
        </div>
        <div className="box">
          <input  type="email" placeholder="Email" onChange={(e) =>setEmail(e.target.value)}></input>
        </div>
        <div className="box">
          <input  type="password" placeholder="password"onChange={(e) =>  setPassword (e.target.value)} ></input>
        </div>
        <div className="box">
          <input  type="number" placeholder="vehicle number" onChange={(e) =>  setVehicleNumber (e.target.value)}></input>
        </div>
        <div className="box">
          <input  type="number" placeholder="Phone Number" onChange={(e) =>setPhoneNumber(e.target.value)}></input>
        </div>
        
        
        <p>Already Have an account <Link to ='/login'>Sign in </Link> </p>
        <button onClick={registration}>SignUp</button>
      </div>
    </div>
  )
}

export default Registration;
