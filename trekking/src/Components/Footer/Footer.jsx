import React from "react";
import "./Footer.css";
import { MdCopyright } from "react-icons/md";



export default function Footer() {
  return (
    <div className="footer_wrapper" style={{backgroundColor:"#063970"}}>
      <div className="footer_container">
      

      

        <div className="footerCopyright">
          
          <h4>
            <MdCopyright /> 2023. All rights reserved
          </h4>
        </div>
      </div>
    </div>
  );
}
