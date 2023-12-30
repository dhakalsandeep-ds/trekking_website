import React, { useEffect, useState } from "react";
import "./ContactContainer.css";
import QuickInquiry from "../../../Components/QuickInquiry/QuickInquiry";
import { MdLocationOn, MdCall, MdEmail } from "react-icons/md";
import ImgWithDetail from "../../../Components/ImgWithDetail/ImgWithDetail";
import { getAllData } from "../../../constants/apiService";

export default function ContactContainer() {
  const [contactData, setContactData] = useState({
    contact_number: "1234567897",
    address: "machhapokhari,kathmandu",
    email: "dhakalsandeep71@gmail.com",
  });

  const fetchContactData = async () => {
   
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
     }
     
     
     
     let response = await fetch("http://localhost:8000/contact", { 
       method: "GET",
       headers: headersList
     });
     
     let data = await response.json();
     console.log(data,"form contact conainer client");
     setContactData({email:data.email,contact_number:data.phoneNumber,address:data.address})
     




    // try {
    //   const url = "/contact/1";
    //   const result = await getAllData(url);
    //   if (result.status === 200) {
    //     setContactData({
    //       contact_number: result.data.data.contact_number,
    //       address: result.data.data.address,
    //       email: result.data.data.email,
    //     });
    //   } else {
    //     console.log(result);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  return (
    <div className="contactUs_wrapper">
      <div className="contactUs_container">
        {/* <div className="contactUs_title">
          <h1>ABOUT US</h1>
        </div> */}
        <div className="contactUs_content">
          <div className="contactUs_details">
            <ImgWithDetail
              icon={<MdLocationOn />}
              staticInfo="OFFICE ADDRESS"
              dynamicInfo={contactData.address}
            />

            <ImgWithDetail
              icon={<MdCall />}
              staticInfo="CONTACT NUMBER"
              dynamicInfo={contactData.contact_number}
            />

            <ImgWithDetail
              icon={<MdEmail />}
              staticInfo="EMAIL ADDRESS"
              dynamicInfo={contactData.email}
            />
          </div>
          <div className="quickInquiryContact">
            <QuickInquiry />
          </div>
        </div>
      </div>
    </div>
  );
}
