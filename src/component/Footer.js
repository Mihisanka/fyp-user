import React from 'react';
import './styles/Footer.css';
import { Link } from 'react-router-dom'; // Import your CSS file

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container-footer">
                <div className="row">
                    <div className="footer-col">
                        <h4>Park Cloud </h4>
                        <ul>
                            <li><a href="/">Home </a></li>
                            <li><a href="service">our services</a></li>
                            <li><a href="about">About us </a></li>
                            <li><a href="registration">Registration</a></li>
                        </ul>
                    </div>

                    {/* <div className="footer-col">
                        <h4>get help</h4>
                        <ul>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">shipping</a></li>
                            <li><a href="#">returns</a></li>
                          {/*<li><a href="#">order status</a></li>
                            <li><a href="#">payment options</a></li>
                            }
                        </ul>
                    </div> */}
                    
                    <div className="footer-col">
                        <h4>Info</h4>
                        <ul>
                            <li><a href="#">watch</a></li>
                            <li><a href="#">bag</a></li>
                            <li><a href="#">shoes</a></li>
                            <li><a href="#">dress</a></li>
                        </ul>
                    </div>

                    {/* <div className="footer-col">
                        <h4>follow us</h4>
                        <div className="social-links">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div> */}


                </div>
            </div>
        </footer>
    );
};

export default Footer;
