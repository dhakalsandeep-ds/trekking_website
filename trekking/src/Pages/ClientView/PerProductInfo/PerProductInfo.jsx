import React, { useEffect, useState } from "react";
import "./PerProductInfo.css";
import HeaderDisplay from "../../../Components/HeaderDisplay/HeaderDisplay";
import PerProductContainer from "../../../Container/Client/PerProductContainer/PerProductContainer";
import { Link, useParams } from "react-router-dom";
import { MdModeEditOutline } from "react-icons/md";
import { getAllData } from "../../../constants/apiService";

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
     

   

    // try {
    //   const url = "/tripinfo/" + tripID;
    //   const result = await getAllData(url);
    //   if (result.status === 200) {
    //     console.log("tripData", result.data.data);
    //     setTripData(result.data.data);
    //   } else {
    //     console.log(result);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };

  useEffect(() => {
    fetchTripData(ID);
    // eslint-disable-next-line
  }, [ID]);


 const book = async ()=>{
  let headersList = {
    "Accept": "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json"
   }
   
   let bodyContent = JSON.stringify({
     "name":"sandeep dhakal",
     "numberOfPeople":9,
     "contactNumber":98384993844,
     "arrivalDate":"lsfjlsjdflsf",
     "packageName":"lukla"
   });
   
   let response = await fetch("http://localhost:8000/bookings", { 
     method: "POST",
     body: bodyContent,
     headers: headersList
   });
   
   let data = await response.text();
   console.log(data);
   
 }


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
