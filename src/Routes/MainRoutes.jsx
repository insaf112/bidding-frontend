import React, { useEffect, useMemo, useState } from "react";
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
import UserProfilePage from "../Pages/Company/UserProfilePage";
import CreateProjectPage from "../Pages/Company/CreateProjectPage";
import FriendRequestPage from "../Pages/Company/FriendRequestPage";
import CompanyDetailsPage from "../Pages/Admin/CompanyDetailsPage";
import CompanyDetailsPageUser from "../Pages/Company/CompanyDetailsPageUser";
import ProjectDetailsPage from "../Pages/Company/ProjectDetailsPage";
import { getDecodedToken } from "../config/ApiConfig";
import CompanyDashboardPage from "../Pages/Company/CompanyDashboardPage";
import { loginSuccess } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";

const userType = {
  admin: false,
  public: true,
  user: false,
};
const MainRoutes = () => {
  const isLoggedIn = getDecodedToken();
  const dispatch = useDispatch();
  useMemo(() => {
    if (isLoggedIn) {
      dispatch(loginSuccess());
    }
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}

          {!isLoggedIn && (
            <>
              <Route path="/" element={<LandingPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
              <Route path="admin/login" element={<AdminLoginPage />} />
            </>
          )}

          {/* Admin Routes */}
          <Route element={<AuthRoutes roles={[2]} />}>
            <Route path="admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="admin/admin-profile" element={<AdminProfilePage />} />
            <Route path="admin/companies-list" element={<AllCompaniesPage />} />
            <Route path="admin/company/:id" element={<CompanyDetailsPage />} />
            <Route
              path="admin/approval-requests"
              element={<ApprovalRequests />}
            />
          </Route>

          {/* Company Routes */}
          <Route element={<AuthRoutes roles={[1]} />}>
            <Route path="company/profile" element={<UserProfilePage />} />
            <Route
              path="company/create-project"
              element={<CreateProjectPage />}
            />

            <Route
              path="company/friend-requests"
              element={<FriendRequestPage />}
            />
            <Route path="company/:id" element={<CompanyDetailsPageUser />} />
            <Route
              path="company/dashboard"
              element={<CompanyDashboardPage />}
            />
          </Route>

          {/* User Routes */}
          <Route element={<AuthRoutes roles={[0]} />}>
            <Route path="user/dashboard" element={<UserDashboardPage />} />
          </Route>

          {/* Mutual Routes Admin/User */}
          <Route element={<AuthRoutes roles={[2, 0]} />}>
            <Route path="project-details" element={<ProjectDetailsPage />} />
            <Route path="active-projects" element={<ProjectsActiveScreen />} />
            <Route path="register-company" element={<RegisterCompanyPage />} />
          </Route>
          {/* Catch All (Not Found) */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainRoutes;
