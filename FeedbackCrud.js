import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './FeedbackCrud.css'; // Import the custom CSS file
import Navigation from './Navigation';

function FeedbackCrud() {
  const [feedback_Id, setId] = useState('');
  const [service_Id, setServiceId] = useState('');
  const [reg_Id, setRegId] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [commented_Date, setCommentedDate] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get('https://localhost:7010/api/Feedbacks');
    setFeedbacks(result.data);
    console.log(result.data);

    // Fetch user names in parallel
    await Promise.all(        // it’s used to wait for all user names to be fetched.
      result.data.map(async (feedback) => {     //This maps over each feedback in the fetched data, fetches the user name for each feedback, and returns a promise.
        const userName = await fetchUserName(feedback.reg_Id);
        setUserNames((prevUserNames) => ({
          ...prevUserNames,
          [feedback.reg_Id]: userName,
        }));
      })
    );
  }

  const fetchUserName = async (reg_Id) => {
    try {
      const response = await axios.get(`https://localhost:7010/api/Registrations/${reg_Id}`);
      return response.data.first_Name;
    } catch (error) {
      console.error('Error fetching user name:', error);
      return 'Unknown User';
    }
  };

  return (
    <>
    <Navigation />
    
    <div className="feedbackcrud-container">
      
      <div className="about-background-image"></div>
      <h1 className="feedbackcrud-title">Feedbacks</h1>
      <div className="feedbackcrud-cards">
        {feedbacks.map((feedback) => (
          <div key={feedback.feedback_Id} className="feedbackcrud-card">
            <div className="feedbackcrud-user">
              <img
                src={`https://ui-avatars.com/api/?name=${userNames[feedback.reg_Id] || 'Unknown'}&background=random&size=64`}
                alt={userNames[feedback.reg_Id] || 'Unknown'}
                className="feedbackcrud-user-image"
              />
              <div className="feedbackcrud-user-info">
                <h4 className="feedbackcrud-user-name">{userNames[feedback.reg_Id] || 'Unknown'}</h4>
                <p className="feedbackcrud-user-rating">
                  Rating: {feedback.rating} / 5
                </p>
              </div>
            </div>
            <div className="feedbackcrud-content">
              <p className="feedbackcrud-text">{feedback.comment}</p>
              <p className="feedbackcrud-date">
                {new Date(feedback.commented_Date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default FeedbackCrud;
