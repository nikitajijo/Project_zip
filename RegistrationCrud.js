import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


function RegistrationCrud() {
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
 
function insert(){
   axios.post("https://localhost:7010/api/Registrations",{
    first_Name:first_Name,
    last_Name:last_Name,
    email_Id:email_Id,
    password:password,
    confirmPassword:confirmPassword,
    phn_No:phn_No
   })
}
   
  async function save(event) {   
    event.preventDefault();
    try {
      await axios.post("https://localhost:7010/api/Registrations", {        
        first_Name:first_Name,
        last_Name:last_Name,
        email_Id:email_Id,
        password:password,
        confirmPassword:confirmPassword,
        phn_No:phn_No      
       
      });
      alert("Service is Booked Successfully");
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
      <h1>Registration</h1>
    <div class="container mt-4">
      <form>
        <div class="form-group">
         
          <input
            type="text"
            class="form-control"
            id="reg_Id"
            hidden
            value={reg_Id}
            onChange={(event) => {
              setId(event.target.value);
            }}
          />

          <label>First Name</label>
          <input
            type="text"
            class="form-control"
            id="first_Name"
            value={first_Name}
            onChange={(event) => {
              setFName(event.target.value);
            }}
          />

          <label>Last Name</label>
          <input
            type="text"
            class="form-control"
            id="last_Name"
            value={last_Name}
            onChange={(event) => {
              setLName(event.target.value);
            }}
          />

          <label>Email Id</label>
          <input
            type="text"
            class="form-control"
            id="email_Id"
            value={email_Id}
            onChange={(event) => {
              setEmailId(event.target.value);
            }}
          />

          <label>Password</label>
          <input
            type="text"
            class="form-control"
            id="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <label>Confirm Password</label>
          <input
            type="text"
            class="form-control"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          />
          <label>Phone Number</label>
          <input
            type="text"
            class="form-control"
            id="phn_No"
            value={phn_No}
            onChange={(event) => {
              setPhnNo(event.target.value);
            }}
          />

        </div>
        <div>
          <button class="btn btn-primary mt-4" onClick={save}>
            Register
          </button>
          <button class="btn btn-warning mt-4" onClick={update}>
            Update
          </button>
        </div>
      </form>
    </div>
    <br></br>

     <table class="table table-dark" align="center">
      <thead>
        <tr>
          <th scope="col">Registration</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Email Id</th>
          <th scope="col">Password</th>
          <th scope="col">Confirm Password</th>
          <th scope="col">Phone Number</th>
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
              <td>{registration.password}</td>
              <td>{registration.confirmPassword}</td>
              <td>{registration.phn_No}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-warning"
                  onClick={() => editCategory(registration)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => DeleteCategory(registration.reg_Id)}
                >
                  Delete
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
export default RegistrationCrud;