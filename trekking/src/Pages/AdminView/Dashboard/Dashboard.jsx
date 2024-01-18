import React from "react";
import "./Dashboard.css";
import ContactContainer from "../../../Container/Admin/ContactContainer/ContactContainer";

export default function Dashboard() {
  const username = localStorage.getItem("username");
  return (
    <div className="dashboard_wrapper">
      <div className="dashboard_container">
        <h1>Admin : {username}</h1>
        <div className="dash_contactInfo">
          
            <ContactContainer />
          
         
        </div>
      </div>
    </div>
  );
}
