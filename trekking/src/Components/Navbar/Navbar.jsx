import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Links } from "../../Data/NavLinks";
import { Link, NavLink } from "react-router-dom";

import logos from "../../assets/travel-svgrepo-com.svg"

import { MdLogout} from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import AuthContext from "../../AuthState";

export default function Navbar() {
  const {token,logout} = useContext(AuthContext)

 


  const makeResponsive = () => {
    let x = document.getElementById("NavLinkSubContainer");
    if (x.className === "NavLinkSubContainer") {
      x.className += " responsiveNav";
    } else {
      x.className = "NavLinkSubContainer";
    }
  };

  return (
    <>
      <div
        className={"NavDiv_wrapper NavDiv_bg"} style={{backgroundColor:"#063970"}}
      >
        
        <div className="NavDivContainer">
          <div className={ "logoContainer"  }>
            <div className="logoWrapper">
              <Link
                to={"/"}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <img src={logos} style={{height:"50px",width:"50px"}} alt="" />
              </Link>
            </div>
          </div>

        

          <div className="NavLinkContainer">
            <div className="icon_res">
              <Link onClick={makeResponsive}>
              
                <RxHamburgerMenu />
              </Link>
            </div>
            <div className="NavLinkSubContainer" id="NavLinkSubContainer" style={{backgroundColor:"#063970"}}>
              {Links.map((Link) => {
                return (
                  <li key={Link.Key}>
                    <NavLink
                      to={Link.Linkto}
                      className={
                       "Nav-li-textColor "
                      }
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        makeResponsive();
                      }}
                    >
                      {Link.Title}
                    </NavLink>
                  </li>
                );
              })}
               <li >
                {token && <MdLogout
                      onClick={logout}
                      className={"Nav-li-textColor "
                      }
                     
                    />}
                    
                    
                    
                  </li>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
