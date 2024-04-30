import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { GET } from "../../config/ApiConfig";
import { Button } from "@mui/material";
import { loginSuccess } from "../../redux/slices/userSlice";

const UserDashboardPage = () => {
  const { state } = useLocation();
  const { user } = useSelector((state) => state.user);
  const [companyStatus, setCompanyStatus] = useState(null);
  console.log("STATEEEEEEEE", state, user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCompanyStatus = async () => {
    if (user) {
      try {
        const { data } = await GET(`/user/getCompanyStatus/${user.id}`);
        setCompanyStatus(data.data.data);
        console.log("company STatus : ", data);
      } catch (error) {
        alert("Error", error);
      }
    }
  };

  useEffect(() => {
    getCompanyStatus();
  }, []);

  const replaceUserToken = async () => {
    try {
      const { data } = await GET(`/user/replaceToken/${user.id}`);
      localStorage.setItem("token", data.data.data.token);
      dispatch(loginSuccess());
      console.log("DATAAAAAAAAAA : ", data);
      navigate("/company/dashboard");
    } catch (error) {
      alert("Error", error);
    }
  };

  return (
    <div className="w-full calcHeight bg-neutral7 flex justify-center">
      <div className="maxW py-3">
        {companyStatus?.status == 0 ? (
          <h2 className="epilogue text-[35px] text-primary text-center font-[500] ">
            Your Company Registration request is submitted. Please wait for the
            Approval to Start using ProjectHunt
          </h2>
        ) : companyStatus?.status == 1 ? (
          <>
            <h2 className="epilogue text-[35px] text-primary mb-4 font-[500] ">
              Your Company Registration request is approved. You can now start
              using ProjectHunt
            </h2>
            <Button
              onClick={replaceUserToken}
              title="Go Project Hunting"
              variant="contained"
              color="info"
            >
              Go Project Hunting
            </Button>
          </>
        ) : (
          <h2 className="epilogue text-[35px] self-start font-[500] ">
            User Dashboard
          </h2>
        )}
      </div>
    </div>
  );
};

export default UserDashboardPage;
