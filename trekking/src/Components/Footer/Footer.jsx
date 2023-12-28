import React, { useEffect, useState } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

import { MdCall, MdMail, MdCopyright } from "react-icons/md";
import HTMLReactParser from "html-react-parser";

import logo from "../../assets/icon/logo_main.png";

import af1 from "../../assets/icon/affiliated/1.jpg";
import af2 from "../../assets/icon/affiliated/2.jpg";
import af3 from "../../assets/icon/affiliated/3.jpg";
import af4 from "../../assets/icon/affiliated/4.jpg";
import { getAllData } from "../../constants/apiService";
import MediaIcon from "../MediaIcon/MediaIcon";

export default function Footer() {
  const [contactData, setContactData] = useState({
    contact_number: "9856796",
    address: "dhading",
    email: "dhakalsandep71@gmail.com",
  });

  const [socialMediaData, setSocialMediaData] = useState("www.facebook.com");
  const [aboutData, setAboutData] = useState("i ma good");

  

  return (
    <div className="footer_wrapper">
      <div className="footer_container">
      

        <div className="footerCompanyInfo">
          
         
          <div className="footerCompanyAffiliated">
            <h2>OUR CONTACT INFO</h2>
            <div className="footerCompanyAffiliatedList footerContactInfo" style={{width:"50%",margin:"auto"}}>
            <span>
              <MdCall /> {contactData.contact_number}
            </span>
            <span>
              <MdMail /> {contactData.email}
            </span>
            </div>
          </div>
        </div>

        <div className="footerCopyright">
          <hr />
          <h4>
            <MdCopyright /> 2023. All rights reserved Sandeep Dhakal
          </h4>
        </div>
      </div>
    </div>
  );
}
