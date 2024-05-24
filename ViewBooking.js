// import axios from "axios";
// import { useEffect, useState } from "react";
// import Navbar from './Navbar';
// import './ViewBooking.css'; // Import the custom CSS file

// function ViewBooking() {
//   const [booking_Id, setId] = useState("");
//   const [service_Id, setServiceId] = useState("");
//   const [reg_Id, setRegId] = useState("");
//   const [slot_Id, setSlotId] = useState("");
//   const [booking_Date, setBookingDate] = useState("");
//   const [booked_Date, setBookedDate] = useState("");
//   const [bookings, setUsers] = useState([]);

//   useEffect(() => {
//     (async () => await Load())();
//   }, []);

//   async function Load() {
//     const result = await axios.get("https://localhost:7010/api/Bookings");
//     setUsers(result.data);
//     console.log(result.data);
//   }

//   async function DeleteCategory(id) {
//     await axios.delete("https://localhost:7010/api/Bookings/" + id);
//     alert("Booking deleted Successfully");

//     setId("");
//     setServiceId("");
//     setRegId("");
//     setSlotId("");
//     setBookingDate("");
//     setBookedDate("");

//     Load();
//   }

//   async function update(event) {
//     event.preventDefault();
//     try {
//       await axios.put(`https://localhost:7010/api/Bookings/${booking_Id}`, {
//         booking_Id: booking_Id,
//         service_Id: service_Id,
//         reg_Id: reg_Id,
//         slot_Id: slot_Id,
//         booking_Date: booking_Date,
//         booked_Date: booked_Date
//       });
//       alert("Booking Updated");
//       setId("");
//       setServiceId("");
//       setRegId("");
//       setSlotId("");
//       setBookingDate("");
//       setBookedDate("");

//       Load();
//     } catch (err) {
//       alert(err);
//     }
//   }

//   return (
//     <div className="view-booking-container">
//       <Navbar />
//       <div className="view-booking-content">
//         <h1 className="view-booking-title">Booking Details</h1>
//         <table className="view-booking-table">
//           <thead>
//             <tr>
//               <th>Booking Id</th>
//               <th>Service Id</th>
//               <th>Reg Id</th>
//               <th>Slot Id</th>
//               <th>Booking Date</th>
//               <th>Booked Date</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map(function fn(booking) {
//               return (
//                 <tr key={booking.booking_Id}>
//                   <td>{booking.booking_Id}</td>
//                   <td>{booking.service_Id}</td>
//                   <td>{booking.reg_Id}</td>
//                   <td>{booking.slot_Id}</td>
//                   <td>{booking.booking_Date}</td>
//                   <td>{booking.booked_Date}</td>
//                   <td>
//                     <button
//                       type="button"
//                       className="btn btn-danger"
//                       onClick={() => DeleteCategory(booking.booking_Id)}
//                     >
//                       <i class="bi bi-trash-fill"></i>Delete
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default ViewBooking;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './ViewBooking.css';

function ViewBooking() {
  const [booking_Id, setId] = useState('');
  const [service_Id, setServiceId] = useState('');
  const [reg_Id, setRegId] = useState('');
  const [slot_Id, setSlotId] = useState('');
  const [booking_Date, setBookingDate] = useState('');
  const [booked_Date, setBookedDate] = useState('');
  const [bookings, setUsers] = useState([]);
  const [serviceNames, setServiceNames] = useState({});
  const [slotNames, setSlotNames] = useState({});
  const [customerNames, setCustomerNames] = useState({});

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    try {
      const result = await axios.get('https://localhost:7010/api/Bookings');
      const bookingData = result.data;

      // Fetch service, slot, and customer data for each booking
      await Promise.all(
        bookingData.map(async (booking) => {
          const serviceName = await fetchServiceName(booking.service_Id);
          const slotName = await fetchSlotName(booking.slot_Id);
          const customerName = await fetchCustomerName(booking.reg_Id);

          setServiceNames((prevServiceNames) => ({
            ...prevServiceNames,
            [booking.service_Id]: serviceName,
          }));
          setSlotNames((prevSlotNames) => ({
            ...prevSlotNames,
            [booking.slot_Id]: slotName,
          }));
          setCustomerNames((prevCustomerNames) => ({
            ...prevCustomerNames,
            [booking.reg_Id]: customerName,
          }));
        })
      );

      setUsers(bookingData);
      console.log(bookingData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      alert('Error fetching bookings. Please try again later.');
    }
  }

  const fetchServiceName = async (service_Id) => {
    try {
      const response = await axios.get(`https://localhost:7010/api/Services/${service_Id}`);
      return response.data.service_Name;
    } catch (error) {
      console.error('Error fetching service name:', error);
      return 'Unknown Service';
    }
  };

  const fetchSlotName = async (slot_Id) => {
    try {
      const response = await axios.get(`https://localhost:7010/api/Slots/${slot_Id}`);
      return response.data.time;
    } catch (error) {
      console.error('Error fetching slot name:', error);
      return 'Unknown Slot';
    }
  };

  const fetchCustomerName = async (reg_Id) => {
    try {
      const response = await axios.get(`https://localhost:7010/api/Registrations/${reg_Id}`);
      return response.data.first_Name;
    } catch (error) {
      console.error('Error fetching customer name:', error);
      return 'Unknown Customer';
    }
  };

  async function DeleteCategory(id) {
    await axios.delete('https://localhost:7010/api/Bookings/' + id);
    alert('Booking deleted Successfully');

    setId('');
    setServiceId('');
    setRegId('');
    setSlotId('');
    setBookingDate('');
    setBookedDate('');

    Load();
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.put(`https://localhost:7010/api/Bookings/${booking_Id}`, {
        booking_Id: booking_Id,
        service_Id: service_Id,
        reg_Id: reg_Id,
        slot_Id: slot_Id,
        booking_Date: booking_Date,
        booked_Date: booked_Date,
      });
      alert('Booking Updated');
      setId('');
      setServiceId('');
      setRegId('');
      setSlotId('');
      setBookingDate('');
      setBookedDate('');

      Load();
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className="view-booking-container">
      <Navbar />
      <div className="view-booking-content">
        <h1 className="view-booking-title">Booking Details</h1>
        <table className="view-booking-table">
          <thead>
            <tr>
              <th>Booking Id</th>
              <th>Service Name</th>
              <th>Customer Name</th>
              <th>Slot Name</th>
              <th>Booking Date</th>
              <th>Booked Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.booking_Id}>
                <td>{booking.booking_Id}</td>
                <td>{serviceNames[booking.service_Id] || 'Unknown Service'}</td>
                <td>{customerNames[booking.reg_Id] || 'Unknown Customer'}</td>
                <td>{slotNames[booking.slot_Id] || 'Unknown Slot'}</td>
                <td>{booking.booking_Date}</td>
                <td>{booking.booked_Date}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => DeleteCategory(booking.booking_Id)}
                  >
                    <i className="bi bi-trash-fill"></i>Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewBooking;
