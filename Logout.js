import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the user's token and user ID from the local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userid");

    // Navigate the user back to the login page
    navigate("/");
  };

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
