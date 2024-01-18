import React from "react";
import "./AdminLayoutr.css";

import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navbara from "./Navbara";


export default function AdminLayout({children}) {
  return (

    <div className="cbody">
      
      <Navbara />
      <Outlet />
      <Footer />
    </div>
  );
}
