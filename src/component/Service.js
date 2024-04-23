import React from 'react';
import './styles/Service.css';
import Footer from './Footer'; 

const ServiceCard = ({ iconClass, title, description }) => {
    return (
        <div className="service-card">
            <i className={iconClass}></i>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
};

const Services = () => {
    return (<>
        <div className="wrapper">
            <h1>Our Services</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse amet illo eos eligendi nobis nam aspernatur placeat.</p>
            <div className="content-box">
                <ServiceCard iconClass="bx bx-bar-chart-alt bx-md" title="Real time tracking " description="Marketing services can include advertising, public relations, market research, and more." />
                <ServiceCard iconClass="bx bx-laptop bx-md" title="Providing nearest carpark " description="Web development refers to the creating, building, and maintaining of websites." />
                <ServiceCard iconClass="bx bx-user bx-md" title="24/7  Services" description="A BPO call center is a team of outsourced agents who handle incoming and outgoing." />
                <ServiceCard iconClass="bx bx-mail-send bx-md" title="Check availability " description="Iure ad fuga, voluptas nisi odit blanditiis aut culpa quasi. Expedita deleniti molestias hic numquam delectus!" />
                <ServiceCard iconClass="bx bx-bar-chart-alt bx-md" title="Most selected carking " description="Iure ad fuga, voluptas nisi odit blanditiis aut culpa quasi. Expedita deleniti molestias hic numquam delectus!" />
                <ServiceCard iconClass="bx bx-paint bx-md" title="Predictive analysis of parking slot utilization" description="Iure ad fuga, voluptas nisi odit blanditiis aut culpa quasi. Expedita deleniti molestias hic numquam delectus!" />
            </div>
            
        </div>
        <Footer/>
         </>
    );
};

export default Services;
