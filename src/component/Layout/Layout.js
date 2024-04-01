import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../Navbar";
import HomePage from "../HomePage";
import AboutPage from "../AboutPage";
import LocationSearchPage from "../LocationSearchPage";
import Login from "../Login";
import Services from "../Service";
import ParkLot from "../ParkLot";
import Registration from "../Registration";
import Booking from "../BookingPage";

function Layout() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/location-search" element={<LocationSearchPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/service" element={<Services />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/park-lot" element={<ParkLot />} />
          <Route path="/booking/:user" element={<Booking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Layout;
