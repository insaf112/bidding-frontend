import React, { useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const userRoles = ["admin"];
const AuthRoutes = ({ roles }) => {
  const location = useLocation();
  // return userRoles?.find((rl) => roles?.includes(rl)) ? (
  return roles?.some((rl) => rl == true) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthRoutes;
