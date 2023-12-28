import React from "react";
import "./AdminLayout.css";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../../Components/AdminSideBar/AdminSideBar";

export default function AdminLayout() {
  return (
    <div className="adminLayout_wrapper">
      <div className="adminLayout_container">
        <div className="adminLayout_sideBar">
          <AdminSideBar />
        </div>
        <div className="adminLayout_content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
