import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function ViewUser() {
const navigate = useNavigate();

const [reg_Id, setId] = useState("");
const [first_Name, setFName] = useState("");
const [last_Name, setLName] = useState("");
const [email_Id, setEmailId] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [phn_No, setPhnNo] = useState("");
const [registrations, setUsers] = useState([]);
 
 
  useEffect(() => {
    (async () => await Load())();
  }, []);
 
   async function Load() {    
    const result = await axios.get("https://localhost:7010/api/Registrations");
    setUsers(result.data);
    console.log(result.data);
  }

  async function editCategory(registrations) {
    
    setFName(registrations.first_Name);
    setLName(registrations.last_Name);
    setEmailId(registrations.email_Id);
    setPassword(registrations.password);
    setConfirmPassword(registrations.confirmPassword);
    setPhnNo(registrations.phn_No);

    setId(registrations.reg_Id);
  }
 

  async function DeleteCategory(id) {
  await axios.delete("https://localhost:7010/api/Registrations/"+id );
   alert("Registration deleted Successfully");
   
   setId("");
   setFName("");
   setLName("");
   setEmailId("");
   setPassword("");
   setConfirmPassword("");
   setPhnNo("");
   
   Load();
  }
 

  async function update(event) {
    event.preventDefault();
    try {
     await   axios.put(`https://localhost:7010/api/Registrations/${reg_Id}`, {
            reg_Id: reg_Id,
            first_Name:first_Name,
            last_Name:last_Name,
            email_Id:email_Id,
            password:password,
            confirmPassword:confirmPassword,
            phn_No:phn_No        
        }
      );
      alert("Registration Updated");
      setId("");
      setFName("");
      setLName("");
      setEmailId("");
      setPassword("");
      setConfirmPassword("");
      setPhnNo("");
           
      Load();
    } catch (err) {
      alert(err);
    }
  }


  return (
    <div>
      <Navbar/>
      <h1 style={{ color: 'black', fontSize: '36px', textAlign: 'center' }}>Registrations</h1>
    <div class="container mt-4">
      
    </div>
    <br></br>

     <table class="table table-striped table-hover table-white " align="center">
     <thead class="table-info"> 
        <tr>
          <th scope="col">Registration</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Email Id</th>
          {/* <th scope="col">Password</th>
          <th scope="col">Confirm Password</th> */}
          <th scope="col">Phone Number</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      {registrations.map(function fn(registration) {
        return (
          <tbody>
            <tr>
              <th scope="row">{registration.reg_Id} </th>
              <td>{registration.first_Name}</td>
              <td>{registration.last_Name}</td>
              <td>{registration.email_Id}</td>
              {/* <td>{registration.password}</td>
              <td>{registration.confirmPassword}</td> */}
              <td>{registration.phn_No}</td>
              <td>
                {/* <button
                  type="button"
                  class="btn btn-outline-warning mx-2"
                  onClick={() => editCategory(registration)}
                >
                  <i class="bi bi-pen-fill"></i> Edit
                </button> */}
                <button
                  type="button"
                  class="btn btn-outline-danger mx-2"
                  onClick={() => DeleteCategory(registration.reg_Id)}
                >
                   <i class="bi bi-trash-fill"></i>Delete
                </button>
              </td>
            </tr>
          </tbody>
        );
      })}
    </table>
      
    </div>
  );
}
export default ViewUser;