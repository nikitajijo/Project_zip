import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './Services.css'; // Import the custom CSS file

function Services() {
  const [service_Id, setId] = useState('');
  const [service_Name, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [services, setServices] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get('https://localhost:7010/api/Services');
    setServices(result.data);
    console.log(result.data);
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post('https://localhost:7010/api/Services', {
        service_Name: service_Name,
        description: description,
        price: price,
      });
      alert('Service is Added Successfully');
      setId('');
      setServiceName('');
      setDescription('');
      setPrice('');
      Load();
    } catch (err) {
      alert(err);
    }
  }

  async function editService(service) {
    setServiceName(service.service_Name);
    setDescription(service.description);
    setPrice(service.price);
    setId(service.service_Id);
  }

  async function DeleteService(id) {
    await axios.delete('https://localhost:7010/api/Services/' + id);
    alert('Service deleted Successfully');
    setId('');
    setServiceName('');
    setDescription('');
    setPrice('');
    Load();
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.put('https://localhost:7010/api/Services/' + service_Id, {
        service_Id: service_Id,
        service_Name: service_Name,
        description: description,
        price: price,
      });
      alert('Service Updated');
      setId('');
      setServiceName('');
      setDescription('');
      setPrice('');
      Load();
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className="services-container">
      <Navbar />
      <div className="services-content">
        <h1 className="services-title">Home Services</h1>
        <div className="services-form">
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="service_Id"
                hidden
                value={service_Id}
                onChange={(event) => {
                  setId(event.target.value);
                }}
              />
              <label htmlFor="service_Name">Service Name</label>
              <input
                type="text"
                className="form-control"
                id="service_Name"
                value={service_Name}
                onChange={(event) => {
                  setServiceName(event.target.value);
                }}
              />
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
              <label htmlFor="price">Price</label>
              <input
                type="text"
                className="form-control"
                id="price"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </div>
            <div className="form-buttons">
              <button className="btn btn-primary" onClick={save}>
                Add
              </button>
              <button className="btn btn-warning" onClick={update}>
                Update
              </button>
            </div>
          </form>
        </div>
        <div className="services-cards">
          {services.map((service) => (
            <div key={service.service_Id} className="card">
              <h5 className="card-header">Service</h5>
              <div className="card-body">
                <h5 className="card-title">{service.service_Name}</h5>
                <p className="card-text">{service.description}</p>
                <p className="card-text">Price: <strong>{service.price}</strong></p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-outline-warning"
                  onClick={() => editService(service)}
                >
                  <i className="bi bi-pen-fill"></i> Edit
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => DeleteService(service.service_Id)}
                >
                  <i className="bi bi-trash-fill"></i> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;