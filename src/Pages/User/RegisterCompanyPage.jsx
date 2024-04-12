import React, { useState } from "react";
import AppInput, { AppInputCompany } from "../../Components/AppInput";
import { useNavigate } from "react-router-dom";

const RegisterCompanyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onChangeInput = (e) => {
    console.log("User", e.target);
    // const { name, value } = e.target;
    // setUserInput((prevValue) => ({
    //   ...prevValue,
    //   [name]: value,
    // }));
  };

  const handleRegister = () => {
    // if (!isLoading) {
    //   console.log("User", userInput);
    //   setIsLoading(true);
    //   setTimeout(() => {
    //     setIsLoading(false);
    //     navigate("/");
    //   }, 2000);
    // }
  };
  return (
    <div className="w-full h-full pb-5  flex justify-center bg-neutral7">
      <div className="maxW flex">
        {/* <div className="w-[70%] bg-neutral7">
        <div
          className="bg-cover w-[80%] h-full "
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        ></div>
      </div> */}
        <div className="w-full flex flex-col  items-center gap-x-5">
          <h2 className="epilogue text-[35px] self-start font-[500] ">
            Register Your Company
          </h2>
          <div className="gap-y-4 gap-x-10 mt-2 flex flex-wrap">
            <AppInputCompany
              label={"Company Name"}
              name={"name"}
              styles={{ width: "100%" }}
              onChange={onChangeInput}
              // value={userInput.name}
            />
            <AppInputCompany
              label={"Telephone 1#"}
              name={"phone1"}
              onChange={onChangeInput}
              // value={userInput.email}
            />

            <AppInputCompany
              label={"Telephone 2#"}
              name={"phone2"}
              onChange={onChangeInput}
              // value={userInput.password}
              type="number"
            />
            <AppInputCompany
              label={"Fax Number"}
              name={"fax"}
              onChange={onChangeInput}
              // value={userInput.password}
              type="number"
            />
            <AppInputCompany
              label={"Email Address"}
              name={"email"}
              onChange={onChangeInput}
              // value={userInput.password}
              type="email"
            />
            <AppInputCompany
              label={"License Copy (Pdf)"}
              name={""}
              onChange={onChangeInput}
              // value={userInput.password}
              type="file"
            />
            <AppInputCompany
              label={"VAT Certificate (Pdf)"}
              name={""}
              onChange={onChangeInput}
              // value={userInput.password}
              type="file"
            />
            <div className="grid gap-y-1 w-[100%]">
              <textarea
                name="description"
                placeholder="Company Description"
                id=""
                className="px-4 py-3 resize-none rounded-md outline-none w-[100%] text-base font-normal placeholder-neutral4 border border-[#D6DDEB] border-solid"
              />
            </div>
            <AppInputCompany
              label={"Address 1#"}
              name={""}
              onChange={onChangeInput}
              // value={userInput.password}
              type="text"
            />
            <AppInputCompany
              label={"Address 2#"}
              name={""}
              onChange={onChangeInput}
              // value={userInput.password}
              type="text"
            />
            <AppInputCompany
              label={"Address 3#"}
              name={""}
              onChange={onChangeInput}
              // value={userInput.password}
              type="text"
            />
            <AppInputCompany
              label={"Location"}
              name={""}
              onChange={onChangeInput}
              // value={userInput.password}
              type="text"
            />
            <AppInputCompany
              label={"Website Address"}
              name={""}
              onChange={onChangeInput}
              // value={userInput.password}
              type="text"
            />
          </div>
          <div
            onClick={handleRegister}
            className={`bg-button mt-4 hover:brightness-125 flex justify-center items-center w-[100%] rounded-md font-epilogue cursor-pointer py-[12px] px-5`}
          >
            <p className={`font-bold text-[white] text-base`}>
              {isLoading ? "Registering..." : "Register Company"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompanyPage;
