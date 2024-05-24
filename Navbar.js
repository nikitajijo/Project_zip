import React from 'react';
import { Link,useNavigate } from 'react-router-dom';


function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the user's token and user ID from the local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-sm bg-info navbar-dark">
      
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/000/564/450/small/vector61-237-01.jpg" alt="Logo" className="logo" />
            HOME HARBOR
          </Link>
        </div>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/adminhome">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/services">Services</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/slot">Slot</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/viewuser">Registrations</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/viewbookings">Bookings</Link>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}


export default Navbar;


