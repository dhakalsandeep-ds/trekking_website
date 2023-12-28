import React from "react";
import "./Dashboard.css";
import SocialMediaContainer from "../../../Container/Admin/SocialMediaContainer/SocialMediaContainer";
import ContactContainer from "../../../Container/Admin/ContactContainer/ContactContainer";

export default function Dashboard() {
  const username = localStorage.getItem("username");
  return (
    <div className="dashboard_wrapper">
      <div className="dashboard_container">
        <h1>Admin : {username}</h1>
        <div className="dash_contactInfo">
          <div className="dashCI_left">
            <ContactContainer />
          </div>
          <div className="dashCI_right">
            <SocialMediaContainer />
          </div>
        </div>
      </div>
    </div>
  );
}
