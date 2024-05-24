import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function Services() {

const [service_Id, setId] = useState("");
const [service_Name, setServiceName] = useState("");
const [description, setDescription] = useState("");
const [price, setPrice] = useState("");
const [services, setUsers] = useState([]);
const navigate = useNavigate();
 
  useEffect(() => {
    (async () => await Load())();
  }, []);
 
   async function Load() {    
    const result = await axios.get("https://localhost:7010/api/Services");
    setUsers(result.data);
    console.log(result.data);
  }
 

return (
    <div>
      <Navbar/>
      <h1 style={{ fontFamily: 'Georgia', fontSize: '36px', textAlign: 'center'  }}>Services</h1>
      <div className="container mt-4">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {services.map(service => (
            <div className="col">
              <div className="card h-100 " >
                <img src="https://fresho.qa/wp-content/uploads/2023/09/20230918131229_fpdl.in_set-cleaning-service-man-with-different-equipment-male-janitor-cartoon-character_338371-.webp" className="card-img-top" alt="Service"/>
                <div className="card-body">
                  <h5 className="card-title" style={{ fontFamily: 'Georgia' }}>{service.service_Name}</h5>
                  <p className="card-text" style={{ fontFamily: 'Georgia' }}>{service.description}</p>
                  <p className="card-text" style={{ fontFamily: 'Georgia' }}>Price: {service.price}</p>
                  <button
                    onClick={() => navigate('/booking')}
                    className="btn btn-primary"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Services;