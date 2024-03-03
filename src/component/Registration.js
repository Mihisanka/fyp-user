
// import React, { useState } from "react";
// import {db} from '../FirebaseConfig/Firebase';
// import './styles/Login.css';
// import {Link} from 'react-router-dom';
// import {getDocs, addDoc ,collection,where,query} from  'firebase/firestore';

// const  Registration = () => {

//   const[name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [vehiclenumber, setVehicleNumber] = useState("");
//   const[phoneNumber,setPhoneNumber]=useState('');
//   const dbref =collection(db,"Auth")
//   const [metch,setMetch] = useState([])
//   const registration = async ()=>{
//     const matchEmail = query(dbref, where("Email", "==", email))
//     try{
//         const snapshot = await  getDocs(matchEmail);
//         const  emailMatchingArray = snapshot.docs.map((doc)=> doc.data());
//         if (emailMatchingArray.length>0)
//         {
//           alert(`This Email is already registered`);
//         }
//          else{
//           await addDoc (dbref,{Name:name,Email:email,Password:password,Vehiclenumber:vehiclenumber,Phonenumber: phoneNumber})
//           }
//     }catch (error) 
//     {
//           alert (error.message);
//     }
   
//    }
    
//   }

//   return(
//     <div className="container">
//       <div className=" form ">
//         <h2>Registration</h2>
//         <div className="box">
//           <input  type="text" placeholder="Name" onChange={(e) =>setName(e.target.value)}></input>
//         </div>
//         <div className="box">
//           <input  type="email" placeholder="Email" onChange={(e) =>setEmail(e.target.value)}></input>
//         </div>
//         <div className="box">
//           <input  type="password" placeholder="password"onChange={(e) =>  setPassword (e.target.value)} ></input>
//         </div>
//         <div className="box">
//           <input  type="number" placeholder="vehicle number" onChange={(e) =>  setVehicleNumber (e.target.value)}></input>
//         </div>
//         <div className="box">
//           <input  type="number" placeholder="Phone Number" onChange={(e) =>setPhoneNumber(e.target.value)}></input>
//         </div>
        
        
//         <p>Already Have an account <Link to ='/login'>Sign in </Link> </p>
//         <button onClick={registration}>SignUp</button>
//       </div>
//     </div>
//   )
// }

// export default Registration;



import React, { useState } from "react";
import { db } from '../FirebaseConfig/Firebase';
import './styles/Registration.css';
import { Link } from 'react-router-dom';
import { getDocs, addDoc, collection, where, query } from 'firebase/firestore';

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehiclenumber, setVehicleNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('');
  const dbref = collection(db, "Auth");
  const [metch, setMetch] = useState([]);

  const registration = async () => {
    const matchEmail = query(dbref, where("Email", "==", email));
    try {
      const snapshot = await getDocs(matchEmail);
      const emailMatchingArray = snapshot.docs.map((doc) => doc.data());
      if (emailMatchingArray.length > 0) {
        alert(`This Email is already registered`);
      } else {
        await addDoc(dbref, { Name: name, Email: email, Password: password, Vehiclenumber: vehiclenumber, Phonenumber: phoneNumber });
        alert ("Registration successful")
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="container">
  
            <div className="head">
              <h2>Registration</h2>
              <div className="inputs">
                <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}></input>
              </div>
              <div className="inputs">
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
              </div>
              <div className="inputs">
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}></input>
              </div>
              <div className="inputs">
                <input type="number" placeholder="vehicle number" onChange={(e) => setVehicleNumber(e.target.value)}></input>
              </div>
              <div className="inputs">
                <input type="number" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)}></input>
              </div>
              <button onClick={registration}>SignUp</button>
              <div class="form-footer">
            
            <p>Already Have an account <Link to='/login'>Sign in </Link> </p>
            </div>
            </div>
{/* 
            <form>
                <div class="head">
                    <span>Registration</span>
                    <p>Create a free account with your email.</p>
                </div>
                <div class="inputs">
                <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}></input>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                <input type="number" placeholder="vehicle number" onChange={(e) => setVehicleNumber(e.target.value)}></input>
                 <input type="number" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)}></input>
                </div>
                <button onClick={registration}>SignUp</button>
            </form>
            <div class="form-footer">
            
            <p>Already Have an account <Link to='/login'>Sign in </Link> </p>
            </div> */}


    </div>
  );
}

export default Registration;
