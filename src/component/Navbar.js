// NavBar.js
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./styles/Navbar.css";

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
            <NavLink to="/" activeClassName="active-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/booking" activeClassName="active-link">
              Booking Us{" "}
            </NavLink>
          </li>
          <li>
            <NavLink to="/location-search" activeClassName="active-link">
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="active-link">
              About
            </NavLink>
          </li>
        </ul>
        <div className="menu-icon" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>

      {/* <div className="user-menu">
        <div className="menu-item">Profile</div>
        <div className="menu-item">Account</div>
        <div className="menu-item">Dashboard</div>
        <div className="menu-item">Logout</div>
      </div> */}
    </nav>
  );
};

export default Navbar;
