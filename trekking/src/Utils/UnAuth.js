import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function UnAuth() {
  //FOR blocking cretain page
  const unAuth = localStorage.getItem("unAuth");
  let auth = true;
  if (unAuth === "true") {
    auth = true;
  }
  return auth ? <Outlet /> : <Navigate to="/admin" />;
}
