
import React from 'react';
import './styles/Home.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

// import Services from './Service';
// import AboutPage from './AboutPage';
// import ContactForm from './ContactForm';
//import BookingPage from  './BookingPage'
//import Footer from './Footer';

function HomePage() {
  return (
    <><div className="home-background">
      <div className='container-home'>
        <div className="homepage">
          <div className="home-heading">
            <h4>Park Cloud</h4>
          </div>
            <div className="home-sub-heading">
              <p style={{ color: "black" }}>
                <b>Your trusted destination for hassle-free parking solutions.</b>
                <Link to="/login">
                  {/* <button className='hb'>Booking</button> */}
                    <Button variant="contained" disableElevation>
                     Book now
                    </Button>
                </Link>
              </p>
            </div>
        </div>
      </div>

      </div>  

          {/* <>
          <Services/>
          </> */}
          {/* <>
          <BookingPage/>
          </> */}
          {/* <>
          <AboutPage/>
          </> */}
          {/* <>
          <ContactForm/>
          </> */}
          <>
          <Footer/>
          </>
        
    </>
  );
}

export default HomePage;


