import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../Navbar';
import HomePage from '../HomePage';
import AboutPage from '../AboutPage';
import BookingPage from '../BookingPage';
import LocationSearchPage from '../LocationSearchPage';

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
        </Routes>
      </div>
    </Router>
  );
}

export default Layout;
