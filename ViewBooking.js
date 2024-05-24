import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ViewBooking.css';
import Navbar from './Navbar';

function Viewbookings() {
  const userid = localStorage.getItem('userid')

  const[booking,setbooking]= useState([])
  const [load, setLoad]  =useState(false)
  

  useEffect(()=>{
    const getBookings= async () => {
      const res = await axios.get('https://localhost:7010/api/Bookings')
      const filteredRes = res.data.filter(booking => booking.reg_Id == userid)
      
      // Fetch the service and slot for each booking
      const bookingsWithDetails = await Promise.all(
        filteredRes.map(async booking => {
          const serviceRes = await axios.get(`https://localhost:7010/api/Services/${booking.service_Id}`);
          const slotRes = await axios.get(`https://localhost:7010/api/Slots/${booking.slot_Id}`);
          
          // Add the service and slot details to the booking
          return {
            ...booking,
            service: serviceRes.data,
            slot: slotRes.data
          };
        })
      );
      
      setbooking(bookingsWithDetails)
    }
    getBookings()
  },[load])



  const cancelBooking = async (id) => {
    try{
      const confirm = window.confirm("Are you sure to cancel this booking?")
      if(confirm){

        const res = await axios.delete(`https://localhost:7010/api/Bookings/${id}`)
      alert("Booking canceled successfully.")
      setLoad(!load)
      }
      

    }catch(e){
      console.log(e)
      alert("Some error occured. Please try again later!")
    }
  }


  return (
    <div className="viewbookings">
        <Navbar/>
      {
        booking && booking.length == 0 &&
        <div><h1 style={{ fontFamily: 'Georgia', fontSize: '36px', textAlign: 'center'  }}>No bookings made yet!!</h1></div>
      }
      {booking && booking.map((item,index) => (
        <div key={item.booking_Id} className="viewbooking">
            <div className='viewbooking-card-header'>
            <h1 >Booking Id: <span>{item.booking_Id}</span></h1>
            <button onClick={()=>cancelBooking(item.booking_Id)}>Cancel Booking</button>
            </div>
            <hr />

            <div className='viewbooking-date-box'>

            <h1>Booked on: {new Date(item.booked_Date).toLocaleDateString()}</h1>     
            <h1>Booked For: {new Date(item.booking_Date).toLocaleDateString()}</h1>     
            <h1>Booked Slot: {item.slot.time}</h1>     
            </div>
           

            <div className='viewbooking-box-service-card'>
              <h1 >Service Details</h1>
              <hr />
              <div>
                <h3>{item.service.service_Name}</h3>
                <p>{item.service.description}</p>
                <p className='price'>&#x20b9; {item.service.price}</p>
              </div>
            </div>

            
            
               </div>
      ))} 
    </div>
  );
}

export default Viewbookings;