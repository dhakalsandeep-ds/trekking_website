import React from "react";
import "./AdminSideBar.css";
import logo from "../../assets/icon/logo_main.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AdminNavLinks } from "../../Data/AdminNavLinks";
import { MdLogout } from "react-icons/md";

export default function AdminSideBar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const onLogoutReq = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("unAuth");
    navigate("/");
  };

  const onUnAuthReq = () => {
    if (localStorage.getItem("unAuth") === "true") {
      localStorage.setItem("unAuth", "false");
    } else {
      localStorage.setItem("unAuth", "true");
    }
  };

  return (
    <div className="adminSidebar_wrapper">
      <div className="adminSidebar_container">
        <div className="adminSidebar_logo">
          <Link to={"/"}>
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="adminSidebar_menus">
          <ul>
            {AdminNavLinks.map((link, key) => {
              return (
                <NavLink to={link.Linkto} key={key}>
                  <li key={key}>
                    {link.Logo} <span>{link.Title}</span>
                  </li>
                </NavLink>
              );
            })}
          </ul>
        </div>
        <div className="adminSidebar_userAction">
          <div className="adminSidebar_uA_left">
            <h4>{username}</h4>
            <h5
              onClick={() => {
                onUnAuthReq();
              }}
            >
              Admin
            </h5>
          </div>
          <div className="adminSidebar_uA_right">
            <MdLogout onClick={onLogoutReq} />
          </div>
        </div>
      </div>
    </div>
  );
}
