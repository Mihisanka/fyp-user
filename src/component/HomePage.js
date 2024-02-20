import React from 'react';

import Services from './Service';
import AboutPage from './AboutPage';
import Footer from './Footer';
import ContactForm from './ContactForm';
//import Footer from './Footer';

function HomePage() {
  return (
    <>
      <div className='Home-container'>
        <h1>Home</h1>
        <p>Welcome to the home page! This is a simple example of a Next.js stateless functional component.</p>
        <img src="/static/images/nextjs.png" alt="Next.js logo"/>
        
      </div>

      <>
      <Services/>
      </>
      <>
      <AboutPage/>
      </>
      <>
      <ContactForm/>
      </>

      <>
      <Footer/>
      </>
     
    </>
  );
}

export default HomePage;

