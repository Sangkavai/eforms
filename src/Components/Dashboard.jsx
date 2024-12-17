import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Components/Dashboard.css";

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await axios.get("http://localhost:5000/dashboard", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      setUserDetails(response.data);
    };
    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      {userDetails ? (
        <div className="container">
          <h1>Welcome, {userDetails.name}</h1>
          <p>Employee ID: {userDetails.employee_id}</p>
          <p>Email: {userDetails.email}</p>
          <p>Phone: {userDetails.phone}</p>
          <p>Department: {userDetails.department}</p>
          <p>Date of Joining: {userDetails.doj}</p>
          <p>Role: {userDetails.role}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;