import React, { useEffect, useState } from "react";
import "./Hero.css";
import bgImg from "../../../../assets/mustang.jpg";
import { getAllData } from "../../../../constants/apiService";


export default function Hero() {
  const [contactData, setContactData] = useState({
    contact_number: "",
    address: "",
    email: "",
  });

  const [socialMediaData, setSocialMediaData] = useState();



  const fetchContactData = async () => {
    try {
      const url = "/contact/1";
      const result = await getAllData(url);
      if (result.status === 200) {
        console.log("result", result.data.data);
        setContactData({
          contact_number: result.data.data.contact_number,
          address: result.data.data.address,
          email: result.data.data.email,
        });
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSocialMediaData = async () => {
    try {
      const url = "/social";
      const result = await getAllData(url);
      if (result.status === 200) {
        console.log("result socail", result.data.data.results);
        setSocialMediaData(result.data.data.results);
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchContactData();
    fetchSocialMediaData();
  }, []);

  return (
    <div className="heroContainer" id="heroContainer">
      <div className="heroContent">
     
        <h4>COME VISIT NEPAL</h4>
        <h1>WITH US</h1>
      
      </div>
     
      <img src={bgImg} alt="" />
    </div>
  );
}
