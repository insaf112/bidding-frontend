import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import bgImage from "../../public/images/authPageBg.png";
import AppInput from "../Components/AppInput";

const SignupPage = () => {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onChangeInput = (e) => {
    console.log("User", e.target);
    const { name, value } = e.target;
    setUserInput((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSignup = () => {
    if (!isLoading) {
      console.log("User", userInput);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/login");
      }, 2000);
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
          <h2 className="epilogue text-[35px] font-[500] ">
            Get More Opportunities
          </h2>
          <div className="gap-y-6 grid mt-6">
            <AppInput
              label={"Full Name"}
              name={"name"}
              onChange={onChangeInput}
              value={userInput.name}
            />
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
            onClick={handleSignup}
            className={`bg-button rounded-md mt-8 hover:brightness-150 flex justify-center items-center w-[400px] font-epilogue cursor-pointer py-[12px] px-5`}
          >
            <p className={`font-bold text-[white] text-base`}>
              {isLoading ? "Signing Up..." : "SignUp"}
            </p>
          </div>
          <div className=" flex justify-start mt-4">
            <p className="text-base text-[#202430]">
              Already have an account?{" "}
            </p>
            <p
              className={`font-bold ml-2 text-button cursor-pointer text-base`}
              onClick={() => navigate("/login")}
            >
              Login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
