import React from 'react';
import { Link } from 'react-router-dom';
import './UserHome.css'

import Navbar from './Navbar';

function UserHome() {
  return (
    <div className="body-container">
      <Navbar/>
      <div className="background-image"></div>
      {/* <div className=".bg-success.bg-gradient"></div> */}
      <div className="content">
        <h1 className="heading">Welcome to HOME HARBOR!</h1>
        
     
      </div>
      
    </div>
  );
};
export default UserHome;