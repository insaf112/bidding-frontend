import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import bgImage from "/images/authPageBg.png";
import AppInput from "../Components/AppInput";
import { POST } from "../config/ApiConfig";
import { loginSuccess } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeInput = (e) => {
    console.log("User", e.target);
    const { name, value } = e.target;
    setUserInput((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    const { email, password } = userInput;
    if (!isLoading && email && password) {
      setIsLoading(true);
      try {
        const {
          data: { data },
        } = await POST("/auth/login", { ...userInput });
        console.log("User Login", data.data.token);
        localStorage.setItem("token", data.data.token);
        dispatch(loginSuccess());
        setIsLoading(false);
        navigate("/user/dashboard");
      } catch (err) {
        alert(err);
      }
    } else {
      alert("Please fill all the fields");
    }
  };
  return (
    <div className="w-full calcHeight bg-neutral7 flex justify-center">
      <div className="maxW flex">
        <div className="w-[70%] ">
          <div
            className="bg-cover w-[80%] h-full "
            style={{
              backgroundImage: `url(${bgImage})`,
            }}
          ></div>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <h2 className="epilogue text-[35px] font-[500] ">Welcome Back!</h2>
          <div className="gap-y-6 grid mt-6">
            <AppInput
              label={"Email Address"}
              name={"email"}
              onChange={onChangeInput}
              value={userInput.email}
            />
            <AppInput
              label={"Password"}
              name={"password"}
              onChange={onChangeInput}
              value={userInput.password}
              type="password"
            />
          </div>
          <div
            onClick={handleLogin}
            className={`bg-button rounded-md mt-8 hover:brightness-150 flex justify-center items-center w-[400px] font-epilogue cursor-pointer py-[12px] px-5`}
          >
            <p className={`font-bold text-[white] text-base`}>
              {isLoading ? "Logging In..." : "Login"}
            </p>
          </div>
          <div className=" flex justify-start mt-4">
            <p className="text-base text-[#202430]">
              Don`t have an account yet?{" "}
            </p>
            <p
              className={`font-bold ml-2 text-button cursor-pointer text-base`}
              onClick={() => navigate("/signup")}
            >
              Signup
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
