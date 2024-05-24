import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from './Navbar';
import "./Feedback.css"; // Import the custom CSS file

function Feedback() {
  const [service_Id, setServiceId] = useState("");
  const [reg_Id, setRegId] = useState(localStorage.getItem("userid"));
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [services, setServices] = useState([]);

  useEffect(() => {
    (async () => {
      await loadServices();
    })();
  }, []);

  async function loadServices() {
    const result = await axios.get("https://localhost:7010/api/Services");
    setServices(result.data);
  }

  async function saveFeedback(event) {
    event.preventDefault();
    try {
      const currentDate = new Date().toISOString();
      await axios.post("https://localhost:7010/api/Feedbacks", {
        service_Id: service_Id,
        reg_Id: reg_Id,
        comment: comment,
        rating: rating,
        commented_Date: currentDate,
      });
      alert("Feedback Submitted Successfully");
      setServiceId("");
      setComment("");
      setRating("");
    } catch (err) {
      alert(err);
    }
  }

  return (
    <><Navbar/>
    <div className="feedback-container">
        
        <div className="feedback-form-container">
      <h1 className="feedback-title">Feedback</h1>
      
        <form className="feedback-form">
          <div className="feedback-form-group">
            <label className="feedback-form-label">Service</label>
            <select
              className="feedback-form-control"
              id="service_Id"
              value={service_Id}
              onChange={(event) => {
                setServiceId(event.target.value);
              }}
            >
              <option value="">Select a Service</option>
              {services.map((service) => (
                <option key={service.service_Id} value={service.service_Id}>
                  {service.service_Name}
                </option>
              ))}
            </select>
          </div>

          <div className="feedback-form-group">
            <label className="feedback-form-label">User Id</label>
            <input
              type="text"
              className="feedback-form-control"
              id="reg_Id"
              value={reg_Id}
              disabled
            />
          </div>

          <div className="feedback-form-group">
            <label className="feedback-form-label">Comment</label>
            <textarea
              className="feedback-form-control"
              id="comment"
              value={comment}
              onChange={(event) => {
                setComment(event.target.value);
              }}
            ></textarea>
          </div>

          <div className="feedback-form-group">
            <label className="feedback-form-label">Rating</label>
            <input
              type="number"
              className="form-control"
              id="rating"
              min="1"
              max="5"
              value={rating}
              onChange={(event) => {
                setRating(event.target.value);
              }}
            />
          </div>

          <button className="feedback-submit-btn" onClick={saveFeedback}>
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Feedback;
