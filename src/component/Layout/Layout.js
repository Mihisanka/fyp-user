import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../Navbar';
import HomePage from '../HomePage';
import AboutPage from '../AboutPage';
import BookingPage from '../BookingPage';
import LocationSearchPage from '../LocationSearchPage';
import Login from '../Login';
import Services from '../Service';
import Registration from '../Registration';

function Layout() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/location-search" element={<LocationSearchPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/service" element={<Services />} />
          <Route path="/registration" element={<Registration/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default Layout;
