

///////////////////////////////////////////////////////////firbase login //////////////////////////////////////////////////////////////////////////////////////


import React from 'react'
import "./styles/Login.css";
import { Link } from 'react-router-dom';

const App = () => {
    return (
      <div className="container">
        <div className=" form ">
            <h2>Login</h2>
            <div className="box">
              <input  type="text" placeholder="Name"></input>
            </div>
            <div className="box">
              <input  type="password" placeholder="password"></input>
            </div>
              <p>Don't have  Have an account <Link to ='/registration'>Sign UP</Link> </p>
        <button>SignIn</button>
      </div>
    </div>
    );
};

export default App;


///////////////////////////////////////////////////end//////////////////////////////////////////////////////////////////////
