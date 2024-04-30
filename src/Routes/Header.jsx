import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import AppButton from "../Components/AppButton";
import AdminMenuToggler from "../Components/AdminMenuToggler";
import UserMenuToggler from "../Components/UserMenuToggler";
import { getDecodedToken } from "../config/ApiConfig";

const Header = () => {
  const data = getDecodedToken();
  const userType = data?.role;
  console.log("USER TYPE : ", userType);
  const navigate = useNavigate();
  return userType == 0 ? (
    <div className="w-full h-[78px] items-center font-epilogue flex justify-center bg-neutral5">
      <div className="maxW flex items-center justify-between">
        {/* Logo  */}
        <div className="">
          <p className="epilogue text-2xl font-bold">
            Project<span className="text-[#4640de]">Hunt</span>
          </p>
        </div>
        {/* Navbar */}

        <div className="flex gap-x-[20px] items-center relative">
          <AppNavLink title={"Dashboard"} to={"user/dashboard"} />
          <AppNavLink title={"Register Company"} to={"/register-company"} />
          {/* <UserMenuToggler /> */}
        </div>
      </div>
    </div>
  ) : userType == 1 ? (
    <div className="w-full h-[78px] items-center font-epilogue flex justify-center bg-neutral5">
      <div className="maxW flex items-center justify-between">
        {/* Logo  */}
        <div className="">
          <p className="epilogue text-2xl font-bold">
            Project<span className="text-[#4640de]">Hunt</span>
          </p>
        </div>
        {/* Navbar */}

        <div className="flex gap-x-[20px] items-center relative">
          <AppNavLink title={"Dashboard"} to={"company/dashboard"} />
          <AppNavLink title={"Projects"} to={"/active-projects"} />
          <UserMenuToggler />
        </div>
      </div>
    </div>
  ) : userType == 2 ? (
    <div className="w-full h-[78px] items-center font-epilogue flex justify-center bg-neutral5">
      <div className="maxW flex items-center justify-between">
        {/* Logo  */}
        <div className="">
          <p className="epilogue text-2xl font-bold">
            Project<span className="text-[#4640de]">Hunt</span>
          </p>
        </div>
        {/* Navbar */}

        <div className="flex gap-x-[20px] items-center relative">
          <AppNavLink title={"Dashboard"} to={"admin/dashboard"} />
          <AppNavLink title={"Projects"} to={"/active-projects"} />
          {/* <p className="hover:brightness-125 text-[#4640DE] font-semibold">
            <NavLink
              to="/active-projects"
              className={({ isActive }) =>
                isActive ? "text-red underline" : ""
              }
            >
              Projects
            </NavLink>
          </p> */}
          <AdminMenuToggler />
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full h-[78px] items-center font-epilogue flex justify-center bg-neutral5">
      <div className="maxW flex items-center justify-between">
        {/* Logo  */}
        <div className="">
          <p className="epilogue text-2xl font-bold">
            Project<span className="text-[#4640de]">Hunt</span>
          </p>
        </div>
        {/* Navbar */}

        <div className="flex items-center gap-x-[25px]">
          <AppNavLink title={"Login"} to={"/login"} />

          <NavLink
            to="/signup"
            className={({ isActive }) => (isActive ? "text-red underline" : "")}
          >
            <p className="hover:brightness-125 ml-2 bg-[#4640DE] rounded-md py-[10px] px-5 text-white font-semibold">
              Sign Up
            </p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
const AppNavLink = ({ title, to }) => {
  return (
    <p className="hover:brightness-125 text-[#4640DE] font-semibold">
      <NavLink
        to={to}
        className={({ isActive }) => (isActive ? "text-red underline" : "")}
      >
        {title}
      </NavLink>
    </p>
  );
};
export default Header;
