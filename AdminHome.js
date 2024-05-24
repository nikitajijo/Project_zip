
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminHome.css'

import Navbar from './Navbar';

function AdminHome() {


  return (
    <div className="body-container">
      <Navbar />
      <div className="background-image"></div>
      <div className="content">
        <h1 className="heading">Welcome to HOME HARBOR!</h1>
      </div>
     
    </div>
  );
}
export default AdminHome;

