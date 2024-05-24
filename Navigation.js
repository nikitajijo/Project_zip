import React from 'react';
import { Link } from 'react-router-dom';
import './Navig.css';

function Navigation() {
  return (
    <nav className="navbar navbar-expand-sm bg-info navbar-dark">
      
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            {/* <img src="https://static.vecteezy.com/system/resources/thumbnails/000/564/450/small/vector61-237-01.jpg" alt="Logo" className="logo" /> */}
            <img src="https://png.pngtree.com/template/20190309/ourmid/pngtree-cleaning-service-vector-icon-image_64441.jpg" alt="Logo" className="logo" />
            HOME HARBOR
          </Link>
        </div>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/registers">Register</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/viewfeedback">Feedbacks</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;


