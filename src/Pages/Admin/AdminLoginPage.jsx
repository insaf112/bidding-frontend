import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import bgImage from "/images/authPageBg.png";
import AppInput from "../../Components/AppInput";
import { userLogin } from "../../config/ApiHelpers";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/userSlice";

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

  const handleAdminLogin = async () => {
    const { email, password } = userInput;
    if (!isLoading && email && password) {
      setIsLoading(true);
      try {
        const { data } = await userLogin(userInput);
        console.log("User Login", data.data);
        localStorage.setItem("token", data.data.data.token);
        dispatch(loginSuccess(data.data.data.user));
        setIsLoading(false);
        navigate("/admin/dashboard");
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
        <div className="w-[70%]">
          <div
            className="bg-cover w-[80%] h-full "
            style={{
              backgroundImage: `url(${bgImage})`,
            }}
          ></div>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <h2 className="epilogue text-[35px] font-[500] ">Welcome Admin</h2>
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
            onClick={handleAdminLogin}
            className={`bg-button rounded-md mt-8 hover:brightness-150 flex justify-center items-center w-[400px] font-epilogue cursor-pointer py-[12px] px-5`}
          >
            <p className={`font-bold text-[white] text-base`}>
              {isLoading ? "Logging In..." : "Login"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
