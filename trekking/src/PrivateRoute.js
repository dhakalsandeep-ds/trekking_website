// PrivateRoute.js
import React, { useContext } from 'react';
import { Route,Navigate,Outlet } from 'react-router-dom';
import AuthContext from './AuthState';

const PrivateRoute = ({ element }) => {
  const authContext = useContext(AuthContext);
  const newLocal = "authcontext .............";
  console.log(authContext,newLocal)

  return authContext.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
