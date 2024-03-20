import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./styles/Navbar.css";
import profileImg from "../component/Assets/profile-02.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Park Cloud</Link>
      </div>

      <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
        <ul>
          <li>
            <NavLink exact to="/" activeClassName="active-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/booking" activeClassName="active-link">
              Booking
            </NavLink>
          </li>
          <li>
          <NavLink to="/service" activeClassName="active-link">
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="active-link">
              About
            </NavLink>
          </li>
          <li className="profile">
            <NavLink to="/login" activeClassName="active-link">
            <img src={profileImg} alt="" />
            </NavLink>
          </li>
        </ul>
        {/* <div className="menu-icon" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
