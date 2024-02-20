import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Route component
import Navbar from './component/Navbar';
import HomePage from './component/HomePage';
import AboutPage from './component/AboutPage';
import BookingPage from './component/BookingPage';
import LocationSearchPage from './component/LocationSearchPage';

function App() {
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

export default App;
