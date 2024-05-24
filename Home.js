
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Homepage.css';
import Footer from './Footer';
import Navigation from './Navigation';


function Home() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    (async () => await loadServices())();
  }, []);

  async function loadServices() {
    const result = await axios.get('https://localhost:7010/api/Services');
    setServices(result.data);
  }

  const handleBookNow = (serviceId) => {
    // Redirect to the registration page
    navigate('/registers');
  };

  return (
    <div className="body-container">
      <Navigation />
      <div className="background-image"></div>
      <div className="content">
        <h1 className="heading">Welcome to HOME HARBOR!</h1>
      </div>
      <div className="home-services-container" id="ser">
        <h1>Our Services</h1>
        <div className="services-box">
          {services.map((service) => (
            <div key={service.service_Id} className="service-card">
              <h1>{service.service_Name}</h1>
              <div className="service-card-body">
                <div className="service-card-body-img">
                  <img src="https://busybeecleaningcompany.com/wp-content/uploads/2023/01/iStock-906777508-e1564417323957.jpg" alt={service.service_Name} />
                  
                </div>
                <div className="service-card-body-content">
                  <p>{service.description}</p>
                  <button onClick={() => handleBookNow(service.service_Id)}>
                    Book Slot
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

