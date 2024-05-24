import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Booking.css';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function Booking() {
  const date = new Date();

  const [services, setService] = useState([]);
  const [slots, setSlots] = useState([]);
  const [info, setInfo] = useState({
    reg_Id: localStorage.getItem('userid'),
    booked_Date: date,
  });

  useEffect(() => {
    const getServices = async () => {
      const res = await axios.get('https://localhost:7010/api/Services');
      setService(res.data);
    };
    getServices();
  }, []);

  useEffect(() => {
    const getSlots = async () => {
      const res = await axios.get('https://localhost:7010/api/Slots');
      setSlots(res.data);
    };
    getSlots();
  }, []);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://localhost:7010/api/Bookings', info);
      console.log(res.data);
      alert('Booked successfully!');
    } catch (e) {
      alert(e.response.data.title);
    }
  };

  return (
    <>
    <Navbar />
    <div className="booking-container">
      
      <div className="booking-form-container">
      <h1 className="booking-title">Book a Slot</h1>
      
        <form className="booking-form">
          <div className="booking-form-group">
            <label className="booking-form-label">Booking Date:</label>
            <input type="date" name="booking_Date" className="booking-form-control" onChange={handleChange} />
          </div>
          <div className="booking-form-group">
            <label className="booking-form-label">Service:</label>
            <select name="service_Id" className="booking-form-control" onChange={handleChange}>
              <option value="">Select</option>
              {services.map((item, index) => (
                <option key={index} value={item.service_Id}>
                  {item.service_Name}
                </option>
              ))}
            </select>
          </div>
          <div className="booking-form-group">
            <label className="booking-form-label">Slot:</label>
            <select name="slot_Id" className="booking-form-control" onChange={handleChange}>
              <option value="">Select</option>
              {slots.map((item, index) => (
                <option key={index} value={item.slot_Id}>
                  {item.time}
                </option>
              ))}
            </select>
          </div>
          <div className="booking-form-actions">
            <button type="submit" className="booking-submit-btn" onClick={handleSubmit}>
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default Booking;
