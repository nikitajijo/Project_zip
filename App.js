import React from 'react';
import { BrowserRouter , Route, Routes} from 'react-router-dom';

import Login from './components/Login';
import Logout from './components/Logout';
import Home from './components/Home';
import About from './components/About';
import Feedback from './components/user/Feedback';
import ViewBookings from './components/user/ViewBooking';
import UserRegister from './components/UserRegister';
import ViewUser from './components/admin/ViewUser';
import Slot from './components/admin/Slot';
import Services from './components/admin/Services';
import UserHome from './components/user/UserHome';
import AdminHome from './components/admin/AdminHome';
import ViewServices from './components/user/Services';
import ViewBooking from './components/admin/ViewBooking';
import Booking from './components/user/Booking';
import FeedbackCrud from './components/FeedbackCrud';

function App() {
  return (
    <div className="App">
      <header className="App-header">  
      
      <BrowserRouter>  
    
    <Routes> 
    
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/booking" element={<Booking/>} />
        <Route path="/viewfeedback" element={<FeedbackCrud/>} />
        <Route path="/feedback" element={<Feedback/>} />
        <Route path="/about" element={<About/>} />
        <Route path='/userbooking' element={<ViewBookings/>}/>
        <Route path='/registers' element={<UserRegister/>}/>
        <Route path='/viewuser' element={<ViewUser/>}/>
        <Route path='/slot' element={<Slot/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/userhome' element={<UserHome/>}/>
        <Route path='/adminhome' element={<AdminHome/>}/>
        <Route path='/viewservices' element={<ViewServices/>}/>
        <Route path='/viewbookings' element={<ViewBooking/>}/>

    </Routes>  
    
</BrowserRouter> 
       
      </header>
    </div>
  );
}

export default App; 
