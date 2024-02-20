import React from 'react';
import './styles/Service.css'; // Import your CSS file directly without assigning it to a variable

const ServiceCard = ({ iconClass, title, description }) => {
    return (
        <div className="card">
            <i className={iconClass}></i>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
};

const Services = () => {
    return (
        <div className="wrapper">
            <h1>Our Services</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse amet illo eos eligendi nobis nam aspernatur placeat.</p>
            <div className="content-box">
                <ServiceCard iconClass="bx bx-bar-chart-alt bx-md" title="Marketing Services" description="Marketing services can include advertising, public relations, market research, and more." />
                <ServiceCard iconClass="bx bx-laptop bx-md" title="Website Development" description="Web development refers to the creating, building, and maintaining of websites." />
                <ServiceCard iconClass="bx bx-user bx-md" title="24/7 Call Center Services" description="A BPO call center is a team of outsourced agents who handle incoming and outgoing." />
                <ServiceCard iconClass="bx bx-mail-send bx-md" title="Social Media Marketing" description="Iure ad fuga, voluptas nisi odit blanditiis aut culpa quasi. Expedita deleniti molestias hic numquam delectus!" />
                <ServiceCard iconClass="bx bx-bar-chart-alt bx-md" title="Corporate Business" description="Iure ad fuga, voluptas nisi odit blanditiis aut culpa quasi. Expedita deleniti molestias hic numquam delectus!" />
                <ServiceCard iconClass="bx bx-paint bx-md" title="Creative Consultancy" description="Iure ad fuga, voluptas nisi odit blanditiis aut culpa quasi. Expedita deleniti molestias hic numquam delectus!" />
            </div>
        </div>
    );
};

export default Services;
