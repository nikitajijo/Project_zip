import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Navigation from './Navigation';
import './UserRegister.css';

function UserRegister() {
  const navigate = useNavigate();

  const [reg_Id, setId] = useState("");
  const [first_Name, setFName] = useState("");
  const [last_Name, setLName] = useState("");
  const [email_Id, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phn_No, setPhnNo] = useState("");
  const [registrations, setUsers] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    // No need for implementation
  }

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneRegex = /^\d{10}$/;
    const passwordRegex = /^.{6,}$/;



    if (!values.first_Name) {
      errors.first_Name = "First Name is required";
    }
    if (!values.last_Name) {
      errors.last_Name = "Last Name is required";
    }
    if (!values.email_Id) {
      errors.email_Id = "Email is required";
    } else if (!regex.test(values.email_Id)) {
      errors.email_Id = "This is not a valid email format";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(values.password)) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!values.phn_No) {
      errors.phn_No = "Phone Number is required";
    } else if (!phoneRegex.test(values.phn_No)) {
      errors.phn_No = "Phone Number should be 10 digits";
    }
    return errors;
  };

  async function save(event) {
    event.preventDefault();
    const formValues = {
      first_Name,
      last_Name,
      email_Id,
      password,
      confirmPassword,
      phn_No,
    };
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      try {
        await axios.post("https://localhost:7010/api/Registrations", formValues);
        alert("Registered Successfully");
        setId("");
        setFName("");
        setLName("");
        setEmailId("");
        setPassword("");
        setConfirmPassword("");
        setPhnNo("");
        Load();
        navigate('/login');
      } catch (err) {
        alert(err);
      }
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div>
      <Navigation />
      <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Registration</h1>
        <form className="register-form" onSubmit={save}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="reg_Id"
              hidden
              value={reg_Id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />

            <label className="form-label">First Name</label>
            <input
              type="text"
              className={`form-control ${formErrors.first_Name ? 'is-invalid' : ''}`}
              id="first_Name"
              value={first_Name}
              onChange={(event) => {
                setFName(event.target.value);
              }}
            />
            {formErrors.first_Name && <div className="invalid-feedback">{formErrors.first_Name}</div>}

            <label className="form-label">Last Name</label>
            <input
              type="text"
              className={`form-control ${formErrors.last_Name ? 'is-invalid' : ''}`}
              id="last_Name"
              value={last_Name}
              onChange={(event) => {
                setLName(event.target.value);
              }}
            />
            {formErrors.last_Name && <div className="invalid-feedback">{formErrors.last_Name}</div>}

            <label className="form-label">Email Id</label>
            <input
              type="text"
              className={`form-control ${formErrors.email_Id ? 'is-invalid' : ''}`}
              id="email_Id"
              value={email_Id}
              onChange={(event) => {
                setEmailId(event.target.value);
              }}
            />
            {formErrors.email_Id && <div className="invalid-feedback">{formErrors.email_Id}</div>}

            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
              id="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}

            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className={`form-control ${formErrors.confirmPassword ? 'is-invalid' : ''}`}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
            {formErrors.confirmPassword && <div className="invalid-feedback">{formErrors.confirmPassword}</div>}

            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className={`form-control ${formErrors.phn_No ? 'is-invalid' : ''}`}
              id="phn_No"
              value={phn_No}
              onChange={(event) => {
                setPhnNo(event.target.value);
              }}
            />
            {formErrors.phn_No && <div className="invalid-feedback">{formErrors.phn_No}</div>}
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary register-btn">
              Register
            </button>
            <Link to="/login" className="btn btn-link already-user-btn" onClick={handleLoginClick}>
              Already a user? Login
            </Link>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}

export default UserRegister;
