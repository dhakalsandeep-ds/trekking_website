import React, { useState } from "react";
import "./PerProductContainer.css";
import ProductBookMenu from "../../../Components/ProductBookMenu/ProductBookMenu";
import ImgWithDetail from "../../../Components/ImgWithDetail/ImgWithDetail";

import { FaRegClock, FaCloudSun } from "react-icons/fa";
import { MdDirectionsWalk } from "react-icons/md";
import HTMLReactParser from "html-react-parser";


export default function PerProductContainer(props) {
    
  const [name,setName] = useState("")
  const [numberOfPeople,setNumberOfPeople] = useState("")
  const [contactNumber,setContactNumber] = useState("")
  const [arrivalDate,setArrivalDate] = useState("")
  



  window.scrollTo({ top: 0, behavior: "smooth" });
  const { tripData } = props;

  



    const book = async ()=>{
      let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify({
        packageName:props.tripData.heading,
         name,
         numberOfPeople,
         contactNumber,
         arrivalDate,
        
       });
       console.log(bodyContent,"body content .")
       
       let response = await fetch("http://localhost:8000/bookings", { 
         method: "POST",
         body: bodyContent,
         headers: headersList
       });
       
       let data = await response.json();
       
       
     



    // console.log(id,'id...........')
    // let headersList = {
    //   "Accept": "*/*",
    //  }
     
    //  let response = await fetch(`http://localhost:8000/bookings/${id}`, { 
    //    method: "DELETE",
    //    headers: headersList
    //  });
     
    //  let data = await response.json();
    //  Toast.success(data.data.message)
  
     
  }


  return (
    <div className="perProductContainer_wrapper">
      <div style={{ width: "100%" }}
        className="perProductContainer_container">
        <div style={{ width: "100%" }} className="perProductContainer_content">

          <div style={{ display: "flex" }}>
            <div style={{ flexGrow: 1 }}>
              <h1 className="ppc_tripInfo_h2">TRIP INFORMATION</h1>
              <p>Duration: {tripData.duration} days</p>

              <p>Price Rs.{tripData.price} </p>

              <p>Season:{tripData.season}</p>
            </div>
            <div className="form_container" style={{ flexGrow: 2 }}>
              <form action="" width="100%" style={{ display: "flex", flexDirection: "column",gap:"10px" }}>
                <h1>order now</h1>
                <div className="input_container" >
                  <div className="label">
                    package name
                  </div>
                  <div className="input">
                    <input type="text" value={tripData.heading} disabled style={{ display: 'inline-block', width: "90%" }} />
                  </div>
                </div>

                <div className="input_container" >
                  <div className="label">
                    name
                  </div>
                  <div className="input">
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} style={{ display: 'inline-block', width: "90%" }} />
                  </div>
                </div>
                <div className="input_container">
                  <div className="labe">
                    number of people
                  </div>
                  <div className="input">
                    <input type="text" value={numberOfPeople} onChange={e=>setNumberOfPeople(e.target.value)} style={{display:"inline-block",width:"90%"}} />
                  </div>
                </div>

                <div>
                  <div className="labe">
                    date to arrive
                  </div>
                  <div className="input">
                    <input type="date" value={arrivalDate} onChange={e=>setArrivalDate(e.target.value)}  style={{display:"inline-block",width:"90%"}} />
                  </div>
                </div>
                <div>
                  <div className="label">
                    contact number
                  </div>
                  <div className="input">
                    <input type="text" value={contactNumber} onChange={e=>setContactNumber(e.target.value)} style={{display:"inline-block",width:"90%"}} />
                  </div>
                </div>
                
                <div>
                <button type="submit" width="90%" onClick={(e) => {
                  e.preventDefault()
                  book(tripData._id)}}>book</button>
              
                </div>
                </form>
              

            </div>
          </div>




        </div>

      </div>
    </div>
  );
}
