import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const token = localStorage.getItem("token");
  console.log("token ", token)
  let auth = { token: false };
  if (token) {
    auth.token = true;
  }
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
}
