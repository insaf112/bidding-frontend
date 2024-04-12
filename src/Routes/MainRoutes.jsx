import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "../Pages/LandingPage";
import AdminLoginPage from "../Pages/Admin/AdminLoginPage";
import LoginPage from "../Pages/LoginPage";
import SignupPage from "../Pages/SignupPage";
import Header from "./Header";
import RegisterCompanyPage from "../Pages/User/RegisterCompanyPage";
import Layout from "../Components/Layout";
import AdminDashboardPage from "../Pages/Admin/AdminDashboardPage";
import AuthRoutes from "./AuthRoutes";
import UserDashboardPage from "../Pages/User/UserDashboardPage";
import NotFoundPage from "../Pages/NotFoundPage";
import AdminProfilePage from "../Pages/Admin/AdminProfilePage";
import AllCompaniesPage from "../Pages/Admin/AllCompaniesPage";
import ApprovalRequests from "../Pages/Admin/ApprovalRequests";
import ProjectsActiveScreen from "../Pages/Admin/ProjectsActiveScreen";
import UserProfilePage from "../Pages/User/UserProfilePage";
import CreateProjectPage from "../Pages/User/CreateProjectPage";
import FriendRequestPage from "../Pages/User/FriendRequestPage";

const userType = {
  admin: false,
  public: false,
  user: true,
};
const MainRoutes = () => {
  return (
    <>
      <Header userType={userType} />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="admin/login" element={<AdminLoginPage />} />

          {/* Admin Routes */}
          <Route element={<AuthRoutes roles={[userType.admin]} />}>
            <Route path="admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="admin/admin-profile" element={<AdminProfilePage />} />
            <Route path="admin/companies-list" element={<AllCompaniesPage />} />
            <Route
              path="admin/approval-requests"
              element={<ApprovalRequests />}
            />
          </Route>

          {/* User Routes */}
          <Route element={<AuthRoutes roles={[userType.user]} />}>
            <Route path="user/user-profile" element={<UserProfilePage />} />
            <Route path="user/create-project" element={<CreateProjectPage />} />
            <Route
              path="user/friend-requests"
              element={<FriendRequestPage />}
            />
            <Route path="user/dashboard" element={<UserDashboardPage />} />
          </Route>

          {/* Mutual Routes Admin/User */}
          <Route
            element={<AuthRoutes roles={[userType.admin, userType.user]} />}
          >
            <Route path="active-projects" element={<ProjectsActiveScreen />} />
            <Route
              path="user/register-company"
              element={<RegisterCompanyPage />}
            />
          </Route>
          {/* Catch All (Not Found) */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainRoutes;
