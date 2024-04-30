import React, { useState } from "react";
import AppInput, {
  AppInputCompany,
  AppSelectOptions,
} from "../../Components/AppInput";
import { useNavigate } from "react-router-dom";
import DropdownSelect from "../../Components/DropdownSelect";
import categories from "../../assets/data/categories";

const CreateProjectPage = () => {
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
  const onChangeDate = (e) => {
    console.log("User", e);
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
    <div className="w-full h-full pb-5 pt-2 flex justify-center bg-neutral7">
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
            Post a Project
          </h2>
          <div className="gap-y-4 gap-x-10 mt-2 flex flex-wrap">
            <AppInputCompany
              label={"Title"}
              name={"title"}
              styles={{ width: "100%" }}
              onChange={onChangeInput}
              // value={userInput.name}
            />
            <div className="grid  w-[100%]">
              <textarea
                name="description"
                placeholder="Project Description"
                id=""
                rows={3}
                className="px-4 py-3 resize-none rounded-md outline-none w-[100%] text-base font-normal placeholder-neutral4 border border-[#D6DDEB] border-solid"
              />
            </div>
            <DropdownSelect data={categories} />
            <AppInputCompany
              label={"Bid Base Price"}
              name={"phone1"}
              onChange={onChangeInput}
              // value={userInput.email}
              type="number"
            />

            <AppInputCompany
              label={"Work Start Date"}
              name={"dateFrom"}
              onChange={onChangeDate}
              // value={userInput.password}
              type="date"
            />
            <AppInputCompany
              label={"Work End Date"}
              name={"dateTo"}
              onChange={onChangeDate}
              // value={userInput.password}
              type="date"
            />
            <AppInputCompany
              label={"Bid Start Time"}
              name={"dateTo"}
              onChange={onChangeDate}
              // value={userInput.password}
              type="datetime-local"
            />
            <AppInputCompany
              label={"Bid End Time"}
              name={"dateTo"}
              onChange={onChangeDate}
              // value={userInput.password}
              type="datetime-local"
            />
            <AppInputCompany
              label={"Bid Reduction Rate"}
              name={"phone1"}
              onChange={onChangeInput}
              // value={userInput.email}
              step="0.50"
              type="number"
            />
            <AppSelectOptions
              data={[
                { title: "True", value: true },
                { title: "False", value: false },
              ]}
              label={"Public Project"}
            />
          </div>
          <div
            onClick={handleRegister}
            className={`bg-button mt-4 hover:brightness-125 flex justify-center items-center w-[100%] rounded-md font-epilogue cursor-pointer py-[12px] px-5`}
          >
            <p className={`font-bold text-[white] text-base`}>
              {isLoading ? "Posting..." : "Post Project"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectPage;
