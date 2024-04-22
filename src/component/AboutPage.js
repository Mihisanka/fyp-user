
import React from 'react';
import './styles/AboutPage.css';
import Footer from './Footer'; 

const AboutCard = ({ iconClass, title, description }) => {
    return (
        <div className="about-card">
            <i className={iconClass}></i>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
};

const About = () => {
    return (
        <div className="wrapper">
            <h1> About Us</h1>
            <p>Final  year  project 2024</p>
            <div className="content-box">
                <AboutCard iconClass="bx bx-bar-chart-alt bx-md" 
                  title="What is Park Cloud  " 
                  description="This innovative platform not only facilitates seamless parking bookings but also ensures the integrity
                    of reservations through QR code verification, guaranteeing a frictionless parking experience. Catering to the demands
                    of modern-day lifestyles, this solution is a beacon of efficiency, empowering individuals to navigate the urban 
                    sprawl with unparalleled ease. Harnessing the power of predictive analysis and leveraging real-time updates, 
                    our platform equips users with the strategic advantage needed to conquer the perpetual challenge of urban parking, 
                    revolutionizing the way we engage with our surroundings.." 
                />

                <AboutCard iconClass="bx bx-laptop bx-md" 
                  title="Abstract" 
                  description="Our project introduces an innovative web-based parking management platform designed to streamline 
                    parking bookings while upholding reservation integrity through QR code verification, ensuring a seamless parking
                    experience. Tailored to modern lifestyles, our solution stands as a pinnacle of efficiency, empowering individuals
                    to effortlessly navigate urban landscapes. By harnessing predictive analysis and real-time updates, our platform 
                    provides users with a strategic advantage, revolutionizing the way we interact with our surroundings and conquer
                    the perennial challenge of urban parking."
                />

                <AboutCard iconClass="bx bx-user bx-md" 
                  title="24/7  About"
                  description="SmartPark sets a new standard in car park management by leveraging innovative technology to provide 
                    real-time visibility of parking spaces. Its intuitive user interface enhances the overall parking experience and 
                    contributes to smoother traffic flow in urban areas. Through its deployment in densely populated areas, SmartPark 
                    demonstrates its effectiveness in alleviating parking issues and optimizing commute planning for residents and 
                    visitors alike. This groundbreaking solution represents a significant advancement in car park management,
                    promising unparalleled convenience and efficiency for the future of urban mobility." 
                />
              
            </div>
            <Footer/>
        </div>
    );
};

export default About;
