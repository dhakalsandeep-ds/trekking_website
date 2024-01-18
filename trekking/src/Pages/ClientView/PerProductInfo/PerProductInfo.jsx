import React, { useEffect, useState } from "react";
import "./PerProductInfo.css";
import HeaderDisplay from "../../../Components/HeaderDisplay/HeaderDisplay";
import PerProductContainer from "../../../Container/Client/PerProductContainer/PerProductContainer";
import {  useParams } from "react-router-dom";


export default function PerProductInfo() {

 
  const { ID } = useParams();
  const [tripData, setTripData] = useState("");

  const fetchTripData = async (id) => {
     
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
     }
     
     
     let response = await fetch(`http://localhost:8000/product/${id}`, { 
       method: "GET",
       headers: headersList
     });
     
     let data = await response.json();
     console.log(data);
     setTripData(data.data)
     

   

  
  };

  useEffect(() => {
    fetchTripData(ID);
    // eslint-disable-next-line
  }, [ID]);


 


  return (
    <div className="perProductInfo_wrapper">
      <HeaderDisplay
        textonly={false}
        title={tripData.heading}
        
        imgFile={tripData.imageUrl}
      />
      <PerProductContainer tripData={tripData} />
  
    </div>
  );
}
