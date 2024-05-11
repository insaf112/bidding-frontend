import React, { useState } from "react";
import AppInput, {
  AppInputCompany,
  AppSelectOptions,
} from "../../Components/AppInput";
import { useNavigate } from "react-router-dom";
import DropdownSelect from "../../Components/DropdownSelect";
import allCategories from "../../assets/data/categories";
import { PostFile } from "../../config/ApiConfig";
import { useSelector } from "react-redux";

const CreateProjectPage = () => {
  const { user } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [project, setProject] = useState({
    title: "",
    description: "",
    bidBasePrice: "",
    workStartDate: "",
    workEndDate: "",
    bidStartTime: "",
    bidEndTime: "",
    bidReductionRate: "",
    publicProject: true,
  });
  const [categories, setCategories] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();

  console.log("User", user);
  const onChangeInput = (e) => {
    const { name, value } = e.target;

    setProject((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };
  const onChangeFile = (e) => {
    console.log("FILESSSSSSs : ", e.target.files);
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };
  const handleRegister = async () => {
    console.log("DATAAAAA : ", project);
    const {
      title,
      description,
      bidBasePrice,
      workStartDate,
      workEndDate,
      bidStartTime,
      bidEndTime,
      bidReductionRate,
      publicProject,
    } = project;

    const condition =
      title &&
      description &&
      bidBasePrice &&
      workStartDate &&
      workEndDate &&
      bidStartTime &&
      bidEndTime &&
      bidReductionRate &&
      categories.length > 0;

    if (condition) {
      setIsLoading(false);

      try {
        const fd = new FormData();
        fd.append("companyId", user?.companyProfile?._id);
        fd.append("userId", user?._id);
        fd.append("title", title);
        fd.append("description", description);
        categories.forEach((category, index) => {
          fd.append(`categories[${index}]`, category);
        });
        fd.append("bidBasePrice", bidBasePrice);
        fd.append("workStartDate", workStartDate);
        fd.append("workEndDate", workEndDate);
        fd.append("bidStartTime", bidStartTime);
        fd.append("bidEndTime", bidEndTime);
        fd.append("bidReductionRate", bidReductionRate);
        fd.append("publicProject", publicProject);

        // Append files to the form
        for (const file of selectedFiles) {
          fd.append("files", file);
        }
        const res = await PostFile("/project/post", fd);
        console.log("ressssssssss", res);
      } catch (error) {
        console.log("ERRORRRRR", error);
      }

      setIsLoading(false);
    } else {
      alert("Please fill all the fields");
    }
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
                onChange={onChangeInput}
                name="description"
                placeholder="Project Description"
                id=""
                rows={3}
                className="px-4 py-3 resize-none rounded-md outline-none w-[100%] text-base font-normal placeholder-neutral4 border border-[#D6DDEB] border-solid"
              />
            </div>
            <DropdownSelect
              data={allCategories}
              handleSelect={(value) => setCategories(value)}
            />

            <AppInputCompany
              // label={"Bid Base Price"}
              name={"files"}
              onChange={onChangeFile}
              // value={userInput.email}
              type="file"
              multiple={true}
              fileType={".pdf, .txt, image/*"}
            />

            <AppInputCompany
              label={"Work Start Date"}
              name={"workStartDate"}
              onChange={onChangeInput}
              // value={userInput.password}
              type="date"
            />
            <AppInputCompany
              label={"Work End Date"}
              name={"workEndDate"}
              onChange={onChangeInput}
              // value={userInput.password}
              type="date"
            />
            <AppInputCompany
              label={"Bid Start Time"}
              name={"bidStartTime"}
              onChange={onChangeInput}
              // value={userInput.password}
              type="datetime-local"
            />
            <AppInputCompany
              label={"Bid End Time"}
              name={"bidEndTime"}
              onChange={onChangeInput}
              // value={userInput.password}
              type="datetime-local"
            />
            <AppInputCompany
              label={"Bid Base Price"}
              name={"bidBasePrice"}
              onChange={onChangeInput}
              // value={userInput.email}
              type="number"
            />
            <AppInputCompany
              label={"Bid Reduction Rate"}
              name={"bidReductionRate"}
              onChange={onChangeInput}
              // value={userInput.email}
              step="0.50"
              type="number"
            />
            <AppSelectOptions
              label={"Public Project"}
              name="publicProject"
              onChange={onChangeInput}
              data={[
                { title: "True", value: true },
                { title: "False", value: false },
              ]}
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
