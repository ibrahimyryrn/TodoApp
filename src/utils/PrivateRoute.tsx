import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuthData } from "./cookies";

const PrivateRoute: React.FC = () => {
  const { token } = getAuthData();

  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
