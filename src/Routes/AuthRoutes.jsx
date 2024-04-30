import React, { useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { getDecodedToken } from "../config/ApiConfig";

const user = {
  0: "user",
  1: "company",
  2: "admin",
};

const AuthRoutes = ({ roles }) => {
  const data = getDecodedToken();
  const location = useLocation();
  const isAuthorized = roles && roles.includes(data?.role);

  console.log("TOKEN DATA", data, isAuthorized);
  console.log("location", location);
  // return userRoles?.find((rl) => roles?.includes(rl)) ? (
  // return isAuthorized ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  // );
  if (!data) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user is authorized
  if (!isAuthorized) {
    return <Navigate to={`${user[data?.role]}/dashboard`} />;
  }

  return <Outlet />;
};

export default AuthRoutes;
