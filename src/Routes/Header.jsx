import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppButton from "../Components/AppButton";
import AdminMenuToggler from "../Components/AdminMenuToggler";
import UserMenuToggler from "../Components/UserMenuToggler";

const Header = ({ userType }) => {
  const navigate = useNavigate();
  return userType.user ? (
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
          <AppButton
            text={"Dashboard"}
            bgColor={false}
            color="#4640DE"
            onClick={() => navigate("/user/dashboard")}
          />
          <AppButton
            text={"Projects"}
            bgColor={false}
            color="#4640DE"
            onClick={() => navigate("/active-projects")}
          />
          <UserMenuToggler />
          {/* <AppButton
            text={"Logout"}
            bgColor={true}
            onClick={() => navigate("/signup")}
          /> */}
        </div>
      </div>
    </div>
  ) : userType.admin ? (
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
          <AppButton
            text={"Dashboard"}
            bgColor={false}
            color="#4640DE"
            onClick={() => navigate("/admin/dashboard")}
          />
          <AppButton
            text={"Projects"}
            bgColor={false}
            color="#4640DE"
            onClick={() => navigate("/active-projects")}
          />
          {/* <AppButton
            text={"Logout"}
            bgColor={true}
            onClick={() => navigate("/signup")}
          /> */}
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

        <div className="flex gap-x-[20px]">
          <AppButton
            text={"Login"}
            bgColor={false}
            color="#4640DE"
            onClick={() => navigate("/login")}
          />
          <AppButton
            text={"Sign Up"}
            bgColor={true}
            onClick={() => navigate("/signup")}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
