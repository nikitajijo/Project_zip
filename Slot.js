import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from './Navbar';

function Slot() {

const [slot_Id, setId] = useState("");
const [time, setTime] = useState("");
const [slots, setUsers] = useState([]);
 
 
  useEffect(() => {
    (async () => await Load())();
  }, []);
 
   async function Load() {    
    const result = await axios.get("https://localhost:7010/api/Slots");
    setUsers(result.data);
    console.log(result.data);
  }
 
function insert(){
   axios.post("https://localhost:7010/api/Slots",{

    time:time
   })
}
   
  async function save(event) {   
    event.preventDefault();
    try {
      await axios.post("https://localhost:7010/api/Slots", {        
        time:time      
       
      });
      alert("Slot is Added Successfully");
          setId("");
          setTime("");
          Load();
    } catch (err) {
      alert(err);
    }
  }

  async function editSlot(slots) {
    
    setTime(slots.time);

    setId(slots.slot_Id);
  }
 

  async function DeleteSlot(id) {
  await axios.delete("https://localhost:7010/api/Slots/"+id );
   alert("Slot deleted Successfully");
   
   setId("");
   setTime("");

   
   Load();
  }
 

  async function update(event) {
    event.preventDefault();
    try {
     await   axios.put(`https://localhost:7010/api/Slots/${slot_Id}`, {
            slot_Id: slot_Id,
            time:time     
        }
      );
      alert("Slot Updated");
      setId("");
      setTime("");
;
           
      Load();
    } catch (err) {
      alert(err);
    }
  }


  return (
    <div>
      <Navbar/>
      <h1 style={{ color: 'black', fontSize: '36px', textAlign: 'center' }}>Slot Details</h1>
    <div class="container mt-4">
      <form>
        <div class="form-group">
         
          <input
            type="text"
            class="form-control"
            id="slot_Id"
            hidden
            value={slot_Id}
            onChange={(event) => {
              setId(event.target.value);
            }}
          />

          <label>Time</label>
          <input
            type="text"
            class="form-control"
            id="time"
            value={time}
            onChange={(event) => {
              setTime(event.target.value);
            }}
          />


        </div>
        <div>
          <button class="btn btn-primary mx-2 my-2" onClick={save}>
            Add
          </button>
          <button class="btn btn-warning mx-2 my-2" onClick={update}>
            Update
          </button>
        </div>
      </form>
    </div>
    <br></br>

     <table class="table table-striped table-hover table-white" align="center">
      <thead class="table-info">
        <tr>
          <th scope="col">Slot Id</th>
          <th scope="col">Time</th>
          <th scope="col">Actions</th>

        </tr>
      </thead>
      {slots.map(function fn(slot) {
        return (
          <tbody>
            <tr>
              <th scope="row">{slot.slot_Id} </th>
              <td>{slot.time}</td>

              <td>
                <button
                  type="button"
                  class="btn btn-outline-warning mx-2"
                  onClick={() => editSlot(slot)}
                >
                  <i class="bi bi-pen-fill"></i> Edit
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger mx-2"
                  onClick={() => DeleteSlot(slot.slot_Id)}
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
export default Slot;