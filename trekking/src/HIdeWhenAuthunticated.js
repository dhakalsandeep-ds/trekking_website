// PrivateRoute.js
import React, { useContext } from 'react';
import { Route,Navigate,Outlet } from 'react-router-dom';
import AuthContext from './AuthState';

const HideWhenAuthenticated = ({ element }) => {
  const authContext = useContext(AuthContext);
  const newLocal = "authcontext .............";
  console.log(authContext,newLocal)

  return authContext.token === null ? <Outlet /> : <Navigate to="/admin" />;
};

export default HideWhenAuthenticated;
