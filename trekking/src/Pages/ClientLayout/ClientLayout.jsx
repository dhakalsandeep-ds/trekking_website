import React from "react";
import "./ClientLayout.css";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";

export default function ClientLayout() {
  return (
    <div className="cbody">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
