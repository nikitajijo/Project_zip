import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'; // Import the custom CSS file

function Login(){
    const navigate = useNavigate()

    const [info, setInfo] = useState({})

    const handleChange = (e) => {
      setInfo((prev) => ({...prev, [e.target.name]:e.target.value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await axios.post(`https://localhost:7010/api/Registrations/login?email=${info.email_Id}&password=${info.password}`)
            localStorage.setItem('token', res.data)
            let userid = jwtDecode(res.data).Reg_Id;
            let role = jwtDecode(res.data).Role;
            localStorage.setItem('userid', userid)
            alert("Logged in Successfully!")
            if (role === 'admin' || role === 'Admin') {
                navigate("/adminhome");
              } else  { // Assuming 'user' is the role for non-admin users
                navigate("/userhome");
              } 

        }
        catch(error){
          alert("Login failed! May be you entered wrong credentials. Please try again.")
            console.log(error)
        }
    }

    return (
      <div>
        <Navigation/>
        <div className='login-container'> 
            <div className='login-card'>
                <h1 className="login-title">Welcome Back!</h1>
                <form className="login-form">
                    <div className="form-group">
                        <label htmlFor="email_Id" className="form-label">Email</label>
                        <input type="email" id="email_Id" name="email_Id" className="form-control" onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" name="password" className="form-control" onChange={handleChange}/>
                    </div>
                    <button type="submit" className="login-btn" onClick={handleSubmit}>Login</button>
                </form>
            </div>
        </div>
        </div>
    )
}

export default Login















































// function Login(){
//     return(
//         <form action="/action_page.php">
//         <div class="mb-3 mt-3">
//             <label for="email" className="form-label">Email:</label>
//             <input type="email" className="form-control" id="email" placeholder="Enter email" name="email"/>
//         </div>
//         <div class="mb-3">
//             <label for="pwd" className="form-label">Password:</label>
//             <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd"/>
//         </div>
//         {/*<div class="form-check mb-3">
//             <label className="form-check-label">
//             <input className="form-check-input" type="checkbox"  name="remember"/> Remember me
//             </label>
//         </div>*/}
//         <button type="submit" className="btn btn-primary">Submit</button>
//         </form>
//     )
// }
 
// export default Login;



//####################
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       // Send a POST request to your backend with the entered email and password
//       const response = await axios.post('https://localhost:7010/api/Registrations', {
//         email_Id: email,
//         password
//       });

//       // If the login was successful (you can determine this based on the response from your backend), navigate to another page
//       if (response.data.success) {
//         navigate('/booking');
//       } else {
//         alert('Invalid email or password');
//       }
//     } catch (error) {
//       console.error('An error occurred while logging in:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="mb-3 mt-3">
//         <label htmlFor="email" className="form-label">Email:</label>
//         <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="pwd" className="form-label">Password:</label>
//         <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" value={password} onChange={e => setPassword(e.target.value)} required />
//       </div>
//       <button type="submit" className="btn btn-primary">Submit</button>
//     </form>
//   );
// }

// export default Login;

// import React, { useState } from 'react';

// import { Form, Button, Container, Alert, Toast } from 'react-bootstrap';
// import {BsFillPlayCircleFill} from "react-icons/bs";
// import {useNavigate} from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from 'react-toastify';
// import { AiFillStar } from "react-icons/ai";
// //import Footer from './Footer';


// const Login = () => {
//     const baseURL = "https://localhost:7010/api/Registrations/login";
//   const navigate = useNavigate();
//   const [enteredEmailId, setEmailId] = useState('');
//   const [enteredPassword, setPassword] = useState('');
  
//   const [errors, setErrors] = useState({
//     email_Id: '',
//     password: '',
//   });
  
  
//   const usernameChangeHandler = (event) => {
//     setEmailId(event.target.value);
//   };

//   const passwordChangeHandler = (event) => {
//     setPassword(event.target.value);
//   };

//   const validateForm = () => {
//     let valid = true;


//     if (!enteredEmailId){
//         setErrors((prevErrors) => ({
//             ...prevErrors,
//             email_Id: 'Email is required',
//         }));
//         valid = false;
//     }


//     if(!enteredPassword){
//         setErrors((prevErrors)=>({
//             ...prevErrors,
//             password: 'Password is required',
//         }));
//         valid = false;
//     }

//     return valid;
//   };


//   const submitActionHandler = (event) => {
//     event.preventDefault();
    
//     if (validateForm()) {
        
//       try {
//         axios
//           .post(baseURL, {
//             email_Id: enteredEmailId,
//             password: enteredPassword,
//           })
//           .then((response) => {
//             const { token, role } = response.data;
//             localStorage.setItem('token', token);
  
//             if (role === 'admin' || role === 'Admin') {
//               navigate("/AdminHome");
//             } else if (role === 'user' || role === 'User') {
//                 navigate("/");
//               } else {
//                 toast.error("Invalid Credential");
//               }
//             })
//           .catch((error) => {
//             if (error.response && error.response.status === 400) {
//               if (error.response.data && error.response.data === "Invalid credentials") {
//                 // Show a specific alert for invalid credentials
//                 toast.error("Invalid username or password");
//               } else {
//                 // Show a generic alert for other 400 errors
//                 toast.error("Bad Request: " + error.message);
//               }
//             } else {
//               toast.error("An unexpected error occurred");
//             }
//           });
//       } catch (error) {
//         // This block will only catch synchronous errors, not asynchronous ones
//         toast.error("Synchronous error:", error);
//       }
//     }
//   };


//   const cancelHandler = () =>{
//     //reset the values of input fields
//     setEmailId('');
//     setPassword('');
//     navigate("/");
//   }

//   return (
//     <div>
//     <div className="about-section-container">
      

//       <div className="toast-container">
//         <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
//       </div>
//       <div className="about-section-text-container">
//         <p className="primary-subheading">Login In</p>
//         <div className="primary-register">
//         <Form onSubmit={submitActionHandler} style={{ width: '300px' }}>
//         <Form.Group controlId="form.UserName">
//             <Form.Label>User Name</Form.Label>
//             <Form.Control type="text" value={enteredEmailId} onChange={usernameChangeHandler} placeholder="Enter Email Id" />
//         </Form.Group>
//         <span className="error">{errors.userName}</span>
//         <Form.Group  controlId="form.Password">
//             <Form.Label>Password</Form.Label>
//             <Form.Control type="password" value={enteredPassword} onChange={passwordChangeHandler} placeholder="Enter password" />
//         </Form.Group>
//         <span className="error">{errors.password}</span>
//         <br></br>
//         <Button type='submit'>Login</Button>
//         &nbsp;&nbsp;&nbsp;
//         <Button type='submit' onClick={()=>cancelHandler()}>Cancel</Button>
//       </Form>
//         </div>
        
//       </div>
//     </div>
//     {/* <Footer/> */}

   
//     </div>

//   )
// }

// export default Login;
