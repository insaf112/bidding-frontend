import React, { useState } from "react";
import AppInput, { AppInputCompany } from "../../Components/AppInput";
import { useNavigate } from "react-router-dom";
import { POST, PostFile } from "../../config/ApiConfig";
import { useSelector } from "react-redux";

const RegisterCompanyPage = () => {
  const { user } = useSelector((store) => store.user);
  const [company, setCompany] = useState({
    companyName: "",
    telephone1: "",
    telephone2: "",
    faxNumber: "",
    email: "",
    description: "",
    address1: "",
    address2: "",
    address3: "",
    location: "",
    categories: "",
    website: "",
    licensePdf: "",
    vacPdf: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  console.log("User", user);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    if (name.endsWith("Pdf")) console.log("User File", e.target.files[0]);
    // const { name, value } = e.target;
    setCompany((prevValue) => ({
      ...prevValue,
      [name]: name.endsWith("Pdf") ? e.target.files[0] : value,
    }));
  };

  const handleRegister = async (e) => {
    console.log("Register", company);
    e.preventDefault(); // Prevent the default form submission

    setIsLoading(true); // Set loading state to true
    console.log(`Register Form`, e?.target?.elements?.phone1);
    try {
      const formData = new FormData(); // Create a FormData object

      // Append PDF files to FormData object
      formData.append("licensePdf", company.licensePdf);
      formData.append("vacPdf", company.vacPdf);

      // Append text input values to FormData object
      formData.append("userId", user?.id);
      formData.append("companyName", company.companyName);
      formData.append("telephone1", company.telephone1);
      formData.append("telephone2", company.telephone2);
      formData.append("faxNumber", company.faxNumber);
      formData.append("email", company.email);
      formData.append("description", company.description);
      formData.append("address1", company.address1);
      formData.append("address2", company.address2);
      formData.append("address3", company.address3);
      formData.append("location", company.location);
      ["Abc", "Def", "Ghi"].forEach((category, index) => {
        formData.append(`categories[${index}]`, category);
      });
      formData.append("website", company.website);

      console.log("FormData", formData);
      // Make a POST request to the backend API using Axios
      await PostFile("/company/registerCompany", formData);

      // Reset loading state and navigate to another page

      // navigate("/user/dashboard", {
      //   state: {
      //     state: 0,
      //   },
      // });
    } catch (error) {
      // Handle errors
      console.error("Error registering company:", error);
    }
    setIsLoading(false);
  };
  return (
    <div className="w-full h-full pb-5  flex justify-center bg-neutral7">
      <div className="maxW flex">
        <div className="w-full flex flex-col  items-center gap-x-5">
          <h2 className="epilogue text-[35px] self-start font-[500] ">
            Register Your Company
          </h2>
          <form onSubmit={handleRegister}>
            <div className="gap-y-4 gap-x-10 mt-2 flex flex-wrap">
              <AppInputCompany
                label={"Company Name"}
                name={"companyName"}
                styles={{ width: "100%" }}
                onChange={onChangeInput}
                value={company.companyName}
              />
              <AppInputCompany
                label={"Telephone 1#"}
                name={"telephone1"}
                onChange={onChangeInput}
                value={company.telephone1}
              />

              <AppInputCompany
                label={"Telephone 2#"}
                name={"telephone2"}
                onChange={onChangeInput}
                value={company.telephone2}
                type="number"
              />
              <AppInputCompany
                label={"Fax Number"}
                name={"faxNumber"}
                onChange={onChangeInput}
                value={company.faxNumber}
                type="number"
              />
              <AppInputCompany
                label={"Email Address"}
                name={"email"}
                onChange={onChangeInput}
                value={company.email}
                type="email"
              />
              <AppInputCompany
                label={"License Copy (Pdf)"}
                name={"licensePdf"}
                onChange={onChangeInput}
                // value={company.licensePdf}
                type="file"
              />
              <AppInputCompany
                label={"VAT Certificate (Pdf)"}
                name={"vacPdf"}
                onChange={onChangeInput}
                // value={company.vacPdf}
                type="file"
              />
              <div className="grid gap-y-1 w-[100%]">
                <textarea
                  onChange={onChangeInput}
                  value={company.description}
                  name="description"
                  placeholder="Company Description"
                  id=""
                  className="px-4 py-3 resize-none rounded-md outline-none w-[100%] text-base font-normal placeholder-neutral4 border border-[#D6DDEB] border-solid"
                />
              </div>
              <AppInputCompany
                label={"Address 1#"}
                name={"address1"}
                onChange={onChangeInput}
                value={company.address1}
                type="text"
              />
              <AppInputCompany
                label={"Address 2#"}
                name={"address2"}
                onChange={onChangeInput}
                value={company.address2}
                type="text"
              />
              <AppInputCompany
                label={"Address 3#"}
                name={"address3"}
                onChange={onChangeInput}
                value={company.address3}
                type="text"
              />
              <AppInputCompany
                label={"Location"}
                name={"location"}
                onChange={onChangeInput}
                value={company.location}
                type="text"
              />
              <AppInputCompany
                label={"Website Address"}
                name={"website"}
                onChange={onChangeInput}
                value={company.website}
                type="text"
              />
            </div>
            <div
              onClick={handleRegister}
              className={`bg-button mt-4 hover:brightness-125 flex justify-center items-center w-[100%] rounded-md font-epilogue cursor-pointer py-[12px] px-5`}
            >
              <button
                type="submit"
                className={`font-bold text-[white] text-base`}
              >
                {isLoading ? "Registering..." : "Register Company"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompanyPage;
