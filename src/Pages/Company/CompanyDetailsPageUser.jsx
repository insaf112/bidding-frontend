import React, { useEffect, useMemo, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import categories from "../../assets/data/categories";
import { companies } from "../../assets/data/dummyData";
import PdfComponent from "../../Components/PdfComponent";
import PdfFile from "../../assets/Resume.pdf";
import AppButton from "../../Components/AppButton";
import ConfirmationModal from "../../Components/ConfirmationModal";

const CompanyDetailsPageUser = () => {
  const [company, setCompany] = useState(companies[0]);
  const [openPdfModal, setOpenPdfModal] = useState(false);
  const [openConfModal, setOpenConfModal] = useState(false);
  const [confirmationData, setConfirmationData] = useState({
    type: "",
    title: "",
    body: "",
  });

  const { id } = useParams();

  const { state } = useLocation();
  console.log("STATEEEEEEEE", state);

  useEffect(() => {
    const comp = companies.find((c) => c.id == id);
    console.log(comp);
    setCompany(comp);
  }, [id]);
  const acceptClick = () => {
    setOpenConfModal(true);
    setConfirmationData({
      type: "accept",
      title: "Do you want to accept this friend request?",
      body: "By confirming, this user will be added to your connections list and will be allowed to accept this requestyour private projects and vice versa",
    });
  };
  const declineClick = () => {
    setOpenConfModal(true);
    setConfirmationData({
      type: "decline",
      title: "Do you want to decline this friend request?",
      body: "If you decline this request, this user will not be added to your connections list and will not be allowed to access your private projects, and vice versa",
    });
  };

  const handleAcceptRequest = () => {
    console.log("ACCEPT REQUEST");
    setOpenConfModal(false);
  };
  const handleDeclineRequest = () => {
    console.log("DECLINE REQUEST");
    setOpenConfModal(false);
  };

  return (
    <div className="w-full calcHeight bg-neutral7 flex justify-center">
      <div className="maxW py-3">
        <div className="">
          <div className="flex justify-between mt-2">
            <p className="text-3xl font-medium">{company.companyName}</p>
            <div className="flex gap-x-5">
              {state?.type !== "AddFriend" ? (
                <>
                  <AppButton
                    onClick={declineClick}
                    bgColor={"red"}
                    text={"Decline Request"}
                  />
                  <AppButton
                    onClick={acceptClick}
                    bgColor={"green"}
                    text={"Accept Request"}
                  />
                </>
              ) : (
                <AppButton
                  onClick={() => console.log("Add Friend Click")}
                  bgColor={"#4640DE"}
                  text={"Add Connection"}
                />
              )}
            </div>
          </div>
          <p className="text-base mt-5 text-neutral2">
            {company.companyDescription}
          </p>
        </div>
        <div className="mt-4">
          <p className="text-xl font-medium underline">Documentation</p>
          <div className="flex mt-2 gap-x-5 items-center">
            <p className="text-base ">License Copy : </p>
            <div
              onClick={() => setOpenPdfModal(true)}
              className={`font-epilogue text-white bg-[#4640DE] rounded-md hover:brightness-125 cursor-pointer py-1 px-2 h-fit`}
            >
              <p className={` text-base`}>View License</p>
            </div>
            <p className="text-base">VAC Certificate : </p>
            <div
              onClick={() => setOpenPdfModal(true)}
              className={`font-epilogue text-white bg-[#4640DE] rounded-md hover:brightness-125 cursor-pointer py-1 px-2 h-fit`}
            >
              <p className={` text-base`}>View VAC</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-xl font-medium underline">Contact Info</p>
          <div className="flex mt-2 gap-x-5 gap-y-1 flex-wrap">
            <p className="text-base">
              Phone #1 :{" "}
              <span className="text-primary hover:underline">
                {company.telephone1}
              </span>
            </p>
            <p className="text-base">
              Phone #2 :{" "}
              <span className="text-primary hover:underline">
                {company.telephone2}
              </span>
            </p>
            <p className="text-base">
              Fax Number :{" "}
              <span className="text-primary hover:underline">
                {company.telephone2}
              </span>
            </p>
            <p className="text-base">
              Email :{" "}
              <span className="text-primary hover:underline">
                {company.emailAddress}
              </span>
            </p>
            <p className="text-base">
              Website :{" "}
              <a
                href={company.websiteAddress}
                className="text-primary hover:underline"
              >
                {company.websiteAddress}
              </a>
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-xl font-medium underline">Address</p>
          <div className="flex mt-2 gap-x-5 gap-y-1 flex-wrap">
            <p className="text-base">
              Address #1 :{" "}
              <span className="text-primary hover:underline">
                {company.address1}
              </span>
            </p>
            <p className="text-base">
              Address #2 :{" "}
              <span className="text-primary hover:underline">
                {company.address2}
              </span>
            </p>
            <p className="text-base">
              Address #3 :{" "}
              <span className="text-primary hover:underline">
                {company.address3}
              </span>
            </p>
            <p className="text-base">
              Location :{" "}
              <span className="text-primary hover:underline">
                {company.location}
              </span>
            </p>
          </div>
        </div>

        <ConfirmationModal
          open={openConfModal}
          onConfirm={
            confirmationData.type === "accept"
              ? handleAcceptRequest
              : handleDeclineRequest
          }
          handleClose={() => setOpenConfModal(false)}
          data={confirmationData}
        />
        <PdfComponent
          open={openPdfModal}
          file={PdfFile}
          handleClose={() => setOpenPdfModal(false)}
        />
      </div>
    </div>
  );
};

export default CompanyDetailsPageUser;
